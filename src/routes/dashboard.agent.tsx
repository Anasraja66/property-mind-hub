import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/agent")({
  head: () => ({ meta: [{ title: "Agent Feed Monitor — MyInvestIn" }] }),
  component: Agent,
});

const STATS = [
  { l: "XML Feed Status", v: "Operational", accent: "teal" },
  { l: "Total Listings Syncing", v: "3,482", accent: "navy" },
  { l: "Last Sync", v: "2m ago", accent: "navy" },
  { l: "Errors (24h)", v: "0", accent: "teal" },
];

const FEEDS = [
  { name: "Rightmove RM-XML v3", url: "feeds.agency.co.uk/rm.xml", count: 2104, status: "ok" },
  { name: "Zoopla Pro", url: "feeds.agency.co.uk/zoopla.xml", count: 1378, status: "ok" },
  { name: "OnTheMarket", url: "feeds.agency.co.uk/otm.xml", count: 0, status: "pending" },
];

function Agent() {
  return (
    <div className="mx-auto max-w-[1500px] px-6 py-10 md:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Estate Agent Feed Monitor</h1>
          <p className="mt-1 text-sm font-medium text-navy/55">Automated bulk listing sync • Castle & Cole Residential</p>
        </div>
        <button className="rounded-lg bg-teal px-5 py-2 text-xs font-bold text-white shadow shadow-teal/20">+ Connect Feed</button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.l} className="rounded-2xl border border-navy/5 bg-white p-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-navy/40">{s.l}</div>
            <div className={`mt-2 text-3xl font-extrabold ${s.accent === "teal" ? "text-teal" : "text-navy"}`}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-navy/5 bg-white">
        <div className="border-b border-navy/5 px-6 py-4">
          <h3 className="text-sm font-extrabold uppercase tracking-widest">Active XML Connections</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-navy/5 bg-surface text-[10px] font-bold uppercase tracking-widest text-navy/40">
            <tr>
              <th className="px-6 py-3">Feed</th>
              <th className="px-6 py-3">Endpoint</th>
              <th className="px-6 py-3 text-right">Listings</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {FEEDS.map((f) => (
              <tr key={f.name}>
                <td className="px-6 py-4 font-bold">{f.name}</td>
                <td className="px-6 py-4 font-mono text-xs text-navy/55">{f.url}</td>
                <td className="px-6 py-4 text-right font-extrabold">{f.count.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${f.status === "ok" ? "bg-teal/10 text-teal" : "bg-gold/10 text-gold"}`}>
                    <span className={`size-1.5 rounded-full ${f.status === "ok" ? "bg-teal" : "bg-gold"} animate-pulse`} />
                    {f.status === "ok" ? "Operational" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
