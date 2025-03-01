import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StarIcon } from "../icons/StarIcon";

type ItemProps = any;

export function CardHomeBussines({ bussines }: ItemProps) {
  const [loading, setLoading] = useState(true);
  return (
    <Link href={`/(tabs)/(home)/details/${bussines.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        {loading && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#2e5077"
          />
        )}
        <Image
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          style={[styles.cardImage, loading && styles.borderLoader]}
          source={{
            uri: "https://86ffe54c8fa1.ngrok.app/media/bussines_pic/default.jpg",
          }}
        />
        <View style={styles.body}>
          <Text style={styles.title}>{bussines.nombre}</Text>
          <Text style={styles.direccion}>
            {bussines.direccion.slice(0, 30)}...
          </Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeItem}>Lun - Dom</Text>
            <Text style={styles.timeItem}>8:00 - 22:00</Text>
          </View>
          <View style={styles.more}>
            <View style={[styles.moreComponent, styles.calificacion]}>
              <View style={styles.star}>
                <StarIcon />
              </View>
              <Text style={styles.calificacionText}>4.4</Text>
            </View>
            <Text style={[styles.moreComponent, styles.categoria]}>
              Peluqueria
            </Text>
            <Text style={[styles.moreComponent, styles.sexo]}>Hombre</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fa",
    marginHorizontal: 20,
    borderColor: "#2e5077",
    borderLeftWidth: 0,
    height: 150,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#2E5077",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  loader: {
    position: "absolute",
    width: "45%",
    height: 150,
  },
  borderLoader: {
    borderLeftWidth: 2,
  },
  body: {
    gap: 5,
    width: "55%",
    padding: 10,
  },
  title: {
    color: "#2e5077",
    fontWeight: "bold",
    fontSize: 20,
  },
  direccion: {
    fontSize: 15,
    flexWrap: "wrap",
  },
  cardImage: {
    width: "45%",
    height: 150,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  timeItem: {
    fontSize: 15,
  },
  more: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  moreComponent: {
    backgroundColor: "#DDF2FD",
    color: "#2e5077",
    paddingHorizontal: 8,
    fontWeight: "bold",
    borderRadius: 10,
  },
  calificacion: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  star: {
    height: 13,
    width: 13,
  },
  calificacionText: {
    fontWeight: "bold",
    color: "#2e5077",
  },
  categoria: {
    fontSize: 15,
  },
  sexo: {},
});
