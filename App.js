// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/navigation/Router";
import { BeachProvider } from "./src/context/BeachContext";

export default function App() {
  return (
    <BeachProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Router />
      </NavigationContainer>
    </BeachProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
