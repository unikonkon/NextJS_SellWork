"use client";

const navLinks = [
  { label: "หน้าแรก", href: "#home" },
  { label: "ผลงาน", href: "#work" },
  { label: "เกี่ยวกับ", href: "#about" },
  { label: "คำนวณราคา", href: "#pricing" },
];

const techStack = [
  { name: "Next.js", color: "#06b6d4" },
  { name: "Tailwind CSS", color: "#8b5cf6" },
  { name: "GSAP", color: "#10b981" },
  { name: "Three.js", color: "#ec4899" },
];

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-[#262626]">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center">
                <span className="text-white text-lg font-bold">S</span>
              </div>
              <div>
                <span className="font-mono text-lg font-bold text-white">SUTEP</span>
                <span className="font-mono text-sm text-[#52525b]">.dev</span>
              </div>
            </div>
            <p className="text-sm text-[#71717a] leading-relaxed">
              รับทำเว็บไซต์มี Animation สวยๆ ด้วยเทคโนโลยีล่าสุด
              <br />
              Full Stack Developer ประสบการณ์ 3+ ปี
            </p>
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-1 rounded text-[10px] font-mono border"
                  style={{
                    color: tech.color,
                    borderColor: `${tech.color}30`,
                    backgroundColor: `${tech.color}10`,
                  }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-[#52525b] uppercase tracking-wider">
              <span className="text-[#10b981]">{"// "}</span>
              เมนู
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#a1a1aa] hover:text-white transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-[#52525b] uppercase tracking-wider">
              <span className="text-[#10b981]">{"// "}</span>
              ติดต่อ
            </h4>
            {/* Code Style Status */}
            <div className="p-3 rounded-lg bg-[#0d0d0d] border border-[#262626] font-mono text-xs">
              <div className="text-[#52525b]">
                <span className="text-[#c084fc]">const</span>{" "}
                <span className="text-[#f472b6]">status</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-[#4ade80]">&quot;พร้อมรับงาน&quot;</span>
                <span className="text-white">;</span>
              </div>
            </div>
       
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262626]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="font-mono text-xs text-[#52525b]">
              <span className="text-[#10b981]">{"// "}</span>
              &copy; 2025 - All rights reserved
            </div>

            {/* Built with */}
            <div className="font-mono text-xs text-[#52525b]/50 flex items-center gap-2">
              <span>Built with</span>
              <span className="text-[#ec4899]">{"<"}</span>
              <span className="text-white">Next.js</span>
              <span className="text-[#ec4899]">{"/>"}</span>
              <span>+</span>
              <span className="text-[#06b6d4]">TailwindCSS</span>
              <span>+</span>
              <span className="text-[#10b981]">GSAP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
