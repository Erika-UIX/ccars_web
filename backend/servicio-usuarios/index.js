const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3003;
const JWT_SECRET = 'este-es-un-secreto-muy-secreto';

app.use(cors());
app.use(express.json());

// contraseña 
const adminPassword = 'admin123';
// hash síncrona al iniciar
const adminPasswordHash = bcrypt.hashSync(adminPassword, 10);

const users = [
  {
    id: 1,
    email: 'admin@cheapcars.com',
    passwordHash: adminPasswordHash,
    role: 'admin'
  }
];
// ---------------------------

// endpoint para Iniciar Sesión (autenticacion)
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login exitoso', token });
});

app.listen(PORT, () => {
  console.log(`Servicio de usuarios corriendo en http://localhost:${PORT}`);
  console.log(`Hash para la contraseña 'admin123' es: ${adminPasswordHash}`);
});