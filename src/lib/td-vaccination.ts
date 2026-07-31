export type TdHistoryAnswer = "yes" | "no" | "not_sure";

export type TdPathway =
  | "two_dose"
  | "booster"
  | "history_check";

type GetTdPathwayParams = {
  previouslyPregnant: boolean;
  receivedTwoTdDosesPreviously?: TdHistoryAnswer;
  previousPregnancyDate?: string | null;
  referenceDate?: string;
};

export function getTdPathway({
  previouslyPregnant,
  receivedTwoTdDosesPreviously,
  previousPregnancyDate,
  referenceDate,
}: GetTdPathwayParams): TdPathway {
  // No previous pregnancy means there is no previous-pregnancy
  // vaccination history to qualify for this booster pathway.
  if (!previouslyPregnant) {
    return "two_dose";
  }

  // If vaccination history is unknown, don't guess.
  if (
    !receivedTwoTdDosesPreviously ||
    receivedTwoTdDosesPreviously === "not_sure"
  ) {
    return "history_check";
  }

  // Previous pregnancy without 2 Td doses follows the standard pathway.
  if (receivedTwoTdDosesPreviously === "no") {
    return "two_dose";
  }

  // User remembers receiving 2 doses but we don't know when
  // the previous pregnancy occurred.
  if (!previousPregnancyDate) {
    return "history_check";
  }

  const previousDate = new Date(previousPregnancyDate);
  const today = referenceDate ? new Date(referenceDate) : new Date();

  if (
    Number.isNaN(previousDate.getTime()) ||
    Number.isNaN(today.getTime())
  ) {
    return "history_check";
  }

  const threeYearsAgo = new Date(today);
  threeYearsAgo.setFullYear(today.getFullYear() - 3);

  if (previousDate >= threeYearsAgo && previousDate <= today) {
    return "booster";
  }

  return "two_dose";
}