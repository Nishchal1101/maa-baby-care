import * as React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Home, Calendar, Salad, Activity, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <main className="flex-1 pb-24">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}

function BottomNav() {
  const { t } = useI18n();
  const loc = useLocation();
  const items = [
    { to: "/home", icon: Home, label: t("home") },
    { to: "/tracker", icon: Activity, label: t("tracker") },
    { to: "/diet", icon: Salad, label: t("diet") },
    { to: "/appointments", icon: Calendar, label: t("appts") },
    { to: "/more", icon: MoreHorizontal, label: t("more") },
  ];
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur">
      <ul className="grid grid-cols-5">
        {items.map(({ to, icon: Icon, label }) => {
          const active = loc.pathname === to || loc.pathname.startsWith(to + "/");
          return (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 text-[11px] transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
