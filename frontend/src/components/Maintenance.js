import React, { useState } from 'react';

export default function Maintenance() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 

    const appointmentData = { name, email, vehicle, date };

    fetch(`${process.env.REACT_APP_MAINTENANCE_API_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      alert('¡Cita agendada con éxito!'); 
      // Limpiamos el formulario
      setName('');
      setEmail('');
      setVehicle('');
      setDate('');
    })
    .catch(error => {
      console.error('Error al agendar la cita:', error);
      alert('Hubo un error al agendar la cita.');
    });
  };

  return (
    <section id="mantenimiento">
      <h3>Mantenimiento Preventivo Eficiente</h3>
      <p>Agenda una cita en cualquiera de nuestras sucursales.</p>

      <form onSubmit={handleSubmit} className="maintenance-form">
        <input 
          type="text" 
          placeholder="Tu Nombre Completo" 
          value={name}
          onChange={e => setName(e.target.value)}
          required 
        />
        <input 
          type="email" 
          placeholder="Tu Correo Electrónico" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          required 
        />
        <input 
          type="text" 
          placeholder="Marca y Modelo de tu Vehículo" 
          value={vehicle}
          onChange={e => setVehicle(e.target.value)}
          required 
        />
        <input 
          type="date" 
          value={date}
          onChange={e => setDate(e.target.value)}
          required 
        />
        <button type="submit" className="btn btn-primary">Agendar Cita</button>
      </form>
    </section>
  );
}