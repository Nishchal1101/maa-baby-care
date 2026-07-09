import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackButton } from "@/components/back-button";
import { LanguageToggle } from "@/components/language-toggle";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

type Mode = "email" | "phone";

function detectMode(value: string): Mode {
  const v = value.trim();
  if (!v) return "email";
  if (v.startsWith("+")) return "phone";
  const digits = v.replace(/[\s\-()]/g, "");
  if (/^\d{7,15}$/.test(digits)) return "phone";
  return "email";
}

function normalizePhone(raw: string): string {
  const cleaned = raw.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  const digits = cleaned.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  return `+${digits}`;
}

function LoginPage() {
  const { t } = useI18n();
  const { user, profile, loading } = useAuth();
  const nav = useNavigate();
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  // OTP verification step (phone only, when SMS OTP login is used)
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState("");
  const [phoneUsed, setPhoneUsed] = React.useState("");

  const mode = detectMode(identifier);

  // Redirect after auth. Handles the case where the profile row is missing
  // (e.g. after a data wipe) by sending the user to onboarding to recreate it.
  React.useEffect(() => {
    if (loading || !user) return;
    if (profile?.onboarded) nav({ to: "/home" });
    else nav({ to: "/onboarding" });
  }, [loading, user, profile, nav]);

  const explainError = (rawMessage: string) => {
    const msg = rawMessage?.toLowerCase() ?? "";
    if (msg.includes("invalid login credentials"))
      return "Incorrect credentials. Please check and try again.";
    if (msg.includes("email not confirmed"))
      return "Please verify your email first. Check your inbox for the confirmation link.";
    if (msg.includes("phone not confirmed"))
      return "Please verify your phone number first.";
    if (msg.includes("user not found"))
      return "No account found. Please sign up first.";
    if (msg.includes("rate limit") || msg.includes("too many"))
      return "Too many attempts. Please wait a moment and try again.";
    if (msg.includes("sms") && msg.includes("provider"))
      return "SMS login isn't set up yet. Please use email, or ask the admin to configure an SMS provider.";
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
    if (!identifier.trim() || !password) {
      toast.error("Please enter your email/phone and password.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "email") {
        const { error } = await supabase.auth.signInWithPassword({
          email: identifier.trim(),
          password,
        });
        if (error) {
          toast.error(explainError(error.message), { description: error.message });
          return;
        }
        toast.success("Welcome back!");
      } else {
        const phone = normalizePhone(identifier);
        const { error } = await supabase.auth.signInWithPassword({ phone, password });
        if (error) {
          toast.error(explainError(error.message), { description: error.message });
          return;
        }
        toast.success("Welcome back!");
      }
    } catch (err: any) {
      const raw = err?.message || String(err);
      toast.error(explainError(raw), { description: raw });
    } finally {
      setBusy(false);
    }
  };

  const sendOtp = async () => {
    if (!identifier.trim() || mode !== "phone") {
      toast.error("Enter your phone number to receive an OTP.");
      return;
    }
    const phone = normalizePhone(identifier);
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    setBusy(false);
    if (error) {
      toast.error(explainError(error.message), { description: error.message });
      return;
    }
    setPhoneUsed(phone);
    setOtpSent(true);
    toast.success(`We sent a 6-digit code to ${phone}`);
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 6) {
      toast.error("Enter the 6-digit code.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({
      phone: phoneUsed,
      token: otpCode,
      type: "sms",
    });
    setBusy(false);
    if (error) {
      toast.error(explainError(error.message), { description: error.message });
      return;
    }
    toast.success("Signed in 🌸");
  };

  const forgotPassword = async () => {
    if (!identifier.trim() || mode !== "email") {
      toast.error("Enter your email to reset your password.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(identifier.trim());
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("reset_password_sent"));
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
    setIdentifier("");
    setPassword("");
    toast.success("Saved credentials cleared.");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-8">
      <div className="flex justify-end">
        <LanguageToggle />
      </div>
      <h1 className="mt-6 font-display text-3xl">{t("login")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>

      {!otpSent ? (
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Email or phone number</Label>
            <Input
              id="identifier"
              required
              inputMode={mode === "phone" ? "tel" : "email"}
              autoComplete={mode === "phone" ? "tel" : "email"}
              placeholder="you@example.com or +91 98765 43210"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl"
            />
            <div className="flex items-center justify-between text-[10px]">
              {mode === "phone" ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={busy}
                  className="text-primary hover:underline"
                >
                  Sign in with OTP instead
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={forgotPassword}
                className="text-muted-foreground hover:text-primary"
              >
                {t("forgot_password")}
              </button>
            </div>
          </div>
          <Button type="submit" disabled={busy} className="h-12 w-full rounded-full text-base">
            {busy ? t("loading") : t("login")}
          </Button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="mt-8 space-y-4">
          <div className="rounded-xl bg-muted/50 p-3 text-sm text-muted-foreground">
            Enter the 6-digit code we sent to{" "}
            <span className="font-medium text-foreground">{phoneUsed}</span>.
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp">Verification code</Label>
            <Input
              id="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
              className="h-12 rounded-xl text-center text-lg tracking-[0.5em]"
              placeholder="••••••"
            />
          </div>
          <Button type="submit" disabled={busy} className="h-12 w-full rounded-full text-base">
            {busy ? t("loading") : "Verify & continue"}
          </Button>
          <button
            type="button"
            onClick={() => {
              setOtpSent(false);
              setOtpCode("");
            }}
            className="w-full text-center text-xs text-muted-foreground hover:text-primary"
          >
            ← Use password instead
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/signup" className="font-medium text-primary">
          {t("signup")}
        </Link>
      </p>

      <button
        type="button"
        onClick={clearSavedCredentials}
        className="mt-4 w-full text-center text-[10px] text-muted-foreground hover:text-destructive"
      >
        Clear saved credentials
      </button>
    </div>
  );
}
