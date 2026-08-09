import * as React from "react";
import { MaatriLogo } from "@/components/maatri-logo";

const SPLASH_MS = 2400;

/**
 * App splash screen: shows the Maatri lockup for ~2.4s on first load,
 * then fades out. Only shown once per browser session.
 */
export function SplashScreen() {
  const [visible, setVisible] = React.useState(true);
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("maatri_splash_seen")) {
      setVisible(false);
      return;
    }
    const t1 = setTimeout(() => setLeaving(true), SPLASH_MS - 400);
    const t2 = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("maatri_splash_seen", "1");
      } catch {
        /* ignore */
      }
    }, SPLASH_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-400 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6 px-8 text-center">
        <MaatriLogo className="h-48 w-48 animate-in fade-in zoom-in-95 duration-700" />
        <p className="animate-in fade-in text-sm text-muted-foreground duration-1000">
          Pregnancy care for Indian mothers
        </p>
      </div>
    </div>
  );
}
