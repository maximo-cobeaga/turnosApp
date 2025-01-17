import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, Alert } from "react-native";
import { LocationIcons } from "../icons/LocationIcons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export function LocationSelect() {
  return (
    <>
      <Pressable>
        <View style={styles.container}>
          <View style={styles.image}>
            <LocationIcons />
          </View>
          <Text style={styles.textTitle}>Mar del plata, Buenos Aires</Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 25,
    height: 25,
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2e5077",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalButton: {
    backgroundColor: "#2e5077",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    padding: 10,
    borderRadius: 10,
  },
});
