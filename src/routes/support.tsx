import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { Mail, LifeBuoy, ShieldCheck, AlertTriangle, FileText, Users } from "lucide-react";

export const SUPPORT_EMAIL = "support@maatri.app";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Help & support  -  Maatri" },
      {
        name: "description",
        content:
          "Get help with Maatri: contact support, report content or a safety concern, and read our policies. We reply within 24 hours.",
      },
      { property: "og:title", content: "Help & support  -  Maatri" },
      {
        property: "og:description",
        content: "Contact the Maatri team, report a concern, and find our privacy, terms and safety policies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <MobileShell>
      <div className="overflow-x-hidden px-5 pb-10 pt-8">
        <h1 className="font-display text-2xl">Help & support</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We are a small team and we read every message. We reply to all support and safety reports
          within 24 hours.
        </p>

        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="mt-6 flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium">Email support</span>
            <span className="block break-all text-xs text-muted-foreground">{SUPPORT_EMAIL}</span>
          </span>
        </a>

        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=Safety%20report%20-%20Maatri`}
          className="mt-2 flex items-center gap-3 rounded-lg border border-destructive/25 bg-destructive/5 p-4 shadow-sm"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-destructive/15 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium text-destructive">Report a safety concern</span>
            <span className="block text-xs text-muted-foreground">
              Objectionable content, harassment or unsafe medical advice.
            </span>
          </span>
        </a>

        <section className="mt-8">
          <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Policies</p>
          <div className="space-y-2">
            <Link to="/community-guidelines" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
              <Users className="h-5 w-5 shrink-0 text-primary" />
              <span className="min-w-0 flex-1 text-sm">Community guidelines</span>
            </Link>
            <Link to="/privacy-policy" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              <span className="min-w-0 flex-1 text-sm">Privacy policy</span>
            </Link>
            <Link to="/terms" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <span className="min-w-0 flex-1 text-sm">Terms of use (EULA)</span>
            </Link>
            <Link to="/medical-disclaimer" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
              <LifeBuoy className="h-5 w-5 shrink-0 text-primary" />
              <span className="min-w-0 flex-1 text-sm">Medical disclaimer</span>
            </Link>
            <Link to="/account" className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              <span className="min-w-0 flex-1 text-sm">Account & data (download or delete)</span>
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-lg bg-card p-4 shadow-sm">
          <p className="text-sm font-medium">In an emergency</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Maatri is not an emergency service. For urgent help call 108 (ambulance) or 102
            (pregnancy transport), or go to your nearest hospital.
          </p>
          <Link to="/emergency" className="mt-3 inline-block text-sm font-medium text-primary">
            See emergency signs
          </Link>
        </section>
      </div>
    </MobileShell>
  );
}
