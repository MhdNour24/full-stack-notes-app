import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ErrorPage from "./pages/Error/ErrorPage";
// Fixed import from ToastProvider instead of ToastPorvider
import { ToastProvider } from "./context/ToastContext";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <div>
      <ToastProvider>
        <ModalProvider>
          <Routes>
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ModalProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
