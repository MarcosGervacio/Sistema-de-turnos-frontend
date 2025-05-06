import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './calendarFix.css'; // Donde pondrás los estilos


const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [turnosDisponibles, setTurnosDisponibles] = useState([]);
    const [fechasConTurnos, setFechasConTurnos] = useState([]);


    if (!user) {
        return <p>No autorizado. Por favor, inicia sesión.</p>;
    }

    useEffect(() => {
        const fetchTurnos = async () => {
          const fecha = fechaSeleccionada.toISOString().split('T')[0]; // formato yyyy-mm-dd
          try {
            const response = await axios.get(`http://localhost:8081/api/turno/disponiblesPorFecha?fecha=${fecha}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            setTurnosDisponibles(response.data);
          } catch (error) {
            console.error('Error al obtener turnos', error);
          }
        };
    
        fetchTurnos();
      }, [fechaSeleccionada]);

      useEffect(() => {
        const fetchFechas = async () => {
          try {
            const response = await fetch('http://localhost:8081/api/turno/fechas', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            const fechas = await response.json(); // ejemplo: ['2025-05-06', '2025-05-08']
            setFechasConTurnos(fechas);
          } catch (error) {
            console.error("Error al obtener fechas con turnos", error);
          }
        };
    
        fetchFechas();
      }, []);

    return (
        <>
        <h1>HOLA</h1>
        <button onClick={() => { logout(); navigate("/"); }}>Cerrar Sesión</button>

        <div>
      <h2>Seleccioná una fecha:</h2>
      <Calendar onChange={setFechaSeleccionada} value={fechaSeleccionada}       tileClassName={({ date }) => {
        const fechaStr = date.toISOString().split('T')[0];
        return fechasConTurnos.includes(fechaStr) ? 'dia-con-turno' : null;
      }}/>

      <h3>Turnos disponibles para {fechaSeleccionada.toLocaleDateString()}:</h3>
      <ul>
        {turnosDisponibles.length === 0 ? (
          <li>No hay turnos disponibles.</li>
        ) : (
          turnosDisponibles.map((turno) => (
            <li key={turno.id}>
              {new Date(turno.fechaTurno).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              <span>HS</span>
              <button onClick={() => reservarTurno(turno.id)}>Reservar</button>
            </li>
          ))
        )}
      </ul>
    </div>
        </>
    );
};

export default Dashboard;
