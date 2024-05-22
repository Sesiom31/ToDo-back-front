import * as Yup from "yup";

const schema = Yup.object().shape({
  firstname: Yup.string()
    .required("El nombre es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres"),
  lastname: Yup.string()
    .required("El apellido es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres"),
  username: Yup.string()
    .required("El username es obligatorio")
    .min(4, "Debe tener al menos 4 caracteres "),
  email: Yup.string()
    .email("Ingrese un email válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "Debe tener al menos 6 caracteres"),
  confirmPassword: Yup.string()
    .required("Debes confirmar tu password")
    .oneOf([Yup.ref("password"), null], "El password debe coincidir"),
});

export default schema;
