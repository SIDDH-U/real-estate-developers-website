"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Waves, Trees, Dumbbell, Baby, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import AmbientBackground from "@/components/common/AmbientBackground";
import SectionHeader from "@/components/common/SectionHeader";

export default function AmenitiesSection() {
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const amenities = [
    {
      id: "clubhouse",
      title: "Luxury Clubhouse",
      subtitle: "Multi-level community center with grand banquet hall, billiards, and private lounge.",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
      colSpan: "lg:col-span-4",
    },
    {
      id: "pool",
      title: "Infinity Pool",
      subtitle: "Temperature-regulated swimming pool with poolside cabanas & kids' splash zone.",
      icon: Waves,
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000&auto=format&fit=crop",
      colSpan: "lg:col-span-4",
    },
    {
      id: "garden",
      title: "Landscaped Garden",
      subtitle: "Acre-wide botanical walking avenues with gazebos and reflexology barefoot paths.",
      icon: Trees,
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop",
      colSpan: "lg:col-span-4",
    },
    {
      id: "gym",
      title: "High-Tech Gym",
      subtitle: "State-of-the-art strength & cardio equipment with certified personal trainers.",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
      colSpan: "lg:col-span-6",
    },
    {
      id: "kids",
      title: "Children's Play Arena",
      subtitle: "Safe EPDM cushioned play zone equipped with climbing frames and sensory play.",
      icon: Baby,
      image: "https://images.unsplash.com/photo-1596464716127-f2a829822301?q=80&w=1000&auto=format&fit=crop",
      colSpan: "lg:col-span-6",
    },
  ];

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardWidth = el.offsetWidth * 0.82;
    const scrollLeft = el.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== mobileActiveIdx && newIndex >= 0 && newIndex < amenities.length) {
      setMobileActiveIdx(newIndex);
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.82;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setMobileActiveIdx(index);
    }
  };

  return (
    <section
      id="amenities"
      className="relative py-10 sm:py-20 lg:py-24 bg-[#F7F3EC] overflow-hidden"
    >
      <AmbientBackground variant="sand" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          eyebrow="AMENITIES &amp; LIFESTYLE"
          title="Designed for a Better Everyday"
          subtitle="Curated lifestyle amenities built to elevate wellness, recreation, and family connection."
          action={
            <Link
              href="/amenities"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B08A4E] hover:text-[#96743D] transition-colors group"
            >
              <span>View All Amenities</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />

        {/* Desktop Bento Grid with Bottom-to-Top Clip-Path Reveal */}
        <div className="hidden lg:grid grid-cols-12 gap-6">
          {amenities.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0, y: 16 }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${item.colSpan} rounded-3xl overflow-hidden relative h-80 shadow-md group border border-[#E5DFD5] bg-[#1F2326]`}
              >
                {/* Background Image with Hover Parallax */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                {/* Gradient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141719]/90 via-[#1F2326]/35 to-transparent pointer-events-none" />

                {/* Bottom Card Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs group-hover:bg-[#B08A4E] transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#D8CEBD] line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Interactive Carousel: Active at scale 1, neighbours at 0.94 with reduced opacity for depth */}
        <div className="lg:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 snap-x snap-mandatory pt-2 pb-4 items-center"
          >
            {amenities.map((item, idx) => {
              const IconComponent = item.icon;
              const isActive = mobileActiveIdx === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => scrollToSlide(idx)}
                  className={`min-w-[82vw] snap-center flex-shrink-0 rounded-2xl overflow-hidden relative h-72 shadow-md border border-[#E5DFD5] bg-[#1F2326] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "scale-100 opacity-100 z-10 ring-2 ring-[#B08A4E]/40" : "scale-[0.94] opacity-75 z-0"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="85vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141719]/90 via-[#1F2326]/40 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#D8CEBD] line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator & Navigation for Mobile */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {amenities.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToSlide(idx)}
                aria-label={`Go to amenity ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  mobileActiveIdx === idx ? "w-6 bg-[#B08A4E]" : "w-1.5 bg-[#D8CEBD]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
