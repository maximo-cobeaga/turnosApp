import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type ItemProps = any;

export function CardHomeBussines({ bussines }: ItemProps) {
  return (
    <View style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{
          uri: "https://83a1-2803-9800-9991-7493-b9c6-7494-15b4-8e5e.ngrok-free.app/media/bussines_pic/default.jpg",
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
          <Text style={styles.calificacion}>4.4</Text>
          <Text style={styles.categoria}>Peluqueria</Text>
          <Text style={styles.sexo}>Hombre</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#B0D6E1",
    marginHorizontal: 20,
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
    fontWeight: "bold",
    fontSize: 20,
  },
  categoria: {
    fontSize: 15,
    fontStyle: "italic",
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
});
