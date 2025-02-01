import { View, Text, SafeAreaView } from "react-native";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { LogInForm } from "../components/LogInForm";
import { useEffect } from "react";

export default function login() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await SecureStore.getItemAsync("access");
      if (token) {
        router.replace("/");
      }
      checkLoginStatus();
    };
  }, []);
  return <LogInForm />;
}
