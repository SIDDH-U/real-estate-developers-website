"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className = "",
  action,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col ${
        isCenter ? "items-center text-center max-w-2xl mx-auto" : "sm:flex-row sm:items-end justify-between"
      } gap-4 mb-8 sm:mb-12 ${className}`}
    >
      <div className={isCenter ? "w-full" : "max-w-2xl"}>
        {/* Eyebrow: Fades in */}
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`text-xs font-semibold uppercase tracking-wider block mb-1.5 ${
            isDark ? "text-[#C9A66B]" : "text-[#B08A4E]"
          }`}
        >
          {eyebrow}
        </motion.span>

        {/* Title: Masked line slide-up reveal */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight ${
              isDark ? "text-[#F7F3EC]" : "text-[#1F2326]"
            }`}
          >
            {title}
          </motion.h2>
        </div>

        {/* Optional Subtitle: Subtle fade up */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`text-sm sm:text-base mt-2.5 leading-relaxed ${
              isDark ? "text-[#D8CEBD]" : "text-[#716B5E]"
            }`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {action && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-fit flex-shrink-0"
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}
