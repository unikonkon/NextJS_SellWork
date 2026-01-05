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
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        {/* Hero section preview - full width with centered content */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/10 via-[#ec4899]/10 to-[#8b5cf6]/10 opacity-50" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className={`${size === "small" ? "w-20" : "w-24"} h-2 bg-[#8b5cf6]/30 rounded-full`} />
          <div className={`${size === "small" ? "w-14" : "w-16"} h-1.5 bg-[#ec4899]/20 rounded-full`} />
        </div>
      </div>
    ),
    split: (
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        {/* Text + Image - Left text, right image */}
        <div className="flex-1 flex flex-col gap-1.5 justify-center p-2 bg-[#1a1a1a]/50 rounded border border-[#333]">
          <div className="w-full h-1 bg-[#8b5cf6]/20 rounded" />
          <div className="w-3/4 h-1 bg-[#8b5cf6]/15 rounded" />
          <div className="w-1/2 h-1 bg-[#8b5cf6]/10 rounded" />
        </div>
        <div className="flex-1 bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30 flex items-center justify-center">
          <div className={`${size === "small" ? "w-10 h-10" : "w-12 h-12"} rounded bg-[#8b5cf6]/20 border border-[#8b5cf6]/40`} />
        </div>
      </div>
    ),
    "split-reverse": (
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-2 p-2`}>
        {/* Image + Text - Left image, right text */}
        <div className="flex-1 bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30 flex items-center justify-center">
          <div className={`${size === "small" ? "w-10 h-10" : "w-12 h-12"} rounded bg-[#8b5cf6]/20 border border-[#8b5cf6]/40`} />
        </div>
        <div className="flex-1 flex flex-col gap-1.5 justify-center p-2 bg-[#1a1a1a]/50 rounded border border-[#333]">
          <div className="w-full h-1 bg-[#8b5cf6]/20 rounded" />
          <div className="w-3/4 h-1 bg-[#8b5cf6]/15 rounded" />
          <div className="w-1/2 h-1 bg-[#8b5cf6]/10 rounded" />
        </div>
      </div>
    ),
    "cols-3": (
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1.5 p-2`}>
        {/* 3 Columns layout */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded border flex flex-col gap-1 p-1.5 justify-center ${i === 0
              ? "bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
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
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1 p-2`}>
        {/* 4 Columns layout */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded border flex flex-col gap-1 p-1 justify-center ${i === 0
              ? "bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
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
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] grid grid-cols-3 gap-1 p-2`}>
        {/* Gallery grid layout */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`rounded border aspect-square ${i === 0
              ? "bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          />
        ))}
      </div>
    ),
    cta: (
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center relative overflow-hidden`}>
        {/* CTA section - centered with button */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/10 via-[#ec4899]/10 to-[#8b5cf6]/10 opacity-30" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className={`${size === "small" ? "w-28" : "w-32"} h-1.5 bg-[#8b5cf6]/20 rounded-full`} />
          <div className={`${size === "small" ? "w-20 h-5" : "w-24 h-6"} rounded-md bg-gradient-to-r from-[#8b5cf6]/30 to-[#ec4899]/30 border border-[#8b5cf6]/40`} />
        </div>
      </div>
    ),
    testimonial: (
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex items-center justify-center p-3`}>
        {/* Testimonial - quote style */}
        <div className="w-full flex items-center gap-2">
          <div className={`${size === "small" ? "w-7 h-7" : "w-8 h-8"} rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 flex-shrink-0`} />
          <div className="flex-1 flex flex-col gap-1">
            <div className="w-full h-1 bg-[#8b5cf6]/15 rounded" />
            <div className="w-3/4 h-1 bg-[#52525b]/20 rounded" />
            <div className="w-1/2 h-0.5 bg-[#52525b]/15 rounded" />
          </div>
        </div>
      </div>
    ),
    faq: (
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex flex-col gap-1.5 p-2`}>
        {/* FAQ - accordion style */}
        <div className="flex-1 bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 rounded border border-[#8b5cf6]/30 flex items-center justify-between px-2">
          <div className="w-2/3 h-1 bg-[#8b5cf6]/30 rounded" />
          <div className="w-3 h-3 rounded bg-[#8b5cf6]/40" />
        </div>
        <div className="flex-1 bg-[#1a1a1a]/50 rounded border border-[#333] px-2 flex items-center">
          <div className="w-full h-0.5 bg-[#52525b]/20 rounded" />
        </div>
      </div>
    ),
    stats: (
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#262626] flex gap-1.5 p-2`}>
        {/* Stats - numbers display */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded border flex flex-col items-center justify-center gap-1 ${i === 0
              ? "bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/10 border-[#8b5cf6]/30"
              : "bg-[#1a1a1a]/50 border-[#333]"
              }`}
          >
            <div className={`${size === "small" ? "w-7 h-2.5" : "w-8 h-3"} rounded ${i === 0 ? "bg-[#8b5cf6]/30" : "bg-[#52525b]/30"}`} />
            <div className={`${size === "small" ? "w-10" : "w-12"} h-1 rounded ${i === 0 ? "bg-[#8b5cf6]/20" : "bg-[#52525b]/20"}`} />
          </div>
        ))}
      </div>
    ),
    custom: (
      <div className={`w-full ${heightClass} rounded-lg bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#333] flex items-center justify-center`}>
        <div className={`flex flex-col items-center ${size === "small" ? "gap-1.5" : "gap-2"}`}>
          <span className="text-[#52525b] text-xs">✏️</span>
          <span className="text-[#52525b] text-[10px]">{customLabel || "กำหนดเอง"}</span>
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

