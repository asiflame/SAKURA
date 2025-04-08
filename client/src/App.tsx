// App.tsx
import React from 'react';
import Sakura3D from './components/Sakura3D';
import ContentSection from './pages/ContentSection';
import ObentoSection from './pages/ObentoSection';
import SakuraLeaves from './components/SakuraLeaves';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sakura3D />
      <SakuraLeaves />
      <div className="spacer" />
      <ContentSection />
      <ObentoSection />
    </div>
  );
};

export default App;
