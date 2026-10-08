"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, IndianRupee, HelpCircle } from "lucide-react";
import AmbientBackground from "@/components/common/AmbientBackground";
import SectionHeader from "@/components/common/SectionHeader";
import { useLeadModal } from "@/context/LeadModalContext";

export default function EmiCalculatorSection() {
  const { openLeadModal } = useLeadModal();

  // State in Lakhs, Interest %, Tenure Years
  const [loanAmountLakhs, setLoanAmountLakhs] = useState(45); // ₹45 Lakhs default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% default
  const [tenureYears, setTenureYears] = useState(20); // 20 years default

  // Calculate Monthly EMI: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const { monthlyEmi, totalPayment, totalInterest } = useMemo(() => {
    const P = loanAmountLakhs * 100000;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (r === 0) {
      const emi = P / n;
      return { monthlyEmi: Math.round(emi), totalPayment: P, totalInterest: 0 };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - P;

    return {
      monthlyEmi: Math.round(emi),
      totalPayment: Math.round(total),
      totalInterest: Math.round(interest),
    };
  }, [loanAmountLakhs, interestRate, tenureYears]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section
      id="emi-calculator"
      className="relative py-10 sm:py-16 lg:py-20 bg-[#FBF8F2] overflow-hidden"
    >
      <AmbientBackground variant="sand-alt" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FINANCIAL PLANNING"
          title="Home Loan EMI Calculator"
          subtitle="Estimate your monthly installments with transparent interest rates from leading partner banks."
          align="left"
        />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5DFD5] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Sliders Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Slider 1: Loan Amount */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-semibold text-[#1F2326]">
                  Loan Amount
                </label>
                <span className="text-sm sm:text-base font-bold text-[#B08A4E] tabular-nums">
                  ₹{loanAmountLakhs} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="150"
                step="5"
                value={loanAmountLakhs}
                onChange={(e) => setLoanAmountLakhs(Number(e.target.value))}
                className="w-full h-2 bg-[#E5DFD5] rounded-lg appearance-none cursor-pointer accent-[#B08A4E]"
              />
              <div className="flex justify-between text-[10px] text-[#716B5E] mt-1">
                <span>₹15 L</span>
                <span>₹75 L</span>
                <span>₹1.5 Cr</span>
              </div>
            </div>

            {/* Slider 2: Interest Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-semibold text-[#1F2326]">
                  Interest Rate (p.a.)
                </label>
                <span className="text-sm sm:text-base font-bold text-[#B08A4E] tabular-nums">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="7.5"
                max="12.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-[#E5DFD5] rounded-lg appearance-none cursor-pointer accent-[#B08A4E]"
              />
              <div className="flex justify-between text-[10px] text-[#716B5E] mt-1">
                <span>7.5%</span>
                <span>9.5%</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Slider 3: Tenure */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-semibold text-[#1F2326]">
                  Loan Tenure
                </label>
                <span className="text-sm sm:text-base font-bold text-[#B08A4E] tabular-nums">
                  {tenureYears} Years
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-[#E5DFD5] rounded-lg appearance-none cursor-pointer accent-[#B08A4E]"
              />
              <div className="flex justify-between text-[10px] text-[#716B5E] mt-1">
                <span>5 Yrs</span>
                <span>15 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Results Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#1F2326] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9A66B] block mb-1">
                MONTHLY COMMITMENT
              </span>
              <motion.div
                key={monthlyEmi}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-3xl sm:text-4xl font-serif font-bold text-white tabular-nums mb-4"
              >
                {formatCurrency(monthlyEmi)}
                <span className="text-xs font-normal text-white/60 ml-1">/ month</span>
              </motion.div>

              <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-[#D8CEBD]">
                <div className="flex justify-between">
                  <span>Principal Amount</span>
                  <span className="text-white font-semibold tabular-nums">
                    ₹{loanAmountLakhs} Lakhs
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest Payable</span>
                  <span className="text-white font-semibold tabular-nums">
                    {formatCurrency(totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10 text-white font-bold">
                  <span>Total Amount Payable</span>
                  <span className="text-[#C9A66B] tabular-nums">
                    {formatCurrency(totalPayment)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() =>
                  openLeadModal({
                    intent: "banking",
                    projectName: "Greenview Heights",
                    context: {
                      loanAmountLakhs,
                      interestRate,
                      tenureYears,
                    },
                    source: "emi_calculator_cta",
                  })
                }
                className="btn-bronze w-full py-3 px-4 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Talk to our Banking Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-white/50 text-center mt-2">
                Pre-approved with SBI, HDFC, ICICI, Bank of Baroda &amp; Axis Bank.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
