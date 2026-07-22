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
  {
  name: "Headache",
  normal: "Mild headaches can occur during pregnancy due to hormonal changes, stress, fatigue, dehydration, or hunger.",

  selfCare: [
    "Drink adequate water throughout the day",
    "Rest in a quiet, well-ventilated room",
    "Eat regular meals and avoid skipping meals"
  ],

  seeDoctor: [
    "Frequent headaches that keep returning",
    "Headaches not improving with rest",
    "Headaches affecting daily activities"
  ],

  emergency: [
    "Severe sudden headache",
    "Headache with blurred vision or flashing lights",
    "Headache with swelling of face or hands",
    "Headache with high blood pressure"
  ]
},
{
  name: "Fever",
  normal: "A mild fever may occur with common infections and should be monitored carefully during pregnancy.",

  selfCare: [
    "Rest adequately",
    "Drink plenty of fluids",
    "Wear light clothing"
  ],

  seeDoctor: [
    "Fever lasting more than 24 hours",
    "Persistent cough or sore throat",
    "Burning while passing urine"
  ],

  emergency: [
    "High fever or rapidly worsening fever",
    "Difficulty breathing",
    "Confusion or extreme weakness",
    "Reduced fetal movement with fever"
  ]
},
{
  name: "Vaginal Bleeding",
  normal: "Any bleeding during pregnancy should be discussed with a healthcare provider.",

  selfCare: [],

  seeDoctor: [
    "Light spotting",
    "Small amount of bleeding without pain"
  ],

  emergency: [
    "Heavy bleeding",
    "Bleeding with abdominal pain",
    "Bleeding with dizziness or fainting",
    "Passing clots or tissue"
  ]
},
{
  name: "Reduced Fetal Movement",
  normal: "After fetal movements become established, mothers usually notice a regular pattern of movement.",

  selfCare: [
    "Lie on your left side",
    "Pay attention to your baby's usual movement pattern",
    "Drink water and rest"
  ],

  seeDoctor: [
    "Movement feels less than usual"
  ],

  emergency: [
    "No fetal movement after monitoring",
    "Sudden significant decrease in movements",
    "Reduced movement with bleeding or abdominal pain"
  ]
},
{
  name: "Severe Abdominal Pain",
  normal: "Mild stretching discomfort can occur as the uterus grows, but severe pain is not considered normal.",

  selfCare: [],

  seeDoctor: [
    "Persistent abdominal pain",
    "Pain associated with constipation or urinary symptoms"
  ],

  emergency: [
    "Severe abdominal pain",
    "Pain with vaginal bleeding",
    "Pain with fever",
    "Pain with fainting or dizziness"
  ]
}

];

export const symptomsSource = `${SRC.nice}; ${SRC.fogsi}; ${SRC.mohfwSM}`;
