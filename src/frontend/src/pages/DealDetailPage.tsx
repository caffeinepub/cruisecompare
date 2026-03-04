import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  MapPin,
  Ship,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import DealCard from "../components/DealCard";
import {
  CRUISE_LINE_COLORS,
  getDurationLabel,
  getOriginalPrice,
} from "../data/mockData";
import { useAllDeals, useDeal } from "../hooks/useQueries";

export default function DealDetailPage() {
  const { id } = useParams({ from: "/deal/$id" });
  const navigate = useNavigate();
  const { data: deal, isLoading } = useDeal(id ?? "");
  const { data: allDeals = [] } = useAllDeals();

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <div className="h-72 bg-muted animate-pulse" />
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </main>
    );
  }

  if (!deal) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Deal not found
          </h2>
          <p className="text-muted-foreground mb-6">
            This cruise deal may no longer be available.
          </p>
          <Button onClick={() => navigate({ to: "/search" })}>
            Browse All Deals
          </Button>
        </div>
      </main>
    );
  }

  const gradientClass =
    CRUISE_LINE_COLORS[deal.cruiseLine] ?? "from-ocean-mid to-ocean-deep";
  const discountNum = Number(deal.discountPct);
  const originalPrice = getOriginalPrice(deal.pricePerPerson, deal.discountPct);

  // Related deals: same destination, exclude current
  const relatedDeals = allDeals
    .filter((d) => d.destination === deal.destination && d.id !== deal.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Header image strip */}
      <div
        className={cn("relative h-64 sm:h-80 bg-gradient-to-br", gradientClass)}
      >
        <div className="absolute inset-0 bg-ocean-deep/40" />
        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-between py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-white/70">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/search" className="hover:text-white transition-colors">
              Deals
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate max-w-[200px]">
              {deal.shipName}
            </span>
          </nav>

          {/* Title */}
          <div className="text-white">
            <p className="text-sm font-semibold opacity-80 uppercase tracking-wider mb-1">
              {deal.cruiseLine}
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {deal.shipName}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <Badge className="bg-white/20 text-white border-white/30">
                {deal.destination}
              </Badge>
              <div className="flex items-center gap-1 text-yellow-300">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{deal.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main info */}
          <div className="flex-1 space-y-8">
            {/* Back link */}
            <button
              type="button"
              onClick={() => navigate({ to: "/search" })}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-ocean-mid transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to results
            </button>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: <Clock className="w-5 h-5" />,
                  label: "Duration",
                  value: getDurationLabel(deal.durationNights),
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Departs From",
                  value: deal.departurePort,
                },
                {
                  icon: <Ship className="w-5 h-5" />,
                  label: "Ship",
                  value: deal.shipName,
                },
                {
                  icon: <Star className="w-5 h-5" />,
                  label: "Rating",
                  value: `${deal.rating} / 5.0`,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-xl border border-border p-4"
                >
                  <div className="text-ocean-light mb-1">{stat.icon}</div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {stat.label}
                  </p>
                  <p className="font-semibold text-sm text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Itinerary / Highlights */}
            <div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                Ports of Call
              </h2>
              <div className="space-y-3">
                {deal.highlights.map((highlight, i) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-3 bg-card rounded-xl border border-border"
                  >
                    <div className="w-8 h-8 rounded-full bg-ocean-pale flex items-center justify-center text-ocean-mid font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-ocean-light" />
                      <span className="font-medium text-sm">{highlight}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                What's Included
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "All Meals Onboard",
                  "Entertainment",
                  "Fitness Center",
                  "Kids Club",
                  "Pool & Hot Tubs",
                  "24/7 Room Service",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-ocean-light flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price panel (sticky) */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-2xl border border-border shadow-card-hover overflow-hidden">
              {discountNum > 0 && (
                <div className={cn("h-2 bg-gradient-to-r", gradientClass)} />
              )}
              <div className="p-6">
                <div className="text-center mb-6">
                  {discountNum > 0 && (
                    <>
                      <span className="deal-badge mb-2 inline-block">
                        Save {discountNum}%
                      </span>
                      <p className="text-muted-foreground text-sm line-through">
                        From ${originalPrice.toLocaleString()} per person
                      </p>
                    </>
                  )}
                  <p className="price-tag text-4xl font-bold text-foreground mt-1">
                    ${deal.pricePerPerson.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    per person
                  </p>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">
                      {getDurationLabel(deal.durationNights)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Departs</span>
                    <span className="font-medium truncate max-w-[140px]">
                      {deal.departurePort}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {deal.rating}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  data-ocid="deal.book_button"
                  onClick={() => navigate({ to: "/book" })}
                  className="w-full bg-ocean-mid hover:bg-ocean-deep text-white font-bold py-6 text-base"
                >
                  Book This Cruise
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-3">
                  Secure booking via{" "}
                  <span className="font-semibold text-ocean-mid">
                    Traveltek
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related deals */}
        {relatedDeals.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-6">
              More {deal.destination} Cruises
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedDeals.map((related, i) => (
                <DealCard
                  key={related.id}
                  deal={related}
                  index={i + 1}
                  variant="grid"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
