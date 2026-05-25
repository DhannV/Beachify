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
import { Heart, BookOpen } from "lucide-react-native";

// --- IMPORT SUPABASE CLIENT ---
import { supabase } from "../libs/supabase"; // Pastikan path ke file supabase kamu sudah benar

const DestinationCard = ({ destination, delay = 0 }) => {
  // Ambil data status awal langsung dari object destination Supabase
  const [isLiked, setIsLiked] = useState(destination.is_liked || false);

  // ANIMASI
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const cardScaleAnim = useRef(new Animated.Value(0)).current;
  const cardOpacityAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

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
      navigation.navigate("ReadBeach", { destination });
    });
  };

  // --- MENGUBAH JADI ASYNC UNTUK UPDATE KE SUPABASE ---
  const handleLikePress = async () => {
    const updatedLikedStatus = !isLiked;
    setIsLiked(updatedLikedStatus); // Update UI lokal terlebih dahulu agar terasa cepat (Responsif)

    // Jalankan animasi tombol hati pembesar
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

    if (updatedLikedStatus) {
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

    try {
      // Kirim pembaruan status ke tabel 'beaches' di Supabase
      const { error } = await supabase
        .from("beaches")
        .update({ is_liked: updatedLikedStatus })
        .eq("id", destination.id); // Cari berdasarkan baris ID pantai terkait

      if (error) throw error;
    } catch (error) {
      console.error(
        "Gagal memperbarui status favorit di database:",
        error.message,
      );
      // Jika internet putus / error, kembalikan state UI ke status semula
      setIsLiked(isLiked);
    }
  };

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
      <TouchableOpacity onPress={handleCardPress} activeOpacity={0.9}>
        <Animated.Image
          source={typeof image === "string" ? { uri: image } : image}
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
          <TouchableOpacity onPress={handleLikePress} activeOpacity={0.7}>
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

        {/* Read Now Button */}
        <TouchableOpacity
          style={styles.readNowButton}
          onPress={() => navigation.navigate("ReadBeach", { destination })}
        >
          <BookOpen color={COLORS.white} size={16} />
          <Text style={styles.readNowButtonText}>Read Now</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: "hidden",
    width: 280,
    elevation: 8,
    shadowColor: COLORS.shadow || "#000",
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
  description: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 12,
  },
  likeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  readNowButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  readNowButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default DestinationCard;
