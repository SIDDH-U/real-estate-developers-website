import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Glorious Real Estates",
  description: "Privacy policy and data protection practices at Glorious Real Estates.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2326]">
          Privacy Policy
        </h1>
        <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-300">
          Draft for Review
        </span>
      </div>
      <p className="text-xs text-[#716B5E] mb-6 italic">
        Note: This is a placeholder policy document prepared for staging/preview and is subject to final legal counsel review.
      </p>
      <div className="prose prose-stone text-sm text-[#716B5E] space-y-4 leading-relaxed">
        <p>
          At {siteConfig.name}, we hold the privacy of our homebuyers and visitors in the highest regard. This policy outlines how we handle the contact details you provide when requesting project brochures or booking site visits.
        </p>
        <h2 className="text-xl font-serif font-bold text-[#1F2326] pt-4">Data Collection &amp; Purpose</h2>
        <p>
          When you fill out a lead form on our website, we collect your name, phone number, and project preference solely to facilitate scheduling your site visit, answering questions, and sending requested project brochures via WhatsApp or email.
        </p>
        <h2 className="text-xl font-serif font-bold text-[#1F2326] pt-4">Zero Third-Party Sharing</h2>
        <p>
          We do not sell, rent, or distribute your personal data to external third-party advertisers. All communications originate directly from our certified in-house sales team in Nanded.
        </p>
        <h2 className="text-xl font-serif font-bold text-[#1F2326] pt-4">Opt-Out &amp; Contact</h2>
        <p>
          You may opt out of promotional messages or WhatsApp updates at any time by replying &quot;STOP&quot; or emailing us at {siteConfig.contact.email}.
        </p>
        <div className="pt-6">
          <Link href="/" className="text-[#B08A4E] font-semibold hover:underline">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
