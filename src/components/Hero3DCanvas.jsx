import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    // WebGL Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // Graceful fallback
    }

    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Group for the entire 3D object
    const group = new THREE.Group();
    scene.add(group);

    // 1. Create the Parametric 3D Infinity Ribbon (Mobius / Lemniscate of Bernoulli Curve)
    const curvePoints = [];
    const segments = 220;
    const a = 9; // scale of infinity loop

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      // Lemniscate formula in 3D
      const scale = a / (1 + Math.sin(t) * Math.sin(t));
      const x = scale * Math.cos(t);
      const y = scale * Math.sin(t) * Math.cos(t);
      const z = Math.sin(t * 2) * 2.2;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(curvePoints, true);
    // Tube geometry for the flowing silk ribbon
    const tubeGeometry = new THREE.TubeGeometry(curve, 180, 0.45, 16, true);

    // Gradient Mesh Material with subtle sheen
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0xD9232D, // Sindoor Crimson
      roughness: 0.25,
      metalness: 0.75,
      emissive: 0x550a0f,
      emissiveIntensity: 0.4,
      wireframe: false,
    });

    const ribbonMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    group.add(ribbonMesh);

    // 2. Secondary Inner Golden Thread
    const innerTubeGeometry = new THREE.TubeGeometry(curve, 160, 0.15, 8, true);
    const innerTubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xE5983A, // Handloom Gold
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const innerRibbon = new THREE.Mesh(innerTubeGeometry, innerTubeMaterial);
    group.add(innerRibbon);

    // 3. Constellation Particles (Women connected across India)
    const particleCount = 750;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xD9232D); // Crimson
    const c2 = new THREE.Color(0xE5983A); // Gold
    const c3 = new THREE.Color(0xFFFFFF); // White light

    for (let i = 0; i < particleCount; i++) {
      // Pick a random point along the curve + random radial offset
      const t = Math.random();
      const pt = curve.getPoint(t);
      const offset = (Math.random() - 0.5) * 3.5;
      positions[i * 3] = pt.x + offset;
      positions[i * 3 + 1] = pt.y + offset;
      positions[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 4;

      const chosenColor = Math.random() > 0.5 ? (Math.random() > 0.5 ? c1 : c2) : c3;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xE5983A, 4, 50);
    goldPointLight.position.set(10, 10, 15);
    scene.add(goldPointLight);

    const crimsonPointLight = new THREE.PointLight(0xD9232D, 3, 50);
    crimsonPointLight.position.set(-10, -10, 10);
    scene.add(crimsonPointLight);

    // Mouse tracking & interactive drag
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = mouseX * 0.8;
      targetRotationX = 0.2 + mouseY * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!currentMount || !renderer) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle undulation
      group.rotation.y += 0.004;
      group.rotation.z = Math.sin(elapsedTime * 0.5) * 0.12;

      // Lerp rotation towards mouse position
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;

      // Pulse particle brightness
      particleMaterial.size = 0.16 + Math.sin(elapsedTime * 2.5) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      tubeGeometry.dispose();
      tubeMaterial.dispose();
      innerTubeGeometry.dispose();
      innerTubeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing overflow-hidden"
      title="Interactive 3D Infinity Ribbon of Faith"
    />
  );
}
