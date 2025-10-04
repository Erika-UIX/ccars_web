import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Inventory() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/vehicles')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error al obtener los vehículos:', error));
  }, []);

  return (
    <section id="inventario">
      <h3>Nuestro Inventario</h3>
      <div className="inventory-grid">
        {vehicles.map(vehicle => (
          <Link to={`/vehicle/${vehicle.id}`} key={vehicle.id} className="car-card-link">
            <article className="car-card">
              <img src={vehicle.image} alt={vehicle.name}/>
              <div className="car-card-info">
                <h4>{vehicle.name}</h4>
                <p>{vehicle.description}</p>
                <div className="price">{vehicle.price}</div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}