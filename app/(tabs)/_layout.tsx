import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { theme } from "../constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary, 
        tabBarStyle: {
          height: 0, 
          borderTopWidth: 0,
          paddingBottom: 0, 
        },
        tabBarLabelStyle: { display: 'none' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Scanner", 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Pokédex",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="aperture" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}