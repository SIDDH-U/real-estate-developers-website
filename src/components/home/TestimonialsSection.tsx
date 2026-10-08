"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ArrowRight, Quote } from "lucide-react";
import { testimonialsData } from "@/data/projects";
import AmbientBackground from "@/components/common/AmbientBackground";
import SectionHeader from "@/components/common/SectionHeader";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section
      id="testimonials"
      className="relative py-10 sm:py-16 lg:py-20 bg-[#FBF8F2] overflow-hidden"
    >
      <AmbientBackground variant="sand-alt" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="HAPPY FAMILIES"
          title="What Our Customers Say"
          subtitle="Real homeowners share their journey with Glorious Real Estates in Nanded."
          action={
            <div className="flex items-center gap-3">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B08A4E] hover:text-[#96743D] transition-colors"
              >
                <span>View All Reviews</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="hidden sm:flex items-center gap-2 ml-4">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-full border border-[#E5DFD5] bg-white hover:bg-[#FAF7F2] flex items-center justify-center text-[#1F2326] transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-full border border-[#E5DFD5] bg-white hover:bg-[#FAF7F2] flex items-center justify-center text-[#1F2326] transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          }
        />

        {/* Desktop 3-Card Grid with Staggered Star Fills */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {testimonialsData.map((item, cardIdx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: cardIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DFD5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Star Rating with 60ms Staggered Fill & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#B08A4E]">
                    {[...Array(item.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.25 }}
                      >
                        <Star className="w-4 h-4 fill-[#B08A4E]" />
                      </motion.span>
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#E5DFD5] group-hover:text-[#B08A4E]/40 transition-colors" />
                </div>

                {/* Quote */}
                <p className="text-sm text-[#1F2326] leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#E5DFD5]">
                <div className="w-10 h-10 rounded-full bg-[#1F3D2F] text-[#F7F3EC] font-serif font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1F2326]">
                    {item.name}
                  </div>
                  <div className="text-xs text-[#716B5E]">
                    {item.projectName} • {item.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Drag Carousel View */}
        <div className="lg:hidden">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) {
                nextTestimonial();
              } else if (info.offset.x > 40) {
                prevTestimonial();
              }
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DFD5] shadow-md relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#B08A4E]">
                    {[...Array(testimonialsData[activeIndex].rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06, duration: 0.2 }}
                      >
                        <Star className="w-4 h-4 fill-[#B08A4E]" />
                      </motion.span>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C816E]">
                    {testimonialsData[activeIndex].date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#1F2326] leading-relaxed italic mb-5">
                  &ldquo;{testimonialsData[activeIndex].quote}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E5DFD5]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1F3D2F] text-white font-serif font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {testimonialsData[activeIndex].initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1F2326]">
                        {testimonialsData[activeIndex].name}
                      </div>
                      <div className="text-[11px] text-[#716B5E]">
                        {testimonialsData[activeIndex].projectName}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={prevTestimonial}
                      aria-label="Previous review"
                      className="w-8 h-8 rounded-full bg-[#FAF6EE] text-[#1F2326] flex items-center justify-center active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextTestimonial}
                      aria-label="Next review"
                      className="w-8 h-8 rounded-full bg-[#FAF6EE] text-[#1F2326] flex items-center justify-center active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-3.5">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-6 bg-[#B08A4E]" : "w-1.5 bg-[#D8CEBD]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
