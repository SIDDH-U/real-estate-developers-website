"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Building, Maximize, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import AmbientBackground from "@/components/common/AmbientBackground";
import SectionHeader from "@/components/common/SectionHeader";
import { useLeadModal } from "@/context/LeadModalContext";
import { useDemo } from "@/context/DemoContext";

export default function ConstructionSection() {
  const { city, appendQuery } = useDemo();
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0); // 0 to 100%
  const [statsVisible, setStatsVisible] = useState(false);
  const [statsCount, setStatsCount] = useState({ years: 0, projects: 0, sqft: 0, clarity: 0 });
  const [showFullDesc, setShowFullDesc] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { openLeadModal } = useLeadModal();

  const progressStages = [
    {
      title: "1. Soil Testing & Raft Foundation",
      status: "100% Completed",
      desc: "Deep geotechnical borewell testing, earthquake-resistant RCC raft foundation casting, and chemical waterproofing against groundwater ingress.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "2. RCC Superstructure Framing",
      status: "Superstructure at 75%",
      desc: "High-grade FE550D TMT rebar and certified M40 ready-mix concrete poured with German aluminium formwork technology for laser-straight walls.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "3. Masonry & Concealed Services",
      status: "Plumbing & Electrical Active",
      desc: "Thermal-insulating AAC block masonry, fire-retardant concealed copper wiring, and sound-dampened CPVC plumbing lines tested at 10 bar.",
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "4. Premium Facade & Handover",
      status: "Possession Dec 2027",
      desc: "Weather-resistant external silicone paint, Italian marble entrance lobbies, OTIS high-speed elevators, and registered OC certification.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  // Instagram Story Auto-Advancement (5s per stage, pause on hover/touch)
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // update progress every 50ms
    const step = (100 / 5000) * intervalTime; // 5000ms total

    const timer = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          setActiveStage((current) => (current + 1) % progressStages.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, activeStage, progressStages.length]);

  const selectStage = (idx: number) => {
    setActiveStage(idx);
    setStoryProgress(0);
  };

  // Stats counting up once when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsVisible) {
          setStatsVisible(true);
          let count = 0;
          const interval = setInterval(() => {
            count += 1;
            setStatsCount({
              years: Math.min(15, count),
              projects: Math.min(25, count * 2),
              sqft: Math.min(5, Math.floor(count / 3)),
              clarity: Math.min(100, count * 7),
            });
            if (count >= 15) {
              setStatsCount({ years: 15, projects: 25, sqft: 5, clarity: 100 });
              clearInterval(interval);
            }
          }, 50);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [statsVisible]);

  return (
    <section
      id="construction"
      ref={sectionRef}
      className="relative py-10 sm:py-20 lg:py-24 bg-[#F7F3EC] overflow-hidden"
    >
      <AmbientBackground variant="sand" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="CONSTRUCTION &amp; QUALITY"
          title="Built with Strength. Delivered with Trust."
          subtitle={`Strict quality control, modern German formwork, M40 concrete grades, and committed possession schedules certified by registered civil structural engineers in ${city}.`}
          action={
            <Link
              href={appendQuery("/construction-updates")}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B08A4E] hover:text-[#96743D] transition-colors group"
            >
              <span>View Updates</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: INSTAGRAM-STORY STAGE SELECTOR (6 cols) */}
          <div
            className="lg:col-span-7 flex flex-col gap-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Stage Media Display with Cross-fade & Subtle Zoom */}
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-[#1F2326] shadow-xl border border-[#E5DFD5]">
              {/* Instagram Story Progress Segments at Top */}
              <div className="absolute top-3 inset-x-3 sm:inset-x-4 z-20 flex gap-1.5 sm:gap-2">
                {progressStages.map((_, idx) => {
                  let progress = 0;
                  if (idx < activeStage) progress = 100;
                  else if (idx === activeStage) progress = storyProgress;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => selectStage(idx)}
                      aria-label={`Jump to stage ${idx + 1}`}
                      className="h-1 sm:h-1.5 flex-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                    >
                      <div
                        className="h-full bg-white transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Cross-fade and slight zoom image container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={progressStages[activeStage].image}
                    alt={progressStages[activeStage].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141719]/90 via-[#141719]/35 to-black/20" />
                </motion.div>
              </AnimatePresence>

              {/* Card Bottom Meta */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 text-white z-10">
                <div className="flex items-center justify-between mb-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    {progressStages[activeStage].status}
                  </span>
                  <span className="text-[11px] text-white/70 font-medium">
                    Stage {activeStage + 1} of {progressStages.length}
                  </span>
                </div>

                <h3 className="text-base sm:text-xl font-serif font-bold text-white mb-1">
                  {progressStages[activeStage].title}
                </h3>

                {/* Paragraph with 2-line clamp & 'Read more' toggle */}
                <p
                  className={`text-xs sm:text-sm text-[#D8CEBD] leading-relaxed transition-all ${
                    showFullDesc ? "" : "line-clamp-2"
                  }`}
                >
                  {progressStages[activeStage].desc}
                </p>
                <button
                  type="button"
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-[11px] font-semibold text-[#C9A66B] hover:underline mt-0.5 cursor-pointer"
                >
                  {showFullDesc ? "Show less" : "Read more"}
                </button>

                {/* Merged 'View Updates' link directly in card (shortens mobile height!) */}
                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between">
                  <span className="text-[11px] text-[#A89E8D] hidden sm:inline">
                    Live monthly photographic logs for all flat owners.
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal({
                        projectName: "Greenview Heights",
                        source: "construction_stage_card",
                      })
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A66B] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>View Construction Updates</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stage Selector Pills */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {progressStages.map((stage, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectStage(idx)}
                  className={`p-2 sm:p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    activeStage === idx
                      ? "bg-[#1F3D2F] text-white border-[#1F3D2F] shadow-xs"
                      : "bg-white text-[#1F2326] border-[#E5DFD5] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <div className="text-[9px] sm:text-[10px] font-bold opacity-80 uppercase">
                    Stage {idx + 1}
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold truncate">
                    {stage.title.split(". ")[1]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: STATS COUNT-UP WITH TABULAR NUMERALS (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            {/* Compact 2x2 Grid with Tabular Numerals */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E5DFD5] shadow-xs hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] text-[#B08A4E] flex items-center justify-center mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2326] tabular-nums">
                  {statsCount.years}+
                </div>
                <div className="text-[11px] sm:text-xs text-[#716B5E] mt-0.5 font-medium">
                  Years of Experience
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E5DFD5] shadow-xs hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] text-[#B08A4E] flex items-center justify-center mb-2">
                  <Building className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2326] tabular-nums">
                  {statsCount.projects}+
                </div>
                <div className="text-[11px] sm:text-xs text-[#716B5E] mt-0.5 font-medium">
                  Projects Delivered
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E5DFD5] shadow-xs hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] text-[#B08A4E] flex items-center justify-center mb-2">
                  <Maximize className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2326] tabular-nums">
                  {statsCount.sqft}M+
                </div>
                <div className="text-[11px] sm:text-xs text-[#716B5E] mt-0.5 font-medium">
                  sq ft Built
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E5DFD5] shadow-xs hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] text-[#B08A4E] flex items-center justify-center mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2326] tabular-nums">
                  {statsCount.clarity}%
                </div>
                <div className="text-[11px] sm:text-xs text-[#716B5E] mt-0.5 font-medium">
                  Legal Clarity
                </div>
              </div>
            </div>

            {/* Quality Commitment Callout with Bronze CTA */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E5DFD5] shadow-xs">
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#1F2326] mb-1">
                Zero Compromise Structural Assurance
              </h4>
              <p className="text-xs text-[#716B5E] leading-relaxed mb-4">
                Every batch of steel and cement undergoes third-party lab testing. Structural drawings are vetted by accredited government engineers.
              </p>
              <Link
                href="/about#quality"
                className="btn-secondary w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Learn More About Our Quality</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
