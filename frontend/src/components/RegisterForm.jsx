import { faUser, faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import InputField from "../ui/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../schemas/register.schema";
import { registerUserRequest } from "../api/user.request";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await registerUserRequest(data);
      
    } catch (err) {
      console.error('Error en el registro', err)
    }
  };

  return (
    <form
      className=" w-4/5 h-auto p-2 flex flex-col justify-center items-center gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        label="Nombre(s)"
        icon={faUser}
        type={"text"}
        name={"firstname"}
        placeholder={"Juan"}
        register={register}
        error={errors.firstname}
      />
      <InputField
        label="Apellido(s)"
        icon={faUser}
        type={"text"}
        name={"lastname"}
        placeholder={"Perez"}
        register={register}
        error={errors.lastname}
      />

      <InputField
        label="Username"
        icon={faUser}
        type={"text"}
        name={"username"}
        placeholder={"LeCorbusier31"}
        register={register}
        error={errors.username}
      />
      <InputField
        label="Email"
        icon={faAt}
        type={"email"}
        name={"email"}
        placeholder={"email@abc.com"}
        register={register}
        error={errors.email}
      />
      <InputField
        label="Password"
        icon={faLock}
        type={"password"}
        name={"password"}
        placeholder={"********"}
        register={register}
        error={errors.password}
      />
      <InputField
        label="Confirmar password"
        icon={faLock}
        type={"password"}
        name={"confirmPassword"}
        placeholder={"********"}
        register={register}
        error={errors.confirmPassword}
      />
      <button
        type="submit"
        className=" w-[40%] bg-green-600 mt-4 px-2 py-1 text-white text-[1.1rem] rounded-md focus:bg-green-700 border-none outline-none"
      >
        Registrarse
      </button>
      <span className=" text-white">
        ¿Ya tienes una cuenta?
        <Link to={"/login"} className=" text-orange-400">
          {" "}
          Inicia sesión aqui
        </Link>
      </span>
    </form>
  );
}

export default RegisterForm;
