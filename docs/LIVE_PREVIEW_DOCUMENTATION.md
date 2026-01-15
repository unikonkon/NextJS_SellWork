# LIVE PREVIEW Documentation

เอกสารอธิบายโครงสร้างการทำงานและ Types ที่ใช้ใน **LIVE PREVIEW** ของ PricingSection

---

## สารบัญ
1. [ไฟล์ที่เกี่ยวข้อง](#ไฟล์ที่เกี่ยวข้อง)
2. [LayoutPreview Types](#layoutpreview-types)
3. [Background Types](#background-types)
4. [Navbar Animation Types](#navbar-animation-types)
5. [Footer Animation Types](#footer-animation-types)
6. [Section Layouts](#section-layouts)
7. [Section Animations](#section-animations)

---

## ไฟล์ที่เกี่ยวข้อง

| ไฟล์ | หน้าที่ |
|------|---------|
| `components/sections/PricingSection.tsx` | ไฟล์หลักที่แสดง LIVE PREVIEW (บรรทัด 2669) |
| `components/ui/LayoutPreview.tsx` | Component แสดง Preview ของ Layout แต่ละประเภท |
| `components/ui/BackgroundPreviewBasic.tsx` | Component แสดง Preview ของ Background พื้นฐาน |
| `components/ui/BackgroundPreviewCustom.tsx` | Component แสดง Preview ของ Background แบบกำหนดเอง |
| `components/ui/BackgroundModal.tsx` | Modal สำหรับเลือก Background |
| `components/sections/PricingSectionAnimation/landing-page-animations.ts` | ข้อมูล SECTION_LAYOUTS, SECTION_ANIMATIONS, NAVBAR/FOOTER_ANIMATION_TYPES |

---

## LayoutPreview Types

### Interface
```typescript
interface LayoutPreviewProps {
  preview: string;        // ประเภทของ preview ที่จะแสดง
  customLabel?: string | null;  // Label สำหรับ layout แบบกำหนดเอง
  size?: "small" | "medium";    // ขนาดของ preview
  themeColor?: string;    // สี theme จาก STEP 1
}
```

### Preview Types ที่รองรับ

| Type | คำอธิบาย |
|------|----------|
| `full` | Hero section เต็มความกว้าง |
| `split` | Text + Image (ซ้าย-ขวา) |
| `split-reverse` | Image + Text (ซ้าย-ขวา) |
| `cols-2` | 2 คอลัมน์ |
| `cols-3` | 3 คอลัมน์ |
| `cols-4` | 4 คอลัมน์ |
| `gallery` | Gallery grid |
| `cta` | Call-to-Action |
| `testimonial` | รีวิว/คำพูด |
| `faq` | FAQ accordion |
| `stats` | ตัวเลขสถิติ |
| `hero-split` | Hero แบ่งครึ่ง |
| `hero-video` | Hero พร้อมวิดีโอ |
| `hero-slider` | Hero แบบ slider |
| `zigzag` | Layout สลับซ้าย-ขวา |
| `text-center` | ข้อความจัดกลาง |
| `quote` | Quote block |
| `asymmetric` | คอลัมน์ไม่เท่ากัน |
| `features-grid` | Grid ของ features |
| `features-list` | List ของ features |
| `features-tabs` | Features แบบ tabs |
| `features-accordion` | Features แบบ accordion |
| `icon-boxes` | กล่อง icon |
| `masonry` | Masonry gallery |
| `carousel` | Carousel slider |
| `video` | Video section |
| `lightbox` | Lightbox gallery |
| `testimonial-slider` | Testimonial แบบ slider |
| `testimonial-grid` | Testimonial แบบ grid |
| `logos` | Client logos |
| `logos-scroll` | Logos marquee |
| `case-studies` | Case study cards |
| `stats-counter` | Stats แบบนับขึ้น |
| `progress` | Progress bars |
| `charts` | Charts/กราฟ |
| `pricing` | ตารางราคา |
| `pricing-toggle` | ราคาแบบ toggle |
| `pricing-comparison` | เปรียบเทียบราคา |
| `cta-split` | CTA แบ่งครึ่ง |
| `cta-banner` | CTA แบนเนอร์ |
| `contact` | ฟอร์มติดต่อ |
| `newsletter` | สมัครรับข่าว |
| `team` | ทีมงาน |
| `timeline` | Timeline |
| `process` | ขั้นตอน |
| `blog-grid` | Blog grid |
| `custom` | กำหนดเอง |

---

## Background Types

### Interface
```typescript
interface BackgroundOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  preview: string;
}
```

### BACKGROUND_TYPES (พื้นฐาน)

| ID | Label | Icon | คำอธิบาย |
|----|-------|------|----------|
| `none` | ไม่มี Background | ⬜ | ไม่มี background พิเศษ |
| `solid` | Solid Color | ▣ | สีเดียว |
| `gradient` | Gradient | ◐ | ไล่สี |
| `animated-gradient` | Animated Gradient | ◑ | ไล่สีเคลื่อนไหว |
| `pattern` | Pattern | ◈ | ลาย |
| `grid` | Grid | ▦ | ตาราง |
| `dots` | Dots | ◉ | จุด |
| `mesh` | Mesh Gradient | ◊ | Mesh gradient |
| `particles` | Particles | ◌ | อนุภาค |
| `noise` | Noise | ▓ | Noise texture |
| `lines` | Lines | ▬ | เส้น |

### BACKGROUND_CUSTOM_TYPES (กำหนดเอง)

| ID | Label | Icon | คำอธิบาย |
|----|-------|------|----------|
| `grid-custom` | Grid Custom | ▦ | Grid + Typing + Floating (กำหนด Text เอง) |
| `typing-lines` | Typing Lines | ⌨️ | Animated typing code lines |
| `floating-snippets` | Floating Snippets | 💫 | Floating code snippets |
| `grid-typing` | Grid + Typing | ▦⌨️ | Grid with typing animation |
| `grid-floating` | Grid + Floating | ▦💫 | Grid with floating animation |

---

## Navbar Animation Types

**ไฟล์:** `landing-page-animations.ts` → `NAVBAR_ANIMATION_TYPES`

| ID | Label | Icon | คำอธิบาย | CSS Class |
|----|-------|------|----------|-----------|
| `sticky-fade` | Sticky + Fade | ◐ | ลอยด้านบน + fade in/out เมื่อ scroll | `navbar-sticky-fade` |
| `slide-down` | Slide Down | ↓ | เลื่อนลงมาจากด้านบนเมื่อ scroll ขึ้น | `navbar-slide-down` |
| `color-change` | Color Change | ◑ | สีพื้นหลังเปลี่ยนเมื่อ scroll ผ่านจุดที่กำหนด | `navbar-color-change` |
| `shrink` | Shrink Effect | ⊡ | หดเล็กลงเมื่อ scroll ลง ขยายกลับเมื่อ scroll ขึ้น | `navbar-shrink` |
| `blur-glass` | Glass Blur | ◇ | เอฟเฟกต์กระจกฝ้า Glassmorphism | `navbar-glass` |
| `menu-reveal` | Menu Reveal | ≡ | เมนู reveal ทีละรายการ stagger animation | `navbar-menu-reveal` |
| `hide-show` | Hide on Scroll | ↕ | ซ่อนเมื่อ scroll ลง แสดงเมื่อ scroll ขึ้น | `navbar-hide-show` |
| `border-progress` | Border Progress | ▬ | progress bar ที่ขอบล่างตาม scroll position | `navbar-progress` |

---

## Footer Animation Types

**ไฟล์:** `landing-page-animations.ts` → `FOOTER_ANIMATION_TYPES`

| ID | Label | Icon | คำอธิบาย | Trigger |
|----|-------|------|----------|---------|
| `fade-in` | Fade In | ◔ | ค่อยๆ ปรากฏเมื่อ scroll ถึง | `top 90%` |
| `slide-up` | Slide Up | ↑ | เลื่อนขึ้นมาจากด้านล่าง | `top 95%` |
| `parallax` | Parallax | ≋ | องค์ประกอบเคลื่อนที่ความเร็วต่างกัน | `top 85%` |
| `hover-links` | Hover Links | ◉ | ลิงก์มีเอฟเฟกต์พิเศษเมื่อ hover | `top 90%` |
| `wave-bg` | Wave Background | ∿ | พื้นหลังแบบคลื่นเคลื่อนไหว | `top 95%` |
| `stagger-cols` | Stagger Columns | ⊞ | คอลัมน์ปรากฏทีละอันตามลำดับ | `top 85%` |
| `reveal-up` | Reveal Up | ▲ | เนื้อหาเปิดเผยจากล่างขึ้นบนด้วย mask | `top 90%` |
| `gradient-shift` | Gradient Shift | ◈ | พื้นหลังเปลี่ยนสี gradient นุ่มนวล | `top 95%` |

---

## Section Layouts

**ไฟล์:** `landing-page-animations.ts` → `SECTION_LAYOUTS`

### Interface
```typescript
interface SectionLayout {
  id: string;
  label: string;
  description: string;
  icon: string;
  preview: string;      // ใช้ใน LayoutPreview
  category: string;
}
```

### Categories และ Layouts

#### 🎯 Hero (category: "hero")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `hero` | Hero | `full` | ▣ |
| `hero-split` | Hero Split | `hero-split` | ◧ |
| `hero-video` | Hero Video | `hero-video` | ▶ |
| `hero-slider` | Hero Slider | `hero-slider` | ◀▶ |
| `hero-minimal` | Hero Minimal | `hero-minimal` | ▭ |
| `hero-fullscreen` | Hero Fullscreen | `hero-fullscreen` | ⬛ |
| `hero-centered` | Hero Centered | `hero-centered` | ◉ |

#### 📝 Content (category: "content")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `text-image` | Text + Image | `split` | ◧ |
| `image-text` | Image + Text | `split-reverse` | ◨ |
| `zigzag` | Zigzag | `zigzag` | ⇆ |
| `text-center` | Text Center | `text-center` | ≡ |
| `quote-block` | Quote Block | `quote` | ❝ |
| `full-width-image` | Full Width Image | `full-image` | ▬ |
| `two-column-text` | Two Column Text | `two-col-text` | ¶¶ |
| `highlight-box` | Highlight Box | `highlight` | ▣ |
| `image-overlay-text` | Image Overlay Text | `overlay` | ◩ |
| `content-cards` | Content Cards | `content-cards` | ▢▢ |
| `numbered-list` | Numbered List | `numbered-list` | ①② |
| `side-note` | Side Note | `side-note` | ▌ |
| `rich-text-block` | Rich Text Block | `rich-text` | ¶ |

#### 📊 Columns (category: "columns")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `two-cols` | 2 Columns | `cols-2` | ▥ |
| `three-cols` | 3 Columns | `cols-3` | ⫿ |
| `four-cols` | 4 Columns | `cols-4` | ▦ |
| `asymmetric` | Asymmetric | `asymmetric` | ◫ |
| `five-cols` | 5 Columns | `cols-5` | ▤▤ |
| `six-cols` | 6 Columns | `cols-6` | ▦▦ |
| `sidebar-left` | Sidebar Left | `sidebar-left` | ▌▐▐ |
| `sidebar-right` | Sidebar Right | `sidebar-right` | ▐▐▌ |
| `three-unequal` | 3 Columns Unequal | `cols-3-unequal` | ▏▐▏ |

#### ⭐ Features (category: "features")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `features-grid` | Features Grid | `features-grid` | ⊞ |
| `features-list` | Features List | `features-list` | ☰ |
| `features-tabs` | Features Tabs | `features-tabs` | ⊟ |
| `features-accordion` | Features Accordion | `features-accordion` | ≡ |
| `icon-boxes` | Icon Boxes | `icon-boxes` | ◰ |

#### 🖼️ Media (category: "media")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `gallery` | Gallery | `gallery` | ▤ |
| `gallery-masonry` | Masonry Gallery | `masonry` | ▦ |
| `carousel` | Carousel | `carousel` | ◀▶ |
| `video-section` | Video Section | `video` | ▶ |
| `lightbox-gallery` | Lightbox Gallery | `lightbox` | ◳ |
| `gallery-justified` | Justified Gallery | `gallery-justified` | ▬▬▬ |
| `gallery-hover-info` | Gallery Hover Info | `gallery-hover` | ▤✧ |
| `gallery-filterable` | Filterable Gallery | `gallery-filter` | ▤🔍 |
| `gallery-infinite` | Infinite Scroll Gallery | `gallery-infinite` | ▤↓ |
| `gallery-mosaic` | Mosaic Gallery | `gallery-mosaic` | ▣▢▤ |
| `video-grid` | Video Grid | `video-grid` | ▶▦ |
| `media-slider` | Media Slider | `media-slider` | ◀▶🎬 |
| `fullscreen-gallery` | Fullscreen Gallery | `fullscreen-gallery` | ⬛▤ |
| `before-after` | Before / After | `before-after` | ◧↔◨ |
| `audio-player` | Audio Player | `audio-player` | 🎵 |

#### 💬 Social Proof (category: "social-proof")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `testimonial` | Testimonial | `testimonial` | ❝ |
| `testimonial-slider` | Testimonial Slider | `testimonial-slider` | ◀❝▶ |
| `testimonial-grid` | Testimonial Grid | `testimonial-grid` | ▦❝ |
| `logos` | Client Logos | `logos` | ◎◎◎ |
| `logos-scroll` | Logos Marquee | `logos-scroll` | →◎→ |
| `case-studies` | Case Studies | `case-studies` | 📋 |

#### 📈 Data & Stats (category: "data")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `stats` | Stats | `stats` | 📊 |
| `stats-counter` | Stats Counter | `stats-counter` | 123 |
| `progress-bars` | Progress Bars | `progress` | ▐▐▐ |
| `charts` | Charts | `charts` | 📈 |

#### 💰 Pricing (category: "pricing")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `pricing` | Pricing Table | `pricing` | 💰 |
| `pricing-toggle` | Pricing Toggle | `pricing-toggle` | 💰↔ |
| `pricing-comparison` | Pricing Comparison | `pricing-comparison` | 💰📋 |
| `pricing-cards` | Pricing Cards | `pricing-cards` | 💰▢ |
| `pricing-minimal` | Pricing Minimal | `pricing-minimal` | 💰─ |
| `pricing-slider` | Pricing Slider | `pricing-slider` | 💰⟷ |
| `pricing-tabs` | Pricing Tabs | `pricing-tabs` | 💰⊟ |
| `pricing-highlighted` | Pricing Highlighted | `pricing-highlighted` | 💰★ |

#### 🎯 CTA & Conversion (category: "cta")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `cta` | CTA | `cta` | ◉ |
| `cta-split` | CTA Split | `cta-split` | ◉◧ |
| `cta-banner` | CTA Banner | `cta-banner` | ▬◉▬ |
| `newsletter` | Newsletter | `newsletter` | ✉ |
| `download` | Download CTA | `download` | ⬇ |

#### 📝 Forms & Input (category: "forms")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `contact-form` | Contact Form | `contact` | 📝 |
| `contact-split` | Contact Split | `contact-split` | 📝🗺 |
| `signup-form` | Signup Form | `signup` | 👤+ |
| `lead-capture` | Lead Capture | `lead` | 📥 |

#### ❓ FAQ & Support (category: "support")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `faq` | FAQ | `faq` | ❓ |
| `faq-categories` | FAQ Categories | `faq-categories` | ❓📁 |
| `faq-search` | FAQ Searchable | `faq-search` | ❓🔍 |

#### 👥 Team (category: "team")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `team` | Team | `team` | 👥 |
| `team-grid` | Team Grid | `team-grid` | 👥▦ |
| `team-carousel` | Team Carousel | `team-carousel` | 👥◀▶ |

#### 📅 Timeline & Process (category: "process")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `timeline` | Timeline | `timeline` | ⊸ |
| `timeline-horizontal` | Horizontal Timeline | `timeline-h` | ⟷ |
| `process-steps` | Process Steps | `process` | ①②③ |
| `roadmap` | Roadmap | `roadmap` | 🗺 |

#### 📍 Map & Location (category: "location")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `map` | Map Section | `map` | 🗺 |
| `map-contact` | Map + Contact | `map-contact` | 🗺📍 |

#### 📰 Blog & News (category: "blog")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `blog-grid` | Blog Grid | `blog-grid` | 📰▦ |
| `blog-list` | Blog List | `blog-list` | 📰☰ |
| `blog-featured` | Featured Posts | `blog-featured` | 📰★ |
| `news-ticker` | News Ticker | `news-ticker` | →📰→ |

#### 🔄 Interactive (category: "interactive")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `tabs` | Tabs Section | `tabs` | ⊟⊟⊟ |
| `accordion-section` | Accordion Section | `accordion` | ≡≡≡ |
| `filter-gallery` | Filterable Gallery | `filter-gallery` | ▦🔍 |
| `comparison-slider` | Comparison Slider | `comparison` | ◧↔◨ |

#### ✏️ Custom (category: "custom")
| ID | Label | Preview Type | Icon |
|----|-------|--------------|------|
| `custom` | กำหนดเอง | `custom` | ✏️ |
| `html-embed` | HTML Embed | `embed` | </> |

---

## Section Animations

**ไฟล์:** `landing-page-animations.ts` → `SECTION_ANIMATIONS`

### Interface
```typescript
type SECTION_ANIMATIONS = Record<
  string,  // section layout id
  { id: string; label: string; icon: string; description: string; type?: string }[]
>
```

### BASIC_ANIMATIONS (ใช้ได้กับทุก Section)
| ID | Label | Icon | คำอธิบาย |
|----|-------|------|----------|
| `fade-up` | Fade Up | ↑ | เนื้อหาค่อยๆ ปรากฏขึ้นจากด้านล่าง |
| `fade-in` | Fade In | ◔ | ค่อยๆ ปรากฏ |
| `fade-slide` | Fade Slide | ◔↔ | Fade พร้อมเลื่อน |
| `scale-in` | Scale In | ⊡ | ขยายจากเล็กไปใหญ่ |
| `slide-left` | Slide Left | ← | เนื้อหาเลื่อนเข้าจากซ้าย |
| `slide-right` | Slide Right | → | เนื้อหาเลื่อนเข้าจากขวา |
| `slide-in` | Slide In | ↓ | เลื่อนเข้ามา |
| `slide-horizontal` | Slide H | ↔ | เลื่อนแนวนอน |
| `slide-vertical` | Slide V | ↕ | เลื่อนแนวตั้ง |
| `blur-in` | Blur In | ◔ | จากเบลอเป็นชัด |

### Section-Specific Animations

#### Hero
- `parallax-bg` - พื้นหลังเคลื่อนที่ช้ากว่าเนื้อหา
- `text-reveal` - ตัวอักษรปรากฏทีละตัว
- `split-reveal` - แยกเปิดจากกลาง
- `typewriter` - พิมพ์ทีละตัวอักษร
- `glitch` - เอฟเฟกต์ Glitch แบบ Digital

#### Hero Split
- `slide-opposite` - ซ้ายขวาเลื่อนเข้าหากัน
- `fade-stagger` - ปรากฏทีละส่วน
- `reveal-mask` - เปิดเผยด้วย mask effect
- `zoom-pan` - ซูมและเลื่อนรูป

#### Text + Image
- `fade-stagger` - ปรากฏทีละส่วน
- `reveal-mask` - เปิดเผยด้วย mask effect
- `clip-reveal` - เปิดเผยด้วย clip-path
- `zoom-img` - รูปซูมเข้าเมื่อ scroll ถึง

---

## การใช้งานใน Code

### ตัวอย่าง: แสดง LayoutPreview
```tsx
import LayoutPreview from "@/components/ui/LayoutPreview";

// ใน LIVE PREVIEW section
<LayoutPreview
  preview={previewType}         // เช่น "split", "full", "cols-3"
  customLabel={section.customLayout || null}
  size="small"
  themeColor={getThemeColor}
/>
```

### ตัวอย่าง: ใช้ Background Types
```tsx
import BackgroundModal, {
  BACKGROUND_TYPES,
  BACKGROUND_CUSTOM_TYPES
} from "@/components/ui/BackgroundModal";

// ตรวจสอบว่าเป็น custom background
if (BACKGROUND_CUSTOM_TYPES.some(bg => bg.id === state.step1.background)) {
  // แสดง custom background
}
```

### ตัวอย่าง: ใช้ Section Layouts และ Animations
```tsx
import {
  SECTION_LAYOUTS,
  SECTION_ANIMATIONS
} from "@/components/sections/PricingSectionAnimation/landing-page-animations";

// หา layout info
const layout = SECTION_LAYOUTS.find(l => l.id === section.layout);

// หา animation info
const animInfo = section.animation
  ? SECTION_ANIMATIONS[section.layout]?.find(a => a.id === section.animation)
  : null;
```

---

## สรุป Flow การทำงาน

```
User เลือก Layout (SECTION_LAYOUTS)
        ↓
Layout มี preview type → ส่งไป LayoutPreview
        ↓
User เลือก Animation (SECTION_ANIMATIONS[layout.id])
        ↓
แสดงใน LIVE PREVIEW พร้อม:
- Background (BACKGROUND_TYPES / BACKGROUND_CUSTOM_TYPES)
- Navbar Animation (NAVBAR_ANIMATION_TYPES)
- Footer Animation (FOOTER_ANIMATION_TYPES)
```
