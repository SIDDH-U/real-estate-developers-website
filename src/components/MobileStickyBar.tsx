"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Calendar, MessageCircle } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { useLeadModal } from "@/context/LeadModalContext";
import { trackAnalyticsEvent } from "@/lib/analytics";
import PhoneRingingIcon from "@/components/common/PhoneRingingIcon";

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { openLeadModal } = useLeadModal();
  const demo = useDemo();
  const pathname = usePathname();

  // Determine current project context if on project detail route
  let activeProject = "Greenview Heights";
  if (pathname.includes("glorious-square") || pathname.includes("landmark-square")) {
    activeProject = "Landmark Square";
  } else if (pathname.includes("aurum-villas")) {
    activeProject = "Aurum Luxury Villas";
  } else if (pathname.includes("greenview-heights")) {
    activeProject = "Greenview Heights";
  }

  useEffect(() => {
    // Slides up smoothly ~1s after load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCallClick = () => {
    trackAnalyticsEvent("call_click", { source: "mobile_sticky_bar" });
  };

  const handleWhatsAppClick = () => {
    trackAnalyticsEvent("whatsapp_click", { source: "mobile_sticky_bar", project: activeProject });
    const message = `Hi, I'm interested in ${activeProject} and would like to know more about available units and pricing.`;
    window.open(`https://wa.me/${demo.phoneLink}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleBookClick = () => {
    openLeadModal({
      intent: "site_visit",
      projectName: activeProject,
      source: "mobile_sticky_bar",
    });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 lg:hidden px-3.5 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#F7F3EC]/95 backdrop-blur-md border-t border-[#E5DFD5] shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-md mx-auto flex items-center gap-2">
        {/* 1. Small Call Icon Button with Ringing Animation */}
        <a
          href={`tel:${demo.phoneTel}`}
          onClick={handleCallClick}
          aria-label="Call Sales Office"
          className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white border border-[#E5DFD5] text-[#1F2326] active:scale-95 shadow-xs transition-transform"
        >
          <PhoneRingingIcon size={20} className="text-[#1F2326]" />
        </a>

        {/* 2. WhatsApp Button */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          aria-label="Chat on WhatsApp"
          className="pulse-whatsapp flex-1 h-12 px-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#1F3D2F] text-white text-sm font-semibold active:scale-97 shadow-xs transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current text-emerald-400" />
          <span>WhatsApp</span>
        </button>

        {/* 3. Solid Bronze 'Book Site Visit' Button */}
        <button
          type="button"
          onClick={handleBookClick}
          aria-label="Book a Site Visit"
          className="sheen-periodic relative flex-[1.3] h-12 px-3 flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-bronze,#B08A4E)] text-[var(--color-bronze-contrast,#ffffff)] text-sm font-semibold active:scale-97 shadow-md overflow-hidden transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span className="truncate">Book Site Visit</span>
        </button>
      </div>
    </div>
  );
}

