import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Sakura3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sakuraRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    const loader = new GLTFLoader();
    loader.setPath('/models/');
    
    loader.load(
      'scene.gltf',
      (gltf) => {
        sakuraRef.current = gltf.scene;
        sakuraRef.current.scale.set(0.15, 0.15, 0.15); // Reducimos aún más el tamaño del árbol
        sakuraRef.current.position.set(0, -2, 0); // Ajustamos la posición para centrarlo mejor
        scene.add(sakuraRef.current);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );

    camera.position.set(0, 3, 15); // Alejamos la cámara aún más para ver el modelo completo

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleScroll = () => {
      if (sakuraRef.current) {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const rotationY = (scrollY / maxScroll) * Math.PI * 2; // Gira 360°
        sakuraRef.current.rotation.y = rotationY;

        // Efecto Parallax: movemos la cámara ligeramente hacia arriba
        camera.position.y = 3 + (scrollY / maxScroll) * 2;
      }
    };
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ height: '200vh', position: 'sticky', top: 0, overflow: 'hidden' }} />;
};

export default Sakura3D;
