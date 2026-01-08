"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface BackgroundPreviewCustomProps {
    preview: string;
    themeColor?: string;
    size?: "small" | "medium";
}

// Helper function to convert hex to rgba
const withOpacity = (color: string, opacity: number) => {
    if (color.startsWith("#")) {
        const hex = color.slice(1);
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
};

// Code snippets for floating animation
const codeSnippets = [
    "const",
    "function()",
    "return",
    "import",
    "=>",
    "{}",
    "</>",
    "()",
    "[]",
    "export",
    "useState",
    "useEffect",
    "gsap",
];

// Code lines for background typing animation
const backgroundCodeLines = [
    "const website = new Website({ animation: true });",
    "const developer = { name: 'SUTEP', status: 'available' };",
    "import { gsap } from 'gsap';",
    "const timeline = gsap.timeline({ delay: 0.5 });",
    "gsap.to(element, { opacity: 1, duration: 0.5 });",
    "const animation = gsap.timeline({ delay: 0.5 });",
    "animation.to(element, { opacity: 1, duration: 0.5 });",
    "animation.to(element, { opacity: 0, duration: 0.5 });",
    "animation.to(element, { opacity: 1, duration: 0.5 });",
    "import { useState } from 'react';",
    "import { useEffect } from 'react';"
];

// Export function for Grid Custom Background
export function GridCustomBackground({ themeColor = "#8b5cf6", customColor, isLivePreview = false }: { themeColor?: string; customColor?: string; isLivePreview?: boolean }) {
    const backgroundGridRef = useRef<HTMLDivElement>(null);
    const backgroundCodeLinesRef = useRef<HTMLDivElement>(null);
    const floatingCodeSnippetsRef = useRef<HTMLDivElement>(null);
    const primaryColor = customColor || themeColor;
    
    // Adjust sizes based on preview mode
    const gridSize = isLivePreview ? "30px 30px" : "20px 20px";
    const codeLineCount = isLivePreview ? 6 : 3;
    const snippetCount = isLivePreview ? 20 : 13;
    const codeLineFontSize = isLivePreview ? "13px" : "11px";
    const snippetFontSize = isLivePreview ? 10 : 8;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animated Background Typing Code Lines
            if (backgroundCodeLinesRef.current) {
                const codeLineElements = backgroundCodeLinesRef.current.querySelectorAll('.bg-code-line');
                const animateCodeLines = () => {
                    codeLineElements.forEach((line, index) => {
                        const lineElement = line as HTMLElement;
                        const codeText = backgroundCodeLines[index % backgroundCodeLines.length];
                        const randomDelay = index * 0.2 + Math.random() * 0.3;
                        const randomOpacity = 0.03 + Math.random() * 0.05;
                        const typingDuration = 1.5 + Math.random() * 1;
                        const fadeOutDuration = 0.4;
                        const pauseDuration = 0.8 + Math.random() * 0.7;

                        gsap.set(lineElement, { text: "", opacity: 0 });
                        const lineTl = gsap.timeline({ delay: randomDelay, repeat: -1, repeatDelay: pauseDuration });
                        lineTl.to(lineElement, { text: codeText, duration: typingDuration, ease: "none" });
                        lineTl.to(lineElement, { opacity: randomOpacity, duration: typingDuration * 0.3, ease: "power2.out" }, 0);
                        lineTl.to({}, { duration: 0.3 });
                        lineTl.to(lineElement, { opacity: 0, duration: fadeOutDuration, ease: "power2.in" });
                    });
                };
                animateCodeLines();
            }

            // Animated Background Floating Code Snippets
            if (floatingCodeSnippetsRef.current) {
                const snippetElements = floatingCodeSnippetsRef.current.querySelectorAll('.floating-snippet');
                snippetElements.forEach((snippet, index) => {
                    const snippetElement = snippet as HTMLElement;
                    const floatDistance = 10 + Math.random() * 15;
                    const floatDuration = 4 + Math.random() * 3;
                    const opacity = 0.02 + Math.random() * 0.04;
                    const delay = index * 0.1 + Math.random() * 0.5;
                    const direction = index % 2 === 0 ? 1 : -1;
                    gsap.set(snippetElement, { opacity: opacity });
                    gsap.to(snippetElement, { y: floatDistance * direction, duration: floatDuration, ease: "sine.inOut", repeat: -1, yoyo: true, delay: delay });
                });
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ backgroundColor: withOpacity(primaryColor, 0.12) }}>
            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-70"
                style={{
                    backgroundImage: `linear-gradient(${withOpacity(primaryColor, 0.1)} 1px, transparent 1px), linear-gradient(90deg, ${withOpacity(primaryColor, 0.1)} 1px, transparent 1px)`,
                    backgroundSize: gridSize,
                }}
            />
            {/* Animated Background Typing Code Lines */}
            <div ref={backgroundCodeLinesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                {backgroundCodeLines.slice(0, codeLineCount).map((_, index) => {
                    const top = `${15 + (index * 25) % 70}%`;
                    const left = `${10 + (index * 30) % 80}%`;
                    const rotation = (index % 3) * 0.2 - 0.2;
                    return (
                        <div
                            key={index}
                            className="bg-code-line absolute font-mono text-[#ffffff] whitespace-nowrap"
                            style={{ top, left, transform: `rotate(${rotation}deg)`, opacity: 0, fontSize: codeLineFontSize }}
                        />
                    );
                })}
            </div>
            {/* Animated Background Floating Code Snippets */}
            <div ref={floatingCodeSnippetsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                {codeSnippets.slice(0, snippetCount).map((snippet, index) => {
                    const top = `${10 + (index * 12) % 80}%`;
                    const left = `${8 + (index * 15) % 85}%`;
                    const fontSize = snippetFontSize + (index % 2) * 1;
                    return (
                        <div
                            key={index}
                            className="floating-snippet absolute font-mono text-[#ffffff] whitespace-nowrap"
                            style={{ top, left, fontSize: `${fontSize}px`, opacity: 0 }}
                        >
                            {snippet}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Export function for Typing Lines Background
export function TypingLinesBackground({ themeColor = "#8b5cf6", customColor, isLivePreview = false }: { themeColor?: string; customColor?: string; isLivePreview?: boolean }) {
    const backgroundCodeLinesRef = useRef<HTMLDivElement>(null);
    const primaryColor = customColor || themeColor;
    
    // Adjust sizes based on preview mode
    const codeLineCount = isLivePreview ? 8 : 5;
    const codeLineFontSize = isLivePreview ? "13px" : "11px";

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (backgroundCodeLinesRef.current) {
                const codeLineElements = backgroundCodeLinesRef.current.querySelectorAll('.bg-code-line');
                const animateCodeLines = () => {
                    codeLineElements.forEach((line, index) => {
                        const lineElement = line as HTMLElement;
                        const codeText = backgroundCodeLines[index % backgroundCodeLines.length];
                        const randomDelay = index * 0.2 + Math.random() * 0.3;
                        const randomOpacity = 0.03 + Math.random() * 0.05;
                        const typingDuration = 1.5 + Math.random() * 1;
                        const fadeOutDuration = 0.4;
                        const pauseDuration = 0.8 + Math.random() * 0.7;
                        gsap.set(lineElement, { text: "", opacity: 0 });
                        const lineTl = gsap.timeline({ delay: randomDelay, repeat: -1, repeatDelay: pauseDuration });
                        lineTl.to(lineElement, { text: codeText, duration: typingDuration, ease: "none" });
                        lineTl.to(lineElement, { opacity: randomOpacity, duration: typingDuration * 0.3, ease: "power2.out" }, 0);
                        lineTl.to({}, { duration: 0.3 });
                        lineTl.to(lineElement, { opacity: 0, duration: fadeOutDuration, ease: "power2.in" });
                    });
                };
                animateCodeLines();
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ backgroundColor: withOpacity(primaryColor, 0.12) }}>
            <div ref={backgroundCodeLinesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                {backgroundCodeLines.slice(0, codeLineCount).map((_, index) => {
                    const top = `${15 + (index * 25) % 70}%`;
                    const left = `${10 + (index * 30) % 80}%`;
                    const rotation = (index % 3) * 0.2 - 0.2;
                    return (
                        <div
                            key={index}
                            className="bg-code-line absolute font-mono text-[#ffffff] whitespace-nowrap"
                            style={{ top, left, transform: `rotate(${rotation}deg)`, opacity: 0, fontSize: codeLineFontSize }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

// Export function for Floating Snippets Background
export function FloatingSnippetsBackground({ themeColor = "#8b5cf6", customColor, isLivePreview = false }: { themeColor?: string; customColor?: string; isLivePreview?: boolean }) {
    const floatingCodeSnippetsRef = useRef<HTMLDivElement>(null);
    const primaryColor = customColor || themeColor;
    
    // Adjust sizes based on preview mode
    const snippetCount = isLivePreview ? 25 : 18;
    const snippetFontSize = isLivePreview ? 10 : 8;

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (floatingCodeSnippetsRef.current) {
                const snippetElements = floatingCodeSnippetsRef.current.querySelectorAll('.floating-snippet');
                snippetElements.forEach((snippet, index) => {
                    const snippetElement = snippet as HTMLElement;
                    const floatDistance = 10 + Math.random() * 15;
                    const floatDuration = 4 + Math.random() * 3;
                    const opacity = 0.02 + Math.random() * 0.04;
                    const delay = index * 0.1 + Math.random() * 0.5;
                    const direction = index % 2 === 0 ? 1 : -1;
                    gsap.set(snippetElement, { opacity: opacity });
                    gsap.to(snippetElement, { y: floatDistance * direction, duration: floatDuration, ease: "sine.inOut", repeat: -1, yoyo: true, delay: delay });
                });
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ backgroundColor: withOpacity(primaryColor, 0.12) }}>
            <div ref={floatingCodeSnippetsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                {codeSnippets.slice(0, snippetCount).map((snippet, index) => {
                    const top = `${10 + (index * 12) % 80}%`;
                    const left = `${8 + (index * 15) % 85}%`;
                    const fontSize = snippetFontSize + (index % 2) * 1;
                    return (
                        <div
                            key={index}
                            className="floating-snippet absolute font-mono text-[#ffffff] whitespace-nowrap"
                            style={{ top, left, fontSize: `${fontSize}px`, opacity: 0 }}
                        >
                            {snippet}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Export function for Grid Typing Background
export function GridTypingBackground({ themeColor = "#8b5cf6", customColor, isLivePreview = false }: { themeColor?: string; customColor?: string; isLivePreview?: boolean }) {
    const backgroundGridRef = useRef<HTMLDivElement>(null);
    const backgroundCodeLinesRef = useRef<HTMLDivElement>(null);
    const primaryColor = customColor || themeColor;
    
    // Adjust sizes based on preview mode
    const gridSize = isLivePreview ? "30px 30px" : "20px 20px";
    const codeLineCount = isLivePreview ? 7 : 4;
    const codeLineFontSize = isLivePreview ? "13px" : "11px";

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (backgroundCodeLinesRef.current) {
                const codeLineElements = backgroundCodeLinesRef.current.querySelectorAll('.bg-code-line');
                const animateCodeLines = () => {
                    codeLineElements.forEach((line, index) => {
                        const lineElement = line as HTMLElement;
                        const codeText = backgroundCodeLines[index % backgroundCodeLines.length];
                        const randomDelay = index * 0.2 + Math.random() * 0.3;
                        const randomOpacity = 0.03 + Math.random() * 0.05;
                        const typingDuration = 1.5 + Math.random() * 1;
                        const fadeOutDuration = 0.4;
                        const pauseDuration = 0.8 + Math.random() * 0.7;
                        gsap.set(lineElement, { text: "", opacity: 0 });
                        const lineTl = gsap.timeline({ delay: randomDelay, repeat: -1, repeatDelay: pauseDuration });
                        lineTl.to(lineElement, { text: codeText, duration: typingDuration, ease: "none" });
                        lineTl.to(lineElement, { opacity: randomOpacity, duration: typingDuration * 0.3, ease: "power2.out" }, 0);
                        lineTl.to({}, { duration: 0.3 });
                        lineTl.to(lineElement, { opacity: 0, duration: fadeOutDuration, ease: "power2.in" });
                    });
                };
                animateCodeLines();
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ backgroundColor: withOpacity(primaryColor, 0.12) }}>
            <div
                className="absolute inset-0 opacity-70"
                style={{
                    backgroundImage: `linear-gradient(${withOpacity(primaryColor, 0.1)} 1px, transparent 1px), linear-gradient(90deg, ${withOpacity(primaryColor, 0.1)} 1px, transparent 1px)`,
                    backgroundSize: gridSize,
                }}
            />
            <div ref={backgroundCodeLinesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                {backgroundCodeLines.slice(0, codeLineCount).map((_, index) => {
                    const top = `${15 + (index * 25) % 70}%`;
                    const left = `${10 + (index * 30) % 80}%`;
                    const rotation = (index % 3) * 0.2 - 0.2;
                    return (
                        <div
                            key={index}
                            className="bg-code-line absolute font-mono text-[#ffffff] whitespace-nowrap"
                            style={{ top, left, transform: `rotate(${rotation}deg)`, opacity: 0, fontSize: codeLineFontSize }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

// Export function for Grid Floating Background
export function GridFloatingBackground({ themeColor = "#8b5cf6", customColor, isLivePreview = false }: { themeColor?: string; customColor?: string; isLivePreview?: boolean }) {
    const backgroundGridRef = useRef<HTMLDivElement>(null);
    const floatingCodeSnippetsRef = useRef<HTMLDivElement>(null);
    const primaryColor = customColor || themeColor;
    
    // Adjust sizes based on preview mode
    const gridSize = isLivePreview ? "30px 30px" : "20px 20px";
    const snippetCount = isLivePreview ? 20 : 13;
    const snippetFontSize = isLivePreview ? 10 : 8;

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (floatingCodeSnippetsRef.current) {
                const snippetElements = floatingCodeSnippetsRef.current.querySelectorAll('.floating-snippet');
                snippetElements.forEach((snippet, index) => {
                    const snippetElement = snippet as HTMLElement;
                    const floatDistance = 10 + Math.random() * 15;
                    const floatDuration = 4 + Math.random() * 3;
                    const opacity = 0.02 + Math.random() * 0.04;
                    const delay = index * 0.1 + Math.random() * 0.5;
                    const direction = index % 2 === 0 ? 1 : -1;
                    gsap.set(snippetElement, { opacity: opacity });
                    gsap.to(snippetElement, { y: floatDistance * direction, duration: floatDuration, ease: "sine.inOut", repeat: -1, yoyo: true, delay: delay });
                });
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ backgroundColor: withOpacity(primaryColor, 0.12) }}>
            <div
                className="absolute inset-0 opacity-70"
                style={{
                    backgroundImage: `linear-gradient(${withOpacity(primaryColor, 0.1)} 1px, transparent 1px), linear-gradient(90deg, ${withOpacity(primaryColor, 0.1)} 1px, transparent 1px)`,
                    backgroundSize: gridSize,
                }}
            />
            <div ref={floatingCodeSnippetsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                {codeSnippets.slice(0, snippetCount).map((snippet, index) => {
                    const top = `${10 + (index * 12) % 80}%`;
                    const left = `${8 + (index * 15) % 85}%`;
                    const fontSize = snippetFontSize + (index % 2) * 1;
                    return (
                        <div
                            key={index}
                            className="floating-snippet absolute font-mono text-[#ffffff] whitespace-nowrap"
                            style={{ top, left, fontSize: `${fontSize}px`, opacity: 0 }}
                        >
                            {snippet}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function BackgroundPreviewCustom({ preview, themeColor, size = "medium" }: BackgroundPreviewCustomProps) {
    const heightClass = size === "small" ? "h-24" : "h-32";
    const primaryColor = themeColor || "#8b5cf6";


    const previewStyles: Record<string, React.JSX.Element> = {
        "grid-custom": (
            <div className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`} style={{ backgroundColor: "#0d0d0d" }}>
                <GridCustomBackground themeColor={primaryColor} />
            </div>
        ),
        "typing-lines": (
            <div className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`} style={{ backgroundColor: "#0d0d0d" }}>
                <TypingLinesBackground themeColor={primaryColor} />
            </div>
        ),
        "floating-snippets": (
            <div className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`} style={{ backgroundColor: "#0d0d0d" }}>
                <FloatingSnippetsBackground themeColor={primaryColor} />
            </div>
        ),
        "grid-typing": (
            <div className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`} style={{ backgroundColor: "#0d0d0d" }}>
                <GridTypingBackground themeColor={primaryColor} />
            </div>
        ),
        "grid-floating": (
            <div className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center relative overflow-hidden`} style={{ backgroundColor: "#0d0d0d" }}>
                <GridFloatingBackground themeColor={primaryColor} />
            </div>
        ),
        none: (
            <div className={`w-full ${heightClass} rounded-lg border border-[#262626] flex items-center justify-center bg-[#0d0d0d]`}>
                <span className="text-[10px] text-[#52525b]">ไม่มี Background</span>
            </div>
        ),
    };

    return previewStyles[preview] || previewStyles.none;
}

