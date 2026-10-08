"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { projectsData } from "@/data/projects";
import { trackAnalyticsEvent } from "@/lib/analytics";

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCall = () => {
    trackAnalyticsEvent("call_click", { source: "footer" });
  };

  return (
    <footer className="bg-[#141719] text-[#F7F3EC] pt-12 sm:pt-16 pb-24 lg:pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-[#B08A4E]/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 pb-10 sm:pb-12 border-b border-white/10">
          {/* Column 1: Brand & Socials (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <Link href="/" className="inline-block relative w-44 sm:w-48 h-10 sm:h-12">
              <Image
                src="/images/logo-white.svg"
                alt={siteConfig.name}
                fill
                className="object-contain object-left"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#A89E8D] leading-relaxed max-w-sm">
              Building premium residential and commercial spaces with trust, quality, and a vision for a better tomorrow across Nanded, Maharashtra.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D8CEBD] hover:text-[#B08A4E] hover:border-[#B08A4E] transition-all"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D8CEBD] hover:text-[#B08A4E] hover:border-[#B08A4E] transition-all"
              >
                <span className="text-xs font-bold">ig</span>
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D8CEBD] hover:text-[#B08A4E] hover:border-[#B08A4E] transition-all"
              >
                <span className="text-xs font-bold">yt</span>
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D8CEBD] hover:text-[#B08A4E] hover:border-[#B08A4E] transition-all"
              >
                <span className="text-xs font-bold">in</span>
              </a>
            </div>

            {/* Developer RERA Badge (rendered conditionally per rules) */}
            {siteConfig.legal.developerReraNumber && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-[#D8CEBD] mt-1 w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B08A4E]" />
                <span>MahaRERA: {siteConfig.legal.developerReraNumber}</span>
              </div>
            )}
          </motion.div>

          {/* Column 2: Quick Links (Accordion on Mobile, Column on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 border-b border-white/10 lg:border-none pb-3 lg:pb-0"
          >
            {/* Mobile Accordion Toggle */}
            <button
              type="button"
              onClick={() => toggleAccordion("quick-links")}
              className="lg:hidden w-full flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-[#B08A4E] cursor-pointer"
            >
              <span>Quick Links</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  openAccordion === "quick-links" ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Desktop Header */}
            <h4 className="hidden lg:block text-xs font-semibold uppercase tracking-wider text-[#B08A4E] mb-3">
              Quick Links
            </h4>

            {/* Mobile Collapsible / Desktop Always Visible */}
            <div className="hidden lg:block">
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#D8CEBD]">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/#projects" className="hover:text-white transition-colors">Projects</Link></li>
                <li><Link href="/#amenities" className="hover:text-white transition-colors">Amenities</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/#why-us" className="hover:text-white transition-colors">Why Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <AnimatePresence>
              {openAccordion === "quick-links" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:hidden overflow-hidden"
                >
                  <ul className="flex flex-col gap-2 pt-2 pb-3 text-xs text-[#D8CEBD]">
                    <li><Link href="/" className="hover:text-white transition-colors block py-1">Home</Link></li>
                    <li><Link href="/#projects" className="hover:text-white transition-colors block py-1">Projects</Link></li>
                    <li><Link href="/#amenities" className="hover:text-white transition-colors block py-1">Amenities</Link></li>
                    <li><Link href="/about" className="hover:text-white transition-colors block py-1">About Us</Link></li>
                    <li><Link href="/#why-us" className="hover:text-white transition-colors block py-1">Why Us</Link></li>
                    <li><Link href="/contact" className="hover:text-white transition-colors block py-1">Contact</Link></li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Column 3: Our Projects (Accordion on Mobile, Column on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 border-b border-white/10 lg:border-none pb-3 lg:pb-0"
          >
            {/* Mobile Accordion Toggle */}
            <button
              type="button"
              onClick={() => toggleAccordion("projects")}
              className="lg:hidden w-full flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-[#B08A4E] cursor-pointer"
            >
              <span>Our Projects</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  openAccordion === "projects" ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Desktop Header */}
            <h4 className="hidden lg:block text-xs font-semibold uppercase tracking-wider text-[#B08A4E] mb-3">
              Our Projects
            </h4>

            {/* Desktop Always Visible */}
            <div className="hidden lg:block">
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#D8CEBD]">
                {projectsData.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:text-white transition-colors flex items-center justify-between group"
                    >
                      <span>{project.title}</span>
                      <span className="text-[11px] text-[#A89E8D] group-hover:text-[#B08A4E]">
                        {project.status}
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/projects" className="text-xs text-[#B08A4E] hover:underline flex items-center gap-1 mt-1">
                    <span>View All Projects in Nanded</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mobile Collapsible */}
            <AnimatePresence>
              {openAccordion === "projects" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:hidden overflow-hidden"
                >
                  <ul className="flex flex-col gap-2 pt-2 pb-3 text-xs text-[#D8CEBD]">
                    {projectsData.map((project) => (
                      <li key={project.id}>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:text-white transition-colors flex items-center justify-between py-1"
                        >
                          <span>{project.title}</span>
                          <span className="text-[10px] text-[#A89E8D]">{project.status}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Column 4: Contact & Map Thumbnail (ALWAYS VISIBLE on mobile & desktop per rules) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 flex flex-col gap-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B08A4E]">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-2 text-xs text-[#D8CEBD]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B08A4E] flex-shrink-0 mt-0.5" />
                <span>{siteConfig.address.formatted}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B08A4E] flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  onClick={handleCall}
                  className="hover:text-white transition-colors font-medium"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B08A4E] flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B08A4E] flex-shrink-0" />
                <span>{siteConfig.contact.visitingHours}</span>
              </div>
            </div>

            {/* Map Link / Thumbnail (ALWAYS VISIBLE) */}
            <div className="mt-1 rounded-xl overflow-hidden border border-white/15 bg-white/5 relative group">
              <a
                href={siteConfig.address.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-16 w-full"
              >
                <div className="absolute inset-0 bg-[#1F2326]/75 z-10 flex items-center justify-center gap-2 p-2 group-hover:bg-[#1F2326]/50 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-[#B08A4E] flex items-center justify-center text-white shadow-xs">
                    <MapPin className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs font-semibold text-white flex items-center gap-1">
                    View on Google Maps <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="w-full h-full bg-[#2C3337] bg-[radial-gradient(#4a5568_1px,transparent_1px)] [background-size:12px_12px]" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C816E]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center sm:text-left">
            <span>{siteConfig.legal.copyright}</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/privacy" className="hover:text-[#D8CEBD] transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-[#D8CEBD] transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#A89E8D]">
              Nanded, Maharashtra
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D8CEBD] hover:text-[#B08A4E] hover:border-[#B08A4E] transition-all active:scale-95 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Starting Price Terms Disclaimer Note */}
        <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#716B5E] text-center leading-relaxed">
          {siteConfig.legal.termsDisclaimer}
        </div>
      </div>
    </footer>
  );
}
