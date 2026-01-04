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

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
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
                <span className="font-mono text-lg font-bold text-white">สุเทพ</span>
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
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#1a1a1a] text-[#52525b] hover:text-white hover:bg-[#262626] border border-[#262626] transition-all duration-300 hover:-translate-y-1"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262626]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="font-mono text-xs text-[#52525b]">
              <span className="text-[#10b981]">{"// "}</span>
              &copy; 2025 SUTEP JANTHAWEE - All rights reserved
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
