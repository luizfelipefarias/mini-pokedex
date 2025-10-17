import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { theme } from "./constants/theme";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Orbitron-Regular": require("./assets/fonts/Orbitron-Regular.ttf"),
    "Orbitron-Bold": require("./assets/fonts/Orbitron-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" />
    </Stack>
  );
}
