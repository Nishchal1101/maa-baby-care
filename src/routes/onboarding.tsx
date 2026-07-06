import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calcDueFromLMP } from "@/lib/pregnancy";
import { INDIAN_CITIES, INDIAN_STATES } from "@/lib/india-locations";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const { t, lang } = useI18n();
  const { user, profile, loading, refreshProfile } = useAuth();
  const nav = useNavigate();
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState("");
  const [lmp, setLmp] = React.useState("");
  const [due, setDue] = React.useState("");
  const [diet, setDiet] = React.useState<"veg" | "nonveg" | "egg">("veg");
  const [city, setCity] = React.useState("");
  const [stateName, setStateName] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/login" });
    else if (profile?.onboarded) nav({ to: "/home" });
    else if (profile?.name) setName(profile.name);
  }, [user, profile, loading, nav]);

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = async () => {
    if (!user) return;
    setBusy(true);
    const computedDue = lmp ? calcDueFromLMP(lmp) : due || null;
    const payload = {
      user_id: user.id,
      name: name || null,
      lmp_date: lmp || null,
      due_date: computedDue,
      diet,
      city: city || null,
      state: stateName || null,
      language: lang,
      onboarded: true,
    };
    const { error } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: "user_id" });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    await refreshProfile();
    toast.success(t("saved"));
    nav({ to: "/home" });
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-10">
      <div className="mb-6 flex gap-2">
        {[0, 1, 2].map((i) => (
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
            <Label htmlFor="name">{t("name")}</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl">When did your journey begin?</h2>
          <div className="space-y-2">
            <Label htmlFor="lmp">{t("lmp_question")}</Label>
            <Input id="lmp" type="date" value={lmp} onChange={(e) => { setLmp(e.target.value); setDue(""); }} className="h-12 rounded-xl" />
          </div>
          <div className="text-center text-xs uppercase tracking-wider text-muted-foreground">or</div>
          <div className="space-y-2">
            <Label htmlFor="due">{t("due_question")}</Label>
            <Input id="due" type="date" value={due} onChange={(e) => { setDue(e.target.value); setLmp(""); }} className="h-12 rounded-xl" />
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
                    "rounded-2xl border p-3 text-sm transition-colors " +
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
                className="h-12 rounded-xl"
              />
              {cityOpen && city.trim().length > 0 && citySuggestions.length > 0 && (
                <div className="relative">
                  <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border bg-popover text-popover-foreground shadow-md">
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
                <SelectTrigger id="state" className="h-12 rounded-xl">
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

      <div className="mt-auto flex gap-3 pt-10">
        {step > 0 && (
          <Button variant="ghost" onClick={back} className="h-12 flex-1 rounded-full">{t("back")}</Button>
        )}
        {step < 2 ? (
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
