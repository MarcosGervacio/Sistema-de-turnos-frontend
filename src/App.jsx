import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import { useContext } from "react";
import Registro from "./components/Registro";
import Dashboard from "./components/Dashboard";
import MisTurnos from "./components/MisTurnos";
import './App.css'


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {

  return (
    <>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/registro" element={<Registro />} />
                    <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route exact path="/MisTurnos" element={<PrivateRoute><MisTurnos /></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </>
  )
}

export default App
