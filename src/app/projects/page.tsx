import React from "react";
import type { Metadata } from "next";
import ProjectsListingClient from "./ProjectsListingClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `All Projects | Premium Residences & Commercial Spaces in ${siteConfig.city}`,
  description: `Explore all residential and commercial real estate projects in ${siteConfig.city} by ${siteConfig.name}. 100% legal clarity, prime locations, and M40 construction quality.`,
};

export default function ProjectsPage() {
  return <ProjectsListingClient />;
}
