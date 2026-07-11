// India's Universal Immunization Programme (UIP) schedule
// Source: Ministry of Health & Family Welfare, India

export type Vaccine = {
  code: string;
  name: { en: string; hi: string };
  ageDays: number; // days after birth when this dose is due
  protects: { en: string; hi: string };
  notes?: { en: string; hi: string };
};

export const UIP_SCHEDULE: Vaccine[] = [
  {
    code: "BCG",
    name: { en: "BCG", hi: "बीसीजी" },
    ageDays: 0,
    protects: { en: "Tuberculosis", hi: "तपेदिक (TB)" },
    notes: { en: "Given at birth  -  single dose, left upper arm.", hi: "जन्म पर  -  एक खुराक, बाएं कंधे पर।" },
  },
  {
    code: "OPV-0",
    name: { en: "OPV-0 (Birth dose)", hi: "ओपीवी-0 (जन्म खुराक)" },
    ageDays: 0,
    protects: { en: "Polio", hi: "पोलियो" },
  },
  {
    code: "HepB-Birth",
    name: { en: "Hepatitis B (Birth dose)", hi: "हेपेटाइटिस बी (जन्म खुराक)" },
    ageDays: 0,
    protects: { en: "Hepatitis B", hi: "हेपेटाइटिस बी" },
  },
  {
    code: "Penta-1",
    name: { en: "Pentavalent-1", hi: "पेंटावैलेंट-1" },
    ageDays: 42,
    protects: { en: "Diphtheria, Pertussis, Tetanus, HepB, Hib", hi: "डिप्थीरिया, काली खांसी, टिटनेस, HepB, Hib" },
  },
  { code: "OPV-1", name: { en: "OPV-1", hi: "ओपीवी-1" }, ageDays: 42, protects: { en: "Polio", hi: "पोलियो" } },
  { code: "Rota-1", name: { en: "Rotavirus-1", hi: "रोटावायरस-1" }, ageDays: 42, protects: { en: "Rotavirus diarrhoea", hi: "रोटा डायरिया" } },
  { code: "fIPV-1", name: { en: "fIPV-1", hi: "एफआईपीवी-1" }, ageDays: 42, protects: { en: "Polio (injectable)", hi: "पोलियो (इंजेक्शन)" } },
  { code: "PCV-1", name: { en: "PCV-1", hi: "पीसीवी-1" }, ageDays: 42, protects: { en: "Pneumococcal disease", hi: "निमोकोकल रोग" } },

  { code: "Penta-2", name: { en: "Pentavalent-2", hi: "पेंटावैलेंट-2" }, ageDays: 70, protects: { en: "DPT, HepB, Hib", hi: "DPT, HepB, Hib" } },
  { code: "OPV-2", name: { en: "OPV-2", hi: "ओपीवी-2" }, ageDays: 70, protects: { en: "Polio", hi: "पोलियो" } },
  { code: "Rota-2", name: { en: "Rotavirus-2", hi: "रोटावायरस-2" }, ageDays: 70, protects: { en: "Rotavirus", hi: "रोटावायरस" } },

  { code: "Penta-3", name: { en: "Pentavalent-3", hi: "पेंटावैलेंट-3" }, ageDays: 98, protects: { en: "DPT, HepB, Hib", hi: "DPT, HepB, Hib" } },
  { code: "OPV-3", name: { en: "OPV-3", hi: "ओपीवी-3" }, ageDays: 98, protects: { en: "Polio", hi: "पोलियो" } },
  { code: "Rota-3", name: { en: "Rotavirus-3", hi: "रोटावायरस-3" }, ageDays: 98, protects: { en: "Rotavirus", hi: "रोटावायरस" } },
  { code: "fIPV-2", name: { en: "fIPV-2", hi: "एफआईपीवी-2" }, ageDays: 98, protects: { en: "Polio (injectable)", hi: "पोलियो (इंजेक्शन)" } },
  { code: "PCV-2", name: { en: "PCV-2", hi: "पीसीवी-2" }, ageDays: 98, protects: { en: "Pneumococcal", hi: "निमोकोकल" } },

  { code: "MR-1", name: { en: "MR-1 (Measles & Rubella)", hi: "एमआर-1 (खसरा-रूबेला)" }, ageDays: 270, protects: { en: "Measles & Rubella", hi: "खसरा और रूबेला" } },
  { code: "JE-1", name: { en: "JE-1 (in endemic states)", hi: "जेई-1 (एंडेमिक राज्यों में)" }, ageDays: 270, protects: { en: "Japanese Encephalitis", hi: "जापानी एन्सेफलाइटिस" } },
  { code: "PCV-Booster", name: { en: "PCV Booster", hi: "पीसीवी बूस्टर" }, ageDays: 270, protects: { en: "Pneumococcal", hi: "निमोकोकल" } },
  { code: "Vit-A-1", name: { en: "Vitamin A (1st dose)", hi: "विटामिन ए (पहली खुराक)" }, ageDays: 270, protects: { en: "Vit A deficiency", hi: "विटामिन ए की कमी" } },

  { code: "DPT-Booster-1", name: { en: "DPT Booster-1", hi: "डीपीटी बूस्टर-1" }, ageDays: 480, protects: { en: "DPT", hi: "डीपीटी" } },
  { code: "MR-2", name: { en: "MR-2", hi: "एमआर-2" }, ageDays: 480, protects: { en: "Measles & Rubella", hi: "खसरा-रूबेला" } },
  { code: "OPV-Booster", name: { en: "OPV Booster", hi: "ओपीवी बूस्टर" }, ageDays: 480, protects: { en: "Polio", hi: "पोलियो" } },
  { code: "JE-2", name: { en: "JE-2", hi: "जेई-2" }, ageDays: 480, protects: { en: "Japanese Encephalitis", hi: "जापानी एन्सेफलाइटिस" } },
];

export function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

export function buildScheduleForBaby(dob: string) {
  const start = new Date(dob);
  return UIP_SCHEDULE.map((v) => ({
    ...v,
    scheduled_date: addDays(start, v.ageDays).toISOString().slice(0, 10),
  }));
}

export function ageInDays(dob: string) {
  const ms = Date.now() - new Date(dob).getTime();
  return Math.floor(ms / 86400000);
}

export function ageLabel(dob: string, lang: "en" | "hi" = "en") {
  const days = ageInDays(dob);
  if (days < 14) return lang === "hi" ? `${days} दिन` : `${days} days`;
  if (days < 60) return lang === "hi" ? `${Math.floor(days / 7)} सप्ताह` : `${Math.floor(days / 7)} weeks`;
  const months = Math.floor(days / 30.4);
  if (months < 24) return lang === "hi" ? `${months} माह` : `${months} months`;
  return lang === "hi" ? `${Math.floor(months / 12)} वर्ष` : `${Math.floor(months / 12)} years`;
}
