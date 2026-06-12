import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, ArrowRight, ArrowLeft, Home, TrendingUp, Building2, Search, Sparkles, BellRing, Upload, Camera, Handshake, Link2, BarChart3, Users } from "lucide-react";

type Role = "buyer" | "seller" | "agent";

const ROLES: { id: Role; label: string; icon: typeof Home; tagline: string; accent: string }[] = [
  { id: "buyer", label: "I'm a Buyer / Investor", icon: Home, tagline: "Find homes or investment deals", accent: "teal" },
  { id: "seller", label: "I'm Selling", icon: TrendingUp, tagline: "List your property in minutes", accent: "gold" },
  { id: "agent", label: "I'm an Estate Agent", icon: Building2, tagline: "Manage your portfolio", accent: "navy" },
];

const STEPS: Record<Role, { icon: typeof Search; title: string; body: string }[]> = {
  buyer: [
    { icon: Search, title: "Tell us what you want", body: "Pick a city, budget, and goal — buy, rent, or invest. No jargon, no forms." },
    { icon: Sparkles, title: "Let AI find your matches", body: "We scan UK Land Registry & live listings 24/7 to surface the best deals for you." },
    { icon: BellRing, title: "Get instant alerts", body: "New property fits your criteria? You'll know before anyone else. Save & track easily." },
  ],
  seller: [
    { icon: Camera, title: "Snap & upload photos", body: "Add your property in under 2 minutes. Drag, drop, done. No agent meetings." },
    { icon: Upload, title: "Publish for free", body: "Zero commission, zero hidden fees. Reach thousands of UK buyers instantly." },
    { icon: Handshake, title: "Talk directly to buyers", body: "Get real offers in your inbox. You're in full control — no middlemen." },
  ],
  agent: [
    { icon: Link2, title: "Connect your XML feed", body: "One-time setup. Your entire portfolio syncs automatically — no manual entry." },
    { icon: BarChart3, title: "Track every listing live", body: "See views, enquiries, and offers across all your properties in one dashboard." },
    { icon: Users, title: "Reach more buyers", body: "Tap into our investor network and direct buyer traffic — no extra cost." },
  ],
};

const CTA: Record<Role, { to: string; label: string }> = {
  buyer: { to: "/search", label: "Browse properties" },
  seller: { to: "/dashboard/seller", label: "List my property" },
  agent: { to: "/dashboard/agent", label: "Open agent hub" },
};

const STORAGE_KEY = "myinvestin.onboarding.v2";

interface OnboardingState {
  role: Role | null;
  step: number;
  completed: boolean;
}

function readState(): OnboardingState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OnboardingState;
    if (
      parsed &&
      typeof parsed.completed === "boolean" &&
      typeof parsed.step === "number" &&
      (parsed.role === null || ["buyer", "seller", "agent"].includes(parsed.role))
    ) {
      return parsed;
    }
  } catch {
    // ignore corrupt storage
  }
  return null;
}

function writeState(state: OnboardingState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function OnboardingWalkthrough() {
  const saved = readState();
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    const s = readState();
    // auto-open on first visit or if a role walkthrough was left incomplete
    return !s || (!s.completed && s.role !== null);
  });
  const [role, setRole] = useState<Role | null>(saved?.role ?? null);
  const [step, setStep] = useState(saved?.step ?? 0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const s = readState();
    // first visit: no saved state at all
    if (!s) {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
    // resume an in-progress role walkthrough
    if (!s.completed && s.role !== null) {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  // persist progress whenever role or step changes (only when inside a role walkthrough)
  useEffect(() => {
    if (role !== null) {
      writeState({ role, step, completed: false });
    }
  }, [role, step]);

  const markCompleted = () => {
    writeState({ role, step, completed: true });
  };

  const close = () => {
    markCompleted();
    setOpen(false);
    setRole(null);
    setStep(0);
  };

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true);
          setRole(null);
          setStep(0);
        }}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-xs font-bold text-white shadow-xl shadow-navy/20 transition-transform hover:scale-105"
        aria-label="Open tutorial"
      >
        <Sparkles size={14} className="text-gold" /> How it works
      </button>
    );
  }

  const steps = role ? STEPS[role] : [];
  const current = role ? steps[step] : null;
  const Icon = current?.icon;
  const cta = role ? CTA[role] : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/60 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-white/80 text-navy/60 hover:bg-navy/5"
        >
          <X size={16} />
        </button>

        {!role && (
          <div className="p-7 sm:p-9">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
              <Sparkles size={12} /> Welcome
            </span>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Let's get you started in 30 seconds.
            </h2>
            <p className="mt-2 text-sm font-medium text-navy/60">
              Tell us who you are — we'll show you exactly how MyInvestIn works for you.
            </p>

            <div className="mt-6 space-y-3">
              {ROLES.map((r) => {
                const Ic = r.icon;
                const accentBg = r.accent === "teal" ? "bg-teal/10 text-teal" : r.accent === "gold" ? "bg-gold/10 text-gold" : "bg-navy text-white";
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      setStep(0);
                    }}
                    className="group flex w-full items-center gap-4 rounded-2xl border-2 border-navy/10 p-4 text-left transition-all hover:border-navy hover:bg-navy/[0.02]"
                  >
                    <div className={`grid size-12 shrink-0 place-items-center rounded-xl ${accentBg}`}>
                      <Ic size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-extrabold text-navy">{r.label}</div>
                      <div className="text-xs font-medium text-navy/55">{r.tagline}</div>
                    </div>
                    <ArrowRight size={18} className="shrink-0 text-navy/30 transition-transform group-hover:translate-x-1 group-hover:text-navy" />
                  </button>
                );
              })}
            </div>

            <button onClick={close} className="mt-5 w-full text-center text-xs font-bold text-navy/40 hover:text-navy/70">
              Skip — I'll explore on my own
            </button>
          </div>
        )}

        {role && current && Icon && cta && (
          <div>
            <div className="h-1.5 w-full bg-navy/5">
              <div
                className="h-full bg-teal transition-all duration-300"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="p-7 sm:p-9">
              <div className="text-[10px] font-bold uppercase tracking-widest text-navy/40">
                Step {step + 1} of {steps.length} • {ROLES.find((r) => r.id === role)!.label}
              </div>

              <div className="mt-5 grid size-16 place-items-center rounded-2xl bg-teal/10 text-teal">
                <Icon size={28} />
              </div>

              <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-navy">{current.title}</h3>
              <p className="mt-2 text-sm font-medium text-navy/60">{current.body}</p>

              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  onClick={() => (step === 0 ? setRole(null) : setStep((s) => s - 1))}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-navy/60 hover:bg-navy/5"
                >
                  <ArrowLeft size={14} /> Back
                </button>

                <div className="flex items-center gap-1.5">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-navy" : "w-1.5 bg-navy/15"}`}
                    />
                  ))}
                </div>

                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white hover:bg-navy/90"
                  >
                    Next <ArrowRight size={14} />
                  </button>
                ) : (
                  <Link
                    to={cta.to}
                    onClick={close}
                    className="flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-bold text-white shadow-lg shadow-gold/20"
                  >
                    {cta.label} <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
