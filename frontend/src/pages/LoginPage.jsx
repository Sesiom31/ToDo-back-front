import Home from "../components/comp/Home";
import LoginForm from "../components/login/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import {  isAuthenticated,stopSpinner } from "../store/authSlice.js";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const authenticated = useSelector(isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stopSpinner());
  }, [dispatch]);

  if (authenticated) return <Navigate to={"/profile"} replace />;
  return (
    <section className="flex h-screen w-full flex-col md:flex-row">
      <Home frase={"Task"} />
      <section className="flex h-full w-full flex-col items-center justify-start gap-6 overflow-y-auto bg-gradient-to-br from-slate-800 to-gray-950 pt-12 sm:gap-8 sm:pt-16 md:w-full md:gap-10 lg:w-[60%] lg:gap-0 lg:pt-10 xl:justify-center">
        <h2 className="mb-6 text-4xl text-white lg:mt-10">Iniciar sesión</h2>
        <LoginForm />
      </section>
    </section>
  );
}

export default LoginPage;
