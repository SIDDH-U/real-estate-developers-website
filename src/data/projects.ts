/**
 * Typed Real Estate Projects Data File (CMS-Ready)
 * Contains all project metadata, specs, floor plans, and construction timeline data.
 */

export type ProjectStatus = "Ready to Move" | "Under Construction" | "Upcoming" | "Possession Soon";
export type ProjectCategory = "Residential" | "Villas" | "Commercial" | "Plots";

export interface FloorPlan {
  id: string;
  name: string;
  type: string;
  carpetArea: string;
  superBuiltUpArea: string;
  priceEstimate: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  image: string;
  description: string;
}

export interface ConstructionMilestone {
  stage: string;
  date: string;
  percentage: number;
  description: string;
  completed: boolean;
  image?: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  category: "Recreation" | "Wellness" | "Security" | "Eco" | "Convenience";
  iconName: string;
  image: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  statusColor: "emerald" | "amber" | "blue";
  featured: boolean;
  location: {
    area: string;
    city: string;
    fullAddress: string;
    landmark: string;
    googleMapsEmbedUrl?: string;
  };
  pricing: {
    startingPrice: string;
    numericPriceLakhs: number; // for sorting/filtering
    pricePrefix: string;
    priceUnit: string;
    termsNote: string;
  };
  configurations: string; // e.g. "2 & 3 BHK Premium Residences"
  carpetAreaRange: string;
  superBuiltUpRange: string;
  possessionDate: string;
  reraNumber?: string; // Optional: renders badge ONLY when present and non-empty
  heroImage: string;
  galleryImages: string[];
  overview: string;
  highlights: string[];
  amenities: AmenityItem[];
  floorPlans: FloorPlan[];
  constructionMilestones: ConstructionMilestone[];
  brochureUrl?: string;
  walkthroughVideoUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: "proj-greenview-heights",
    slug: "greenview-heights",
    title: "Greenview Heights",
    tagline: "2 & 3 BHK Premium Residences",
    category: "Residential",
    status: "Under Construction",
    statusColor: "emerald",
    featured: true,
    location: {
      area: "Pawdewadi",
      city: "Your City",
      fullAddress: "Pawdewadi Bypass, Near Airport Road",
      landmark: "5 mins from Nanded Airport Road",
    },
    pricing: {
      startingPrice: "₹ 45 Lakhs*",
      numericPriceLakhs: 45,
      pricePrefix: "Starting from",
      priceUnit: "₹ 45 Lakhs*",
      termsNote: "*Starting price for 2 BHK standard unit. Taxes, stamp duty and registration charges extra.",
    },
    configurations: "2 & 3 BHK Premium Residences",
    carpetAreaRange: "680 - 1,020 sq ft",
    superBuiltUpRange: "850 - 1,350 sq ft",
    possessionDate: "Dec 2027",
    reraNumber: "P52200031876", // Official RERA format
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    ],
    overview:
      "Greenview Heights stands as a beacon of modern luxury in Pawdewadi. Designed for families seeking contemporary architecture combined with tranquil open greens, each residence is Vastu-compliant, well-ventilated, and finished with top-tier Italian marble and bespoke fixtures.",
    highlights: [
      "Prime location in Pawdewadi with wide 4-lane access",
      "3-tier 24x7 biometric & CCTV security surveillance",
      "Expansive 20,000 sq ft clubhouse with temperature-controlled pool",
      "100% DG backup for common amenities and elevators",
      "80% open lush landscaped recreational area",
      "Approved by all leading nationalized & private banks",
    ],
    amenities: [
      {
        id: "am-clubhouse",
        title: "Grand Clubhouse",
        description: "Opulent multi-level clubhouse with indoor badminton court, banquet hall, and coffee lounge.",
        category: "Recreation",
        iconName: "Building2",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "am-pool",
        title: "Infinity Swimming Pool",
        description: "Resort-style azure swimming pool with kids' splash pool and wooden sundeck loungers.",
        category: "Wellness",
        iconName: "Waves",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "am-garden",
        title: "Landscaped Zen Garden",
        description: "Acre-wide botanical gardens with walking paths, gazebos, and meditation lawns.",
        category: "Eco",
        iconName: "Trees",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "am-gym",
        title: "Fully Equipped Fitness Center",
        description: "State-of-the-art gym with cardiovascular machines, free weights, and dedicated yoga zone.",
        category: "Wellness",
        iconName: "Dumbbell",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    floorPlans: [
      {
        id: "fp-2bhk-classic",
        name: "2 BHK Luxury Suite",
        type: "2 BHK",
        carpetArea: "720 sq ft",
        superBuiltUpArea: "950 sq ft",
        priceEstimate: "₹ 45 Lakhs*",
        bedrooms: 2,
        bathrooms: 2,
        balconies: 2,
        image: "/images/floor-plan-schematic.svg",
        description: "Intelligently planned 2 BHK residence with zero wasted space, sunlit living hall, and private master balcony.",
      },
      {
        id: "fp-3bhk-grand",
        name: "3 BHK Presidential Suite",
        type: "3 BHK",
        carpetArea: "1,040 sq ft",
        superBuiltUpArea: "1,350 sq ft",
        priceEstimate: "₹ 62 Lakhs*",
        bedrooms: 3,
        bathrooms: 3,
        balconies: 3,
        image: "/images/floor-plan-schematic.svg",
        description: "Palatial 3 BHK layout featuring a grand living and dining foyer, walk-in wardrobe provision, and wraparound balconies.",
      },
    ],
    constructionMilestones: [
      {
        stage: "Foundation & Substructure",
        date: "Completed Jan 2025",
        percentage: 100,
        description: "Deep piling, RCC raft foundation, and subterranean parking levels completed with waterproofing.",
        completed: true,
      },
      {
        stage: "Tower RCC Superstructure",
        date: "In Progress (Floor 14 of 18)",
        percentage: 75,
        description: "High-grade M40 concrete frame rising steadily with advanced aluminum formwork.",
        completed: false,
      },
      {
        stage: "Brickwork & Internal Plastering",
        date: "Estimated June 2026",
        percentage: 40,
        description: "AAC block masonry and concealed plumbing underway across lower ten levels.",
        completed: false,
      },
      {
        stage: "Finishing & Handover",
        date: "Target Dec 2027",
        percentage: 10,
        description: "Exterior glazing, elevators installation, landscape finishing, and OC procurement.",
        completed: false,
      },
    ],
    brochureUrl: "/downloads/greenview-heights-brochure.pdf",
    walkthroughVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "proj-orchid-villas",
    slug: "orchid-villas",
    title: "Orchid Villas",
    tagline: "3 & 4 BHK Luxury Gated Community Villas",
    category: "Villas",
    status: "Under Construction",
    statusColor: "amber",
    featured: false,
    location: {
      area: "VIP Road Extension",
      city: "Your City",
      fullAddress: "Plot 42, VIP Road Extension, Near Medical College",
      landmark: "Opposite Riverview Greens",
    },
    pricing: {
      startingPrice: "₹ 1.25 Cr*",
      numericPriceLakhs: 125,
      pricePrefix: "Starting from",
      priceUnit: "₹ 1.25 Cr*",
      termsNote: "*Starting price for 3 BHK independent villa with private yard. Government statutory charges extra.",
    },
    configurations: "3 & 4 BHK Luxury Villas",
    carpetAreaRange: "1,800 - 2,650 sq ft",
    superBuiltUpRange: "2,200 - 3,200 sq ft",
    possessionDate: "March 2027",
    reraNumber: "P52200032941",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    ],
    overview:
      "Orchid Villas redefines exclusivity with limited-edition duplex and triplex independent residences. Nestled within private landscaped courtyards, each villa offers private terrace gardens, dedicated covered dual car porches, and high-ceiling formal living areas.",
    highlights: [
      "Exclusive gated enclave of only 48 designer villas",
      "Private lawn and rooftop terrace with pergola",
      "Double height ceilings in formal living rooms",
      "Solar powered water heating and rooftop solar provision",
      "24x7 clubhouse access with private tennis court",
    ],
    amenities: [
      {
        id: "am-villa-club",
        title: "Private Community Clubhouse",
        description: "Bespoke club with billiard lounge, cigar room, and private party hall.",
        category: "Recreation",
        iconName: "Building2",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "am-villa-lawn",
        title: "Pergola Gardens",
        description: "Tranquil walking boulevards lined with flowering tabebuia trees.",
        category: "Eco",
        iconName: "Trees",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    floorPlans: [
      {
        id: "fp-villa-3bhk",
        name: "3 BHK Royal Villa",
        type: "3 BHK Villa",
        carpetArea: "1,950 sq ft",
        superBuiltUpArea: "2,400 sq ft",
        priceEstimate: "₹ 1.25 Cr*",
        bedrooms: 3,
        bathrooms: 4,
        balconies: 3,
        image: "/images/floor-plan-schematic.svg",
        description: "G+1 duplex villa with private rear lawn, servant quarters, and open modular kitchen.",
      },
    ],
    constructionMilestones: [
      {
        stage: "Plot Development & Roads",
        date: "Completed Oct 2024",
        percentage: 100,
        description: "Internal 30-foot paved roads, underground drainage, and electrical trenches completed.",
        completed: true,
      },
      {
        stage: "Villa Structure Construction",
        date: "Underway",
        percentage: 60,
        description: "First 24 villas framed up to terrace level.",
        completed: false,
      },
    ],
  },
  {
    id: "proj-riverside-enclave",
    slug: "riverside-enclave",
    title: "Riverside Enclave",
    tagline: "Serene Waterfront 2 & 3 BHK Living",
    category: "Residential",
    status: "Upcoming",
    statusColor: "blue",
    featured: false,
    location: {
      area: "Godavari Riverfront",
      city: "Your City",
      fullAddress: "Godavari Riverfront Promenade",
      landmark: "Adjacent to Ghat Garden Promenade",
    },
    pricing: {
      startingPrice: "₹ 52 Lakhs*",
      numericPriceLakhs: 52,
      pricePrefix: "Starting from",
      priceUnit: "₹ 52 Lakhs*",
      termsNote: "*Pre-launch indicative price for 2 BHK riverfront apartment. Expression of interest open.",
    },
    configurations: "2 & 3 BHK River-View Residences",
    carpetAreaRange: "780 - 1,180 sq ft",
    superBuiltUpRange: "980 - 1,480 sq ft",
    possessionDate: "Late 2028",
    reraNumber: "P52200034112",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
    ],
    overview:
      "Riverside Enclave brings refreshing waterfront breezes into your home every morning. Overlooking the serene Godavari riverbank, this upcoming masterpiece delivers uninterrupted skyline views, lush riverwalk pathways, and tranquil sunset balconies.",
    highlights: [
      "Unobstructed panoramic Godavari river views",
      "Direct walking access to the paved riverfront jogging track",
      "Eco-smart design with rainwater harvesting and greywater reuse",
      "Pre-launch special booking benefits for early investors",
    ],
    amenities: [
      {
        id: "am-river-deck",
        title: "Sunset River Deck",
        description: "Elevated viewing deck with telescope lounge and tranquil seating.",
        category: "Recreation",
        iconName: "Waves",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    floorPlans: [
      {
        id: "fp-river-2bhk",
        name: "2 BHK Waterfront",
        type: "2 BHK",
        carpetArea: "810 sq ft",
        superBuiltUpArea: "1,040 sq ft",
        priceEstimate: "₹ 52 Lakhs*",
        bedrooms: 2,
        bathrooms: 2,
        balconies: 2,
        image: "/images/floor-plan-schematic.svg",
        description: "Optimized floor plan with living room opening directly to the river-facing deck.",
      },
    ],
    constructionMilestones: [
      {
        stage: "Approvals & Master Planning",
        date: "In Final Approval Stage",
        percentage: 95,
        description: "Environmental clearance and municipal master sanction approvals in place.",
        completed: false,
      },
    ],
  },
  {
    id: "proj-landmark-square",
    slug: "glorious-square",
    title: "Landmark Square",
    tagline: "High-Street Retail Shops & Corporate Offices",
    category: "Commercial",
    status: "Under Construction",
    statusColor: "amber",
    featured: false,
    location: {
      area: "Shivaji Nagar Main Road",
      city: "Your City",
      fullAddress: "Shivaji Nagar Commercial Hub",
      landmark: "Opposite District Court Complex",
    },
    pricing: {
      startingPrice: "₹ 35 Lakhs*",
      numericPriceLakhs: 35,
      pricePrefix: "Starting from",
      priceUnit: "₹ 35 Lakhs*",
      termsNote: "*Starting price for retail shop space. Rental yield guarantee schemes available for investors.",
    },
    configurations: "Shops & Grade-A Offices",
    carpetAreaRange: "280 - 2,400 sq ft",
    superBuiltUpRange: "380 - 3,200 sq ft",
    possessionDate: "June 2027",
    reraNumber: "P52200033488",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop",
    ],
    overview:
      "Landmark Square is a landmark commercial destination. Featuring high-visibility street frontages for flagship retail brands, upscale boutique clinics, and tech-ready corporate suites with high-speed elevators and multi-level automated basement car parking.",
    highlights: [
      "Massive 120-foot frontage on prime commercial transit corridor",
      "14-foot ceiling height for ground floor retail units",
      "3 high-speed Otis elevators & dedicated goods elevator",
      "Expected 8-10% rental yield in prime commercial center",
    ],
    amenities: [
      {
        id: "am-sq-parking",
        title: "Multi-Level Automated Parking",
        description: "Seamless parking capacity for 150+ cars and 300+ two-wheelers.",
        category: "Convenience",
        iconName: "Building2",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    floorPlans: [
      {
        id: "fp-shop-ground",
        name: "Ground Floor Premium Shop",
        type: "Retail Shop",
        carpetArea: "320 sq ft",
        superBuiltUpArea: "450 sq ft",
        priceEstimate: "₹ 35 Lakhs*",
        bedrooms: 0,
        bathrooms: 1,
        balconies: 0,
        image: "/images/floor-plan-schematic.svg",
        description: "Double height storefront shop with direct road visibility and signage space.",
      },
    ],
    constructionMilestones: [
      {
        stage: "Basement Parking Slabs",
        date: "Completed Feb 2025",
        percentage: 100,
        description: "Double basement concrete slab casting and retaining walls finished.",
        completed: true,
      },
      {
        stage: "Commercial Slabs",
        date: "In Progress",
        percentage: 55,
        description: "Ground plus 4 commercial floor framing ongoing.",
        completed: false,
      },
    ],
  },
];

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  role: string;
  projectName: string;
  projectSlug: string;
  quote: string;
  rating: number;
  date: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Mr. & Mrs. Patil",
    initials: "MP",
    role: "Homeowner",
    projectName: "Greenview Heights",
    projectSlug: "greenview-heights",
    quote: "Smooth process, transparent pricing and great support throughout. Very happy with our new home! The construction updates gave our family complete confidence.",
    rating: 5,
    date: "January 2026",
  },
  {
    id: "test-2",
    name: "Sameer Kulkarni",
    initials: "SK",
    role: "Chartered Accountant & Investor",
    projectName: "Greenview Heights",
    projectSlug: "greenview-heights",
    quote: "Excellent construction quality and on-time delivery. Truly a trustworthy developer with 100% legal clarity. Their attention to material quality stands out.",
    rating: 5,
    date: "December 2025",
  },
  {
    id: "test-3",
    name: "The Deshmukh Family",
    initials: "DF",
    role: "Villa Owner",
    projectName: "Orchid Villas",
    projectSlug: "orchid-villas",
    quote: "The team was very professional and helpful. Truly a trustworthy developer! The open spaces and clubhouse amenities exceeded our expectations.",
    rating: 5,
    date: "February 2026",
  },
];

export interface BuyingStep {
  stepNumber: number;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export const buyingStepsData: BuyingStep[] = [
  {
    stepNumber: 1,
    title: "Enquire",
    tagline: "Share your details",
    description: "Connect with our certified sales advisors via call, WhatsApp, or our quick form to receive pricing sheets and floor layouts.",
    iconName: "FileText",
  },
  {
    stepNumber: 2,
    title: "Site Visit",
    tagline: "Explore the project",
    description: "Experience our luxury sample flats, examine material quality on-site, and tour the project neighborhood with our dedicated guide.",
    iconName: "Calendar",
  },
  {
    stepNumber: 3,
    title: "Book",
    tagline: "Complete the booking",
    description: "Select your preferred unit, lock your pre-launch price, and finalize paperwork with transparent documentation and bank loan assistance.",
    iconName: "FileCheck",
  },
  {
    stepNumber: 4,
    title: "Handover",
    tagline: "Move into your home",
    description: "Receive key possession on committed schedule with full OC certification, warranty documentation, and welcome home ceremony.",
    iconName: "Key",
  },
];
