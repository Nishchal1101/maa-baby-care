// Indian ANC (Antenatal Care) schedule
export type AncVisit = { week: number; title: string; details: string };

export const ancSchedule: AncVisit[] = [
  { week: 8, title: "1st ANC visit & registration", details: "Confirm pregnancy, blood tests (Hb, blood group, HIV, HBsAg, VDRL, Thyroid Profile), urine, weight, BP. Start folic acid + iron." },
  { week: 12, title: "NT scan + dating ultrasound", details: "Done between 11–13+6 weeks. Check baby's nuchal translucency and dating." },
  { week: 16, title: "2nd ANC visit + Tetanus dose 1", details: "Weight, BP, fundal height, fetal heartbeat. First Tetanus (TT/Td) shot around the 4th month. Double/triple marker if opted." },
  { week: 20, title: "Anomaly scan (TIFFA) + Tetanus dose 2", details: "Detailed ultrasound between 18–22 weeks to check baby's organs. Second Tetanus (TT/Td) shot around the 5th month (4 weeks after the 1st dose)." },
  { week: 24, title: "Glucose tolerance test (GTT)", details: "Screen for gestational diabetes between 24–28 weeks." },
  { week: 28, title: "3rd trimester start + Tdap + Anti-D if Rh-negative", details: "Tdap booster (27–36 weeks). If mother is Rh-negative and father Rh-positive, give Anti-D (Rho(D)) injection around 28 weeks. Continue iron + calcium." },
  { week: 32, title: "Growth scan", details: "Check baby's growth, position, amniotic fluid." },
  { week: 36, title: "Pre-delivery scan + position check", details: "Confirm head-down position. Plan delivery hospital." },
  { week: 38, title: "Weekly checkups begin", details: "Cervical check, NST if advised." },
  { week: 40, title: "Due date — stay close to hospital", details: "Call doctor at first sign of labor: regular pains, water break, bleeding, reduced movements. Rh-negative mothers: Anti-D within 72 hours after delivery if baby is Rh-positive." },
];
