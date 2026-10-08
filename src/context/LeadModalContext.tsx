"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type LeadIntent =
  | "site_visit"
  | "walkthrough"
  | "banking"
  | "brochure"
  | "pricing"
  | "callback"
  | "general";

export interface LeadModalOptions {
  intent?: LeadIntent;
  projectName?: string;
  project?: string;
  context?: {
    loanAmountLakhs?: number;
    interestRate?: number;
    tenureYears?: number;
    [key: string]: unknown;
  };
  preferredDate?: string;
  source?: string;
}

interface LeadModalContextType {
  isOpen: boolean;
  options: LeadModalOptions;
  openLeadModal: (options?: LeadModalOptions) => void;
  openLeadSheet: (options?: LeadModalOptions) => void;
  closeLeadModal: () => void;
  // Walkthrough video modal
  isVideoModalOpen: boolean;
  videoUrl: string;
  openVideoModal: (url?: string) => void;
  closeVideoModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<LeadModalOptions>({});

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/dQw4w9WgXcQ");

  const openLeadModal = (opts?: LeadModalOptions) => {
    const finalOpts: LeadModalOptions = {
      intent: opts?.intent || "site_visit",
      projectName: opts?.projectName || opts?.project || "Greenview Heights",
      ...opts,
    };
    setOptions(finalOpts);
    setIsOpen(true);
  };

  const openLeadSheet = (opts?: LeadModalOptions) => {
    openLeadModal(opts);
  };

  const closeLeadModal = () => {
    setIsOpen(false);
  };

  const openVideoModal = (url?: string) => {
    if (url) setVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <LeadModalContext.Provider
      value={{
        isOpen,
        options,
        openLeadModal,
        openLeadSheet,
        closeLeadModal,
        isVideoModalOpen,
        videoUrl,
        openVideoModal,
        closeVideoModal,
      }}
    >
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error("useLeadModal must be used within a LeadModalProvider");
  }
  return context;
}
