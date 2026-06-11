import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { getProperty, PROPERTIES, badgeStyles } from "@/lib/properties";

export const Route = createFileRoute("/property/$id")({
  loader: ({ params }) => {
    const p = getProperty(params.id);
    if (!p) throw notFound();
    return { property: p };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.property.address}, ${loaderData?.property.city} — MyInvestIn` },
      { name: "description", content: `${loaderData?.property.beds} bed ${loaderData?.property.type} in ${loaderData?.property.city}. £${loaderData?.property.price.toLocaleString()}. Estimated value £${loaderData?.property.estValue.toLocaleString()}.` },
      { property: "og:image", content: loaderData?.property.image },
    ],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-surface text-navy">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">Property not found</h1>
        <Link to="/search" className="mt-4 inline-block text-teal font-bold">← Back to marketplace</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="grid min-h-screen place-items-center bg-surface">
      <button onClick={reset} className="rounded-lg bg-teal px-6 py-3 font-bold text-white">Try again</button>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const { property: p } = Route.useLoaderData();
  const gap = p.estValue - p.price;
  const gapPct = ((gap / p.price) * 100).toFixed(1);
  const related = PROPERTIES.filter((x) => x.id !== p.id).slice(0, 3);

  const history = [
    { date: "May 2022", details: `${p.type} / Freehold`, price: Math.round(p.price * 0.92), source: "UK Land Reg" },
    { date: "Aug 2018", details: `${p.type} / Freehold`, price: Math.round(p.price * 0.78), source: "UK Land Reg" },
    { date: "Mar 2012", details: `${p.type} / Freehold`, price: Math.round(p.price * 0.61), source: "UK Land Reg" },
    { date: "Nov 2004", details: `${p.type} / Freehold`, price: Math.round(p.price * 0.45), source: "UK Land Reg" },
  ];

  return (
    <div className="min-h-screen bg-surface text-navy">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <Link to="/search" className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy/50 hover:text-teal">
          ← Back to marketplace
        </Link>

        {/* Executive header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-navy/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy/60">
                {p.postcode}
              </span>
              <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${badgeStyles[p.badge]}`}>
                {p.badgeLabel}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{p.address}</h1>
            <p className="mt-2 text-lg font-medium text-navy/60">{p.city} • {p.beds} bed {p.type} • Forecast Yield {p.yieldPct}%</p>

            <div className="mt-6 grid grid-cols-4 gap-3">
              <img src={p.image} alt={p.address} className="col-span-3 aspect-video w-full rounded-2xl object-cover" />
              <div className="flex flex-col gap-3">
                <img src={p.image} alt="" className="aspect-square w-full rounded-xl object-cover opacity-90" />
                <img src={p.image} alt="" className="aspect-square w-full rounded-xl object-cover opacity-90" />
              </div>
            </div>

            {/* Financial split */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-navy/5 bg-white p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Asking Price</span>
                <div className="mt-2 text-4xl font-extrabold">£{p.price.toLocaleString()}</div>
                <p className="mt-2 text-xs font-medium text-navy/50">Listed by owner • Verified</p>
              </div>
              <div className="rounded-2xl bg-teal p-6 text-white shadow-lg shadow-teal/20">
                <div className="flex justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Est. Market Value</span>
                  <span className="rounded bg-gold px-2 py-0.5 text-[10px] font-bold">↑ {gapPct}% Gap</span>
                </div>
                <div className="mt-2 text-4xl font-extrabold">£{p.estValue.toLocaleString()}</div>
                <p className="mt-2 text-xs font-medium text-white/80">+£{gap.toLocaleString()} equity opportunity</p>
              </div>
            </div>

            {/* Land Registry table */}
            <div className="mt-10">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold">
                <span className="h-5 w-1 bg-navy" /> Historical Transactions ({p.postcode.split(" ")[0]})
              </h2>
              <div className="overflow-hidden rounded-2xl border border-navy/5 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-navy/5 bg-surface text-[10px] font-bold uppercase tracking-widest text-navy/40">
                    <tr>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Property Details</th>
                      <th className="px-5 py-3 text-right">Price Paid</th>
                      <th className="px-5 py-3">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/5">
                    {history.map((h) => (
                      <tr key={h.date} className="hover:bg-surface">
                        <td className="px-5 py-4 font-medium">{h.date}</td>
                        <td className="px-5 py-4 text-navy/70">{h.details}</td>
                        <td className="px-5 py-4 text-right font-bold">£{h.price.toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-bold text-teal">
                            <span className="size-1.5 rounded-full bg-teal" /> {h.source}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Related */}
            <div className="mt-12">
              <h2 className="mb-4 text-xl font-extrabold">Similar opportunities nearby</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.id} to="/property/$id" params={{ id: r.id }} className="group overflow-hidden rounded-xl border border-navy/5 bg-white hover:shadow-lg">
                    <img src={r.image} alt={r.address} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-4">
                      <h4 className="truncate text-sm font-bold">{r.address}</h4>
                      <p className="text-xs text-navy/55">£{(r.price / 1000).toFixed(0)}k • {r.yieldPct}% yield</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky AnasMind */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-2xl shadow-navy/30">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gold/20 blur-[60px]" />
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-full border border-gold/30 bg-gold/20 font-black text-gold">A</div>
                    <div>
                      <h4 className="font-bold">AnasMind AI</h4>
                      <p className="text-[10px] uppercase tracking-widest text-gold">Premium Intelligence</p>
                    </div>
                  </div>

                  <button className="pulse-gold w-full rounded-xl bg-gold py-4 font-extrabold text-navy shadow-lg shadow-gold/20 transition-transform hover:scale-[1.02]">
                    🤖 Run AnasMind Analysis
                  </button>

                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {[
                      { v: `${p.yieldPct}%`, l: "Rental Yield", color: "teal" },
                      { v: "£12k", l: "Est. Refurb", color: "gold" },
                      { v: "88%", l: "Confidence", color: "white" },
                    ].map((m) => (
                      <div key={m.l} className="flex flex-col items-center text-center">
                        <div
                          className={`grid size-16 place-items-center rounded-full border-4 font-bold ${
                            m.color === "teal" ? "border-teal text-teal" : m.color === "gold" ? "border-gold/30 border-t-gold text-gold" : "border-white/20 border-t-white text-white"
                          }`}
                        >
                          <span className="text-[11px]">{m.v}</span>
                        </div>
                        <span className="mt-2 text-[9px] font-bold uppercase tracking-tight opacity-60">{m.l}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 text-xs italic text-white/70">
                    "Strong alignment with {p.city} rental demand. Undervalued by {gapPct}% relative to recent {p.postcode.split(" ")[0]} pipeline."
                  </p>
                </div>
              </div>

              {/* Action stack */}
              <div className="rounded-2xl border border-navy/5 bg-white p-6">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-navy/40">Take Action</h4>
                <div className="space-y-3">
                  <button className="w-full rounded-xl bg-teal py-3 text-sm font-bold text-white shadow shadow-teal/20">Make an Offer</button>
                  <button className="w-full rounded-xl border border-navy/15 py-3 text-sm font-bold text-navy hover:bg-navy/5">Save to Pipeline</button>
                  <button className="w-full rounded-xl border border-navy/15 py-3 text-sm font-bold text-navy hover:bg-navy/5">Book Viewing</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
