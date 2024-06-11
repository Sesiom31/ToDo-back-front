import { useSelector } from "react-redux";
import Home from "../components/comp/Home";
import RegisterForm from "../components/register/RegisterForm";
import { isAuthenticated } from "../store/authSlice";
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const authenticated = useSelector(isAuthenticated);

  if (authenticated) return <Navigate to={"/profile"} />;

  return (
    <section className="flex h-screen w-full flex-col md:flex-row">
      <Home frase={"Task"} />

      <section className="flex h-full w-full flex-col items-center justify-start gap-2 overflow-y-auto bg-gradient-to-br from-slate-800 to-gray-950 pt-12 md:pt-8 md:h-full lg:w-[60%] lg:gap-0 lg:overflow-hidden lg:pt-0 xl:justify-center">
        <h2 className="mb-6 text-4xl text-white lg:mt-8 lg:mb-2">Crear cuenta</h2>
        <RegisterForm />
      </section>
    </section>
  );
}

export default RegisterPage;
