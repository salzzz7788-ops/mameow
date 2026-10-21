"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface EcosystemNetworkBackgroundProps {
  className?: string;
}

export default function EcosystemNetworkBackground({
  className = "",
}: EcosystemNetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- Scene, Fog, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080203, 0.012);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 36);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Plexus Nodes (Particles) Setup ---
    const particleCount = 110;
    const maxDistance = 10.5;
    const maxConnections = particleCount * 7;

    const particlesData: {
      velocity: THREE.Vector3;
      numConnections: number;
    }[] = [];

    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorCrimson = new THREE.Color(0xff003c);
    const colorTeal = new THREE.Color(0x00e5bf);
    const colorWhite = new THREE.Color(0xffffff);

    const spreadX = 56;
    const spreadY = 42;
    const spreadZ = 28;

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * spreadX;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;

      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.035,
          (Math.random() - 0.5) * 0.035,
          (Math.random() - 0.5) * 0.025
        ),
        numConnections: 0,
      });

      const rand = Math.random();
      const col = rand > 0.65 ? colorTeal : rand > 0.3 ? colorCrimson : colorWhite;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    // Circular Glow Texture for Nodes
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 50, 90, 0.9)");
      grad.addColorStop(0.7, "rgba(255, 0, 60, 0.3)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const nodeTexture = new THREE.CanvasTexture(pCanvas);

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1.25,
      map: nodeTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(pointCloud);

    // --- Dynamic Laser Connection Lines ---
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    linesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // --- Mouse & Scroll Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- Animation Loop ---
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      let vertexPosIndex = 0;
      let colorIndex = 0;
      let lineSegmentsCount = 0;

      for (let i = 0; i < particleCount; i++) {
        particlesData[i].numConnections = 0;
      }

      // 1. Move and bounce nodes
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particlePositions[i3] += particlesData[i].velocity.x;
        particlePositions[i3 + 1] += particlesData[i].velocity.y;
        particlePositions[i3 + 2] += particlesData[i].velocity.z;

        // Boundary bounce
        if (Math.abs(particlePositions[i3]) > spreadX / 2) {
          particlesData[i].velocity.x = -particlesData[i].velocity.x;
        }
        if (Math.abs(particlePositions[i3 + 1]) > spreadY / 2) {
          particlesData[i].velocity.y = -particlesData[i].velocity.y;
        }
        if (Math.abs(particlePositions[i3 + 2]) > spreadZ / 2) {
          particlesData[i].velocity.z = -particlesData[i].velocity.z;
        }

        // 2. Connect nearby nodes
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const dx = particlePositions[i3] - particlePositions[j3];
          const dy = particlePositions[i3 + 1] - particlePositions[j3 + 1];
          const dz = particlePositions[i3 + 2] - particlePositions[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance && lineSegmentsCount < maxConnections) {
            const alpha = 1.0 - Math.sqrt(distSq) / maxDistance;

            // Start Vertex
            linePositions[vertexPosIndex++] = particlePositions[i3];
            linePositions[vertexPosIndex++] = particlePositions[i3 + 1];
            linePositions[vertexPosIndex++] = particlePositions[i3 + 2];

            // End Vertex
            linePositions[vertexPosIndex++] = particlePositions[j3];
            linePositions[vertexPosIndex++] = particlePositions[j3 + 1];
            linePositions[vertexPosIndex++] = particlePositions[j3 + 2];

            // Color gradient along line (Crimson to Teal/Pink)
            const r = colorCrimson.r * alpha * 0.85;
            const g = colorCrimson.g * alpha * 0.85;
            const b = (colorCrimson.b + 0.3) * alpha * 0.85;

            lineColors[colorIndex++] = r;
            lineColors[colorIndex++] = g;
            lineColors[colorIndex++] = b;

            lineColors[colorIndex++] = r * 0.8;
            lineColors[colorIndex++] = g + 0.2 * alpha;
            lineColors[colorIndex++] = b;

            lineColors[colorIndex++] = colorTeal.b * alpha;

            lineSegmentsCount++;
          }
        }
      }

      linesMesh.geometry.setDrawRange(0, lineSegmentsCount * 2);
      (linesMesh.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (linesMesh.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
      (pointCloud.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Smooth mouse parallax
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      scene.rotation.y = targetX * 0.22;
      scene.rotation.x = -targetY * 0.16;

      // Smooth continuous scroll navigation through the network universe
      scrollY += (targetScrollY - scrollY) * 0.045;
      camera.position.y = -scrollY * 0.012;
      camera.position.z = 36 + Math.sin(scrollY * 0.0015) * 3;

      // Adapt fog to dark and light themes dynamically
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      if (scene.fog) {
        scene.fog.color.setHex(isLight ? 0xf5f6f9 : 0x080203);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth || window.innerWidth;
      height = containerRef.current.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      nodeTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
