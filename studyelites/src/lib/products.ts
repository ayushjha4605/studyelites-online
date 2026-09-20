/**
 * Front-end catalog data for StudyElites.
 *
 * The AUTHORITATIVE prices live on the server in `src/lib/razorpay.ts` — the
 * server re-reads them when creating a Razorpay order, so the price shown here
 * can never be exploited to pay less. These constants are for display only.
 *
 * Product cover images live in `/public/covers/` and were generated
 * specifically for StudyElites. Replace them with real product artwork before
 * going live if desired.
 */

import type { LucideIcon } from "lucide-react";

export type CatalogItemDisplay = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceLabel: string; // formatted INR string e.g. "₹49"
  priceNote?: string;
  coverImage: string; // path to cover image in /public
  accent: string; // tailwind gradient classes (used if image fails)
  isSample: boolean;
  demoPdfUrl?: string; // optional free demo PDF preview
  topics: string[]; // list of topics covered (for product card "What's inside")
};

export const PRODUCTS: CatalogItemDisplay[] = [
  {
    id: "ssc-study-material",
    name: "SSC Study Material",
    tagline: "SSC CGL · CHSL · MTS · CPO",
    description:
      "Complete digital study material for SSC CGL, CHSL, MTS and CPO exams. Covers Quantitative Aptitude, General Intelligence & Reasoning, English Comprehension and General Awareness — theory, worked examples, shortcut techniques, previous-year question walkthroughs and topic-wise practice sets with detailed solutions.",
    priceLabel: "₹49",
    priceNote: "Digital download (PDF, ~200 pages)",
    coverImage: "/covers/ssc.png",
    accent: "from-blue-500/15 to-blue-600/5",
    isSample: true,
    demoPdfUrl: "/demo-ssc-cgl.pdf",
    topics: [
      "Quantitative Aptitude (Number System, Percentage, Profit-Loss, SI/CI, Time-Speed-Distance)",
      "General Intelligence & Reasoning (Series, Analogy, Coding-Decoding, Blood Relations)",
      "English Comprehension (Error spotting, Synonyms/Antonyms, Reading Comprehension)",
      "General Awareness (Polity, History, Geography, Economy, Science)",
      "Previous-year question walkthroughs",
      "Topic-wise quick-revision sheets",
    ],
  },
  {
    id: "banking-study-material",
    name: "Banking Study Material",
    tagline: "IBPS PO/Clerk · SBI PO/Clerk · RBI Grade-B",
    description:
      "Section-wise digital study material for IBPS PO/Clerk, SBI PO/Clerk and RBI Grade-B Prelims + Mains. Covers Reasoning Ability, English Language, Quantitative Aptitude, Banking Awareness and Computer Knowledge — with topic-wise theory, solved examples and practice sets in the latest exam pattern.",
    priceLabel: "₹49",
    priceNote: "Digital download (PDF, ~180 pages)",
    coverImage: "/covers/banking-v2.png",
    accent: "from-sky-500/15 to-sky-600/5",
    isSample: true,
    topics: [
      "Reasoning Ability (Puzzles, Seating Arrangement, Syllogism, Inequalities)",
      "English Language (Reading Comprehension, Cloze Test, Error Spotting)",
      "Quantitative Aptitude (Data Interpretation, Simplification, Number Series)",
      "Banking Awareness (RBI, Monetary Policy, Banking Products)",
      "Computer Knowledge (MS Office, Networking, Basics)",
      "Latest pattern questions with detailed solutions",
    ],
  },
  {
    id: "railway-study-material",
    name: "Railway Study Material",
    tagline: "RRB NTPC · Group D · ALP · JE",
    description:
      "Topic-wise digital study material for RRB NTPC, Group D, ALP and JE recruitment exams. Covers Mathematics, General Intelligence & Reasoning, General Science (Physics, Chemistry, Biology) and General Awareness — with theory, examples and practice sets aligned to the latest RRB syllabus.",
    priceLabel: "₹49",
    priceNote: "Digital download (PDF, ~170 pages)",
    coverImage: "/covers/railway.png",
    accent: "from-cyan-500/15 to-cyan-600/5",
    isSample: true,
    topics: [
      "Mathematics (Number System, Ratio, Time & Work, Mensuration)",
      "General Intelligence & Reasoning (Analogy, Classification, Series)",
      "General Science (Physics, Chemistry, Biology — 10th level)",
      "General Awareness (Current Affairs, Static GK)",
      "RRB previous-year questions",
      "Topic-wise practice sets with answers",
    ],
  },
  {
    id: "general-knowledge-notes",
    name: "General Knowledge Notes",
    tagline: "Static GK + Current Affairs one-liners",
    description:
      "Concise General Knowledge notes covering Static GK (Indian Polity, History, Geography, Economy) and high-yield Current Affairs one-liners. Designed for quick last-week revision across SSC, Banking, Railway and State-level exams.",
    priceLabel: "₹29",
    priceNote: "Digital download (PDF, ~120 pages)",
    coverImage: "/covers/gk-v2.png",
    accent: "from-indigo-500/15 to-indigo-600/5",
    isSample: true,
    topics: [
      "Indian Polity (Constitution, Fundamental Rights, Parliament)",
      "Indian History (Ancient, Medieval, Modern, Freedom Struggle)",
      "Indian & World Geography",
      "Indian Economy (Basic concepts, Banking, Budget)",
      "General Science quick notes",
      "200+ Current Affairs one-liners (last 8 months)",
    ],
  },
  {
    id: "quantitative-aptitude-pdf",
    name: "Quantitative Aptitude Practice PDF",
    tagline: "1000+ practice questions with solutions",
    description:
      "Topic-wise Quantitative Aptitude practice PDF with over 1000 questions across Number System, Percentage, Profit-Loss, Simple/Compound Interest, Time-Speed-Distance, Time & Work, Mensuration and Data Interpretation. Every question has a worked solution with shortcut where applicable.",
    priceLabel: "₹29",
    priceNote: "Digital download (PDF, ~150 pages)",
    coverImage: "/covers/quant.png",
    accent: "from-blue-600/15 to-indigo-600/5",
    isSample: true,
    topics: [
      "Number System (150+ questions)",
      "Percentage, Profit-Loss, Discount (180+ questions)",
      "Simple & Compound Interest (100+ questions)",
      "Time & Work, Pipes & Cisterns (120+ questions)",
      "Time-Speed-Distance, Trains, Boats (140+ questions)",
      "Mensuration + Data Interpretation sets",
      "Fully solved with shortcut techniques",
    ],
  },
  {
    id: "english-comprehension-notes",
    name: "English Language & Comprehension Notes",
    tagline: "SSC · Banking · Railway English",
    description:
      "Complete English Language notes covering Grammar rules, Vocabulary, Common Error patterns, Idioms & Phrases, One-word Substitutions, Synonyms/Antonyms, Sentence Improvement and Reading Comprehension strategy. Suitable for SSC CGL/CHSL, Banking PO/Clerk and Railway exams.",
    priceLabel: "₹29",
    priceNote: "Digital download (PDF, ~130 pages)",
    coverImage: "/covers/english.png",
    accent: "from-blue-500/15 to-cyan-600/5",
    isSample: true,
    topics: [
      "Grammar rules (Tense, Subject-Verb Agreement, Articles, Prepositions)",
      "Common Error Patterns with examples",
      "Idioms & Phrases (300+ entries)",
      "One-word Substitutions (250+ entries)",
      "Synonyms & Antonyms (high-yield list)",
      "Sentence Improvement + Cloze Test strategy",
      "Reading Comprehension strategy + practice",
    ],
  },
  {
    id: "upsc-civil-services-prelims",
    name: "UPSC Civil Services Prelims Notes",
    tagline: "UPSC CSE Prelims · General Studies Paper I",
    description:
      "Topic-wise digital notes for UPSC Civil Services Preliminary Examination (General Studies Paper I). Covers Indian Polity, Modern Indian History, Geography, Indian Economy, Environment & Ecology, General Science and Current Affairs — with theory, key facts, previous-year question patterns and quick-revision one-liners aligned to the latest UPSC syllabus.",
    priceLabel: "₹99",
    priceNote: "Digital download (PDF, ~250 pages)",
    coverImage: "/covers/upsc-v2.png",
    accent: "from-blue-700/15 to-indigo-700/5",
    isSample: true,
    topics: [
      "Indian Polity (Constitution, Parliament, Judiciary, Federalism)",
      "Modern Indian History (1757 - 1947, Freedom Struggle)",
      "Indian & World Geography (Physical, Human, Economic)",
      "Indian Economy (Basics, Banking, Budget, Planning)",
      "Environment & Ecology (Biodiversity, Conservation, Climate)",
      "General Science (Physics, Chemistry, Biology)",
      "Current Affairs (last 12 months, high-yield)",
      "Previous-year question patterns + topic-wise weightage",
    ],
  },
];

/**
 * Featured products shown on the Home page (premium pair). These are the
 * first two products shown to a visitor — typically the highest-value or
 * most popular exam categories.
 */
export const FEATURED_PRODUCTS: CatalogItemDisplay[] = [
  PRODUCTS.find((p) => p.id === "ssc-study-material")!,
  PRODUCTS.find((p) => p.id === "upsc-civil-services-prelims")!,
];

/**
 * Products shown on the Products page ("Browse more products"). Excludes the
 * featured pair already shown on Home so users don't see the same card twice.
 */
export const MORE_PRODUCTS: CatalogItemDisplay[] = [
  "banking-study-material",
  "railway-study-material",
  "general-knowledge-notes",
  "quantitative-aptitude-pdf",
]
  .map((id) => PRODUCTS.find((p) => p.id === id)!)
  .filter(Boolean);

export const MEMBERSHIP: CatalogItemDisplay = {
  id: "membership-30day",
  name: "StudyElites 30-Day Membership",
  tagline: "Full access to all 6 products + Telegram community",
  description:
    "30-day access to StudyElites educational study materials and the associated Telegram educational community. After successful Razorpay payment, the Telegram invite link appears on the Membership page.",
  priceLabel: "₹29",
  priceNote: "30-day access · one-time payment",
  coverImage: "/covers/membership.png",
  accent: "from-blue-600/20 to-indigo-600/10",
  isSample: false,
  topics: [],
};

export const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "membership", label: "Membership" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export type PageId = "home" | "products" | "membership" | "about" | "contact";

export type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
