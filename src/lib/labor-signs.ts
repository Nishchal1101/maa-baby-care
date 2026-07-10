import { SRC } from "./sources";

export const trueLabor = [
  "Contractions become regular and get stronger",
  "Interval between contractions shortens (e.g., every 5 minutes)",
  "Pain does not ease with rest or position change",
  "Low-back pain that wraps to the front",
  "Show — pink/blood-tinged mucus from the vagina",
  "Water breaks — a sudden gush or steady trickle of fluid",
];

export const falseLabor = [
  "Irregular, mild tightening (Braxton-Hicks)",
  "Eases with rest, water, or a change of position",
  "No cervical change",
];

export const whenToGoHospital = [
  "Contractions every 5 minutes for over an hour (first baby)",
  "Water breaks — go even if you have no pain",
  "Any vaginal bleeding (more than a light show)",
  "Reduced or no baby movements",
  "Severe headache, blurred vision, or vomiting",
];

export const pretermSigns = {
  title: "Preterm labor signs before 37 weeks — go to hospital",
  items: [
    "Regular tightening or period-like cramps",
    "Constant low-back ache",
    "Pressure in the pelvis, as if the baby is pushing down",
    "Watery, mucous, or bloody discharge",
  ],
};

export const laborSource = `${SRC.fogsi}; ${SRC.mohfwSM}; ${SRC.who}`;
