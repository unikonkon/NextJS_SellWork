// ==================== REFACTORED ANIMATION TYPES DATA ====================

// ==================== TYPE DEFINITIONS ====================

/**
 * Animation scope types: แยกประเภท animation
 * - section: Animation applies to the entire section container
 * - element: Animation applies to child elements within the section
 * - interactive: Animation triggered by user interaction (hover, click, scroll)
 */
export type AnimationScope = "section" | "element" | "interactive";

/**
 * Animation trigger types: เมื่อไหร่ที่ animation ทำงาน
 * - scroll: Triggered when scrolling into view
 * - load: Triggered on page load
 * - hover: Triggered on mouse hover
 * - click: Triggered on click
 * - continuous: Runs continuously (loop)
 */
export type AnimationTrigger = "scroll" | "load" | "hover" | "click" | "continuous";

export interface AnimationDefinition {
  id: string;
  label: string;
  icon: string;
  description: string;
  scope: AnimationScope;
  trigger: AnimationTrigger;
  /** Tags for filtering/searching */
  tags?: string[];
}

export interface SectionAnimationConfig {
  /** Section-level animations */
  section: string[];
  /** Element-level animations (children) */
  element?: string[];
  /** Interactive animations (hover, click) */
  interactive?: string[];
}

// ==================== BASE ANIMATION LIBRARY ====================
// Deduplicated animation definitions

export const ANIMATION_LIBRARY: Record<string, AnimationDefinition> = {
  // ===== SECTION-LEVEL: FADE =====
  "fade-up": {
    id: "fade-up",
    label: "Fade Up",
    icon: "↑",
    description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง",
    scope: "section",
    trigger: "scroll",
    tags: ["fade", "entrance", "basic"],
  },
  "fade-in": {
    id: "fade-in",
    label: "Fade In",
    icon: "◔",
    description: "ค่อยๆ ปรากฏ",
    scope: "section",
    trigger: "scroll",
    tags: ["fade", "entrance", "basic"],
  },
  "fade-scale": {
    id: "fade-scale",
    label: "Fade Scale",
    icon: "⊡",
    description: "ปรากฏพร้อมขยาย",
    scope: "section",
    trigger: "scroll",
    tags: ["fade", "scale", "entrance"],
  },
  "blur-in": {
    id: "blur-in",
    label: "Blur In",
    icon: "◔",
    description: "จากเบลอเป็นชัด",
    scope: "section",
    trigger: "scroll",
    tags: ["fade", "blur", "entrance"],
  },

  // ===== SECTION-LEVEL: SCALE =====
  "scale-in": {
    id: "scale-in",
    label: "Scale In",
    icon: "⊡",
    description: "ขยายจากเล็กไปใหญ่",
    scope: "section",
    trigger: "scroll",
    tags: ["scale", "entrance", "basic"],
  },

  // ===== SECTION-LEVEL: SLIDE =====
  "slide-left": {
    id: "slide-left",
    label: "Slide Left",
    icon: "←",
    description: "เนื้อหาเลื่อนเข้าจากซ้าย",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "entrance", "horizontal"],
  },
  "slide-right": {
    id: "slide-right",
    label: "Slide Right",
    icon: "→",
    description: "เนื้อหาเลื่อนเข้าจากขวา",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "entrance", "horizontal"],
  },
  "slide-up": {
    id: "slide-up",
    label: "Slide Up",
    icon: "↑",
    description: "เนื้อหาเลื่อนขึ้นจากด้านล่าง",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "entrance", "vertical"],
  },
  "slide-opposite": {
    id: "slide-opposite",
    label: "Slide Opposite",
    icon: "↔",
    description: "ซ้ายขวาเลื่อนเข้าหากัน",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "entrance", "split"],
  },
  "slide-horizontal-left": {
    id: "slide-horizontal-left",
    label: "Slide H Left",
    icon: "←",
    description: "เลื่อนแนวนอนซ้าย",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "carousel"],
  },
  "slide-horizontal-right": {
    id: "slide-horizontal-right",
    label: "Slide H Right",
    icon: "→",
    description: "เลื่อนแนวนอนขวา",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "carousel"],
  },
  "slide-vertical": {
    id: "slide-vertical",
    label: "Slide V",
    icon: "↕",
    description: "เลื่อนแนวตั้ง",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "carousel"],
  },
  "slide-in": {
    id: "slide-in",
    label: "Slide In",
    icon: "↓",
    description: "เลื่อนเข้ามา",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "entrance"],
  },
  "slide-quote": {
    id: "slide-quote",
    label: "Slide Quote",
    icon: "❝",
    description: "คำพูดเลื่อนเข้ามา",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "testimonial"],
  },
  "slide-smooth": {
    id: "slide-smooth",
    label: "Slide Smooth",
    icon: "↔",
    description: "เลื่อนนุ่มนวล",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "carousel"],
  },
  "slide-horizontal": {
    id: "slide-horizontal",
    label: "Slide H",
    icon: "↔",
    description: "เลื่อนแนวนอน",
    scope: "section",
    trigger: "scroll",
    tags: ["slide", "carousel"],
  },
  "slide-switch": {
    id: "slide-switch",
    label: "Slide Switch",
    icon: "←→",
    description: "สลับแบบเลื่อน",
    scope: "section",
    trigger: "click",
    tags: ["slide", "switch", "tabs"],
  },
  "slide-expand": {
    id: "slide-expand",
    label: "Slide Expand",
    icon: "↕",
    description: "เลื่อนขยาย",
    scope: "element",
    trigger: "click",
    tags: ["slide", "accordion", "expand"],
  },

  // ===== SECTION-LEVEL: REVEAL & MASK =====
  "reveal-mask": {
    id: "reveal-mask",
    label: "Reveal Mask",
    icon: "▣",
    description: "เปิดเผยด้วย mask effect",
    scope: "section",
    trigger: "scroll",
    tags: ["reveal", "mask", "advanced"],
  },
  "clip-reveal": {
    id: "clip-reveal",
    label: "Clip Reveal",
    icon: "◲",
    description: "เปิดเผยด้วย clip-path",
    scope: "section",
    trigger: "scroll",
    tags: ["reveal", "clip", "advanced"],
  },
  "split-reveal": {
    id: "split-reveal",
    label: "Split Reveal",
    icon: "◰",
    description: "แยกเปิดจากกลาง",
    scope: "section",
    trigger: "scroll",
    tags: ["reveal", "split", "advanced"],
  },
  "scroll-reveal": {
    id: "scroll-reveal",
    label: "Scroll Reveal",
    icon: "↓",
    description: "เปิดเผยตาม scroll",
    scope: "section",
    trigger: "scroll",
    tags: ["reveal", "scroll", "parallax"],
  },

  // ===== SECTION-LEVEL: PARALLAX =====
  "parallax-bg": {
    id: "parallax-bg",
    label: "Parallax BG",
    icon: "≋",
    description: "พื้นหลังเคลื่อนที่ช้ากว่าเนื้อหา",
    scope: "section",
    trigger: "scroll",
    tags: ["parallax", "background", "scroll"],
  },
  "parallax-slow": {
    id: "parallax-slow",
    label: "Parallax Slow",
    icon: "≋",
    description: "เคลื่อนที่ช้า",
    scope: "section",
    trigger: "scroll",
    tags: ["parallax", "slow"],
  },
  "parallax-fast": {
    id: "parallax-fast",
    label: "Parallax Fast",
    icon: "≋≋",
    description: "เคลื่อนที่เร็ว",
    scope: "section",
    trigger: "scroll",
    tags: ["parallax", "fast"],
  },
  "parallax-cols": {
    id: "parallax-cols",
    label: "Parallax Cols",
    icon: "≋",
    description: "คอลัมน์เคลื่อนที่ความเร็วต่างกัน",
    scope: "element",
    trigger: "scroll",
    tags: ["parallax", "columns"],
  },
  "zoom-parallax": {
    id: "zoom-parallax",
    label: "Zoom Parallax",
    icon: "⊕≋",
    description: "ซูมพร้อม parallax",
    scope: "section",
    trigger: "scroll",
    tags: ["parallax", "zoom"],
  },

  // ===== SECTION-LEVEL: TEXT =====
  "text-reveal": {
    id: "text-reveal",
    label: "Text Reveal",
    icon: "Aa",
    description: "ตัวอักษรปรากฏทีละตัว",
    scope: "section",
    trigger: "scroll",
    tags: ["text", "reveal", "advanced"],
  },
  typewriter: {
    id: "typewriter",
    label: "Typewriter",
    icon: "⌨",
    description: "พิมพ์ทีละตัวอักษร",
    scope: "section",
    trigger: "scroll",
    tags: ["text", "typewriter", "advanced"],
  },
  "text-slide": {
    id: "text-slide",
    label: "Text Slide",
    icon: "Aa→",
    description: "ข้อความเลื่อนเข้า",
    scope: "element",
    trigger: "scroll",
    tags: ["text", "slide"],
  },

  // ===== SECTION-LEVEL: SPECIAL EFFECTS =====
  glitch: {
    id: "glitch",
    label: "Glitch Effect",
    icon: "▓",
    description: "เอฟเฟกต์ Glitch แบบ Digital",
    scope: "section",
    trigger: "scroll",
    tags: ["effect", "glitch", "advanced"],
  },
  "gradient-shift": {
    id: "gradient-shift",
    label: "Gradient Shift",
    icon: "◈",
    description: "สลับ Gradient",
    scope: "section",
    trigger: "continuous",
    tags: ["effect", "gradient", "background"],
  },

  // ===== ELEMENT-LEVEL: STAGGER =====
  "stagger-up": {
    id: "stagger-up",
    label: "Stagger Up",
    icon: "↑↑",
    description: "ปรากฏทีละอัน",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "entrance", "children"],
  },
  "fade-stagger": {
    id: "fade-stagger",
    label: "Fade Stagger",
    icon: "◔",
    description: "ปรากฏทีละส่วน",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "fade", "children"],
  },
  "fade-cascade": {
    id: "fade-cascade",
    label: "Fade Cascade",
    icon: "◔◔",
    description: "ค่อยๆ ปรากฏต่อเนื่อง",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "fade", "children"],
  },
  "scale-stagger": {
    id: "scale-stagger",
    label: "Scale Stagger",
    icon: "⊡⊡",
    description: "ขยายขึ้นทีละอัน",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "scale", "children"],
  },
  "wave-in": {
    id: "wave-in",
    label: "Wave In",
    icon: "∿",
    description: "เคลื่อนเข้ามาเป็นคลื่น",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "wave", "children"],
  },
  "rotate-in": {
    id: "rotate-in",
    label: "Rotate In",
    icon: "↻",
    description: "หมุนเข้ามาทีละอัน",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "rotate", "children"],
  },
  "pop-random": {
    id: "pop-random",
    label: "Pop Random",
    icon: "⊡?",
    description: "ป็อปขึ้นแบบสุ่มลำดับ",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "random", "children"],
  },
  "flip-in": {
    id: "flip-in",
    label: "Flip In",
    icon: "◰",
    description: "พลิกเข้ามาทีละอัน",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "flip", "3d", "children"],
  },
  "alternate-slide": {
    id: "alternate-slide",
    label: "Alternate Slide",
    icon: "↔",
    description: "เลื่อนสลับซ้ายขวา",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "slide", "children"],
  },
  "masonry-fade": {
    id: "masonry-fade",
    label: "Masonry Fade",
    icon: "▤",
    description: "รูปปรากฏแบบสุ่ม",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "masonry", "gallery"],
  },
  "grid-reveal": {
    id: "grid-reveal",
    label: "Grid Reveal",
    icon: "▦",
    description: "เปิดเผยทีละช่อง",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "grid", "gallery"],
  },
  "cards-stagger": {
    id: "cards-stagger",
    label: "Cards Stagger",
    icon: "▢▢▢",
    description: "การ์ดปรากฏทีละอัน",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "cards"],
  },
  "markers-stagger": {
    id: "markers-stagger",
    label: "Markers Stagger",
    icon: "📍📍📍",
    description: "Markers ปรากฏทีละอัน",
    scope: "element",
    trigger: "scroll",
    tags: ["stagger", "map", "markers"],
  },

  // ===== ELEMENT-LEVEL: SPECIAL ANIMATIONS =====
  "bounce-in": {
    id: "bounce-in",
    label: "Bounce In",
    icon: "⤴",
    description: "เด้งเข้ามา",
    scope: "element",
    trigger: "scroll",
    tags: ["bounce", "entrance"],
  },
  "icon-spin": {
    id: "icon-spin",
    label: "Icon Spin",
    icon: "↻",
    description: "Icon หมุนเมื่อปรากฏ",
    scope: "element",
    trigger: "scroll",
    tags: ["icon", "spin"],
  },
  "icon-bounce": {
    id: "icon-bounce",
    label: "Icon Bounce",
    icon: "◉⤴",
    description: "Icon เด้งเมื่อปรากฏ",
    scope: "element",
    trigger: "scroll",
    tags: ["icon", "bounce"],
  },
  "icon-animate": {
    id: "icon-animate",
    label: "Icon Animate",
    icon: "◉↻",
    description: "Icon เคลื่อนไหว",
    scope: "element",
    trigger: "scroll",
    tags: ["icon", "animate"],
  },
  "check-mark": {
    id: "check-mark",
    label: "Check Mark",
    icon: "✓",
    description: "เครื่องหมายถูกปรากฏ",
    scope: "element",
    trigger: "scroll",
    tags: ["check", "form", "list"],
  },
  "check-animate": {
    id: "check-animate",
    label: "Check Animate",
    icon: "✓",
    description: "เครื่องหมายถูกปรากฏ",
    scope: "element",
    trigger: "scroll",
    tags: ["check", "form", "pricing"],
  },
  "border-draw": {
    id: "border-draw",
    label: "Border Draw",
    icon: "◻",
    description: "วาดเส้นขอบรอบกล่อง",
    scope: "element",
    trigger: "scroll",
    tags: ["border", "draw", "advanced"],
  },
  "pop-scale": {
    id: "pop-scale",
    label: "Pop Scale",
    icon: "⊡",
    description: "ป็อปขึ้นพร้อมขยาย",
    scope: "element",
    trigger: "scroll",
    tags: ["pop", "scale"],
  },

  // ===== ELEMENT-LEVEL: COUNTER & STATS =====
  counter: {
    id: "counter",
    label: "Counter",
    icon: "123",
    description: "ตัวเลขนับขึ้น",
    scope: "element",
    trigger: "scroll",
    tags: ["counter", "stats", "number"],
  },
  "counter-fast": {
    id: "counter-fast",
    label: "Counter Fast",
    icon: "123↑",
    description: "นับเร็ว",
    scope: "element",
    trigger: "scroll",
    tags: ["counter", "stats", "fast"],
  },
  "counter-slow": {
    id: "counter-slow",
    label: "Counter Slow",
    icon: "123→",
    description: "นับช้าๆ",
    scope: "element",
    trigger: "scroll",
    tags: ["counter", "stats", "slow"],
  },
  "counter-bounce": {
    id: "counter-bounce",
    label: "Counter Bounce",
    icon: "123⤴",
    description: "นับแล้วเด้ง",
    scope: "element",
    trigger: "scroll",
    tags: ["counter", "stats", "bounce"],
  },
  odometer: {
    id: "odometer",
    label: "Odometer",
    icon: "⊡123",
    description: "แบบมิเตอร์รถ",
    scope: "element",
    trigger: "scroll",
    tags: ["counter", "stats", "odometer"],
  },
  "flip-number": {
    id: "flip-number",
    label: "Flip Number",
    icon: "↻",
    description: "พลิกตัวเลข",
    scope: "element",
    trigger: "scroll",
    tags: ["counter", "stats", "flip"],
  },
  "number-count": {
    id: "number-count",
    label: "Number Count",
    icon: "123",
    description: "ตัวเลขนับขึ้น",
    scope: "element",
    trigger: "scroll",
    tags: ["counter", "process"],
  },

  // ===== ELEMENT-LEVEL: PROGRESS & BARS =====
  "bar-grow": {
    id: "bar-grow",
    label: "Bar Grow",
    icon: "▐→",
    description: "แท่งขยาย",
    scope: "element",
    trigger: "scroll",
    tags: ["progress", "bar", "grow"],
  },
  "bar-striped": {
    id: "bar-striped",
    label: "Bar Striped",
    icon: "▐▒",
    description: "แท่งลายทาง",
    scope: "element",
    trigger: "scroll",
    tags: ["progress", "bar", "striped"],
  },
  "bar-animated": {
    id: "bar-animated",
    label: "Bar Animated",
    icon: "▐∿",
    description: "แท่งเคลื่อนไหว",
    scope: "element",
    trigger: "continuous",
    tags: ["progress", "bar", "animated"],
  },
  "bar-stagger": {
    id: "bar-stagger",
    label: "Bar Stagger",
    icon: "▐▐▐",
    description: "แท่งปรากฏทีละอัน",
    scope: "element",
    trigger: "scroll",
    tags: ["progress", "bar", "stagger"],
  },
  "circular-progress": {
    id: "circular-progress",
    label: "Circular",
    icon: "◔",
    description: "Progress วงกลม",
    scope: "element",
    trigger: "scroll",
    tags: ["progress", "circular"],
  },

  // ===== ELEMENT-LEVEL: CHARTS =====
  "draw-line": {
    id: "draw-line",
    label: "Draw Line",
    icon: "📈",
    description: "วาดเส้นกราฟ",
    scope: "element",
    trigger: "scroll",
    tags: ["chart", "line", "draw"],
  },
  "pie-reveal": {
    id: "pie-reveal",
    label: "Pie Reveal",
    icon: "◔→◉",
    description: "วงกลมเปิดเผย",
    scope: "element",
    trigger: "scroll",
    tags: ["chart", "pie"],
  },
  "data-points": {
    id: "data-points",
    label: "Data Points",
    icon: "●●●",
    description: "จุดข้อมูลปรากฏ",
    scope: "element",
    trigger: "scroll",
    tags: ["chart", "points"],
  },

  // ===== ELEMENT-LEVEL: TIMELINE & PROCESS =====
  "line-draw": {
    id: "line-draw",
    label: "Line Draw",
    icon: "⊸",
    description: "วาดเส้น Timeline",
    scope: "element",
    trigger: "scroll",
    tags: ["timeline", "draw", "line"],
  },
  "point-pop": {
    id: "point-pop",
    label: "Point Pop",
    icon: "●↑",
    description: "จุดป็อปขึ้นทีละจุด",
    scope: "element",
    trigger: "scroll",
    tags: ["timeline", "point", "pop"],
  },
  "scroll-progress": {
    id: "scroll-progress",
    label: "Scroll Progress",
    icon: "↓",
    description: "แสดงตาม scroll",
    scope: "element",
    trigger: "scroll",
    tags: ["timeline", "progress", "scroll"],
  },
  "step-progress": {
    id: "step-progress",
    label: "Step Progress",
    icon: "①②③",
    description: "ไฮไลท์ทีละขั้นตอน",
    scope: "element",
    trigger: "scroll",
    tags: ["process", "step", "progress"],
  },
  "connector-draw": {
    id: "connector-draw",
    label: "Connector Draw",
    icon: "→→",
    description: "วาดเส้นเชื่อม",
    scope: "element",
    trigger: "scroll",
    tags: ["process", "connector", "draw"],
  },
  "milestone-pop": {
    id: "milestone-pop",
    label: "Milestone Pop",
    icon: "●↑",
    description: "Milestone ป็อปขึ้น",
    scope: "element",
    trigger: "scroll",
    tags: ["timeline", "milestone", "pop"],
  },
  "path-draw": {
    id: "path-draw",
    label: "Path Draw",
    icon: "⊸⊸",
    description: "วาดเส้นทาง",
    scope: "element",
    trigger: "scroll",
    tags: ["roadmap", "path", "draw"],
  },

  // ===== INTERACTIVE: HOVER =====
  "hover-lift": {
    id: "hover-lift",
    label: "Hover Lift",
    icon: "⤴",
    description: "ยกขึ้นเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "lift", "card"],
  },
  "hover-info": {
    id: "hover-info",
    label: "Hover Info",
    icon: "◐",
    description: "แสดงข้อมูลเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "info", "team"],
  },
  "hover-highlight": {
    id: "hover-highlight",
    label: "Hover Highlight",
    icon: "◐",
    description: "ไฮไลท์เมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "highlight"],
  },
  "zoom-hover": {
    id: "zoom-hover",
    label: "Zoom Hover",
    icon: "⊕",
    description: "ซูมเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "zoom", "gallery"],
  },
  "zoom-img": {
    id: "zoom-img",
    label: "Zoom Image",
    icon: "⊕",
    description: "รูปซูมเข้าเมื่อ scroll ถึง",
    scope: "section",
    trigger: "scroll",
    tags: ["zoom", "image"],
  },
  "image-zoom": {
    id: "image-zoom",
    label: "Image Zoom",
    icon: "⊕",
    description: "รูปซูมเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "zoom", "image"],
  },
  "scale-hover": {
    id: "scale-hover",
    label: "Scale Hover",
    icon: "⊡",
    description: "ขยายเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "scale"],
  },
  "card-hover": {
    id: "card-hover",
    label: "Card Hover",
    icon: "▢↑",
    description: "การ์ดยกขึ้นเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "card", "lift"],
  },
  "card-flip": {
    id: "card-flip",
    label: "Card Flip",
    icon: "◰",
    description: "พลิกการ์ดแสดงข้อมูล",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "card", "flip", "3d"],
  },
  "overlay-slide": {
    id: "overlay-slide",
    label: "Overlay Slide",
    icon: "▣↑",
    description: "Overlay เลื่อนขึ้นเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "overlay", "gallery"],
  },
  "image-overlay": {
    id: "image-overlay",
    label: "Image Overlay",
    icon: "▣",
    description: "Overlay ปรากฏเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "overlay", "image"],
  },
  "overlay-reveal": {
    id: "overlay-reveal",
    label: "Overlay Reveal",
    icon: "▣",
    description: "Overlay ปรากฏ",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "overlay"],
  },
  "social-reveal": {
    id: "social-reveal",
    label: "Social Reveal",
    icon: "◎◎",
    description: "Social icons ปรากฏเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "social", "team"],
  },
  "image-grayscale": {
    id: "image-grayscale",
    label: "Grayscale",
    icon: "◐→◉",
    description: "รูปขาวดำเป็นสีเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "grayscale", "team"],
  },
  "grayscale-color": {
    id: "grayscale-color",
    label: "Grayscale→Color",
    icon: "◐→◉",
    description: "ขาวดำเป็นสีเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "grayscale", "logos"],
  },
  "row-highlight": {
    id: "row-highlight",
    label: "Row Highlight",
    icon: "▬",
    description: "ไฮไลท์แถวเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "highlight", "table"],
  },
  "tilt-3d": {
    id: "tilt-3d",
    label: "3D Tilt",
    icon: "◰",
    description: "เอียง 3D เมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "3d", "tilt"],
  },
  "app-store-hover": {
    id: "app-store-hover",
    label: "Store Hover",
    icon: "▢↑",
    description: "ปุ่ม Store มี hover effect",
    scope: "interactive",
    trigger: "hover",
    tags: ["hover", "button", "download"],
  },

  // ===== INTERACTIVE: CTA & BUTTONS =====
  pulse: {
    id: "pulse",
    label: "Pulse",
    icon: "◉",
    description: "เต้นเป็นจังหวะ",
    scope: "interactive",
    trigger: "scroll",
    tags: ["cta", "pulse", "attention"],
  },
  glow: {
    id: "glow",
    label: "Glow Effect",
    icon: "✦",
    description: "เรืองแสงเมื่อ hover",
    scope: "interactive",
    trigger: "hover",
    tags: ["cta", "glow", "attention"],
  },
  bounce: {
    id: "bounce",
    label: "Bounce",
    icon: "⤴",
    description: "เด้งขึ้นลง",
    scope: "interactive",
    trigger: "scroll",
    tags: ["cta", "bounce", "attention"],
  },
  shake: {
    id: "shake",
    label: "Shake",
    icon: "↔",
    description: "สั่นเรียกความสนใจ",
    scope: "interactive",
    trigger: "scroll",
    tags: ["cta", "shake", "attention"],
  },
  ripple: {
    id: "ripple",
    label: "Ripple",
    icon: "◎",
    description: "คลื่นกระจายเมื่อคลิก",
    scope: "interactive",
    trigger: "click",
    tags: ["cta", "ripple", "click"],
  },
  "button-attention": {
    id: "button-attention",
    label: "Button Attention",
    icon: "◉⤴",
    description: "ปุ่มเรียกความสนใจ",
    scope: "interactive",
    trigger: "scroll",
    tags: ["cta", "button", "attention"],
  },
  "attention-grab": {
    id: "attention-grab",
    label: "Attention Grab",
    icon: "◉",
    description: "เรียกความสนใจ",
    scope: "interactive",
    trigger: "scroll",
    tags: ["cta", "attention"],
  },
  "urgency-shake": {
    id: "urgency-shake",
    label: "Urgency Shake",
    icon: "↔!",
    description: "สั่นสร้าง urgency",
    scope: "interactive",
    trigger: "scroll",
    tags: ["cta", "shake", "urgency"],
  },

  // ===== INTERACTIVE: SWITCH & TOGGLE =====
  "fade-switch": {
    id: "fade-switch",
    label: "Fade Switch",
    icon: "◔↔",
    description: "สลับแบบ Fade",
    scope: "interactive",
    trigger: "click",
    tags: ["switch", "fade", "tabs"],
  },
  "flip-switch": {
    id: "flip-switch",
    label: "Flip Switch",
    icon: "◰↔",
    description: "สลับแบบพลิก",
    scope: "interactive",
    trigger: "click",
    tags: ["switch", "flip", "tabs"],
  },
  "tab-indicator": {
    id: "tab-indicator",
    label: "Tab Indicator",
    icon: "▬",
    description: "Indicator เลื่อนไปที่ active",
    scope: "interactive",
    trigger: "click",
    tags: ["tabs", "indicator"],
  },
  "tab-switch": {
    id: "tab-switch",
    label: "Tab Switch",
    icon: "⊟↔",
    description: "สลับ Tab หมวดหมู่",
    scope: "interactive",
    trigger: "click",
    tags: ["tabs", "switch"],
  },
  accordion: {
    id: "accordion",
    label: "Accordion",
    icon: "≡",
    description: "พับ/กางแบบ accordion",
    scope: "interactive",
    trigger: "click",
    tags: ["accordion", "expand"],
  },
  "icon-rotate": {
    id: "icon-rotate",
    label: "Icon Rotate",
    icon: "↻",
    description: "Icon หมุนเมื่อเปิด",
    scope: "interactive",
    trigger: "click",
    tags: ["accordion", "icon", "rotate"],
  },
  "plus-rotate": {
    id: "plus-rotate",
    label: "Plus Rotate",
    icon: "+↻",
    description: "+ หมุนเป็น × เมื่อเปิด",
    scope: "interactive",
    trigger: "click",
    tags: ["accordion", "plus", "rotate"],
  },
  "rotate-arrow": {
    id: "rotate-arrow",
    label: "Rotate Arrow",
    icon: "↻",
    description: "ลูกศรหมุนเมื่อเปิด",
    scope: "interactive",
    trigger: "click",
    tags: ["accordion", "arrow", "rotate"],
  },
  highlight: {
    id: "highlight",
    label: "Highlight",
    icon: "◐",
    description: "ไฮไลท์คำถามที่เปิด",
    scope: "interactive",
    trigger: "click",
    tags: ["faq", "highlight"],
  },
  "fade-content": {
    id: "fade-content",
    label: "Fade Content",
    icon: "◔",
    description: "เนื้อหาค่อยๆ ปรากฏ",
    scope: "element",
    trigger: "click",
    tags: ["accordion", "fade"],
  },

  // ===== INTERACTIVE: FORM =====
  "input-animate": {
    id: "input-animate",
    label: "Input Animate",
    icon: "▢",
    description: "Input มี animation",
    scope: "interactive",
    trigger: "hover",
    tags: ["form", "input"],
  },
  "input-focus": {
    id: "input-focus",
    label: "Input Focus",
    icon: "▢→",
    description: "Input มีเอฟเฟกต์เมื่อ focus",
    scope: "interactive",
    trigger: "click",
    tags: ["form", "input", "focus"],
  },
  "label-float": {
    id: "label-float",
    label: "Label Float",
    icon: "Aa↑",
    description: "Label ลอยขึ้นเมื่อ focus",
    scope: "interactive",
    trigger: "click",
    tags: ["form", "label", "float"],
  },
  "submit-loading": {
    id: "submit-loading",
    label: "Submit Loading",
    icon: "◔→✓",
    description: "ปุ่มแสดง loading",
    scope: "interactive",
    trigger: "click",
    tags: ["form", "button", "loading"],
  },
  "input-validate": {
    id: "input-validate",
    label: "Input Validate",
    icon: "▢✓",
    description: "แสดงผล validate",
    scope: "interactive",
    trigger: "click",
    tags: ["form", "input", "validate"],
  },
  "button-success": {
    id: "button-success",
    label: "Button Success",
    icon: "✓",
    description: "ปุ่มเปลี่ยนเมื่อสำเร็จ",
    scope: "interactive",
    trigger: "click",
    tags: ["form", "button", "success"],
  },
  countdown: {
    id: "countdown",
    label: "Countdown",
    icon: "321",
    description: "นับถอยหลัง",
    scope: "element",
    trigger: "scroll",
    tags: ["countdown", "urgency"],
  },
  "search-highlight": {
    id: "search-highlight",
    label: "Search Highlight",
    icon: "🔍",
    description: "ไฮไลท์ผลค้นหา",
    scope: "interactive",
    trigger: "click",
    tags: ["search", "highlight"],
  },
  "filter-instant": {
    id: "filter-instant",
    label: "Filter Instant",
    icon: "↻",
    description: "กรองทันที",
    scope: "interactive",
    trigger: "click",
    tags: ["filter", "instant"],
  },
  "filter-fade": {
    id: "filter-fade",
    label: "Filter Fade",
    icon: "◔",
    description: "Fade เมื่อ filter",
    scope: "interactive",
    trigger: "click",
    tags: ["filter", "fade"],
  },
  "scale-filter": {
    id: "scale-filter",
    label: "Scale Filter",
    icon: "⊡",
    description: "ขยาย/หดเมื่อ filter",
    scope: "interactive",
    trigger: "click",
    tags: ["filter", "scale"],
  },
  "no-result-shake": {
    id: "no-result-shake",
    label: "No Result",
    icon: "↔",
    description: "สั่นเมื่อไม่พบ",
    scope: "interactive",
    trigger: "click",
    tags: ["search", "shake", "error"],
  },
  shuffle: {
    id: "shuffle",
    label: "Shuffle",
    icon: "⇆",
    description: "สลับตำแหน่งเมื่อ filter",
    scope: "interactive",
    trigger: "click",
    tags: ["filter", "shuffle", "gallery"],
  },

  // ===== CAROUSEL & SLIDER =====
  "fade-carousel": {
    id: "fade-carousel",
    label: "Fade",
    icon: "◔",
    description: "สลับแบบ Fade",
    scope: "section",
    trigger: "click",
    tags: ["carousel", "fade"],
  },
  cube: {
    id: "cube",
    label: "Cube Effect",
    icon: "◰",
    description: "หมุนแบบลูกบาศก์",
    scope: "section",
    trigger: "click",
    tags: ["carousel", "cube", "3d"],
  },
  coverflow: {
    id: "coverflow",
    label: "Coverflow",
    icon: "◧◰◨",
    description: "เอฟเฟกต์ Coverflow",
    scope: "section",
    trigger: "click",
    tags: ["carousel", "coverflow", "3d"],
  },
  "cards-stack": {
    id: "cards-stack",
    label: "Cards Stack",
    icon: "▢▢▢",
    description: "การ์ดซ้อนกัน",
    scope: "section",
    trigger: "click",
    tags: ["carousel", "cards", "stack"],
  },
  "center-scale": {
    id: "center-scale",
    label: "Center Scale",
    icon: "⊡",
    description: "ขยายตรงกลาง",
    scope: "section",
    trigger: "click",
    tags: ["carousel", "scale", "center"],
  },
  "fade-slide-left": {
    id: "fade-slide-left",
    label: "Fade Slide Left",
    icon: "◔ ←",
    description: "Fade พร้อมเลื่อน ซ้าย",
    scope: "section",
    trigger: "click",
    tags: ["carousel", "fade", "slide"],
  },
  "fade-slide-right": {
    id: "fade-slide-right",
    label: "Fade Slide Right",
    icon: "◔ →",
    description: "Fade พร้อมเลื่อน ขวา",
    scope: "section",
    trigger: "click",
    tags: ["carousel", "fade", "slide"],
  },
  "fade-slide": {
    id: "fade-slide",
    label: "Fade Slide",
    icon: "◔↔",
    description: "Fade พร้อมเลื่อน",
    scope: "section",
    trigger: "click",
    tags: ["carousel", "fade", "slide"],
  },

  // ===== MARQUEE =====
  "marquee-smooth": {
    id: "marquee-smooth",
    label: "Marquee Smooth",
    icon: "→→",
    description: "เลื่อนต่อเนื่อง",
    scope: "element",
    trigger: "continuous",
    tags: ["marquee", "continuous"],
  },
  "marquee-pause": {
    id: "marquee-pause",
    label: "Marquee Pause",
    icon: "→‖",
    description: "หยุดเมื่อ hover",
    scope: "element",
    trigger: "continuous",
    tags: ["marquee", "hover", "pause"],
  },
  "marquee-reverse": {
    id: "marquee-reverse",
    label: "Marquee Reverse",
    icon: "←→",
    description: "สลับทิศทาง",
    scope: "element",
    trigger: "continuous",
    tags: ["marquee", "reverse"],
  },

  // ===== LIGHTBOX =====
  lightbox: {
    id: "lightbox",
    label: "Lightbox",
    icon: "◳",
    description: "เปิดดูเต็มจอเมื่อคลิก",
    scope: "interactive",
    trigger: "click",
    tags: ["lightbox", "gallery"],
  },
  "lightbox-zoom": {
    id: "lightbox-zoom",
    label: "Lightbox Zoom",
    icon: "⊕",
    description: "ซูมเข้า Lightbox",
    scope: "interactive",
    trigger: "click",
    tags: ["lightbox", "zoom"],
  },
  "lightbox-fade": {
    id: "lightbox-fade",
    label: "Lightbox Fade",
    icon: "◔◳",
    description: "Lightbox แบบ Fade",
    scope: "interactive",
    trigger: "click",
    tags: ["lightbox", "fade"],
  },

  // ===== MAP =====
  "marker-drop": {
    id: "marker-drop",
    label: "Marker Drop",
    icon: "📍↓",
    description: "Marker ตกลงมา",
    scope: "element",
    trigger: "scroll",
    tags: ["map", "marker", "drop"],
  },
  "zoom-in": {
    id: "zoom-in",
    label: "Zoom In",
    icon: "⊕",
    description: "ซูมเข้า",
    scope: "section",
    trigger: "scroll",
    tags: ["map", "zoom"],
  },
  "map-pan": {
    id: "map-pan",
    label: "Map Pan",
    icon: "🗺↔",
    description: "แผนที่เลื่อนไปที่เลือก",
    scope: "interactive",
    trigger: "click",
    tags: ["map", "pan"],
  },
  "map-animate": {
    id: "map-animate",
    label: "Map Animate",
    icon: "🗺↑",
    description: "แผนที่มี animation",
    scope: "section",
    trigger: "scroll",
    tags: ["map", "animate"],
  },
  "info-reveal": {
    id: "info-reveal",
    label: "Info Reveal",
    icon: "◐",
    description: "ข้อมูลปรากฏทีละส่วน",
    scope: "element",
    trigger: "scroll",
    tags: ["map", "info", "reveal"],
  },

  // ===== DIVIDER & DECORATIVE =====
  "wave-flow": {
    id: "wave-flow",
    label: "Wave Flow",
    icon: "∿",
    description: "คลื่นไหล",
    scope: "section",
    trigger: "continuous",
    tags: ["wave", "decorative", "continuous"],
  },
  "wave-morph": {
    id: "wave-morph",
    label: "Wave Morph",
    icon: "∿↔",
    description: "คลื่นเปลี่ยนรูป",
    scope: "section",
    trigger: "continuous",
    tags: ["wave", "decorative", "morph"],
  },

  // ===== VIDEO =====
  "play-button-pulse": {
    id: "play-button-pulse",
    label: "Play Pulse",
    icon: "▶◉",
    description: "ปุ่ม Play เต้น",
    scope: "element",
    trigger: "continuous",
    tags: ["video", "play", "pulse"],
  },
  "fade-in-video": {
    id: "fade-in-video",
    label: "Fade In",
    icon: "◔▶",
    description: "วิดีโอค่อยๆ ปรากฏ",
    scope: "section",
    trigger: "scroll",
    tags: ["video", "fade"],
  },
  "scale-video": {
    id: "scale-video",
    label: "Scale Video",
    icon: "⊡▶",
    description: "วิดีโอขยายขึ้น",
    scope: "section",
    trigger: "scroll",
    tags: ["video", "scale"],
  },
  "fade-overlay": {
    id: "fade-overlay",
    label: "Fade Overlay",
    icon: "◔",
    description: "Overlay ค่อยๆ จางลง",
    scope: "section",
    trigger: "scroll",
    tags: ["video", "overlay", "fade"],
  },
  "text-over-video": {
    id: "text-over-video",
    label: "Text Over",
    icon: "Aa▶",
    description: "ข้อความปรากฏเหนือวิดีโอ",
    scope: "element",
    trigger: "scroll",
    tags: ["video", "text"],
  },
  "zoom-pan": {
    id: "zoom-pan",
    label: "Zoom Pan",
    icon: "⊕",
    description: "ซูมและเลื่อนรูป",
    scope: "section",
    trigger: "scroll",
    tags: ["hero", "zoom", "pan"],
  },

  // ===== PRICING =====
  "highlight-popular": {
    id: "highlight-popular",
    label: "Highlight Popular",
    icon: "★",
    description: "ไฮไลท์ตัวเลือกยอดนิยม",
    scope: "element",
    trigger: "scroll",
    tags: ["pricing", "highlight"],
  },
  "scale-featured": {
    id: "scale-featured",
    label: "Scale Featured",
    icon: "⊡",
    description: "ขยายตัวเลือกแนะนำ",
    scope: "element",
    trigger: "scroll",
    tags: ["pricing", "scale", "featured"],
  },
  "price-morph": {
    id: "price-morph",
    label: "Price Morph",
    icon: "123↔",
    description: "ตัวเลขเปลี่ยนนุ่มนวล",
    scope: "element",
    trigger: "click",
    tags: ["pricing", "morph", "number"],
  },

  // ===== TESTIMONIAL =====
  "fade-rotate": {
    id: "fade-rotate",
    label: "Fade Rotate",
    icon: "↻",
    description: "หมุนสลับรีวิว",
    scope: "section",
    trigger: "scroll",
    tags: ["testimonial", "rotate"],
  },
  "quote-mark-animate": {
    id: "quote-mark-animate",
    label: "Quote Animate",
    icon: "❝↑",
    description: "เครื่องหมายคำพูดเคลื่อนไหว",
    scope: "element",
    trigger: "scroll",
    tags: ["testimonial", "quote"],
  },

  // ===== COMPARISON =====
  "slider-smooth": {
    id: "slider-smooth",
    label: "Slider Smooth",
    icon: "↔",
    description: "เลื่อนนุ่มนวล",
    scope: "interactive",
    trigger: "click",
    tags: ["comparison", "slider"],
  },
  "reveal-drag": {
    id: "reveal-drag",
    label: "Reveal Drag",
    icon: "◧↔◨",
    description: "เปิดเผยตามการลาก",
    scope: "interactive",
    trigger: "click",
    tags: ["comparison", "drag"],
  },
  "label-follow": {
    id: "label-follow",
    label: "Label Follow",
    icon: "Aa↔",
    description: "Label ติดตาม slider",
    scope: "interactive",
    trigger: "click",
    tags: ["comparison", "label"],
  },

  // ===== LOAD MORE =====
  "load-more": {
    id: "load-more",
    label: "Load More",
    icon: "↓+",
    description: "โหลดเพิ่มเมื่อ scroll",
    scope: "element",
    trigger: "scroll",
    tags: ["load", "infinite"],
  },

  // ===== NO ANIMATION =====
  none: {
    id: "none",
    label: "No Animation",
    icon: "○",
    description: "ไม่มี animation",
    scope: "section",
    trigger: "load",
    tags: ["none"],
  },

  // ===== PARTICLES =====
  "particles-float": {
    id: "particles-float",
    label: "Particles Float",
    icon: "✦↑",
    description: "อนุภาคลอยขึ้น",
    scope: "section",
    trigger: "scroll",
    tags: ["particles", "float", "hero"],
  },
  "particles-connect": {
    id: "particles-connect",
    label: "Particles Connect",
    icon: "✦─✦",
    description: "อนุภาคเชื่อมต่อกัน",
    scope: "section",
    trigger: "scroll",
    tags: ["particles", "connect", "hero"],
  },
};

// ==================== ANIMATION PRESETS BY CATEGORY ====================
// Grouped animations for easy selection

export const ANIMATION_PRESETS = {
  // Common entrance animations for any section
  entrance: {
    section: ["fade-up", "fade-in", "scale-in", "slide-left", "slide-right", "blur-in"],
    element: ["stagger-up", "fade-stagger", "fade-cascade"],
  },
  // For hero sections
  hero: {
    section: ["fade-up", "scale-in", "parallax-bg", "text-reveal", "split-reveal", "typewriter", "glitch", "particles-float", "particles-connect"],
    element: ["fade-stagger"],
  },
  // For split layouts (text-image, image-text)
  split: {
    section: ["fade-up", "slide-opposite", "reveal-mask", "zoom-pan"],
    element: ["fade-stagger", "clip-reveal", "zoom-img", "tilt-3d"],
  },
  // For column layouts
  columns: {
    section: ["fade-up"],
    element: ["stagger-up", "flip-in", "scale-stagger", "wave-in", "rotate-in", "pop-random", "fade-cascade"],
  },
  // For grids and galleries
  grid: {
    section: ["fade-up"],
    element: ["masonry-fade", "grid-reveal", "stagger-up", "scale-stagger"],
    interactive: ["zoom-hover", "overlay-slide", "lightbox", "hover-lift"],
  },
  // For carousels and sliders
  carousel: {
    section: ["fade-up", "slide-smooth", "fade-carousel", "cube", "coverflow", "cards-stack"],
    element: ["fade-slide-left", "fade-slide-right", "center-scale"],
  },
  // For stats and counters
  stats: {
    section: ["fade-up"],
    element: ["counter", "counter-fast", "counter-slow", "counter-bounce", "odometer", "bar-grow", "flip-number", "pop-scale"],
  },
  // For progress bars and charts
  data: {
    section: ["fade-up"],
    element: ["bar-grow", "bar-striped", "bar-animated", "bar-stagger", "circular-progress", "draw-line", "pie-reveal", "data-points"],
  },
  // For pricing tables
  pricing: {
    section: ["fade-up"],
    element: ["stagger-up", "highlight-popular", "scale-featured"],
    interactive: ["hover-lift", "fade-switch", "price-morph"],
  },
  // For CTAs
  cta: {
    section: ["fade-up", "gradient-shift"],
    element: [],
    interactive: ["pulse", "glow", "bounce", "shake", "ripple", "button-attention"],
  },
  // For forms
  form: {
    section: ["fade-up"],
    element: ["fade-stagger", "step-progress"],
    interactive: ["input-animate", "input-focus", "label-float", "submit-loading", "input-validate", "button-success"],
  },
  // For FAQ and accordions
  faq: {
    section: ["fade-up"],
    element: ["fade-stagger"],
    interactive: ["accordion", "slide-expand", "fade-content", "highlight", "plus-rotate", "icon-rotate"],
  },
  // For tabs
  tabs: {
    section: ["fade-up"],
    element: [],
    interactive: ["fade-switch", "slide-switch", "tab-indicator", "flip-switch"],
  },
  // For team sections
  team: {
    section: ["fade-up"],
    element: ["stagger-up"],
    interactive: ["hover-info", "social-reveal", "image-grayscale", "card-flip", "hover-lift"],
  },
  // For timeline and process
  timeline: {
    section: ["fade-up"],
    element: ["line-draw", "point-pop", "fade-stagger", "scroll-progress", "step-progress", "connector-draw", "number-count", "milestone-pop", "path-draw"],
  },
  // For testimonials
  testimonial: {
    section: ["fade-up", "fade-rotate"],
    element: ["slide-quote", "typewriter", "quote-mark-animate"],
    interactive: ["card-flip", "fade-carousel", "slide-smooth", "cards-stack"],
  },
  // For logos
  logos: {
    section: ["fade-up"],
    element: ["fade-stagger", "marquee-smooth", "marquee-pause", "marquee-reverse"],
    interactive: ["grayscale-color", "scale-hover"],
  },
  // For maps
  map: {
    section: ["fade-in", "zoom-in", "map-animate"],
    element: ["marker-drop", "markers-stagger", "info-reveal"],
    interactive: ["map-pan"],
  },
  // For blog and news
  blog: {
    section: ["fade-up", "scale-in"],
    element: ["stagger-up", "fade-stagger"],
    interactive: ["hover-lift", "image-zoom", "hover-highlight", "overlay-reveal", "load-more"],
  },
  // For dividers
  divider: {
    section: ["fade-in", "wave-flow", "wave-morph", "parallax-slow", "parallax-fast", "zoom-parallax", "none"],
  },
  // For video sections
  video: {
    section: ["fade-up", "fade-in-video", "scale-video", "fade-overlay"],
    element: ["play-button-pulse", "text-over-video"],
  },
};

// ==================== SECTION ANIMATIONS (Refactored) ====================
// Maps section layout IDs to their available animations using presets

export const SECTION_ANIMATIONS_CONFIG: Record<string, SectionAnimationConfig> = {
  // ===== HERO SECTIONS =====
  hero: {
    section: ANIMATION_PRESETS.hero.section,
    element: ANIMATION_PRESETS.hero.element,
  },
  "hero-split": {
    section: ["fade-up", "slide-opposite", "fade-stagger", "reveal-mask", "zoom-pan"],
    element: ["fade-stagger"],
  },
  "hero-video": {
    section: ["fade-up", "fade-overlay", "text-over-video"],
    element: [],
  },
  "hero-slider": {
    section: ["fade-up", "slide-horizontal-left", "slide-horizontal-right", "slide-vertical", "fade-slide-left", "fade-slide-right", "cube", "coverflow"],
    element: [],
  },

  // ===== CONTENT SECTIONS =====
  "text-image": {
    section: ["fade-up", "slide-left", "slide-right", "reveal-mask", "clip-reveal"],
    element: ["fade-stagger", "zoom-img"],
    interactive: ["tilt-3d"],
  },
  "image-text": {
    section: ["fade-up", "slide-right", "slide-left", "reveal-mask", "clip-reveal"],
    element: ["fade-stagger", "zoom-img"],
    interactive: ["tilt-3d"],
  },
  zigzag: {
    section: ["fade-up", "scroll-reveal"],
    element: ["alternate-slide", "fade-stagger"],
  },
  "text-center": {
    section: ["fade-up", "text-reveal", "blur-in"],
    element: [],
  },
  "quote-block": {
    section: ["fade-up", "fade-scale"],
    element: ["slide-quote", "typewriter"],
  },

  // ===== COLUMN LAYOUTS =====
  "two-cols": {
    section: ["fade-up"],
    element: ["stagger-up", "slide-opposite", "fade-cascade"],
  },
  "three-cols": {
    section: ["fade-up"],
    element: ["stagger-up", "flip-in", "scale-stagger", "fade-cascade", "rotate-in"],
  },
  "four-cols": {
    section: ["fade-up"],
    element: ["stagger-up", "wave-in", "scale-stagger", "rotate-in", "pop-random"],
  },
  asymmetric: {
    section: ["fade-up", "slide-opposite"],
    element: ["scale-stagger", "parallax-cols"],
  },

  // ===== FEATURE SECTIONS =====
  "features-grid": {
    section: ["fade-up"],
    element: ["stagger-up", "scale-stagger", "flip-in", "bounce-in", "icon-spin"],
  },
  "features-list": {
    section: ["fade-up"],
    element: ["slide-right", "fade-stagger", "check-mark"],
  },
  "features-tabs": {
    section: ["fade-up"],
    element: [],
    interactive: ["fade-switch", "slide-switch", "flip-switch"],
  },
  "features-accordion": {
    section: ["fade-up"],
    element: [],
    interactive: ["accordion", "slide-expand", "rotate-arrow"],
  },
  "icon-boxes": {
    section: ["fade-up"],
    element: ["stagger-up", "icon-bounce", "border-draw"],
    interactive: ["hover-lift"],
  },

  // ===== GALLERY & MEDIA =====
  gallery: {
    section: ["fade-up"],
    element: ["masonry-fade", "grid-reveal"],
    interactive: ["zoom-hover", "lightbox", "overlay-slide"],
  },
  "gallery-masonry": {
    section: ["fade-up"],
    element: ["masonry-fade", "load-more"],
    interactive: ["shuffle"],
  },
  carousel: {
    section: ["fade-up", "slide-smooth", "fade-carousel", "coverflow", "cards-stack"],
    element: [],
  },
  "video-section": {
    section: ["fade-up", "fade-in-video", "scale-video"],
    element: ["play-button-pulse"],
  },
  "lightbox-gallery": {
    section: ["fade-up"],
    element: ["grid-reveal"],
    interactive: ["lightbox-zoom", "lightbox-fade"],
  },

  // ===== SOCIAL PROOF =====
  testimonial: {
    section: ["fade-up", "fade-rotate"],
    element: ["slide-quote", "typewriter", "quote-mark-animate"],
    interactive: ["card-flip"],
  },
  "testimonial-slider": {
    section: ["fade-up", "slide-horizontal", "fade-slide", "cards-stack"],
    element: [],
  },
  "testimonial-grid": {
    section: ["fade-up"],
    element: ["stagger-up", "quote-mark-animate"],
    interactive: ["hover-lift"],
  },
  logos: {
    section: ["fade-up"],
    element: ["fade-stagger"],
    interactive: ["grayscale-color", "scale-hover"],
  },
  "logos-scroll": {
    section: ["fade-up"],
    element: ["marquee-smooth", "marquee-pause", "marquee-reverse"],
  },
  "case-studies": {
    section: ["fade-up"],
    element: ["stagger-up"],
    interactive: ["card-hover", "image-overlay"],
  },

  // ===== DATA & STATS =====
  stats: {
    section: ["fade-up"],
    element: ["counter", "bar-grow", "flip-number", "pop-scale"],
  },
  "stats-counter": {
    section: ["fade-up"],
    element: ["counter-fast", "counter-slow", "counter-bounce", "odometer"],
  },
  "progress-bars": {
    section: ["fade-up"],
    element: ["bar-grow", "bar-striped", "bar-animated", "circular-progress"],
  },
  charts: {
    section: ["fade-up"],
    element: ["draw-line", "bar-stagger", "pie-reveal", "data-points"],
  },

  // ===== PRICING =====
  pricing: {
    section: ["fade-up"],
    element: ["stagger-up", "highlight-popular", "scale-featured"],
    interactive: ["hover-lift"],
  },
  "pricing-toggle": {
    section: ["fade-up"],
    element: ["price-morph"],
    interactive: ["fade-switch", "slide-switch"],
  },
  "pricing-comparison": {
    section: ["fade-up"],
    element: ["fade-stagger", "check-animate"],
    interactive: ["row-highlight"],
  },

  // ===== CTA & CONVERSION =====
  cta: {
    section: ["fade-up", "gradient-shift"],
    element: [],
    interactive: ["pulse", "glow", "bounce", "shake", "ripple"],
  },
  "cta-split": {
    section: ["fade-up"],
    element: ["slide-opposite", "fade-stagger"],
    interactive: ["button-attention"],
  },
  "cta-banner": {
    section: ["fade-up", "slide-in"],
    element: ["text-reveal"],
  },
  newsletter: {
    section: ["fade-up"],
    element: [],
    interactive: ["input-focus", "button-success"],
  },
  download: {
    section: ["fade-up"],
    element: ["icon-animate"],
    interactive: ["bounce", "app-store-hover"],
  },

  // ===== FORMS =====
  "contact-form": {
    section: ["fade-up"],
    element: [],
    interactive: ["input-animate", "label-float", "submit-loading"],
  },
  "contact-split": {
    section: ["fade-up"],
    element: ["slide-opposite", "fade-stagger"],
    interactive: ["map-animate"],
  },
  "signup-form": {
    section: ["fade-up"],
    element: ["step-progress"],
    interactive: ["input-validate"],
  },
  "lead-capture": {
    section: ["fade-up"],
    element: ["countdown"],
    interactive: ["attention-grab", "urgency-shake"],
  },

  // ===== FAQ & SUPPORT =====
  faq: {
    section: ["fade-up"],
    element: [],
    interactive: ["accordion", "slide-expand", "fade-content", "highlight", "plus-rotate"],
  },
  "faq-categories": {
    section: ["fade-up"],
    element: [],
    interactive: ["tab-switch", "filter-fade", "accordion"],
  },
  "faq-search": {
    section: ["fade-up"],
    element: [],
    interactive: ["search-highlight", "filter-instant", "no-result-shake"],
  },

  // ===== TEAM =====
  team: {
    section: ["fade-up"],
    element: ["stagger-up"],
    interactive: ["hover-info", "social-reveal", "image-grayscale"],
  },
  "team-grid": {
    section: ["fade-up"],
    element: ["stagger-up"],
    interactive: ["card-flip", "hover-lift"],
  },
  "team-carousel": {
    section: ["fade-up"],
    element: ["slide-smooth", "center-scale", "coverflow"],
  },

  // ===== TIMELINE & PROCESS =====
  timeline: {
    section: ["fade-up"],
    element: ["line-draw", "point-pop", "fade-stagger", "scroll-progress"],
  },
  "timeline-horizontal": {
    section: ["fade-up"],
    element: ["slide-horizontal", "line-draw", "point-pop"],
  },
  "process-steps": {
    section: ["fade-up"],
    element: ["step-progress", "connector-draw", "number-count", "icon-animate"],
  },
  roadmap: {
    section: ["fade-up"],
    element: ["path-draw", "milestone-pop", "scroll-reveal"],
  },

  // ===== MAP & LOCATION =====
  map: {
    section: ["fade-in", "zoom-in"],
    element: ["marker-drop"],
  },
  "map-contact": {
    section: ["fade-up"],
    element: ["slide-opposite", "marker-drop", "info-reveal"],
  },
  locations: {
    section: ["fade-up"],
    element: ["markers-stagger", "cards-stagger"],
    interactive: ["map-pan"],
  },

  // ===== BLOG & NEWS =====
  "blog-grid": {
    section: ["fade-up"],
    element: ["stagger-up", "load-more"],
    interactive: ["hover-lift", "image-zoom"],
  },
  "blog-list": {
    section: ["fade-up"],
    element: ["slide-right", "fade-stagger"],
    interactive: ["hover-highlight"],
  },
  "blog-featured": {
    section: ["fade-up", "scale-in"],
    element: ["text-slide"],
    interactive: ["overlay-reveal"],
  },
  "news-ticker": {
    section: ["fade-up"],
    element: ["marquee-smooth", "marquee-pause"],
    interactive: ["fade-switch"],
  },

  // ===== INTERACTIVE =====
  tabs: {
    section: ["fade-up"],
    element: [],
    interactive: ["fade-switch", "slide-switch", "tab-indicator"],
  },
  "accordion-section": {
    section: ["fade-up"],
    element: [],
    interactive: ["accordion", "slide-expand", "icon-rotate"],
  },
  "filter-gallery": {
    section: ["fade-up"],
    element: [],
    interactive: ["shuffle", "fade-filter", "scale-filter"],
  },
  "comparison-slider": {
    section: ["fade-up"],
    element: [],
    interactive: ["slider-smooth", "reveal-drag", "label-follow"],
  },

  // ===== DIVIDERS & DECORATIVE =====
  divider: {
    section: ["fade-in", "line-draw", "none"],
    element: [],
  },
  "wave-divider": {
    section: ["wave-flow", "wave-morph", "fade-in"],
    element: [],
  },
  spacer: {
    section: ["none"],
    element: [],
  },
  "parallax-divider": {
    section: ["parallax-slow", "parallax-fast", "zoom-parallax"],
    element: [],
  },

  // ===== CUSTOM =====
  custom: {
    section: ["fade-up", "scale-in", "slide-left", "slide-right", "none"],
    element: [],
  },
  "html-embed": {
    section: ["fade-in", "scale-in", "none"],
    element: [],
  },
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get animation definition by ID
 */
export function getAnimationById(id: string): AnimationDefinition | undefined {
  return ANIMATION_LIBRARY[id];
}

/**
 * Get all animations for a section layout
 */
export function getAnimationsForSection(layoutId: string): {
  section: AnimationDefinition[];
  element: AnimationDefinition[];
  interactive: AnimationDefinition[];
} {
  const config = SECTION_ANIMATIONS_CONFIG[layoutId] || {
    section: ["fade-up"],
    element: [],
    interactive: [],
  };

  return {
    section: (config.section || []).map((id) => ANIMATION_LIBRARY[id]).filter(Boolean),
    element: (config.element || []).map((id) => ANIMATION_LIBRARY[id]).filter(Boolean),
    interactive: (config.interactive || []).map((id) => ANIMATION_LIBRARY[id]).filter(Boolean),
  };
}

/**
 * Get animations by scope
 */
export function getAnimationsByScope(scope: AnimationScope): AnimationDefinition[] {
  return Object.values(ANIMATION_LIBRARY).filter((anim) => anim.scope === scope);
}

/**
 * Get animations by trigger
 */
export function getAnimationsByTrigger(trigger: AnimationTrigger): AnimationDefinition[] {
  return Object.values(ANIMATION_LIBRARY).filter((anim) => anim.trigger === trigger);
}

/**
 * Get animations by tags
 */
export function getAnimationsByTags(tags: string[]): AnimationDefinition[] {
  return Object.values(ANIMATION_LIBRARY).filter((anim) =>
    tags.some((tag) => anim.tags?.includes(tag))
  );
}

/**
 * Convert to legacy format for backward compatibility
 */
export function toLegacyFormat(): Record<
  string,
  { id: string; label: string; icon: string; description: string }[]
> {
  const result: Record<string, { id: string; label: string; icon: string; description: string }[]> = {};

  Object.entries(SECTION_ANIMATIONS_CONFIG).forEach(([layoutId, config]) => {
    const allAnimations = [
      ...(config.section || []),
      ...(config.element || []),
      ...(config.interactive || []),
    ];

    result[layoutId] = allAnimations
      .map((id) => {
        const anim = ANIMATION_LIBRARY[id];
        if (!anim) return null;
        return {
          id: anim.id,
          label: anim.label,
          icon: anim.icon,
          description: anim.description,
        };
      })
      .filter(Boolean) as { id: string; label: string; icon: string; description: string }[];
  });

  return result;
}

// Export legacy format for backward compatibility
export const SECTION_ANIMATIONS = toLegacyFormat();
