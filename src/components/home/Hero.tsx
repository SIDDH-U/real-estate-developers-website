"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLeadModal } from "@/context/LeadModalContext";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { useDemo } from "@/context/DemoContext";

export default function Hero() {
  const demo = useDemo();
  const { openLeadModal, openVideoModal } = useLeadModal();
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [liveSalesStatus, setLiveSalesStatus] = useState("Sales desk open — until 6:30 PM");
  const [isSalesDeskOpen, setIsSalesDeskOpen] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Compute live sales desk status in Indian Standard Time (IST: UTC+5:30)
  useEffect(() => {
    const updateDeskStatus = () => {
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utcTime + 5.5 * 3600000);

      const day = istDate.getDay(); // 0 = Sunday
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      const openMinutes = 9 * 60 + 30; // 9:30 AM
      const closeMinutes = 18 * 60 + 30; // 6:30 PM

      if (day === 0) {
        setLiveSalesStatus("Sundays by appointment");
        setIsSalesDeskOpen(false);
      } else if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        setLiveSalesStatus("Sales desk open — until 6:30 PM");
        setIsSalesDeskOpen(true);
      } else {
        setLiveSalesStatus("Sales desk opens at 9:30 AM");
        setIsSalesDeskOpen(false);
      }
    };

    updateDeskStatus();
    const interval = setInterval(updateDeskStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Price count-up
    const timer = setTimeout(() => {
      let current = 0;
      const target = 45;
      const interval = setInterval(() => {
        current += 3;
        if (current >= target) {
          setAnimatedPrice(target);
          clearInterval(interval);
        } else {
          setAnimatedPrice(current);
        }
      }, 30);
    }, 1200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const easeLuxury = [0.22, 1, 0.36, 1] as const;

  const tickerClaims = [
    "RERA Registered",
    "On-Time Possession",
    "M40 Grade Concrete",
    "Transparent Pricing",
    "25+ Projects Delivered",
    "Site Visits Mon-Sat",
  ];

  // Repeat items so each group easily exceeds wide desktop screens
  const groupItems = [...tickerClaims, ...tickerClaims, ...tickerClaims];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between bg-[#0F1412]"
      style={{
        opacity: Math.max(0.3, 1 - scrollY / 900),
        paddingTop: "calc(6rem + var(--demo-h, 0px))",
      }}
    >
      {/* 1. SINGLE FULL-BLEED PICTURE RUNNING EDGE TO EDGE BEHIND HEADER */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <picture className="absolute inset-0 w-full h-full">
          {/* Mobile 9:16 portrait art-direction with building centered in lower 60% */}
          <source
            media="(max-width: 767px)"
            srcSet="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1080&h=1920&fit=crop&crop=bottom,center"
          />
          {/* Desktop 16:9 2400px wide */}
          <source
            media="(min-width: 768px)"
            srcSet="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2400&auto=format&fit=crop"
          />
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2400&auto=format&fit=crop"
            alt={`${demo.name} luxury residences in ${demo.city} at golden hour`}
            fetchPriority="high"
            className="w-full h-full object-cover object-bottom animate-ken-burns filter contrast-[1.03] brightness-[1.02]"
          />
        </picture>

        {/* Soft diagonal light sweep across the facade every ~12s (10% white, transform only) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent facade-light-sweep" />
        </div>

        {/* WARM GOLDEN-HOUR COLOUR GRADE OVERLAY (Soft-light blend mode) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(176,138,78,0.22) 0%, rgba(176,138,78,0.06) 45%, transparent 70%)",
            mixBlendMode: "soft-light",
          }}
        />

        {/* 2. LAYERED GRADIENT OVERLAYS (Lightened upper half for golden hour radiance) */}
        {/* Desktop: left-to-right gradient rgba(15,20,18,0.76) -> 0.32 at 55% -> transparent */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[rgba(15,20,18,0.78)] via-[rgba(15,20,18,0.36)] to-transparent" />

        {/* Mobile: bottom-up gradient transparent -> rgba(15,20,18,0.88) across bottom 55% */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-[rgba(15,20,18,0.92)] via-[rgba(15,20,18,0.64)] via-55% to-transparent" />

        {/* 140px top scrim under the header: rgba(15,20,18,0.55) -> 0 */}
        <div className="absolute top-0 left-0 right-0 h-[140px] bg-gradient-to-b from-[rgba(15,20,18,0.55)] to-transparent pointer-events-none" />
      </div>

      {/* 3. HERO CONTENT & UI CHOREOGRAPHY */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* LEFT COLUMN: HERO TEXT & ACTIONS (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 pt-2 sm:pt-0">
            {/* Eyebrow: Fades in */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeLuxury, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-white uppercase">
                {siteConfig.eyebrowText}
              </span>
            </motion.div>

            {/* Headline with SVG bronze animated underline under "Call Home." */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_24px_rgba(0,0,0,0.38)]">
              <span>Building Spaces </span>
              <span className="relative inline-block whitespace-nowrap">
                <span>You&apos;ll Call Home.</span>
                {/* Thin bronze underline draws once under "Call Home." on load */}
                <svg
                  className="absolute left-0 -bottom-1.5 sm:-bottom-2.5 w-full h-3 overflow-visible pointer-events-none"
                  viewBox="0 0 280 14"
                  fill="none"
                >
                  <motion.path
                    d="M 2 9 Q 140 2 278 8"
                    stroke="#B08A4E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </svg>
              </span>
            </h1>

            {/* Subline: White at 90% with soft text-shadow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeLuxury, delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]"
            >
              Premium residences crafted with trust, quality and timely delivery in{" "}
              <span suppressHydrationWarning>{demo.city}</span>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeLuxury, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
            >
              {/* Primary Bronze Button */}
              <Link
                href="/#projects"
                onClick={() => trackAnalyticsEvent("filter_change", { label: "explore_projects_hero" })}
                className="btn-bronze inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-md active:scale-97 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary Outline Walkthrough button with Play Ring */}
              <button
                type="button"
                onClick={() => openVideoModal()}
                className="btn-secondary inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-full text-sm sm:text-base font-medium active:scale-97 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#B08A4E] flex items-center justify-center text-white pulse-play">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Walkthrough</span>
              </button>
            </motion.div>

            {/* Proof Row: avatars + "500+ Happy Families" + RERA on one line on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeLuxury, delay: 1.0 }}
              className="flex items-center gap-2 sm:gap-4 pt-3 border-t border-white/15 text-xs text-white/85 overflow-x-auto no-scrollbar whitespace-nowrap"
            >
              {/* Avatars */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#B08A4E] border border-white/40 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white shadow-xs">
                    SK
                  </div>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1F3D2F] border border-white/40 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white shadow-xs">
                    MP
                  </div>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#2D3337] border border-white/40 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white shadow-xs">
                    DF
                  </div>
                </div>
                <span className="font-semibold text-white">500+ Happy Families</span>
              </div>

              <span className="text-white/40 select-none">•</span>

              <div className="flex items-center gap-1.5 font-medium text-emerald-300 flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MahaRERA Registered</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: GLASS PROJECT SPOTLIGHT CARD */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeLuxury, delay: 1.1 }}
              className="w-full max-w-sm"
            >
              {/* MOBILE COMPACT SINGLE ROW CARD */}
              <div className="block md:hidden glass-dark rounded-2xl p-3.5 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Live Status Chip (replaces Fast Selling slot) */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/15 text-[10px] text-white/90 mb-1">
                      <span className="relative flex h-2 w-2">
                        {isSalesDeskOpen && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        )}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${isSalesDeskOpen ? "bg-emerald-500" : "bg-amber-400"}`} />
                      </span>
                      <span className="font-medium truncate">{liveSalesStatus}</span>
                    </div>

                    <h3 className="text-sm font-serif font-bold text-white truncate">
                      Greenview Heights
                    </h3>
                    <div className="text-xs text-white/90 font-semibold">
                      From ₹ {animatedPrice} Lakhs*
                    </div>
                  </div>

                  <Link
                    href="/projects/greenview-heights"
                    aria-label="View Greenview Heights"
                    className="w-10 h-10 rounded-full bg-[#B08A4E] text-white flex items-center justify-center flex-shrink-0 active:scale-95 shadow-md"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* DESKTOP FULL DARK GLASS CARD */}
              <div className="hidden md:block glass-dark rounded-3xl p-6 border border-white/20 shadow-2xl group hover:border-[#B08A4E]/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-3.5 gap-2">
                  {/* Live Status Chip (replaces Fast Selling slot) */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/15 text-[11px] text-white/95">
                    <span className="relative flex h-2 w-2">
                      {isSalesDeskOpen && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      )}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isSalesDeskOpen ? "bg-emerald-500" : "bg-amber-400"}`} />
                    </span>
                    <span className="font-medium">{liveSalesStatus}</span>
                  </div>

                  <span className="text-xs text-white/80 font-medium" suppressHydrationWarning>
                    Pawdewadi, {demo.city}
                  </span>
                </div>

                {/* Thumbnail Image */}
                <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-4 border border-white/25">
                  <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop"
                    alt="Greenview Heights preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <h3 className="text-xl font-serif font-bold text-white">
                  Greenview Heights
                </h3>
                <p className="text-xs text-white/80 mt-0.5 mb-3.5">
                  2 &amp; 3 BHK Premium Residences with 20+ Amenities
                </p>

                {/* Price count-up and Booking CTA */}
                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold block">
                      Starting from
                    </span>
                    <div className="text-xl font-bold text-white tabular-nums">
                      ₹ {animatedPrice} Lakhs*
                    </div>
                  </div>

                  <Link
                    href="/projects/greenview-heights"
                    aria-label="View Greenview Heights"
                    className="w-11 h-11 rounded-full bg-[#B08A4E] hover:bg-[#96743D] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. TICKER STRIP: 40px glass band at bottom of hero */}
      <div className="ticker-wrap relative z-20 w-full h-10 border-y border-white/15 bg-black/45 backdrop-blur-md">
        <div className="ticker-track">
          <div className="ticker-group text-[12px] uppercase font-semibold tracking-[0.12em] text-white/80 select-none">
            {groupItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-[#B08A4E] text-[10px] font-black select-none" aria-hidden="true">•</span>
              </div>
            ))}
          </div>
          <div className="ticker-group text-[12px] uppercase font-semibold tracking-[0.12em] text-white/80 select-none" aria-hidden="true">
            {groupItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-[#B08A4E] text-[10px] font-black select-none" aria-hidden="true">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
