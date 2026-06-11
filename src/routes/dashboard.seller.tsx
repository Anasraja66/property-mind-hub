import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/seller")({
  head: () => ({ meta: [{ title: "P2P Seller — MyInvestIn" }] }),
  component: Seller,
});

function Seller() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">List your property in under 2 minutes</h1>
        <p className="mt-2 text-sm font-medium text-navy/55">Drag photos. Fill the basics. Go live with zero estate agent fees.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <form className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border-2 border-dashed border-navy/15 bg-white p-10 text-center">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-teal/10 text-2xl text-teal">📷</div>
            <h3 className="text-base font-extrabold">Drag & drop photos here</h3>
            <p className="mt-1 text-xs text-navy/55">PNG or JPG, up to 25 photos</p>
            <button type="button" className="mt-4 rounded-lg bg-navy px-5 py-2 text-xs font-bold text-white">Browse files</button>
          </div>

          <div className="rounded-2xl border border-navy/5 bg-white p-6">
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-navy/60">Property Basics</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { l: "Postcode", p: "M14 5TQ" },
                { l: "Asking Price (£)", p: "185000" },
                { l: "Bedrooms", p: "3" },
                { l: "Property Type", p: "Terrace" },
              ].map((f) => (
                <div key={f.l}>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-navy/40">{f.l}</label>
                  <input placeholder={f.p} className="w-full rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm font-semibold focus:border-teal focus:outline-none" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-navy/40">Description</label>
                <textarea rows={4} placeholder="A bright 3-bed terrace, fully tenanted..." className="w-full rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm font-medium focus:border-teal focus:outline-none" />
              </div>
            </div>
          </div>

          <button className="w-full rounded-xl bg-teal py-4 text-sm font-bold text-white shadow-lg shadow-teal/20">
            Publish Listing — Free
          </button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-navy p-6 text-white">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold">Why list direct?</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {["0% commission, ever", "Reach 14k+ verified buyers", "Live UK Land Registry data", "AI-priced from day one"].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-teal" />
                  <span className="text-white/85">{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-navy/5 bg-white p-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Avg. time to list</div>
            <div className="mt-2 text-3xl font-extrabold text-teal">1m 47s</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
