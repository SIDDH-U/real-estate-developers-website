"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Waves, Trees, Dumbbell, Baby, ArrowRight, ShieldCheck } from "lucide-react";
import { useLeadModal } from "@/context/LeadModalContext";
import { useDemo } from "@/context/DemoContext";

export default function AmenitiesPage() {
  const { openLeadModal } = useLeadModal();
  const demo = useDemo();

  const allAmenities = [
    {
      id: "clubhouse",
      title: "Luxury Clubhouse",
      subtitle: "Multi-level community center with banquet hall, billiards, card rooms & private lounge for residents.",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "pool",
      title: "Infinity Swimming Pool",
      subtitle: "Temperature-regulated infinity pool with poolside cabanas, loungers & dedicated toddlers' splash deck.",
      icon: Waves,
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "garden",
      title: "Botanical Landscape Garden",
      subtitle: "Acre-wide lush green landscaped park with gazebos, reflexology barefoot walking trails & senior citizen benches.",
      icon: Trees,
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "gym",
      title: "High-Tech Fitness Center",
      subtitle: "Equipped with world-class strength & cardio machinery, yoga studio and certified resident fitness trainers.",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "kids",
      title: "Children's Play Arena",
      subtitle: "Safe EPDM cushioned play zone with jungle gym, sand pit, and sensory recreational equipment.",
      icon: Baby,
      image: "https://images.unsplash.com/photo-1596464716127-f2a829822301?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E] block mb-2">
          CURATED LIFESTYLE
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1F2326] leading-tight">
          Amenities Designed for a Better Everyday
        </h1>
        <p className="text-sm sm:text-base text-[#716B5E] mt-3 leading-relaxed">
          Experience recreation, wellness, and serene open spaces thoughtfully integrated into every <span data-demo-name suppressHydrationWarning>{demo.name}</span> residential master plan in <span data-demo-city suppressHydrationWarning>{demo.city}</span>.
        </p>
      </div>

      {/* Grid of Amenities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {allAmenities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E5DFD5] shadow-xs hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-serif font-bold">{item.title}</h3>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-[#716B5E] leading-relaxed mb-4">
                  {item.subtitle}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    openLeadModal({
                      intent: "site_visit",
                      projectName: "Greenview Heights",
                      source: `amenities_page_${item.id}`,
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B08A4E] hover:text-[#96743D] transition-colors"
                >
                  <span>Experience in Person</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Card */}
      <div className="mt-16 bg-[#1F3D2F] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">
            Want to tour the completed clubhouse?
          </h2>
          <p className="text-xs sm:text-sm text-[#D8CEBD] max-w-xl">
            Book an architect-guided site visit to inspect our finished amenities, model flats, and landscape gardens.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            openLeadModal({
              intent: "site_visit",
              projectName: "Greenview Heights",
              source: "amenities_page_bottom_cta",
            })
          }
          className="btn-bronze px-6 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap active:scale-97 cursor-pointer"
        >
          <span>Schedule Site Tour</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
