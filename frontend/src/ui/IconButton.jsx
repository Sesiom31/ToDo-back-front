import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IconButton({ icon, htmlFor, className, onClick, title = "", type='button'}) {
  return (
    <button onClick={onClick} type={type} className=" aspect-square">
      <label htmlFor={htmlFor} className="cursor-pointer" title={title}>
        <FontAwesomeIcon icon={icon} className={className} />
      </label>
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string
};

export default IconButton;
