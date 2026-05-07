import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MapPin, Users, Heart, TrendingUp } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";
import DestinationCard from "../components/destinationcard";
import { DestinationList } from "../data/destination";
import Carousel from "../components/carousel";
import Navbar from "../components/navbar";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.75;
const ITEM_GAP = 15;

// Component untuk Stats dengan Animasi Counter
const AnimatedStatCard = ({ icon: Icon, finalValue, label }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Counter animation - count dari 0 ke finalValue
    let interval;
    let currentValue = 0;
    const increment = finalValue / 30; // 30 frames untuk animasi

    interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        setDisplayValue(finalValue);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(currentValue));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [finalValue]);

  return (
    <Animated.View
      style={[
        styles.statCard,
        {
          opacity: fadeInAnim,
          transform: [
            {
              translateY: fadeInAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Icon color={COLORS.accent} size={28} />
      <Text style={styles.statNumber}>
        {label === "Pengunjung"
          ? `${(displayValue / 1000).toFixed(1)}K`
          : displayValue}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
};

// Component untuk Card dengan Entry Animation
const AnimatedCardWrapper = ({ children, delay = 0 }) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const slideInAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideInAnim, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay]);

  return (
    <Animated.View
      style={{
        opacity: fadeInAnim,
        transform: [{ translateY: slideInAnim }],
      }}
    >
      {children}
    </Animated.View>
  );
};

// Component untuk CTA Button dengan Pulse Animation
const PulseButton = ({ onPress, text }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation - infinite
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
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
    onPress();
  };

  return (
    <Animated.View
      style={[
        { transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }] },
      ]}
    >
      <TouchableOpacity
        style={styles.ctaButton}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.ctaButtonText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const [greeting, setGreeting] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const screenFadeAnim = useRef(new Animated.Value(0)).current;

  // Screen-level Fade In Animation
  useEffect(() => {
    Animated.timing(screenFadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Greeting berdasarkan waktu
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Pagi");
    } else if (hour < 18) {
      setGreeting("Siang");
    } else {
      setGreeting("Malam");
    }
  }, []);

  // Get top 3 featured destinations (pertama 3 dari list)
  const featuredDestinations = DestinationList.slice(0, 3);

  return (
    <View style={styles.mainContainer}>
      <Navbar />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Section 1: Hero / What is Wilang --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>What is Beachify</Text>

          <View style={styles.descriptionBlock}>
            <Text style={styles.bodyText}>
              Beachify adalah aplikasi yang dirancang untuk membantu kamu
              menemukan berbagai rekomendasi pantai terbaik di Malang dengan
              mudah dan praktis. Malang dikenal memiliki banyak pantai indah
              dengan karakteristik yang berbeda, mulai dari pasir putih yang
              lembut hingga tebing dan ombak yang eksotis, dan Beachify hadir
              untuk merangkum semuanya dalam satu platform.
            </Text>
            <Text style={styles.bodyText}>
              Melalui Beachify, pengguna dapat menjelajahi berbagai pilihan
              pantai lengkap dengan informasi penting seperti deskripsi, harga
              tiket masuk, dan gambaran suasana tempat. Dengan tampilan yang
              sederhana dan interaktif, aplikasi ini memudahkan pengguna dalam
              mencari destinasi sesuai preferensi, baik untuk liburan santai,
              berburu foto, maupun petualangan alam.
            </Text>
            <Text style={styles.bodyText}>
              Dengan Beachify, merencanakan perjalanan ke pantai di Malang
              menjadi lebih efisien dan menyenangkan. Aplikasi ini menjadi teman
              perjalanan yang tepat untuk membantu kamu menemukan keindahan
              tersembunyi dan menikmati liburan yang tak terlupakan.
            </Text>
          </View>
        </View>
        <Carousel />
        {/* Quick Stats Section */}
        <View style={styles.statsSection}>
          <AnimatedStatCard
            icon={MapPin}
            finalValue={DestinationList.length}
            label="Pantai"
          />
          <AnimatedStatCard icon={Heart} finalValue={0} label="Favorit" />
          <AnimatedStatCard icon={Users} finalValue={2500} label="Pengunjung" />
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Discover")}>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container1}
        >
          {featuredDestinations.map((item, index) => (
            <AnimatedCardWrapper key={item.id} delay={index * 100}>
              <View
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  marginRight:
                    index !== featuredDestinations.length - 1 ? 20 : 0,
                }}
              >
                <DestinationCard destination={item} delay={index * 100} />
              </View>
            </AnimatedCardWrapper>
          ))}
        </ScrollView>

        {/* CTA Section - Jelajahi Lebih Banyak */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Temukan Pantai Lain!</Text>
            <Text style={styles.ctaSubtitle}>
              Jelajahi kategori pantai berbeda dan temukan favorit mu
            </Text>
            <PulseButton
              onPress={() => navigation.navigate("Discover")}
              text="Jelajahi →"
            />
          </View>
        </View>

        {/* Padding bawah */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 5,
  },
  subGreetingText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  headerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  scrollView: {
    flex: 1,
  },
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    flex: 1,
  },
  seeAllText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: "600",
  },
  featuredScrollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 15,
  },
  popularCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    flexDirection: "row",
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  popularCardImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  popularCardContent: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  popularCardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  popularCardPrice: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.accent,
  },
  ctaSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ctaCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 13,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 15,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background, // Sedikit abu-abu muda
    paddingTop: 30, // Menyesuaikan Status Bar (tergantung setup proyek)
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary, // Hijau tua
    textAlign: "center", // Desain aslimu tampaknya center alignment
    marginVertical: 10,
  },
  descriptionBlock: {
    paddingHorizontal: 10,
  },
  bodyText: {
    fontSize: 14,
    color: COLORS.textDark,
    textAlign: "justify", // Agar rapi
    lineHeight: 20,
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: 10,
  },
  destinationScrollContainer: {
    paddingLeft: 20, // Agar ada jarak awal
    paddingVertical: 15, // Ruang untuk bayangan
  },
  container1: {
    paddingLeft: ITEM_GAP, // Padding awal
    paddingRight: ITEM_GAP, // Padding akhir
    paddingVertical: 10,
  },
  card1: {
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
});

export default Home;
