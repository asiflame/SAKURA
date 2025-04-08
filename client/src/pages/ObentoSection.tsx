// ObentoSection.tsx
import React, { useState } from "react";
import "../styles/ObentoSection.css";

interface Card {
  id: number;
  title: string;
  description: string;
  note: string;
  image: string;
}

const ObentoSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const cards: Card[] = [
    {
      id: 1,
      title: "Historia del Obento",
      description: "Representación artística del equilibrio y diseño en la cultura japonesa.",
      note: "Nota: El obento surge como forma de arte culinario.",
      image: "/assets/historia.jpg",
    },
    {
      id: 2,
      title: "Curiosidades",
      description: "Fusión de tradición y modernidad en sabores y colores.",
      note: "Nota: Los obentos combinan tradición con tendencias modernas.",
      image: "/assets/curiosidades.jpg",
    },
    {
      id: 3,
      title: "Personalización",
      description: "Opciones creativas y artísticas para cada ocasión.",
      note: "Nota: Personaliza tu obento para hacer cada ocasión única.",
      image: "/assets/personalizacion.jpg",
    },
  ];

  const handleCardClick = (cardId: number) => {
    setExpandedCard((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <section className="obento-section">
      <div className="obento-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`obento-card ${expandedCard === card.id ? "expanded" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <h3 className="obento-card-title">{card.title}</h3>
            <p className="obento-card-description">{card.description}</p>
            <div className="obento-overlay">
              <img src={card.image} alt={card.title} />
              <p className="obento-note">{card.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ObentoSection;
