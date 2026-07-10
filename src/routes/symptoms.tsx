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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { SourceNote } from "@/components/source-note";
import { symptomGuides, symptomsSource } from "@/lib/symptoms-guide";
import { toast } from "sonner";

const symptomList = ["Nausea", "Vomiting", "Headache", "Backache", "Swelling", "Cramps", "Heartburn", "Dizziness", "Constipation"];
const moods = ["😊", "🙂", "😐", "😟", "😢"];

export const Route = createFileRoute("/symptoms")({
  component: SymptomsPage,
});

function SymptomsPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [weight, setWeight] = React.useState("");
  const [sys, setSys] = React.useState("");
  const [dia, setDia] = React.useState("");
  const [mood, setMood] = React.useState("");
  const [picked, setPicked] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("symptom_logs").insert({
      user_id: user.id,
      log_date: new Date().toISOString().slice(0, 10),
      weight_kg: weight ? Number(weight) : null,
      bp_systolic: sys ? Number(sys) : null,
      bp_diastolic: dia ? Number(dia) : null,
      mood: mood || null,
      symptoms: picked,
      notes: notes || null,
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("saved"));
    setWeight(""); setSys(""); setDia(""); setMood(""); setPicked([]); setNotes("");
  };

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">{t("sym_title")}</h1>

        <Tabs defaultValue="log" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 rounded-full">
            <TabsTrigger value="log" className="rounded-full">Log today</TabsTrigger>
            <TabsTrigger value="guide" className="rounded-full">Symptom guide</TabsTrigger>
          </TabsList>

          <TabsContent value="log">
            <form onSubmit={save} className="mt-4 space-y-4">
              <div className="rounded-2xl bg-card p-4 shadow-sm">
                <Label>{t("weight_kg")}</Label>
                <Input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-2 h-11 rounded-xl" />
              </div>

              <div className="rounded-2xl bg-card p-4 shadow-sm">
                <Label>{t("bp")}</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Input type="number" placeholder={t("systolic")} value={sys} onChange={(e) => setSys(e.target.value)} className="h-11 rounded-xl" />
                  <Input type="number" placeholder={t("diastolic")} value={dia} onChange={(e) => setDia(e.target.value)} className="h-11 rounded-xl" />
                </div>
              </div>

              <div className="rounded-2xl bg-card p-4 shadow-sm">
                <Label>{t("mood")}</Label>
                <div className="mt-2 flex justify-between text-3xl">
                  {moods.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      className={"grid h-12 w-12 place-items-center rounded-full transition-colors " + (mood === m ? "bg-primary/15" : "")}
                    >{m}</button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-card p-4 shadow-sm">
                <Label>{t("symptoms")}</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {symptomList.map((s) => {
                    const on = picked.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggle(s)}
                        className={
                          "rounded-full border px-3 py-1.5 text-xs transition-colors " +
                          (on ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground")
                        }
                      >{s}</button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-card p-4 shadow-sm">
                <Label>{t("notes")}</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-2 rounded-xl" />
              </div>

              <Button type="submit" disabled={busy} className="h-12 w-full rounded-full">
                {busy ? t("loading") : t("save")}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="guide">
            <DisclaimerBanner />
            {symptomGuides.map((g) => (
              <section key={g.name} className="mt-3 rounded-2xl bg-card p-4 shadow-sm">
                <p className="font-medium">{g.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{g.normal}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Self-care</p>
                <ul className="mt-1 space-y-1 text-sm">
                  {g.selfCare.map((s) => <li key={s} className="flex gap-2"><span>•</span><span>{s}</span></li>)}
                </ul>
                <p className="mt-3 text-xs uppercase tracking-wider text-destructive">See a doctor if</p>
                <ul className="mt-1 space-y-1 text-sm">
                  {g.seeDoctor.map((s) => <li key={s} className="flex gap-2"><span>•</span><span>{s}</span></li>)}
                </ul>
              </section>
            ))}
            <SourceNote source={symptomsSource} />
          </TabsContent>
        </Tabs>
      </div>
    </MobileShell>
  );
}
