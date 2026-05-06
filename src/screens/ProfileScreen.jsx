import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../assets/theme/colors"; // Sesuaikan path jika perlu

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header Profile - Flexbox Column Center */}
      <View style={styles.profileHeader}>
        <Image
          source={require("../../assets/images/photoprofile.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>Alrizky Putra Dhandi</Text>
        <Text style={styles.bio}>Beach Explorer</Text>
      </View>

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
      <TouchableOpacity style={styles.buttonEdit}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 24,
    alignItems: "center", // Menengahkan semua konten secara horizontal
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
});

export default ProfileScreen;
