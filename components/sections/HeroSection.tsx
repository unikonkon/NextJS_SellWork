"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const commentRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Comment animation
      tl.fromTo(
        commentRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );

      // Title animation - letter by letter effect
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );

      // Buttons stagger animation
      tl.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Code Comment */}
        <span
          ref={commentRef}
          className="inline-block font-mono text-sm text-[#52525b] mb-6 opacity-0"
        >
          <span className="text-[#10b981]">{"// "}</span>
          Hello World - Welcome to my portfolio
        </span>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-hero mb-6 opacity-0"
        >
          <span className="block text-white">Creative</span>
          <span className="block gradient-text-purple">Full Stack Developer</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 opacity-0"
        >
          Building digital experiences with modern technologies.
          <br />
          <span className="font-mono text-sm text-[#52525b]">
            {"<"}
            <span className="text-[#ec4899]">Next.js</span>
            {" + "}
            <span className="text-[#06b6d4]">TypeScript</span>
            {" + "}
            <span className="text-[#8b5cf6]">AI</span>
            {" />"}
          </span>
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#work" className="btn-primary group">
            <span>View Work</span>
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
          </a>
          <a href="#contact" className="btn-secondary">
            <span>Contact Me</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
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
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 font-mono text-[#262626] text-xs hidden lg:block">
        <div>{"{"}</div>
        <div className="pl-4">&quot;name&quot;: &quot;developer&quot;,</div>
        <div className="pl-4">&quot;role&quot;: &quot;fullstack&quot;,</div>
        <div className="pl-4">&quot;available&quot;: true</div>
        <div>{"}"}</div>
      </div>

      <div className="absolute bottom-1/4 right-10 font-mono text-[#262626] text-xs hidden lg:block">
        <div>const skills = [</div>
        <div className="pl-4">&quot;React&quot;,</div>
        <div className="pl-4">&quot;Next.js&quot;,</div>
        <div className="pl-4">&quot;TypeScript&quot;</div>
        <div>];</div>
      </div>
    </section>
  );
}
