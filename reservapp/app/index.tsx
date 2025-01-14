import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { HelpSection } from "../components/HelpSection";

export default function index() {
  const router = useRouter();
  useEffect(() => {
    const checkLogIn = async () => {
      const access = await SecureStore.getItemAsync("access");
      if (access) {
        router.replace("/(tabs)/(home)");
      }
    };
    checkLogIn();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a ReservAPP!</Text>
      <View style={styles.section}>
        <Link href="/login" asChild>
          <Pressable>
            <Text style={[styles.button, styles.bgBlue]}>Iniciar sesion</Text>
          </Pressable>
        </Link>
        <Link href="/register" asChild>
          <Pressable>
            <Text style={[styles.button, styles.bgOutline]}>
              No tenes cuenta, registrate
            </Text>
          </Pressable>
        </Link>
      </View>
      <HelpSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2E5077",
    margin: 20,
  },
  section: {
    margin: 20,
  },
  button: {
    margin: 10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
  },
  bgBlue: {
    backgroundColor: "#2E5077",
    color: "white",
  },
  bgOutline: {
    backgroundColor: "white",
    color: "#2E5077",
    borderWidth: 1,
    borderColor: "#2E5077",
  },
});
