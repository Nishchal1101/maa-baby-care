import * as React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { BackButton } from "@/components/back-button";
import { Home, Calendar, Salad, Activity, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col overflow-x-hidden">
        <main className="w-full flex-1 pb-24">
          <div className="px-5 pt-5">
            <BackButton />
          </div>
          {children}
        </main>
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
    <nav className="fixed bottom-4 left-1/2 z-30 w-full max-w-md -translate-x-1/2 px-4">
      <div className="rounded-2xl border border-border/60 bg-card/95 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <ul className="grid grid-cols-5 py-2">
          {items.map(({ to, icon: Icon, label }) => {
            const active =
              loc.pathname === to || loc.pathname.startsWith(to + "/");
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    "flex flex-col items-center gap-[3px] px-1 py-2 text-[10px] font-medium transition-all duration-200",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
                      active
                        ? "bg-primary/15 text-primary"
                        : "bg-transparent",
                    )}
                  >
                    <Icon
                      className="h-[18px] w-[18px] shrink-0"
                      strokeWidth={active ? 2.5 : 1.8}
                    />
                  </span>
                  <span className="max-w-full truncate leading-none">
                    {label}
                  </span>
                  {active && (
                    <span className="mt-[1px] h-1 w-1 rounded-full bg-primary" />
                  )}
                  {!active && <span className="mt-[1px] h-1 w-1" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
