"use client";

import React, { useRef, useState, useEffect } from "react";

interface AmbientBackgroundProps {
  variant?: "sand" | "sand-alt" | "forest";
  showBlueprint?: boolean;
}

export default function AmbientBackground({
  variant = "sand",
  showBlueprint = true,
}: AmbientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, []);

  const isForest = variant === "forest";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* 1. Static Grain Overlay (2-3%) */}
      <div className="absolute inset-0 bg-grain opacity-60" />

      {/* 2. Drifting Radial Glows (transform only, paused when offscreen) */}
      <div
        className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full blur-3xl will-change-transform"
        style={{
          background: isForest
            ? "radial-gradient(circle, rgba(176,138,78,0.18) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(176,138,78,0.09) 0%, transparent 70%)",
          animationPlayState: isVisible ? "running" : "paused",
        }}
      >
        <div className="w-full h-full glow-drift-1" />
      </div>

      {!isMobile && (
        <div
          className="absolute -bottom-36 -right-36 w-[38rem] h-[38rem] rounded-full blur-3xl will-change-transform"
          style={{
            background: isForest
              ? "radial-gradient(circle, rgba(42,81,63,0.3) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(31,61,47,0.06) 0%, transparent 70%)",
            animationPlayState: isVisible ? "running" : "paused",
          }}
        >
          <div className="w-full h-full glow-drift-2" />
        </div>
      )}

      {/* 3. Faint Blueprint Line Art (4-6% opacity) */}
      {showBlueprint && !isForest && (
        <svg
          viewBox="0 0 1200 800"
          className="absolute inset-0 w-full h-full opacity-[0.045] stroke-[#1F2326] fill-none"
        >
          <defs>
            <pattern id="ambient-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" stroke="#1F2326" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ambient-grid)" />
          {/* Subtle architectural building wireframes */}
          <g strokeWidth="1.2">
            <path d="M 120 700 L 120 420 L 260 420 L 260 700" />
            <path d="M 160 420 L 160 700" />
            <path d="M 210 420 L 210 700" />
            <line x1="120" y1="480" x2="260" y2="480" />
            <line x1="120" y1="540" x2="260" y2="540" />
            <line x1="120" y1="600" x2="260" y2="600" />
            <path d="M 900 700 L 900 360 L 1080 360 L 1080 700" />
            <line x1="900" y1="420" x2="1080" y2="420" />
            <line x1="900" y1="500" x2="1080" y2="500" />
            <line x1="900" y1="580" x2="1080" y2="580" />
          </g>
        </svg>
      )}
    </div>
  );
}
