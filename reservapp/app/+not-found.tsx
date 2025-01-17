import React from "react";
import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Opps! this screen doesnt exist!" }} />
      <View>
        <Link href="/(tabs)/(home)">Volver al inicio</Link>
      </View>
    </>
  );
}
