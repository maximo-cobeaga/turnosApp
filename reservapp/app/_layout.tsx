import { AuthProvider } from "@/context/AuthContext";
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tabs.Screen
          name="login"
          options={{
            headerShown: false,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            headerShown: false,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tabs.Screen
          name="confirmacion"
          options={{
            headerShown: false,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tabs.Screen
          name="pruebaForm"
          options={{
            headerShown: true,
            tabBarStyle: {
              display: "flex",
            },
          }}
        />
        <Tabs.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
      </Tabs>
    </AuthProvider>
  );
}
