// src/components/CategoryFilter.js
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../assets/theme/colors";

// Komponen ini menerima "props" bernama categories dan onSelectCategory
const CategoryFilter = ({ categories, onSelectCategory }) => {
  // Menerapkan STATE: Menyimpan id kategori yang sedang aktif (default: 1 / Popular)
  const [activeId, setActiveId] = useState(1);

  const handlePress = (item) => {
    setActiveId(item.id); // Mengubah state
    onSelectCategory(item.name); // Mengirim data ke komponen induk (LandingScreen)
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((item) => (
        <TouchableOpacity
          key={item.id}
          // Style berubah dinamis berdasarkan STATE activeId
          style={[styles.badge, activeId === item.id && styles.badgeActive]}
          onPress={() => handlePress(item)}
        >
          <Text
            style={[styles.text, activeId === item.id && styles.textActive]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 15 },
  badge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.border, // Warna abu-abu (tidak aktif)
    marginRight: 10,
  },
  badgeActive: {
    backgroundColor: COLORS.primary, // Warna hijau tua (aktif)
  },
  text: { color: COLORS.textLight, fontWeight: "500" },
  textActive: { color: COLORS.white },
});

export default CategoryFilter;
