"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  className?: string;
}

export default function ThreeBackground({ className = "" }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- Scene, Orthographic Camera, Renderer for Fullscreen Plasma Shader ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // --- GLSL Liquid Crimson Aurora / Plasma Shader ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 vUv;

      // Smooth noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                           -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Fractional Brownian Motion for fluid liquid waves
      float fbm(vec2 p) {
        float val = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        for (int i = 0; i < 4; i++) {
          val += amp * snoise(p * freq);
          freq *= 2.05;
          amp *= 0.5;
        }
        return val;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.y, u_resolution.x);

        // Fluid time scale
        float t = u_time * 0.18;

        // Interactive mouse disturbance
        vec2 mouseOffset = (u_mouse - 0.5) * 0.45;
        vec2 p = uv * 1.8 + mouseOffset * 0.3;

        // Domain warping: distortion inside distortion gives organic ethereal plasma
        vec2 q = vec2(
          fbm(p + vec2(0.0, t * 0.3)),
          fbm(p + vec2(1.7, t * 0.25))
        );

        vec2 r = vec2(
          fbm(p + 3.0 * q + vec2(1.2, 3.4) + t * 0.2),
          fbm(p + 3.0 * q + vec2(8.3, 2.8) + t * 0.15)
        );

        float f = fbm(p + 3.5 * r);

        // Rich cyberpunk crimson color palette
        vec3 colBlack = vec3(0.031, 0.008, 0.012);   // #080203 Deep Void
        vec3 colDarkWine = vec3(0.24, 0.015, 0.05);   // Deep wine crimson
        vec3 colCrimson = vec3(1.0, 0.0, 0.235);      // #ff003c Neon Red
        vec3 colRoseGlow = vec3(1.0, 0.35, 0.55);     // Glowing ruby rose
        vec3 colCoreCyan = vec3(0.0, 0.85, 1.0);      // Ethereal subtle cyan glint

        // Interpolate colors through the noise energy field
        vec3 color = mix(colBlack, colDarkWine, clamp(f * f * 2.5, 0.0, 1.0));
        color = mix(color, colCrimson, clamp(length(q) * 0.9, 0.0, 1.0));
        color = mix(color, colRoseGlow, clamp(length(r.x) * 0.45, 0.0, 1.0));

        // Subtle electric energy highlight pulses
        float glowPulse = sin(u_time * 1.2 + f * 4.0) * 0.5 + 0.5;
        color += colCoreCyan * pow(clamp(f, 0.0, 1.0), 4.5) * 0.35 * glowPulse;

        // Soft center vignette so content is never overwhelmed
        float distFromCenter = length(uv * 1.2);
        float vignette = smoothstep(1.3, 0.2, distFromCenter);
        color *= (0.45 + 0.55 * vignette);

        // Atmosphere grain
        float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        color += (grain - 0.5) * 0.025;

        gl_FragColor = vec4(color, 0.92);
      }
    `;

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --- Floating Ambient Plasma Embers ---
    const emberCount = 120;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    const emberColors = new Float32Array(emberCount * 3);

    const cNeon = new THREE.Color(0xff003c);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 2;
      emberPos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      emberPos[i * 3 + 2] = 0;

      const col = Math.random() > 0.7 ? cWhite : cNeon;
      emberColors[i * 3] = col.r;
      emberColors[i * 3 + 1] = col.g;
      emberColors[i * 3 + 2] = col.b;
    }

    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3));
    emberGeo.setAttribute("color", new THREE.BufferAttribute(emberColors, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 0.02,
      transparent: true,
      opacity: 0.65,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const embersMesh = new THREE.Points(emberGeo, emberMat);
    scene.add(embersMesh);

    // --- Mouse Movement Handler ---
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- Animation Loop ---
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;
      uniforms.u_time.value = elapsedTime;

      // Smooth mouse lerp
      uniforms.u_mouse.value.x += (targetMouseX - uniforms.u_mouse.value.x) * 0.04;
      uniforms.u_mouse.value.y += (targetMouseY - uniforms.u_mouse.value.y) * 0.04;

      // Slowly drift embers
      const positions = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        positions[i * 3 + 1] += 0.0008;
        if (positions[i * 3 + 1] > 1) {
          positions[i * 3 + 1] = -1;
          positions[i * 3] = (Math.random() - 0.5) * 2;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth || window.innerWidth;
      height = containerRef.current.clientHeight || window.innerHeight;

      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      emberGeo.dispose();
      emberMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}
