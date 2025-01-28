import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

type CardBussinesProps = {
  item: { nombre: string; direccion: string };
  index: number;
};

export function CardBussines({ item, index }: CardBussinesProps) {
  return (
    <View style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{
          uri: "https://96e3597c96ce.ngrok.app/media/bussines_pic/default.jpg",
        }}
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardDescription}>{item.direccion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: width - 40,
    marginHorizontal: 20,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cardBody: {
    padding: 5,
    width: "60%",
  },
  cardImage: {
    width: "40%",
    height: 100,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
});
