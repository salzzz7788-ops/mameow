"use client";

import React, { useEffect, useState, useRef } from "react";

interface SalaCyberBackgroundProps {
  className?: string;
  glowCrimson?: boolean;
}

export default function SalaCyberBackground({
  className = "",
  glowCrimson = true,
}: SalaCyberBackgroundProps) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none bg-[#02050b] ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* 1. Deep SalaCyber Base Dark Void */}
      <div className="absolute inset-0 bg-[#020409]" />

      {/* 2. Cyber Matrix Grid (Exact SalaCyber 54px Precision Grid) */}
      <div
        className="absolute inset-0 opacity-60 transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
        }}
      />

      {/* 3. Secondary Micro Grid for Deep Cyber Tech Texture */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "18px 18px",
        }}
      />

      {/* 4. Interactive Mouse Spotlight (Illuminates the cyber grid under the cursor) */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.12), rgba(255, 0, 60, 0.05) 45%, transparent 75%)`,
        }}
      />

      {/* 5. SalaCyber Ambient Blue & Crimson Radiant Spotlights */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] rounded-full bg-[#ff003c]/10 blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[170px] pointer-events-none" />

      {/* 6. SalaCyber Signature Cyber Crawlers / Bugs on Grid Lines */}
      {/* Bug 1 (Upper Right Grid Line) */}
      <div className="absolute top-[81px] right-[270px] opacity-25 hover:opacity-70 transition-opacity duration-500 animate-pulse">
        <svg
          className="w-5 h-5 text-cyan-400 rotate-45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m8 2 1.88 1.88" />
          <path d="M14.12 3.88 16 2" />
          <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
          <path d="M12 20v-9" />
          <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
          <path d="M6 13H2" />
          <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
          <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
          <path d="M22 13h-4" />
          <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
        </svg>
      </div>

      {/* Bug 2 (Mid-Left Grid Intersection) */}
      <div className="absolute top-[324px] left-[108px] opacity-20 hover:opacity-70 transition-opacity duration-500 animate-pulse" style={{ animationDelay: "1s" }}>
        <svg
          className="w-5 h-5 text-[#ff003c] -rotate-90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m8 2 1.88 1.88" />
          <path d="M14.12 3.88 16 2" />
          <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
          <path d="M12 20v-9" />
          <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
          <path d="M6 13H2" />
          <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
          <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
          <path d="M22 13h-4" />
          <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
        </svg>
      </div>

      {/* Bug 3 (Lower Center-Right) */}
      <div className="absolute bottom-[162px] right-[432px] opacity-15 hover:opacity-60 transition-opacity duration-500 animate-pulse" style={{ animationDelay: "2s" }}>
        <svg
          className="w-4 h-4 text-cyan-300 rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m8 2 1.88 1.88" />
          <path d="M14.12 3.88 16 2" />
          <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
          <path d="M12 20v-9" />
          <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
          <path d="M6 13H2" />
          <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
          <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
          <path d="M22 13h-4" />
          <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
        </svg>
      </div>

      {/* 7. Grid Intersection Crosshair Nodes */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.45) 1px, transparent 1px)`,
          backgroundSize: "54px 54px",
          backgroundPosition: "-1px -1px",
        }}
      />

      {/* 8. Vignette Edge Soft Fading to Dark Void */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(2, 5, 11, 0.6) 75%, #02050b 100%)",
        }}
      />
    </div>
  );
}
