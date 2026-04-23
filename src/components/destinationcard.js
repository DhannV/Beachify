// src/components/DestinationCard.js
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../assets/theme/colors";
// Pastikan kamu sudah install lucide-react-native seperti di modul
import { Heart } from "lucide-react-native";

// Menerima PROPS dari komponen induk
const DestinationCard = ({ title, price, description, imageSource }) => {
  // Menerapkan STATE: Mengingat apakah kartu ini disukai atau tidak
  const [isLiked, setIsLiked] = useState(false);

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={imageSource} style={styles.image} />

      {/* Tombol Like menggunakan State */}
      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => setIsLiked(!isLiked)} // Mengubah state (true/false)
      >
        <Heart
          color={isLiked ? COLORS.accent : COLORS.white}
          fill={isLiked ? COLORS.accent : "transparent"}
          size={24}
        />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // ... (Gunakan styles lama kamu di sini, tambahkan style likeButton di bawah ini)
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: "hidden",
    width: 280,
    marginRight: 20,
    elevation: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 20,
  },
  image: { width: "100%", height: 180, resizeMode: "cover" },
  detailsContainer: { padding: 15 },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.accent,
    marginBottom: 10,
  },
  description: { fontSize: 12, color: COLORS.textLight, lineHeight: 18 },

  // Style baru untuk tombol love
  likeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 20,
  },
});

export default DestinationCard;
