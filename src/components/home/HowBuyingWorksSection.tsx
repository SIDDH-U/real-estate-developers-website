"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Calendar, FileCheck, Key, ChevronDown } from "lucide-react";
import { buyingStepsData } from "@/data/projects";
import AmbientBackground from "@/components/common/AmbientBackground";
import SectionHeader from "@/components/common/SectionHeader";

export default function HowBuyingWorksSection() {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const iconMap: Record<string, React.ElementType> = {
    FileText,
    Calendar,
    FileCheck,
    Key,
  };

  // Scroll tracking on desktop to draw line and activate circles
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25) {
        const progress = Math.max(0, Math.min(1, (windowHeight * 0.7 - rect.top) / (rect.height * 0.8)));
        if (progress > 0.75) setActiveStep(4);
        else if (progress > 0.5) setActiveStep(3);
        else if (progress > 0.25) setActiveStep(2);
        else setActiveStep(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="how-buying-works"
      ref={containerRef}
      className="relative py-10 sm:py-20 lg:py-24 bg-[#1F3D2F] text-[#F7F3EC] overflow-hidden"
    >
      {/* Deep Forest Ambient Glow & Line Art */}
      <AmbientBackground variant="forest" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="SIMPLE &amp; TRANSPARENT"
          title="How Buying Works"
          subtitle="A seamless, step-by-step home buying journey designed with complete clarity and legal assurance at every stage."
          theme="dark"
          align="center"
        />

        {/* Desktop Horizontal 4-Step Sequence with Connecting Line & Pulse Ring */}
        <div className="hidden lg:block relative mt-12">
          {/* Background Connecting Hairline */}
          <div className="absolute top-8 left-20 right-20 h-0.5 bg-white/20 -translate-y-1/2 z-0" />

          {/* Animated Bronze Connecting Progress Line */}
          <div
            className="absolute top-8 left-20 h-0.5 bg-[#C9A66B] -translate-y-1/2 z-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_12px_rgba(201,166,107,0.5)]"
            style={{
              width: `${Math.min(100, ((activeStep - 1) / 3) * 85)}%`,
            }}
          />

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {buyingStepsData.map((step) => {
              const Icon = iconMap[step.iconName] || FileText;
              const isPastOrCurrent = activeStep >= step.stepNumber;
              const isCurrent = activeStep === step.stepNumber;

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(step.stepNumber)}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Step Circle with Bronze Fill & Soft Pulse Ring */}
                  <div className="relative mb-5">
                    {/* Soft Pulse Ring on Active Step */}
                    {isCurrent && (
                      <span className="absolute -inset-2 rounded-full border-2 border-[#C9A66B]/60 animate-ping pointer-events-none opacity-75" />
                    )}

                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-500 shadow-md ${
                        isCurrent
                          ? "bg-[#B08A4E] text-white border-white scale-110 shadow-[0_0_20px_rgba(176,138,78,0.5)] ring-4 ring-[#B08A4E]/30"
                          : isPastOrCurrent
                          ? "bg-[#C9A66B] text-[#1F3D2F] border-[#C9A66B]"
                          : "bg-white/10 text-white/50 border-white/20 hover:border-white/40"
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Step Number Badge */}
                    <div
                      className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border shadow-xs ${
                        isCurrent
                          ? "bg-white text-[#1F3D2F] border-white"
                          : "bg-[#14291F] text-white/80 border-white/20"
                      }`}
                    >
                      {step.stepNumber}
                    </div>
                  </div>

                  {/* Title & Description with Fade Up */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: step.stepNumber * 0.08 }}
                  >
                    <span className="text-[11px] font-semibold text-[#C9A66B] uppercase tracking-wider block mb-1">
                      {step.tagline}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#D8CEBD] leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Accordion View: Titles only, active step expanded (Step 1 open by default), connecting line & circles stay */}
        <div className="lg:hidden relative pl-4 max-w-md mx-auto mt-6">
          {/* Vertical Background Line */}
          <div className="absolute left-9 top-6 bottom-8 w-0.5 bg-white/20 -translate-x-1/2 z-0" />
          {/* Bronze Active Drawn Line */}
          <div
            className="absolute left-9 top-6 w-0.5 bg-[#C9A66B] -translate-x-1/2 z-0 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(201,166,107,0.5)]"
            style={{
              height: `${Math.min(100, ((activeStep - 1) / 3) * 100)}%`,
            }}
          />

          <div className="flex flex-col gap-4 relative z-10">
            {buyingStepsData.map((step) => {
              const Icon = iconMap[step.iconName] || FileText;
              const isPastOrCurrent = activeStep >= step.stepNumber;
              const isCurrent = activeStep === step.stepNumber;

              return (
                <div
                  key={step.stepNumber}
                  className="flex items-start gap-3.5"
                >
                  {/* Step Circle */}
                  <div className="relative flex-shrink-0 pt-0.5">
                    {isCurrent && (
                      <span className="absolute -inset-1.5 rounded-full border border-[#C9A66B]/60 animate-ping pointer-events-none" />
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveStep(step.stepNumber)}
                      aria-label={`Select step ${step.stepNumber}`}
                      className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 shadow-sm cursor-pointer ${
                        isCurrent
                          ? "bg-[#B08A4E] text-white border-white scale-105 ring-4 ring-[#B08A4E]/30"
                          : isPastOrCurrent
                          ? "bg-[#C9A66B] text-[#1F3D2F] border-[#C9A66B]"
                          : "bg-white/10 text-white/50 border-white/20"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#14291F] text-white text-[9px] font-bold flex items-center justify-center border border-white/30">
                      {step.stepNumber}
                    </div>
                  </div>

                  {/* Accordion Item: Title clickable, smooth height expand for active step */}
                  <div className="flex-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 overflow-hidden transition-all">
                    <button
                      type="button"
                      onClick={() => setActiveStep(isCurrent ? 0 : step.stepNumber)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-2 cursor-pointer"
                    >
                      <div>
                        <div className="text-[10px] font-semibold text-[#C9A66B] uppercase tracking-wider">
                          {step.tagline}
                        </div>
                        <h3 className="text-sm font-serif font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-white/70 transition-transform duration-300 flex-shrink-0 ${
                          isCurrent ? "rotate-180 text-[#C9A66B]" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isCurrent && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3.5 pb-3.5 pt-1 border-t border-white/10 text-xs text-[#D8CEBD] leading-relaxed">
                            {step.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
