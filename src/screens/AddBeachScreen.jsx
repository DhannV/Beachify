import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { ArrowLeft, Upload } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";
import { BeachContext } from "../context/BeachContext";

/**
 * AddBeachScreen - Form untuk menambahkan pantai baru
 * BAB 7: Handling Text Input
 */
const AddBeachScreen = ({ navigation }) => {
  const { addNewBeach } = useContext(BeachContext);
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
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const toggleCategory = (categoryName) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryName)
        ? prev.selectedCategories.filter((cat) => cat !== categoryName)
        : [...prev.selectedCategories, categoryName],
    }));
  };

  const handleSubmit = () => {
    // Validasi
    if (
      !formData.beachName.trim() ||
      !formData.description.trim() ||
      formData.selectedCategories.length === 0
    ) {
      Alert.alert(
        "Validation Error",
        "Please fill all fields and select at least one category!",
      );
      return;
    }

    // Buat object data pantai baru
    const newBeachData = {
      id: Date.now().toString(),
      title: formData.beachName,
      category: formData.selectedCategories[0], // Gunakan kategori pertama sebagai kategori utama
      description: formData.description,
      funFacts: formData.funFacts,
      price: "Rp.15.000", // Default price
      image: require("../../assets/images/Pantai_KondangMerak.jpeg"), // Placeholder image
      timestamp: new Date().toISOString(),
    };

    // Tambahkan ke context (global state)
    addNewBeach(newBeachData);

    Alert.alert("Success", "Beach added successfully!", [
      {
        text: "OK",
        onPress: () => {
          // Reset form
          setFormData({
            beachName: "",
            description: "",
            funFacts: "",
            selectedCategories: [],
          });
          // Kembali ke Discover Screen
          navigation.navigate("Discover");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Beach 🏖️</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Form Title */}
        <Text style={styles.formTitle}>Share Your Beach Discovery</Text>

        {/* Beach Name Input */}
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

        {/* Description Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.textInput, styles.textAreaInput]}
            placeholder="Describe the beach features, atmosphere, and what to do there..."
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

        {/* Fun Facts Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Fun Facts (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.textAreaInput]}
            placeholder="Share interesting facts about the beach, local history, or wildlife..."
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

        {/* Category Selection */}
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

        {/* Image Placeholder */}
        <View style={styles.imageSection}>
          <Text style={styles.label}>Image (Photo Feature)</Text>
          <View style={styles.imagePlaceholder}>
            <Upload color={COLORS.textLight} size={40} />
            <Text style={styles.imagePlaceholderText}>Tap to upload image</Text>
            <Text style={styles.imagePlaceholderSubText}>
              Feature coming soon
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Upload Beach Info</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
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
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 25,
    textAlign: "center",
  },
  inputSection: {
    marginBottom: 20,
  },
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
  textAreaInput: {
    minHeight: 100,
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 5,
    textAlign: "right",
  },
  categorySection: {
    marginBottom: 25,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
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
  categoryTagText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textDark,
  },
  categoryTagTextActive: {
    color: COLORS.white,
  },
  imageSection: {
    marginBottom: 25,
  },
  imagePlaceholder: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  imagePlaceholderText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginTop: 10,
  },
  imagePlaceholderSubText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default AddBeachScreen;
