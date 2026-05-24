import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ArrowLeft, Share2, Heart, Edit3, Trash2 } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";
import axios from "axios";

const API_URL = "https://6a12f17b78d0434e0d5da5f8.mockapi.io/beaches"; // GANTI DENGAN URL MOCKAPI KAMU

const ReadBeachScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fungsi DELETE Data menggunakan Axios
  const handleDelete = () => {
    Alert.alert("Delete Beach", "Are you sure you want to delete this beach?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setDeleting(true);
            await axios.delete(`${API_URL}/${destination.id}`);
            Alert.alert("Deleted", "Beach has been deleted successfully.", [
              {
                text: "OK",
                onPress: () =>
                  navigation.navigate("MainApp", { screen: "Discover" }),
              },
            ]);
          } catch (error) {
            console.error("Error deleting: ", error);
            Alert.alert("Error", "Failed to delete this beach.");
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
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
        {/* Menggunakan uri online jika data dari API berupa string URL */}
        <Image
          source={
            typeof destination.image === "string"
              ? { uri: destination.image }
              : destination.image
          }
          style={styles.beachImage}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About This Beach</Text>
            <Text style={styles.sectionContent}>{destination.description}</Text>
          </View>

          {destination.funFacts && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎯 Fun Facts</Text>
              <Text style={styles.sectionContent}>{destination.funFacts}</Text>
            </View>
          )}

          {/* ================= BUTTONS FOR EDIT & DELETE ================= */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditBeach", { destination })}
            >
              <Edit3 color={COLORS.white} size={18} />
              <Text style={styles.actionButtonText}>Edit Beach</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Trash2 color={COLORS.white} size={18} />
                  <Text style={styles.actionButtonText}>Delete</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
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
  scrollContainer: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  beachImage: { width: "100%", height: 250 },
  infoContainer: { padding: 20 },
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
  category: { fontSize: 14, color: COLORS.textLight, fontWeight: "500" },
  likeButton: { padding: 8 },
  priceTag: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 20,
  },
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  sectionContent: { fontSize: 14, color: COLORS.textDark, lineHeight: 22 },
  // Style tambahan untuk tombol aksi REST API
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    justifyContent: "space-between",
  },
  editButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#E53935",
    flexDirection: "row",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionButtonText: { color: COLORS.white, fontWeight: "bold", fontSize: 14 },
});

export default ReadBeachScreen;
