import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Anchor,
  ChevronRight,
  DollarSign,
  Shield,
  TrendingDown,
} from "lucide-react";
import { motion } from "motion/react";
import CompetitionsPromo from "../components/CompetitionsPromo";
import DealCard from "../components/DealCard";
import DestinationCard from "../components/DestinationCard";
import HeroSearch from "../components/HeroSearch";
import { MOCK_CARRIERS, MOCK_DESTINATIONS } from "../data/mockData";
import { useAllDeals } from "../hooks/useQueries";

const TRUST_ITEMS = [
  {
    icon: <Anchor className="w-6 h-6 text-ocean-light" />,
    title: "100+ Cruise Lines",
    desc: "Compare deals from all major cruise lines in one place",
  },
  {
    icon: <Shield className="w-6 h-6 text-ocean-light" />,
    title: "Best Price Guarantee",
    desc: "We match any lower price you find elsewhere",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-ocean-light" />,
    title: "No Booking Fees",
    desc: "Book at no extra cost — the price you see is what you pay",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { data: deals = [] } = useAllDeals();

  // Top 4 deals by discount percentage
  const featuredDeals = [...deals]
    .sort((a, b) => Number(b.discountPct) - Number(a.discountPct))
    .slice(0, 4);

  // Featured destinations (first 4)
  const featuredDestinations = MOCK_DESTINATIONS.slice(0, 4);

  return (
    <main>
      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[600px] sm:min-h-[680px] flex items-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/cruise-hero.dim_1600x700.jpg')",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-gradient" />
        {/* Extra dark overlay for text legibility */}
        <div className="absolute inset-0 bg-ocean-deep/40" />

        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 sm:mb-10"
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-ocean-light/30 border border-ocean-light/40 text-ocean-pale text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              Powered by Traveltek
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
              Compare Hundreds of{" "}
              <span className="italic text-ocean-pale">Cruises.</span>
              <br />
              Find Your Perfect Voyage.
            </h1>
            <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto font-body">
              Search deals from 50+ cruise lines — all in one place. No booking
              fees, best price guaranteed.
            </p>
          </motion.div>

          {/* Search form */}
          <HeroSearch />
        </div>
      </section>

      {/* ===================== TRUST BAR ===================== */}
      <section className="bg-ocean-deep py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-white"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-white/60 text-xs mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FEATURED DEALS ===================== */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-coral-accent" />
                <span className="text-xs font-semibold text-coral-accent uppercase tracking-wider">
                  Hot Right Now
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
                Best Deals This Week
              </h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: "/search" })}
              className="hidden sm:flex gap-1 text-ocean-mid hover:text-ocean-deep"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {featuredDeals.map((deal, i) => (
              <DealCard
                key={deal.id}
                deal={deal}
                index={i + 1}
                variant="grid"
              />
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/search" })}
              className="gap-1 text-ocean-mid border-ocean-mid"
            >
              View All Deals
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== COMPETITIONS PROMO ===================== */}
      <CompetitionsPromo />

      {/* ===================== DESTINATIONS ===================== */}
      <section className="py-16 sm:py-20 bg-muted/40">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Browse by Destination
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From tropical shores to ancient cities, find your dream cruise
              destination
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredDestinations.map((dest, i) => (
              <DestinationCard
                key={dest.id}
                name={dest.name}
                description={dest.description}
                imageSrc=""
                index={i + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CRUISE LINES ===================== */}
      <section className="py-14 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Cruise Lines We Compare
            </h2>
            <p className="text-muted-foreground text-sm">
              50+ top cruise lines all in one search
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {MOCK_CARRIERS.map((carrier) => (
              <button
                type="button"
                key={carrier.id}
                onClick={() =>
                  navigate({ to: "/search", search: { carrier: carrier.name } })
                }
                className="px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground hover:border-ocean-mid hover:text-ocean-mid hover:bg-ocean-pale/30 transition-all"
              >
                {carrier.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TRAVELTEK CTA BANNER ===================== */}
      <section className="py-16 bg-gradient-to-br from-ocean-deep via-ocean-mid to-ocean-light relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider">
              Live Booking Engine
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Ready to book your dream cruise?
            </h2>
            <p className="text-white/75 text-lg max-w-lg mx-auto mb-8">
              Use our live booking engine powered by Traveltek — the world's
              leading cruise technology platform.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: "/book" })}
              className="bg-white text-ocean-deep hover:bg-white/90 font-bold text-base px-8 shadow-xl"
            >
              Book Now via Traveltek
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
