// ==================== GSAP ANIMATION EXECUTOR ====================
// Execute animation based on type - ครอบคลุมทุก Animation ที่กำหนดใน SECTION_ANIMATIONS

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Types
interface AnimationOptions {
  element: HTMLElement;
  animationType: string;
  children?: HTMLElement[];
  duration?: number;
  delay?: number;
  ease?: string;
  scrollTrigger?: boolean;
  onComplete?: () => void;
}

// ==================== MAIN ANIMATION EXECUTOR ====================
export function executeAnimation({
  element,
  animationType,
  children = [],
  duration,
  delay = 0,
  ease,
  scrollTrigger = true,
  onComplete,
}: AnimationOptions): gsap.core.Timeline | gsap.core.Tween | null {
  if (!element) return null;

  const childElements = children.length > 0 ? children : Array.from(element.children) as HTMLElement[];
  
  // Default ScrollTrigger config
  const scrollConfig = scrollTrigger
    ? {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    : {};

  switch (animationType) {
    // ==================== HERO ANIMATIONS ====================
    case "fade-up":
      return gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.8,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "scale-in":
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.6,
          delay,
          ease: ease || "back.out(1.7)",
          ...scrollConfig,
          onComplete,
        }
      );

    case "parallax-bg":
      gsap.fromTo(
        element,
        { backgroundPositionY: "30%" },
        {
          backgroundPositionY: "0%",
          duration: duration || 1.2,
          ease: ease || "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
      return gsap.fromTo(
        element,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay, ...scrollConfig, onComplete }
      );

    case "text-reveal": {
      // Get text from element or children with typewriter-text class
      let textElement = element.querySelector(".typewriter-text") as HTMLElement | null;
      if (!textElement && element.classList.contains("typewriter-text")) {
        textElement = element;
      }
      
      if (!textElement) {
        // Fallback to clipPath reveal if no text element found
        return gsap.fromTo(
          element,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: duration || 1,
            delay,
            ease: ease || "power3.out",
            ...scrollConfig,
            onComplete,
          }
        );
      }

      const text = textElement.textContent?.trim() || "";
      if (!text) {
        return null;
      }

      // Split text into characters and wrap each in a span
      const chars = text.split("");
      const wrappedText = chars
        .map((char) => {
          if (char === " ") {
            return '<span class="char-reveal" style="display: inline-block;">&nbsp;</span>';
          }
          return `<span class="char-reveal" style="display: inline-block;">${char}</span>`;
        })
        .join("");

      // Replace text with wrapped version
      textElement.innerHTML = wrappedText;

      // Get all character spans
      const charSpans = textElement.querySelectorAll(".char-reveal") as NodeListOf<HTMLElement>;

      // Animate each character appearing
      return gsap.fromTo(
        charSpans,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.05,
          delay,
          stagger: 0.03,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "split-reveal":
      return gsap.fromTo(
        element,
        { clipPath: "inset(0 50% 0 50%)" },
        {
          clipPath: "inset(0 0% 0 0%)",
          duration: duration || 0.8,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "typewriter": {
      // Get text from element or use default text
      let text = element.textContent?.trim() || "";
      
      // If element has typewriter-text class or no text, try to get from children
      if (!text || element.classList.contains("typewriter-text")) {
        const textElement = element.querySelector(".typewriter-text") || element;
        text = textElement.textContent?.trim() || text || "Sample Text";
      }
      
      // Store original text and clear
      const originalText = text;
      
      // Clear text content
      if (element.querySelector(".typewriter-text")) {
        const textEl = element.querySelector(".typewriter-text");
        if (textEl) {
          textEl.textContent = "";
        }
      } else {
        element.textContent = "";
      }
      
      // Use TextPlugin to animate typing
      const targetElement = element.querySelector(".typewriter-text") || element;
      
      return gsap.to(targetElement, {
        text: { value: originalText, delimiter: "" },
        duration: duration || originalText.length * 0.05,
        delay,
        ease: ease || "none",
        ...scrollConfig,
        onComplete,
      });
    }

    case "glitch": {
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.1 })
        .to(element, { x: -5, duration: 0.05, repeat: 3, yoyo: true })
        .to(element, { x: 5, duration: 0.05, repeat: 3, yoyo: true })
        .to(element, { x: 0, skewX: 5, duration: 0.05 })
        .to(element, { skewX: -5, duration: 0.05 })
        .to(element, { skewX: 0, duration: 0.05 });
      return tl;
    }

    // ==================== SLIDE ANIMATIONS ====================
    case "slide-left":
      return gsap.fromTo(
        element,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.7,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "slide-right":
      return gsap.fromTo(
        element,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.7,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "slide-opposite": {
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      if (childElements.length >= 2) {
        tl.fromTo(
          childElements[0],
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
        ).fromTo(
          childElements[1],
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          "<0.1"
        );
      }
      return tl;
    }

    case "slide-horizontal-left":
      return gsap.fromTo(
        element,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.6,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "slide-horizontal-right":
      return gsap.fromTo(
        element,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.6,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "slide-vertical":
      return gsap.fromTo(
        element,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.6,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    // ==================== FADE & STAGGER ANIMATIONS ====================
    case "fade-stagger":
      return gsap.fromTo(
        childElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          stagger: 0.15,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "fade-cascade":
      return gsap.fromTo(
        childElements,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.4,
          delay,
          stagger: 0.08,
          ease: ease || "power1.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "fade-in":
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.6,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "fade-switch":
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.3,
          delay,
          ease: ease || "power1.inOut",
          onComplete,
        }
      );

    case "blur-in":
      return gsap.fromTo(
        element,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: duration || 0.8,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    // ==================== MASK & REVEAL ANIMATIONS ====================
    case "reveal-mask":
      return gsap.fromTo(
        element,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: duration || 0.8,
          delay,
          ease: ease || "power3.inOut",
          ...scrollConfig,
          onComplete,
        }
      );

    case "clip-reveal":
      return gsap.fromTo(
        element,
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(100% at 50% 50%)",
          duration: duration || 0.8,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "scroll-reveal": {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        onComplete,
      });
      tl.fromTo(element, { opacity: 0, y: 30 }, { opacity: 1, y: 0 });
      return tl;
    }

    // ==================== COLUMN ANIMATIONS ====================
    case "stagger-up":
      return gsap.fromTo(
        childElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          stagger: 0.12,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "flip-in":
      return gsap.fromTo(
        childElements,
        { opacity: 0, rotationY: -90, transformPerspective: 600 },
        {
          opacity: 1,
          rotationY: 0,
          duration: duration || 0.6,
          delay,
          stagger: 0.1,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "scale-stagger":
      return gsap.fromTo(
        childElements,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.5,
          delay,
          stagger: 0.1,
          ease: ease || "back.out(1.5)",
          ...scrollConfig,
          onComplete,
        }
      );

    case "wave-in":
      return gsap.fromTo(
        childElements,
        { opacity: 0, y: 30, rotation: -5 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: duration || 0.6,
          delay,
          stagger: 0.1,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "rotate-in":
      return gsap.fromTo(
        childElements,
        { opacity: 0, rotation: -180, scale: 0.5 },
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: duration || 0.6,
          delay,
          stagger: 0.12,
          ease: ease || "back.out(1.2)",
          ...scrollConfig,
          onComplete,
        }
      );

    case "pop-random":
      return gsap.fromTo(
        childElements,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.4,
          delay,
          stagger: { each: 0.08, from: "random" },
          ease: ease || "back.out(2)",
          ...scrollConfig,
          onComplete,
        }
      );

    // ==================== GALLERY ANIMATIONS ====================
    case "masonry-fade":
      return gsap.fromTo(
        childElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          stagger: { each: 0.06, from: "random" },
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "zoom-hover":
      gsap.set(element, { overflow: "hidden" });
      element.addEventListener("mouseenter", () => {
        gsap.to(element.querySelector("img"), { scale: 1.1, duration: 0.4 });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element.querySelector("img"), { scale: 1, duration: 0.4 });
      });
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );

    case "lightbox":
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.4,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    case "lightbox-zoom":
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.5,
          delay,
          ease: ease || "back.out(1.5)",
          onComplete,
        }
      );

    case "grid-reveal":
      return gsap.fromTo(
        childElements,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.4,
          delay,
          stagger: 0.05,
          ease: ease || "back.out(1.5)",
          ...scrollConfig,
          onComplete,
        }
      );

    case "overlay-slide": {
      const overlay = element.querySelector(".overlay");
      if (overlay) {
        gsap.set(overlay, { y: "100%" });
        element.addEventListener("mouseenter", () => {
          gsap.to(overlay, { y: "0%", duration: 0.3 });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(overlay, { y: "100%", duration: 0.3 });
        });
      }
      return gsap.fromTo(
        element,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay, ...scrollConfig, onComplete }
      );
    }

    case "shuffle":
      return gsap.to(childElements, {
        duration: duration || 0.5,
        delay,
        ease: ease || "power2.inOut",
        ...scrollConfig,
        onComplete,
      });

    // ==================== CTA ANIMATIONS ====================
    case "pulse": {
      const tl = gsap.timeline({
        delay,
        ...scrollConfig,
        onComplete,
      });
      tl.to(element, {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut",
      });
      return tl;
    }

    case "glow":
      return gsap.to(element, {
        boxShadow: "0 0 25px rgba(236, 72, 153, 0.6)",
        duration: duration || 0.4,
        delay,
        yoyo: true,
        repeat: 2,
        ...scrollConfig,
        onComplete,
      });

    case "bounce": {
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.to(element, {
        y: -15,
        duration: 0.25,
        yoyo: true,
        repeat: 3,
        ease: "power1.out",
      });
      return tl;
    }

    case "shake":
      return gsap.to(element, {
        x: 8,
        duration: 0.08,
        delay,
        yoyo: true,
        repeat: 5,
        ease: "power1.inOut",
        ...scrollConfig,
        onComplete,
      });

    case "ripple": {
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.fromTo(
        element,
        { boxShadow: "0 0 0 0 rgba(236, 72, 153, 0.4)" },
        {
          boxShadow: "0 0 0 20px rgba(236, 72, 153, 0)",
          duration: 0.7,
          repeat: 2,
        }
      );
      return tl;
    }

    case "gradient-shift":
      return gsap.to(element, {
        backgroundPosition: "200% center",
        duration: duration || 2,
        delay,
        ease: ease || "none",
        repeat: -1,
        ...scrollConfig,
        onComplete,
      });

    case "button-attention": {
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.fromTo(element, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
        .to(element, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 }, "+=0.3");
      return tl;
    }

    // ==================== TESTIMONIAL ANIMATIONS ====================
    case "slide-quote":
      return gsap.fromTo(
        element,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.6,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "fade-rotate":
      return gsap.fromTo(
        element,
        { opacity: 0, rotationY: 90, transformPerspective: 800 },
        {
          opacity: 1,
          rotationY: 0,
          duration: duration || 0.7,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "card-flip":
      return gsap.fromTo(
        element,
        { opacity: 0, rotationY: -180, transformPerspective: 800 },
        {
          opacity: 1,
          rotationY: 0,
          duration: duration || 0.7,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "quote-mark-animate": {
      const quoteMark = element.querySelector(".quote-mark, blockquote::before");
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      if (quoteMark) {
        tl.fromTo(
          quoteMark,
          { opacity: 0, scale: 0, rotation: -45 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" },
          "<0.2"
        );
      }
      return tl;
    }

    // ==================== FAQ ANIMATIONS ====================
    case "accordion":
      return gsap.fromTo(
        element,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: duration || 0.4,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    case "slide-expand":
      return gsap.fromTo(
        element,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: duration || 0.4,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    case "fade-content":
      return gsap.fromTo(
        childElements,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.3,
          delay,
          stagger: 0.1,
          ease: ease || "power1.out",
          onComplete,
        }
      );

    case "highlight":
      return gsap.to(element, {
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        duration: duration || 0.3,
        delay,
        yoyo: true,
        repeat: 1,
        onComplete,
      });

    case "plus-rotate": {
      const icon = element.querySelector(".icon, .plus-icon, svg");
      if (icon) {
        return gsap.to(icon, {
          rotation: 45,
          duration: duration || 0.3,
          delay,
          ease: ease || "power2.out",
          onComplete,
        });
      }
      return null;
    }

    // ==================== STATS ANIMATIONS ====================
    case "counter": {
      const targetNumber = parseInt(element.getAttribute("data-value") || element.textContent || "0");
      const counter = { value: 0 };
      return gsap.to(counter, {
        value: targetNumber,
        duration: duration || 2,
        delay,
        ease: ease || "power2.out",
        ...scrollConfig,
        onUpdate: () => {
          element.textContent = Math.round(counter.value).toLocaleString();
        },
        onComplete,
      });
    }

    case "counter-fast": {
      const targetNumber = parseInt(element.getAttribute("data-value") || element.textContent || "0");
      const counter = { value: 0 };
      return gsap.to(counter, {
        value: targetNumber,
        duration: duration || 1,
        delay,
        ease: ease || "power1.out",
        ...scrollConfig,
        onUpdate: () => {
          element.textContent = Math.round(counter.value).toLocaleString();
        },
        onComplete,
      });
    }

    case "counter-slow": {
      const targetNumber = parseInt(element.getAttribute("data-value") || element.textContent || "0");
      const counter = { value: 0 };
      return gsap.to(counter, {
        value: targetNumber,
        duration: duration || 4,
        delay,
        ease: ease || "power3.out",
        ...scrollConfig,
        onUpdate: () => {
          element.textContent = Math.round(counter.value).toLocaleString();
        },
        onComplete,
      });
    }

    case "counter-bounce": {
      const targetNumber = parseInt(element.getAttribute("data-value") || element.textContent || "0");
      const counter = { value: 0 };
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.to(counter, {
        value: targetNumber,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = Math.round(counter.value).toLocaleString();
        },
      }).to(element, { y: -10, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.out" });
      return tl;
    }

    case "odometer":
      return gsap.fromTo(
        element,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.4,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "bar-grow":
      return gsap.fromTo(
        childElements,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: duration || 0.8,
          delay,
          stagger: 0.15,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "flip-number":
      return gsap.fromTo(
        element,
        { opacity: 0, rotationX: -90, transformPerspective: 500 },
        {
          opacity: 1,
          rotationX: 0,
          duration: duration || 0.6,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "pop-scale":
      return gsap.fromTo(
        childElements,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.5,
          delay,
          stagger: 0.1,
          ease: ease || "back.out(2)",
          ...scrollConfig,
          onComplete,
        }
      );

    case "circular-progress": {
      const circle = element.querySelector("circle.progress");
      if (circle) {
        const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r") || "45");
        const percent = parseFloat(element.getAttribute("data-percent") || "0");
        const offset = circumference - (percent / 100) * circumference;
        gsap.set(circle, { strokeDasharray: circumference, strokeDashoffset: circumference });
        return gsap.to(circle, {
          strokeDashoffset: offset,
          duration: duration || 1.5,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        });
      }
      return null;
    }

    // ==================== CHART ANIMATIONS ====================
    case "draw-line": {
      const path = element.querySelector("path");
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        return gsap.to(path, {
          strokeDashoffset: 0,
          duration: duration || 2,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        });
      }
      return null;
    }

    case "bar-stagger":
      return gsap.fromTo(
        childElements,
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          duration: duration || 0.6,
          delay,
          stagger: 0.1,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "pie-reveal": {
      const paths = element.querySelectorAll("path");
      return gsap.fromTo(
        paths,
        { opacity: 0, scale: 0, transformOrigin: "center" },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.6,
          delay,
          stagger: 0.1,
          ease: ease || "back.out(1.5)",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "data-points": {
      const points = element.querySelectorAll(".data-point, circle");
      return gsap.fromTo(
        points,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.4,
          delay,
          stagger: 0.05,
          ease: ease || "back.out(2)",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    // ==================== PRICING ANIMATIONS ====================
    case "hover-lift":
      element.addEventListener("mouseenter", () => {
        gsap.to(element, { y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)", duration: 0.3 });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, { y: 0, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", duration: 0.3 });
      });
      return gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );

    case "highlight-popular": {
      const popularCard = element.querySelector(".popular, [data-popular]");
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.fromTo(
        childElements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
      if (popularCard) {
        tl.to(popularCard, { scale: 1.05, duration: 0.3, ease: "back.out(2)" }, "-=0.2");
      }
      return tl;
    }

    case "scale-featured": {
      const featured = element.querySelector(".featured, [data-featured]");
      if (featured) {
        return gsap.fromTo(
          featured,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1.05,
            duration: duration || 0.6,
            delay,
            ease: ease || "back.out(1.7)",
            ...scrollConfig,
            onComplete,
          }
        );
      }
      return null;
    }

    case "price-morph": {
      const price = element.querySelector(".price");
      if (price) {
        return gsap.fromTo(
          price,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: duration || 0.3,
            delay,
            ease: ease || "power2.out",
            onComplete,
          }
        );
      }
      return null;
    }

    // ==================== TIMELINE & PROCESS ANIMATIONS ====================
    case "line-draw": {
      const line = element.querySelector(".timeline-line, line, path");
      if (line) {
        const isPath = line.tagName === "path";
        if (isPath) {
          const path = line as SVGPathElement;
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          return gsap.to(path, {
            strokeDashoffset: 0,
            duration: duration || 1.5,
            delay,
            ease: ease || "power2.out",
            ...scrollConfig,
            onComplete,
          });
        } else {
          return gsap.fromTo(
            line,
            { scaleY: 0, transformOrigin: "top" },
            {
              scaleY: 1,
              duration: duration || 1,
              delay,
              ease: ease || "power2.out",
              ...scrollConfig,
              onComplete,
            }
          );
        }
      }
      return null;
    }

    case "point-pop": {
      const points = element.querySelectorAll(".point, .milestone, .timeline-point");
      return gsap.fromTo(
        points,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.4,
          delay,
          stagger: 0.15,
          ease: ease || "back.out(2)",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "scroll-progress": {
      const progress = element.querySelector(".progress-line");
      if (progress) {
        return gsap.fromTo(
          progress,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: duration || 1,
            ease: ease || "none",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
            onComplete,
          }
        );
      }
      return null;
    }

    case "step-progress": {
      const steps = element.querySelectorAll(".step, .process-step");
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      steps.forEach((step, i) => {
        tl.fromTo(
          step,
          { opacity: 0.3 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          i * 0.3
        );
      });
      return tl;
    }

    case "connector-draw": {
      const connectors = element.querySelectorAll(".connector, .step-connector");
      return gsap.fromTo(
        connectors,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: duration || 0.5,
          delay,
          stagger: 0.2,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "number-count": {
      const numbers = element.querySelectorAll(".step-number, .number");
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      numbers.forEach((num) => {
        const target = parseInt(num.textContent || "0");
        const counter = { value: 0 };
        tl.to(
          counter,
          {
            value: target,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
              num.textContent = Math.round(counter.value).toString();
            },
          },
          "<0.1"
        );
      });
      return tl;
    }

    case "milestone-pop": {
      const milestones = element.querySelectorAll(".milestone");
      return gsap.fromTo(
        milestones,
        { opacity: 0, scale: 0, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          stagger: 0.2,
          ease: ease || "back.out(1.7)",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "path-draw": {
      const path = element.querySelector("path.roadmap-path");
      if (path) {
        const pathElement = path as SVGPathElement;
        const length = pathElement.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        return gsap.to(path, {
          strokeDashoffset: 0,
          duration: duration || 2,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        });
      }
      return null;
    }

    // ==================== MAP ANIMATIONS ====================
    case "marker-drop": {
      const markers = element.querySelectorAll(".marker, .map-marker");
      return gsap.fromTo(
        markers,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          stagger: 0.1,
          ease: ease || "bounce.out",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "zoom-in":
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.8,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "markers-stagger": {
      const markers = element.querySelectorAll(".marker");
      return gsap.fromTo(
        markers,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.4,
          delay,
          stagger: 0.1,
          ease: ease || "back.out(2)",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "map-pan": {
      const mapContainer = element.querySelector(".map-container, iframe");
      if (mapContainer) {
        return gsap.fromTo(
          mapContainer,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: duration || 0.8,
            delay,
            ease: ease || "power2.out",
            ...scrollConfig,
            onComplete,
          }
        );
      }
      return null;
    }

    case "info-reveal": {
      const infoItems = element.querySelectorAll(".info-item, .contact-item");
      return gsap.fromTo(
        infoItems,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.4,
          delay,
          stagger: 0.1,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    // ==================== BLOG & NEWS ANIMATIONS ====================
    case "image-zoom": {
      const img = element.querySelector("img");
      if (img) {
        gsap.set(element, { overflow: "hidden" });
        element.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.1, duration: 0.4 });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.4 });
        });
      }
      return gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "hover-highlight":
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          backgroundColor: "rgba(236, 72, 153, 0.05)",
          x: 5,
          duration: 0.3,
        });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, { backgroundColor: "transparent", x: 0, duration: 0.3 });
      });
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );

    case "overlay-reveal": {
      const overlay = element.querySelector(".overlay, .post-overlay");
      if (overlay) {
        return gsap.fromTo(
          overlay,
          { opacity: 0 },
          {
            opacity: 1,
            duration: duration || 0.4,
            delay,
            ease: ease || "power2.out",
            ...scrollConfig,
            onComplete,
          }
        );
      }
      return null;
    }

    case "text-slide":
      return gsap.fromTo(
        element,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.5,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "load-more":
      return gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    // ==================== MARQUEE ANIMATIONS ====================
    case "marquee-smooth": {
      const content = element.querySelector(".marquee-content");
      if (content) {
        const width = content.scrollWidth;
        return gsap.to(content, {
          x: -width / 2,
          duration: duration || 20,
          ease: "none",
          repeat: -1,
          onComplete,
        });
      }
      return null;
    }

    case "marquee-pause": {
      const content = element.querySelector(".marquee-content");
      if (content) {
        const width = content.scrollWidth;
        const tween = gsap.to(content, {
          x: -width / 2,
          duration: duration || 20,
          ease: "none",
          repeat: -1,
        });
        element.addEventListener("mouseenter", () => tween.pause());
        element.addEventListener("mouseleave", () => tween.play());
        return tween;
      }
      return null;
    }

    case "marquee-reverse": {
      const content = element.querySelector(".marquee-content");
      if (content) {
        const width = content.scrollWidth;
        return gsap.fromTo(
          content,
          { x: -width / 2 },
          {
            x: 0,
            duration: duration || 20,
            ease: "none",
            repeat: -1,
            onComplete,
          }
        );
      }
      return null;
    }

    // ==================== FORM ANIMATIONS ====================
    case "input-animate": {
      const inputs = element.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => {
        input.addEventListener("focus", () => {
          gsap.to(input, {
            borderColor: "#ec4899",
            boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.1)",
            duration: 0.3,
          });
        });
        input.addEventListener("blur", () => {
          gsap.to(input, {
            borderColor: "#e5e7eb",
            boxShadow: "none",
            duration: 0.3,
          });
        });
      });
      return gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "label-float": {
      const labels = element.querySelectorAll("label");
      labels.forEach((label) => {
        const input = label.nextElementSibling;
        if (input) {
          input.addEventListener("focus", () => {
            gsap.to(label, { y: -25, scale: 0.85, color: "#ec4899", duration: 0.3 });
          });
          input.addEventListener("blur", () => {
            if (!(input as HTMLInputElement).value) {
              gsap.to(label, { y: 0, scale: 1, color: "#6b7280", duration: 0.3 });
            }
          });
        }
      });
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "submit-loading": {
      const button = element.querySelector('button[type="submit"]');
      if (button) {
        button.addEventListener("click", () => {
          const originalText = button.textContent;
          gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            onComplete: () => {
              button.textContent = "Loading...";
              gsap.to(button, { scale: 1, duration: 0.1 });
            },
          });
        });
      }
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "input-validate": {
      const inputs = element.querySelectorAll("input[required]");
      inputs.forEach((input) => {
        input.addEventListener("blur", () => {
          if ((input as HTMLInputElement).validity.valid) {
            gsap.to(input, { borderColor: "#10b981", duration: 0.3 });
          } else {
            gsap.to(input, { borderColor: "#ef4444", duration: 0.3 });
            gsap.to(input, { x: 5, duration: 0.05, yoyo: true, repeat: 5 });
          }
        });
      });
      return gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "input-focus": {
      const inputs = element.querySelectorAll("input");
      inputs.forEach((input) => {
        input.addEventListener("focus", () => {
          gsap.to(input, { scale: 1.02, duration: 0.2 });
        });
        input.addEventListener("blur", () => {
          gsap.to(input, { scale: 1, duration: 0.2 });
        });
      });
      return gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "button-success": {
      const button = element.querySelector("button");
      if (button) {
        button.addEventListener("click", () => {
          gsap.to(button, {
            backgroundColor: "#10b981",
            duration: 0.3,
            onComplete: () => {
              const originalText = button.textContent;
              button.textContent = "✓ Success!";
              gsap.to(button, {
                scale: 1.05,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
              });
            },
          });
        });
      }
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    // ==================== LEAD CAPTURE ANIMATIONS ====================
    case "attention-grab": {
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.fromTo(element, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 })
        .to(element, { scale: 1.02, duration: 0.2, yoyo: true, repeat: 3 }, "+=0.5");
      return tl;
    }

    case "countdown": {
      const countdownEl = element.querySelector(".countdown");
      if (countdownEl) {
        let seconds = parseInt(countdownEl.getAttribute("data-seconds") || "60");
        const interval = setInterval(() => {
          seconds--;
          countdownEl.textContent = seconds.toString();
          if (seconds <= 10) {
            gsap.to(countdownEl, { color: "#ef4444", scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
          }
          if (seconds <= 0) clearInterval(interval);
        }, 1000);
      }
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "urgency-shake": {
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      tl.to(element, { x: 5, duration: 0.1, yoyo: true, repeat: 3 }, "+=1");
      return tl;
    }

    // ==================== TEAM ANIMATIONS ====================
    case "hover-info": {
      const info = element.querySelector(".info, .team-info");
      if (info) {
        gsap.set(info, { opacity: 0, y: 10 });
        element.addEventListener("mouseenter", () => {
          gsap.to(info, { opacity: 1, y: 0, duration: 0.3 });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(info, { opacity: 0, y: 10, duration: 0.3 });
        });
      }
      return gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "social-reveal": {
      const socials = element.querySelector(".social-links, .socials");
      if (socials) {
        gsap.set(socials, { opacity: 0, y: 10 });
        element.addEventListener("mouseenter", () => {
          gsap.to(socials, { opacity: 1, y: 0, duration: 0.3 });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(socials, { opacity: 0, y: 10, duration: 0.3 });
        });
      }
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "image-grayscale": {
      const img = element.querySelector("img");
      if (img) {
        gsap.set(img, { filter: "grayscale(100%)" });
        element.addEventListener("mouseenter", () => {
          gsap.to(img, { filter: "grayscale(0%)", duration: 0.4 });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(img, { filter: "grayscale(100%)", duration: 0.4 });
        });
      }
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "grayscale-color": {
      const items = childElements.length > 0 ? childElements : [element];
      items.forEach((item) => {
        gsap.set(item, { filter: "grayscale(100%)" });
        item.addEventListener("mouseenter", () => {
          gsap.to(item, { filter: "grayscale(0%)", duration: 0.3 });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(item, { filter: "grayscale(100%)", duration: 0.3 });
        });
      });
      return gsap.fromTo(
        items,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          stagger: 0.1,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "center-scale": {
      const slides = element.querySelectorAll(".slide");
      slides.forEach((slide) => {
        if (slide.classList.contains("active")) {
          gsap.to(slide, { scale: 1.1, opacity: 1, duration: 0.4 });
        } else {
          gsap.to(slide, { scale: 0.9, opacity: 0.6, duration: 0.4 });
        }
      });
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    // ==================== SLIDER/CAROUSEL ANIMATIONS ====================
    case "slide-smooth":
      return gsap.fromTo(
        element,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.5,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    case "fade-carousel":
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ease: ease || "power1.inOut",
          onComplete,
        }
      );

    case "coverflow": {
      const slides = element.querySelectorAll(".slide");
      slides.forEach((slide, i) => {
        const offset = i - Math.floor(slides.length / 2);
        gsap.set(slide, {
          rotationY: offset * 30,
          z: -Math.abs(offset) * 100,
          opacity: 1 - Math.abs(offset) * 0.3,
        });
      });
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "cards-stack": {
      const cards = element.querySelectorAll(".card");
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i * 5,
          scale: 1 - i * 0.05,
          zIndex: cards.length - i,
        });
      });
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "cube": {
      // 3D cube transition effect
      return gsap.fromTo(
        element,
        { opacity: 0, rotationY: 90, transformPerspective: 1000 },
        {
          opacity: 1,
          rotationY: 0,
          duration: duration || 0.6,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );
    }

    case "fade-slide-left":
      return gsap.fromTo(
        element,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.5,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    case "fade-slide-right":
      return gsap.fromTo(
        element,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.5,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    // ==================== INTERACTIVE ANIMATIONS ====================
    case "slide-switch":
      return gsap.fromTo(
        element,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.3,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    case "flip-switch":
      return gsap.fromTo(
        element,
        { opacity: 0, rotationY: 90, transformPerspective: 800 },
        {
          opacity: 1,
          rotationY: 0,
          duration: duration || 0.4,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    case "tab-indicator": {
      const indicator = element.querySelector(".tab-indicator");
      const activeTab = element.querySelector(".active");
      if (indicator && activeTab) {
        const rect = activeTab.getBoundingClientRect();
        const parentRect = element.getBoundingClientRect();
        return gsap.to(indicator, {
          x: rect.left - parentRect.left,
          width: rect.width,
          duration: duration || 0.3,
          delay,
          ease: ease || "power2.out",
          onComplete,
        });
      }
      return null;
    }

    case "icon-rotate": {
      const icon = element.querySelector(".icon, svg");
      if (icon) {
        return gsap.to(icon, {
          rotation: 180,
          duration: duration || 0.3,
          delay,
          ease: ease || "power2.out",
          onComplete,
        });
      }
      return null;
    }

    case "scale-filter":
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.4,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    case "fade-filter":
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.3,
          delay,
          ease: ease || "power1.out",
          onComplete,
        }
      );

    case "slider-smooth":
      // For comparison slider
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );

    case "reveal-drag":
      // Comparison slider reveal
      return gsap.fromTo(
        element,
        { clipPath: "inset(0 50% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: duration || 0.8,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "label-follow":
      // Label follows slider position
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.3,
          delay,
          onComplete,
        }
      );

    // ==================== DIVIDER ANIMATIONS ====================
    case "wave-flow": {
      const wave = element.querySelector("path, svg");
      if (wave) {
        return gsap.to(wave, {
          x: -100,
          duration: duration || 5,
          ease: "none",
          repeat: -1,
          onComplete,
        });
      }
      return null;
    }

    case "wave-morph": {
      const path = element.querySelector("path");
      if (path) {
        const originalD = path.getAttribute("d");
        if (!originalD) return null;
        // Simplified morph - in real implementation use MorphSVG plugin
        return gsap.to(path, {
          attr: { d: originalD },
          duration: duration || 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          onComplete,
        });
      }
      return null;
    }

    // ==================== PARALLAX ANIMATIONS ====================
    case "parallax-slow":
      return gsap.to(element, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        onComplete,
      });

    case "parallax-fast":
      return gsap.to(element, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
        onComplete,
      });

    case "zoom-parallax":
      return gsap.fromTo(
        element,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          onComplete,
        }
      );

    case "parallax-cols": {
      childElements.forEach((child, i) => {
        gsap.to(child, {
          y: (i % 2 === 0 ? -30 : -60) * (i + 1),
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    // ==================== VIDEO ANIMATIONS ====================
    case "play-button-pulse": {
      const playBtn = element.querySelector(".play-button, .play-btn");
      if (playBtn) {
        gsap.to(playBtn, {
          scale: 1.1,
          duration: 0.8,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        });
      }
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "fade-in-video":
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.8,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "scale-video":
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.6,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "fade-overlay": {
      // Look for overlay element with class "overlay"
      let overlay = element.querySelector(".overlay") as HTMLElement | null;
      
      // If no .overlay class, look for first absolute positioned div that could be overlay
      if (!overlay) {
        const absoluteDivs = element.querySelectorAll("div[class*='absolute']");
        overlay = Array.from(absoluteDivs).find(
          (div) => {
            const el = div as HTMLElement;
            const styles = window.getComputedStyle(el);
            return styles.position === "absolute" && styles.inset !== "none";
          }
        ) as HTMLElement | null;
      }
      
      if (overlay) {
        // Set initial opacity if not set
        gsap.set(overlay, { opacity: 1 });
        
        return gsap.to(
          overlay,
          {
            opacity: 0.3,
            duration: duration || 1.5,
            delay,
            ease: ease || "power2.out",
            ...scrollConfig,
            onComplete,
          }
        );
      }
      return null;
    }

    case "text-over-video": {
      // Look for text elements with hero-text or video-text class
      let text = element.querySelector(".hero-text, .video-text") as HTMLElement | null;
      
      // If no specific class, look for relative positioned content div
      if (!text) {
        const relativeDivs = element.querySelectorAll("div[class*='relative']");
        text = Array.from(relativeDivs).find(
          (div) => {
            const el = div as HTMLElement;
            const styles = window.getComputedStyle(el);
            return styles.position === "relative" && styles.zIndex !== "auto";
          }
        ) as HTMLElement | null;
      }
      
      // Fallback: look for data-animation-child that contains text content
      if (!text) {
        const animationChildren = element.querySelectorAll("[data-animation-child]");
        text = Array.from(animationChildren).find(
          (child) => {
            const el = child as HTMLElement;
            return el.textContent && el.textContent.trim().length > 0;
          }
        ) as HTMLElement | null;
      }
      
      if (text) {
        // Set initial state
        gsap.set(text, { opacity: 0, y: 30 });
        
        return gsap.to(
          text,
          {
            opacity: 1,
            y: 0,
            duration: duration || 0.8,
            delay: delay + 0.3,
            ease: ease || "power2.out",
            ...scrollConfig,
            onComplete,
          }
        );
      }
      return null;
    }

    case "zoom-pan": {
      // Try to find img first, then fallback to data-zoom-pan element or image placeholder div
      let targetElement = element.querySelector("img") as HTMLElement | null;
      
      if (!targetElement) {
        // Look for element with data-zoom-pan attribute
        targetElement = element.querySelector("[data-zoom-pan]") as HTMLElement | null;
      }
      
      if (!targetElement) {
        // For hero-split and similar layouts, find the image container (second child or specific structure)
        const imageContainer = element.querySelector("[data-animation-child]:last-child") as HTMLElement | null;
        if (imageContainer) {
          // Find the inner div that represents the image
          const innerImage = imageContainer.querySelector("div") as HTMLElement | null;
          if (innerImage) {
            targetElement = innerImage;
          } else {
            targetElement = imageContainer;
          }
        }
      }
      
      if (targetElement) {
        const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
        tl.fromTo(
          targetElement,
          { scale: 1.2, x: 20, opacity: 0.8 },
          { scale: 1, x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }
        );
        return tl;
      }
      return null;
    }

    // ==================== ICON ANIMATIONS ====================
    case "icon-spin": {
      const icons = element.querySelectorAll(".icon, svg");
      return gsap.fromTo(
        icons,
        { opacity: 0, rotation: -180 },
        {
          opacity: 1,
          rotation: 0,
          duration: duration || 0.6,
          delay,
          stagger: 0.1,
          ease: ease || "back.out(1.5)",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "icon-bounce": {
      const icons = element.querySelectorAll(".icon, svg");
      return gsap.fromTo(
        icons,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          stagger: 0.1,
          ease: ease || "bounce.out",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "icon-animate": {
      const icons = element.querySelectorAll(".icon, svg");
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.fromTo(icons, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2)" });
      return tl;
    }

    case "check-mark":
    case "check-animate": {
      const checks = element.querySelectorAll(".check, .checkmark, svg.check");
      return gsap.fromTo(
        checks,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: duration || 0.3,
          delay,
          stagger: 0.05,
          ease: ease || "back.out(2)",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "border-draw": {
      const box = element;
      gsap.set(box, {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "transparent",
      });
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      tl.to(box, {
        borderTopColor: "#ec4899",
        duration: 0.2,
      })
        .to(box, { borderRightColor: "#ec4899", duration: 0.2 })
        .to(box, { borderBottomColor: "#ec4899", duration: 0.2 })
        .to(box, { borderLeftColor: "#ec4899", duration: 0.2 });
      return tl;
    }

    // ==================== MISC ANIMATIONS ====================
    case "bounce-in":
      return gsap.fromTo(
        element,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.6,
          delay,
          ease: ease || "bounce.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "tilt-3d":
      // Apply tilt-3d to children (Left image and right text) instead of parent
      const tiltChildren = childElements.length > 0 ? childElements : [element];
      
      // Track mouse on parent element but apply to children
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Apply tilt to each child separately
        tiltChildren.forEach((child) => {
          gsap.to(child, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
          });
        });
      };
      
      const handleMouseLeave = () => {
        tiltChildren.forEach((child) => {
          gsap.to(child, { rotationX: 0, rotationY: 0, duration: 0.5 });
        });
      };
      
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
      
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );

    // ==================== ZOOM IMG ANIMATION ====================
    case "zoom-img": {
      const img = element.querySelector("img") as HTMLElement;
      if (img) {
        gsap.set(element, { overflow: "hidden" });
        return gsap.fromTo(
          img,
          { opacity: 0, scale: 1.2 },
          {
            opacity: 1,
            scale: 1,
            duration: duration || 0.8,
            delay,
            ease: ease || "power2.out",
            ...scrollConfig,
            onComplete,
          }
        );
      }
      return gsap.fromTo(
        element,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay, ...scrollConfig, onComplete }
      );
    }

    // ==================== PROGRESS BAR VARIANTS ====================
    case "bar-striped": {
      const bars = element.querySelectorAll(".progress-bar, .bar");
      bars.forEach((bar) => {
        gsap.set(bar, { 
          backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)",
          backgroundSize: "1rem 1rem",
        });
      });
      return gsap.fromTo(
        bars,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: duration || 1,
          delay,
          stagger: 0.15,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "bar-animated": {
      const bars = element.querySelectorAll(".progress-bar, .bar");
      bars.forEach((bar) => {
        gsap.set(bar, { 
          backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)",
          backgroundSize: "1rem 1rem",
        });
        gsap.to(bar, {
          backgroundPosition: "40px 0",
          duration: 1,
          ease: "none",
          repeat: -1,
        });
      });
      return gsap.fromTo(
        bars,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: duration || 1,
          delay,
          stagger: 0.15,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );
    }

    // ==================== LIGHTBOX FADE ====================
    case "lightbox-fade":
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.4,
          delay,
          ease: ease || "power2.out",
          onComplete,
        }
      );

    // ==================== SLIDE HORIZONTAL (generic) ====================
    case "slide-horizontal":
      return gsap.fromTo(
        element,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.5,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    // ==================== FADE SLIDE (generic) ====================
    case "fade-slide":
      return gsap.fromTo(
        element,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: duration || 0.5,
          delay,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "scale-hover":
      element.addEventListener("mouseenter", () => {
        gsap.to(element, { scale: 1.05, duration: 0.3 });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, { scale: 1, duration: 0.3 });
      });
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );

    case "card-hover":
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          y: -5,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          duration: 0.3,
        });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          y: 0,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          duration: 0.3,
        });
      });
      return gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );

    case "image-overlay": {
      const overlay = element.querySelector(".overlay");
      if (overlay) {
        gsap.set(overlay, { opacity: 0 });
        element.addEventListener("mouseenter", () => {
          gsap.to(overlay, { opacity: 1, duration: 0.3 });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(overlay, { opacity: 0, duration: 0.3 });
        });
      }
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "row-highlight":
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          backgroundColor: "rgba(236, 72, 153, 0.05)",
          duration: 0.2,
        });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, { backgroundColor: "transparent", duration: 0.2 });
      });
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );

    case "search-highlight": {
      const highlights = element.querySelectorAll(".highlight, mark");
      return gsap.fromTo(
        highlights,
        { backgroundColor: "transparent" },
        {
          backgroundColor: "rgba(236, 72, 153, 0.3)",
          duration: duration || 0.3,
          delay,
          stagger: 0.05,
          ...scrollConfig,
          onComplete,
        }
      );
    }

    case "filter-instant":
      return gsap.fromTo(
        element,
        { opacity: 0.5 },
        {
          opacity: 1,
          duration: duration || 0.2,
          delay,
          ease: ease || "power1.out",
          onComplete,
        }
      );

    case "no-result-shake":
      return gsap.to(element, {
        x: 10,
        duration: 0.1,
        delay,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut",
        onComplete,
      });

    case "map-animate": {
      const map = element.querySelector(".map, iframe");
      if (map) {
        return gsap.fromTo(
          map,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: duration || 0.6,
            delay,
            ease: ease || "power2.out",
            ...scrollConfig,
            onComplete,
          }
        );
      }
      return null;
    }

    case "cards-stagger":
      return gsap.fromTo(
        childElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          stagger: 0.1,
          ease: ease || "power2.out",
          ...scrollConfig,
          onComplete,
        }
      );

    case "alternate-slide": {
      const tl = gsap.timeline({ delay, ...scrollConfig, onComplete });
      childElements.forEach((child, i) => {
        const direction = i % 2 === 0 ? -50 : 50;
        tl.fromTo(
          child,
          { opacity: 0, x: direction },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          i * 0.15
        );
      });
      return tl;
    }

    case "tab-switch": {
      const content = element.querySelector(".tab-content");
      if (content) {
        return gsap.fromTo(
          content,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: duration || 0.3,
            delay,
            ease: ease || "power2.out",
            onComplete,
          }
        );
      }
      return null;
    }

    case "rotate-arrow": {
      const arrow = element.querySelector(".arrow, svg");
      if (arrow) {
        return gsap.to(arrow, {
          rotation: 180,
          duration: duration || 0.3,
          delay,
          ease: ease || "power2.out",
          onComplete,
        });
      }
      return null;
    }

    case "app-store-hover":
      element.addEventListener("mouseenter", () => {
        gsap.to(element, { y: -3, duration: 0.2 });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, { y: 0, duration: 0.2 });
      });
      return gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );

    // ==================== PARTICLES ANIMATIONS ====================
    case "particles-float": {
      // Particles floating upward animation
      const particles = element.querySelectorAll("[data-animation-child]");
      const contentElement = element.querySelector("[data-animation-child]:last-child");
      
      // Animate container fade in
      gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.5, delay, ...scrollConfig });
      
      // Animate particles floating
      if (particles.length > 1) {
        const particleElements = Array.from(particles).slice(0, -1); // Exclude content element
        particleElements.forEach((particle, i) => {
          // Random initial position offset
          const randomX = (Math.random() - 0.5) * 20;
          const randomDelay = Math.random() * 2;
          
          // Floating animation
          gsap.fromTo(
            particle,
            { opacity: 0, y: 2, x: randomX },
            {
              opacity: 0.6,
              y: 0,
              x: 0,
              duration: 1,
              delay: delay + randomDelay * 0.3,
              ease: "power2.out",
            }
          );
          
          // Continuous floating loop
          gsap.to(particle, {
            y: -30 - (i * 5),
            x: (Math.random() - 0.5) * 30,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            delay: delay + 1 + randomDelay,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: Math.random() * 2,
            onRepeat: function() {
              gsap.set(particle, { y: 20, opacity: 0 });
            }
          });
        });
      }
      
      // Animate content
      if (contentElement) {
        return gsap.fromTo(
          contentElement,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: duration || 0.6,
            delay: delay + 0.3,
            ease: ease || "power2.out",
            onComplete,
          }
        );
      }
      return null;
    }

    case "particles-connect": {
      // Particles fade in and become visible (simulating connection effect)
      const particles = element.querySelectorAll("[data-animation-child]");
      const contentElement = element.querySelector("[data-animation-child]:last-child");
      
      // Animate container
      gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.5, delay, ...scrollConfig });
      
      if (particles.length > 1) {
        const particleElements = Array.from(particles).slice(0, -1);
        const tl = gsap.timeline({ delay });
        
        // Particles appear one by one with scale and glow effect
        particleElements.forEach((particle, i) => {
          tl.fromTo(
            particle,
            { 
              opacity: 0, 
              scale: 0,
              boxShadow: "0 0 0 0 rgba(139, 92, 246, 0)"
            },
            {
              opacity: 0.8,
              scale: 1,
              boxShadow: "0 0 10px 2px rgba(139, 92, 246, 0.3)",
              duration: 0.4,
              ease: "back.out(2)",
            },
            i * 0.1
          );
        });
        
        // Add pulsing glow effect to all particles
        particleElements.forEach((particle, i) => {
          gsap.to(particle, {
            boxShadow: "0 0 15px 4px rgba(139, 92, 246, 0.5)",
            duration: 1.5,
            delay: delay + 1 + (i * 0.2),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        });
      }
      
      // Animate content
      if (contentElement) {
        return gsap.fromTo(
          contentElement,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: duration || 0.6,
            delay: delay + 0.5,
            ease: ease || "power2.out",
            onComplete,
          }
        );
      }
      return null;
    }

    // ==================== NO ANIMATION ====================
    case "none":
      return null;

    // ==================== DEFAULT ====================
    default:
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration || 0.5,
          delay,
          ...scrollConfig,
          onComplete,
        }
      );
  }
}

// ==================== HELPER FUNCTIONS ====================

// Kill all animations on element
export function killAnimations(element: HTMLElement): void {
  gsap.killTweensOf(element);
  gsap.killTweensOf(element.children);
}

// Refresh ScrollTrigger (call after DOM changes)
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

export default executeAnimation;
