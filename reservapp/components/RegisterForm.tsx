import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Link, useRouter } from "expo-router";
import { registerFun } from "../api/userAPI";
import { HelpSection } from "./HelpSection";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [lastN, setlastN] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [born, setBorn] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const router = useRouter();

  const handlePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    setIsPressing(true);
    const params = {
      email: email,
      nombre: name,
      apellido: lastN,
      telefono: phone,
      nacimiento: born,
      password: password,
    };
    try {
      const response = await registerFun(params);
      Alert.alert("Success", "Se registro correctamente");
      setIsPressing(false);
      router.replace("/confirmacion");
    } catch (errors) {
      Alert.alert("Error", "Hubo un error en el registro. Revisa los campos");
      setIsPressing(false);
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChagePicker = (event: any, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setBorn(formatDateAPI(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setBorn(formatDateAPI(date));
    toggleDatePicker();
  };
  const formatDateAPI = (rawData: Date) => {
    let date = new Date(rawData);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Registrate aqui</Text>
              <Text style={styles.welcome}>
                Completa todos los campos para registrarte
              </Text>
            </View>
            <View style={styles.fields}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#2E5077"
                placeholder="Ingrese su nombre"
                onChangeText={setName}
                value={name}
              />
            </View>
            <View style={styles.fields}>
              <Text style={styles.label}>Apellido</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#2E5077"
                placeholder="Ingrese su apellido"
                onChangeText={setlastN}
                value={lastN}
              />
            </View>
            <View style={styles.fields}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor="#2E5077"
                placeholder="Ingrese su email"
                onChangeText={setEmail}
                value={email}
              />
            </View>
            <View style={styles.fields}>
              <Text style={styles.label}>Telefono</Text>
              <TextInput
                keyboardType="phone-pad"
                style={styles.input}
                placeholderTextColor="#2E5077"
                placeholder="Ingrese su telefono"
                onChangeText={setPhone}
                value={phone}
              />
            </View>
            <View style={styles.fields}>
              <Text style={styles.label}>Fecha de nacimiento</Text>
              <Pressable onPress={toggleDatePicker}>
                {showPicker ? (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    onChange={onChagePicker}
                    value={date}
                    style={styles.datePicker}
                    textColor="#2E5077"
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    placeholder="Ingrese su fecha de nacimiento"
                    placeholderTextColor="#2E5077"
                    value={born}
                    onPressIn={toggleDatePicker}
                    onChangeText={setBorn}
                    editable={false}
                  />
                )}
              </Pressable>
              {showPicker && Platform.OS === "ios" && (
                <View style={styles.datePickerButtons}>
                  <Pressable onPress={toggleDatePicker}>
                    <Text style={[styles.datePickerButton, styles.bgRed]}>
                      Cancelar
                    </Text>
                  </Pressable>
                  <Pressable onPress={confirmIOSDate}>
                    <Text style={[styles.datePickerButton, styles.bgBlue]}>
                      Guardar
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
            <View style={styles.fields}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholderTextColor="#2E5077"
                placeholder="Ingrese su contraseña"
                onChangeText={setPassword}
                value={password}
              />
              <Pressable onPress={handlePassword}>
                <Text style={styles.showButton}>
                  {!showPassword ? "Mostrar contraseña" : "Ocultar contraseña"}
                </Text>
              </Pressable>
            </View>
            <View style={styles.fields}>
              <Text style={styles.label}>Repeti tu contraseña</Text>
              <TextInput
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholder="Ingrese su contraseña"
                placeholderTextColor="#2E5077"
                onChangeText={setRepPassword}
                value={repPassword}
              />
              <Pressable onPress={handlePassword}>
                <Text style={styles.showButton}>
                  {!showPassword ? "Mostrar contraseña" : "Ocultar contraseña"}
                </Text>
              </Pressable>
            </View>
            <View style={styles.actions}>
              <Pressable disabled={isPressing}>
                <Text
                  style={[
                    styles.submit,
                    isPressing ? styles.disabled : styles.bgBlue,
                  ]}
                  onPress={handleSubmit}
                >
                  Registrate
                </Text>
              </Pressable>
              <Link href="/login" asChild>
                <Pressable disabled={isPressing}>
                  <Text
                    style={[
                      styles.submit,
                      isPressing ? styles.disabled : styles.bgOutline,
                    ]}
                  >
                    Ya tenes cuenta. Inicia sesion
                  </Text>
                </Pressable>
              </Link>
            </View>
            <HelpSection />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  scrollContent: {
    flex: 1,
  },
  titleContainer: {
    width: "100%",
    borderBottomColor: "#2E5077",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  title: {
    margin: 10,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E5077",
  },
  welcome: {
    textAlign: "center",
    fontSize: 15,
    color: "#2E5077",
  },
  fields: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    margin: 5,
    color: "#2E5077",
  },
  input: {
    borderWidth: 1,
    borderEndWidth: 2,
    padding: 15,
    height: 50,
    width: "100%",
    borderRadius: 10,
    borderColor: "#2E5077",
  },
  actions: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  submit: {
    height: 40,
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  bgBlue: {
    backgroundColor: "#2E5077",
    color: "white",
  },
  bgOutline: {
    backgroundColor: "white",
    color: "#2E5077",
    borderWidth: 1,
    borderColor: "#2E5077",
  },
  datePicker: {
    marginTop: -15,
    marginBottom: -15,
  },
  datePickerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  datePickerButton: {
    padding: 10,
    borderRadius: 100,
    color: "white",
    fontWeight: "bold",
  },
  bgRed: {
    backgroundColor: "red",
  },
  disabled: {
    backgroundColor: "#9AA6B2",
    borderColor: "#000",
    color: "#000",
  },
  showButton: {
    color: "#2E5077",
    textDecorationLine: "underline",
  },
});
