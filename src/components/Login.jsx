import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await login(email, password);

        if (result.success) {
            navigate("/dashboard"); // Redirigir a la página protegida
        } else {
            setError(result.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <br />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <br />
            <button><Link to="/registro">Registrarse</Link></button>
        </div>
    );
};

export default Login;
