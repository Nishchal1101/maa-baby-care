import { createFileRoute } from "@tanstack/react-router";
import { BackButton } from "@/components/back-button";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-md px-5 py-8">
      <BackButton />

      <h1 className="mt-4 font-display text-2xl">
        Terms & Conditions
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Last Updated: July 2026
      </p>

      <div className="mt-6 space-y-4">
        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Acceptance of Terms</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            By using Maatri, you agree to these Terms & Conditions and our
            Privacy Policy.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Educational Purpose</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Maatri provides educational information related to pregnancy,
            postpartum recovery, newborn care, nutrition, and maternal health.
            It is not a substitute for professional medical advice.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">No Medical Advice</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Information within the app should not be used to diagnose, treat,
            monitor, or prevent medical conditions. Always consult qualified
            healthcare professionals for medical decisions.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">User Responsibilities</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Users are responsible for ensuring that information they provide is
            accurate and for making healthcare decisions based on professional
            medical guidance.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Community Content</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Community posts represent the views of individual users and should
            not be considered medical advice. Maatri is not responsible for
            user-generated content.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Limitation of Liability</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Maatri and its creators are not liable for any direct or indirect
            loss, injury, or damages arising from the use of information
            provided within the app.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Changes to Terms</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            These Terms & Conditions may be updated periodically. Continued use
            of the app constitutes acceptance of any revised terms.
          </p>
        </section>
      </div>
    </div>
  );
}