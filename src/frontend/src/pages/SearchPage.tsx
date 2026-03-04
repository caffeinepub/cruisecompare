import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { LayoutGrid, LayoutList, Search, SortDesc } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { CruiseDeal } from "../backend.d";
import DealCard from "../components/DealCard";
import SearchFilters, { type FilterState } from "../components/SearchFilters";
import {
  useAllDeals,
  useRemoveSavedDeal,
  useSaveDeal,
  useSavedDeals,
} from "../hooks/useQueries";

type SortOption =
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "nights-asc"
  | "nights-desc"
  | "discount-desc";

const getDurationBucket = (nights: bigint): string => {
  const n = Number(nights);
  if (n <= 4) return "1-4";
  if (n <= 7) return "5-7";
  if (n <= 14) return "8-14";
  return "15+";
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("discount-desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filters, setFilters] = useState<FilterState>({
    destinations: [],
    carriers: [],
    priceRange: [0, 5000],
    durations: [],
    minRating: 0,
  });

  // Read search params from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dest = urlParams.get("destination");
    const carrier = urlParams.get("carrier");
    const dur = urlParams.get("duration");
    if (dest || carrier || dur) {
      setFilters((prev) => ({
        ...prev,
        destinations: dest ? [dest] : prev.destinations,
        carriers: carrier ? [carrier] : prev.carriers,
        durations: dur ? [dur] : prev.durations,
      }));
    }
  }, []);

  const { data: deals = [], isLoading } = useAllDeals();
  const { data: savedDeals = [] } = useSavedDeals();
  const { mutate: saveDeal } = useSaveDeal();
  const { mutate: removeDeal } = useRemoveSavedDeal();

  const handleSave = (id: string) => {
    saveDeal(id, {
      onSuccess: () => toast.success("Deal saved to your list!"),
      onError: () => toast.error("Sign in to save deals"),
    });
  };

  const handleRemove = (id: string) => {
    removeDeal(id, {
      onSuccess: () => toast.success("Removed from saved deals"),
    });
  };

  const filteredAndSorted = useMemo<CruiseDeal[]>(() => {
    let result = [...deals];

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.shipName.toLowerCase().includes(q) ||
          d.cruiseLine.toLowerCase().includes(q) ||
          d.destination.toLowerCase().includes(q) ||
          d.departurePort.toLowerCase().includes(q) ||
          d.highlights.some((h) => h.toLowerCase().includes(q)),
      );
    }

    // Destination filter
    if (filters.destinations.length > 0) {
      result = result.filter((d) =>
        filters.destinations.includes(d.destination),
      );
    }

    // Carrier filter
    if (filters.carriers.length > 0) {
      result = result.filter((d) => filters.carriers.includes(d.cruiseLine));
    }

    // Price range
    result = result.filter(
      (d) =>
        d.pricePerPerson >= filters.priceRange[0] &&
        d.pricePerPerson <= filters.priceRange[1],
    );

    // Duration
    if (filters.durations.length > 0) {
      result = result.filter((d) =>
        filters.durations.includes(getDurationBucket(d.durationNights)),
      );
    }

    // Rating
    if (filters.minRating > 0) {
      result = result.filter((d) => d.rating >= filters.minRating);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "nights-asc":
        result.sort(
          (a, b) => Number(a.durationNights) - Number(b.durationNights),
        );
        break;
      case "nights-desc":
        result.sort(
          (a, b) => Number(b.durationNights) - Number(a.durationNights),
        );
        break;
      case "discount-desc":
        result.sort((a, b) => Number(b.discountPct) - Number(a.discountPct));
        break;
    }

    return result;
  }, [deals, searchQuery, filters, sortBy]);

  const activeFilterCount =
    filters.destinations.length +
    filters.carriers.length +
    filters.durations.length +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <main className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-ocean-deep py-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-white/60 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Search Cruises</span>
          </nav>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Find Your Perfect Cruise
          </h1>
          <p className="text-white/70">
            Comparing {deals.length} cruise deals from 50+ cruise lines
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6 items-start">
          {/* Sidebar filters — desktop only, rendered outside mobile to avoid duplication */}
          <SearchFilters filters={filters} onChange={setFilters} />

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Search + Sort bar */}
            <div className="flex flex-wrap gap-3 items-center mb-5">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search ships, destinations, ports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-ocid="search.input"
                  className="pl-9"
                />
              </div>
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as SortOption)}
              >
                <SelectTrigger
                  data-ocid="search.sort.select"
                  className="w-auto min-w-[160px]"
                >
                  <SortDesc className="w-4 h-4 mr-1.5 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount-desc">
                    Best Deals First
                  </SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating-desc">Top Rated</SelectItem>
                  <SelectItem value="nights-asc">Shortest First</SelectItem>
                  <SelectItem value="nights-desc">Longest First</SelectItem>
                </SelectContent>
              </Select>

              {/* View toggle */}
              <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-ocean-mid text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="List view"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-ocean-mid text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile filter trigger — rendered here for mobile only */}
              <div className="lg:hidden">
                <SearchFilters filters={filters} onChange={setFilters} />
              </div>
            </div>

            {/* Result count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {isLoading ? (
                  <span data-ocid="search.results.loading_state">
                    Loading deals...
                  </span>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {filteredAndSorted.length}
                    </span>{" "}
                    cruises
                    {activeFilterCount > 0 && (
                      <span className="ml-1">
                        ({activeFilterCount} filter
                        {activeFilterCount !== 1 ? "s" : ""} applied)
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>

            {/* Loading skeleton */}
            {isLoading && (
              <div
                data-ocid="search.results.loading_state"
                className="space-y-4"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-card rounded-xl border border-border p-4"
                  >
                    <div className="flex gap-4">
                      <Skeleton className="w-48 h-32 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Results */}
            {!isLoading && filteredAndSorted.length === 0 && (
              <div
                data-ocid="search.results.empty_state"
                className="text-center py-16 bg-card rounded-xl border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  No cruises found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Try adjusting your filters or search terms to find more
                  options.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      destinations: [],
                      carriers: [],
                      priceRange: [0, 5000],
                      durations: [],
                      minRating: 0,
                    });
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
            {!isLoading && filteredAndSorted.length > 0 && (
              <div
                data-ocid="search.results.list"
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "space-y-4"
                }
              >
                {filteredAndSorted.map((deal, i) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    index={i + 1}
                    variant={viewMode}
                    isSaved={savedDeals.includes(deal.id)}
                    onSave={handleSave}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
