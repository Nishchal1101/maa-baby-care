import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { NEWBORN_TIPS, BREASTFEEDING_TIPS } from "@/lib/baby-care";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/baby/care")({ component: CarePage });

function CarePage() {
  const { t, lang } = useI18n();

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">{t("newborn_care")}</h1>

        <Tabs defaultValue="newborn" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 rounded-full">
            <TabsTrigger value="newborn" className="rounded-full">{t("newborn_care")}</TabsTrigger>
            <TabsTrigger value="bf" className="rounded-full">{t("breastfeeding")}</TabsTrigger>
          </TabsList>

          <TabsContent value="newborn" className="mt-4 space-y-3">
            {NEWBORN_TIPS.map((tip, i) => (
              <article key={i} className="rounded-2xl bg-card p-4 shadow-sm">
                <h2 className="font-display text-base">{tip.title[lang]}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{tip.body[lang]}</p>
              </article>
            ))}
          </TabsContent>

          <TabsContent value="bf" className="mt-4 space-y-3">
            {BREASTFEEDING_TIPS.map((tip, i) => (
              <article key={i} className="rounded-2xl bg-card p-4 shadow-sm">
                <h2 className="font-display text-base">{tip.title[lang]}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{tip.body[lang]}</p>
              </article>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MobileShell>
  );
}
