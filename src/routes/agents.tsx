import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/agents")({
  head: () => ({ meta: [{ title: "Agency Hub — MyInvestIn" }] }),
  component: () => (
    <div className="min-h-screen bg-surface text-navy">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center md:px-8">
        <h1 className="text-5xl font-extrabold tracking-tight">Built for UK Estate Agents</h1>
        <p className="mx-auto mt-4 max-w-xl text-navy/60">Sync your full portfolio via XML feed. One connection, thousands of listings.</p>
        <Link to="/dashboard/agent" className="mt-8 inline-flex rounded-xl bg-navy px-8 py-4 font-bold text-white">Open Agent Feed Monitor →</Link>
      </div>
    </div>
  ),
});
