import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Loader2,
  PartyPopper,
  Trophy,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MOCK_COMPETITIONS } from "../data/mockData";

interface EntryForm {
  firstName: string;
  lastName: string;
  email: string;
  agreed: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  agreed?: string;
}

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function CompetitionEntryPage() {
  const { id } = useParams({ from: "/competitions/$id" });
  const navigate = useNavigate();
  const competition = MOCK_COMPETITIONS.find((c) => c.id === id);

  const [form, setForm] = useState<EntryForm>({
    firstName: "",
    lastName: "",
    email: "",
    agreed: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [entryCount, setEntryCount] = useState(competition?.totalEntries ?? 0);

  if (!competition) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Competition Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            This competition may have ended or the link is incorrect.
          </p>
          <Button
            onClick={() => navigate({ to: "/competitions" })}
            className="bg-ocean-mid hover:bg-ocean-deep text-white"
          >
            View All Competitions
          </Button>
        </div>
      </main>
    );
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.agreed) newErrors.agreed = "You must agree to the terms to enter";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    setEntryCount((prev) => prev + 1);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header strip */}
      <div className="bg-ocean-deep py-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-white/60 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to="/competitions"
              className="hover:text-white transition-colors"
              data-ocid="competition.back_link"
            >
              Competitions
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate max-w-[180px]">
              {competition.title}
            </span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl prize-gradient flex items-center justify-center flex-shrink-0 shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-prize-gold-light text-xs font-bold uppercase tracking-wider mb-1">
                Free Prize Draw
              </p>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                {competition.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* ── Left: Competition Info ── */}
          <div className="lg:w-80 flex-shrink-0 space-y-5">
            {/* Prize card */}
            <div className="prize-gradient rounded-2xl p-6 text-white shadow-lg">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">
                Prize Value
              </p>
              <p className="font-display font-bold text-4xl leading-tight mb-0.5">
                ${competition.prizeAmount.toLocaleString()}
              </p>
              <p className="text-white/80 text-sm">{competition.prizeType}</p>
            </div>

            {/* Details */}
            <div className="bg-card rounded-xl border border-border p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-prize-gold-deep flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Entry closes</p>
                  <p className="font-semibold text-foreground">
                    {competition.entryDeadline}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-ocean-light flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Draw date</p>
                  <p className="font-semibold text-foreground">
                    {competition.drawDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-ocean-light flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Total entries</p>
                  <p className="font-semibold text-foreground">
                    {entryCount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground text-sm mb-2">
                About This Prize
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {competition.description}
              </p>
            </div>
          </div>

          {/* ── Right: Entry Form / Success ── */}
          <div className="flex-1 max-w-xl">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8"
                  data-ocid="competition.entry_form"
                >
                  <div className="mb-6">
                    <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                      Enter the Draw
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Free entry — takes less than 30 seconds.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="e.g. Sarah"
                          value={form.firstName}
                          onChange={(e) => {
                            setForm((p) => ({
                              ...p,
                              firstName: e.target.value,
                            }));
                            if (errors.firstName)
                              setErrors((p) => ({
                                ...p,
                                firstName: undefined,
                              }));
                          }}
                          data-ocid="competition.name_input"
                          className={
                            errors.firstName ? "border-destructive" : ""
                          }
                          aria-invalid={!!errors.firstName}
                          aria-describedby={
                            errors.firstName ? "firstName-error" : undefined
                          }
                        />
                        {errors.firstName && (
                          <p
                            id="firstName-error"
                            className="text-xs text-destructive"
                            data-ocid="competition.error_state"
                          >
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="e.g. Johnson"
                          value={form.lastName}
                          onChange={(e) => {
                            setForm((p) => ({
                              ...p,
                              lastName: e.target.value,
                            }));
                            if (errors.lastName)
                              setErrors((p) => ({ ...p, lastName: undefined }));
                          }}
                          className={
                            errors.lastName ? "border-destructive" : ""
                          }
                          aria-invalid={!!errors.lastName}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-destructive">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, email: e.target.value }));
                          if (errors.email)
                            setErrors((p) => ({ ...p, email: undefined }));
                        }}
                        data-ocid="competition.email_input"
                        className={errors.email ? "border-destructive" : ""}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-xs text-destructive"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Terms checkbox */}
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                      <Checkbox
                        id="agreed"
                        checked={form.agreed}
                        onCheckedChange={(checked) => {
                          setForm((p) => ({
                            ...p,
                            agreed: checked === true,
                          }));
                          if (errors.agreed)
                            setErrors((p) => ({ ...p, agreed: undefined }));
                        }}
                        data-ocid="competition.terms_checkbox"
                        className={errors.agreed ? "border-destructive" : ""}
                      />
                      <div>
                        <Label
                          htmlFor="agreed"
                          className="text-sm font-normal cursor-pointer leading-relaxed"
                        >
                          I agree to the{" "}
                          <span className="font-semibold text-ocean-mid underline-offset-2 underline">
                            terms and conditions
                          </span>{" "}
                          and consent to being contacted about cruise deals and
                          future competitions.
                        </Label>
                        {errors.agreed && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.agreed}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      data-ocid="competition.submit_button"
                      className="w-full bg-prize-gold-deep hover:bg-prize-gold text-white font-bold text-base py-6"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Submitting your entry…
                        </>
                      ) : (
                        <>
                          <Trophy className="w-5 h-5 mr-2" />
                          Enter Now — It's Free!
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      No purchase necessary. One entry per person per
                      competition.
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  className="bg-card rounded-2xl border-2 border-prize-gold/50 shadow-card success-glow p-8 text-center"
                  data-ocid="competition.success_state"
                >
                  {/* Celebratory icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                    }}
                    className="w-20 h-20 rounded-full prize-gradient flex items-center justify-center mx-auto mb-6 shadow-xl"
                  >
                    <PartyPopper className="w-9 h-9 text-white" />
                  </motion.div>

                  {/* Confetti dots */}
                  <div className="flex justify-center gap-2 mb-5">
                    {(
                      [
                        "bg-prize-gold",
                        "bg-ocean-light",
                        "bg-coral-accent",
                        "bg-prize-gold-deep",
                        "bg-ocean-pale",
                      ] as const
                    ).map((color) => (
                      <motion.div
                        key={color}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay:
                            0.3 +
                            [
                              "bg-prize-gold",
                              "bg-ocean-light",
                              "bg-coral-accent",
                              "bg-prize-gold-deep",
                              "bg-ocean-pale",
                            ].indexOf(color) *
                              0.07,
                        }}
                        className={`w-2.5 h-2.5 rounded-full ${color}`}
                      />
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="font-display font-bold text-3xl text-foreground mb-3">
                      You're in the draw!
                    </h2>
                    <p className="text-muted-foreground mb-1">
                      Good luck,{" "}
                      <span className="font-semibold text-foreground">
                        {form.firstName}
                      </span>
                      !
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      We'll contact you at{" "}
                      <span className="font-semibold text-ocean-mid">
                        {form.email}
                      </span>{" "}
                      if you win. The draw takes place on{" "}
                      <span className="font-semibold text-foreground">
                        {competition.drawDate}
                      </span>
                      .
                    </p>

                    <div className="flex items-center justify-center gap-2 mb-8 p-3 bg-prize-gold-light/30 rounded-xl border border-prize-gold/30">
                      <CheckCircle2 className="w-4 h-4 text-prize-success flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        Entry confirmed — good luck! 🤞
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={() => navigate({ to: "/search" })}
                        className="bg-ocean-mid hover:bg-ocean-deep text-white font-semibold gap-2"
                      >
                        Browse Cruise Deals
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate({ to: "/competitions" })}
                        className="gap-2 border-prize-gold/50 text-prize-gold-deep hover:bg-prize-gold-light/30"
                      >
                        <Trophy className="w-4 h-4" />
                        Enter Another Competition
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
