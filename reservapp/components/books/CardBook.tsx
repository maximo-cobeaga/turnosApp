import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Book } from "../../app/(tabs)/(books)/index";
import { MaterialIcons } from "@expo/vector-icons";

export function CardBook(item: Book) {
  const formatDate = (dataString: string) => {
    const [year, month, day] = dataString.split("-");
    return `${day}/${month}/${year}`;
  };
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.servicio.nombre}</Text>
      <View style={styles.infoRow}>
        <MaterialIcons name="calendar-today" size={18} color="#6c757d" />
        <Text style={styles.info}>Fecha: {formatDate(item.fecha)}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="access-time" size={18} color="#6c757d" />
        <Text style={styles.info}>Hora: {item.hora.slice(0, 5)}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="storefront" size={18} color="#6c757d" />
        <Text style={styles.info}>Negocio: {item.bussines.nombre}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="location-on" size={18} color="#6c757d" />
        <Text style={styles.info}>Dirección: {item.bussines.direccion}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="person" size={18} color="#6c757d" />
        <Text style={styles.info}>Prestador: {item.prestador.nombre}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="attach-money" size={18} color="#6c757d" />
        <Text style={styles.info}>Precio: ${item.servicio.precio}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="timer" size={18} color="#6c757d" />
        <Text style={styles.info}>Duración: {item.servicio.tiempo} min</Text>
      </View>
      <View style={styles.viewButtons}>
        <Pressable style={[styles.button, styles.btnRed]}>
          <Text style={styles.bntText}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.btnBlue]}>
          <Text style={styles.bntText}>Pagar</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
    margin: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2e5077",
    marginBottom: 12,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: "#495057",
    marginLeft: 8,
  },
  viewButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,

    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnRed: {
    backgroundColor: "#FF2929",
  },
  btnBlue: {
    backgroundColor: "#2e5077",
  },
  bntText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
