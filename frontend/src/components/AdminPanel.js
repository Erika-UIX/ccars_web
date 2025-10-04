import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function AdminPanel() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/appointments')
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(error => console.error("Error al obtener las citas:", error));
  }, []);

  // borrar una cita
  const handleDelete = (id) => {
    // confirmacion
    if (window.confirm('¿Estás seguro de que quieres borrar esta cita?')) {
      fetch(`http://localhost:3002/api/appointments/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(() => {
        alert('Cita borrada con éxito');
        setAppointments(appointments.filter(app => app.id !== id));
      })
      .catch(error => console.error("Error al borrar la cita:", error));
    }
  };

  return (
    <div className="container admin-panel">
      <h1>Administración de Citas</h1>

      {appointments.length === 0 ? (
        <p>No hay citas agendadas.</p>
      ) : (
        <div className="appointment-list">
          {/* aca muestro cada cita */}
          {appointments.map(app => (
            <div key={app.id} className="appointment-card">
              <div>
                <p><strong>Cliente:</strong> {app.name} ({app.email})</p>
                <p><strong>Vehículo:</strong> {app.vehicle}</p>
                <p><strong>Fecha:</strong> {app.date}</p>
              </div>
              <button onClick={() => handleDelete(app.id)} className="btn-delete">
                Borrar
              </button>
            </div>
          ))}
        </div>
      )}

      <Link to="/admin/inventory" className="btn btn-outline-light mb-4">
        Gestionar Inventario de Vehículos →
      </Link>
    </div>
  );
}