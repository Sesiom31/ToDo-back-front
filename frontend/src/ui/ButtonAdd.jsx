import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonAdd({
  name,
  type = "button",
  classNameButton,
  icon,
  classNameIcon,
  onClick,
}) {
  return (
    <button className={classNameButton} onClick={onClick} type={type}>
      <h3>{name}</h3>
      {icon && <FontAwesomeIcon icon={icon} className={classNameIcon} />}
    </button>
  );
}

ButtonAdd.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  classNameButton: PropTypes.string,
  icon: PropTypes.object,
  classNameIcon: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonAdd;
