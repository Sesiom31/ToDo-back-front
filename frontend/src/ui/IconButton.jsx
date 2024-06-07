import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IconButton({
  icon,
  htmlFor,
  classNameButton,
  className,
  onClick,
  title = "",
  type = "button",
}) {
  return (
    <button onClick={onClick} type={type} className={`${classNameButton} aspect-square"`}>
      <label htmlFor={htmlFor} className="flex cursor-pointer items-center" title={title}>
        <FontAwesomeIcon icon={icon} className={className} />
      </label>
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  htmlFor: PropTypes.string.isRequired,
  classNameButton: PropTypes.string,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default IconButton;
