import * as React from "react";
import {
  getTdPathway,
  type TdHistoryAnswer,
} from "@/lib/td-vaccination";
import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { SourceNote } from "@/components/source-note";
import { maternalVaccines, contraindicatedVaccines, maternalVaccinesSource } from "@/lib/vaccines-pregnancy";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

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
  const { user, profile, loading } = useAuth();

  const [previousTdHistory, setPreviousTdHistory] =
    React.useState<TdHistoryAnswer | null>(null);
    const [previousPregnancyDate, setPreviousPregnancyDate] =
  React.useState("");
   React.useEffect(() => {
   if (!profile) return;

   setPreviousTdHistory(
    (profile.previous_td_history as TdHistoryAnswer | null) ?? null
  );

  setPreviousPregnancyDate(
    profile.previous_pregnancy_end_date ?? ""
    );
}, [profile]);
  const [vaccinationRecords, setVaccinationRecords] = React.useState<
  Array<{
    id: string;
    vaccine: string;
    dose: string;
    date_received: string | null;
    status: string;
  }>
>([]);

const [savingDose, setSavingDose] = React.useState<string | null>(null);
const tdPathway =
  profile?.previously_pregnant === null ||
  profile?.previously_pregnant === undefined
    ? null
    : getTdPathway({
        previouslyPregnant: profile.previously_pregnant,
        receivedTwoTdDosesPreviously: previousTdHistory ?? undefined,
        previousPregnancyDate: previousPregnancyDate || null,
      });
      React.useEffect(() => {
  if (!user) return;

  const loadVaccinations = async () => {
    const { data, error } = await supabase
      .from("maternal_vaccinations")
      .select("id, vaccine, dose, date_received, status")
      .eq("user_id", user.id)
      .eq("pregnancy_context", "current");

    if (error) {
      console.error("Failed to load maternal vaccinations:", error);
      return;
    }

    setVaccinationRecords(data ?? []);
  };

  loadVaccinations();
}, [user]);
const saveTdHistory = async (answer: TdHistoryAnswer) => {
  if (!user) return;

  setPreviousTdHistory(answer);

  const { error } = await supabase
    .from("profiles")
    .update({
      previous_td_history: answer,
      previous_pregnancy_end_date:
        answer === "yes" ? previousPregnancyDate || null : null,
    })
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to save Td history:", error);
  }
};
const savePreviousPregnancyDate = async (date: string) => {
  if (!user) return;

  setPreviousPregnancyDate(date);

  const { error } = await supabase
    .from("profiles")
    .update({
      previous_pregnancy_end_date: date || null,
    })
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to save previous pregnancy date:", error);
  }
};
const markDoseReceived = async (dose: string) => {
  if (!user || savingDose) return;

  setSavingDose(dose);

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("maternal_vaccinations")
    .insert({
      user_id: user.id,
      vaccine: "Td",
      dose,
      date_received: today,
      pregnancy_context: "current",
      status: "completed",
    })
    .select("id, vaccine, dose, date_received, status")
    .single();

  setSavingDose(null);

  if (error) {
    console.error("Failed to save vaccination:", error);
    return;
  }

  setVaccinationRecords((current) => [...current, data]);
};
  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">Vaccinations during pregnancy</h1>
        <DisclaimerBanner />
{!loading && profile && (
  <section className="mt-4 rounded-lg bg-card p-4 shadow-sm">
    <p className="font-medium">Td vaccination</p>

    {profile.previously_pregnant === false && (
      <div className="mt-3">
        <p className="text-sm">
          Based on the pregnancy history you provided, we'll show the standard
          Td vaccination pathway for this pregnancy.
        </p>
      </div>
    )}

    {profile.previously_pregnant === true && (
  <div className="mt-3">
    <p className="text-sm font-medium">
      Did you receive 2 Td doses during your previous pregnancy?
    </p>

    <div className="mt-3 grid grid-cols-3 gap-2">
      {[
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "not_sure", label: "Not sure" },
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() =>
  saveTdHistory(option.value as TdHistoryAnswer)
}
          className={
            "rounded-lg border p-3 text-sm transition-colors " +
            (previousTdHistory === option.value
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card text-muted-foreground")
          }
        >
          {option.label}
        </button>
      ))}
    </div>

    {previousTdHistory === "yes" && (
      <div className="mt-5 space-y-2">
        <label
          htmlFor="previousPregnancyDate"
          className="text-sm font-medium"
        >
          When did your previous pregnancy end?
        </label>

        <input
          id="previousPregnancyDate"
          type="date"
          value={previousPregnancyDate}
          onChange={(e) => savePreviousPregnancyDate(e.target.value)}
          className="h-12 w-full rounded-lg border border-border bg-background px-3 text-sm"
        />

        <p className="text-xs text-muted-foreground">
          This helps us understand whether your previous Td vaccination may fall within the 3-year booster window.
        </p>
      </div>
    )}
  </div>
)}
{tdPathway === "booster" && (
  <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-4">
    <p className="text-sm font-medium">
      Td booster pathway
    </p>
    <p className="mt-1 text-sm text-muted-foreground">
      Based on the information provided, your previous Td vaccination may
      qualify you for the booster pathway. Confirm your vaccination history
      with your doctor or ANM.
    </p>
  </div>
)}

{tdPathway === "two_dose" && (
  <div className="mt-5 rounded-lg border border-border p-4">
    <p className="text-sm font-medium">
      Td two-dose pathway
    </p>
    <p className="mt-1 text-sm text-muted-foreground">
      The standard pathway uses Td-1 followed by Td-2 after the recommended
      interval. Your healthcare provider can confirm the schedule for your
      pregnancy.
    </p>
  </div>
)}
{tdPathway === "two_dose" && (
  <div className="mt-4 space-y-3">
    <TdDoseCard
  title="Td-1"
  description="First Td dose for this pregnancy. The national schedule recommends Td-1 as early as possible."
  status={
    vaccinationRecords.some(
      (record) =>
        record.vaccine === "Td" &&
        record.dose === "td1" &&
        record.status === "completed"
    )
      ? "completed"
      : "due"
  }
  saving={savingDose === "td1"}
  onMarkReceived={() => markDoseReceived("td1")}
/>

    <TdDoseCard
  title="Td-2"
  description="Second Td dose, given 4 weeks after Td-1."
  status={
    vaccinationRecords.some(
      (record) =>
        record.vaccine === "Td" &&
        record.dose === "td2" &&
        record.status === "completed"
    )
      ? "completed"
      : "due"
  }
  saving={savingDose === "td2"}
  onMarkReceived={() => markDoseReceived("td2")}
/>
  </div>
)}

{tdPathway === "booster" && (
  <div className="mt-4">
    <TdDoseCard
  title="Td booster"
  description="Booster pathway based on the previous Td vaccination history you reported."
  status={
    vaccinationRecords.some(
      (record) =>
        record.vaccine === "Td" &&
        record.dose === "booster" &&
        record.status === "completed"
    )
      ? "completed"
      : "due"
  }
  saving={savingDose === "booster"}
  onMarkReceived={() => markDoseReceived("booster")}
/>
  </div>
)}
{tdPathway === "history_check" &&
  profile.previously_pregnant === true &&
  previousTdHistory === "not_sure" && (
    <div className="mt-5 rounded-lg border border-border p-4">
      <p className="text-sm font-medium">
        Check your vaccination history
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Check your MCP card or vaccination records, or ask your doctor or ANM
        before deciding which Td schedule applies.
      </p>
    </div>
  )}
    {profile.previously_pregnant === null && (
      <p className="mt-3 text-sm text-muted-foreground">
        Previous pregnancy history is unavailable. Check your vaccination
        history with your doctor or ANM.
      </p>
    )}
  </section>
)}
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
type TdDoseCardProps = {
  title: string;
  description: string;
  status?: "due" | "completed";
  saving?: boolean;
  onMarkReceived?: () => void;
};

function TdDoseCard({
  title,
  description,
  status = "due",
  saving = false,
  onMarkReceived,
}: TdDoseCardProps) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs">
          {status === "completed" ? "Received" : "Due"}
        </span>
      </div>

      {status !== "completed" && (
        <button
  type="button"
  onClick={onMarkReceived}
  disabled={saving}
  className="mt-4 w-full rounded-lg border border-primary px-4 py-2.5 text-sm font-medium text-primary disabled:opacity-50"
>
  {saving ? "Saving..." : "Mark as received"}
</button>
      )}
    </div>
  );
}