# AI Layout Recommendation System

ระบบแนะนำ Layout อัตโนมัติด้วย Gemini AI สำหรับ LIVE PREVIEW

---

## ภาพรวมระบบ

ระบบนี้ใช้ **Gemini 2.5 Flash Lite API** วิเคราะห์ความต้องการของผู้ใช้จาก input text แล้วแนะนำ **5 รูปแบบ Layout ที่เหมาะสมที่สุด** จากโครงสร้าง Types ใน LIVE PREVIEW

---

## Flow การทำงาน

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INPUT                              │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐    │
│     │  "เว็บขายอาหาร"                                      │    │
│     │  "เว็บพอร์ตโฟลิโอ"                                    │    │
│     │  "Landing page สำหรับ SaaS"                          │    │
│     └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GEMINI 2.5 FLASH LITE                        │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐    │
│     │  • วิเคราะห์ประเภทธุรกิจ                              │    │
│     │  • พิจารณา User Journey ที่เหมาะสม                   │    │
│     │  • จับคู่กับ Layout Types ที่มี                       │    │
│     │  • จัดอันดับความเหมาะสม                               │    │
│     └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AI RECOMMENDATION                            │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐    │
│     │  5 รูปแบบที่แนะนำ พร้อม:                              │    │
│     │  • Section Layouts                                   │    │
│     │  • Section Animations                                │    │
│     │  • Background Types                                  │    │
│     │  • Navbar Animations                                 │    │
│     │  • Footer Animations                                 │    │
│     └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LIVE PREVIEW                               │
│                                                                 │
│     ผู้ใช้เลือกรูปแบบที่ต้องการ → สร้าง Landing Page            │
└─────────────────────────────────────────────────────────────────┘
```

---

## โครงสร้าง Output จาก AI

### Response Format

AI จะส่งคืนผลลัพธ์ **5 รูปแบบ** โดยแต่ละรูปแบบประกอบด้วย:

| Field | Type | คำอธิบาย |
|-------|------|----------|
| `rank` | number | อันดับความเหมาะสม (1-5) |
| `name` | string | ชื่อรูปแบบ |
| `description` | string | คำอธิบายว่าทำไมถึงเหมาะสม |
| `sections` | array | รายการ Sections ที่แนะนำ |
| `navbar` | object | Navbar Animation ที่แนะนำ |
| `footer` | object | Footer Animation ที่แนะนำ |
| `background` | object | Background Type ที่แนะนำ |

### Section Structure

แต่ละ Section ใน `sections` array ประกอบด้วย:

| Field | Type | ค่าที่เป็นไปได้ |
|-------|------|----------------|
| `layout` | string | ค่าจาก SECTION_LAYOUTS |
| `animation` | string | ค่าจาก SECTION_ANIMATIONS |
| `order` | number | ลำดับการแสดงผล |

---

## ตัวอย่าง: Input → Output

### ตัวอย่างที่ 1: เว็บขายอาหาร

**Input:**
```
เว็บขายอาหาร
```

**Output (5 รูปแบบที่แนะนำ):**

#### รูปแบบที่ 1: Food Gallery Focus
| ลำดับ | Section Layout | Animation | เหตุผล |
|-------|----------------|-----------|--------|
| 1 | `hero-slider` | `parallax-bg` | แสดงอาหารเด่นหลายจาน |
| 2 | `gallery-masonry` | `fade-stagger` | โชว์เมนูหลากหลาย |
| 3 | `features-grid` | `scale-in` | บริการจัดส่ง/โปรโมชั่น |
| 4 | `testimonial-slider` | `slide-left` | รีวิวลูกค้า |
| 5 | `cta-banner` | `fade-up` | สั่งอาหารเลย |

| Component | Type | เหตุผล |
|-----------|------|--------|
| Navbar | `sticky-fade` | เข้าถึงเมนูง่าย |
| Footer | `hover-links` | ลิงก์ติดต่อ/โซเชียล |
| Background | `gradient` | สีอบอุ่น ดูน่ากิน |

---

#### รูปแบบที่ 2: Menu Showcase
| ลำดับ | Section Layout | Animation | เหตุผล |
|-------|----------------|-----------|--------|
| 1 | `hero-split` | `slide-opposite` | รูปอาหาร + Tagline |
| 2 | `features-tabs` | `fade-in` | หมวดหมู่เมนู |
| 3 | `pricing-cards` | `fade-stagger` | ชุดอาหาร/เซ็ต |
| 4 | `logos` | `fade-in` | พาร์ทเนอร์จัดส่ง |
| 5 | `contact-split` | `slide-up` | ติดต่อ/แผนที่ |

| Component | Type | เหตุผล |
|-----------|------|--------|
| Navbar | `blur-glass` | ดูทันสมัย |
| Footer | `stagger-cols` | ข้อมูลครบถ้วน |
| Background | `mesh` | สีสันน่าสนใจ |

---

#### รูปแบบที่ 3: Restaurant Experience
| ลำดับ | Section Layout | Animation | เหตุผล |
|-------|----------------|-----------|--------|
| 1 | `hero-video` | `text-reveal` | บรรยากาศร้าน |
| 2 | `zigzag` | `reveal-mask` | เมนูแนะนำ |
| 3 | `team` | `fade-up` | เชฟ/ทีมงาน |
| 4 | `testimonial-grid` | `scale-in` | รีวิว |
| 5 | `map-contact` | `slide-up` | ที่ตั้งร้าน |

| Component | Type | เหตุผล |
|-----------|------|--------|
| Navbar | `color-change` | เปลี่ยนสีตามบรรยากาศ |
| Footer | `wave-bg` | ดูผ่อนคลาย |
| Background | `animated-gradient` | มีชีวิตชีวา |

---

#### รูปแบบที่ 4: Quick Order
| ลำดับ | Section Layout | Animation | เหตุผล |
|-------|----------------|-----------|--------|
| 1 | `hero-minimal` | `typewriter` | สั่งง่าย รวดเร็ว |
| 2 | `icon-boxes` | `fade-stagger` | ประเภทอาหาร |
| 3 | `gallery` | `fade-in` | เมนูยอดนิยม |
| 4 | `stats-counter` | `fade-up` | ออเดอร์/ลูกค้า |
| 5 | `newsletter` | `scale-in` | รับโปรโมชั่น |

| Component | Type | เหตุผล |
|-----------|------|--------|
| Navbar | `shrink` | ประหยัดพื้นที่ |
| Footer | `fade-in` | เรียบง่าย |
| Background | `solid` | โหลดเร็ว |

---

#### รูปแบบที่ 5: Premium Dining
| ลำดับ | Section Layout | Animation | เหตุผล |
|-------|----------------|-----------|--------|
| 1 | `hero-fullscreen` | `parallax-bg` | ภาพอาหารเต็มจอ |
| 2 | `text-center` | `text-reveal` | Philosophy |
| 3 | `before-after` | `fade-in` | วัตถุดิบ → จาน |
| 4 | `timeline` | `slide-left` | เรื่องราวร้าน |
| 5 | `cta` | `blur-in` | จองโต๊ะ |

| Component | Type | เหตุผล |
|-----------|------|--------|
| Navbar | `hide-show` | ไม่รบกวนภาพ |
| Footer | `gradient-shift` | หรูหรา |
| Background | `noise` | Texture พิเศษ |

---

### ตัวอย่างที่ 2: Portfolio Website

**Input:**
```
เว็บพอร์ตโฟลิโอ นักออกแบบกราฟิก
```

**Output (5 รูปแบบที่แนะนำ):**

#### รูปแบบที่ 1: Creative Showcase
| ลำดับ | Section Layout | Animation |
|-------|----------------|-----------|
| 1 | `hero-centered` | `glitch` |
| 2 | `gallery-masonry` | `fade-stagger` |
| 3 | `process-steps` | `slide-left` |
| 4 | `testimonial` | `fade-up` |
| 5 | `contact-form` | `scale-in` |

#### รูปแบบที่ 2: Minimal Portfolio
| ลำดับ | Section Layout | Animation |
|-------|----------------|-----------|
| 1 | `hero-minimal` | `typewriter` |
| 2 | `gallery-hover-info` | `fade-in` |
| 3 | `text-center` | `blur-in` |
| 4 | `logos` | `fade-up` |
| 5 | `cta-banner` | `slide-up` |

#### รูปแบบที่ 3: Case Study Focus
| ลำดับ | Section Layout | Animation |
|-------|----------------|-----------|
| 1 | `hero-split` | `slide-opposite` |
| 2 | `case-studies` | `fade-stagger` |
| 3 | `features-list` | `slide-right` |
| 4 | `stats` | `scale-in` |
| 5 | `contact-split` | `fade-up` |

#### รูปแบบที่ 4: Interactive Gallery
| ลำดับ | Section Layout | Animation |
|-------|----------------|-----------|
| 1 | `hero-3d` | `parallax-bg` |
| 2 | `filter-gallery` | `fade-in` |
| 3 | `timeline` | `reveal-mask` |
| 4 | `testimonial-grid` | `fade-stagger` |
| 5 | `newsletter` | `fade-up` |

#### รูปแบบที่ 5: Full Experience
| ลำดับ | Section Layout | Animation |
|-------|----------------|-----------|
| 1 | `hero-video` | `text-reveal` |
| 2 | `fullscreen-gallery` | `zoom-pan` |
| 3 | `quote-block` | `blur-in` |
| 4 | `team` | `fade-up` |
| 5 | `map-contact` | `slide-up` |

---

## ค่า Types ที่ AI สามารถแนะนำได้

### Section Layouts (แบ่งตาม Category)

| Category | Layout IDs |
|----------|------------|
| **Hero** | `hero`, `hero-split`, `hero-video`, `hero-slider`, `hero-minimal`, `hero-fullscreen`, `hero-centered` |
| **Content** | `text-image`, `image-text`, `zigzag`, `text-center`, `quote-block`, `full-width-image`, `two-column-text`, `highlight-box`, `image-overlay-text`, `content-cards`, `numbered-list`, `side-note`, `rich-text-block` |
| **Columns** | `two-cols`, `three-cols`, `four-cols`, `asymmetric`, `five-cols`, `six-cols`, `sidebar-left`, `sidebar-right`, `three-unequal` |
| **Features** | `features-grid`, `features-list`, `features-tabs`, `features-accordion`, `icon-boxes` |
| **Media** | `gallery`, `gallery-masonry`, `carousel`, `video-section`, `lightbox-gallery`, `gallery-justified`, `gallery-hover-info`, `gallery-filterable`, `gallery-infinite`, `gallery-mosaic`, `video-grid`, `media-slider`, `fullscreen-gallery`, `before-after`, `audio-player` |
| **Social Proof** | `testimonial`, `testimonial-slider`, `testimonial-grid`, `logos`, `logos-scroll`, `case-studies` |
| **Data** | `stats`, `stats-counter`, `progress-bars`, `charts` |
| **Pricing** | `pricing`, `pricing-toggle`, `pricing-comparison`, `pricing-cards`, `pricing-minimal`, `pricing-slider`, `pricing-tabs`, `pricing-highlighted` |
| **CTA** | `cta`, `cta-split`, `cta-banner`, `newsletter`, `download` |
| **Forms** | `contact-form`, `contact-split`, `signup-form`, `lead-capture` |
| **Support** | `faq`, `faq-categories`, `faq-search` |
| **Team** | `team`, `team-grid`, `team-carousel` |
| **Process** | `timeline`, `timeline-horizontal`, `process-steps`, `roadmap` |
| **Location** | `map`, `map-contact` |
| **Blog** | `blog-grid`, `blog-list`, `blog-featured`, `news-ticker` |
| **Interactive** | `tabs`, `accordion-section`, `filter-gallery`, `comparison-slider` |
| **Custom** | `custom`, `html-embed` |

---

### Section Animations

| Category | Animation IDs |
|----------|---------------|
| **Basic** | `fade-up`, `fade-in`, `fade-slide`, `scale-in`, `slide-left`, `slide-right`, `slide-in`, `slide-horizontal`, `slide-vertical`, `blur-in` |
| **Hero Specific** | `parallax-bg`, `text-reveal`, `split-reveal`, `typewriter`, `glitch` |
| **Advanced** | `slide-opposite`, `fade-stagger`, `reveal-mask`, `zoom-pan`, `clip-reveal`, `zoom-img` |

---

### Navbar Animations

| ID | Label |
|----|-------|
| `sticky-fade` | Sticky + Fade |
| `slide-down` | Slide Down |
| `color-change` | Color Change |
| `shrink` | Shrink Effect |
| `blur-glass` | Glass Blur |
| `menu-reveal` | Menu Reveal |
| `hide-show` | Hide on Scroll |
| `border-progress` | Border Progress |

---

### Footer Animations

| ID | Label |
|----|-------|
| `fade-in` | Fade In |
| `slide-up` | Slide Up |
| `parallax` | Parallax |
| `hover-links` | Hover Links |
| `wave-bg` | Wave Background |
| `stagger-cols` | Stagger Columns |
| `reveal-up` | Reveal Up |
| `gradient-shift` | Gradient Shift |

---

### Background Types

| Category | IDs |
|----------|-----|
| **Basic** | `none`, `solid`, `gradient`, `animated-gradient`, `pattern`, `grid`, `dots`, `mesh`, `particles`, `noise`, `lines` |
| **Custom** | `grid-custom`, `typing-lines`, `floating-snippets`, `grid-typing`, `grid-floating` |

---

## หลักการวิเคราะห์ของ AI

AI จะพิจารณาปัจจัยเหล่านี้ในการแนะนำ:

### 1. ประเภทธุรกิจ
| ประเภท | แนวทาง |
|--------|--------|
| E-commerce | เน้น Gallery, Pricing, CTA |
| Portfolio | เน้น Media, Case Studies |
| SaaS | เน้น Features, Pricing, Testimonials |
| Restaurant | เน้น Gallery, Map, Contact |
| Corporate | เน้น Content, Team, Stats |

### 2. User Journey
| ขั้นตอน | Sections ที่เหมาะ |
|---------|------------------|
| Awareness | Hero, Stats |
| Interest | Features, Gallery |
| Desire | Testimonials, Case Studies |
| Action | CTA, Contact, Pricing |

### 3. Visual Impact
| เป้าหมาย | Animations ที่เหมาะ |
|----------|-------------------|
| ดึงดูดความสนใจ | `glitch`, `parallax-bg`, `typewriter` |
| ดูเป็นมืออาชีพ | `fade-up`, `blur-in`, `scale-in` |
| ดูทันสมัย | `slide-opposite`, `reveal-mask` |
| ดูเรียบง่าย | `fade-in`, `slide-up` |

---

## สรุป

ระบบ AI Layout Recommendation ช่วยให้ผู้ใช้:

1. ✅ **ประหยัดเวลา** - ไม่ต้องเลือก Layout เอง
2. ✅ **ได้ผลลัพธ์ที่เหมาะสม** - AI วิเคราะห์ตามประเภทธุรกิจ
3. ✅ **มีตัวเลือกหลากหลาย** - 5 รูปแบบให้เลือก
4. ✅ **ครบทุกองค์ประกอบ** - Layout, Animation, Background, Navbar, Footer
