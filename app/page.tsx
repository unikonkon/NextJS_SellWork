"use client";

import GridBackground from "@/components/layout/GridBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProjectSection from "@/components/sections/ProjectSection";

export default function Home() {
  return (
    <>
      {/* Background */}
      <GridBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Project Section */}
        <ProjectSection />

        {/* About Section Placeholder */}
        <section id="about" className="relative py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Label */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#06b6d4]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#06b6d4]">
                ABOUT
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#06b6d4]" />
            </div>

            {/* Title */}
            <h2 className="text-section mb-8">
              <span className="text-white">About </span>
              <span className="gradient-text-cyan italic">Me</span>
            </h2>

            {/* Content */}
            <div className="space-y-6 text-left">
              <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626]">
                <div className="font-mono text-sm text-[#52525b] mb-4">
                  <span className="text-[#8b5cf6]">const</span>{" "}
                  <span className="text-[#ec4899]">developer</span>{" "}
                  <span className="text-white">=</span>{" "}
                  <span className="text-[#06b6d4]">{"{"}</span>
                </div>

                <div className="pl-6 space-y-3 font-mono text-sm">
                  <div>
                    <span className="text-[#a1a1aa]">name:</span>{" "}
                    <span className="text-[#10b981]">&quot;Full Stack Developer&quot;</span>,
                  </div>
                  <div>
                    <span className="text-[#a1a1aa]">focus:</span>{" "}
                    <span className="text-[#10b981]">&quot;Web Development & AI Integration&quot;</span>,
                  </div>
                  <div>
                    <span className="text-[#a1a1aa]">skills:</span>{" "}
                    <span className="text-[#06b6d4]">[</span>
                  </div>
                  <div className="pl-4 text-[#10b981]">
                    &quot;Next.js&quot;, &quot;React&quot;, &quot;TypeScript&quot;,
                    <br />
                    &quot;Node.js&quot;, &quot;NestJS&quot;, &quot;Python&quot;,
                    <br />
                    &quot;TailwindCSS&quot;, &quot;GSAP&quot;, &quot;Three.js&quot;
                  </div>
                  <div>
                    <span className="text-[#06b6d4]">]</span>,
                  </div>
                  <div>
                    <span className="text-[#a1a1aa]">passion:</span>{" "}
                    <span className="text-[#10b981]">&quot;Building beautiful, functional digital experiences&quot;</span>
                  </div>
                </div>

                <div className="font-mono text-sm text-[#06b6d4] mt-4">{"}"}</div>
              </div>

              {/* Description */}
              <p className="text-[#a1a1aa] leading-relaxed">
                I&apos;m a passionate developer who loves creating modern web applications
                with cutting-edge technologies. My expertise spans from frontend development
                with React and Next.js to backend solutions with Node.js and Python.
                I&apos;m particularly interested in AI integration and building tools that
                make people&apos;s lives easier.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
