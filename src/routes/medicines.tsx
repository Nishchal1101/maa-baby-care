import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Pill, Bell, BellOff, Clock, X } from "lucide-react";

type Reminder = {
  id: string;
  name: string;
  dosage: string | null;
  times: string[];
  frequency: string;
  with_food: string | null;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  active: boolean;
};

export const Route = createFileRoute("/medicines")({
  head: () => ({
    meta: [
      { title: "Medicine Reminders - Maatri" },
      {
        name: "description",
        content:
          "Set gentle reminders for your pregnancy medicines, iron and calcium tablets, and supplements.",
      },
      { property: "og:title", content: "Medicine Reminders - Maatri" },
      {
        property: "og:description",
        content:
          "Set gentle reminders for your pregnancy medicines, iron and calcium tablets, and supplements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MedicinesPage,
});

const FREQUENCIES = [
  { v: "daily", l: "Every day" },
  { v: "alternate", l: "Alternate days" },
  { v: "weekly", l: "Once a week" },
  { v: "as_needed", l: "Only when needed" },
];

const FOOD = [
  { v: "any", l: "Anytime" },
  { v: "before", l: "Before food" },
  { v: "after", l: "After food" },
];

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${ap}`;
}

function MedicinesPage() {
  const { user } = useAuth();
  const [items, setItems] = React.useState<Reminder[]>([]);
  const [open, setOpen] = React.useState(false);

  const load = React.useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("medicine_reminders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setItems((data as Reminder[]) ?? []);
  }, [user]);

  React.useEffect(() => {
    load();
  }, [load]);

  const toggle = async (r: Reminder) => {
    await supabase
      .from("medicine_reminders")
      .update({ active: !r.active })
      .eq("id", r.id);
    load();
  };

  const del = async (r: Reminder) => {
    await supabase.from("medicine_reminders").delete().eq("id", r.id);
    load();
  };

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-2xl">Medicine reminders</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Iron, calcium, folic acid or any medicine your doctor advised.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setOpen(true)}
            className="shrink-0 rounded-full"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        {open && (
          <ReminderForm
            onDone={() => {
              setOpen(false);
              load();
            }}
            onCancel={() => setOpen(false)}
          />
        )}

        <section className="mt-5 space-y-3">
          {items.length === 0 && !open && (
            <div className="rounded-lg bg-card p-6 text-center shadow-sm">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                <Pill className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm text-muted-foreground">
                No reminders yet. Add your first medicine to get a gentle nudge
                at the right time.
              </p>
            </div>
          )}

          {items.map((r) => (
            <div
              key={r.id}
              className={
                "rounded-lg bg-card p-4 shadow-sm " +
                (r.active ? "" : "opacity-60")
              }
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="break-words font-medium">{r.name}</p>
                  {r.dosage && (
                    <p className="text-xs text-muted-foreground">{r.dosage}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {r.times.map((tm) => (
                      <span
                        key={tm}
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                      >
                        <Clock className="h-3 w-3" />
                        {fmtTime(tm)}
                      </span>
                    ))}
                    <span className="rounded-full bg-secondary/50 px-2 py-0.5 text-[11px] text-secondary-foreground">
                      {FREQUENCIES.find((f) => f.v === r.frequency)?.l ??
                        r.frequency}
                    </span>
                    {r.with_food && r.with_food !== "any" && (
                      <span className="rounded-full bg-secondary/50 px-2 py-0.5 text-[11px] text-secondary-foreground">
                        {FOOD.find((f) => f.v === r.with_food)?.l}
                      </span>
                    )}
                  </div>
                  {(r.start_date || r.end_date) && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {r.start_date ? `From ${r.start_date}` : ""}
                      {r.end_date ? ` to ${r.end_date}` : ""}
                    </p>
                  )}
                  {r.notes && (
                    <p className="mt-1 break-words text-sm">{r.notes}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => toggle(r)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-secondary/50 text-secondary-foreground"
                    aria-label={r.active ? "Pause reminder" : "Resume reminder"}
                  >
                    {r.active ? (
                      <Bell className="h-4 w-4" />
                    ) : (
                      <BellOff className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => del(r)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-destructive/10 text-destructive"
                    aria-label="Delete reminder"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Reminders are only a memory aid. Never start, stop or change a
          medicine without asking your doctor.
        </p>
      </div>
    </MobileShell>
  );
}

function ReminderForm({
  onDone,
  onCancel,
}: {
  onDone: () => void;
  onCancel: () => void;
}) {
  const { user } = useAuth();
  const [name, setName] = React.useState("");
  const [dosage, setDosage] = React.useState("");
  const [times, setTimes] = React.useState<string[]>(["09:00"]);
  const [frequency, setFrequency] = React.useState("daily");
  const [withFood, setWithFood] = React.useState("any");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const setTimeAt = (i: number, v: string) =>
    setTimes((prev) => prev.map((t, idx) => (idx === i ? v : t)));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const cleanName = name.trim().slice(0, 100);
    if (!cleanName) {
      toast.error("Please enter the medicine name");
      return;
    }
    const cleanTimes = times.filter(Boolean);
    if (cleanTimes.length === 0) {
      toast.error("Please add at least one reminder time");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("medicine_reminders").insert({
      user_id: user.id,
      name: cleanName,
      dosage: dosage.trim().slice(0, 100) || null,
      times: cleanTimes,
      frequency,
      with_food: withFood,
      start_date: start || null,
      end_date: end || null,
      notes: notes.trim().slice(0, 500) || null,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
    toast.success("Reminder saved");
    onDone();
  };

  return (
    <form
      onSubmit={save}
      className="mt-4 space-y-3 rounded-lg bg-card p-4 shadow-sm"
    >
      <div className="space-y-1.5">
        <Label>Medicine name</Label>
        <Input
          required
          maxLength={100}
          placeholder="Iron and folic acid tablet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 rounded-md"
        />
      </div>

      <div className="space-y-1.5">
        <Label>Dose (optional)</Label>
        <Input
          maxLength={100}
          placeholder="1 tablet"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          className="h-11 rounded-md"
        />
      </div>

      <div className="space-y-1.5">
        <Label>When do you want the reminder?</Label>
        <div className="space-y-2">
          {times.map((tm, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                type="time"
                value={tm}
                onChange={(e) => setTimeAt(i, e.target.value)}
                className="h-11 flex-1 rounded-md"
              />
              {times.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setTimes((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary/50"
                  aria-label="Remove time"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setTimes((prev) => [...prev, "21:00"])}
          className="mt-1 text-xs font-medium text-primary"
        >
          + Add another time
        </button>
      </div>

      <div className="space-y-1.5">
        <Label>How often</Label>
        <div className="flex flex-wrap gap-2">
          {FREQUENCIES.map((f) => (
            <button
              key={f.v}
              type="button"
              onClick={() => setFrequency(f.v)}
              className={
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors " +
                (frequency === f.v
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-secondary-foreground")
              }
            >
              {f.l}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Food</Label>
        <div className="flex flex-wrap gap-2">
          {FOOD.map((f) => (
            <button
              key={f.v}
              type="button"
              onClick={() => setWithFood(f.v)}
              className={
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors " +
                (withFood === f.v
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-secondary-foreground")
              }
            >
              {f.l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label>Start date</Label>
          <Input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="h-11 rounded-md"
          />
        </div>
        <div className="space-y-1.5">
          <Label>End date</Label>
          <Input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="h-11 rounded-md"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Details (optional)</Label>
        <Textarea
          maxLength={500}
          placeholder="Prescribed by Dr. Sharma for low haemoglobin"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="rounded-md"
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="flex-1 rounded-full"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={busy} className="flex-1 rounded-full">
          {busy ? "Saving..." : "Save reminder"}
        </Button>
      </div>
    </form>
  );
}
