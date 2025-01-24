import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  SectionList,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { getFreeBooks } from "../../../../api/serviciosAPI";

export default function servicio() {
  LocaleConfig.locales["es"] = {
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    today: "Hoy",
  };
  LocaleConfig.defaultLocale = "es";

  const { servicio, nombre, tiempo, precio, bussines } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [turnos, setTurnos] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const handlSubmit = async () => {
    try {
      const response = await getFreeBooks(selectedDate, bussines, servicio);
      setTurnos(response.data.disponibilidad);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleBook = (hora: string, prestador: string) => {
    setShowModal(!showModal);
    setSelectedTime(hora);
    setSelectedSection(prestador);
  };

  return (
    <SafeAreaView style={{}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirmar turno</Text>
            <View style={styles.infoView}>
              <Text style={styles.infoText}>Dia: {selectedDate}</Text>
              <Text style={styles.infoText}>Hora: {selectedTime}</Text>
              <Text style={styles.infoText}>Servicio: {nombre}</Text>
              <Text style={styles.infoText}>Prestador: {selectedSection}</Text>
              <Text style={styles.infoText}>Precio: {precio}</Text>
            </View>

            <View style={styles.modalButtonView}>
              <Pressable onPress={() => setShowModal(!showModal)}>
                <Text style={[styles.modalButton, styles.cancel]}>
                  Cancelar
                </Text>
              </Pressable>
              <Pressable onPress={() => setShowModal(!showModal)}>
                <Text style={[styles.modalButton, styles.confirm]}>
                  Confirmar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <SectionList
        sections={turnos}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, section }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item}</Text>
            <Pressable onPress={() => handleBook(item, section.prestador)}>
              <Text style={styles.itemButton}>Reservar</Text>
            </Pressable>
          </View>
        )}
        contentContainerStyle={{
          gap: 5,
        }}
        renderSectionHeader={({ section: { prestador } }) => (
          <Text style={styles.prestador}>{prestador}</Text>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              ¡Seleccione un fecha para buscar turnos!
            </Text>
          </View>
        }
        ListFooterComponent={
          <Pressable onPress={() => handleBack()}>
            <Text style={[styles.emptyContainer, styles.emptyButton]}>
              Cambiar servicio
            </Text>
          </Pressable>
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{nombre}</Text>
            <View style={styles.headerInfo}>
              <Text style={styles.headerInfoText}>Tiempo: {tiempo} min</Text>

              <Text style={styles.headerInfoText}>Precio: ${precio}</Text>
            </View>
            <View style={styles.calendarContainer}>
              <Calendar
                style={styles.calendar}
                firstDay={1}
                onDayPress={handleDayPress}
                theme={{
                  arrowColor: "#2e5077",
                }}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: "#2e5077",
                    selectedTextColor: "#fff",
                  },
                }}
              />
              <Pressable onPress={() => handlSubmit()}>
                <Text style={styles.calendarSubmit}>Buscar turnos</Text>
              </Pressable>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e5077",
  },
  infoView: {
    margin: 20,
    gap: 3,
  },
  infoText: {
    fontSize: 15,
    color: "#2e5077",
  },
  modalButtonView: {
    flexDirection: "row",
    gap: 20,
  },
  modalButton: {
    padding: 10,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 10,
  },
  cancel: {
    backgroundColor: "red",
  },
  confirm: {
    backgroundColor: "#2e5077",
  },
  header: {
    margin: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e5077",
  },
  headerInfo: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerInfoText: {
    fontSize: 15,
    color: "#2e5077",
  },
  calendarContainer: {},
  calendar: {
    borderWidth: 1,
    borderColor: "#2e5077",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  calendarSubmit: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "#2e5077",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  prestador: {
    textAlign: "center",
    backgroundColor: "#2e5077",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    padding: 5,
    borderBottomWidth: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  itemButton: {
    backgroundColor: "#2e5077",
    color: "#fff",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
  },
  emptyContainer: {
    margin: 20,
    alignItems: "center",
    gap: 20,
  },
  emptyTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  emptyButton: {
    padding: 10,
    backgroundColor: "#2e5077",
    textAlign: "center",
    borderRadius: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
