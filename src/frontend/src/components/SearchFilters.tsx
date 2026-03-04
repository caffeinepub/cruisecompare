import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { useState } from "react";

const DESTINATIONS = ["Caribbean", "Mediterranean", "Alaska", "Europe", "Asia"];
const CRUISE_LINES = [
  "Royal Caribbean",
  "Norwegian Cruise Line",
  "Carnival Cruise Line",
  "Celebrity Cruises",
  "Princess Cruises",
  "MSC Cruises",
  "Disney Cruise Line",
  "Virgin Voyages",
  "Holland America Line",
  "Cunard",
];
const DURATIONS = [
  { label: "1–4 Nights", value: "1-4" },
  { label: "5–7 Nights", value: "5-7" },
  { label: "8–14 Nights", value: "8-14" },
  { label: "15+ Nights", value: "15+" },
];

export interface FilterState {
  destinations: string[];
  carriers: string[];
  priceRange: [number, number];
  durations: string[];
  minRating: number;
}

interface SearchFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-foreground py-2 hover:text-ocean-mid transition-colors"
      >
        {title}
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
}

function FilterContent({ filters, onChange }: SearchFiltersProps) {
  const toggle = <K extends "destinations" | "carriers" | "durations">(
    key: K,
    value: string,
  ) => {
    const arr = filters[key] as string[];
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onChange({ ...filters, [key]: next });
  };

  return (
    <div className="space-y-4">
      <FilterSection title="Destination">
        {DESTINATIONS.map((dest) => (
          <div key={dest} className="flex items-center gap-2">
            <Checkbox
              id={`dest-${dest}`}
              checked={filters.destinations.includes(dest)}
              onCheckedChange={() => toggle("destinations", dest)}
              data-ocid="search.filter.destination.checkbox"
            />
            <Label
              htmlFor={`dest-${dest}`}
              className="text-sm font-normal cursor-pointer"
            >
              {dest}
            </Label>
          </div>
        ))}
      </FilterSection>

      <Separator />

      <FilterSection title="Cruise Line">
        {CRUISE_LINES.map((carrier) => (
          <div key={carrier} className="flex items-center gap-2">
            <Checkbox
              id={`carrier-${carrier}`}
              checked={filters.carriers.includes(carrier)}
              onCheckedChange={() => toggle("carriers", carrier)}
              data-ocid="search.filter.carrier.checkbox"
            />
            <Label
              htmlFor={`carrier-${carrier}`}
              className="text-sm font-normal cursor-pointer line-clamp-1"
            >
              {carrier}
            </Label>
          </div>
        ))}
      </FilterSection>

      <Separator />

      <FilterSection title="Price Range (per person)">
        <div className="px-1 pt-2 pb-1">
          <Slider
            min={0}
            max={5000}
            step={50}
            value={[filters.priceRange[0], filters.priceRange[1]]}
            onValueChange={([min, max]) =>
              onChange({ ...filters, priceRange: [min, max] })
            }
            className="mb-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      <Separator />

      <FilterSection title="Duration">
        {DURATIONS.map((dur) => (
          <div key={dur.value} className="flex items-center gap-2">
            <Checkbox
              id={`dur-${dur.value}`}
              checked={filters.durations.includes(dur.value)}
              onCheckedChange={() => toggle("durations", dur.value)}
            />
            <Label
              htmlFor={`dur-${dur.value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {dur.label}
            </Label>
          </div>
        ))}
      </FilterSection>

      <Separator />

      <FilterSection title="Minimum Rating">
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              type="button"
              key={rating}
              onClick={() => onChange({ ...filters, minRating: rating })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filters.minRating === rating
                  ? "bg-ocean-mid text-white border-ocean-mid"
                  : "bg-transparent text-muted-foreground border-border hover:border-ocean-mid hover:text-ocean-mid"
              }`}
            >
              {rating === 0 ? "All" : `${rating}+ ★`}
            </button>
          ))}
        </div>
      </FilterSection>

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          onChange({
            destinations: [],
            carriers: [],
            priceRange: [0, 5000],
            durations: [],
            minRating: 0,
          })
        }
        className="w-full text-xs"
      >
        Clear All Filters
      </Button>
    </div>
  );
}

export default function SearchFilters({
  filters,
  onChange,
}: SearchFiltersProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-card rounded-xl border border-border p-5 shadow-card sticky top-24">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-ocean-mid" />
            <h2 className="font-semibold text-foreground">Filters</h2>
          </div>
          <FilterContent filters={filters} onChange={onChange} />
        </div>
      </div>

      {/* Mobile sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              data-ocid="search.filter.destination.checkbox"
            >
              <Filter className="w-4 h-4" />
              Filters
              {filters.destinations.length +
                filters.carriers.length +
                filters.durations.length >
                0 && (
                <span className="w-5 h-5 rounded-full bg-ocean-mid text-white text-xs flex items-center justify-center">
                  {filters.destinations.length +
                    filters.carriers.length +
                    filters.durations.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Cruises</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FilterContent filters={filters} onChange={onChange} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
