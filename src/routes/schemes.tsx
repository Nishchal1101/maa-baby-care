import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useI18n } from "@/lib/i18n";
import { schemes, emergencyContacts } from "@/lib/schemes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronLeft, Phone, Landmark, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Govt Schemes & Emergency — MatruCare" },
      { name: "description", content: "PMMVY, JSY, JSSK, Ayushman Bharat — Indian government maternity schemes and emergency helpline numbers for pregnant mothers." },
    ],
  }),
  component: SchemesPage,
});

function SchemesPage() {
  const { t } = useI18n();

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-6">
        <Link to="/more" className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground">
          <ChevronLeft className="h-4 w-4" /> {t("back")}
        </Link>
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
            <Landmark className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl">{t("schemes_title")}</h1>
            <p className="text-xs text-muted-foreground">{t("schemes_intro")}</p>
          </div>
        </div>

        {/* Emergency strip */}
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-medium text-muted-foreground">{t("emergency")}</h2>
          <div className="grid grid-cols-2 gap-2">
            {emergencyContacts.map((c) => (
              <a
                key={c.number}
                href={`tel:${c.number}`}
                className="flex flex-col rounded-2xl bg-card p-3 shadow-sm active:scale-[0.98]"
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" /> {c.name}
                </span>
                <span className="mt-1 font-display text-2xl text-primary">{c.number}</span>
                <span className="text-[11px] text-muted-foreground">{c.desc}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Schemes */}
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-medium text-muted-foreground">Schemes</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {schemes.map((s) => (
              <AccordionItem key={s.id} value={s.id} className="overflow-hidden rounded-2xl border-0 bg-card shadow-sm">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex flex-1 flex-col items-start text-left">
                    <span className="font-medium leading-tight">{s.shortName}</span>
                    <span className="text-xs text-muted-foreground">{s.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 px-4 pb-4 pt-0 text-sm">
                  <p className="text-xs text-muted-foreground">{s.ministry}</p>
                  <div>
                    <p className="font-medium">{t("benefit")}</p>
                    <p className="text-muted-foreground">{s.benefit}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t("eligibility")}</p>
                    <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                      {s.eligibility.map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">{t("how_to_apply")}</p>
                    <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
                      {s.howToApply.map((h, i) => <li key={i}>{h}</li>)}
                    </ol>
                  </div>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary"
                  >
                    {t("visit_site")} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </MobileShell>
  );
}
