import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | 2 & 3 BHK in ${project.location.area}, Nanded`,
    description: `${project.title} by Glorious Real Estates in ${project.location.area}, Nanded. ${project.configurations}, pricing ${project.pricing.startingPrice}. ${project.overview}`,
    openGraph: {
      title: `${project.title} - Glorious Real Estates Nanded`,
      description: project.overview,
      images: [{ url: project.heroImage, width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // RealEstateListing JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.title,
    description: project.overview,
    image: project.heroImage,
    address: {
      "@type": "PostalAddress",
      streetAddress: project.location.fullAddress,
      addressLocality: project.location.city,
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    offers: {
      "@type": "Offer",
      price: project.pricing.numericPriceLakhs * 100000,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
