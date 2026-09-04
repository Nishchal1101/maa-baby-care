import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { MobileShell } from "@/components/mobile-shell";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { deleteMyAccount, exportMyData } from "@/lib/account.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download, ShieldOff, Trash2, UserX, Mail, FileText } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account & data  -  Maatri" },
      {
        name: "description",
        content:
          "Manage your Maatri account: download a copy of your data, review blocked accounts, or permanently delete your account.",
      },
      { property: "og:title", content: "Account & data  -  Maatri" },
      {
        property: "og:description",
        content: "Download your data, manage blocked accounts, or delete your Maatri account permanently.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AccountPage,
});

type BlockedRow = { id: string; blocked_id: string; created_at: string };

function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const nav = useNavigate();
  const runExport = useServerFn(exportMyData);
  const runDelete = useServerFn(deleteMyAccount);

  const [blocked, setBlocked] = React.useState<BlockedRow[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");

  React.useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [loading, user, nav]);

  const loadBlocked = React.useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("blocked_users")
      .select("id, blocked_id, created_at")
      .eq("blocker_id", user.id)
      .order("created_at", { ascending: false });
    setBlocked((data as BlockedRow[]) ?? []);
  }, [user]);

  React.useEffect(() => {
    void loadBlocked();
  }, [loadBlocked]);

  const unblock = async (id: string) => {
    await supabase.from("blocked_users").delete().eq("id", id);
    toast.success("Account unblocked");
    void loadBlocked();
  };

  const download = async () => {
    setBusy(true);
    try {
      const data = await runExport({});
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "maatri-my-data.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Your data has been downloaded");
    } catch {
      toast.error("Could not prepare your data. Please try again.");
    }
    setBusy(false);
  };

  const removeAccount = async () => {
    if (confirmText.trim().toUpperCase() !== "DELETE") {
      toast.error("Type DELETE to confirm");
      return;
    }
    setBusy(true);
    try {
      await runDelete({});
      if (typeof window !== "undefined") window.localStorage.clear();
      await signOut();
      toast.success("Your account and all data have been deleted");
      nav({ to: "/" });
      if (typeof window !== "undefined") window.location.reload();
    } catch {
      setBusy(false);
      toast.error("Could not delete your account. Please contact support.");
    }
  };

  return (
    <MobileShell>
      <div className="overflow-x-hidden px-5 pb-10 pt-8">
        <h1 className="font-display text-2xl">Account & data</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You are in control of your information. Download it, limit who can reach you, or remove
          everything permanently.
        </p>

        <section className="mt-6 space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Your information</p>
          <div className="rounded-lg bg-card p-4 shadow-sm">
            <p className="text-sm font-medium">Signed in as</p>
            <p className="mt-1 break-all text-sm text-muted-foreground">
              {user?.email || user?.phone || " - "}
            </p>
          </div>
          <button
            type="button"
            onClick={download}
            disabled={busy}
            className="flex w-full items-center gap-3 rounded-lg bg-card p-4 text-left shadow-sm disabled:opacity-60"
          >
            <Download className="h-5 w-5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">Download my data</span>
              <span className="block text-xs text-muted-foreground">
                A copy of your profile, logs, appointments and posts as a file.
              </span>
            </span>
          </button>
          <Link to="/privacy-policy" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <FileText className="h-5 w-5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1 text-sm">How we use your data (Privacy Policy)</span>
          </Link>
          <Link to="/support" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Mail className="h-5 w-5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1 text-sm">Contact support</span>
          </Link>
        </section>

        <section className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Blocked accounts</p>
          {blocked.length === 0 ? (
            <div className="rounded-lg bg-card p-4 text-sm text-muted-foreground shadow-sm">
              You have not blocked anyone. You can block a member from any of their community posts.
            </div>
          ) : (
            <ul className="space-y-2">
              {blocked.map((b) => (
                <li key={b.id} className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
                  <UserX className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate text-sm">
                    Member {b.blocked_id.slice(0, 8)}
                  </span>
                  <Button size="sm" variant="outline" className="shrink-0 rounded-full" onClick={() => unblock(b.id)}>
                    Unblock
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <ShieldOff className="h-5 w-5 shrink-0" />
            <p className="font-medium">Delete my account</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            This permanently removes your account and every record linked to it - profile, pregnancy
            and baby logs, appointments, medicine reminders and community posts. It cannot be undone.
          </p>

          {!confirmOpen ? (
            <Button
              variant="destructive"
              className="mt-4 h-12 w-full rounded-lg"
              onClick={() => setConfirmOpen(true)}
            >
              <Trash2 className="h-4 w-4" /> Delete account
            </Button>
          ) : (
            <div className="mt-4 space-y-3">
              <Label htmlFor="confirm">Type DELETE to confirm</Label>
              <Input
                id="confirm"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="h-12 rounded-md"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="h-12 flex-1 rounded-lg"
                  onClick={() => { setConfirmOpen(false); setConfirmText(""); }}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  disabled={busy}
                  className="h-12 flex-1 rounded-lg"
                  onClick={removeAccount}
                >
                  {busy ? "Deleting..." : "Delete forever"}
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </MobileShell>
  );
}
