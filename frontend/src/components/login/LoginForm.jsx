import { faUser, faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../ui/InputField";
import loginSchema from "../../schemas/login.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUserRequest } from "../../api/user.request";
import { useDispatch } from "react-redux";
import { endLoading, startLoading, startLogin } from "../../store/authSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      dispatch(startLoading());
      const res = await loginUserRequest(data);
      console.log(res);
      dispatch(startLogin());
      navigate("/profile");
    } catch (err) {
      console.error("Error al iniciar sesión", err);
    } finally {
      dispatch(endLoading());
    }
  };

  return (
    <form
      className="flex h-auto w-full flex-col items-center justify-center gap-10 p-2 px-6 md:w-[65%] lg:mt-6 lg:w-[90%] lg:gap-[2rem]"
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

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="mt-12 w-[40%] rounded-md border-none bg-green-600 px-2 py-1 text-[1.1rem] text-white outline-none hover:bg-green-500 focus:bg-green-700 sm:mt-24"
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
