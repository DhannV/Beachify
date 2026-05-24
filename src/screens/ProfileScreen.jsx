import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../assets/theme/colors"; // Sesuaikan path jika perlu

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "Alrizky Putra Dhandi",
    bio: "Beach Explorer",
    email: "alrizky@beachify.com",
    favoriteBeach: "Nusa Dua Beach",
  });

  const [tempData, setTempData] = useState(formData);

  const handleInputChange = (field, value) => {
    setTempData({
      ...tempData,
      [field]: value,
    });
  };

  const handleSaveProfile = () => {
    if (
      !tempData.name.trim() ||
      !tempData.email.trim() ||
      !tempData.bio.trim()
    ) {
      Alert.alert("Validation Error", "All fields are required!");
      return;
    }
    setFormData(tempData);
    setIsEditMode(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleCancel = () => {
    setTempData(formData);
    setIsEditMode(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header Profile - Flexbox Column Center */}
      <View style={styles.profileHeader}>
        <Image
          source={require("../../assets/images/photoprofile.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{formData.name}</Text>
        <Text style={styles.bio}>{formData.bio}</Text>
      </View>

      {/* Edit Form - TextInput (BAB 7: Handling Text Input) */}
      {isEditMode ? (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Edit Your Profile 🏖️</Text>

          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              placeholderTextColor={COLORS.textLight}
              value={tempData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              maxLength={50}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.textLight}
              value={tempData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              keyboardType="email-address"
              maxLength={100}
            />
          </View>

          {/* Bio Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              placeholder="Tell us about yourself..."
              placeholderTextColor={COLORS.textLight}
              value={tempData.bio}
              onChangeText={(value) => handleInputChange("bio", value)}
              multiline
              numberOfLines={4}
              maxLength={200}
            />
          </View>

          {/* Favorite Beach Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Favorite Beach</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your favorite beach destination"
              placeholderTextColor={COLORS.textLight}
              value={tempData.favoriteBeach}
              onChangeText={(value) =>
                handleInputChange("favoriteBeach", value)
              }
              maxLength={100}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonTextSecondary}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSaveProfile}
            >
              <Text style={styles.buttonText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          {/* Statistik - Flexbox Row (Sesuai panduan di modul DOCX) */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.sum}>15</Text>
              <Text style={styles.tag}>Reviews</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.sum}>28</Text>
              <Text style={styles.tag}>Visited</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.sum}>12</Text>
              <Text style={styles.tag}>Saved</Text>
            </View>
          </View>

          {/* Tombol Edit */}
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => setIsEditMode(true)}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Tombol Add Beach */}
          <TouchableOpacity
            style={[styles.buttonEdit, styles.buttonAddBeach]}
            onPress={() => navigation.navigate("AddBeach")}
          >
            <Text style={styles.buttonText}>+ Add Beach Info</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    alignItems: "center",
    padding: 24,
    paddingTop: 60,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  bio: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row", // BAB 4: Membuat item sejajar ke samping
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: COLORS.background,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 10,
  },
  statItem: {
    alignItems: "center", // BAB 4: Menengahkan teks angka dan tag
    gap: 4,
  },
  sum: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  tag: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  buttonEdit: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },

  /* BAB 7: Handling Text Input - Form Styles */
  formContainer: {
    width: "100%",
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
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
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 25,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButton: {
    backgroundColor: COLORS.border,
  },
  buttonTextSecondary: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  buttonAddBeach: {
    backgroundColor: COLORS.accent,
    marginTop: 15,
  },
});

export default ProfileScreen;
