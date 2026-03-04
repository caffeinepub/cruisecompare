import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ExternalLink, Lock, Phone, Shield } from "lucide-react";
import { motion } from "motion/react";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-ocean-deep py-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-white/60 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Book a Cruise</span>
          </nav>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Complete Your Booking
          </h1>
          <p className="text-white/70">
            Powered by Traveltek — the world's leading cruise technology
            platform
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Trust bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: <Shield className="w-5 h-5 text-ocean-light" />,
              title: "Secure Booking",
              desc: "256-bit SSL encryption protects your data",
            },
            {
              icon: <Lock className="w-5 h-5 text-ocean-light" />,
              title: "Best Price Guarantee",
              desc: "We'll match any lower price you find",
            },
            {
              icon: <Phone className="w-5 h-5 text-ocean-light" />,
              title: "24/7 Support",
              desc: "Our travel experts are always available",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-ocean-pale/50 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main booking area */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
        >
          {/* Booking header */}
          <div className="px-6 py-5 border-b border-border flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-mid to-ocean-light flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  Traveltek iSell Booking Engine
                </h2>
                <p className="text-xs text-muted-foreground">
                  Secure, real-time cruise booking
                </p>
              </div>
            </div>
            <a
              href="https://www.traveltek.com/products/isell/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-ocean-mid hover:text-ocean-deep transition-colors font-medium"
            >
              Open in new window
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* iFrame embedding */}
          <div className="relative">
            <iframe
              src="https://www.traveltek.com/products/isell/"
              width="100%"
              height="700"
              className="w-full block"
              title="Traveltek iSell Booking Engine"
              data-ocid="book.iframe"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </motion.div>

        {/* Integration info */}
        <div className="mt-8 bg-ocean-pale/30 border border-ocean-pale rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg text-foreground mb-3">
            About Traveltek Integration
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            CruiseCompare uses Traveltek's iSell platform to power live cruise
            bookings. Traveltek is a leading travel technology company that
            connects travel agents and consumers with real-time inventory from
            major cruise lines worldwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-1">
                To activate live booking:
              </p>
              <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
                <li>Sign up for a Traveltek iSell account</li>
                <li>Configure your cruise line partnerships</li>
                <li>Replace the iframe URL with your customized widget URL</li>
              </ol>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-1">
                Traveltek features:
              </p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ocean-light mt-1.5 flex-shrink-0" />
                  Real-time availability from 50+ cruise lines
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ocean-light mt-1.5 flex-shrink-0" />
                  Secure payment processing
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ocean-light mt-1.5 flex-shrink-0" />
                  Automated booking confirmations
                </li>
              </ul>
            </div>
          </div>
          <Button
            asChild
            data-ocid="book.cta_button"
            className="bg-ocean-mid hover:bg-ocean-deep text-white font-semibold"
          >
            <a
              href="https://www.traveltek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Contact Traveltek
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
