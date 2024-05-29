import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, endLogin, clearUser, endLoading } from "../../store/authSlice";
import { logoutUserRequest } from "../../api/user.request";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isFocus, setIsFocus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fullnameUser = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      dispatch(startLoading());
      await logoutUserRequest();
      navigate("/login");
      dispatch(clearUser());
    } catch (err) {
      console.error("Error en el cierre de sesión", err);
    } finally {
      dispatch(endLogin());
      dispatch(endLoading())
    }
  };

  return (
    <header className="w-full h-auto">
      <nav className=" w-full h-20 bg-gray-800  flex justify-between items-center p-2 px-8 gap-4">
        <h1 className=" text-[#BFDBFE] text-3xl tracking-widest font-bold">
          Task
        </h1>

        <label
          className={`${
            isFocus && "ring-sky-500 ring-1"
          } w-[28rem] h-8 flex items-center justify-between bg-gray-700 rounded-md px-2`}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-[#BFDBFE] text-xl transform scale-x-[-1] text-[1.2rem] "
          />
          <input
            type="search"
            className=" rounded-md bg-gray-700 outline-none text-white px-3 w-[95%] "
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Buscar..."
          />
        </label>
        <div className="flex items-center gap-3  text-base ">
          <FontAwesomeIcon icon={faUser} className="text-sm" />
          <h3>{fullnameUser}</h3>
        </div>

        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className=" text-[#BFDBFE] text-xl cursor-pointer hover:text-gray-400"
          onClick={handleLogout}
        />
      </nav>
    </header>
  );
}

export default Header;
