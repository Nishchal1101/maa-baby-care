import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { SourceNote } from "@/components/source-note";
import { RedFlagCard } from "@/components/red-flag-card";
import { exerciseSafe, exerciseAvoid, stopIfWarning, exerciseSource } from "@/lib/exercise-safety";

export const Route = createFileRoute("/exercise")({
  head: () => ({
    meta: [
      { title: "Safe exercise in pregnancy  -  Maa Baby Care" },
      { name: "description", content: "Safe activities, what to avoid, and warning signs to stop exercising during pregnancy." },
    ],
  }),
  component: ExercisePage,
});

function ExercisePage() {
  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">Safe exercise & daily activity</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Aim for around 30 minutes of moderate activity most days, unless your doctor advises otherwise.
        </p>
        <DisclaimerBanner />

        <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Generally safe</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {exerciseSafe.map((i) => (
              <li key={i} className="flex gap-2"><span>•</span><span>{i}</span></li>
            ))}
          </ul>
          <Link to="/yoga" className="mt-3 inline-block text-xs font-medium text-primary">Open prenatal yoga →</Link>
        </section>

        <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Avoid</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {exerciseAvoid.map((i) => (
              <li key={i} className="flex gap-2"><span>•</span><span>{i}</span></li>
            ))}
          </ul>
        </section>

        <RedFlagCard title="Stop and call your doctor if" items={stopIfWarning} />
        <SourceNote source={exerciseSource} />
      </div>
    </MobileShell>
  );
}
