import { SRC } from "./sources";

export type SymptomGuide = {
  name: string;
  normal: string;
  selfCare: string[];
  seeDoctor: string[];
  emergency: string[];
};

export const symptomGuides: SymptomGuide[] = [
  {
    name: "Nausea & vomiting",
    normal: "Very common in the 1st trimester, usually eases by 12–16 weeks.",
    selfCare: [
  "Eat small frequent meals; keep a dry biscuit before getting up",
  "Take small sips of fluids throughout the day to stay hydrated",
  "Avoid strong smells and oily food",
],
    seeDoctor: [
      "Vomiting everything, unable to keep fluids down for 24 hours",
      "Weight loss, very little urine, or dark urine",
      "Blood in vomit",
    ],
    emergency: []
  },
  {
    name: "Heartburn / acidity",
    normal: "Common in 2nd–3rd trimester as the uterus presses on the stomach.",
    selfCare: [
      "Small meals; do not lie down for 1–2 hours after eating",
      "Raise the head end of the bed",
      "Avoid spicy, fried, and very hot food",
    ],
    seeDoctor: [
      "Severe upper-abdomen pain, especially on the right side",
      "Heartburn with severe headache or vision changes (rule out preeclampsia)",
    ],
    emergency: []
  },
  {
    name: "Constipation",
    normal: "Hormones + iron tablets slow the gut. Very common.",
    selfCare: [
  "Drink adequate water and include fibre-rich foods such as fruits, vegetables, whole grains and dals",
  "Walk 20–30 min a day",
  "Do not use unprescribed laxatives",
],
    seeDoctor: [
      "Blood in stool, severe pain, or no motion for many days",
    ],
    emergency: []
  },
  {
    name: "Leg cramps & swelling",
    normal: "Mild ankle swelling by evening is common in the 3rd trimester.",
    selfCare: [
      "Elevate legs when resting; avoid long standing",
      "Calf stretches; wear loose footwear",
      "Left-side sleeping",
    ],
    seeDoctor: [
      "Sudden swelling of face, hands, or one leg",
      "Painful, hot, red swelling in one calf (possible clot)",
    ],
    emergency: []
  },
  {
    name: "Vaginal discharge",
    normal: "A thin, milky, mild-smelling discharge increases in pregnancy.",
    selfCare: [
      "Wear cotton underwear; keep the area dry",
      "Do not douche or use scented washes",
    ],
    seeDoctor: [
      "Itching, burning, foul smell, greenish or curdy discharge",
      "Any bleeding or a sudden gush of watery fluid",
    ],
    emergency: []
  },
  {
    name: "Backache & pelvic pain",
    normal: "Weight and posture changes strain the lower back.",
    selfCare: [
  "Gentle pregnancy-safe exercises approved by your healthcare provider, pelvic tilts, warm (not hot) compress",
  "Supportive footwear; avoid heavy lifting",
],
    seeDoctor: [
      "Rhythmic pain that comes and goes before 37 weeks (possible preterm labor)",
      "Pain with fever, burning urine, or bleeding",
    ],
    emergency: []
  },
  {
    name: "Breathlessness",
    normal: "Mild breathlessness on stairs is common as the uterus grows.",
    selfCare: [
      "Rest; slow down; sleep propped up",
    ],
    seeDoctor: [
      "Breathlessness at rest, chest pain, blue lips, or fainting",
    ],
    emergency: []
  },
  {
    name: "Itching",
    normal: "Skin over the belly stretches and can itch.",
    selfCare: [
      "Moisturise; cool baths; loose cotton clothes",
    ],
    seeDoctor: [
      "Severe itching on palms and soles, especially in the 3rd trimester (rule out obstetric cholestasis)",
    ],
    emergency: []
  },
];

export const symptomsSource = `${SRC.nice}; ${SRC.fogsi}; ${SRC.mohfwSM}`;
