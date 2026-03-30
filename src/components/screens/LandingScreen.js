// src/screens/LandingScreen.js
import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Navbar from "../navbar";
import Carousel from "../carousel";
import DestinationCard from "../destinationcard";
import { COLORS } from "../../../assets/theme/colors";

// Contoh data untuk destinasi. Nanti bisa diganti dengan require('../assets/images/...)
const popularDestinations = [
  {
    id: "1",
    title: "Alun alun Kota Malang",
    price: "Rp.100.000",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ultrices. Adipiscing.",
    image: require("../../../assets/images/alunalun.png"),
  },
  {
    id: "2",
    title: "Jatim Park",
    price: "Rp.100.000",
    description: "Lorem ipsum dolor sit amet consectetur. Ultrices.",
    image: require("../../../assets/images/jatimpark.png"),
  },
];

const LandingScreen = () => {
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
          <Text style={styles.sectionHeader}>What is “Wilang” ?</Text>
          <View style={styles.descriptionBlock}>
            <Text style={styles.bodyText}>
              Lorem ipsum dolor sit amet consectetur. Tellus adipiscing a
              lacinia lacus nisi aliquet nec mauris pellentesque. Porta varius
              senectus euismod posuere amet elit lobortis tempus augue. Cras et
              pretium velit nisi mattis varius sagittis eget. Non nibh sit
              quisque mi purus est.
            </Text>
            <Text style={styles.bodyText}>
              A suspendisse quis eleifend laoreet tristique vestibulum molestie.
              Lacus pulvinar vulputate viverra adipiscing molestie consectetur
              morbi nisi. Lectus nulla vestibulum diam euismod convallis
              imperdiet in.
            </Text>
            <Text style={styles.bodyText}>
              Sem curabitur tempus vitae bibendum amet ullamcorper. Felis et
              imperdiet a erat nec viverra. Amet morbi arcu erat eget duis nec.
              Ut tincidunt massa accumsan lobortis cras neque egestas tincidunt.
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
          <Text style={styles.sectionHeader}>Popular destinations</Text>
          <Text style={styles.subHeader}>
            Lorem ipsum dolor sit amet consectetur.
          </Text>
        </View>

        {/* ScrollView Horizontal untuk Card Destinasi */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationScrollContainer}
        >
          {popularDestinations.map((item) => (
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
