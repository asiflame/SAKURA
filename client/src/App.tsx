import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sakura3D from './components/Sakura3D';
import Home from './pages/Home';
import History from './pages/History';
import Symbolism from './pages/Symbolism';
import Gallery from './pages/Gallery';

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 4000); // Tiempo para que el árbol haga el giro completo
  }, []);

  return (
    <div>
      <Sakura3D />
      {showContent && (
        <div style={{ position: 'relative', zIndex: 1, background: '#fff5f7' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/symbolism" element={<Symbolism />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
