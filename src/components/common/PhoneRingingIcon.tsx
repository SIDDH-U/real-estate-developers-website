"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";

interface PhoneRingingIconProps {
  className?: string;
  iconClassName?: string;
  rippleClassName?: string;
  size?: number;
}

export default function PhoneRingingIcon({
  className = "relative inline-flex items-center justify-center",
  iconClassName = "w-4 h-4",
  rippleClassName = "bg-[#B08A4E]",
  size = 16,
}: PhoneRingingIconProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 700);
  };

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        <Phone size={size} className={iconClassName} />
      </div>
    );
  }

  return (
    <div className={className} onClick={handleTap}>
      {/* Soft Ripple Ring in sync with ring cycle */}
      <motion.span
        animate={
          isTapped
            ? { scale: [1, 1.8], opacity: [0.6, 0] }
            : {
                scale: [1, 1.6, 1.6, 1],
                opacity: [0.35, 0, 0, 0],
              }
        }
        transition={
          isTapped
            ? { duration: 0.6, ease: "easeOut" }
            : {
                duration: 4.7,
                repeat: Infinity,
                times: [0, 0.15, 0.9, 1],
                ease: [0.22, 1, 0.36, 1],
              }
        }
        className={`absolute inset-0 rounded-full pointer-events-none ${rippleClassName}`}
      />

      {/* Rotating Phone Icon */}
      <motion.div
        animate={
          isTapped
            ? { rotate: [0, -20, 18, -14, 10, -5, 0] }
            : {
                rotate: [0, -14, 12, -10, 8, -4, 0, 0],
              }
        }
        transition={
          isTapped
            ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
            : {
                duration: 4.7,
                repeat: Infinity,
                times: [0, 0.025, 0.05, 0.075, 0.1, 0.125, 0.15, 1],
                ease: [0.22, 1, 0.36, 1],
              }
        }
        className="relative z-10 flex items-center justify-center"
      >
        <Phone size={size} className={iconClassName} />
      </motion.div>
    </div>
  );
}
