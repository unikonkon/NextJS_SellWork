"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import LayoutPreview from "./LayoutPreview";
import { CATEGORY_DESCRIPTIONS } from "../sections/PricingSectionAnimation/landing-page-animations";

interface LayoutOption {
    id: string;
    label: string;
    description: string;
    icon: string;
    preview: string;
    category?: string;
}

interface LayoutModalProps {
    value: string;
    onChange: (value: string) => void;
    options: LayoutOption[];
    className?: string;
    triggerColor?: "purple" | "pink";
    themeColor?: string; // Theme color from STEP 1
}

// Category labels in Thai
const CATEGORY_LABELS: Record<string, string> = {
    hero: "Hero",
    content: "เนื้อหา",
    columns: "คอลัมน์",
    features: "Features",
    media: "สื่อ",
    "social-proof": "Social Proof",
    data: "ข้อมูล",
    pricing: "ราคา",
    cta: "CTA",
    forms: "ฟอร์ม",
    support: "Support",
    team: "ทีม",
    process: "กระบวนการ",
    location: "สถานที่",
    blog: "บล็อก",
    interactive: "Interactive",
    decorative: "ตกแต่ง",
    custom: "กำหนดเอง",
};

export default function LayoutModal({
    value,
    onChange,
    options,
    className = "",
    triggerColor = "purple",
    themeColor,
}: LayoutModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const categoryInitializedRef = useRef(false);

    const selectedOption = options.find((opt) => opt.id === value);

    // Group options by category
    const groupedOptions = useMemo(() => {
        const groups: Record<string, LayoutOption[]> = {};
        options.forEach((option) => {
            const category = option.category || "custom";
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(option);
        });
        return groups;
    }, [options]);

    // Get all categories sorted
    const categories = useMemo(() => {
        return Object.keys(groupedOptions).sort((a, b) => {
            const order = [
                "hero",
                "content",
                "columns",
                "features",
                "media",
                "social-proof",
                "data",
                "pricing",
                "cta",
                "forms",
                "support",
                "team",
                "process",
                "location",
                "blog",
                "interactive",
                "decorative",
                "custom",
            ];
            const indexA = order.indexOf(a);
            const indexB = order.indexOf(b);
            if (indexA === -1 && indexB === -1) return a.localeCompare(b);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });
    }, [groupedOptions]);

    // Set initial category based on selected option when modal opens
    useEffect(() => {
        if (isOpen) {
            // Initialize category only once when modal opens
            if (!categoryInitializedRef.current && selectedOption?.category) {
                setSelectedCategory(selectedOption.category);
                categoryInitializedRef.current = true;
            }
        } else {
            // Reset when modal closes
            setSelectedCategory(null);
            categoryInitializedRef.current = false;
        }
    }, [isOpen, selectedOption]);

    // Get filtered options based on selected category
    const filteredOptions = useMemo(() => {
        if (!selectedCategory) return options;
        return groupedOptions[selectedCategory] || [];
    }, [selectedCategory, groupedOptions, options]);

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

    // Use theme color if provided, otherwise fallback to triggerColor
    const primaryColor = themeColor || (triggerColor === "pink" ? "#ec4899" : "#8b5cf6");
    const hoverBorderColor = themeColor ? `hover:border-[${primaryColor}]/50` : (triggerColor === "pink" ? "hover:border-[#ec4899]/50" : "hover:border-[#8b5cf6]/50");
    const focusBorderColor = themeColor ? `focus:border-[${primaryColor}]` : (triggerColor === "pink" ? "focus:border-[#ec4899]" : "focus:border-[#8b5cf6]");

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
                        <span
                            className="text-sm transition-transform group-hover:scale-110"
                            style={{ color: themeColor || (triggerColor === "pink" ? "#ec4899" : "#8b5cf6") }}
                        >
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
                        <svg
                            className="w-3 h-3 transition-transform group-hover:scale-110"
                            style={{ color: themeColor ? `${themeColor}99` : (triggerColor === "pink" ? "#ec4899" : "#8b5cf6") + "99" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                </div>
                {/* Hover glow effect */}
                <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                        background: themeColor
                            ? `linear-gradient(to right, ${primaryColor}0D, transparent)`
                            : triggerColor === "pink"
                                ? "linear-gradient(to right, rgba(236, 72, 153, 0.05), transparent)"
                                : "linear-gradient(to right, rgba(139, 92, 246, 0.05), transparent)"
                    }}
                />
            </button>

            {/* Modal Overlay - Using Portal to render at body level */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-7xl max-h-[90vh] rounded-2xl bg-[#0d0d0d] border border-[#262626] shadow-2xl overflow-hidden animate-fade-in-up z-100000 flex flex-col"
                        style={{
                            boxShadow: themeColor
                                ? `0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px ${primaryColor}1A, 0 0 40px ${primaryColor}1A`
                                : `0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(139, 92, 246, 0.1), 0 0 40px rgba(139, 92, 246, 0.1)`,
                        }}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#262626] bg-[#141414] shrink-0">
                            <h3 className="text-sm font-medium text-white">เลือก Layout</h3>
                            {/* Description Header - Hidden on mobile, shown on web */}
                            <div className="hidden md:block flex-1 mx-4">
                                {selectedCategory && CATEGORY_DESCRIPTIONS[selectedCategory] ? (
                                    <p className="text-sm font-medium text-white leading-relaxed text-center">
                                        {CATEGORY_DESCRIPTIONS[selectedCategory]}
                                    </p>
                                ) : (
                                    <p className="text-sm font-medium text-white leading-relaxed text-center">
                                        เลือก category เพื่อดูคำอธิบาย
                                    </p>
                                )}
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

                        {/* Category Filter Tabs - Mobile: Horizontal Scroll, Web: Hidden (moved to sidebar) */}
                        <div className="md:hidden border-b border-[#262626] bg-[#141414] shrink-0">
                            {/* Description for Mobile */}
                            {selectedCategory && CATEGORY_DESCRIPTIONS[selectedCategory] && (
                                <div className="px-4 pt-3 pb-2">
                                    <p className="text-xs text-[#a1a1aa] leading-relaxed">
                                        {CATEGORY_DESCRIPTIONS[selectedCategory]}
                                    </p>
                                </div>
                            )}
                            <div className="px-4 pt-2 pb-2">
                                <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                    {/* All Categories Button */}
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`group relative px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${selectedCategory === null
                                            ? "text-white"
                                            : "text-[#adadbb] hover:text-[#a1a1aa] hover:bg-[#1a1a1a]"
                                            }`}
                                        style={
                                            selectedCategory === null
                                                ? {
                                                    backgroundColor: `${primaryColor}1A`,
                                                    color: primaryColor,
                                                    border: `1px solid ${primaryColor}33`,
                                                }
                                                : {}
                                        }
                                        title={selectedCategory === null ? "แสดงทุก Layout" : undefined}
                                    >
                                        ทั้งหมด ({options.length})
                                    </button>
                                    {/* Category Buttons */}
                                    {categories.map((category) => {
                                        const count = groupedOptions[category]?.length || 0;
                                        const isActive = selectedCategory === category;
                                        const description = CATEGORY_DESCRIPTIONS[category] || "";
                                        return (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`group relative px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${isActive
                                                    ? "text-white"
                                                    : "text-[#adadbb] hover:text-[#a1a1aa] hover:bg-[#1a1a1a]"
                                                    }`}
                                                style={
                                                    isActive
                                                        ? {
                                                            backgroundColor: `${primaryColor}1A`,
                                                            color: primaryColor,
                                                            border: `1px solid ${primaryColor}33`,
                                                        }
                                                        : {}
                                                }
                                                title={description}
                                            >
                                                {CATEGORY_LABELS[category] || category} ({count})
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area - Flex layout for web with sidebar */}
                        <div className="flex flex-1 overflow-hidden">
                            {/* Sidebar - Web only, shows all categories in multiple rows */}
                            <div className="hidden md:flex md:flex-col md:w-[190px] md:border-r md:border-[#262626] md:bg-[#141414] md:shrink-0 md:overflow-y-auto custom-scrollbar">
                                <div className="p-4 space-y-2">
                                    <h4 className="text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-3 px-2">
                                        หมวดหมู่
                                    </h4>
                                    {/* All Categories Button */}
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`group relative w-full px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${selectedCategory === null
                                            ? "text-white"
                                            : "text-[#adadbb] hover:text-[#a1a1aa] hover:bg-[#1a1a1a]"
                                            }`}
                                        style={
                                            selectedCategory === null
                                                ? {
                                                    backgroundColor: `${primaryColor}1A`,
                                                    color: primaryColor,
                                                    border: `1px solid ${primaryColor}33`,
                                                }
                                                : {}
                                        }
                                        title={selectedCategory === null ? "แสดงทุก Layout" : undefined}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>ทั้งหมด</span>
                                            <span className="text-[#52525b]">{options.length}</span>
                                        </div>
                                    </button>
                                    {/* Category Buttons - Multiple rows */}
                                    {categories.map((category) => {
                                        const count = groupedOptions[category]?.length || 0;
                                        const isActive = selectedCategory === category;
                                        const description = CATEGORY_DESCRIPTIONS[category] || "";
                                        return (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`group relative w-full px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${isActive
                                                    ? "text-white"
                                                    : "text-[#adadbb] hover:text-[#a1a1aa] hover:bg-[#1a1a1a]"
                                                    }`}
                                                style={
                                                    isActive
                                                        ? {
                                                            backgroundColor: `${primaryColor}1A`,
                                                            color: primaryColor,
                                                            border: `1px solid ${primaryColor}33`,
                                                        }
                                                        : {}
                                                }
                                                title={description}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{CATEGORY_LABELS[category] || category}</span>
                                                    <span className="text-[#52525b]">{count}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Modal Body - Main content area */}
                            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                                {selectedCategory ? (
                                    // Show options for selected category
                                    <div>
                                        <div className="mb-4">
                                            <h4
                                                className="text-sm font-medium mb-1"
                                                style={{ color: primaryColor }}
                                            >
                                                {CATEGORY_LABELS[selectedCategory] || selectedCategory}
                                            </h4>
                                            <p className="text-xs text-[#52525b]">
                                                {filteredOptions.length} รายการ
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                            {filteredOptions.map((option) => {
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
                                                        {/* Selected Indicator */}
                                                        {isSelected && (
                                                            <div
                                                                className="z-10 absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                                                                style={{ backgroundColor: primaryColor }}
                                                            >
                                                                <svg
                                                                    className="w-3 h-3 text-white"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2.5}
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        )}

                                                        {/* Preview */}
                                                        <div className="mb-3">
                                                            <LayoutPreview
                                                                preview={option.preview}
                                                                themeColor={themeColor}
                                                            />
                                                        </div>

                                                        {/* Label & Icon */}
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-base">{option.icon}</span>
                                                            <span
                                                                className={`text-sm font-medium ${isSelected ? "" : "text-white"
                                                                    }`}
                                                                style={isSelected ? { color: primaryColor } : {}}
                                                            >
                                                                {option.label}
                                                            </span>
                                                        </div>

                                                        {/* Description */}
                                                        <p
                                                            className={`text-xs ${isSelected ? "text-[#a1a1aa]" : "text-[#52525b]"
                                                                }`}
                                                        >
                                                            {option.description}
                                                        </p>

                                                        {/* Hover Glow Effect */}
                                                        {!isSelected && (
                                                            <div
                                                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                                                style={{
                                                                    background: themeColor
                                                                        ? `radial-gradient(circle at 50% 50%, ${primaryColor}1A, transparent 70%)`
                                                                        : `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)`,
                                                                }}
                                                            />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    // Show all options grouped by category
                                    <div className="space-y-6">
                                        {categories.map((category) => {
                                            const categoryOptions = groupedOptions[category] || [];
                                            if (categoryOptions.length === 0) return null;

                                            return (
                                                <div key={category} className="space-y-3">
                                                    <div className="flex items-center gap-2 pb-2 border-b border-[#262626]">
                                                        <h4
                                                            className="text-sm font-medium"
                                                            style={{ color: primaryColor }}
                                                        >
                                                            {CATEGORY_LABELS[category] || category}
                                                        </h4>
                                                        <span className="text-xs text-[#52525b]">
                                                            ({categoryOptions.length})
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                                        {categoryOptions.map((option) => {
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
                                                                    {/* Selected Indicator */}
                                                                    {isSelected && (
                                                                        <div
                                                                            className="z-10 absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                                                                            style={{ backgroundColor: primaryColor }}
                                                                        >
                                                                            <svg
                                                                                className="w-3 h-3 text-white"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2.5}
                                                                                    d="M5 13l4 4L19 7"
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                    )}

                                                                    {/* Preview */}
                                                                    <div className="mb-3">
                                                                        <LayoutPreview
                                                                            preview={option.preview}
                                                                            themeColor={themeColor}
                                                                        />
                                                                    </div>

                                                                    {/* Label & Icon */}
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="text-base">{option.icon}</span>
                                                                        <span
                                                                            className={`text-sm font-medium ${isSelected ? "" : "text-white"
                                                                                }`}
                                                                            style={isSelected ? { color: primaryColor } : {}}
                                                                        >
                                                                            {option.label}
                                                                        </span>
                                                                    </div>

                                                                    {/* Description */}
                                                                    <p
                                                                        className={`text-xs ${isSelected ? "text-[#a1a1aa]" : "text-[#52525b]"
                                                                            }`}
                                                                    >
                                                                        {option.description}
                                                                    </p>

                                                                    {/* Hover Glow Effect */}
                                                                    {!isSelected && (
                                                                        <div
                                                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                                                            style={{
                                                                                background: themeColor
                                                                                    ? `radial-gradient(circle at 50% 50%, ${primaryColor}1A, transparent 70%)`
                                                                                    : `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)`,
                                                                            }}
                                                                        />
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

