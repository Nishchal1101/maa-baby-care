// Indian ANC (Antenatal Care) schedule
export type AncVisit = { week: number; title: string; details: string };

export const ancSchedule: AncVisit[] = [
  {
  week: 8,
  title: "1st ANC visit & registration",
  details: "Confirm pregnancy, blood tests (Hb, blood group, HIV, HBsAg, VDRL, Thyroid Profile), urine, weight, BP. Review supplements recommended by your healthcare provider, including folic acid and iron if advised."
},
  { week: 12, title: "NT scan + dating ultrasound", details: "Done between 11–13+6 weeks. Check baby's nuchal translucency and dating." },
  {
  week: 16,
  title: "2nd ANC visit",
  details: "Weight, BP, fundal height, fetal heartbeat. Review vaccination recommendations with your healthcare provider. Double/triple marker testing may be discussed if advised."
},
  {
  week: 20,
  title: "Anomaly scan (TIFFA)",
  details: "Detailed ultrasound between 18–22 weeks to assess baby's development. Follow your healthcare provider's vaccination schedule."
},
  { week: 24, title: "Glucose tolerance test (GTT)", details: "Screen for gestational diabetes between 24–28 weeks." },
  { week: 28, title: "3rd trimester start + Tdap + Anti-D if Rh-negative", details: "Tdap booster (27–36 weeks). If advised by your healthcare provider, Rh-negative mothers may require Anti-D prophylaxis." },
  { week: 32, title: "Growth scan", details: "Check baby's growth, position, amniotic fluid." },
  { week: 36, title: "Pre-delivery scan + position check", details: "Confirm head-down position. Plan delivery hospital." },
  { week: 38, title: "Weekly checkups begin", details: "Cervical check, NST if advised." },
  { week: 40, title: "Due date  -  stay close to hospital", details: "Contact your healthcare provider if you notice labor symptoms, bleeding, leaking fluid, or reduced fetal movement. Rh-negative mothers may require post-delivery Anti-D prophylaxis if advised."},
];
