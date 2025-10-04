import React, { useState, useEffect } from 'react';

export default function AdminInventoryPanel() {
  const [vehicles, setVehicles] = useState([]);
  
  // crear
  const [isCreating, setIsCreating] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ name: '', description: '', price: '', image: '' });
  
  // editar
  const [editingVehicle, setEditingVehicle] = useState(null); // Guardará el auto que estamos editando

  const token = localStorage.getItem('token');

  const fetchVehicles = () => {
    fetch(${process.env.REACT_APP_INVENTORY_API_URL}/api/vehicles)
      .then(res => res.json())
      .then(data => setVehicles(data))
      .catch(error => console.error("Error al obtener vehículos:", error));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // nuevo vehiculo
  const handleCreateChange = (e) => {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    fetch(${process.env.REACT_APP_INVENTORY_API_URL}/api/vehicles, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(newVehicle),
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al crear el vehículo.');
      alert('Vehículo añadido con éxito.');
      setIsCreating(false); // Ocultamos el formulario
      setNewVehicle({ name: '', description: '', price: '', image: '' }); // Limpiamos el formulario
      fetchVehicles(); // Recargamos la lista
    })
    .catch(error => alert(error.message));
  };

  // editar vehiculo
  const handleEditChange = (e) => {
    setEditingVehicle({ ...editingVehicle, [e.target.name]: e.target.value });
  };
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(${process.env.REACT_APP_INVENTORY_API_URL}/api/vehicles/${editingVehicle.id}, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(editingVehicle),
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al actualizar el vehículo.');
      alert('Vehículo actualizado con éxito.');
      setEditingVehicle(null); // Ocultamos el formulario de edición
      fetchVehicles(); // Recargamos la lista
    })
    .catch(error => alert(error.message));
  };

  // borrar
  const handleDelete = (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este vehículo?')) return;
    fetch(${process.env.REACT_APP_INVENTORY_API_URL}/api/vehicles/${id}, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('No tienes permiso para eliminar.');
      alert('Vehículo eliminado.');
      fetchVehicles();
    })
    .catch(error => alert(error.message));
  };

  return (
    <div className="container admin-panel">
      <h1>Panel de Administración de Inventario</h1>
      
      {!isCreating && !editingVehicle && (
        <button onClick={() => setIsCreating(true)} className="btn btn-primary mb-4">
          + Añadir Nuevo Vehículo
        </button>
      )}

      {isCreating && (
        <div className="form-container">
          <h3>Añadir Nuevo Vehículo</h3>
          <form onSubmit={handleCreateSubmit}>
            <input name="name" value={newVehicle.name} onChange={handleCreateChange} placeholder="Nombre (Ej: Audi A1 2024)" required />
            <input name="description" value={newVehicle.description} onChange={handleCreateChange} placeholder="Descripción" required />
            <input name="price" value={newVehicle.price} onChange={handleCreateChange} placeholder="Precio (Ej: $95,000.00)" required />
            <input name="image" value={newVehicle.image} onChange={handleCreateChange} placeholder="URL de la imagen" required />
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">Guardar</button>
              <button type="button" onClick={() => setIsCreating(false)} className="btn btn-secondary">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {editingVehicle && (
        <div className="form-container">
          <h3>Editando: {editingVehicle.name}</h3>
          <form onSubmit={handleEditSubmit}>
            <input name="name" value={editingVehicle.name} onChange={handleEditChange} placeholder="Nombre" required />
            <input name="description" value={editingVehicle.description} onChange={handleEditChange} placeholder="Descripción" required />
            <input name="price" value={editingVehicle.price} onChange={handleEditChange} placeholder="Precio" required />
            <input name="image" value={editingVehicle.image} onChange={handleEditChange} placeholder="URL de la imagen" required />
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">Actualizar</button>
              <button type="button" onClick={() => setEditingVehicle(null)} className="btn btn-secondary">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="appointment-list">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="appointment-card">
            <div>
              <p><strong>{vehicle.name}</strong></p>
              <p>Precio: {vehicle.price}</p>
            </div>
            <div className="card-buttons">
              <button onClick={() => setEditingVehicle(vehicle)} className="btn-edit">Editar</button>
              <button onClick={() => handleDelete(vehicle.id)} className="btn-delete">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}