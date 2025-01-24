import {
  View,
  Alert,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  Pressable,
  TouchableOpacity,
  TurboModuleRegistry,
} from "react-native";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { getBussinesFun } from "../../../api/bussinesAPI";
import { obtainPairRefresh } from "../../../api/userAPI";
import { CardHomeBussines } from "../../../components/home/CardHomeBussines";
import { SearchIcon } from "../../../components/icons/SearchIcon";
import { LocationSelect } from "../../../components/home/LocationSelect";

const CATEGORIAS = [
  "Peluquerias",
  "Esteticas",
  "Barberias",
  "Futbol",
  "Tenis",
  "Padel",
];

export default function index() {
  const [bussines, setBussines] = useState<any[]>([]);
  const [access, setAccess] = useState("");

  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  useEffect(() => {
    const getBussinesAPI = async (access: string) => {
      try {
        const response = await getBussinesFun(access);
        setBussines(response.data.bussines);
      } catch (errors) {
        console.log("Hubo un error con getbussines");
        console.log(errors);
      }
    };

    const refrescaToken = async () => {
      try {
        const refreshToken = await SecureStore.getItemAsync("refresh");
        if (refreshToken) {
          const response = await obtainPairRefresh({
            refresh: refreshToken,
          });
          await SecureStore.deleteItemAsync("access");
          await SecureStore.deleteItemAsync("refresh");
          setAccess(response.data.access);
          getBussinesAPI(response.data.access);
          save("access", response.data.access);
          save("refresh", response.data.refresh);
          //getBussinesAPI(response.data.access);
        } else {
          console.log("Refresh token no encontrado");
        }
      } catch (errors) {
        console.log("Error Refresh");
        console.log(errors);
      }
    };
    refrescaToken();
  }, []);

  if (bussines)
    return (
      <SafeAreaView style={styles.container}>
        <LocationSelect />
        <View
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderColor: "#2e5077",
            margin: 10,
            borderRadius: 30,
          }}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Busca tu turno aqui"
            placeholderTextColor="#676363"
          />
          <Link href="/(tabs)/(home)/details/2" asChild>
            <Pressable
              style={{
                height: 20,
                width: 30,
                flex: 0.2,
              }}
            >
              <SearchIcon />
            </Pressable>
          </Link>
        </View>

        <View style={styles.list}>
          <FlatList
            data={bussines}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 15,
              paddingBottom: 20,
            }}
            keyExtractor={(item) => item.id}
            renderItem={(item) => <CardHomeBussines bussines={item.item} />}
            ListHeaderComponentStyle={{ marginVertical: 10 }}
            ListHeaderComponent={() => (
              <View>
                <FlatList
                  horizontal={true}
                  style={{ paddingVertical: 5 }}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
                  data={CATEGORIAS}
                  renderItem={({ item }) => (
                    <Link href="/(tabs)/(home)/reserva" asChild>
                      <TouchableOpacity
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#2e5077",
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ color: "#fff" }}>{item}</Text>
                      </TouchableOpacity>
                    </Link>
                  )}
                />
                <Text style={styles.titulo}>Populares</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    fontSize: 15,
    flex: 0.8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  titulo: {
    fontSize: 25,
    margin: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2e5077",
  },
  list: {},
});
