import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { SourceNote } from "@/components/source-note";
import { investigations, investigationsSource } from "@/lib/investigations";

export const Route = createFileRoute("/investigations")({
  head: () => ({
    meta: [
      { title: "ANC checkups & tests — Maa Baby Care" },
      { name: "description", content: "Trimester-wise antenatal checkups and investigations per Indian ANC guidelines." },
    ],
  }),
  component: InvestigationsPage,
});

function InvestigationsPage() {
  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">ANC checkups & tests</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          What your doctor typically checks and tests at each stage of pregnancy in India.
        </p>
        <DisclaimerBanner />

        {investigations.map((b) => (
          <section key={b.trimester} className="mt-4 rounded-2xl bg-card p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Trimester {b.trimester} · {b.window}</p>
            <p className="mt-1 text-sm font-medium">{b.visits}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {b.tests.map((t) => (
                <li key={t} className="flex gap-2"><span>•</span><span>{t}</span></li>
              ))}
            </ul>
          </section>
        ))}

        <SourceNote source={investigationsSource} />
      </div>
    </MobileShell>
  );
}
