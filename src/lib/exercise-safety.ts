import { SRC } from "./sources";

export const exerciseSafe = [
  "Brisk walking 20–30 min most days",
  "Prenatal yoga & stretching (see Yoga section)",
  "Pelvic floor (Kegel) exercises daily",
  "Stationary cycling, swimming (if trained)",
  "Light household work; avoid heavy lifting",
];

export const exerciseAvoid = [
  "Lying flat on the back for long after 16 weeks",
  "Contact sports, horse riding, skiing, scuba diving",
  "Hot yoga / very hot environments (risk of overheating)",
  "Any exercise causing pain, breathlessness at rest, or dizziness",
  "Heavy lifting or straining",
];

export const stopIfWarning = [
  "Vaginal bleeding or fluid leak",
  "Regular painful contractions",
  "Severe headache, chest pain, or breathlessness",
  "Dizziness, fainting, or calf pain/swelling",
  "Reduced baby movements after exercise",
];

export const exerciseSource = `${SRC.acog}; ${SRC.nice}; ${SRC.fogsi}`;
