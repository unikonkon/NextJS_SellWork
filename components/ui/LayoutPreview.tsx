"use client";

import React from "react";

interface LayoutPreviewProps {
  preview: string;
  customLabel?: string | null;
  size?: "small" | "medium";
  themeColor?: string; // Theme color from STEP 1
}

// Preview component for different layout types - centered with realistic web section structure
export default function LayoutPreview({ preview, customLabel, size = "medium", themeColor }: LayoutPreviewProps) {
  const heightClass = size === "small" ? "h-16" : "h-20";

  // Use theme color if provided, otherwise use default purple
  const primaryColor = themeColor || "#8b5cf6";
  const secondaryColor = themeColor || "#ec4899";

  // Helper function to create color with opacity
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
    full: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        {/* Hero section preview - full width with centered content */}
        <div
          className="absolute inset-0 opacity-50"
          style={{ background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.1)}, ${withOpacity(secondaryColor, 0.1)}, ${withOpacity(primaryColor, 0.1)})` }}
        />
        <div data-animation-child className="relative z-10 flex flex-col items-center gap-2">
          <div className={`${size === "small" ? "text-xs" : "text-sm"} text-[#18a3fa] font-medium typewriter-text`}>
            Preview Text @full
          </div>
          <div
            className={`${size === "small" ? "w-14" : "w-16"} h-1.5 rounded-full`}
            style={{ backgroundColor: withOpacity(secondaryColor, 0.2) }}
          />
        </div>
      </div>
    ),
    split: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        {/* Text + Image - Left text, right image */}
        <div data-animation-child className="flex-1 flex flex-col gap-1.5 justify-center p-2 bg-[#1a1a1a]/50 rounded border border-[#333]">
          <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div className="w-3/4 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
          <div className="w-1/2 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.1) }} />
        </div>
        <div
          data-animation-child
          className="flex-1 rounded border flex items-center justify-center"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div
            className={`${size === "small" ? "w-10 h-10" : "w-12 h-12"} rounded border`}
            style={{
              backgroundColor: withOpacity(primaryColor, 0.2),
              borderColor: withOpacity(primaryColor, 0.4)
            }}
          />
        </div>
      </div>
    ),
    "split-reverse": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        {/* Image + Text - Left image, right text */}
        <div
          data-animation-child
          className="flex-1 rounded border flex items-center justify-center"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div
            className={`${size === "small" ? "w-10 h-10" : "w-12 h-12"} rounded border`}
            style={{
              backgroundColor: withOpacity(primaryColor, 0.2),
              borderColor: withOpacity(primaryColor, 0.4)
            }}
          />
        </div>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5 justify-center p-2 bg-[#1a1a1a]/50 rounded border border-[#333]">
          <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div className="w-3/4 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
          <div className="w-1/2 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.1) }} />
        </div>
      </div>
    ),
    "cols-3": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1.5 p-2`}>
        {/* 3 Columns layout */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border flex flex-col gap-1 p-1.5 justify-center ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div
              className="w-full h-1 rounded"
              style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.3)" }}
            />
            <div
              className="w-2/3 h-1 rounded"
              style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }}
            />
          </div>
        ))}
      </div>
    ),
    "cols-4": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1 p-2`}>
        {/* 4 Columns layout */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border flex flex-col gap-1 p-1 justify-center ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div
              className="w-full h-0.5 rounded"
              style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.3)" }}
            />
            <div
              className="w-2/3 h-0.5 rounded"
              style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }}
            />
          </div>
        ))}
      </div>
    ),
    gallery: (
      <div data-animation-target className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1 p-2`}>
        {/* Gallery grid layout */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border aspect-square ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          />
        ))}
      </div>
    ),
    cta: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        {/* CTA section - centered with button */}
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.1)}, ${withOpacity(secondaryColor, 0.1)}, ${withOpacity(primaryColor, 0.1)})` }}
        />
        <div data-animation-child className="relative z-10 flex flex-col items-center gap-2">
          <div
            className={`${size === "small" ? "w-28" : "w-32"} h-1.5 rounded-full`}
            style={{ backgroundColor: withOpacity(primaryColor, 0.2) }}
          />
          <div
            className={`${size === "small" ? "w-20 h-5" : "w-24 h-6"} rounded-md border`}
            style={{
              background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(secondaryColor, 0.3)})`,
              borderColor: withOpacity(primaryColor, 0.4)
            }}
          />
        </div>
      </div>
    ),
    testimonial: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center p-3 relative`}>
        {/* Testimonial - quote style with quote-mark for animation */}
        <div className="quote-mark absolute left-2 top-1 text-xl" style={{ color: withOpacity(primaryColor, 0.3) }}>❝</div>
        <div data-animation-child className="w-full flex items-center gap-2 ml-3">
          <div
            className={`${size === "small" ? "w-7 h-7" : "w-8 h-8"} rounded-full border shrink-0`}
            style={{
              backgroundColor: withOpacity(primaryColor, 0.2),
              borderColor: withOpacity(primaryColor, 0.3)
            }}
          />
          <div className="flex-1 flex flex-col gap-1">
            <div
              className={`${size === "small" ? "text-xs" : "text-sm"} typewriter-text`}
              style={{ color: withOpacity(primaryColor, 0.8) }}
            >
              This product changed my life completely
            </div>
            <div className="w-1/2 h-0.5 bg-[#52525b]/15 rounded" />
          </div>
        </div>
      </div>
    ),
    faq: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {/* FAQ - accordion style */}
        <div
          data-animation-child
          className="flex-1 rounded border flex items-center justify-between px-2"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div className="w-2/3 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.3) }} />
          <div className="w-3 h-3 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.4) }} />
        </div>
        <div data-animation-child className="flex-1 bg-[#1a1a1a]/50 rounded border border-[#333] px-2 flex items-center">
          <div className="w-full h-0.5 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),
    stats: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1.5 p-2`}>
        {/* Stats - numbers display */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border flex flex-col items-center justify-center gap-1 ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div
              className={`${size === "small" ? "w-7 h-2.5" : "w-8 h-3"} rounded`}
              style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.3)" }}
            />
            <div
              className={`${size === "small" ? "w-10" : "w-12"} h-1 rounded`}
              style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }}
            />
          </div>
        ))}
      </div>
    ),
    // === HERO VARIANTS ===
    "hero-split": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5 justify-center p-2 bg-[#1a1a1a]/50 rounded border border-[#333]">
          <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div className="w-3/4 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
        </div>
        <div
          data-animation-child
          className="flex-1 rounded border flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div
            data-zoom-pan
            className={`${size === "small" ? "w-10 h-10" : "w-12 h-12"} rounded border`}
            style={{
              backgroundColor: withOpacity(primaryColor, 0.2),
              borderColor: withOpacity(primaryColor, 0.4)
            }}
          />
        </div>
      </div>
    ),
    "hero-video": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        {/* Background/Video element for ken-burns */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(secondaryColor, 0.2)}, ${withOpacity(primaryColor, 0.2)})` }}
        />
        {/* Overlay for fade-overlay animation */}
        <div className="overlay absolute inset-0 bg-[#0d0d0d]/70" />
        {/* Text content for text-over-video animation */}
        <div className="hero-text video-text relative z-10 flex items-center gap-2">
          <div
            className={`${size === "small" ? "w-6 h-6" : "w-8 h-8"} rounded-full border flex items-center justify-center`}
            style={{
              backgroundColor: withOpacity(primaryColor, 0.4),
              borderColor: withOpacity(primaryColor, 0.6)
            }}
          >
            <div className="w-0 h-0 border-l-[6px] border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-0.5" />
          </div>
          <div className={`${size === "small" ? "w-20" : "w-24"} h-1.5 bg-white/20 rounded-full`} />
        </div>
      </div>
    ),
    "hero-slider": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1 p-2 relative overflow-hidden`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          />
        ))}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: i === 0 ? primaryColor : "#52525b" }}
            />
          ))}
        </div>
      </div>
    ),

    // === CONTENT VARIANTS ===
    zigzag: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {[...Array(2)].map((_, i) => (
          <div key={i} data-animation-child className={`flex gap-2 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
            <div className="flex-1 h-3 bg-[#1a1a1a]/50 rounded border border-[#333]" />
            <div
              className="flex-1 h-3 rounded border"
              style={{
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
                borderColor: withOpacity(primaryColor, 0.3)
              }}
            />
          </div>
        ))}
      </div>
    ),
    "text-center": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center p-2`}>
        <div data-animation-child className="flex flex-col gap-1.5 items-center w-full">
          <span className={`${size === "small" ? "text-xs" : "text-sm"} text-[#18a3fa] font-medium typewriter-text`}>Preview Text @text-center</span>
          <div className="w-3/4 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div className="w-1/2 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
          <div className="w-2/3 h-0.5 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),
    quote: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center p-3 relative`}>
        <div className="absolute left-2 top-2 text-2xl" style={{ color: withOpacity(primaryColor, 0.3) }}>❝</div>
        <div data-animation-child className="flex-1 flex flex-col gap-1 ml-4">
          <div className={`${size === "small" ? "text-xs" : "text-sm"} typewriter-text`} style={{ color: withOpacity(primaryColor, 0.8) }}>
            Great things in business are never done by one person
          </div>
          <div className="w-3/5 h-0.5 bg-[#52525b]/15 rounded" />
        </div>
      </div>
    ),

    // === COLUMN VARIANTS ===
    "cols-2": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border flex flex-col gap-1 p-2 justify-center ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-full h-1 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`w-2/3 h-1 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    asymmetric: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div
          data-animation-child
          className="flex-2 rounded border flex flex-col gap-1 p-2 justify-center"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.3) }} />
          <div className="w-2/3 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
        </div>
        <div data-animation-child className="flex-1 rounded border bg-[#1a1a1a]/50 border-[#333] flex flex-col gap-1 p-2 justify-center">
          <div className="w-full h-1 bg-[#52525b]/30 rounded" />
          <div className="w-2/3 h-1 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),

    // === FEATURES VARIANTS ===
    "features-grid": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1.5 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border flex flex-col items-center justify-center gap-1 p-1 ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-3 h-3 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.4) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`w-full h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    "features-list": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.4) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`flex-1 h-1 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    "features-tabs": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${i === 0 ? "" : "bg-[#1a1a1a]/50 border border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})`,
                borderColor: withOpacity(primaryColor, 0.4)
              } : {}}
            />
          ))}
        </div>
        <div data-animation-child className="flex-1 bg-[#1a1a1a]/50 rounded border border-[#333] p-1.5">
          <div className="w-full h-1 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),
    "features-accordion": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1 p-2`}>
        {[...Array(2)].map((_, i) => (
          <div key={i} data-animation-child className="flex-1 bg-[#1a1a1a]/50 rounded border border-[#333] flex items-center justify-between px-2">
            <div className={`w-2/3 h-1 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.2)" }} />
            <div className="w-2 h-2 rounded bg-[#52525b]/30" />
          </div>
        ))}
      </div>
    ),
    "icon-boxes": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-4 gap-1 p-2`}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border flex flex-col items-center justify-center gap-1 p-1 ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-3 h-3 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.4) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`w-full h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),

    // === GALLERY & MEDIA VARIANTS ===
    masonry: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border ${i % 3 === 0 ? "row-span-2" : ""} ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          />
        ))}
      </div>
    ),
    carousel: (
      <div data-animation-target className={`w-full ${heightClass} p-3 rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#52525b]/40 border border-[#52525b]/60" />
        <div
          data-animation-child
          className="flex-1 h-full rounded border m-1"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#52525b]/40 border border-[#52525b]/60" />
      </div>
    ),
    video: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-50"
          style={{ background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(secondaryColor, 0.2)}, ${withOpacity(primaryColor, 0.2)})` }}
        />
        <div data-animation-child className="relative z-10 flex items-center gap-2">
          <div className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} rounded-full bg-white/20 border border-white/30 flex items-center justify-center`}>
            <div className="w-0 h-0 border-l-4 border-l-white border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5" />
          </div>
          <div className={`${size === "small" ? "w-16" : "w-20"} h-1 bg-white/20 rounded-full`} />
        </div>
      </div>
    ),
    lightbox: (
      <div data-animation-target className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border aspect-square relative ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            {i === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white/20 border border-white/30" />
              </div>
            )}
          </div>
        ))}
      </div>
    ),

    // === SOCIAL PROOF VARIANTS ===
    "testimonial-slider": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#52525b]/40" />
        <div data-animation-child className="flex-1 flex items-center gap-2 p-2">
          <div
            className={`${size === "small" ? "w-6 h-6" : "w-7 h-7"} rounded-full border shrink-0`}
            style={{
              backgroundColor: withOpacity(primaryColor, 0.2),
              borderColor: withOpacity(primaryColor, 0.3)
            }}
          />
          <div className="flex-1 flex flex-col gap-1">
            <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
            <div className="w-3/4 h-1 bg-[#52525b]/20 rounded" />
          </div>
        </div>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#52525b]/40" />
      </div>
    ),
    "testimonial-grid": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-2 gap-1.5 p-2`}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border flex items-center gap-1.5 p-1 ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.4) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`flex-1 h-1 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    logos: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-3 p-2`}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 h-full rounded border flex items-center justify-center ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-6 h-6 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.4) : "rgba(82, 82, 91, 0.3)" }} />
          </div>
        ))}
      </div>
    ),
    "logos-scroll": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center gap-2 p-2 overflow-hidden`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`shrink-0 w-12 h-full rounded border flex items-center justify-center ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-5 h-5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.4) : "rgba(82, 82, 91, 0.3)" }} />
          </div>
        ))}
      </div>
    ),
    "case-studies": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-2 gap-1.5 p-2`}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border flex flex-col ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className="flex-1 bg-[#1a1a1a]/30 rounded-t" />
            <div className="p-1 flex flex-col gap-0.5">
              <div className={`w-full h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.2)" }} />
              <div className={`w-2/3 h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.15)" }} />
            </div>
          </div>
        ))}
      </div>
    ),

    // === DATA & STATS VARIANTS ===
    "stats-counter": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1.5 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border flex flex-col items-center justify-center gap-1 ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`${size === "small" ? "w-8 h-3" : "w-10 h-3.5"} rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`${size === "small" ? "w-12" : "w-14"} h-1 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    progress: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-2 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="flex items-center gap-2">
            <div className="w-12 h-1 bg-[#1a1a1a]/50 rounded-full overflow-hidden">
              <div
                className="progress-bar bar h-full rounded-full"
                style={{
                  width: `${(i + 1) * 30}%`,
                  background: i === 0 ? `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` : "#52525b"
                }}
              />
            </div>
            <div className={`flex-1 h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    charts: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-end justify-center gap-1.5 p-2`}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded-t border-t ${i === 2 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 2 ? {
              height: `${30 + i * 15}%`,
              background: `linear-gradient(to top, ${primaryColor}, ${withOpacity(primaryColor, 0.5)})`,
              borderColor: withOpacity(primaryColor, 0.4)
            } : {
              height: `${30 + i * 15}%`
            }}
          />
        ))}
      </div>
    ),

    // === PRICING VARIANTS ===
    pricing: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1.5 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border flex flex-col gap-1 p-1.5 ${i === 1 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 1 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-full h-1 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`w-2/3 h-0.5 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
            <div className={`w-1/2 h-2 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.4) : "rgba(82, 82, 91, 0.3)" }} />
          </div>
        ))}
      </div>
    ),
    "pricing-toggle": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex items-center justify-center gap-2">
          <div className="w-8 h-2 bg-[#1a1a1a]/50 rounded-full border border-[#333] relative">
            <div
              className="absolute right-0 top-0 w-1/2 h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})` }}
            />
          </div>
        </div>
        <div data-animation-child className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-1 h-8 bg-[#1a1a1a]/50 rounded border border-[#333]" />
          ))}
        </div>
      </div>
    ),
    "pricing-comparison": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="flex gap-1.5">
            <div className="w-16 h-2 bg-[#1a1a1a]/50 rounded border border-[#333]" />
            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className={`flex-1 h-2 rounded ${i === 0 && j === 1 ? "" : "bg-[#1a1a1a]/50 border border-[#333]"}`}
                style={i === 0 && j === 1 ? {
                  background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})`
                } : {}}
              />
            ))}
          </div>
        ))}
      </div>
    ),

    // === CTA VARIANTS ===
    "cta-split": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div
          data-animation-child
          className="flex-1 rounded border flex items-center justify-center"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div
            className={`${size === "small" ? "w-8 h-8" : "w-10 h-10"} rounded border`}
            style={{
              backgroundColor: withOpacity(primaryColor, 0.2),
              borderColor: withOpacity(primaryColor, 0.4)
            }}
          />
        </div>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5 justify-center">
          <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div
            className={`${size === "small" ? "w-20 h-4" : "w-24 h-5"} rounded-md border`}
            style={{
              background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(secondaryColor, 0.3)})`,
              borderColor: withOpacity(primaryColor, 0.4)
            }}
          />
        </div>
      </div>
    ),
    "cta-banner": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-between p-3 relative overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.1)}, ${withOpacity(secondaryColor, 0.1)}, ${withOpacity(primaryColor, 0.1)})` }}
        />
        <div data-animation-child className="relative z-10 flex-1 flex flex-col gap-1.5">
          <div className="w-3/4 h-1 bg-white/20 rounded" />
          <div className="w-1/2 h-1 bg-white/15 rounded" />
        </div>
        <div
          data-animation-child
          className={`relative z-10 ${size === "small" ? "w-16 h-6" : "w-20 h-7"} rounded-md border`}
          style={{
            background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.4)}, ${withOpacity(secondaryColor, 0.4)})`,
            borderColor: withOpacity(primaryColor, 0.5)
          }}
        />
      </div>
    ),
    newsletter: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center gap-2 p-2`}>
        <div data-animation-child className="flex-1 h-6 bg-[#1a1a1a]/50 rounded border border-[#333]" />
        <div
          data-animation-child
          className={`${size === "small" ? "w-16 h-6" : "w-20 h-7"} rounded-md border`}
          style={{
            background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(secondaryColor, 0.3)})`,
            borderColor: withOpacity(primaryColor, 0.4)
          }}
        />
      </div>
    ),
    download: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-2 p-2`}>
        <div
          data-animation-child
          className={`${size === "small" ? "w-6 h-6" : "w-7 h-7"} rounded border flex items-center justify-center`}
          style={{
            backgroundColor: withOpacity(primaryColor, 0.2),
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div className="w-0 h-0 border-t-4 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent" style={{ borderTopColor: primaryColor }} />
        </div>
        <div data-animation-child className="flex flex-col gap-1">
          <div className="w-20 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div className="w-16 h-0.5 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),

    // === FORMS VARIANTS ===
    contact: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="w-full h-3 bg-[#1a1a1a]/50 rounded border border-[#333]" />
        ))}
        <div
          data-animation-child
          className={`${size === "small" ? "w-16 h-5" : "w-20 h-6"} rounded-md border`}
          style={{
            background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(secondaryColor, 0.3)})`,
            borderColor: withOpacity(primaryColor, 0.4)
          }}
        />
      </div>
    ),
    "contact-split": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-full h-3 bg-[#1a1a1a]/50 rounded border border-[#333]" />
          ))}
        </div>
        <div
          data-animation-child
          className="flex-1 rounded border"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        />
      </div>
    ),
    signup: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} data-animation-child className="w-full h-2.5 bg-[#1a1a1a]/50 rounded border border-[#333]" />
        ))}
        <div
          data-animation-child
          className={`${size === "small" ? "w-20 h-5" : "w-24 h-6"} rounded-md border`}
          style={{
            background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(secondaryColor, 0.3)})`,
            borderColor: withOpacity(primaryColor, 0.4)
          }}
        />
      </div>
    ),
    lead: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-2 p-2 relative overflow-hidden`}>
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.05)}, ${withOpacity(secondaryColor, 0.05)}, ${withOpacity(primaryColor, 0.05)})` }}
        />
        <div data-animation-child className="relative z-10 flex-1 h-5 bg-[#1a1a1a]/50 rounded border border-[#333]" />
        <div
          data-animation-child
          className={`relative z-10 ${size === "small" ? "w-16 h-5" : "w-20 h-6"} rounded-md border`}
          style={{
            background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(secondaryColor, 0.3)})`,
            borderColor: withOpacity(primaryColor, 0.4)
          }}
        />
      </div>
    ),

    // === FAQ VARIANTS ===
    "faq-categories": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${i === 0 ? "" : "bg-[#1a1a1a]/50 border border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})`,
                borderColor: withOpacity(primaryColor, 0.4)
              } : {}}
            />
          ))}
        </div>
        <div data-animation-child className="flex-1 bg-[#1a1a1a]/50 rounded border border-[#333] p-1.5">
          <div className="w-full h-0.5 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),
    "faq-search": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="w-full h-4 bg-[#1a1a1a]/50 rounded border border-[#333] flex items-center px-2">
          <div className="w-3 h-3 rounded bg-[#52525b]/30" />
          <div className="flex-1 h-1 ml-2 bg-[#52525b]/20 rounded" />
        </div>
        <div data-animation-child className="flex-1 bg-[#1a1a1a]/50 rounded border border-[#333] p-1.5">
          <div className="w-full h-0.5 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),

    // === TEAM VARIANTS ===
    team: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-3 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="flex flex-col items-center gap-1">
            <div
              className={`${size === "small" ? "w-8 h-8" : "w-10 h-10"} rounded-full border ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})`,
                borderColor: withOpacity(primaryColor, 0.4)
              } : {}}
            />
            <div className={`w-12 h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    "team-grid": (
      <div data-animation-target className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1.5 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border flex flex-col items-center gap-1 p-1 ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-6 h-6 rounded-full`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.4) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`w-full h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    "team-carousel": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#52525b]/40" />
        <div data-animation-child className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`${size === "small" ? "w-7 h-7" : "w-8 h-8"} rounded-full border ${i === 1 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
                style={i === 1 ? {
                  background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})`,
                  borderColor: withOpacity(primaryColor, 0.4)
                } : {}}
              />
              <div className={`w-10 h-0.5 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
            </div>
          ))}
        </div>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#52525b]/40" />
      </div>
    ),

    // === TIMELINE & PROCESS VARIANTS ===
    timeline: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center gap-2 p-2 relative`}>
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#333]" />
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="flex items-center gap-2 flex-1">
            <div
              className={`w-2 h-2 rounded-full border-2`}
              style={i === 0 ? {
                backgroundColor: primaryColor,
                borderColor: withOpacity(primaryColor, 0.4)
              } : {
                backgroundColor: "#52525b",
                borderColor: "rgba(82, 82, 91, 0.4)"
              }}
            />
            <div className={`flex-1 h-1 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    "timeline-h": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col items-center gap-1.5 p-2 relative`}>
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#333]" />
        <div data-animation-child className="flex gap-4 relative z-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full border-2`}
                style={i === 1 ? {
                  backgroundColor: primaryColor,
                  borderColor: withOpacity(primaryColor, 0.4)
                } : {
                  backgroundColor: "#52525b",
                  borderColor: "rgba(82, 82, 91, 0.4)"
                }}
              />
              <div className={`w-8 h-1 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
            </div>
          ))}
        </div>
      </div>
    ),
    process: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-2 p-2`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} data-animation-child className="flex items-center gap-1.5 flex-1">
            <div
              className={`${size === "small" ? "w-4 h-4" : "w-5 h-5"} rounded-full flex items-center justify-center border ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})`,
                borderColor: withOpacity(primaryColor, 0.4)
              } : {}}
            >
              <span className={`text-[8px]`} style={{ color: i === 0 ? primaryColor : "#52525b" }}>{i + 1}</span>
            </div>
            {i < 3 && <div className="flex-1 h-0.5 bg-[#333]" />}
          </div>
        ))}
      </div>
    ),
    roadmap: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full border-2"
            style={{
              backgroundColor: primaryColor,
              borderColor: withOpacity(primaryColor, 0.4)
            }}
          />
          <div className="flex-1 h-0.5 bg-[#333]" />
          <div className="w-2 h-2 rounded-full bg-[#52525b] border-2 border-[#52525b]/40" />
          <div className="flex-1 h-0.5 bg-[#333]" />
          <div className="w-2 h-2 rounded-full bg-[#52525b] border-2 border-[#52525b]/40" />
        </div>
        <div data-animation-child className="flex gap-2">
          <div
            className="flex-1 h-2 rounded border"
            style={{
              backgroundColor: withOpacity(primaryColor, 0.2),
              borderColor: withOpacity(primaryColor, 0.3)
            }}
          />
          <div className="flex-1 h-2 bg-[#1a1a1a]/50 rounded border border-[#333]" />
          <div className="flex-1 h-2 bg-[#1a1a1a]/50 rounded border border-[#333]" />
        </div>
      </div>
    ),

    // === MAP & LOCATION VARIANTS ===
    map: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] opacity-80" />
        <div data-animation-child className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-2 h-2 rounded-full border-2 border-white/20 animate-pulse"
            style={{ backgroundColor: primaryColor }}
          />
        </div>
        <div className="absolute top-1 left-1 w-3 h-3 rounded bg-[#52525b]/30 border border-[#52525b]/50" />
        <div className="absolute bottom-1 right-1 w-3 h-3 rounded bg-[#52525b]/30 border border-[#52525b]/50" />
      </div>
    ),
    "map-contact": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-1 bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] rounded border border-[#333] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-2 h-2 rounded-full border-2 border-white/20"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        </div>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-full h-2 bg-[#1a1a1a]/50 rounded border border-[#333]" />
          ))}
        </div>
      </div>
    ),

    // === BLOG & NEWS VARIANTS ===
    "blog-grid": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1.5 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border flex flex-col ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className="flex-1 bg-[#1a1a1a]/30 rounded-t" />
            <div className="p-1">
              <div className={`w-full h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
            </div>
          </div>
        ))}
      </div>
    ),
    "blog-list": (
      <div data-animation-target className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="flex gap-2">
            <div
              className={`w-12 h-12 rounded border ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
                borderColor: withOpacity(primaryColor, 0.3)
              } : {}}
            />
            <div className="flex-1 flex flex-col gap-1">
              <div className={`w-full h-1 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
              <div className={`w-3/4 h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.15) : "rgba(82, 82, 91, 0.15)" }} />
            </div>
          </div>
        ))}
      </div>
    ),
    "blog-featured": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div
          data-animation-child
          className="flex-2 rounded border"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        />
        <div data-animation-child className="flex-1 flex flex-col gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-1 bg-[#1a1a1a]/50 rounded border border-[#333] p-1">
              <div className="w-full h-0.5 bg-[#52525b]/20 rounded" />
            </div>
          ))}
        </div>
      </div>
    ),
    "news-ticker": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center gap-2 p-2 overflow-hidden`}>
        <div
          data-animation-child
          className="w-6 h-6 rounded border flex items-center justify-center shrink-0"
          style={{
            backgroundColor: withOpacity(primaryColor, 0.2),
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
        </div>
        <div data-animation-child className="flex-1 flex gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="shrink-0 w-20 h-2 bg-[#1a1a1a]/50 rounded border border-[#333]" />
          ))}
        </div>
      </div>
    ),

    // === INTERACTIVE VARIANTS ===
    tabs: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${i === 0 ? "" : "bg-[#1a1a1a]/50 border border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})`,
                borderColor: withOpacity(primaryColor, 0.4)
              } : {}}
            />
          ))}
        </div>
        <div data-animation-child className="flex-1 bg-[#1a1a1a]/50 rounded border border-[#333] p-1.5">
          <div className="w-full h-1 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),
    accordion: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1 p-2`}>
        {[...Array(2)].map((_, i) => (
          <div key={i} data-animation-child className="flex-1 bg-[#1a1a1a]/50 rounded border border-[#333] flex items-center justify-between px-2">
            <div className={`w-2/3 h-1 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.2)" }} />
            <div className="w-2 h-2 rounded bg-[#52525b]/30" />
          </div>
        ))}
      </div>
    ),
    "filter-gallery": (
      <div data-animation-target className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${i === 0 ? "" : "bg-[#1a1a1a]/50 border border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})`,
                borderColor: withOpacity(primaryColor, 0.4)
              } : {}}
            />
          ))}
        </div>
        <div data-animation-child className="grid grid-cols-3 gap-1">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`rounded border aspect-square ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
                borderColor: withOpacity(primaryColor, 0.3)
              } : {}}
            />
          ))}
        </div>
      </div>
    ),
    comparison: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 flex">
          <div
            data-animation-child
            className="flex-1"
            style={{
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`
            }}
          />
          <div className="w-0.5 bg-[#333]" />
          <div data-animation-child className="flex-1 bg-[#1a1a1a]/50" />
        </div>
        <div data-animation-child className="relative z-10 w-1 h-8 bg-white/30 rounded-full" />
      </div>
    ),

    // === CUSTOM VARIANTS ===
    custom: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#333] flex items-center justify-center`}>
        <div data-animation-child className={`flex flex-col items-center ${size === "small" ? "gap-1.5" : "gap-2"}`}>
          <span className="text-[#52525b] text-xs">✏️</span>
          <span className="text-[#52525b] text-[10px]">{customLabel || "กำหนดเอง"}</span>
        </div>
      </div>
    ),
    embed: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] opacity-80" />
        <div data-animation-child className="relative z-10 flex flex-col items-center gap-1.5">
          <div className="w-8 h-8 rounded border-2 border-[#52525b] flex items-center justify-center">
            <span className="text-[#52525b] text-xs">&lt;/&gt;</span>
          </div>
          <div className="w-16 h-1 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),

    // === NEW HERO VARIANTS ===
    "hero-minimal": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center`}>
        <div data-animation-child className="flex flex-col items-center gap-2">
          <div className={`${size === "small" ? "text-xs" : "text-sm"} text-[#18a3fa] font-medium typewriter-text`}>
            Hero Minimal
          </div>
          <div
            className={`${size === "small" ? "w-20 h-5" : "w-24 h-6"} rounded-md border`}
            style={{
              background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(secondaryColor, 0.3)})`,
              borderColor: withOpacity(primaryColor, 0.4)
            }}
          />
        </div>
      </div>
    ),
    "hero-fullscreen": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative`}>
        <div data-animation-child className="flex flex-col items-center gap-2">
          <div className={`${size === "small" ? "text-xs" : "text-sm"} text-[#18a3fa] font-medium typewriter-text`}>
            Hero Fullscreen
          </div>
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-1 h-3 rounded-full animate-bounce" style={{ backgroundColor: primaryColor }} />
          </div>
        </div>
      </div>
    ),
    "hero-centered": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center`}>
        <div data-animation-child className="flex flex-col items-center gap-2 text-center">
          <div className={`${size === "small" ? "text-xs" : "text-sm"} text-[#18a3fa] font-medium typewriter-text`}>
            Hero Centered
          </div>
          <div className="w-3/4 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
        </div>
      </div>
    ),
    "hero-collage": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border aspect-square ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          />
        ))}
      </div>
    ),
    "hero-3d": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${size === "small" ? "w-12 h-12" : "w-16 h-16"} rounded border-2`}
            style={{
              borderColor: withOpacity(primaryColor, 0.4),
              transform: "perspective(100px) rotateY(15deg)"
            }}
          />
        </div>
        <div data-animation-child className="relative z-10 flex flex-col items-center gap-2">
          <div className={`${size === "small" ? "text-xs" : "text-sm"} text-[#18a3fa] font-medium`}>
            Hero 3D
          </div>
        </div>
      </div>
    ),

    // === NEW CONTENT VARIANTS ===
    "full-image": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col relative overflow-hidden`}>
        <div
          className="flex-1"
          style={{ background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})` }}
        />
        <div data-animation-child className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-[#52525b]/20 rounded" />
      </div>
    ),
    "two-col-text": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        {[...Array(2)].map((_, i) => (
          <div key={i} data-animation-child className="flex-1 flex flex-col gap-1 p-2 bg-[#1a1a1a]/50 rounded border border-[#333]">
            <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
            <div className="w-3/4 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
            <div className="w-1/2 h-0.5 bg-[#52525b]/20 rounded" />
          </div>
        ))}
      </div>
    ),
    highlight: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg border flex items-center justify-center p-3`} style={{ borderColor: withOpacity(primaryColor, 0.4), background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.1)}, ${withOpacity(secondaryColor, 0.1)})` }}>
        <div data-animation-child className="flex flex-col items-center gap-1.5">
          <div className={`${size === "small" ? "text-xs" : "text-sm"} font-medium`} style={{ color: primaryColor }}>
            Highlight Box
          </div>
          <div className="w-3/4 h-0.5 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.3) }} />
        </div>
      </div>
    ),
    overlay: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})` }}
        />
        <div className="absolute inset-0 bg-[#0d0d0d]/60" />
        <div data-animation-child className="relative z-10 flex flex-col items-center gap-2">
          <div className={`${size === "small" ? "text-xs" : "text-sm"} text-white font-medium`}>
            Image Overlay Text
          </div>
        </div>
      </div>
    ),
    "content-cards": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1.5 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border flex flex-col gap-1 p-1 ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className="flex-1 bg-[#1a1a1a]/30 rounded" />
            <div className={`w-full h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    "numbered-list": (
      <div
        data-animation-target
        className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="flex items-center gap-2">
            <div
              className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} step-number rounded-full border flex items-center justify-center shrink-0`}
              style={{
                borderColor: withOpacity(primaryColor, 0.4),
                backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "transparent"
              }}
            >
              <span className={`text-[10px]`} style={{ color: primaryColor }}>{i + 1}</span>
            </div>
            <div className="flex-1 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
          </div>
        ))}
      </div>
    ),
    "side-note": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-3 flex flex-col gap-1 p-2">
          <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div className="w-3/4 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
        </div>
        <div data-animation-child className="flex-1 bg-[#1a1a1a]/50 rounded border border-[#333] p-1.5">
          <div className="w-full h-0.5 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),
    "rich-text": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
        ))}
      </div>
    ),
    "img-caption-grid": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1.5 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} data-animation-child className="flex flex-col gap-1">
            <div
              className={`rounded border aspect-square ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
                borderColor: withOpacity(primaryColor, 0.3)
              } : {}}
            />
            <div className={`w-full h-0.5 rounded`} style={{ backgroundColor: withOpacity(primaryColor, 0.1) }} />
          </div>
        ))}
      </div>
    ),

    // === NEW COLUMN VARIANTS ===
    "cols-5": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1 p-2`}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border flex flex-col gap-0.5 p-1 justify-center ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-full h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`w-2/3 h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
          </div>
        ))}
      </div>
    ),
    "cols-6": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-0.5 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border flex flex-col gap-0.5 p-0.5 justify-center ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-full h-0.5 rounded`} style={{ backgroundColor: i === 0 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.3)" }} />
          </div>
        ))}
      </div>
    ),
    "sidebar-left": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="w-1/4 rounded border bg-[#1a1a1a]/50 border-[#333] flex flex-col gap-1 p-1.5">
          <div className="w-full h-0.5 bg-[#52525b]/20 rounded" />
          <div className="w-2/3 h-0.5 bg-[#52525b]/20 rounded" />
        </div>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5 p-2">
          <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div className="w-3/4 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
        </div>
      </div>
    ),
    "sidebar-right": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5 p-2">
          <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div className="w-3/4 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
        </div>
        <div data-animation-child className="w-1/4 rounded border bg-[#1a1a1a]/50 border-[#333] flex flex-col gap-1 p-1.5">
          <div className="w-full h-0.5 bg-[#52525b]/20 rounded" />
          <div className="w-2/3 h-0.5 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),
    "cols-3-unequal": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1.5 p-2`}>
        <div
          data-animation-child
          className="w-1/4 rounded border flex flex-col gap-1 p-1.5 justify-center"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div className="w-full h-0.5 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.3) }} />
        </div>
        <div data-animation-child className="flex-1 rounded border bg-[#1a1a1a]/50 border-[#333] flex flex-col gap-1 p-1.5 justify-center">
          <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div className="w-3/4 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
        </div>
        <div
          data-animation-child
          className="w-1/4 rounded border flex flex-col gap-1 p-1.5 justify-center"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div className="w-full h-0.5 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.3) }} />
        </div>
      </div>
    ),

    // === NEW MEDIA VARIANTS ===
    "gallery-justified": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1 p-2`}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3),
              height: i % 2 === 0 ? "100%" : "80%"
            } : {}}
          />
        ))}
      </div>
    ),
    "gallery-hover": (
      <div data-animation-target className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border aspect-square relative ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            {i === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d0d]/60">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              </div>
            )}
          </div>
        ))}
      </div>
    ),
    "gallery-filter": (
      <div data-animation-target className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${i === 0 ? "" : "bg-[#1a1a1a]/50 border border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})`,
                borderColor: withOpacity(primaryColor, 0.4)
              } : {}}
            />
          ))}
        </div>
        <div data-animation-child className="grid grid-cols-3 gap-1">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`rounded border aspect-square ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
                borderColor: withOpacity(primaryColor, 0.3)
              } : {}}
            />
          ))}
        </div>
      </div>
    ),
    "gallery-infinite": (
      <div data-animation-target className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1 p-2 overflow-hidden`}>
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border aspect-square ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          />
        ))}
      </div>
    ),
    "gallery-mosaic": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-4 gap-1 p-2`}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border ${i % 4 === 0 ? "col-span-2 row-span-2" : ""} ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          />
        ))}
      </div>
    ),
    "video-grid": (
      <div data-animation-target className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1.5 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border aspect-square relative flex items-center justify-center ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} rounded-full border flex items-center justify-center`} style={{ borderColor: withOpacity(primaryColor, 0.4) }}>
              <div className="w-0 h-0 border-l-2 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5" />
            </div>
          </div>
        ))}
      </div>
    ),
    "media-slider": (
      <div data-animation-target className={`w-full ${heightClass} p-3 rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#52525b]/40 border border-[#52525b]/60" />
        <div
          data-animation-child
          className="flex-1 h-full rounded border m-1 flex items-center justify-center"
          style={{
            background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} rounded-full border flex items-center justify-center`} style={{ borderColor: withOpacity(primaryColor, 0.4) }}>
            <div className="w-0 h-0 border-l-2 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5" />
          </div>
        </div>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#52525b]/40 border border-[#52525b]/60" />
      </div>
    ),
    "fullscreen-gallery": (
      <div data-animation-target className={`w-full h-full rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-2 gap-1 p-2`}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border aspect-square ${i === 0 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 0 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          />
        ))}
      </div>
    ),
    "before-after": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 flex">
          <div
            data-animation-child
            className="flex-1"
            style={{
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`
            }}
          />
          <div className="w-0.5 bg-[#333]" />
          <div data-animation-child className="flex-1 bg-[#1a1a1a]/50" />
        </div>
        <div data-animation-child className="relative z-10 w-1 h-8 bg-white/30 rounded-full" />
      </div>
    ),
    "audio-player": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center gap-2 p-2`}>
        <div
          data-animation-child
          className={`${size === "small" ? "w-8 h-8" : "w-10 h-10"} rounded-full border flex items-center justify-center shrink-0`}
          style={{
            backgroundColor: withOpacity(primaryColor, 0.2),
            borderColor: withOpacity(primaryColor, 0.3)
          }}
        >
          <div className="w-0 h-0 border-l-2 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5" />
        </div>
        <div data-animation-child className="flex-1 flex flex-col gap-1">
          <div className="w-full h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          <div className="w-3/4 h-0.5 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),

    // === NEW PRICING VARIANTS ===
    "pricing-cards": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1.5 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border flex flex-col gap-1 p-1.5 ${i === 1 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 1 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.2)}, ${withOpacity(primaryColor, 0.1)})`,
              borderColor: withOpacity(primaryColor, 0.3)
            } : {}}
          >
            <div className={`w-full h-1 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`w-2/3 h-0.5 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
            <div className={`w-1/2 h-2 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.4) : "rgba(82, 82, 91, 0.3)" }} />
          </div>
        ))}
      </div>
    ),
    "pricing-minimal": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="flex items-center gap-2">
            <div className="w-16 h-2 bg-[#1a1a1a]/50 rounded border border-[#333]" />
            <div className="flex-1 h-1 rounded" style={{ backgroundColor: withOpacity(primaryColor, 0.15) }} />
            <div className={`${size === "small" ? "w-12 h-2" : "w-14 h-2.5"} rounded`} style={{ backgroundColor: withOpacity(primaryColor, 0.2) }} />
          </div>
        ))}
      </div>
    ),
    "pricing-slider": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-2 p-2`}>
        <div data-animation-child className="w-full h-2 bg-[#1a1a1a]/50 rounded-full border border-[#333] relative">
          <div
            className="absolute left-0 top-0 w-1/3 h-full rounded-full"
            style={{ background: `linear-gradient(to right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})` }}
          />
        </div>
        <div data-animation-child className="flex items-center justify-center gap-2">
          <div className={`${size === "small" ? "w-16 h-3" : "w-20 h-3.5"} rounded`} style={{ backgroundColor: withOpacity(primaryColor, 0.3) }} />
        </div>
      </div>
    ),
    "pricing-tabs": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${i === 0 ? "" : "bg-[#1a1a1a]/50 border border-[#333]"}`}
              style={i === 0 ? {
                background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.3)}, ${withOpacity(primaryColor, 0.2)})`,
                borderColor: withOpacity(primaryColor, 0.4)
              } : {}}
            />
          ))}
        </div>
        <div data-animation-child className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-1 h-8 bg-[#1a1a1a]/50 rounded border border-[#333]" />
          ))}
        </div>
      </div>
    ),
    "pricing-highlighted": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1.5 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`flex-1 rounded border flex flex-col gap-1 p-1.5 relative ${i === 1 ? "" : "bg-[#1a1a1a]/50 border-[#333]"}`}
            style={i === 1 ? {
              background: `linear-gradient(to bottom right, ${withOpacity(primaryColor, 0.25)}, ${withOpacity(primaryColor, 0.15)})`,
              borderColor: withOpacity(primaryColor, 0.4),
              borderWidth: "2px"
            } : {}}
          >
            {i === 1 && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
            )}
            <div className={`w-full h-1 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.3) : "rgba(82, 82, 91, 0.3)" }} />
            <div className={`w-2/3 h-0.5 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.2) : "rgba(82, 82, 91, 0.2)" }} />
            <div className={`w-1/2 h-2 rounded`} style={{ backgroundColor: i === 1 ? withOpacity(primaryColor, 0.4) : "rgba(82, 82, 91, 0.3)" }} />
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-full">{previewStyles[preview] || previewStyles.custom}</div>
    </div>
  );
}



