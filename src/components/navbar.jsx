// src/components/Navbar.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { COLORS } from "../../assets/theme/colors";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const menuItemsAnim = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const toggleMenu = () => {
    const newMenuVisibility = !menuVisible;
    setMenuVisible(newMenuVisibility);

    // Hamburger rotation animation
    Animated.timing(rotateAnim, {
      toValue: newMenuVisibility ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Staggered menu items animation
    if (newMenuVisibility) {
      Animated.stagger(
        100,
        menuItemsAnim.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ),
      ).start();
    } else {
      menuItemsAnim.forEach((anim) => {
        Animated.timing(anim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const spinAnim = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View style={styles.container}>
      {/* Bagian Kiri: Logo */}
      <View style={styles.logoSection}>
        <Image
          source={require("../../assets/images/Logo_Beachify.png")}
          style={styles.logoImage}
        />
      </View>

      {/* Bagian Kanan: Hamburger Menu */}
      <Animated.View style={{ transform: [{ rotate: spinAnim }] }}>
        <TouchableOpacity style={styles.hamburger} onPress={toggleMenu}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>
      </Animated.View>

      {/* Modal Menu */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => toggleMenu()}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => toggleMenu()}
          activeOpacity={1}
        >
          <View style={styles.menuModal}>
            {["About", "Destination", "Contact us"].map((item, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: menuItemsAnim[index],
                  transform: [
                    {
                      translateX: menuItemsAnim[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  style={styles.menuItemModal}
                  onPress={() => toggleMenu()}
                >
                  <Text style={styles.menuTextModal}>{item}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
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
