import { Link } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { StarIcon } from "../icons/StarIcon";

type ItemProps = any;

export function CardHomeBussines({ bussines }: ItemProps) {
  return (
    <Link href={`/(tabs)/(home)/details/${bussines.id}`} asChild>
      <Pressable style={styles.card}>
        <Image
          style={styles.cardImage}
          source={{
            uri: "https://7624-2803-9800-9991-7493-70dd-bb07-3fcb-b2c0.ngrok-free.app/media/bussines_pic/default.jpg",
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
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderColor: "#2e5077",
    borderWidth: 2,
    height: 150,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
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
