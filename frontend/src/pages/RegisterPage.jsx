import Home from "../components/Home";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <section className=" flex h-screen w-full  ">
      <Home frase={'Bienvenido a Task'} />
      <section className="w-3/5 h-full bg-gradient-to-br from-slate-800 to-gray-950 flex flex-col justify-center items-center gap-8">
        <h2 className=" text-white text-3xl mb-4">Registro</h2>
        <RegisterForm />
      </section>
    </section>
  );
}

export default RegisterPage;
