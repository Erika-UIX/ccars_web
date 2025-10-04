import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function VehicleDetails() {
  const { id } = useParams(); 
  const [vehicle, setVehicle] = useState(null); 

  useEffect(() => {
    fetch(`http://localhost:3001/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => setVehicle(data))
      .catch(error => console.error("Error al obtener detalle del vehículo:", error));
  }, [id]); 

  if (!vehicle) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <Link to="/#inventario" className="btn btn-outline-light mb-4">← Volver al Inventario</Link>
      <div className="row">
        <div className="col-md-8">
          <img src={vehicle.image} alt={vehicle.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-4">
          <h1>{vehicle.name}</h1>
          <p className="lead">{vehicle.description}</p>
          <h2 className="price mt-4">{vehicle.price}</h2>
        </div>
      </div>
    </div>
  );
}