import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Sakura3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sakuraRef = useRef<THREE.Group | null>(null);
  const [showTitle, setShowTitle] = useState(false);
  let scrollProgress = 0;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0); // 🔥 Evita pantallazos blancos

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Iluminación
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x808080));

    // Cargar el modelo
    const loader = new GLTFLoader();
    loader.setPath('/models/');

    loader.load(
      'scene.gltf',
      (gltf) => {
        sakuraRef.current = gltf.scene;
        sakuraRef.current.scale.set(0.03, 0.03, 0.03); // Aumentamos el tamaño
        sakuraRef.current.position.set(0, -6, 0); // Bajamos más el modelo 3D
        scene.add(sakuraRef.current);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );

    camera.position.set(0, 0, 10);

    // 🔄 Nueva animación: movimiento suave
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.002;
      scrollProgress = Math.min(Math.max(scrollProgress + delta, 0), 1);

      if (sakuraRef.current) {
        sakuraRef.current.rotation.y = scrollProgress * 0.5;
        sakuraRef.current.scale.set(0.03 + scrollProgress * 0.01, 0.03 + scrollProgress * 0.01, 0.03 + scrollProgress * 0.01);
        if (scrollProgress >= 1) setShowTitle(true);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('wheel', handleScroll);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="sakura-section">
      <div ref={mountRef} className="sakura-canvas" />
      {showTitle && <h1 className="sakura-title" style={{ color: 'black' }}>"SAKURA"</h1>}
    </div>
  );
};

export default Sakura3D;
