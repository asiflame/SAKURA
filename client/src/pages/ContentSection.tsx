// pages/ContentSection.tsx
import React from 'react';
import '../styles/ContentSection.css';

const ContentSection: React.FC = () => {
  return (
    <div id="content-section" className="content-section">
      <div className="card card-image">
        <img src="/assets/sakura.jpg" alt="Sakura en flor" />
      </div>
      <div className="card card-text">
        <h2>El Significado del Sakura</h2>
        <p>
          Los cerezos sakura son un símbolo de belleza efímera y renovación en la cultura japonesa.
        </p>
      </div>
      <div className="card card-text">
        <h2>Festivales de Sakura</h2>
        <p>
          Cada primavera, millones de personas acuden a festivales "Hanami" para disfrutar de la magia de los cerezos en flor.
        </p>
      </div>
    </div>
  );
};

export default ContentSection;
