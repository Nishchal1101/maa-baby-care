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
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const symptomList = ["Nausea", "Vomiting", "Headache", "Backache", "Swelling", "Cramps", "Heartburn", "Dizziness", "Constipation"];
type MoodOption = {
  value: string;
  label: string;
  blob: string;
  bg: string;
  bgActive: string;
  border: string;
  borderActive: string;
  stroke: string;
  text: string;
  path: React.ReactNode;
};

const moodOptions: MoodOption[] = [
  {
    value: "😊",
    label: "Radiant",
    blob: "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]",
    bg: "bg-amber-50",
    bgActive: "bg-amber-100",
    border: "border-amber-100",
    borderActive: "border-amber-400",
    stroke: "text-amber-600",
    text: "text-amber-700/80",
    path: (
      <>
        <path d="M12 16c2.5 0 4-2 4-2s-1.5-2-4-2-4 2-4 2 1.5 2 4 2z" />
        <path d="M8 9c.5-1 1.5-1 2 0" />
        <path d="M14 9c.5-1 1.5-1 2 0" />
      </>
    ),
  },
  {
    value: "🙂",
    label: "Happy",
    blob: "rounded-[50%_50%_30%_70%/60%_40%_60%_40%]",
    bg: "bg-emerald-50",
    bgActive: "bg-emerald-100",
    border: "border-emerald-100",
    borderActive: "border-emerald-400",
    stroke: "text-emerald-600",
    text: "text-emerald-700/80",
    path: (
      <>
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
      </>
    ),
  },
  {
    value: "😐",
    label: "Calm",
    blob: "rounded-[30%_70%_50%_50%/50%_30%_70%_50%]",
    bg: "bg-stone-100",
    bgActive: "bg-stone-200",
    border: "border-stone-200",
    borderActive: "border-stone-400",
    stroke: "text-stone-600",
    text: "text-stone-700/80",
    path: (
      <>
        <line x1="8" y1="13" x2="16" y2="13" />
        <circle cx="9" cy="9" r="0.5" fill="currentColor" />
        <circle cx="15" cy="9" r="0.5" fill="currentColor" />
      </>
    ),
  },
  {
    value: "😟",
    label: "Low",
    blob: "rounded-[60%_40%_40%_60%/40%_60%_60%_40%]",
    bg: "bg-rose-50",
    bgActive: "bg-rose-100",
    border: "border-rose-100",
    borderActive: "border-rose-400",
    stroke: "text-rose-600",
    text: "text-rose-700/80",
    path: (
      <>
        <path d="M8 17s1.5-1.5 4-1.5 4 1.5 4 1.5" />
        <path d="M7 10l2 1" />
        <path d="M17 10l-2 1" />
      </>
    ),
  },
  {
    value: "😢",
    label: "Sad",
    blob: "rounded-[45%_55%_65%_35%/35%_65%_45%_55%]",
    bg: "bg-slate-100",
    bgActive: "bg-slate-200",
    border: "border-slate-200",
    borderActive: "border-slate-500",
    stroke: "text-slate-600",
    text: "text-slate-700/80",
    path: (
      <>
        <path d="M12 18c-2.5 0-4-2-4-2s1.5-1 4-1 4 1 4 1-1.5 2-4 2z" />
        <path d="M10 8c-.5.5-1 1-1 1.5" />
        <path d="M14 8c.5.5 1 1 1 1.5" />
      </>
    ),
  },
];


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
    loadHistory();
  };

  type LogRow = {
    id: string;
    log_date: string;
    weight_kg: number | null;
    bp_systolic: number | null;
    bp_diastolic: number | null;
    mood: string | null;
    symptoms: string[] | null;
    notes: string | null;
  };
  const [history, setHistory] = React.useState<LogRow[]>([]);
  const loadHistory = React.useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("symptom_logs")
      .select("id, log_date, weight_kg, bp_systolic, bp_diastolic, mood, symptoms, notes")
      .eq("user_id", user.id)
      .order("log_date", { ascending: false })
      .limit(60);
    setHistory((data as LogRow[]) ?? []);
  }, [user]);
  React.useEffect(() => { loadHistory(); }, [loadHistory]);

  const chartData = React.useMemo(
    () =>
      [...history]
        .reverse()
        .map((r) => ({
          date: new Date(r.log_date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
          weight: r.weight_kg ?? null,
          sys: r.bp_systolic ?? null,
          dia: r.bp_diastolic ?? null,
        })),
    [history],
  );

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">{t("sym_title")}</h1>

        <Tabs defaultValue="log" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 rounded-full">
            <TabsTrigger value="log" className="rounded-full">Log today</TabsTrigger>
            <TabsTrigger value="history" className="rounded-full">History</TabsTrigger>
            <TabsTrigger value="guide" className="rounded-full">Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="log">
            <form onSubmit={save} className="mt-4 space-y-4">
              <div className="rounded-lg bg-card p-4 shadow-sm">
                <Label>{t("weight_kg")}</Label>
                <Input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-2 h-11 rounded-md" />
              </div>

              <div className="rounded-lg bg-card p-4 shadow-sm">
                <Label>{t("bp")}</Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your BP reading has two numbers (e.g. 120/80). The upper number is systolic, the lower is diastolic.
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <Input type="number" placeholder={t("systolic")} value={sys} onChange={(e) => setSys(e.target.value)} className="h-11 rounded-md" />
                    <p className="mt-1 text-[11px] text-muted-foreground">Systolic  -  upper number (when the heart beats)</p>
                  </div>
                  <div>
                    <Input type="number" placeholder={t("diastolic")} value={dia} onChange={(e) => setDia(e.target.value)} className="h-11 rounded-md" />
                    <p className="mt-1 text-[11px] text-muted-foreground">Diastolic  -  lower number (when the heart rests)</p>
                  </div>
                </div>
              </div>


              <div className="rounded-lg bg-card p-5 shadow-sm">
                <Label className="font-serif text-base text-stone-800">{t("mood")}</Label>
                <p className="mt-1 text-xs italic text-muted-foreground">How are you feeling, Maa?</p>
                <div className="mt-4 flex items-end justify-between gap-2">
                  {moodOptions.map((m) => {
                    const on = mood === m.value;
                    return (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => setMood(m.value)}
                        className="group flex flex-1 flex-col items-center gap-2 transition-transform hover:scale-105"
                      >
                        <div
                          className={
                            "relative flex h-14 w-14 items-center justify-center border-2 transition-colors " +
                            m.blob + " " +
                            (on ? `${m.bgActive} ${m.borderActive}` : `${m.bg} ${m.border}`)
                          }
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={"h-8 w-8 " + m.stroke}
                          >
                            {m.path}
                          </svg>
                        </div>
                        <span className={"text-[10px] font-bold uppercase tracking-wider " + m.text}>
                          {m.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>


              <div className="rounded-lg bg-card p-4 shadow-sm">
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

              <div className="rounded-lg bg-card p-4 shadow-sm">
                <Label>{t("notes")}</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-2 rounded-md" />
              </div>

              <Button type="submit" disabled={busy} className="h-12 w-full rounded-lg">
                {busy ? t("loading") : t("save")}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="history">
            {history.length === 0 ? (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                No logs yet. Save today's entry and it will appear here.
              </p>
            ) : (
              <>
                {chartData.some((d) => d.weight != null) && (
                  <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Weight trend (kg)</p>
                    <div className="mt-3 h-40 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} domain={["auto", "auto"]} />
                          <Tooltip />
                          <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} connectNulls />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </section>
                )}

                {chartData.some((d) => d.sys != null || d.dia != null) && (
                  <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Blood pressure trend</p>
                    <div className="mt-3 h-40 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} domain={["auto", "auto"]} />
                          <Tooltip />
                          <Line type="monotone" dataKey="sys" name="Systolic" stroke="#e11d48" strokeWidth={2} dot={{ r: 3 }} connectNulls />
                          <Line type="monotone" dataKey="dia" name="Diastolic" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} connectNulls />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 flex gap-4 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-600" />Systolic</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-500" />Diastolic</span>
                    </div>
                  </section>
                )}

                <p className="mt-6 mb-2 text-xs uppercase tracking-wider text-muted-foreground">Past entries</p>
                <ul className="space-y-2">
                  {history.map((r) => (
                    <li key={r.id} className="rounded-lg bg-card p-4 shadow-sm">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-medium">
                          {new Date(r.log_date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                        </p>
                        {r.mood && <span className="text-lg">{r.mood}</span>}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {r.weight_kg != null && <span>Weight: <b className="text-foreground">{r.weight_kg} kg</b></span>}
                        {r.bp_systolic != null && r.bp_diastolic != null && (
                          <span>BP: <b className="text-foreground">{r.bp_systolic}/{r.bp_diastolic}</b></span>
                        )}
                      </div>
                      {r.symptoms && r.symptoms.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {r.symptoms.map((s) => (
                            <span key={s} className="rounded-full bg-secondary/60 px-2 py-0.5 text-[11px] text-secondary-foreground">{s}</span>
                          ))}
                        </div>
                      )}
                      {r.notes && <p className="mt-2 text-xs text-foreground/80">{r.notes}</p>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </TabsContent>

          <TabsContent value="guide">
            <DisclaimerBanner />

            {symptomGuides.map((g) => (
              <section key={g.name} className="mt-3 rounded-lg bg-card p-4 shadow-sm">
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
