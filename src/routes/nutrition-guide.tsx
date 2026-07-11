import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { SourceNote } from "@/components/source-note";
import { rda, indianFoodSources, nutritionTips, nutritionSource } from "@/lib/nutrition";

export const Route = createFileRoute("/nutrition-guide")({
  head: () => ({
    meta: [
      { title: "Nutrition in pregnancy  -  Maa Baby Care" },
      { name: "description", content: "ICMR-NIN nutrition targets and Indian food sources for pregnant mothers." },
    ],
  }),
  component: NutritionGuidePage,
});

function NutritionGuidePage() {
  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">Nutrition guide</h1>
        <p className="mt-1 text-sm text-muted-foreground">Daily targets from ICMR-NIN with easy Indian food sources.</p>
        <DisclaimerBanner />

        <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Daily targets (RDA)</p>
          <ul className="mt-2 divide-y">
            {rda.map((r) => (
              <li key={r.nutrient} className="flex justify-between gap-3 py-2 text-sm">
                <span className="font-medium">{r.nutrient}</span>
                <span className="text-right text-muted-foreground">{r.value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Indian food sources</p>
          <ul className="mt-2 space-y-2 text-sm">
            {indianFoodSources.map((f) => (
              <li key={f.key}>
                <p className="font-medium">{f.key}</p>
                <p className="text-muted-foreground">{f.foods}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Practical tips</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {nutritionTips.map((t) => (
              <li key={t} className="flex gap-2"><span>•</span><span>{t}</span></li>
            ))}
          </ul>
        </section>

        <SourceNote source={nutritionSource} />
      </div>
    </MobileShell>
  );
}
