import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { POSTPARTUM_QUESTIONS } from "@/lib/baby-care";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

// EPDS: 4-point scale per question. For positive items (q1, q2) score is reversed.
const POSITIVE = new Set(["q1", "q2"]);

export const Route = createFileRoute("/postpartum")({ component: PostpartumPage });

function PostpartumPage() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [sleep, setSleep] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const total = React.useMemo(() => {
    return POSTPARTUM_QUESTIONS.reduce((sum, q) => {
      const v = answers[q.id];
      if (v == null) return sum;
      return sum + (POSITIVE.has(q.id) ? 3 - v : v);
    }, 0);
  }, [answers]);

  const allAnswered = POSTPARTUM_QUESTIONS.every((q) => answers[q.id] != null);
  const high = total >= 13;
  const q10Alert = answers.q10 != null && answers.q10 > 0;

  const labels = [t("not_at_all"), t("rarely"), t("sometimes"), t("often")];

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const moodScore = answers.q8 != null ? 5 - Math.min(answers.q8, 4) : null;
    const { error } = await supabase.from("postpartum_checkins").insert({
      user_id: user.id,
      log_date: new Date().toISOString().slice(0, 10),
      mood_score: moodScore,
      sleep_hours: sleep ? Number(sleep) : null,
      epds_score: total,
      feeling_overwhelmed: (answers.q6 ?? 0) >= 2,
      notes: notes || null,
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("checkin_saved"));
    setAnswers({}); setSleep(""); setNotes("");
  };

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("postpartum")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("postpartum_intro")}</p>

        <form onSubmit={save} className="mt-6 space-y-3">
          {POSTPARTUM_QUESTIONS.map((q, i) => (
            <fieldset key={q.id} className="rounded-lg bg-card p-4 shadow-sm">
              <legend className="text-sm font-medium">
                {i + 1}. {q.q[lang]}
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[0, 1, 2, 3].map((v) => {
                  const on = answers[q.id] === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: v }))}
                      className={
                        "rounded-md border px-3 py-2 text-xs transition-colors " +
                        (on ? "border-primary bg-primary/10" : "border-border bg-card text-muted-foreground")
                      }
                    >{labels[v]}</button>
                  );
                })}
              </div>
            </fieldset>
          ))}

          {q10Alert && (
            <div className="flex items-start gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{t("alert_q10")}</span>
            </div>
          )}
          {high && !q10Alert && (
            <div className="flex items-start gap-3 rounded-lg bg-amber-100 p-4 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{t("high_score_warning")}</span>
            </div>
          )}

          <div className="rounded-lg bg-card p-4 shadow-sm">
            <Label>Sleep (hours last night)</Label>
            <Input type="number" step="0.5" value={sleep} onChange={(e) => setSleep(e.target.value)} className="mt-2 h-11 rounded-md" />
          </div>
          <div className="rounded-lg bg-card p-4 shadow-sm">
            <Label>{t("notes")}</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-2 rounded-md" />
          </div>

          <Button type="submit" disabled={busy || !allAnswered} className="h-12 w-full rounded-lg">
            {busy ? t("loading") : t("log_checkin")}
          </Button>
        </form>
      </div>
    </MobileShell>
  );
}
