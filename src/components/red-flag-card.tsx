import * as React from "react";
import { AlertTriangle, PhoneCall } from "lucide-react";

export function RedFlagCard({
  title,
  items,
  source,
}: {
  title?: string;
  items: string[];
  source?: string;
}) {
  return (
    <section className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <p className="text-xs font-semibold uppercase tracking-wider text-destructive">
          {title ?? "Seek urgent care if"}
        </p>
      </div>
      <ul className="mt-2 space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i} className="flex gap-2"><span>•</span><span>{i}</span></li>
        ))}
      </ul>
      <a
        href="tel:108"
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground"
      >
        <PhoneCall className="h-3.5 w-3.5" /> Call 108 (ambulance)
      </a>
      {source && <p className="mt-2 text-[11px] italic text-muted-foreground">Source: {source}</p>}
    </section>
  );
}
