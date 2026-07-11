import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { UIP_SCHEDULE } from "@/lib/uip";
import { Check, Syringe } from "lucide-react";
import { toast } from "sonner";

type VaccRow = {
  id: string;
  vaccine_code: string;
  scheduled_date: string;
  administered_date: string | null;
};

export const Route = createFileRoute("/baby/vaccinations")({ component: VaccPage });

function VaccPage() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const [rows, setRows] = React.useState<VaccRow[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("vaccinations")
      .select("id,vaccine_code,scheduled_date,administered_date")
      .eq("user_id", user.id)
      .order("scheduled_date", { ascending: true });
    setRows((data as VaccRow[] | null) ?? []);
    setLoading(false);
  }, [user]);

  React.useEffect(() => { load(); }, [load]);

  const markDone = async (id: string) => {
    const today = new Date().toISOString().slice(0, 10);
    const { error } = await supabase.from("vaccinations").update({ administered_date: today }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(t("saved"));
    load();
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("vaccinations")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("vacc_intro")}</p>

        {loading ? (
          <p className="mt-6 text-muted-foreground">{t("loading")}</p>
        ) : (
          <ul className="mt-6 space-y-3">
            {rows.map((r) => {
              const meta = UIP_SCHEDULE.find((v) => v.code === r.vaccine_code);
              const given = !!r.administered_date;
              const overdue = !given && r.scheduled_date < today;
              return (
                <li key={r.id} className="rounded-lg bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className={
                        "mt-0.5 grid h-9 w-9 place-items-center rounded-full " +
                        (given ? "bg-primary/15 text-primary" : overdue ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground")
                      }>
                        {given ? <Check className="h-4 w-4" /> : <Syringe className="h-4 w-4" />}
                      </span>
                      <div>
                        <p className="font-medium">{meta?.name[lang] ?? r.vaccine_code}</p>
                        <p className="text-xs text-muted-foreground">
                          {given
                            ? `${t("given_on")} ${r.administered_date}`
                            : `${t("scheduled_for")} ${r.scheduled_date}${overdue ? ` · ${t("overdue")}` : ""}`}
                        </p>
                        {meta && (
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            {t("protects_against")}: {meta.protects[lang]}
                          </p>
                        )}
                      </div>
                    </div>
                    {!given && (
                      <Button size="sm" variant="outline" className="rounded-full" onClick={() => markDone(r.id)}>
                        {t("mark_done")}
                      </Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </MobileShell>
  );
}
