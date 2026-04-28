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
import { ancSchedule } from "@/lib/anc";
import { toast } from "sonner";
import { Plus, Check, Trash2 } from "lucide-react";

type Appt = {
  id: string;
  title: string;
  doctor: string | null;
  hospital: string | null;
  scheduled_at: string;
  notes: string | null;
  completed: boolean;
};

export const Route = createFileRoute("/appointments")({
  component: ApptPage,
});

function ApptPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [items, setItems] = React.useState<Appt[]>([]);
  const [open, setOpen] = React.useState(false);

  const load = React.useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .order("scheduled_at", { ascending: true });
    setItems((data as Appt[]) ?? []);
  }, [user]);

  React.useEffect(() => { load(); }, [load]);

  const toggle = async (a: Appt) => {
    await supabase.from("appointments").update({ completed: !a.completed }).eq("id", a.id);
    load();
  };
  const del = async (a: Appt) => {
    await supabase.from("appointments").delete().eq("id", a.id);
    load();
  };

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl">{t("appts_title")}</h1>
          <Button size="sm" onClick={() => setOpen(true)} className="rounded-full">
            <Plus className="h-4 w-4" />{t("add_appt")}
          </Button>
        </div>

        {open && <ApptForm onDone={() => { setOpen(false); load(); }} onCancel={() => setOpen(false)} />}

        <section className="mt-5 space-y-3">
          {items.length === 0 && <p className="text-sm text-muted-foreground">{t("none_scheduled")}</p>}
          {items.map((a) => (
            <div key={a.id} className={"rounded-2xl bg-card p-4 shadow-sm " + (a.completed ? "opacity-60" : "")}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(a.scheduled_at).toLocaleString()}
                  </p>
                  {(a.doctor || a.hospital) && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[a.doctor, a.hospital].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {a.notes && <p className="mt-1 text-sm">{a.notes}</p>}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => toggle(a)} className="grid h-8 w-8 place-items-center rounded-full bg-secondary/50 text-secondary-foreground" aria-label="Toggle done">
                    <Check className="h-4 w-4" />
                  </button>
                  <button onClick={() => del(a)} className="grid h-8 w-8 place-items-center rounded-full bg-destructive/10 text-destructive" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg">{t("anc_schedule")}</h2>
          <p className="mt-1 text-xs text-muted-foreground">India's recommended antenatal visits</p>
          <ul className="mt-3 space-y-3">
            {ancSchedule.map((v) => (
              <li key={v.week} className="rounded-2xl bg-card p-4 shadow-sm">
                <div className="flex items-baseline gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {t("week")} {v.week}
                  </span>
                  <span className="font-medium">{v.title}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{v.details}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </MobileShell>
  );
}

function ApptForm({ onDone, onCancel }: { onDone: () => void; onCancel: () => void }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [title, setTitle] = React.useState("");
  const [doctor, setDoctor] = React.useState("");
  const [hospital, setHospital] = React.useState("");
  const [when, setWhen] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      title,
      doctor: doctor || null,
      hospital: hospital || null,
      scheduled_at: new Date(when).toISOString(),
      notes: notes || null,
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("saved"));
    onDone();
  };

  return (
    <form onSubmit={save} className="mt-4 space-y-3 rounded-2xl bg-card p-4 shadow-sm">
      <div className="space-y-1.5">
        <Label>{t("appt_title")}</Label>
        <Input required value={title} onChange={(e) => setTitle(e.target.value)} className="h-11 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label>{t("doctor")}</Label>
          <Input value={doctor} onChange={(e) => setDoctor(e.target.value)} className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label>{t("hospital")}</Label>
          <Input value={hospital} onChange={(e) => setHospital(e.target.value)} className="h-11 rounded-xl" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>{t("date_time")}</Label>
        <Input required type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className="h-11 rounded-xl" />
      </div>
      <div className="space-y-1.5">
        <Label>{t("notes")}</Label>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-xl" />
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1 rounded-full">{t("cancel")}</Button>
        <Button type="submit" disabled={busy} className="flex-1 rounded-full">{busy ? t("loading") : t("save")}</Button>
      </div>
    </form>
  );
}
