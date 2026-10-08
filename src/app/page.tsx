import React from "react";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ProjectsSection from "@/components/home/ProjectsSection";
import FeaturedProjectSection from "@/components/home/FeaturedProjectSection";
import EmiCalculatorSection from "@/components/home/EmiCalculatorSection";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import LocationAdvantageSection from "@/components/home/LocationAdvantageSection";
import ConstructionSection from "@/components/home/ConstructionSection";
import HowBuyingWorksSection from "@/components/home/HowBuyingWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";
import HairlineDivider from "@/components/common/HairlineDivider";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: Full-bleed high contrast picture with Ken Burns */}
      <Hero />
      <HairlineDivider />

      {/* 2. Trust strip (Why Us): #F7F3EC */}
      <TrustStrip />
      <HairlineDivider />

      {/* 3. Our Projects: #FBF8F2 */}
      <ProjectsSection />
      <HairlineDivider />

      {/* 4. Featured Project Spotlight: #F7F3EC */}
      <FeaturedProjectSection />
      <HairlineDivider />

      {/* 5. EMI Calculator: #FBF8F2 */}
      <EmiCalculatorSection />
      <HairlineDivider />

      {/* 6. Amenities & Lifestyle: #F7F3EC */}
      <AmenitiesSection />
      <HairlineDivider />

      {/* 7. Location Advantage: #FBF8F2 */}
      <LocationAdvantageSection />
      <HairlineDivider />

      {/* 8. Construction & Quality: #F7F3EC */}
      <ConstructionSection />
      <HairlineDivider />

      {/* 9. How Buying Works: #1F3D2F (Deep Forest Green for rhythm) */}
      <HowBuyingWorksSection />
      <HairlineDivider />

      {/* 10. Testimonials: #FBF8F2 */}
      <TestimonialsSection />
      <HairlineDivider />

      {/* 11. FAQ Accordion: #F7F3EC */}
      <FaqSection />
      <HairlineDivider />

      {/* 12. CTA Lead Banner */}
      <CtaBanner />
    </>
  );
}
