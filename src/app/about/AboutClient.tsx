"use client";

import React from "react";
import Image from "next/image";
import { Award, Building2, ShieldCheck, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useDemo } from "@/context/DemoContext";
import AppLink from "@/components/common/AppLink";

export default function AboutClient() {
  const demo = useDemo();

  const values = [
    {
      title: "100% Legal & Title Clarity",
      desc: `Every ${demo.name} project has crystal-clear freehold land titles, municipal approvals, and registered MahaRERA certification prior to launching sales.`,
      icon: ShieldCheck,
    },
    {
      title: "Uncompromising Construction Grade",
      desc: "From deep soil compaction and RCC raft foundations to M40 ready-mix concrete and German aluminium formwork, our buildings are built for generations.",
      icon: Building2,
    },
    {
      title: "Committed Possession Schedules",
      desc: "We respect the milestones of our homebuyers. Over 25+ delivered projects, we pride ourselves on on-time key handovers and smooth documentation.",
      icon: Award,
    },
    {
      title: "Customer-First Relationship",
      desc: "From your first sample flat tour through to stamp duty registration and society handover, our dedicated relationship managers support you at each step.",
      icon: Users,
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F7F3EC]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E] block mb-2">
            OUR LEGACY IN <span data-demo-city suppressHydrationWarning>{demo.city.toUpperCase()}</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1F2326] leading-tight">
            Crafting Homes, Shaping Skyline.
          </h1>
          <p className="text-base sm:text-lg text-[#716B5E] mt-4 leading-relaxed">
            Founded with a singular vision to redefine urban living in Marathwada, <span data-demo-name suppressHydrationWarning>{demo.name}</span> has developed over 5 million square feet of residential sanctuaries and landmark commercial centers in <span data-demo-city suppressHydrationWarning>{demo.city}</span>.
          </p>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DFD5] shadow-sm">
          <div className="text-center p-3">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2326]">
              {siteConfig.stats.yearsExperience}
            </div>
            <div className="text-xs sm:text-sm text-[#716B5E] mt-1 font-medium">Years of Experience</div>
          </div>
          <div className="text-center p-3">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2326]">
              {siteConfig.stats.projectsDelivered}
            </div>
            <div className="text-xs sm:text-sm text-[#716B5E] mt-1 font-medium">Projects Delivered</div>
          </div>
          <div className="text-center p-3">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2326]">
              {siteConfig.stats.sqFtBuilt}
            </div>
            <div className="text-xs sm:text-sm text-[#716B5E] mt-1 font-medium">sq ft Built</div>
          </div>
          <div className="text-center p-3">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2326]">
              {siteConfig.stats.happyFamilies}
            </div>
            <div className="text-xs sm:text-sm text-[#716B5E] mt-1 font-medium">Happy Families</div>
          </div>
        </div>
      </section>

      {/* Story & Image Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative h-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-[#E5DFD5]">
            <Image
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop"
              alt={`${demo.name} Architectural Vision`}
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E]">
              PHILOSOPHY &amp; ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2326]">
              Built with Passion, Rooted in Trust
            </h2>
            <p className="text-sm sm:text-base text-[#716B5E] leading-relaxed">
              We believe a home is more than brick and mortar; it is the sanctuary where your family’s dreams unfold. Every layout is calibrated for natural sunlight, optimal cross-ventilation, and Vastu harmony.
            </p>
            <ul className="space-y-3 pt-2 text-sm text-[#1F2326]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Transparent pricing with zero hidden maintenance surprises</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Prime locations with high capital appreciation potential in <span data-demo-city suppressHydrationWarning>{demo.city}</span></span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Home loan approvals across SBI, HDFC, ICICI, and Bank of Baroda</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values & Quality Standard */}
      <section id="quality" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E] block mb-1">
            OUR QUALITY STANDARDS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2326]">
            The Pillars of <span data-demo-name suppressHydrationWarning>{demo.name}</span> Quality
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-white p-7 rounded-3xl border border-[#E5DFD5] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] text-[#B08A4E] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1F2326] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-[#716B5E] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F2326] text-white p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Visit our sample residences in <span data-demo-city suppressHydrationWarning>{demo.city}</span>
            </h3>
            <p className="text-sm text-[#D8CEBD] mt-1">
              Experience the material quality and space firsthand at Pawdewadi, <span data-demo-city suppressHydrationWarning>{demo.city}</span>.
            </p>
          </div>
          <AppLink
            href="/contact"
            className="px-7 py-3.5 rounded-full bg-[var(--color-bronze,#B08A4E)] hover:bg-[var(--color-bronze-dark,#96743D)] text-[var(--color-bronze-contrast,#ffffff)] text-sm font-semibold flex items-center gap-2 whitespace-nowrap active:scale-97 transition-all cursor-pointer shadow"
          >
            <span>Plan Your Visit</span>
            <ArrowRight className="w-4 h-4" />
          </AppLink>
        </div>
      </section>
    </div>
  );
}
