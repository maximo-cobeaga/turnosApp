import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
// COMPONENTS
import { LinkButton } from "../../../components/user/LinkButton";
import { FeSpotLight } from "react-native-svg";

export default function index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogIn = async () => {
      const access = await SecureStore.getItemAsync("access");
    };
    checkLogIn();
  }, []);

  const logOut = async () => {
    await SecureStore.deleteItemAsync("access");
    Alert.alert("Exito!", "Se cerro sesion correctamente");
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#2e5077",
        }}
      >
        Gestiona tu cuenta
      </Text>
      <View style={styles.viewButtons}>
        <LinkButton title={"Historial de reservas"} section={""} />
        <LinkButton title={"Mis favoritos"} section={""} />
        <LinkButton title={"Centro de ayuda"} section={""} />
        <LinkButton title={"Terminos y condiciones"} section={""} />
      </View>
      <Pressable onPress={logOut}>
        <Text style={styles.button}>Cerrar sesion</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    gap: 50,
  },
  viewButtons: {
    gap: 20,
  },
  viewPar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  button: {
    backgroundColor: "red",

    color: "white",
    padding: 20,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 10,
  },
});
