import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Footprints, Activity, LogOut, User, Flower2, Landmark, MessageCircle, Baby, Heart } from "lucide-react";

export const Route = createFileRoute("/more")({
  component: MorePage,
});

function MorePage() {
  const { t } = useI18n();
  const { profile, signOut } = useAuth();
  const nav = useNavigate();

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("more")}</h1>

        <div className="mt-6 rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><User className="h-5 w-5" /></span>
            <div>
              <p className="font-medium">{profile?.name || "—"}</p>
              <p className="text-xs text-muted-foreground">{[profile?.city, profile?.state].filter(Boolean).join(", ") || "—"}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Link to="/baby" className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <Baby className="h-5 w-5 text-primary" /> {t("baby")}
          </Link>
          <Link to="/postpartum" className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <Heart className="h-5 w-5 text-primary" /> {t("postpartum")}
          </Link>
          <Link to="/kicks" className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <Footprints className="h-5 w-5 text-primary" /> {t("kicks_title")}
          </Link>
          <Link to="/symptoms" className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <Activity className="h-5 w-5 text-primary" /> {t("sym_title")}
          </Link>
          <Link to="/yoga" className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <Flower2 className="h-5 w-5 text-primary" /> {t("yoga_title")}
          </Link>
          <Link to="/community" className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <MessageCircle className="h-5 w-5 text-primary" /> {t("community")}
          </Link>
          <Link to="/schemes" className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <Landmark className="h-5 w-5 text-primary" /> {t("schemes_title")}
          </Link>
          <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
            <span>{t("language")}</span>
            <LanguageToggle />
          </div>
        </div>

        <Button
          variant="ghost"
          className="mt-6 h-12 w-full rounded-full text-destructive"
          onClick={async () => { await signOut(); nav({ to: "/" }); }}
        >
          <LogOut className="h-4 w-4" /> {t("logout")}
        </Button>
      </div>
    </MobileShell>
  );
}
