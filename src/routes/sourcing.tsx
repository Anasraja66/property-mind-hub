import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Search, Sparkles, BellRing } from "lucide-react";

export const Route = createFileRoute("/sourcing")({
  head: () => ({
    meta: [
      { title: "AI Property Finder — MyInvestIn" },
      { name: "description", content: "Tell us what you're looking for. Our AI scans thousands of UK properties and brings you the best matches." },
    ],
  }),
  component: Sourcing,
});

const STEPS = [
  { icon: Search, title: "1. Tell us what you want", body: "Pick your area, budget and goal — buy a home, rent it out, or flip it. No jargon." },
  { icon: Sparkles, title: "2. AI does the hunting", body: "We scan UK Land Registry and live listings 24/7 to find the best matches for you." },
  { icon: BellRing, title: "3. Get instant alerts", body: "New deal? You'll know in seconds, before anyone else. Save the ones you like." },
];

function Sourcing() {
  return (
    <div className="min-h-screen bg-surface text-navy">
      <SiteHeader />

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
            <Sparkles size={14} /> AI Property Finder
          </span>
          <h1 className="mx-auto mt-6 text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
            Let AI find your next property — <span className="text-teal">for free.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base font-medium text-navy/60 md:text-lg">
            Stop scrolling through hundreds of listings. Tell us what you want and we'll bring the best UK deals straight to you.
          </p>
        </div>

        {/* Simple form */}
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-navy/5 bg-white p-6 shadow-xl shadow-navy/5 md:p-8">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-navy">What's your goal?</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {["Buy a home", "Invest to rent", "Buy & flip"].map((g, i) => (
                  <button
                    key={g}
                    className={`rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all ${
                      i === 1 ? "border-teal bg-teal/5 text-teal" : "border-navy/10 text-navy/70 hover:border-navy/30"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-navy">Where?</label>
              <input
                placeholder="Type a city or postcode — e.g. Manchester or M14"
                className="w-full rounded-xl border-2 border-navy/10 bg-surface px-4 py-3 text-sm font-semibold focus:border-teal focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-navy/50">Not sure? Just type your favourite city.</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-navy">Your budget</label>
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Min £" className="rounded-xl border-2 border-navy/10 bg-surface px-4 py-3 text-sm font-semibold focus:border-teal focus:outline-none" />
                <input placeholder="Max £" className="rounded-xl border-2 border-navy/10 bg-surface px-4 py-3 text-sm font-semibold focus:border-teal focus:outline-none" />
              </div>
            </div>

            <Link
              to="/search"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-4 text-base font-extrabold text-white shadow-lg shadow-gold/20 transition-transform hover:scale-[1.01]"
            >
              <Sparkles size={18} /> Find My Properties
            </Link>
            <p className="text-center text-xs text-navy/50">100% free • No credit card needed</p>
          </div>
        </div>

        {/* How it works */}
        <div className="mx-auto mt-20 max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-extrabold tracking-tight md:text-3xl">How it works</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-navy/5 bg-white p-6">
                <div className="mb-4 grid size-12 place-items-center rounded-xl bg-teal/10 text-teal">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-lg font-extrabold">{title}</h3>
                <p className="text-sm text-navy/60">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
