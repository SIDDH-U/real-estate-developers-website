"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  Download,
  IndianRupee,
  Building,
  User,
  Phone,
  Video,
  Briefcase,
  HelpCircle,
} from "lucide-react";
import { useLeadModal, LeadIntent } from "@/context/LeadModalContext";
import { useDemo } from "@/context/DemoContext";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { trackAnalyticsEvent } from "@/lib/analytics";

export default function LeadSheet() {
  const { isOpen, options, closeLeadModal, isVideoModalOpen, videoUrl, closeVideoModal } = useLeadModal();
  const demo = useDemo();

  const intent: LeadIntent = options.intent || "site_visit";
  const defaultProject = options.projectName || options.project || "Greenview Heights";

  // Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState(defaultProject);
  const [date, setDate] = useState(options.preferredDate || "");
  const [slot, setSlot] = useState("Morning (9:30 AM - 1:00 PM)");
  const [mode, setMode] = useState("WhatsApp Video");
  const [loanRange, setLoanRange] = useState("30L - 50L");
  const [employment, setEmployment] = useState("Salaried");
  const [bestTime, setBestTime] = useState("Morning (10 AM - 1 PM)");
  const [unitType, setUnitType] = useState("2 BHK");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false); // UNCHECKED BY DEFAULT per rule
  const [honeypot, setHoneypot] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    ref: string;
    nextStep: string;
    whatsappText: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Mobile swipe down state
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Sync project & prefill loan range from EMI context if provided
  useEffect(() => {
    if (options.projectName || options.project) {
      setProject(options.projectName || options.project || "Greenview Heights");
    }

    if (options.context?.loanAmountLakhs) {
      const amt = options.context.loanAmountLakhs;
      if (amt < 30) setLoanRange("Under 30L");
      else if (amt <= 50) setLoanRange("30L - 50L");
      else if (amt <= 100) setLoanRange("50L - 1Cr");
      else setLoanRange("1Cr+");
    }
  }, [options]);

  // Reset states on open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmittedResult(null);
      setErrorMessage("");
      setConsent(false);
      setDragOffset(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeLeadModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeLeadModal]);

  // Phone sanitization & validation
  const cleanPhone = phone.replace(/\D/g, "").slice(0, 10);
  const isPhoneValid = /^[6-9]\d{9}$/.test(cleanPhone);
  const isFormValid = name.trim().length >= 2 && isPhoneValid && consent;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(raw);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent,
          name: name.trim(),
          phone: cleanPhone,
          project,
          date,
          slot,
          mode,
          loanRange,
          employment,
          bestTime,
          unitType,
          email: email.trim(),
          message: message.trim(),
          page: typeof window !== "undefined" ? window.location.pathname : "/",
          sourceButton: options.source || "leadsheet_form",
          consent: true,
          honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedResult({
          ref: data.ref,
          nextStep: data.nextStep,
          whatsappText:
            data.whatsappPrefilledText ||
            `Hi ${demo.name}, I submitted an inquiry for ${project} (Ref: ${data.ref}).`,
        });

        // Trigger analytics event
        trackAnalyticsEvent("lead_submit", {
          intent,
          project,
          ref: data.ref,
        });

        // Fire Meta Pixel event if configured
        if (typeof window !== "undefined" && (window as unknown as { fbq?: (event: string, name: string, data?: object) => void }).fbq) {
          (window as unknown as { fbq: (event: string, name: string, data?: object) => void }).fbq("track", "Lead", {
            content_name: project,
            content_category: intent,
          });
        }

        // If brochure intent, trigger simulated or real brochure download
        if (intent === "brochure") {
          const downloadLink = document.createElement("a");
          downloadLink.href = "/images/brochures/greenview-heights-brochure.pdf";
          downloadLink.download = `${project.replace(/\s+/g, "_")}_Brochure.pdf`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      } else {
        setErrorMessage(data.error || "Submission failed. Please connect with us directly on WhatsApp.");
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setErrorMessage("Network issue. Please connect with us directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Touch handlers for mobile bottom sheet swipe down
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;
    if (diff > 0) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > 100) {
      closeLeadModal();
    }
    setDragOffset(0);
    setTouchStartY(null);
  };

  // Intent-specific configurations
  const intentConfig: Record<
    LeadIntent,
    { title: string; subcopy: string; submitLabel: string }
  > = {
    site_visit: {
      title: "Book a Site Visit",
      subcopy: `Schedule a private site tour and sample flat walkthrough in ${demo.city}.`,
      submitLabel: "Confirm Site Visit",
    },
    walkthrough: {
      title: "Schedule a Virtual Walkthrough",
      subcopy: "Live 1-on-1 video walkthrough with our senior architectural team.",
      submitLabel: "Schedule Walkthrough",
    },
    banking: {
      title: "Talk to Our Banking Desk",
      subcopy: "Compare pre-approved loan schemes and special interest rates from partner banks.",
      submitLabel: "Request Callback",
    },
    brochure: {
      title: "Get the Brochure",
      subcopy: "Download the complete master floor plans, unit dimensions and amenities spec sheet.",
      submitLabel: "Download Brochure",
    },
    pricing: {
      title: "Get Price & Floor Plans",
      subcopy: "Receive complete unit-wise pricing sheet, payment schedules and layout configurations.",
      submitLabel: "Get Price & Floor Plans",
    },
    callback: {
      title: "Request a Callback",
      subcopy: "Our residential consultant will call you at your preferred time.",
      submitLabel: "Request Callback",
    },
    general: {
      title: "Send an Inquiry",
      subcopy: `Connect with our certified developers in ${demo.city}.`,
      submitLabel: "Submit Inquiry",
    },
  };

  const activeConfig = intentConfig[intent] || intentConfig.site_visit;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeLeadModal}
              className="fixed inset-0 bg-[#0F1412]/65 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Bottom Sheet on Mobile / Centered Modal on Desktop */}
            <motion.div
              ref={sheetRef}
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              style={{
                transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
              }}
              className="relative z-10 w-full max-w-lg bg-[#FAF8F5] text-[#1F2326] rounded-t-[28px] md:rounded-[28px] shadow-2xl border border-[#E5DFD5] max-h-[88svh] flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="leadsheet-title"
            >
              {/* Mobile Drag Handle */}
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="md:hidden pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing w-full"
              >
                <div className="w-12 h-1.5 rounded-full bg-[#D8CEBD]" />
              </div>

              {/* Header Bar */}
              <div className="px-5 pt-3 pb-3 sm:px-7 sm:pt-6 sm:pb-4 border-b border-[#E5DFD5]/80 flex items-start justify-between gap-4 flex-shrink-0">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08A4E] block mb-0.5">
                    {project}
                  </span>
                  <h3 id="leadsheet-title" className="text-xl sm:text-2xl font-serif font-bold text-[#1F2326]">
                    {activeConfig.title}
                  </h3>
                  <p className="text-xs text-[#716B5E] mt-0.5 max-w-sm">
                    {activeConfig.subcopy}
                  </p>
                </div>

                {/* 44px Close Button */}
                <button
                  type="button"
                  onClick={closeLeadModal}
                  aria-label="Close form"
                  className="w-11 h-11 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#716B5E] hover:text-[#1F2326] active:scale-95 transition-all flex-shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body: Form or Success */}
              <div className="p-5 sm:p-7 overflow-y-auto no-scrollbar flex-1">
                {submittedResult ? (
                  /* SUCCESS STATE */
                  <div className="py-6 flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4"
                    >
                      <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                    </motion.div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E1] border border-[#E5DFD5] text-xs font-mono font-bold text-[#B08A4E] mb-2">
                      Reference: {submittedResult.ref}
                    </div>

                    <h4 className="text-2xl font-serif font-bold text-[#1F2326]">
                      Request Confirmed!
                    </h4>

                    <p className="text-sm text-[#716B5E] mt-2 mb-6 max-w-sm leading-relaxed">
                      {submittedResult.nextStep}
                    </p>

                    <div className="w-full flex flex-col gap-2.5">
                      {/* WhatsApp Continue Button with prefilled Ref */}
                      <a
                        href={`https://wa.me/${demo.phoneLink}?text=${encodeURIComponent(
                          submittedResult.whatsappText
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-xl bg-[#1F3D2F] hover:bg-[#162B21] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                      >
                        <span>Continue on WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={closeLeadModal}
                        className="py-2.5 text-xs font-semibold text-[#716B5E] hover:text-[#1F2326]"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  /* LEAD FORM */
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Honeypot field for bot detection */}
                    <input
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                    />

                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#1F2326]">
                        Full Name *
                      </label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3.5 w-4 h-4 text-[#716B5E] pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#D8CEBD] bg-white text-sm text-[#1F2326] focus:border-[#B08A4E] focus:ring-2 focus:ring-[#B08A4E]/20 outline-none font-medium"
                        />
                      </div>
                    </div>

                    {/* Mobile Number with +91 */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#1F2326]">
                        Mobile Number *
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-xs font-bold text-[#716B5E] select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={phone}
                          onChange={handlePhoneChange}
                          className={`w-full h-11 pl-12 pr-3.5 rounded-xl border ${
                            phone.length > 0 && !isPhoneValid
                              ? "border-red-400 bg-red-50/20"
                              : isPhoneValid
                              ? "border-emerald-500 bg-emerald-50/15"
                              : "border-[#D8CEBD] bg-white"
                          } text-sm text-[#1F2326] focus:border-[#B08A4E] focus:ring-2 focus:ring-[#B08A4E]/20 outline-none font-medium tabular-nums`}
                        />
                      </div>
                      {phone.length > 0 && !isPhoneValid && (
                        <span className="text-[11px] text-red-600">
                          Please enter a valid 10-digit number starting with 6, 7, 8, or 9
                        </span>
                      )}
                    </div>

                    {/* Project Selector (Prefilled) */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#1F2326]">
                        Project
                      </label>
                      <select
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-[#D8CEBD] bg-white text-xs sm:text-sm text-[#1F2326] focus:border-[#B08A4E] focus:ring-2 focus:ring-[#B08A4E]/20 outline-none font-medium"
                      >
                        {projectsData.map((p) => (
                          <option key={p.id} value={p.title}>
                            {p.title} ({p.location.area})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* INTENT: site_visit fields */}
                    {intent === "site_visit" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-[#1F2326]">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={minDate || undefined}
                            className="w-full h-11 px-3 rounded-xl border border-[#D8CEBD] bg-white text-xs text-[#1F2326] outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-[#1F2326]">
                            Time Slot
                          </label>
                          <select
                            value={slot}
                            onChange={(e) => setSlot(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border border-[#D8CEBD] bg-white text-xs text-[#1F2326] outline-none"
                          >
                            <option value="Morning (9:30 AM - 1:00 PM)">Morning (9:30 AM - 1:00 PM)</option>
                            <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                            <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* INTENT: walkthrough fields */}
                    {intent === "walkthrough" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-[#1F2326]">
                            Walkthrough Mode
                          </label>
                          <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border border-[#D8CEBD] bg-white text-xs text-[#1F2326] outline-none"
                          >
                            <option value="WhatsApp Video">WhatsApp Video</option>
                            <option value="Google Meet">Google Meet</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-[#1F2326]">
                            Preferred Slot
                          </label>
                          <select
                            value={slot}
                            onChange={(e) => setSlot(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border border-[#D8CEBD] bg-white text-xs text-[#1F2326] outline-none"
                          >
                            <option value="Today (Within 2 Hours)">Today (Within 2 Hours)</option>
                            <option value="Tomorrow Morning">Tomorrow Morning</option>
                            <option value="Weekend Slot">Weekend Slot</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* INTENT: banking fields */}
                    {intent === "banking" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-[#1F2326]">
                            Approx Loan Needed
                          </label>
                          <div className="grid grid-cols-4 gap-1.5">
                            {["Under 30L", "30L - 50L", "50L - 1Cr", "1Cr+"].map((range) => (
                              <button
                                key={range}
                                type="button"
                                onClick={() => setLoanRange(range)}
                                className={`py-2 px-1 text-center rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                                  loanRange === range
                                    ? "bg-[#1F3D2F] text-white border-[#1F3D2F]"
                                    : "bg-white text-[#1F2326] border-[#D8CEBD] hover:bg-[#FAF6EE]"
                                }`}
                              >
                                {range}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-[#1F2326]">
                              Employment
                            </label>
                            <select
                              value={employment}
                              onChange={(e) => setEmployment(e.target.value)}
                              className="w-full h-10 px-3 rounded-xl border border-[#D8CEBD] bg-white text-xs text-[#1F2326] outline-none"
                            >
                              <option value="Salaried">Salaried</option>
                              <option value="Self-employed">Self-employed / Business</option>
                              <option value="NRI">NRI</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-[#1F2326]">
                              Best Time to Call
                            </label>
                            <select
                              value={bestTime}
                              onChange={(e) => setBestTime(e.target.value)}
                              className="w-full h-10 px-3 rounded-xl border border-[#D8CEBD] bg-white text-xs text-[#1F2326] outline-none"
                            >
                              <option value="Immediate">Immediate</option>
                              <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                              <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* INTENT: pricing fields */}
                    {intent === "pricing" && (
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#1F2326]">
                          Preferred Unit Type
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {["2 BHK", "3 BHK", "4 BHK / Penthouse"].map((u) => (
                            <button
                              key={u}
                              type="button"
                              onClick={() => setUnitType(u)}
                              className={`py-2 text-center rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                unitType === u
                                  ? "bg-[#1F3D2F] text-white border-[#1F3D2F]"
                                  : "bg-white text-[#1F2326] border-[#D8CEBD]"
                              }`}
                            >
                              {u}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* INTENT: callback fields */}
                    {intent === "callback" && (
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#1F2326]">
                          Best Time to Call
                        </label>
                        <select
                          value={bestTime}
                          onChange={(e) => setBestTime(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl border border-[#D8CEBD] bg-white text-xs text-[#1F2326] outline-none"
                        >
                          <option value="Immediate">Immediate (within 15 mins)</option>
                          <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                          <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                          <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                        </select>
                      </div>
                    )}

                    {/* INTENT: general message field */}
                    {intent === "general" && (
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#1F2326]">
                          Message / Requirements
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Your specific inquiry or requirements..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full p-3 rounded-xl border border-[#D8CEBD] bg-white text-xs text-[#1F2326] outline-none resize-none"
                        />
                      </div>
                    )}

                    {/* Error Notice */}
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                        {errorMessage}
                      </div>
                    )}

                    {/* Consent Checkbox: UNCHECKED BY DEFAULT per rule */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        id="leadsheet-consent"
                        type="checkbox"
                        required
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-[#D8CEBD] text-[#B08A4E] focus:ring-[#B08A4E] cursor-pointer"
                      />
                      <label htmlFor="leadsheet-consent" className="text-[11px] text-[#716B5E] leading-relaxed select-none">
                        I authorize <span data-demo-name suppressHydrationWarning>{demo.name}</span> &amp; its representatives to contact me via Call, SMS &amp; WhatsApp regarding property updates and offers. Read our{" "}
                        <Link href="/privacy" target="_blank" className="text-[#B08A4E] underline font-semibold">
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>

                    {/* Submit Button (Disabled until valid, clearly distinct) */}
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                        isFormValid && !isSubmitting
                          ? "btn-bronze text-white shadow-lg shadow-[#B08A4E]/30 cursor-pointer active:scale-98"
                          : "bg-[#D8CEBD] text-[#716B5E] opacity-60 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <span>{activeConfig.submitLabel}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-[#A89E8D]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B08A4E]" />
                      <span>Zero Spam Guarantee • MahaRERA Compliant Developer</span>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Walkthrough Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideoModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-video"
            >
              <button
                type="button"
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={`${videoUrl}?autoplay=1`}
                title={`${demo.name} Project Walkthrough`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
