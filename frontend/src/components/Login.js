import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(${process.env.REACT_APP_USERS_API_URL}/auth/login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);

      alert('Login exitoso!');
      navigate('/admin');

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', maxWidth: '500px' }}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="maintenance-form">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}