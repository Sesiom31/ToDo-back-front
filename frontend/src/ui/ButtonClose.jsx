import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function ButtonClose({ icon, classNameButton, classNameIcon, onClick }) {
  return (
    <button className={classNameButton} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={classNameIcon} />
    </button>
  );
}

ButtonClose.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object,
  classNameButton: PropTypes.string,
  classNameIcon: PropTypes.string,
};

export default ButtonClose;
