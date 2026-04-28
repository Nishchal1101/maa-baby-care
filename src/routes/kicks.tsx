import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/kicks")({
  component: KicksPage,
});

function KicksPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [running, setRunning] = React.useState(false);
  const [startTs, setStartTs] = React.useState<number | null>(null);
  const [count, setCount] = React.useState(0);
  const [, force] = React.useState(0);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => force((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const elapsed = startTs ? Math.floor((Date.now() - startTs) / 1000) : 0;
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const start = () => {
    setStartTs(Date.now());
    setCount(0);
    setRunning(true);
  };
  const stop = async () => {
    setRunning(false);
    if (!user || !startTs) return;
    await supabase.from("kick_sessions").insert({
      user_id: user.id,
      started_at: new Date(startTs).toISOString(),
      ended_at: new Date().toISOString(),
      kick_count: count,
    });
    toast.success(t("saved"));
  };
  const reset = () => { setStartTs(null); setCount(0); setRunning(false); };

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("kicks_title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("kicks_help")}</p>

        <div className="mt-8 rounded-3xl bg-card p-6 text-center shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("elapsed")}</p>
          <p className="mt-2 font-display text-5xl">{mm}:{ss}</p>

          <p className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">{t("kick")}s</p>
          <p className="mt-2 font-display text-7xl text-primary">{count}</p>

          <button
            onClick={() => running && setCount((c) => c + 1)}
            disabled={!running}
            className="mt-6 h-32 w-32 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95 disabled:opacity-40"
          >
            <span className="font-display text-xl">{t("kick")}</span>
          </button>
        </div>

        <div className="mt-6 flex gap-2">
          {!running ? (
            <Button onClick={start} className="h-12 flex-1 rounded-full">{t("start")}</Button>
          ) : (
            <Button onClick={stop} variant="destructive" className="h-12 flex-1 rounded-full">{t("stop")}</Button>
          )}
          <Button onClick={reset} variant="ghost" className="h-12 flex-1 rounded-full">{t("reset")}</Button>
        </div>
      </div>
    </MobileShell>
  );
}
