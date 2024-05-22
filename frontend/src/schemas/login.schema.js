import * as Yup from "yup";

const schema = Yup.object().shape({
  username: Yup.string()
    .required("El username es obligatorio")
    .min(4, "Debe tener al menos 4 caracteres "),
  email: Yup.string()
    .email("Ingrese un email válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "Debe tener al menos 6 caracteres"),
});

export default schema;
