// src/components/Navbar.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Menu,
  X,
  Compass,
  Heart,
  User,
  ChevronRight,
} from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";

// Mengambil lebar layar HP pengguna untuk kalkulasi animasi slide dari kanan
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.75; // Lebar menu samping (75% dari lebar layar)

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  // Ref Animasi
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current; // 0 = Tertutup (di luar layar), 1 = Terbuka

  const toggleMenu = () => {
    if (menuVisible) {
      // Animasi Menutup (Slide keluar ke arah kanan)
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => setMenuVisible(false));
    } else {
      // Tampilin modal dulu, baru jalankan Animasi Masuk (Slide dari kanan ke kiri)
      setMenuVisible(true);
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleMenuPress = (targetScreen) => {
    toggleMenu();
    if (targetScreen === "Discover") {
      navigation.navigate("Discover");
    } else if (targetScreen === "Liked") {
      navigation.navigate("Liked");
    } else if (targetScreen === "Profile") {
      navigation.navigate("Profile");
    }
  };

  // Interpolasi rotasi tombol hamburger ke silang
  const spinIcon = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  // Interpolasi posisi Slide: dimulai dari luar layar kanan (SIDEBAR_WIDTH) menuju posisi pas (0)
  const menuXTranslation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SIDEBAR_WIDTH, 0],
  });

  const menuItems = [
    { name: "Discover", label: "Jelajahi Pantai Malang", icon: Compass },
    { name: "Liked", label: "Pantai Favorit Kamu", icon: Heart },
    { name: "Profile", label: "Pengaturan Akun", icon: User },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Bagian Kiri: Logo & Nama */}
        <TouchableOpacity
          style={styles.logoSection}
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.8}
        >
          <Image
            source={require("../../assets/images/Logo_Beachify.png")}
            style={styles.logoImage}
          />
        </TouchableOpacity>

        {/* Bagian Kanan: Tombol Hamburger */}
        <Animated.View style={{ transform: [{ rotate: spinIcon }] }}>
          <TouchableOpacity
            style={styles.hamburgerButton}
            onPress={toggleMenu}
            activeOpacity={0.7}
          >
            <Menu color={COLORS.primary} size={26} />
          </TouchableOpacity>
        </Animated.View>

        {/* Sidebar Menu Modal */}
        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="none"
          onRequestClose={toggleMenu}
        >
          {/* Overlay Gelap di Background */}
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={toggleMenu}
            activeOpacity={1}
          >
            {/* Kontainer Sidebar yang Muncul dari Samping Kanan */}
            <Animated.View
              style={[
                styles.sidebarContainer,
                {
                  transform: [{ translateX: menuXTranslation }],
                },
              ]}
              // Mencegah klik di dalam sidebar menutup menu secara tidak sengaja
              onTouchStart={(e) => e.stopPropagation()}
            >
              {/* Bagian Atas Sidebar: Header & Tombol Close */}
              <View style={styles.sidebarHeader}>
                <Text style={styles.sidebarTitle}>Menu Navigasi</Text>
                <TouchableOpacity
                  onPress={toggleMenu}
                  style={styles.closeButton}
                >
                  <X color={COLORS.primary} size={24} />
                </TouchableOpacity>
              </View>

              {/* List Menu Items */}
              <View style={styles.menuList}>
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.menuItemRow}
                      onPress={() => handleMenuPress(item.name)}
                    >
                      <View style={styles.leftItemContent}>
                        <IconComponent
                          color={COLORS.accent}
                          size={22}
                          style={styles.menuIcon}
                        />
                        <View style={styles.itemTextGroup}>
                          <Text style={styles.menuMainText}>{item.name}</Text>
                          <Text style={styles.menuSubText}>{item.label}</Text>
                        </View>
                      </View>
                      <ChevronRight color={COLORS.textLight} size={16} />
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Footer kecil di dalam sidebar agar estetik */}
              <View style={styles.sidebarFooter}>
                <Text style={styles.footerText}>Beachify App v1.0</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
    paddingTop: 30, // Menghindari status bar/notch atas HP
  },
  container: {
    height: 65,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    zIndex: 999,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 38,
    height: 38,
    marginRight: 8,
    borderRadius: 19,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  hamburgerButton: {
    padding: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Memberikan efek blur/gelap lembut di background kiri
    flexDirection: "row",
    justifyContent: "flex-end", // Memaksa konten modal merapat ke ujung kanan layar
  },
  sidebarContainer: {
    width: SIDEBAR_WIDTH,
    height: "100%",
    backgroundColor: COLORS.white,
    paddingTop: 50, // Memberikan ruang di bagian atas dalam sidebar
    paddingHorizontal: 20,
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  closeButton: {
    padding: 4,
    backgroundColor: "#f7f9fa",
    borderRadius: 8,
  },
  menuList: {
    marginTop: 20,
    flex: 1,
  },
  menuItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#fbfbfb",
  },
  leftItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    marginRight: 15,
  },
  itemTextGroup: {
    flex: 1,
  },
  menuMainText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
  },
  menuSubText: {
    fontSize: 12,
    color: "#718096",
    marginTop: 2,
  },
  sidebarFooter: {
    paddingBottom: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#a0aec0",
  },
});

export default Navbar;
