import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { SourceNote } from "@/components/source-note";
import { maternalVaccines, contraindicatedVaccines, maternalVaccinesSource } from "@/lib/vaccines-pregnancy";

export const Route = createFileRoute("/vaccines-pregnancy")({
  head: () => ({
    meta: [
      { title: "Vaccinations in pregnancy  -  Maa Baby Care" },
      { name: "description", content: "Recommended and contraindicated vaccines during pregnancy per Indian and WHO guidance." },
    ],
  }),
  component: VaccinesPregnancyPage,
});

function VaccinesPregnancyPage() {
  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">Vaccinations during pregnancy</h1>
        <DisclaimerBanner />

        {maternalVaccines.map((v) => (
          <section key={v.name} className="mt-4 rounded-lg bg-card p-4 shadow-sm">
            <p className="font-medium">{v.name}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">When</p>
            <p className="mt-1 text-sm">{v.when}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">Why</p>
            <p className="mt-1 text-sm">{v.why}</p>
          </section>
        ))}

        <section className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-destructive">{contraindicatedVaccines.note}</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {contraindicatedVaccines.list.map((i) => (
              <li key={i} className="flex gap-2"><span>•</span><span>{i}</span></li>
            ))}
          </ul>
        </section>

        <SourceNote source={maternalVaccinesSource} />
      </div>
    </MobileShell>
  );
}
