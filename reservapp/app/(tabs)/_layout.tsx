import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2e5077",
      }}
    >
      <Tabs.Screen
        name="(map)"
        options={{
          title: "Mapa",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="map" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Explorar",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="(books)"
        options={{
          title: "Mis reservas",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{
          title: "Usuario",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
