import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Registro = () => {
    const { registro } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await registro(email, password);

        if (result.success) {
            alert("Se enviara un correo electronico a su casilla para confirmar su cuenta.")
            navigate("/"); // Redirigir a la página protegida
        } else {
            setError(result.message);
        }
    };

    return (
        <div>
            <h2>Registro</h2>
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
                <button type="submit">Registrarse</button>
            </form>
            <br />
            <button><Link to="/">Volver</Link></button>
        </div>
    );
};

export default Registro;
