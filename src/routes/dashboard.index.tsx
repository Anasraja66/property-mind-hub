import { createFileRoute } from "@tanstack/react-router";
import { PROPERTIES } from "@/lib/properties";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Investor Pipeline — MyInvestIn" }] }),
  component: Pipeline,
});

const COLUMNS = [
  { id: "saved", label: "Deals Saved", count: 4, ids: ["wilmslow-m14", "rusholme-m13"] },
  { id: "ai", label: "AI Analysis Run", count: 2, ids: ["moseley-b12"] },
  { id: "offers", label: "Offers Made", count: 1, ids: ["heaton-sk4"] },
  { id: "closed", label: "Closed", count: 1, ids: ["headingley-ls6"] },
] as const;

function Pipeline() {
  return (
    <div className="mx-auto max-w-[1500px] px-6 py-10 md:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Investor Pipeline</h1>
          <p className="mt-1 text-sm font-medium text-navy/55">Organize your sourcing workflow. 8 active opportunities.</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-navy/15 px-4 py-2 text-xs font-bold hover:bg-white">Export CSV</button>
          <button className="rounded-lg bg-teal px-5 py-2 text-xs font-bold text-white shadow shadow-teal/20">+ Add Deal</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.id} className="flex flex-col rounded-2xl border border-navy/5 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${col.id === "closed" ? "bg-teal" : col.id === "offers" ? "bg-gold" : col.id === "ai" ? "bg-navy" : "bg-navy/30"}`} />
                <h3 className="text-xs font-bold uppercase tracking-widest">{col.label}</h3>
              </div>
              <span className="rounded-full bg-navy/5 px-2 py-0.5 text-[10px] font-bold text-navy/60">{col.count}</span>
            </div>

            <div className="space-y-3">
              {col.ids.map((id) => {
                const p = PROPERTIES.find((x) => x.id === id)!;
                return (
                  <div key={id} className="cursor-grab rounded-xl border border-navy/5 bg-surface p-4 transition-all hover:shadow-md">
                    {col.id === "ai" && (
                      <div className="mb-2 inline-flex items-center gap-1 rounded bg-gold px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                        AI Score 92/100
                      </div>
                    )}
                    <div className="text-sm font-bold">{p.address}</div>
                    <div className="text-[10px] font-medium text-navy/50">{p.city} {p.postcode}</div>
                    <div className="mt-3 flex items-center justify-between border-t border-navy/5 pt-3">
                      <span className="text-xs font-extrabold text-gold">£{(p.price / 1000).toFixed(0)}k</span>
                      <span className="text-[10px] font-bold text-teal">{p.yieldPct}% yield</span>
                    </div>
                  </div>
                );
              })}
              <button className="w-full rounded-xl border-2 border-dashed border-navy/10 py-3 text-xs font-bold text-navy/40 hover:border-teal hover:text-teal">
                + Add card
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
