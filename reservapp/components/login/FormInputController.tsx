import React, { FC, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  useForm,
} from "react-hook-form";

interface FormInputControllerProps {
  control: Control<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  name: string;
  props?: TextInputProps;
}

export const FormInputController: FC<FormInputControllerProps> = ({
  control,
  errors,
  name,
  props,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={`Enter your ${name}`}
            style={[
              styles.input,
              focus && styles.inputFocus,
              errors[name] && styles.error,
            ]}
            placeholderTextColor={"gray"}
            value={value}
            onBlur={() => {
              onBlur;
              setFocus(false);
            }}
            onFocus={() => setFocus(true)}
            onChangeText={onChange}
            {...props}
          />
        )}
      />
      {errors && errors[name] && (
        <Text style={styles.error}>{errors[name]?.message}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 20,
    height: 60,
    width: "100%",
    borderRadius: 10,
    borderColor: "#2E5077",
    borderEndWidth: 2,
  },
  inputFocus: {
    borderWidth: 2,
  },
  error: {
    color: "red",
    borderColor: "red",
  },
});
