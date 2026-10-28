import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import AppLink from "@/components/common/AppLink";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Terms and conditions for ${siteConfig.name} website, bookings and offers.`,
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2326]">
          Terms &amp; Conditions
        </h1>
        <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-300">
          Draft for Review
        </span>
      </div>
      <p className="text-xs text-[#716B5E] mb-6 italic">
        Note: This is a placeholder terms document prepared for staging/preview and is subject to final legal counsel review.
      </p>
      <div className="prose prose-stone text-sm text-[#716B5E] space-y-4 leading-relaxed">
        <p>
          Welcome to the official website of <span data-demo-name suppressHydrationWarning>{siteConfig.name}</span>. By accessing or using our website, you agree to comply with the terms and statutory disclaimers outlined herein.
        </p>
        <h2 className="text-xl font-serif font-bold text-[#1F2326] pt-4">1. Pricing &amp; Offers</h2>
        <p>
          All pricing listed on this website (e.g., &quot;Starting from ₹ 45 Lakhs*&quot;) refers to base unit costs. Applicable statutory taxes including GST, stamp duty, registration charges, and society maintenance deposits are extra as mandated by government authorities.
        </p>
        <h2 className="text-xl font-serif font-bold text-[#1F2326] pt-4">2. MahaRERA Disclaimers</h2>
        <p>
          Projects displayed on this portal are registered with Maharashtra Real Estate Regulatory Authority (MahaRERA). Detailed registration certificates, sanctioned floor plans, and promoter details can be cross-verified on the official MahaRERA website.
        </p>
        <h2 className="text-xl font-serif font-bold text-[#1F2326] pt-4">3. Floor Plans &amp; Specifications</h2>
        <p>
          Architectural floor plans, 3D renderings, and walkthrough simulations are artistic impressions for representational purposes and may vary slightly in the final executed building.
        </p>
        <div className="pt-6">
          <AppLink href="/" className="text-[#B08A4E] font-semibold hover:underline">
            ← Return to Homepage
          </AppLink>
        </div>
      </div>
    </div>
  );
}
