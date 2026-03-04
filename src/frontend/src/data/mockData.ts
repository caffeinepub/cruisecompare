import type { Carrier, CruiseDeal, Destination } from "../backend.d";

export const MOCK_DEALS: CruiseDeal[] = [
  {
    id: "1",
    cruiseLine: "Royal Caribbean",
    shipName: "Wonder of the Seas",
    destination: "Caribbean",
    departurePort: "Miami, FL",
    durationNights: BigInt(7),
    pricePerPerson: 899,
    currency: "USD",
    discountPct: BigInt(15),
    rating: 4.8,
    highlights: [
      "Perfect Day at CocoCay",
      "Nassau, Bahamas",
      "Charlotte Amalie, St. Thomas",
    ],
  },
  {
    id: "2",
    cruiseLine: "Norwegian Cruise Line",
    shipName: "Norwegian Prima",
    destination: "Mediterranean",
    departurePort: "Barcelona, Spain",
    durationNights: BigInt(10),
    pricePerPerson: 1249,
    currency: "USD",
    discountPct: BigInt(10),
    rating: 4.6,
    highlights: [
      "Rome (Civitavecchia)",
      "Santorini, Greece",
      "Athens, Greece",
      "Dubrovnik, Croatia",
    ],
  },
  {
    id: "3",
    cruiseLine: "Carnival Cruise Line",
    shipName: "Carnival Celebration",
    destination: "Caribbean",
    departurePort: "Port Canaveral, FL",
    durationNights: BigInt(5),
    pricePerPerson: 549,
    currency: "USD",
    discountPct: BigInt(20),
    rating: 4.3,
    highlights: ["Nassau, Bahamas", "Half Moon Cay", "Grand Turk"],
  },
  {
    id: "4",
    cruiseLine: "Celebrity Cruises",
    shipName: "Celebrity Beyond",
    destination: "Mediterranean",
    departurePort: "Rome, Italy",
    durationNights: BigInt(12),
    pricePerPerson: 1899,
    currency: "USD",
    discountPct: BigInt(5),
    rating: 4.9,
    highlights: ["Athens, Greece", "Mykonos", "Venice, Italy", "Dubrovnik"],
  },
  {
    id: "5",
    cruiseLine: "Princess Cruises",
    shipName: "Discovery Princess",
    destination: "Alaska",
    departurePort: "Seattle, WA",
    durationNights: BigInt(7),
    pricePerPerson: 999,
    currency: "USD",
    discountPct: BigInt(0),
    rating: 4.7,
    highlights: ["Glacier Bay National Park", "Skagway", "Juneau", "Ketchikan"],
  },
  {
    id: "6",
    cruiseLine: "MSC Cruises",
    shipName: "MSC Seashore",
    destination: "Mediterranean",
    departurePort: "Genoa, Italy",
    durationNights: BigInt(7),
    pricePerPerson: 749,
    currency: "USD",
    discountPct: BigInt(12),
    rating: 4.4,
    highlights: [
      "Palermo, Sicily",
      "Valletta, Malta",
      "Barcelona",
      "Marseille",
    ],
  },
  {
    id: "7",
    cruiseLine: "Disney Cruise Line",
    shipName: "Disney Fantasy",
    destination: "Caribbean",
    departurePort: "Port Canaveral, FL",
    durationNights: BigInt(7),
    pricePerPerson: 2199,
    currency: "USD",
    discountPct: BigInt(0),
    rating: 4.9,
    highlights: [
      "Castaway Cay (Private Island)",
      "Grand Cayman",
      "Cozumel, Mexico",
    ],
  },
  {
    id: "8",
    cruiseLine: "Virgin Voyages",
    shipName: "Scarlet Lady",
    destination: "Caribbean",
    departurePort: "Miami, FL",
    durationNights: BigInt(4),
    pricePerPerson: 699,
    currency: "USD",
    discountPct: BigInt(25),
    rating: 4.7,
    highlights: ["The Beach Club at Bimini", "Costa Maya, Mexico", "Cozumel"],
  },
  {
    id: "9",
    cruiseLine: "Holland America Line",
    shipName: "Nieuw Amsterdam",
    destination: "Alaska",
    departurePort: "Vancouver, BC",
    durationNights: BigInt(14),
    pricePerPerson: 1599,
    currency: "USD",
    discountPct: BigInt(8),
    rating: 4.6,
    highlights: ["Hubbard Glacier", "Sitka", "Juneau", "Tracy Arm Fjord"],
  },
  {
    id: "10",
    cruiseLine: "Cunard",
    shipName: "Queen Mary 2",
    destination: "Europe",
    departurePort: "Southampton, UK",
    durationNights: BigInt(14),
    pricePerPerson: 2499,
    currency: "USD",
    discountPct: BigInt(0),
    rating: 4.8,
    highlights: ["Transatlantic Crossing", "New York City", "Halifax, Canada"],
  },
];

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "caribbean",
    name: "Caribbean",
    description:
      "Crystal-clear waters, white sand beaches, and vibrant island culture await.",
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    description:
      "Ancient history, sun-drenched coastlines, and world-class cuisine.",
  },
  {
    id: "alaska",
    name: "Alaska",
    description:
      "Breathtaking glaciers, wildlife, and pristine wilderness adventures.",
  },
  {
    id: "europe",
    name: "Europe",
    description:
      "Iconic cities, charming ports, and centuries of culture and art.",
  },
  {
    id: "asia",
    name: "Asia",
    description:
      "Exotic temples, vibrant street life, and stunning natural landscapes.",
  },
];

export const MOCK_CARRIERS: Carrier[] = [
  { id: "royal-caribbean", name: "Royal Caribbean" },
  { id: "ncl", name: "Norwegian Cruise Line" },
  { id: "carnival", name: "Carnival Cruise Line" },
  { id: "celebrity", name: "Celebrity Cruises" },
  { id: "princess", name: "Princess Cruises" },
  { id: "msc", name: "MSC Cruises" },
  { id: "disney", name: "Disney Cruise Line" },
  { id: "virgin", name: "Virgin Voyages" },
  { id: "holland", name: "Holland America Line" },
  { id: "cunard", name: "Cunard" },
];

// Cruise line color map for visual identity
export const CRUISE_LINE_COLORS: Record<string, string> = {
  "Royal Caribbean": "from-blue-600 to-blue-800",
  "Norwegian Cruise Line": "from-red-600 to-red-800",
  "Carnival Cruise Line": "from-red-500 to-orange-600",
  "Celebrity Cruises": "from-slate-600 to-slate-800",
  "Princess Cruises": "from-violet-600 to-purple-800",
  "MSC Cruises": "from-teal-600 to-teal-800",
  "Disney Cruise Line": "from-blue-500 to-indigo-700",
  "Virgin Voyages": "from-red-700 to-rose-800",
  "Holland America Line": "from-amber-600 to-amber-800",
  Cunard: "from-red-800 to-rose-900",
};

export const getOriginalPrice = (
  price: number,
  discountPct: bigint,
): number => {
  const discount = Number(discountPct);
  if (discount === 0) return price;
  return Math.round(price / (1 - discount / 100));
};

export const getDurationLabel = (nights: bigint): string => {
  const n = Number(nights);
  return `${n} Night${n !== 1 ? "s" : ""}`;
};

// ============================================================
// COMPETITION DATA
// ============================================================

export interface Competition {
  id: string;
  title: string;
  description: string;
  prizeAmount: number;
  prizeType: string;
  entryDeadline: string;
  drawDate: string;
  status: "active" | "closed" | "drawn";
  totalEntries: number;
  image?: string;
}

export const MOCK_COMPETITIONS: Competition[] = [
  {
    id: "comp1",
    title: "Win $2,000 Caribbean Cruise Credit",
    description:
      "Enter for your chance to win $2,000 to spend on any Caribbean cruise of your choice from our full listings. No purchase necessary.",
    prizeAmount: 2000,
    prizeType: "Cruise Credit Voucher",
    entryDeadline: "31 March 2026",
    drawDate: "7 April 2026",
    status: "active",
    totalEntries: 1842,
  },
  {
    id: "comp2",
    title: "Mediterranean Dream — $1,500 Cruise Voucher",
    description:
      "Win $1,500 toward any Mediterranean cruise. Picture yourself in Santorini, Rome, or Dubrovnik — make it a reality.",
    prizeAmount: 1500,
    prizeType: "Cruise Credit Voucher",
    entryDeadline: "15 April 2026",
    drawDate: "22 April 2026",
    status: "active",
    totalEntries: 974,
  },
  {
    id: "comp3",
    title: "Alaska Adventure — $1,000 Cruise Credit",
    description:
      "Enter to win $1,000 to spend on a breathtaking Alaskan cruise — glaciers, wildlife, and unforgettable scenery await.",
    prizeAmount: 1000,
    prizeType: "Cruise Credit Voucher",
    entryDeadline: "30 April 2026",
    drawDate: "8 May 2026",
    status: "active",
    totalEntries: 623,
  },
  {
    id: "comp4",
    title: "Luxury Europe River Cruise — $2,500 Prize",
    description:
      "Our biggest prize yet. Win $2,500 toward a luxury European river cruise — Vienna, Budapest, Amsterdam, or the Rhine Valley.",
    prizeAmount: 2500,
    prizeType: "Cruise Credit Voucher",
    entryDeadline: "15 May 2026",
    drawDate: "21 May 2026",
    status: "active",
    totalEntries: 312,
  },
];
