"use client";

import React from "react";

interface LayoutPreviewProps {
  preview: string;
  customLabel?: string | null;
  size?: "small" | "medium";
}

// Preview component for different layout types - centered with realistic web section structure
export default function LayoutPreview({ preview, customLabel, size = "medium" }: LayoutPreviewProps) {
  const heightClass = size === "small" ? "h-16" : "h-20";

  const previewStyles: Record<string, React.JSX.Element> = {
    full: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        {/* Hero section preview - full width with centered content */}
        <div className="absolute inset-0 bg-linear-to-r from-[#8b5cf6]/10 via-[#ec4899]/10 to-[#8b5cf6]/10 opacity-50" />
        <div data-animation-child className="relative z-10 flex flex-col items-center gap-2">
          <div className={`${size === "small" ? "text-xs" : "text-sm"} text-[#18a3fa] font-medium typewriter-text`}>
            Preview Text @full
          </div>
          <div className={`${size === "small" ? "w-14" : "w-16"} h-1.5 bg-[#ec4899]/20 rounded-full`} />
        </div>
      </div>
    ),
    split: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        {/* Text + Image - Left text, right image */}
        <div data-animation-child className="flex-1 flex flex-col gap-1.5 justify-center p-2 bg-[#1a1a1a]/50 rounded border border-[#333]">
          <div className="w-full h-1 bg-[#8b5cf6]/20 rounded" />
          <div className="w-3/4 h-1 bg-[#8b5cf6]/15 rounded" />
          <div className="w-1/2 h-1 bg-[#8b5cf6]/10 rounded" />
        </div>
        <div data-animation-child className="flex-1 bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30 flex items-center justify-center">
          <div className={`${size === "small" ? "w-10 h-10" : "w-12 h-12"} rounded bg-[#8b5cf6]/20 border border-[#8b5cf6]/40`} />
        </div>
      </div>
    ),
    "split-reverse": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        {/* Image + Text - Left image, right text */}
        <div data-animation-child className="flex-1 bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30 flex items-center justify-center">
          <div className={`${size === "small" ? "w-10 h-10" : "w-12 h-12"} rounded bg-[#8b5cf6]/20 border border-[#8b5cf6]/40`} />
        </div>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5 justify-center p-2 bg-[#1a1a1a]/50 rounded border border-[#333]">
          <div className="w-full h-1 bg-[#8b5cf6]/20 rounded" />
          <div className="w-3/4 h-1 bg-[#8b5cf6]/15 rounded" />
          <div className="w-1/2 h-1 bg-[#8b5cf6]/10 rounded" />
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
            className={`flex-1 rounded border flex flex-col gap-1 p-1.5 justify-center ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`w-full h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/30" : "bg-[#52525b]/30"}`} />
            <div className={`w-2/3 h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
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
            className={`flex-1 rounded border flex flex-col gap-1 p-1 justify-center ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`w-full h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/30" : "bg-[#52525b]/30"}`} />
            <div className={`w-2/3 h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
          </div>
        ))}
      </div>
    ),
    gallery: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1 p-2`}>
        {/* Gallery grid layout */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border aspect-square ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          />
        ))}
      </div>
    ),
    cta: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        {/* CTA section - centered with button */}
        <div className="absolute inset-0 bg-linear-to-r from-[#8b5cf6]/10 via-[#ec4899]/10 to-[#8b5cf6]/10 opacity-30" />
        <div data-animation-child className="relative z-10 flex flex-col items-center gap-2">
          <div className={`${size === "small" ? "w-28" : "w-32"} h-1.5 bg-[#8b5cf6]/20 rounded-full`} />
          <div className={`${size === "small" ? "w-20 h-5" : "w-24 h-6"} rounded-md bg-linear-to-r from-[#8b5cf6]/30 to-[#ec4899]/30 border border-[#8b5cf6]/40`} />
        </div>
      </div>
    ),
    testimonial: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center p-3 relative`}>
        {/* Testimonial - quote style with quote-mark for animation */}
        <div className="quote-mark absolute left-2 top-1 text-xl text-[#8b5cf6]/30">❝</div>
        <div data-animation-child className="w-full flex items-center gap-2 ml-3">
          <div className={`${size === "small" ? "w-7 h-7" : "w-8 h-8"} rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 shrink-0`} />
          <div className="flex-1 flex flex-col gap-1">
            <div className={`${size === "small" ? "text-xs" : "text-sm"} text-[#8b5cf6]/80 typewriter-text`}>
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
        <div data-animation-child className="flex-1 bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30 flex items-center justify-between px-2">
          <div className="w-2/3 h-1 bg-[#8b5cf6]/30 rounded" />
          <div className="w-3 h-3 rounded bg-[#8b5cf6]/40" />
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
            className={`flex-1 rounded border flex flex-col items-center justify-center gap-1 ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`${size === "small" ? "w-7 h-2.5" : "w-8 h-3"} rounded ${i === 0 ? "bg-[#8b5cf6]/30" : "bg-[#52525b]/30"}`} />
            <div className={`${size === "small" ? "w-10" : "w-12"} h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
          </div>
        ))}
      </div>
    ),
    // === HERO VARIANTS ===
    "hero-split": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5 justify-center p-2 bg-[#1a1a1a]/50 rounded border border-[#333]">
          <div className="w-full h-1 bg-[#8b5cf6]/20 rounded" />
          <div className="w-3/4 h-1 bg-[#8b5cf6]/15 rounded" />
        </div>
        <div data-animation-child className="flex-1 bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30 flex items-center justify-center overflow-hidden">
          <div data-zoom-pan className={`${size === "small" ? "w-10 h-10" : "w-12 h-12"} rounded bg-[#8b5cf6]/20 border border-[#8b5cf6]/40`} />
        </div>
      </div>
    ),
    "hero-video": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        {/* Background/Video element for ken-burns */}
        <div className="absolute inset-0 bg-linear-to-r from-[#8b5cf6]/20 via-[#ec4899]/20 to-[#8b5cf6]/20" />
        {/* Overlay for fade-overlay animation */}
        <div className="overlay absolute inset-0 bg-[#0d0d0d]/70" />
        {/* Text content for text-over-video animation */}
        <div className="hero-text video-text relative z-10 flex items-center gap-2">
          <div className={`${size === "small" ? "w-6 h-6" : "w-8 h-8"} rounded-full bg-[#8b5cf6]/40 border border-[#8b5cf6]/60 flex items-center justify-center`}>
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
            className={`flex-1 rounded border ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          />
        ))}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`w-1 h-1 rounded-full ${i === 0 ? "bg-[#8b5cf6]" : "bg-[#52525b]"}`} />
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
            <div className="flex-1 h-3 bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30" />
          </div>
        ))}
      </div>
    ),
    "text-center": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center p-2`}>
        <div data-animation-child className="flex flex-col gap-1.5 items-center w-full">
          <span className={`${size === "small" ? "text-xs" : "text-sm"} text-[#18a3fa] font-medium typewriter-text`}>Preview Text @text-center</span>
          <div className="w-3/4 h-1 bg-[#8b5cf6]/20 rounded" />
          <div className="w-1/2 h-1 bg-[#8b5cf6]/15 rounded" />
          <div className="w-2/3 h-0.5 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),
    quote: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center p-3 relative`}>
        <div className="absolute left-2 top-2 text-2xl text-[#8b5cf6]/30">❝</div>
        <div data-animation-child className="flex-1 flex flex-col gap-1 ml-4">
          <div className={`${size === "small" ? "text-xs" : "text-sm"} text-[#8b5cf6]/80 typewriter-text`}>
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
            className={`flex-1 rounded border flex flex-col gap-1 p-2 justify-center ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`w-full h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/30" : "bg-[#52525b]/30"}`} />
            <div className={`w-2/3 h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
          </div>
        ))}
      </div>
    ),
    asymmetric: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-2 rounded border bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30 flex flex-col gap-1 p-2 justify-center">
          <div className="w-full h-1 bg-[#8b5cf6]/30 rounded" />
          <div className="w-2/3 h-1 bg-[#8b5cf6]/20 rounded" />
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
            className={`rounded border flex flex-col items-center justify-center gap-1 p-1 ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`w-3 h-3 rounded ${i === 0 ? "bg-[#8b5cf6]/40" : "bg-[#52525b]/30"}`} />
            <div className={`w-full h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
          </div>
        ))}
      </div>
    ),
    "features-list": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${i === 0 ? "bg-[#8b5cf6]/40" : "bg-[#52525b]/30"}`} />
            <div className={`flex-1 h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
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
              className={`flex-1 h-2 rounded ${i === 0
                ? "bg-linear-to-br from-[#8b5cf6]/30 to-[#8b5cf6]/20 border border-[#8b5cf6]/40"
                : "bg-[#1a1a1a]/50 border border-[#333]"
                }`}
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
            <div className={`w-2/3 h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/30" : "bg-[#52525b]/20"}`} />
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
            className={`rounded border flex flex-col items-center justify-center gap-1 p-1 ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`w-3 h-3 rounded ${i === 0 ? "bg-[#8b5cf6]/40" : "bg-[#52525b]/30"}`} />
            <div className={`w-full h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
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
            className={`rounded border ${i % 3 === 0 ? "row-span-2" : ""} ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          />
        ))}
      </div>
    ),
    carousel: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#52525b]/40 border border-[#52525b]/60" />
        <div data-animation-child className="flex-1 h-full bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30 m-1" />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#52525b]/40 border border-[#52525b]/60" />
      </div>
    ),
    video: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-linear-to-r from-[#8b5cf6]/20 via-[#ec4899]/20 to-[#8b5cf6]/20 opacity-50" />
        <div data-animation-child className="relative z-10 flex items-center gap-2">
          <div className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} rounded-full bg-white/20 border border-white/30 flex items-center justify-center`}>
            <div className="w-0 h-0 border-l-4 border-l-white border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5" />
          </div>
          <div className={`${size === "small" ? "w-16" : "w-20"} h-1 bg-white/20 rounded-full`} />
        </div>
      </div>
    ),
    lightbox: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border aspect-square relative ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
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
          <div className={`${size === "small" ? "w-6 h-6" : "w-7 h-7"} rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 shrink-0`} />
          <div className="flex-1 flex flex-col gap-1">
            <div className="w-full h-1 bg-[#8b5cf6]/15 rounded" />
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
            className={`rounded border flex items-center gap-1.5 p-1 ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`w-4 h-4 rounded-full ${i === 0 ? "bg-[#8b5cf6]/40" : "bg-[#52525b]/30"}`} />
            <div className={`flex-1 h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
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
            className={`flex-1 h-full rounded border flex items-center justify-center ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`w-6 h-6 rounded ${i === 0 ? "bg-[#8b5cf6]/40" : "bg-[#52525b]/30"}`} />
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
            className={`shrink-0 w-12 h-full rounded border flex items-center justify-center ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`w-5 h-5 rounded ${i === 0 ? "bg-[#8b5cf6]/40" : "bg-[#52525b]/30"}`} />
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
            className={`rounded border flex flex-col ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className="flex-1 bg-[#1a1a1a]/30 rounded-t" />
            <div className="p-1 flex flex-col gap-0.5">
              <div className={`w-full h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/30" : "bg-[#52525b]/20"}`} />
              <div className={`w-2/3 h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/15"}`} />
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
            className={`flex-1 rounded border flex flex-col items-center justify-center gap-1 ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`${size === "small" ? "w-8 h-3" : "w-10 h-3.5"} rounded ${i === 0 ? "bg-[#8b5cf6]/30" : "bg-[#52525b]/30"}`} />
            <div className={`${size === "small" ? "w-12" : "w-14"} h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
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
                className={`progress-bar bar h-full rounded-full ${i === 0
                  ? "bg-linear-to-r from-[#8b5cf6] to-[#ec4899]"
                  : "bg-[#52525b]"
                  }`}
                style={{ width: `${(i + 1) * 30}%` }}
              />
            </div>
            <div className={`flex-1 h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
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
            className={`flex-1 rounded-t border-t ${i === 2
              ? "bg-linear-to-t from-[#8b5cf6] to-[#8b5cf6]/50 border-[#8b5cf6]/40"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
            style={{ height: `${30 + i * 15}%` }}
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
            className={`flex-1 rounded border flex flex-col gap-1 p-1.5 ${i === 1
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`w-full h-1 rounded ${i === 1 ? "bg-[#8b5cf6]/30" : "bg-[#52525b]/30"}`} />
            <div className={`w-2/3 h-0.5 rounded ${i === 1 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
            <div className={`w-1/2 h-2 rounded ${i === 1 ? "bg-[#8b5cf6]/40" : "bg-[#52525b]/30"}`} />
          </div>
        ))}
      </div>
    ),
    "pricing-toggle": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex items-center justify-center gap-2">
          <div className="w-8 h-2 bg-[#1a1a1a]/50 rounded-full border border-[#333] relative">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-r from-[#8b5cf6]/30 to-[#8b5cf6]/20 rounded-full" />
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
                className={`flex-1 h-2 rounded ${i === 0 && j === 1
                  ? "bg-linear-to-r from-[#8b5cf6]/30 to-[#8b5cf6]/20"
                  : "bg-[#1a1a1a]/50 border border-[#333]"
                  }`}
              />
            ))}
          </div>
        ))}
      </div>
    ),

    // === CTA VARIANTS ===
    "cta-split": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-1 bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30 flex items-center justify-center">
          <div className={`${size === "small" ? "w-8 h-8" : "w-10 h-10"} rounded bg-[#8b5cf6]/20 border border-[#8b5cf6]/40`} />
        </div>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5 justify-center">
          <div className="w-full h-1 bg-[#8b5cf6]/20 rounded" />
          <div className={`${size === "small" ? "w-20 h-4" : "w-24 h-5"} rounded-md bg-linear-to-r from-[#8b5cf6]/30 to-[#ec4899]/30 border border-[#8b5cf6]/40`} />
        </div>
      </div>
    ),
    "cta-banner": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-between p-3 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-linear-to-r from-[#8b5cf6]/10 via-[#ec4899]/10 to-[#8b5cf6]/10 opacity-40" />
        <div data-animation-child className="relative z-10 flex-1 flex flex-col gap-1.5">
          <div className="w-3/4 h-1 bg-white/20 rounded" />
          <div className="w-1/2 h-1 bg-white/15 rounded" />
        </div>
        <div data-animation-child className={`relative z-10 ${size === "small" ? "w-16 h-6" : "w-20 h-7"} rounded-md bg-linear-to-r from-[#8b5cf6]/40 to-[#ec4899]/40 border border-[#8b5cf6]/50`} />
      </div>
    ),
    newsletter: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center gap-2 p-2`}>
        <div data-animation-child className="flex-1 h-6 bg-[#1a1a1a]/50 rounded border border-[#333]" />
        <div data-animation-child className={`${size === "small" ? "w-16 h-6" : "w-20 h-7"} rounded-md bg-linear-to-r from-[#8b5cf6]/30 to-[#ec4899]/30 border border-[#8b5cf6]/40`} />
      </div>
    ),
    download: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-2 p-2`}>
        <div data-animation-child className={`${size === "small" ? "w-6 h-6" : "w-7 h-7"} rounded bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 flex items-center justify-center`}>
          <div className="w-0 h-0 border-t-4 border-t-[#8b5cf6] border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent" />
        </div>
        <div data-animation-child className="flex flex-col gap-1">
          <div className="w-20 h-1 bg-[#8b5cf6]/20 rounded" />
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
        <div data-animation-child className={`${size === "small" ? "w-16 h-5" : "w-20 h-6"} rounded-md bg-linear-to-r from-[#8b5cf6]/30 to-[#ec4899]/30 border border-[#8b5cf6]/40`} />
      </div>
    ),
    "contact-split": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-full h-3 bg-[#1a1a1a]/50 rounded border border-[#333]" />
          ))}
        </div>
        <div data-animation-child className="flex-1 bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30" />
      </div>
    ),
    signup: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} data-animation-child className="w-full h-2.5 bg-[#1a1a1a]/50 rounded border border-[#333]" />
        ))}
        <div data-animation-child className={`${size === "small" ? "w-20 h-5" : "w-24 h-6"} rounded-md bg-linear-to-r from-[#8b5cf6]/30 to-[#ec4899]/30 border border-[#8b5cf6]/40`} />
      </div>
    ),
    lead: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-2 p-2 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-linear-to-r from-[#8b5cf6]/5 via-[#ec4899]/5 to-[#8b5cf6]/5" />
        <div data-animation-child className="relative z-10 flex-1 h-5 bg-[#1a1a1a]/50 rounded border border-[#333]" />
        <div data-animation-child className={`relative z-10 ${size === "small" ? "w-16 h-5" : "w-20 h-6"} rounded-md bg-linear-to-r from-[#8b5cf6]/30 to-[#ec4899]/30 border border-[#8b5cf6]/40`} />
      </div>
    ),

    // === FAQ VARIANTS ===
    "faq-categories": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${i === 0
                ? "bg-linear-to-br from-[#8b5cf6]/30 to-[#8b5cf6]/20 border border-[#8b5cf6]/40"
                : "bg-[#1a1a1a]/50 border border-[#333]"
                }`}
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
            <div className={`${size === "small" ? "w-8 h-8" : "w-10 h-10"} rounded-full ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/30 to-[#8b5cf6]/20 border border-[#8b5cf6]/40"
              : "bg-[#1a1a1a]/50 border border-[#333]"
              }`} />
            <div className={`w-12 h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
          </div>
        ))}
      </div>
    ),
    "team-grid": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1.5 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border flex flex-col items-center gap-1 p-1 ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`w-6 h-6 rounded-full ${i === 0 ? "bg-[#8b5cf6]/40" : "bg-[#52525b]/30"}`} />
            <div className={`w-full h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
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
              <div className={`${size === "small" ? "w-7 h-7" : "w-8 h-8"} rounded-full ${i === 1
                ? "bg-linear-to-br from-[#8b5cf6]/30 to-[#8b5cf6]/20 border border-[#8b5cf6]/40"
                : "bg-[#1a1a1a]/50 border border-[#333]"
                }`} />
              <div className={`w-10 h-0.5 rounded ${i === 1 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
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
            <div className={`w-2 h-2 rounded-full ${i === 0
              ? "bg-[#8b5cf6] border-2 border-[#8b5cf6]/40"
              : "bg-[#52525b] border-2 border-[#52525b]/40"
              }`} />
            <div className={`flex-1 h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
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
              <div className={`w-2 h-2 rounded-full ${i === 1
                ? "bg-[#8b5cf6] border-2 border-[#8b5cf6]/40"
                : "bg-[#52525b] border-2 border-[#52525b]/40"
                }`} />
              <div className={`w-8 h-1 rounded ${i === 1 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
            </div>
          ))}
        </div>
      </div>
    ),
    process: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-2 p-2`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} data-animation-child className="flex items-center gap-1.5 flex-1">
            <div className={`${size === "small" ? "w-4 h-4" : "w-5 h-5"} rounded-full flex items-center justify-center ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/30 to-[#8b5cf6]/20 border border-[#8b5cf6]/40"
              : "bg-[#1a1a1a]/50 border border-[#333]"
              }`}>
              <span className={`text-[8px] ${i === 0 ? "text-[#8b5cf6]" : "text-[#52525b]"}`}>{i + 1}</span>
            </div>
            {i < 3 && <div className="flex-1 h-0.5 bg-[#333]" />}
          </div>
        ))}
      </div>
    ),
    roadmap: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#8b5cf6] border-2 border-[#8b5cf6]/40" />
          <div className="flex-1 h-0.5 bg-[#333]" />
          <div className="w-2 h-2 rounded-full bg-[#52525b] border-2 border-[#52525b]/40" />
          <div className="flex-1 h-0.5 bg-[#333]" />
          <div className="w-2 h-2 rounded-full bg-[#52525b] border-2 border-[#52525b]/40" />
        </div>
        <div data-animation-child className="flex gap-2">
          <div className="flex-1 h-2 bg-[#8b5cf6]/20 rounded border border-[#8b5cf6]/30" />
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
          <div className="w-2 h-2 rounded-full bg-[#8b5cf6] border-2 border-white/20 animate-pulse" />
        </div>
        <div className="absolute top-1 left-1 w-3 h-3 rounded bg-[#52525b]/30 border border-[#52525b]/50" />
        <div className="absolute bottom-1 right-1 w-3 h-3 rounded bg-[#52525b]/30 border border-[#52525b]/50" />
      </div>
    ),
    "map-contact": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-1 bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] rounded border border-[#333] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#8b5cf6] border-2 border-white/20" />
          </div>
        </div>
        <div data-animation-child className="flex-1 flex flex-col gap-1.5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-full h-2 bg-[#1a1a1a]/50 rounded border border-[#333]" />
          ))}
        </div>
      </div>
    ),
    locations: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] opacity-80" />
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className="absolute w-2 h-2 rounded-full bg-[#8b5cf6] border-2 border-white/20"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
          />
        ))}
      </div>
    ),

    // === BLOG & NEWS VARIANTS ===
    "blog-grid": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1.5 p-2`}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            data-animation-child
            className={`rounded border flex flex-col ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className="flex-1 bg-[#1a1a1a]/30 rounded-t" />
            <div className="p-1">
              <div className={`w-full h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
            </div>
          </div>
        ))}
      </div>
    ),
    "blog-list": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} data-animation-child className="flex gap-2">
            <div className={`w-12 h-12 rounded ${i === 0
              ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border border-[#333]"
              }`} />
            <div className="flex-1 flex flex-col gap-1">
              <div className={`w-full h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
              <div className={`w-3/4 h-0.5 rounded ${i === 0 ? "bg-[#8b5cf6]/15" : "bg-[#52525b]/15"}`} />
            </div>
          </div>
        ))}
      </div>
    ),
    "blog-featured": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        <div data-animation-child className="flex-2 bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30" />
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
        <div data-animation-child className="w-6 h-6 rounded bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 flex items-center justify-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
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
              className={`flex-1 h-2 rounded ${i === 0
                ? "bg-linear-to-br from-[#8b5cf6]/30 to-[#8b5cf6]/20 border border-[#8b5cf6]/40"
                : "bg-[#1a1a1a]/50 border border-[#333]"
                }`}
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
            <div className={`w-2/3 h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/30" : "bg-[#52525b]/20"}`} />
            <div className="w-2 h-2 rounded bg-[#52525b]/30" />
          </div>
        ))}
      </div>
    ),
    "filter-gallery": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        <div data-animation-child className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${i === 0
                ? "bg-linear-to-br from-[#8b5cf6]/30 to-[#8b5cf6]/20 border border-[#8b5cf6]/40"
                : "bg-[#1a1a1a]/50 border border-[#333]"
                }`}
            />
          ))}
        </div>
        <div data-animation-child className="grid grid-cols-3 gap-1">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`rounded border aspect-square ${i === 0
                ? "bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
                : "bg-[#1a1a1a]/50 border-[#333]"
                }`}
            />
          ))}
        </div>
      </div>
    ),
    comparison: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 flex">
          <div data-animation-child className="flex-1 bg-linear-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10" />
          <div className="w-0.5 bg-[#333]" />
          <div data-animation-child className="flex-1 bg-[#1a1a1a]/50" />
        </div>
        <div data-animation-child className="relative z-10 w-1 h-8 bg-white/30 rounded-full" />
      </div>
    ),

    // === DIVIDERS VARIANTS ===
    divider: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center`}>
        <div data-animation-child className="w-full h-0.5 bg-[#333] rounded-full" />
      </div>
    ),
    "wave-divider": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <svg data-animation-child className="absolute inset-0 w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path
            d="M0,10 Q25,5 50,10 T100,10 L100,20 L0,20 Z"
            fill="url(#wave-gradient)"
            className="opacity-30"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    spacer: (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center`}>
        <div data-animation-child className="w-full h-0.5 bg-[#1a1a1a] border-t border-b border-[#333] opacity-50" />
      </div>
    ),
    "parallax-divider": (
      <div data-animation-target className={`w-full ${heightClass} rounded-lg bg-linear-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        <div data-animation-child className="absolute inset-0 bg-linear-to-br from-[#8b5cf6]/10 via-[#ec4899]/10 to-[#8b5cf6]/10 opacity-40" />
        <div
          data-animation-child
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5cf6' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
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
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-full">{previewStyles[preview] || previewStyles.custom}</div>
    </div>
  );
}

