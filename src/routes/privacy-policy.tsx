import { createFileRoute } from "@tanstack/react-router";
import { BackButton } from "@/components/back-button";
export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
    return (
    <div className="mx-auto min-h-screen max-w-md px-5 py-8">
      <BackButton />
      <h1 className="font-display text-2xl">Privacy Policy</h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Last Updated: July 2026
      </p>

      <div className="mt-6 space-y-4">
        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Information We Collect</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Maatri may collect information you provide during account creation
            and onboarding, including your name, city, state, pregnancy details,
            due date, last menstrual period (LMP), and dietary preferences.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">How We Use Your Information</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your information is used to provide pregnancy tracking,
            personalized content, reminders, educational resources, and other
            features that support your pregnancy journey.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Data Storage & Security</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We take reasonable measures to protect your information. Data may be
            stored securely using trusted third-party services and cloud
            infrastructure.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Medical Information</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Maatri provides educational content only. Information within the app
            should not be considered medical advice, diagnosis, treatment, or a
            substitute for consultation with a qualified healthcare
            professional.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Data Sharing</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We do not sell your personal information. Information may be shared
            only when required by law or when necessary to operate and maintain
            app services.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Data Deletion</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You may request deletion of your account and associated personal
            information by contacting us through the support channels provided
            by Maatri.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Children's Privacy</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Maatri is intended for adults and is not directed toward children
            under 13 years of age.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Changes to This Policy</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We may update this Privacy Policy from time to time. Continued use
            of the app after updates indicates acceptance of the revised policy.
          </p>
        </section>

        <section className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="font-medium">Contact Us</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            If you have questions regarding this Privacy Policy, please contact
            the Maatri team.
          </p>
        </section>
      </div>
    </div>
  );
}