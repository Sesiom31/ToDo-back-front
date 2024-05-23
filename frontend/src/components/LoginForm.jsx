import { faUser, faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../ui/InputField";
import loginSchema from "../schemas/login.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUserRequest } from "../api/user.request";
import { useDispatch } from "react-redux";
import {  startLoading } from "../store/authSlice";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      dispatch(startLoading());
      await loginUserRequest(data);
      navigate("/profile");
    } catch (err) {
      console.error("Error al iniciar sesión", err);
    }
  };

  return (
    <form
      className=" w-4/5 h-auto p-2 flex flex-col justify-center items-center gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <button
        type="submit"
        className=" w-[40%] bg-green-600 mt-8 px-2 py-1 text-white text-[1.1rem] rounded-md  focus:bg-green-700 border-none outline-none"
      >
        Iniciar sesión
      </button>
      <span className=" text-white">
        ¿Aun no tienes una cuenta?
        <Link to={"/register"} className=" text-orange-400">
          {" "}
          Regístrate aquí
        </Link>
      </span>
    </form>
  );
}

export default LoginForm;
