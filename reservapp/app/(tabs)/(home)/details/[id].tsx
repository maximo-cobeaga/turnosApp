import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BussinesDetails() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>Esta es la vista detalles: {id}</Text>
    </SafeAreaView>
  );
}
