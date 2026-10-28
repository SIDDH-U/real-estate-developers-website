"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Building,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";
import { projectsData } from "@/data/projects";
import { useLeadModal } from "@/context/LeadModalContext";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { useDemo } from "@/context/DemoContext";
import AppLink from "@/components/common/AppLink";

export default function ProjectsListingClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { openLeadModal } = useLeadModal();
  const demo = useDemo();

  const filterOptions = ["All", "Residential", "Villas", "Commercial", "Plots"];
  const easeLuxury = [0.22, 1, 0.36, 1] as const;

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    trackAnalyticsEvent("filter_change", { category: filter, source: "projects_page" });
  };

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    return project.category === activeFilter;
  });

  return (
    <div className="pt-24 pb-20 bg-[#F7F3EC]">
      {/* 1. Header & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#716B5E] mb-6">
          <AppLink href="/" className="hover:text-[#1F2326]">
            Home
          </AppLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1F2326] font-semibold">All Projects</span>
        </nav>

        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E] block mb-2">
            OUR DEVELOPMENTS IN <span data-demo-city suppressHydrationWarning>{demo.city.toUpperCase()}</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1F2326]">
            Explore All Landmark Projects
          </h1>
          <p className="text-base text-[#716B5E] mt-3 leading-relaxed">
            From modern high-rise apartments in Pawdewadi to serene private luxury villas, discover RERA-registered homes constructed with certified M40 concrete and German formwork technology.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterClick(filter)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-[#1F2326] hover:text-[#B08A4E] bg-white border border-[#E5DFD5]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectsListingFilterPill"
                    className="absolute inset-0 bg-[#1F3D2F] rounded-full shadow-xs -z-0"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: easeLuxury, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E5DFD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative h-56 sm:h-64 w-full bg-[#1F2326] overflow-hidden">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Status Badge */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#1F2326] shadow-xs">
                          {project.status}
                        </span>
                      </div>

                      {/* RERA Badge */}
                      {project.reraNumber && (
                        <div className="absolute top-3.5 right-3.5 z-10">
                          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-medium flex items-center gap-1 border border-white/20">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A66B]" />
                            <span>RERA</span>
                          </span>
                        </div>
                      )}

                      {/* Location Pin */}
                      <div className="absolute bottom-3 left-3.5 z-10 flex items-center gap-1 text-white text-xs font-medium drop-shadow-sm">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A66B]" />
                        <span>{project.location.area}, <span data-demo-city suppressHydrationWarning>{demo.city}</span></span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-serif font-bold text-[#1F2326] group-hover:text-[#B08A4E] transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-xs font-semibold text-[#8C816E] px-2 py-0.5 rounded-lg bg-[#FAF6EE] border border-[#E5DFD5]">
                          {project.category}
                        </span>
                      </div>

                      <p className="text-xs text-[#716B5E] mb-4 line-clamp-2 leading-relaxed">
                        {project.overview}
                      </p>

                      <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#E5DFD5] text-xs text-[#1F2326] mb-4">
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-[#B08A4E]" />
                          <span className="truncate">{project.configurations}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#B08A4E]" />
                          <span className="truncate">{project.superBuiltUpRange}</span>
                        </div>
                      </div>

                      {/* Pricing Row */}
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-[11px] uppercase tracking-wider text-[#8C816E] font-semibold">
                          Starting Price
                        </span>
                        <span className="text-lg font-bold text-[#1F2326]">
                          {project.pricing.startingPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="p-6 pt-0 flex items-center gap-2">
                    <AppLink
                      href={`/projects/${project.slug}#floor-plans`}
                      className="flex-1 py-3 px-3 rounded-xl bg-[#FAF6EE] hover:bg-[#F2ECE1] text-[#1F2326] text-xs font-semibold text-center border border-[#E5DFD5] transition-all flex items-center justify-center gap-1"
                    >
                      <span>Explore Floor Plans &amp; Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </AppLink>

                    <button
                      type="button"
                      onClick={() =>
                        openLeadModal({
                          intent: "site_visit",
                          projectName: project.title,
                          source: "projects_listing",
                        })
                      }
                      className="btn-bronze py-3 px-4 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer shadow-xs"
                    >
                      Book Visit
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-sm text-[#716B5E]">
                No projects found in this category.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
