import * as React from "react";
import { useI18n } from "@/lib/i18n";
import { LANGUAGES, type LangCode } from "@/lib/languages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <Select value={lang} onValueChange={(v) => setLang(v as LangCode)}>
      <SelectTrigger className="h-9 w-[150px] rounded-full text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {LANGUAGES.map((l) => (
          <SelectItem key={l.code} value={l.code}>
            {l.native}
            {l.native !== l.english ? ` · ${l.english}` : ""}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Grid of language cards, used in onboarding. */
export function LanguagePicker() {
  const { lang, setLang } = useI18n();
  return (
    <div className="grid grid-cols-2 gap-2">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={
            "rounded-lg border p-3 text-left transition-colors " +
            (lang === l.code
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card text-muted-foreground")
          }
        >
          <span className="block text-sm font-medium text-foreground">{l.native}</span>
          <span className="block text-xs">{l.english}</span>
        </button>
      ))}
    </div>
  );
}
