import { Link, useRouterState } from "@tanstack/react-router";

const links = [
  { to: "/search", label: "Marketplace" },
  { to: "/sourcing", label: "Sourcing Tool" },
  { to: "/agents", label: "Agent Hub" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-navy/5 bg-white/80 px-6 py-4 backdrop-blur-md md:px-8">
      <Link to="/" className="flex items-center gap-2">
        <div className="grid size-8 place-items-center rounded bg-navy text-xl font-extrabold italic text-gold">M</div>
        <span className="text-lg font-extrabold uppercase tracking-tight text-navy">MyInvestIn</span>
      </Link>
      <div className="hidden gap-7 text-sm font-semibold md:flex">
        {links.map((l) => {
          const active = pathname.startsWith(l.to);
          return (
            <Link
              key={l.to}
              to={l.to}
              className={active ? "text-navy" : "text-navy/55 transition-colors hover:text-navy"}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <button className="hidden text-sm font-bold text-navy sm:block">Log In</button>
        <Link
          to="/dashboard"
          className="rounded-full bg-teal px-5 py-2 text-sm font-bold text-white shadow-lg shadow-teal/20 transition-transform hover:scale-[1.02]"
        >
          Start Investing
        </Link>
      </div>
    </nav>
  );
}
