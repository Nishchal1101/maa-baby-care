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

type FeedType = "breast_left" | "breast_right" | "formula" | "expressed" | "solid";

type Row = {
  id: string;
  started_at: string;
  feed_type: FeedType;
  duration_minutes: number | null;
  amount_ml: number | null;
};

export const Route = createFileRoute("/baby/feeds")({ component: FeedsPage });

function FeedsPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [rows, setRows] = React.useState<Row[]>([]);
  const [babyId, setBabyId] = React.useState<string | null>(null);
  const [type, setType] = React.useState<FeedType>("breast_left");
  const [dur, setDur] = React.useState("");
  const [ml, setMl] = React.useState("");

  const load = React.useCallback(async () => {
    if (!user) return;
    const { data: baby } = await supabase.from("baby_profiles").select("id")
      .eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (!baby) return;
    const id = (baby as { id: string }).id;
    setBabyId(id);
    const { data } = await supabase
      .from("feed_logs").select("id,started_at,feed_type,duration_minutes,amount_ml")
      .eq("baby_id", id).order("started_at", { ascending: false }).limit(50);
    setRows((data as Row[] | null) ?? []);
  }, [user]);

  React.useEffect(() => { load(); }, [load]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !babyId) return;
    const { error } = await supabase.from("feed_logs").insert({
      user_id: user.id,
      baby_id: babyId,
      feed_type: type,
      duration_minutes: dur ? Number(dur) : null,
      amount_ml: ml ? Number(ml) : null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success(t("saved"));
    setDur(""); setMl("");
    load();
  };

  const types: FeedType[] = ["breast_left", "breast_right", "formula", "expressed", "solid"];

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("feed_log")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("feed_intro")}</p>

        <form onSubmit={save} className="mt-6 space-y-3">
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <Label>{t("feed_type")}</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {types.map((tt) => (
                <button
                  key={tt}
                  type="button"
                  onClick={() => setType(tt)}
                  className={
                    "rounded-full border px-3 py-1.5 text-xs transition-colors " +
                    (type === tt ? "border-primary bg-primary/10" : "border-border bg-card text-muted-foreground")
                  }
                >{t(tt)}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-card p-3 shadow-sm">
              <Label className="text-xs">{t("duration_min")}</Label>
              <Input type="number" value={dur} onChange={(e) => setDur(e.target.value)} className="mt-2 h-11 rounded-xl" />
            </div>
            <div className="rounded-2xl bg-card p-3 shadow-sm">
              <Label className="text-xs">{t("amount_ml")}</Label>
              <Input type="number" value={ml} onChange={(e) => setMl(e.target.value)} className="mt-2 h-11 rounded-xl" />
            </div>
          </div>
          <Button type="submit" className="h-12 w-full rounded-full">{t("add_feed")}</Button>
        </form>

        <ul className="mt-6 space-y-2">
          {rows.map((r) => (
            <li key={r.id} className="rounded-2xl bg-card p-4 text-sm shadow-sm">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{new Date(r.started_at).toLocaleString()}</span>
                <span>{t(r.feed_type)}</span>
              </div>
              <p className="mt-1">
                {r.duration_minutes ? `${r.duration_minutes} min` : "—"}
                {r.amount_ml ? ` · ${r.amount_ml} ml` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </MobileShell>
  );
}
