/**
 * Global Site Configuration & Contact Details
 * Defaults for generic customizable demo.
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  eyebrowText: string;
  headline: string;
  subheadline: string;
  city: string;
  state: string;
  country: string;
  address: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    formatted: string;
    googleMapsEmbedUrl: string;
    googleMapsLink: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    phoneTel: string;
    whatsapp: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
    email: string;
    visitingHours: string;
  };
  legal: {
    developerReraNumber: string;
    termsDisclaimer: string;
    copyright: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  stats: {
    yearsExperience: string;
    projectsDelivered: string;
    sqFtBuilt: string;
    legalClarity: string;
    happyFamilies: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Your Company",
  shortName: "Your Company",
  tagline: "Building Spaces You'll Call Home.",
  eyebrowText: "PREMIUM HOMES • BRIGHTER TOMORROW",
  headline: "Building Spaces You'll Call Home.",
  subheadline: "Premium residences crafted with trust, quality and timely delivery in Your City.",
  city: "Your City",
  state: "Maharashtra",
  country: "India",
  address: {
    street: "Near Airport Road",
    locality: "Pawdewadi",
    city: "Your City",
    state: "Maharashtra",
    pincode: "",
    formatted: "Pawdewadi, Your City, Maharashtra",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120562.83733075677!2d77.242278!3d19.162791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d6594d7c0001%3A0x6b189ff4c28f6e0b!2sMaharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    googleMapsLink: "https://maps.google.com/?q=Your+Company+Your+City",
  },
  contact: {
    phoneDisplay: "Your Phone No.",
    phoneTel: "+918080076322",
    whatsapp: "918080076322",
    phone: "+918080076322",
    whatsappNumber: "918080076322",
    whatsappDefaultMessage: "Hello, I would like to schedule a site visit and enquire about your premium residences.",
    email: "info@yourcompany.com",
    visitingHours: "Mon - Sat: 9:30 AM - 6:30 PM | Sun: By Appointment",
  },
  legal: {
    developerReraNumber: "",
    termsDisclaimer: "*Starting prices indicate base unit price. Government taxes, stamp duty, registration charges, and GST apply as per actuals. Specifications, amenities, and floor plans are subject to change as per competent authority approvals.",
    copyright: `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
  stats: {
    yearsExperience: "15+",
    projectsDelivered: "25+",
    sqFtBuilt: "5M+",
    legalClarity: "100%",
    happyFamilies: "500+",
  },
};

export default siteConfig;
