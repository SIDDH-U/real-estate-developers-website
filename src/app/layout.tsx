import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { LeadModalProvider } from "@/context/LeadModalContext";
import { DemoProvider } from "@/context/DemoContext";
import DemoStrip from "@/components/common/DemoStrip";
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
  metadataBase: new URL("https://yourcompany.com"),
  title: {
    default: `${siteConfig.name} | Luxury Homes & Commercial Spaces in ${siteConfig.city}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.name} develops premium residential 2 & 3 BHK apartments, luxury villas, and commercial spaces in ${siteConfig.city}, Maharashtra. RERA approved, on-time delivery, transparent pricing.`,
  keywords: [
    siteConfig.name,
    `Real Estate Developers ${siteConfig.city}`,
    `Flats in ${siteConfig.city}`,
    `2 BHK in ${siteConfig.city}`,
    `3 BHK in ${siteConfig.city}`,
    `Greenview Heights ${siteConfig.city}`,
    `Orchid Villas ${siteConfig.city}`,
    "Pawdewadi property",
    `Luxury apartments ${siteConfig.city}`,
    `MahaRERA approved ${siteConfig.city}`,
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yourcompany.com",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Premium Homes in ${siteConfig.city}`,
    description: "Building Spaces You'll Call Home. Explore Greenview Heights and Orchid Villas.",
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
    title: `${siteConfig.name} | Luxury Homes in ${siteConfig.city}`,
    description: "Premium residences crafted with trust, quality, and timely delivery.",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop"],
  },
  alternates: {
    canonical: "https://yourcompany.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    description: siteConfig.subheadline,
    url: "https://yourcompany.com",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
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

  const prepaintScript = `
(function() {
  try {
    var search = window.location.search;
    var params = new URLSearchParams(search);
    var s = window.sessionStorage;

    function clean(v, max) {
      if (!v) return "";
      return String(v).trim().slice(0, max || 60);
    }

    var pName = clean(params.get("name"), 60);
    var pCity = clean(params.get("city"), 60);
    var pPhone = clean(params.get("phone"), 60);
    var pInsta = clean(params.get("insta"), 60).replace(/^@+/, "");
    var pColor = clean(params.get("color"), 10);

    if (pColor && !/^#?[0-9a-fA-F]{6}$/.test(pColor)) {
      pColor = "";
    }

    if (s) {
      if (pName) s.setItem("demo_name", pName);
      if (pCity) s.setItem("demo_city", pCity);
      if (pPhone) s.setItem("demo_phone", pPhone);
      if (pInsta) s.setItem("demo_insta", pInsta);
      if (pColor) s.setItem("demo_color", pColor);
    }

    var name = pName || (s ? clean(s.getItem("demo_name"), 60) : "") || "Your Company";
    var city = pCity || (s ? clean(s.getItem("demo_city"), 60) : "") || "Your City";
    var color = pColor || (s ? clean(s.getItem("demo_color"), 10) : "") || "#B08A4E";
    if (!/^#?[0-9a-fA-F]{6}$/.test(color)) color = "#B08A4E";
    if (color.charAt(0) !== "#") color = "#" + color;

    var num = parseInt(color.slice(1), 16);
    var r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
    var lum = 0.2126 * Math.pow(r / 255, 2.2) + 0.7152 * Math.pow(g / 255, 2.2) + 0.0722 * Math.pow(b / 255, 2.2);
    var contrast = lum > 0.45 ? "#1F2326" : "#FFFFFF";

    var dark = "#" + [r * 0.82, g * 0.82, b * 0.82].map(function(x) {
      var h = Math.round(x).toString(16);
      return h.length === 1 ? "0" + h : h;
    }).join("");

    var light = "#" + [255 - (255 - r) * 0.82, 255 - (255 - g) * 0.82, 255 - (255 - b) * 0.82].map(function(x) {
      var h = Math.round(x).toString(16);
      return h.length === 1 ? "0" + h : h;
    }).join("");

    var tint = "rgba(" + r + "," + g + "," + b + ",0.12)";

    var root = document.documentElement;
    root.style.setProperty("--color-bronze", color);
    root.style.setProperty("--color-bronze-dark", dark);
    root.style.setProperty("--color-bronze-light", light);
    root.style.setProperty("--color-bronze-tint", tint);
    root.style.setProperty("--color-bronze-contrast", contrast);

    var dismissed = s && s.getItem("demo_strip_dismissed") === "1";
    root.style.setProperty("--demo-h", dismissed ? "0px" : "38px");

    if (name !== "Your Company" || city !== "Your City") {
      document.title = name + " | Luxury Homes & Commercial Spaces in " + city;
    }

    if (window.MutationObserver) {
      var obs = new MutationObserver(function() {
        var names = document.querySelectorAll("[data-demo-name]");
        for (var i = 0; i < names.length; i++) {
          if (names[i].textContent !== name) names[i].textContent = name;
        }
        var cities = document.querySelectorAll("[data-demo-city]");
        for (var j = 0; j < cities.length; j++) {
          if (cities[j].textContent !== city) cities[j].textContent = city;
        }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
      setTimeout(function() { obs.disconnect(); }, 4000);
    }
  } catch (e) {}
})();
  `;

  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          id="demo-prepaint"
          dangerouslySetInnerHTML={{ __html: prepaintScript }}
        />
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
      <body className="font-sans bg-[#F7F3EC] text-[#1F2326] min-h-screen flex flex-col selection:bg-[var(--color-bronze,#B08A4E)] selection:text-white antialiased">
        <DemoProvider>
          <LeadModalProvider>
            <DemoStrip />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileStickyBar />
            <LeadModal />
            <VideoModal />
          </LeadModalProvider>
        </DemoProvider>
      </body>
    </html>
  );
}
