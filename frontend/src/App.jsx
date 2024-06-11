import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import LoadingSpinner from "./components/comp/LoadingSpinner.jsx";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticated, startLoading, endLoading, startLogin } from "./store/authSlice";
import { useEffect, lazy, Suspense } from "react";
import { verifyUserRequest } from "./api/user.request";

const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));

function App() {
  const authenticated = useSelector(isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const verify = async () => {
      try {
        dispatch(startLoading());
        const res = await verifyUserRequest();
        if (res.authenticated) {
          dispatch(startLogin());
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(endLoading());
      }
    };

    verify();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={authenticated ? "/profile" : "/login"} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute element={<ProfilePage />} authenticated={authenticated} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
