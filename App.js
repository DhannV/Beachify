// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/navigation/Router";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Router />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
