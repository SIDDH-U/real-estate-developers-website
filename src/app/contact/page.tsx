"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { projectsData } from "@/data/projects";
import { trackAnalyticsEvent } from "@/lib/analytics";

import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState(projectsData[0].title);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false); // UNCHECKED BY DEFAULT
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    ref: string;
    nextStep: string;
    whatsappText: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

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
          intent: "general",
          name: name.trim(),
          phone: `+91${cleanPhone}`,
          email: email.trim() || undefined,
          project: project,
          message: message.trim() || undefined,
          page: "/contact",
          sourceButton: "contact_page_form",
          consent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSubmittedResult({
        ref: data.ref,
        nextStep: data.nextStep,
        whatsappText: data.whatsappPrefilledText || `Hi, my ref is ${data.ref}`,
      });
      trackAnalyticsEvent("lead_submit", {
        intent: "general",
        source: "contact_page",
        project,
      });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "We couldn't submit your message. Please connect on WhatsApp directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCall = () => {
    trackAnalyticsEvent("call_click", { source: "contact_page" });
  };

  const handleWhatsApp = () => {
    trackAnalyticsEvent("whatsapp_click", { source: "contact_page" });
    const msg = encodeURIComponent(
      `Hello Glorious Real Estates, I want to enquire regarding ${project}. My name is ${name || "a homebuyer"}.`
    );
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F3EC]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E] block mb-2">
            REACH OUT TO OUR SALES DESK
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1F2326]">
            Get in Touch with Us
          </h1>
          <p className="text-base sm:text-lg text-[#716B5E] mt-3">
            Whether you want to visit our project sites in Pawdewadi or discuss customized floor plan options, our property advisors are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: CONTACT DETAILS & MAP (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DFD5] shadow-sm flex flex-col gap-6">
              <h2 className="text-xl font-serif font-bold text-[#1F2326]">
                Corporate Sales Gallery
              </h2>

              <div className="space-y-4 text-sm text-[#1F2326]">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#B08A4E] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#716B5E] font-medium">Head Office Address</div>
                    <div className="font-semibold text-[#1F2326] mt-0.5">{siteConfig.address.formatted}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#B08A4E] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#716B5E] font-medium">Direct Telephone</div>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      onClick={handleCall}
                      className="font-semibold text-[#1F2326] hover:text-[#B08A4E] mt-0.5 block"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#B08A4E] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#716B5E] font-medium">Official Email</div>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-semibold text-[#1F2326] hover:text-[#B08A4E] mt-0.5 block"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#B08A4E] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#716B5E] font-medium">Visiting Hours</div>
                    <div className="font-semibold text-[#1F2326] mt-0.5">{siteConfig.contact.visitingHours}</div>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Action */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-3.5 rounded-2xl bg-[#1F3D2F] hover:bg-[#162B21] text-white text-sm font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </button>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5DFD5] shadow-sm p-2">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden">
                <iframe
                  src={siteConfig.address.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Glorious Real Estates Location Map"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE ENQUIRY FORM (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DFD5] shadow-sm">
            {!submittedResult ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-2xl font-serif font-bold text-[#1F2326]">
                  Schedule an In-Person Consultation
                </h2>
                <p className="text-xs text-[#716B5E] -mt-2">
                  Leave your details and our project manager will reach out within 30 minutes with brochures and price sheets.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#1F2326]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Deshmukh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 px-3.5 rounded-xl border border-[#D8CEBD] text-sm text-[#1F2326] focus:border-[#B08A4E] focus:ring-2 focus:ring-[#B08A4E]/20 outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#1F2326] flex items-center justify-between">
                      <span>Phone Number *</span>
                      {isPhoneValid && (
                        <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Valid</span>
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3.5 text-xs font-semibold text-[#716B5E]">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className={`w-full h-12 pl-12 pr-4 rounded-xl border ${
                          isPhoneValid ? "border-emerald-500" : "border-[#D8CEBD]"
                        } text-sm text-[#1F2326] focus:border-[#B08A4E] focus:ring-2 focus:ring-[#B08A4E]/20 outline-none`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#1F2326]">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-3.5 rounded-xl border border-[#D8CEBD] text-sm text-[#1F2326] focus:border-[#B08A4E] focus:ring-2 focus:ring-[#B08A4E]/20 outline-none"
                    />
                  </div>

                  {/* Project of Interest */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#1F2326]">
                      Interested Project
                    </label>
                    <select
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      className="w-full h-12 px-3.5 rounded-xl border border-[#D8CEBD] text-sm text-[#1F2326] focus:border-[#B08A4E] focus:ring-2 focus:ring-[#B08A4E]/20 outline-none"
                    >
                      {projectsData.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title} ({p.location.area})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#1F2326]">
                    Specific Requirements or Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="E.g., Looking for a 3 BHK unit on higher floor with east-facing balcony."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-[#D8CEBD] text-sm text-[#1F2326] focus:border-[#B08A4E] focus:ring-2 focus:ring-[#B08A4E]/20 outline-none resize-none"
                  />
                </div>

                {/* Consent Checkbox: UNCHECKED BY DEFAULT */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="contact-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#D8CEBD] text-[#B08A4E] focus:ring-[#B08A4E] cursor-pointer"
                  />
                  <label htmlFor="contact-consent" className="text-xs text-[#716B5E] leading-snug cursor-pointer select-none">
                    I consent to receive consultation details and project updates via WhatsApp / Call. View our{" "}
                    <Link href="/privacy" className="text-[#B08A4E] underline hover:text-[#96743D]">
                      Privacy Policy
                    </Link>.
                  </label>
                </div>

                {errorMessage && (
                  <div className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                    {errorMessage}{" "}
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold"
                    >
                      Tap here to chat on WhatsApp
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 rounded-2xl text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all ${
                    isFormValid && !isSubmitting
                      ? "bg-[#B08A4E] hover:bg-[#96743D] text-white active:scale-98 cursor-pointer shadow-lg shadow-[#B08A4E]/20"
                      : "bg-[#E5DFD5] text-[#8C816E] cursor-not-allowed border border-[#D8CEBD]"
                  }`}
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-[#716B5E]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>MahaRERA verified developer. Zero spam policy.</span>
                </div>
              </form>
            ) : (
              <div className="py-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1F2326]">
                  Inquiry Received!
                </h3>
                <p className="text-xs text-[#B08A4E] font-mono mt-1 font-semibold">
                  Reference ID: {submittedResult.ref}
                </p>
                <p className="text-sm text-[#716B5E] max-w-md mt-2 mb-6 leading-relaxed">
                  {submittedResult.nextStep}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                      submittedResult.whatsappText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[#1F3D2F] hover:bg-[#162B21] text-white text-xs font-semibold flex items-center gap-2 shadow"
                  >
                    <span>Continue on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedResult(null);
                      setName("");
                      setPhone("");
                      setMessage("");
                      setConsent(false);
                    }}
                    className="px-6 py-3 rounded-full bg-[#FAF6EE] text-[#1F2326] text-xs font-semibold border border-[#E5DFD5] hover:bg-[#F2ECE1]"
                  >
                    Submit Another Message
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
