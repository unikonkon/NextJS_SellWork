"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const commentRef = useRef<HTMLSpanElement>(null);
  const commentTextRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const terminalCardRef = useRef<HTMLDivElement>(null);
  const backgroundGridRef = useRef<HTMLDivElement>(null);
  const experienceCounterRef = useRef<HTMLSpanElement>(null);
  const statusIndicatorRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const [experienceValue, setExperienceValue] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Show comment container first
      tl.fromTo(
        commentRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );

      // 1. Text Reveal Animation - Typewriter effect for "สวัสดีครับ"
      if (commentTextRef.current) {
        const originalText = "สวัสดีครับ ยินดีต้อนรับสู่เว็บไซต์ของผม";
        gsap.set(commentTextRef.current, { text: "" });
        tl.to(commentTextRef.current, {
          text: originalText,
          duration: 0.7,
          ease: "none",
        }, "-=0.2");
      }

      // 2. Title Split Text Animation
      if (titleRef.current) {
        const titleSpans = titleRef.current.querySelectorAll("span");
        tl.fromTo(
          titleSpans,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power3.out" },
          "-=0.5"
        );
      }

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.3"
      );

      // 2. Tech Stack Stagger Animation (improved)
      if (techStackRef.current) {
        const techBadges = techStackRef.current.querySelectorAll("span");
        tl.fromTo(
          techBadges,
          { opacity: 0, scale: 0.5, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.1,
            stagger: 0.15,
            ease: "power2.out"
          },
          "-=0.2"
        );
      }

      // Buttons stagger animation with magnetic setup
      const buttonElements = buttonsRef.current?.children || [];
      tl.fromTo(
        buttonElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
      );

      // Terminal animation
      tl.fromTo(
        terminalRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

      // 11. Line Numbers Fade In
      if (lineNumbersRef.current) {
        const lineNumbers = lineNumbersRef.current.querySelectorAll("span");
        tl.fromTo(
          lineNumbers,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, stagger: 0.05, ease: "power2.out" },
          "-=0.4"
        );
      }

      // 13. Terminal Boot Effect - Code lines appear one by one with syntax highlight
      if (codeBlockRef.current) {
        const codeLines = codeBlockRef.current.querySelectorAll('.code-line');
        codeLines.forEach((line, index) => {
          const lineContent = line as HTMLElement;

          // Animate opacity and position
          tl.fromTo(
            lineContent,
            { opacity: 0, x: -10 },
            {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: "power2.out",
              onStart: () => {
                // 12. Syntax Highlight Animation - Animate color changes
                const syntaxElements = lineContent.querySelectorAll('span[class*="text-"]');
                if (syntaxElements.length > 0) {
                  gsap.fromTo(
                    syntaxElements,
                    { opacity: 0, filter: "blur(4px)" },
                    {
                      opacity: 1,
                      filter: "blur(0px)",
                      duration: 0.4,
                      stagger: 0.05,
                      ease: "power2.out"
                    }
                  );
                }
              }
            },
            `-=${index === 0 ? 0.2 : 0.25}`
          );
        });
      }

      // 4. Counter Animation for "3+ ปี"
      if (experienceCounterRef.current) {
        tl.to(
          { value: 0 },
          {
            value: 3,
            duration: 1,
            ease: "power2.out",
            onUpdate: function () {
              const val = Math.floor(this.targets()[0].value);
              setExperienceValue(val);
            },
          },
          "-=0.5"
        );
      }

      // 3. Cursor Blink Effect
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // 5. Status Indicator Pulse
      if (statusIndicatorRef.current) {
        gsap.to(statusIndicatorRef.current, {
          scale: 1.2,
          opacity: 0.5,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // 7. Parallax Layers - Background moves slower
      if (backgroundGridRef.current) {
        gsap.to(backgroundGridRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 6. Fade Up on Scroll for sections
      if (sectionRef.current) {
        const scrollFadeElements = sectionRef.current.querySelectorAll(".scroll-fade");
        if (scrollFadeElements.length > 0) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.fromTo(
                scrollFadeElements,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
              );
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 8. Magnetic Buttons Effect
  useEffect(() => {
    const buttons = buttonsRef.current?.querySelectorAll("a");
    if (!buttons) return;

    buttons.forEach((button) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  // 10. Card Tilt Effect
  useEffect(() => {
    const card = terminalCardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Animated Background Grid - Parallax */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          ref={backgroundGridRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#ec4899]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Code Comment - Typewriter Effect */}
            <span
              ref={commentRef}
              className="inline-block font-mono text-sm text-[#52525b] mb-6 opacity-0"
            >
              <span className="text-[#10b981]">{"// "}</span>
              <span ref={commentTextRef}></span>
              <span ref={cursorRef} className="inline-block w-[2px] h-4 bg-[#10b981] ml-1 align-middle"></span>
            </span>

            {/* Main Title - Split Text Animation */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="block text-white mb-2">รับทำเว็บไซต์</span>
              <span className="block gradient-text-purple">Animation สวยๆ</span>
            </h1>

            {/* Subtitle */}
            <div
              ref={subtitleRef}
              className="text-base md:text-lg text-[#a1a1aa] max-w-xl mx-auto lg:mx-0 mb-8 opacity-0 space-y-3"
            >
              <p>
                สร้างประสบการณ์เว็บไซต์ที่น่าจดจำด้วยเทคโนโลยีล่าสุด
              </p>
              <div ref={techStackRef} className="flex flex-wrap justify-center lg:justify-start gap-2 font-mono text-sm">
                <span className="px-3 py-1 rounded-full bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/20">
                  Next.js
                </span>
                <span className="px-3 py-1 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20">
                  Tailwind CSS
                </span>
                <span className="px-3 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
                  GSAP
                </span>
                <span className="px-3 py-1 rounded-full bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/20">
                  Motion.dev
                </span>
              </div>
            </div>

            {/* CTA Buttons - Magnetic + Underline Draw */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#pricing"
                className="btn-primary group relative overflow-hidden"
                onMouseEnter={(e) => {
                  const underline = e.currentTarget.querySelector('.underline-draw');
                  if (underline) {
                    gsap.fromTo(underline,
                      { scaleX: 0, transformOrigin: "left" },
                      { scaleX: 1, duration: 0.4, ease: "power2.out" }
                    );
                  }
                }}
                onMouseLeave={(e) => {
                  const underline = e.currentTarget.querySelector('.underline-draw');
                  if (underline) {
                    gsap.to(underline,
                      { scaleX: 0, transformOrigin: "right", duration: 0.3, ease: "power2.in" }
                    );
                  }
                }}
              >
                <span>ดูราคา & สั่งงาน</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <span className="underline-draw absolute bottom-0 left-0 w-full h-[2px] bg-current origin-left scale-x-0"></span>
              </a>
              <a
                href="#work"
                className="btn-secondary relative overflow-hidden"
                onMouseEnter={(e) => {
                  const underline = e.currentTarget.querySelector('.underline-draw');
                  if (underline) {
                    gsap.fromTo(underline,
                      { scaleX: 0, transformOrigin: "left" },
                      { scaleX: 1, duration: 0.4, ease: "power2.out" }
                    );
                  }
                }}
                onMouseLeave={(e) => {
                  const underline = e.currentTarget.querySelector('.underline-draw');
                  if (underline) {
                    gsap.to(underline,
                      { scaleX: 0, transformOrigin: "right", duration: 0.3, ease: "power2.in" }
                    );
                  }
                }}
              >
                <span>ผลงานที่ผ่านมา</span>
                <span className="underline-draw absolute bottom-0 left-0 w-full h-[2px] bg-current origin-left scale-x-0"></span>
              </a>
            </div>
          </div>

          {/* Right - Terminal Window */}
          <div
            ref={terminalRef}
            className="opacity-0 hidden lg:block"
          >
            <div className="relative">
              {/* Terminal Window - Card Tilt Effect */}
              <div
                ref={terminalCardRef}
                className="rounded-2xl bg-[#0a0a0a] border border-[#262626] overflow-hidden shadow-2xl shadow-black/50"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-[#262626]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div
                    ref={statusIndicatorRef}
                    className="w-3 h-3 rounded-full bg-[#28c840] relative"
                  >
                    <div className="absolute inset-0 rounded-full bg-[#28c840] opacity-50 blur-sm"></div>
                  </div>
                  <span className="ml-3 text-xs text-[#52525b] font-mono">developer-profile.tsx</span>
                </div>

                {/* Terminal Content - Terminal Boot Effect */}
                <div ref={codeBlockRef} className="p-5 font-mono text-sm space-y-1 min-h-[280px]">
                  {/* Line Numbers Container - Fade In Animation */}
                  <div ref={lineNumbersRef} className="absolute left-5 top-5 bottom-5 flex flex-col space-y-1 opacity-0">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <span key={num} className="text-[#6b7280] select-none text-sm leading-normal">
                        {num}
                      </span>
                    ))}
                  </div>

                  <div className="code-line text-[#52525b] opacity-0">
                    <span className="text-[#6b7280] select-none mr-4">1</span>
                    <span className="text-[#c084fc]">const</span>{" "}
                    <span className="text-[#f472b6]">developer</span>{" "}
                    <span className="text-white">=</span>{" "}
                    <span className="text-[#fbbf24]">{"{"}</span>
                  </div>
                  <div className="code-line opacity-0">
                    <span className="text-[#6b7280] select-none mr-4">2</span>
                    <span className="text-[#60a5fa] ml-4">name</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-[#a5f3fc]">&quot;SUTEP JANTHAWEE&quot;</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="code-line opacity-0">
                    <span className="text-[#6b7280] select-none mr-4">3</span>
                    <span className="text-[#60a5fa] ml-4">role</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-[#a5f3fc]">&quot;Full Stack Developer&quot;</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="code-line opacity-0">
                    <span className="text-[#6b7280] select-none mr-4">4</span>
                    <span className="text-[#60a5fa] ml-4">experience</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-[#a5f3fc]">
                      &quot;<span ref={experienceCounterRef}>{experienceValue}</span>+ ปี&quot;
                    </span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="code-line opacity-0">
                    <span className="text-[#6b7280] select-none mr-4">5</span>
                    <span className="text-[#60a5fa] ml-4">speciality</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-[#a5f3fc]">&quot;Animation Website&quot;</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="code-line opacity-0">
                    <span className="text-[#6b7280] select-none mr-4">6</span>
                    <span className="text-[#60a5fa] ml-4">status</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-[#4ade80]">&quot;พร้อมรับงาน&quot;</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="code-line opacity-0">
                    <span className="text-[#6b7280] select-none mr-4">7</span>
                    <span className="text-[#fbbf24]">{"}"}</span>
                    <span className="text-white">;</span>
                  </div>
                  <div className="code-line mt-4 opacity-0">
                    <span className="text-[#6b7280] select-none mr-4">8</span>
                  </div>
                  <div className="code-line opacity-0">
                    <span className="text-[#6b7280] select-none mr-4">9</span>
                    <span className="text-[#52525b]">{"// "}</span>
                    <span className="text-[#10b981]">Ready to build your dream website</span>
                    <span className="inline-block w-2 h-4 bg-[#8b5cf6] ml-1 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 px-4 py-2 rounded-full bg-linear-to-r from-[#8b5cf6] to-[#ec4899] text-white text-xs font-bold shadow-lg shadow-[#8b5cf6]/30">
                🚀 พร้อมรับงาน
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-20 h-20 border-2 border-[#262626] rounded-xl opacity-50 -z-10" />
              <div className="absolute -top-6 -right-6 w-16 h-16 border-2 border-dashed border-[#8b5cf6]/30 rounded-full opacity-50 -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
          });
        }}
        className="cursor-pointer absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-mono text-xs text-[#52525b]">scroll</span>
        <svg
          className="w-5 h-5 text-[#52525b]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* Mobile Code Decoration */}
      <div className="lg:hidden absolute bottom-32 left-6 right-6 font-mono text-[10px] text-[#262626] opacity-50">
        <div className="flex justify-between">
          <span>{"<Website"}</span>
          <span>{"animation={true}"}</span>
          <span>{"/>"}</span>
        </div>
      </div>
    </section>
  );
}
