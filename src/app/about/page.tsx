import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: `About Us | 15+ Years of Excellence in ${siteConfig.city}`,
  description: `Learn about ${siteConfig.name}, ${siteConfig.city}'s trusted real estate developer with 15+ years of delivering landmark residential and commercial projects with 100% legal clarity.`,
};

export default function AboutPage() {
  return <AboutClient />;
}
