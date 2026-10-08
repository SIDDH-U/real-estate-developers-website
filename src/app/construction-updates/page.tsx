"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Calendar, HardHat, ArrowRight, ShieldCheck } from "lucide-react";
import { useLeadModal } from "@/context/LeadModalContext";

export default function ConstructionUpdatesPage() {
  const { openLeadModal } = useLeadModal();

  const milestones = [
    {
      date: "October 2026",
      stage: "Superstructure 8th Slab Casting",
      status: "Active Progress",
      completion: "78%",
      project: "Greenview Heights",
      desc: "Tower A 8th-floor slab cast with certified M40 ready-mix concrete and German aluminium formwork. Brickwork active on 4th & 5th floors.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop",
    },
    {
      date: "August 2026",
      stage: "Plumbing & Concealed Services",
      status: "Completed",
      completion: "65%",
      project: "Greenview Heights",
      desc: "Concealed fire-retardant electrical conduits and CPVC plumbing lines tested under 10 bar hydraulic pressure across Lower Podiums.",
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      date: "April 2026",
      stage: "Double Basement Raft Foundation",
      status: "Completed",
      completion: "40%",
      project: "Greenview Heights",
      desc: "Massive earthquake-resistant RCC raft foundation poured continuously with temperature monitoring and chemical waterproofing membrane.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      date: "January 2026",
      stage: "Soil Testing & Geotechnical Borewells",
      status: "Completed",
      completion: "15%",
      project: "Greenview Heights",
      desc: "Comprehensive multi-point soil bearing capacity testing certified by accredited structural civil engineers.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E] block mb-2">
          TRANSPARENCY &amp; MILESTONES
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1F2326] leading-tight">
          Construction Progress &amp; Photographic Timeline
        </h1>
        <p className="text-sm sm:text-base text-[#716B5E] mt-3 leading-relaxed">
          Monthly verified progress logs for Greenview Heights and ongoing developments in Nanded, certified by chartered civil engineers.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-[#B08A4E]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {milestones.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Dot on line */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#B08A4E] border-4 border-[#FAF8F5] shadow-xs" />

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xs hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Media */}
              <div className="md:col-span-5 relative h-56 w-full rounded-2xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.stage}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A66B]" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#B08A4E] uppercase tracking-wider">
                      {item.project}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item.status} ({item.completion})
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F2326] mb-2">
                    {item.stage}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#716B5E] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#716B5E]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>QC Lab Certified</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal({
                        intent: "site_visit",
                        projectName: item.project,
                        source: `timeline_${item.date}`,
                      })
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#B08A4E] hover:text-[#96743D] cursor-pointer"
                  >
                    <span>Inspect Site</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action */}
      <div className="mt-16 text-center">
        <button
          type="button"
          onClick={() =>
            openLeadModal({
              intent: "brochure",
              projectName: "Greenview Heights",
              source: "construction_updates_full_report",
            })
          }
          className="btn-bronze inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold shadow-md cursor-pointer"
        >
          <span>Download Complete Engineering Specification PDF</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
