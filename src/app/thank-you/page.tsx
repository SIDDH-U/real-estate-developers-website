"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MessageCircle, Home } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import AppLink from "@/components/common/AppLink";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const demo = useDemo();
  const ref = searchParams.get("ref") || "DEMO-CONFIRMED";

  return (
    <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 sm:px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-xs">
        <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E1] border border-[#E5DFD5] text-xs font-mono font-bold text-[#B08A4E] mb-3">
        Booking Reference: {ref}
      </div>

      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2326]">
        Thank You for Reaching Out
      </h1>

      <p className="text-sm sm:text-base text-[#716B5E] mt-3 mb-8 leading-relaxed">
        Your request has been registered with our senior residential desk in <span data-demo-city suppressHydrationWarning>{demo.city}</span>. A dedicated consultant will contact you within 30 minutes during sales desk hours.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
        <a
          href={`https://wa.me/${demo.phoneLink}?text=${encodeURIComponent(
            `Hello ${demo.name}, following up on reference ${ref}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1F3D2F] hover:bg-[#162B21] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Chat on WhatsApp</span>
        </a>

        <AppLink
          href="/"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#D8CEBD] text-[#1F2326] hover:bg-[#FAF6EE] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
        >
          <Home className="w-4 h-4 text-[#B08A4E]" />
          <span>Return Home</span>
        </AppLink>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-sm text-[#716B5E]">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
