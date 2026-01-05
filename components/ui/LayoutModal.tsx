"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import LayoutPreview from "./LayoutPreview";

interface LayoutOption {
    id: string;
    label: string;
    description: string;
    icon: string;
    preview: string;
}

interface LayoutModalProps {
    value: string;
    onChange: (value: string) => void;
    options: LayoutOption[];
    className?: string;
    triggerColor?: "purple" | "pink";
}

export default function LayoutModal({
    value,
    onChange,
    options,
    className = "",
    triggerColor = "purple",
}: LayoutModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const selectedOption = options.find((opt) => opt.id === value);

    // Ensure component is mounted before using portal
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Close modal when clicking outside
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

    // Handle Escape key
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

    const hoverBorderColor = triggerColor === "pink" ? "hover:border-[#ec4899]/50" : "hover:border-[#8b5cf6]/50";
    const focusBorderColor = triggerColor === "pink" ? "focus:border-[#ec4899]" : "focus:border-[#8b5cf6]";

    return (
        <>
            {/* Trigger Button - Enhanced to show it's for changing section layout */}
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`group w-full px-3 py-1.5 rounded-lg bg-[#0d0d0d] border border-[#333] text-xs text-white appearance-none cursor-pointer ${hoverBorderColor} focus:outline-none ${focusBorderColor} transition-all relative ${className} hover:bg-[#1a1a1a]`}
            >
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        {/* Layout icon indicator */}
                        <span className={`text-sm transition-transform group-hover:scale-110 ${triggerColor === "pink" ? "text-[#ec4899]" : "text-[#8b5cf6]"
                            }`}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                            </svg>
                        </span>
                        {selectedOption ? (
                            <>
                                {selectedOption.icon && <span className="text-sm">{selectedOption.icon}</span>}
                                <span className="group-hover:text-white transition-colors">{selectedOption.label}</span>
                            </>
                        ) : (
                            <span className="text-[#52525b] group-hover:text-[#a1a1aa] transition-colors">เลือก Layout</span>
                        )}
                    </span>
                    <div className="flex items-center gap-1">
                        {/* Change indicator */}
                        <span className="text-[10px] text-[#52525b] group-hover:text-[#71717a] transition-colors hidden sm:inline">
                            เปลี่ยน
                        </span>
                        <svg className={`w-3 h-3 transition-transform group-hover:scale-110 ${triggerColor === "pink" ? "text-[#ec4899]/60 group-hover:text-[#ec4899]" : "text-[#8b5cf6]/60 group-hover:text-[#8b5cf6]"
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                </div>
                {/* Hover glow effect */}
                <div
                    className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${triggerColor === "pink"
                        ? "bg-linear-to-r from-[#ec4899]/5 to-transparent"
                        : "bg-linear-to-r from-[#8b5cf6]/5 to-transparent"
                        }`}
                />
            </button>

            {/* Modal Overlay - Using Portal to render at body level */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-[#0d0d0d] border border-[#262626] shadow-2xl overflow-hidden animate-fade-in-up z-[100000]"
                        style={{
                            boxShadow: `0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(139, 92, 246, 0.1), 0 0 40px rgba(139, 92, 246, 0.1)`,
                        }}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#262626] bg-[#141414]">
                            <h3 className="text-sm font-medium text-white">เลือก Layout</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg hover:bg-[#1a1a1a] text-[#52525b] hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {options.map((option) => {
                                    const isSelected = option.id === value;

                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => handleSelect(option.id)}
                                            className={`group relative p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                                ? triggerColor === "pink"
                                                    ? "border-[#ec4899] bg-[#ec4899]/10 shadow-lg shadow-[#ec4899]/20"
                                                    : "border-[#8b5cf6] bg-[#8b5cf6]/10 shadow-lg shadow-[#8b5cf6]/20"
                                                : "border-[#262626] bg-[#1a1a1a] hover:border-[#333] hover:bg-[#1f1f1f]"
                                                }`}
                                        >
                                            {/* Selected Indicator */}
                                            {isSelected && (
                                                <div
                                                    className={`z-10 absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${triggerColor === "pink" ? "bg-[#ec4899]" : "bg-[#8b5cf6]"
                                                        }`}
                                                >
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* Preview */}
                                            <div className="mb-3">
                                                <LayoutPreview preview={option.preview} />
                                            </div>

                                            {/* Label & Icon */}
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-base">{option.icon}</span>
                                                <span
                                                    className={`text-sm font-medium ${isSelected
                                                        ? triggerColor === "pink"
                                                            ? "text-[#ec4899]"
                                                            : "text-[#8b5cf6]"
                                                        : "text-white"
                                                        }`}
                                                >
                                                    {option.label}
                                                </span>
                                            </div>

                                            {/* Description */}
                                            <p className={`text-xs ${isSelected ? "text-[#a1a1aa]" : "text-[#52525b]"}`}>
                                                {option.description}
                                            </p>

                                            {/* Hover Glow Effect */}
                                            {!isSelected && (
                                                <div
                                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                                    style={{
                                                        background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)`,
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

