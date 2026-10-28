"use client";

import React from "react";
import { Star, Quote, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { testimonialsData } from "@/data/projects";
import { useLeadModal } from "@/context/LeadModalContext";
import { useDemo } from "@/context/DemoContext";

export default function ReviewsPage() {
  const { openLeadModal } = useLeadModal();
  const demo = useDemo();

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E] block mb-2">
          CLIENT EXPERIENCES
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1F2326] leading-tight">
          What Homeowners Say About <span data-demo-name suppressHydrationWarning>{demo.name}</span>
        </h1>
        <p className="text-sm sm:text-base text-[#716B5E] mt-3 leading-relaxed">
          Over 500 happy families have found their dream homes with our legal clarity, on-time delivery, and transparent transactions in <span data-demo-city suppressHydrationWarning>{demo.city}</span>.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {testimonialsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DFD5] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#B08A4E]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B08A4E]" />
                  ))}
                </div>
                <span className="text-[11px] text-[#716B5E]">{item.date}</span>
              </div>

              <p className="text-sm text-[#1F2326] leading-relaxed italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-[#F0EBE1]">
              <div className="w-10 h-10 rounded-full bg-[#1F3D2F] text-[#F7F3EC] font-serif font-bold text-xs flex items-center justify-center flex-shrink-0">
                {item.initials}
              </div>
              <div>
                <div className="text-sm font-bold text-[#1F2326]">
                  {item.name}
                </div>
                <div className="text-xs text-[#716B5E]">
                  {item.projectName} • {item.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="mt-16 bg-[#F7F3EC] border border-[#E5DFD5] rounded-3xl p-8 sm:p-10 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-serif font-bold text-[#1F2326] mb-2">
          Experience the <span data-demo-name suppressHydrationWarning>{demo.name}</span> Standard
        </h2>
        <p className="text-xs sm:text-sm text-[#716B5E] mb-6">
          Schedule a private consultation and discover our upcoming residential communities.
        </p>
        <button
          type="button"
          onClick={() =>
            openLeadModal({
              intent: "site_visit",
              projectName: "Greenview Heights",
              source: "reviews_page_cta",
            })
          }
          className="btn-bronze px-6 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 active:scale-97 cursor-pointer"
        >
          <span>Book a Site Visit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
