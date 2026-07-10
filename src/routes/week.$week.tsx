import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { calcWeekFromLMP, calcWeekFromDue, weekInfo, trimester } from "@/lib/pregnancy";
import { RedFlagCard } from "@/components/red-flag-card";
import { pregnancyRedFlags } from "@/lib/red-flags";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/week/$week")({
  component: WeekPage,
});

function WeekPage() {
  const { t } = useI18n();
  const { week: weekParam } = Route.useParams();
  const week = Math.max(1, Math.min(42, parseInt(weekParam, 10) || 1));
  const info = weekInfo(week);
  const tri = trimester(week);

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <div className="flex items-center justify-end">
          <span className="text-xs text-muted-foreground">T{tri}</span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link
            to="/week/$week"
            params={{ week: String(Math.max(1, week - 1)) }}
            className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-sm"
            aria-label="Previous week"
          ><ChevronLeft className="h-5 w-5" /></Link>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("week")}</p>
            <p className="font-display text-5xl">{week}</p>
          </div>
          <Link
            to="/week/$week"
            params={{ week: String(Math.min(42, week + 1)) }}
            className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-sm"
            aria-label="Next week"
          ><ChevronRight className="h-5 w-5" /></Link>
        </div>

        <div className="mt-6 rounded-3xl bg-gradient-to-br from-[oklch(0.92_0.07_15)] to-[oklch(0.9_0.06_150)] p-5 text-center shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("baby_size")}</p>
          <p className="mt-2 font-display text-2xl">{info.size}</p>
        </div>

        <Section title="Baby this week">{info.babyDev}</Section>
        <Section title="Your body">{info.momChange}</Section>
        <Section title={t("todays_tip")}>{info.tip}</Section>

        <RedFlagCard title="Watch out for" items={pregnancyRedFlags.items.slice(0, 6)} source={pregnancyRedFlags.source} />

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link to="/investigations" className="rounded-2xl bg-card p-3 text-center text-sm shadow-sm">Checkups & tests</Link>
          <Link to="/emergency" className="rounded-2xl bg-destructive/10 p-3 text-center text-sm font-medium text-destructive shadow-sm">Emergency signs</Link>
        </div>
      </div>
    </MobileShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4 rounded-2xl bg-card p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
      <p className="mt-2 text-sm leading-relaxed">{children}</p>
    </section>
  );
}
