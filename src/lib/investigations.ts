import { SRC } from "./sources";

export type InvestigationBlock = {
  trimester: 1 | 2 | 3;
  window: string;
  visits: string;
  tests: string[];
};

export const investigations: InvestigationBlock[] = [
  {
    trimester: 1,
    window: "Booking visit → 13 weeks",
    visits: "1st ANC visit; register at PHC / CHC / hospital",
    tests: [
      "History, weight, height, BP, general and obstetric exam",
      "Haemoglobin (Hb), blood group + Rh typing",
      "HIV, HBsAg, VDRL/RPR (syphilis)",
      "Urine routine (protein & sugar)",
      "Blood sugar — fasting or random; OGTT if high-risk",
      "Thyroid profile (TSH ± T3/T4)",
      "Dating ultrasound; NT scan at 11–13+6 weeks",
      "Start folic acid 400–500 µg daily (from pre-conception if possible)",
    ],
  },
  {
    trimester: 2,
    window: "14 → 27 weeks",
    visits: "2nd ANC visit ~ 14–26 weeks; 3rd ANC visit ~ 28 weeks",
    tests: [
      "Weight, BP, fundal height, fetal heart sound at every visit",
      "Urine for protein & sugar at every visit",
      "Repeat Hb around 26–28 weeks",
      "OGTT (75 g, 2-hour) between 24–28 weeks — screens for GDM",
      "Anomaly scan (TIFFA) at 18–22 weeks",
      "Td/Tdap vaccination — 2 doses 4 weeks apart (booster if prior)",
      "Iron + folic acid and calcium supplements as prescribed",
    ],
  },
  {
    trimester: 3,
    window: "28 weeks → delivery",
    visits: "4th ANC visit ~ 36 weeks; then every 2 weeks till 36 wk, weekly after",
    tests: [
      "Weight, BP, fundal height, fetal lie & presentation, FHS",
      "Urine protein at every visit (pre-eclampsia screening)",
      "Repeat Hb in the 3rd trimester",
      "Growth ultrasound around 32 weeks; presentation scan ~ 36 weeks",
      "Anti-D injection at 28 weeks if mother is Rh-negative",
      "Kick count daily from 28 weeks (count-to-10)",
      "Birth preparedness: hospital, transport, blood donor, JSY/PMMVY papers",
    ],
  },
];

export const investigationsSource = `${SRC.mohfwANC}; ${SRC.fogsi}; ${SRC.who}`;
