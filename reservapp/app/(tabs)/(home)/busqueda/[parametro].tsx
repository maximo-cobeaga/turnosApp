import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { FlatList, View, Text, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function BuscaParametro() {
  const { parametro } = useLocalSearchParams();
  const { bussines } = useAuth();

  useEffect(() => {
    bussines.filter();
  }, [parametro]);

  return (
    <SafeAreaView>
      <Text>esta es la busqueda</Text>
    </SafeAreaView>
  );
}
