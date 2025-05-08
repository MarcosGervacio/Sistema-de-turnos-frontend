import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const CrearTurnoComponent = () => {
    const { user, logout } = useContext(AuthContext);
    const { token } = useContext(AuthContext);
    const [fecha, setFecha] = useState("");

    if (!user.role == "ROLE_ADMIN") {
        return <p>No autorizado. Por favor, inicia sesión.</p>;
    }

    const crearTurno = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/api/turno/crear`, {
                fechaTurno: fecha
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFecha("");
            alert("Turno creado con éxito");
        } catch (error) {
            console.error('Error al crear el turno', error);
        }
    }



    return (
        <>
            <input
                type="text"
                placeholder="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
            />
            <button onClick={() => crearTurno()}>Crear turno</button>
        </>
        )
}

export default CrearTurnoComponent;