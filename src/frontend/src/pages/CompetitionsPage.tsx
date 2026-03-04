import { Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, Gift, Mail, Trophy } from "lucide-react";
import { motion } from "motion/react";
import CompetitionCard from "../components/CompetitionCard";
import { MOCK_COMPETITIONS } from "../data/mockData";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: <Gift className="w-6 h-6" />,
    title: "Enter Your Details",
    desc: "Fill in your name and email — it's completely free and takes just 30 seconds.",
  },
  {
    step: "02",
    icon: <Trophy className="w-6 h-6" />,
    title: "We Draw a Winner",
    desc: "On the draw date, one lucky entrant is selected at random from all valid entries.",
  },
  {
    step: "03",
    icon: <Mail className="w-6 h-6" />,
    title: "Claim Your Voucher",
    desc: "The winner receives a cruise credit voucher by email, redeemable on any booking.",
  },
];

export default function CompetitionsPage() {
  const activeComps = MOCK_COMPETITIONS.filter((c) => c.status === "active");

  return (
    <main className="min-h-screen bg-background" data-ocid="competitions.page">
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/competition-banner.dim_1200x400.jpg')",
          }}
        />
        <div className="absolute inset-0 competition-hero-gradient" />
        {/* Decorative shimmer particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {([0, 1, 2, 3, 4, 5, 6, 7] as const).map((i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-prize-gold-light/60"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <nav className="text-sm text-white/60 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Win a Cruise</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl prize-gradient flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="px-3 py-1 rounded-full bg-prize-gold/20 border border-prize-gold/40 text-prize-gold-light text-xs font-bold uppercase tracking-wider">
                Free Prize Draws
              </span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
              Win Cruise Credit
            </h1>
            <p className="text-white/75 text-lg sm:text-xl max-w-xl">
              Enter our free prize draws and win money to spend on your dream
              cruise. No purchase necessary — just enter your details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Competitions Grid ── */}
      <section className="py-14 sm:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-prize-gold-deep uppercase tracking-wider mb-1">
                {activeComps.length} Active Competitions
              </p>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                Current Prize Draws
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activeComps.map((comp, i) => (
              <CompetitionCard key={comp.id} competition={comp} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-14 bg-muted/40">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Entering is simple, free, and takes under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center"
              >
                <div className="relative inline-flex mb-4">
                  <div className="w-16 h-16 rounded-2xl prize-gradient flex items-center justify-center text-white shadow-lg">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ocean-mid text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terms ── */}
      <section className="py-8 bg-background border-t border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-prize-success" />
            <p>
              No purchase necessary. One entry per person per competition.
              Winners contacted by email within 7 days of draw date. By entering
              you consent to being contacted about cruise deals.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
