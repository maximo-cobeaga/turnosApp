import React from "react";
import { View, Text, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";

export function FlatHeader() {
  return (
    <>
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
        <Pressable>
          <Text style={styles.calendarSubmit}>Buscar turnos</Text>
        </Pressable>
      </View>
    </>
  );
}
