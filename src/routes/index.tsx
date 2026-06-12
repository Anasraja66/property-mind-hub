import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { PROPERTIES, badgeStyles } from "@/lib/properties";

export const Route = createFileRoute("/")({
  component: Home,
});

const TABS = [
  { id: "buy", label: "🏡 I want to buy", sub: "Find a home directly from owners — no agent fees." },
  { id: "deals", label: "💰 I want to invest", sub: "Discover below-market deals with high rental returns." },
  { id: "agency", label: "🏢 I'm an agent", sub: "List and manage your portfolio with one connection." },
] as const;

function Home() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("buy");
  const featured = PROPERTIES.slice(0, 4);
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="min-h-screen bg-surface text-navy">
      <SiteHeader />

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy/60">
              <span className="size-1.5 rounded-full bg-teal animate-pulse" /> UK Land Registry • Live Sync
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
              Find your next <span className="text-teal">UK property</span> in minutes.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base font-medium text-navy/60 md:text-lg">
              Whether you're buying your first home or your tenth investment — we make it simple. No agent fees, no jargon, just the right deals.
            </p>
          </div>

          {/* Split-intent search */}
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-navy/5 bg-white shadow-2xl shadow-navy/5">
            <div className="grid grid-cols-3 border-b border-navy/5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`py-4 text-xs font-bold sm:text-sm transition-colors ${
                    tab === t.id ? "bg-navy text-white" : "text-navy/45 hover:bg-navy/5"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="px-6 pt-4 text-xs font-medium text-navy/50">{active.sub}</p>
            <div className="flex flex-col gap-4 p-6 md:flex-row">
              <div className="flex flex-1 flex-col gap-1 px-4 md:border-r md:border-navy/10">
                <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Manchester M14"
                  className="bg-transparent text-lg font-semibold focus:outline-none"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 px-4 md:border-r md:border-navy/10">
                <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">
                  {tab === "deals" ? "Min Yield" : "Max Price"}
                </label>
                <input
                  type="text"
                  placeholder={tab === "deals" ? "7.0% +" : "£500,000"}
                  className="bg-transparent text-lg font-semibold focus:outline-none"
                />
              </div>
              <Link
                to="/search"
                className="flex items-center justify-center gap-2 rounded-xl bg-gold px-10 py-4 font-bold text-white shadow-lg shadow-gold/20 transition-transform hover:scale-[1.02]"
              >
                Search Now →
              </Link>
            </div>
          </div>

          {/* Trust counters */}
          <div className="mt-16 grid grid-cols-1 gap-8 border-y border-navy/5 py-10 sm:grid-cols-3">
            {[
              { v: "14,282", l: "Verified Properties Listed" },
              { v: "£842M", l: "Equity Tracked", accent: "text-gold" },
              { v: "LIVE", l: "UK Land Registry Sync", accent: "text-teal" },
            ].map((c) => (
              <div key={c.l} className="text-center">
                <div className={`text-3xl font-extrabold tracking-tight ${c.accent ?? ""}`}>{c.v}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-navy/40">{c.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market opportunities + AnasMind */}
      <section className="bg-white px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Live Market Opportunities</h2>
                <p className="mt-1 text-sm font-medium text-navy/55">Updated 2 minutes ago • Synced from UK Land Registry</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold text-gold">⚡ BMV Deals</span>
                <span className="rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-bold text-teal">0% Commission</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  to="/property/$id"
                  params={{ id: p.id }}
                  className="group overflow-hidden rounded-2xl border border-navy/5 bg-surface transition-all hover:shadow-xl hover:shadow-navy/10"
                >
                  <div className="relative">
                    <img src={p.image} alt={`${p.address}, ${p.city}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    <div className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase ${badgeStyles[p.badge]}`}>
                      {p.badgeLabel}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <h3 className="truncate text-lg font-bold">{p.address}, {p.postcode.split(" ")[0]}</h3>
                      <span className="shrink-0 font-extrabold text-gold">£{(p.price / 1000).toFixed(0)}k</span>
                    </div>
                    <p className="mb-4 text-xs font-medium italic text-navy/60">
                      {p.beds} Bed • {p.type} • Yield {p.yieldPct}%
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${p.badge === "neg" ? "bg-navy" : "bg-teal"}`} />
                      <span className="text-[10px] font-bold uppercase tracking-tight text-navy/60">{p.note}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/search" className="inline-flex items-center gap-2 text-sm font-bold text-teal hover:gap-3 transition-all">
                Browse all 14,282 properties →
              </Link>
            </div>
          </div>

          {/* AnasMind sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 overflow-hidden rounded-3xl bg-navy p-8 text-white">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gold/30 blur-[60px]" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full border border-gold/30 bg-gold/20 font-black text-gold">A</div>
                  <div>
                    <h4 className="font-bold">AnasMind AI</h4>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Autonomous Intelligence</p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs text-white/60">Today's Top Equity Gap</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-gold">£58,000</span>
                    <span className="mb-1 text-xs font-bold text-teal">↑ Moseley Rd, B12</span>
                  </div>
                </div>

                <button className="pulse-gold mt-6 w-full rounded-xl bg-gold py-4 font-extrabold text-navy transition-transform hover:scale-[1.02]">
                  🤖 Run AI Analysis
                </button>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="grid size-16 place-items-center rounded-full border-4 border-teal font-bold text-teal">9.2%</div>
                    <span className="mt-2 text-[10px] font-bold uppercase opacity-60">Avg. ROI</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="grid size-16 place-items-center rounded-full border-4 border-gold/30 border-t-gold font-bold text-gold">88%</div>
                    <span className="mt-2 text-[10px] font-bold uppercase opacity-60">Confidence</span>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <h5 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/40">Recent Comps</h5>
                  <div className="space-y-2 text-[11px] font-medium">
                    <div className="flex justify-between"><span>42 Church Ln, M14</span><span className="text-white/80">£210,000</span></div>
                    <div className="flex justify-between"><span>19 High St, M14</span><span className="text-white/80">£195,500</span></div>
                    <div className="flex justify-between"><span>7 Park Rd, M14</span><span className="text-white/80">£228,000</span></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Audiences */}
      <section className="bg-surface px-6 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight">One platform. Three powerful experiences.</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "P2P Sellers", body: "List your home in under 2 minutes. Drag, drop, publish — zero estate agent fees, ever.", cta: "List a property", to: "/dashboard/seller" as const, accent: "teal" },
              { title: "Investor Pipeline", body: "Kanban-style CRM. Save deals, run AI analysis, track offers from saved through to closed.", cta: "Open pipeline", to: "/dashboard" as const, accent: "gold" },
              { title: "Agency Hub", body: "Automated XML feed sync. Push thousands of listings live with one connection.", cta: "Connect feed", to: "/dashboard/agent" as const, accent: "navy" },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-navy/5 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className={`mb-6 inline-flex size-10 items-center justify-center rounded-lg ${c.accent === "gold" ? "bg-gold/15 text-gold" : c.accent === "teal" ? "bg-teal/15 text-teal" : "bg-navy text-white"} font-black`}>{c.title[0]}</div>
                <h3 className="mb-2 text-xl font-extrabold">{c.title}</h3>
                <p className="mb-6 text-sm text-navy/60">{c.body}</p>
                <Link to={c.to} className="text-sm font-bold text-teal hover:underline">{c.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-navy px-6 py-12 text-center text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center rounded bg-white/10 font-extrabold italic text-gold">M</div>
            <span className="text-lg font-extrabold uppercase tracking-tight">MyInvestIn</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">© 2026 MyInvestIn • Powered by AnasMind</p>
        </div>
      </footer>
    </div>
  );
}
