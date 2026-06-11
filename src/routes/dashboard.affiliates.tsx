import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/affiliates")({
  head: () => ({ meta: [{ title: "B2B Affiliates — MyInvestIn" }] }),
  component: Affiliates,
});

const PARTNERS = [
  { name: "Northern Build Co.", type: "Builders", area: "Manchester, M14", rating: 4.9, fee: "8% per intro" },
  { name: "RICS Surveyors Ltd", type: "Surveyors", area: "UK Nationwide", rating: 4.8, fee: "£75 per booking" },
  { name: "Verity Law", type: "Solicitors", area: "Leeds, LS6", rating: 4.7, fee: "12% per completion" },
  { name: "BrickCare Refurb", type: "Refurb Specialists", area: "Birmingham, B12", rating: 4.9, fee: "10% per project" },
  { name: "Insure My Let", type: "Landlord Insurance", area: "UK Nationwide", rating: 4.6, fee: "£25 per policy" },
  { name: "Capital Mortgage Hub", type: "Brokers", area: "London, EC1", rating: 4.8, fee: "0.5% commission" },
];

function Affiliates() {
  return (
    <div className="mx-auto max-w-[1500px] px-6 py-10 md:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">B2B Service Directory</h1>
        <p className="mt-1 text-sm font-medium text-navy/55">Native local providers • Tracked affiliate revenue on every connect</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((p) => (
          <div key={p.name} className="group flex flex-col rounded-2xl border border-navy/5 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy text-lg font-extrabold text-gold">
                {p.name[0]}
              </div>
              <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold">★ {p.rating}</span>
            </div>
            <h3 className="text-base font-extrabold">{p.name}</h3>
            <p className="mt-1 text-xs font-medium text-navy/55">{p.type} • {p.area}</p>

            <div className="mt-4 flex items-center justify-between border-t border-navy/5 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal">{p.fee}</span>
            </div>
            <button className="mt-4 w-full rounded-xl bg-teal py-2.5 text-xs font-bold text-white shadow shadow-teal/20 transition-transform hover:scale-[1.02]">
              Connect with Partner →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
