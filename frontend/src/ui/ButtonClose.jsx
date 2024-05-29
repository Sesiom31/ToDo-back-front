import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'

function ButtonClose({ onClick }) {
  return (
    <div
      className="absolute z-[90] top-4 right-4 text-[1.5rem]"
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faXmark}
        className=" cursor-pointer rounded-full bg-white text-gray-600 aspect-square p-0.5 hover:scale-110"
      />
    </div>
  );
}

ButtonClose.propTypes = {
  onClick : PropTypes.func.isRequired
}


export default ButtonClose;
