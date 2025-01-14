import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(map)"
        options={{
          title: "Mapa",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Explorar",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{
          title: "Usuario",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
