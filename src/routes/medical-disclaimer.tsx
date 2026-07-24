import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";

export const Route = createFileRoute("/medical-disclaimer")({
  component: MedicalDisclaimerPage,
});

function MedicalDisclaimerPage() {
  return (
    <MobileShell>
      <div className="px-5 pb-6 pt-8">
        <h1 className="font-display text-2xl">Medical Disclaimer</h1>

        <div className="mt-6 space-y-4">
          <section className="rounded-lg bg-card p-4 shadow-sm">
            <h2 className="font-medium">Educational Information Only</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Maa Baby Care provides educational information related to pregnancy,
              postpartum care, newborn care, nutrition, exercise, and maternal
              health. The content is intended to support awareness and is not a
              substitute for professional medical advice.
            </p>
          </section>

          <section className="rounded-lg bg-card p-4 shadow-sm">
            <h2 className="font-medium">Not Medical Advice</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This application does not diagnose, treat, cure, prevent, or monitor
              any medical condition. Information provided within the app should not
              be used as the sole basis for healthcare decisions.
            </p>
          </section>

          <section className="rounded-lg bg-card p-4 shadow-sm">
            <h2 className="font-medium">Consult Healthcare Professionals</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Always seek guidance from a qualified doctor, obstetrician,
              gynecologist, pediatrician, nurse, or other licensed healthcare
              professional regarding any medical concerns during pregnancy,
              childbirth, or postpartum recovery.
            </p>
          </section>

          <section className="rounded-lg bg-card p-4 shadow-sm">
            <h2 className="font-medium">Emergency Situations</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Do not rely on this app during medical emergencies. If you experience
              severe symptoms, heavy bleeding, reduced fetal movements, breathing
              difficulties, loss of consciousness, or any other emergency warning
              signs, call 108 or seek immediate medical care at the nearest
              hospital.
            </p>
          </section>

          <section className="rounded-lg bg-card p-4 shadow-sm">
            <h2 className="font-medium">User Responsibility</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              By using Maa Baby Care, you acknowledge that healthcare decisions are
              your responsibility and that the app is intended only as an
              informational companion.
            </p>
          </section>
        </div>
      </div>
    </MobileShell>
  );
}