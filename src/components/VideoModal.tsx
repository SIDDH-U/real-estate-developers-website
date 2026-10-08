"use client";

import React, { useEffect } from "react";
import { X, Play } from "lucide-react";
import { useLeadModal } from "@/context/LeadModalContext";

export default function VideoModal() {
  const { isVideoModalOpen, videoUrl, closeVideoModal } = useLeadModal();

  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVideoModalOpen]);

  if (!isVideoModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Project Walkthrough Video"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2326]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeVideoModal();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#1F2326] rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200">
        {/* Top header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#141719]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#B08A4E]/20 flex items-center justify-center text-[#B08A4E]">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-sm font-semibold text-[#F7F3EC]">
              Project Cinematic Walkthrough • Greenview Heights
            </span>
          </div>

          <button
            onClick={closeVideoModal}
            aria-label="Close video player"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Frame (Never autoplays video as requested) */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`${videoUrl}?autoplay=0&rel=0`}
            title="Glorious Real Estates Architectural Walkthrough"
            className="w-full h-full border-0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
