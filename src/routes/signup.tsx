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

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

type Mode = "email" | "phone";

// Detects whether the identifier is a phone number or email.
// Phone: starts with + OR is mostly digits (>=7). Otherwise treated as email.
function detectMode(value: string): Mode {
  const v = value.trim();
  if (!v) return "email";
  if (v.startsWith("+")) return "phone";
  const digits = v.replace(/[\s\-()]/g, "");
  if (/^\d{7,15}$/.test(digits)) return "phone";
  return "email";
}

// Normalize a phone input to E.164. If user typed local digits (India default),
// prepend +91. If they typed +<cc><num>, keep as-is (stripped of spaces).
function normalizePhone(raw: string): string {
  const cleaned = raw.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  const digits = cleaned.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`; // India default
  return `+${digits}`;
}

function SignupPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const nav = useNavigate();

  const [name, setName] = React.useState("");
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  // OTP verification step (phone only)
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState("");
  const [phoneUsed, setPhoneUsed] = React.useState("");

  const mode = detectMode(identifier);

  React.useEffect(() => {
    if (user) nav({ to: "/onboarding" });
  }, [user, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      toast.error("Please enter your email or phone number.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "email") {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email: identifier.trim(),
          password,
          options: { emailRedirectTo: redirectUrl, data: { name } },
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Account created  -  check your email to confirm 🌸");
      } else {
        const phone = normalizePhone(identifier);
        const { error } = await supabase.auth.signUp({
          phone,
          password,
          options: { data: { name } },
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        setPhoneUsed(phone);
        setOtpSent(true);
        toast.success(`We sent a 6-digit code to ${phone}`);
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Sign up failed. Please try again.");
    } finally {
      setBusy(false);
    }
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
      toast.error(error.message);
      return;
    }
    toast.success("Phone verified  -  welcome 🌸");
  };

  const resendOtp = async () => {
    setBusy(true);
    const { error } = await supabase.auth.resend({ type: "sms", phone: phoneUsed });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Code resent.");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-8">
      <div className="flex items-center justify-between">
        <BackButton />
        <LanguageToggle />
      </div>
      <h1 className="mt-6 font-display text-3xl">{t("signup")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("welcome")}</p>

      {!otpSent ? (
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-md"
            />
          </div>
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
              className="h-12 rounded-md"
            />
            <p className="text-[11px] text-muted-foreground">
              {identifier.trim()
                ? mode === "phone"
                  ? "We'll send a 6-digit code by SMS to verify your number."
                  : "We'll send a confirmation link to your email."
                : "You can sign up with either an email address or a phone number."}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-md"
            />
          </div>
          <Button type="submit" disabled={busy} className="h-12 w-full rounded-lg text-base">
            {busy ? t("loading") : t("signup")}
          </Button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="mt-8 space-y-4">
          <div className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
            Enter the 6-digit code we sent to <span className="font-medium text-foreground">{phoneUsed}</span>.
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
              className="h-12 rounded-md text-center text-lg tracking-[0.5em]"
              placeholder="••••••"
            />
          </div>
          <Button type="submit" disabled={busy} className="h-12 w-full rounded-lg text-base">
            {busy ? t("loading") : "Verify & continue"}
          </Button>
          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtpCode("");
              }}
              className="text-muted-foreground hover:text-primary"
            >
              ← Change number
            </button>
            <button
              type="button"
              onClick={resendOtp}
              disabled={busy}
              className="text-primary disabled:opacity-50"
            >
              Resend code
            </button>
          </div>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary">
          {t("login")}
        </Link>
      </p>
    </div>
  );
}
