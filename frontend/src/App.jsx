import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.auth.token);

  console.log(token);

  return (
    <BrowserRouter>
      <LoadingSpinner />
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} token={token} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
