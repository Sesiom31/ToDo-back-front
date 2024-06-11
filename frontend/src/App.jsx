import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import LoadingSpinner from "./components/comp/LoadingSpinner.jsx";
import { isAuthenticated, startLogin, getSpinner, playSpinner } from "./store/authSlice";
import { verifyUserRequest } from "./api/user.request";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const ProtectedRoute = lazy(()=> import('./ProtectedRoute.jsx'))

function App() {
  const authenticated = useSelector(isAuthenticated);
  const spinner = useSelector(getSpinner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(playSpinner());
    const verify = async () => {
      try {
        const res = await verifyUserRequest();
        if (res.authenticated) {
          dispatch(startLogin());
        }
      } catch (err) {
        console.log(err);
      }
    };
    verify();
  }, [dispatch]);

  return (
    <BrowserRouter>
      {spinner && <LoadingSpinner />}
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
