import { Info } from "lucide-react";

export function DisclaimerBanner({ text }: { text?: string }) {
  return (
    <div className="mt-4 flex items-start gap-2 rounded-2xl bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        {text ??
          "Educational guidance only. Not a substitute for your doctor. If symptoms are severe, persistent, or worrying, seek medical care."}
      </p>
    </div>
  );
}
