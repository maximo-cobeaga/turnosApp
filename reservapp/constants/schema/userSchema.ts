import * as yup from 'yup'

export const fromLoginSchema = yup.object({
  correo: yup
    .string()
    .email("Por favor ingresa un correo valido")
    .required("El correo es obligatorio"),
  contraseña: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener mas de 8 caracteres"),
});