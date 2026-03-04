import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const DESTINATIONS = ["Caribbean", "Mediterranean", "Alaska", "Europe", "Asia"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DURATIONS = [
  { label: "1–4 Nights", value: "1-4" },
  { label: "5–7 Nights", value: "5-7" },
  { label: "8–14 Nights", value: "8-14" },
  { label: "15+ Nights", value: "15+" },
];

export default function HeroSearch() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("all");
  const [month, setMonth] = useState("any");
  const [duration, setDuration] = useState("any");
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    const search: Record<string, string> = {};
    if (destination !== "all") search.destination = destination;
    if (month !== "any") search.month = month;
    if (duration !== "any") search.duration = duration;
    if (guests) search.guests = guests;
    navigate({ to: "/search", search });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="glass-card rounded-2xl p-5 sm:p-6 shadow-hero max-w-3xl mx-auto"
      data-ocid="hero.search_form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Destination */}
        <div className="space-y-1.5">
          <Label className="text-white/80 text-xs font-semibold uppercase tracking-wider">
            Destination
          </Label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger
              data-ocid="hero.destination.select"
              className="bg-white/10 border-white/20 text-white focus:ring-ocean-light"
            >
              <SelectValue placeholder="All Destinations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Destinations</SelectItem>
              {DESTINATIONS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Month */}
        <div className="space-y-1.5">
          <Label className="text-white/80 text-xs font-semibold uppercase tracking-wider">
            Departure Month
          </Label>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger
              data-ocid="hero.duration.select"
              className="bg-white/10 border-white/20 text-white focus:ring-ocean-light"
            >
              <SelectValue placeholder="Any Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Month</SelectItem>
              {MONTHS.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <Label className="text-white/80 text-xs font-semibold uppercase tracking-wider">
            Duration
          </Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-ocean-light">
              <SelectValue placeholder="Any Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Duration</SelectItem>
              {DURATIONS.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Guests */}
        <div className="space-y-1.5">
          <Label
            htmlFor="guests-input"
            className="text-white/80 text-xs font-semibold uppercase tracking-wider"
          >
            Guests
          </Label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() =>
                setGuests((prev) => String(Math.max(1, Number(prev) - 1)))
              }
              className="px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors font-bold"
              aria-label="Decrease guests"
            >
              −
            </button>
            <input
              id="guests-input"
              type="number"
              min={1}
              max={12}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              data-ocid="hero.guests.input"
              className="flex-1 bg-transparent text-white text-center text-sm py-2 focus:outline-none w-0 min-w-0"
            />
            <button
              type="button"
              onClick={() =>
                setGuests((prev) => String(Math.min(12, Number(prev) + 1)))
              }
              className="px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors font-bold"
              aria-label="Increase guests"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSearch}
        data-ocid="hero.search_button"
        className="w-full bg-ocean-light hover:bg-ocean-light/90 text-white font-bold text-base py-6 rounded-xl shadow-lg gap-2"
        size="lg"
      >
        <Search className="w-5 h-5" />
        Search Cruises
      </Button>
    </motion.div>
  );
}
