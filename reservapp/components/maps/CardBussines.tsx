import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

type CardBussinesProps = {
  item: { nombre: string; direccion: string; id: number };
  index: number;
};

export function CardBussines({ item, index }: CardBussinesProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.replace(`/(tabs)/(home)/details/${item.id}`)}
    >
      {loading && (
        <ActivityIndicator
          style={styles.cardImage}
          size="large"
          color="#2e5077"
        />
      )}
      <Image
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        style={styles.cardImage}
        source={{
          uri: "https://13741c69c6eb.ngrok.app/media/bussines_pic/default.jpg",
        }}
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardDescription}>{item.direccion}</Text>
      </View>
    </TouchableOpacity>
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
