"use client";

import LeadSheet from "@/components/LeadSheet";

// Backward-compatible re-export: LeadModal now uses the unified intent-based LeadSheet
export default function LeadModal() {
  return <LeadSheet />;
}
