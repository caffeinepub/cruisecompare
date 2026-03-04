import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Calendar, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";
import type { Competition } from "../data/mockData";

interface CompetitionCardProps {
  competition: Competition;
  index: number;
}

export default function CompetitionCard({
  competition,
  index,
}: CompetitionCardProps) {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate({ to: "/competitions/$id", params: { id: competition.id } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
      data-ocid={`competitions.card.${index}`}
    >
      {/* Prize amount banner */}
      <div className="prize-gradient px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white/75 text-xs font-semibold uppercase tracking-wider">
              {competition.prizeType}
            </p>
            <p className="font-display font-bold text-2xl text-white leading-tight">
              ${competition.prizeAmount.toLocaleString()}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold border border-white/30 uppercase tracking-wide">
          Free Entry
        </span>
      </div>

      {/* Card body */}
      <div className="flex-1 p-5">
        <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-2 group-hover:text-ocean-mid transition-colors">
          {competition.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {competition.description}
        </p>

        {/* Meta info */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-prize-gold-deep flex-shrink-0" />
            <span>
              Entry closes:{" "}
              <span className="font-semibold text-foreground">
                {competition.entryDeadline}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-ocean-light flex-shrink-0" />
            <span>
              Draw date:{" "}
              <span className="font-semibold text-foreground">
                {competition.drawDate}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5 text-ocean-light flex-shrink-0" />
            <span>
              <span className="font-semibold text-foreground">
                {competition.totalEntries.toLocaleString()}
              </span>{" "}
              entries so far
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Button
          onClick={handleEnter}
          data-ocid={`competitions.enter_button.${index}`}
          className="w-full bg-prize-gold-deep hover:bg-prize-gold text-white font-bold gap-2 group/btn"
        >
          Enter Now — Free
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
