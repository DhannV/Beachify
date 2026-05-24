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
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";
import axios from "axios";

const API_URL = "https://6a12f17b78d0434e0d5da5f8.mockapi.io/beaches"; // GANTI DENGAN URL MOCKAPI KAMU

const EditBeachScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    beachName: destination.title,
    description: destination.description,
    funFacts: destination.funFacts || "",
    category: destination.category,
  });

  const categories = [
    "Popular",
    "Scenic",
    "Adventure",
    "Relaxing",
    "Wildlife",
    "Cultural",
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Fungsi PUT Data menggunakan Axios
  const handleUpdate = async () => {
    if (!formData.beachName.trim() || !formData.description.trim()) {
      Alert.alert(
        "Validation Error",
        "Please fill beach name and description!",
      );
      return;
    }

    const updatedData = {
      title: formData.beachName,
      category: formData.category,
      description: formData.description,
      funFacts: formData.funFacts,
    };

    try {
      setLoading(true);
      await axios.put(`${API_URL}/${destination.id}`, updatedData);

      Alert.alert("Success", "Beach information updated!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("MainApp", { screen: "Discover" }),
        },
      ]);
    } catch (error) {
      console.error("Error updating: ", error);
      Alert.alert("Error", "Failed to update data.");
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
        <Text style={styles.headerTitle}>Edit Beach Info ✏️</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputSection}>
          <Text style={styles.label}>Beach Name</Text>
          <TextInput
            style={styles.textInput}
            value={formData.beachName}
            onChangeText={(value) => handleInputChange("beachName", value)}
            maxLength={50}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.textInput, styles.textAreaInput]}
            value={formData.description}
            onChangeText={(value) => handleInputChange("description", value)}
            multiline
            numberOfLines={5}
            maxLength={300}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Fun Facts</Text>
          <TextInput
            style={[styles.textInput, styles.textAreaInput]}
            value={formData.funFacts}
            onChangeText={(value) => handleInputChange("funFacts", value)}
            multiline
            numberOfLines={4}
            maxLength={250}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryTag,
                  formData.category === cat && styles.categoryTagActive,
                ]}
                onPress={() => handleInputChange("category", cat)}
              >
                <Text
                  style={[
                    styles.categoryTagText,
                    formData.category === cat && styles.categoryTagTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.submitButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
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
});

export default EditBeachScreen;
