import {
  faMagnifyingGlass,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { endLogin, clearUser, playSpinner, stopSpinner } from "../../../store/authSlice";
import { logoutUserRequest } from "../../../api/user.request";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import { capitalize } from "../../../utils/configString";
import IconButton from "../../../ui/IconButton";
import { clearTasks, getSearch, setSearch } from "../../../store/taskSlice";

function Header({ fullname }) {
  const [isFocus, setIsFocus] = useState(false);

  const navigate = useNavigate();
  const search = useSelector(getSearch);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(playSpinner());
      dispatch(clearUser());
      dispatch(clearTasks());
      await logoutUserRequest();
      navigate("/login");
    } catch (err) {
      console.error("Error en el cierre de sesión", err);
    } finally {
      dispatch(endLogin());
      dispatch(stopSpinner());
    }
  };

  return (
    <header className="h-20 w-full border-b border-b-gray-400">
      <nav className="flex h-full w-full items-center justify-between gap-4 bg-gray-800 p-2 px-8">
        <h1
          className={`hidden text-3xl font-bold tracking-widest text-[#BFDBFE] sm:block`}
        >
          Task
        </h1>

        <label
          className={`${
            isFocus && "ring-1 ring-sky-500"
          } flex h-8 w-[14rem] items-center justify-between rounded-md bg-gray-700 px-2 sm:w-80 lg:w-[25rem]`}
        >
          <IconButton
            icon={faMagnifyingGlass}
            htmlFor="search"
            className="scale-x-[-1] transform text-[1rem] text-xl text-[#BFDBFE]"
            type="search"
          />

          <input
            type="search"
            id="search"
            className="w-[95%] rounded-md bg-gray-700 px-3 text-white outline-none"
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
        <div className="flex items-center gap-3 text-base">
          <IconButton icon={faUser} htmlFor="user" className="text-sm text-gray-400" />
          <h3 className="self-center text-sm">{capitalize(fullname)}</h3>
        </div>

        <IconButton
          icon={faArrowRightFromBracket}
          htmlFor="logout"
          className="cursor-pointer text-xl text-[#BFDBFE] hover:text-gray-400"
          onClick={handleLogout}
          classNameButton={"-mr-1"}
        />
      </nav>
    </header>
  );
}

Header.propTypes = {
  fullname: PropTypes.string.isRequired,
};

export default Header;
