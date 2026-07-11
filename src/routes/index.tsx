import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Calendar, Salad } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MatruCare  -  Pregnancy care for Indian mothers" },
      {
        name: "description",
        content:
          "A gentle, India-first pregnancy companion. Week-by-week tracker, Indian diet plans, ANC reminders, kick counter and more.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { user, profile, loading } = useAuth();
  const { t } = useI18n();
  const nav = useNavigate();

  React.useEffect(() => {
    if (loading) return;
    if (user && profile?.onboarded) nav({ to: "/home" });
    else if (user && profile && !profile.onboarded) nav({ to: "/onboarding" });
    else if (!user && typeof window !== "undefined" && !localStorage.getItem("welcomed")) {
      nav({ to: "/welcome" });
    }
  }, [loading, user, profile, nav]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-semibold">{t("app_name")}</span>
          </div>
          <LanguageToggle />
        </header>

        <section className="mt-10 flex-1">
          <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.92_0.07_15)] to-[oklch(0.9_0.06_150)] p-6 shadow-sm">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="mt-4 font-display text-3xl leading-tight text-foreground">
              {t("welcome")}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-sm">
              <Calendar className="mt-0.5 h-5 w-5 text-primary" />
              <span>Week-by-week tracker with Indian fruit size comparisons</span>
            </li>
            <li className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-sm">
              <Salad className="mt-0.5 h-5 w-5 text-primary" />
              <span>Trimester-wise Indian diet  -  veg, non-veg & eggetarian</span>
            </li>
            <li className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-sm">
              <Heart className="mt-0.5 h-5 w-5 text-primary" />
              <span>ANC visits, kick counter & daily symptom log</span>
            </li>
          </ul>
        </section>

        <div className="mt-8 space-y-3">
          <Button asChild size="lg" className="h-12 w-full rounded-lg text-base">
            <Link to="/signup">{t("signup")}</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="h-12 w-full rounded-lg text-base">
            <Link to="/login">{t("login")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
