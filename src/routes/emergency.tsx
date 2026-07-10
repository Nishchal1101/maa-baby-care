import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { RedFlagCard } from "@/components/red-flag-card";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { pregnancyRedFlags, postpartumRedFlags, newbornRedFlags } from "@/lib/red-flags";
import { PhoneCall } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency signs — Maa Baby Care" },
      { name: "description", content: "Pregnancy, postpartum, and newborn danger signs that need urgent medical care." },
      { property: "og:title", content: "Emergency signs — Maa Baby Care" },
      { property: "og:description", content: "Pregnancy, postpartum, and newborn danger signs that need urgent medical care." },
    ],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">Emergency signs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          If you notice any of these, do not wait — go to the nearest hospital or call for help.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <a href="tel:108" className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground">
            <PhoneCall className="h-4 w-4" /> 108 Ambulance
          </a>
          <a href="tel:102" className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium shadow-sm">
            <PhoneCall className="h-4 w-4" /> 102 Mother-child
          </a>
        </div>

        <DisclaimerBanner />

        <RedFlagCard title="During pregnancy" items={pregnancyRedFlags.items} source={pregnancyRedFlags.source} />
        <RedFlagCard title="After delivery (postpartum)" items={postpartumRedFlags.items} source={postpartumRedFlags.source} />
        <RedFlagCard title="Newborn danger signs" items={newbornRedFlags.items} source={newbornRedFlags.source} />
      </div>
    </MobileShell>
  );
}
