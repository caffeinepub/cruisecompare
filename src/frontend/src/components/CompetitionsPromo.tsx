import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Sparkles, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { MOCK_COMPETITIONS } from "../data/mockData";

export default function CompetitionsPromo() {
  const navigate = useNavigate();
  const featuredComps = MOCK_COMPETITIONS.filter(
    (c) => c.status === "active",
  ).slice(0, 3);

  return (
    <section
      className="py-14 relative overflow-hidden"
      data-ocid="home.competitions_promo"
    >
      {/* Gold gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 55) 0%, oklch(0.30 0.08 65) 40%, oklch(0.22 0.06 55) 100%)",
        }}
      />
      {/* Subtle noise-like dots pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {([0, 1, 2, 3, 4, 5] as const).map((i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full bg-prize-gold"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              left: `${i * 18}%`,
              top: `${i % 2 === 0 ? -20 : 60}%`,
              opacity: 0.15 + i * 0.05,
            }}
          />
        ))}
      </div>
      {/* Sparkle accents */}
      <Sparkles className="absolute top-6 right-8 w-8 h-8 text-prize-gold/30 pointer-events-none" />
      <Sparkles className="absolute bottom-6 left-12 w-5 h-5 text-prize-gold/20 pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          {/* ── Left: headline ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-72 flex-shrink-0"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl prize-gradient flex items-center justify-center shadow-xl flex-shrink-0">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-prize-gold text-xs font-bold uppercase tracking-widest">
                Free Prize Draws
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-3">
              🏆 Win Cruise Credit
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Enter our free prize draws — win up to{" "}
              <span className="text-prize-gold font-bold">$2,500</span> to spend
              on any cruise. No purchase necessary.
            </p>
            <Button
              onClick={() => navigate({ to: "/competitions" })}
              data-ocid="home.competitions_view_all_button"
              className="bg-prize-gold hover:bg-prize-gold-deep text-white font-bold gap-2 shadow-lg"
            >
              View All Competitions
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* ── Right: mini comp cards ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {featuredComps.map((comp, i) => (
              <motion.button
                key={comp.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() =>
                  navigate({
                    to: "/competitions/$id",
                    params: { id: comp.id },
                  })
                }
                className="text-left p-4 rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:border-prize-gold/40 transition-all group"
              >
                <p className="font-display font-bold text-xl text-prize-gold mb-1">
                  ${comp.prizeAmount.toLocaleString()}
                </p>
                <p className="text-white/80 text-xs font-semibold leading-tight line-clamp-2 mb-2 group-hover:text-white transition-colors">
                  {comp.title}
                </p>
                <p className="text-white/50 text-xs">
                  Closes {comp.entryDeadline}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
