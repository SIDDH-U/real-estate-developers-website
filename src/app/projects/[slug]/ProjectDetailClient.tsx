"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  Download,
  Maximize2,
  ChevronRight,
  Phone,
  MessageCircle,
  Building,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react";
import { Project } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { useLeadModal } from "@/context/LeadModalContext";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { useDemo } from "@/context/DemoContext";
import AppLink from "@/components/common/AppLink";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const demo = useDemo();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeFloorPlanIndex, setActiveFloorPlanIndex] = useState(0);
  const [isFloorPlanZoomOpen, setIsFloorPlanZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const { openLeadModal } = useLeadModal();

  const handleBookVisit = () => {
    openLeadModal({
      intent: "site_visit",
      projectName: project.title,
      source: `project_detail_${project.slug}`,
    });
  };

  const handleBrochureDownload = () => {
    trackAnalyticsEvent("brochure_download", { project: project.title });
    openLeadModal({
      intent: "brochure",
      projectName: project.title,
      source: `brochure_download_${project.slug}`,
    });
  };

  const handleWhatsApp = () => {
    trackAnalyticsEvent("whatsapp_click", { project: project.title });
    const msg = encodeURIComponent(
      `Hello ${demo.name}, I am interested in ${project.title} (${project.configurations}) in ${demo.city}. Please share the pricing breakdown and site visit schedule.`
    );
    window.open(`https://wa.me/${demo.phoneLink}?text=${msg}`, "_blank");
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F3EC]">
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#716B5E]">
          <AppLink href="/" className="hover:text-[#1F2326]">
            Home
          </AppLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <AppLink href="/#projects" className="hover:text-[#1F2326]">
            Projects
          </AppLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1F2326] font-semibold">{project.title}</span>
        </nav>
      </div>

      {/* 2. Project Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E5DFD5]">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1F3D2F] text-white">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF6EE] text-[#B08A4E] border border-[#E5DFD5]">
                {project.status}
              </span>
              {project.reraNumber && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>RERA: {project.reraNumber}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1F2326]">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-[#716B5E] mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#B08A4E]" />
              <span>{project.location.fullAddress}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <span className="text-xs text-[#8C816E] uppercase font-semibold block">
                {project.pricing.pricePrefix}
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2326]">
                {project.pricing.startingPrice}
              </div>
            </div>

            <button
              type="button"
              onClick={handleBookVisit}
              className="btn-bronze px-6 py-3.5 rounded-full text-sm font-semibold shadow-md active:scale-97 transition-all cursor-pointer"
            >
              Book a Site Visit
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Gallery & Specs Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gallery View */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="relative h-[340px] sm:h-[480px] w-full rounded-3xl overflow-hidden bg-[#1F2326] shadow-lg border border-[#E5DFD5]">
              <Image
                src={project.galleryImages[activeImageIndex] || project.heroImage}
                alt={`${project.title} view ${activeImageIndex + 1}`}
                fill
                priority
                className="object-cover transition-all duration-500"
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {project.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? "border-[#B08A4E]" : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specs & Actions Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DFD5] shadow-sm flex flex-col gap-5">
            <h3 className="text-lg font-serif font-bold text-[#1F2326]">
              Key Specifications
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F7F3EC]">
                <Sparkles className="w-5 h-5 text-[#B08A4E]" />
                <div>
                  <div className="text-[11px] text-[#716B5E]">Configuration</div>
                  <div className="text-sm font-bold text-[#1F2326]">{project.configurations}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F7F3EC]">
                <Layers className="w-5 h-5 text-[#B08A4E]" />
                <div>
                  <div className="text-[11px] text-[#716B5E]">Carpet &amp; Super Area</div>
                  <div className="text-sm font-bold text-[#1F2326]">{project.superBuiltUpRange}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F7F3EC]">
                <Calendar className="w-5 h-5 text-[#B08A4E]" />
                <div>
                  <div className="text-[11px] text-[#716B5E]">Possession Schedule</div>
                  <div className="text-sm font-bold text-[#1F2326]">{project.possessionDate}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F7F3EC]">
                <Building className="w-5 h-5 text-[#B08A4E]" />
                <div>
                  <div className="text-[11px] text-[#716B5E]">Location Landmark</div>
                  <div className="text-sm font-bold text-[#1F2326]">{project.location.landmark}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleBrochureDownload}
                className="w-full py-3.5 rounded-xl bg-[#1F3D2F] hover:bg-[#162B21] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Pricing Brochure</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-3.5 rounded-xl bg-[#FAF6EE] hover:bg-[#EFE8DC] text-[#1F2326] border border-[#D8CEBD] text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#1F3D2F]" />
                <span>Enquire via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Floor Plans Section */}
      <div id="floor-plans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-28">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5DFD5] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E] block mb-1">
                FLOOR PLANS &amp; ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2326]">
                Architectural Floor Layouts
              </h2>
            </div>

            {/* Plan switcher */}
            <div className="flex items-center gap-2">
              {project.floorPlans.map((fp, idx) => (
                <button
                  key={fp.id}
                  type="button"
                  onClick={() => setActiveFloorPlanIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeFloorPlanIndex === idx
                      ? "bg-[#1F3D2F] text-white"
                      : "bg-[#F7F3EC] text-[#1F2326] border border-[#E5DFD5]"
                  }`}
                >
                  {fp.type}
                </button>
              ))}
            </div>
          </div>

          {/* Active Floor Plan Display */}
          {project.floorPlans[activeFloorPlanIndex] && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div
                onClick={() => setIsFloorPlanZoomOpen(true)}
                className="lg:col-span-8 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#D8CEBD] cursor-zoom-in group p-4"
              >
                <Image
                  src={project.floorPlans[activeFloorPlanIndex].image}
                  alt={project.floorPlans[activeFloorPlanIndex].name}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-[#1F2326]/80 text-white px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 shadow">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Zoom</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4">
                <h3 className="text-xl font-serif font-bold text-[#1F2326]">
                  {project.floorPlans[activeFloorPlanIndex].name}
                </h3>
                <p className="text-xs text-[#716B5E] leading-relaxed">
                  {project.floorPlans[activeFloorPlanIndex].description}
                </p>

                <div className="space-y-2 py-2 border-y border-[#E5DFD5] text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-[#716B5E]">Carpet Area:</span>
                    <span className="font-bold text-[#1F2326]">{project.floorPlans[activeFloorPlanIndex].carpetArea}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#716B5E]">Super Built-up Area:</span>
                    <span className="font-bold text-[#1F2326]">{project.floorPlans[activeFloorPlanIndex].superBuiltUpArea}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#716B5E]">Bedrooms:</span>
                    <span className="font-bold text-[#1F2326]">{project.floorPlans[activeFloorPlanIndex].bedrooms}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#716B5E]">Bathrooms:</span>
                    <span className="font-bold text-[#1F2326]">{project.floorPlans[activeFloorPlanIndex].bathrooms}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBookVisit}
                  className="btn-bronze w-full py-3.5 rounded-xl text-xs font-semibold shadow transition-all active:scale-98 cursor-pointer"
                >
                  Schedule Layout Walkthrough
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Construction Timeline & Progress */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#E5DFD5]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E] block mb-1">
            TIMELINE &amp; INTEGRITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2326] mb-8">
            Construction Milestones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {project.constructionMilestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#E5DFD5] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[#B08A4E]">
                      {m.date}
                    </span>
                    {m.completed ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#716B5E] font-medium">
                        {m.percentage}%
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#1F2326] mb-2">{m.stage}</h4>
                  <p className="text-xs text-[#716B5E] leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Floor Plan Zoom Modal */}
      {isFloorPlanZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex flex-col animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-[#1F2326] border-b border-white/10 text-white">
            <h3 className="font-serif font-bold text-base">
              {project.title} • {project.floorPlans[activeFloorPlanIndex]?.name}
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.25))}
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsFloorPlanZoomOpen(false)}
                className="btn-bronze w-8 h-8 rounded-lg flex items-center justify-center ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <div style={{ transform: `scale(${zoomLevel})` }} className="max-w-5xl w-full aspect-[4/3] relative">
              <Image
                src={project.floorPlans[activeFloorPlanIndex]?.image || "/images/floor-plan-schematic.svg"}
                alt="Floor plan"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
