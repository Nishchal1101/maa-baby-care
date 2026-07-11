import { SRC } from "./sources";

export const pregnancyRedFlags = {
  items: [
    "Vaginal bleeding (any amount) or heavy watery discharge",
    "Severe or persistent headache, blurred/double vision, seeing spots",
    "Sudden swelling of face, hands, or feet",
    "Convulsions, fainting, or loss of consciousness",
    "Severe abdominal pain that does not settle",
    "High fever (≥ 38°C / 100.4°F) with or without chills",
    "Reduced or absent baby movements after 28 weeks",
    "Persistent vomiting  -  unable to keep fluids down",
    "Burning urination, foul-smelling discharge, or pelvic pain",
    "Breathlessness at rest, chest pain, or fast heartbeat",
    "Fall, road accident, or blow to the abdomen",
  ],
  source: `${SRC.mohfwSM}; ${SRC.who}`,
};

export const postpartumRedFlags = {
  items: [
    "Heavy bleeding  -  soaking a pad in under 1 hour or passing large clots",
    "Foul-smelling vaginal discharge",
    "Fever ≥ 38°C, chills, or feeling very unwell",
    "Severe headache, blurred vision, or convulsions",
    "Severe pain or swelling in one leg (possible clot)",
    "Chest pain or breathlessness",
    "Painful, red, hot breast with fever (possible mastitis)",
    "Thoughts of harming yourself or your baby  -  reach out today",
  ],
  source: `${SRC.who}; ${SRC.nice}`,
};

export const newbornRedFlags = {
  items: [
    "Not feeding well or refuses to feed",
    "Very sleepy, difficult to wake, or unusually floppy",
    "Fast breathing (≥ 60/min), chest indrawing, or grunting",
    "Fever (≥ 37.5°C) or cold to touch (< 35.5°C)",
    "Yellow palms or soles, or yellowing worsening after day 3",
    "Convulsions or abnormal movements",
    "Bleeding, pus, or foul smell from umbilical stump",
    "Less than 6 wet nappies in 24 hours after day 5",
  ],
  source: `${SRC.iap} (IMNCI danger signs); ${SRC.who}`,
};
