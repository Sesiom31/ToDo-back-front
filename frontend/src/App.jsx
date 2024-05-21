import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
