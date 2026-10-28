"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ShieldCheck, Home } from "lucide-react";
import { projectsData } from "@/data/projects";
import { useLeadModal } from "@/context/LeadModalContext";
import { trackAnalyticsEvent } from "@/lib/analytics";
import AmbientBackground from "@/components/common/AmbientBackground";
import HairlineDivider from "@/components/common/HairlineDivider";
import { useDemo } from "@/context/DemoContext";

export default function ProjectsSection() {
  const { city, appendQuery } = useDemo();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { openLeadModal } = useLeadModal();

  const filterOptions = ["All", "Residential", "Villas", "Commercial", "Plots"];
  const easeLuxury = [0.22, 1, 0.36, 1] as const;

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    trackAnalyticsEvent("filter_change", { category: filter });
  };

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="relative py-12 sm:py-20 bg-[#FBF8F2] overflow-hidden">
      <AmbientBackground variant="sand-alt" showBlueprint={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, ease: easeLuxury }}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B08A4E] mb-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>OUR PROJECTS</span>
            </motion.div>

            {/* Masked Headline Reveal */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease: easeLuxury, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1F2326]"
              >
                Featured Projects
              </motion.h2>
            </div>

            <p className="text-xs sm:text-base text-[#716B5E] mt-1.5 max-w-xl">
              Thoughtfully planned landmark addresses situated in <span suppressHydrationWarning>{city}</span>&apos;s prime growth corridors.
            </p>
          </div>

          <Link
            href={appendQuery("/projects")}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B08A4E] hover:text-[#96743D] transition-colors group w-fit"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter Chips with Sliding Active Pill */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 sm:mb-10">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterClick(filter)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-[#1F2326] hover:text-[#B08A4E] bg-white border border-[#E5DFD5]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-[#1F3D2F] rounded-full shadow-xs -z-0"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid / Mobile Peek Carousel */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 scroll-smooth snap-x snap-mandatory sm:snap-none">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, idx) => {
                const statusPillClass =
                  project.status === "Ready to Move"
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : project.status === "Under Construction"
                    ? "bg-amber-100 text-amber-900 border-amber-300"
                    : "bg-blue-100 text-blue-900 border-blue-300";

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.6,
                      ease: easeLuxury,
                      delay: (idx % 4) * 0.08,
                    }}
                    className="min-w-[80vw] sm:min-w-0 snap-center flex-shrink-0 sm:flex-shrink group"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden border border-[#E5DFD5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full lg:hover:-translate-y-1 lg:hover:rotate-[0.5deg]">
                      {/* Reduced Mobile Height: h-44 on mobile, h-56 on desktop */}
                      <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-[#EAE3D5]">
                        <Image
                          src={project.heroImage}
                          alt={`${project.title} - ${project.configurations}`}
                          fill
                          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                        {/* Status Tag */}
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border shadow-xs ${statusPillClass}`}
                          >
                            {project.status}
                          </span>
                        </div>

                        {/* RERA Badge (Rendered ONLY if RERA is present) */}
                        {project.reraNumber && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-medium flex items-center gap-1 border border-white/20">
                              <ShieldCheck className="w-3 h-3 text-[#C9A66B]" />
                              <span>RERA</span>
                            </span>
                          </div>
                        )}

                        {/* Location Pin */}
                        <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1 text-white/90 text-[11px] sm:text-xs font-medium drop-shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-[#C9A66B]" />
                          <span>{project.location.area}, {project.location.city}</span>
                        </div>
                      </div>

                      {/* Card Content (Shortened, second link removed) */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1F2326] group-hover:text-[#B08A4E] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs text-[#716B5E] mt-0.5 line-clamp-1">
                            {project.configurations}
                          </p>
                        </div>

                        {/* Pricing & Arrow CTA */}
                        <div className="pt-3 mt-3 border-t border-[#E5DFD5] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#8C816E] font-semibold block">
                              Starting from
                            </span>
                            <span className="text-base sm:text-lg font-bold text-[#1F2326]">
                              {project.pricing.startingPrice}
                            </span>
                          </div>

                          <Link
                            href={appendQuery(`/projects/${project.slug}#floor-plans`)}
                            aria-label={`Explore ${project.title} Floor Plans & Specs`}
                            className="w-10 h-10 rounded-full bg-[#FAF6EE] group-hover:bg-[#B08A4E] text-[#1F2326] group-hover:text-white flex items-center justify-center border border-[#E5DFD5] transition-all duration-300 active:scale-95 cursor-pointer"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-10 text-center text-sm text-[#716B5E]">
                No projects found in this category right now.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Terms Note */}
        <div className="mt-3 text-[10px] text-[#716B5E] text-center">
          *Starting prices exclude statutory stamp duty, GST, and registration fees.
        </div>
      </div>
    </section>
  );
}
