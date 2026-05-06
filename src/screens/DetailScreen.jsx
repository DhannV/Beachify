import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";

// PERBAIKAN 1: Hapus import ImageMap karena kita sudah tidak membutuhkannya.

const DetailScreen = ({ route, navigation }) => {
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

  return (
    <View style={styles.container}>
      {/* Tombol Back di Atas Gambar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
      >
        <ArrowLeft color={COLORS.white} size={24} />
      </TouchableOpacity>

      {/* Gambar Full Width di Atas */}
      <Image source={imageSource} style={styles.heroImage} />

      <ScrollView style={styles.contentContainer}>
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
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
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
