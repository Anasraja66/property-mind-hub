import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { PROPERTIES, badgeStyles } from "@/lib/properties";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Marketplace — MyInvestIn" },
      { name: "description", content: "Browse verified UK property opportunities with one-click investor filters: BMV, yield, leasehold, equity." },
    ],
  }),
  component: Search,
});

const FILTERS = [
  { id: "bmv", label: "⚡ Below market price", cls: "bg-gold/10 text-gold border-gold/30", activeCls: "bg-gold text-white border-gold" },
  { id: "knot", label: "⚠️ Has known issues", cls: "bg-red-50 text-red-600 border-red-200", activeCls: "bg-red-600 text-white border-red-600" },
  { id: "lease", label: "⏳ Short lease (<80 yrs)", cls: "bg-white text-teal border-teal/40", activeCls: "bg-teal text-white border-teal" },
  { id: "neg", label: "📉 Worth less than paid", cls: "bg-white text-navy border-navy/30", activeCls: "bg-navy text-white border-navy" },
  { id: "hmo", label: "🏠 Good for sharing (HMO)", cls: "bg-white text-navy/70 border-navy/15", activeCls: "bg-navy text-white border-navy" },
  { id: "chain", label: "🔗 No chain — quick sale", cls: "bg-white text-navy/70 border-navy/15", activeCls: "bg-navy text-white border-navy" },
] as const;

function Search() {
  const [active, setActive] = useState<Set<string>>(new Set(["bmv"]));
  const toggle = (id: string) => {
    setActive((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  return (
    <div className="min-h-screen bg-surface text-navy">
      <SiteHeader />

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-12 md:px-8">
        {/* Filter panel */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-8 rounded-2xl border border-navy/5 bg-white p-6">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-navy/40">Location</h3>
              <input
                type="text"
                placeholder="Postcode e.g. M14"
                className="w-full rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm font-semibold focus:border-teal focus:outline-none"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-navy/40">Price Range</h3>
              <div className="flex gap-2">
                <input placeholder="Min" className="w-full rounded-lg border border-navy/10 bg-surface px-3 py-2 text-sm font-semibold focus:outline-none" />
                <input placeholder="Max" className="w-full rounded-lg border border-navy/10 bg-surface px-3 py-2 text-sm font-semibold focus:outline-none" />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-navy/40">Bedrooms</h3>
              <div className="flex gap-2">
                {["1+", "2+", "3+", "4+", "5+"].map((b, i) => (
                  <button
                    key={b}
                    className={`flex-1 rounded-lg border py-2 text-xs font-bold transition-colors ${
                      i === 2 ? "border-navy bg-navy text-white" : "border-navy/15 hover:bg-navy/5"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-navy/40">Investor One-Click</h3>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggle(f.id)}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all ${
                      active.has(f.id) ? f.activeCls : f.cls
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full rounded-xl bg-teal py-3 text-sm font-bold text-white shadow-lg shadow-teal/20">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Map + grid */}
        <main className="lg:col-span-9">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">{PROPERTIES.length} live opportunities</h1>
              <p className="mt-1 text-sm font-medium text-navy/55">Filtered by: <span className="font-bold text-gold">⚡ BMV Deals</span></p>
            </div>
            <div className="flex gap-1 rounded-lg border border-navy/10 bg-white p-1">
              <button className="rounded-md bg-navy px-4 py-1.5 text-xs font-bold text-white">Grid</button>
              <button className="rounded-md px-4 py-1.5 text-xs font-bold text-navy/60">Map</button>
              <button className="rounded-md px-4 py-1.5 text-xs font-bold text-navy/60">Split</button>
            </div>
          </div>

          {/* Map strip */}
          <div className="mb-6 overflow-hidden rounded-2xl border border-navy/5 bg-navy">
            <div className="relative h-48 bg-[radial-gradient(circle_at_30%_40%,rgba(13,148,136,0.4),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(180,83,9,0.4),transparent_50%)]">
              <div className="absolute inset-0 grid grid-cols-12 gap-px opacity-10">
                {Array.from({ length: 96 }).map((_, i) => <div key={i} className="border border-white/20" />)}
              </div>
              {[
                { t: "20%", l: "25%", c: "bg-gold" },
                { t: "45%", l: "55%", c: "bg-teal" },
                { t: "60%", l: "35%", c: "bg-gold" },
                { t: "30%", l: "75%", c: "bg-white" },
                { t: "70%", l: "70%", c: "bg-teal" },
              ].map((p, i) => (
                <div key={i} style={{ top: p.t, left: p.l }} className="absolute -translate-x-1/2 -translate-y-1/2">
                  <div className={`size-3 rounded-full ${p.c} ring-4 ring-white/20 animate-pulse`} />
                </div>
              ))}
              <div className="absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
                Live Map • UK Postcodes
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {PROPERTIES.map((p) => (
              <Link
                key={p.id}
                to="/property/$id"
                params={{ id: p.id }}
                className="group overflow-hidden rounded-2xl border border-navy/5 bg-white transition-all hover:shadow-xl hover:shadow-navy/10"
              >
                <div className="relative">
                  <img src={p.image} alt={`${p.address}, ${p.city}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <div className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase ${badgeStyles[p.badge]}`}>
                    {p.badgeLabel}
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold backdrop-blur">
                    Yield {p.yieldPct}%
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h3 className="truncate text-base font-bold">{p.address}</h3>
                    <span className="shrink-0 font-extrabold text-gold">£{(p.price / 1000).toFixed(0)}k</span>
                  </div>
                  <p className="mb-3 text-xs font-medium text-navy/55">{p.city} {p.postcode} • {p.beds} bed {p.type}</p>
                  <div className="flex items-center justify-between border-t border-navy/5 pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-tight text-navy/60">Est. £{(p.estValue / 1000).toFixed(0)}k</span>
                    <span className={`text-[11px] font-bold ${p.estValue > p.price ? "text-teal" : "text-red-600"}`}>
                      {p.estValue > p.price ? "↑" : "↓"} £{Math.abs(p.estValue - p.price).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
