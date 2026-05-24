import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";

// PERBAIKAN 1: Hapus import ImageMap karena kita sudah tidak membutuhkannya.

const DetailScreen = ({ route, navigation }) => {
  // Animasi untuk header dan content
  const imageAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const backButtonAnim = useRef(new Animated.Value(0)).current;
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const backButtonScale = useRef(new Animated.Value(1)).current;

  // PERBAIKAN 2: Data dummy disesuaikan agar langsung menampung 'image'
  const destination = route?.params?.destination || {
    title: "Gunung Bromo (Test Mode)",
    price: "Rp.35.000",
    description:
      "Gunung Bromo adalah sebuah gunung berapi aktif di Jawa Timur, Indonesia. Ini adalah teks dummy karena sedang di test langsung.",
    // Masukkan require langsung ke dalam dummy data
    image: require("../../assets/images/tigawarna.png"),
  };

  // PERBAIKAN 3: Langsung panggil destination.image tanpa menggunakan ImageMap
  const imageSource =
    destination.image || require("../../assets/images/tigawarna.png");

  // Screen entrance animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 600,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(backButtonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackPress = () => {
    Animated.timing(backButtonScale, {
      toValue: 0.8,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(backButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
      navigation?.goBack();
    });
  };

  return (
    <View style={styles.container}>
      {/* Tombol Back di Atas Gambar */}
      <Animated.View
        style={[
          styles.backButtonContainer,
          {
            opacity: backButtonAnim,
            transform: [
              {
                scale: backButtonScale.interpolate({
                  inputRange: [0.8, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
      </Animated.View>

      {/* Gambar Full Width di Atas */}
      <Animated.Image
        source={imageSource}
        style={[
          styles.heroImage,
          {
            opacity: imageAnim,
            transform: [
              {
                scale: imageAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.1, 1],
                }),
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: contentAnim,
            transform: [
              {
                translateY: contentAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <ScrollView>
          {/* Row Judul dan Harga - Flexbox Space Between */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{destination.title}</Text>
              <Text style={styles.location}>Jawa Timur, Indonesia</Text>
            </View>
            <Text style={styles.price}>{destination.price}</Text>
          </View>

          {/* Deskripsi */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{destination.description}</Text>

          {/* Tombol Aksi di Bawah */}
          <AnimatedBookButton />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

// Animated Book Button Component
const AnimatedBookButton = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.bookButton}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.bookButtonText}>Read Now</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
    borderRadius: 20,
  },
  heroImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: -30, // Efek tumpang tindih dengan gambar
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  titleRow: {
    flexDirection: "row", // Flexbox: Menyusun judul dan harga menyamping
    justifyContent: "space-between", // Flexbox: Judul di kiri mentok, harga di kanan mentok
    alignItems: "center", // Flexbox: Menyejajarkan secara vertikal di tengah
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  location: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 22,
    marginBottom: 30,
    textAlign: "justify",
  },
  bookButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center", // Flexbox: Teks tombol di tengah
    marginTop: 20,
    marginBottom: 40,
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailScreen;
