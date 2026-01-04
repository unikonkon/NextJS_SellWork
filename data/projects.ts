export type ColorScheme = 'orange' | 'orangeLight' | 'blue' | 'yellow' | 'red' | 'green' | 'purple' | 'indigo' | 'cyan' | 'pink';

export interface Project {
  id: string;
  index: string;
  type: "WEB APP" | "MOBILE APP" | "DESIGN" | "FULL STACK" | "AI APP" | "TOOL" | "E-COMMERCE";
  title: string;
  role: string;
  description: string;
  date: string;
  image: string;
  slideImages?: string[];
  technologies: string[];
  githubUrl?: string;
  githubUrlFrontend?: string;
  githubUrlBackend?: string;
  githubUrlNodePullData?: string;
  demoUrl?: string;
  colorScheme: ColorScheme;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "coffee-seeds",
    index: "01",
    type: "E-COMMERCE",
    title: "AROMA Coffee Shop",
    role: "Front-End Developer",
    description: "แพลตฟอร์มร้านกาแฟพรีเมียมออนไลน์ที่นำเสนอประสบการณ์การเลือกซื้อกาแฟคุณภาพจากแหล่งปลูกชั้นนำทั่วโลก พร้อมระบบตะกร้าสินค้าและการจัดการคำสั่งซื้อที่ครบครัน",
    date: "",
    image: "/Project/coffee-seeds.png",
    technologies: ["Next.js 15", "TypeScript", "TailwindCSS", "GSAP", "React Context"],
    demoUrl: "https://coffee-seeds.vercel.app/",
    colorScheme: "orange",
    featured: true
  },
  {
    id: "products-ai",
    index: "02",
    type: "AI APP",
    title: "AI Products Platform",
    role: "Front-End Developer",
    description: "แพลตฟอร์มนำเสนอผลิตภัณฑ์ AI ที่ช่วยปลดปล่อยพลังของปัญญาประดิษฐ์สู่ธุรกิจ ครอบคลุมโซลูชั่น AI Chat, Image Generation และ Data Analytics",
    date: "",
    image: "/Project/products-ai.png",
    technologies: ["Next.js 15", "TypeScript", "TailwindCSS", "GSAP", "AI Integration"],
    demoUrl: "https://products-ai.vercel.app/",
    colorScheme: "indigo",
    featured: true
  }
];

export const featuredProjects = projects.filter(p => p.featured);
export const allProjects = projects;
