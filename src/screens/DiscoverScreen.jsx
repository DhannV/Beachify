import React, { useState, useRef, useEffect, useContext } from "react";
import { ScrollView, View, Text, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

// --- IMPORT KOMPONEN ---
import Navbar from "../components/navbar";
import DestinationCard from "../components/destinationcard";
import CategoryFilter from "../components/CategoryFilter";

// --- IMPORT TEMA & DATA ---
import { COLORS } from "../../assets/theme/colors";
import { CategoryList } from "../data/destination";
import { BeachContext } from "../context/BeachContext";

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
        width: "100%",
      }}
    >
      {children}
    </Animated.View>
  );
};

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const { destinations } = useContext(BeachContext);
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  const filteredDestinations =
    selectedCategory === "Popular"
      ? destinations
      : destinations.filter((item) => item.category === selectedCategory);

  return (
    <View style={styles.mainContainer}>
      {/* Navbar */}
      <Navbar />

      {/* Isi konten dengan scroll vertikal */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Discover Beaches</Text>
          <Text style={styles.subHeader}>Jelajahi semua pantai di Malang</Text>
        </View>

        {/* Category Filter */}
        <CategoryFilter
          categories={CategoryList}
          onSelectCategory={(categoryName) => setSelectedCategory(categoryName)}
        />

        {/* Vertical Card Layout - Cards ditampilkan kebawah dengan animasi */}
        <View style={styles.cardContainer}>
          {filteredDestinations.map((item, index) => (
            <AnimatedCardWrapper key={item.id} delay={index * 80}>
              <View style={styles.cardWrapper}>
                <DestinationCard destination={item} />
              </View>
            </AnimatedCardWrapper>
          ))}
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
    paddingTop: 30,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
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
