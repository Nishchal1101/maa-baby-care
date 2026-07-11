import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { calcWeekFromLMP, calcWeekFromDue, trimester } from "@/lib/pregnancy";
import { mealPlan, foodsToAvoid, type DietPref, type Trim } from "@/lib/diet";

export const Route = createFileRoute("/diet")({
  component: DietPage,
});

function DietPage() {
  const { t } = useI18n();
  const { profile } = useAuth();
  const initialTri = (() => {
    const w = calcWeekFromLMP(profile?.lmp_date) ?? calcWeekFromDue(profile?.due_date) ?? 1;
    return trimester(w) as Trim;
  })();
  const [tri, setTri] = React.useState<Trim>(initialTri);
  const pref = (profile?.diet as DietPref) || "veg";
  const meals = mealPlan(pref, tri);

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("diet_title")}</h1>
        <p className="mt-1 text-xs text-muted-foreground">{t(pref)}</p>

        <div className="mt-5 inline-flex rounded-full bg-muted p-1 text-xs">
          {([1, 2, 3] as Trim[]).map((n) => (
            <button
              key={n}
              onClick={() => setTri(n)}
              className={
                "rounded-full px-4 py-1.5 transition-colors " +
                (tri === n ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")
              }
            >
              {t("trimester")} {n}
            </button>
          ))}
        </div>

        <Meal label={t("breakfast")} items={meals.breakfast} />
        <Meal label={t("lunch")} items={meals.lunch} />
        <Meal label={t("snack")} items={meals.snack} />
        <Meal label={t("dinner")} items={meals.dinner} />

        <section className="mt-6 rounded-lg bg-destructive/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-destructive">{t("avoid")}</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {foodsToAvoid.map((f) => (
              <li key={f} className="flex gap-2"><span>•</span><span>{f}</span></li>
            ))}
          </ul>
        </section>
      </div>
    </MobileShell>
  );
}

function Meal({ label, items }: { label: string; items: string[] }) {
  return (
    <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i} className="flex gap-2"><span>🍽️</span><span>{i}</span></li>
        ))}
      </ul>
    </section>
  );
}
