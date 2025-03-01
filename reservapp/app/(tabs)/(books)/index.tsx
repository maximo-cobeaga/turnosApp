import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  RefreshControl,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { obtainBooks } from "../../../api/serviciosAPI";
import { obtainPairRefresh } from "../../../api/userAPI";
import * as SecureStore from "expo-secure-store";
import { CardBook } from "../../../components/books/CardBook";
import { useAuth } from "@/context/AuthContext";

export interface Book {
  bussines: {
    id: number;
    nombre: string;
    latitud: number;
    longitud: number;
    codigo_postal: number;
    categoria: number;
    direccion: string;
    image: string;
  };
  servicio: {
    id: number;
    tiempo: number;
    nombre: string;
    precio: number;
    bussines: number;
  };
  prestador: {
    id: number;
    nombre: string;
    apertura: string;
    cierre: string;
    bussines: number;
  };
  fecha: string;
  hora: string;
  nota: string | null;
}

export default function index() {
  const { books, refreshBooks } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const refreshFunction = () => {
    refreshBooks();
    console.log(books[1].fecha);
    console.log(books[1].hora);
    console.log();
  };

  return (
    <SafeAreaView
      style={{
        margin: 20,
      }}
    >
      <Text style={styles.title}>Mis reservas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2e5077" />
      ) : (
        <FlatList
          data={books.filter(
            (b) => Date.parse(`${b.fecha}T${b.hora}`) > Date.now()
          )}
          ListEmptyComponent={
            <View style={{ margin: 20, gap: 20 }}>
              <Text
                style={{
                  color: "#2e5077",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                No hay reservas disponibles
              </Text>
              <Pressable
                onPress={() => refreshFunction()}
                style={[
                  styles.button,
                  {
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#2e5077",
                  },
                ]}
              >
                <Text style={[styles.btnText, { color: "#2e5077" }]}>
                  Actualizar
                </Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text style={styles.btnText}>Ir al mapa</Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text style={styles.btnText}>Ir a explorar</Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text style={styles.btnText}>Ir a historial de reservas</Text>
              </Pressable>
            </View>
          }
          style={{ marginVertical: 20 }}
          contentContainerStyle={{ gap: 10 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshFunction()}
            />
          }
          renderItem={({ item, index }) => <CardBook {...item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2e5077",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#2e5077",
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
