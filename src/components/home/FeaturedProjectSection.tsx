"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Download,
  Maximize2,
  Calendar,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { projectsData } from "@/data/projects";
import { useLeadModal } from "@/context/LeadModalContext";
import { trackAnalyticsEvent } from "@/lib/analytics";
import AmbientBackground from "@/components/common/AmbientBackground";
import HairlineDivider from "@/components/common/HairlineDivider";

export default function FeaturedProjectSection() {
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
  const [activeTab, setActiveTab] = useState<"floorplan" | "gallery" | "highlights">("floorplan");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isFloorPlanZoomOpen, setIsFloorPlanZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const { openLeadModal } = useLeadModal();
  const easeLuxury = [0.22, 1, 0.36, 1] as const;

  const handleBrochureDownload = () => {
    trackAnalyticsEvent("brochure_download", { project: featuredProject.title });
    openLeadModal({
      intent: "brochure",
      projectName: featuredProject.title,
      source: "featured_download_brochure",
    });
  };

  const nextGalleryImage = () => {
    setActiveGalleryIndex((prev) => (prev + 1) % featuredProject.galleryImages.length);
  };

  const prevGalleryImage = () => {
    setActiveGalleryIndex((prev) => (prev - 1 + featuredProject.galleryImages.length) % featuredProject.galleryImages.length);
  };

  return (
    <section id="spotlight" className="relative py-12 sm:py-20 bg-[#F7F3EC] overflow-hidden">
      <AmbientBackground variant="sand" showBlueprint={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: easeLuxury }}
            className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E] block mb-1"
          >
            PROJECT SPOTLIGHT
          </motion.span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease: easeLuxury, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1F2326]"
              >
                {featuredProject.title}
              </motion.h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#716B5E]">
              <MapPin className="w-3.5 h-3.5 text-[#B08A4E]" />
              <span>{featuredProject.location.fullAddress}</span>
            </div>
          </div>
        </div>

        {/* Compact 3-Chip Specs Row (Mobile & Desktop) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-[#E5DFD5] shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] flex items-center justify-center text-[#B08A4E]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-[#716B5E] uppercase font-semibold">Config</div>
              <div className="text-xs sm:text-sm font-bold text-[#1F2326] truncate">
                {featuredProject.configurations.split(" ")[0]} BHK
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-[#E5DFD5] shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] flex items-center justify-center text-[#B08A4E]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-[#716B5E] uppercase font-semibold">Area</div>
              <div className="text-xs sm:text-sm font-bold text-[#1F2326] truncate">
                {featuredProject.superBuiltUpRange}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-[#E5DFD5] shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] flex items-center justify-center text-[#B08A4E]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-[#716B5E] uppercase font-semibold">Target</div>
              <div className="text-xs sm:text-sm font-bold text-[#1F2326] truncate">
                {featuredProject.possessionDate}
              </div>
            </div>
          </div>
        </div>

        {/* Unified Tabbed Spotlight Card (Mobile and Desktop) */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-[#E5DFD5] shadow-xs">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F7F3EC] rounded-2xl border border-[#E5DFD5]/80 max-w-md mx-auto mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("floorplan")}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "floorplan"
                  ? "bg-[#1F3D2F] text-white shadow-xs"
                  : "text-[#1F2326] hover:text-[#B08A4E]"
              }`}
            >
              Floor Plan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("gallery")}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-[#1F3D2F] text-white shadow-xs"
                  : "text-[#1F2326] hover:text-[#B08A4E]"
              }`}
            >
              Gallery
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("highlights")}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "highlights"
                  ? "bg-[#1F3D2F] text-white shadow-xs"
                  : "text-[#1F2326] hover:text-[#B08A4E]"
              }`}
            >
              Highlights
            </button>
          </div>

          {/* TAB CONTENT (Cross-fades with 8px slide) */}
          <AnimatePresence mode="wait">
            {activeTab === "floorplan" && (
              <motion.div
                key="floorplan"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease: easeLuxury }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                {/* Floor Plan with Left-to-Right Clip-path wipe */}
                <div
                  onClick={() => setIsFloorPlanZoomOpen(true)}
                  className="lg:col-span-8 relative aspect-[4/3] sm:h-96 w-full rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#D8CEBD] cursor-zoom-in group shadow-xs [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
                >
                  <Image
                    src="/images/floor-plan-schematic.svg"
                    alt="2 & 3 BHK Floor Plan Schematic"
                    fill
                    className="object-contain p-2 group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#1F2326]/80 text-white px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 shadow">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Pinch / Zoom</span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#1F2326]">
                      Typical 3 BHK Premium Layout
                    </h3>
                    <p className="text-xs text-[#716B5E] mt-1 leading-relaxed">
                      Zero space wastage, sunlit grand living hall, cross-ventilated master bedroom, and attached sunset balcony.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleBrochureDownload}
                    className="btn-bronze w-full py-3.5 rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-97"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Complete Floor Plans (PDF)</span>
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "gallery" && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease: easeLuxury }}
                className="flex flex-col gap-4"
              >
                <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#1F2326] shadow-md border border-[#E5DFD5]">
                  <Image
                    src={featuredProject.galleryImages[activeGalleryIndex]}
                    alt={`${featuredProject.title} image`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-cover transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Nav Arrows */}
                  <button
                    type="button"
                    onClick={prevGalleryImage}
                    aria-label="Previous view"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextGalleryImage}
                    aria-label="Next view"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-3 left-4 text-white text-xs font-medium">
                    Photo {activeGalleryIndex + 1} of {featuredProject.galleryImages.length}
                  </div>
                </div>

                {/* Desktop Thumbnail Row / Mobile Dots */}
                <div className="hidden sm:grid grid-cols-4 gap-3">
                  {featuredProject.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeGalleryIndex === idx
                          ? "border-[#B08A4E]"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-1.5 sm:hidden">
                  {featuredProject.galleryImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveGalleryIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        activeGalleryIndex === i ? "w-5 bg-[#B08A4E]" : "w-1.5 bg-[#D8CEBD]"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "highlights" && (
              <motion.div
                key="highlights"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease: easeLuxury }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {featuredProject.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#F7F3EC] border border-[#E5DFD5] text-xs text-[#1F2326]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#1F3D2F]/10 text-[#1F3D2F] font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                      ✓
                    </span>
                    <span className="font-medium">{h}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FULL-SCREEN PINCH-ZOOM MODAL */}
      {isFloorPlanZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#141719]/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1F2326] text-white">
            <h3 className="font-serif font-bold text-base">
              {featuredProject.title} • 3 BHK Layout
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.25))}
                aria-label="Zoom out"
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                aria-label="Zoom in"
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                aria-label="Reset zoom"
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFloorPlanZoomOpen(false);
                  setZoomLevel(1);
                }}
                aria-label="Close"
                className="w-8 h-8 rounded-lg bg-[#B08A4E] text-white flex items-center justify-center ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <div
              style={{ transform: `scale(${zoomLevel})` }}
              className="relative max-w-5xl w-full aspect-[4/3] rounded-xl overflow-hidden transition-transform duration-200"
            >
              <Image
                src="/images/floor-plan-schematic.svg"
                alt="Detailed Floor Plan"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
