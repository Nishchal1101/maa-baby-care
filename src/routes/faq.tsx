import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { MobileShell } from "@/components/mobile-shell";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { SourceNote } from "@/components/source-note";
import { faqs, faqSource } from "@/lib/faq";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Pregnancy FAQ — Maa Baby Care" },
      { name: "description", content: "Common questions Indian mothers ask their doctors, with sourced short answers." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState<number | null>(0);
  const filtered = faqs.filter((f) => (f.q + f.a).toLowerCase().includes(q.toLowerCase()));

  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-4">
        <h1 className="font-display text-2xl">Common questions</h1>
        <p className="mt-1 text-sm text-muted-foreground">Answers to questions doctors are commonly asked.</p>
        <DisclaimerBanner />

        <Input
          placeholder="Search a question…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="mt-4 rounded-full"
        />

        <div className="mt-4 space-y-2">
          {filtered.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-2xl bg-card shadow-sm">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
                >
                  <span className="text-sm font-medium">{f.q}</span>
                  <ChevronDown className={"h-4 w-4 shrink-0 transition-transform " + (isOpen ? "rotate-180" : "")} />
                </button>
                {isOpen && <p className="px-4 pb-4 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            );
          })}
          {filtered.length === 0 && <p className="text-sm text-muted-foreground">No matches.</p>}
        </div>

        <SourceNote source={faqSource} />
      </div>
    </MobileShell>
  );
}
