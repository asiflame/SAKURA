import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/history">Historia</Link>
      <Link to="/symbolism">Simbolismo</Link>
      <Link to="/gallery">Galería</Link>
    </nav>
  );
};

export default Navbar;