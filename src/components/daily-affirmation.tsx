import * as React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { affirmationForDate, dateKey } from "@/lib/affirmations";

const STORAGE_KEY = "maatri_affirmation_seen";

/**
 * Daily affirmation bottom sheet.
 * Shows once per day, with no action other than the close icon.
 */
export function DailyAffirmation() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    const today = dateKey();
    if (localStorage.getItem(STORAGE_KEY) === today) return;
    setText(affirmationForDate());
    const timer = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const onOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) localStorage.setItem(STORAGE_KEY, dateKey());
  };

  if (!text) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl border-none bg-gradient-to-b from-secondary to-card px-6 pb-10 pt-8"
      >
        <div className="mx-auto max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-2xl">
            🌸
          </div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Affirmation for today
          </p>
          <p className="mt-3 font-display text-xl leading-relaxed text-foreground">
            {text}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
