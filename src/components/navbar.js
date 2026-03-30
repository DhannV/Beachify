// src/components/Navbar.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { COLORS } from "../../assets/theme/colors";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Bagian Kiri: Logo */}
      <View style={styles.logoSection}>
        <Image
          source={require("../../assets/images/logowilang.png")}
          style={styles.logoImage}
        />
      </View>

      {/* Bagian Kanan: Hamburger Menu */}
      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
      </TouchableOpacity>

      {/* Modal Menu */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.menuModal}>
            <TouchableOpacity
              style={styles.menuItemModal}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.menuTextModal}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItemModal}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.menuTextModal}>Destination</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItemModal}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.menuTextModal}>Contact us</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  hamburger: {
    padding: 10,
    justifyContent: "space-around",
    width: 40,
    height: 40,
  },
  hamburgerLine: {
    width: 25,
    height: 3,
    backgroundColor: COLORS.textDark,
    borderRadius: 2,
    marginVertical: 3,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    marginTop: 35, // Agar modal muncul tepat di bawah navbar
  },
  menuModal: {
    backgroundColor: COLORS.white,

    elevation: 5, // ← Android shadow
    shadowColor: COLORS.shadow, // ← iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // ← iOS shadow offset
    shadowOpacity: 0.15, // ← iOS shadow opacity
    shadowRadius: 4, // ← iOS shadow blur
  },
  menuItemModal: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuTextModal: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textDark,
  },
});

export default Navbar;
