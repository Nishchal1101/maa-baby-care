import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { SourceNote } from "@/components/source-note";
import { RedFlagCard } from "@/components/red-flag-card";
import { trueLabor, falseLabor, whenToGoHospital, pretermSigns, laborSource } from "@/lib/labor-signs";

export const Route = createFileRoute("/labor-signs")({
  head: () => ({
    meta: [
      { title: "Labor warning signs  -  Maa Baby Care" },
      { name: "description", content: "How to tell true labor from false labor, when to leave for hospital, and preterm labor signs." },
    ],
  }),
  component: LaborPage,
});

function LaborPage() {
  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">Labor warning signs</h1>
        <DisclaimerBanner />

        <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Signs of true labor</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {trueLabor.map((i) => <li key={i} className="flex gap-2"><span>•</span><span>{i}</span></li>)}
          </ul>
        </section>

        <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">False labor (Braxton-Hicks)</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {falseLabor.map((i) => <li key={i} className="flex gap-2"><span>•</span><span>{i}</span></li>)}
          </ul>
        </section>

        <RedFlagCard title="Go to hospital when" items={whenToGoHospital} />
        <RedFlagCard title={pretermSigns.title} items={pretermSigns.items} />
        <SourceNote source={laborSource} />
      </div>
    </MobileShell>
  );
}
