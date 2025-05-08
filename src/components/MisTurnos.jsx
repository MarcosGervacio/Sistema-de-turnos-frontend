import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const MisTurnos = () => {
const { user, logout } = useContext(AuthContext);
const { token } = useContext(AuthContext);
const [turnos, setTurnos] = useState([]);
const navigate = useNavigate();

const cancelarTurno = async (idTurno) => {
    try {
        const response = await axios.patch(`http://localhost:8081/api/turno/cancelar/${idTurno}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        alert("Turno cancelado con éxito");
        await consultarTurnos();
    } catch (error) {
        console.error('Error al cancelar el turno', error);
    }
};


const consultarTurnos = async () => {
    try {
        const response = await axios.get(`http://localhost:8081/api/turno/usuario/${user.sub}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setTurnos(response.data);
    } catch (error) {
        console.error('Error al obtener turnos', error);
    }
    }

useEffect(() => {
    consultarTurnos();}, []);


  return (
    <div>
      <h1>Mis Turnos de {user.sub}</h1>
      <button onClick={() => navigate("/Dashboard")}>Volver</button>
      <p>Aquí puedes ver tu hisotirla de turnos.</p>
      <ul>
      {turnos.length === 0 ? (
          <li>Nunca tienes turnos.</li>
        ) : (
            [...turnos]
            .sort((a, b) => new Date(b.fechaTurno) - new Date(a.fechaTurno))
            .map((turno) => (
            <li key={turno.id}>
                <p>Fecha: {turno.fechaTurno}</p>
                <p>Servicio: {turno.servicio.nombre}</p>
                <p>Domicilio: {turno.domicilio}</p>
                <p>Estado: {turno.estado}</p>
                {turno.estado === "reservado" ? (
                <button onClick={() => cancelarTurno(turno.id)}>Cancelar</button>
                ) : null}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default MisTurnos;