import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { yogaPoses, breathing, kegelGuide, exerciseAvoid, walkingGoal, type Trimester } from "@/lib/yoga";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Wind, Footprints, ShieldAlert, Flower2 } from "lucide-react";

export const Route = createFileRoute("/yoga")({
  head: () => ({
    meta: [
      { title: "Yoga & Exercise — MatruCare" },
      { name: "description", content: "Trimester-wise prenatal yoga, pranayama breathing, kegels and walking goals — safe for Indian mothers." },
    ],
  }),
  component: YogaPage,
});

function YogaPage() {
  const { t } = useI18n();
  const [trimester, setTrimester] = React.useState<Trimester | "all">("all");

  const filtered = trimester === "all" ? yogaPoses : yogaPoses.filter((p) => p.trimester.includes(trimester));

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
            <Flower2 className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl">{t("yoga_title")}</h1>
            <p className="text-xs text-muted-foreground">{t("yoga_intro")}</p>
          </div>
        </div>

        <Tabs defaultValue="poses" className="mt-6">
          <TabsList className="flex w-full overflow-x-auto rounded-full bg-muted p-1 [scrollbar-width:none]">
            <TabsTrigger value="poses" className="shrink-0 rounded-full text-xs">{t("poses")}</TabsTrigger>
            <TabsTrigger value="breathing" className="shrink-0 rounded-full text-xs">{t("breathing")}</TabsTrigger>
            <TabsTrigger value="kegels" className="shrink-0 rounded-full text-xs">{t("kegels")}</TabsTrigger>
            <TabsTrigger value="walking" className="shrink-0 rounded-full text-xs">{t("walking")}</TabsTrigger>
          </TabsList>

          <TabsContent value="poses" className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {(["all", 1, 2, 3] as const).map((tri) => (
                <button
                  key={String(tri)}
                  onClick={() => setTrimester(tri)}
                  className={`rounded-full px-3 py-1.5 text-xs transition ${
                    trimester === tri ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tri === "all" ? t("all_trimesters") : t(`trimester_${tri}` as "trimester_1")}
                </button>
              ))}
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {filtered.map((pose) => (
                <AccordionItem key={pose.id} value={pose.id} className="overflow-hidden rounded-2xl border-0 bg-card shadow-sm">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex flex-1 flex-col items-start text-left">
                      <span className="font-medium">{pose.name}</span>
                      {pose.nameHi ? <span className="text-xs text-muted-foreground">{pose.nameHi}</span> : null}
                      <div className="mt-1 flex flex-wrap gap-1">
                        {pose.trimester.map((tr) => (
                          <Badge key={tr} variant="secondary" className="text-[10px]">T{tr}</Badge>
                        ))}
                        <Badge variant="outline" className="text-[10px]">{pose.duration}</Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-0">
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground">{t("benefits")}:</strong> {pose.benefits}</p>
                    <p className="mt-3 text-sm font-medium">{t("steps")}</p>
                    <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                      {pose.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-center gap-2 font-medium text-destructive">
                <ShieldAlert className="h-4 w-4" /> {t("avoid_list")}
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {exerciseAvoid.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="breathing" className="mt-4 space-y-2">
            {breathing.map((b) => (
              <div key={b.id} className="rounded-2xl bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-primary" />
                  <span className="font-medium">{b.name}</span>
                </div>
                {b.nameHi ? <p className="text-xs text-muted-foreground">{b.nameHi}</p> : null}
                <p className="mt-2 text-sm text-muted-foreground">{b.benefits}</p>
                <p className="mt-2 text-xs text-muted-foreground">{b.rounds}</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                  {b.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="kegels" className="mt-4">
            <div className="rounded-2xl bg-card p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">{kegelGuide.what}</p>
              <p className="mt-3 text-sm font-medium">{t("steps")}</p>
              <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                {kegelGuide.how.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="walking" className="mt-4">
            <div className="rounded-2xl bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Footprints className="h-4 w-4 text-primary" />
                <span className="font-medium">{walkingGoal.goal}</span>
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {walkingGoal.tips.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileShell>
  );
}
