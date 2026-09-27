// Plain constants for the chapter forms — safe to import in client components.

/** Numeric follow-up columns, in sheet order. */
export const FOLLOWUP_FIELDS = [
  { k: "businessGiven", label: "Business Given", money: true },
  { k: "businessReceived", label: "Business Received", money: true },
  { k: "oneToOne", label: "1 to 1" },
  { k: "mrPerfect", label: "Mr. Perfect", flag: true },
  { k: "earlyBird", label: "Early Bird", flag: true },
  { k: "trainings", label: "Trainings" },
  { k: "conference", label: "Conference" },
];
/** Fields a member may fill in for themselves (attendance / awards are set by admins). */
export const MEMBER_EDITABLE = ["businessGiven", "businessReceived", "oneToOne", "trainings", "conference"];

// Business categories from the "List of Category" sheet (spelling corrected).
export const DEFAULT_CATEGORIES = [
  "Advertisement News Paper", "Advertisement Radio", "Advertisement Television", "Advertising & Marketing", "Advocate",
  "Agri Products", "Agriculture", "Auditors", "Baker", "Banking", "Beautician", "Building Materials", "Car Show Room",
  "Carpenter", "Catering", "Cleaning Products", "Computer Software Consult", "Constructions", "Corporate Events",
  "Courier Service", "Crackers", "Dance Studio", "Dental Hospital", "Document Writer", "Elder Care Consulting",
  "Event Management", "Event Planner", "Event Rentals", "Furniture Mart", "Indoor Plant Service", "Insurance - Health",
  "Insurance - Vehicle", "Interiors", "Inter-Lock", "IT Services", "Jeweler", "Jewellers", "Jewellery", "Jewelry-Fashion",
  "Landscape Architect", "Logistics", "Logistics & Supply Chain", "Make-up Artist", "Musical Institution", "Pet Clinic",
  "Pharmacy", "Photographer", "Printers", "Printing Services", "Real Estate", "Restaurant Non-Veg", "Restaurant Veg",
  "Restaurants", "Retail Stores", "School", "Shipping & Freight", "Solar", "Sports Shop", "Steel Fabrication",
  "Telecom Consulting", "Tiles Shop",
];
export const CATEGORY_SLOTS = 3; // members per category in a chapter
