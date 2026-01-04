"use client";

import GridBackground from "@/components/layout/GridBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProjectSection from "@/components/sections/ProjectSection";
import PricingSection from "@/components/sections/PricingSection";

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

        {/* Animation Service Section */}
        <PricingSection />

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
              <span className="text-white">ABOUT </span>
              <span className="gradient-text-cyan italic">ME</span>
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
                    <span className="text-[#10b981]">&quot;นักพัฒนา Full Stack&quot;</span>,
                  </div>
                  <div>
                    <span className="text-[#a1a1aa]">focus:</span>{" "}
                    <span className="text-[#10b981]">&quot;การพัฒนาเว็บไซต์&quot;</span>,
                  </div>
                  <div>
                    <span className="text-[#a1a1aa]">skills:</span>{" "}
                    <span className="text-[#06b6d4]">{"{"}</span>
                  </div>
                  <div className="pl-4 space-y-2">
                    <div>
                      <span className="text-[#a1a1aa]">languages:</span>{" "}
                      <span className="text-[#06b6d4]">{"{"}</span>
                      <div className="pl-4 text-[#10b981]">
                        &quot;TypeScript&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;JavaScript&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;HTML/CSS&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;SQL&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Dart&quot;: <span className="text-[#f59e0b]">&quot;คุ้นเคย&quot;</span>,
                        <br />
                        &quot;Python&quot;: <span className="text-[#f59e0b]">&quot;คุ้นเคย&quot;</span>
                      </div>
                      <span className="text-[#06b6d4]">{"}"}</span>,
                    </div>
                    <div>
                      <span className="text-[#a1a1aa]">frameworks:</span>{" "}
                      <span className="text-[#06b6d4]">{"{"}</span>
                      <div className="pl-4 text-[#10b981]">
                        &quot;React/Next.js&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;NestJS&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Express.js&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;Flutter&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Electron&quot;: <span className="text-[#f59e0b]">&quot;คุ้นเคย&quot;</span>
                      </div>
                      <span className="text-[#06b6d4]">{"}"}</span>,
                    </div>
                    <div>
                      <span className="text-[#a1a1aa]">databases:</span>{" "}
                      <span className="text-[#06b6d4]">{"{"}</span>
                      <div className="pl-4 text-[#10b981]">
                        &quot;PostgreSQL&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;Firebase&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Supabase&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Prisma&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Kibana&quot;: <span className="text-[#f59e0b]">&quot;คุ้นเคย&quot;</span>
                      </div>
                      <span className="text-[#06b6d4]">{"}"}</span>,
                    </div>
                    <div>
                      <span className="text-[#a1a1aa]">devops:</span>{" "}
                      <span className="text-[#06b6d4]">{"{"}</span>
                      <div className="pl-4 text-[#10b981]">
                        &quot;Git&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;Vercel&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;Docker&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Jenkins&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>
                      </div>
                      <span className="text-[#06b6d4]">{"}"}</span>,
                    </div>
                    <div>
                      <span className="text-[#a1a1aa]">testing:</span>{" "}
                      <span className="text-[#06b6d4]">{"{"}</span>
                      <div className="pl-4 text-[#10b981]">
                        &quot;Postman&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;Jest&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;SonarQube&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Discord&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;Slack&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Lark&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Monday&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>
                      </div>
                      <span className="text-[#06b6d4]">{"}"}</span>,
                    </div>
                    <div>
                      <span className="text-[#a1a1aa]">design:</span>{" "}
                      <span className="text-[#06b6d4]">{"{"}</span>
                      <div className="pl-4 text-[#10b981]">
                        &quot;Figma&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;Draw.io&quot;: <span className="text-[#f59e0b]">&quot;ขั้นสูง&quot;</span>,
                        <br />
                        &quot;Canva&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Stitch&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;motion.dev&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;gsap&quot;: <span className="text-[#f59e0b]">&quot;ปานกลาง&quot;</span>,
                        <br />
                        &quot;Three.js&quot;: <span className="text-[#f59e0b]">&quot;คุ้นเคย&quot;</span>
                      </div>
                      <span className="text-[#06b6d4]">{"}"}</span>,
                    </div>
                  </div>
                  <div>
                    <span className="text-[#06b6d4]">{"}"}</span>,
                  </div>
                  <div>
                    <span className="text-[#a1a1aa]">passion:</span>{" "}
                    <span className="text-[#10b981]">&quot;การสร้างประสบการณ์ดิจิทัลที่สวยงามและใช้งานได้จริง&quot;</span>
                  </div>
                </div>

                <div className="font-mono text-sm text-[#06b6d4] mt-4">{"}"}</div>
              </div>

              {/* Description */}
              <p className="text-[#a1a1aa] leading-relaxed">
                ฉันเป็นนักพัฒนาที่มีความหลงใหลในการสร้างแอปพลิเคชันเว็บสมัยใหม่ด้วยเทคโนโลยีที่ล้ำสมัย
                ความเชี่ยวชาญของฉันครอบคลุมตั้งแต่การพัฒนา Frontend ด้วย React และ Next.js
                ไปจนถึงโซลูชัน Backend ด้วย Node.js
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
