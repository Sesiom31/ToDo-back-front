import * as Yup from "yup";

const pasoSchema = Yup.object().shape({
  description: Yup.string().optional(),
});

const schema = Yup.object().shape({
  task: Yup.string().required("El nombre de la tarea es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  isImportant: Yup.bool().default(false),
  isComplete : Yup.bool().default(false).optional(),
  dateEnd: Yup.date().optional().default(new Date()),
  pasos: Yup.array().of(pasoSchema).optional(),
});

export default schema;
