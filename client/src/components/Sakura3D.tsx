// components/Sakura3D.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Sakura3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sakuraRef = useRef<THREE.Group | null>(null);
  const [showTitle, setShowTitle] = useState(false);
  const scrollProgressRef = useRef(0);
  const allowScrollRef = useRef(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0x808080));

    const loader = new GLTFLoader();
    loader.setPath('/models/');
    loader.load(
      'scene.gltf',
      (gltf) => {
        sakuraRef.current = gltf.scene;
        sakuraRef.current.scale.set(0.03, 0.03, 0.03);
        sakuraRef.current.position.set(0, -6, 0);
        scene.add(sakuraRef.current);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );

    camera.position.set(0, 0, 10);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const handleWheel = (e: WheelEvent) => {
      if (!allowScrollRef.current) {
        e.preventDefault();
        const delta = e.deltaY * 0.002;
        let newProgress = scrollProgressRef.current + delta;
        newProgress = Math.min(Math.max(newProgress, 0), 1);
        scrollProgressRef.current = newProgress;

        if (sakuraRef.current) {
          sakuraRef.current.rotation.y = newProgress * 0.5;
          const scale = 0.03 + newProgress * 0.01;
          sakuraRef.current.scale.set(scale, scale, scale);
        }

        if (newProgress >= 1) {
          setShowTitle(true);
          allowScrollRef.current = true;
          document.body.style.overflowY = 'auto';
          document.body.style.overflowX = 'hidden';
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="sakura-section">
      <div ref={mountRef} className="sakura-canvas" />
      {showTitle && (
        <h1 className="sakura-title" style={{ color: 'black' }}>
          "SAKURA"
        </h1>
      )}
      {showTitle && (
        <h1 className="sakura-subtitle" style={{ color: 'black' }}>
          ASIER R.
        </h1>
      )}
    </div>
  );
};

export default Sakura3D;
