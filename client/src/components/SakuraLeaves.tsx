import React from 'react';

interface Leaf {
  id: number;
  left: number;     // Posición horizontal en porcentaje
  duration: number; // Duración de la animación en segundos
  delay: number;    // Retraso de inicio (negativo para comenzar ya en el ciclo)
}

const NUMBER_OF_LEAVES = 50;

const generateLeaves = (): Leaf[] => {
  return Array.from({ length: NUMBER_OF_LEAVES }, (_, i) => ({
    id: i,
    left: Math.random() * 100,            // Ubicación aleatoria en el eje X
    duration: 8 + Math.random() * 5,        // Duración entre 8 y 13 segundos
    delay: -Math.random() * 10,             // Retraso negativo para que ya aparezcan en mitad del ciclo
  }));
};

const SakuraLeaves: React.FC = () => {
  const leaves = generateLeaves();
  return (
    <div className="sakura-leaves">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="sakura-leaf"
          style={{
            left: `${leaf.left}%`,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SakuraLeaves;
