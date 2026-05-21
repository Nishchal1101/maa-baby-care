import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";

type Props = {
  title?: string;
  subtitle?: string;
  backTo?: string;
  showBrand?: boolean;
  showLang?: boolean;
  right?: React.ReactNode;
  icon?: React.ReactNode;
};

/**
 * Consistent page header used across MatruCare screens.
 * - Brand mark + language toggle on top-level screens
 * - Back chevron on sub-screens
 * - Wraps long titles safely (never breaks the outer card)
 */
export function PageHeader({
  title,
  subtitle,
  backTo,
  showBrand = false,
  showLang = true,
  right,
  icon,
}: Props) {
  const { t } = useI18n();
  return (
    <header className="pt-6">
      {(backTo || showBrand || showLang) && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {backTo ? (
              <Link
                to={backTo}
                className="-ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" /> {t("back")}
              </Link>
            ) : showBrand ? (
              <Link to="/home" className="flex min-w-0 items-center gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Heart className="h-4 w-4" />
                </span>
                <span className="truncate font-display text-base font-semibold">
                  {t("app_name")}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {right}
            {showLang && <LanguageToggle />}
          </div>
        </div>
      )}

      {(title || subtitle) && (
        <div className="mt-4 flex items-start gap-3">
          {icon && (
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              {icon}
            </span>
          )}
          <div className="min-w-0 flex-1">
            {title && (
              <h1 className="font-display text-2xl leading-tight break-words">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground break-words">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
