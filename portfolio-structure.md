# Portfolio Website Structure
## Modern Minimalist × Programmer Style

---

## 🎯 Project Overview

**Concept:** เว็บแสดงผลงานแบบ Single Page ที่ผสมผสานความเรียบง่ายของ Minimalist Design เข้ากับกลิ่นอายของ Code Editor สร้างบรรยากาศแบบ Developer Portfolio

**Tech Stack:**
- Next.js 14+ (App Router)
- Tailwind CSS
- GSAP (GreenSock Animation Platform)
- TypeScript

---

## 🎨 Design Direction

### Theme: Code Editor Aesthetic

| Element | Description |
|---------|-------------|
| **Background** | สีดำเข้ม (#0a0a0a หรือ #0d0d0d) คล้าย VS Code Dark Theme |
| **Typography** | ใช้ Font แบบ Monospace สำหรับ Label และ Sans-serif สำหรับ Heading |
| **Accent Colors** | Gradient สีสดใส (Pink, Purple, Cyan) ตัดกับพื้นหลังมืด |
| **Grid Pattern** | Background มี subtle grid/line pattern แบบ blueprint |
| **Line Numbers** | ใส่ line number หรือ index (01, 02, 03) หน้า section |

### Visual Elements

- **Dotted Timeline:** เส้นประแนวตั้งเชื่อม Project แต่ละอัน
- **Glowing Cards:** Card มี gradient border และ subtle glow effect
- **Code Comments:** ใช้รูปแบบ `// comment` หรือ `/* */` เป็น decorative text
- **Terminal Tags:** Badge แสดง Tech stack แบบ terminal command

---

## 📐 Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  NAVIGATION (Fixed)                                         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Logo          Home  Work  About  Contact        ●●●   ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO SECTION                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │     // Hello World                                      ││
│  │     <h1>Creative Developer</h1>                         ││
│  │     Building digital experiences                        ││
│  │                                                         ││
│  │     [View Work]  [Contact]                              ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CASE STUDIES SECTION                                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │           CASE STUDIES                                  ││
│  │         Curated Work                                    ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────┐    ┌─────────────────────────┐│
│  │ 01 ── WEB APP    Q1 2025│    │ 02 ── MOBILE APP Q4 2025││
│  │                         │    │                         ││
│  │ Project Name            │ ●──│ Project Name            ││
│  │ ┌─────────────────────┐ │    │ ┌─────────────────────┐ ││
│  │ │  ░░░░░░░░░░░░░░░░░  │ │    │ │  ░░░░░░░░░░░░░░░░░  │ ││
│  │ │  Description        │ │    │ │  Description        │ ││
│  │ │                     │ │    │ │                     │ ││
│  │ │  [Preview Image]    │ │    │ │  [Preview Image]    │ ││
│  │ │                     │ │    │ │                     │ ││
│  │ └─────────────────────┘ │    │ └─────────────────────┘ ││
│  │                         │    │                         ││
│  │ ⬡ Next.js  ⬡ React     │    │ ⬡ React Native         ││
│  │ ⬡ TypeScript           │    │ ⬡ Expo                  ││
│  └─────────────────────────┘    └─────────────────────────┘│
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FOOTER                                                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  © 2025  |  GitHub  LinkedIn  Twitter                   ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── fonts/
│       ├── GeistMono.woff2
│       └── GeistSans.woff2
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── GridBackground.tsx
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── CaseStudiesSection.tsx
│   │   └── AboutSection.tsx
│   │
│   ├── ui/
│   │   ├── ProjectCard.tsx
│   │   ├── TechBadge.tsx
│   │   ├── GlowButton.tsx
│   │   ├── Timeline.tsx
│   │   └── SectionHeader.tsx
│   │
│   └── animations/
│       ├── FadeIn.tsx
│       ├── SlideUp.tsx
│       ├── Parallax.tsx
│       └── TextReveal.tsx
│
├── hooks/
│   ├── useGSAP.ts
│   └── useScrollTrigger.ts
│
├── lib/
│   ├── animations.ts
│   └── utils.ts
│
├── data/
│   └── projects.ts
│
├── public/
│   ├── images/
│   │   └── projects/
│   └── icons/
│
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## 🧩 Component Breakdown

### 1. Navigation Bar

| Property | Value |
|----------|-------|
| Position | Fixed, top |
| Style | Glass morphism (backdrop-blur) |
| Elements | Logo, Menu items, Window controls (●●●) |
| Animation | Hide on scroll down, show on scroll up |

### 2. Hero Section

| Property | Value |
|----------|-------|
| Layout | Full viewport height, centered content |
| Background | Animated grid lines หรือ particle effect |
| Typography | Large heading พร้อม code-style comment |
| CTA Buttons | Gradient border, hover glow effect |

### 3. Case Studies Section

**Section Header:**
- Label: "CASE STUDIES" (monospace, letter-spacing wide)
- Title: "Curated *Work*" (Work เป็น italic + accent color)

**Project Card:**

| Property | Description |
|----------|-------------|
| Index | แสดง 01, 02, 03 สไตล์ line number |
| Type Badge | WEB APP / MOBILE APP / DESIGN |
| Date Badge | Q1 2025 (ขอบมน, border subtle) |
| Title | ชื่อโปรเจค (Font ใหญ่, bold) |
| Description Card | Gradient background (Pink/Purple/Cyan) |
| Preview | Screenshot หรือ Mockup ของงาน |
| Tech Stack | Badge แสดง technology ที่ใช้ |

**Timeline Connector:**
- เส้นประแนวตั้งเชื่อมระหว่าง card
- มี dot indicator ตรงจุดเชื่อม

### 4. Tech Badge

| Style | Description |
|-------|-------------|
| Background | Transparent หรือ dark surface |
| Border | Subtle gray border |
| Icon | Logo ของ technology |
| Text | ชื่อ tech (monospace font) |
| Hover | Subtle glow + scale up |

### 5. Footer

- Style เรียบง่าย
- Social links
- Copyright text แบบ code comment `// © 2025`

---

## ✨ GSAP Animations

### Scroll-Triggered Animations

| Element | Animation | Trigger |
|---------|-----------|---------|
| Section Header | Fade in + slide up | เมื่อ scroll เข้า viewport |
| Project Cards | Stagger fade in จากซ้าย-ขวา | เมื่อ section เข้า viewport |
| Tech Badges | Pop in ทีละอัน | หลัง card animation เสร็จ |
| Timeline | Draw line ตาม scroll progress | Scroll progress |
| Images | Parallax effect (ขยับช้ากว่า scroll) | Continuous scroll |

### Micro Interactions

| Element | Animation |
|---------|-----------|
| Buttons | Scale + glow on hover |
| Cards | Lift up + shadow on hover |
| Badges | Subtle bounce on hover |
| Links | Underline reveal from left |
| Cursor | Custom cursor (optional) |

### Page Load Sequence

```
1. Navigation fade in (0.3s)
      ↓
2. Hero title text reveal (0.5s, letter by letter)
      ↓
3. Hero subtitle fade in (0.3s)
      ↓
4. CTA buttons slide up (0.4s, stagger)
      ↓
5. Background grid animate in
```

---

## 🎨 Color Palette

### Base Colors

| Name | Hex | Usage |
|------|-----|-------|
| Background | #0a0a0a | Main background |
| Surface | #141414 | Card background |
| Border | #262626 | Subtle borders |
| Text Primary | #fafafa | Headings |
| Text Secondary | #a1a1aa | Body text |
| Text Muted | #52525b | Labels, captions |

### Accent Gradients

| Name | Gradient | Usage |
|------|----------|-------|
| Pink Card | #ec4899 → #f472b6 | Project card 1 |
| Purple Card | #8b5cf6 → #a78bfa | Project card 2 |
| Cyan Card | #06b6d4 → #22d3ee | Project card 3 |
| Pink Text | #ec4899 → #f43f5e | Accent text |

---

## 📝 Typography

### Font Family

| Type | Font | Usage |
|------|------|-------|
| Heading | Geist Sans / Inter | หัวข้อหลัก |
| Body | Geist Sans / Inter | เนื้อหาทั่วไป |
| Code | Geist Mono / JetBrains Mono | Labels, badges, decorative |

### Font Sizes (Tailwind)

| Element | Size | Weight |
|---------|------|--------|
| Hero Title | text-5xl to text-7xl | font-bold |
| Section Title | text-4xl to text-5xl | font-bold |
| Project Title | text-2xl to text-3xl | font-semibold |
| Body | text-base | font-normal |
| Label | text-xs to text-sm | font-medium |
| Badge | text-xs | font-mono |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Mobile (< 640px) | Single column, stacked cards |
| Tablet (640px - 1024px) | 2 columns grid |
| Desktop (> 1024px) | Full layout, side-by-side cards |

### Mobile Adjustments

- Navigation → Hamburger menu
- Hero → ลด font size
- Project Cards → Full width, stacked
- Timeline → ซ่อน หรือ แนวนอน
- Tech Badges → Wrap, smaller size

---

## 🔧 Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "gsap": "^3.12.x",
    "@gsap/react": "^2.x",
    "tailwindcss": "^3.4.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  }
}
```

---

## 📋 Project Data Structure

```typescript
interface Project {
  id: string
  index: string          // "01", "02", "03"
  type: "WEB APP" | "MOBILE APP" | "DESIGN"
  title: string
  description: string
  date: string           // "Q1 2025"
  gradient: string       // Tailwind gradient class
  image: string          // Preview image path
  techStack: TechBadge[]
  link?: string
}

interface TechBadge {
  name: string
  icon: string           // Icon component หรือ image path
}
```

---

## 🚀 Development Phases

### Phase 1: Foundation
- [ ] Setup Next.js project
- [ ] Configure Tailwind CSS
- [ ] Setup custom fonts
- [ ] Create base layout components
- [ ] Implement grid background

### Phase 2: Components
- [ ] Build Navbar
- [ ] Build Hero Section
- [ ] Build Section Header
- [ ] Build Project Card
- [ ] Build Tech Badge
- [ ] Build Timeline
- [ ] Build Footer

### Phase 3: Animations
- [ ] Setup GSAP
- [ ] Implement scroll triggers
- [ ] Add page load animations
- [ ] Add hover interactions
- [ ] Fine-tune timing

### Phase 4: Polish
- [ ] Responsive testing
- [ ] Performance optimization
- [ ] SEO meta tags
- [ ] Accessibility check
- [ ] Final testing

---

## 💡 Design Tips

1. **Contrast is Key:** ใช้สีสดตัดกับพื้นหลังมืดให้ดึงดูดสายตา

2. **Whitespace:** ให้พื้นที่ว่างเพียงพอ อย่าแน่นเกินไป

3. **Subtle Details:** เพิ่ม grid lines, noise texture, หรือ gradient overlay เบาๆ

4. **Animation Restraint:** Animation ควรเสริม UX ไม่ใช่รบกวน - ใช้แค่พอดี

5. **Code Aesthetic:** เพิ่ม decorative elements แบบ code เช่น `//`, `</>`, `{ }` อย่างเหมาะสม

---

*Document Version: 1.0*
*Last Updated: December 2025*
