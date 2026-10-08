"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { projectsData } from "@/data/projects";
import { useLeadModal } from "@/context/LeadModalContext";
import { trackAnalyticsEvent } from "@/lib/analytics";
import PhoneRingingIcon from "@/components/common/PhoneRingingIcon";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openLeadModal } = useLeadModal();
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open without layout shift
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { num: "01", label: "Projects", href: "/#projects" },
    { num: "02", label: "Amenities", href: "/#amenities" },
    { num: "03", label: "About", href: "/about" },
    { num: "04", label: "Why Us", href: "/#why-us" },
    { num: "05", label: "Contact", href: "/contact" },
  ];

  const handleBookClick = () => {
    setMobileMenuOpen(false);
    openLeadModal({ intent: "site_visit", source: "header_nav" });
  };

  const handlePhoneClick = () => {
    trackAnalyticsEvent("call_click", { source: "header" });
  };

  const handleWhatsAppClick = () => {
    trackAnalyticsEvent("whatsapp_click", { source: "mobile_menu" });
    const msg = encodeURIComponent(siteConfig.contact.whatsappDefaultMessage);
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${msg}`, "_blank");
  };

  // On home transparent hero vs scrolled
  const isHeroTransparent = !isScrolled && pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F7F3EC]/95 backdrop-blur-md shadow-xs border-b border-[#E5DFD5]/80 py-3"
            : "bg-transparent py-3.5 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo: White variant over hero, dark variant when scrolled */}
            <Link
              href="/"
              className="flex items-center gap-2 group transition-transform active:scale-98 z-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative w-44 h-10 md:w-52 md:h-12">
                <Image
                  src={isHeroTransparent && !isScrolled ? "/images/logo-white.svg" : "/images/logo.svg"}
                  alt={siteConfig.name}
                  fill
                  priority
                  className="object-contain object-left transition-opacity duration-300"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className={`hidden lg:flex items-center gap-1 px-5 py-2 rounded-full border transition-all duration-300 ${
                isHeroTransparent
                  ? "bg-black/35 backdrop-blur-md border-white/20 text-white shadow-md"
                  : "bg-white/90 backdrop-blur-md border-[#E5DFD5] text-[#1F2326] shadow-xs"
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-1.5 text-[15px] font-medium rounded-full transition-colors ${
                    isHeroTransparent
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-[#1F2326] hover:text-[#B08A4E] hover:bg-[#F7F3EC]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Action Buttons with Ringing Call Icon */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                onClick={handlePhoneClick}
                className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isHeroTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-[#1F2326] hover:text-[#B08A4E]"
                }`}
                title="Call sales office"
              >
                <PhoneRingingIcon size={15} iconClassName="w-3.5 h-3.5 text-[#B08A4E]" rippleClassName="bg-[#B08A4E]/40" />
                <span className="text-xs">{siteConfig.contact.phoneDisplay}</span>
              </a>

              <button
                onClick={handleBookClick}
                className="btn-bronze inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shadow-xs cursor-pointer active:scale-97"
              >
                <span>Book a Site Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Button (44px tap target) with morphing lines */}
            <div className="flex items-center gap-2 lg:hidden z-50">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-dropdown"
                aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
                className={`w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                  mobileMenuOpen
                    ? "bg-white/15 border-white/30 text-white"
                    : isHeroTransparent
                    ? "bg-black/35 backdrop-blur-md border-white/25 text-white"
                    : "bg-white border-[#E5DFD5] text-[#1F2326] shadow-xs"
                }`}
              >
                {/* 3-Bar Morphing Icon */}
                <span
                  className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                    mobileMenuOpen
                      ? "bg-white rotate-45 translate-y-2"
                      : isHeroTransparent
                      ? "bg-white"
                      : "bg-[#1F2326]"
                  }`}
                />
                <span
                  className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                    mobileMenuOpen
                      ? "opacity-0 scale-x-0"
                      : isHeroTransparent
                      ? "bg-white"
                      : "bg-[#1F2326]"
                  }`}
                />
                <span
                  className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                    mobileMenuOpen
                      ? "bg-white -rotate-45 -translate-y-2"
                      : isHeroTransparent
                      ? "bg-white"
                      : "bg-[#1F2326]"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* COMPACT DROPDOWN MOBILE MENU (ANCHORED UNDER HEADER) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dimmed backdrop covering the rest of the page (z-40) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[rgba(15,20,18,0.55)] backdrop-blur-[6px] lg:hidden"
              aria-hidden="true"
            />

            {/* Anchored Panel: top = header height + 8px, left/right 12px, radius 24px, content-driven height */}
            <motion.div
              id="mobile-navigation-dropdown"
              ref={menuPanelRef}
              initial={{ opacity: 0, scale: 0.94, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[66px] sm:top-[74px] left-3 right-3 z-50 rounded-[24px] bg-[#1F3D2F] text-white shadow-2xl border border-white/15 max-h-[min(72svh,520px)] flex flex-col overflow-y-auto no-scrollbar lg:hidden p-4 sm:p-5"
            >
              {/* Grain Texture Overlay */}
              <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none rounded-[24px]" />

              {/* Top Row: Left "MENU" eyebrow, Right 44px X button */}
              <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[10px] font-bold tracking-[0.14em] text-[#C9A66B] uppercase">
                  MENU
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 5 Compact Navigation Links: 24px serif, 52px rows, staggered 50ms slide-up */}
              <div className="relative z-10 flex flex-col py-1">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: idx * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-[52px] border-b border-white/10 flex items-center justify-between group active:scale-98 transition-transform"
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-[11px] font-mono font-bold text-[#C9A66B]">
                          {link.num}
                        </span>
                        <span className="text-[22px] sm:text-[24px] font-serif text-white group-hover:text-[#C9A66B] transition-colors leading-none">
                          {link.label}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#C9A66B] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Horizontally Scrollable Row of Project Chips */}
              <div className="relative z-10 py-3 border-b border-white/10">
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {projectsData.map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white/95 whitespace-nowrap hover:bg-white/20 active:scale-95 transition-all flex-shrink-0"
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions: [Call] [WhatsApp] side by side, then full-width bronze button */}
              <div className="relative z-10 pt-3 flex flex-col gap-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${siteConfig.contact.phoneTel}`}
                    onClick={handlePhoneClick}
                    className="h-11 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 active:scale-97 transition-all cursor-pointer"
                  >
                    <PhoneRingingIcon size={14} iconClassName="w-3.5 h-3.5 text-[#C9A66B]" rippleClassName="bg-[#C9A66B]/40" />
                    <span>Call Sales</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="h-11 rounded-xl bg-[#2A513F] text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-97 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleBookClick}
                  className="btn-bronze w-full h-12 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 active:scale-98 shadow-md cursor-pointer"
                >
                  <span>Book a Site Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
