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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      const msg = error.message?.toLowerCase() ?? "";
      let friendly = error.message || "Login failed. Please try again.";
      if (msg.includes("invalid login credentials")) {
        friendly = "Incorrect email or password. Please check and try again.";
      } else if (msg.includes("email not confirmed")) {
        friendly = "Please verify your email first. Check your inbox for the confirmation link.";
      } else if (msg.includes("user not found")) {
        friendly = "No account found with this email. Please sign up first.";
      } else if (msg.includes("rate limit") || msg.includes("too many")) {
        friendly = "Too many attempts. Please wait a moment and try again.";
      } else if (msg.includes("network") || msg.includes("fetch")) {
        friendly = "Network error. Please check your internet connection.";
      }
      toast.error(friendly, { description: error.message });
      return;
    }
    toast.success("Welcome back!");
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
        </div>
        <Button type="submit" disabled={busy} className="h-12 w-full rounded-full text-base">
          {busy ? t("loading") : t("login")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here? <Link to="/signup" className="font-medium text-primary">{t("signup")}</Link>
      </p>
    </div>
  );
}
