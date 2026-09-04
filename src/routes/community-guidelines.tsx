import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { SUPPORT_EMAIL } from "@/routes/support";
import { Flag, UserX, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/community-guidelines")({
  head: () => ({
    meta: [
      { title: "Community guidelines  -  Maatri" },
      {
        name: "description",
        content:
          "Maatri community rules: no objectionable content, no unsafe medical advice, no harassment. How to report or block a member, and how quickly we act.",
      },
      { property: "og:title", content: "Community guidelines  -  Maatri" },
      {
        property: "og:description",
        content: "Our zero-tolerance rules for the Maatri community, and how to report or block members.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GuidelinesPage,
});

const RULES = [
  "Be kind. No harassment, bullying, hate speech, threats or shaming another mother.",
  "No objectionable content: sexual content, violence, self-harm encouragement, or abusive language.",
  "No unsafe medical advice. Never tell someone to stop, start or change a prescribed medicine.",
  "No spam, selling, fundraising links, MLM offers or promotion of unapproved remedies.",
  "Do not share anyone's personal details - phone numbers, addresses, reports or photos of others.",
  "No impersonation of doctors, nurses, ASHA workers or government officials.",
];

function GuidelinesPage() {
  return (
    <MobileShell>
      <div className="overflow-x-hidden px-5 pb-10 pt-8">
        <h1 className="font-display text-2xl">Community guidelines</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The Maatri community is a safe, supportive space for mothers. By posting or replying you
          agree to these rules and to our{" "}
          <Link to="/terms" className="font-medium text-primary">
            Terms of use
          </Link>
          .
        </p>

        <div className="mt-6 rounded-lg border border-primary/25 bg-primary/5 p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm font-medium">Zero tolerance for objectionable content</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Content that breaks these rules is removed and the account may be suspended without
            notice.
          </p>
        </div>

        <ul className="mt-5 space-y-2">
          {RULES.map((r) => (
            <li key={r} className="rounded-lg bg-card p-4 text-sm shadow-sm">
              {r}
            </li>
          ))}
        </ul>

        <section className="mt-8 space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Your safety tools</p>
          <div className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Flag className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="min-w-0 text-sm">
              <span className="font-medium">Report</span> - tap the flag on any post or reply to send
              it to our moderators.
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-sm">
            <UserX className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="min-w-0 text-sm">
              <span className="font-medium">Block</span> - hide a member completely. You will not see
              their posts or replies again. Manage your list in{" "}
              <Link to="/account" className="font-medium text-primary">
                Account & data
              </Link>
              .
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-sm">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="min-w-0 text-sm">
              <span className="font-medium">Our promise</span> - every report is reviewed and acted on
              within 24 hours, and offending content and accounts are removed.
            </p>
          </div>
        </section>

        <p className="mt-8 text-sm text-muted-foreground">
          Need to reach a human? Write to{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="break-all font-medium text-primary">
            {SUPPORT_EMAIL}
          </a>{" "}
          or visit{" "}
          <Link to="/support" className="font-medium text-primary">
            Help & support
          </Link>
          .
        </p>
      </div>
    </MobileShell>
  );
}
