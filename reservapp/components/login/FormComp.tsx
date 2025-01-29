import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

export function FormComp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    console.log(data);
  };
  return (
    <View style={styles.container}>
      <Text>React hook form example an react native</Text>
      <Controller
        name="username"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter your name"
            style={styles.input}
            placeholderTextColor={"gray"}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        rules={{ required: true, minLength: 5 }}
      />
      {errors.username && (
        <Text style={styles.error}>The username is required</Text>
      )}
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            placeholderTextColor={"gray"}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        rules={{
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        }}
      />
      {errors.email && <Text>El campo email esta mal</Text>}
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
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "90%",
    marginTop: 18,
    borderColor: "gray",
  },
  error: {
    color: "red",
  },
});
