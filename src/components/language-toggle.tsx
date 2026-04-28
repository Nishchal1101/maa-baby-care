import * as React from "react";
import { useI18n, type Lang } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex rounded-full bg-muted p-1 text-xs">
      {(["en", "hi"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={
            "rounded-full px-3 py-1 transition-colors " +
            (lang === l ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")
          }
        >
          {l === "en" ? "EN" : "हिं"}
        </button>
      ))}
    </div>
  );
}
