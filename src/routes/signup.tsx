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

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const nav = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (user) nav({ to: "/onboarding" });
  }, [user, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl, data: { name } },
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Account created — let's set up your journey 🌸");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-8">
      <div className="flex justify-end"><LanguageToggle /></div>
      <h1 className="mt-6 font-display text-3xl">{t("signup")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("welcome")}</p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("password")}</Label>
          <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-xl" />
        </div>
        <Button type="submit" disabled={busy} className="h-12 w-full rounded-full text-base">
          {busy ? t("loading") : t("signup")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? <Link to="/login" className="font-medium text-primary">{t("login")}</Link>
      </p>
    </div>
  );
}
