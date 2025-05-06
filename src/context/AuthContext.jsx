import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // Función para loguear al usuario
    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8081/api/auth/login", 
                { email, password }, // ✅ Enviar datos como JSON
                { headers: { "Content-Type": "application/json" } } // ✅ Especificar que es JSON
            );

            const { token } = response.data;
            setToken(token);
            localStorage.setItem("token", token);

            // Opcional: Decodificar el JWT para obtener información del usuario
            const userInfo = parseJwt(token);
            setUser(userInfo);

            return { success: true };
        } catch (error) {
            console.error("Error en login:", error);
            return { success: false, message: error.response?.data?.message || "Error en login" };
        }
    };

    const registro = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8081/api/auth/register", 
                { email, password }, // ✅ Enviar datos como JSON
                { headers: { "Content-Type": "application/json" } } // ✅ Especificar que es JSON
            );
            return { success: true };
        } catch (error) {
            console.error("Error en registro:", error);
            return { success: false, message: error.response?.data?.message || "Error en login" };
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    // Decodificar JWT para obtener información del usuario
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1])); // Decodificar payload del JWT
        } catch (e) {
            return null;
        }
    };

    // Verificar si el usuario está autenticado al cargar la app
    useEffect(() => {
        if (token) {
            const userInfo = parseJwt(token);
            setUser(userInfo);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, registro }}>
            {children}
        </AuthContext.Provider>
    );
};
