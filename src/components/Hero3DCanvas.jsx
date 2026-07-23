import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Lights for luxury gold metallic reflection
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const goldPointLight1 = new THREE.PointLight(0xd4af37, 4, 20);
    goldPointLight1.position.set(5, 5, 5);
    scene.add(goldPointLight1);

    const goldPointLight2 = new THREE.PointLight(0xc5a059, 3, 20);
    goldPointLight2.position.set(-5, -5, 3);
    scene.add(goldPointLight2);

    const blueRimLight = new THREE.PointLight(0x3b82f6, 1.5, 20);
    blueRimLight.position.set(0, -6, -4);
    scene.add(blueRimLight);

    // Group for object rotation
    const group = new THREE.Group();
    scene.add(group);

    // 3D Geometry: Sophisticated Dual Torus Knot (Legal Equilibrium Sculpture)
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.85,
      roughness: 0.22,
      wireframe: false,
    });

    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x11131a,
      metalness: 0.95,
      roughness: 0.1,
    });

    // Outer Torus Knot
    const geometry1 = new THREE.TorusKnotGeometry(1.6, 0.22, 128, 32, 2, 3);
    const knot1 = new THREE.Mesh(geometry1, goldMaterial);
    group.add(knot1);

    // Inner Geometric Ring
    const geometry2 = new THREE.TorusGeometry(1.1, 0.05, 32, 100);
    const ring1 = new THREE.Mesh(geometry2, goldMaterial);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    // Subtle floating particles for ambient depth
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 60;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xc5a059,
      transparent: true,
      opacity: 0.5,
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.0005;
      mouseY = (event.clientY - windowHalfY) * 0.0005;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const onWindowResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth Rotation
      knot1.rotation.y = elapsedTime * 0.25;
      knot1.rotation.x = elapsedTime * 0.15;
      ring1.rotation.z = elapsedTime * -0.2;

      particleMesh.rotation.y = elapsedTime * 0.05;

      // Mouse Lerp Damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      group.rotation.y = targetX * 2;
      group.rotation.x = targetY * 2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry1.dispose();
      geometry2.dispose();
      goldMaterial.dispose();
      innerMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="hero-3d-canvas-container" />;
}
