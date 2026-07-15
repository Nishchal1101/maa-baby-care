// Pregnancy week calculations and week-by-week content (India-flavored).

export function calcWeekFromLMP(lmpISO: string | null | undefined): number | null {
  if (!lmpISO) return null;
  const lmp = new Date(lmpISO);
  if (isNaN(lmp.getTime())) return null;
  const days = Math.floor((Date.now() - lmp.getTime()) / 86400000);
  const week = Math.floor(days / 7) + 1;
  if (week < 1) return 1;
  if (week > 42) return 42;
  return week;
}

export function calcDueFromLMP(lmpISO: string): string {
  const d = new Date(lmpISO);
  d.setDate(d.getDate() + 280);
  return d.toISOString().slice(0, 10);
}

export function calcWeekFromDue(dueISO: string | null | undefined): number | null {
  if (!dueISO) return null;
  const due = new Date(dueISO);
  if (isNaN(due.getTime())) return null;
  const lmp = new Date(due);
  lmp.setDate(lmp.getDate() - 280);
  return calcWeekFromLMP(lmp.toISOString());
}

export function trimester(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1;
  if (week <= 27) return 2;
  return 3;
}

export type WeekInfo = {
  week: number;
  size: string;       // Indian fruit/seed comparison
  babyDev: string;
  momChange: string;
  tip: string;
};

const data: Partial<Record<number, Omit<WeekInfo, "week">>> = {
  4: { size: "khus-khus seed (poppy)", babyDev: "The embryo has implanted; major organs begin forming.", momChange: "Missed period, mild cramps. Start folic acid 400mcg.", tip: "Begin folic acid daily  -  it protects baby's spine." },
  6: { size: "moong dal grain", babyDev: "Tiny heart starts beating around now.", momChange: "Morning sickness may begin.", tip: "Eat small frequent meals  -  try dry toast or roasted chana." },
  8: { size: "rajma bean", babyDev: "Fingers and toes are forming.", momChange: "Fatigue and nausea peak.", tip: "Eat small frequent meals and stay hydrated." },
  10: { size: "amla (gooseberry)", babyDev: "All organs in place; baby is now a fetus.", momChange: "Hormones may cause mood swings.", tip: "Book your first ANC visit if you haven't." },
  12: { size: "nimbu (lemon)", babyDev: "Reflexes develop; baby can curl fingers.", momChange: "Nausea often starts easing.", tip: "Time for the NT scan (11–13 weeks)." },
  16: { size: "avocado", babyDev: "Baby can hear muffled sounds.", momChange: "Tiny bump may show.", tip: "Add iron-rich foods: palak, beetroot, dates." },
  18: { size: "aam (mango)", babyDev: "Baby's muscles and nervous system are developing rapidly.", momChange: "You may feel first flutters.", tip: "Schedule your anomaly scan (18–22 weeks)." },
  20: { size: "Week 20 Approximate Length: 25 cm Approximate Weight: 300 g Comparable Size: Banana (Sizes are approximate and may vary.)", babyDev: "Halfway there! Baby is swallowing.", momChange: "Round ligament pain possible.", tip: "Stay well hydrated throughout the day." },
  24: { size: "bhutta (corn cob)", babyDev: "Lungs developing; viable with NICU support.", momChange: "Glucose tolerance test time.", tip: "Walk 20–30 min daily unless advised otherwise." },
  28: { size: "baingan (brinjal)", babyDev: "Eyes can open; brain growing fast.", momChange: "3rd trimester begins. Heartburn?", tip: "Start TT/Tdap booster as advised." },
  30: { size: "narangi (orange)", babyDev: "Baby practices breathing.", momChange: "Backache, swollen feet.", tip: "Sleep on left side; pillow between knees." },
  32: { size: "anaar (pomegranate)", babyDev: "Bones harden (except skull).", momChange: "Braxton-Hicks contractions possible.", tip: "Begin daily kick count  -  10 in 2 hours." },
  36: { size: "papita (small papaya)", babyDev: "Baby usually head-down now.", momChange: "Weekly checkups begin.", tip: "Pack hospital bag; keep documents ready." },
  38: { size: "kaddu (small pumpkin)", babyDev: "Fully developed; gaining fat.", momChange: "Pelvic pressure increases.", tip: "Watch for labor signs: regular contractions, water break." },
  40: { size: "nariyal (coconut)", babyDev: "Ready to meet you!", momChange: "Due week  -  stay calm, stay close to hospital.", tip: "Trust your body. Call doctor for any concern." },
};

export function weekInfo(week: number): WeekInfo {
  // pick nearest defined week
  const defined = Object.keys(data).map(Number).sort((a, b) => a - b);
  let pick = defined[0];
  for (const w of defined) if (w <= week) pick = w;
  return { week, ...(data[pick] as Omit<WeekInfo, "week">) };
}
