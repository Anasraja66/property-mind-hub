import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/sourcing")({
  head: () => ({ meta: [{ title: "AI Sourcing Tool — MyInvestIn" }] }),
  component: () => (
    <div className="min-h-screen bg-surface text-navy">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center md:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
          AnasMind AI • Premium
        </span>
        <h1 className="mx-auto mt-6 text-balance text-5xl font-extrabold tracking-tight">Autonomous AI Sourcing</h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-navy/60">
          Pre-screen thousands of UK postcodes. Surface only the deals that match your yield, equity and risk parameters.
        </p>
        <Link to="/search" className="mt-8 inline-flex rounded-xl bg-teal px-8 py-4 font-bold text-white shadow-lg shadow-teal/20">Explore the marketplace →</Link>
      </div>
    </div>
  ),
});
