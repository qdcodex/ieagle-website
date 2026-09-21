export const SITE = {
  name: "iEagle",
  tagline: "Service. Fellowship. Community.",
  whatsapp: "918908905335",
  whatsappDisplay: "890 890 5335",
  // Hero background: set heroImage (e.g. "/hero.jpg" from /public). Leave it empty
  // ("") to use heroVideo instead (a full .mp4 URL or a file such as "/hero.mp4").
  heroImage: "/hero.jpg",
  heroVideo:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4",
  // Placeholder links — replace with the real profile URLs.
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    x: "https://x.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/",
  },
};

export const NAV = [
  { label: "Home", href: "/" },
  {
    label: "About us",
    href: "/about",
    children: [
      { label: "Vision", href: "/about#vision" },
      { label: "Mission", href: "/about#mission" },
      { label: "Origin", href: "/about#origin" },
      { label: "Hierarchy", href: "/about#hierarchy" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Past Events", href: "/events#past" },
      { label: "Upcoming Events", href: "/events#upcoming" },
    ],
  },
  {
    label: "Member Log in",
    href: "/member-login",
    children: [
      { label: "Executive Members", href: "/member-login#executive" },
      { label: "Governing board", href: "/member-login#governing" },
      { label: "Chapter Members", href: "/member-login#chapter" },
    ],
  },
  {
    label: "Directory",
    href: "/directory",
    children: [
      { label: "State", href: "/directory#state" },
      { label: "District", href: "/directory#district" },
    ],
  },
  {
    label: "Newsletter",
    href: "/newsletter",
    children: [
      { label: "Sep, 2026 - Oct, 2026", href: "/newsletter#sep-oct-2026" },
      { label: "Nov, 2026 - Dec, 2026", href: "/newsletter#nov-dec-2026" },
    ],
  },
  {
    label: "Contact us",
    href: "/contact",
    children: [
      { label: "Newsletter", href: "/contact#newsletter" },
      { label: "Offline Advertisement", href: "/contact#offline-ad" },
      { label: "Online Advertisement", href: "/contact#online-ad" },
      { label: "Sponsor a Event", href: "/contact#sponsor" },
    ],
  },
  { label: "Business Directory", href: "/business-directory", highlight: true },
];

// Placeholder content — replace with real data.
export const STATES = {
  Kerala: ["Thiruvananthapuram", "Ernakulam", "Kozhikode", "Thrissur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Karnataka: ["Bengaluru Urban", "Mysuru", "Mangaluru"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
};

export const CATEGORIES = ["Food & Hospitality", "Healthcare", "Education", "Retail", "Construction", "IT Services"];

export const AREAS = ["City Centre", "Industrial Area", "Market Road", "Tech Park"];

export const BUSINESSES = [
  { name: "Sample Traders", state: "Kerala", district: "Ernakulam", area: "Market Road", category: "Retail" },
  { name: "Sample Clinic", state: "Kerala", district: "Thrissur", area: "City Centre", category: "Healthcare" },
  { name: "Sample Cafe", state: "Tamil Nadu", district: "Chennai", area: "City Centre", category: "Food & Hospitality" },
  { name: "Sample Infotech", state: "Karnataka", district: "Bengaluru Urban", area: "Tech Park", category: "IT Services" },
  { name: "Sample Builders", state: "Maharashtra", district: "Pune", area: "Industrial Area", category: "Construction" },
  { name: "Sample Academy", state: "Tamil Nadu", district: "Coimbatore", area: "City Centre", category: "Education" },
];

export const PAST_EVENTS = [
  { title: "Annual Charter Night", date: "Jan 2026", place: "Ernakulam" },
  { title: "Community Health Camp", date: "Mar 2026", place: "Chennai" },
  { title: "Tree Plantation Drive", date: "Jun 2026", place: "Bengaluru" },
];

export const UPCOMING_EVENTS = [
  { title: "Leadership Summit", date: "Oct 2026", place: "Kochi" },
  { title: "Diwali Charity Fair", date: "Nov 2026", place: "Pune" },
  { title: "Year-End Gala", date: "Dec 2026", place: "Chennai" },
];
