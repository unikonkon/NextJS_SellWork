"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==================== TYPES ====================
interface SectionItem {
  id: string;
  layout: string;
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
    navbar: "basic" | "animated";
    footer: "basic" | "animated";
    selectedNavbarAnim: string | null;
    selectedFooterAnim: string | null;
    navbarCustomAnims: CustomAnimItem[];
    footerCustomAnims: CustomAnimItem[];
    customNavbarInput: string;
    customFooterInput: string;
  };
  step2: {
    mainSections: SectionItem[];
    pages: PageItem[];
  };
  step3: {
    sectionAnimation: "none" | "basic" | "complex";
    globalAnimations: {
      scroll: number;
      pageTransition: boolean;
      loading: boolean;
      text: boolean;
      parallax: number;
      hover: boolean;
      cursor: boolean;
      svgMorph: boolean;
      lottie: boolean;
    };
  };
  step4: {
    seo: boolean;
    bilingual: boolean;
    cms: boolean;
    extendedSupport: boolean;
  };
  step5: {
    customItems: string[];
  };
}

// ==================== PRICING DATA ====================
const BASE_PRICE = 1500; // ราคาเริ่มต้น
const SECTION_PRICE = 200; // ราคาต่อ section ที่เพิ่ม (นับจาก section ที่ 4 เป็นต้นไป)
const INITIAL_SECTIONS = 3; // จำนวน section เริ่มต้น (ฟรี)

const NAVBAR_OPTIONS = [
  { id: "basic" as const, label: "พื้นฐาน", price: 0 },
  { id: "animated" as const, label: "+ Animation", price: 400 },
];

const FOOTER_OPTIONS = [
  { id: "basic" as const, label: "พื้นฐาน", price: 0 },
  { id: "animated" as const, label: "+ Animation", price: 300 },
];

// ==================== ANIMATION TYPES DATA ====================
const NAVBAR_ANIMATION_TYPES = [
  {
    id: "sticky-fade",
    label: "Sticky + Fade",
    description: "Navbar จะลอยอยู่ด้านบนเสมอ และจะ fade in/out เมื่อ scroll",
    icon: "◐",
  },
  {
    id: "slide-down",
    label: "Slide Down",
    description: "Navbar จะเลื่อนลงมาจากด้านบนเมื่อ scroll ขึ้น",
    icon: "↓",
  },
  {
    id: "color-change",
    label: "Color Change",
    description: "สีพื้นหลัง Navbar จะเปลี่ยนเมื่อ scroll ผ่านจุดที่กำหนด",
    icon: "◑",
  },
  {
    id: "shrink",
    label: "Shrink Effect",
    description: "Navbar จะหดเล็กลงเมื่อ scroll ลง ขยายกลับเมื่อ scroll ขึ้น",
    icon: "⊡",
  },
  {
    id: "blur-glass",
    label: "Glass Blur",
    description: "เอฟเฟกต์กระจกฝ้าแบบ Glassmorphism",
    icon: "◇",
  },
  {
    id: "menu-reveal",
    label: "Menu Reveal",
    description: "เมนูจะ reveal ทีละรายการด้วย stagger animation",
    icon: "≡",
  },
];

const FOOTER_ANIMATION_TYPES = [
  {
    id: "fade-in",
    label: "Fade In",
    description: "Footer จะค่อยๆ ปรากฏเมื่อ scroll ถึง",
    icon: "◔",
  },
  {
    id: "slide-up",
    label: "Slide Up",
    description: "Footer จะเลื่อนขึ้นมาจากด้านล่างเมื่อ scroll ถึง",
    icon: "↑",
  },
  {
    id: "parallax",
    label: "Parallax",
    description: "องค์ประกอบต่างๆ ใน Footer จะเคลื่อนที่ความเร็วต่างกัน",
    icon: "≋",
  },
  {
    id: "hover-links",
    label: "Hover Links",
    description: "ลิงก์ใน Footer มีเอฟเฟกต์พิเศษเมื่อ hover",
    icon: "◉",
  },
  {
    id: "wave-bg",
    label: "Wave Background",
    description: "พื้นหลังแบบคลื่นเคลื่อนไหว",
    icon: "∿",
  },
  {
    id: "stagger-cols",
    label: "Stagger Columns",
    description: "คอลัมน์ต่างๆ จะปรากฏทีละอันตามลำดับ",
    icon: "⊞",
  },
];

// ==================== SECTION LAYOUTS ====================
const SECTION_LAYOUTS = [
  {
    id: "hero",
    label: "Hero",
    description: "ส่วนหัวขนาดใหญ่พร้อมรูปภาพหรือวิดีโอ",
    icon: "▣",
    preview: "full",
  },
  {
    id: "text-image",
    label: "Text + Image",
    description: "ข้อความด้านซ้าย รูปภาพด้านขวา",
    icon: "◧",
    preview: "split",
  },
  {
    id: "image-text",
    label: "Image + Text",
    description: "รูปภาพด้านซ้าย ข้อความด้านขวา",
    icon: "◨",
    preview: "split-reverse",
  },
  {
    id: "three-cols",
    label: "3 Columns",
    description: "แบ่งเป็น 3 คอลัมน์เท่ากัน",
    icon: "⫿",
    preview: "cols-3",
  },
  {
    id: "four-cols",
    label: "4 Columns",
    description: "แบ่งเป็น 4 คอลัมน์เท่ากัน",
    icon: "▦",
    preview: "cols-4",
  },
  {
    id: "gallery",
    label: "Gallery",
    description: "แกลเลอรี่รูปภาพแบบ Grid",
    icon: "▤",
    preview: "gallery",
  },
  {
    id: "cta",
    label: "CTA",
    description: "Call-to-Action พร้อมปุ่ม",
    icon: "◉",
    preview: "cta",
  },
  {
    id: "testimonial",
    label: "Testimonial",
    description: "รีวิวหรือคำพูดจากลูกค้า",
    icon: "❝",
    preview: "testimonial",
  },
  {
    id: "faq",
    label: "FAQ",
    description: "คำถามที่พบบ่อย",
    icon: "❓",
    preview: "faq",
  },
  {
    id: "stats",
    label: "Stats",
    description: "แสดงตัวเลขสถิติ",
    icon: "📊",
    preview: "stats",
  },
];

const SECTION_PRICES = { none: 200, basic: 350, complex: 500 };

const GLOBAL_ANIMATIONS = [
  { id: "scroll", label: "Scroll Animation", price: 300, perSection: true, icon: "↓" },
  { id: "pageTransition", label: "Page Transition", price: 500, perSection: false, icon: "⟷" },
  { id: "loading", label: "Loading Animation", price: 500, perSection: false, icon: "◐" },
  { id: "text", label: "Text Animation", price: 400, perSection: false, icon: "Aa" },
  { id: "parallax", label: "Parallax Effect", price: 400, perSection: true, icon: "≋" },
  { id: "hover", label: "Hover Effects (5)", price: 300, perSection: false, icon: "◉" },
  { id: "cursor", label: "Custom Cursor", price: 600, perSection: false, icon: "↗" },
  { id: "svgMorph", label: "SVG / Morph", price: 800, perSection: false, icon: "◇" },
  { id: "lottie", label: "Lottie Animation", price: 500, perSection: false, icon: "▶" },
];

const ADDON_SERVICES = [
  { id: "seo", label: "SEO Setup เต็มรูปแบบ", price: 1000, icon: "📊" },
  { id: "bilingual", label: "รองรับ 2 ภาษา (TH/EN)", price: 1500, icon: "🌐" },
  { id: "cms", label: "Admin Panel / CMS พื้นฐาน", price: 3000, icon: "⚙️" },
  { id: "extendedSupport", label: "Support เพิ่ม 30 วัน", price: 1000, icon: "🛡️" },
];

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

  // Calculator State
  // Helper to create initial sections
  const createInitialSections = (): SectionItem[] => {
    return Array.from({ length: INITIAL_SECTIONS }, (_, i) => ({
      id: generateId(),
      layout: i === 0 ? "hero" : i === 1 ? "text-image" : "three-cols",
    }));
  };

  const [state, setState] = useState<CalculatorState>({
    step1: {
      navbar: "basic",
      footer: "basic",
      selectedNavbarAnim: null,
      selectedFooterAnim: null,
      navbarCustomAnims: [],
      footerCustomAnims: [],
      customNavbarInput: "",
      customFooterInput: "",
    },
    step2: { mainSections: createInitialSections(), pages: [] },
    step3: {
      sectionAnimation: "none",
      globalAnimations: {
        scroll: 0, pageTransition: false, loading: false, text: false,
        parallax: 0, hover: false, cursor: false, svgMorph: false, lottie: false,
      },
    },
    step4: { seo: false, bilingual: false, cms: false, extendedSupport: false },
    step5: { customItems: [] },
  });

  const [newCustomItem, setNewCustomItem] = useState("");

  // ==================== PRICE CALCULATION ====================
  const priceBreakdown = useMemo(() => {
    const items: { label: string; price: number; category: string }[] = [];

    // Base Price
    items.push({ label: "ราคาเริ่มต้น", price: BASE_PRICE, category: "base" });

    // Extra main sections (over INITIAL_SECTIONS)
    const extraMainSections = Math.max(0, state.step2.mainSections.length - INITIAL_SECTIONS);
    if (extraMainSections > 0) {
      items.push({
        label: `Section เพิ่ม ×${extraMainSections}`,
        price: extraMainSections * SECTION_PRICE,
        category: "sections",
      });
    }

    // Navbar
    const navbar = NAVBAR_OPTIONS.find((n) => n.id === state.step1.navbar)!;
    if (navbar.price > 0) {
      items.push({ label: `Navbar ${navbar.label}`, price: navbar.price, category: "navbar" });
    }

    // Footer
    const footer = FOOTER_OPTIONS.find((f) => f.id === state.step1.footer)!;
    if (footer.price > 0) {
      items.push({ label: `Footer ${footer.label}`, price: footer.price, category: "footer" });
    }

    // STEP 2: Added Pages with sections
    state.step2.pages.forEach((page) => {
      const sectionCount = page.sections.length;
      const basePrice = sectionCount * SECTION_PRICES.none;
      const animPrice = page.animation !== "none"
        ? sectionCount * (SECTION_PRICES[page.animation] - SECTION_PRICES.none)
        : 0;
      const animLabel = page.animation === "none" ? "" : page.animation === "basic" ? " + Anim พื้นฐาน" : " + Anim ซับซ้อน";
      items.push({
        label: `${page.name} (${sectionCount} sec)${animLabel}`,
        price: basePrice + animPrice,
        category: "pages",
      });
    });

    // Global Animations
    GLOBAL_ANIMATIONS.forEach((anim) => {
      const value = state.step3.globalAnimations[anim.id as keyof typeof state.step3.globalAnimations];
      if (typeof value === "boolean" && value) {
        items.push({ label: anim.label, price: anim.price, category: "animations" });
      } else if (typeof value === "number" && value > 0) {
        items.push({ label: `${anim.label} ×${value}`, price: anim.price * value, category: "animations" });
      }
    });

    // STEP 4: Addons
    ADDON_SERVICES.forEach((service) => {
      if (state.step4[service.id as keyof typeof state.step4]) {
        items.push({ label: service.label, price: service.price, category: "addons" });
      }
    });

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return { items, total };
  }, [state]);

  // ==================== HANDLERS ====================
  const updateStep1 = useCallback((key: keyof CalculatorState["step1"], value: string | string[] | null | CustomAnimItem[]) => {
    setState((prev) => ({ ...prev, step1: { ...prev.step1, [key]: value } }));
  }, []);

  // Select single navbar animation
  const selectNavbarAnimation = useCallback((animId: string) => {
    setState((prev) => ({
      ...prev,
      step1: {
        ...prev.step1,
        selectedNavbarAnim: prev.step1.selectedNavbarAnim === animId ? null : animId,
      },
    }));
  }, []);

  // Select single footer animation
  const selectFooterAnimation = useCallback((animId: string) => {
    setState((prev) => ({
      ...prev,
      step1: {
        ...prev.step1,
        selectedFooterAnim: prev.step1.selectedFooterAnim === animId ? null : animId,
      },
    }));
  }, []);

  // Add custom navbar animation
  const addCustomNavbarAnim = useCallback(() => {
    if (state.step1.customNavbarInput.trim()) {
      setState((prev) => ({
        ...prev,
        step1: {
          ...prev.step1,
          navbarCustomAnims: [
            ...prev.step1.navbarCustomAnims,
            { id: generateId(), label: prev.step1.customNavbarInput.trim(), isCustom: true },
          ],
          customNavbarInput: "",
        },
      }));
    }
  }, [state.step1.customNavbarInput]);

  // Add custom footer animation
  const addCustomFooterAnim = useCallback(() => {
    if (state.step1.customFooterInput.trim()) {
      setState((prev) => ({
        ...prev,
        step1: {
          ...prev.step1,
          footerCustomAnims: [
            ...prev.step1.footerCustomAnims,
            { id: generateId(), label: prev.step1.customFooterInput.trim(), isCustom: true },
          ],
          customFooterInput: "",
        },
      }));
    }
  }, [state.step1.customFooterInput]);

  // Remove custom navbar animation
  const removeNavbarCustomAnim = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      step1: {
        ...prev.step1,
        navbarCustomAnims: prev.step1.navbarCustomAnims.filter((a) => a.id !== id),
      },
    }));
  }, []);

  // Remove custom footer animation
  const removeFooterCustomAnim = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      step1: {
        ...prev.step1,
        footerCustomAnims: prev.step1.footerCustomAnims.filter((a) => a.id !== id),
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
          { id: generateId(), layout: "text-image" },
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
          section.id === sectionId ? { ...section, layout } : section
        ),
      },
    }));
  }, []);

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
              sections: [{ id: generateId(), layout: "hero" }],
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

  const updatePageAnimation = useCallback((id: string, animation: "none" | "basic" | "complex") => {
    setState((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        pages: prev.step2.pages.map((p) => (p.id === id ? { ...p, animation } : p)),
      },
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
                section.id === sectionId ? { ...section, layout } : section
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
              sections: [...page.sections, { id: generateId(), layout: "text-image" }],
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

  const toggleGlobalAnimation = useCallback((id: string) => {
    setState((prev) => {
      const current = prev.step3.globalAnimations[id as keyof typeof prev.step3.globalAnimations];
      if (typeof current === "boolean") {
        return {
          ...prev,
          step3: { ...prev.step3, globalAnimations: { ...prev.step3.globalAnimations, [id]: !current } },
        };
      }
      return prev;
    });
  }, []);

  const updatePerSectionAnimation = useCallback((id: string, delta: number) => {
    setState((prev) => {
      const current = prev.step3.globalAnimations[id as keyof typeof prev.step3.globalAnimations];
      if (typeof current === "number") {
        return {
          ...prev,
          step3: {
            ...prev.step3,
            globalAnimations: { ...prev.step3.globalAnimations, [id]: Math.max(0, current + delta) },
          },
        };
      }
      return prev;
    });
  }, []);

  const toggleAddon = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      step4: { ...prev.step4, [id]: !prev.step4[id as keyof typeof prev.step4] },
    }));
  }, []);

  const addCustomItem = useCallback(() => {
    if (newCustomItem.trim()) {
      setState((prev) => ({
        ...prev,
        step5: { ...prev.step5, customItems: [...prev.step5.customItems, newCustomItem.trim()] },
      }));
      setNewCustomItem("");
    }
  }, [newCustomItem]);

  const removeCustomItem = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      step5: { ...prev.step5, customItems: prev.step5.customItems.filter((_, i) => i !== index) },
    }));
  }, []);

  // Generate Quote
  const generateQuote = useCallback(() => {
    const lines = [
      "══════════════════════════════════",
      "   ANIMATION WEBSITE QUOTE",
      "══════════════════════════════════",
      "",
      ...priceBreakdown.items.map((item) => `${item.label.padEnd(30)} ${formatPrice(item.price)}`),
      "",
      "──────────────────────────────────",
      `${"รวมทั้งหมด".padEnd(30)} ${formatPrice(priceBreakdown.total)}`,
      `${"ระยะเวลาโดยประมาณ".padEnd(30)} ${getEstimatedDays(priceBreakdown.total)}`,
      "══════════════════════════════════",
    ];
    return lines.join("\n");
  }, [priceBreakdown]);

  const copyQuote = useCallback(async () => {
    await navigator.clipboard.writeText(generateQuote());
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
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

  // ==================== AUTO-GENERATED REQUIREMENTS ====================
  const autoRequirements = useMemo(() => {
    const reqs: string[] = [
      "Logo (PNG/SVG format)",
      "ข้อความ/เนื้อหาทุกหน้า",
      "รูปภาพสำหรับเว็บ (Hero, Banner)",
      "ข้อมูลติดต่อ (โทร, อีเมล, ที่อยู่)",
      "Social Media Links",
    ];

    state.step2.pages.forEach((page) => {
      reqs.push(`เนื้อหาสำหรับ ${page.name} (${page.sections.length} sec)`);
    });

    if (state.step3.globalAnimations.loading) {
      reqs.push("สี/ธีมสำหรับ Loading Animation");
    }

    if (state.step3.globalAnimations.lottie) {
      reqs.push("ไฟล์ Lottie JSON หรือ reference");
    }

    if (state.step4.seo) {
      reqs.push("Keywords หลักสำหรับ SEO");
      reqs.push("Meta Description ที่ต้องการ");
    }

    if (state.step4.bilingual) {
      reqs.push("เนื้อหาภาษาอังกฤษทั้งหมด");
    }

    return reqs;
  }, [state]);

  // ==================== SELECTED ANIMATIONS LIST ====================
  const selectedAnimations = useMemo(() => {
    const anims: string[] = [];

    if (state.step1.navbar === "animated") {
      if (state.step1.selectedNavbarAnim) {
        const navAnim = NAVBAR_ANIMATION_TYPES.find((a) => a.id === state.step1.selectedNavbarAnim);
        if (navAnim) {
          anims.push(`Navbar: ${navAnim.label}`);
        }
      }
      state.step1.navbarCustomAnims.forEach((a) => {
        anims.push(`Navbar: ${a.label}`);
      });
      if (!state.step1.selectedNavbarAnim && state.step1.navbarCustomAnims.length === 0) {
        anims.push("Navbar Animation");
      }
    }
    if (state.step1.footer === "animated") {
      if (state.step1.selectedFooterAnim) {
        const footAnim = FOOTER_ANIMATION_TYPES.find((a) => a.id === state.step1.selectedFooterAnim);
        if (footAnim) {
          anims.push(`Footer: ${footAnim.label}`);
        }
      }
      state.step1.footerCustomAnims.forEach((a) => {
        anims.push(`Footer: ${a.label}`);
      });
      if (!state.step1.selectedFooterAnim && state.step1.footerCustomAnims.length === 0) {
        anims.push("Footer Animation");
      }
    }

    state.step2.pages.forEach((page) => {
      if (page.animation !== "none") {
        anims.push(`${page.name}: ${page.animation === "basic" ? "พื้นฐาน" : "ซับซ้อน"}`);
      }
    });

    GLOBAL_ANIMATIONS.forEach((anim) => {
      const value = state.step3.globalAnimations[anim.id as keyof typeof state.step3.globalAnimations];
      if ((typeof value === "boolean" && value) || (typeof value === "number" && value > 0)) {
        anims.push(anim.label);
      }
    });

    return anims;
  }, [state]);

  // ==================== PREVIEW ANIMATION CLASSES ====================
  const getNavbarPreviewClasses = useMemo(() => {
    if (state.step1.navbar !== "animated" || !navbarAnimating) return "";

    const animId = state.step1.selectedNavbarAnim;
    if (animId === "sticky-fade") return "animate-navbar-fade";
    if (animId === "slide-down") return "animate-navbar-slide";
    if (animId === "color-change") return "animate-navbar-color";
    if (animId === "shrink") return "animate-navbar-shrink";
    if (animId === "blur-glass") return "animate-navbar-glass";
    if (animId === "menu-reveal") return "animate-navbar-menu";

    return "animate-navbar-fade";
  }, [state.step1.navbar, state.step1.selectedNavbarAnim, navbarAnimating]);

  const getFooterPreviewClasses = useMemo(() => {
    if (state.step1.footer !== "animated" || !footerAnimating) return "";

    const animId = state.step1.selectedFooterAnim;
    if (animId === "fade-in") return "animate-footer-fade";
    if (animId === "slide-up") return "animate-footer-slide";
    if (animId === "parallax") return "animate-footer-parallax";
    if (animId === "hover-links") return "animate-footer-hover";
    if (animId === "wave-bg") return "animate-footer-wave";
    if (animId === "stagger-cols") return "animate-footer-stagger";

    return "animate-footer-fade";
  }, [state.step1.footer, state.step1.selectedFooterAnim, footerAnimating]);

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
              {/* STEP 1: Base Price & Options */}
              <div className="calc-step">
                <StepHeader step={1} title="ราคาเริ่มต้น" />
                <div className="space-y-4 p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                  {/* Base Price Card */}
                  <div className="p-4 rounded-xl border-2 border-[#8b5cf6] bg-linear-to-b from-[#8b5cf6]/10 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#52525b] mb-1">ราคาเริ่มต้น</div>
                        <div className="text-2xl font-bold text-white">{formatPrice(BASE_PRICE)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#52525b] mb-1">รวม {INITIAL_SECTIONS} Sections ฟรี</div>
                        <div className="text-xs text-[#8b5cf6]">+{formatPrice(SECTION_PRICE)}/section เพิ่ม</div>
                      </div>
                    </div>
                  </div>

                  {/* Navbar & Footer Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#262626]">
                    {/* Navbar */}
                    <div className="space-y-3">
                      <label className="block font-mono text-xs text-[#52525b]">
                        <span className="text-[#06b6d4]">{">"}</span> Navbar
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {NAVBAR_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => updateStep1("navbar", opt.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${state.step1.navbar === opt.id
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
                      {state.step1.navbar === "animated" && (
                        <div className="space-y-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#06b6d4]/20">
                          <p className="text-xs text-[#06b6d4] font-medium">เลือก Animation 1 อย่าง:</p>
                          <div className="grid grid-cols-1 gap-2">
                            {NAVBAR_ANIMATION_TYPES.map((anim) => (
                              <button
                                key={anim.id}
                                onClick={() => selectNavbarAnimation(anim.id)}
                                className={`flex items-start gap-3 p-2.5 rounded-lg text-left transition-all ${state.step1.selectedNavbarAnim === anim.id
                                  ? "bg-[#06b6d4]/20 border border-[#06b6d4]/50"
                                  : "bg-[#1a1a1a] border border-[#262626] hover:border-[#06b6d4]/30"
                                  }`}
                              >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${state.step1.selectedNavbarAnim === anim.id
                                  ? "border-[#06b6d4] bg-[#06b6d4]"
                                  : "border-[#333]"
                                  }`}>
                                  {state.step1.selectedNavbarAnim === anim.id && (
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
                            <p className="text-[10px] text-[#52525b] mb-2">หรือระบุเอง หรือใส่รายละเอียดเพิ่มเติม:</p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={state.step1.customNavbarInput}
                                onChange={(e) => updateStep1("customNavbarInput", e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addCustomNavbarAnim()}
                                placeholder="เช่น: Logo spin, Dropdown slide..."
                                className="flex-1 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#262626] text-xs text-[#a1a1aa] placeholder:text-[#333] focus:outline-none focus:border-[#06b6d4]/50"
                              />
                              <button
                                onClick={addCustomNavbarAnim}
                                className="px-3 py-1.5 rounded-lg bg-[#06b6d4] text-white text-xs font-medium hover:bg-[#06b6d4]/90 transition-colors"
                              >
                                Add
                              </button>
                            </div>
                          </div>

                          {/* Custom animations list */}
                          {state.step1.navbarCustomAnims.length > 0 && (
                            <div className="space-y-1.5 pt-2">
                              <p className="text-[10px] text-[#06b6d4]">Animation ที่เพิ่ม:</p>
                              {state.step1.navbarCustomAnims.map((anim) => (
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
                      <label className="block font-mono text-xs text-[#52525b]">
                        <span className="text-[#10b981]">{">"}</span> Footer
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {FOOTER_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => updateStep1("footer", opt.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${state.step1.footer === opt.id
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
                      {state.step1.footer === "animated" && (
                        <div className="space-y-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#10b981]/20">
                          <p className="text-xs text-[#10b981] font-medium">เลือก Animation 1 อย่าง:</p>
                          <div className="grid grid-cols-1 gap-2">
                            {FOOTER_ANIMATION_TYPES.map((anim) => (
                              <button
                                key={anim.id}
                                onClick={() => selectFooterAnimation(anim.id)}
                                className={`flex items-start gap-3 p-2.5 rounded-lg text-left transition-all ${state.step1.selectedFooterAnim === anim.id
                                  ? "bg-[#10b981]/20 border border-[#10b981]/50"
                                  : "bg-[#1a1a1a] border border-[#262626] hover:border-[#10b981]/30"
                                  }`}
                              >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${state.step1.selectedFooterAnim === anim.id
                                  ? "border-[#10b981] bg-[#10b981]"
                                  : "border-[#333]"
                                  }`}>
                                  {state.step1.selectedFooterAnim === anim.id && (
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
                            <p className="text-[10px] text-[#52525b] mb-2">หรือระบุเอง หรือใส่รายละเอียดเพิ่มเติม:</p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={state.step1.customFooterInput}
                                onChange={(e) => updateStep1("customFooterInput", e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addCustomFooterAnim()}
                                placeholder="เช่น: Social icons bounce, Map zoom..."
                                className="flex-1 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#262626] text-xs text-[#a1a1aa] placeholder:text-[#333] focus:outline-none focus:border-[#10b981]/50"
                              />
                              <button
                                onClick={addCustomFooterAnim}
                                className="px-3 py-1.5 rounded-lg bg-[#10b981] text-white text-xs font-medium hover:bg-[#10b981]/90 transition-colors"
                              >
                                Add
                              </button>
                            </div>
                          </div>

                          {/* Custom animations list */}
                          {state.step1.footerCustomAnims.length > 0 && (
                            <div className="space-y-1.5 pt-2">
                              <p className="text-[10px] text-[#10b981]">Animation ที่เพิ่ม:</p>
                              {state.step1.footerCustomAnims.map((anim) => (
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
                </div>
              </div>

              {/* STEP 2: Pages & Sections */}
              <div className="calc-step">
                <StepHeader step={2} title="จัดการ Sections และหน้าเพิ่ม" />
                <div className="space-y-4 p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                  {/* Main Sections */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block font-mono text-xs text-[#52525b]">
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
                      <div className="p-3 space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                        {state.step2.mainSections.map((section: SectionItem, secIdx: number) => {
                          const layout = SECTION_LAYOUTS.find((l) => l.id === section.layout);
                          const isFreeSection = secIdx < INITIAL_SECTIONS;
                          return (
                            <div
                              key={section.id}
                              className={`flex items-center gap-3 p-2 rounded-lg bg-[#1a1a1a] border group ${isFreeSection ? "border-[#262626]" : "border-[#8b5cf6]/30"
                                }`}
                            >
                              <span className="font-mono text-[10px] text-[#8b5cf6] w-4">{secIdx + 1}</span>

                              {/* Layout Dropdown */}
                              <div className="relative flex-1">
                                <select
                                  value={section.layout}
                                  onChange={(e) => updateMainSectionLayout(section.id, e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg bg-[#0d0d0d] border border-[#333] text-xs text-white appearance-none cursor-pointer hover:border-[#8b5cf6]/50 focus:outline-none focus:border-[#8b5cf6] transition-colors"
                                >
                                  {SECTION_LAYOUTS.map((l) => (
                                    <option key={l.id} value={l.id}>
                                      {l.icon} {l.label}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#52525b]">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>

                              {/* Layout Description */}
                              {layout && (
                                <span className="hidden sm:block text-[10px] text-[#52525b] max-w-[80px] truncate">
                                  {layout.description}
                                </span>
                              )}

                              {/* Price/Free Badge */}
                              {isFreeSection ? (
                                <span className="text-[8px] text-[#10b981] px-1.5 py-0.5 rounded bg-[#10b981]/10">ฟรี</span>
                              ) : (
                                <span className="text-[8px] text-[#f97316] px-1.5 py-0.5 rounded bg-[#f97316]/10">+{formatPrice(SECTION_PRICE)}</span>
                              )}

                              {/* Delete Button (only for sections beyond INITIAL_SECTIONS) */}
                              {state.step2.mainSections.length > 1 && (
                                <button
                                  onClick={() => removeMainSection(section.id)}
                                  className="p-1 rounded text-[#71717a] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Add Page Button */}
                  <div className="pt-4 border-t border-[#262626]">
                    <label className="block font-mono text-xs text-[#52525b] mb-3">
                      <span className="text-[#ec4899]">{">"}</span> เพิ่มหน้าเว็บ
                    </label>
                    <button
                      onClick={addPage}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#262626] hover:border-[#ec4899]/50 text-sm transition-all group"
                    >
                      <span className="text-[#ec4899] group-hover:scale-110 transition-transform">+</span>
                      <span className="text-[#a1a1aa]">เพิ่มหน้าใหม่</span>
                      <span className="text-[10px] text-[#52525b]">(1 section)</span>
                    </button>
                  </div>

                  {/* Added Pages List */}
                  {state.step2.pages.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-[#262626]">
                      <label className="block font-mono text-xs text-[#52525b]">
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
                          <div className="p-3 space-y-2">
                            {page.sections.map((section, secIdx) => {
                              const layout = SECTION_LAYOUTS.find((l) => l.id === section.layout);
                              return (
                                <div
                                  key={section.id}
                                  className="flex items-center gap-3 p-2 rounded-lg bg-[#1a1a1a] border border-[#262626] group"
                                >
                                  <span className="font-mono text-[10px] text-[#ec4899] w-4">{secIdx + 1}</span>

                                  {/* Layout Dropdown */}
                                  <div className="relative flex-1">
                                    <select
                                      value={section.layout}
                                      onChange={(e) => updateSectionLayout(page.id, section.id, e.target.value)}
                                      className="w-full px-3 py-1.5 rounded-lg bg-[#0d0d0d] border border-[#333] text-xs text-white appearance-none cursor-pointer hover:border-[#ec4899]/50 focus:outline-none focus:border-[#ec4899] transition-colors"
                                    >
                                      {SECTION_LAYOUTS.map((l) => (
                                        <option key={l.id} value={l.id}>
                                          {l.icon} {l.label}
                                        </option>
                                      ))}
                                    </select>
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#52525b]">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Layout Description */}
                                  {layout && (
                                    <span className="hidden sm:block text-[10px] text-[#52525b] max-w-[120px] truncate">
                                      {layout.description}
                                    </span>
                                  )}

                                  {/* Remove Section Button */}
                                  {page.sections.length > 1 && (
                                    <button
                                      onClick={() => removeSectionFromPage(page.id, section.id)}
                                      className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-[#0d0d0d] text-[#52525b] hover:text-[#ec4899] transition-all"
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
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

              {/* STEP 3: Animation Options */}
              <div className="calc-step">
                <StepHeader step={3} title="เพิ่ม Animation" />
                <div className="space-y-4 p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                  {/* Page Animation Options (linked to STEP 2) */}
                  {state.step2.pages.length > 0 && (
                    <div className="space-y-3">
                      <label className="block font-mono text-xs text-[#52525b]">
                        <span className="text-[#8b5cf6]">{">"}</span> Animation สำหรับหน้าที่เพิ่ม
                      </label>
                      {state.step2.pages.map((page) => (
                        <div key={page.id} className="p-3 rounded-lg bg-[#0d0d0d] border border-[#1f1f1f]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[#a1a1aa]">
                              {page.name} ({page.sections.length} sec)
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(["none", "basic", "complex"] as const).map((anim) => {
                              const labels = { none: "ไม่มี Animation", basic: "+ Animation พื้นฐาน", complex: "+ Animation ซับซ้อน" };
                              return (
                                <button
                                  key={anim}
                                  onClick={() => updatePageAnimation(page.id, anim)}
                                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${page.animation === anim
                                    ? "bg-[#8b5cf6] text-white"
                                    : "bg-[#1a1a1a] text-[#a1a1aa] border border-[#262626] hover:border-[#8b5cf6]/50"
                                    }`}
                                >
                                  {labels[anim]}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Global Animations */}
                  <div className={state.step2.pages.length > 0 ? "pt-4 border-t border-[#262626]" : ""}>
                    <label className="block font-mono text-xs text-[#52525b] mb-3">
                      <span className="text-[#ec4899]">{">"}</span> Animation เพิ่มเติม (Global)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {GLOBAL_ANIMATIONS.map((anim) => {
                        const value = state.step3.globalAnimations[anim.id as keyof typeof state.step3.globalAnimations];
                        const isActive = typeof value === "boolean" ? value : value > 0;
                        return (
                          <div
                            key={anim.id}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isActive ? "bg-[#ec4899]/10 border-[#ec4899]/30" : "bg-[#0d0d0d] border-[#1f1f1f] hover:border-[#262626]"
                              }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-base">{anim.icon}</span>
                              <span className="text-sm text-[#a1a1aa]">{anim.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#52525b]">
                                +{formatPrice(anim.price)}
                                {anim.perSection && "/sec"}
                              </span>
                              {anim.perSection ? (
                                <div className="flex items-center gap-1 p-0.5 rounded bg-[#1a1a1a]">
                                  <button
                                    onClick={() => updatePerSectionAnimation(anim.id, -1)}
                                    className="w-6 h-6 rounded flex items-center justify-center text-xs text-[#a1a1aa] hover:bg-[#262626]"
                                  >
                                    -
                                  </button>
                                  <span className="w-6 text-center text-xs font-mono text-white">{value as number}</span>
                                  <button
                                    onClick={() => updatePerSectionAnimation(anim.id, 1)}
                                    className="w-6 h-6 rounded flex items-center justify-center text-xs text-[#a1a1aa] hover:bg-[#262626]"
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => toggleGlobalAnimation(anim.id)}
                                  className={`w-10 h-5 rounded-full transition-all ${value ? "bg-[#ec4899]" : "bg-[#262626]"
                                    }`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full bg-white transition-transform ${value ? "translate-x-5" : "translate-x-0.5"
                                      }`}
                                  />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 4: Add-on Services */}
              <div className="calc-step">
                <StepHeader step={4} title="บริการเสริม" />
                <div className="p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ADDON_SERVICES.map((service) => {
                      const isActive = state.step4[service.id as keyof typeof state.step4];
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
                            <span className="text-xs font-mono text-[#10b981]">+{formatPrice(service.price)}</span>
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

              {/* STEP 5: Requirements Checklist */}
              <div className="calc-step">
                <StepHeader step={5} title="สิ่งที่ต้องเตรียมก่อนสั่งงาน" />
                <div className="space-y-4 p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                  {/* Auto-generated Requirements */}
                  <div>
                    <label className="block font-mono text-xs text-[#52525b] mb-3">
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
                    <label className="block font-mono text-xs text-[#52525b] mb-3">
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
                    {state.step5.customItems.length > 0 && (
                      <div className="space-y-2">
                        {state.step5.customItems.map((item, idx) => (
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
                  <span className="font-medium text-white">Preview & สรุปราคา</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#8b5cf6]">{formatPrice(priceBreakdown.total)}</span>
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
                  <div className="p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                    {/* Header with Summary */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[#8b5cf6]">👁️</span>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#52525b]">LIVE PREVIEW</span>
                      </div>
                    </div>

                    {/* Pages Horizontal Scroll Container */}
                    <div className="overflow-x-auto pb-2 -mx-2 px-2">
                      <div className="flex gap-3" style={{ minWidth: 'min-content' }}>
                        {/* Main Page */}
                        <div className="shrink-0 w-[200px]">
                          <div className="text-center mb-2">
                            <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/20 text-[8px] text-[#8b5cf6] font-medium">
                              หน้าหลัก ({state.step2.mainSections.length} sec)
                            </span>
                          </div>
                          <div className="rounded-xl bg-[#0a0a0a] border border-[#8b5cf6]/30 overflow-hidden">
                            {/* Browser Chrome */}
                            <div className="flex items-center gap-1 px-2 py-1.5 bg-[#141414] border-b border-[#1f1f1f]">
                              <div className="w-2 h-2 rounded-full bg-[#ec4899]" />
                              <div className="w-2 h-2 rounded-full bg-[#f97316]" />
                              <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                            </div>

                            {/* Page Content */}
                            <div className="p-2 space-y-1.5">
                              {/* Navbar */}
                              <div className="flex items-center gap-1">
                                <div
                                  ref={previewNavbarRef}
                                  className={`flex-1 flex items-center justify-between p-1.5 rounded bg-[#1a1a1a] transition-all ${state.step1.navbar !== "basic" ? "ring-1 ring-[#06b6d4]/50" : ""
                                    } ${getNavbarPreviewClasses}`}
                                >
                                  <div className="w-8 h-2 rounded bg-[#262626]" />
                                  <div className="flex gap-1">
                                    {[1, 2, 3].map((i) => (
                                      <div key={i} className="w-4 h-1.5 rounded bg-[#262626]" />
                                    ))}
                                  </div>
                                </div>
                                {state.step1.navbar === "animated" && (
                                  <button
                                    onClick={playNavbarAnimation}
                                    className="p-1 rounded bg-[#06b6d4]/20 text-[#06b6d4] text-[6px] hover:bg-[#06b6d4]/30"
                                  >
                                    ▶
                                  </button>
                                )}
                              </div>

                              {/* Main Sections - Vertical Scroll */}
                              <div className="max-h-[100px] overflow-y-auto space-y-1 custom-scrollbar pr-1">
                                {state.step2.mainSections.map((section: SectionItem) => {
                                  const layout = SECTION_LAYOUTS.find((l) => l.id === section.layout);
                                  return (
                                    <div key={section.id} className="relative p-1.5 rounded bg-[#1a1a1a] border border-[#262626] group">
                                      {section.layout === "hero" && (
                                        <div className="p-1 rounded bg-linear-to-br from-[#262626] to-[#1a1a1a]">
                                          <div className="w-10 h-1.5 rounded bg-[#333]" />
                                        </div>
                                      )}
                                      {section.layout === "text-image" && (
                                        <div className="flex gap-1">
                                          <div className="flex-1 h-1.5 rounded bg-[#333]" />
                                          <div className="w-5 h-5 rounded bg-[#262626]" />
                                        </div>
                                      )}
                                      {section.layout === "image-text" && (
                                        <div className="flex gap-1">
                                          <div className="w-5 h-5 rounded bg-[#262626]" />
                                          <div className="flex-1 h-1.5 rounded bg-[#333]" />
                                        </div>
                                      )}
                                      {section.layout === "three-cols" && (
                                        <div className="grid grid-cols-3 gap-0.5">
                                          {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-4 rounded bg-[#262626]" />
                                          ))}
                                        </div>
                                      )}
                                      {section.layout === "four-cols" && (
                                        <div className="grid grid-cols-4 gap-0.5">
                                          {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="h-4 rounded bg-[#262626]" />
                                          ))}
                                        </div>
                                      )}
                                      {(section.layout === "gallery" || section.layout === "cta" ||
                                        section.layout === "testimonial" || section.layout === "faq" ||
                                        section.layout === "stats") && (
                                          <div className="h-4 rounded bg-[#262626]" />
                                        )}
                                      <div className="absolute top-0 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[6px] text-[#52525b]">{layout?.icon}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Footer */}
                              <div className="flex items-center gap-1">
                                <div
                                  ref={previewFooterRef}
                                  className={`flex-1 p-1.5 rounded bg-[#1a1a1a] transition-all ${state.step1.footer !== "basic" ? "ring-1 ring-[#10b981]/50" : ""
                                    } ${getFooterPreviewClasses}`}
                                >
                                  <div className="flex justify-between">
                                    <div className="w-6 h-1.5 rounded bg-[#262626]" />
                                    <div className="flex gap-0.5">
                                      {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-2 h-2 rounded-full bg-[#262626]" />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {state.step1.footer === "animated" && (
                                  <button
                                    onClick={playFooterAnimation}
                                    className="p-1 rounded bg-[#10b981]/20 text-[#10b981] text-[6px] hover:bg-[#10b981]/30"
                                  >
                                    ▶
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Section Count */}
                            <div className="px-2 py-1 bg-[#141414] border-t border-[#1f1f1f] text-center">
                              <span className="text-[8px] text-[#8b5cf6]">{state.step2.mainSections.length} sections</span>
                            </div>
                          </div>
                        </div>

                        {/* Added Pages */}
                        {state.step2.pages.map((page) => (
                          <div key={page.id} className="shrink-0 w-[200px]">
                            <div className="text-center mb-2">
                              <span className="px-2 py-0.5 rounded-full bg-[#ec4899]/20 text-[8px] text-[#ec4899] font-medium">
                                {page.name}
                              </span>
                            </div>
                            <div className="rounded-xl bg-[#0a0a0a] border border-[#ec4899]/30 overflow-hidden">
                              {/* Browser Chrome */}
                              <div className="flex items-center gap-1 px-2 py-1.5 bg-[#141414] border-b border-[#1f1f1f]">
                                <div className="w-2 h-2 rounded-full bg-[#ec4899]" />
                                <div className="w-2 h-2 rounded-full bg-[#f97316]" />
                                <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                              </div>

                              {/* Page Sections - Vertical Scroll */}
                              <div className="p-2">
                                <div className="max-h-[140px] overflow-y-auto space-y-1 custom-scrollbar pr-1">
                                  {page.sections.map((section) => {
                                    const layout = SECTION_LAYOUTS.find((l) => l.id === section.layout);
                                    return (
                                      <div
                                        key={section.id}
                                        className="relative p-1.5 rounded bg-[#1a1a1a] border border-[#262626] group"
                                      >
                                        {/* Layout Preview Based on Type */}
                                        {section.layout === "hero" && (
                                          <div className="p-1 rounded bg-linear-to-br from-[#262626] to-[#1a1a1a]">
                                            <div className="w-10 h-1.5 rounded bg-[#333]" />
                                          </div>
                                        )}
                                        {section.layout === "text-image" && (
                                          <div className="flex gap-1">
                                            <div className="flex-1 h-1.5 rounded bg-[#333]" />
                                            <div className="w-5 h-5 rounded bg-[#262626]" />
                                          </div>
                                        )}
                                        {section.layout === "image-text" && (
                                          <div className="flex gap-1">
                                            <div className="w-5 h-5 rounded bg-[#262626]" />
                                            <div className="flex-1 h-1.5 rounded bg-[#333]" />
                                          </div>
                                        )}
                                        {section.layout === "three-cols" && (
                                          <div className="grid grid-cols-3 gap-0.5">
                                            {[1, 2, 3].map((i) => (
                                              <div key={i} className="h-4 rounded bg-[#262626]" />
                                            ))}
                                          </div>
                                        )}
                                        {section.layout === "four-cols" && (
                                          <div className="grid grid-cols-4 gap-0.5">
                                            {[1, 2, 3, 4].map((i) => (
                                              <div key={i} className="h-4 rounded bg-[#262626]" />
                                            ))}
                                          </div>
                                        )}
                                        {section.layout === "gallery" && (
                                          <div className="grid grid-cols-3 gap-0.5">
                                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                              <div key={i} className="h-2.5 rounded-sm bg-[#262626]" />
                                            ))}
                                          </div>
                                        )}
                                        {section.layout === "cta" && (
                                          <div className="text-center py-0.5">
                                            <div className="w-8 h-2 rounded bg-[#ec4899]/30 mx-auto" />
                                          </div>
                                        )}
                                        {section.layout === "testimonial" && (
                                          <div className="flex items-center gap-1">
                                            <div className="w-4 h-4 rounded-full bg-[#262626]" />
                                            <div className="flex-1 h-1.5 rounded bg-[#333]" />
                                          </div>
                                        )}
                                        {section.layout === "faq" && (
                                          <div className="space-y-0.5">
                                            {[1, 2].map((i) => (
                                              <div key={i} className="h-1.5 rounded bg-[#333]" />
                                            ))}
                                          </div>
                                        )}
                                        {section.layout === "stats" && (
                                          <div className="grid grid-cols-4 gap-0.5">
                                            {[1, 2, 3, 4].map((i) => (
                                              <div key={i} className="h-3 rounded bg-[#333]" />
                                            ))}
                                          </div>
                                        )}

                                        {/* Section Label */}
                                        <div className="absolute top-0 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <span className="text-[6px] text-[#52525b]">{layout?.icon}</span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Section Count */}
                              <div className="px-2 py-1 bg-[#141414] border-t border-[#1f1f1f] text-center">
                                <span className="text-[8px] text-[#ec4899]">{page.sections.length} sections</span>
                                {page.animation !== "none" && (
                                  <span className="ml-1 text-[8px] text-[#8b5cf6]">✨</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary Bar */}
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
                            {state.step4.seo && <span className="text-[10px]">📊</span>}
                            {state.step4.bilingual && <span className="text-[10px]">🌐</span>}
                            {state.step4.cms && <span className="text-[10px]">⚙️</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Animation Details */}
                    {(state.step1.navbar === "animated" && (state.step1.selectedNavbarAnim || state.step1.navbarCustomAnims.length > 0)) ||
                      (state.step1.footer === "animated" && (state.step1.selectedFooterAnim || state.step1.footerCustomAnims.length > 0)) ? (
                      <div className="mt-3 p-2 rounded-lg bg-[#0d0d0d] border border-[#262626]">
                        <p className="text-[10px] text-[#52525b] mb-1">Animation ที่เลือก:</p>
                        <div className="flex flex-wrap gap-1">
                          {state.step1.selectedNavbarAnim && (
                            <span className="px-1.5 py-0.5 rounded bg-[#06b6d4]/20 text-[8px] text-[#06b6d4]">
                              {NAVBAR_ANIMATION_TYPES.find((a) => a.id === state.step1.selectedNavbarAnim)?.icon}{" "}
                              {NAVBAR_ANIMATION_TYPES.find((a) => a.id === state.step1.selectedNavbarAnim)?.label}
                            </span>
                          )}
                          {state.step1.navbarCustomAnims.map((anim) => (
                            <span key={anim.id} className="px-1.5 py-0.5 rounded bg-[#06b6d4]/20 text-[8px] text-[#06b6d4]">
                              ✦ {anim.label}
                            </span>
                          ))}
                          {state.step1.selectedFooterAnim && (
                            <span className="px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[8px] text-[#10b981]">
                              {FOOTER_ANIMATION_TYPES.find((a) => a.id === state.step1.selectedFooterAnim)?.icon}{" "}
                              {FOOTER_ANIMATION_TYPES.find((a) => a.id === state.step1.selectedFooterAnim)?.label}
                            </span>
                          )}
                          {state.step1.footerCustomAnims.map((anim) => (
                            <span key={anim.id} className="px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[8px] text-[#10b981]">
                              ✦ {anim.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* Page Count */}
                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#52525b]">
                      <span>หน้าทั้งหมด:</span>
                      <span className="font-mono text-[#8b5cf6]">
                        1 หน้าหลัก + {state.step2.pages.length} หน้าเพิ่ม
                      </span>
                    </div>
                  </div>

                  {/* Selected Animations */}
                  {selectedAnimations.length > 0 && (
                    <div className="p-5 rounded-2xl bg-[#141414]/80 border border-[#262626]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#ec4899]">✨</span>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#52525b]">
                          ANIMATION ({selectedAnimations.length})
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedAnimations.map((anim, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded-lg bg-[#ec4899]/10 border border-[#ec4899]/20 text-xs text-[#ec4899]"
                          >
                            ✓ {anim}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Summary */}
                  <div className="p-5 rounded-2xl bg-linear-to-b from-[#1a1a1a] to-[#141414] border border-[#262626]">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[#10b981]">📋</span>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#52525b]">สรุปราคา</span>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 mb-4 max-h-[200px] overflow-y-auto pr-2">
                      {priceBreakdown.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-[#a1a1aa] truncate mr-2">{item.label}</span>
                          <span className="font-mono text-[#52525b] whitespace-nowrap">{formatPrice(item.price)}</span>
                        </div>
                      ))}
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
                        <a
                          href="#contact"
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-[#8b5cf6] to-[#ec4899] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#8b5cf6]/25 transition-all"
                        >
                          <span>💬</span>
                          <span>ขอใบเสนอราคา</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]">
                    <p className="text-xs text-[#52525b] leading-relaxed">
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

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-[#262626] z-50">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <div className="text-xs text-[#52525b]">รวมทั้งหมด</div>
            <div className="text-xl font-bold gradient-text-purple">{formatPrice(priceBreakdown.total)}</div>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-linear-to-r from-[#8b5cf6] to-[#ec4899] text-white text-sm font-medium"
          >
            ขอใบเสนอราคา
          </a>
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
