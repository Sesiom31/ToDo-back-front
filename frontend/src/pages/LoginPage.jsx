import Home from "../components/comp/Home";
import LoginForm from "../components/login/LoginForm";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../store/authSlice";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const authenticated = useSelector(isAuthenticated);

  if (authenticated) return <Navigate to={"/profile"} />;

  return (
    <section className="flex h-screen w-full flex-col lg:flex-row">
      <Home frase={"Task"} />
      <section className="flex h-full w-full flex-col items-center justify-start gap-6 overflow-y-auto bg-gradient-to-br from-slate-800 to-gray-950 pt-12 sm:gap-8 sm:pt-16 md:gap-12 lg:w-[60%] lg:pt-10 xl:justify-center">
        <h2 className="mb-6 text-4xl text-white lg:mt-10">Iniciar sesión</h2>
        <LoginForm />
      </section>
    </section>
  );
}

export default LoginPage;
