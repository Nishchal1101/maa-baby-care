import * as React from "react";
import { useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function BackButton() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          window.history.back();
        } else {
          router.navigate({ to: "/" });
        }
      }}
      className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      aria-label={t("back")}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="hidden sm:inline">{t("back")}</span>
    </button>
  );
}
