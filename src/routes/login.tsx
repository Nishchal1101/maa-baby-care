import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageToggle } from "@/components/language-toggle";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { t } = useI18n();
  const { user, profile } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (user && profile?.onboarded) nav({ to: "/home" });
    else if (user && profile && !profile.onboarded) nav({ to: "/onboarding" });
  }, [user, profile, nav]);

  const explainError = (rawMessage: string) => {
    const msg = rawMessage?.toLowerCase() ?? "";
    if (msg.includes("invalid login credentials"))
      return "Incorrect email or password. Please check and try again.";
    if (msg.includes("email not confirmed"))
      return "Please verify your email first. Check your inbox for the confirmation link.";
    if (msg.includes("user not found"))
      return "No account found with this email. Please sign up first.";
    if (msg.includes("rate limit") || msg.includes("too many"))
      return "Too many attempts. Please wait a moment and try again.";
    if (
      msg.includes("load failed") ||
      msg.includes("failed to fetch") ||
      msg.includes("network") ||
      msg.includes("networkerror")
    )
      return "Can't reach the server. The backend may be paused or your internet is offline.";
    return rawMessage || "Login failed. Please try again.";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(explainError(error.message), { description: error.message });
        return;
      }
      toast.success("Welcome back!");
    } catch (err: any) {
      const raw = err?.message || String(err);
      toast.error(explainError(raw), { description: raw });
    } finally {
      setBusy(false);
    }
  };

  const clearSavedCredentials = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    try {
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith("sb-") || k.includes("supabase"))
        .forEach((k) => window.localStorage.removeItem(k));
      Object.keys(window.sessionStorage)
        .filter((k) => k.startsWith("sb-") || k.includes("supabase"))
        .forEach((k) => window.sessionStorage.removeItem(k));
    } catch {}
    setEmail("");
    setPassword("");
    toast.success("Saved credentials cleared.");
  };

  const forgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("reset_password_sent"));
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-8">
      <div className="flex justify-end"><LanguageToggle /></div>
      <h1 className="mt-6 font-display text-3xl">{t("login")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("password")}</Label>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-xl" />
          <button
            type="button"
            onClick={forgotPassword}
            className="text-[10px] text-muted-foreground hover:text-primary w-full text-right"
          >
            {t("forgot_password")}
          </button>
        </div>
        <Button type="submit" disabled={busy} className="h-12 w-full rounded-full text-base">
          {busy ? t("loading") : t("login")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here? <Link to="/signup" className="font-medium text-primary">{t("signup")}</Link>
      </p>

      <button
        type="button"
        onClick={clearSavedCredentials}
        className="mt-4 text-[10px] text-muted-foreground hover:text-destructive w-full text-center"
      >
        Clear saved credentials
      </button>
    </div>
  );
}
