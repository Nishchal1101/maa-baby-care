import { SRC } from "./sources";

export const exerciseSafe = [
  "Walking is commonly recommended during pregnancy; discuss suitable activity levels with your healthcare provider",
  "Prenatal yoga & stretching (see Yoga section)",
  "Pelvic floor (Kegel) exercises may help strengthen pelvic muscles",
  "Stationary cycling, swimming (if trained)",
  "Light daily activities may be continued if comfortable; avoid heavy lifting",
];

export const exerciseAvoid = [
  "Lying flat on the back for long after 16 weeks",
  "Contact sports, horse riding, skiing, scuba diving",
  "Hot yoga / very hot environments (risk of overheating)",
  "Any activity that causes pain, dizziness, chest pain, or unusual breathlessness",
  "Heavy lifting or straining",
];

export const stopIfWarning = [
  "Vaginal bleeding or fluid leak",
  "Regular painful contractions",
  "Severe headache, chest pain, or breathlessness",
  "Dizziness, fainting, or calf pain/swelling",
  "Reduced baby movements or concerns about your baby's usual movement pattern",
  "Vaginal bleeding during or after activity",
];

export const exerciseSource = `${SRC.acog}; ${SRC.nice}; ${SRC.fogsi}`;
