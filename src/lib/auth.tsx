import * as React from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Profile = {
  id: string;
  user_id: string;
  name: string | null;
  dob: string | null;
  lmp_date: string | null;
  due_date: string | null;
  language: string;
  diet: string;
  diet_region: string | null;
  city: string | null;
  state: string | null;
  high_risk_conditions: string[] | null;

  blood_group: string | null;
  previous_pregnancies_count: number | null;
previous_pregnancy_complications: string[] | null;
previous_pregnancy_end_date: string | null;
previous_td_history: string | null;
previously_pregnant: boolean | null;
medical_conditions: string[] | null;

  onboarded: boolean;
};

type AuthCtx = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const Ctx = React.createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>(null);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);

  const loadProfile = React.useCallback(async (uid: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", uid)
      .maybeSingle();

    if (data) {
      setProfile(data as Profile);
      return;
    }

    // No profile row yet (e.g. created before the trigger, or removed) - create one
    // so the user is never bounced around between screens.
    const { data: created } = await supabase
      .from("profiles")
      .insert({ user_id: uid })
      .select("*")
      .maybeSingle();
    setProfile((created as Profile | null) ?? null);
  }, []);

  React.useEffect(() => {
    // Listener first
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
      if (s?.user) {
        // defer to avoid recursion
        setTimeout(() => loadProfile(s.user.id), 0);
      } else {
        setProfile(null);
      }
    });

    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        setSession(data.session);
        if (data.session?.user) await loadProfile(data.session.user.id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);


  const value: AuthCtx = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    refreshProfile: async () => {
      if (session?.user) await loadProfile(session.user.id);
    },
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useAuth must be inside AuthProvider");
  return c;
}
