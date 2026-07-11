import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Row = {
  id: string;
  log_date: string;
  weight_kg: number | null;
  height_cm: number | null;
  head_circumference_cm: number | null;
};

export const Route = createFileRoute("/baby/growth")({ component: GrowthPage });

function GrowthPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [rows, setRows] = React.useState<Row[]>([]);
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [w, setW] = React.useState("");
  const [h, setH] = React.useState("");
  const [hc, setHc] = React.useState("");
  const [babyId, setBabyId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    if (!user) return;
    const { data: baby } = await supabase
      .from("baby_profiles").select("id").eq("user_id", user.id)
      .order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (!baby) return;
    setBabyId((baby as { id: string }).id);
    const { data } = await supabase
      .from("baby_growth_logs")
      .select("id,log_date,weight_kg,height_cm,head_circumference_cm")
      .eq("baby_id", (baby as { id: string }).id)
      .order("log_date", { ascending: false });
    setRows((data as Row[] | null) ?? []);
  }, [user]);

  React.useEffect(() => { load(); }, [load]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !babyId) return;
    const { error } = await supabase.from("baby_growth_logs").insert({
      user_id: user.id,
      baby_id: babyId,
      log_date: date,
      weight_kg: w ? Number(w) : null,
      height_cm: h ? Number(h) : null,
      head_circumference_cm: hc ? Number(hc) : null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success(t("saved"));
    setW(""); setH(""); setHc("");
    load();
  };

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("growth")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("growth_intro")}</p>

        <form onSubmit={save} className="mt-6 space-y-3">
          <div className="rounded-lg bg-card p-4 shadow-sm">
            <Label>{t("date")}</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 h-11 rounded-md" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-card p-3 shadow-sm">
              <Label className="text-xs">{t("weight_kg")}</Label>
              <Input type="number" step="0.01" value={w} onChange={(e) => setW(e.target.value)} className="mt-2 h-11 rounded-md" />
            </div>
            <div className="rounded-lg bg-card p-3 shadow-sm">
              <Label className="text-xs">{t("height_cm")}</Label>
              <Input type="number" step="0.1" value={h} onChange={(e) => setH(e.target.value)} className="mt-2 h-11 rounded-md" />
            </div>
            <div className="rounded-lg bg-card p-3 shadow-sm">
              <Label className="text-xs">{t("head_cm")}</Label>
              <Input type="number" step="0.1" value={hc} onChange={(e) => setHc(e.target.value)} className="mt-2 h-11 rounded-md" />
            </div>
          </div>
          <Button type="submit" className="h-12 w-full rounded-lg">{t("add_growth")}</Button>
        </form>

        <ul className="mt-6 space-y-2">
          {rows.map((r) => (
            <li key={r.id} className="rounded-lg bg-card p-4 text-sm shadow-sm">
              <p className="text-xs text-muted-foreground">{r.log_date}</p>
              <p className="mt-1">
                {r.weight_kg ? `${r.weight_kg} kg` : " - "} · {r.height_cm ? `${r.height_cm} cm` : " - "} · {r.head_circumference_cm ? `${r.head_circumference_cm} cm` : " - "}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </MobileShell>
  );
}
