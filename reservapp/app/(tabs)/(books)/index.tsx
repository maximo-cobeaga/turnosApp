import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { getBooks } from "../../../api/serviciosAPI";
import { obtainPairRefresh } from "../../../api/userAPI";
import * as SecureStore from "expo-secure-store";
import { CardBook } from "../../../components/books/CardBook";

export interface Book {
  bussines: {
    id: number;
    nombre: string;
    latitud: number;
    longitud: number;
    codigo_postal: number;
    categoria: 1;
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
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [refreshing, setRefreshing] = useState(false);

  const obtainBooks = async (access: string) => {
    try {
      const response = await getBooks(access);
      if (response?.data?.books) {
        setBooks(response.data.books);
        console.log(response.data.books);
      }
    } catch (error) {
      console.log("Error en mis reservas getBooks");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    const refresh = await SecureStore.getItemAsync("refresh");
    try {
      const response = await obtainPairRefresh({ refresh: refresh });
      obtainBooks(response.data.access);
      await SecureStore.setItemAsync("access", response.data.access);
      await SecureStore.setItemAsync("refresh", response.data.refresh);
    } catch (error) {
      console.log("ERROR REFRESH MIS RESERVAS");
      console.log(error);
    } finally {
    }
  };

  const refreshFunction = () => {
    try {
      setRefreshing(true);
      refreshToken();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

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
          data={books}
          contentContainerStyle={{ gap: 10 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshFunction()}
            />
          }
          renderItem={({ item, index }) => {
            if (Date.parse(item.fecha) > Date.now()) {
              return <CardBook {...item} />;
            }
            return null;
          }}
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
});
