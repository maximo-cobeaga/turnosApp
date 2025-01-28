import React from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
} from "react-native";
import { OkIcon } from "../../../components/icons/OkIcon";

export default function success() {
  return (
    <SafeAreaView
      style={{
        margin: 20,
        flex: 1,
        justifyContent: "center",

        gap: 50,
      }}
    >
      <View
        style={{
          gap: 10,
          alignItems: "center",
        }}
      >
        <View style={{ height: 70, width: 70 }}>
          <OkIcon />
        </View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#2e5077",
            textAlign: "center",
          }}
        >
          ¡Felicidades!
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#2e5077",
            textAlign: "center",
          }}
        >
          Tu reserva se realizo correctamente
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#2e5077",
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          ¡Ahora puedes{" "}
          <Text style={{ fontWeight: "bold" }}>pagar tu reserva</Text> con el
          método que prefieras y disfrutar del servicios!
        </Text>
      </View>
      <View
        style={{
          gap: 20,
        }}
      >
        <Pressable>
          <Text style={[styles.button, styles.bgBlue]}>Ir a pagar</Text>
        </Pressable>
        <Pressable>
          <Text style={[styles.button, styles.outline]}>Ver mis reservas</Text>
        </Pressable>
        <Pressable>
          <Text style={[styles.button, styles.outline]}>Volver al inicio</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 15,
    borderRadius: 10,
    textAlign: "center",
  },
  bgBlue: {
    backgroundColor: "#2e5077",
    color: "#fff",
  },
  outline: {
    borderWidth: 2,

    borderColor: "#2e5077",
    color: "#2e5077",
  },
});
