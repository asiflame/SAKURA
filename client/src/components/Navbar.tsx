import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={{ backgroundColor: '#f8c1cc', padding: '10px', textAlign: 'center' }}>
      <Link to="/" style={{ margin: '0 15px', color: '#333', textDecoration: 'none' }}>Inicio</Link>
      <Link to="/history" style={{ margin: '0 15px', color: '#333', textDecoration: 'none' }}>Historia</Link>
      <Link to="/symbolism" style={{ margin: '0 15px', color: '#333', textDecoration: 'none' }}>Simbolismo</Link>
      <Link to="/gallery" style={{ margin: '0 15px', color: '#333', textDecoration: 'none' }}>Galería</Link>
    </nav>
  );
};

export default Navbar;