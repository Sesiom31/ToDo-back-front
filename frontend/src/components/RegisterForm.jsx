import { faUser, faAt, faLock, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom'

function RegisterForm() {
  return (
    <form className=" w-4/5 h-auto p-2 flex flex-col justify-center items-center gap-6">
      <div className="flex w-full justify-center items-center px-2">
        <div className=" w-[30%] flex gap-4 items-center">
          <FontAwesomeIcon icon={faUser} className=" text-white" />
          <label htmlFor="username" className=" text-white">
            Nombre(s)
          </label>
        </div>

        <input
          type="text"
          className=" rounded-md py-1 px-2 w-[50%] focus:outline-none  focus:ring-2 focus:ring-sky-300 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="LeCorbusier31"
        />
      </div><div className="flex w-full justify-center items-center px-2">
        <div className=" w-[30%] flex gap-4 items-center">
          <FontAwesomeIcon icon={faUser} className=" text-white" />
          <label htmlFor="username" className=" text-white">
            Apellido(s)
          </label>
        </div>

        <input
          type="text"
          className=" rounded-md py-1 px-2 w-[50%] focus:outline-none  focus:ring-2 focus:ring-sky-300 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="LeCorbusier31"
        />
      </div>
      <div className="flex w-full justify-center items-center px-2">
        <div className=" w-[30%] flex gap-4 items-center">
          <FontAwesomeIcon icon={faUser} className=" text-white" />
          <label htmlFor="username" className=" text-white">
            Nombre de usuario
          </label>
        </div>

        <input
          type="text"
          className=" rounded-md py-1 px-2 w-[50%] focus:outline-none  focus:ring-2 focus:ring-sky-300 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="LeCorbusier31"
        />
      </div>
      <div className="flex w-full justify-center items-center px-2">
        <div className=" w-[30%] flex gap-4 items-center">
          <FontAwesomeIcon icon={faAt} className=" text-white" />
          <label htmlFor="email" className=" text-white">
            Email
          </label>
        </div>

        <input
          type="email"
          className=" rounded-md py-1 px-2 w-[50%] focus:outline-none  focus:ring-2 focus:ring-sky-300 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="email@abc.com"
        />
      </div>
      <div className="flex w-full justify-center items-center px-2">
        <div className=" w-[30%] flex gap-4 items-center">
          <FontAwesomeIcon icon={faLock} className=" text-white" />
          <label htmlFor="password" className=" text-white">
            Password
          </label>
        </div>

        <input
          type="password"
          className=" rounded-md py-1 px-2 w-[50%] focus:outline-none  focus:ring-2 focus:ring-sky-300 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="********"
        />
      </div>
      <div className="flex w-full justify-center items-center px-2">
        <div className=" w-[30%] flex gap-4 items-center">
          <FontAwesomeIcon icon={faGlobe} className=" text-white" />
          <label htmlFor="username" className=" text-white">
            País
          </label>
        </div>

        <input
          type="text"
          className=" rounded-md py-1 px-2 w-[50%] focus:outline-none  focus:ring-2 focus:ring-sky-300 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="LeCorbusier31"
        />
      </div>
      <button
        type="submit"
        className=" w-[40%] bg-green-600 mt-8 px-2 py-1 text-white text-[1.1rem] rounded-md"
      >
        Registrarse
      </button>
      <span className=" text-white">
        ¿Ya tienes una cuenta?
        <Link to={"/login"} className=" text-orange-400">
          {" "}
          Inicia sesión aqui
        </Link>
      </span>
    </form>
  );
}

export default RegisterForm;
