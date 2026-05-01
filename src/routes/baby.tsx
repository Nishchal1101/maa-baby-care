import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ageLabel } from "@/lib/uip";
import { Baby as BabyIcon, Syringe, LineChart, Milk, Heart, BookOpen } from "lucide-react";

type Baby = {
  id: string;
  name: string | null;
  dob: string;
  sex: string | null;
  birth_weight_kg: number | null;
  birth_length_cm: number | null;
};

export const Route = createFileRoute("/baby")({ component: BabyPage });

function BabyPage() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const [baby, setBaby] = React.useState<Baby | null>(null);
  const [loading, setLoading] = React.useState(true);

  const reload = React.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("baby_profiles")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setBaby((data as Baby | null) ?? null);
    setLoading(false);
  }, [user]);

  React.useEffect(() => { reload(); }, [reload]);

  if (loading) {
    return <MobileShell><div className="px-5 pt-8 text-muted-foreground">{t("loading")}</div></MobileShell>;
  }

  if (!baby) return <BabySetup onCreated={reload} />;

  const tiles = [
    { to: "/baby/vaccinations" as const, icon: Syringe, label: t("vaccinations") },
    { to: "/baby/growth" as const, icon: LineChart, label: t("growth") },
    { to: "/baby/feeds" as const, icon: Milk, label: t("feeds") },
    { to: "/baby/care" as const, icon: BookOpen, label: t("newborn_care") },
    { to: "/postpartum" as const, icon: Heart, label: t("postpartum") },
  ];

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("baby_overview")}</h1>

        <div className="mt-6 rounded-3xl bg-gradient-to-br from-[oklch(0.92_0.07_15)] to-[oklch(0.9_0.06_150)] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-card text-primary">
              <BabyIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-xl">{baby.name || t("baby")}</p>
              <p className="text-xs text-muted-foreground">
                {t("age")}: {ageLabel(baby.dob, lang)}
              </p>
            </div>
          </div>
          {(baby.birth_weight_kg || baby.birth_length_cm) && (
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {baby.birth_weight_kg && (
                <div className="rounded-xl bg-card/70 p-3">
                  <p className="text-[11px] uppercase text-muted-foreground">{t("birth_weight")}</p>
                  <p className="font-medium">{baby.birth_weight_kg} kg</p>
                </div>
              )}
              {baby.birth_length_cm && (
                <div className="rounded-xl bg-card/70 p-3">
                  <p className="text-[11px] uppercase text-muted-foreground">{t("birth_length")}</p>
                  <p className="font-medium">{baby.birth_length_cm} cm</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {tiles.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className="flex flex-col gap-2 rounded-2xl bg-card p-4 shadow-sm">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

function BabySetup({ onCreated }: { onCreated: () => void }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const nav = useNavigate();
  const [name, setName] = React.useState("");
  const [dob, setDob] = React.useState(new Date().toISOString().slice(0, 10));
  const [sex, setSex] = React.useState<string>("other");
  const [bw, setBw] = React.useState("");
  const [bl, setBl] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { data, error } = await supabase
      .from("baby_profiles")
      .insert({
        user_id: user.id,
        name: name || null,
        dob,
        sex,
        birth_weight_kg: bw ? Number(bw) : null,
        birth_length_cm: bl ? Number(bl) : null,
      })
      .select("id")
      .single();
    setBusy(false);
    if (error || !data) return;
    // Pre-create the vaccination schedule
    const { buildScheduleForBaby } = await import("@/lib/uip");
    const rows = buildScheduleForBaby(dob).map((v) => ({
      user_id: user.id,
      baby_id: data.id,
      vaccine_code: v.code,
      scheduled_date: v.scheduled_date,
    }));
    await supabase.from("vaccinations").insert(rows);
    onCreated();
    nav({ to: "/baby" });
  };

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("baby_setup")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("baby_setup_intro")}</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <Label>{t("baby_name")}</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 h-11 rounded-xl" />
          </div>
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <Label>{t("baby_dob")}</Label>
            <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-2 h-11 rounded-xl" required />
          </div>
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <Label>{t("baby_sex")}</Label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(["female", "male", "other"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSex(s)}
                  className={
                    "rounded-xl border px-3 py-2 text-sm transition-colors " +
                    (sex === s ? "border-primary bg-primary/10" : "border-border bg-card text-muted-foreground")
                  }
                >{t(s)}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-card p-4 shadow-sm">
              <Label>{t("birth_weight")}</Label>
              <Input type="number" step="0.01" value={bw} onChange={(e) => setBw(e.target.value)} className="mt-2 h-11 rounded-xl" />
            </div>
            <div className="rounded-2xl bg-card p-4 shadow-sm">
              <Label>{t("birth_length")}</Label>
              <Input type="number" step="0.1" value={bl} onChange={(e) => setBl(e.target.value)} className="mt-2 h-11 rounded-xl" />
            </div>
          </div>
          <Button type="submit" disabled={busy} className="h-12 w-full rounded-full">
            {busy ? t("loading") : t("save")}
          </Button>
        </form>
      </div>
    </MobileShell>
  );
}
