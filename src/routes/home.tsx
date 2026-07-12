import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { MobileShell } from "@/components/mobile-shell";
import { LanguageToggle } from "@/components/language-toggle";
import { calcWeekFromLMP, calcWeekFromDue, weekInfo, trimester } from "@/lib/pregnancy";
import { mealPlan, type DietPref } from "@/lib/diet";
import { supabase } from "@/integrations/supabase/client";
import { Activity, Salad, Calendar, Footprints, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
});


function hoursUntil(iso: string) {
  return (new Date(iso).getTime() - Date.now()) / 36e5;
}

function HomePage() {
  const { t } = useI18n();
  const { user, profile, loading } = useAuth();
  const nav = useNavigate();
  const [nextAppt, setNextAppt] = React.useState<{ title: string; scheduled_at: string } | null>(null);

  React.useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/login" });
    else if (profile && !profile.onboarded) nav({ to: "/onboarding" });
  }, [user, profile, loading, nav]);

  React.useEffect(() => {
    if (!user) return;
    supabase
      .from("appointments")
      .select("title, scheduled_at")
      .eq("user_id", user.id)
      .eq("completed", false)
      .gte("scheduled_at", new Date().toISOString())
      .order("scheduled_at", { ascending: true })
      .limit(1)
      .then(({ data }) => setNextAppt((data?.[0] as any) ?? null));
  }, [user]);

  const week = calcWeekFromLMP(profile?.lmp_date) ?? calcWeekFromDue(profile?.due_date) ?? 1;
  const info = weekInfo(week);
  const tri = trimester(week) as 1 | 2 | 3;
  const meals = mealPlan((profile?.diet as DietPref) || "veg", tri);

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">{t("app_name")}</p>
            <h1 className="truncate font-display text-2xl">Hi {profile?.name || "mama"} 🌸</h1>
          </div>
          <div className="shrink-0"><LanguageToggle /></div>
        </div>

        <Link
          to="/emergency"
          className="mt-4 flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive"
        >
          <AlertTriangle className="h-4 w-4" /> Know the emergency signs
        </Link>

        {/* Week banner */}
        <Link
          to="/week/$week"
          params={{ week: String(week) }}
          className="mt-6 block rounded-3xl bg-gradient-to-br from-[oklch(0.92_0.07_15)] to-[oklch(0.9_0.06_150)] p-5 shadow-sm transition-transform active:scale-[0.99]"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("week_of")}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-5xl font-semibold text-foreground">{week}</span>
            <span className="text-sm text-muted-foreground">/ 40 {t("week").toLowerCase()}</span>
          </div>
          <p className="mt-3 text-sm text-foreground/80">
            {t("baby_size")} <span className="font-medium">{info.size}</span>
          </p>
        </Link>

        {/* Tip */}
        <section className="mt-5 rounded-lg bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("todays_tip")}</p>
          <p className="mt-2 text-sm leading-relaxed">{info.tip}</p>
        </section>

        {/* Next appt + reminder */}
        {(() => {
          const soon = nextAppt ? hoursUntil(nextAppt.scheduled_at) : null;
          const isToday = soon !== null && soon <= 12 && soon >= -2;
          const isTomorrow = soon !== null && soon > 12 && soon <= 36;
          const reminder = isToday || isTomorrow;
          return (
            <section
              className={
                "mt-4 rounded-lg p-4 shadow-sm " +
                (reminder
                  ? "border border-primary/30 bg-primary/10"
                  : "bg-card")
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {reminder ? "Reminder" : t("next_appt")}
                  </p>
                  {isToday && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                      Today
                    </span>
                  )}
                  {isTomorrow && (
                    <span className="rounded-full bg-primary/80 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                      Tomorrow
                    </span>
                  )}
                </div>
                <Link to="/appointments" className="text-xs font-medium text-primary">View all</Link>
              </div>
              {nextAppt ? (
                <div className="mt-2 min-w-0">
                  <p className="truncate text-sm font-medium">{nextAppt.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(nextAppt.scheduled_at).toLocaleString()}
                  </p>
                  {reminder && (
                    <p className="mt-2 text-xs text-foreground/80">
                      {isToday
                        ? "Your visit is today. Carry your ANC card, previous reports and a water bottle."
                        : "Your visit is tomorrow. Keep your ANC card and reports ready."}
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">{t("none_scheduled")}</p>
              )}
            </section>
          );
        })()}

        {/* Quick actions */}
        <section className="mt-6">
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">{t("quick_actions")}</p>
          <div className="grid grid-cols-2 gap-3">
            <ActionCard to="/kicks" icon={<Footprints className="h-5 w-5" />} label={t("count_kicks")} />
            <ActionCard to="/symptoms" icon={<Activity className="h-5 w-5" />} label={t("log_symptom")} />
            <ActionCard to="/diet" icon={<Salad className="h-5 w-5" />} label={t("view_diet")} />
            <ActionCard to={"/week/$week" as any} params={{ week: String(week) }} icon={<Calendar className="h-5 w-5" />} label={t("view_week")} />
          </div>
        </section>

        {/* Diet preview */}
        <section className="mt-6 rounded-lg bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("breakfast")}</p>
            <Link to="/diet" className="text-xs font-medium text-primary">{t("view_diet")}</Link>
          </div>
          <p className="mt-2 text-sm">{meals.breakfast[0]}</p>
        </section>
      </div>
    </MobileShell>
  );
}

function ActionCard({
  to, params, icon, label,
}: { to: any; params?: any; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      params={params}
      className="flex flex-col items-start gap-2 rounded-lg bg-card p-4 shadow-sm transition-transform active:scale-[0.98]"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <span className="w-full break-words text-sm font-medium leading-snug">{label}</span>
    </Link>
  );
}
