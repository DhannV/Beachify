import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MapPin, Users, Heart } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";

// --- IMPORT SUPABASE CLIENT ---
import { supabase } from "../libs/supabase"; // Pastikan path ke folder libs sudah benar

// --- IMPORT KOMPONEN ---
import DestinationCard from "../components/destinationcard";
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
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    let interval;
    let currentValue = 0;
    const increment = finalValue > 0 ? finalValue / 30 : 1;

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
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [totalBeaches, setTotalBeaches] = useState(0);
  const [loading, setLoading] = useState(true);
  const screenFadeAnim = useRef(new Animated.Value(0)).current;

  // Screen-level Fade In Animation
  useEffect(() => {
    Animated.timing(screenFadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // --- Fungsi mengambil data Terbatas dari Supabase (Dicocokkan dengan Discover) ---
  const fetchFeaturedBeaches = useCallback(async () => {
    try {
      setLoading(true);

      // 1. Ambil 3 data pantai terbaru untuk Featured Section
      const { data: featuredData, error: featuredError } = await supabase
        .from("beaches")
        .select("*")
        .order("id", { ascending: false })
        .limit(3); // Membatasi hanya mengambil 3 item teratas

      if (featuredError) throw featuredError;
      setFeaturedDestinations(featuredData || []);

      // 2. Ambil total jumlah baris pantai untuk counter Quick Stats
      const { count, error: countError } = await supabase
        .from("beaches")
        .select("*", { count: "exact", head: true });

      if (countError) throw countError;
      setTotalBeaches(count || 0);
    } catch (error) {
      console.error(
        "Error fetching data from Supabase in Home: ",
        error.message,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Memastikan data ter-update setiap kali screen fokus kembali
  useFocusEffect(
    useCallback(() => {
      fetchFeaturedBeaches();
    }, [fetchFeaturedBeaches]),
  );

  return (
    <Animated.View style={[styles.mainContainer, { opacity: screenFadeAnim }]}>
      <Navbar />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Section 1: Hero / What is Beachify --- */}
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

        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Discover")}>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Loading / List Render */}
        {loading ? (
          <ActivityIndicator
            size="small"
            color={COLORS.primary}
            style={{ marginVertical: 20 }}
          />
        ) : (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container1}
          >
            {featuredDestinations.length === 0 ? (
              <Text style={{ color: COLORS.textLight, paddingHorizontal: 20 }}>
                Belum ada data pantai.
              </Text>
            ) : (
              featuredDestinations.map((item, index) => (
                <AnimatedCardWrapper key={item.id} delay={index * 100}>
                  <View
                    style={{
                      flexGrow: 1,
                      flexShrink: 1,
                      marginRight:
                        index !== featuredDestinations.length - 1 ? 20 : 0,
                    }}
                  >
                    {/* Menggunakan DestinationCard yang sudah kita perbaiki gambarnya kemarin */}
                    <DestinationCard destination={item} delay={index * 100} />
                  </View>
                </AnimatedCardWrapper>
              ))
            )}
          </ScrollView>
        )}

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

        <View style={{ height: 30 }} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 30,
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
    shadowColor: COLORS.shadow || "#000",
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
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 10,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
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
  descriptionBlock: {
    paddingHorizontal: 10,
  },
  bodyText: {
    fontSize: 14,
    color: COLORS.textDark,
    textAlign: "justify",
    lineHeight: 20,
    marginBottom: 15,
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
  container1: {
    paddingLeft: ITEM_GAP + 5,
    paddingRight: ITEM_GAP,
    paddingVertical: 10,
  },
});

export default Home;
