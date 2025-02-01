import { CardBook } from "@/components/books/CardBook";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from "react-native";

export default function historial() {
  const { books, refreshBooks } = useAuth();
  return (
    <SafeAreaView style={{ margin: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "#2e5077" }}>
        Historial de reservas
      </Text>
      <FlatList
        data={books}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => refreshBooks()} />
        }
        ListEmptyComponent={<Text>No has realizado ninguna reserva</Text>}
        renderItem={({ item }) => <CardBook {...item} />}
        style={{ marginVertical: 20 }}
      />
    </SafeAreaView>
  );
}
