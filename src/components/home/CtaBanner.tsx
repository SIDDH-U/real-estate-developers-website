"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { useLeadModal } from "@/context/LeadModalContext";
import { trackAnalyticsEvent } from "@/lib/analytics";
import AmbientBackground from "@/components/common/AmbientBackground";

export default function CtaBanner() {
  const { openLeadModal } = useLeadModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false); // UNCHECKED BY DEFAULT
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    ref: string;
    nextStep: string;
    whatsappText: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const cleanPhone = phone.replace(/\D/g, "").slice(0, 10);
  const isPhoneValid = /^[6-9]\d{9}$/.test(cleanPhone);
  const isFormValid = name.trim().length >= 2 && isPhoneValid && consent;

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
          intent: "site_visit",
          name: name.trim(),
          phone: `+91${cleanPhone}`,
          project: "Greenview Heights",
          page: "/",
          sourceButton: "cta_banner_inline",
          consent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      setSubmittedResult({
        ref: data.ref,
        nextStep: data.nextStep,
        whatsappText: data.whatsappPrefilledText || `Hi, my ref is ${data.ref}`,
      });
      trackAnalyticsEvent("lead_submit", { intent: "site_visit", project: "Greenview Heights" });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || "We couldn't submit right now. Please tap to connect on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-8 sm:py-16 bg-[#FBF8F2] overflow-hidden">
      <AmbientBackground variant="sand-alt" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#1F2326] text-white p-6 sm:p-12 lg:p-14 border border-white/10 shadow-2xl">
        {/* Architectural background with slow Ken Burns drift */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.06] }}
            transition={{ duration: 24, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop"
              alt="Luxury residential architecture background"
              fill
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#141719] via-[#1F2326]/90 to-transparent" />
        </div>

        {/* Ambient Warm Radial Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#B08A4E]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-wider text-[#C9A66B] block mb-2"
          >
            YOUR DREAM HOME AWAITS
          </motion.span>

          {/* Masked Line-by-Line Headline Reveal */}
          <div className="overflow-hidden mb-3">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7F3EC] leading-tight"
            >
              Ready to find your dream home?
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-base text-[#D8CEBD] mb-6 sm:mb-8 leading-relaxed max-w-xl"
          >
            Connect directly with our senior development consultants for floor plans, bank approvals, and private site visits in Nanded.
          </motion.p>

          {submittedResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-white">Site Visit Booked!</h4>
                  <p className="text-xs text-[#C9A66B] font-mono">Reference ID: {submittedResult.ref}</p>
                </div>
              </div>
              <p className="text-xs text-[#D8CEBD] mb-4 leading-relaxed">
                {submittedResult.nextStep}
              </p>
              <a
                href={`https://wa.me/918080076322?text=${encodeURIComponent(submittedResult.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow transition-all active:scale-97"
              >
                <span>Continue on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl sm:rounded-full border border-white/20">
                {/* Name Input with Floating Label */}
                <div
                  className={`flex-1 relative flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl sm:rounded-full text-[#1F2326] transition-all duration-300 ring-offset-1 ${
                    focusedField === "name" ? "ring-2 ring-[#B08A4E] shadow-sm" : ""
                  }`}
                >
                  <User className="w-4 h-4 text-[#B08A4E] flex-shrink-0" />
                  <div className="flex-1 relative">
                    <input
                      id="cta-name"
                      type="text"
                      required
                      value={name}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-[#1F2326] font-medium"
                    />
                  </div>
                </div>

                {/* Phone Input with Placeholder */}
                <div
                  className={`flex-1 relative flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl sm:rounded-full text-[#1F2326] transition-all duration-300 ring-offset-1 ${
                    focusedField === "phone" ? "ring-2 ring-[#B08A4E] shadow-sm" : ""
                  }`}
                >
                  <Phone className="w-4 h-4 text-[#B08A4E] flex-shrink-0" />
                  <span className="text-xs text-[#716B5E] font-medium">+91</span>
                  <div className="flex-1 relative">
                    <input
                      id="cta-phone"
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit mobile number"
                      className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-[#1F2326] font-medium"
                    />
                  </div>
                </div>

                {/* Bronze Submit Button: Disabled state distinct from enabled state */}
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`px-6 py-3.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 min-w-[160px] transition-all duration-200 ${
                    isFormValid && !isSubmitting
                      ? "bg-[#B08A4E] hover:bg-[#96743D] text-white shadow-lg shadow-[#B08A4E]/30 cursor-pointer active:scale-97"
                      : "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
                  }`}
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Book a Site Visit</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Consent checkbox: UNCHECKED BY DEFAULT */}
              <div className="flex items-start gap-2.5 px-2 pt-1">
                <input
                  id="cta-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/30 text-[#B08A4E] focus:ring-[#B08A4E] cursor-pointer"
                />
                <label htmlFor="cta-consent" className="text-[11px] text-[#D8CEBD] leading-snug cursor-pointer select-none">
                  I consent to receive site visit details and project updates via WhatsApp / Call. View our{" "}
                  <Link href="/privacy" className="text-[#C9A66B] hover:underline">
                    Privacy Policy
                  </Link>.
                </label>
              </div>

              {errorMessage && (
                <div className="text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded-xl border border-rose-800/50 mt-1">
                  {errorMessage}{" "}
                  <a
                    href="https://wa.me/918080076322"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold"
                  >
                    Tap to WhatsApp us directly
                  </a>
                </div>
              )}
            </form>
          )}

          <div className="flex items-center gap-2 mt-4 text-xs text-[#A89E8D]">
            <ShieldCheck className="w-4 h-4 text-[#C9A66B]" />
            <span>100% confidential. No spam. Direct developer assistance.</span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

