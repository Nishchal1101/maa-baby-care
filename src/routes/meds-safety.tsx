import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { SourceNote } from "@/components/source-note";
import { medsGuidance, medsSource } from "@/lib/meds-safety";

export const Route = createFileRoute("/meds-safety")({
  head: () => ({
    meta: [
      { title: "Medication safety in pregnancy — Maa Baby Care" },
      { name: "description", content: "General guidance on medicines in pregnancy. Not a prescription. Always confirm with your doctor." },
    ],
  }),
  component: MedsPage,
});

function MedsPage() {
  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">Medication safety</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          General guidance only — this app never prescribes medicines. Always confirm with your doctor before taking anything.
        </p>
        <DisclaimerBanner text="Educational guidance only. This is NOT a prescription. Never start, stop, or change any medicine without your doctor." />

        {medsGuidance.map((m) => (
          <section key={m.title} className="mt-4 rounded-2xl bg-card p-4 shadow-sm">
            <p className="font-medium">{m.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
          </section>
        ))}

        <SourceNote source={medsSource} />
      </div>
    </MobileShell>
  );
}
