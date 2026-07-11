import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Footprints, Activity, LogOut, User, Flower2, Landmark, MessageCircle, Baby, Heart, Trash2, AlertTriangle, Stethoscope, Syringe, Apple, Dumbbell, Pill, HelpCircle, Timer } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/more")({
  component: MorePage,
});

function MorePage() {
  const { t } = useI18n();
  const { profile, signOut } = useAuth();
  const nav = useNavigate();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleClearStorage = async () => {
    if (typeof window === "undefined") return;
    window.localStorage.clear();
    await signOut();
    setShowResetConfirm(false);
    nav({ to: "/" });
    window.location.reload();
  };

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("more")}</h1>

        <div className="mt-6 rounded-lg bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><User className="h-5 w-5" /></span>
            <div className="min-w-0">
              <p className="truncate font-medium">{profile?.name || " - "}</p>
              <p className="truncate text-xs text-muted-foreground">{[profile?.city, profile?.state].filter(Boolean).join(", ") || " - "}</p>
            </div>
          </div>
        </div>

        <p className="mt-6 mb-2 text-xs uppercase tracking-wider text-muted-foreground">Urgent</p>
        <div className="space-y-2">
          <Link to="/emergency" className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 font-medium text-destructive shadow-sm">
            <AlertTriangle className="h-5 w-5 shrink-0" /> <span>Emergency signs</span>
          </Link>
          <Link to="/labor-signs" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Timer className="h-5 w-5 shrink-0 text-primary" /> <span>Labor warning signs</span>
          </Link>
        </div>

        <p className="mt-5 mb-2 text-xs uppercase tracking-wider text-muted-foreground">Care during pregnancy</p>
        <div className="space-y-2">
          <Link to="/investigations" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Stethoscope className="h-5 w-5 shrink-0 text-primary" /> <span>ANC checkups & tests</span>
          </Link>
          <Link to="/vaccines-pregnancy" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Syringe className="h-5 w-5 shrink-0 text-primary" /> <span>Vaccinations in pregnancy</span>
          </Link>
          <Link to="/symptoms" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Activity className="h-5 w-5 shrink-0 text-primary" /> <span>{t("sym_title")} & symptom guide</span>
          </Link>
          <Link to="/kicks" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Footprints className="h-5 w-5 shrink-0 text-primary" /> <span>{t("kicks_title")}</span>
          </Link>
        </div>

        <p className="mt-5 mb-2 text-xs uppercase tracking-wider text-muted-foreground">Learn</p>
        <div className="space-y-2">
          <Link to="/nutrition-guide" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Apple className="h-5 w-5 shrink-0 text-primary" /> <span>Nutrition guide</span>
          </Link>
          <Link to="/exercise" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Dumbbell className="h-5 w-5 shrink-0 text-primary" /> <span>Safe exercise</span>
          </Link>
          <Link to="/meds-safety" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Pill className="h-5 w-5 shrink-0 text-primary" /> <span>Medication safety</span>
          </Link>
          <Link to="/faq" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <HelpCircle className="h-5 w-5 shrink-0 text-primary" /> <span>Common questions</span>
          </Link>
          <Link to="/yoga" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Flower2 className="h-5 w-5 shrink-0 text-primary" /> <span>{t("yoga_title")}</span>
          </Link>
        </div>

        <p className="mt-5 mb-2 text-xs uppercase tracking-wider text-muted-foreground">After birth</p>
        <div className="space-y-2">
          <Link to="/baby" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Baby className="h-5 w-5 shrink-0 text-primary" /> <span>{t("baby")}</span>
          </Link>
          <Link to="/postpartum" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Heart className="h-5 w-5 shrink-0 text-primary" /> <span>{t("postpartum")}</span>
          </Link>
        </div>

        <p className="mt-5 mb-2 text-xs uppercase tracking-wider text-muted-foreground">More</p>
        <div className="space-y-2">
          <Link to="/community" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <MessageCircle className="h-5 w-5 shrink-0 text-primary" /> <span>{t("community")}</span>
          </Link>
          <Link to="/schemes" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Landmark className="h-5 w-5 shrink-0 text-primary" /> <span>{t("schemes_title")}</span>
          </Link>
          <div className="flex items-center justify-between rounded-lg bg-card p-4 shadow-sm">
            <span>{t("language")}</span>
            <LanguageToggle />
          </div>
        </div>

        <Button
          variant="ghost"
          className="mt-6 h-12 w-full rounded-lg text-destructive"
          onClick={async () => { await signOut(); nav({ to: "/" }); }}
        >
          <LogOut className="h-4 w-4" /> {t("logout")}
        </Button>

        <Button
          variant="outline"
          className="mt-3 h-12 w-full rounded-lg text-muted-foreground"
          onClick={() => setShowResetConfirm(true)}
        >
          <Trash2 className="h-4 w-4" /> {t("clear_storage") || "Clear all app data"}
        </Button>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-1 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xs rounded-3xl bg-card p-6 shadow-lg">
            <h3 className="font-display text-lg">{t("reset_confirm_title") || "Reset app?"}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("reset_confirm_body") || "This clears all local data (language, welcome state, login session) and signs you out. Your cloud data stays safe."}
            </p>
            <div className="mt-5 flex gap-3">
              <Button variant="outline" className="h-12 flex-1 rounded-full" onClick={() => setShowResetConfirm(false)}>
                {t("cancel") || "Cancel"}
              </Button>
              <Button variant="destructive" className="h-12 flex-1 rounded-full" onClick={handleClearStorage}>
                {t("confirm") || "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}
