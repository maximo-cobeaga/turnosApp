import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
  Button,
} from "react-native";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { logInFun } from "../api/userAPI";
import { HelpSection } from "./HelpSection";
import { FormInputController } from "./login/FormInputController";
import { useForm } from "react-hook-form";

import { fromLoginSchema } from "@/constants/schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "yup";
import { useAuth } from "@/context/AuthContext";

export function LogInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fromLoginSchema),
  });
  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  const submit = (data) => {
    Alert.alert(JSON.stringify(data.correo));
  };

  const handlePress = async (data) => {
    setIsSubmitting(true);
    await SecureStore.setItemAsync("email", data.correo);
    const params = {
      email: data.correo,
      password: data.contraseña,
    };

    try {
      const response = await logInFun(params);
      save("access", response.data.access);
      save("refresh", response.data.refresh);
      Alert.alert("Exito!", "Se inicio sesion correctamente");
      router.replace("/(tabs)/(home)");
      setIsSubmitting(false);
    } catch (errors) {
      Alert.alert("Error", "No se pudo iniciar sesion");
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Inicio de sesion</Text>
          <Text style={styles.welcome}>
            Completa los campos para iniciar sesion
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.form}>
          <View style={styles.fields}>
            <Text style={styles.label}>Correo electronico</Text>
            <FormInputController
              control={control}
              errors={errors}
              name="correo"
              props={{
                autoCapitalize: "none",
              }}
            />
          </View>

          <View style={styles.fields}>
            <Text style={styles.label}>Contraseña</Text>
            <FormInputController
              control={control}
              errors={errors}
              name="contraseña"
              props={{
                secureTextEntry: true,
              }}
            />
            <Link href="/" asChild>
              <Text
                style={{
                  color: "#2E5077",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 15,
                  margin: 5,
                }}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </Link>
          </View>

          {/* <View style={styles.fields}>
            <Text style={styles.label}>Correo electronico</Text>
            <TextInput
              placeholder="Ingrese su correo electronico"
              placeholderTextColor="#2E5077"
              style={[styles.input, isEmailFocus && styles.inputFocus]}
              onChangeText={setEmail}
              onFocus={() => setIsEmailFocus(!isEmailFocus)}
              onBlur={() => setIsEmailFocus(!isEmailFocus)}
              value={email}
            />
          </View>
          <View style={styles.fields}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Ingrese su contraseña"
              placeholderTextColor="#2E5077"
              style={[styles.input, isPasswordFocus && styles.inputFocus]}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocus(!isPasswordFocus)}
              onBlur={() => setIsPasswordFocus(!isPasswordFocus)}
              value={password}
            />
            <Link href="/" asChild>
              <Text
                style={{
                  color: "#2E5077",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 15,
                  margin: 5,
                }}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </Link>
          </View> */}

          <View style={styles.actionsContainer}>
            <Pressable
              onPress={handleSubmit(handlePress)}
              disabled={isSubmitting}
            >
              <Text style={[styles.submit, styles.bgBlue]}>Iniciar sesion</Text>
            </Pressable>
            <Link href={"/register"} asChild>
              <Pressable disabled={isSubmitting}>
                <Text style={[styles.submit, styles.bgOutline]}>
                  No tenes cuenta, registrate aca
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
      <HelpSection />
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  titleSection: {
    textAlign: "center",
    margin: 10,
    borderBottomColor: "#2E5077",
    borderBottomWidth: 1,
    width: "100%",
    paddingBottom: 10,
  },
  section: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 10,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E5077",
  },
  welcome: {
    fontSize: 15,
    color: "#2E5077",
    textAlign: "center",
  },
  form: {
    flex: 2,
  },
  fields: {
    margin: 15,
  },
  label: {
    margin: 5,
    color: "#2E5077",
  },
  input: {
    borderWidth: 1,
    padding: 20,
    height: 60,
    width: width * 0.8,
    borderRadius: 10,
    borderColor: "#2E5077",
    borderEndWidth: 2,
  },
  inputFocus: {
    borderWidth: 2,
  },
  actionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    textAlign: "center",
    borderRadius: 10,
    padding: 10,
    height: 40,
    width: width * 0.8,
    fontSize: 15,
    fontWeight: "bold",
    margin: 10,
  },
  bgBlue: {
    backgroundColor: "#2E5077",
    color: "#fff",
  },
  bgOutline: {
    borderColor: "#2E5077",
    borderWidth: 2,
    color: "#2E5077",
  },
  helpSection: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
});
