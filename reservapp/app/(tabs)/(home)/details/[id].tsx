import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { getBussinesById } from "../../../../api/bussinesAPI";
import MapView, { Marker } from "react-native-maps";
import { ArrowRightIcon } from "../../../../components/icons/arrowRightIcon";

const { width } = Dimensions.get("window");

export default function BussinesDetails() {
  const { id } = useLocalSearchParams();
  const [bussines, setBussines] = useState<any>({});
  const [servicios, setServicios] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBussines = async () => {
      const access = await SecureStore.getItemAsync("access");
      const response = await getBussinesById(access, id);
      setBussines(response.data.bussines);
      setServicios(response.data.servicios);
    };

    getBussines();
  }, []);

  if (bussines && servicios) {
    const coordenadas = {
      latitude: bussines.latitud,
      longitude: bussines.longitud,
    };
    return (
      <FlatList
        style={styles.container}
        data={servicios}
        contentContainerStyle={{
          gap: 10,
        }}
        renderItem={({ item, index }) => (
          <Link
            href={`/(tabs)/(home)/reserva/${item.id}/?nombre=${item.nombre}&precio=${item.precio}&tiempo=${item.tiempo}&bussines=${id}`}
            asChild
          >
            <TouchableOpacity style={styles.servicioItem} key={index}>
              <Text style={styles.servicioTitle}>{item.nombre}</Text>
              <Text style={styles.servicioTiempo}>{item.tiempo} Min</Text>
              <Text style={styles.servicioPrecio}>${item.precio}</Text>
              <View style={styles.servicioArrow}>
                <ArrowRightIcon />
              </View>
            </TouchableOpacity>
          </Link>
        )}
        ListHeaderComponent={
          <View>
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
              style={styles.imagen}
              source={{
                uri: "https://86ffe54c8fa1.ngrok.app/media/bussines_pic/default.jpg",
              }}
            />
            <View style={styles.body}>
              <Text style={styles.title}>{bussines.nombre}</Text>
              <Text style={styles.address}>{bussines.direccion}</Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <MapView
            scrollEnabled={false}
            region={{
              ...coordenadas,
              latitudeDelta: 0.002,
              longitudeDelta: 0.01,
            }}
            style={styles.map}
          >
            <Marker coordinate={coordenadas} />
          </MapView>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFF",
  },
  loader: {
    width: width,
    height: 350,
    position: "absolute",
  },
  imagen: {
    width: width,
    height: 350,
    resizeMode: "cover",
  },
  content: {
    margin: 20,
    gap: 20,
  },
  body: {
    margin: 20,
  },
  title: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#2e5077",
  },
  address: {
    fontSize: 20,
    color: "#2e5077",
    textTransform: "capitalize",
  },
  servicioItem: {
    flex: 1,
    padding: 20,
    marginHorizontal: 20,
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#2e5077",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  servicioTitle: {
    fontSize: 15,
    flex: 0.4,
    flexWrap: "wrap",
    marginRight: 10,
  },
  servicioTiempo: {
    flex: 0.2,
    fontSize: 15,
  },
  servicioPrecio: {
    flex: 0.2,
    fontSize: 15,
  },
  servicioArrow: {
    width: 25,
    height: 25,
    borderWidth: 1,
    padding: 3,
    borderRadius: 20,
    borderColor: "#2e5077",
  },
  servicioContainer: {
    gap: 5,
  },
  servicioText: {
    color: "#2e5077",
    fontSize: 17,
  },
  servicioInput: {
    padding: 10,
    backgroundColor: "#B0D6E1",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2e5077",
  },
  calendarContainer: {
    gap: 5,
  },
  calendar: {
    borderWidth: 1,
    height: 320,
    backgroundColor: "#B0D6E1",
    borderColor: "#2e5077",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  calendarText: {
    fontSize: 17,
    color: "#2e5077",
  },
  submit: {
    backgroundColor: "#2e5077",
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  map: {
    width: width,
    height: 200,
  },
});
