import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'var(--color-superficie)' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">Cheap Cars</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <HashLink className="nav-link" smooth to="/#inventario">Inventario</HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link" smooth to="/#mantenimiento">Mantenimiento</HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link" smooth to="/#contacto">Contacto</HashLink>
              </li>

              {isLoggedIn && (
                <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
              )}

              {isLoggedIn ? (
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}