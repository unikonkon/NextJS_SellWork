// ==================== ENHANCED ANIMATION TYPES DATA ====================

// ==================== NAVBAR ANIMATION TYPES ====================
export const NAVBAR_ANIMATION_TYPES = [
  {
    id: "sticky-fade",
    label: "Sticky + Fade",
    description: "Navbar จะลอยอยู่ด้านบนเสมอ และจะ fade in/out เมื่อ scroll",
    icon: "◐",
    cssClass: "navbar-sticky-fade",
  },
  {
    id: "slide-down",
    label: "Slide Down",
    description: "Navbar จะเลื่อนลงมาจากด้านบนเมื่อ scroll ขึ้น",
    icon: "↓",
    cssClass: "navbar-slide-down",
  },
  {
    id: "color-change",
    label: "Color Change",
    description: "สีพื้นหลัง Navbar จะเปลี่ยนเมื่อ scroll ผ่านจุดที่กำหนด",
    icon: "◑",
    cssClass: "navbar-color-change",
  },
  {
    id: "shrink",
    label: "Shrink Effect",
    description: "Navbar จะหดเล็กลงเมื่อ scroll ลง ขยายกลับเมื่อ scroll ขึ้น",
    icon: "⊡",
    cssClass: "navbar-shrink",
  },
  {
    id: "blur-glass",
    label: "Glass Blur",
    description: "เอฟเฟกต์กระจกฝ้าแบบ Glassmorphism",
    icon: "◇",
    cssClass: "navbar-glass",
  },
  {
    id: "menu-reveal",
    label: "Menu Reveal",
    description: "เมนูจะ reveal ทีละรายการด้วย stagger animation",
    icon: "≡",
    cssClass: "navbar-menu-reveal",
  },
  {
    id: "hide-show",
    label: "Hide on Scroll",
    description: "ซ่อนเมื่อ scroll ลง แสดงเมื่อ scroll ขึ้น",
    icon: "↕",
    cssClass: "navbar-hide-show",
  },
  {
    id: "border-progress",
    label: "Border Progress",
    description: "แสดง progress bar ที่ขอบล่างตาม scroll position",
    icon: "▬",
    cssClass: "navbar-progress",
  },
];

// ==================== FOOTER ANIMATION TYPES ====================
export const FOOTER_ANIMATION_TYPES = [
  {
    id: "fade-in",
    label: "Fade In",
    description: "Footer จะค่อยๆ ปรากฏเมื่อ scroll ถึง",
    icon: "◔",
    trigger: "top 90%",
  },
  {
    id: "slide-up",
    label: "Slide Up",
    description: "Footer จะเลื่อนขึ้นมาจากด้านล่างเมื่อ scroll ถึง",
    icon: "↑",
    trigger: "top 95%",
  },
  {
    id: "parallax",
    label: "Parallax",
    description: "องค์ประกอบต่างๆ ใน Footer จะเคลื่อนที่ความเร็วต่างกัน",
    icon: "≋",
    trigger: "top 85%",
  },
  {
    id: "hover-links",
    label: "Hover Links",
    description: "ลิงก์ใน Footer มีเอฟเฟกต์พิเศษเมื่อ hover",
    icon: "◉",
    trigger: "top 90%",
  },
  {
    id: "wave-bg",
    label: "Wave Background",
    description: "พื้นหลังแบบคลื่นเคลื่อนไหว",
    icon: "∿",
    trigger: "top 95%",
  },
  {
    id: "stagger-cols",
    label: "Stagger Columns",
    description: "คอลัมน์ต่างๆ จะปรากฏทีละอันตามลำดับ",
    icon: "⊞",
    trigger: "top 85%",
  },
  {
    id: "reveal-up",
    label: "Reveal Up",
    description: "เนื้อหาเปิดเผยจากล่างขึ้นบนด้วย mask",
    icon: "▲",
    trigger: "top 90%",
  },
  {
    id: "gradient-shift",
    label: "Gradient Shift",
    description: "พื้นหลังเปลี่ยนสี gradient อย่างนุ่มนวล",
    icon: "◈",
    trigger: "top 95%",
  },
];

// ==================== EXPANDED SECTION LAYOUTS ====================
export const SECTION_LAYOUTS = [
  // === HERO SECTIONS ===
  {
    id: "hero",
    label: "Hero",
    description: "ส่วนหัวขนาดใหญ่พร้อมรูปภาพหรือวิดีโอ",
    icon: "▣",
    preview: "full",
    category: "hero",
  },
  {
    id: "hero-split",
    label: "Hero Split",
    description: "Hero แบ่งครึ่ง ข้อความซ้าย รูป/วิดีโอขวา",
    icon: "◧",
    preview: "hero-split",
    category: "hero",
  },
  {
    id: "hero-video",
    label: "Hero Video",
    description: "Hero พร้อมวิดีโอพื้นหลังเต็มจอ",
    icon: "▶",
    preview: "hero-video",
    category: "hero",
  },
  {
    id: "hero-slider",
    label: "Hero Slider",
    description: "Hero แบบ Carousel/Slider หลายภาพ",
    icon: "◀▶",
    preview: "hero-slider",
    category: "hero",
  },

  // === CONTENT SECTIONS ===
  {
    id: "text-image",
    label: "Text + Image",
    description: "ข้อความด้านซ้าย รูปภาพด้านขวา",
    icon: "◧",
    preview: "split",
    category: "content",
  },
  {
    id: "image-text",
    label: "Image + Text",
    description: "รูปภาพด้านซ้าย ข้อความด้านขวา",
    icon: "◨",
    preview: "split-reverse",
    category: "content",
  },
  {
    id: "zigzag",
    label: "Zigzag",
    description: "สลับซ้าย-ขวาแบบ Zigzag หลาย rows",
    icon: "⇆",
    preview: "zigzag",
    category: "content",
  },
  {
    id: "text-center",
    label: "Text Center",
    description: "ข้อความจัดกลางเต็มความกว้าง",
    icon: "≡",
    preview: "text-center",
    category: "content",
  },
  {
    id: "quote-block",
    label: "Quote Block",
    description: "บล็อกคำพูดหรือ Quote ขนาดใหญ่",
    icon: "❝",
    preview: "quote",
    category: "content",
  },

  // === COLUMN LAYOUTS ===
  {
    id: "two-cols",
    label: "2 Columns",
    description: "แบ่งเป็น 2 คอลัมน์เท่ากัน",
    icon: "▥",
    preview: "cols-2",
    category: "columns",
  },
  {
    id: "three-cols",
    label: "3 Columns",
    description: "แบ่งเป็น 3 คอลัมน์เท่ากัน",
    icon: "⫿",
    preview: "cols-3",
    category: "columns",
  },
  {
    id: "four-cols",
    label: "4 Columns",
    description: "แบ่งเป็น 4 คอลัมน์เท่ากัน",
    icon: "▦",
    preview: "cols-4",
    category: "columns",
  },
  {
    id: "asymmetric",
    label: "Asymmetric",
    description: "คอลัมน์ขนาดไม่เท่ากัน (2:1 หรือ 1:2)",
    icon: "◫",
    preview: "asymmetric",
    category: "columns",
  },

  // === FEATURE SECTIONS ===
  {
    id: "features-grid",
    label: "Features Grid",
    description: "แสดง Features แบบ Grid พร้อม Icon",
    icon: "⊞",
    preview: "features-grid",
    category: "features",
  },
  {
    id: "features-list",
    label: "Features List",
    description: "แสดง Features แบบรายการแนวตั้ง",
    icon: "☰",
    preview: "features-list",
    category: "features",
  },
  {
    id: "features-tabs",
    label: "Features Tabs",
    description: "Features แบบ Tab สลับเนื้อหา",
    icon: "⊟",
    preview: "features-tabs",
    category: "features",
  },
  {
    id: "features-accordion",
    label: "Features Accordion",
    description: "Features แบบ Accordion พับ/กาง",
    icon: "≡",
    preview: "features-accordion",
    category: "features",
  },
  {
    id: "icon-boxes",
    label: "Icon Boxes",
    description: "กล่อง Icon พร้อมคำอธิบายสั้น",
    icon: "◰",
    preview: "icon-boxes",
    category: "features",
  },

  // === GALLERY & MEDIA ===
  {
    id: "gallery",
    label: "Gallery",
    description: "แกลเลอรี่รูปภาพแบบ Grid",
    icon: "▤",
    preview: "gallery",
    category: "media",
  },
  {
    id: "gallery-masonry",
    label: "Masonry Gallery",
    description: "แกลเลอรี่แบบ Masonry/Pinterest",
    icon: "▦",
    preview: "masonry",
    category: "media",
  },
  {
    id: "carousel",
    label: "Carousel",
    description: "Carousel รูปภาพ/เนื้อหาเลื่อนได้",
    icon: "◀▶",
    preview: "carousel",
    category: "media",
  },
  {
    id: "video-section",
    label: "Video Section",
    description: "Section แสดงวิดีโอพร้อมคำอธิบาย",
    icon: "▶",
    preview: "video",
    category: "media",
  },
  {
    id: "lightbox-gallery",
    label: "Lightbox Gallery",
    description: "Gallery พร้อม Lightbox เมื่อคลิก",
    icon: "◳",
    preview: "lightbox",
    category: "media",
  },

  // === SOCIAL PROOF ===
  {
    id: "testimonial",
    label: "Testimonial",
    description: "รีวิวหรือคำพูดจากลูกค้า",
    icon: "❝",
    preview: "testimonial",
    category: "social-proof",
  },
  {
    id: "testimonial-slider",
    label: "Testimonial Slider",
    description: "รีวิวลูกค้าแบบ Slider",
    icon: "◀❝▶",
    preview: "testimonial-slider",
    category: "social-proof",
  },
  {
    id: "testimonial-grid",
    label: "Testimonial Grid",
    description: "รีวิวลูกค้าแบบ Grid Cards",
    icon: "▦❝",
    preview: "testimonial-grid",
    category: "social-proof",
  },
  {
    id: "logos",
    label: "Client Logos",
    description: "แสดง Logo ลูกค้า/พาร์ทเนอร์",
    icon: "◎◎◎",
    preview: "logos",
    category: "social-proof",
  },
  {
    id: "logos-scroll",
    label: "Logos Marquee",
    description: "Logo เลื่อนอัตโนมัติแบบ Marquee",
    icon: "→◎→",
    preview: "logos-scroll",
    category: "social-proof",
  },
  {
    id: "case-studies",
    label: "Case Studies",
    description: "แสดง Case Study หรือ Portfolio",
    icon: "📋",
    preview: "case-studies",
    category: "social-proof",
  },

  // === DATA & STATS ===
  {
    id: "stats",
    label: "Stats",
    description: "แสดงตัวเลขสถิติ",
    icon: "📊",
    preview: "stats",
    category: "data",
  },
  {
    id: "stats-counter",
    label: "Stats Counter",
    description: "ตัวเลขสถิติแบบนับขึ้น Animation",
    icon: "123",
    preview: "stats-counter",
    category: "data",
  },
  {
    id: "progress-bars",
    label: "Progress Bars",
    description: "แสดงข้อมูลแบบ Progress Bar",
    icon: "▐▐▐",
    preview: "progress",
    category: "data",
  },
  {
    id: "charts",
    label: "Charts",
    description: "แสดงข้อมูลแบบกราฟ/Chart",
    icon: "📈",
    preview: "charts",
    category: "data",
  },

  // === PRICING ===
  {
    id: "pricing",
    label: "Pricing Table",
    description: "ตารางราคาแบบ Columns",
    icon: "💰",
    preview: "pricing",
    category: "pricing",
  },
  {
    id: "pricing-toggle",
    label: "Pricing Toggle",
    description: "ราคาพร้อม Toggle Monthly/Yearly",
    icon: "💰↔",
    preview: "pricing-toggle",
    category: "pricing",
  },
  {
    id: "pricing-comparison",
    label: "Pricing Comparison",
    description: "ตารางเปรียบเทียบ Features",
    icon: "💰📋",
    preview: "pricing-comparison",
    category: "pricing",
  },

  // === CTA & CONVERSION ===
  {
    id: "cta",
    label: "CTA",
    description: "Call-to-Action พร้อมปุ่ม",
    icon: "◉",
    preview: "cta",
    category: "cta",
  },
  {
    id: "cta-split",
    label: "CTA Split",
    description: "CTA แบ่งครึ่งพร้อมรูป",
    icon: "◉◧",
    preview: "cta-split",
    category: "cta",
  },
  {
    id: "cta-banner",
    label: "CTA Banner",
    description: "แบนเนอร์ CTA เต็มความกว้าง",
    icon: "▬◉▬",
    preview: "cta-banner",
    category: "cta",
  },
  {
    id: "newsletter",
    label: "Newsletter",
    description: "ฟอร์มสมัครรับข่าวสาร",
    icon: "✉",
    preview: "newsletter",
    category: "cta",
  },
  {
    id: "download",
    label: "Download CTA",
    description: "ส่วนดาวน์โหลด App/Resource",
    icon: "⬇",
    preview: "download",
    category: "cta",
  },

  // === FORMS & INPUT ===
  {
    id: "contact-form",
    label: "Contact Form",
    description: "ฟอร์มติดต่อพร้อมข้อมูลติดต่อ",
    icon: "📝",
    preview: "contact",
    category: "forms",
  },
  {
    id: "contact-split",
    label: "Contact Split",
    description: "ฟอร์มติดต่อแบ่งครึ่งพร้อมแผนที่",
    icon: "📝🗺",
    preview: "contact-split",
    category: "forms",
  },
  {
    id: "signup-form",
    label: "Signup Form",
    description: "ฟอร์มสมัครสมาชิก",
    icon: "👤+",
    preview: "signup",
    category: "forms",
  },
  {
    id: "lead-capture",
    label: "Lead Capture",
    description: "ฟอร์มเก็บข้อมูล Lead",
    icon: "📥",
    preview: "lead",
    category: "forms",
  },

  // === FAQ & SUPPORT ===
  {
    id: "faq",
    label: "FAQ",
    description: "คำถามที่พบบ่อย",
    icon: "❓",
    preview: "faq",
    category: "support",
  },
  {
    id: "faq-categories",
    label: "FAQ Categories",
    description: "FAQ แบ่งเป็นหมวดหมู่",
    icon: "❓📁",
    preview: "faq-categories",
    category: "support",
  },
  {
    id: "faq-search",
    label: "FAQ Searchable",
    description: "FAQ พร้อมช่องค้นหา",
    icon: "❓🔍",
    preview: "faq-search",
    category: "support",
  },

  // === TEAM ===
  {
    id: "team",
    label: "Team",
    description: "แสดงทีมงานพร้อมรูปและข้อมูล",
    icon: "👥",
    preview: "team",
    category: "team",
  },
  {
    id: "team-grid",
    label: "Team Grid",
    description: "ทีมงานแบบ Grid Cards",
    icon: "👥▦",
    preview: "team-grid",
    category: "team",
  },
  {
    id: "team-carousel",
    label: "Team Carousel",
    description: "ทีมงานแบบ Carousel",
    icon: "👥◀▶",
    preview: "team-carousel",
    category: "team",
  },

  // === TIMELINE & PROCESS ===
  {
    id: "timeline",
    label: "Timeline",
    description: "แสดงลำดับเหตุการณ์แบบ Timeline",
    icon: "⊸",
    preview: "timeline",
    category: "process",
  },
  {
    id: "timeline-horizontal",
    label: "Horizontal Timeline",
    description: "Timeline แนวนอน",
    icon: "⟷",
    preview: "timeline-h",
    category: "process",
  },
  {
    id: "process-steps",
    label: "Process Steps",
    description: "แสดงขั้นตอนกระบวนการ",
    icon: "①②③",
    preview: "process",
    category: "process",
  },
  {
    id: "roadmap",
    label: "Roadmap",
    description: "แผนงานหรือ Roadmap",
    icon: "🗺",
    preview: "roadmap",
    category: "process",
  },

  // === MAP & LOCATION ===
  {
    id: "map",
    label: "Map Section",
    description: "แผนที่ Google Maps/Mapbox",
    icon: "🗺",
    preview: "map",
    category: "location",
  },
  {
    id: "map-contact",
    label: "Map + Contact",
    description: "แผนที่พร้อมข้อมูลติดต่อ",
    icon: "🗺📍",
    preview: "map-contact",
    category: "location",
  },
  {
    id: "locations",
    label: "Multiple Locations",
    description: "แสดงหลายสาขา/Location",
    icon: "📍📍📍",
    preview: "locations",
    category: "location",
  },

  // === BLOG & NEWS ===
  {
    id: "blog-grid",
    label: "Blog Grid",
    description: "แสดงบทความแบบ Grid",
    icon: "📰▦",
    preview: "blog-grid",
    category: "blog",
  },
  {
    id: "blog-list",
    label: "Blog List",
    description: "แสดงบทความแบบ List",
    icon: "📰☰",
    preview: "blog-list",
    category: "blog",
  },
  {
    id: "blog-featured",
    label: "Featured Posts",
    description: "บทความเด่นพร้อม Thumbnail ใหญ่",
    icon: "📰★",
    preview: "blog-featured",
    category: "blog",
  },
  {
    id: "news-ticker",
    label: "News Ticker",
    description: "ข่าวเลื่อนแบบ Ticker",
    icon: "→📰→",
    preview: "news-ticker",
    category: "blog",
  },

  // === INTERACTIVE ===
  {
    id: "tabs",
    label: "Tabs Section",
    description: "เนื้อหาแบบ Tab สลับได้",
    icon: "⊟⊟⊟",
    preview: "tabs",
    category: "interactive",
  },
  {
    id: "accordion-section",
    label: "Accordion Section",
    description: "เนื้อหาแบบ Accordion พับ/กาง",
    icon: "≡≡≡",
    preview: "accordion",
    category: "interactive",
  },
  {
    id: "filter-gallery",
    label: "Filterable Gallery",
    description: "Gallery พร้อมปุ่ม Filter",
    icon: "▦🔍",
    preview: "filter-gallery",
    category: "interactive",
  },
  {
    id: "comparison-slider",
    label: "Comparison Slider",
    description: "เปรียบเทียบ Before/After",
    icon: "◧↔◨",
    preview: "comparison",
    category: "interactive",
  },

  // === DIVIDERS & DECORATIVE ===
  {
    id: "divider",
    label: "Divider",
    description: "เส้นคั่น Section",
    icon: "―",
    preview: "divider",
    category: "decorative",
  },
  {
    id: "wave-divider",
    label: "Wave Divider",
    description: "เส้นคั่นแบบคลื่น SVG",
    icon: "∿",
    preview: "wave-divider",
    category: "decorative",
  },
  {
    id: "spacer",
    label: "Spacer",
    description: "ช่องว่างระหว่าง Section",
    icon: "▯",
    preview: "spacer",
    category: "decorative",
  },
  {
    id: "parallax-divider",
    label: "Parallax Divider",
    description: "รูปภาพคั่นแบบ Parallax",
    icon: "≋▯",
    preview: "parallax-divider",
    category: "decorative",
  },

  // === CUSTOM ===
  {
    id: "custom",
    label: "กำหนดเอง",
    description: "กำหนด Section เอง",
    icon: "✏️",
    preview: "custom",
    category: "custom",
  },
  {
    id: "html-embed",
    label: "HTML Embed",
    description: "ฝัง HTML/Widget ภายนอก",
    icon: "</>",
    preview: "embed",
    category: "custom",
  },
];

// ==================== SECTION ANIMATIONS MAPPING ====================
export const SECTION_ANIMATIONS: Record<
  string,
  { id: string; label: string; icon: string; description: string }[]
> = {
  // === HERO SECTIONS ===
  hero: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "scale-in", label: "Scale In", icon: "⊡", description: "ขยายจากเล็กไปใหญ่" },
    { id: "parallax-bg", label: "Parallax BG", icon: "≋", description: "พื้นหลังเคลื่อนที่ช้ากว่าเนื้อหา" },
    { id: "text-reveal", label: "Text Reveal", icon: "Aa", description: "ตัวอักษรปรากฏทีละตัว" },
    { id: "split-reveal", label: "Split Reveal", icon: "◰", description: "แยกเปิดจากกลาง" },
    { id: "typewriter", label: "Typewriter", icon: "⌨", description: "พิมพ์ทีละตัวอักษร" },
    { id: "glitch", label: "Glitch Effect", icon: "▓", description: "เอฟเฟกต์ Glitch แบบ Digital" },
  ],
  "hero-split": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-opposite", label: "Slide Opposite", icon: "↔", description: "ซ้ายขวาเลื่อนเข้าหากัน" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละส่วน" },
    { id: "reveal-mask", label: "Reveal Mask", icon: "▣", description: "เปิดเผยด้วย mask effect" },
    { id: "zoom-pan", label: "Zoom Pan", icon: "⊕", description: "ซูมและเลื่อนรูป" },
  ],
  "hero-video": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "fade-overlay", label: "Fade Overlay", icon: "◔", description: "Overlay ค่อยๆ จางลง" },
    { id: "text-over-video", label: "Text Over", icon: "Aa▶", description: "ข้อความปรากฏเหนือวิดีโอ" },
  ],
  "hero-slider": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-horizontal-left", label: "Slide H Left", icon: "←", description: "เลื่อนแนวนอนซ้าย" },
    { id: "slide-horizontal-right", label: "Slide H Right", icon: "→", description: "เลื่อนแนวนอนขวา" },
    { id: "slide-vertical", label: "Slide V", icon: "↕", description: "เลื่อนแนวตั้ง" },
    { id: "fade-slide-left", label: "Fade Slide Left", icon: "◔ ←", description: "Fade พร้อมเลื่อน ซ้าย" },
    { id: "fade-slide-right", label: "Fade Slide Right", icon: "◔ →", description: "Fade พร้อมเลื่อน ขวา" },
    { id: "cube", label: "Cube Effect", icon: "◰", description: "หมุนแบบลูกบาศก์" },
    { id: "coverflow", label: "Coverflow", icon: "◧◰◨", description: "เอฟเฟกต์ Coverflow" },
  ],
  // === TEXT-IMAGE SECTIONS ===
  "text-image": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-left", label: "Slide Left", icon: "←", description: "เนื้อหาเลื่อนเข้าจากซ้าย" },
    { id: "slide-right", label: "Slide Right", icon: "→", description: "รูปเลื่อนเข้าจากขวา" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละส่วน" },
    { id: "reveal-mask", label: "Reveal Mask", icon: "▣", description: "เปิดเผยด้วย mask effect" },
    { id: "clip-reveal", label: "Clip Reveal", icon: "◲", description: "เปิดเผยด้วย clip-path" },
    { id: "zoom-img", label: "Zoom Image", icon: "⊕", description: "รูปซูมเข้าเมื่อ scroll ถึง" },
    // { id: "tilt-3d", label: "3D Tilt", icon: "◰", description: "รูปเอียง 3D เมื่อ hover" },
  ],
  "image-text": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-right", label: "Slide Right", icon: "→", description: "รูปเลื่อนเข้าจากขวา" },
    { id: "slide-left", label: "Slide Left", icon: "←", description: "เนื้อหาเลื่อนเข้าจากซ้าย" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละส่วน" },
    { id: "reveal-mask", label: "Reveal Mask", icon: "▣", description: "เปิดเผยด้วย mask effect" },
    { id: "clip-reveal", label: "Clip Reveal", icon: "◲", description: "เปิดเผยด้วย clip-path" },
    { id: "zoom-img", label: "Zoom Image", icon: "⊕", description: "รูปซูมเข้าเมื่อ scroll ถึง" },
    // { id: "tilt-3d", label: "3D Tilt", icon: "◰", description: "รูปเอียง 3D เมื่อ hover" },
  ],
  zigzag: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "alternate-slide", label: "Alternate Slide", icon: "↔", description: "เลื่อนสลับซ้ายขวา" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละส่วน" },
    { id: "scroll-reveal", label: "Scroll Reveal", icon: "↓", description: "เปิดเผยตาม scroll" },
  ],
  "text-center": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้น" },
    { id: "text-reveal", label: "Text Reveal", icon: "Aa", description: "ตัวอักษรปรากฏทีละตัว" },
    { id: "blur-in", label: "Blur In", icon: "◔", description: "จากเบลอเป็นชัด" },
  ],
  "quote-block": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-quote", label: "Slide Quote", icon: "❝", description: "คำพูดเลื่อนเข้ามา" },
    { id: "typewriter", label: "Typewriter", icon: "⌨", description: "พิมพ์ทีละตัวอักษร" },
    { id: "fade-scale", label: "Fade Scale", icon: "⊡", description: "ปรากฏพร้อมขยาย" },
  ],

  // === COLUMN LAYOUTS ===
  "two-cols": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑↑", description: "คอลัมน์ปรากฏทีละอัน" },
    { id: "slide-opposite", label: "Slide Opposite", icon: "↔", description: "เลื่อนเข้าจากคนละทาง" },
    { id: "fade-cascade", label: "Fade Cascade", icon: "◔◔", description: "ค่อยๆ ปรากฏต่อเนื่อง" },
  ],
  "three-cols": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑↑↑", description: "คอลัมน์ปรากฏทีละอัน" },
    { id: "flip-in", label: "Flip In", icon: "◰", description: "พลิกเข้ามาทีละคอลัมน์" },
    { id: "scale-stagger", label: "Scale Stagger", icon: "⊡⊡⊡", description: "ขยายขึ้นทีละอัน" },
    { id: "fade-cascade", label: "Fade Cascade", icon: "◔◔◔", description: "ค่อยๆ ปรากฏต่อเนื่อง" },
    { id: "rotate-in", label: "Rotate In", icon: "↻", description: "หมุนเข้ามาทีละอัน" },
  ],
  "four-cols": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑↑↑↑", description: "คอลัมน์ปรากฏทีละอัน" },
    { id: "wave-in", label: "Wave In", icon: "∿", description: "เคลื่อนเข้ามาเป็นคลื่น" },
    { id: "scale-stagger", label: "Scale Stagger", icon: "⊡⊡⊡⊡", description: "ขยายขึ้นทีละอัน" },
    { id: "rotate-in", label: "Rotate In", icon: "↻", description: "หมุนเข้ามาทีละอัน" },
    { id: "pop-random", label: "Pop Random", icon: "⊡?", description: "ป็อปขึ้นแบบสุ่มลำดับ" },
  ],
  asymmetric: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-opposite", label: "Slide Opposite", icon: "↔", description: "เลื่อนเข้าจากคนละทาง" },
    { id: "scale-stagger", label: "Scale Stagger", icon: "⊡⊡", description: "ขยายขึ้นทีละอัน" },
    { id: "parallax-cols", label: "Parallax Cols", icon: "≋", description: "เคลื่อนที่ความเร็วต่างกัน" },
  ],

  // === FEATURE SECTIONS ===
  "features-grid": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑", description: "ปรากฏทีละอัน" },
    { id: "scale-stagger", label: "Scale Stagger", icon: "⊡", description: "ขยายขึ้นทีละอัน" },
    { id: "flip-in", label: "Flip In", icon: "◰", description: "พลิกเข้ามา" },
    { id: "bounce-in", label: "Bounce In", icon: "⤴", description: "เด้งเข้ามา" },
    { id: "icon-spin", label: "Icon Spin", icon: "↻", description: "Icon หมุนเมื่อปรากฏ" },
  ],
  "features-list": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-right", label: "Slide Right", icon: "→", description: "เลื่อนเข้าจากซ้าย" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละรายการ" },
    { id: "check-mark", label: "Check Mark", icon: "✓", description: "เครื่องหมายถูกปรากฏ" },
  ],
  "features-tabs": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "fade-switch", label: "Fade Switch", icon: "◔↔", description: "สลับแบบ Fade" },
    { id: "slide-switch", label: "Slide Switch", icon: "←→", description: "สลับแบบเลื่อน" },
    { id: "flip-switch", label: "Flip Switch", icon: "◰↔", description: "สลับแบบพลิก" },
  ],
  "features-accordion": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "accordion", label: "Accordion", icon: "≡", description: "พับ/กางแบบ accordion" },
    { id: "slide-expand", label: "Slide Expand", icon: "↕", description: "เลื่อนขยาย" },
    { id: "rotate-arrow", label: "Rotate Arrow", icon: "↻", description: "ลูกศรหมุนเมื่อเปิด" },
  ],
  "icon-boxes": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑", description: "ปรากฏทีละอัน" },
    { id: "hover-lift", label: "Hover Lift", icon: "⤴", description: "ยกขึ้นเมื่อ hover" },
    { id: "icon-bounce", label: "Icon Bounce", icon: "◉⤴", description: "Icon เด้งเมื่อปรากฏ" },
    { id: "border-draw", label: "Border Draw", icon: "◻", description: "วาดเส้นขอบรอบกล่อง" },
  ],

  // === GALLERY & MEDIA ===
  gallery: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "masonry-fade", label: "Masonry Fade", icon: "▤", description: "รูปปรากฏแบบสุ่ม" },
    { id: "zoom-hover", label: "Zoom Hover", icon: "⊕", description: "ซูมเมื่อ hover" },
    { id: "lightbox", label: "Lightbox", icon: "◳", description: "เปิดดูเต็มจอเมื่อคลิก" },
    { id: "grid-reveal", label: "Grid Reveal", icon: "▦", description: "เปิดเผยทีละช่อง" },
    { id: "overlay-slide", label: "Overlay Slide", icon: "▣↑", description: "Overlay เลื่อนขึ้นเมื่อ hover" },
  ],
  "gallery-masonry": [
    { id: "masonry-fade", label: "Masonry Fade", icon: "▤", description: "รูปปรากฏแบบสุ่ม" },
    { id: "load-more", label: "Load More", icon: "↓+", description: "โหลดเพิ่มเมื่อ scroll" },
    { id: "shuffle", label: "Shuffle", icon: "⇆", description: "สลับตำแหน่งเมื่อ filter" },
  ],
  carousel: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-smooth", label: "Slide Smooth", icon: "↔", description: "เลื่อนนุ่มนวล" },
    { id: "fade-carousel", label: "Fade", icon: "◔", description: "สลับแบบ Fade" },
    { id: "coverflow", label: "Coverflow", icon: "◧◰◨", description: "เอฟเฟกต์ Coverflow" },
    { id: "cards-stack", label: "Cards Stack", icon: "▢▢▢", description: "การ์ดซ้อนกัน" },
  ],
  "video-section": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "play-button-pulse", label: "Play Pulse", icon: "▶◉", description: "ปุ่ม Play เต้น" },
    { id: "fade-in-video", label: "Fade In", icon: "◔▶", description: "วิดีโอค่อยๆ ปรากฏ" },
    { id: "scale-video", label: "Scale Video", icon: "⊡▶", description: "วิดีโอขยายขึ้น" },
  ],
  "lightbox-gallery": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "grid-reveal", label: "Grid Reveal", icon: "▦", description: "เปิดเผยทีละช่อง" },
    { id: "lightbox-zoom", label: "Lightbox Zoom", icon: "⊕", description: "ซูมเข้า Lightbox" },
    { id: "lightbox-fade", label: "Lightbox Fade", icon: "◔◳", description: "Lightbox แบบ Fade" },
  ],

  // === SOCIAL PROOF ===
  testimonial: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-quote", label: "Slide Quote", icon: "❝", description: "คำพูดเลื่อนเข้ามา" },
    { id: "fade-rotate", label: "Fade Rotate", icon: "↻", description: "หมุนสลับรีวิว" },
    { id: "typewriter", label: "Typewriter", icon: "⌨", description: "พิมพ์ทีละตัวอักษร" },
    { id: "card-flip", label: "Card Flip", icon: "◰", description: "พลิกการ์ดเปลี่ยนรีวิว" },
    { id: "quote-mark-animate", label: "Quote Animate", icon: "❝↑", description: "เครื่องหมายคำพูดเคลื่อนไหว" },
  ],
  "testimonial-slider": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-horizontal", label: "Slide H", icon: "↔", description: "เลื่อนแนวนอน" },
    { id: "fade-slide", label: "Fade Slide", icon: "◔↔", description: "Fade พร้อมเลื่อน" },
    { id: "cards-stack", label: "Cards Stack", icon: "▢▢▢", description: "การ์ดซ้อนกัน" },
  ],
  "testimonial-grid": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑", description: "ปรากฏทีละอัน" },
    { id: "hover-lift", label: "Hover Lift", icon: "⤴", description: "ยกขึ้นเมื่อ hover" },
    { id: "quote-mark-animate", label: "Quote Animate", icon: "❝↑", description: "เครื่องหมายคำพูดเคลื่อนไหว" },
  ],
  logos: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละอัน" },
    { id: "grayscale-color", label: "Grayscale→Color", icon: "◐→◉", description: "ขาวดำเป็นสีเมื่อ hover" },
    { id: "scale-hover", label: "Scale Hover", icon: "⊡", description: "ขยายเมื่อ hover" },
  ],
  "logos-scroll": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "marquee-smooth", label: "Marquee Smooth", icon: "→→", description: "เลื่อนต่อเนื่อง" },
    { id: "marquee-pause", label: "Marquee Pause", icon: "→‖", description: "หยุดเมื่อ hover" },
    { id: "marquee-reverse", label: "Marquee Reverse", icon: "←→", description: "สลับทิศทาง" },
  ],
  "case-studies": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "card-hover", label: "Card Hover", icon: "▢↑", description: "การ์ดยกขึ้นเมื่อ hover" },
    { id: "image-overlay", label: "Image Overlay", icon: "▣", description: "Overlay ปรากฏเมื่อ hover" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑", description: "ปรากฏทีละอัน" },
  ],

  // === DATA & STATS ===
  stats: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "counter", label: "Counter", icon: "123", description: "ตัวเลขนับขึ้น" },
    { id: "bar-grow", label: "Bar Grow", icon: "▐", description: "แท่งกราฟขยาย" },
    { id: "flip-number", label: "Flip Number", icon: "↻", description: "พลิกตัวเลข" },
    { id: "pop-scale", label: "Pop Scale", icon: "⊡", description: "ตัวเลขป็อปขึ้นมา" },
  ],
  "stats-counter": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "counter-fast", label: "Counter Fast", icon: "123↑", description: "นับเร็ว" },
    { id: "counter-slow", label: "Counter Slow", icon: "123→", description: "นับช้าๆ" },
    { id: "counter-bounce", label: "Counter Bounce", icon: "123⤴", description: "นับแล้วเด้ง" },
    { id: "odometer", label: "Odometer", icon: "⊡123", description: "แบบมิเตอร์รถ" },
  ],
  "progress-bars": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "bar-grow", label: "Bar Grow", icon: "▐→", description: "แท่งขยาย" },
    { id: "bar-striped", label: "Bar Striped", icon: "▐▒", description: "แท่งลายทาง" },
    { id: "bar-animated", label: "Bar Animated", icon: "▐∿", description: "แท่งเคลื่อนไหว" },
    { id: "circular-progress", label: "Circular", icon: "◔", description: "Progress วงกลม" },
  ],
  charts: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "draw-line", label: "Draw Line", icon: "📈", description: "วาดเส้นกราฟ" },
    { id: "bar-stagger", label: "Bar Stagger", icon: "▐▐▐", description: "แท่งปรากฏทีละอัน" },
    { id: "pie-reveal", label: "Pie Reveal", icon: "◔→◉", description: "วงกลมเปิดเผย" },
    { id: "data-points", label: "Data Points", icon: "●●●", description: "จุดข้อมูลปรากฏ" },
  ],

  // === PRICING ===
  pricing: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑", description: "ปรากฏทีละอัน" },
    { id: "hover-lift", label: "Hover Lift", icon: "⤴", description: "ยกขึ้นเมื่อ hover" },
    { id: "highlight-popular", label: "Highlight Popular", icon: "★", description: "ไฮไลท์ตัวเลือกยอดนิยม" },
    { id: "scale-featured", label: "Scale Featured", icon: "⊡", description: "ขยายตัวเลือกแนะนำ" },
  ],
  "pricing-toggle": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "fade-switch", label: "Fade Switch", icon: "◔↔", description: "สลับแบบ Fade" },
    { id: "slide-switch", label: "Slide Switch", icon: "←→", description: "สลับแบบเลื่อน" },
    { id: "price-morph", label: "Price Morph", icon: "123↔", description: "ตัวเลขเปลี่ยนนุ่มนวล" },
  ],
  "pricing-comparison": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "row-highlight", label: "Row Highlight", icon: "▬", description: "ไฮไลท์แถวเมื่อ hover" },
    { id: "check-animate", label: "Check Animate", icon: "✓", description: "เครื่องหมายถูกปรากฏ" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละแถว" },
  ],

  // === CTA & CONVERSION ===
  cta: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "pulse", label: "Pulse", icon: "◉", description: "ปุ่มเต้นเป็นจังหวะ" },
    { id: "glow", label: "Glow Effect", icon: "✦", description: "เรืองแสงเมื่อ hover" },
    { id: "bounce", label: "Bounce", icon: "⤴", description: "เด้งขึ้นลง" },
    { id: "shake", label: "Shake", icon: "↔", description: "สั่นเรียกความสนใจ" },
    { id: "ripple", label: "Ripple", icon: "◎", description: "คลื่นกระจายเมื่อคลิก" },
    { id: "gradient-shift", label: "Gradient Shift", icon: "◈", description: "สลับ Gradient" },
  ],
  "cta-split": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-opposite", label: "Slide Opposite", icon: "↔", description: "เลื่อนเข้าจากคนละทาง" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละส่วน" },
    { id: "button-attention", label: "Button Attention", icon: "◉⤴", description: "ปุ่มเรียกความสนใจ" },
  ],
  "cta-banner": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "slide-in", label: "Slide In", icon: "↓", description: "เลื่อนเข้ามา" },
    { id: "text-reveal", label: "Text Reveal", icon: "Aa", description: "ข้อความปรากฏทีละส่วน" },
  ],
  newsletter: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "input-focus", label: "Input Focus", icon: "▢→", description: "Input มีเอฟเฟกต์เมื่อ focus" },
    { id: "button-success", label: "Button Success", icon: "✓", description: "ปุ่มเปลี่ยนเมื่อสำเร็จ" },
  ],
  download: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "bounce", label: "Bounce", icon: "⤴", description: "เด้งขึ้นลง" },
    { id: "icon-animate", label: "Icon Animate", icon: "⬇↻", description: "Icon เคลื่อนไหว" },
    { id: "app-store-hover", label: "Store Hover", icon: "▢↑", description: "ปุ่ม Store มี hover effect" },
  ],

  // === FORMS ===
  "contact-form": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "input-animate", label: "Input Animate", icon: "▢", description: "Input มี animation" },
    { id: "label-float", label: "Label Float", icon: "Aa↑", description: "Label ลอยขึ้นเมื่อ focus" },
    { id: "submit-loading", label: "Submit Loading", icon: "◔→✓", description: "ปุ่มแสดง loading" },
  ],
  "contact-split": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "slide-opposite", label: "Slide Opposite", icon: "↔", description: "เลื่อนเข้าจากคนละทาง" },
    { id: "map-animate", label: "Map Animate", icon: "🗺↑", description: "แผนที่มี animation" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละส่วน" },
  ],
  "signup-form": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "step-progress", label: "Step Progress", icon: "①②③", description: "แสดง progress ขั้นตอน" },
    { id: "input-validate", label: "Input Validate", icon: "▢✓", description: "แสดงผล validate" },
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
  ],
  "lead-capture": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "attention-grab", label: "Attention Grab", icon: "◉", description: "เรียกความสนใจ" },
    { id: "countdown", label: "Countdown", icon: "321", description: "นับถอยหลัง" },
    { id: "urgency-shake", label: "Urgency Shake", icon: "↔!", description: "สั่นสร้าง urgency" },
  ],

  // === FAQ ===
  faq: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "accordion", label: "Accordion", icon: "≡", description: "พับ/กางแบบ accordion" },
    { id: "slide-expand", label: "Slide Expand", icon: "↕", description: "เลื่อนขยายเมื่อคลิก" },
    { id: "fade-content", label: "Fade Content", icon: "◔", description: "เนื้อหาค่อยๆ ปรากฏ" },
    { id: "highlight", label: "Highlight", icon: "◐", description: "ไฮไลท์คำถามที่เปิด" },
    { id: "plus-rotate", label: "Plus Rotate", icon: "+↻", description: "+ หมุนเป็น × เมื่อเปิด" },
  ],
  "faq-categories": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "tab-switch", label: "Tab Switch", icon: "⊟↔", description: "สลับ Tab หมวดหมู่" },
    { id: "filter-fade", label: "Filter Fade", icon: "◔", description: "Fade เมื่อสลับหมวด" },
    { id: "accordion", label: "Accordion", icon: "≡", description: "พับ/กางแบบ accordion" },
  ],
  "faq-search": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "search-highlight", label: "Search Highlight", icon: "🔍", description: "ไฮไลท์ผลค้นหา" },
    { id: "filter-instant", label: "Filter Instant", icon: "↻", description: "กรองทันที" },
    { id: "no-result-shake", label: "No Result", icon: "↔", description: "สั่นเมื่อไม่พบ" },
  ],

  // === TEAM ===
  team: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑", description: "ปรากฏทีละคน" },
    { id: "hover-info", label: "Hover Info", icon: "◐", description: "แสดงข้อมูลเมื่อ hover" },
    { id: "social-reveal", label: "Social Reveal", icon: "◎◎", description: "Social icons ปรากฏเมื่อ hover" },
    { id: "image-grayscale", label: "Grayscale", icon: "◐→◉", description: "รูปขาวดำเป็นสีเมื่อ hover" },
  ],
  "team-grid": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑", description: "ปรากฏทีละคน" },
    { id: "card-flip", label: "Card Flip", icon: "◰", description: "พลิกการ์ดแสดงข้อมูล" },
    { id: "hover-lift", label: "Hover Lift", icon: "⤴", description: "ยกขึ้นเมื่อ hover" },
  ],
  "team-carousel": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "slide-smooth", label: "Slide Smooth", icon: "↔", description: "เลื่อนนุ่มนวล" },
    { id: "center-scale", label: "Center Scale", icon: "⊡", description: "ขยายตรงกลาง" },
    { id: "coverflow", label: "Coverflow", icon: "◧◰◨", description: "เอฟเฟกต์ Coverflow" },
  ],

  // === TIMELINE & PROCESS ===
  timeline: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "line-draw", label: "Line Draw", icon: "⊸", description: "วาดเส้น Timeline" },
    { id: "point-pop", label: "Point Pop", icon: "●↑", description: "จุดป็อปขึ้นทีละจุด" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละช่วง" },
    { id: "scroll-progress", label: "Scroll Progress", icon: "↓", description: "แสดงตาม scroll" },
  ],
  "timeline-horizontal": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "slide-horizontal", label: "Slide H", icon: "↔", description: "เลื่อนแนวนอน" },
    { id: "line-draw", label: "Line Draw", icon: "―", description: "วาดเส้นแนวนอน" },
    { id: "point-pop", label: "Point Pop", icon: "●↑", description: "จุดป็อปขึ้นทีละจุด" },
  ],
  "process-steps": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "step-progress", label: "Step Progress", icon: "①②③", description: "ไฮไลท์ทีละขั้นตอน" },
    { id: "connector-draw", label: "Connector Draw", icon: "→→", description: "วาดเส้นเชื่อม" },
    { id: "number-count", label: "Number Count", icon: "123", description: "ตัวเลขนับขึ้น" },
    { id: "icon-animate", label: "Icon Animate", icon: "◉↻", description: "Icon เคลื่อนไหว" },
  ],
  roadmap: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "path-draw", label: "Path Draw", icon: "⊸⊸", description: "วาดเส้นทาง" },
    { id: "milestone-pop", label: "Milestone Pop", icon: "●↑", description: "Milestone ป็อปขึ้น" },
    { id: "scroll-reveal", label: "Scroll Reveal", icon: "↓", description: "เปิดเผยตาม scroll" },
  ],

  // === MAP & LOCATION ===
  map: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "fade-in", label: "Fade In", icon: "◔", description: "แผนที่ค่อยๆ ปรากฏ" },
    { id: "marker-drop", label: "Marker Drop", icon: "📍↓", description: "Marker ตกลงมา" },
    { id: "zoom-in", label: "Zoom In", icon: "⊕", description: "ซูมเข้า" },
  ],
  "map-contact": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "slide-opposite", label: "Slide Opposite", icon: "↔", description: "เลื่อนเข้าจากคนละทาง" },
    { id: "marker-drop", label: "Marker Drop", icon: "📍↓", description: "Marker ตกลงมา" },
    { id: "info-reveal", label: "Info Reveal", icon: "◐", description: "ข้อมูลปรากฏทีละส่วน" },
  ],
  locations: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "markers-stagger", label: "Markers Stagger", icon: "📍📍📍", description: "Markers ปรากฏทีละอัน" },
    { id: "cards-stagger", label: "Cards Stagger", icon: "▢▢▢", description: "การ์ดปรากฏทีละอัน" },
    { id: "map-pan", label: "Map Pan", icon: "🗺↔", description: "แผนที่เลื่อนไปที่เลือก" },
  ],

  // === BLOG & NEWS ===
  "blog-grid": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "stagger-up", label: "Stagger Up", icon: "↑", description: "ปรากฏทีละบทความ" },
    { id: "hover-lift", label: "Hover Lift", icon: "⤴", description: "ยกขึ้นเมื่อ hover" },
    { id: "image-zoom", label: "Image Zoom", icon: "⊕", description: "รูปซูมเมื่อ hover" },
    { id: "load-more", label: "Load More", icon: "↓+", description: "โหลดเพิ่มเมื่อ scroll" },
  ],
  "blog-list": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "slide-right", label: "Slide Right", icon: "→", description: "เลื่อนเข้าจากซ้าย" },
    { id: "fade-stagger", label: "Fade Stagger", icon: "◔", description: "ปรากฏทีละบทความ" },
    { id: "hover-highlight", label: "Hover Highlight", icon: "◐", description: "ไฮไลท์เมื่อ hover" },
  ],
  "blog-featured": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "scale-in", label: "Scale In", icon: "⊡", description: "ขยายขึ้น" },
    { id: "overlay-reveal", label: "Overlay Reveal", icon: "▣", description: "Overlay ปรากฏ" },
    { id: "text-slide", label: "Text Slide", icon: "Aa→", description: "ข้อความเลื่อนเข้า" },
  ],
  "news-ticker": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "marquee-smooth", label: "Marquee Smooth", icon: "→→", description: "เลื่อนต่อเนื่อง" },
    { id: "marquee-pause", label: "Marquee Pause", icon: "→‖", description: "หยุดเมื่อ hover" },
    { id: "fade-switch", label: "Fade Switch", icon: "◔↔", description: "สลับแบบ Fade" },
  ],

  // === INTERACTIVE ===
  tabs: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "fade-switch", label: "Fade Switch", icon: "◔↔", description: "สลับแบบ Fade" },
    { id: "slide-switch", label: "Slide Switch", icon: "←→", description: "สลับแบบเลื่อน" },
    { id: "tab-indicator", label: "Tab Indicator", icon: "▬", description: "Indicator เลื่อนไปที่ active" },
  ],
  "accordion-section": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "accordion", label: "Accordion", icon: "≡", description: "พับ/กางแบบ accordion" },
    { id: "slide-expand", label: "Slide Expand", icon: "↕", description: "เลื่อนขยาย" },
    { id: "icon-rotate", label: "Icon Rotate", icon: "↻", description: "Icon หมุนเมื่อเปิด" },
  ],
  "filter-gallery": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "shuffle", label: "Shuffle", icon: "⇆", description: "สลับตำแหน่งเมื่อ filter" },
    { id: "fade-filter", label: "Fade Filter", icon: "◔", description: "Fade เมื่อ filter" },
    { id: "scale-filter", label: "Scale Filter", icon: "⊡", description: "ขยาย/หดเมื่อ filter" },
  ],
  "comparison-slider": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "slider-smooth", label: "Slider Smooth", icon: "↔", description: "เลื่อนนุ่มนวล" },
    { id: "reveal-drag", label: "Reveal Drag", icon: "◧↔◨", description: "เปิดเผยตามการลาก" },
    { id: "label-follow", label: "Label Follow", icon: "Aa↔", description: "Label ติดตาม slider" },
  ],

  // === DIVIDERS ===
  divider: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "fade-in", label: "Fade In", icon: "◔", description: "ค่อยๆ ปรากฏ" },
    { id: "line-draw", label: "Line Draw", icon: "―", description: "วาดเส้น" },
    { id: "none", label: "No Animation", icon: "○", description: "ไม่มี animation" },
  ],
  "wave-divider": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "wave-flow", label: "Wave Flow", icon: "∿", description: "คลื่นไหล" },
    { id: "wave-morph", label: "Wave Morph", icon: "∿↔", description: "คลื่นเปลี่ยนรูป" },
    { id: "fade-in", label: "Fade In", icon: "◔", description: "ค่อยๆ ปรากฏ" },
  ],
  spacer: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "none", label: "No Animation", icon: "○", description: "ไม่มี animation" },
  ],
  "parallax-divider": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "ปรากฏจากล่าง" },
    { id: "parallax-slow", label: "Parallax Slow", icon: "≋", description: "เคลื่อนที่ช้า" },
    { id: "parallax-fast", label: "Parallax Fast", icon: "≋≋", description: "เคลื่อนที่เร็ว" },
    { id: "zoom-parallax", label: "Zoom Parallax", icon: "⊕≋", description: "ซูมพร้อม parallax" },
  ],

  // === CUSTOM ===
  custom: [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "scale-in", label: "Scale In", icon: "⊡", description: "ขยายจากเล็กไปใหญ่" },
    { id: "slide-left", label: "Slide Left", icon: "←", description: "เนื้อหาเลื่อนเข้าจากซ้าย" },
    { id: "slide-right", label: "Slide Right", icon: "→", description: "เนื้อหาเลื่อนเข้าจากขวา" },
    { id: "none", label: "No Animation", icon: "○", description: "ไม่มี animation" },
  ],
  "html-embed": [
    { id: "fade-up", label: "Fade Up", icon: "↑", description: "เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง" },
    { id: "fade-in", label: "Fade In", icon: "◔", description: "ค่อยๆ ปรากฏ" },
    { id: "scale-in", label: "Scale In", icon: "⊡", description: "ขยายขึ้น" },
    { id: "none", label: "No Animation", icon: "○", description: "ไม่มี animation" },
  ],
};

// ==================== FOOTER-SECTION COMPATIBILITY MAPPING ====================
// แมป Footer Animation กับ Section Layouts ที่เหมาะสม
export const FOOTER_SECTION_COMPATIBILITY: Record<string, string[]> = {
  "fade-in": ["*"], // เหมาะกับทุก section
  "slide-up": ["cta", "cta-split", "newsletter", "contact-form", "contact-split"],
  parallax: ["hero", "hero-split", "hero-video", "parallax-divider", "cta-banner"],
  "hover-links": ["*"], // เหมาะกับทุก section ที่มี links
  "wave-bg": ["hero", "hero-particles", "cta", "cta-banner", "wave-divider"],
  "stagger-cols": ["three-cols", "four-cols", "features-grid", "team-grid", "pricing"],
  "reveal-up": ["cta", "newsletter", "contact-form", "lead-capture"],
  "gradient-shift": ["hero", "cta", "cta-banner", "pricing"],
};

// ==================== SECTION LAYOUT CATEGORIES ====================
export const SECTION_CATEGORIES = [
  { id: "hero", label: "Hero Sections", icon: "▣" },
  { id: "content", label: "Content Sections", icon: "≡" },
  { id: "columns", label: "Column Layouts", icon: "⫿" },
  { id: "features", label: "Features", icon: "⊞" },
  { id: "media", label: "Gallery & Media", icon: "▤" },
  { id: "social-proof", label: "Social Proof", icon: "❝" },
  { id: "data", label: "Data & Stats", icon: "📊" },
  { id: "pricing", label: "Pricing", icon: "💰" },
  { id: "cta", label: "CTA & Conversion", icon: "◉" },
  { id: "forms", label: "Forms & Input", icon: "📝" },
  { id: "support", label: "FAQ & Support", icon: "❓" },
  { id: "team", label: "Team", icon: "👥" },
  { id: "process", label: "Timeline & Process", icon: "⊸" },
  { id: "location", label: "Map & Location", icon: "🗺" },
  { id: "blog", label: "Blog & News", icon: "📰" },
  { id: "interactive", label: "Interactive", icon: "⊟" },
  { id: "decorative", label: "Dividers", icon: "―" },
  { id: "custom", label: "Custom", icon: "✏️" },
];

// ==================== CATEGORY DESCRIPTIONS ====================
// คำอธิบายว่าแต่ละ category เหมาะกับการใช้ในอะไร
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  hero: "เหมาะสำหรับส่วนหัวหน้าเว็บไซต์ หน้าหลัก Landing Page",
  content: "เหมาะสำหรับแสดงเนื้อหา ข้อความ รูปภาพ และข้อมูลทั่วไป",
  columns: "เหมาะสำหรับจัดวางเนื้อหาแบบหลายคอลัมน์",
  features: "เหมาะสำหรับแสดง Features คุณสมบัติ หรือจุดเด่นของสินค้า/บริการ",
  media: "เหมาะสำหรับแสดงแกลเลอรี่รูปภาพ วิดีโอ และสื่อต่างๆ",
  "social-proof": "เหมาะสำหรับแสดงรีวิว Testimonials Logo ลูกค้า และ Case Studies",
  data: "เหมาะสำหรับแสดงสถิติ ตัวเลข กราฟ และข้อมูลเชิงตัวเลข",
  pricing: "เหมาะสำหรับแสดงตารางราคา แพ็คเกจ และแผนการสมัครสมาชิก",
  cta: "เหมาะสำหรับปุ่ม Call-to-Action Newsletter และการแปลงผู้เยี่ยมชม",
  forms: "เหมาะสำหรับฟอร์มติดต่อ ฟอร์มสมัครสมาชิก และฟอร์มเก็บข้อมูล",
  support: "เหมาะสำหรับ FAQ คำถามที่พบบ่อย และส่วนช่วยเหลือ",
  team: "เหมาะสำหรับแสดงทีมงาน พนักงาน และผู้ก่อตั้ง",
  process: "เหมาะสำหรับแสดง Timeline ขั้นตอนการทำงาน และ Roadmap",
  location: "เหมาะสำหรับแสดงแผนที่ สถานที่ติดต่อ และหลายสาขา",
  blog: "เหมาะสำหรับแสดงบทความ ข่าวสาร และเนื้อหาที่อัปเดต",
  interactive: "เหมาะสำหรับส่วนที่มีการโต้ตอบ Tabs Accordion และ Filter",
  decorative: "เหมาะสำหรับเส้นคั่น Section และช่องว่างระหว่างส่วนต่างๆ",
  custom: "เหมาะสำหรับ Section ที่กำหนดเองหรือฝัง HTML/Widget ภายนอก",
};
