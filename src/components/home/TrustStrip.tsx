"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Layers, Sparkles } from "lucide-react";
import AmbientBackground from "@/components/common/AmbientBackground";

export default function TrustStrip() {
  const [activeDot, setActiveDot] = useState(0);

  const trustItems = [
    {
      id: "trust-rera",
      title: "RERA Approved",
      subtitle: "100% Legal & Clear Titles",
      icon: ShieldCheck,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      id: "trust-delivery",
      title: "On-Time Delivery",
      subtitle: "Committed Possession Guarantee",
      icon: Clock,
      color: "text-amber-700 bg-amber-50 border-amber-200",
    },
    {
      id: "trust-locations",
      title: "Prime Locations",
      subtitle: "Arterial Road & Civic Access",
      icon: Layers,
      color: "text-sky-700 bg-sky-50 border-sky-200",
    },
    {
      id: "trust-pricing",
      title: "Transparent Pricing",
      subtitle: "Zero Hidden Costs or Surprises",
      icon: Sparkles,
      color: "text-[#B08A4E] bg-[#F7F3EC] border-[#E5DFD5]",
    },
  ];

  const easeLuxury = [0.22, 1, 0.36, 1] as const;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / (width * 0.7));
    setActiveDot(Math.min(3, Math.max(0, index)));
  };

  return (
    <section id="why-us" className="relative z-30 py-6 sm:py-10 bg-[#F7F3EC] overflow-hidden">
      <AmbientBackground variant="sand" />

      {/* Container Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-xl border border-[#E5DFD5]/80 overflow-hidden">
          {/* Horizontal Swipe Row on Mobile (with scroll listener for dots) + Grid on Desktop */}
          <div
            onScroll={handleScroll}
            className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory lg:snap-none -mx-1 px-1"
          >
            {trustItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.6,
                    ease: easeLuxury,
                    delay: idx * 0.08,
                  }}
                  className="min-w-[70vw] sm:min-w-[42vw] lg:min-w-0 snap-center flex-shrink-0 lg:flex-shrink flex items-center gap-3 p-3 rounded-2xl hover:bg-[#F7F3EC]/70 transition-colors group"
                >
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${item.color}`}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1F2326] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#716B5E] leading-tight mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Indicator on Mobile */}
          <div className="flex lg:hidden items-center justify-center gap-1.5 mt-3 pt-2 border-t border-[#F0EBE1]">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeDot === i ? "w-5 bg-[#B08A4E]" : "w-1.5 bg-[#D8CEBD]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
