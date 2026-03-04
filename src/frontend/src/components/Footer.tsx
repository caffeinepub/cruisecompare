import { Link } from "@tanstack/react-router";
import { Anchor, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-ocean-deep text-white/80">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-ocean-light/30 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Cruise<span className="text-ocean-pale">Compare</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              The world's leading cruise comparison platform. Find and book the
              best cruise deals from 50+ cruise lines, all in one place.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
              <span className="px-2 py-1 rounded bg-white/10 font-medium">
                Powered by Traveltek
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" as const },
                { label: "All Deals", path: "/search" as const },
                { label: "Win a Cruise", path: "/competitions" as const },
                { label: "Book a Cruise", path: "/book" as const },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              {[
                "Contact Us",
                "FAQs",
                "Price Match Guarantee",
                "Travel Insurance",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/60 cursor-pointer hover:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {year}. Built with{" "}
            <Heart className="w-3 h-3 inline text-red-400" /> using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ocean-pale hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-white/40">
            Booking technology powered by{" "}
            <a
              href="https://www.traveltek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ocean-pale hover:text-white transition-colors"
            >
              Traveltek
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
