import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CrearTurnoComponent from "./CrearTurnoComponent";

const Administracion = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [turnosReservados, setTurnosReservados] = useState([]);

  const obtenerTurnosDisponibles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/turno/reservados`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTurnosReservados(response.data);
    } catch (error) {
      console.error("Error al obtener turnos", error);
    }
  };

    const eliminarTurno = async (idTurno) => {
        try {
            const response = await axios.delete(`http://localhost:8081/api/turno/${idTurno}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Turno eliminado con éxito");
            obtenerTurnosDisponibles(); 
        } catch (error) {
            console.error('Error al eliminar el turno', error);
        }
    }

    const rechazarTurno = async (idTurno) => {
        try {
            const response = await axios.patch(`http://localhost:8081/api/turno/rechazar/${idTurno}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Turno rechazado con éxito");
            obtenerTurnosDisponibles(); 
        } catch (error) {
            console.error('Error al rechazar el turno', error);
        }
    }

    const completarTurno = async (idTurno) => {
        try {
            const response = await axios.patch(`http://localhost:8081/api/turno/completado/${idTurno}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Turno completado con éxito");
            obtenerTurnosDisponibles(); 
        } catch (error) {
            console.error('Error al completar el turno', error);
        }
    }

  useEffect(() => {
    obtenerTurnosDisponibles();
  }, []);

  return (
    <>
      <h1>Administración</h1>
      <CrearTurnoComponent />
      <br />
      <br />
      <ul>
        {turnosReservados.length === 0 ? (
          <li>No hay turnos reservados.</li>
        ) : (
            turnosReservados.map((turno) => (
            <li key={turno.id}>
                <p>{turno.user.email}</p> 
                <p>{turno.servicio.nombre}</p>
                <p>{turno.domicilio}</p>
                <p>{turno.estado}</p>
                <label>fecha en que reservo el turno</label>
                <p>{new Date(turno.fechaReservada).toLocaleString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
                })}</p>
                <label>fecha del turno</label>
              <p>{new Date(turno.fechaTurno).toLocaleString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
                })}</p>
                <button onClick={() => eliminarTurno(turno.id)}>Eliminar</button>
                <button onClick={() => rechazarTurno(turno.id)}>Rechazar</button>
                <button onClick={() => completarTurno(turno.id)}>Completar</button>
            </li>
          ))
        )}
      </ul>
      <button onClick={() => navigate("/Dashboard")}>Volver</button>
    </>
  );
};

export default Administracion;
