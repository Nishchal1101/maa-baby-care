import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/lib/auth";
import { calcWeekFromLMP, calcWeekFromDue } from "@/lib/pregnancy";

export const Route = createFileRoute("/tracker")({
  component: TrackerRedirect,
});

function TrackerRedirect() {
  const { profile } = useAuth();
  const nav = useNavigate();
  React.useEffect(() => {
    const w = calcWeekFromLMP(profile?.lmp_date) ?? calcWeekFromDue(profile?.due_date) ?? 1;
    nav({ to: "/week/$week", params: { week: String(w) }, replace: true });
  }, [profile, nav]);
  return null;
}
