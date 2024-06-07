import { faUser, faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../ui/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../../schemas/register.schema";
import { registerUserRequest } from "../../api/user.request";
import { useDispatch } from "react-redux";
import { startLoading, endLoading, startLogin } from "../../store/authSlice";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(startLoading());
      await registerUserRequest(data);
      dispatch(startLogin());
      navigate("/profile");
    } catch (err) {
      console.error("Error en el registro", err);
    } finally {
      dispatch(endLoading());
    }
  };

  return (
    <form
      className="flex h-auto w-full flex-col items-center justify-center gap-10 p-2 px-6 md:w-[65%] lg:mt-4 lg:w-[90%] lg:gap-[1.6rem]"
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
        placeholder={"juan-perez"}
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
      <div className="flex w-full flex-col items-center justify-center gap-4 lg:-mt-5">
        <button
          type="submit"
          className="mt-12 w-[40%] rounded-md border-none bg-green-600 px-2 py-1 text-[1.1rem] text-white outline-none hover:bg-green-500 focus:bg-green-700"
        >
          Registrarse
        </button>
        <span className="text-white">
          ¿Ya tienes una cuenta?
          <Link to={"/login"} className="text-orange-400">
            {" "}
            Inicia sesión aqui
          </Link>
        </span>
      </div>
    </form>
  );
}

export default RegisterForm;
