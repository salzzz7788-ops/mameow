"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Moon,
  Sun,
  Copy,
  Check,
  Box,
  Gamepad2,
  Server,
  Code2,
  Cpu,
  ShieldCheck,
  Activity,
  Layers,
  Zap,
  Crosshair,
  Radio,
  MessageSquare,
  Sparkles,
  Wifi,
  ArrowUpRight,
  Terminal,
  Gauge,
  Flame,
  ShieldAlert,
  Database,
  Sliders,
  Volume2,
  VolumeX,
  Menu,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";
import SalaCyberBackground from "@/components/SalaCyberBackground";
import EcosystemNetworkBackground from "@/components/EcosystemNetworkBackground";
import LoadingScreen from "@/components/LoadingScreen";

export default function MantorezPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"home" | "servers" | "orgs" | "skills">("home");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("all");
  const [codeSnippetTab, setCodeSnippetTab] = useState<"rave" | "fireball" | "anticheat" | "render25">("rave");
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [activeArsenalFilter, setActiveArsenalFilter] = useState<string>("ALL");

  // Global persistent soundtrack for MEOWSONG across both Loading Screen & Website Home
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(true);
  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(false);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const userExplicitlyMutedRef = useRef<boolean>(false);

  useEffect(() => {
    const audio = new Audio("/assets/MEOWSONG.mp3");
    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = "auto";
    musicAudioRef.current = audio;

    // Try playing unmuted, otherwise fallback to muted until first interaction
    audio
      .play()
      .then(() => {
        setIsPlayingMusic(true);
        setIsMusicMuted(false);
      })
      .catch(() => {
        audio.muted = true;
        audio.play().catch(() => {});
        setIsPlayingMusic(true);
        setIsMusicMuted(true);
      });

    // Auto unmute / play on first cursor movement, touch, click, or keypress anywhere on the page
    const unlockSound = () => {
      if (userExplicitlyMutedRef.current) return;
      if (musicAudioRef.current) {
        musicAudioRef.current.muted = false;
        musicAudioRef.current.volume = 0.75;
        if (musicAudioRef.current.paused) {
          musicAudioRef.current.play().catch(() => {});
        }
        setIsPlayingMusic(true);
        setIsMusicMuted(false);
      }
    };

    window.addEventListener("pointerdown", unlockSound);
    window.addEventListener("click", unlockSound);
    window.addEventListener("mousemove", unlockSound, { once: true });
    window.addEventListener("touchstart", unlockSound);
    window.addEventListener("keydown", unlockSound);

    return () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("click", unlockSound);
      window.removeEventListener("mousemove", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleMusic = () => {
    if (!musicAudioRef.current) return;
    const audio = musicAudioRef.current;
    if (audio.muted || audio.paused || isMusicMuted) {
      userExplicitlyMutedRef.current = false;
      audio.muted = false;
      audio.volume = 0.75;
      audio
        .play()
        .then(() => {
          setIsPlayingMusic(true);
          setIsMusicMuted(false);
        })
        .catch(() => {});
    } else {
      userExplicitlyMutedRef.current = true;
      audio.muted = true;
      setIsMusicMuted(true);
      setIsPlayingMusic(false);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mameow_theme") as "dark" | "light" | null;
      if (saved) {
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
        document.documentElement.classList.toggle("light", saved === "light");
      }
    } catch {
      // ignore
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("mameow_theme", nextTheme);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#ff003c", "#ffffff", "#00d2ff"],
    });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ["#00e5bf", "#ff003c", "#00d2ff"],
    });
    setTimeout(() => setCopiedSnippet(false), 2000);
  };



  // The 5 Flagship Brands + MA MEOW
  const ecosystemItems = [
    {
      id: "lendary",
      name: "LENDARY",
      subtitle: "LEGENDARY TEAM",
      category: "COMMUNITY",
      role: "CORE MEMBER",
      roleType: "cyan",
      handle: "@legendary",
      quote: "Premier gaming community, cross-platform social network & collaborative guild",
      logo: "/assets/logo_legendary.png",
      glowColor: "group-hover:drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]",
      borderColor: "hover:border-cyan-400",
      accentColor: "#00d2ff",
      status: "ONLINE",
      statusDot: "bg-emerald-500",
      actionType: "link",
      actionLabel: "Community Discord ↗",
      actionHref: "https://discord.gg/5w5tHU6Mth",
    },
    {
      id: "hangout",
      name: "GENZ HANGOUT",
      subtitle: "ROBLOX LOUNGE",
      category: "ROBLOX",
      role: "OWNER",
      roleType: "blue",
      handle: "@genzhangout",
      quote: "Luxury social metaverse lounge, custom hypercars & live community events",
      logo: "/assets/logo_genz_hangout.png",
      glowColor: "group-hover:drop-shadow-[0_0_20px_rgba(0,140,255,0.4)]",
      borderColor: "hover:border-blue-500",
      accentColor: "#3b82f6",
      status: "ONLINE",
      statusDot: "bg-blue-500",
      actionType: "link",
      actionLabel: "Launch Roblox ↗",
      actionHref: "https://www.roblox.com",
    },
    {
      id: "battleground",
      name: "GENZ BATTLEGROUND",
      subtitle: "FIVEM PVP",
      category: "FIVEM",
      role: "OWNER",
      roleType: "red",
      handle: "@genzbattleground",
      quote: "Premier FiveM PvP combat, custom recoil engine & territory warfare",
      logo: "/assets/logo_genz_battleground.png",
      glowColor: "group-hover:drop-shadow-[0_0_20px_rgba(255,0,60,0.4)]",
      borderColor: "hover:border-[#ff003c]",
      accentColor: "#ff003c",
      status: "ONLINE",
      statusDot: "bg-emerald-500",
      actionType: "link",
      actionLabel: "Join Discord ↗",
      actionHref: "https://discord.gg/YccV4afvta",
    },
    {
      id: "render25",
      name: "RENDER25",
      subtitle: "TRANSACTIONAL EMAILS",
      category: "EMAIL INFRA",
      role: "COO",
      roleType: "red",
      handle: "@render25.com",
      quote: "Fast transactional emails and delivery infrastructure for modern teams and autonomous agents",
      logo: "/assets/logo_render25.png",
      glowColor: "group-hover:drop-shadow-[0_0_20px_rgba(255,0,60,0.4)]",
      borderColor: "hover:border-[#ff003c]",
      accentColor: "#ff003c",
      status: "ONLINE",
      statusDot: "bg-emerald-500",
      actionType: "link",
      actionLabel: "Visit Render25.com ↗",
      actionHref: "https://render25.com",
    },
    {
      id: "fighting",
      name: "GENZ FIGHTING",
      subtitle: "FIVEM BRAWL",
      category: "FIVEM",
      role: "OWNER",
      roleType: "cyan",
      handle: "@genzfighting",
      quote: "Underground melee brawl, boxing championship & competitive battle arena",
      logo: "/assets/logo_genz_fighting.png",
      glowColor: "group-hover:drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]",
      borderColor: "hover:border-cyan-400",
      accentColor: "#00d2ff",
      status: "ONLINE",
      statusDot: "bg-emerald-500",
      actionType: "link",
      actionLabel: "Join Discord ↗",
      actionHref: "https://discord.gg/vzFhbmYeGu",
    },
    {
      id: "rave",
      name: "RAVE SCRIPT",
      subtitle: "FIVEM SCRIPT DEV",
      category: "DEVELOPMENT",
      role: "HEAD DEVELOPER",
      roleType: "teal",
      handle: "@ravescript",
      quote: "High-performance FiveM scripts, custom game mechanics, optimized UI systems & development",
      logo: "/assets/logo_rave_script.png",
      glowColor: "group-hover:drop-shadow-[0_0_20px_rgba(0,229,191,0.4)]",
      borderColor: "hover:border-teal-400",
      accentColor: "#00e5bf",
      status: "ONLINE",
      statusDot: "bg-emerald-500",
      actionType: "link",
      actionLabel: "Join Discord ↗",
      actionHref: "https://discord.gg/45W2EEQmvU",
    },
    {
      id: "mantorez",
      name: "MANTOREZ",
      subtitle: "FAM // WEFAM ORG",
      category: "FAMILY",
      role: "FAMILY",
      roleType: "red",
      handle: "@mantorez.fam",
      quote: "Premier family & brotherhood syndicate operating under WEFAM Organization",
      logo: "/assets/logo_mantorez.png",
      glowColor: "group-hover:drop-shadow-[0_0_25px_rgba(255,0,60,0.5)]",
      borderColor: "hover:border-[#ff003c]",
      accentColor: "#ff003c",
      status: "ONLINE",
      statusDot: "bg-emerald-500",
      actionType: "link",
      actionLabel: "Join Family ↗",
      actionHref: "https://discord.gg/YccV4afvta",
    },
    {
      id: "fireball",
      name: "FIREBALL GAME STUDIO",
      subtitle: "GAME DEVELOPMENT",
      category: "STUDIO",
      role: "DEVELOPER",
      roleType: "amber",
      handle: "@fireballgames",
      quote: "Crafting forward-thinking gameplay mechanics, custom scripting environments & memorable virtual world experiences",
      logo: "/assets/logo_fireball_games.png",
      glowColor: "group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]",
      borderColor: "hover:border-amber-400",
      accentColor: "#f59e0b",
      status: "ONLINE",
      statusDot: "bg-emerald-500",
      actionType: "link",
      actionLabel: "Join Discord ↗",
      actionHref: "https://discord.gg/sDCGhWwGae",
    },
  ];

  const filteredItems = selectedFilter === "all"
    ? ecosystemItems
    : ecosystemItems.filter((item) => item.id === selectedFilter);

  return (
    <div className={`bg-dot-pattern min-h-screen selection:bg-[#ff003c] selection:text-white font-outfit relative transition-colors duration-300 ${
      theme === "light" ? "text-zinc-900 bg-[#f4f5f8]" : "text-[#f4f4f5] bg-[#080203]"
    }`}>
      {/* GenZ Battleground Style Loading Screen (Runs on refresh & initial load) */}
      <LoadingScreen
        isPlayingSound={isPlayingMusic}
        isMuted={isMusicMuted}
        onToggleSound={toggleMusic}
      />

      {/* Top Floating Navbar (Refined 1200px Pill Layout with Redesigned Brand Emblem & Mobile Drawer) */}
      <nav className="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1200px] px-3 sm:px-4 transition-all">
        <div className={`flex h-14 sm:h-16 items-center justify-between px-3 sm:px-6 backdrop-blur-xl rounded-2xl shadow-2xl border transition-all duration-300 relative ${
          theme === "light"
            ? "bg-white/90 border-black/10 text-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            : "bg-[#0a0304]/80 border-white/15 text-white"
        }`}>
          {/* Brand 3D Metallic Logo (Redesigned: Clean, Borderless, Cyber Glow) */}
          <a
            href="#hero"
            onClick={() => {
              setActiveTab("home");
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 group cursor-pointer select-none py-1"
          >
            <div className="relative h-8 sm:h-10 w-28 sm:w-36 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95">
              <Image
                src="/assets/mameow_logo_3d.png"
                alt="MAMEOW"
                fill
                priority
                className="object-contain filter drop-shadow-[0_2px_8px_rgba(255,0,60,0.55)] group-hover:drop-shadow-[0_4px_18px_rgba(255,0,60,0.9)] transition-all"
              />
            </div>
            <span
              className={`font-pixel text-lg sm:text-xl tracking-wider transition-colors hidden xl:inline ${
                theme === "light" ? "text-zinc-900 group-hover:text-[#ff003c]" : "text-white group-hover:text-[#ff003c]"
              }`}
              style={
                theme === "dark"
                  ? {
                      textShadow:
                        "1px 1px 0px #fff, 2px 2px 0px #999, 3px 3px 0px #444, 4px 4px 10px rgba(255,0,60,0.7)",
                    }
                  : undefined
              }
            >
              MAMEOW
            </span>
          </a>

          {/* Right Action & Navigation Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1.5 font-outfit text-sm font-medium">
              <a
                href="#hero"
                onClick={() => setActiveTab("home")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === "home"
                    ? theme === "light"
                      ? "bg-black/10 text-zinc-900 border-black/20 shadow-xs"
                      : "bg-white/10 text-white border-white/20 shadow-sm"
                    : theme === "light"
                    ? "text-zinc-600 hover:text-black border-transparent"
                    : "text-zinc-400 hover:text-white border-transparent"
                }`}
              >
                Home
              </a>
              <a
                href="#ecosystem"
                onClick={() => setActiveTab("servers")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === "servers"
                    ? theme === "light"
                      ? "bg-black/10 text-zinc-900 border-black/20 shadow-xs"
                      : "bg-white/10 text-white border-white/20 shadow-sm"
                    : theme === "light"
                    ? "text-zinc-600 hover:text-black border-transparent"
                    : "text-zinc-400 hover:text-white border-transparent"
                }`}
              >
                Network
              </a>
              <a
                href="#skills"
                onClick={() => setActiveTab("skills")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === "skills"
                    ? theme === "light"
                      ? "bg-black/10 text-zinc-900 border-black/20 shadow-xs"
                      : "bg-white/10 text-white border-white/20 shadow-sm"
                    : theme === "light"
                    ? "text-zinc-600 hover:text-black border-transparent"
                    : "text-zinc-400 hover:text-white border-transparent"
                }`}
              >
                Skills
              </a>
              <a
                href="#contact"
                className={`px-3 py-1.5 rounded-lg border border-transparent transition-all ${
                  theme === "light" ? "text-zinc-600 hover:text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                Social
              </a>

              <div className={`w-[1px] h-5 mx-1.5 ${theme === "light" ? "bg-black/10" : "bg-white/15"}`} />
            </div>

            {/* Soundtrack MEOWSONG Music Controller */}
            <button
              onClick={toggleMusic}
              title={isMusicMuted || !isPlayingMusic ? "Play MEOWSONG" : "Mute MEOWSONG"}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-mono-code transition-all cursor-pointer group shadow-sm active:scale-95 ${
                theme === "light"
                  ? "bg-black/5 hover:bg-black/10 border-black/10 text-zinc-800 hover:border-[#ff003c]"
                  : "bg-black/60 hover:bg-black border-white/15 hover:border-[#ff003c]"
              }`}
            >
              {isMusicMuted || !isPlayingMusic ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#ff003c] transition-colors" />
                  <span className={`text-[11px] font-bold hidden sm:inline ${theme === "light" ? "text-zinc-600" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                    OFF
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#ff003c] animate-pulse" />
                  <span className={`text-[11px] font-bold hidden sm:inline ${theme === "light" ? "text-zinc-900" : "text-white"}`}>
                    AUDIO
                  </span>
                  <div className="flex items-end gap-0.5 h-2.5">
                    <span className="w-0.5 h-2.5 bg-[#ff003c] rounded-full animate-bounce" style={{ animationDuration: "0.6s" }} />
                    <span className="w-0.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDuration: "0.8s" }} />
                    <span className="w-0.5 h-2 bg-[#ff003c] rounded-full animate-bounce" style={{ animationDuration: "0.5s" }} />
                  </div>
                </>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                theme === "light"
                  ? "text-amber-600 hover:text-amber-500 bg-amber-500/10 border border-amber-500/20"
                  : "text-zinc-400 hover:text-[#ff003c] hover:bg-white/5 border border-transparent"
              }`}
              aria-label="Toggle Theme"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border md:hidden transition-colors cursor-pointer ${
                theme === "light"
                  ? "bg-black/5 hover:bg-black/10 border-black/10 text-zinc-900"
                  : "bg-white/5 hover:bg-white/10 border-white/15 text-white"
              }`}
              aria-label="Toggle Navigation Menu"
              title="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#ff003c]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className={`mt-2 p-3 rounded-2xl border backdrop-blur-2xl shadow-2xl md:hidden flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200 ${
            theme === "light"
              ? "bg-white/95 border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.1)]"
              : "bg-[#0b0305]/95 border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
          }`}>
            <a
              href="#hero"
              onClick={() => {
                setActiveTab("home");
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-xl border flex items-center justify-between font-mono-code text-xs font-bold transition-all ${
                activeTab === "home"
                  ? "bg-[#ff003c]/15 text-[#ff003c] border-[#ff003c]/30"
                  : theme === "light"
                  ? "bg-black/5 text-zinc-700 border-black/5 hover:bg-black/10"
                  : "bg-white/5 text-zinc-300 border-white/5 hover:bg-white/10"
              }`}
            >
              <span>⚡ HOME / OVERVIEW</span>
              <span className="text-[10px] text-zinc-500">MAMEOW</span>
            </a>
            <a
              href="#ecosystem"
              onClick={() => {
                setActiveTab("servers");
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-xl border flex items-center justify-between font-mono-code text-xs font-bold transition-all ${
                activeTab === "servers"
                  ? "bg-[#ff003c]/15 text-[#ff003c] border-[#ff003c]/30"
                  : theme === "light"
                  ? "bg-black/5 text-zinc-700 border-black/5 hover:bg-black/10"
                  : "bg-white/5 text-zinc-300 border-white/5 hover:bg-white/10"
              }`}
            >
              <span>🌐 NETWORK &amp; VENTURES</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ff003c] text-white">8 ACTIVE</span>
            </a>
            <a
              href="#skills"
              onClick={() => {
                setActiveTab("skills");
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-xl border flex items-center justify-between font-mono-code text-xs font-bold transition-all ${
                activeTab === "skills"
                  ? "bg-[#ff003c]/15 text-[#ff003c] border-[#ff003c]/30"
                  : theme === "light"
                  ? "bg-black/5 text-zinc-700 border-black/5 hover:bg-black/10"
                  : "bg-white/5 text-zinc-300 border-white/5 hover:bg-white/10"
              }`}
            >
              <span>⚙️ SKILLS &amp; TOOLCHAIN</span>
              <span className="text-[10px] text-zinc-500">16 SYSTEMS</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl border flex items-center justify-between font-mono-code text-xs font-bold transition-all ${
                theme === "light"
                  ? "bg-black/5 text-zinc-700 border-black/5 hover:bg-black/10"
                  : "bg-white/5 text-zinc-300 border-white/5 hover:bg-white/10"
              }`}
            >
              <span>💬 SOCIAL MEDIA</span>
              <span className="text-[10px] text-emerald-400">DISCORD / TIKTOK</span>
            </a>
          </div>
        )}
      </nav>

      {/* ================= UNIFIED 3D CONNECTED NETWORK UNIVERSE (Home & Network in 1 Background) ================= */}
      <div className={`relative overflow-hidden transition-colors duration-300 ${
        theme === "light" ? "bg-[#f4f5f8]" : "bg-[#080203]"
      }`}>
        {/* Single Shared 3D Cyber Plexus & Connected Network Background */}
        <EcosystemNetworkBackground className="absolute inset-0 z-0" />

        {/* Ambient Vignette & Atmosphere Overlays */}
        <div className={`absolute inset-0 z-[1] pointer-events-none transition-colors duration-300 ${
          theme === "light"
            ? "bg-radial from-transparent via-white/10 to-slate-200/50"
            : "bg-radial from-transparent via-[#080203]/30 to-[#080203]/90"
        }`} />

        {/* ================= HERO SECTION ================= */}
        <section
          id="hero"
          className="relative z-10 min-h-screen w-full flex items-center justify-center px-4 pt-24 pb-16"
        >

        {/* Centered Frosted Glassmorphism Hero Panel */}
        <div className={`relative z-10 w-full max-w-[950px] mx-auto rounded-3xl backdrop-blur-2xl border transition-all duration-300 p-5 sm:p-10 lg:p-12 flex flex-col items-center justify-center text-center gap-5 ${
          theme === "light"
            ? "bg-white/90 border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            : "bg-[#090204]/75 border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
        }`}>
          {/* Profile Picture Emblem with Glowing Crimson Ring */}
          <div className="relative group">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#ff003c] shadow-[0_0_35px_rgba(255,0,60,0.55)] group-hover:shadow-[0_0_50px_rgba(255,0,60,0.85)] group-hover:scale-105 transition-all duration-300">
              <Image
                src="/assets/mameow_profile.jpg"
                alt="MAMEOW"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
            <span
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black"
              title="ONLINE"
            />
          </div>

          {/* WEFAM Organization Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#ff003c]/15 border border-[#ff003c]/40 font-pixel text-xs text-[#ff003c] tracking-widest uppercase">
            <span>● WEFAM ORGANIZATION</span>
          </div>

          {/* Main Title with 3D Dimensional Extrusion */}
          <h1 className="font-orbitron font-black text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase italic leading-none select-none overflow-visible py-2 whitespace-nowrap">
            <span
              className={`inline-block pr-3 sm:pr-4 ${theme === "light" ? "text-zinc-900" : "text-white"}`}
              style={{
                textShadow:
                  theme === "light"
                    ? "1px 1px 0px #ffffff, 2px 2px 0px #e4e4e7, 3px 3px 0px #d4d4d8, 4px 4px 10px rgba(0,0,0,0.15)"
                    : "1px 1px 0px #ffffff, 2px 2px 0px #d4d4d8, 3px 3px 0px #a1a1aa, 4px 4px 0px #52525b, 5px 5px 0px #27272a, 6px 6px 15px rgba(0,0,0,0.9), 0 0 25px rgba(255,255,255,0.35)",
              }}
            >
              MA
            </span>{" "}
            <span
              className="inline-block pr-5 sm:pr-7 text-[#ff003c]"
              style={{
                textShadow:
                  "1px 1px 0px #ff6685, 2px 2px 0px #ff003c, 3px 3px 0px #cc0030, 4px 4px 0px #80001e, 5px 5px 0px #40000f, 6px 6px 20px rgba(255,0,60,0.85), 0 0 40px rgba(255,0,60,0.7)",
              }}
            >
              MEOW
            </span>
          </h1>

          {/* Roles / Subtitle */}
          <div className={`font-mono-code text-xs sm:text-sm tracking-wide px-4 py-2 rounded-2xl sm:rounded-full border max-w-2xl ${
            theme === "light" ? "text-zinc-700 bg-black/5 border-black/10" : "text-zinc-300 bg-white/[0.04] border-white/10"
          }`}>
            COO OF RENDER25.COM • HEAD DEVELOPER AT RAVE SCRIPT • OWNER OF GENZ BATTLEGROUND, FIGHTING &amp; HANGOUT • LEGENDARY TEAM
          </div>

          {/* Description */}
          <p className={`text-sm sm:text-base leading-relaxed font-outfit max-w-2xl mx-auto ${
            theme === "light" ? "text-zinc-600" : "text-zinc-400"
          }`}>
            Founder &amp; Director shaping competitive FiveM battlegrounds, immersive Roblox experiences, and scaling transactional email infrastructure as Chief Operating Officer at Render25.com.
          </p>

          {/* Clean Minimalist Ecosystem Bar (5 Brands) */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 py-2.5 border-y w-full max-w-2xl mx-auto ${
            theme === "light" ? "border-black/10" : "border-white/10"
          }`}>
            <span className={`font-mono-code text-[11px] uppercase tracking-wider flex-shrink-0 ${
              theme === "light" ? "text-zinc-500" : "text-zinc-400"
            }`}>
              ECOSYSTEM:
            </span>
            <div className="flex items-center justify-center flex-wrap gap-2 py-0.5">
              {[
                { id: "lendary", name: "Lendary", logo: "/assets/logo_legendary.png" },
                { id: "hangout", name: "GENZ Hangout", logo: "/assets/logo_genz_hangout.png" },
                { id: "battleground", name: "GENZ Battleground", logo: "/assets/logo_genz_battleground.png" },
                { id: "render25", name: "Render25", logo: "/assets/logo_render25.png" },
                { id: "fighting", name: "GENZ Fighting", logo: "/assets/logo_genz_fighting.png" },
                { id: "rave", name: "RAVE Script", logo: "/assets/logo_rave_script.png" },
                { id: "mantorez", name: "MANTOREZ", logo: "/assets/logo_mantorez.png" },
                { id: "fireball", name: "Fireball", logo: "/assets/logo_fireball_games.png" },
              ].map((b) => (
                <a
                  key={b.id}
                  href="#ecosystem"
                  onClick={() => setSelectedFilter(b.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all flex-shrink-0 group cursor-pointer ${
                    theme === "light"
                      ? "bg-black/5 hover:bg-black/10 border-black/10 hover:border-black/30 text-zinc-700 hover:text-black"
                      : "bg-black/50 hover:bg-black/80 border-white/10 hover:border-white/30 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="relative w-4 h-4">
                    <Image src={b.logo} alt={b.name} fill className="object-contain" />
                  </div>
                  <span className="font-mono-code text-[11px] transition-colors">
                    {b.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Editorial Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#ecosystem"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto border border-[#ff003c] text-[#ff003c] hover:bg-[#ff003c] hover:text-white font-mono-code text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 text-center cursor-pointer"
            >
              <span>Explore Home</span>
              <span>→</span>
            </a>

            <a
              href="https://render25.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto border font-mono-code text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 text-center ${
                theme === "light"
                  ? "border-black/20 text-zinc-800 hover:bg-black/5"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              <span>Render25 (COO)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </section>

        {/* Ambient Subtle Network Divider */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4">
          <div className={`w-full h-px ${theme === "light" ? "bg-black/10" : "bg-gradient-to-r from-transparent via-white/10 to-transparent"}`} />
        </div>

        {/* ================= ECOSYSTEM & NETWORK ================= */}
        <section id="ecosystem" className="py-20 relative z-10 scroll-mt-28">
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 flex flex-col gap-8">
            {/* Section Header */}
            <div className={`border-b pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              theme === "light" ? "border-black/15" : "border-white/20"
            }`}>
              <div>
                <h2 className={`font-pixel text-2xl sm:text-3xl font-bold tracking-wider uppercase ${
                  theme === "light" ? "text-zinc-900" : "text-white"
                }`}>
                NETWORK &amp; VENTURES
              </h2>
              <p className={`font-mono-code text-xs mt-1 ${
                theme === "light" ? "text-zinc-600" : "text-zinc-400"
              }`}>
                Gaming servers, development studios, and digital organizations founded, directed, or engineered by MA MEOW.
              </p>
            </div>
            <span className="font-mono-code text-xs text-[#ff003c] self-start sm:self-auto px-2.5 py-1 rounded bg-[#ff003c]/10 border border-[#ff003c]/30">
              8 ACTIVE PROJECTS
            </span>
          </div>

          {/* Interactive Filter Pills (Clean Minimalist Monochromatic Styling) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono-code text-xs -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
            {[
              { id: "all", label: "ALL", count: "8" },
              { id: "lendary", label: "LENDARY" },
              { id: "hangout", label: "GENZ HANGOUT" },
              { id: "battleground", label: "GENZ BATTLEGROUND" },
              { id: "render25", label: "RENDER25" },
              { id: "fighting", label: "GENZ FIGHTING" },
              { id: "rave", label: "RAVE SCRIPT" },
              { id: "mantorez", label: "MANTOREZ" },
              { id: "fireball", label: "FIREBALL STUDIO" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedFilter(btn.id)}
                className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap text-xs ${
                  selectedFilter === btn.id
                    ? theme === "light"
                      ? "bg-zinc-900 text-white border-zinc-900 font-bold shadow-sm"
                      : "bg-white/20 text-white border-white/40 font-bold shadow-sm"
                    : theme === "light"
                    ? "bg-black/5 text-zinc-600 hover:text-black border-black/10 hover:border-black/20"
                    : "bg-white/5 text-zinc-400 hover:text-white border-white/10 hover:border-white/20"
                }`}
              >
                <span>{btn.label}</span>
                {btn.count && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                    selectedFilter === btn.id ? "bg-[#ff003c] text-white" : theme === "light" ? "bg-black/10 text-zinc-600" : "bg-white/5 text-zinc-400"
                  }`}>
                    {btn.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Responsive Cards Grid (Exact Mantorez Style with Official Logos) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`relative rounded-2xl border p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 group backdrop-blur-md ${
                  theme === "light"
                    ? "bg-white/95 border-black/10 hover:border-black/25 shadow-xl shadow-black/5"
                    : "bg-gradient-to-b from-[#120608]/90 via-[#0a0304]/85 to-[#050102]/95 border-white/10 hover:border-white/25 shadow-xl"
                }`}
              >
                {/* Top View / Role Badges (Clean Minimalist Monochromatic) */}
                <div className="w-full flex items-center justify-between text-[11px] font-mono-code mb-4">
                  <span className={`uppercase font-semibold tracking-wider text-[10px] ${
                    theme === "light" ? "text-zinc-500" : "text-zinc-400"
                  }`}>
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold tracking-wide transition-colors ${
                      theme === "light"
                        ? "border-black/10 bg-black/5 text-zinc-700 group-hover:border-black/20 group-hover:text-black"
                        : "border-white/10 bg-white/5 text-zinc-300 group-hover:border-white/25 group-hover:text-white"
                    }`}>
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Avatar Emblem with Clean Minimalist Glass Border & Status Dot */}
                <div className="relative mb-4">
                  <div className={`w-24 h-24 rounded-2xl p-3 flex items-center justify-center transition-all duration-300 ${
                    theme === "light"
                      ? "bg-black/5 border border-black/10 group-hover:border-[#ff003c]/50"
                      : "bg-black/60 border border-white/15 group-hover:border-[#ff003c]/50"
                  }`}>
                    <div className="relative w-full h-full">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span
                    className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ${item.statusDot} border-2 ${theme === "light" ? "border-white" : "border-black"}`}
                    title={item.status}
                  />
                </div>

                {/* Typography / Details */}
                <div className="space-y-1 mb-5">
                  <h3 className={`font-pixel text-lg sm:text-xl font-bold tracking-wide ${
                    theme === "light" ? "text-zinc-900" : "text-white"
                  }`}>
                    {item.name}
                  </h3>
                  <div className={`font-mono-code text-xs ${
                    theme === "light" ? "text-zinc-500" : "text-zinc-400"
                  }`}>
                    {item.handle}
                  </div>
                  <div className={`font-outfit text-xs italic pt-1 max-w-xs leading-relaxed ${
                    theme === "light" ? "text-zinc-600" : "text-zinc-400"
                  }`}>
                    &ldquo;{item.quote}&rdquo;
                  </div>
                </div>

                {/* Action CTA */}
                <a
                  href={item.actionHref}
                  target={item.actionHref?.startsWith("http") ? "_blank" : undefined}
                  rel={item.actionHref?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`w-full py-2.5 px-3 rounded-lg font-mono-code text-xs transition-all flex items-center justify-center gap-1.5 ${
                    item.id === "mameow"
                      ? "bg-[#ff003c] hover:bg-[#d00030] text-white font-bold shadow-md shadow-[#ff003c]/20"
                      : theme === "light"
                      ? "bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/25 text-zinc-900"
                      : "bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white"
                  }`}
                >
                  <span>{item.actionLabel}</span>
                  {item.actionHref?.startsWith("http") && (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>

      {/* ================= CORE SKILLS & TECHNICAL ARSENAL (Minimalist Modern Tech Grid — Linear / Vercel Developer Style) ================= */}
      <section id="skills" className={`py-24 relative z-20 scroll-mt-20 overflow-hidden border-t transition-colors duration-300 ${
        theme === "light" ? "bg-[#ebedf2] border-black/10 text-zinc-900" : "bg-[#070204] border-white/10 text-[#f4f4f5]"
      }`}>
        {/* Subtle Ambient Background Gradients & Clean Minimal Grid */}
        <div className={`absolute inset-0 bg-[size:4rem_4rem] pointer-events-none ${
          theme === "light"
            ? "bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]"
        }`} />
        <div className="absolute top-1/4 left-1/12 w-[420px] h-[420px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/12 w-[450px] h-[450px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />
        <div className={`absolute inset-0 pointer-events-none ${
          theme === "light"
            ? "bg-radial from-transparent via-[#ebedf2]/70 to-[#ebedf2]"
            : "bg-radial from-transparent via-[#070204]/90 to-[#070204]"
        }`} />

        <div className="w-full max-w-[1280px] mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b ${
            theme === "light" ? "border-black/15" : "border-white/10"
          }`}>
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md font-mono-code text-[11px] tracking-widest uppercase mb-3 ${
                theme === "light" ? "bg-black/5 border border-black/10 text-zinc-600" : "bg-white/5 border border-white/10 text-zinc-400"
              }`}>
                <Terminal className="w-3.5 h-3.5 text-[#ff003c]" />
                <span>PRODUCTION ARSENAL // STACK &amp; SYSTEMS</span>
              </div>
              <h2 className={`font-pixel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase flex items-center gap-3 ${
                theme === "light" ? "text-zinc-900" : "text-white"
              }`}>
                <span>ENGINEERING &amp; TOOLCHAIN</span>
              </h2>
              <p className={`font-outfit text-sm sm:text-base mt-2 max-w-2xl leading-relaxed ${
                theme === "light" ? "text-zinc-600" : "text-zinc-400"
              }`}>
                Technologies, frameworks, and architecture patterns battle-tested across FiveM game ecosystems, bare-metal Linux infrastructure, and high-deliverability cloud services.
              </p>
            </div>

            {/* Authentic Engineering Metrics */}
            <div className="flex flex-wrap items-center gap-2 font-mono-code text-xs">
              <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 shadow-sm ${
                theme === "light" ? "bg-white border-black/10 text-zinc-800" : "bg-black/60 border-white/10 text-zinc-300"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-zinc-500 font-semibold">PEAK:</span>
                <span className={theme === "light" ? "text-zinc-900 font-bold" : "text-white font-bold"}>750+ CCU</span>
              </div>
              <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 shadow-sm ${
                theme === "light" ? "bg-white border-black/10 text-zinc-800" : "bg-black/60 border-white/10 text-zinc-300"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span className="text-zinc-500 font-semibold">ENGINE:</span>
                <span className={theme === "light" ? "text-teal-700 font-bold" : "text-teal-300 font-bold"}>LUA 5.4 JIT</span>
              </div>
              <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 shadow-sm ${
                theme === "light" ? "bg-white border-black/10 text-zinc-800" : "bg-black/60 border-white/10 text-zinc-300"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-zinc-500 font-semibold">CLOUD:</span>
                <span className={theme === "light" ? "text-cyan-700 font-bold" : "text-cyan-300 font-bold"}>RENDER25 SMTP</span>
              </div>
            </div>
          </div>

          {/* Interactive Category Filters (Linear / Vercel Minimalist Pill Style) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none font-mono-code text-xs mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
            {[
              { id: "all", label: "ALL SYSTEMS", count: "16" },
              { id: "game", label: "GAME & ENGINE", count: "04" },
              { id: "infra", label: "SERVERS & SECURITY", count: "04" },
              { id: "spatial", label: "3D & MLO SPATIAL", count: "04" },
              { id: "cloud", label: "CLOUD & OPERATIONS", count: "04" },
            ].map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedSkillCategory(node.id)}
                className={`px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer text-xs ${
                  selectedSkillCategory === node.id
                    ? theme === "light"
                      ? "bg-zinc-900 text-white border-zinc-900 font-bold shadow-sm"
                      : "bg-white/15 text-white border-white/40 font-bold shadow-sm"
                    : theme === "light"
                    ? "bg-white text-zinc-600 hover:text-black border-black/10 hover:border-black/20"
                    : "bg-black/40 text-zinc-400 hover:text-white border-white/10 hover:border-white/20"
                }`}
              >
                <span>{node.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                  selectedSkillCategory === node.id
                    ? "bg-[#ff003c] text-white"
                    : theme === "light"
                    ? "bg-black/5 text-zinc-500"
                    : "bg-white/5 text-zinc-500"
                }`}>
                  {node.count}
                </span>
              </button>
            ))}
          </div>

          {/* ================= MINIMALIST MODERN TECH GRID ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {[
              // 1. GAME & SCRIPTING
              {
                id: "lua",
                name: "Lua 5.4 JIT Engine",
                category: "game",
                domainTag: "GAME ENGINE",
                version: "Lua 5.4 / FXServer",
                desc: "Deterministic recoil math, client-server net events, state bags, and high-frequency combat sync for RAVE SCRIPT.",
                tags: ["Zero-Recoil Math", "Net Events", "State Bags"],
                project: "RAVE SCRIPT ENGINE",
                accent: "teal",
              },
              {
                id: "luau",
                name: "Roblox Luau Runtime",
                category: "game",
                domainTag: "LUAU TYPED",
                version: "Typed Luau",
                desc: "Custom spatial raycast hitboxes, cooldown tree pipelines, and combo state machines for Fireball Game Studio.",
                tags: ["Raycast Hitbox", "State Trees", "Network Bridge"],
                project: "FIREBALL GAME STUDIO",
                accent: "amber",
              },
              {
                id: "react_nui",
                name: "React NUI & Web HUDs",
                category: "game",
                domainTag: "IN-GAME UI",
                version: "React 18 / TypeScript",
                desc: "Zero-latency in-game interfaces, dynamic inventory HUDs, and web-native dashboards running at 60+ FPS.",
                tags: ["Sub-ms NUI IPC", "Tailwind CSS", "Custom Hooks"],
                project: "GENZ BATTLEGROUND HUD",
                accent: "teal",
              },
              {
                id: "fxserver",
                name: "FiveM FXServer Core",
                category: "game",
                domainTag: "SERVER CORE",
                version: "FXServer 2026",
                desc: "Server lifecycle command, routing buckets, entity synchronization, and low-latency client packet pipelines.",
                tags: ["Routing Buckets", "Authoritative State", "OneSync"],
                project: "GENZ ECOSYSTEM",
                accent: "rose",
              },

              // 2. INFRASTRUCTURE & SECURITY
              {
                id: "linux",
                name: "Ubuntu Dedicated Linux",
                category: "infra",
                domainTag: "BARE-METAL OS",
                version: "Ubuntu 24.04 LTS",
                desc: "Kernel tuning, systemd process daemonization, memory management, and bare-metal cluster administration for 750+ CCU.",
                tags: ["Kernel TCP Tuning", "Systemd Daemons", "Core Pinning"],
                project: "GENZ BATTLEGROUND & HANGOUT",
                accent: "rose",
              },
              {
                id: "anticheat",
                name: "L7 Security Shield",
                category: "infra",
                domainTag: "ANTI-CHEAT HEURISTICS",
                version: "Layer 7 Engine",
                desc: "Server-authoritative bounds validation, anomalous coordinate tripwires, and tokenized event validation against injections.",
                tags: ["Anomalous Z-Filter", "Token Validation", "Audit Trails"],
                project: "GENZ DEFENSE SYSTEM",
                accent: "rose",
              },
              {
                id: "redis",
                name: "Redis State Cache",
                category: "infra",
                domainTag: "IN-MEMORY STATE",
                version: "Redis 7.2",
                desc: "Sub-millisecond in-memory session caching, pub/sub inter-process message bus, and cross-node player synchronization.",
                tags: ["Sub-0.02ms Memory", "Cluster Pub/Sub", "Distributed Locks"],
                project: "MULTI-SERVER SYNC",
                accent: "cyan",
              },
              {
                id: "mysql",
                name: "MySQL & MariaDB Shards",
                category: "infra",
                domainTag: "RELATIONAL DB",
                version: "MariaDB 11 / InnoDB",
                desc: "Relational schema design, asynchronous connection pooling, query indexing, and crash-resilient player inventory persistence.",
                tags: ["Async Pool", "ACID Compliance", "Partitioned Schemas"],
                project: "GENZ PERSISTENCE",
                accent: "cyan",
              },

              // 3. 3D & SPATIAL MLO
              {
                id: "blender",
                name: "Blender 3D CGI",
                category: "spatial",
                domainTag: "3D HARD-SURFACE",
                version: "Blender 4.x",
                desc: "Hard-surface 3D modeling, custom automotive assets, optimized quad topologies, and game-engine export pipelines.",
                tags: ["Sub-D Modeling", "Poly Budgeting", "LOD Calibration"],
                project: "WEFAM ASSET PACKS",
                accent: "amber",
              },
              {
                id: "mlo",
                name: "FiveM MLO Interiors",
                category: "spatial",
                domainTag: "MLO ARCHITECTURE",
                version: "YTYP / YMAP / YBN",
                desc: "Sub-millimeter collision meshes, occlusion room definitions, and calibrated streaming portals for stutter-free player entry.",
                tags: ["Occlusion Portals", "Static Collisions", "Zero Pop-In"],
                project: "GENZ BATTLEGROUND MAPS",
                accent: "amber",
              },
              {
                id: "pbr",
                name: "PBR Shader Pipelines",
                category: "spatial",
                domainTag: "MATERIAL SHADERS",
                version: "PBR Spec 4K",
                desc: "Physically-based rendering setups, metallic/roughness maps, normal baking, and atmospheric lighting coordination.",
                tags: ["4K Normal Maps", "Roughness / Metallic", "Baked AO Passes"],
                project: "CUSTOM MLO ENVIRONMENTS",
                accent: "amber",
              },
              {
                id: "roblox_studio",
                name: "Roblox Studio 3D",
                category: "spatial",
                domainTag: "SPATIAL WORLDS",
                version: "Roblox Engine",
                desc: "Physics-driven battle arenas, spatial collision geometry, and dynamic environment lighting tuned for multiplayer FPS.",
                tags: ["Spatial Streaming", "Custom Particle VFX", "Physics Bounds"],
                project: "FIREBALL COMBAT ARENAS",
                accent: "teal",
              },

              // 4. CLOUD & OPERATIONS
              {
                id: "smtp",
                name: "Render25 SMTP Cluster",
                category: "cloud",
                domainTag: "EMAIL INFRASTRUCTURE",
                version: "Node.js / SMTP",
                desc: "High-throughput transactional email delivery infrastructure engineered with sub-second dispatch and 99.98% deliverability.",
                tags: ["Cluster Node Pool", "Sub-250ms Dispatch", "Multi-Region"],
                project: "RENDER25.COM (COO)",
                accent: "cyan",
              },
              {
                id: "dkim",
                name: "DKIM / SPF / DMARC",
                category: "cloud",
                domainTag: "CRYPTOGRAPHIC DNS",
                version: "RFC 6376 / 7489",
                desc: "Strict RSA-SHA256 signature verification, domain alignment protocols, and proactive IP reputation management.",
                tags: ["RSA 2048-bit", "Strict Alignment", "TLS 1.3 Transport"],
                project: "RENDER25 EMAIL SUITE",
                accent: "cyan",
              },
              {
                id: "docker",
                name: "Docker & Staging",
                category: "cloud",
                domainTag: "CONTAINERIZATION",
                version: "Docker Compose",
                desc: "Isolated service containerization, automated build recipes, and reproducible development staging environments.",
                tags: ["Alpine Builds", "Isolated Networks", "Volume Persistence"],
                project: "DEV OPS INFRASTRUCTURE",
                accent: "teal",
              },
              {
                id: "exec",
                name: "Syndicate Governance",
                category: "cloud",
                domainTag: "STRATEGIC COMMAND",
                version: "Executive Ops",
                desc: "Executive resource distribution, technical roadmap governance, and cross-guild coordination across WEFAM & MANTOREZ.",
                tags: ["WEFAM Governance", "MANTOREZ Command", "Dev Mentorship"],
                project: "WEFAM COMMAND MATRIX",
                accent: "rose",
              },
            ]
              .filter((card) => selectedSkillCategory === "all" || card.category === selectedSkillCategory)
              .map((card) => {
                const borderHoverMap: Record<string, string> = {
                  teal: "hover:border-teal-500/40 hover:shadow-[0_0_25px_rgba(20,184,166,0.1)]",
                  amber: "hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.1)]",
                  rose: "hover:border-[#ff003c]/40 hover:shadow-[0_0_25px_rgba(255,0,60,0.15)]",
                  cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)]",
                };

                const badgeBgMap: Record<string, string> = {
                  teal: "text-teal-300 bg-teal-500/10 border-teal-500/30",
                  amber: "text-amber-300 bg-amber-500/10 border-amber-500/30",
                  rose: "text-[#ff003c] bg-[#ff003c]/10 border-[#ff003c]/30",
                  cyan: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
                };

                return (
                  <div
                    key={card.id}
                    className={`rounded-xl border ${borderHoverMap[card.accent]} p-5 transition-all duration-300 flex flex-col justify-between group backdrop-blur-md hover:-translate-y-0.5 ${
                      theme === "light"
                        ? "bg-white border-black/10 shadow-sm shadow-black/5"
                        : "bg-[#090305]/80 border-white/10"
                    }`}
                  >
                    <div>
                      {/* Top Meta Line */}
                      <div className="flex items-center justify-between gap-2 mb-3 font-mono-code text-[10px]">
                        <span className="text-zinc-500 tracking-wider uppercase font-semibold">
                          {card.domainTag}
                        </span>
                        <span className={`px-2 py-0.5 rounded border font-bold ${badgeBgMap[card.accent]}`}>
                          {card.version}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className={`font-pixel text-base font-bold transition-colors mb-2 ${
                        theme === "light" ? "text-zinc-900 group-hover:text-black" : "text-white group-hover:text-zinc-100"
                      }`}>
                        {card.name}
                      </h3>

                      {/* Genuine Engineering Description */}
                      <p className={`font-outfit text-xs leading-relaxed mb-4 ${
                        theme === "light" ? "text-zinc-600" : "text-zinc-400"
                      }`}>
                        {card.desc}
                      </p>
                    </div>

                    <div>
                      {/* Technical Spec Tags */}
                      <div className={`flex flex-wrap gap-1.5 pt-3 border-t font-mono-code text-[10px] ${
                        theme === "light" ? "border-black/5" : "border-white/5"
                      }`}>
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded border ${
                              theme === "light"
                                ? "bg-black/5 text-zinc-700 border-black/10"
                                : "bg-white/[0.04] text-zinc-300 border-white/5"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Target Deployment Project */}
                      <div className={`mt-3 pt-2 border-t flex items-center justify-between font-mono-code text-[10px] ${
                        theme === "light" ? "border-black/5" : "border-white/5"
                      }`}>
                        <span className="text-zinc-500 truncate">{card.project}</span>
                        <span className="flex items-center gap-1 text-emerald-400 flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>ACTIVE</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* ================= PRODUCTION CODE WORKSPACE (Warp / VS Code Terminal Style) ================= */}
          <div className={`rounded-2xl border backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
            theme === "light"
              ? "bg-white border-black/15 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              : "border-white/15 bg-[#050203]/90 shadow-2xl"
          }`}>
            {/* Terminal Top Window Bar */}
            <div className={`flex flex-wrap items-center justify-between px-4 py-3 border-b font-mono-code text-xs gap-3 ${
              theme === "light" ? "bg-zinc-100 border-black/10" : "bg-black/70 border-white/10"
            }`}>
              <div className="flex items-center gap-3">
                {/* Window Traffic Lights */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className={`h-4 w-[1px] ${theme === "light" ? "bg-black/10" : "bg-white/15"}`} />
                <span className={`font-semibold text-[11px] hidden sm:inline ${
                  theme === "light" ? "text-zinc-600" : "text-zinc-400"
                }`}>
                  workspace@mameow-dev:~/src/modules
                </span>
              </div>

              {/* IDE Code Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {[
                  { id: "rave" as const, name: "rave_sync.lua", tag: "Lua 5.4" },
                  { id: "fireball" as const, name: "fireball_core.luau", tag: "Luau" },
                  { id: "anticheat" as const, name: "l7_shield.lua", tag: "L7 Security" },
                  { id: "render25" as const, name: "smtp_node.ts", tag: "TypeScript" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCodeSnippetTab(tab.id)}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-mono-code transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                      codeSnippetTab === tab.id
                        ? theme === "light"
                          ? "bg-white text-zinc-900 border border-black/20 font-bold shadow-xs"
                          : "bg-white/15 text-white border border-white/30 font-bold"
                        : theme === "light"
                        ? "text-zinc-600 hover:text-black hover:bg-black/5 border border-transparent"
                        : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${codeSnippetTab === tab.id ? "bg-[#ff003c]" : "bg-transparent"}`} />
                    <span>{tab.name}</span>
                    <span className="text-[9px] text-zinc-500 font-normal">[{tab.tag}]</span>
                  </button>
                ))}
              </div>

              {/* Copy Code Snippet Button */}
              <button
                onClick={() => {
                  const snippetsMap: Record<string, string> = {
                    rave: `-- [RAVE SCRIPT ENGINE] // HIGH-FREQ CLIENT-SERVER SYNC\nRegisterNetEvent('rave:syncPlayerCombat', function(payload)\n    local src = source\n    if not AntiCheat:ValidatePacket(src, payload.token) then return end\n    \n    Entity(GetPlayerPed(src)).state:set('combatSync', {\n        recoilMultiplier = 1.0,  -- Zero-lag deterministic recoil\n        syncTick         = GetGameTimer(),\n        pingLatency      = payload.latency\n    }, true)\nend)`,
                    fireball: `-- [FIREBALL GAME STUDIO] // HITBOX & COMBO PIPELINE\nlocal FireballCore = require(ReplicatedStorage.CombatKernel)\n\nfunction FireballCore:ExecuteCombo(player: Player, skillId: string)\n    assert(self.Cooldown:IsReady(player, skillId), 'COOLDOWN_ACTIVE')\n    local raycast = self.SpatialHitbox:CastRay(player.Character.PrimaryPart.CFrame, 16)\n    if raycast.Hit then\n        self.NetworkBridge:FireAllClients('OnSkillImpact', raycast.Position)\n    end\n    return self.ComboTree:Advance(player)\nend`,
                    anticheat: `-- [GENZ DEFENSE] // REAL-TIME ANOMALOUS HEURISTICS\nAddEventHandler('entityCreating', function(handle)\n    local coords = GetEntityCoords(handle)\n    if coords.z > 850.0 and not WhitelistZone:Contains(coords) then\n        CancelEvent()\n        SecurityLog:Alert('UNAUTHORIZED_Z_COORD_SPAWN', coords)\n        AuditTrail:FlagPlayer(source, 'HEURISTIC_TRIP_L7')\n    end\nend)`,
                    render25: `// [RENDER25.COM] // HIGH-THROUGHPUT TRANSACTIONAL SMTP\nexport async function dispatchTransactionalEmail(payload: DispatchPayload) {\n  const node = await ClusterPool.getLowestLatencyNode();\n  return await node.sendMail({\n    from: 'mameow@render25.com',\n    throughputPriority: 'HIGH_AVAILABILITY_SUB_SEC',\n    tls13: true,\n    dkimSignature: 'v=1; a=rsa-sha256; d=render25.com'\n  });\n}`,
                  };
                  handleCopySnippet(snippetsMap[codeSnippetTab]);
                }}
                className={`px-2.5 py-1.5 rounded-md border transition-all flex items-center gap-1.5 text-[11px] cursor-pointer ${
                  theme === "light"
                    ? "bg-white hover:bg-black/5 border-black/15 text-zinc-700 hover:text-black"
                    : "bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300 hover:text-white"
                }`}
                title="Copy Code"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>COPY CODE</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Code Body */}
            <div className={`p-5 font-mono-code text-xs leading-relaxed overflow-x-auto max-h-64 ${
              theme === "light" ? "bg-[#f8f9fc] text-zinc-800" : "bg-[#030102] text-zinc-300"
            }`}>
              {codeSnippetTab === "rave" && (
                <div className="space-y-1">
                  <div className="text-zinc-500"><span className="text-zinc-600 select-none mr-3">01</span>-- [RAVE SCRIPT ENGINE] // HIGH-FREQ CLIENT-SERVER SYNC</div>
                  <div><span className="text-zinc-600 select-none mr-3">02</span><span className="text-teal-400 font-bold">RegisterNetEvent</span>(<span className="text-amber-300">&apos;rave:syncPlayerCombat&apos;</span>, <span className="text-teal-300">function</span>(payload)</div>
                  <div><span className="text-zinc-600 select-none mr-3">03</span>    <span className="text-teal-300">local</span> src = source</div>
                  <div><span className="text-zinc-600 select-none mr-3">04</span>    <span className="text-teal-300">if not</span> AntiCheat:<span className="text-rose-400">ValidatePacket</span>(src, payload.token) <span className="text-teal-300">then return end</span></div>
                  <div><span className="text-zinc-600 select-none mr-3">05</span>    </div>
                  <div><span className="text-zinc-600 select-none mr-3">06</span>    <span className="text-rose-400">Entity</span>(<span className="text-rose-400">GetPlayerPed</span>(src)).state:<span className="text-teal-400">set</span>(<span className="text-amber-300">&apos;combatSync&apos;</span>, &#123;</div>
                  <div><span className="text-zinc-600 select-none mr-3">07</span>        recoilMultiplier = <span className="text-cyan-400">1.0</span>,  <span className="text-zinc-500">-- Zero-lag deterministic recoil</span></div>
                  <div><span className="text-zinc-600 select-none mr-3">08</span>        syncTick         = <span className="text-rose-400">GetGameTimer</span>(),</div>
                  <div><span className="text-zinc-600 select-none mr-3">09</span>        pingLatency      = payload.latency</div>
                  <div><span className="text-zinc-600 select-none mr-3">10</span>    &#125;, <span className="text-emerald-400">true</span>)</div>
                  <div><span className="text-zinc-600 select-none mr-3">11</span><span className="text-teal-300 font-bold">end</span>)</div>
                </div>
              )}
              {codeSnippetTab === "fireball" && (
                <div className="space-y-1">
                  <div className="text-zinc-500"><span className="text-zinc-600 select-none mr-3">01</span>-- [FIREBALL GAME STUDIO] // HITBOX &amp; COMBO PIPELINE</div>
                  <div><span className="text-zinc-600 select-none mr-3">02</span><span className="text-teal-300">local</span> FireballCore = <span className="text-rose-400">require</span>(ReplicatedStorage.CombatKernel)</div>
                  <div><span className="text-zinc-600 select-none mr-3">03</span></div>
                  <div><span className="text-zinc-600 select-none mr-3">04</span><span className="text-teal-300">function</span> FireballCore:<span className="text-teal-400 font-bold">ExecuteCombo</span>(player: <span className="text-amber-300">Player</span>, skillId: <span className="text-amber-300">string</span>)</div>
                  <div><span className="text-zinc-600 select-none mr-3">05</span>    <span className="text-rose-400">assert</span>(self.Cooldown:<span className="text-rose-400">IsReady</span>(player, skillId), <span className="text-amber-300">&apos;COOLDOWN_ACTIVE&apos;</span>)</div>
                  <div><span className="text-zinc-600 select-none mr-3">06</span>    <span className="text-teal-300">local</span> raycast = self.SpatialHitbox:<span className="text-teal-400">CastRay</span>(player.Character.PrimaryPart.CFrame, <span className="text-cyan-400">16</span>)</div>
                  <div><span className="text-zinc-600 select-none mr-3">07</span>    <span className="text-teal-300">if</span> raycast.Hit <span className="text-teal-300">then</span></div>
                  <div><span className="text-zinc-600 select-none mr-3">08</span>        self.NetworkBridge:<span className="text-teal-400">FireAllClients</span>(<span className="text-amber-300">&apos;OnSkillImpact&apos;</span>, raycast.Position)</div>
                  <div><span className="text-zinc-600 select-none mr-3">09</span>    <span className="text-teal-300">end</span></div>
                  <div><span className="text-zinc-600 select-none mr-3">10</span>    <span className="text-teal-300">return</span> self.ComboTree:<span className="text-rose-400">Advance</span>(player)</div>
                  <div><span className="text-zinc-600 select-none mr-3">11</span><span className="text-teal-300 font-bold">end</span></div>
                </div>
              )}
              {codeSnippetTab === "anticheat" && (
                <div className="space-y-1">
                  <div className="text-zinc-500"><span className="text-zinc-600 select-none mr-3">01</span>-- [GENZ DEFENSE] // REAL-TIME ANOMALOUS HEURISTICS</div>
                  <div><span className="text-zinc-600 select-none mr-3">02</span><span className="text-rose-400 font-bold">AddEventHandler</span>(<span className="text-amber-300">&apos;entityCreating&apos;</span>, <span className="text-teal-300">function</span>(handle)</div>
                  <div><span className="text-zinc-600 select-none mr-3">03</span>    <span className="text-teal-300">local</span> coords = <span className="text-rose-400">GetEntityCoords</span>(handle)</div>
                  <div><span className="text-zinc-600 select-none mr-3">04</span>    <span className="text-teal-300">if</span> coords.z &gt; <span className="text-cyan-400">850.0</span> <span className="text-teal-300">and not</span> WhitelistZone:<span className="text-rose-400">Contains</span>(coords) <span className="text-teal-300">then</span></div>
                  <div><span className="text-zinc-600 select-none mr-3">05</span>        <span className="text-rose-400 font-bold">CancelEvent</span>()</div>
                  <div><span className="text-zinc-600 select-none mr-3">06</span>        SecurityLog:<span className="text-teal-400">Alert</span>(<span className="text-amber-300">&apos;UNAUTHORIZED_Z_COORD_SPAWN&apos;</span>, coords)</div>
                  <div><span className="text-zinc-600 select-none mr-3">07</span>        AuditTrail:<span className="text-rose-400">FlagPlayer</span>(source, <span className="text-amber-300">&apos;HEURISTIC_TRIP_L7&apos;</span>)</div>
                  <div><span className="text-zinc-600 select-none mr-3">08</span>    <span className="text-teal-300">end</span></div>
                  <div><span className="text-zinc-600 select-none mr-3">09</span><span className="text-teal-300 font-bold">end</span>)</div>
                </div>
              )}
              {codeSnippetTab === "render25" && (
                <div className="space-y-1">
                  <div className="text-zinc-500"><span className="text-zinc-600 select-none mr-3">01</span>// [RENDER25.COM] // HIGH-THROUGHPUT TRANSACTIONAL SMTP</div>
                  <div><span className="text-zinc-600 select-none mr-3">02</span><span className="text-cyan-400 font-bold">export async function</span> <span className="text-teal-300">dispatchTransactionalEmail</span>(payload: <span className="text-amber-300">DispatchPayload</span>) &#123;</div>
                  <div><span className="text-zinc-600 select-none mr-3">03</span>  <span className="text-teal-300">const</span> node = <span className="text-teal-300">await</span> ClusterPool.<span className="text-rose-400">getLowestLatencyNode</span>();</div>
                  <div><span className="text-zinc-600 select-none mr-3">04</span>  <span className="text-teal-300">return await</span> node.<span className="text-teal-400">sendMail</span>(&#123;</div>
                  <div><span className="text-zinc-600 select-none mr-3">05</span>    from: <span className="text-amber-300">&apos;mameow@render25.com&apos;</span>,</div>
                  <div><span className="text-zinc-600 select-none mr-3">06</span>    throughputPriority: <span className="text-amber-300">&apos;HIGH_AVAILABILITY_SUB_SEC&apos;</span>,</div>
                  <div><span className="text-zinc-600 select-none mr-3">07</span>    tls13: <span className="text-emerald-400">true</span>,</div>
                  <div><span className="text-zinc-600 select-none mr-3">08</span>    dkimSignature: <span className="text-amber-300">&apos;v=1; a=rsa-sha256; d=render25.com&apos;</span></div>
                  <div><span className="text-zinc-600 select-none mr-3">09</span>  &#125;);</div>
                  <div><span className="text-zinc-600 select-none mr-3">10</span>&#125;</div>
                </div>
              )}
            </div>

            {/* Production Architecture Specs Footer */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-px font-mono-code text-[11px] border-t ${
              theme === "light" ? "bg-black/10 border-black/10" : "bg-white/10 border-white/10"
            }`}>
              <div className={theme === "light" ? "bg-white p-3" : "bg-[#080305] p-3"}>
                <span className="text-zinc-500 text-[10px] block">TICK PROFILE</span>
                <span className={theme === "light" ? "text-teal-700 font-bold" : "text-teal-300 font-bold"}>0.008ms Zero-Lag</span>
              </div>
              <div className={theme === "light" ? "bg-white p-3" : "bg-[#080305] p-3"}>
                <span className="text-zinc-500 text-[10px] block">HEAP ALLOCATION</span>
                <span className={theme === "light" ? "text-zinc-900 font-bold" : "text-white font-bold"}>1.2 MB JIT Memory</span>
              </div>
              <div className={theme === "light" ? "bg-white p-3" : "bg-[#080305] p-3"}>
                <span className="text-zinc-500 text-[10px] block">EVENT PIPELINE</span>
                <span className={theme === "light" ? "text-cyan-700 font-bold" : "text-cyan-300 font-bold"}>Async Non-Blocking</span>
              </div>
              <div className={theme === "light" ? "bg-white p-3" : "bg-[#080305] p-3"}>
                <span className="text-zinc-500 text-[10px] block">NUI UI RENDER</span>
                <span className={theme === "light" ? "text-emerald-700 font-bold" : "text-emerald-400 font-bold"}>&lt; 0.01ms / Frame</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT & SOCIAL CHANNELS ================= */}
      <section id="contact" className={`py-28 relative z-20 overflow-hidden border-t transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-b from-[#ebedf2] via-[#e2e5eb] to-[#ebedf2] border-black/10"
          : "bg-gradient-to-b from-[#080203] via-[#0d0407] to-[#040102] border-white/10"
      }`}>
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff003c]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#5865F2]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-40" />

        <div className="w-full max-w-[1240px] mx-auto px-4 relative z-10">
          {/* Main Frame */}
          <div className={`rounded-2xl border p-6 sm:p-12 md:p-16 relative backdrop-blur-2xl transition-all duration-300 ${
            theme === "light"
              ? "bg-white/90 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              : "border-white/15 bg-[#0e0407]/80 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          }`}>
            {/* Section Header */}
            <div className="max-w-3xl mx-auto space-y-4 text-center">
              <h2 className={`font-pixel text-3xl sm:text-5xl font-bold tracking-tight uppercase ${
                theme === "light" ? "text-zinc-900" : "text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              }`}>
                SOCIAL MEDIA
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed font-outfit max-w-2xl mx-auto ${
                theme === "light" ? "text-zinc-600" : "text-zinc-400"
              }`}>
                Feel free to reach out for FiveM script development, custom engine architecture, game server collaborations, or executive inquiries.
              </p>
            </div>

            {/* 3 Direct Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left">
              {/* 1. DISCORD */}
              <div className={`group relative rounded-2xl border p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#5865F2] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
                theme === "light"
                  ? "bg-white border-black/10 shadow-lg hover:shadow-xl hover:shadow-[#5865F2]/20"
                  : "border-white/10 bg-gradient-to-b from-[#5865F2]/10 via-black/70 to-black/90 hover:shadow-[0_0_35px_rgba(88,101,242,0.3)]"
              }`}>
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#5865F2]/20 rounded-full blur-2xl group-hover:bg-[#5865F2]/30 transition-all pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#5865F2]/20 border border-[#5865F2]/40 text-[#5865F2] group-hover:scale-105 transition-transform flex items-center justify-center shadow-lg shadow-[#5865F2]/20">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#5865F2]/20 border border-[#5865F2]/40 font-mono-code text-[10px] text-[#8ea1e1] uppercase tracking-wider font-bold">
                      DISCORD
                    </span>
                  </div>

                  <h3 className={`font-pixel text-xl transition-colors flex items-center gap-2 ${
                    theme === "light" ? "text-zinc-900 group-hover:text-[#5865F2]" : "text-white group-hover:text-[#5865F2]"
                  }`}>
                    DISCORD
                  </h3>
                  <div className={`mt-2 inline-block px-3 py-1 rounded-md border font-mono-code text-sm font-semibold ${
                    theme === "light" ? "bg-black/5 border-black/10 text-indigo-700" : "bg-white/5 border-white/10 text-cyan-300"
                  }`}>
                    @bobo168hengheng
                  </div>
                  <p className={`font-outfit text-xs mt-3 leading-relaxed ${
                    theme === "light" ? "text-zinc-600" : "text-zinc-400"
                  }`}>
                    Direct message me for FiveM script inquiries, server development, or private questions.
                  </p>
                </div>

                <div className={`pt-6 mt-6 border-t flex items-center gap-2 ${
                  theme === "light" ? "border-black/10" : "border-white/10"
                }`}>
                  <button
                    onClick={() => handleCopy("discord-tag", "@bobo168hengheng")}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-mono-code text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#5865F2]/30 active:scale-95 cursor-pointer"
                  >
                    {copiedId === "discord-tag" ? (
                      <>
                        <Check className="w-4 h-4 text-[#00ff88]" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY DISCORD ID</span>
                      </>
                    )}
                  </button>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Discord"
                    className={`p-3 rounded-xl border hover:border-[#5865F2] hover:bg-[#5865F2]/20 transition-all flex items-center justify-center ${
                      theme === "light"
                        ? "bg-black/5 border-black/10 text-zinc-700 hover:text-[#5865F2]"
                        : "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 2. FACEBOOK */}
              <div className={`group relative rounded-2xl border p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#1877F2] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
                theme === "light"
                  ? "bg-white border-black/10 shadow-lg hover:shadow-xl hover:shadow-[#1877F2]/20"
                  : "border-white/10 bg-gradient-to-b from-[#1877F2]/10 via-black/70 to-black/90 hover:shadow-[0_0_35px_rgba(24,119,242,0.3)]"
              }`}>
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#1877F2]/20 rounded-full blur-2xl group-hover:bg-[#1877F2]/30 transition-all pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#1877F2] group-hover:scale-105 transition-transform flex items-center justify-center shadow-lg shadow-[#1877F2]/20">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#1877F2]/20 border border-[#1877F2]/40 font-mono-code text-[10px] text-[#70a8ff] uppercase tracking-wider font-bold">
                      FACEBOOK
                    </span>
                  </div>

                  <h3 className={`font-pixel text-xl transition-colors flex items-center gap-2 ${
                    theme === "light" ? "text-zinc-900 group-hover:text-[#1877F2]" : "text-white group-hover:text-[#1877F2]"
                  }`}>
                    FACEBOOK
                  </h3>
                  <div className={`mt-2 inline-block px-3 py-1 rounded-md border font-mono-code text-sm font-semibold ${
                    theme === "light" ? "bg-black/5 border-black/10 text-blue-700" : "bg-white/5 border-white/10 text-zinc-100"
                  }`}>
                    Sal odinson
                  </div>
                  <p className={`font-outfit text-xs mt-3 leading-relaxed ${
                    theme === "light" ? "text-zinc-600" : "text-zinc-400"
                  }`}>
                    Personal Facebook profile for social updates, photos, and direct messaging.
                  </p>
                </div>

                <div className={`pt-6 mt-6 border-t flex items-center gap-2 ${
                  theme === "light" ? "border-black/10" : "border-white/10"
                }`}>
                  <a
                    href="https://www.facebook.com/share/1JfQtHAmcV/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-mono-code text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#1877F2]/30 active:scale-95 cursor-pointer"
                  >
                    <span>OPEN PROFILE</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopy("fb-name", "Sal odinson")}
                    title="Copy Full Name"
                    className={`p-3 rounded-xl border hover:border-[#1877F2] hover:bg-[#1877F2]/20 transition-all cursor-pointer ${
                      theme === "light"
                        ? "bg-black/5 border-black/10 text-zinc-700 hover:text-[#1877F2]"
                        : "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
                    }`}
                  >
                    {copiedId === "fb-name" ? (
                      <Check className="w-4 h-4 text-[#00ff88]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* 3. TIKTOK */}
              <div className={`group relative rounded-2xl border p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#fe2c55] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
                theme === "light"
                  ? "bg-white border-black/10 shadow-lg hover:shadow-xl hover:shadow-[#fe2c55]/20"
                  : "border-white/10 bg-gradient-to-b from-[#fe2c55]/10 via-black/70 to-black/90 hover:shadow-[0_0_35px_rgba(254,44,85,0.3)]"
              }`}>
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#fe2c55]/20 rounded-full blur-2xl group-hover:bg-[#fe2c55]/30 transition-all pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#fe2c55]/20 border border-[#fe2c55]/40 text-[#fe2c55] group-hover:scale-105 transition-transform flex items-center justify-center shadow-lg shadow-[#fe2c55]/20">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.48 6.3 6.3 0 0 0 1.93-4.52v-6.9a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.92-.15z"/>
                      </svg>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#fe2c55]/20 border border-[#fe2c55]/40 font-mono-code text-[10px] text-[#ff809b] uppercase tracking-wider font-bold">
                      TIKTOK
                    </span>
                  </div>

                  <h3 className={`font-pixel text-xl transition-colors flex items-center gap-2 ${
                    theme === "light" ? "text-zinc-900 group-hover:text-[#fe2c55]" : "text-white group-hover:text-[#fe2c55]"
                  }`}>
                    TIKTOK
                  </h3>
                  <div className={`mt-2 inline-block px-3 py-1 rounded-md border font-mono-code text-sm font-semibold ${
                    theme === "light" ? "bg-black/5 border-black/10 text-rose-700" : "bg-white/5 border-white/10 text-[#25F4EE]"
                  }`}>
                    @therealmeow.com
                  </div>
                  <p className={`font-outfit text-xs mt-3 leading-relaxed ${
                    theme === "light" ? "text-zinc-600" : "text-zinc-400"
                  }`}>
                    Game clips, FiveM script showcases, and development updates.
                  </p>
                </div>

                <div className={`pt-6 mt-6 border-t flex items-center gap-2 ${
                  theme === "light" ? "border-black/10" : "border-white/10"
                }`}>
                  <a
                    href="https://www.tiktok.com/@therealmeow.com?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#fe2c55] to-[#25F4EE] hover:opacity-95 text-white font-mono-code text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#fe2c55]/30 active:scale-95 cursor-pointer"
                  >
                    <span>OPEN TIKTOK</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopy("tiktok-handle", "@therealmeow.com")}
                    title="Copy Handle"
                    className={`p-3 rounded-xl border hover:border-[#fe2c55] hover:bg-[#fe2c55]/20 transition-all cursor-pointer ${
                      theme === "light"
                        ? "bg-black/5 border-black/10 text-zinc-700 hover:text-[#fe2c55]"
                        : "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
                    }`}
                  >
                    {copiedId === "tiktok-handle" ? (
                      <Check className="w-4 h-4 text-[#00ff88]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className={`border-t pt-14 pb-10 relative z-20 overflow-hidden transition-colors duration-300 ${
        theme === "light" ? "bg-[#e2e5eb] border-black/15 text-zinc-600" : "bg-black border-white/15 text-zinc-400"
      }`}>
        {/* Subtle ambient red glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-[#ff003c]/5 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-[1240px] mx-auto px-4 space-y-10 relative z-10">
          {/* Main Top Row */}
          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b ${
            theme === "light" ? "border-black/10" : "border-white/10"
          }`}>
            {/* Brand Column */}
            <div className="space-y-2 max-w-md">
              <div className="flex items-center gap-3">
                <span className={`font-pixel text-2xl tracking-wider ${
                  theme === "light" ? "text-zinc-900" : "text-white"
                }`}>MA MEOW</span>
                <span className="px-2 py-0.5 rounded bg-[#ff003c]/20 border border-[#ff003c]/40 font-mono-code text-[10px] text-[#ff003c] font-bold tracking-wider">
                  WEFAM ORG
                </span>
              </div>
              <p className={`font-outfit text-xs leading-relaxed ${
                theme === "light" ? "text-zinc-600" : "text-zinc-400"
              }`}>
                Head Developer &amp; Director specializing in FiveM Lua gameplay systems, bare-metal high-concurrency Linux clusters, and spatial 3D architecture.
              </p>
            </div>

            {/* Navigation Links & Back to Top */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-outfit text-xs font-medium">
              <a href="#hero" className={`px-3.5 py-1.5 rounded-lg border transition-colors ${
                theme === "light"
                  ? "bg-white hover:bg-black/5 text-zinc-700 hover:text-black border-black/10"
                  : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border-white/10"
              }`}>
                Home
              </a>
              <a href="#ecosystem" className={`px-3.5 py-1.5 rounded-lg border transition-colors ${
                theme === "light"
                  ? "bg-white hover:bg-black/5 text-zinc-700 hover:text-black border-black/10"
                  : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border-white/10"
              }`}>
                Network
              </a>
              <a href="#skills" className={`px-3.5 py-1.5 rounded-lg border transition-colors ${
                theme === "light"
                  ? "bg-white hover:bg-black/5 text-zinc-700 hover:text-black border-black/10"
                  : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border-white/10"
              }`}>
                Skills
              </a>
              <a href="#contact" className={`px-3.5 py-1.5 rounded-lg border transition-colors ${
                theme === "light"
                  ? "bg-white hover:bg-black/5 text-zinc-700 hover:text-black border-black/10"
                  : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border-white/10"
              }`}>
                Contact
              </a>
              <a
                href="#hero"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ff003c]/15 hover:bg-[#ff003c] text-[#ff003c] hover:text-white border border-[#ff003c]/40 hover:border-[#ff003c] font-mono-code text-xs font-bold transition-all uppercase tracking-wider group shadow-lg shadow-[#ff003c]/10"
              >
                <span>Back to Top</span>
                <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
              </a>
            </div>
          </div>

          {/* Ecosystem Ventures Grid */}
          <div className="space-y-3">
            <div className={`text-[11px] font-mono-code uppercase tracking-wider flex items-center gap-2 ${
              theme === "light" ? "text-zinc-500" : "text-zinc-500"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c]" />
              <span>ACTIVE VENTURES &amp; NETWORK PORTFOLIO</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 font-mono-code text-xs">
              {[
                { name: "RAVE SCRIPT" },
                { name: "MANTOREZ FAM" },
                { name: "RENDER25" },
                { name: "FIREBALL STUDIO" },
                { name: "GENZ BATTLEGROUND" },
                { name: "GENZ FIGHTING" },
                { name: "GENZ HANGOUT" },
                { name: "LENDARY" },
              ].map((brand) => (
                <div
                  key={brand.name}
                  className={`px-3 py-2 rounded-xl border transition-all text-center font-semibold text-[11px] flex items-center justify-center ${
                    theme === "light"
                      ? "bg-white border-black/10 text-zinc-700 hover:text-black hover:border-black/30 shadow-xs"
                      : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/[0.06]"
                  }`}
                >
                  {brand.name}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t text-[11px] font-mono-code ${
            theme === "light" ? "border-black/10 text-zinc-500" : "border-white/10 text-zinc-500"
          }`}>
            <div>
              &copy; 2026 MA MEOW. ALL RIGHTS RESERVED.
            </div>
            <div className={theme === "light" ? "text-zinc-600" : "text-zinc-400"}>
              DEVELOPED &amp; MAINTAINED BY <span className={`font-semibold ${theme === "light" ? "text-zinc-900" : "text-white"}`}>MA MEOW</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
