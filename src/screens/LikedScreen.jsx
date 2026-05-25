import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Heart } from "lucide-react-native";
import { COLORS } from "../../assets/theme/colors";
import Navbar from "../components/navbar";

// --- IMPORT SUPABASE CLIENT ---
import { supabase } from "../libs/supabase";

const LikedScreen = () => {
  const navigation = useNavigation();
  const [likedBeaches, setLikedBeaches] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fungsi mengambil data pantai yang di-like dari Supabase ---
  const fetchLikedBeaches = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("beaches")
        .select("*")
        .eq("is_liked", true) // Filter: Hanya ambil yang nilai is_liked bernilai TRUE
        .order("id", { ascending: false });

      if (error) throw error;
      setLikedBeaches(data || []);
    } catch (error) {
      console.error("Error fetching liked beaches: ", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memastikan data ter-refresh otomatis tiap kali pengguna membuka halaman ini
  useFocusEffect(
    useCallback(() => {
      fetchLikedBeaches();
    }, [fetchLikedBeaches]),
  );

  // --- Fungsi untuk un-like langsung dari halaman LikedScreen ---
  const handleRemoveLike = async (id) => {
    try {
      // Hapus dari list di layar lokal terlebih dahulu demi UX yang responsif
      setLikedBeaches(likedBeaches.filter((beach) => beach.id !== id));

      const { error } = await supabase
        .from("beaches")
        .update({ is_liked: false })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Gagal menghapus like:", error.message);
      fetchLikedBeaches(); // Ambil ulang data asli jika gagal jaringan
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Liked Beaches</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {likedBeaches.length === 0 ? (
            <Text style={styles.emptyText}>
              Belum ada pantai yang kamu sukai.
            </Text>
          ) : (
            likedBeaches.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.listItem}
                onPress={() =>
                  navigation.navigate("ReadBeach", { destination: item })
                }
              >
                <Image
                  source={
                    typeof item.image === "string"
                      ? { uri: item.image }
                      : item.image
                  }
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemLocation}>
                    {item.category || "Pantai Malang"}
                  </Text>
                </View>

                {/* Tombol Hati untuk Un-like */}
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => handleRemoveLike(item.id)}
                >
                  <Heart color={COLORS.accent} fill={COLORS.accent} size={24} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
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
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: "#f0f0f0",
  },
  itemDetails: {
    flex: 1,
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
  emptyText: {
    textAlign: "center",
    color: COLORS.textLight,
    marginTop: 40,
    fontSize: 14,
  },
});

export default LikedScreen;
