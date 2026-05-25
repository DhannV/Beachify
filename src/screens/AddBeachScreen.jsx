import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Image, // Kita tambahkan Image dari react-native untuk preview foto
} from "react-native";
import { ArrowLeft, Upload, X } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";

// --- IMPORT SUPABASE & IMAGE PICKER ---
import { supabase } from "../libs/supabase"; // Sesuaikan path folder libs kamu
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const AddBeachScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null); // State baru untuk menyimpan URI gambar lokal
  const [formData, setFormData] = useState({
    beachName: "",
    description: "",
    funFacts: "",
    selectedCategories: [],
  });

  const categories = [
    { id: 1, name: "Popular" },
    { id: 2, name: "Scenic" },
    { id: 3, name: "Adventure" },
    { id: 4, name: "Relaxing" },
    { id: 5, name: "Wildlife" },
    { id: 6, name: "Cultural" },
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleCategory = (categoryName) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryName)
        ? prev.selectedCategories.filter((cat) => cat !== categoryName)
        : [...prev.selectedCategories, categoryName],
    }));
  };

  // --- Fungsi untuk Memilih Gambar dari Galeri ---
  // --- Fungsi untuk Memilih Gambar dari Galeri ---
  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the gallery is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      // MENGGUNAKAN SINTAKS TERBARU BERUPA ARRAY STRING UNTUK MENGHINDARI WARNING DEPRECATED
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      // Kompres gambar agar ukurannya tidak terlalu berat saat diupload
      const manipulatedResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 1280 } }], // Resize ke lebar standar HD
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      );
      setImage(manipulatedResult.uri);
    }
  };

  // --- Fungsi Upload Gambar ke Storage & Simpan Data Pantai ke Database ---
  const handleSubmit = async () => {
    // Validasi input form dan gambar wajib diisi
    if (
      !formData.beachName.trim() ||
      !formData.description.trim() ||
      formData.selectedCategories.length === 0 ||
      !image
    ) {
      Alert.alert(
        "Validation Error",
        "Please fill all fields, select at least one category, and upload an image!",
      );
      return;
    }

    try {
      setLoading(true);

      // 1. Mempersiapkan Nama File Gambar Unik
      let filename = image.substring(image.lastIndexOf("/") + 1);
      const extension = filename.split(".").pop();
      const name = filename.split(".").slice(0, -1).join(".");
      filename = `${name}_${Date.now()}.${extension}`; // Ditambah timestamp agar nama file unik

      // 2. Mengubah Gambar ke ArrayBuffer untuk Supabase Storage
      const fileImage = await fetch(image);
      const arrayBuffer = await fileImage.arrayBuffer();

      // 3. Upload Gambar ke Supabase Storage (Ubah 'beaches' jika nama bucket kamu berbeda)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("beaches") // <--- PASTIKAN NAMA BUCKET STORAGE KAMU SESUAI
        .upload(filename, arrayBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(`Upload Storage Error: ${uploadError.message}`);
      }

      // 4. Mengambil Public URL Gambar yang Sukses Diupload
      const {
        data: { publicUrl },
      } = supabase.storage.from("beaches").getPublicUrl(filename);

      // 5. Menyisipkan/Insert Data Pantai Baru ke Tabel Supabase Database
      const { data: insertData, error: insertError } = await supabase
        .from("beaches") // <--- NAMA TABEL DI DATABASE KAMU
        .insert({
          title: formData.beachName,
          category: formData.selectedCategories[0],
          image: publicUrl, // Menyimpan link public URL gambar hasil upload tadi
          description: formData.description,
          funFacts: formData.funFacts,
          price: "Rp.15.000", // Default harga tiket masuk
        });

      if (insertError) {
        throw insertError;
      }

      // 6. Notifikasi Sukses & Reset Form
      Alert.alert("Success", "Beach added successfully to Supabase Database!", [
        {
          text: "OK",
          onPress: () => {
            setFormData({
              beachName: "",
              description: "",
              funFacts: "",
              selectedCategories: [],
            });
            setImage(null);
            navigation.navigate("MainApp", { screen: "Discover" });
          },
        },
      ]);
    } catch (error) {
      console.error("Error submitting to Supabase: ", error);
      Alert.alert("Error", error.message || "Failed to add beach to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Beach</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.formTitle}>Share Your Beach Discovery</Text>

        {/* --- SECTION UPLOAD GAMBAR BARU --- */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Beach Photo</Text>
          {image ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setImage(null)}
              >
                <X color={COLORS.white} size={16} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handleImagePick}
            >
              <Upload color={COLORS.textLight} size={32} />
              <Text style={styles.uploadText}>Upload Image from Gallery</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Beach Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter beach name"
            placeholderTextColor={COLORS.textLight}
            value={formData.beachName}
            onChangeText={(value) => handleInputChange("beachName", value)}
            maxLength={50}
          />
          <Text style={styles.charCount}>{formData.beachName.length}/50</Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.textInput, styles.textAreaInput]}
            placeholder="Describe the beach features..."
            placeholderTextColor={COLORS.textLight}
            value={formData.description}
            onChangeText={(value) => handleInputChange("description", value)}
            multiline
            numberOfLines={5}
            maxLength={300}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>
            {formData.description.length}/300
          </Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Fun Facts (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.textAreaInput]}
            placeholder="Share interesting facts..."
            placeholderTextColor={COLORS.textLight}
            value={formData.funFacts}
            onChangeText={(value) => handleInputChange("funFacts", value)}
            multiline
            numberOfLines={4}
            maxLength={250}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{formData.funFacts.length}/250</Text>
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.label}>Categories (Select at least one)</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryTag,
                  formData.selectedCategories.includes(category.name) &&
                    styles.categoryTagActive,
                ]}
                onPress={() => toggleCategory(category.name)}
              >
                <Text
                  style={[
                    styles.categoryTagText,
                    formData.selectedCategories.includes(category.name) &&
                      styles.categoryTagTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.submitButtonText}>Upload Beach Info</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    flex: 1,
    textAlign: "center",
  },
  scrollContainer: { flex: 1, backgroundColor: COLORS.white },
  scrollContent: { padding: 20 },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 25,
    textAlign: "center",
  },
  inputSection: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.textDark,
    backgroundColor: COLORS.white,
  },
  textAreaInput: { minHeight: 100, paddingTop: 12 },
  charCount: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 5,
    textAlign: "right",
  },
  categorySection: { marginBottom: 25 },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  categoryTag: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
  },
  categoryTagActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryTagText: { fontSize: 12, fontWeight: "500", color: COLORS.textDark },
  categoryTagTextActive: { color: COLORS.white },
  submitButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  submitButtonText: { fontSize: 16, fontWeight: "bold", color: COLORS.white },

  // Style tambahan untuk Preview & Upload Box Gambar
  uploadBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    borderRadius: 10,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  uploadText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 8,
  },
  imagePreviewContainer: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  removeImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 20,
    padding: 6,
  },
});

export default AddBeachScreen;
