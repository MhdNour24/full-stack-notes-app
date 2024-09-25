import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ErrorPage from "./pages/Error/ErrorPage";
// Fixed import from ToastProvider instead of ToastPorvider
import { ToastProvider } from "./context/ToastContext";
import { ModalProvider } from "./context/ModalContext";
import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.notes.token));
  
  return (
    <div> 
      <ToastProvider>
        <ModalProvider>
          <Routes>
            <Route path="/dashboard"  element={isAuth ? <Home /> :<Login />} />
            <Route path="/login"  element={!isAuth ? <Login />:<Navigate to="/dashboard" /> }  />
            <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> :<Navigate to="/login" />} />
            <Route path="/signUp"  element={!isAuth ? <SignUp /> :  <Navigate to="/dashboard" /> } />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ModalProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
