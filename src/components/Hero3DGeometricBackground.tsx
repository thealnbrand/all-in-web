"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DGeometricBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    // 1. Detect WebGL availability
    const checkWebGL = () => {
      try {
        const testCanvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 2. Initialize Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 3. 3D Geometric Group
    const group = new THREE.Group();
    scene.add(group);

    // Responsive position check
    const isMobile = width / height < 1.0;
    group.position.x = isMobile ? 1.5 : 0.2;
    group.position.y = 0.0;
    group.position.z = -0.2;

    // Base 3D architectural tilt (yaw, pitch)
    const baseRotX = -0.07;
    const baseRotY = -0.26;
    const baseRotZ = 0.03;
    group.rotation.set(baseRotX, baseRotY, baseRotZ);

    // 4. Primary 3D Extruded Diagonal Monolith
    const topCutX = 1.35;
    const bottomCutX = -0.35;
    const topY = 6.0;
    const bottomY = -6.0;
    const rightX = 14.0;

    const mainShape = new THREE.Shape();
    mainShape.moveTo(topCutX, topY);
    mainShape.lineTo(rightX, topY);
    mainShape.lineTo(rightX, bottomY);
    mainShape.lineTo(bottomCutX, bottomY);
    mainShape.closePath();

    const mainExtrudeSettings = {
      depth: 0.7,
      bevelEnabled: true,
      bevelThickness: 0.16,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 4,
    };

    const mainGeo = new THREE.ExtrudeGeometry(mainShape, mainExtrudeSettings);
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b0000,
      roughness: 0.26,
      metalness: 0.62,
    });
    const mainMesh = new THREE.Mesh(mainGeo, mainMaterial);
    group.add(mainMesh);

    // Sharp glowing crimson edges on primary monolith
    const mainEdgesGeo = new THREE.EdgesGeometry(mainGeo, 16);
    const mainEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.75,
    });
    const mainEdgeLines = new THREE.LineSegments(mainEdgesGeo, mainEdgeMaterial);
    mainMesh.add(mainEdgeLines);

    // 5. Secondary Crystalline Facet Wedge (Top-Right Depth Interlock)
    const facetShape = new THREE.Shape();
    facetShape.moveTo(2.1, 5.5);
    facetShape.lineTo(14.0, 5.5);
    facetShape.lineTo(14.0, 1.2);
    facetShape.closePath();

    const facetExtrudeSettings = {
      depth: 0.95,
      bevelEnabled: true,
      bevelThickness: 0.14,
      bevelSize: 0.08,
      bevelOffset: 0,
      bevelSegments: 3,
    };

    const facetGeo = new THREE.ExtrudeGeometry(facetShape, facetExtrudeSettings);
    const facetMaterial = new THREE.MeshStandardMaterial({
      color: 0x6e0000,
      roughness: 0.2,
      metalness: 0.75,
    });
    const facetMesh = new THREE.Mesh(facetGeo, facetMaterial);
    facetMesh.position.z = 0.1;
    group.add(facetMesh);

    // Glowing rim for secondary facet
    const facetEdgesGeo = new THREE.EdgesGeometry(facetGeo, 16);
    const facetEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0xff4d4d,
      transparent: true,
      opacity: 0.55,
    });
    const facetEdgeLines = new THREE.LineSegments(facetEdgesGeo, facetEdgeMaterial);
    facetMesh.add(facetEdgeLines);

    // 6. Lighting Architecture
    // A. Directional specular key light (sweeps across 3D beveled diagonal crest)
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(-2.5, 3.5, 4.5);
    scene.add(dirLight);

    // B. Intense Crimson Point Light placed along the diagonal seam
    const crimsonPointLight = new THREE.PointLight(0xef4444, 4.2, 14);
    crimsonPointLight.position.set(0.9, 1.0, 2.8);
    scene.add(crimsonPointLight);

    // C. Base Ambient Lighting (anchored to deep #0A0F1D)
    const ambientLight = new THREE.AmbientLight(0x0a0f1d, 1.3);
    scene.add(ambientLight);

    // D. Lower Crimson Rim Light
    const lowerRimLight = new THREE.PointLight(0x8b0000, 2.8, 10);
    lowerRimLight.position.set(2.5, -2.5, 2.0);
    scene.add(lowerRimLight);

    // 7. Interactive Mouse Parallax Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = nx;
      targetMouseY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Responsive Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const mobileNow = w / h < 1.0;
      group.position.x = mobileNow ? 1.5 : 0.2;
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.045;
      currentMouseY += (targetMouseY - currentMouseY) * 0.045;

      // Micro ambient float oscillation
      const time = clock.getElapsedTime();
      const idlePitch = Math.sin(time * 0.7) * 0.015;
      const idleYaw = Math.cos(time * 0.5) * 0.012;

      // Apply 3D perspective rotation
      group.rotation.x = baseRotX + currentMouseY * 0.12 + idlePitch;
      group.rotation.y = baseRotY + currentMouseX * 0.18 + idleYaw;

      // Light dynamic tracking
      crimsonPointLight.position.x = 0.9 + currentMouseX * 0.5;
      crimsonPointLight.position.y = 1.0 - currentMouseY * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      mainGeo.dispose();
      mainMaterial.dispose();
      mainEdgesGeo.dispose();
      mainEdgeMaterial.dispose();

      facetGeo.dispose();
      facetMaterial.dispose();
      facetEdgesGeo.dispose();
      facetEdgeMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: -1 }}
    >
      {hasWebGL ? (
        <>
          {/* Three.js 3D WebGL Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
          />

          {/* Deep Ambient Crimson Bloom behind 3D Monolith */}
          <div className="absolute top-[80px] right-0 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-[#8B0000]/20 rounded-full blur-[140px] pointer-events-none" />
        </>
      ) : (
        /* CSS 3D Perspective Fallback for non-WebGL environments */
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            perspective: '1400px',
            perspectiveOrigin: '70% 45%',
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-bl from-[#8B0000] via-[#750000] to-[#450000] shadow-[0_0_80px_rgba(139,0,0,0.4)]"
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 46% 100%, 76% 0)',
              transform: 'rotateY(-18deg) rotateX(8deg) translateZ(10px)',
              transformStyle: 'preserve-3d',
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-bl from-[#A30000] via-[#8B0000] to-[#500000]"
            style={{
              clipPath: 'polygon(100% 0, 100% 45%, 80% 0)',
              transform: 'rotateY(-24deg) rotateX(12deg) translateZ(30px)',
              transformStyle: 'preserve-3d',
            }}
          />
        </div>
      )}
    </div>
  );
};
