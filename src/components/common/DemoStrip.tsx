"use client";

import React from "react";
import { MessageCircle, X } from "lucide-react";
import { useDemo } from "@/context/DemoContext";

export default function DemoStrip() {
  const { name, isDismissed, dismissBanner } = useDemo();

  if (isDismissed) {
    return null;
  }

  const encodedMsg = encodeURIComponent(`Hi, I saw the demo website made for ${name}`);
  // Strictly uses fixed 918080076322 and NOT the phone param per rule
  const whatsappUrl = `https://wa.me/918080076322?text=${encodedMsg}`;

  return (
    <div
      role="banner"
      aria-label="Demo notice"
      className="fixed top-0 left-0 right-0 z-[60] h-[var(--demo-h,38px)] bg-[#151917] text-[#F7F3EC] border-b border-white/10 flex items-center justify-between px-3 sm:px-4 text-[11px] sm:text-xs select-none overflow-hidden transition-all duration-300"
    >
      <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center truncate pr-1">
        <span className="truncate text-[#E5DFD5]">
          Demo made for{" "}
          <span className="font-semibold text-white" suppressHydrationWarning>
            {name}
          </span>
          . Want this on your own domain?
        </span>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-[#0F1412] font-semibold text-[10px] sm:text-[11px] transition-colors shrink-0 shadow-xs active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-3 h-3 fill-current shrink-0" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      <button
        type="button"
        onClick={dismissBanner}
        aria-label="Dismiss demo banner"
        className="w-6 h-6 flex items-center justify-center rounded-full text-[#A89E8D] hover:text-white hover:bg-white/10 transition-colors shrink-0 ml-1 cursor-pointer active:scale-90"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
