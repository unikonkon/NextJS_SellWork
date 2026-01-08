"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import BackgroundPreview from "./BackgroundPreviewBasic";
import BackgroundPreviewCustom from "./BackgroundPreviewCustom";

interface BackgroundOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  preview: string;
}

interface BackgroundModalProps {
  value: string;
  onChange: (value: string) => void;
  options: BackgroundOption[];
  className?: string;
  themeColor?: string;
}

// ==================== BACKGROUND TYPES ====================
export const BACKGROUND_TYPES: BackgroundOption[] = [
  { id: "none", label: "ไม่มี Background", description: "ไม่มี background พิเศษ", icon: "⬜", preview: "none" },
  { id: "solid", label: "Solid Color", description: "สีเดียว", icon: "▣", preview: "solid" },
  { id: "gradient", label: "Gradient", description: "ไล่สี", icon: "◐", preview: "gradient" },
  { id: "animated-gradient", label: "Animated Gradient", description: "ไล่สีเคลื่อนไหว", icon: "◑", preview: "animated-gradient" },
  { id: "pattern", label: "Pattern", description: "ลาย", icon: "◈", preview: "pattern" },
  { id: "grid", label: "Grid", description: "ตาราง", icon: "▦", preview: "grid" },
  { id: "dots", label: "Dots", description: "จุด", icon: "◉", preview: "dots" },
  { id: "mesh", label: "Mesh Gradient", description: "Mesh gradient", icon: "◊", preview: "mesh" },
  { id: "particles", label: "Particles", description: "อนุภาค", icon: "◌", preview: "particles" },
  { id: "noise", label: "Noise", description: "Noise texture", icon: "▓", preview: "noise" },
  { id: "lines", label: "Lines", description: "เส้น", icon: "▬", preview: "lines" },
];

// ==================== BACKGROUND CUSTOM TYPES ====================
export const BACKGROUND_CUSTOM_TYPES: BackgroundOption[] = [
  { id: "grid-custom", label: "Grid Custom", description: "Grid + Typing + Floating", icon: "▦", preview: "grid-custom" },
  { id: "typing-lines", label: "Typing Lines", description: "Animated typing code lines", icon: "⌨️", preview: "typing-lines" },
  { id: "floating-snippets", label: "Floating Snippets", description: "Floating code snippets", icon: "💫", preview: "floating-snippets" },
  { id: "grid-typing", label: "Grid + Typing", description: "Grid with typing animation", icon: "▦⌨️", preview: "grid-typing" },
  { id: "grid-floating", label: "Grid + Floating", description: "Grid with floating animation", icon: "▦💫", preview: "grid-floating" },
];

// Combined background types for use in BackgroundModal
export const ALL_BACKGROUND_TYPES: BackgroundOption[] = [...BACKGROUND_TYPES];

export default function BackgroundModal({
  value,
  onChange,
  options,
  className = "",
  themeColor,
}: BackgroundModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"basic" | "custom">("basic");
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Get current options based on view mode
  const currentOptions = viewMode === "basic" ? options : BACKGROUND_CUSTOM_TYPES;

  // Find selected option from both basic and custom options
  const selectedOption = options.find((opt) => opt.id === value) || BACKGROUND_CUSTOM_TYPES.find((opt) => opt.id === value);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Auto-switch view mode based on selected value when modal opens
  useEffect(() => {
    if (isOpen && value) {
      const isCustom = BACKGROUND_CUSTOM_TYPES.some((opt) => opt.id === value);
      if (isCustom) {
        setViewMode("custom");
      } else {
        setViewMode("basic");
      }
    }
  }, [isOpen, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
  };

  const primaryColor = themeColor || "#8b5cf6";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group px-3 py-1.5 rounded-lg bg-[#0d0d0d] border border-[#333] text-xs text-white appearance-none cursor-pointer hover:border-[${primaryColor}]/50 focus:outline-none focus:border-[${primaryColor}] transition-all relative ${className} hover:bg-[#1a1a1a]`}
      >
        <div className="flex items-center justify-between space-x-4">
          <span className="flex items-center gap-2">
            <span
              className="text-sm transition-transform group-hover:scale-110"
              style={{ color: primaryColor }}
            >
              🎨
            </span>
            {selectedOption ? (
              <>
                {selectedOption.icon && <span className="text-sm">{selectedOption.icon}</span>}
                <span className="group-hover:text-white transition-colors">{selectedOption.label}</span>
              </>
            ) : (
              <span className="text-[#52525b] group-hover:text-[#a1a1aa] transition-colors">เลือก Background</span>
            )}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#52525b] group-hover:text-[#71717a] transition-colors hidden sm:inline">
              เปลี่ยน
            </span>
            <svg
              className="w-3 h-3 transition-transform group-hover:scale-110"
              style={{ color: `${primaryColor}99` }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        </div>
        <div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${primaryColor}0D, transparent)`,
          }}
        />
      </button>

      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          <div
            ref={modalRef}
            className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-[#0d0d0d] border border-[#262626] shadow-2xl overflow-hidden animate-fade-in-up z-100000"
            style={{
              boxShadow: `0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px ${primaryColor}1A, 0 0 40px ${primaryColor}1A`,
            }}
          >
            <div className="flex items-center justify-between p-4 border-b border-[#262626] bg-[#141414]">
              <h3 className="text-sm font-medium text-white">เลือก Background</h3>

              <div className="flex items-center gap-2 pr-10">
                <button
                  onClick={() => setViewMode("basic")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "basic"
                      ? "bg-[#1a1a1a] text-white border border-[#333]"
                      : "text-[#52525b] hover:text-[#a1a1aa] hover:bg-[#1a1a1a]"
                    }`}
                  style={
                    viewMode === "basic"
                      ? {
                        borderColor: `${primaryColor}50`,
                        backgroundColor: `${primaryColor}1A`,
                      }
                      : {}
                  }
                >
                  พื้นฐาน
                </button>
                <button
                  onClick={() => setViewMode("custom")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "custom"
                      ? "bg-[#1a1a1a] text-white border border-[#333]"
                      : "text-[#52525b] hover:text-[#a1a1aa] hover:bg-[#1a1a1a]"
                    }`}
                  style={
                    viewMode === "custom"
                      ? {
                        borderColor: `${primaryColor}50`,
                        backgroundColor: `${primaryColor}1A`,
                      }
                      : {}
                  }
                >
                  Custom
                </button>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#1a1a1a] text-[#52525b] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>


            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentOptions.map((option) => {
                  const isSelected = option.id === value;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(option.id)}
                      className={`group relative p-4 rounded-xl border-2 transition-all text-left ${isSelected
                        ? "shadow-lg"
                        : "border-[#262626] bg-[#1a1a1a] hover:border-[#333] hover:bg-[#1f1f1f]"
                        }`}
                      style={
                        isSelected
                          ? {
                            borderColor: primaryColor,
                            backgroundColor: `${primaryColor}1A`,
                            boxShadow: `0 10px 30px -5px ${primaryColor}33`,
                          }
                          : {}
                      }
                    >
                      {isSelected && (
                        <div
                          className="z-10 absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}

                      <div className="mb-3">
                        {viewMode === "basic" ? (
                          <BackgroundPreview preview={option.preview} themeColor={themeColor} />
                        ) : (
                          <BackgroundPreviewCustom preview={option.preview} themeColor={themeColor} />
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{option.icon}</span>
                        <span
                          className={`text-sm font-medium ${isSelected ? "" : "text-white"}`}
                          style={isSelected ? { color: primaryColor } : {}}
                        >
                          {option.label}
                        </span>
                      </div>

                      <p className={`text-xs ${isSelected ? "text-[#a1a1aa]" : "text-[#52525b]"}`}>
                        {option.description}
                      </p>

                      {!isSelected && (
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, ${primaryColor}1A, transparent 70%)`,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

