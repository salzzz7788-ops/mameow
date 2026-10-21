"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";

interface LoadingScreenProps {
  onFinished?: () => void;
  isPlayingSound?: boolean;
  isMuted?: boolean;
  onToggleSound?: () => void;
}

export default function LoadingScreen({
  onFinished,
  isPlayingSound = true,
  isMuted = false,
  onToggleSound,
}: LoadingScreenProps) {
  const [isFading, setIsFading] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const sfxRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const sfx = new Audio("/assets/enter_sfx.wav");
    sfx.volume = 0.6;
    sfxRef.current = sfx;
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSound) {
      onToggleSound();
    }
  };

  const handleProceed = () => {
    if (isFading || isGone) return;
    setIsFading(true);

    // Play transition swoosh SFX
    if (sfxRef.current && !isMuted) {
      sfxRef.current.currentTime = 0;
      sfxRef.current.play().catch(() => {});
    }

    // MEOWSONG continues playing seamlessly across the entire website!
    setTimeout(() => {
      setIsGone(true);
      if (onFinished) onFinished();
    }, 500);
  };

  if (isGone) return null;

  // 22 Fullscreen streaming rows (alternating directions and bold GenZ Battleground colors)
  const streamRows = [
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "left-fast", theme: "contrast" },
    { text: "GENZ BATTLEGROUND // GENZ FIGHTING // GENZ HANGOUT // LENDARY // RAVE SCRIPT // ", dir: "right-slow", theme: "red-primary" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "left-slow", theme: "muted" },
    { text: "RENDER25.COM // FIREBALL GAMES // LEGENDARY TEAM // WEFAM // ", dir: "right-fast", theme: "contrast" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "left-fast", theme: "red-primary" },
    { text: "FIVEM ECOSYSTEM // ROBLOX METAVERSE // 3D CGI // WEFAM // ", dir: "right-slow", theme: "muted" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "left-slow", theme: "contrast" },
    { text: "SAL ODINSON // @THEREALMEOW.COM // @BOBO168HENGHENG // ", dir: "right-fast", theme: "red-primary" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "left-fast", theme: "contrast" },
    { text: "GENZ BATTLEGROUND // GENZ FIGHTING // GENZ HANGOUT // ", dir: "right-slow", theme: "muted" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "left-slow", theme: "red-primary" },
    { text: "HIGH-CONCURRENCY // ANTI-CHEAT SHIELD // BLENDER 3D // ", dir: "right-fast", theme: "contrast" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "left-fast", theme: "muted" },
    { text: "RENDER25 // TRANSACTIONAL EMAILS // FIREBALL GAMES // ", dir: "right-slow", theme: "red-primary" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "left-slow", theme: "contrast" },
    { text: "GENZ NETWORK // FIVEM PVP // LENDARY GUILD // WEFAM // ", dir: "right-fast", theme: "muted" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "left-fast", theme: "red-primary" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "right-slow", theme: "contrast" },
    { text: "GENZ BATTLEGROUND // GENZ FIGHTING // GENZ HANGOUT // ", dir: "left-slow", theme: "muted" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "right-fast", theme: "red-primary" },
    { text: "RENDER25.COM // FIREBALL GAMES // LEGENDARY TEAM // ", dir: "left-fast", theme: "contrast" },
    { text: "MA MEOW // WEFAM ORGANIZATION // MA MEOW // WEFAM ORGANIZATION // ", dir: "right-slow", theme: "muted" },
  ];

  const renderTokenSequence = (tokens: string[], theme: string) => (
    <div className="flex items-center gap-6 flex-shrink-0">
      {tokens.map((token, tIdx) => {
        let textColor = "text-white";
        if (theme === "red-primary") {
          textColor = tIdx % 2 === 0 ? "text-[#ff003c]" : "text-white";
        } else if (theme === "contrast") {
          textColor = tIdx % 2 === 0 ? "text-white" : "text-[#ff003c]";
        } else {
          textColor = tIdx % 2 === 0 ? "text-zinc-600/70" : "text-zinc-500/60";
        }

        return (
          <React.Fragment key={tIdx}>
            <span
              className={`font-unbounded font-black tracking-tight uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl ${textColor}`}
            >
              {token}
            </span>
            <span className="text-[#ff003c]/60 font-black text-2xl sm:text-4xl md:text-5xl">//</span>
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div
      onClick={() => {
        if (isMuted && onToggleSound) {
          onToggleSound();
        }
      }}
      className={`fixed inset-0 z-[99999] bg-[#050102] flex items-center justify-center overflow-hidden transition-all duration-600 ${
        isFading ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Explicit Inline Marquee Style Block (Guarantees Active Animation in all browsers) */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes streamToLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes streamToRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .stream-left-fast {
          animation: streamToLeft 9s linear infinite !important;
        }
        .stream-left-slow {
          animation: streamToLeft 15s linear infinite !important;
        }
        .stream-right-fast {
          animation: streamToRight 10s linear infinite !important;
        }
        .stream-right-slow {
          animation: streamToRight 16s linear infinite !important;
        }
        @keyframes logoHeartbeat {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 30px rgba(255, 0, 60, 0.5));
          }
          50% {
            transform: scale(1.06);
            filter: drop-shadow(0 0 60px rgba(255, 0, 60, 0.9));
          }
        }
        .loading-logo-glow {
          animation: logoHeartbeat 2.2s ease-in-out infinite !important;
        }
      `}} />

      {/* ================= HUGE FULLSCREEN RUNNING DIAGONAL TEXT (Exact GenZ Battleground Style) ================= */}
      <div className="absolute -inset-[150%] w-[400%] h-[400%] -rotate-[35deg] pointer-events-none select-none flex flex-col justify-center gap-1 sm:gap-2 overflow-hidden">
        {streamRows.map((row, idx) => {
          const animationClass =
            row.dir === "left-fast"
              ? "stream-left-fast"
              : row.dir === "left-slow"
                ? "stream-left-slow"
                : row.dir === "right-fast"
                  ? "stream-right-fast"
                  : "stream-right-slow";

          const tokens = row.text.split("//").map((t) => t.trim()).filter(Boolean);

          return (
            <div key={idx} className="w-full overflow-hidden flex whitespace-nowrap leading-none py-1">
              <div className={`flex items-center gap-6 whitespace-nowrap will-change-transform ${animationClass}`}>
                {/* 2 identical segments for seamless 50% loop */}
                {renderTokenSequence(tokens, row.theme)}
                {renderTokenSequence(tokens, row.theme)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle CRT Scanlines for Streetwear Polish (non-dimming) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

      {/* Interactive Sound Controller (Top-Right Corner) */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleSound}
          title={isMuted || !isPlayingSound ? "Turn sound on" : "Mute sound"}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/85 hover:bg-black border border-white/20 hover:border-[#ff003c] text-white font-mono-code text-xs backdrop-blur-xl transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,0,60,0.5)] cursor-pointer group active:scale-95"
        >
          {isMuted || !isPlayingSound ? (
            <>
              <VolumeX className="w-4 h-4 text-zinc-400 group-hover:text-[#ff003c] transition-colors" />
              <span className="text-zinc-400 group-hover:text-white transition-colors text-[11px] font-bold">
                SOUND: OFF
              </span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#ff003c] animate-pulse" />
              <span className="text-white text-[11px] font-bold tracking-wider">
                SOUND: ON
              </span>
              {/* Animated Equalizer Wave Bars */}
              <div className="flex items-end gap-0.5 h-3 ml-0.5">
                <span className="w-0.5 h-3 bg-[#ff003c] rounded-full animate-bounce" style={{ animationDuration: "0.6s" }} />
                <span className="w-0.5 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDuration: "0.9s" }} />
                <span className="w-0.5 h-3 bg-[#ff003c] rounded-full animate-bounce" style={{ animationDuration: "0.7s" }} />
                <span className="w-0.5 h-1.5 bg-rose-300 rounded-full animate-bounce" style={{ animationDuration: "0.5s" }} />
              </div>
            </>
          )}
        </button>
      </div>

      {/* ================= CENTER LOGO EMBLEM & HUD (Floating Over Running Text) ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 max-w-lg w-full">
        {/* Soft aura behind emblem so it stands out sharply over the text */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-black/85 blur-2xl -z-10 pointer-events-none" />

        {/* Glowing Profile Picture Emblem */}
        <div className="relative mb-6 loading-logo-glow">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-[#ff003c] shadow-[0_0_60px_rgba(255,0,60,0.85)] bg-gradient-to-b from-[#ff003c]/50 via-black to-[#ff003c]/30 p-1">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/assets/mameow_profile.jpg"
                alt="MA MEOW"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
          {/* Online status indicator badge */}
          <span
            className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-2 border-black shadow-[0_0_12px_#10b981] animate-pulse"
            title="ONLINE"
          />
        </div>

        {/* Text Brand Info */}
        <div className="space-y-1 mb-6 bg-black/70 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded bg-[#ff003c]/20 border border-[#ff003c]/60 font-pixel text-xs text-[#ff003c] tracking-widest uppercase">
            <span>● WEFAM ORGANIZATION</span>
          </div>
          <h1 className="font-pixel text-3xl sm:text-4xl text-white tracking-widest uppercase pt-1 drop-shadow-md">
            MA MEOW
          </h1>
        </div>

        {/* Interactive "Click to Enter" Action Console */}
        <div className="w-full max-w-[340px] sm:max-w-[420px] bg-[#0c0306]/90 p-5 sm:p-6 rounded-2xl border border-white/15 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono-code text-zinc-300 pb-3 border-b border-white/10">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="font-bold tracking-wider text-emerald-400">SYSTEM READY</span>
            </span>
            <span className="text-zinc-500 text-[11px] tracking-wider font-semibold">MAMEOW.DEV</span>
          </div>

          {/* MEOWSONG Audio Track Banner */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 font-mono-code text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-[#ff003c] text-sm animate-pulse">♫</span>
              <div>
                <span className="text-zinc-500 text-[10px] block font-semibold uppercase">SOUNDTRACK</span>
                <span className="text-white font-bold text-xs tracking-wider">MEOWSONG.MP3</span>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all ${!isMuted
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                : "bg-white/5 text-zinc-400 border-white/10"
              }`}>
              {!isMuted ? "AUTO ON" : "MUTED"}
            </span>
          </div>

          {/* Luxury Cyberpunk CTA Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleProceed();
            }}
            className="w-full relative group overflow-hidden rounded-xl p-[1px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_0_35px_rgba(255,0,60,0.35)] hover:shadow-[0_0_55px_rgba(255,0,60,0.7)]"
          >
            {/* Ambient radiant edge */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff003c] via-rose-500 to-[#ff003c] rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />

            {/* Inner button surface */}
            <span className="relative flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#170308] via-[#24040c] to-[#170308] group-hover:from-[#ff003c] group-hover:via-rose-600 group-hover:to-[#d60033] transition-all duration-300">
              <span className="font-orbitron font-extrabold text-sm sm:text-base text-white tracking-widest uppercase transition-colors">
                ENTER PORTFOLIO
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff003c] group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
            </span>
          </button>

          <div className="flex items-center justify-center gap-2 text-zinc-400 font-mono-code text-[11px] pt-0.5">
            <span className="text-zinc-500">[</span>
            <span className="text-zinc-400 tracking-wider">TAP ENTER PORTFOLIO OR PRESS ENTER</span>
            <span className="text-zinc-500">]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
