import React, { useEffect, useRef } from 'react';

/**
 * Ambient3DBackground
 * Renders a lightweight, high-performance 3D floating constellation of golden & crimson particles
 * across the entire background of the homepage.
 * Features true 3D perspective projection, continuous gentle rotation, and scroll-reactive depth.
 */
export default function Ambient3DBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Track scroll for subtle 3D vertical drift
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity = (currentScroll - lastScrollY) * 0.05;
      lastScrollY = currentScroll;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3D Particle Constellation Setup
    const isMobile = width < 768;
    const count = isMobile ? 38 : 65;
    const focalLength = 320;
    const bounds = { x: 500, y: 600, z: 400 };

    const palette = [
      { r: 233, g: 30, b: 99, alpha: 0.50 },   // Radiant Rose (Hot Pink)
      { r: 186, g: 104, b: 200, alpha: 0.45 }, // Soft Lavender
      { r: 255, g: 128, b: 171, alpha: 0.60 }, // Coral Blossom
      { r: 255, g: 255, b: 255, alpha: 0.85 }, // White Stardust
    ];

    const particles = [];
    for (let i = 0; i < count; i++) {
      const color = palette[i % palette.length];
      particles.push({
        x: (Math.random() - 0.5) * bounds.x * 2,
        y: (Math.random() - 0.5) * bounds.y * 2,
        z: Math.random() * bounds.z,
        baseSize: Math.random() * 2.2 + 1.2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.25 - 0.15,
        vz: (Math.random() - 0.5) * 0.35,
        color: color,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let rotationAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotationAngle += 0.0015;
      scrollVelocity *= 0.92; // smooth decay

      const cx = width / 2;
      const cy = height / 2;
      const cosR = Math.cos(rotationAngle);
      const sinR = Math.sin(rotationAngle);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions
        p.x += p.vx;
        p.y += p.vy - scrollVelocity * 0.4;
        p.z += p.vz;
        p.phase += 0.02;

        // Wrap boundaries in 3D box
        if (p.x < -bounds.x) p.x = bounds.x;
        if (p.x > bounds.x) p.x = -bounds.x;
        if (p.y < -bounds.y) p.y = bounds.y;
        if (p.y > bounds.y) p.y = -bounds.y;
        if (p.z < 10) p.z = bounds.z;
        if (p.z > bounds.z) p.z = 10;

        // Apply slow 3D Y-axis rotation
        const rx = p.x * cosR - p.z * sinR;
        const rz = p.x * sinR + p.z * cosR + 200; // shift forward

        if (rz <= 0) continue;

        // 3D Perspective Projection formula
        const scale = focalLength / (focalLength + rz);
        const x2d = cx + rx * scale;
        const y2d = cy + p.y * scale;

        // Don't draw if outside visible viewport
        if (x2d < -20 || x2d > width + 20 || y2d < -20 || y2d > height + 20) continue;

        const size = Math.max(0.6, p.baseSize * scale * (1 + 0.25 * Math.sin(p.phase)));
        const alpha = Math.min(1, Math.max(0.08, p.color.alpha * scale * (1 + 0.3 * Math.sin(p.phase))));

        // Draw soft glowing 3D particle
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
        ctx.fill();

        // Subtle soft halo on larger particles
        if (size > 1.8) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.22})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-75"
      aria-hidden="true"
    />
  );
}
