import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ element, token }) {
  console.log(token)
  return token ? element : <Navigate to={"/login"} />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)])
    
};

export default ProtectedRoute;
