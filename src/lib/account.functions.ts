import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Tables that hold personal data for a mother. Used for both the
 * "download my data" export and the permanent account deletion flow,
 * which app stores require to be available inside the app.
 */
const USER_TABLES = [
  "profiles",
  "appointments",
  "symptom_logs",
  "kick_sessions",
  "medicine_reminders",
  "maternal_vaccinations",
  "baby_profiles",
  "baby_growth_logs",
  "feed_logs",
  "vaccinations",
  "postpartum_checkins",
  "community_posts",
  "community_replies",
  "blocked_users",
] as const;

export const exportMyData = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const out: Record<string, unknown> = {
      exported_at: new Date().toISOString(),
      account_id: context.userId,
    };

    for (const table of USER_TABLES) {
      const column = table === "blocked_users" ? "blocker_id" : "user_id";
      const { data } = await (context.supabase.from(table) as any)
        .select("*")
        .eq(column, context.userId);
      out[table] = data ?? [];
    }

    return out as Record<string, unknown[] | string>;
  });

export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const userId = context.userId;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Remove personal rows first so nothing is left behind.
    for (const table of USER_TABLES) {
      const column = table === "blocked_users" ? "blocker_id" : "user_id";
      await (supabaseAdmin.from(table) as any).delete().eq(column, userId);
    }
    await supabaseAdmin.from("blocked_users").delete().eq("blocked_id", userId);
    await supabaseAdmin.from("post_votes").delete().eq("user_id", userId);
    await supabaseAdmin.from("reports").delete().eq("reporter_id", userId);
    await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw new Error(error.message);

    return { deleted: true };
  });
