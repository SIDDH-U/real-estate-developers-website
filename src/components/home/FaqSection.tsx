"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import AmbientBackground from "@/components/common/AmbientBackground";
import SectionHeader from "@/components/common/SectionHeader";
import { useLeadModal } from "@/context/LeadModalContext";
import { useDemo } from "@/context/DemoContext";

export default function FaqSection() {
  const { name, city } = useDemo();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openLeadModal } = useLeadModal();

  const faqs = [
    {
      question: "What is the committed possession schedule for your active projects?",
      answer:
        "Greenview Heights has a committed handover of December 2027 with RERA milestone guarantees. All ongoing structural progress is certified monthly by chartered engineers, ensuring strict adherence to project schedules.",
    },
    {
      question: "Which banks are partnered for home loans and what are current rates?",
      answer:
        "All our projects are pre-approved by leading national and private banks including SBI, HDFC Bank, ICICI Bank, Bank of Baroda, and Axis Bank. Home loan interest rates currently start from 8.40% p.a., with up to 80-85% loan-to-value (LTV) financing.",
    },
    {
      question: "Are your projects fully registered with MahaRERA and legally verified?",
      answer:
        `Yes, 100%. Every project launched by ${name} has clear marketable title, registered NA sanction, town planning approval, and individual MahaRERA certification. All legal certificates are openly available for buyer inspection.`,
    },
    {
      question: "What payment plans and construction-linked milestones do you offer?",
      answer:
        "We offer transparent Construction Linked Payment Plans (CLP). Buyers pay an initial 10% booking token, with remaining installments distributed proportionately across foundation, slab casting, brickwork, plaster, and final handover keys.",
    },
    {
      question: "How do I book a private site visit or sample flat walkthrough?",
      answer:
        `Site visits can be scheduled 7 days a week between 9:00 AM and 7:30 PM. We provide complimentary pickup and drop services within ${city} city limits, along with an architect-accompanied guided tour of the sample flat.`,
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-10 sm:py-16 lg:py-20 bg-[#FBF8F2] overflow-hidden"
    >
      <AmbientBackground variant="sand-alt" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Everything You Need to Know"
          subtitle="Clear answers to common questions about possession timelines, bank loans, legal approvals, and booking processes."
          align="center"
        />

        <div className="flex flex-col gap-3 mt-6 sm:mt-8">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5DFD5] shadow-xs overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                >
                  <span className="text-sm sm:text-base font-serif font-bold text-[#1F2326]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B08A4E] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-[#716B5E] leading-relaxed border-t border-[#F0EBE1]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Bar */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#1F2326]">
              Have a specific question not listed here?
            </h4>
            <p className="text-[11px] text-[#716B5E]">
              Our sales advisors are available directly on phone or WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              openLeadModal({
                projectName: "General Inquiry",
                source: "faq_cta",
              })
            }
            className="btn-secondary py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer flex-shrink-0"
          >
            <span>Ask a Consultant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
