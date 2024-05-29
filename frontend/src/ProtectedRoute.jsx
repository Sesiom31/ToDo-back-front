import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ element, authenticated }) {
  console.log(authenticated);
  return authenticated ? element : <Navigate to={"/login"} />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
