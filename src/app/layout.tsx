import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { LeadModalProvider } from "@/context/LeadModalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import LeadModal from "@/components/LeadModal";
import VideoModal from "@/components/VideoModal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#F7F3EC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gloriousrealestates.in"),
  title: {
    default: `${siteConfig.name} | Luxury Homes & Commercial Spaces in Nanded`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Glorious Real Estates develops premium residential 2 & 3 BHK apartments, luxury villas, and commercial spaces in Nanded, Maharashtra. RERA approved, on-time delivery, transparent pricing.",
  keywords: [
    "Glorious Real Estates",
    "Real Estate Developers Nanded",
    "Flats in Nanded",
    "2 BHK in Nanded",
    "3 BHK in Nanded",
    "Greenview Heights Nanded",
    "Orchid Villas Nanded",
    "Pawdewadi Nanded property",
    "Luxury apartments Nanded",
    "MahaRERA approved Nanded",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gloriousrealestates.in",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Premium Homes in Nanded`,
    description: "Building Spaces You'll Call Home. Explore Greenview Heights and Orchid Villas in Nanded.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Luxury Residential Towers`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Luxury Homes in Nanded`,
    description: "Premium residences crafted with trust, quality, and timely delivery.",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop"],
  },
  alternates: {
    canonical: "https://gloriousrealestates.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data (Organization JSON-LD)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    description: siteConfig.subheadline,
    url: "https://gloriousrealestates.in",
    logo: "https://gloriousrealestates.in/images/logo.svg",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.1628",
      longitude: "77.2423",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "18:30",
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track', 'PageView');`,
            }}
          />
        )}
      </head>
      <body className="font-sans bg-[#F7F3EC] text-[#1F2326] min-h-screen flex flex-col selection:bg-[#B08A4E] selection:text-white antialiased">
        <LeadModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileStickyBar />
          <LeadModal />
          <VideoModal />
        </LeadModalProvider>
      </body>
    </html>
  );
}
