// src/components/WhatsNewCarousel.js
import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Animated,
} from "react-native";

// Kita ambil lebar layar agar carousel menyesuaikan
const { width } = Dimensions.get("window");
// Item width sekitar 80% dari lebar layar agar item sebelahnya kelihatan sedikit
const ITEM_WIDTH = width * 0.75;
const ITEM_GAP = 15;

// Gambar mock untuk contoh. Nanti gunakan require('../assets/images/new_1.jpg')
const MOCK_IMAGES = [
  require("../../assets/images/Pantai_Bengkung.jpg"),
  require("../../assets/images/Pantai_GoaChina.jpg"),
  require("../../assets/images/Pantai_KondangMerak.jpeg"),
  require("../../assets/images/Pantai_TelukAsmara.jpg"),
];

const Carousel = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      // Properti untuk membuat efek "snapping" seperti carousel
      snapToInterval={ITEM_WIDTH + ITEM_GAP}
      decelerationRate="fast"
      contentContainerStyle={styles.container}
    >
      {MOCK_IMAGES.map((imageUri, index) => (
        <CarouselCard key={index} imageUri={imageUri} index={index} />
      ))}
    </ScrollView>
  );
};

// Component untuk setiap kartu carousel dengan animasi
const CarouselCard = ({ imageUri, index }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    // Floating animation - infinite
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

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            {
              scale: scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
            {
              translateY: floatAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              }),
            },
          ],
        },
      ]}
    >
      <Animated.Image
        source={imageUri}
        style={[
          styles.image,
          {
            transform: [
              {
                scale: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05],
                }),
              },
            ],
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: ITEM_GAP, // Padding awal
    paddingRight: ITEM_GAP, // Padding akhir
    paddingVertical: 10,
  },
  card: {
    width: ITEM_WIDTH,
    height: (ITEM_WIDTH * 3) / 4, // Aspect ratio 4:3
    marginRight: ITEM_GAP,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 4, // Bayangan
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: "hidden", // Agar gambar melengkung sesuai card
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default Carousel;
