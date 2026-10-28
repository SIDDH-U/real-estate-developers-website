"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export interface DemoConfig {
  name: string;
  city: string;
  phone: string;
  phoneDisplay: string;
  phoneLink: string;
  phoneTel: string;
  insta: string;
  instagramHandle: string;
  instagramUrl: string;
  color: string;
  contrastColor: string;
  isDismissed: boolean;
  dismissBanner: () => void;
  appendQuery: (href: string) => string;
  mapsSearchUrl: string;
  email: string;
}

const DEFAULT_NAME = "Your Company";
const DEFAULT_CITY = "Your City";
const DEFAULT_PHONE_DISPLAY = "Your Phone No.";
const DEFAULT_PHONE_DIGITS = "918080076322";
const DEFAULT_INSTA_HANDLE = "@yourinsta";
const DEFAULT_COLOR = "#B08A4E";
const DEFAULT_CONTRAST = "#FFFFFF";

function cleanString(val: string | null | undefined, maxLen = 60): string {
  if (!val) return "";
  return val.trim().slice(0, maxLen);
}

function validateHexColor(val: string | null | undefined): string | null {
  if (!val) return null;
  const cleaned = val.trim();
  if (/^#?[0-9a-fA-F]{6}$/.test(cleaned)) {
    return cleaned.startsWith("#") ? cleaned : `#${cleaned}`;
  }
  return null;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const num = parseInt(hex.slice(1), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function calculateLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const lum = calculateLuminance(r, g, b);
  return lum > 0.45 ? "#1F2326" : "#FFFFFF";
}

function computeShades(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const darkHex =
    "#" +
    [r * 0.82, g * 0.82, b * 0.82]
      .map((x) => {
        const h = Math.round(x).toString(16);
        return h.length === 1 ? `0${h}` : h;
      })
      .join("");
  const lightHex =
    "#" +
    [255 - (255 - r) * 0.82, 255 - (255 - g) * 0.82, 255 - (255 - b) * 0.82]
      .map((x) => {
        const h = Math.round(x).toString(16);
        return h.length === 1 ? `0${h}` : h;
      })
      .join("");
  const tint = `rgba(${r}, ${g}, ${b}, 0.12)`;
  return { darkHex, lightHex, tint };
}

function formatPhoneLinkDigits(rawPhone: string): string {
  if (!rawPhone || !rawPhone.trim()) {
    return DEFAULT_PHONE_DIGITS;
  }
  const digits = rawPhone.replace(/\D/g, "");
  if (!digits) return DEFAULT_PHONE_DIGITS;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

const DemoContext = createContext<DemoConfig | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  // Read initial values synchronously if available on client
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [city, setCity] = useState<string>(DEFAULT_CITY);
  const [phone, setPhone] = useState<string>("");
  const [insta, setInsta] = useState<string>("");
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [contrastColor, setContrastColor] = useState<string>(DEFAULT_CONTRAST);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const session = window.sessionStorage;

      const pName = cleanString(searchParams.get("name"));
      const pCity = cleanString(searchParams.get("city"));
      const pPhone = cleanString(searchParams.get("phone"));
      let pInsta = cleanString(searchParams.get("insta"));
      if (pInsta.startsWith("@")) pInsta = pInsta.replace(/^@+/, "");
      const pColor = validateHexColor(searchParams.get("color"));

      // If URL params exist, persist them into sessionStorage
      if (session) {
        if (pName) session.setItem("demo_name", pName);
        if (pCity) session.setItem("demo_city", pCity);
        if (pPhone) session.setItem("demo_phone", pPhone);
        if (pInsta) session.setItem("demo_insta", pInsta);
        if (pColor) session.setItem("demo_color", pColor);
      }

      // Read from URL, fallback to sessionStorage, fallback to default
      const finalName = pName || (session ? cleanString(session.getItem("demo_name")) : "") || DEFAULT_NAME;
      const finalCity = pCity || (session ? cleanString(session.getItem("demo_city")) : "") || DEFAULT_CITY;
      const finalPhone = pPhone || (session ? cleanString(session.getItem("demo_phone")) : "") || "";
      const finalInsta = pInsta || (session ? cleanString(session.getItem("demo_insta")) : "") || "";
      const storedColor = session ? validateHexColor(session.getItem("demo_color")) : null;
      const finalColor = pColor || storedColor || DEFAULT_COLOR;

      const dismissed = session ? session.getItem("demo_strip_dismissed") === "1" : false;

      setName(finalName);
      setCity(finalCity);
      setPhone(finalPhone);
      setInsta(finalInsta);
      setColor(finalColor);
      setIsDismissed(dismissed);

      // Compute contrast and apply CSS variables to root
      const contrast = getContrastColor(finalColor);
      setContrastColor(contrast);

      const root = document.documentElement;
      const shades = computeShades(finalColor);
      root.style.setProperty("--color-bronze", finalColor);
      root.style.setProperty("--color-bronze-dark", shades.darkHex);
      root.style.setProperty("--color-bronze-light", shades.lightHex);
      root.style.setProperty("--color-bronze-tint", shades.tint);
      root.style.setProperty("--color-bronze-contrast", contrast);
      root.style.setProperty("--demo-h", dismissed ? "0px" : "38px");

      // Update document title and meta tags if personalized
      if (finalName !== DEFAULT_NAME || finalCity !== DEFAULT_CITY) {
        document.title = `${finalName} | Luxury Homes & Commercial Spaces in ${finalCity}`;
      }
    } catch (e) {
      console.error("Error initializing demo params:", e);
    }
  }, []);

  // Global click listener to preserve query string on internal links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only touch internal relative paths like "/about", "/projects", etc.
      if (
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("/#") &&
        !href.startsWith("/api") &&
        !href.startsWith("/images") &&
        !href.startsWith("/downloads")
      ) {
        // If current window has search params, ensure anchor keeps them
        const currentSearch = window.location.search;
        if (currentSearch && !href.includes("?")) {
          anchor.setAttribute("href", `${href}${currentSearch}`);
        }
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, []);

  const dismissBanner = useCallback(() => {
    setIsDismissed(true);
    document.documentElement.style.setProperty("--demo-h", "0px");
    try {
      window.sessionStorage.setItem("demo_strip_dismissed", "1");
    } catch (e) {}
  }, []);

  const appendQuery = useCallback(
    (href: string): string => {
      if (typeof window === "undefined") return href;
      if (
        !href ||
        !href.startsWith("/") ||
        href.startsWith("//") ||
        href.startsWith("/api") ||
        href.startsWith("/images") ||
        href.startsWith("/downloads")
      ) {
        return href;
      }
      const search = window.location.search;
      if (!search) return href;
      if (href.includes("?")) return href;
      if (href.includes("#")) {
        const [path, hash] = href.split("#");
        return `${path}${search}#${hash}`;
      }
      return `${href}${search}`;
    },
    []
  );

  const phoneLink = useMemo(() => formatPhoneLinkDigits(phone), [phone]);
  const phoneDisplay = phone && phone.trim() ? phone.trim() : DEFAULT_PHONE_DISPLAY;
  const phoneTel = `+${phoneLink}`;

  const instagramHandle = insta && insta.trim() ? `@${insta.trim()}` : DEFAULT_INSTA_HANDLE;
  const instagramUrl = insta && insta.trim() ? `https://instagram.com/${insta.trim()}` : "https://instagram.com";

  const mapsSearchUrl = useMemo(
    () => `https://maps.google.com/?q=${encodeURIComponent(`${name} ${city}`)}`,
    [name, city]
  );

  const value = useMemo<DemoConfig>(
    () => ({
      name,
      city,
      phone,
      phoneDisplay,
      phoneLink,
      phoneTel,
      insta,
      instagramHandle,
      instagramUrl,
      color,
      contrastColor,
      isDismissed,
      dismissBanner,
      appendQuery,
      mapsSearchUrl,
      email: "info@yourcompany.com",
    }),
    [
      name,
      city,
      phone,
      phoneDisplay,
      phoneLink,
      phoneTel,
      insta,
      instagramHandle,
      instagramUrl,
      color,
      contrastColor,
      isDismissed,
      dismissBanner,
      appendQuery,
      mapsSearchUrl,
    ]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoConfig {
  const context = useContext(DemoContext);
  if (!context) {
    // Return safe default fallback if accessed outside provider
    return {
      name: DEFAULT_NAME,
      city: DEFAULT_CITY,
      phone: "",
      phoneDisplay: DEFAULT_PHONE_DISPLAY,
      phoneLink: DEFAULT_PHONE_DIGITS,
      phoneTel: `+${DEFAULT_PHONE_DIGITS}`,
      insta: "",
      instagramHandle: DEFAULT_INSTA_HANDLE,
      instagramUrl: "https://instagram.com",
      color: DEFAULT_COLOR,
      contrastColor: DEFAULT_CONTRAST,
      isDismissed: false,
      dismissBanner: () => {},
      appendQuery: (h) => h,
      mapsSearchUrl: `https://maps.google.com/?q=${encodeURIComponent(`${DEFAULT_NAME} ${DEFAULT_CITY}`)}`,
      email: "info@yourcompany.com",
    };
  }
  return context;
}
