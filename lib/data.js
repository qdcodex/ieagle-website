import { CONTACT } from "./content";

export const SITE = {
  name: "iEagles",
  fullName: "iEagles Business Network",
  tagline: "Where Business Meets Purpose",
  pillars: "Connect • Grow • Serve • Transform",
  whatsapp: "918908905335",
  whatsappDisplay: "890 890 5335",
  email: CONTACT.email,
  website: CONTACT.website,
  address: CONTACT.address,
  partner: { name: "QDCodex", url: "https://github.com/qdcodex" }, // digital partner credit
  // Home hero background: true = animated 3D network globe. Set false to use
  // heroImage / heroVideo below instead.
  hero3d: true,
  // Hero background: set heroImage (e.g. "/hero.jpg" from /public). Leave it empty
  // ("") to use heroVideo instead (a full .mp4 URL or a file such as "/hero.mp4").
  heroImage: "/hero.jpg",
  heroVideo:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4",
  // Placeholder links — replace with the real profile URLs.
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
  },
};

export const wa = (text) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const NAV = [
  { label: "Home", href: "/" },
  {
    label: "About us",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about#who" },
      { label: "Vision", href: "/about#vision" },
      { label: "Mission", href: "/about#mission" },
      { label: "Core Values", href: "/about#values" },
      { label: "Our Objectives", href: "/about#objectives" },
      { label: "Origin", href: "/about#origin" },
      { label: "Hierarchy", href: "/about#hierarchy" },
      { label: "Social Responsibility", href: "/social-responsibility" },
      { label: "Partnerships", href: "/partnerships" },
    ],
  },
  {
    label: "iEagles Academy",
    href: "/academy",
    children: [
      { label: "Academy Programs", href: "/academy#academy" },
      { label: "Learning & Leadership", href: "/academy#learning" },
    ],
  },
  {
    label: "Programs & Events",
    href: "/programs",
    children: [
      { label: "Networking", href: "/programs#networking" },
      { label: "Business Development", href: "/programs#business-development" },
      { label: "Upcoming Events", href: "/events#upcoming" },
      { label: "Past Events", href: "/events#past" },
      { label: "Recognition & Awards", href: "/awards" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Become an iEagle", href: "/membership" },
      { label: "What Members Get", href: "/membership#benefits" },
      { label: "Membership Categories", href: "/membership#categories" },
      { label: "Why Join iEagles?", href: "/membership#why-join" },
      { label: "Testimonials", href: "/membership#testimonials" },
      { label: "Member Log in", href: "/member-login" },
    ],
  },
  {
    label: "Chapters",
    href: "/chapters",
    children: [
      { label: "Chapter Map", href: "/chapters#map" },
      { label: "Start a Chapter", href: "/chapters#start" },
    ],
  },
  {
    label: "Magazine",
    href: "/magazine",
    children: [
      { label: "Brand Your Business", href: "/magazine" },
      { label: "Sep, 2026 - Oct, 2026", href: "/magazine#sep-oct-2026" },
      { label: "Nov, 2026 - Dec, 2026", href: "/magazine#nov-dec-2026" },
      { label: "Submit Your Story", href: "/magazine#submit" },
      { label: "Advertise With Us", href: "/contact#advertise" },
    ],
  },
  {
    label: "Contact us",
    href: "/contact",
    // The Contact page lists every enquiry type; the menu shows only these four.
    children: [
      { label: "Membership Enquiry", href: "/contact#membership" },
      { label: "Business Partnership", href: "/contact#partnership" },
      { label: "Online Advertisement", href: "/contact#online-ad" },
      { label: "Sponsor a Event", href: "/contact#sponsor" },
    ],
  },
  { label: "Business Directory", href: "/business-directory", highlight: true },
];

// ---- Chapters (section 21: Kanyakumari District example) ----
// x / y place each chapter on the schematic district map (viewBox 480 x 350).
export const STATES = [
  {
    name: "Tamil Nadu",
    districts: [
      {
        name: "Kanyakumari District",
        chapters: [
          { slug: "karungal", name: "Karungal", x: 105, y: 195 },
          { slug: "nagercoil", name: "Nagercoil", x: 292, y: 222 },
          { slug: "thuckalay", name: "Thuckalay", x: 180, y: 154 },
          { slug: "marthandam", name: "Marthandam", x: 102, y: 93 },
          { slug: "colachel", name: "Colachel", x: 139, y: 224 },
          { slug: "monday-market", name: "Monday Market", x: 159, y: 172 },
        ],
      },
    ],
  },
];

export const CHAPTERS = STATES.flatMap((s) =>
  s.districts.flatMap((d) => d.chapters.map((c) => ({ ...c, state: s.name, district: d.name })))
);

// Per-chapter profile details. Fill these in as each chapter is formed.
// { director, directorPhone, members: [{ name, business }], meetings: [{ date, time, venue }] }
export const CHAPTER_DETAILS = {};

// ---- Business Directory (section 12) ----
export const INDUSTRIES = [
  "Trading & Retail",
  "Manufacturing",
  "Healthcare",
  "Education & Training",
  "Construction & Real Estate",
  "Food & Hospitality",
  "IT & Digital Services",
  "Professional Services",
];

// SAMPLE listings to show the layout — replace with real member profiles.
export const BUSINESSES = [
  {
    member: "Sample Member",
    designation: "Proprietor",
    company: "Sample Traders",
    industry: "Trading & Retail",
    products: "Wholesale groceries, household goods",
    chapter: "Nagercoil",
    area: "Nagercoil",
    description: "A sample listing showing how a member business appears in the iEagles directory.",
    website: "",
    sample: true,
  },
  {
    member: "Sample Member",
    designation: "Managing Director",
    company: "Sample Industries",
    industry: "Manufacturing",
    products: "Coir products, rubber goods",
    chapter: "Marthandam",
    area: "Marthandam",
    description: "A sample listing showing how a member business appears in the iEagles directory.",
    website: "",
    sample: true,
  },
  {
    member: "Sample Member",
    designation: "Chief Doctor",
    company: "Sample Clinic",
    industry: "Healthcare",
    products: "General consultation, diagnostics",
    chapter: "Thuckalay",
    area: "Thuckalay",
    description: "A sample listing showing how a member business appears in the iEagles directory.",
    website: "",
    sample: true,
  },
  {
    member: "Sample Member",
    designation: "Founder",
    company: "Sample Digital",
    industry: "IT & Digital Services",
    products: "Websites, digital marketing",
    chapter: "Colachel",
    area: "Colachel",
    description: "A sample listing showing how a member business appears in the iEagles directory.",
    website: "",
    sample: true,
  },
  {
    member: "Sample Member",
    designation: "Partner",
    company: "Sample Builders",
    industry: "Construction & Real Estate",
    products: "Residential construction, interiors",
    chapter: "Karungal",
    area: "Karungal",
    description: "A sample listing showing how a member business appears in the iEagles directory.",
    website: "",
    sample: true,
  },
  {
    member: "Sample Member",
    designation: "Director",
    company: "Sample Academy",
    industry: "Education & Training",
    products: "Skill training, tuition",
    chapter: "Monday Market",
    area: "Monday Market",
    description: "A sample listing showing how a member business appears in the iEagles directory.",
    website: "",
    sample: true,
  },
].map((b) => {
  const c = CHAPTERS.find((x) => x.name === b.chapter);
  return { ...b, state: c?.state ?? "", district: c?.district ?? "" };
});

// ---- Events (section 13) ----
// Upcoming: add real dates as they are confirmed. Past: add highlights after each event.
export const UPCOMING_EVENTS = [
  { title: "Business Networking Meeting", type: "Business Networking Meetings", date: "To be announced", place: "Nagercoil Chapter" },
  { title: "Expert Session", type: "Expert Session", date: "To be announced", place: "Kanyakumari District" },
  { title: "Business Conclave", type: "Business Conclave", date: "To be announced", place: "Kanyakumari District" },
];

export const PAST_EVENTS = [];
