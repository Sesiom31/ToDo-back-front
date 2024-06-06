import {
  faMagnifyingGlass,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  endLogin,
  clearUser,
  endLoading,
} from "../../../store/authSlice";
import { logoutUserRequest } from "../../../api/user.request";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import { capitalize } from "../../../utils/configString";
import IconButton from "../../../ui/IconButton";
import { getSearch, setSearch } from "../../../store/taskSlice";

function Header({ fullname }) {
  const [isFocus, setIsFocus] = useState(false);

  const navigate = useNavigate();
  const search = useSelector(getSearch);
  const dispatch = useDispatch();


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
      dispatch(endLoading());
    }
  };

  return (
    <header className="w-full h-20">
      <nav className=" w-full h-full bg-gray-800  flex justify-between items-center p-2 px-8 gap-4">
        <h1 className=" text-[#BFDBFE] text-3xl tracking-widest font-bold">
          Task
        </h1>

        <label
          className={`${
            isFocus && "ring-sky-500 ring-1"
          } w-[28rem] h-8 flex items-center justify-between bg-gray-700 rounded-md px-2`}
        >
          <IconButton
            icon={faMagnifyingGlass}
            htmlFor="search"
            className="text-[#BFDBFE] text-xl transform scale-x-[-1] text-[1.2rem] "
            type="search"
          />

          <input
            type="search"
            id="search"
            className=" rounded-md bg-gray-700 outline-none text-white px-3 w-[95%] "
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Buscar..."
            value={search}
            autoComplete="off"
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
            }}
          />
        </label>
        <div className="flex items-center gap-3  text-base ">
          <IconButton
            icon={faUser}
            htmlFor="user"
            className="text-sm text-gray-400"
          />
          <h3>{capitalize(fullname)}</h3>
        </div>

        <IconButton
          icon={faArrowRightFromBracket}
          htmlFor="logout"
          className=" text-[#BFDBFE] text-xl cursor-pointer hover:text-gray-400"
          onClick={handleLogout}
        />
      </nav>
    </header>
  );
}

Header.propTypes = {
  fullname: PropTypes.string.isRequired,
};

export default Header;
