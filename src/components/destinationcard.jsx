// src/components/DestinationCard.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../assets/theme/colors";
// Pastikan kamu sudah install lucide-react-native seperti di modul
import { Heart } from "lucide-react-native";

// Menerima PROPS dari komponen induk
const DestinationCard = ({ destination }) => {
  // Menerapkan STATE: Mengingat apakah kartu ini disukai atau tidak
  const [isLiked, setIsLiked] = useState(false);

  // ANIMASI LIKE BUTTON: Scale animation
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  // HOOK NAVIGASI: Ambil navigation dari useNavigation
  const navigation = useNavigation();

  // Fungsi untuk handle card press - navigate ke DetailScreen
  const handleCardPress = () => {
    navigation.navigate("Detail", { destination });
  };

  // Fungsi Like dengan Animasi
  const handleLikePress = () => {
    setIsLiked(!isLiked);

    // Animasi scale heart button
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Jika baru di-like, trigger pulse animation
    if (!isLiked) {
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeInAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  // Ekstrak data dari destination object
  const { title, price, description, image } = destination;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeInAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.8, 1],
          }),
        },
      ]}
    >
      <Image source={image} style={styles.image} />

      {/* Tombol Like dengan Animasi */}
      <Animated.View
        style={[
          styles.likeButton,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity onPress={handleLikePress}>
          <Heart
            color={isLiked ? COLORS.accent : COLORS.white}
            fill={isLiked ? COLORS.accent : "transparent"}
            size={24}
          />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // ... (Gunakan styles lama kamu di sini, tambahkan style likeButton di bawah ini)
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: "hidden",
    width: 280,
    elevation: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
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
