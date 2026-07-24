import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/consent")({
  component: ConsentPage,
});

function ConsentPage() {
  const nav = useNavigate();

  const accept = () => {
    localStorage.setItem("medical_consent", "accepted");
    nav({ to: "/home" });
  };

  return (
  <div className="mx-auto min-h-screen max-w-md px-5 pt-16 pb-8">
    <h1 className="font-display text-2xl">
      Before you continue
    </h1>

        <div className="mt-6 rounded-lg bg-card p-4 shadow-sm">
          <p className="text-sm leading-relaxed">
            Maatri provides educational information about pregnancy,
            childbirth, postpartum recovery and newborn care.
          </p>

          <p className="mt-4 text-sm leading-relaxed">
            The app does not diagnose, treat, monitor, or replace
            professional medical advice.
          </p>

          <p className="mt-4 text-sm leading-relaxed">
            In emergencies, call 108 or seek immediate medical care.
          </p>

          <p className="mt-4 text-sm leading-relaxed">
            By continuing, you acknowledge that you have read and
            understood the Medical Disclaimer.
          </p>
        </div>

        <Link
          to="/medical-disclaimer"
          className="mt-4 block text-center text-primary underline"
        >
          Read Full Medical Disclaimer
        </Link>
<Link
  to="/privacy-policy"
  className="mt-2 block text-center text-primary underline"
>
  Read Privacy Policy
</Link>
<Link
  to="/terms"
  className="mt-2 block text-center text-primary underline"
>
  Read Terms & Conditions
</Link>
        <Button
          onClick={accept}
          className="mt-6 h-12 w-full rounded-lg"
        >
          I Understand & Continue
        </Button>
      </div>
  );
}