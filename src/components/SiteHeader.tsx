import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/search", label: "Browse Homes", hint: "See properties for sale" },
  { to: "/sourcing", label: "AI Finder", hint: "Let AI find deals for you" },
  { to: "/agents", label: "For Agents", hint: "Tools for estate agents" },
  { to: "/dashboard", label: "My Dashboard", hint: "Your saved deals" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-navy/5 bg-white/85 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3 md:px-8 md:py-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="grid size-9 place-items-center rounded-lg bg-navy text-xl font-extrabold italic text-gold">M</div>
          <span className="text-base font-extrabold uppercase tracking-tight text-navy sm:text-lg">MyInvestIn</span>
        </Link>

        <div className="hidden gap-6 text-sm font-semibold md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                title={l.hint}
                className={active ? "text-navy" : "text-navy/55 transition-colors hover:text-navy"}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden text-sm font-bold text-navy sm:block">Log In</button>
          <Link
            to="/dashboard"
            className="hidden rounded-full bg-teal px-5 py-2 text-sm font-bold text-white shadow-lg shadow-teal/20 transition-transform hover:scale-[1.02] sm:inline-flex"
          >
            Get Started Free
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-lg border border-navy/10 text-navy md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-navy/5 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => {
              const active = pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-3 ${active ? "bg-navy text-white" : "text-navy hover:bg-navy/5"}`}
                >
                  <div className="text-sm font-bold">{l.label}</div>
                  <div className={`text-xs ${active ? "text-white/70" : "text-navy/50"}`}>{l.hint}</div>
                </Link>
              );
            })}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-xl bg-teal px-4 py-3 text-center text-sm font-bold text-white"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
