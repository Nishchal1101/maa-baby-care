import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Heart, Calendar, Salad, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { BackButton } from "@/components/back-button";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome  -  Maatri" },
      {
        name: "description",
        content:
          "Welcome to Maatri  -  a gentle India-first pregnancy companion. Tracking, diet, ANC reminders and community.",
      },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [i, setI] = React.useState(0);

  const slides = [
    {
      icon: <Sparkles className="h-7 w-7" />,
      title: t("welcome_1_title"),
      body: t("welcome_1_body"),
      art: "from-[oklch(0.92_0.07_15)] to-[oklch(0.9_0.06_150)]",
      emoji: "🌸",
    },
    {
      icon: <Salad className="h-7 w-7" />,
      title: t("welcome_2_title"),
      body: t("welcome_2_body"),
      art: "from-[oklch(0.9_0.08_85)] to-[oklch(0.88_0.07_25)]",
      emoji: "🥭",
    },
    {
      icon: <Heart className="h-7 w-7" />,
      title: t("welcome_3_title"),
      body: t("welcome_3_body"),
      art: "from-[oklch(0.97_0.02_145)] to-[oklch(0.92_0.05_150)]",
      emoji: "💗",
    },
  ];

  const finish = React.useCallback(() => {
    if (typeof window !== "undefined") localStorage.setItem("welcomed", "1");
    nav({ to: "/signup" });
  }, [nav]);

  const isLast = i === slides.length - 1;
  const slide = slides[i];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pb-8 pt-6">
        <header className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <BackButton />
            <Link to="/" className="flex min-w-0 items-center gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <Heart className="h-4 w-4" />
              </span>
              <span className="truncate font-display text-base font-semibold">
                {t("app_name")}
              </span>
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={finish}
              className="rounded-full px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {t("skip")}
            </button>
            <LanguageToggle />
          </div>
        </header>

        <section className="mt-6 flex-1">
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl bg-gradient-to-br p-7 shadow-sm",
              slide.art,
            )}
          >
            <span className="absolute -right-6 -top-6 text-[7rem] leading-none opacity-30 select-none">
              {slide.emoji}
            </span>
            <span className="relative grid h-12 w-12 place-items-center rounded-lg bg-card/80 text-primary backdrop-blur-sm">
              {slide.icon}
            </span>
            <h1 className="relative mt-6 font-display text-[2rem] leading-[1.15] text-foreground break-words">
              {slide.title}
            </h1>
            <p className="relative mt-3 text-sm leading-relaxed text-foreground/75 break-words">
              {slide.body}
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <FeatureRow icon={<Calendar className="h-4 w-4" />} text={t("view_week")} />
            <FeatureRow icon={<Salad className="h-4 w-4" />} text={t("diet_title")} />
            <FeatureRow icon={<Heart className="h-4 w-4" />} text={t("anc_schedule")} />
          </ul>
        </section>

        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === i ? "w-8 bg-primary" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {isLast ? (
            <>
              <Button onClick={finish} size="lg" className="h-12 w-full rounded-lg text-base">
                {t("get_started")}
              </Button>
              <Button asChild variant="ghost" size="lg" className="h-12 w-full rounded-lg text-base">
                <Link to="/login">{t("login")}</Link>
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              onClick={() => setI((v) => Math.min(v + 1, slides.length - 1))}
              className="h-12 w-full rounded-lg text-base"
            >
              {t("next")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-3 rounded-lg bg-card px-4 py-3 shadow-sm">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm">{text}</span>
    </li>
  );
}
