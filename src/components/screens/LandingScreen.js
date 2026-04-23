import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";

// --- IMPORT KOMPONEN ---
// Pastikan huruf besar/kecil dan jalurnya sesuai dengan file di foldermu
import Navbar from "../navbar";
import Carousel from "../carousel";
import DestinationCard from "../destinationcard";
import CategoryFilter from "../CategoryFilter"; // Komponen filter kategori baru

// --- IMPORT TEMA & DATA ---
import { COLORS } from "../../../assets/theme/colors";
// Sesuaikan jumlah titik (../) di bawah ini dengan letak folder data kamu
import { CategoryList, DestinationList } from "../../data/destination";

const LandingScreen = () => {
  // Menerapkan STATE: Mengingat kategori apa yang sedang dipilih (Default: Popular)
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  // Logika Filter: Jika "Popular", tampilkan semua. Jika tidak, filter sesuai kategori.
  const filteredDestinations =
    selectedCategory === "Popular"
      ? DestinationList
      : DestinationList.filter((item) => item.category === selectedCategory);

  return (
    <View style={styles.mainContainer}>
      {/* 1. Navbar tetap di atas */}
      <Navbar />

      {/* 2. Isi konten bisa di-scroll secara vertikal */}
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

        {/* --- Section 2: Whats New? (Isi Landing Page) --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Whats new ?</Text>
        </View>
        {/* Carousel ditaruh di luar padding section agar gambarnya mentok ke pinggir layar */}
        <Carousel />

        {/* --- Section 3: Popular Destinations --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Popular Destinations</Text>
          <Text style={styles.subHeader}>Pantai Populer di Malang</Text>
        </View>

        {/* Menerapkan PROPS pada CategoryFilter */}
        <CategoryFilter
          categories={CategoryList}
          onSelectCategory={(categoryName) => setSelectedCategory(categoryName)}
        />

        {/* ScrollView Horizontal untuk Card Destinasi yang sudah difilter state */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationScrollContainer}
        >
          {filteredDestinations.map((item) => (
            // Menerapkan PROPS pada DestinationCard
            <DestinationCard
              key={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              imageSource={item.image}
            />
          ))}
        </ScrollView>

        {/* Padding bawah agar konten terakhir tidak mentok */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 30,
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
});

export default LandingScreen;
