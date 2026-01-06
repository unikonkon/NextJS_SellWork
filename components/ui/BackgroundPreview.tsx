"use client";

import React from "react";

interface BackgroundPreviewProps {
  preview: string;
  themeColor?: string;
  size?: "small" | "medium";
}

export default function BackgroundPreview({ preview, themeColor, size = "medium" }: BackgroundPreviewProps) {
  const heightClass = size === "small" ? "h-16" : "h-20";
  const primaryColor = themeColor || "#8b5cf6";
  const secondaryColor = themeColor || "#ec4899";

  const withOpacity = (color: string, opacity: number) => {
    if (color.startsWith("#")) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  };

  const previewStyles: Record<string, React.JSX.Element> = {
    solid: (
      <div className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center`} style={{ backgroundColor: withOpacity(primaryColor, 0.1) }}>
        <span className="text-[10px] text-[#52525b]">Solid</span>
      </div>
    ),
    gradient: (
      <div
        className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center`}
        style={{
          background: `linear-gradient(135deg, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(secondaryColor, 0.2)})`,
        }}
      >
        <span className="text-[10px] text-white/70">Gradient</span>
      </div>
    ),
    "animated-gradient": (
      <div
        className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(secondaryColor, 0.2)})`,
        }}
      >
        <div className="absolute inset-0 animate-pulse" style={{ background: `linear-gradient(90deg, transparent, ${withOpacity(primaryColor, 0.1)}, transparent)` }} />
        <span className="text-[10px] text-white/70 relative z-10">Animated</span>
      </div>
    ),
    pattern: (
      <div
        className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`}
        style={{ backgroundColor: withOpacity(primaryColor, 0.05) }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${withOpacity(primaryColor, 0.1)}, ${withOpacity(primaryColor, 0.1)} 10px, transparent 10px, transparent 20px)`,
          }}
        />
        <span className="text-[10px] text-white/70 relative z-10">Pattern</span>
      </div>
    ),
    grid: (
      <div
        className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`}
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(${withOpacity(primaryColor, 0.1)} 1px, transparent 1px), linear-gradient(90deg, ${withOpacity(primaryColor, 0.1)} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        <span className="text-[10px] text-white/70 relative z-10">Grid</span>
      </div>
    ),
    dots: (
      <div
        className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`}
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, ${withOpacity(primaryColor, 0.3)} 1px, transparent 1px)`,
            backgroundSize: "15px 15px",
          }}
        />
        <span className="text-[10px] text-white/70 relative z-10">Dots</span>
      </div>
    ),
    mesh: (
      <div
        className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 30%, ${withOpacity(primaryColor, 0.2)}, transparent 50%),
                         radial-gradient(circle at 80% 70%, ${withOpacity(secondaryColor, 0.15)}, transparent 50%),
                         radial-gradient(circle at 50% 50%, ${withOpacity(primaryColor, 0.1)}, transparent 50%)`,
          }}
        />
        <span className="text-[10px] text-white/70 relative z-10">Mesh</span>
      </div>
    ),
    particles: (() => {
      // Generate random positions for particles
      const particleCount = 18;
      const particles = Array.from({ length: particleCount }, () => ({
        left: Math.random() * 90 + 5, // 5% to 95%
        top: Math.random() * 90 + 5, // 5% to 95%
        size: Math.random() * 3 + 2, // 2px to 5px
        opacity: Math.random() * 0.4 + 0.4, // 0.4 to 0.8
      }));

      return (
        <div
          className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`}
          style={{ backgroundColor: "#0d0d0d" }}
        >
          <div className="absolute inset-0">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: withOpacity(primaryColor, particle.opacity),
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
              />
            ))}
          </div>
          <span className="text-[10px] text-white/70 relative z-10">Particles</span>
        </div>
      );
    })(),
    noise: (
      <div
        className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`}
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <span className="text-[10px] text-white/70 relative z-10">Noise</span>
      </div>
    ),
    lines: (
      <div
        className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`}
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.2)} 1px, transparent 1px, transparent 20px)`,
          }}
        />
        <span className="text-[10px] text-white/70 relative z-10">Lines</span>
      </div>
    ),
    none: (
      <div className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center bg-[#0d0d0d]`}>
        <span className="text-[10px] text-[#52525b]">ไม่มี Background</span>
      </div>
    ),
  };

  return previewStyles[preview] || previewStyles.none;
}

