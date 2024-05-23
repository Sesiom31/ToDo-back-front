import Home from "../components/Home";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyUserRequest } from "../api/user.request";
import { startLoading, startLogin, endLoading } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isVerify = async () => {
      try {
        dispatch(startLoading());
        const res = await verifyUserRequest();
        dispatch(startLogin(res.user.id));
        navigate("/profile");
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(endLoading());
      }
    };

    isVerify();
  }, [dispatch, navigate]);

  return (
    <section className=" flex h-screen w-full  ">
      <Home frase={"Bienvenido de nuevo"} />
      <section className="w-3/5 h-full bg-gradient-to-br from-slate-800 to-gray-950 flex flex-col justify-center items-center gap-8">
        <h2 className=" text-white text-3xl mb-4">Iniciar sesión</h2>
        <LoginForm />
      </section>
    </section>
  );
}

export default LoginPage;
