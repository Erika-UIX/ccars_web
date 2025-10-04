const express = require('express');
const cors = require('cors');
const verifyToken = require('./verifyToken');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let nextVehicleId = 9; 
let vehicles = [
  { id: 1, name: 'Audi A1 2024', description: 'Deportivo rojo, potencia pura.', price: '$95,000.00', image: 'https://images.unsplash.com/photo-1590363719229-25b5e87b8983?q=80&w=1171&auto=format' },
  { id: 2, name: 'Infiniti QX80 2025', description: 'Ideal para la familia y la aventura.', price: '$110,000.00', image: 'https://images.unsplash.com/photo-1722352138947-b9d328e48c0a?q=80&w=1169&auto=format' },
  { id: 3, name: 'Audi A3 Sedan 2024', description: 'El balance perfecto entre elegancia.', price: '$87,500.00', image: 'https://images.unsplash.com/photo-1758311177426-c57943c1a5c5?q=80&w=1332&auto=format' },
  { id: 4, name: 'BMW X5 2025', description: 'Lujo y rendimiento en cada viaje.', price: '$120,000.00', image: 'https://images.unsplash.com/photo-1650369446487-88da5c2ca105?q=80&w=1170&auto=format' },
  { id: 5, name: 'Mercedes-Benz GLE 2024', description: 'Tecnología avanzada y confort.', price: '$115,000.00', image: 'https://images.unsplash.com/photo-1654306369985-0fb9e1a2baf5?q=80&w=1170&auto=format' },
  { id: 6, name: 'Lexus RX 2025', description: 'Diseño sofisticado y eficiencia.', price: '$105,000.00', image: 'https://images.unsplash.com/photo-1746123249833-5625967e8bf1?q=80&w=1170&auto=format' },
  { id: 7, name: 'Volvo XC90 2024', description: 'Seguridad y estilo en cada detalle.', price: '$98,000.00', image: 'https://media.ed.edmunds-media.com/volvo/xc90/2024/oem/2024_volvo_xc90_4dr-suv_recharge-t8-ultimate_fq_oem_1_1600.jpg' },
  { id: 8, name: 'Cadillac Escalade 2025', description: 'Presencia imponente y lujo.', price: '$130,000.00', image: 'https://www.cadillac.com/content/dam/cadillac/na/us/english/index/vehicles/2026/suvs/escalade-mcm/overview/in-page-gallery/my25-escalade-mov-gallery-grid-exterior-front-grille-v2.jpg' }
];

// para todos los usuarios
app.get('/api/vehicles', (req, res) => res.json(vehicles));
app.get('/api/vehicles/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
  if (vehicle) res.json(vehicle);
  else res.status(404).send('Vehículo no encontrado');
});

// para admin
app.post('/api/vehicles', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  const newVehicle = { id: nextVehicleId++, ...req.body };
  vehicles.push(newVehicle);
  res.status(201).json(newVehicle);
});

// actualizar
app.put('/api/vehicles/:id', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  const index = vehicles.findIndex(v => v.id === parseInt(req.params.id));
  if (index !== -1) {
    vehicles[index] = { ...vehicles[index], ...req.body };
    res.json(vehicles[index]);
  } else {
    res.status(404).send('Vehículo no encontrado');
  }
});

// Borrar inventario
app.delete('/api/vehicles/:id', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  const index = vehicles.findIndex(v => v.id === parseInt(req.params.id));
  if (index !== -1) {
    vehicles.splice(index, 1);
    res.json({ message: 'Vehículo eliminado' });
  } else {
    res.status(404).send('Vehículo no encontrado');
  }
});

app.listen(PORT, () => {
  console.log(`Servicio de inventario corriendo en http://localhost:${PORT}`);
});

/*
vehicles = [
  { id: 1, name: 'Audi A1 2024', description: 'Deportivo rojo, potencia pura.', price: '$95,000.00', image: 'https://images.unsplash.com/photo-1590363719229-25b5e87b8983?q=80&w=1171&auto=format' },
  { id: 2, name: 'Infiniti QX80 2025', description: 'Ideal para la familia y la aventura.', price: '$110,000.00', image: 'https://images.unsplash.com/photo-1722352138947-b9d328e48c0a?q=80&w=1169&auto=format' },
  { id: 3, name: 'Audi A3 Sedan 2024', description: 'El balance perfecto entre elegancia.', price: '$87,500.00', image: 'https://images.unsplash.com/photo-1758311177426-c57943c1a5c5?q=80&w=1332&auto=format' },
  { id: 4, name: 'BMW X5 2025', description: 'Lujo y rendimiento en cada viaje.', price: '$120,000.00', image: 'https://images.unsplash.com/photo-1650369446487-88da5c2ca105?q=80&w=1170&auto=format' },
  { id: 5, name: 'Mercedes-Benz GLE 2024', description: 'Tecnología avanzada y confort.', price: '$115,000.00', image: 'https://images.unsplash.com/photo-1654306369985-0fb9e1a2baf5?q=80&w=1170&auto=format' },
  { id: 6, name: 'Lexus RX 2025', description: 'Diseño sofisticado y eficiencia.', price: '$105,000.00', image: 'https://images.unsplash.com/photo-1746123249833-5625967e8bf1?q=80&w=1170&auto=format' },
  { id: 7, name: 'Volvo XC90 2024', description: 'Seguridad y estilo en cada detalle.', price: '$98,000.00', image: 'https://media.ed.edmunds-media.com/volvo/xc90/2024/oem/2024_volvo_xc90_4dr-suv_recharge-t8-ultimate_fq_oem_1_1600.jpg' },
  { id: 8, name: 'Cadillac Escalade 2025', description: 'Presencia imponente y lujo.', price: '$130,000.00', image: 'https://www.cadillac.com/content/dam/cadillac/na/us/english/index/vehicles/2026/suvs/escalade-mcm/overview/in-page-gallery/my25-escalade-mov-gallery-grid-exterior-front-grille-v2.jpg' }
]; */