import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Inventory from './components/Inventory';
import Maintenance from './components/Maintenance';
import Footer from './components/Footer';
import VehicleDetails from './components/VehicleDetails';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import AdminInventoryPanel from './components/AdminInventoryPanel';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* --- RUTAS TODOS --- */}
          <Route path="/" element={
            <>
              <Hero />
              <Inventory />
              <Maintenance />
            </>
          } />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/login" element={<Login />} />
          {/* --- RUTAS ADMIN --- */}
          <Route 
            path="/admin" 
            element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/inventory" 
            element={<ProtectedRoute><AdminInventoryPanel /></ProtectedRoute>} 
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;