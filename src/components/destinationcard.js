// src/components/DestinationCard.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../assets/theme/colors";

const DestinationCard = ({ title, price, description, imageSource }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={imageSource} style={styles.image} />
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: "hidden",
    width: 280, // Ukuran lebar card seperti di desain
    marginRight: 20,
    elevation: 8, // Bayangan kuat seperti di desain
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 20, // Untuk jarak bawah
  },
  image: {
    width: "100%",
    height: 180, // Tinggi gambar
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary, // Warna hijau tua
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.accent, // Warna merah
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
  },
});

export default DestinationCard;
