"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "@/components/ui/ProjectCard";
import { featuredProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );

      // Timeline draw animation
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16 text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#8b5cf6]" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8b5cf6]">
            CASE STUDIES
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#8b5cf6]" />
        </div>

        {/* Title */}
        <h2 className="text-section">
          <span className="text-white">Curated </span>
          <span className="gradient-text-pink italic">Work</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-[#a1a1aa] max-w-xl mx-auto">
          <span className="font-mono text-[#52525b]">{"// "}</span>
          A selection of projects that showcase my skills and passion for building digital products
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto relative">
        {/* Timeline (Desktop only) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
          <div
            ref={timelineRef}
            className="w-full h-full origin-top"
            style={{
              background: "repeating-linear-gradient(to bottom, #262626 0, #262626 8px, transparent 8px, transparent 16px)",
            }}
          />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`relative ${index % 2 === 1 ? "lg:mt-24" : ""}`}
            >
              {/* Timeline Dot (Desktop only) */}
              <div
                className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#8b5cf6] border-4 border-[#0a0a0a] z-10 ${
                  index % 2 === 0 ? "-right-10" : "-left-10"
                }`}
                style={{
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                }}
              />

              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#a1a1aa] hover:text-white transition-colors group"
          >
            <span>View all projects on GitHub</span>
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
        </div>
      </div>

      {/* Decorative Line Numbers */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#262626] space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>{String(i + 100).padStart(3, "0")}</div>
        ))}
      </div>
    </section>
  );
}
