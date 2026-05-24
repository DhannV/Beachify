import React, { useState, useRef, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";

// --- IMPORT KOMPONEN ---
import Navbar from "../components/navbar";
import DestinationCard from "../components/destinationcard";
import CategoryFilter from "../components/CategoryFilter";

// --- IMPORT TEMA & DATA ---
import { COLORS } from "../../assets/theme/colors";
import { CategoryList } from "../data/destination";

const API_URL = "https://6a12f17b78d0434e0d5da5f8.mockapi.io/beaches"; // GANTI DENGAN URL MOCKAPI KAMU

const AnimatedCardWrapper = ({ children, delay = 0 }) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const slideInAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
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
        width: "100%",
      }}
    >
      {children}
    </Animated.View>
  );
};

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  // Fungsi GET Data menggunakan Axios dan useCallback sesuai modul
  const fetchBeaches = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setDestinations(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memastikan data di-fetch ulang setiap kali screen ini diakses/fokus kembali
  useFocusEffect(
    useCallback(() => {
      fetchBeaches();
    }, [fetchBeaches]),
  );

  const filteredDestinations =
    selectedCategory === "Popular"
      ? destinations
      : destinations.filter((item) => item.category === selectedCategory);

  return (
    <View style={styles.mainContainer}>
      <Navbar />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Discover Beaches</Text>
          <Text style={styles.subHeader}>Jelajahi semua pantai di Malang</Text>
        </View>

        <CategoryFilter
          categories={CategoryList}
          onSelectCategory={(categoryName) => setSelectedCategory(categoryName)}
        />

        {/* Indikator Loading */}
        {loading ? (
          <View style={{ marginTop: 40 }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text
              style={{
                textAlign: "center",
                color: COLORS.textLight,
                marginTop: 10,
              }}
            >
              Loading beaches...
            </Text>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            {filteredDestinations.length === 0 ? (
              <Text style={{ color: COLORS.textLight, marginTop: 20 }}>
                No beaches found in this category.
              </Text>
            ) : (
              filteredDestinations.map((item, index) => (
                <AnimatedCardWrapper key={item.id} delay={index * 80}>
                  <View style={styles.cardWrapper}>
                    <DestinationCard destination={item} />
                  </View>
                </AnimatedCardWrapper>
              ))
            )}
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 30,
  },
  scrollView: { flex: 1 },
  section: { paddingHorizontal: 20, marginTop: 20, marginBottom: 15 },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: 10,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  cardWrapper: {
    marginBottom: 15,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
});

export default DiscoverScreen;
