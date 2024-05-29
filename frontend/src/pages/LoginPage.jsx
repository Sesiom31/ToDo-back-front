import Home from "../components/Home";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { isAuthenticated,} from "../store/authSlice";
import { Navigate } from "react-router-dom";

function LoginPage() {
  console.log("Login");
  const authenticated = useSelector(isAuthenticated);


  if (authenticated) return <Navigate to={"/profile"} />;

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
