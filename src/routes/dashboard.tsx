import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const TABS = [
  { to: "/dashboard", label: "Investor Pipeline", end: true },
  { to: "/dashboard/seller", label: "P2P Seller", end: false },
  { to: "/dashboard/agent", label: "Agent Feed", end: false },
  { to: "/dashboard/affiliates", label: "B2B Affiliates", end: false },
] as const;

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-surface text-navy">
      <SiteHeader />
      <div className="border-b border-navy/5 bg-white px-6 md:px-8">
        <div className="mx-auto flex max-w-[1500px] gap-1 overflow-x-auto">
          {TABS.map((t) => {
            const active = t.end ? pathname === t.to : pathname.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`shrink-0 border-b-2 px-5 py-4 text-sm font-bold transition-colors ${
                  active ? "border-teal text-teal" : "border-transparent text-navy/50 hover:text-navy"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
