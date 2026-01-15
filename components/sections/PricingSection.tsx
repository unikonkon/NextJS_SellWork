"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LayoutModal from "@/components/ui/LayoutModal";
import LayoutPreview from "@/components/ui/LayoutPreview";
import BackgroundModal, { BACKGROUND_TYPES, BACKGROUND_CUSTOM_TYPES, ALL_BACKGROUND_TYPES } from "@/components/ui/BackgroundModal";
import BackgroundPreview from "@/components/ui/BackgroundPreviewBasic";
import {
  GridCustomBackground,
  TypingLinesBackground,
  FloatingSnippetsBackground,
  GridTypingBackground,
  GridFloatingBackground,
} from "@/components/ui/BackgroundPreviewCustom";
import {
  NAVBAR_ANIMATION_TYPES,
  FOOTER_ANIMATION_TYPES,
  SECTION_LAYOUTS,
  SECTION_ANIMATIONS,
} from "@/components/sections/PricingSectionAnimation/landing-page-animations";
import executeAnimation, { killAnimations, refreshScrollTrigger } from "@/components/sections/PricingSectionAnimation/gsap-animation-executor";

import LayoutPreviewASCII from "@/components/ui/LayoutPreviewASCII";
import { getPreviewDescription } from "@/components/ui/LayoutPreview";

gsap.registerPlugin(ScrollTrigger);



// ==================== ราคาเริ่มต้น ====================
// Base Pricing
const BASE_PRICE = 1000; // ราคาเริ่มต้น
const SECTION_PRICE = 100; // ราคาต่อ section ที่เพิ่ม (นับจาก section ที่ 4 เป็นต้นไป)
const INITIAL_SECTIONS = 3; // จำนวน section เริ่มต้น (ฟรี)
const SECTION_ANIMATION_PRICE = 100; // ราคาต่อ animation ที่เพิ่ม

// Theme Options Pricing
const DARK_LIGHT_THEME_PRICE = 500;
const BILINGUAL_PRICE = 500;

// Navbar & Footer Options
const NAVBAR_OPTIONS = [
  { id: "basic" as const, label: "พื้นฐาน", price: 0 },
  { id: "animated" as const, label: "+ Animation", price: 400 },
];

const FOOTER_OPTIONS = [
  { id: "basic" as const, label: "พื้นฐาน", price: 0 },
  { id: "animated" as const, label: "+ Animation", price: 300 },
];

// Color Theme Options
const COLOR_THEMES = [
  { id: "white", label: "White", color: "#ffffff", colorLight: "#ffffff" },
  { id: "black", label: "Black", color: "#000000", colorLight: "#000000" },
  { id: "red", label: "Red", color: "#ef4444", colorLight: "#f87171" },
  { id: "orange", label: "Orange", color: "#f97316", colorLight: "#fb923c" },
  { id: "amber", label: "Amber", color: "#f59e42", colorLight: "#fbbf24" },
  { id: "yellow", label: "Yellow", color: "#eab308", colorLight: "#facc15" },
  { id: "lime", label: "Lime", color: "#84cc16", colorLight: "#bef264" },
  { id: "green", label: "Green", color: "#10b981", colorLight: "#34d399" },
  { id: "emerald", label: "Emerald", color: "#059669", colorLight: "#34d399" },
  { id: "teal", label: "Teal", color: "#14b8a6", colorLight: "#2dd4bf" },
  { id: "cyan", label: "Cyan", color: "#06b6d4", colorLight: "#22d3ee" },
  { id: "sky", label: "Sky", color: "#0ea5e9", colorLight: "#38bdf8" },
  { id: "blue", label: "Blue", color: "#3b82f6", colorLight: "#60a5fa" },
  { id: "indigo", label: "Indigo", color: "#6366f1", colorLight: "#818cf8" },
  { id: "violet", label: "Violet", color: "#7c3aed", colorLight: "#a78bfa" },
  { id: "purple", label: "Purple", color: "#8b5cf6", colorLight: "#a78bfa" },
  { id: "fuchsia", label: "Fuchsia", color: "#d946ef", colorLight: "#f0abfc" },
  { id: "pink", label: "Pink", color: "#ec4899", colorLight: "#f472b6" },
  { id: "rose", label: "Rose", color: "#f43f5e", colorLight: "#fb7185" },
  { id: "slate", label: "Slate", color: "#64748b", colorLight: "#a3aed0" },
  { id: "gray", label: "Gray", color: "#6b7280", colorLight: "#d1d5db" },
  { id: "zinc", label: "Zinc", color: "#71717a", colorLight: "#a1a1aa" },
  { id: "neutral", label: "Neutral", color: "#737373", colorLight: "#a3a3a3" },
  { id: "stone", label: "Stone", color: "#78716c", colorLight: "#a8a29e" },
];

// Addon Services (without bilingual and dark/light - moved to Step 1)
const ADDON_SERVICES = [
  { id: "seo", label: "SEO Setup", price: 400, icon: "📊" },
  { id: "mobile-responsive", label: "Mobile Responsive", price: 1000, icon: "📱" },
];

// Mobile Responsive Dynamic Pricing
// Base: 1000
// +200 if navbar is animated
// +300 if footer is animated
// +100 per section animation (main sections + page sections)
const MOBILE_RESPONSIVE_BASE_PRICE = 500;
const MOBILE_RESPONSIVE_NAVBAR_ANIMATED_PRICE = 50;
const MOBILE_RESPONSIVE_FOOTER_ANIMATED_PRICE = 50;
const MOBILE_RESPONSIVE_SECTION_ANIMATION_PRICE = 50;

// Function to calculate Mobile Responsive price dynamically
function calculateMobileResponsivePrice(params: {
  navbar: "basic" | "animated";
  footer: "basic" | "animated";
  mainSections: Array<{ animation: string | null; customAnimation: string | null }>;
  pages: Array<{ sections: Array<{ animation: string | null; customAnimation: string | null }> }>;
}): number {
  let mobilePrice = MOBILE_RESPONSIVE_BASE_PRICE;

  // +200 if navbar is animated
  if (params.navbar === "animated") {
    mobilePrice += MOBILE_RESPONSIVE_NAVBAR_ANIMATED_PRICE;
  }

  // +300 if footer is animated
  if (params.footer === "animated") {
    mobilePrice += MOBILE_RESPONSIVE_FOOTER_ANIMATED_PRICE;
  }

  // +100 per section animation (main sections + page sections)
  const mainSectionAnims = params.mainSections.filter((s) => s.animation || s.customAnimation).length;
  const pageSectionAnims = params.pages.reduce(
    (sum, page) => sum + page.sections.filter((s) => s.animation || s.customAnimation).length,
    0
  );
  const totalSectionAnims = mainSectionAnims + pageSectionAnims;
  mobilePrice += totalSectionAnims * MOBILE_RESPONSIVE_SECTION_ANIMATION_PRICE;

  return mobilePrice;
}


// ==================== TYPES ====================
interface SectionItem {
  id: string;
  layout: string;
  customLayout: string | null; // สำหรับ layout แบบกำหนดเอง
  animation: string | null;
  customAnimation: string | null; // สำหรับ animation แบบกำหนดเอง
}

interface PageItem {
  id: string;
  name: string;
  animation: "none" | "basic" | "complex";
  sections: SectionItem[];
}

interface CustomAnimItem {
  id: string;
  label: string;
  isCustom: boolean;
}

interface CalculatorState {
  step1: {
    // Theme Settings (moved from step3)
    themeColor: string;
    customColor: string;
    darkThemeColor: string; // สำหรับ Dark Theme เมื่อเปิด darkLightMode
    lightThemeColor: string; // สำหรับ Light Theme เมื่อเปิด darkLightMode
    darkLightMode: boolean;
    bilingual: boolean;
    fontFamily: string;
    // Background Settings
    background: string; // Background type
    backgroundCustomColor: string; // Custom background color
  };
  step2: {
    // Navbar & Footer (moved from step1)
    navbar: "basic" | "animated";
    footer: "basic" | "animated";
    selectedNavbarAnim: string | null;
    selectedFooterAnim: string | null;
    navbarCustomAnims: CustomAnimItem[];
    footerCustomAnims: CustomAnimItem[];
    customNavbarInput: string;
    customFooterInput: string;
    // Sections
    mainSections: SectionItem[];
    pages: PageItem[];
  };
  step3: {
    seo: boolean;
    cms: boolean;
    extendedSupport: boolean;
  };
  step4: {
    customItems: string[];
  };
}


// ==================== ANIMATION TYPES DATA ====================
// Imported from: @/components/sections/PricingSectionAnimation/landing-page-animations

// Custom animation option ที่จะใช้กับทุก layout
const CUSTOM_ANIMATION_OPTION = { id: "custom", label: "กำหนดเอง", icon: "✏️", description: "ระบุ animation ที่ต้องการ" };


// ==================== HELPER FUNCTIONS ====================
function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

function formatPrice(price: number) {
  return `฿${price.toLocaleString()}`;
}

function getEstimatedDays(total: number): string {
  if (total <= 3500) return "3-5 วัน";
  if (total <= 8000) return "5-10 วัน";
  if (total <= 15000) return "10-15 วัน";
  if (total <= 25000) return "15-20 วัน";
  return "20-30 วัน";
}

// Function to invert hex color (RGB inverse)
function invertHexColor(hex: string): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Invert RGB
  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;

  // Convert back to hex
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(invertedR)}${toHex(invertedG)}${toHex(invertedB)}`;
}

// Function to find closest theme color
function findClosestThemeColor(color: string): string {
  // Remove # if present
  const hex = color.replace("#", "");

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Find closest theme by calculating Euclidean distance
  let minDistance = Infinity;
  let closestTheme = COLOR_THEMES[0];

  COLOR_THEMES.forEach((theme) => {
    const themeHex = theme.color.replace("#", "");
    const themeR = parseInt(themeHex.substring(0, 2), 16);
    const themeG = parseInt(themeHex.substring(2, 4), 16);
    const themeB = parseInt(themeHex.substring(4, 6), 16);

    const distance = Math.sqrt(
      Math.pow(r - themeR, 2) + Math.pow(g - themeG, 2) + Math.pow(b - themeB, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestTheme = theme;
    }
  });

  return closestTheme.id;
}


// ==================== MAIN COMPONENT ====================
export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const previewNavbarRef = useRef<HTMLDivElement>(null);
  const previewFooterRef = useRef<HTMLDivElement>(null);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [navbarAnimating, setNavbarAnimating] = useState(false);
  const [footerAnimating, setFooterAnimating] = useState(false);
  const [showPlayButtons, setShowPlayButtons] = useState(true);

  // Calculator State
  // Helper to create initial sections
  const createInitialSections = (): SectionItem[] => {
    return Array.from({ length: INITIAL_SECTIONS }, (_, i) => ({
      id: generateId(),
      layout: i === 0 ? "hero" : i === 1 ? "text-image" : "three-cols",
      customLayout: null,
      animation: null,
      customAnimation: null,
    }));
  };

  const [state, setState] = useState<CalculatorState>({
    step1: {
      themeColor: "purple",
      customColor: "#8b5cf6",
      darkThemeColor: "#8b5cf6", // เริ่มต้นด้วยสีเดียวกับ themeColor
      lightThemeColor: "#a78bfa", // เริ่มต้นด้วยสี light ของ purple
      darkLightMode: false,
      bilingual: false,
      fontFamily: "",
      background: "none", // Background type
      backgroundCustomColor: "#8b5cf6", // Custom background color
    },
    step2: {
      navbar: "basic",
      footer: "basic",
      selectedNavbarAnim: null,
      selectedFooterAnim: null,
      navbarCustomAnims: [],
      footerCustomAnims: [],
      customNavbarInput: "",
      customFooterInput: "",
      mainSections: createInitialSections(),
      pages: [],
    },
    step3: { seo: false, cms: false, extendedSupport: false },
    step4: { customItems: [] },
  });

  const [newCustomItem, setNewCustomItem] = useState("");

  // ==================== PRICE CALCULATION ====================
  const priceBreakdown = useMemo(() => {
    const items: { label: string; price: number; category: string }[] = [];

    // Base Price
    items.push({ label: "ราคาเริ่มต้น", price: BASE_PRICE, category: "base" });

    // Theme Options (from Step 1)
    if (state.step1.darkLightMode) {
      items.push({ label: "Theme (Dark/Light)", price: DARK_LIGHT_THEME_PRICE, category: "theme" });
    }
    if (state.step1.bilingual) {
      items.push({ label: "รองรับ 2 ภาษา (TH/EN)", price: BILINGUAL_PRICE, category: "theme" });
    }

    // Extra main sections (over INITIAL_SECTIONS)
    const extraMainSections = Math.max(0, state.step2.mainSections.length - INITIAL_SECTIONS);
    if (extraMainSections > 0) {
      items.push({
        label: `Section เพิ่ม ×${extraMainSections}`,
        price: extraMainSections * SECTION_PRICE,
        category: "sections",
      });
    }

    // Navbar (moved to step2)
    const navbar = NAVBAR_OPTIONS.find((n) => n.id === state.step2.navbar)!;
    if (navbar.price > 0) {
      items.push({ label: `Navbar ${navbar.label}`, price: navbar.price, category: "navbar" });
    }

    // Footer (moved to step2)
    const footer = FOOTER_OPTIONS.find((f) => f.id === state.step2.footer)!;
    if (footer.price > 0) {
      items.push({ label: `Footer ${footer.label}`, price: footer.price, category: "footer" });
    }

    // Main section animations (including custom animations)
    const mainSectionAnims = state.step2.mainSections.filter((s) => s.animation || s.customAnimation).length;
    if (mainSectionAnims > 0) {
      items.push({
        label: `Animation หน้าหลัก ×${mainSectionAnims}`,
        price: mainSectionAnims * SECTION_ANIMATION_PRICE,
        category: "animations",
      });
    }

    // STEP 2: Added Pages with sections (including custom animations)
    state.step2.pages.forEach((page) => {
      const sectionCount = page.sections.length;
      const pageAnimations = page.sections.filter((s) => s.animation || s.customAnimation).length;
      const sectionPrice = sectionCount * SECTION_PRICE;
      const animPrice = pageAnimations * SECTION_ANIMATION_PRICE;
      items.push({
        label: `${page.name} (${sectionCount} sec${pageAnimations > 0 ? ` + ${pageAnimations} anim` : ""})`,
        price: sectionPrice + animPrice,
        category: "pages",
      });
    });


    // STEP 3: Addons
    ADDON_SERVICES.forEach((service) => {
      if (state.step3[service.id as keyof typeof state.step3]) {
        // Special calculation for mobile-responsive
        if (service.id === "mobile-responsive") {
          const mobilePrice = calculateMobileResponsivePrice({
            navbar: state.step2.navbar,
            footer: state.step2.footer,
            mainSections: state.step2.mainSections,
            pages: state.step2.pages,
          });

          items.push({
            label: service.label,
            price: mobilePrice,
            category: "addons"
          });
        } else {
          items.push({ label: service.label, price: service.price, category: "addons" });
        }
      }
    });

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return { items, total };
  }, [state]);

  // Calculate Mobile Responsive price dynamically
  const mobileResponsivePrice = useMemo(() => {
    return calculateMobileResponsivePrice({
      navbar: state.step2.navbar,
      footer: state.step2.footer,
      mainSections: state.step2.mainSections,
      pages: state.step2.pages,
    });
  }, [state]);

  // ==================== HANDLERS ====================
  // Step 1: Theme settings
  const updateStep1 = useCallback((key: keyof CalculatorState["step1"], value: string | boolean | null) => {
    setState((prev) => ({ ...prev, step1: { ...prev.step1, [key]: value } }));
  }, []);

  // Step 2: Navbar/Footer settings
  const updateStep2NavFooter = useCallback((key: keyof Pick<CalculatorState["step2"], "navbar" | "footer" | "customNavbarInput" | "customFooterInput">, value: string) => {
    setState((prev) => ({ ...prev, step2: { ...prev.step2, [key]: value } }));
  }, []);

  // Select single navbar animation (moved to step2)
  const selectNavbarAnimation = useCallback((animId: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        selectedNavbarAnim: prev.step2.selectedNavbarAnim === animId ? null : animId,
      },
    }));
  }, []);

  // Select single footer animation (moved to step2)
  const selectFooterAnimation = useCallback((animId: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        selectedFooterAnim: prev.step2.selectedFooterAnim === animId ? null : animId,
      },
    }));
  }, []);

  // Add custom navbar animation (moved to step2)
  const addCustomNavbarAnim = useCallback(() => {
    if (state.step2.customNavbarInput.trim()) {
      setState((prev) => ({
        ...prev,
        step2: {
          ...prev.step2,
          navbarCustomAnims: [
            ...prev.step2.navbarCustomAnims,
            { id: generateId(), label: prev.step2.customNavbarInput.trim(), isCustom: true },
          ],
          customNavbarInput: "",
        },
      }));
    }
  }, [state.step2.customNavbarInput]);

  // Add custom footer animation (moved to step2)
  const addCustomFooterAnim = useCallback(() => {
    if (state.step2.customFooterInput.trim()) {
      setState((prev) => ({
        ...prev,
        step2: {
          ...prev.step2,
          footerCustomAnims: [
            ...prev.step2.footerCustomAnims,
            { id: generateId(), label: prev.step2.customFooterInput.trim(), isCustom: true },
          ],
          customFooterInput: "",
        },
      }));
    }
  }, [state.step2.customFooterInput]);

  // Remove custom navbar animation (moved to step2)
  const removeNavbarCustomAnim = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        navbarCustomAnims: prev.step2.navbarCustomAnims.filter((a) => a.id !== id),
      },
    }));
  }, []);

  // Remove custom footer animation (moved to step2)
  const removeFooterCustomAnim = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        footerCustomAnims: prev.step2.footerCustomAnims.filter((a) => a.id !== id),
      },
    }));
  }, []);

  // Add main section
  const addMainSection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        mainSections: [
          ...prev.step2.mainSections,
          { id: generateId(), layout: "text-image", customLayout: null, animation: null, customAnimation: null },
        ],
      },
    }));
  }, []);

  // Remove main section
  const removeMainSection = useCallback((sectionId: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        mainSections: prev.step2.mainSections.filter((s) => s.id !== sectionId),
      },
    }));
  }, []);

  // Update main section layout
  const updateMainSectionLayout = useCallback((sectionId: string, layout: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        mainSections: prev.step2.mainSections.map((section) =>
          section.id === sectionId ? { ...section, layout, customLayout: layout === "custom" ? section.customLayout : null, animation: null, customAnimation: null } : section
        ),
      },
    }));
  }, []);

  // Update main section custom layout
  const updateMainSectionCustomLayout = useCallback((sectionId: string, customLayout: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        mainSections: prev.step2.mainSections.map((section) =>
          section.id === sectionId ? { ...section, customLayout } : section
        ),
      },
    }));
  }, []);

  // Update main section custom animation
  const updateMainSectionCustomAnimation = useCallback((sectionId: string, customAnimation: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        mainSections: prev.step2.mainSections.map((section) =>
          section.id === sectionId ? { ...section, customAnimation } : section
        ),
      },
    }));
  }, []);

  // Update main section animation
  const updateMainSectionAnimation = useCallback((sectionId: string, animation: string | null) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        mainSections: prev.step2.mainSections.map((section) =>
          section.id === sectionId ? { ...section, animation } : section
        ),
      },
    }));
  }, []);

  // Update page section animation
  const updatePageSectionAnimation = useCallback((pageId: string, sectionId: string, animation: string | null) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        pages: prev.step2.pages.map((page) =>
          page.id === pageId
            ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId ? { ...section, animation } : section
              ),
            }
            : page
        ),
      },
    }));
  }, []);

  // เพิ่มหลังจาก state declarations
  const previewRefsMap = useRef<Map<string, HTMLDivElement | null>>(new Map());

  // Helper function to set ref
  const setPreviewRef = useCallback((key: string, element: HTMLDivElement | null) => {
    if (element) {
      previewRefsMap.current.set(key, element);
    } else {
      previewRefsMap.current.delete(key);
    }
  }, []);

  // Helper function to get ref
  const getPreviewRef = useCallback((key: string): HTMLDivElement | null => {
    return previewRefsMap.current.get(key) || null;
  }, []);

  // GSAP Animation Preview for sections
  const playSectionAnimation = useCallback((refKey: string, animationType: string) => {
    const containerElement = getPreviewRef(refKey); // ✅ ใช้ ref แทน document.getElementById(elementId)
    console.log("refKey", refKey);
    console.log("containerElement", containerElement);
    console.log("animationType", animationType);
    if (!containerElement) return;

    // Find the actual animation target element inside LayoutPreview
    // Look for element with data-animation-target attribute
    const animationTarget = containerElement.querySelector('[data-animation-target]') as HTMLElement | null;
    const element = animationTarget || containerElement;

    console.log("animationTarget found:", animationTarget);

    // Reset any existing animations
    killAnimations(element);
    gsap.set(element, { clearProps: "all" });

    // Get children for stagger animations
    // For stagger animations, look for children with data-animation-child attribute
    // or fallback to direct children of the animation target
    const animationChildren = element.querySelectorAll('[data-animation-child]');
    const children = animationChildren.length > 0
      ? Array.from(animationChildren) as HTMLElement[]
      : Array.from(element.children) as HTMLElement[];

    // Also reset children animations
    children.forEach(child => {
      killAnimations(child);
      gsap.set(child, { clearProps: "all" });
    });

    // Execute animation using executeAnimation function
    // Disable scrollTrigger for preview mode (we want immediate animation)
    executeAnimation({
      element,
      animationType,
      children,
      scrollTrigger: false, // Disable scroll trigger for preview
    });
  }, [getPreviewRef]);

  // Clear all animations for a section
  const clearAnimation = useCallback((refKey: string) => {
    const containerElement = getPreviewRef(refKey);
    if (!containerElement) return;

    const animationTarget = containerElement.querySelector('[data-animation-target]') as HTMLElement | null;
    const element = animationTarget || containerElement;

    // Kill and reset main element
    killAnimations(element);
    gsap.set(element, { clearProps: "all" });

    // Kill and reset children
    const animationChildren = element.querySelectorAll('[data-animation-child]');
    const children = animationChildren.length > 0
      ? Array.from(animationChildren) as HTMLElement[]
      : Array.from(element.children) as HTMLElement[];

    children.forEach(child => {
      killAnimations(child);
      gsap.set(child, { clearProps: "all" });
    });
  }, [getPreviewRef]);

  // Add new page with 1 section
  const addPage = useCallback(() => {
    setState((prev) => {
      const pageNum = prev.step2.pages.length + 1;
      return {
        ...prev,
        step2: {
          ...prev.step2,
          pages: [
            ...prev.step2.pages,
            {
              id: generateId(),
              name: `หน้า ${pageNum}`,
              animation: "none",
              sections: [{ id: generateId(), layout: "hero", customLayout: null, animation: null, customAnimation: null }],
            },
          ],
        },
      };
    });
  }, []);

  const removePage = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      step2: { ...prev.step2, pages: prev.step2.pages.filter((p) => p.id !== id) },
    }));
  }, []);


  const updateSectionLayout = useCallback((pageId: string, sectionId: string, layout: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        pages: prev.step2.pages.map((page) =>
          page.id === pageId
            ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId ? { ...section, layout, customLayout: layout === "custom" ? section.customLayout : null, animation: null, customAnimation: null } : section
              ),
            }
            : page
        ),
      },
    }));
  }, []);

  // Update page section custom layout
  const updatePageSectionCustomLayout = useCallback((pageId: string, sectionId: string, customLayout: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        pages: prev.step2.pages.map((page) =>
          page.id === pageId
            ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId ? { ...section, customLayout } : section
              ),
            }
            : page
        ),
      },
    }));
  }, []);

  // Update page section custom animation
  const updatePageSectionCustomAnimation = useCallback((pageId: string, sectionId: string, customAnimation: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        pages: prev.step2.pages.map((page) =>
          page.id === pageId
            ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId ? { ...section, customAnimation } : section
              ),
            }
            : page
        ),
      },
    }));
  }, []);

  const addSectionToPage = useCallback((pageId: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        pages: prev.step2.pages.map((page) =>
          page.id === pageId
            ? {
              ...page,
              sections: [...page.sections, { id: generateId(), layout: "text-image", customLayout: null, animation: null, customAnimation: null }],
            }
            : page
        ),
      },
    }));
  }, []);

  const removeSectionFromPage = useCallback((pageId: string, sectionId: string) => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        pages: prev.step2.pages.map((page) =>
          page.id === pageId
            ? {
              ...page,
              sections: page.sections.filter((s) => s.id !== sectionId),
            }
            : page
        ),
      },
    }));
  }, []);


  const toggleAddon = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      step3: { ...prev.step3, [id]: !prev.step3[id as keyof typeof prev.step3] },
    }));
  }, []);

  const addCustomItem = useCallback(() => {
    if (newCustomItem.trim()) {
      setState((prev) => ({
        ...prev,
        step4: { ...prev.step4, customItems: [...prev.step4.customItems, newCustomItem.trim()] },
      }));
      setNewCustomItem("");
    }
  }, [newCustomItem]);

  const removeCustomItem = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      step4: { ...prev.step4, customItems: prev.step4.customItems.filter((_, i) => i !== index) },
    }));
  }, []);

  // ==================== AUTO-GENERATED REQUIREMENTS ====================
  const autoRequirements = useMemo(() => {
    const reqs: string[] = [
      "Logo (PNG/SVG format)",
      "ข้อความ/เนื้อหาทุกหน้า",
      "รูปภาพสำหรับเว็บ (Hero, Banner)",
      "ข้อมูลติดต่อ (เบอร์โทร, อีเมล)",
      "Social Media Links",
    ];

    state.step2.pages.forEach((page) => {
      reqs.push(`เนื้อหาสำหรับ ${page.name} (${page.sections.length} sections ที่กำหนดเอง)`);
    });

    if (state.step3.seo) {
      reqs.push("Keywords หลักสำหรับ SEO");
      reqs.push("Meta Description ที่ต้องการ");
    }

    if (state.step1.bilingual) {
      reqs.push("เนื้อหาภาษาอังกฤษทั้งหมด");
    }

    if (state.step1.fontFamily) {
      reqs.push(`Font: ${state.step1.fontFamily} (จาก Google Fonts)`);
    }

    if (state.step1.background !== "none" && BACKGROUND_CUSTOM_TYPES.find((b) => b.id === state.step1.background)?.id) {
      if (BACKGROUND_CUSTOM_TYPES.find((b) => b.id === "grid-custom"
        || b.id === "typing-lines"
        || b.id === "floating-snippets"
        || b.id === "grid-typing"
        || b.id === "grid-floating"
      )?.label) {
        reqs.push(`Background Custom: ข้อมูลกำหนดเอง ที่เป็นตัวอักษร`);
      }
    }

    return reqs;
  }, [state]);

  // Generate Quote
  const generateQuote = useCallback(() => {
    const currentThemeColor = state.step1.darkLightMode
      ? state.step1.darkThemeColor
      : state.step1.themeColor === "custom"
        ? state.step1.customColor
        : COLOR_THEMES.find((t) => t.id === state.step1.themeColor)?.color || "#8b5cf6";

    const lines = [
      "══════════════════════════════════",
      "   ANIMATION WEBSITE QUOTE",
      "══════════════════════════════════",
      "",
      "📋 สรุปราคา",
      "──────────────────────────────────",
      "",
      ...priceBreakdown.items.map((item) => `${item.label.padEnd(40)} ${formatPrice(item.price)}`),
      "",
      "──────────────────────────────────",
      `${"รวมทั้งหมด".padEnd(40)} ${formatPrice(priceBreakdown.total)}`,
      `${"ระยะเวลาโดยประมาณ".padEnd(40)} ${getEstimatedDays(priceBreakdown.total)}`,
      "",
      "══════════════════════════════════",
      "",
      "🎨 ธีม & การตั้งค่า",
      "──────────────────────────────────",
      "",
      `ธีมสี: ${COLOR_THEMES.find((t) => t.id === state.step1.themeColor)?.label || "Custom Color"}${state.step1.themeColor === "custom" ? ` (${state.step1.customColor})` : ""}`,
      ...(state.step1.darkLightMode
        ? [
          `Theme: Dark/Light Mode`,
          `   Dark Theme: ${state.step1.darkThemeColor}`,
          `   Light Theme: ${state.step1.lightThemeColor}`,
          `   (+${formatPrice(DARK_LIGHT_THEME_PRICE)})`,
        ]
        : []),
      ...(state.step1.bilingual
        ? [`รองรับ 2 ภาษา (TH/EN): +${formatPrice(BILINGUAL_PRICE)}`]
        : []),
      ...(state.step1.fontFamily ? [`Font: ${state.step1.fontFamily}`] : []),
      ...(state.step1.background !== "none"
        ? [
          `Background: ${ALL_BACKGROUND_TYPES.find((b) => b.id === state.step1.background)?.icon || "▣"} ${ALL_BACKGROUND_TYPES.find((b) => b.id === state.step1.background)?.label || "Custom"} ${BACKGROUND_CUSTOM_TYPES.find((b) => b.id === state.step1.background)?.label || ""}`,
          ...(state.step1.backgroundCustomColor
            ? [`   สี Background: ${state.step1.backgroundCustomColor}`]
            : []),
        ]
        : []),
      "",
      "══════════════════════════════════",
      "",
      "🎬 Animation ที่เลือก (Navbar & Footer)",
      "──────────────────────────────────",
      "",
      ...(state.step2.navbar === "animated" && state.step2.selectedNavbarAnim
        ? [
          `Navbar: ${NAVBAR_ANIMATION_TYPES.find((a) => a.id === state.step2.selectedNavbarAnim)?.icon || ""} ${NAVBAR_ANIMATION_TYPES.find((a) => a.id === state.step2.selectedNavbarAnim)?.label || ""}`,
        ]
        : []),
      ...state.step2.navbarCustomAnims.map((anim) => `Navbar: ✦ ${anim.label}`),
      ...(state.step2.footer === "animated" && state.step2.selectedFooterAnim
        ? [
          `Footer: ${FOOTER_ANIMATION_TYPES.find((a) => a.id === state.step2.selectedFooterAnim)?.icon || ""} ${FOOTER_ANIMATION_TYPES.find((a) => a.id === state.step2.selectedFooterAnim)?.label || ""}`,
        ]
        : []),
      ...state.step2.footerCustomAnims.map((anim) => `Footer: ✦ ${anim.label}`),
      ...(state.step2.navbar !== "animated" && state.step2.footer !== "animated"
        ? ["ไม่มี Animation สำหรับ Navbar และ Footer"]
        : []),
      "",
      "══════════════════════════════════",
      "",
      "📋 สรุป Sections",
      "──────────────────────────────────",
      "",
      `🏠 หน้าหลัก (${state.step2.mainSections.length} sections)`,
      ...state.step2.mainSections.map((section, idx) => {
        const layoutInfo = SECTION_LAYOUTS.find((l) => l.id === section.layout);
        const animInfo = section.animation && section.animation !== "custom"
          ? SECTION_ANIMATIONS[section.layout]?.find((a) => a.id === section.animation)
          : null;
        const layoutText = section.layout === "custom"
          ? `✏️ ${section.customLayout || "กำหนดเอง"}`
          : `${layoutInfo?.icon || ""} ${layoutInfo?.label || section.layout}`;
        const animText = section.animation === "custom"
          ? `✏️ ${section.customAnimation || "กำหนดเอง"}`
          : animInfo
            ? `${animInfo.icon || ""} ${animInfo.label}`
            : "";
        return `   ${idx + 1}. ${layoutText}${animText ? ` | ${animText}` : ""}`;
      }),
      ...state.step2.pages.flatMap((page) => [
        "",
        `📄 ${page.name} (${page.sections.length} sections)`,
        ...page.sections.map((section, idx) => {
          const layoutInfo = SECTION_LAYOUTS.find((l) => l.id === section.layout);
          const animInfo = section.animation && section.animation !== "custom"
            ? SECTION_ANIMATIONS[section.layout]?.find((a) => a.id === section.animation)
            : null;
          const layoutText = section.layout === "custom"
            ? `✏️ ${section.customLayout || "กำหนดเอง"}`
            : `${layoutInfo?.icon || ""} ${layoutInfo?.label || section.layout}`;
          const animText = section.animation === "custom"
            ? `✏️ ${section.customAnimation || "กำหนดเอง"}`
            : animInfo
              ? `${animInfo.icon || ""} ${animInfo.label}`
              : "";
          return `   ${idx + 1}. ${layoutText}${animText ? ` | ${animText}` : ""}`;
        }),
      ]),
      "",
      `หน้าทั้งหมด: 1 หน้าหลัก + ${state.step2.pages.length} หน้าเพิ่ม`,
      `Sections ทั้งหมด: ${state.step2.mainSections.length + state.step2.pages.reduce((sum, p) => sum + p.sections.length, 0)} sections`,
      ...(state.step3.seo || state.step1.bilingual || state.step3.cms
        ? [
          "",
          "บริการเสริม:",
          ...(state.step3.seo ? ["   📊 SEO Setup"] : []),
          ...(state.step1.bilingual ? ["   🌐 รองรับ 2 ภาษา (TH/EN)"] : []),
          ...(state.step3.cms ? ["   ⚙️ CMS"] : []),
        ]
        : []),
      "",
      "══════════════════════════════════",
      "",
      "👁️ Layout Preview Details",
      "──────────────────────────────────",
      "",
      "📐 หน้าหลัก - Layout Preview Structure",
      ...state.step2.mainSections.map((section, idx) => {
        const layoutInfo = SECTION_LAYOUTS.find((l) => l.id === section.layout);
        const previewType = layoutInfo?.preview || (section.layout === "custom" ? "custom" : "full");

        const layoutText = section.layout === "custom"
          ? `✏️ ${section.customLayout || "กำหนดเอง"}`
          : `${layoutInfo?.icon || ""} ${layoutInfo?.label || section.layout}`;

        const previewASCII = LayoutPreviewASCII(previewType, section.customLayout);
        const previewDesc = getPreviewDescription(previewType, section.customLayout);

        return [
          "",
          `   Section ${idx + 1}: ${layoutText}`,
          ...previewASCII.map(line => `   ${line}`),
          `   Type: ${previewDesc}`,
          ...(layoutInfo?.description ? [`   Description: ${layoutInfo.description}`] : []),
        ];
      }).flat(),
      ...(state.step2.pages.length > 0
        ? [
          "",
          "📐 หน้าที่เพิ่ม - Layout Preview Structure",
          ...state.step2.pages.flatMap((page) => [
            "",
            `   📄 ${page.name} (${page.sections.length} sections)`,
            ...page.sections.map((section, idx) => {
              const layoutInfo = SECTION_LAYOUTS.find((l) => l.id === section.layout);
              const previewType = layoutInfo?.preview || (section.layout === "custom" ? "custom" : "full");

              const layoutText = section.layout === "custom"
                ? `✏️ ${section.customLayout || "กำหนดเอง"}`
                : `${layoutInfo?.icon || ""} ${layoutInfo?.label || section.layout}`;

              const previewASCII = LayoutPreviewASCII(previewType, section.customLayout);
              const previewDesc = getPreviewDescription(previewType, section.customLayout);

              return [
                "",
                `      Section ${idx + 1}: ${layoutText}`,
                ...previewASCII.map(line => `      ${line}`),
                `      Type: ${previewDesc}`,
                ...(layoutInfo?.description ? [`      Description: ${layoutInfo.description}`] : []),
              ];
            }).flat(),
          ]),
        ]
        : []),
      "",
      "══════════════════════════════════",
      "",
      "📝 สิ่งที่ต้องเตรียมก่อนสั่งงาน",
      "──────────────────────────────────",
      "",
      ...autoRequirements.map((req, idx) => `   ${idx + 1}. ${req}`),
      ...(state.step4.customItems.length > 0
        ? [
          "",
          "รายการอื่นๆ:",
          ...state.step4.customItems.map((item, idx) => `   • ${item}`),
        ]
        : []),
      "",
      "══════════════════════════════════",
      "",
      "⚠️ หมายเหตุ: ราคาอาจปรับตามความซับซ้อนของงานจริง หลังจากรับ brief รายละเอียดแล้ว จะประเมินอีกครั้ง",
      "",
      "══════════════════════════════════",
    ];
    return lines.join("\n");
  }, [priceBreakdown, state, autoRequirements]);

  const copyQuote = useCallback(async () => {
    await navigator.clipboard.writeText(generateQuote());
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  }, [generateQuote]);

  const downloadQuote = useCallback(() => {
    const quoteText = generateQuote();
    const blob = new Blob([quoteText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const timestamp = new Date().toISOString().slice(0, 10);
    link.download = `quote-${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [generateQuote]);

  // ==================== PREVIEW ANIMATION TRIGGERS ====================
  const playNavbarAnimation = useCallback(() => {
    setNavbarAnimating(true);
    setTimeout(() => setNavbarAnimating(false), 2000);
  }, []);

  const playFooterAnimation = useCallback(() => {
    setFooterAnimating(true);
    setTimeout(() => setFooterAnimating(false), 2000);
  }, []);

  const playAllAnimations = useCallback(() => {
    // Play Navbar animation
    setNavbarAnimating(true);
    setTimeout(() => setNavbarAnimating(false), 2000);

    // Play Footer animation
    setFooterAnimating(true);
    setTimeout(() => setFooterAnimating(false), 2000);

    // Play Main Sections animations
    state.step2.mainSections.forEach((section) => {
      if (section.animation) {
        const refKey = `preview-main-${section.id}`;
        playSectionAnimation(refKey, section.animation);
      }
    });

    // Play Added Pages Sections animations
    state.step2.pages.forEach((page) => {
      page.sections.forEach((section) => {
        if (section.animation) {
          const refKey = `preview-page-${page.id}-${section.id}`;
          playSectionAnimation(refKey, section.animation);
        }
      });
    });
  }, [state.step2.mainSections, state.step2.pages, playSectionAnimation]);

  // ==================== GSAP ANIMATIONS ====================
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate steps on scroll
      gsap.utils.toArray<HTMLElement>(".calc-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ==================== SELECTED ANIMATIONS LIST ====================
  const selectedAnimations = useMemo(() => {
    const anims: string[] = [];

    if (state.step2.navbar === "animated") {
      if (state.step2.selectedNavbarAnim) {
        const navAnim = NAVBAR_ANIMATION_TYPES.find((a) => a.id === state.step2.selectedNavbarAnim);
        if (navAnim) {
          anims.push(`Navbar: ${navAnim.label}`);
        }
      }
      state.step2.navbarCustomAnims.forEach((a) => {
        anims.push(`Navbar: ${a.label}`);
      });
      if (!state.step2.selectedNavbarAnim && state.step2.navbarCustomAnims.length === 0) {
        anims.push("Navbar Animation");
      }
    }
    if (state.step2.footer === "animated") {
      if (state.step2.selectedFooterAnim) {
        const footAnim = FOOTER_ANIMATION_TYPES.find((a) => a.id === state.step2.selectedFooterAnim);
        if (footAnim) {
          anims.push(`Footer: ${footAnim.label}`);
        }
      }
      state.step2.footerCustomAnims.forEach((a) => {
        anims.push(`Footer: ${a.label}`);
      });
      if (!state.step2.selectedFooterAnim && state.step2.footerCustomAnims.length === 0) {
        anims.push("Footer Animation");
      }
    }

    // Main section animations
    state.step2.mainSections.forEach((section) => {
      if (section.animation) {
        const animInfo = SECTION_ANIMATIONS[section.layout]?.find((a) => a.id === section.animation);
        if (animInfo) {
          anims.push(`${SECTION_LAYOUTS.find((l) => l.id === section.layout)?.label}: ${animInfo.label}`);
        }
      }
    });

    // Page section animations
    state.step2.pages.forEach((page) => {
      page.sections.forEach((section) => {
        if (section.animation) {
          const animInfo = SECTION_ANIMATIONS[section.layout]?.find((a) => a.id === section.animation);
          if (animInfo) {
            anims.push(`${page.name} - ${animInfo.label}`);
          }
        }
      });
    });

    return anims;
  }, [state]);

  // ==================== PREVIEW ANIMATION CLASSES ====================
  const getNavbarPreviewClasses = useMemo(() => {
    if (state.step2.navbar !== "animated" || !navbarAnimating) return "";

    const animId = state.step2.selectedNavbarAnim;
    if (animId === "sticky-fade") return "animate-navbar-fade";
    if (animId === "slide-down") return "animate-navbar-slide";
    if (animId === "color-change") return "animate-navbar-color";
    if (animId === "shrink") return "animate-navbar-shrink";
    if (animId === "blur-glass") return "animate-navbar-glass";
    if (animId === "menu-reveal") return "animate-navbar-menu";

    return "animate-navbar-fade";
  }, [state.step2.navbar, state.step2.selectedNavbarAnim, navbarAnimating]);

  const getFooterPreviewClasses = useMemo(() => {
    if (state.step2.footer !== "animated" || !footerAnimating) return "";

    const animId = state.step2.selectedFooterAnim;
    if (animId === "fade-in") return "animate-footer-fade";
    if (animId === "slide-up") return "animate-footer-slide";
    if (animId === "parallax") return "animate-footer-parallax";
    if (animId === "hover-links") return "animate-footer-hover";
    if (animId === "wave-bg") return "animate-footer-wave";
    if (animId === "stagger-cols") return "animate-footer-stagger";

    return "animate-footer-fade";
  }, [state.step2.footer, state.step2.selectedFooterAnim, footerAnimating]);

  // Get theme color for preview
  const getThemeColor = useMemo(() => {
    // ถ้าเปิด darkLightMode ให้ใช้ darkThemeColor
    if (state.step1.darkLightMode) {
      return state.step1.darkThemeColor;
    }
    // ถ้าไม่เปิด darkLightMode ให้ใช้ themeColor ตามปกติ
    if (state.step1.themeColor === "custom") {
      return state.step1.customColor;
    }
    const theme = COLOR_THEMES.find((t) => t.id === state.step1.themeColor);
    return theme?.color || "#8b5cf6";
  }, [state.step1.themeColor, state.step1.customColor, state.step1.darkLightMode, state.step1.darkThemeColor]);

  const getThemeColorLight = useMemo(() => {
    // ถ้าเปิด darkLightMode ให้ใช้ lightThemeColor
    if (state.step1.darkLightMode) {
      return state.step1.lightThemeColor;
    }
    // ถ้าไม่เปิด darkLightMode ให้ใช้ colorLight ตามปกติ
    if (state.step1.themeColor === "custom") {
      // Lighten the custom color slightly
      return state.step1.customColor + "aa";
    }
    const theme = COLOR_THEMES.find((t) => t.id === state.step1.themeColor);
    return theme?.colorLight || "#a78bfa";
  }, [state.step1.themeColor, state.step1.customColor, state.step1.darkLightMode, state.step1.lightThemeColor]);

  // Helper function to generate random particles
  const generateParticles = useCallback((count: number = 120) => {
    return Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2, // 2px to 5px
      opacity: Math.random() * 0.4 + 0.4, // 0.4 to 0.8
      delay: Math.random() * 2, // Animation delay
    }));
  }, []);

  // Particles Background Component
  const ParticlesBackground = useCallback(({ themeColor, customColor }: { themeColor: string; customColor?: string }) => {
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

    const bgColor = customColor || themeColor;
    const particles = useMemo(() => generateParticles(80), [generateParticles]);

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: withOpacity(bgColor, particle.opacity),
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
    );
  }, [generateParticles]);

  // Helper function to get background styles
  const getBackgroundStyles = useCallback((bgType: string, themeColor: string, themeColorLight: string, customColor?: string) => {
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

    // Use custom color if provided, otherwise use theme color
    const bgColor = customColor || themeColor;
    const bgColorLight = customColor || themeColorLight;

    const styles: Record<string, React.CSSProperties> = {
      none: { backgroundColor: "#0a0a0a" },
      solid: { backgroundColor: withOpacity(bgColor, 0.1) },
      gradient: {
        background: `linear-gradient(135deg, ${withOpacity(bgColor, 0.3)}, ${withOpacity(bgColorLight, 0.2)})`,
      },
      "animated-gradient": {
        background: `linear-gradient(135deg, ${withOpacity(bgColor, 0.3)}, ${withOpacity(bgColorLight, 0.2)})`,
      },
      pattern: {
        backgroundColor: withOpacity(bgColor, 0.05),
        backgroundImage: `repeating-linear-gradient(45deg, ${withOpacity(bgColor, 0.1)}, ${withOpacity(bgColor, 0.1)} 10px, transparent 10px, transparent 20px)`,
      },
      grid: {
        backgroundColor: "#0a0a0a",
        backgroundImage: `linear-gradient(${withOpacity(bgColor, 0.1)} 1px, transparent 1px), linear-gradient(90deg, ${withOpacity(bgColor, 0.1)} 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      },
      dots: {
        backgroundColor: "#0a0a0a",
        backgroundImage: `radial-gradient(circle, ${withOpacity(bgColor, 0.3)} 1px, transparent 1px)`,
        backgroundSize: "15px 15px",
      },
      mesh: {
        background: `radial-gradient(circle at 20% 30%, ${withOpacity(bgColor, 0.2)}, transparent 50%),
                     radial-gradient(circle at 80% 70%, ${withOpacity(bgColorLight, 0.15)}, transparent 50%),
                     radial-gradient(circle at 50% 50%, ${withOpacity(bgColor, 0.1)}, transparent 50%)`,
      },
      particles: {
        backgroundColor: "#0a0a0a",
      },
      noise: {
        backgroundColor: "#0a0a0a",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: 0.6,
      },
      lines: {
        backgroundColor: "#0a0a0a",
        backgroundImage: `repeating-linear-gradient(0deg, ${withOpacity(bgColor, 0.2)}, ${withOpacity(bgColor, 0.2)} 1px, transparent 1px, transparent 20px)`,
      },
      // Custom background types - these will be rendered as components
      "grid-custom": { backgroundColor: "#0a0a0a" },
      "typing-lines": { backgroundColor: "#0a0a0a" },
      "floating-snippets": { backgroundColor: "#0a0a0a" },
      "grid-typing": { backgroundColor: "#0a0a0a" },
      "grid-floating": { backgroundColor: "#0a0a0a" },
    };

    return styles[bgType] || styles.none;
  }, []);

  // Helper function to render custom background components
  const renderCustomBackground = useCallback((bgType: string, themeColor: string, customColor?: string) => {
    const bgColor = customColor || themeColor;
    // Use isLivePreview=true for live preview in Main Page and Added Pages
    switch (bgType) {
      case "grid-custom":
        return <GridCustomBackground themeColor={themeColor} customColor={bgColor} isLivePreview={true} />;
      case "typing-lines":
        return <TypingLinesBackground themeColor={themeColor} customColor={bgColor} isLivePreview={true} />;
      case "floating-snippets":
        return <FloatingSnippetsBackground themeColor={themeColor} customColor={bgColor} isLivePreview={true} />;
      case "grid-typing":
        return <GridTypingBackground themeColor={themeColor} customColor={bgColor} isLivePreview={true} />;
      case "grid-floating":
        return <GridFloatingBackground themeColor={themeColor} customColor={bgColor} isLivePreview={true} />;
      default:
        return null;
    }
  }, []);

  // ==================== RENDER ====================
  return (
    <section ref={sectionRef} id="pricing" className="relative min-h-screen py-16 md:py-24">
      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes navbarFade {
          0% { opacity: 0; transform: translateY(-10px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes navbarSlide {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(0); }
        }
        @keyframes navbarColor {
          0% { background: #1a1a1a; }
          50% { background: #06b6d4; }
          100% { background: #1a1a1a; }
        }
        @keyframes navbarShrink {
          0% { transform: scaleY(1); }
          50% { transform: scaleY(0.8); }
          100% { transform: scaleY(1); }
        }
        @keyframes navbarGlass {
          0% { backdrop-filter: blur(0); background: rgba(26,26,26,1); }
          50% { backdrop-filter: blur(10px); background: rgba(26,26,26,0.7); }
          100% { backdrop-filter: blur(0); background: rgba(26,26,26,1); }
        }
        @keyframes navbarMenu {
          0% { opacity: 0; }
          25% { opacity: 0.33; }
          50% { opacity: 0.66; }
          75% { opacity: 1; }
          100% { opacity: 1; }
        }
        @keyframes footerFade {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 1; }
        }
        @keyframes footerSlide {
          0% { transform: translateY(20px); opacity: 0; }
          50% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes footerParallax {
          0% { transform: translateY(10px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        @keyframes footerWave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes footerStagger {
          0% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-navbar-fade { animation: navbarFade 2s ease-out; }
        .animate-navbar-slide { animation: navbarSlide 2s ease-out; }
        .animate-navbar-color { animation: navbarColor 2s ease-in-out; }
        .animate-navbar-shrink { animation: navbarShrink 2s ease-in-out; transform-origin: top; }
        .animate-navbar-glass { animation: navbarGlass 2s ease-in-out; }
        .animate-navbar-menu { animation: navbarMenu 2s ease-out; }
        .animate-footer-fade { animation: footerFade 2s ease-out; }
        .animate-footer-slide { animation: footerSlide 2s ease-out; }
        .animate-footer-parallax { animation: footerParallax 2s ease-in-out; }
        .animate-footer-wave {
          background: linear-gradient(90deg, #1a1a1a, #10b981, #1a1a1a);
          background-size: 200% 100%;
          animation: footerWave 2s ease-in-out;
        }
        .animate-footer-stagger { animation: footerStagger 2s ease-out; }
      `}</style>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ec4899]/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <div className="relative px-6 mb-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="h-px w-12 bg-linear-to-r from-transparent to-[#8b5cf6]" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8b5cf6]">PRICE CALCULATOR</span>
          <span className="h-px w-12 bg-linear-to-l from-transparent to-[#8b5cf6]" />
        </div>
        <h2 className="text-section mb-4">
          <span className="text-white">สร้างเว็บไซต์ </span>
          <span className="gradient-text-purple italic">Animation </span>
          <span className="text-white">ในแบบของคุณ</span>
        </h2>
        <p className="font-mono text-sm text-[#52525b]">
          {"// "} คำนวณราคาแบบ Real-time ตามความต้องการ
        </p>
      </div>

      {/* Main Calculator Layout */}
      <div className="relative px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* ==================== LEFT PANEL - OPTIONS ==================== */}
            <div ref={leftPanelRef} className="flex-1 lg:max-w-[55%] space-y-6">
              {/* STEP 1: Base Price & Theme Settings */}
              <div className="calc-step">
                <StepHeader step={1} title="ราคาเริ่มต้น & ธีม" />
                <div className="space-y-4 p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                  {/* Base Price Card */}
                  <div className="p-4 rounded-xl border-2 bg-linear-to-b to-transparent" style={{ borderColor: getThemeColor, background: `linear-gradient(to bottom, ${getThemeColor}15, transparent)` }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#52525b] mb-1">ราคาเริ่มต้น</div>
                        <div className="text-2xl font-bold text-white">{formatPrice(BASE_PRICE)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#52525b] mb-1">รวม {INITIAL_SECTIONS} Sections ฟรี</div>
                        <div className="text-xs" style={{ color: getThemeColor }}>+{formatPrice(SECTION_PRICE)}/section เพิ่ม</div>
                      </div>
                    </div>
                  </div>

                  {/* Theme Color Selection */}
                  <div className="pt-4 border-t border-[#262626]">
                    <label className="block font-mono text-[13px] text-[#cfcfe2] mb-3">
                      <span style={{ color: getThemeColor }}>{">"}</span> เลือกธีมสี
                    </label>
                    <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 mb-3">
                      {COLOR_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => {
                            updateStep1("themeColor", theme.id);
                            // ถ้าเปิด darkLightMode ให้อัปเดต darkThemeColor ด้วย
                            if (state.step1.darkLightMode) {
                              const invertedColor = invertHexColor(theme.color);
                              updateStep1("darkThemeColor", theme.color);
                              updateStep1("lightThemeColor", invertedColor);
                            }
                          }}
                          className={`group relative w-8 h-8 rounded-lg transition-all ${state.step1.themeColor === theme.id
                            ? "ring-2 ring-white ring-offset-2 ring-offset-[#141414] scale-110"
                            : "hover:scale-105"
                            }`}
                          style={{ backgroundColor: theme.color }}
                          title={theme.label}
                        >
                          {state.step1.themeColor === theme.id && (
                            <svg className="absolute inset-0 m-auto w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Custom Color Input หรือ Dark/Light Color Display */}
                    {state.step1.darkLightMode ? (
                      /* Dark/Light Color Display - แสดงเมื่อเปิด darkLightMode */
                      <div className="space-y-3 p-4 rounded-xl bg-[#0d0d0d] border border-[#262626]">
                        {/* Dark/Light Color Display */}
                        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
                          {/* Dark Color */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <div className="relative group">
                                <div
                                  className="w-12 h-12 rounded-lg border-2 border-[#262626] shrink-0 cursor-pointer hover:border-[#8b5cf6]/50 transition-all"
                                  style={{
                                    backgroundColor: state.step1.darkThemeColor
                                  }}
                                />
                                <input
                                  type="color"
                                  value={state.step1.darkThemeColor}
                                  onChange={(e) => {
                                    updateStep1("darkThemeColor", e.target.value);
                                  }}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  title="เลือกสี Dark Theme"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <label className="block text-xs text-[#a1a1aa]">  Dark Theme: </label>
                                <div className="text-sm text-white font-medium truncate">
                                  {(() => {
                                    const closestTheme = COLOR_THEMES.find((t) => t.id === findClosestThemeColor(state.step1.darkThemeColor));
                                    return closestTheme?.label || "Custom Color";
                                  })()}
                                </div>
                                <div className="text-[10px] text-[#52525b] font-mono truncate">
                                  {state.step1.darkThemeColor}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Light Color */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <div className="relative group">
                                <div
                                  className="w-12 h-12 rounded-lg border-2 border-[#262626] shrink-0 cursor-pointer hover:border-[#8b5cf6]/50 transition-all"
                                  style={{ backgroundColor: state.step1.lightThemeColor }}
                                />
                                <input
                                  type="color"
                                  value={state.step1.lightThemeColor}
                                  onChange={(e) => {
                                    updateStep1("lightThemeColor", e.target.value);
                                  }}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  title="เลือกสี Light Theme"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <label className="block text-xs text-[#a1a1aa]">  Light Theme: </label>
                                <div className="text-sm text-white font-medium truncate">
                                  {(() => {
                                    const closestTheme = COLOR_THEMES.find((t) => t.id === findClosestThemeColor(state.step1.lightThemeColor));
                                    return closestTheme?.label || "Custom Color";
                                  })()}
                                </div>
                                <div className="text-[10px] text-[#52525b] font-mono truncate">
                                  {state.step1.lightThemeColor}
                                </div>
                              </div>
                            </div>
                          </div>


                          {/* Swap Color Theme Button */}
                          <button
                            onClick={() => {
                              // สลับสีระหว่าง Dark Theme และ Light Theme
                              const tempDark = state.step1.darkThemeColor;
                              updateStep1("darkThemeColor", state.step1.lightThemeColor);
                              updateStep1("lightThemeColor", tempDark);
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-[#262626] hover:border-[#f97316]/50 bg-[#1a1a1a] transition-all group"
                          >
                            <span className="text-sm">🎨</span>
                            <span className="text-xs text-[#a1a1aa] group-hover:text-white transition-colors">สลับสี Theme ทั้งหมด</span>
                          </button>
                        </div>

                      </div>
                    ) : (
                      /* Custom Color Input - แสดงเมื่อไม่เปิด darkLightMode */
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#262626]">
                        <span className="text-[11px] text-[#cfcfe2]">หรือเลือกสีเอง:</span>
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="color"
                            value={state.step1.customColor}
                            onChange={(e) => {
                              updateStep1("customColor", e.target.value);
                              updateStep1("themeColor", "custom");
                            }}
                            className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent"
                          />
                          <input
                            type="text"
                            value={state.step1.customColor}
                            onChange={(e) => {
                              updateStep1("customColor", e.target.value);
                              updateStep1("themeColor", "custom");
                            }}
                            placeholder="#8b5cf6"
                            className="flex-1 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#262626] text-xs text-[#a1a1aa] placeholder:text-[#333] focus:outline-none focus:border-[#8b5cf6]/50 font-mono"
                          />
                          <span className="text-[11px] text-[#cfcfe2]">ธีมสี : {state.step1.themeColor}</span  >
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dark/Light Mode & Bilingual Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#262626]">
                    {/* Dark/Light Theme Toggle */}
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          const newDarkLightMode = !state.step1.darkLightMode;
                          // ถ้าเปิด darkLightMode เป็นครั้งแรก ให้ตั้งค่าเริ่มต้นของสี
                          if (newDarkLightMode && !state.step1.darkLightMode) {
                            const currentColor = state.step1.themeColor === "custom"
                              ? state.step1.customColor
                              : COLOR_THEMES.find((t) => t.id === state.step1.themeColor)?.color || "#8b5cf6";
                            const invertedColor = invertHexColor(currentColor);
                            setState((prev) => ({
                              ...prev,
                              step1: {
                                ...prev.step1,
                                darkLightMode: newDarkLightMode,
                                darkThemeColor: currentColor,
                                lightThemeColor: invertedColor,
                              },
                            }));
                          } else {
                            updateStep1("darkLightMode", newDarkLightMode);
                          }
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all w-full ${state.step1.darkLightMode
                          ? "bg-[#f97316]/10 border-[#f97316]/50"
                          : "bg-[#0d0d0d] border-[#1f1f1f] hover:border-[#262626]"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">🌙/🌞</span>
                          <div>
                            <span className="text-sm text-[#a1a1aa] block">Theme (Dark/Light)</span>
                            <span className="text-[10px] text-[#52525b]">รองรับ 2 โหมดสี</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#f97316]">+{formatPrice(DARK_LIGHT_THEME_PRICE)}</span>
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${state.step1.darkLightMode ? "bg-[#f97316] border-[#f97316]" : "border-[#333]"
                              }`}
                          >
                            {state.step1.darkLightMode && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Bilingual Toggle */}
                    <button
                      onClick={() => updateStep1("bilingual", !state.step1.bilingual)}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all ${state.step1.bilingual
                        ? "bg-[#06b6d4]/10 border-[#06b6d4]/50"
                        : "bg-[#0d0d0d] border-[#1f1f1f] hover:border-[#262626]"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🌐</span>
                        <div>
                          <span className="text-sm text-[#a1a1aa] block">รองรับ 2 ภาษา (TH/EN)</span>
                          <span className="text-[10px] text-[#52525b]">สลับภาษาได้</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#06b6d4]">+{formatPrice(BILINGUAL_PRICE)}</span>
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${state.step1.bilingual ? "bg-[#06b6d4] border-[#06b6d4]" : "border-[#333]"
                            }`}
                        >
                          {state.step1.bilingual && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Font Selection */}
                  <div className="pt-4 border-t border-[#262626]">
                    <label className="block font-mono text-[13px] text-[#cfcfe2] mb-2">
                      <span style={{ color: getThemeColor }}>{">"}</span> Font ที่ต้องการใช้ (ถ้าไม่ระบุจะใช้ฟอนต์ค่าเริ่มต้น)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={state.step1.fontFamily}
                        onChange={(e) => updateStep1("fontFamily", e.target.value)}
                        placeholder="เช่น: Noto Sans Thai, Prompt, Sarabun..."
                        className="flex-1 px-4 py-2.5 rounded-lg bg-[#0d0d0d] border border-[#262626] text-sm text-[#a1a1aa] placeholder:text-[#333] focus:outline-none transition-colors"
                        style={{ borderColor: state.step1.fontFamily ? getThemeColor + "50" : undefined }}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-[#52525b]">ดู Font ที่รองรับได้ที่:</span>
                      <a
                        href="https://fonts.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] hover:underline transition-colors"
                        style={{ color: getThemeColor }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Google Fonts
                      </a>
                    </div>
                  </div>

                  {/* Background Selection */}
                  <div className="pt-4 border-t border-[#262626]">
                    <label className="block font-mono text-[13px] text-[#cfcfe2] mb-3">
                      <span style={{ color: getThemeColor }}>{">"}</span> เลือก Background
                    </label>
                    <div className="mb-3 flex flex-col md:flex-row gap-3 w-full">
                      <BackgroundModal
                        value={state.step1.background}
                        onChange={(value) => updateStep1("background", value)}
                        options={ALL_BACKGROUND_TYPES}
                        themeColor={getThemeColor}
                      />
                      {/* Custom Background Color Input */}
                      {state.step1.background !== "none" && (
                        <div className="">
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#262626]">
                            <div className="relative group">
                              <div
                                className="w-9 h-9 rounded-lg border-2 border-[#262626] shrink-0 cursor-pointer hover:border-[#8b5cf6]/50 transition-all"
                                style={{ backgroundColor: state.step1.backgroundCustomColor }}
                              />
                              <input
                                type="color"
                                value={state.step1.backgroundCustomColor}
                                onChange={(e) => updateStep1("backgroundCustomColor", e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                title="เลือกสี Background"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="block font-mono text-[11px] text-[#cfcfe2] mb-2">
                                <span style={{ color: getThemeColor }}>{">"}</span> เลือกสี (ถ้าต้องการ)
                              </label>
                              <input
                                type="text"
                                value={state.step1.backgroundCustomColor}
                                onChange={(e) => updateStep1("backgroundCustomColor", e.target.value)}
                                placeholder="#8b5cf6"
                                className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#262626] text-xs text-[#a1a1aa] placeholder:text-[#333] focus:outline-none focus:border-[#8b5cf6]/50 font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>


                  </div>

                </div>
              </div>

              {/* STEP 2: Navbar, Footer, Pages & Sections */}
              <div className="calc-step">
                <StepHeader step={2} title="Navbar, Footer & Sections" />
                <div className="space-y-4 p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                  {/* Navbar & Footer Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Navbar */}
                    <div className="space-y-3">
                      <label className="block font-mono text-[13px] text-[#cfcfe2]">
                        <span className="text-[#06b6d4]">{">"}</span> Navbar
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {NAVBAR_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => updateStep2NavFooter("navbar", opt.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${state.step2.navbar === opt.id
                              ? "bg-[#06b6d4] text-white"
                              : "bg-[#1a1a1a] text-[#a1a1aa] border border-[#262626] hover:border-[#06b6d4]/50"
                              }`}
                          >
                            {opt.label}
                            {opt.price > 0 && <span className="ml-1 opacity-70">+{formatPrice(opt.price)}</span>}
                          </button>
                        ))}
                      </div>

                      {/* Navbar Animation Types */}
                      {state.step2.navbar === "animated" && (
                        <div className="space-y-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#06b6d4]/20">
                          <p className="text-xs text-[#06b6d4] font-medium">เลือก Animation 1 อย่าง:</p>
                          <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                            {NAVBAR_ANIMATION_TYPES.map((anim) => (
                              <button
                                key={anim.id}
                                onClick={() => selectNavbarAnimation(anim.id)}
                                className={`flex items-start gap-3 p-2.5 rounded-lg text-left transition-all ${state.step2.selectedNavbarAnim === anim.id
                                  ? "bg-[#06b6d4]/20 border border-[#06b6d4]/50"
                                  : "bg-[#1a1a1a] border border-[#262626] hover:border-[#06b6d4]/30"
                                  }`}
                              >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${state.step2.selectedNavbarAnim === anim.id
                                  ? "border-[#06b6d4] bg-[#06b6d4]"
                                  : "border-[#333]"
                                  }`}>
                                  {state.step2.selectedNavbarAnim === anim.id && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{anim.icon}</span>
                                    <span className="text-xs font-medium text-white">{anim.label}</span>
                                  </div>
                                  <p className="text-[10px] text-[#52525b] mt-0.5 leading-relaxed">{anim.description}</p>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Custom Navbar Animation Input */}
                          <div className="pt-3 border-t border-[#262626]">
                            <p className="text-[10px] text-[#52525b] mb-2">หรือระบุเอง:</p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={state.step2.customNavbarInput}
                                onChange={(e) => updateStep2NavFooter("customNavbarInput", e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addCustomNavbarAnim()}
                                placeholder="เช่น: Logo spin..."
                                className="flex-1 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#262626] text-xs text-[#a1a1aa] placeholder:text-[#333] focus:outline-none focus:border-[#06b6d4]/50"
                              />
                              <button
                                onClick={addCustomNavbarAnim}
                                className="px-3 py-1.5 rounded-lg bg-[#06b6d4] text-white text-xs font-medium hover:bg-[#06b6d4]/90 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Custom animations list */}
                          {state.step2.navbarCustomAnims.length > 0 && (
                            <div className="space-y-1.5 pt-2">
                              {state.step2.navbarCustomAnims.map((anim) => (
                                <div
                                  key={anim.id}
                                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/30"
                                >
                                  <span className="text-xs text-[#06b6d4]">✦ {anim.label}</span>
                                  <button
                                    onClick={() => removeNavbarCustomAnim(anim.id)}
                                    className="p-0.5 rounded hover:bg-[#06b6d4]/20 text-[#06b6d4]/70 hover:text-[#06b6d4]"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="space-y-3">
                      <label className="block font-mono text-[13px] text-[#cfcfe2]">
                        <span className="text-[#10b981]">{">"}</span> Footer
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {FOOTER_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => updateStep2NavFooter("footer", opt.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${state.step2.footer === opt.id
                              ? "bg-[#10b981] text-white"
                              : "bg-[#1a1a1a] text-[#a1a1aa] border border-[#262626] hover:border-[#10b981]/50"
                              }`}
                          >
                            {opt.label}
                            {opt.price > 0 && <span className="ml-1 opacity-70">+{formatPrice(opt.price)}</span>}
                          </button>
                        ))}
                      </div>

                      {/* Footer Animation Types */}
                      {state.step2.footer === "animated" && (
                        <div className="space-y-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#10b981]/20">
                          <p className="text-xs text-[#10b981] font-medium">เลือก Animation 1 อย่าง:</p>
                          <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                            {FOOTER_ANIMATION_TYPES.map((anim) => (
                              <button
                                key={anim.id}
                                onClick={() => selectFooterAnimation(anim.id)}
                                className={`flex items-start gap-3 p-2.5 rounded-lg text-left transition-all ${state.step2.selectedFooterAnim === anim.id
                                  ? "bg-[#10b981]/20 border border-[#10b981]/50"
                                  : "bg-[#1a1a1a] border border-[#262626] hover:border-[#10b981]/30"
                                  }`}
                              >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${state.step2.selectedFooterAnim === anim.id
                                  ? "border-[#10b981] bg-[#10b981]"
                                  : "border-[#333]"
                                  }`}>
                                  {state.step2.selectedFooterAnim === anim.id && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{anim.icon}</span>
                                    <span className="text-xs font-medium text-white">{anim.label}</span>
                                  </div>
                                  <p className="text-[10px] text-[#52525b] mt-0.5 leading-relaxed">{anim.description}</p>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Custom Footer Animation Input */}
                          <div className="pt-3 border-t border-[#262626]">
                            <p className="text-[10px] text-[#52525b] mb-2">หรือระบุเอง:</p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={state.step2.customFooterInput}
                                onChange={(e) => updateStep2NavFooter("customFooterInput", e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addCustomFooterAnim()}
                                placeholder="เช่น: Social icons bounce..."
                                className="flex-1 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#262626] text-xs text-[#a1a1aa] placeholder:text-[#333] focus:outline-none focus:border-[#10b981]/50"
                              />
                              <button
                                onClick={addCustomFooterAnim}
                                className="px-3 py-1.5 rounded-lg bg-[#10b981] text-white text-xs font-medium hover:bg-[#10b981]/90 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Custom animations list */}
                          {state.step2.footerCustomAnims.length > 0 && (
                            <div className="space-y-1.5 pt-2">
                              {state.step2.footerCustomAnims.map((anim) => (
                                <div
                                  key={anim.id}
                                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30"
                                >
                                  <span className="text-xs text-[#10b981]">✦ {anim.label}</span>
                                  <button
                                    onClick={() => removeFooterCustomAnim(anim.id)}
                                    className="p-0.5 rounded hover:bg-[#10b981]/20 text-[#10b981]/70 hover:text-[#10b981]"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Main Sections */}
                  <div className="pt-4 border-t border-[#262626]">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block font-mono text-[13px] text-[#cfcfe2]">
                        <span className="text-[#8b5cf6]">{">"}</span> Sections หน้าหลัก
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#262626] text-[10px] text-[#a1a1aa]">
                          {state.step2.mainSections.length} sections
                        </span>
                        <button
                          onClick={addMainSection}
                          className="px-2 py-1 rounded-lg bg-[#1a1a1a] border border-[#262626] text-[10px] text-[#a1a1aa] hover:border-[#ec4899]/50 hover:text-[#ec4899] transition-colors"
                        >
                          + เพิ่ม Section
                        </button>
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#0d0d0d] border border-[#8b5cf6]/30 overflow-hidden">
                      <div className="p-3 space-y-3">
                        {state.step2.mainSections.map((section: SectionItem, secIdx: number) => {
                          const layout = SECTION_LAYOUTS.find((l) => l.id === section.layout);
                          const availableAnims = SECTION_ANIMATIONS[section.layout] || [];
                          // แยก animations ออกเป็น 2 กลุ่ม
                          const basicAnims = availableAnims.filter((anim) => anim.type === "BASIC");
                          const sectionSpecificAnims = availableAnims.filter((anim) => !anim.type || anim.type !== "BASIC");
                          const selectedAnim = availableAnims.find((a) => a.id === section.animation);
                          const isFreeSection = secIdx < INITIAL_SECTIONS;
                          return (
                            <div
                              key={section.id}
                              className={`p-3 rounded-xl bg-[#1a1a1a] border transition-all ${section.animation ? "border-[#ec4899]/40 bg-[#ec4899]/5" : isFreeSection ? "border-[#262626]" : "border-[#8b5cf6]/30"
                                }`}
                            >
                              {/* Section Header Row */}
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-mono text-[10px] text-[#8b5cf6] w-4 shrink-0">{secIdx + 1}</span>

                                {/* Layout Modal */}
                                <div className="relative flex-1 min-w-0">
                                  <LayoutModal
                                    value={section.layout}
                                    onChange={(value) => updateMainSectionLayout(section.id, value)}
                                    options={SECTION_LAYOUTS}
                                    triggerColor="purple"
                                    themeColor={getThemeColor}
                                  />
                                </div>

                                {/* Price Badges */}
                                <div className="flex items-center gap-1 shrink-0">
                                  {isFreeSection ? (
                                    <span className="text-[10px] text-[#10b981] px-1.5 py-0.5 rounded bg-[#10b981]/10">ฟรี</span>
                                  ) : (
                                    <span className="text-[10px] text-[#f97316] px-1.5 py-0.5 rounded bg-[#f97316]/10">+{formatPrice(SECTION_PRICE)}</span>
                                  )}
                                  {(section.animation || section.customAnimation) && (
                                    <span className="text-[10px] text-[#ec4899] px-1.5 py-0.5 rounded bg-[#ec4899]/10">+{formatPrice(SECTION_ANIMATION_PRICE)}</span>
                                  )}
                                </div>

                                {/* Delete Button */}
                                {state.step2.mainSections.length > 1 && (
                                  <button
                                    onClick={() => removeMainSection(section.id)}
                                    className="p-1 rounded text-[#71717a] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors shrink-0"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                )}
                              </div>

                              {/* Layout Description */}
                              {section.layout !== "custom" && (
                                <div className="pl-7 py-1">
                                  <p className="text-[12px] text-[#52525b] italic">
                                    {SECTION_LAYOUTS.find((l) => l.id === section.layout)?.description}
                                  </p>
                                </div>
                              )}

                              {/* Custom Layout Input */}
                              {section.layout === "custom" && (
                                <div className="pl-7 pb-2">
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="ระบุชื่อ Section ที่ต้องการ..."
                                      value={section.customLayout || ""}
                                      onChange={(e) => updateMainSectionCustomLayout(section.id, e.target.value)}
                                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#0d0d0d] border border-[#8b5cf6]/30 text-xs text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#8b5cf6] transition-colors"
                                    />
                                    {section.customLayout && (
                                      <span className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg bg-[#10b981]/20 text-[#10b981] text-sm">
                                        ✓
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Animation Selection Row */}
                              {(basicAnims.length > 0 || sectionSpecificAnims.length > 0) && (
                                <div className="pl-7 pt-2 border-t border-[#262626]/50">
                                  {/* Basic Animations Section */}
                                  {basicAnims.length > 0 && (
                                    <>
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[12px] text-[#ec4899]">✦</span>
                                        <span className="text-[12px] text-[#71717a]">เลือก Animation พื้นฐาน</span>
                                        <span className="text-[10px] text-[#52525b] italic">(มาจาก BASIC_ANIMATIONS)</span>

                                        {(section.animation || section.customAnimation) && (
                                          <button
                                            onClick={() => {
                                              clearAnimation(`preview-main-${section.id}`);
                                              updateMainSectionAnimation(section.id, null);
                                              updateMainSectionCustomAnimation(section.id, "");
                                            }}
                                            className="ml-auto text-[10px] text-[#71717a] hover:text-[#ec4899] transition-colors"
                                          >
                                            ยกเลิก
                                          </button>
                                        )}
                                      </div>
                                      <div className="flex flex-wrap gap-1.5 mb-3">
                                        {basicAnims.map((anim) => (
                                          <button
                                            key={anim.id}
                                            onClick={() => {
                                              updateMainSectionAnimation(section.id, section.animation === anim.id ? null : anim.id);
                                              if (section.animation !== anim.id) updateMainSectionCustomAnimation(section.id, "");
                                            }}
                                            className={`group/anim relative px-2 py-1 rounded-md text-[12px] transition-all ${section.animation === anim.id
                                              ? "bg-[#ec4899] text-white"
                                              : "bg-[#262626] text-[#a1a1aa] hover:bg-[#333] hover:text-white"
                                              }`}
                                            title={anim.description}
                                          >
                                            <span className="mr-1">{anim.icon}</span>
                                            {anim.label}
                                          </button>
                                        ))}
                                      </div>
                                    </>
                                  )}

                                  {/* Section Specific Animations */}
                                  {sectionSpecificAnims.length > 0 && (
                                    <>
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[12px] text-[#ec4899]">✦</span>
                                        <span className="text-[12px] text-[#71717a]">เลือก Animation เฉพาะหน้านี้</span>
                                      </div>
                                      <div className="flex flex-wrap gap-1.5 mb-3">
                                        {sectionSpecificAnims.map((anim) => (
                                          <button
                                            key={anim.id}
                                            onClick={() => {
                                              updateMainSectionAnimation(section.id, section.animation === anim.id ? null : anim.id);
                                              if (section.animation !== anim.id) updateMainSectionCustomAnimation(section.id, "");
                                            }}
                                            className={`group/anim relative px-2 py-1 rounded-md text-[12px] transition-all ${section.animation === anim.id
                                              ? "bg-[#ec4899] text-white"
                                              : "bg-[#262626] text-[#a1a1aa] hover:bg-[#333] hover:text-white"
                                              }`}
                                            title={anim.description}
                                          >
                                            <span className="mr-1">{anim.icon}</span>
                                            {anim.label}
                                          </button>
                                        ))}
                                      </div>
                                    </>
                                  )}

                                  {/* Custom Animation Button */}
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[12px] text-[#ec4899]">✦</span>
                                    <span className="text-[12px] text-[#71717a]">Animation กำหนดเอง</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 mb-3">
                                    <button
                                      onClick={() => {
                                        updateMainSectionAnimation(section.id, section.animation === "custom" ? null : "custom");
                                      }}
                                      className={`group/anim relative px-2 py-1 rounded-md text-[12px] transition-all ${section.animation === "custom"
                                        ? "bg-[#ec4899] text-white"
                                        : "bg-[#262626] text-[#a1a1aa] hover:bg-[#333] hover:text-white"
                                        }`}
                                      title={CUSTOM_ANIMATION_OPTION.description}
                                    >
                                      <span className="mr-1">{CUSTOM_ANIMATION_OPTION.icon}</span>
                                      {CUSTOM_ANIMATION_OPTION.label}
                                    </button>
                                  </div>

                                  {selectedAnim && (
                                    <p className="mt-1.5 text-[12px] text-[#52525b] italic">{selectedAnim.description}</p>
                                  )}

                                  {/* Custom Animation Input */}
                                  {section.animation === "custom" && (
                                    <div className="mt-2">
                                      <div className="flex gap-2">
                                        <input
                                          type="text"
                                          placeholder="ระบุ Animation ที่ต้องการ..."
                                          value={section.customAnimation || ""}
                                          onChange={(e) => updateMainSectionCustomAnimation(section.id, e.target.value)}
                                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#0d0d0d] border border-[#ec4899]/30 text-xs text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#ec4899] transition-colors"
                                        />
                                        {section.customAnimation && (
                                          <span className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg bg-[#10b981]/20 text-[#10b981] text-sm">
                                            ✓
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Add Page Button */}
                  <div className="pt-4 border-t border-[#262626]">
                    {/* <label className="block font-mono text-[13px] text-[#cfcfe2] mb-3">
                      <span className="text-[#ec4899]">{">"}</span> เพิ่มหน้าเว็บ
                    </label> */}
                    <button
                      onClick={addPage}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[13px] text-[#cfcfe2] bg-[#1a1a1a] border border-[#262626] hover:border-[#ec4899]/50 text-sm transition-all group"
                    >
                      <span className="text-[#ec4899] group-hover:scale-110 transition-transform">+</span>
                      <span className="text-[#a1a1aa]">เพิ่มหน้าใหม่</span>
                      <span className="text-[10px] text-[#52525b]">(1 section)</span>
                    </button>
                  </div>

                  {/* Added Pages List */}
                  {state.step2.pages.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-[#262626]">
                      <label className="block font-mono text-[13px] text-[#cfcfe2]">
                        หน้าที่เพิ่ม ({state.step2.pages.length})
                      </label>
                      {state.step2.pages.map((page, pageIdx) => (
                        <div
                          key={page.id}
                          className="rounded-xl bg-[#0d0d0d] border border-[#ec4899]/30 overflow-hidden"
                        >
                          {/* Page Header */}
                          <div className="flex items-center justify-between p-3 bg-[#141414] border-b border-[#1f1f1f]">
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#ec4899]/20 flex items-center justify-center font-mono text-xs text-[#ec4899]">
                                +{pageIdx + 1}
                              </span>
                              <span className="text-sm font-medium text-white">{page.name}</span>

                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full bg-[#262626] text-[10px] text-[#a1a1aa]">
                                {page.sections.length} sections
                              </span>
                              <button
                                onClick={() => addSectionToPage(page.id)}
                                className="px-2 py-1 rounded-lg bg-[#1a1a1a] border border-[#262626] text-[10px] text-[#a1a1aa] hover:border-[#ec4899]/50 hover:text-[#ec4899] transition-colors"
                              >
                                + เพิ่ม Section
                              </button>
                              <button
                                onClick={() => removePage(page.id)}
                                className="p-1.5 rounded-lg hover:bg-[#1a1a1a] text-[#52525b] hover:text-[#ec4899] transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Sections List */}
                          <div className="p-3 space-y-3">
                            {page.sections.map((section, secIdx) => {
                              const availableAnims = SECTION_ANIMATIONS[section.layout] || [];
                              const selectedAnim = availableAnims.find((a) => a.id === section.animation);
                              return (
                                <div
                                  key={section.id}
                                  className={`p-3 rounded-xl bg-[#1a1a1a] border transition-all ${(section.animation || section.customAnimation) ? "border-[#ec4899]/40 bg-[#ec4899]/5" : "border-[#262626]"
                                    }`}
                                >
                                  {/* Section Header */}
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="font-mono text-[10px] text-[#ec4899] w-4 shrink-0">{secIdx + 1}</span>

                                    {/* Layout Modal */}
                                    <div className="relative flex-1 min-w-0">
                                      <LayoutModal
                                        value={section.layout}
                                        onChange={(value) => updateSectionLayout(page.id, section.id, value)}
                                        options={SECTION_LAYOUTS}
                                        triggerColor="pink"
                                        themeColor={getThemeColor}
                                      />
                                    </div>

                                    {/* Price Badge */}
                                    {(section.animation || section.customAnimation) && (
                                      <span className="text-[10px] text-[#ec4899] px-1.5 py-0.5 rounded bg-[#ec4899]/10 shrink-0">+{formatPrice(SECTION_ANIMATION_PRICE)}</span>
                                    )}

                                    {/* Remove Section Button */}
                                    {page.sections.length > 1 && (
                                      <button
                                        onClick={() => removeSectionFromPage(page.id, section.id)}
                                        className="p-1 rounded hover:bg-[#0d0d0d] text-[#52525b] hover:text-[#ec4899] transition-all shrink-0"
                                      >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    )}
                                  </div>

                                  {/* Layout Description */}
                                  {section.layout !== "custom" && (
                                    <div className="pl-7 py-1">
                                      <p className="text-[12px] text-[#52525b] italic">
                                        {SECTION_LAYOUTS.find((l) => l.id === section.layout)?.description}
                                      </p>
                                    </div>
                                  )}

                                  {/* Custom Layout Input */}
                                  {section.layout === "custom" && (
                                    <div className="pl-7 pb-2">
                                      <div className="flex gap-2">
                                        <input
                                          type="text"
                                          placeholder="ระบุชื่อ Section ที่ต้องการ..."
                                          value={section.customLayout || ""}
                                          onChange={(e) => updatePageSectionCustomLayout(page.id, section.id, e.target.value)}
                                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#0d0d0d] border border-[#ec4899]/30 text-xs text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#ec4899] transition-colors"
                                        />
                                        {section.customLayout && (
                                          <span className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg bg-[#10b981]/20 text-[#10b981] text-sm">
                                            ✓
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Animation Selection */}
                                  {availableAnims.length > 0 && (
                                    <div className="pl-7 pt-2 border-t border-[#262626]/50">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[12px] text-[#ec4899]">✦</span>
                                        <span className="text-[12px] text-[#71717a]">Animation</span>
                                        {(section.animation || section.customAnimation) && (
                                          <button
                                            onClick={() => {
                                              clearAnimation(`preview-page-${page.id}-${section.id}`);
                                              updatePageSectionAnimation(page.id, section.id, null);
                                              updatePageSectionCustomAnimation(page.id, section.id, "");
                                            }}
                                            className="ml-auto text-[10px] text-[#71717a] hover:text-[#ec4899] transition-colors"
                                          >
                                            ยกเลิก
                                          </button>
                                        )}
                                      </div>
                                      <div className="flex flex-wrap gap-1.5">
                                        {availableAnims.map((anim) => (
                                          <button
                                            key={anim.id}
                                            onClick={() => {
                                              updatePageSectionAnimation(page.id, section.id, section.animation === anim.id ? null : anim.id);
                                              if (section.animation !== anim.id) updatePageSectionCustomAnimation(page.id, section.id, "");
                                            }}
                                            className={`px-2 py-1 rounded-md text-[12px] transition-all ${section.animation === anim.id
                                              ? "bg-[#ec4899] text-white"
                                              : "bg-[#262626] text-[#a1a1aa] hover:bg-[#333] hover:text-white"
                                              }`}
                                            title={anim.description}
                                          >
                                            <span className="mr-1">{anim.icon}</span>
                                            {anim.label}
                                          </button>
                                        ))}
                                        {/* Custom Animation Button */}
                                        <button
                                          onClick={() => {
                                            updatePageSectionAnimation(page.id, section.id, section.animation === "custom" ? null : "custom");
                                          }}
                                          className={`px-2 py-1 rounded-md text-[12px] transition-all ${section.animation === "custom"
                                            ? "bg-[#ec4899] text-white"
                                            : "bg-[#262626] text-[#a1a1aa] hover:bg-[#333] hover:text-white"
                                            }`}
                                          title={CUSTOM_ANIMATION_OPTION.description}
                                        >
                                          <span className="mr-1 text-[12px]">{CUSTOM_ANIMATION_OPTION.icon}</span>
                                          {CUSTOM_ANIMATION_OPTION.label}
                                        </button>
                                      </div>
                                      {selectedAnim && (
                                        <p className="mt-1.5 text-[12px] text-[#52525b] italic">{selectedAnim.description}</p>
                                      )}
                                      {/* Custom Animation Input */}
                                      {section.animation === "custom" && (
                                        <div className="mt-2">
                                          <div className="flex gap-2">
                                            <input
                                              type="text"
                                              placeholder="ระบุ Animation ที่ต้องการ..."
                                              value={section.customAnimation || ""}
                                              onChange={(e) => updatePageSectionCustomAnimation(page.id, section.id, e.target.value)}
                                              className="flex-1 px-3 py-1.5 rounded-lg bg-[#0d0d0d] border border-[#ec4899]/30 text-xs text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#ec4899] transition-colors"
                                            />
                                            {section.customAnimation && (
                                              <span className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg bg-[#10b981]/20 text-[#10b981] text-sm">
                                                ✓
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 3: Add-on Services */}
              <div className="calc-step">
                <StepHeader step={3} title="บริการเสริม" />
                <div className="p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ADDON_SERVICES.map((service) => {
                      const isActive = state.step3[service.id as keyof typeof state.step3];
                      // Use dynamic price for mobile-responsive, otherwise use service.price
                      const displayPrice = service.id === "mobile-responsive" ? mobileResponsivePrice : service.price;
                      return (
                        <button
                          key={service.id}
                          onClick={() => toggleAddon(service.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${isActive
                            ? "bg-[#10b981]/10 border-[#10b981]/50"
                            : "bg-[#0d0d0d] border-[#1f1f1f] hover:border-[#262626]"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{service.icon}</span>
                            <span className="text-sm text-[#a1a1aa]">{service.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-[#10b981]">+{formatPrice(displayPrice)}</span>
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isActive ? "bg-[#10b981] border-[#10b981]" : "border-[#333]"
                                }`}
                            >
                              {isActive && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* STEP 4: Requirements Checklist */}
              <div className="calc-step">
                <StepHeader step={4} title="สิ่งที่ต้องเตรียมก่อนสั่งงาน" />
                <div className="space-y-4 p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                  {/* Auto-generated Requirements */}
                  <div>
                    <label className="block font-mono text-[13px] text-[#cfcfe2] mb-3">
                      <span className="text-[#06b6d4]">{">"}</span> รายการที่ต้องเตรียม (Auto-generated)
                    </label>
                    <div className="space-y-2">
                      {autoRequirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                          <div className="w-4 h-4 rounded border border-[#333] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-sm bg-[#52525b]" />
                          </div>
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Items */}
                  <div className="pt-4 border-t border-[#262626]">
                    <label className="block font-mono text-[13px] text-[#cfcfe2] mb-3">
                      <span className="text-[#f97316]">{">"}</span> เพิ่มรายการอื่นๆ
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newCustomItem}
                        onChange={(e) => setNewCustomItem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
                        placeholder="เช่น: Domain, Hosting..."
                        className="flex-1 px-4 py-2 rounded-lg bg-[#0d0d0d] border border-[#262626] text-sm text-[#a1a1aa] placeholder:text-[#333] focus:outline-none focus:border-[#f97316]/50"
                      />
                      <button
                        onClick={addCustomItem}
                        className="px-4 py-2 rounded-lg bg-[#f97316] text-white text-sm font-medium hover:bg-[#f97316]/90 transition-colors"
                      >
                        เพิ่ม
                      </button>
                    </div>
                    {state.step4.customItems.length > 0 && (
                      <div className="space-y-2">
                        {state.step4.customItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-[#0d0d0d] border border-[#1f1f1f]"
                          >
                            <span className="text-sm text-[#a1a1aa]">• {item}</span>
                            <button
                              onClick={() => removeCustomItem(idx)}
                              className="p-1 rounded hover:bg-[#1a1a1a] text-[#52525b] hover:text-[#ec4899]"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20">
                    <p className="text-xs text-[#f97316]">
                      💡 เคล็ดลับ: ยิ่งเตรียมข้อมูลครบ งานยิ่งเสร็จเร็ว!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== RIGHT PANEL - PREVIEW & SUMMARY ==================== */}
            <div className="lg:w-[45%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                {/* Mobile Toggle */}
                <button
                  onClick={() => setMobilePreviewOpen(!mobilePreviewOpen)}
                  className="lg:hidden w-full flex items-center justify-between p-4 rounded-xl bg-[#141414] border border-[#262626]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getThemeColor }} />
                    <span className="font-medium text-white">Preview & สรุปราคา</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold" style={{ color: getThemeColor }}>{formatPrice(priceBreakdown.total)}</span>
                    <svg
                      className={`w-5 h-5 text-[#52525b] transition-transform ${mobilePreviewOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div className={`space-y-4 ${mobilePreviewOpen ? "block" : "hidden lg:block"}`}>
                  {/* Live Preview */}
                  <div className="p-3 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                    {/* Header with Summary */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span style={{ color: getThemeColor }}>👁️</span>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#52525b]">LIVE PREVIEW</span>
                        {/* Theme indicator */}
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0d0d0d] border border-[#262626]">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getThemeColor }} />
                          <span className="text-[10px] text-[#52525b]">{COLOR_THEMES.find((t) => t.id === state.step1.themeColor)?.label || "Custom"}</span>
                          {state.step1.darkLightMode && <span className="text-[10px]">🌙/🌞</span>}
                          {state.step1.bilingual && <span className="text-[10px]">🌐</span>}
                        </div>
                      </div>

                      {/* Button Play All Animations */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={playAllAnimations}
                          className="p-2 rounded-lg text-xs hover:opacity-80 transition-opacity"
                          style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}
                        >
                          ▶ เล่น Animation ทั้งหมด
                        </button>
                        <button
                          onClick={() => setShowPlayButtons(!showPlayButtons)}
                          className="p-2 rounded-lg text-xs hover:opacity-80 transition-opacity"
                          style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}
                          title={showPlayButtons ? "ซ่อนปุ่มเล่น" : "แสดงปุ่มเล่น"}
                        >
                          {showPlayButtons ? " ซ่อน ▶" : " แสดง ▶"}
                        </button>
                      </div>
                    </div>

                    {/* Pages Horizontal Scroll Container */}
                    <div className="overflow-x-auto pb-4 -mx-2 px-3">
                      <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
                        {/* Main Page */}
                        <div className="shrink-0 w-[380px] md:w-[550px]">
                          <div className="text-center mb-4">
                            <span className="px-4 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}>
                              หน้าหลัก ({state.step2.mainSections.length} sec)
                            </span>
                          </div>
                          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${getThemeColor}50` }}>
                            {/* Browser Chrome */}
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#141414] border-b border-[#1f1f1f]">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ec4899]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                              {state.step1.fontFamily && (
                                <span className="ml-auto text-[8px] text-[#52525b] truncate max-w-[80px]">{state.step1.fontFamily}</span>
                              )}
                            </div>

                            {/* Page Content with Background */}
                            <div className="p-4 space-y-4 relative" style={getBackgroundStyles(state.step1.background, getThemeColor, getThemeColorLight, state.step1.backgroundCustomColor)}>
                              {/* Particles Background */}
                              {state.step1.background === "particles" && (
                                <ParticlesBackground themeColor={getThemeColor} customColor={state.step1.backgroundCustomColor} />
                              )}
                              {/* Custom Backgrounds */}
                              {BACKGROUND_CUSTOM_TYPES.some(bg => bg.id === state.step1.background) && (
                                renderCustomBackground(state.step1.background, getThemeColor, state.step1.backgroundCustomColor)
                              )}
                              {/* Navbar */}
                              <div className="z-10 relative flex items-center gap-2">
                                <div
                                  ref={previewNavbarRef}
                                  className={`flex-1 flex items-center justify-between p-3 rounded-lg transition-all ${getNavbarPreviewClasses}`}
                                  style={{
                                    backgroundColor: "#1a1a1a",
                                    boxShadow: state.step2.navbar !== "basic" ? `0 0 0 2px ${getThemeColor}50` : "none"
                                  }}
                                >
                                  <div className="w-16 h-4 rounded" style={{ backgroundColor: getThemeColor + "30" }} />
                                  <div className="flex items-center gap-2">

                                    {/* Menu Items */}
                                    <div className="flex gap-2">
                                      {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-3 rounded bg-[#262626]" />
                                      ))}
                                    </div>
                                    {/* Theme Toggle (Dark/Light) */}
                                    {state.step1.darkLightMode && (
                                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#262626] border border-[#333]">
                                        <span className="text-[10px]">🌙</span>
                                        <span className="text-[10px]">🌞</span>
                                      </div>
                                    )}
                                    {/* Language Selector (TH/EN) */}
                                    {state.step1.bilingual && (
                                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#262626] border border-[#333]">
                                        <span className="text-[10px] font-medium" style={{ color: getThemeColor }}>TH</span>
                                        <span className="text-[10px] text-[#52525b]">/</span>
                                        <span className="text-[10px] text-[#52525b]">EN</span>
                                      </div>
                                    )}

                                  </div>
                                </div>
                                {showPlayButtons && state.step2.navbar === "animated" && (
                                  <button
                                    onClick={playNavbarAnimation}
                                    className="p-2 rounded-lg text-xs hover:opacity-80"
                                    style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}
                                  >
                                    ▶
                                  </button>
                                )}
                              </div>

                              {/* Main Sections - Vertical Scroll */}
                              <div className="max-h-[300px] space-y-5 pr-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                                {state.step2.mainSections.map((section: SectionItem) => {
                                  const layout = SECTION_LAYOUTS.find((l) => l.id === section.layout);
                                  const animInfo = section.animation ? SECTION_ANIMATIONS[section.layout]?.find((a) => a.id === section.animation) : null;

                                  const refKey = `preview-main-${section.id}`;
                                  const previewType = layout?.preview || "custom";

                                  return (
                                    <div
                                      key={section.id}
                                      // id={`preview-main-${section.id}`}
                                      ref={(el) => setPreviewRef(refKey, el)}  // ✅ ใช้ ref callback
                                      className="flex items-center gap-2 w-full"
                                    >
                                      <div
                                        className={`relative p-2 rounded-lg bg-[#1a1a1a] border group ${section.animation ? "border-[#ec4899]/40" : "border-[#262626]"
                                          } w-full`}
                                      >
                                        {/* Layout Preview from LayoutModal */}
                                        <LayoutPreview preview={previewType} customLabel={section.customLayout || null} size="small" themeColor={getThemeColor} />

                                        {/* Layout icon */}
                                        <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <span className="text-[13px] text-[#cfcfe2]">{layout?.icon}</span>
                                        </div>
                                        {/* Animation badge & play button */}
                                        {section.animation && (
                                          <div className="absolute top-1 right-1 flex items-center gap-1">
                                            <span className="text-[10px] text-[#ec4899] bg-[#ec4899]/20 px-2 rounded">
                                              {section.animation === "custom" ? "✏️" : (animInfo?.icon || "✦")}
                                            </span>

                                          </div>
                                        )}
                                      </div>
                                      {showPlayButtons && (section.animation || section.customAnimation) ? (
                                        <button
                                          onClick={() => playSectionAnimation(refKey, section.animation || section.customAnimation!)}
                                          className="p-2 rounded-lg text-xs bg-[#ec4899]/20 text-[#ec4899] hover:bg-[#ec4899]/30 transition-colors"
                                        >
                                          ▶
                                        </button>
                                      ) : (
                                        // <button
                                        //   onClick={() => clearAnimation(refKey)}
                                        //   className="p-2 rounded-lg text-xs bg-[#52525b]/20 text-[#52525b] hover:bg-[#52525b]/30 transition-colors"
                                        //   title="ไม่ Animation"
                                        // >
                                        //   ⊗
                                        // </button>
                                        <></>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Footer */}
                              <div className="z-10 relative flex items-center gap-2">
                                <div
                                  ref={previewFooterRef}
                                  className={`flex-1 p-3 rounded-lg transition-all ${getFooterPreviewClasses}`}
                                  style={{
                                    backgroundColor: "#1a1a1a",
                                    boxShadow: state.step2.footer !== "basic" ? `0 0 0 2px ${getThemeColor}50` : "none"
                                  }}
                                >
                                  <div className="flex justify-between">
                                    <div className="w-12 h-3 rounded" style={{ backgroundColor: getThemeColor + "30" }} />
                                    <div className="flex gap-1">
                                      {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-4 h-4 rounded-full bg-[#262626]" />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {showPlayButtons && state.step2.footer === "animated" && (
                                  <button
                                    onClick={playFooterAnimation}
                                    className="p-2 rounded-lg text-xs hover:opacity-80"
                                    style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}
                                  >
                                    ▶
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Section Count */}
                            <div className="px-4 bg-[#141414] border-t border-[#1f1f1f] text-center">
                              <span className="text-sm" style={{ color: getThemeColor }}>{state.step2.mainSections.length} sections</span>
                            </div>
                          </div>
                        </div>

                        {/* Added Pages */}
                        {state.step2.pages.map((page) => (
                          <div key={page.id} className="shrink-0 w-[380px] md:w-[550px]">
                            <div className="text-center mb-4">
                              <span className="px-4 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: getThemeColorLight + "20", color: getThemeColorLight }}>
                                {page.name}
                              </span>
                            </div>
                            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${getThemeColorLight}50` }}>
                              {/* Browser Chrome */}
                              <div className="flex items-center gap-2 px-4 py-2 bg-[#141414] border-b border-[#1f1f1f]">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ec4899]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                                {state.step1.fontFamily && (
                                  <span className="ml-auto text-[8px] text-[#52525b] truncate max-w-[80px]">{state.step1.fontFamily}</span>
                                )}
                              </div>

                              {/* Page Sections - Vertical Scroll with Background */}
                              <div className="p-4 space-y-4 relative" style={getBackgroundStyles(state.step1.background, getThemeColor, getThemeColorLight, state.step1.backgroundCustomColor)}>
                                {/* Particles Background */}
                                {state.step1.background === "particles" && (
                                  <ParticlesBackground themeColor={getThemeColor} customColor={state.step1.backgroundCustomColor} />
                                )}
                                {/* Custom Backgrounds */}
                                {BACKGROUND_CUSTOM_TYPES.some(bg => bg.id === state.step1.background) && (
                                  renderCustomBackground(state.step1.background, getThemeColor, state.step1.backgroundCustomColor)
                                )}

                                {/* Navbar */}
                                <div className="z-10 relative flex items-center gap-2">
                                  <div
                                    ref={previewNavbarRef}
                                    className={`flex-1 flex items-center justify-between p-3 rounded-lg transition-all ${getNavbarPreviewClasses}`}
                                    style={{
                                      backgroundColor: "#1a1a1a",
                                      boxShadow: state.step2.navbar !== "basic" ? `0 0 0 2px ${getThemeColor}50` : "none"
                                    }}
                                  >
                                    <div className="w-16 h-4 rounded" style={{ backgroundColor: getThemeColor + "30" }} />
                                    <div className="flex items-center gap-2">

                                      {/* Menu Items */}
                                      <div className="flex gap-2">
                                        {[1, 2, 3].map((i) => (
                                          <div key={i} className="w-8 h-3 rounded bg-[#262626]" />
                                        ))}
                                      </div>

                                      {/* Theme Toggle (Dark/Light) */}
                                      {state.step1.darkLightMode && (
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#262626] border border-[#333]">
                                          <span className="text-[10px]">🌙</span>
                                          <span className="text-[10px]">🌞</span>
                                        </div>
                                      )}
                                      {/* Language Selector (TH/EN) */}
                                      {state.step1.bilingual && (
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#262626] border border-[#333]">
                                          <span className="text-[10px] font-medium" style={{ color: getThemeColor }}>TH</span>
                                          <span className="text-[10px] text-[#52525b]">/</span>
                                          <span className="text-[10px] text-[#52525b]">EN</span>
                                        </div>
                                      )}

                                    </div>
                                  </div>
                                  {showPlayButtons && state.step2.navbar === "animated" && (
                                    <button
                                      onClick={playNavbarAnimation}
                                      className="p-2 rounded-lg text-xs hover:opacity-80"
                                      style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}
                                    >
                                      ▶
                                    </button>
                                  )}
                                </div>

                                {/* Added Pages Sections - Vertical Scroll */}
                                <div className="max-h-[300px] space-y-5 pr-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                                  {page.sections.map((section) => {
                                    const layout = SECTION_LAYOUTS.find((l) => l.id === section.layout);
                                    const animInfo = section.animation ? SECTION_ANIMATIONS[section.layout]?.find((a) => a.id === section.animation) : null;

                                    const refKey = `preview-page-${page.id}-${section.id}`;
                                    const previewType = layout?.preview || "custom";

                                    return (
                                      <div
                                        key={section.id}
                                        // id={`preview-page-${page.id}-${section.id}`}
                                        ref={(el) => setPreviewRef(refKey, el)}  // ✅ ใช้ ref callback
                                        className="flex items-center gap-2 w-full"
                                      >
                                        <div
                                          className={`relative p-2 rounded-lg bg-[#1a1a1a] border group ${section.animation ? "border-[#ec4899]/40" : "border-[#262626]"
                                            } w-full`}
                                        >
                                          {/* Layout Preview from LayoutModal */}
                                          <LayoutPreview preview={previewType} customLabel={section.customLayout || null} size="small" themeColor={getThemeColor} />

                                          {/* Layout icon */}
                                          <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[13px] text-[#cfcfe2]">{layout?.icon}</span>
                                          </div>
                                          {/* Animation badge & play button */}
                                          {section.animation && (
                                            <div className="absolute top-1 right-1 flex items-center gap-1">
                                              <span className="text-[10px] text-[#ec4899] bg-[#ec4899]/20 px-2 rounded">
                                                {section.animation === "custom" ? "✏️" : (animInfo?.icon || "✦")}
                                              </span>

                                            </div>
                                          )}
                                        </div>
                                        {showPlayButtons && (section.animation || section.customAnimation) ? (
                                          <button
                                            onClick={() => playSectionAnimation(refKey, section.animation || section.customAnimation!)}
                                            className="p-2 rounded-lg text-xs bg-[#ec4899]/20 text-[#ec4899] hover:bg-[#ec4899]/30 transition-colors"
                                          >
                                            ▶
                                          </button>
                                        ) : (
                                          // <button
                                          //   onClick={() => clearAnimation(refKey)}
                                          //   className="p-2 rounded-lg text-xs bg-[#52525b]/20 text-[#52525b] hover:bg-[#52525b]/30 transition-colors"
                                          //   title="ไม่ Animation"
                                          // >
                                          //   ⊗
                                          // </button>
                                          <></>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Footer */}
                                <div className="z-10 relative flex items-center gap-2">
                                  <div
                                    ref={previewFooterRef}
                                    className={`flex-1 p-3 rounded-lg transition-all ${getFooterPreviewClasses}`}
                                    style={{
                                      backgroundColor: "#1a1a1a",
                                      boxShadow: state.step2.footer !== "basic" ? `0 0 0 2px ${getThemeColor}50` : "none"
                                    }}
                                  >
                                    <div className="flex justify-between">
                                      <div className="w-12 h-3 rounded" style={{ backgroundColor: getThemeColor + "30" }} />
                                      <div className="flex gap-1">
                                        {[1, 2, 3].map((i) => (
                                          <div key={i} className="w-4 h-4 rounded-full bg-[#262626]" />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  {showPlayButtons && state.step2.footer === "animated" && (
                                    <button
                                      onClick={playFooterAnimation}
                                      className="p-2 rounded-lg text-xs hover:opacity-80"
                                      style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}
                                    >
                                      ▶
                                    </button>
                                  )}
                                </div>

                              </div>

                              {/* Section Count */}
                              <div className="px-4 bg-[#141414] border-t border-[#1f1f1f] text-center">
                                <span className="text-sm" style={{ color: getThemeColorLight }}>{page.sections.length} sections</span>
                                {page.sections.some((s) => s.animation) && (
                                  <span className="ml-2 text-sm" style={{ color: getThemeColorLight }}>✨</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Price Summary */}
                  <div className="p-5 rounded-2xl bg-linear-to-b from-[#1a1a1a] to-[#141414] border border-[#262626]">

                    {/* Section Details Summary */}
                    <div className="mb-4 p-3 rounded-lg bg-[#0d0d0d] border border-[#1f1f1f]">
                      <p className="text-[10px] text-[#52525b] mb-3 font-mono uppercase tracking-wider">📋 สรุป Sections</p>

                      {/* Main Page Sections */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}>หน้าหลัก</span>
                          <span className="text-[10px] text-[#52525b]">{state.step2.mainSections.length} sections</span>
                        </div>
                        <div className="space-y-1.5 pl-2 border-l-2 max-h-[150px] overflow-y-auto" style={{ borderColor: getThemeColor + "50" }}>
                          {state.step2.mainSections.map((section, idx) => {
                            const layoutInfo = SECTION_LAYOUTS.find((l) => l.id === section.layout);
                            const animInfo = section.animation && section.animation !== "custom"
                              ? SECTION_ANIMATIONS[section.layout]?.find((a) => a.id === section.animation)
                              : null;
                            return (
                              <div key={section.id} className="flex items-center gap-2 py-1 px-2 rounded bg-[#1a1a1a]/50 text-[10px]">
                                <span className="font-mono w-4" style={{ color: getThemeColor }}>{idx + 1}</span>
                                <span className="text-[#52525b]">|</span>
                                <span className="text-white">
                                  {section.layout === "custom" ? (
                                    <span className="text-[#f97316]">✏️ {section.customLayout || "กำหนดเอง"}</span>
                                  ) : (
                                    <span>{layoutInfo?.icon} {layoutInfo?.label}</span>
                                  )}
                                </span>
                                {(section.animation || section.customAnimation) && (
                                  <>
                                    <span className="text-[#52525b]">|</span>
                                    <span style={{ color: getThemeColorLight }}>
                                      {section.animation === "custom" ? (
                                        <span>✏️ {section.customAnimation || "กำหนดเอง"}</span>
                                      ) : animInfo ? (
                                        <span>{animInfo.icon} {animInfo.label}</span>
                                      ) : null}
                                    </span>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Added Pages Sections */}
                      {state.step2.pages.map((page) => (
                        <div key={page.id} className="mb-4 last:mb-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: getThemeColorLight + "20", color: getThemeColorLight }}>{page.name}</span>
                            <span className="text-[10px] text-[#52525b]">{page.sections.length} sections</span>
                          </div>
                          <div className="space-y-1.5 pl-2 border-l-2 max-h-[150px] overflow-y-auto" style={{ borderColor: getThemeColorLight + "50" }}>
                            {page.sections.map((section, idx) => {
                              const layoutInfo = SECTION_LAYOUTS.find((l) => l.id === section.layout);
                              const animInfo = section.animation && section.animation !== "custom"
                                ? SECTION_ANIMATIONS[section.layout]?.find((a) => a.id === section.animation)
                                : null;
                              return (
                                <div key={section.id} className="flex items-center gap-2 py-1 px-2 rounded bg-[#1a1a1a]/50 text-[10px]">
                                  <span className="font-mono w-4" style={{ color: getThemeColorLight }}>{idx + 1}</span>
                                  <span className="text-[#52525b]">|</span>
                                  <span className="text-white">
                                    {section.layout === "custom" ? (
                                      <span className="text-[#f97316]">✏️ {section.customLayout || "กำหนดเอง"}</span>
                                    ) : (
                                      <span>{layoutInfo?.icon} {layoutInfo?.label}</span>
                                    )}
                                  </span>
                                  {(section.animation || section.customAnimation) && (
                                    <>
                                      <span className="text-[#52525b]">|</span>
                                      <span style={{ color: getThemeColorLight }}>
                                        {section.animation === "custom" ? (
                                          <span>✏️ {section.customAnimation || "กำหนดเอง"}</span>
                                        ) : animInfo ? (
                                          <span>{animInfo.icon} {animInfo.label}</span>
                                        ) : null}
                                      </span>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {/* Animation Navbar & Footer Details */}
                      {(state.step2.navbar === "animated" && (state.step2.selectedNavbarAnim || state.step2.navbarCustomAnims.length > 0)) ||
                        (state.step2.footer === "animated" && (state.step2.selectedFooterAnim || state.step2.footerCustomAnims.length > 0)) ? (
                        <div className="mt-3 p-2 rounded-lg bg-[#0d0d0d] border border-[#262626]">
                          <p className="text-[10px] text-[#52525b] mb-1">Animation ที่เลือก (Navbar & Footer) :</p>
                          <div className="flex flex-wrap gap-1">
                            {state.step2.selectedNavbarAnim && (
                              <span className="px-1.5 py-0.5 rounded text-[8px]" style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}>
                                Navbar : {NAVBAR_ANIMATION_TYPES.find((a) => a.id === state.step2.selectedNavbarAnim)?.icon}{" "}
                                {NAVBAR_ANIMATION_TYPES.find((a) => a.id === state.step2.selectedNavbarAnim)?.label}
                              </span>
                            )}
                            {state.step2.navbarCustomAnims.map((anim) => (
                              <span key={anim.id} className="px-1.5 py-0.5 rounded text-[8px]" style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}>
                                Navbar : ✦ {anim.label}
                              </span>
                            ))}
                            {state.step2.selectedFooterAnim && (
                              <span className="px-1.5 py-0.5 rounded text-[8px]" style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}>
                                Footer : {FOOTER_ANIMATION_TYPES.find((a) => a.id === state.step2.selectedFooterAnim)?.icon}{" "}
                                {FOOTER_ANIMATION_TYPES.find((a) => a.id === state.step2.selectedFooterAnim)?.label}
                              </span>
                            )}
                            {state.step2.footerCustomAnims.map((anim) => (
                              <span key={anim.id} className="px-1.5 py-0.5 rounded text-[8px]" style={{ backgroundColor: getThemeColor + "20", color: getThemeColor }}>
                                Footer : ✦ {anim.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {/* Summary Bar Page Count & Sections Count */}
                      <div className="mt-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#262626]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#52525b]">หน้าทั้งหมด:</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium text-white">
                                {1 + state.step2.pages.length}
                              </span>
                              <span className="text-[10px] text-[#52525b]">หน้า</span>
                            </div>
                            <div className="w-px h-3 bg-[#262626]" />
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium text-white">
                                {(() => {
                                  const addedSections = state.step2.pages.reduce((sum, p) => sum + p.sections.length, 0);
                                  return state.step2.mainSections.length + addedSections;
                                })()}
                              </span>
                              <span className="text-[10px] text-[#52525b]">sections</span>
                            </div>
                            {/* Service Icons */}
                            <div className="flex gap-1 ml-2">
                              {state.step3.seo && <span className="text-[10px]">📊</span>}
                              {state.step1.bilingual && <span className="text-[10px]">🌐</span>}
                              {state.step3.cms && <span className="text-[10px]">⚙️</span>}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* สรุปราคา Breakdown Price & Theme Settings Summary */}
                    <div className="mb-4 p-3 rounded-lg bg-[#0d0d0d] border border-[#1f1f1f]">

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#10b981]">📋</span>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#d0d0df]">สรุปราคา</span>
                      </div>

                      {/* Breakdown */}
                      <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto pr-2">
                        {priceBreakdown.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-[#a1a1aa] truncate mr-2">{item.label}</span>
                            <span className="font-mono text-[#aaaabe] whitespace-nowrap">{formatPrice(item.price)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Theme Settings Summary from STEP 1 */}
                      {(state.step1.themeColor || state.step1.darkLightMode || state.step1.bilingual || state.step1.fontFamily) && (
                        <div >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[#10b981]">🎨</span>
                            <span className="font-mono text-xs uppercase tracking-wider text-[#d0d0df]">ธีม & การตั้งค่า</span>
                          </div>
                          <div className="space-y-2 text-[#a1a1aa] truncate mr-2 text-sm">
                            {/* Theme Color */}
                            {state.step1.themeColor && (
                              <div className="flex items-center gap-2">

                                <span className="text-[#a1a1aa]">ธีมสี:</span>
                                <div
                                  className="w-3 h-3 rounded border border-[#333] shrink-0"
                                  style={{ backgroundColor: getThemeColor }}
                                />
                                <span className="text-white font-medium">
                                  {COLOR_THEMES.find((t) => t.id === state.step1.themeColor)?.label || "Custom Color"}
                                </span>
                                {state.step1.themeColor === "custom" && (
                                  <span className="text-[#52525b] font-mono">({state.step1.customColor})</span>
                                )}
                              </div>
                            )}

                            {/* Background */}
                            {state.step1.background !== "none" && (
                              <div className="flex items-center gap-2">
                                <span className="text-[#a1a1aa]">Background:</span>
                                <span className="text-base">
                                  {ALL_BACKGROUND_TYPES.find((b) => b.id === state.step1.background)?.icon || "▣"}
                                </span>
                                <span className="text-white font-medium">
                                  {ALL_BACKGROUND_TYPES.find((b) => b.id === state.step1.background)?.label || "Custom"}
                                </span>
                                {BACKGROUND_CUSTOM_TYPES.find((b) => b.id === state.step1.background) && (
                                  <span className="text-white font-medium">
                                    {BACKGROUND_CUSTOM_TYPES.find((b) => b.id === state.step1.background)?.label || "Custom"}
                                  </span>
                                )}

                              </div>
                            )}
                            {state.step1.backgroundCustomColor && (
                              <>
                                <span className="text-[#52525b] font-mono"> - สี Background:</span>
                                <span className="text-[#52525b] font-mono">{state.step1.backgroundCustomColor}</span>
                              </>
                            )}

                            {/* Dark/Light Mode */}
                            {state.step1.darkLightMode && (
                              <div className="flex items-center gap-2">
                                <span className="text-[#a1a1aa]">Theme:</span>
                                <span className="text-xs">🌙/🌞</span>
                                <span className="text-white font-medium">Dark/Light Mode</span>
                                <span className="text-[#52525b] font-mono"> Dark:({state.step1.darkThemeColor})</span>
                                <span className="text-[#52525b] font-mono"> Light:({state.step1.lightThemeColor})</span>
                                <span className="ml-auto text-[#10b981] font-mono">+{formatPrice(DARK_LIGHT_THEME_PRICE)}</span>
                              </div>
                            )}

                            {/* Bilingual */}
                            {state.step1.bilingual && (
                              <div className="flex items-center gap-2">
                                <span className="text-[#a1a1aa]">ภาษา:</span>
                                <span className="text-xs">🌐</span>
                                <span className="text-white font-medium">รองรับ 2 ภาษา (TH/EN)</span>
                                <span className="ml-auto text-[#10b981] font-mono">+{formatPrice(BILINGUAL_PRICE)}</span>
                              </div>
                            )}

                            {/* Font Family */}
                            {state.step1.fontFamily && (
                              <div className="flex items-center gap-2">
                                <span className="text-[#a1a1aa]">Font:</span>
                                <span className="text-xs">✏️</span>
                                <span className="text-white font-medium truncate">{state.step1.fontFamily}</span>
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                    </div>

                    <div className="pt-4 border-t border-[#262626]">
                      {/* Total */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-white">รวมทั้งหมด</span>
                        <span className="text-2xl font-bold gradient-text-purple">{formatPrice(priceBreakdown.total)}</span>
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="text-[#52525b]">⏱️ ระยะเวลาโดยประมาณ</span>
                        <span className="font-mono text-[#06b6d4]">{getEstimatedDays(priceBreakdown.total)}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={copyQuote}
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#262626] text-white text-sm font-medium hover:bg-[#333] transition-colors"
                        >
                          {copiedQuote ? (
                            <>
                              <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>คัดลอกแล้ว!</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                              <span>คัดลอก Quote</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={downloadQuote}
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-[#8b5cf6] to-[#ec4899] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#8b5cf6]/25 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>ขอใบเสนอราคา</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]">
                    <p className="text-[13px] text-[#cfcfe2] leading-relaxed">
                      <span className="text-[#f97316]">⚠️</span> ราคาอาจปรับตามความซับซ้อนของงานจริง หลังจากรับ brief
                      รายละเอียดแล้ว จะประเมินอีกครั้ง
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Bottom Padding for Mobile */}
      <div className="h-24 lg:hidden" />
    </section>
  );
}

// ==================== SUB COMPONENTS ====================
function StepHeader({ step, title }: { step: number; title: string }) {
  const colors = ["cyan", "pink", "purple", "green", "orange"];
  const color = colors[(step - 1) % colors.length];
  const colorClasses: Record<string, string> = {
    cyan: "text-[#06b6d4] border-[#06b6d4]/30 bg-[#06b6d4]/10",
    pink: "text-[#ec4899] border-[#ec4899]/30 bg-[#ec4899]/10",
    purple: "text-[#8b5cf6] border-[#8b5cf6]/30 bg-[#8b5cf6]/10",
    green: "text-[#10b981] border-[#10b981]/30 bg-[#10b981]/10",
    orange: "text-[#f97316] border-[#f97316]/30 bg-[#f97316]/10",
  };

  return (
    <div className="flex items-center gap-3 mb-3">
      <div className={`px-2.5 py-1 rounded-lg border font-mono text-xs ${colorClasses[color]}`}>
        STEP {step}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
  );
}
