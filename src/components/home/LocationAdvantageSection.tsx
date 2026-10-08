"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane, Train, GraduationCap, Cross, ShoppingBag, Trees, ExternalLink, MapPin } from "lucide-react";
import AmbientBackground from "@/components/common/AmbientBackground";
import SectionHeader from "@/components/common/SectionHeader";
import { siteConfig } from "@/config/site";

export default function LocationAdvantageSection() {
  const locations = [
    {
      title: "Nanded Airport (NDC)",
      category: "Air Connectivity",
      time: "12 Mins",
      distance: "6.2 km",
      icon: Plane,
    },
    {
      title: "Hazur Sahib Railway Station",
      category: "Rail Transit",
      time: "8 Mins",
      distance: "3.8 km",
      icon: Train,
    },
    {
      title: "Podar International School",
      category: "Education",
      time: "5 Mins",
      distance: "2.1 km",
      icon: GraduationCap,
    },
    {
      title: "Govt. Medical College & Hospital",
      category: "Healthcare",
      time: "10 Mins",
      distance: "4.5 km",
      icon: Cross,
    },
    {
      title: "VIP Road & Bhagyanagar Hub",
      category: "Shopping & Dining",
      time: "4 Mins",
      distance: "1.5 km",
      icon: ShoppingBag,
    },
    {
      title: "Godavari Riverfront Promenade",
      category: "Leisure & Nature",
      time: "6 Mins",
      distance: "2.9 km",
      icon: Trees,
    },
  ];

  return (
    <section
      id="location-advantage"
      className="relative py-10 sm:py-16 lg:py-20 bg-[#FBF8F2] overflow-hidden"
    >
      <AmbientBackground variant="sand-alt" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="CONNECTED LIVING"
          title="Strategic Nanded Locations"
          subtitle="Prime arterial connectivity across educational institutes, super-specialty hospitals, transit hubs, and commercial centers."
          action={
            <a
              href={siteConfig.address.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E5DFD5] text-xs font-semibold text-[#1F2326] hover:text-[#B08A4E] hover:border-[#B08A4E] transition-all shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B08A4E]" />
              <span>View on Google Maps</span>
              <ExternalLink className="w-3 h-3 text-[#716B5E]" />
            </a>
          }
        />

        {/* 6 Distance Chips Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {locations.map((loc, idx) => {
            const Icon = loc.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E5DFD5] shadow-xs hover:border-[#B08A4E] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] text-[#B08A4E] flex items-center justify-center mb-2.5 group-hover:bg-[#1F3D2F] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#716B5E] tracking-wider mb-0.5">
                    {loc.category}
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#1F2326] line-clamp-2 leading-snug">
                    {loc.title}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-[#F0EBE1] flex items-baseline justify-between">
                  <span className="text-sm font-serif font-bold text-[#B08A4E]">
                    {loc.time}
                  </span>
                  <span className="text-[10px] text-[#716B5E]">
                    {loc.distance}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
