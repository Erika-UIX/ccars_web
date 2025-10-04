const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002;
const verifyToken = require('./verifyToken');

app.use(cors());
app.use(express.json());

const appointments = [];
let nextAppointmentId = 1; 

// añadir una nueva cita
app.post('/api/appointments', (req, res) => {
  const newAppointment = req.body; 

  newAppointment.id = nextAppointmentId; 

  nextAppointmentId++; 

  appointments.push(newAppointment);

  console.log('Cita recibida y guardada:', newAppointment);

  res.status(201).json({ message: 'Cita agendada con éxito', appointment: newAppointment });
});

// endpoint para obtener las citas agendadas
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

// editar una cita ID
app.put('/api/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const appointmentIndex = appointments.findIndex(a => a.id === id);

  if (appointmentIndex !== -1) {
    appointments[appointmentIndex] = { ...appointments[appointmentIndex], ...updatedData };
    console.log('Cita actualizada:', appointments[appointmentIndex]);
    res.json(appointments[appointmentIndex]);
  } else {
    res.status(404).send('Cita no encontrada para actualizar');
  }
});

// BORRAR una cita por ID
app.delete('/api/appointments/:id', verifyToken, (req, res) => {

  if (req.user.role !== 'admin') {
    return res.status(403).send('Acción no permitida. Se requiere rol de administrador.');
  }

  const id = parseInt(req.params.id);
  const appointmentIndex = appointments.findIndex(a => a.id === id);

  if (appointmentIndex !== -1) {
    const deletedAppointment = appointments.splice(appointmentIndex, 1);
    console.log('Cita borrada:', deletedAppointment);
    res.json({ message: 'Cita borrada con éxito' });
  } else {
    res.status(404).send('Cita no encontrada para borrar');
  }
});

app.listen(PORT, () => {
  console.log(`Servicio de mantenimiento corriendo en http://localhost:${PORT}`);
});