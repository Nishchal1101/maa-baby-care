import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Cake,
  Droplet,
  CalendarHeart,
  MapPin,
  Phone,
  Mail,
  Salad,
  HeartPulse,
  Baby,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { calcWeekFromLMP, calcWeekFromDue, trimester } from "@/lib/pregnancy";
import { resolveDietRegion, regionLabels } from "@/lib/diet-region";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile - Maa Baby Care" },
      {
        name: "description",
        content:
          "View your personal, pregnancy and health details saved in Maa Baby Care.",
      },
      { property: "og:title", content: "My Profile - Maa Baby Care" },
      {
        property: "og:description",
        content:
          "View your personal, pregnancy and health details saved in Maa Baby Care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function fmtDate(d?: string | null) {
  if (!d) return null;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return null;
  return dt.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ageFrom(dob?: string | null) {
  if (!dob) return null;
  const b = new Date(dob);
  if (Number.isNaN(b.getTime())) return null;
  const now = new Date();
  let a = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a--;
  return a >= 0 && a < 120 ? a : null;
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-border/50 px-4 py-3 last:border-0">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="break-words text-sm font-medium">
          {value ?? <span className="text-muted-foreground">Not added</span>}
        </p>
      </div>
    </div>
  );
}

function ProfilePage() {
  const { profile, user, refreshProfile } = useAuth();
  const [editDob, setEditDob] = React.useState(false);
  const [dobValue, setDobValue] = React.useState(profile?.dob ?? "");
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    setDobValue(profile?.dob ?? "");
  }, [profile?.dob]);

  const saveDob = async () => {
    if (!user) return;
    setSaving(true);
    await supabase
      .from("profiles")
      .update({ dob: dobValue || null })
      .eq("user_id", user.id);
    await refreshProfile();
    setSaving(false);
    setEditDob(false);
  };

  const week =
    calcWeekFromLMP(profile?.lmp_date) ?? calcWeekFromDue(profile?.due_date);
  const age = ageFrom(profile?.dob);
  const location =
    [profile?.city, profile?.state].filter(Boolean).join(", ") || null;
  const dietLabel =
    profile?.diet === "nonveg"
      ? "Non-vegetarian"
      : profile?.diet === "egg"
        ? "Eggetarian"
        : "Vegetarian";
  const region = regionLabels[resolveDietRegion(profile?.diet_region, profile?.state)];
  const conditions = [
    ...(profile?.medical_conditions ?? []),
    ...(profile?.high_risk_conditions ?? []),
  ].filter(Boolean);

  return (
    <MobileShell>
      <div className="px-5 pb-8 pt-4">
        <div className="rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 p-5 text-center shadow-sm">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
            <User className="h-7 w-7" />
          </span>
          <h1 className="mt-3 font-display text-xl break-words">
            {profile?.name || "Your profile"}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {week ? `Week ${week} - Trimester ${trimester(week)}` : "Pregnancy details not added"}
          </p>
        </div>

        <p className="mt-6 mb-2 text-xs uppercase tracking-wider text-muted-foreground">
          Personal
        </p>
        <div className="rounded-lg bg-card shadow-sm">
          <Row icon={<User className="h-4 w-4" />} label="Name" value={profile?.name || null} />
          <Row
            icon={<Cake className="h-4 w-4" />}
            label="Age"
            value={age !== null ? `${age} years` : null}
          />
          <div className="flex items-start gap-3 border-b border-border/50 px-4 py-3">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <CalendarHeart className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Date of birth
              </p>
              {editDob ? (
                <div className="mt-1 flex items-center gap-2">
                  <Input
                    type="date"
                    value={dobValue}
                    onChange={(e) => setDobValue(e.target.value)}
                    className="h-9 rounded-lg text-sm"
                  />
                  <Button
                    size="icon"
                    className="h-9 w-9 shrink-0 rounded-lg"
                    disabled={saving}
                    onClick={saveDob}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 shrink-0 rounded-lg"
                    onClick={() => {
                      setDobValue(profile?.dob ?? "");
                      setEditDob(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setEditDob(true)}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  {fmtDate(profile?.dob) ?? (
                    <span className="text-muted-foreground">Add date of birth</span>
                  )}
                  <Pencil className="h-3 w-3 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
          <Row
            icon={<Droplet className="h-4 w-4" />}
            label="Blood group"
            value={profile?.blood_group || null}
          />
          <Row icon={<MapPin className="h-4 w-4" />} label="Location" value={location} />
        </div>

        <p className="mt-6 mb-2 text-xs uppercase tracking-wider text-muted-foreground">
          Contact
        </p>
        <div className="rounded-lg bg-card shadow-sm">
          <Row
            icon={<Phone className="h-4 w-4" />}
            label="Phone number"
            value={user?.phone ? `+${user.phone.replace(/^\+/, "")}` : null}
          />
          <Row icon={<Mail className="h-4 w-4" />} label="Mail ID" value={user?.email || null} />
        </div>

        <p className="mt-6 mb-2 text-xs uppercase tracking-wider text-muted-foreground">
          Pregnancy
        </p>
        <div className="rounded-lg bg-card shadow-sm">
          <Row
            icon={<CalendarHeart className="h-4 w-4" />}
            label="LMP (last period date)"
            value={fmtDate(profile?.lmp_date)}
          />
          <Row
            icon={<Baby className="h-4 w-4" />}
            label="Expected due date"
            value={fmtDate(profile?.due_date)}
          />
          <Row
            icon={<HeartPulse className="h-4 w-4" />}
            label="Previous pregnancies"
            value={
              profile?.previously_pregnant
                ? `${profile?.previous_pregnancies_count ?? 1}`
                : profile?.previously_pregnant === false
                  ? "First pregnancy"
                  : null
            }
          />
          <Row
            icon={<HeartPulse className="h-4 w-4" />}
            label="Health conditions"
            value={conditions.length ? conditions.join(", ") : "None reported"}
          />
        </div>

        <p className="mt-6 mb-2 text-xs uppercase tracking-wider text-muted-foreground">
          Food preference
        </p>
        <div className="rounded-lg bg-card shadow-sm">
          <Row icon={<Salad className="h-4 w-4" />} label="Diet" value={dietLabel} />
          <Row icon={<MapPin className="h-4 w-4" />} label="Cuisine region" value={region} />
        </div>

        <Link
          to="/onboarding"
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm"
        >
          <Pencil className="h-4 w-4" /> Edit my details
        </Link>
      </div>
    </MobileShell>
  );
}
