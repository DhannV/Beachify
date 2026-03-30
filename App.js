// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
// Import LandingScreen
import LandingScreen from "./src/components/screens/LandingScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Tampilkan halaman landing */}
      <LandingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
