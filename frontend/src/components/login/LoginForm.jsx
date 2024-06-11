import { faUser, faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../ui/InputField";
import loginSchema from "../../schemas/login.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUserRequest } from "../../api/user.request";
import { useDispatch } from "react-redux";
import { playSpinner, startLogin } from "../../store/authSlice";
import { useState } from "react";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorCredentials, setErrorCredentials] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(playSpinner());
      await loginUserRequest(data);
      dispatch(startLogin());
      navigate("/profile");
    } catch (err) {
      console.error("Error al iniciar sesión", err);
      setErrorCredentials(err.response.data.message);
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col items-center justify-center gap-10 p-4 px-6 md:w-[85%] md:gap-6 lg:mt-2 lg:w-[90%] lg:justify-start lg:gap-[1.5rem]"
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

      <span className="mt-8 flex h-8 w-full items-center justify-center text-sm tracking-wide text-pink-500 md:mb-1 md:mt-3">
        {errorCredentials}
      </span>

      <div className="flex w-full flex-col items-center justify-center gap-4 md:-mt-4 lg:justify-start">
        <button
          type="submit"
          className="mt-2 w-[40%] rounded-md border-none bg-green-600 px-2 py-1 text-[1.1rem] text-white outline-none hover:bg-green-500 focus:bg-green-700 lg:mt-1"
        >
          Iniciar sesión
        </button>
        <span className="text-white">
          ¿Aun no tienes una cuenta?
          <Link to={"/register"} className="text-orange-400">
            {" "}
            Regístrate aquí
          </Link>
        </span>
      </div>
    </form>
  );
}

export default LoginForm;
