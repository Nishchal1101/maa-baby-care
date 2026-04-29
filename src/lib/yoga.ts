export type Trimester = 1 | 2 | 3;

export type YogaPose = {
  id: string;
  name: string;
  nameHi?: string;
  trimester: Trimester[];
  duration: string;
  benefits: string;
  steps: string[];
};

export const yogaPoses: YogaPose[] = [
  {
    id: "sukhasana",
    name: "Sukhasana (Easy Pose)",
    nameHi: "सुखासन",
    trimester: [1, 2, 3],
    duration: "5–10 min",
    benefits: "Calms the mind, opens hips, improves posture.",
    steps: [
      "Sit cross-legged on a folded blanket so hips are above knees.",
      "Lengthen the spine, relax shoulders away from ears.",
      "Rest hands on knees, palms up.",
      "Breathe deeply through the nose for 5–10 minutes.",
    ],
  },
  {
    id: "marjari",
    name: "Marjariasana (Cat–Cow)",
    nameHi: "मार्जरी आसन",
    trimester: [1, 2, 3],
    duration: "1–2 min",
    benefits: "Eases back pain, gently mobilises spine, helps baby into ideal position.",
    steps: [
      "Come on hands and knees, wrists under shoulders, knees under hips.",
      "Inhale, drop belly, lift chest and tailbone (Cow).",
      "Exhale, round the back, tuck chin (Cat).",
      "Move slowly with breath for 6–8 rounds. Avoid deep belly drop after week 30.",
    ],
  },
  {
    id: "baddha-konasana",
    name: "Baddha Konasana (Butterfly)",
    nameHi: "बद्ध कोणासन",
    trimester: [1, 2, 3],
    duration: "3–5 min",
    benefits: "Opens pelvis, prepares hips for labour, eases inner-thigh tension.",
    steps: [
      "Sit tall, soles of feet together, knees falling open.",
      "Hold ankles, keep spine long.",
      "Gently flap knees up and down like butterfly wings.",
      "Hold still for a few breaths at the end.",
    ],
  },
  {
    id: "viparita-karani",
    name: "Viparita Karani (Legs-up-the-Wall)",
    nameHi: "विपरीत करणी",
    trimester: [1, 2],
    duration: "5–10 min",
    benefits: "Reduces leg swelling and fatigue, calms nervous system.",
    steps: [
      "Sit sideways next to a wall.",
      "Swing legs up the wall and lie back on a folded blanket.",
      "Place a small bolster under hips for support.",
      "Rest with eyes closed and breathe softly. Skip in 3rd trimester — use side-lying instead.",
    ],
  },
  {
    id: "konasana",
    name: "Konasana (Side Stretch)",
    nameHi: "कोणासन",
    trimester: [1, 2],
    duration: "1–2 min",
    benefits: "Stretches sides of body, eases mild constipation, opens ribs for breathing.",
    steps: [
      "Stand with feet a little wider than hips.",
      "Inhale, raise the right arm overhead.",
      "Exhale, bend gently to the left. Keep belly soft.",
      "Hold 3 breaths, switch sides.",
    ],
  },
  {
    id: "tadasana",
    name: "Tadasana (Mountain Pose)",
    nameHi: "ताड़ासन",
    trimester: [1, 2, 3],
    duration: "1–3 min",
    benefits: "Improves posture, balance and grounding.",
    steps: [
      "Stand with feet hip-width apart.",
      "Distribute weight evenly through both feet.",
      "Lengthen the crown of the head upward, arms by sides.",
      "Breathe steadily for 1–3 minutes.",
    ],
  },
  {
    id: "shavasana-side",
    name: "Side-lying Shavasana",
    nameHi: "पार्श्व शवासन",
    trimester: [2, 3],
    duration: "5–15 min",
    benefits: "Deep rest, especially in 2nd & 3rd trimester. Avoid lying flat on back after week 20.",
    steps: [
      "Lie on the LEFT side.",
      "Place a pillow between the knees and one under the head.",
      "Rest top hand on belly, lower hand under cheek.",
      "Soften the body and breathe naturally.",
    ],
  },
];

export const breathing = [
  {
    id: "anulom",
    name: "Anulom Vilom (Alternate Nostril)",
    nameHi: "अनुलोम विलोम",
    rounds: "5–10 rounds",
    benefits: "Balances mind, lowers anxiety, improves sleep.",
    steps: [
      "Sit comfortably with spine tall.",
      "Close right nostril with thumb, inhale through left.",
      "Close left nostril, exhale through right.",
      "Inhale right, exhale left — that's 1 round.",
    ],
  },
  {
    id: "bhramari",
    name: "Bhramari (Bee Breath)",
    nameHi: "भ्रामरी",
    rounds: "5–7 rounds",
    benefits: "Calms the mind, helpful in early labour.",
    steps: [
      "Inhale deeply through the nose.",
      "Exhale making a soft humming 'mmm' sound.",
      "Feel the vibration in the head and chest.",
    ],
  },
  {
    id: "deep",
    name: "Deep Belly Breathing",
    nameHi: "गहरी श्वास",
    rounds: "10 breaths",
    benefits: "Increases oxygen to baby, reduces stress.",
    steps: [
      "Sit or lie on left side.",
      "Inhale 4 counts into the belly.",
      "Exhale slowly 6 counts.",
    ],
  },
];

export const kegelGuide = {
  what: "Kegels strengthen the pelvic floor — the muscles that support uterus, bladder & bowels. Strong pelvic floor helps in delivery and recovery.",
  how: [
    "Identify the muscles: try to stop urine mid-flow (only to locate, do NOT do this regularly).",
    "Empty bladder, lie or sit comfortably.",
    "Squeeze and hold for 5 seconds, then release for 5 seconds.",
    "Do 10 reps, 3 times a day.",
    "Breathe normally throughout.",
  ],
};

export const exerciseAvoid = [
  "Lying flat on the back after week 20 (use left side or props)",
  "Deep twists, intense backbends, inversions like headstands",
  "Hot yoga / Bikram (overheating risk)",
  "Jumping, contact sports, anything with fall risk",
  "Holding the breath (kumbhaka) for long periods",
  "Strong abdominal crunches",
];

export const walkingGoal = {
  goal: "20–30 minutes of brisk walking, most days of the week.",
  tips: [
    "Walk in cool hours (early morning / evening).",
    "Wear supportive footwear.",
    "Stay hydrated — sip water before and after.",
    "Slow down if you feel breathless or dizzy.",
  ],
};
