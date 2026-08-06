import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calcDueFromLMP } from "@/lib/pregnancy";
import { INDIAN_CITIES, INDIAN_STATES } from "@/lib/india-locations";
import { toast } from "sonner";

const MEDICAL_CONDITIONS = [
  "Anaemia",
  "Asthma",
  "Diabetes",
  "Epilepsy",
  "Heart disease",
  "High blood pressure",
  "Kidney disease",
  "Malaria",
  "Migraine",
  "PCOS",
  "Thyroid disorder",
];

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const { t, lang } = useI18n();
  const { user, profile, loading, refreshProfile } = useAuth();
  const nav = useNavigate();
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState("");
  const [dob, setDob] = React.useState("");
  const age = React.useMemo(() => {
    if (!dob) return null;
    const b = new Date(dob);
    if (Number.isNaN(b.getTime())) return null;
    const now = new Date();
    let a = now.getFullYear() - b.getFullYear();
    const m = now.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a--;
    return a >= 0 && a < 120 ? a : null;
  }, [dob]);
  const [lmp, setLmp] = React.useState("");
  const [due, setDue] = React.useState("");
  const [diet, setDiet] = React.useState<"veg" | "nonveg" | "egg">("veg");
  const [city, setCity] = React.useState("");
  const [stateName, setStateName] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [cityOpen, setCityOpen] = React.useState(false);
  const [bloodGroup, setBloodGroup] = React.useState("");
const [previouslyPregnant, setPreviouslyPregnant] = React.useState<boolean | null>(null);
const [previousPregnanciesCount, setPreviousPregnanciesCount] = React.useState("");
const [hadPregnancyComplications, setHadPregnancyComplications] = React.useState<boolean | null>(null);
const [pregnancyComplications, setPregnancyComplications] = React.useState<string[]>([]);
const [hasMedicalConditions, setHasMedicalConditions] = React.useState<boolean | null>(null);
const [medicalConditions, setMedicalConditions] = React.useState<string[]>([]);
const [medicalConditionSearch, setMedicalConditionSearch] = React.useState("");
const [showOtherMedicalCondition, setShowOtherMedicalCondition] = React.useState(false);
const [otherMedicalCondition, setOtherMedicalCondition] = React.useState("");
const medicalConditionSuggestions = React.useMemo(() => {
  const query = medicalConditionSearch.trim().toLowerCase();

  if (!query) return [];

  return MEDICAL_CONDITIONS.filter(
    (condition) =>
      condition.toLowerCase().startsWith(query) &&
      !medicalConditions.includes(condition)
  ).slice(0, 6);
}, [medicalConditionSearch, medicalConditions]);
  const citySuggestions = React.useMemo(() => {
    const q = city.trim().toLowerCase();
    if (!q) return [];
    return INDIAN_CITIES.filter((c) => c.toLowerCase().startsWith(q)).slice(0, 8);
  }, [city]);

  React.useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/login" });
    // else if (profile?.onboarded) nav({ to: "/home" });
    else {
      if (profile?.name) setName(profile.name);
      if (profile?.dob) setDob(profile.dob);
    }
  }, [user, profile, loading, nav]);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = async () => {
  if (!user) return;

  if (!bloodGroup) {
    toast.error("Please select your blood group.");
    return;
  }

  if (previouslyPregnant === null) {
    toast.error("Please tell us if you have been pregnant before.");
    return;
  }

  if (
    previouslyPregnant === true &&
    (!previousPregnanciesCount || Number(previousPregnanciesCount) < 1)
  ) {
    toast.error("Please enter the number of previous pregnancies.");
    return;
  }

  if (
    previouslyPregnant === true &&
    hadPregnancyComplications === null
  ) {
    toast.error(
      "Please tell us if you had complications in a previous pregnancy."
    );
    return;
  }

  if (
    previouslyPregnant === true &&
    hadPregnancyComplications === true &&
    pregnancyComplications.length === 0
  ) {
    toast.error(
      "Please select at least one previous pregnancy complication."
    );
    return;
  }

  if (hasMedicalConditions === null) {
    toast.error(
      "Please tell us if you have any existing medical conditions."
    );
    return;
  }

  if (
    hasMedicalConditions === true &&
    medicalConditions.length === 0
  ) {
    toast.error("Please add at least one medical condition.");
    return;
  }

  setBusy(true);
    const computedDue = lmp ? calcDueFromLMP(lmp) : due || null;
    const payload = {
  user_id: user.id,
  name: name || null,
  dob: dob || null,
  lmp_date: lmp || null,
  due_date: computedDue,
  diet,
  city: city || null,
  state: stateName || null,
  language: lang,

  blood_group: bloodGroup,

  previously_pregnant: previouslyPregnant,

  previous_pregnancies_count:
    previouslyPregnant === true
      ? Number(previousPregnanciesCount)
      : null,

  previous_pregnancy_complications:
    previouslyPregnant === true &&
    hadPregnancyComplications === true
      ? pregnancyComplications
      : [],

  medical_conditions:
    hasMedicalConditions === true
      ? medicalConditions
      : [],

  onboarded: true,
};
    const { error } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: "user_id" });
    setBusy(false);

if (error) {
  toast.error(error.message);
  return;
}



await refreshProfile();
toast.success(t("saved"));
nav({ to: "/consent" });

  };

  return (
  <div className="mx-auto min-h-screen max-w-md px-6 pb-10 pt-8">
      <BackButton />
      <div className="mb-6 mt-5 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={"h-1.5 flex-1 rounded-full " + (i <= step ? "bg-primary" : "bg-muted")} />
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl">{t("welcome")}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t("onb_intro")}</p>
          </div>
          <div className="space-y-2">
            <Label className="block">{t("language")}</Label>
            <p className="text-xs text-muted-foreground">
              Choose the language you are most comfortable reading in. You can change it anytime.
            </p>
            <LanguagePicker />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-md" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of birth</Label>
            <Input
              id="dob"
              type="date"
              max={new Date().toISOString().slice(0, 10)}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="h-12 rounded-md"
            />
            <p className="text-xs text-muted-foreground">
              {age !== null
                ? `You are ${age} years old. This helps us flag age-related pregnancy care.`
                : "We use this to calculate your age for age-related pregnancy care."}
            </p>
          </div>

        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl">When did your journey begin?</h2>
          <div className="space-y-2">
            <Label htmlFor="lmp">{t("lmp_question")}</Label>
            <Input id="lmp" type="date" value={lmp} onChange={(e) => { setLmp(e.target.value); setDue(""); }} className="h-12 rounded-md" />
          </div>
          <div className="text-center text-xs uppercase tracking-wider text-muted-foreground">or</div>
          <div className="space-y-2">
            <Label htmlFor="due">{t("due_question")}</Label>
            <Input id="due" type="date" value={due} onChange={(e) => { setDue(e.target.value); setLmp(""); }} className="h-12 rounded-md" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl">A little about you</h2>
          <div>
            <Label className="mb-2 block">{t("diet_question")}</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["veg", "nonveg", "egg"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDiet(d)}
                  className={
                    "rounded-lg border p-3 text-sm transition-colors " +
                    (diet === d ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground")
                  }
                >
                  {t(d)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="city">{t("city")}</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onFocus={() => setCityOpen(true)}
                onBlur={() => setTimeout(() => setCityOpen(false), 150)}
                autoComplete="off"
                className="h-12 rounded-md"
              />
              {cityOpen && city.trim().length > 0 && citySuggestions.length > 0 && (
                <div className="relative">
                  <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md">
                    {citySuggestions.map((c) => (
                      <li key={c}>
                        <button
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); setCity(c); setCityOpen(false); }}
                          className="block w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">{t("state")}</Label>
              <Select value={stateName} onValueChange={setStateName}>
                <SelectTrigger id="state" className="h-12 rounded-md">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}


      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-2xl">Your health history</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Help us understand your pregnancy journey better.
            </p>
          </div>

          <div>
            <Label className="mb-2 block">
              Blood group <span className="text-destructive">*</span>
            </Label>

            <div className="grid grid-cols-4 gap-2">
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setBloodGroup(group)}
                  className={
                    "rounded-lg border p-3 text-sm transition-colors " +
                    (bloodGroup === group
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground")
                  }
                >
                  {group}
                </button>
              ))}
            </div>
          </div>
                    <div>
            <Label className="mb-2 block">
              Have you been pregnant before?
            </Label>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setPreviouslyPregnant(true);
                }}
                className={
                  "rounded-lg border p-3 text-sm transition-colors " +
                  (previouslyPregnant === true
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground")
                }
              >
                Yes
              </button>

              <button
                type="button"
                onClick={() => {
                  setPreviouslyPregnant(false);
                  setPreviousPregnanciesCount("");
                }}
                className={
                  "rounded-lg border p-3 text-sm transition-colors " +
                  (previouslyPregnant === false
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground")
                }
              >
                No
              </button>
            </div>
          </div>

          {previouslyPregnant === true && (
            <div className="space-y-2">
              <Label htmlFor="previousPregnanciesCount">
                How many previous pregnancies have you had?
              </Label>

              <Input
                id="previousPregnanciesCount"
                type="number"
                min="1"
                inputMode="numeric"
                value={previousPregnanciesCount}
                onChange={(e) => setPreviousPregnanciesCount(e.target.value)}
                placeholder="Enter number"
                className="h-12 rounded-md"
              />
            </div>
          )}
          {previouslyPregnant === true && (
  <div>
    <Label className="mb-2 block">
      Did you have any complications in a previous pregnancy?
    </Label>

    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => setHadPregnancyComplications(true)}
        className={
          "rounded-lg border p-3 text-sm transition-colors " +
          (hadPregnancyComplications === true
            ? "border-primary bg-primary/10 text-foreground"
            : "border-border bg-card text-muted-foreground")
        }
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setHadPregnancyComplications(false);
          setPregnancyComplications([]);
        }}
        className={
          "rounded-lg border p-3 text-sm transition-colors " +
          (hadPregnancyComplications === false
            ? "border-primary bg-primary/10 text-foreground"
            : "border-border bg-card text-muted-foreground")
        }
      >
        No
      </button>
    </div>
  </div>
)}
{previouslyPregnant === true && hadPregnancyComplications === true && (
  <div>
    <Label className="mb-2 block">
      What complications did you experience?
    </Label>

    <div className="grid grid-cols-2 gap-2">
      {[
        "Gestational diabetes",
        "High blood pressure",
        "Preeclampsia",
        "Preterm birth",
        "Miscarriage",
        "Other",
      ].map((complication) => {
        const selected = pregnancyComplications.includes(complication);

        return (
          <button
            key={complication}
            type="button"
            onClick={() =>
              setPregnancyComplications((current) =>
                selected
                  ? current.filter((item) => item !== complication)
                  : [...current, complication]
              )
            }
            className={
              "rounded-lg border p-3 text-sm transition-colors " +
              (selected
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground")
            }
          >
            {complication}
          </button>
        );
      })}
    </div>
  </div>
)}
<div>
  <Label className="mb-2 block">
    Do you have any existing medical conditions?
  </Label>

  <div className="grid grid-cols-2 gap-2">
    <button
      type="button"
      onClick={() => setHasMedicalConditions(true)}
      className={
        "rounded-lg border p-3 text-sm transition-colors " +
        (hasMedicalConditions === true
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-card text-muted-foreground")
      }
    >
      Yes
    </button>

    <button
      type="button"
      onClick={() => {
        setHasMedicalConditions(false);
        setMedicalConditions([]);
      }}
      className={
        "rounded-lg border p-3 text-sm transition-colors " +
        (hasMedicalConditions === false
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-card text-muted-foreground")
      }
    >
      No
    </button>
  </div>
</div>
{hasMedicalConditions === true && (
  <div className="space-y-3">
    <div className="space-y-2">
      <Label htmlFor="medicalConditionSearch">
        Search medical conditions
      </Label>

      <Input
        id="medicalConditionSearch"
        value={medicalConditionSearch}
        onChange={(e) => setMedicalConditionSearch(e.target.value)}
        placeholder="Start typing a condition"
        autoComplete="off"
        className="h-12 rounded-md"
      />
    </div>

    {medicalConditionSuggestions.length > 0 && (
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {medicalConditionSuggestions.map((condition) => (
          <button
            key={condition}
            type="button"
            onClick={() => {
              setMedicalConditions((current) => [...current, condition]);
              setMedicalConditionSearch("");
            }}
            className="block w-full border-b border-border px-4 py-3 text-left text-sm last:border-b-0 hover:bg-accent"
          >
            {condition}
          </button>
        ))}
      </div>
    )}
{medicalConditionSearch.trim().length > 0 &&
  medicalConditionSuggestions.length === 0 && (
    <button
      type="button"
      onClick={() => {
        setShowOtherMedicalCondition(true);
        setOtherMedicalCondition(medicalConditionSearch.trim());
        setMedicalConditionSearch("");
      }}
      className="w-full rounded-lg border border-border bg-card p-3 text-left text-sm"
    >
      Can't find your condition? Add it manually
    </button>
  )}
  {showOtherMedicalCondition && (
  <div className="space-y-2">
    <Label htmlFor="otherMedicalCondition">
      Enter medical condition
    </Label>

    <div className="flex gap-2">
      <Input
        id="otherMedicalCondition"
        value={otherMedicalCondition}
        onChange={(e) => setOtherMedicalCondition(e.target.value)}
        placeholder="Enter condition"
        className="h-12 rounded-md"
      />

      <Button
        type="button"
        variant="outline"
        className="h-12"
        onClick={() => {
          const condition = otherMedicalCondition.trim();

          if (!condition) return;

          if (
            !medicalConditions.some(
              (item) => item.toLowerCase() === condition.toLowerCase()
            )
          ) {
            setMedicalConditions((current) => [...current, condition]);
          }

          setOtherMedicalCondition("");
          setShowOtherMedicalCondition(false);
        }}
      >
        Add
      </Button>
    </div>
  </div>
)}
    {medicalConditions.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {medicalConditions.map((condition) => (
          <button
            key={condition}
            type="button"
            onClick={() =>
              setMedicalConditions((current) =>
                current.filter((item) => item !== condition)
              )
            }
            className="rounded-full border border-primary bg-primary/10 px-3 py-1.5 text-sm"
          >
            {condition} ×
          </button>
        ))}
      </div>
    )}
  </div>
)}
        </div>
      )}

      <div className="flex gap-3 pt-10">
        {step > 0 && (
          <Button variant="ghost" onClick={back} className="h-12 flex-1 rounded-full">{t("back")}</Button>
        )}
        {step < 3 ? (
          <Button onClick={next} className="h-12 flex-1 rounded-full">{t("continue")}</Button>
        ) : (
          <Button onClick={finish} disabled={busy} className="h-12 flex-1 rounded-full">
            {busy ? t("loading") : t("finish")}
          </Button>
        )}
      </div>
    </div>
  );
}
