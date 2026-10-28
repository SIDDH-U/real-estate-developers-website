"use client";

import React from "react";
import { useDemo } from "@/context/DemoContext";

interface BrandWordmarkProps {
  isWhite?: boolean;
  className?: string;
}

export default function BrandWordmark({ isWhite = false, className = "" }: BrandWordmarkProps) {
  const { name } = useDemo();

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Architectural Vector Emblem */}
      <svg
        className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0"
        viewBox="0 0 44 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Tower 1 */}
        <rect
          x="2"
          y="16"
          width="10"
          height="28"
          rx="1.5"
          className={isWhite ? "stroke-white/90" : "stroke-[#1F2326]"}
          strokeWidth="2.2"
        />
        <line
          x1="5"
          y1="22"
          x2="9"
          y2="22"
          className={isWhite ? "stroke-white/80" : "stroke-[#1F2326]"}
          strokeWidth="1.8"
        />
        <line
          x1="5"
          y1="28"
          x2="9"
          y2="28"
          className={isWhite ? "stroke-white/80" : "stroke-[#1F2326]"}
          strokeWidth="1.8"
        />
        <line
          x1="5"
          y1="34"
          x2="9"
          y2="34"
          className={isWhite ? "stroke-white/80" : "stroke-[#1F2326]"}
          strokeWidth="1.8"
        />

        {/* Tower 2 (Tall Central) */}
        <rect
          x="16"
          y="6"
          width="12"
          height="38"
          rx="1.5"
          className={isWhite ? "stroke-white" : "stroke-[#1F2326]"}
          strokeWidth="2.2"
        />
        <path
          d="M 16 6 L 22 2 L 28 6"
          stroke="var(--color-bronze, #B08A4E)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="19.5"
          y1="14"
          x2="24.5"
          y2="14"
          stroke="var(--color-bronze, #B08A4E)"
          strokeWidth="1.8"
        />
        <line
          x1="19.5"
          y1="20"
          x2="24.5"
          y2="20"
          className={isWhite ? "stroke-white/80" : "stroke-[#1F2326]"}
          strokeWidth="1.8"
        />
        <line
          x1="19.5"
          y1="26"
          x2="24.5"
          y2="26"
          className={isWhite ? "stroke-white/80" : "stroke-[#1F2326]"}
          strokeWidth="1.8"
        />
        <line
          x1="19.5"
          y1="32"
          x2="24.5"
          y2="32"
          className={isWhite ? "stroke-white/80" : "stroke-[#1F2326]"}
          strokeWidth="1.8"
        />

        {/* Tower 3 */}
        <rect
          x="32"
          y="12"
          width="10"
          height="32"
          rx="1.5"
          className={isWhite ? "stroke-white/90" : "stroke-[#1F2326]"}
          strokeWidth="2.2"
        />
        <line
          x1="35"
          y1="18"
          x2="39"
          y2="18"
          className={isWhite ? "stroke-white/80" : "stroke-[#1F2326]"}
          strokeWidth="1.8"
        />
        <line
          x1="35"
          y1="24"
          x2="39"
          y2="24"
          className={isWhite ? "stroke-white/80" : "stroke-[#1F2326]"}
          strokeWidth="1.8"
        />
        <line
          x1="35"
          y1="30"
          x2="39"
          y2="30"
          className={isWhite ? "stroke-white/80" : "stroke-[#1F2326]"}
          strokeWidth="1.8"
        />

        {/* Foundation Base Line */}
        <line
          x1="0"
          y1="45"
          x2="44"
          y2="45"
          stroke="var(--color-bronze, #B08A4E)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Text Wordmark */}
      <span
        suppressHydrationWarning
        className={`font-serif text-base sm:text-lg md:text-xl font-bold tracking-wider uppercase leading-none truncate max-w-[200px] sm:max-w-[280px] transition-colors duration-300 ${
          isWhite ? "text-white" : "text-[#1F2326]"
        }`}
      >
        {name}
      </span>
    </div>
  );
}
