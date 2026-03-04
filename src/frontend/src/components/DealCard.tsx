import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkCheck,
  Clock,
  MapPin,
  Star,
  TrendingDown,
} from "lucide-react";
import type { CruiseDeal } from "../backend.d";
import {
  CRUISE_LINE_COLORS,
  getDurationLabel,
  getOriginalPrice,
} from "../data/mockData";

interface DealCardProps {
  deal: CruiseDeal;
  index: number;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  onRemove?: (id: string) => void;
  variant?: "grid" | "list";
}

export default function DealCard({
  deal,
  index,
  isSaved = false,
  onSave,
  onRemove,
  variant = "grid",
}: DealCardProps) {
  const navigate = useNavigate();
  const gradientClass =
    CRUISE_LINE_COLORS[deal.cruiseLine] ?? "from-ocean-mid to-ocean-deep";
  const discountNum = Number(deal.discountPct);
  const originalPrice = getOriginalPrice(deal.pricePerPerson, deal.discountPct);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      onRemove?.(deal.id);
    } else {
      onSave?.(deal.id);
    }
  };

  const handleViewDeal = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate({ to: "/deal/$id", params: { id: deal.id } });
  };

  if (variant === "list") {
    return (
      <div
        className="bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
        data-ocid={`deals.card.${index}`}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Color band / ship visual */}
          <div
            className={cn(
              "relative w-full sm:w-52 h-32 sm:h-auto flex-shrink-0 bg-gradient-to-br",
              gradientClass,
            )}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
              <span className="font-display font-bold text-sm leading-tight">
                {deal.shipName}
              </span>
              <span className="text-xs opacity-80 mt-1">
                {deal.destination}
              </span>
            </div>
            {discountNum > 0 && (
              <div className="absolute top-2 left-2">
                <span className="deal-badge flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" />
                  {discountNum}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Middle content */}
          <div className="flex-1 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-xs font-semibold text-ocean-mid uppercase tracking-wider mb-0.5">
                  {deal.cruiseLine}
                </p>
                <h3 className="font-display font-bold text-lg text-foreground leading-tight">
                  {deal.shipName}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-gold-accent flex-shrink-0">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold text-sm">{deal.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {getDurationLabel(deal.durationNights)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {deal.departurePort}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {deal.highlights.slice(0, 3).map((h) => (
                <Badge
                  key={h}
                  variant="secondary"
                  className="text-xs font-normal bg-ocean-pale/40 text-ocean-mid border-none"
                >
                  {h}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price + actions */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 p-4 sm:p-5 sm:min-w-[160px] border-t sm:border-t-0 sm:border-l border-border">
            <div className="text-right">
              {discountNum > 0 && (
                <p className="text-xs text-muted-foreground line-through">
                  ${originalPrice.toLocaleString()}
                </p>
              )}
              <p className="price-tag text-2xl font-bold text-foreground">
                ${deal.pricePerPerson.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">per person</p>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Button
                size="sm"
                data-ocid={`deals.view_button.${index}`}
                onClick={handleViewDeal}
                className="w-full bg-ocean-mid hover:bg-ocean-deep text-white font-semibold"
              >
                View Deal
              </Button>
              <Button
                size="sm"
                variant="outline"
                data-ocid={`deals.save_button.${index}`}
                onClick={handleSaveToggle}
                className={cn(
                  "w-full gap-1.5",
                  isSaved && "text-ocean-mid border-ocean-mid",
                )}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-3.5 h-3.5" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant
  return (
    <div
      className="bg-card rounded-xl border border-border shadow-card card-lift overflow-hidden group flex flex-col"
      data-ocid={`deals.card.${index}`}
    >
      {/* Top color band */}
      <div
        className={cn(
          "relative h-24 bg-gradient-to-br flex items-center justify-between px-4",
          gradientClass,
        )}
      >
        <div className="text-white">
          <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">
            {deal.cruiseLine}
          </p>
          <p className="font-display font-bold text-sm leading-tight mt-0.5">
            {deal.shipName}
          </p>
        </div>
        <Badge className="bg-white/20 text-white border-white/30 text-xs">
          {deal.destination}
        </Badge>
        {discountNum > 0 && (
          <div className="absolute -bottom-3 left-4">
            <span className="deal-badge flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" />
              {discountNum}% OFF
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 pt-5">
        {/* Duration + port */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {getDurationLabel(deal.durationNights)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {deal.departurePort}
          </span>
        </div>

        {/* Highlights */}
        <ul className="space-y-1 mb-4">
          {deal.highlights.slice(0, 3).map((h) => (
            <li
              key={h}
              className="text-xs text-muted-foreground flex items-start gap-1.5"
            >
              <span className="w-1 h-1 rounded-full bg-ocean-light mt-1.5 flex-shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "w-3.5 h-3.5",
                star <= Math.round(deal.rating)
                  ? "fill-gold-accent text-gold-accent"
                  : "fill-transparent text-muted-foreground",
              )}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            {deal.rating}
          </span>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="px-4 pb-4 border-t border-border pt-3 flex items-center justify-between gap-2">
        <div>
          {discountNum > 0 && (
            <p className="text-xs text-muted-foreground line-through">
              ${originalPrice.toLocaleString()}
            </p>
          )}
          <p className="price-tag text-xl font-bold text-foreground">
            ${deal.pricePerPerson.toLocaleString()}
          </p>
          <p className="text-[10px] text-muted-foreground">per person</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Button
            size="sm"
            data-ocid={`deals.view_button.${index}`}
            onClick={handleViewDeal}
            className="bg-ocean-mid hover:bg-ocean-deep text-white text-xs font-semibold px-3"
          >
            View Deal
          </Button>
          <Button
            size="sm"
            variant="outline"
            data-ocid={`deals.save_button.${index}`}
            onClick={handleSaveToggle}
            className={cn(
              "text-xs px-3",
              isSaved && "text-ocean-mid border-ocean-mid",
            )}
          >
            {isSaved ? (
              <BookmarkCheck className="w-3 h-3" />
            ) : (
              <Bookmark className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
