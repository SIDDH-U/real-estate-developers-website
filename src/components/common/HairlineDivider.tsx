"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HairlineDivider() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-hidden pointer-events-none">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hairline-divider w-full"
      />
    </div>
  );
}
