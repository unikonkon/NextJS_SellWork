"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
          duration: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );

      // Project cards animation
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              toggleActions: "play none none none",
            },
            delay: index * 0.005,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#8b5cf6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-[#ec4899]/10 rounded-full blur-[120px]" />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto mb-20 text-center relative z-10">
        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-16 bg-linear-to-r from-transparent to-[#8b5cf6]" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8b5cf6]">
            SELECTED WORKS
          </span>
          <span className="h-px w-16 bg-linear-to-l from-transparent to-[#8b5cf6]" />
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          <span className="text-white">Featured </span>
          <span className="bg-linear-to-r from-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent italic">Projects</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-[#a1a1aa] max-w-2xl mx-auto text-lg">
          ผลงานที่ถูกคัดสรรมาเพื่อแสดงถึงทักษะและความหลงใหลในการสร้างสรรค์ผลิตภัณฑ์ดิจิทัล
        </p>
      </div>

      {/* Projects Grid - Large Cards */}
      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {featuredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card group relative rounded-3xl bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#262626] overflow-hidden transition-all duration-500 hover:border-[#8b5cf6]/40 hover:shadow-[0_0_60px_-15px_rgba(139,92,246,0.3)]`}
          >
            <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
              {/* Image Section */}
              <div className="relative lg:w-[55%] h-[300px] lg:h-[450px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                {/* Index Number - Floating */}
                <div className="absolute top-6 left-6 lg:hidden">
                  <span className="text-6xl font-bold text-white/10">{project.index}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="relative lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center">
                {/* Index Number - Desktop */}
                <div className="hidden lg:block absolute top-8 right-8">
                  <span className="text-8xl font-bold text-white/5">{project.index}</span>
                </div>

                {/* Type & Date */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full ${project.colorScheme === 'orange'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    }`}>
                    {project.type}
                  </span>
                  <span className="text-sm font-mono text-[#52525b]">{project.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#ec4899] group-hover:to-[#8b5cf6] group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>

                {/* Role */}
                <p className="text-sm text-[#8b5cf6] font-mono mb-4">{project.role}</p>

                {/* Description */}
                <p className="text-[#a1a1aa] leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-mono text-[#a1a1aa] bg-[#262626] rounded-lg border border-[#333] hover:border-[#8b5cf6]/50 hover:text-white transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/btn flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${project.colorScheme === 'orange'
                          ? 'bg-linear-to-r from-orange-500 to-amber-500 text-white hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)]'
                          : 'bg-linear-to-r from-indigo-500 to-purple-500 text-white hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]'
                        }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>View Live</span>
                      <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-[#262626] text-white border border-[#333] hover:border-[#8b5cf6]/50 hover:bg-[#333] transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#262626] space-y-4">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i}>{String(i + 100).padStart(3, "0")}</div>
        ))}
      </div>
    </section>
  );
}
