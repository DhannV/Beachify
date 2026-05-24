import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { ArrowLeft, Share2, Heart } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";

/**
 * ReadBeachScreen - Screen untuk membaca detail pantai
 * BAB 7: Handling Text Input & Display
 */
const ReadBeachScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Header dengan Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{destination.title}</Text>
        <TouchableOpacity>
          <Share2 color={COLORS.white} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Beach Image */}
        <Image
          source={destination.image}
          style={styles.beachImage}
          resizeMode="cover"
        />

        {/* Beach Info Section */}
        <View style={styles.infoContainer}>
          {/* Title & Price */}
          <View style={styles.titlePriceRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.beachTitle}>{destination.title}</Text>
              <Text style={styles.category}>{destination.category}</Text>
            </View>
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => setIsLiked(!isLiked)}
            >
              <Heart
                color={isLiked ? COLORS.accent : COLORS.textLight}
                fill={isLiked ? COLORS.accent : "transparent"}
                size={24}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.priceTag}>{destination.price}</Text>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About This Beach</Text>
            <Text style={styles.sectionContent}>{destination.description}</Text>
          </View>

          {/* Fun Facts Section */}
          {destination.funFacts && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎯 Fun Facts</Text>
              <Text style={styles.sectionContent}>{destination.funFacts}</Text>
            </View>
          )}

          {/* Highlights Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Beach Highlights</Text>
            <View style={styles.highlightsContainer}>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightEmoji}>🌊</Text>
                <Text style={styles.highlightText}>Clear Water</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightEmoji}>🏖️</Text>
                <Text style={styles.highlightText}>Sandy Beach</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightEmoji}>🌅</Text>
                <Text style={styles.highlightText}>Great Sunset</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightEmoji}>🍽️</Text>
                <Text style={styles.highlightText}>Local Food</Text>
              </View>
            </View>
          </View>

          {/* Tips Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Travel Tips</Text>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>
                Best time to visit: Early morning or late afternoon
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>
                Bring sunscreen and stay hydrated
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>
                Local restaurants nearby serve fresh seafood
              </Text>
            </View>
          </View>

          {/* Call to Action */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Planning to Visit?</Text>
            <Text style={styles.ctaText}>
              Check the weather forecast and local conditions before your visit.
              Don't forget to capture beautiful moments! 📸
            </Text>
          </View>

          {/* Bottom Spacing */}
          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 15,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  beachImage: {
    width: "100%",
    height: 250,
  },
  infoContainer: {
    padding: 20,
  },
  titlePriceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  beachTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  likeButton: {
    padding: 8,
  },
  priceTag: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 22,
  },
  highlightsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  highlightItem: {
    width: "48%",
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  highlightEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textDark,
    textAlign: "center",
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  tipBullet: {
    fontSize: 16,
    color: COLORS.primary,
    marginRight: 10,
    fontWeight: "bold",
  },
  tipText: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
    flex: 1,
  },
  ctaText: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 22,
    fontStyle: "italic",
  },
});

export default ReadBeachScreen;
