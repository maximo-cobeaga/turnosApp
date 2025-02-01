import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Image,
  Alert,
} from "react-native";
import MapView, { AnimatedRegion, Marker, Region } from "react-native-maps";
import { getBussinesFun } from "../../../api/bussinesAPI";
import { obtainPairRefresh } from "../../../api/userAPI";
import * as SecureStore from "expo-secure-store";
import { CardBussines } from "../../../components/maps/CardBussines";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Location from "expo-location";
import { useAuth } from "@/context/AuthContext";

const { width } = Dimensions.get("window");

export default function index() {
  // const [bussines, setBussines] = useState<any[]>([]);

  // async function save(key: string, value: string) {
  //   await SecureStore.setItemAsync(key, value);
  // }

  // useEffect(() => {
  //   const getLocation = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert(
  //         "Permiso denegado",
  //         "Activa los permisos de ubicación en la configuración del dispositivo."
  //       );
  //       return;
  //     }

  //     let currentLocation = await Location.getCurrentPositionAsync({});
  //     const { latitude, longitude } = currentLocation.coords;
  //     setLocation(currentLocation.coords);
  //     setRegion({
  //       latitude,
  //       longitude,
  //       latitudeDelta: 0.05,
  //       longitudeDelta: 0.01,
  //     });
  //   };

  //   getLocation();

  //   const getBussinesAPI = async (access: string) => {
  //     try {
  //       const response = await getBussinesFun(access);
  //       setBussines(response.data.bussines);
  //     } catch (errors) {
  //       console.log("Hubo un error con getbussines");
  //       console.log(errors);
  //     }
  //   };

  //   const refrescaToken = async () => {
  //     try {
  //       const refreshToken = await SecureStore.getItemAsync("refresh");
  //       if (refreshToken) {
  //         const response = await obtainPairRefresh({
  //           refresh: refreshToken,
  //         });
  //         await SecureStore.deleteItemAsync("access");
  //         await SecureStore.deleteItemAsync("refresh");
  //         getBussinesAPI(response.data.access);
  //         save("access", response.data.access);
  //         save("refresh", response.data.refresh);
  //         //getBussinesAPI(response.data.access);
  //       } else {
  //         console.log("Refresh token no encontrado");
  //       }
  //     } catch (errors) {
  //       console.log("Error Refresh");
  //       console.log(errors);
  //     }
  //   };

  //   refrescaToken();
  // }, []);

  const mapRef = useRef<MapView>(null);
  const flatListRef = useRef(null);
  const { bussines } = useAuth();

  const handleScroll = (index: number) => {
    if (bussines) {
      const { latitud, longitud } = bussines[index];
      const coordenadas = {
        latitude: latitud,
        longitude: longitud,
      };
      mapRef.current?.animateToRegion(
        {
          ...coordenadas,
          latitudeDelta: 0.05,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  if (bussines) {
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: -38.0131,
            longitude: -57.5504,
            latitudeDelta: 0.05,
            longitudeDelta: 0.01,
          }}
        >
          {bussines.map((b, index) => (
            <Marker.Animated
              key={index}
              coordinate={{
                latitude: b.latitud,
                longitude: b.longitud,
              }}
              title={b.nombre}
              description={b.direccion}
            >
              {b.categoria == 1 && (
                <FontAwesome name="car" size={30} color="#2e5077" />
              )}
              {b.categoria == 2 && (
                <FontAwesome name="hotel" size={30} color="#2e5077" />
              )}
              {b.categoria == 3 && (
                <FontAwesome name="scissors" size={30} color="#2e5077" />
              )}
              {b.categoria == 4 && (
                <FontAwesome name="magic" size={30} color="#2e5077" />
              )}
              {b.categoria == 5 && (
                <FontAwesome name="futbol-o" size={30} color="#2e5077" />
              )}
            </Marker.Animated>
          ))}
        </MapView>
        {/* // Carrusel de negocios */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={bussines}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <CardBussines item={item} index={index} />
            )}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              // Detectar el índice del carrusel actual

              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              handleScroll(index);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  carouselContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    height: 100,
  },
});
