import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Anchor, LogIn, LogOut, Menu, Trophy, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-ocean-deep/95 backdrop-blur-sm border-b border-white/10 shadow-lg">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="header.nav.link"
          >
            <div className="w-9 h-9 rounded-xl bg-ocean-light/30 flex items-center justify-center group-hover:bg-ocean-light/50 transition-colors">
              <Anchor className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Cruise<span className="text-ocean-pale">Compare</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Home", path: "/" as const },
              { label: "All Deals", path: "/search" as const },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.path}
                data-ocid="header.nav.link"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Win a Cruise — special gold accent link */}
            <Link
              to="/competitions"
              data-ocid="nav.competitions_link"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive("/competitions")
                  ? "bg-prize-gold/20 text-prize-gold"
                  : "text-prize-gold/80 hover:text-prize-gold hover:bg-prize-gold/10"
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Win a Cruise
            </Link>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {identity ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-sm">
                  <User className="w-4 h-4" />
                  <span className="max-w-[120px] truncate text-xs">
                    {identity.getPrincipal().toString().slice(0, 10)}...
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clear}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => login()}
                disabled={isLoggingIn}
                className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{isLoggingIn ? "Signing in..." : "Sign In"}</span>
              </Button>
            )}
            <Button
              onClick={() => navigate({ to: "/book" })}
              data-ocid="header.book_button"
              className="bg-ocean-light hover:bg-ocean-light/90 text-white font-semibold shadow-lg"
              size="sm"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-ocean-deep"
          >
            <div className="container px-4 py-4 flex flex-col gap-2">
              {[
                { label: "Home", path: "/" as const },
                { label: "All Deals", path: "/search" as const },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  data-ocid="header.nav.link"
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/competitions"
                data-ocid="nav.competitions_link"
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive("/competitions")
                    ? "bg-prize-gold/20 text-prize-gold"
                    : "text-prize-gold/80 hover:text-prize-gold hover:bg-prize-gold/10"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <Trophy className="w-4 h-4" />
                Win a Cruise
              </Link>
              <Button
                onClick={() => {
                  navigate({ to: "/book" });
                  setMobileOpen(false);
                }}
                data-ocid="header.book_button"
                className="mt-2 bg-ocean-light hover:bg-ocean-light/90 text-white font-semibold"
              >
                Book Now
              </Button>
              {!identity && (
                <Button
                  variant="ghost"
                  onClick={() => login()}
                  disabled={isLoggingIn}
                  className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  {isLoggingIn ? "Signing in..." : "Sign In"}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
