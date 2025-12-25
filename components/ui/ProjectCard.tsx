"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { Project, ColorScheme } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const colorSchemeClasses: Record<ColorScheme, { gradient: string; glow: string; border: string }> = {
  pink: {
    gradient: "card-gradient-pink",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.4)]",
    border: "hover:border-[#ec4899]/30",
  },
  purple: {
    gradient: "card-gradient-purple",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.4)]",
    border: "hover:border-[#8b5cf6]/30",
  },
  cyan: {
    gradient: "card-gradient-cyan",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)]",
    border: "hover:border-[#06b6d4]/30",
  },
  orange: {
    gradient: "card-gradient-orange",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)]",
    border: "hover:border-[#f97316]/30",
  },
  orangeLight: {
    gradient: "card-gradient-orange",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(251,146,60,0.4)]",
    border: "hover:border-[#fb923c]/30",
  },
  green: {
    gradient: "card-gradient-green",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]",
    border: "hover:border-[#10b981]/30",
  },
  indigo: {
    gradient: "card-gradient-indigo",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]",
    border: "hover:border-[#6366f1]/30",
  },
  blue: {
    gradient: "card-gradient-cyan",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)]",
    border: "hover:border-[#3b82f6]/30",
  },
  yellow: {
    gradient: "card-gradient-orange",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.4)]",
    border: "hover:border-[#eab308]/30",
  },
  red: {
    gradient: "card-gradient-pink",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]",
    border: "hover:border-[#ef4444]/30",
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const colorClasses = colorSchemeClasses[project.colorScheme] || colorSchemeClasses.purple;

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card fade in animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
          delay: index * 0.1,
        }
      );

      // Parallax effect on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden transition-all duration-500",
        colorClasses.glow,
        colorClasses.border,
        "hover:-translate-y-2"
      )}
    >
      {/* Header */}
      <div className="p-6 pb-0 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Index Number */}
          <span className="line-number text-2xl font-bold text-[#333]">
            {project.index}
          </span>
          {/* Type Badge */}
          <span className="terminal-badge text-xs uppercase tracking-wider">
            {project.type}
          </span>
        </div>
        {/* Date Badge */}
        <span className="px-3 py-1 text-xs font-mono text-[#52525b] border border-[#262626] rounded-full">
          {project.date}
        </span>
      </div>

      {/* Title */}
      <div className="px-6 pt-4">
        <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:gradient-text-purple transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-[#52525b] font-mono mt-1">{project.role}</p>
      </div>

      {/* Description Card */}
      <div className={cn("mx-6 mt-4 p-4 rounded-xl", colorClasses.gradient)}>
        <p className="text-sm text-[#a1a1aa] leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Image Preview */}
      <div ref={imageRef} className="relative h-48 mt-4 mx-6 rounded-lg overflow-hidden bg-[#0a0a0a]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60" />
      </div>

      {/* Tech Stack */}
      <div className="p-6 pt-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="terminal-badge">
              <span className="text-[#8b5cf6]">{">"}</span>
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="terminal-badge text-[#52525b]">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Links */}
      <div className="px-6 pb-6 flex gap-3">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-primary text-sm py-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-secondary text-sm py-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
