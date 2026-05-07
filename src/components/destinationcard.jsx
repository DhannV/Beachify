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
const DestinationCard = ({ destination, delay = 0 }) => {
  // Menerapkan STATE: Mengingat apakah kartu ini disukai atau tidak
  const [isLiked, setIsLiked] = useState(false);

  // ANIMASI LIKE BUTTON: Scale animation
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const cardScaleAnim = useRef(new Animated.Value(0)).current;
  const cardOpacityAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // HOOK NAVIGASI: Ambil navigation dari useNavigation
  const navigation = useNavigation();

  // Staggered entrance animation untuk card
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(cardScaleAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacityAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation untuk image - infinite
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Fungsi untuk handle card press - navigate ke DetailScreen dengan scale animation
  const handleCardPress = () => {
    Animated.timing(cardScaleAnim, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(cardScaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
      navigation.navigate("Detail", { destination });
    });
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
          opacity: cardOpacityAnim,
          transform: [
            {
              scale: cardScaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity onPress={handleCardPress}>
        <Animated.Image
          source={image}
          style={[
            styles.image,
            {
              transform: [
                {
                  translateY: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -8],
                  }),
                },
              ],
            },
          ]}
        />

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
      </TouchableOpacity>

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
