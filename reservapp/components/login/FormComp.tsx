import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FormInputController } from "./FormInputController";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fromLoginSchema } from "@/constants/schema/userSchema";

export function FormComp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fromLoginSchema),
  });

  const submit = (data) => {
    Alert.alert(JSON.stringify(data));
  };
  return (
    <View style={styles.container}>
      <Text>React hook form example an react native</Text>

      <View>
        <Text>Correo</Text>
        <FormInputController
          control={control}
          errors={errors}
          name={"correo"}
        />
      </View>

      <View>
        <Text>Contraseña</Text>
        <FormInputController
          control={control}
          errors={errors}
          name={"contraseña"}
          props={{
            secureTextEntry: true,
          }}
        />
      </View>

      <Button title="submit" onPress={handleSubmit(submit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
