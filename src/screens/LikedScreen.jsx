import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Heart } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors"; // Sesuaikan path

const LikedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Liked Beaches</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* List Item 1 - Flexbox Row */}
        <TouchableOpacity style={styles.listItem}>
          <Image
            source={require("../../assets/images/tigawarna.png")} // Sesuaikan nama gambarmu
            style={styles.itemImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>Pantai Tiga Warna</Text>
            <Text style={styles.itemLocation}>Malang Selatan</Text>
          </View>
          <View style={styles.iconContainer}>
            <Heart color={COLORS.accent} fill={COLORS.accent} size={24} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row", // BAB 4: Mengatur susunan dari kiri ke kanan
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 12,
    marginBottom: 16,
    alignItems: "center", // BAB 4: Rata tengah vertikal
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1, // BAB 4: Teks mengambil sisa ruang yang kosong di tengah
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  itemLocation: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  iconContainer: {
    padding: 10,
  },
});

export default LikedScreen;
