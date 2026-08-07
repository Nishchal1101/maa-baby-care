/** Daily affirmations for the mother  -  one new gentle line each day. */
export const AFFIRMATIONS: string[] = [
  "My body knows how to grow my baby, and I trust it completely.",
  "Every breath I take brings calm to me and to my baby.",
  "I am doing enough. I am enough.",
  "This little life inside me is loved beyond measure.",
  "Rest is not laziness  -  it is care for two.",
  "I listen to my body and honour what it asks for today.",
  "My baby feels my love, even before we meet.",
  "I am allowed to ask for help, and I am supported.",
  "Each week of this journey is a quiet miracle.",
  "I release worry and hold on to hope.",
  "My strength is soft, steady, and my own.",
  "Today I will be gentle with myself.",
  "I nourish my body with kindness and good food.",
  "My changing body is doing sacred work.",
  "I am not alone  -  generations of mothers walk with me.",
  "Small steps today are still progress.",
  "I choose peace over pressure.",
  "My baby is growing perfectly in their own time.",
  "I deserve rest, water, warmth and care.",
  "My feelings are valid, all of them.",
  "I let go of comparison. My journey is mine.",
  "Every kick is a hello from my little one.",
  "I trust the wisdom of my body and my doctors.",
  "Calm mind, calm heart, calm baby.",
  "I am becoming the mother my child needs.",
  "I am safe. My baby is safe.",
  "Today I celebrate one more day of growing life.",
  "My patience is a gift to my baby.",
  "I forgive myself for the days that feel hard.",
  "Joy can live beside tiredness.",
  "I speak to myself the way I would speak to a dear friend.",
  "My heart is already full of love for my baby.",
  "I welcome help, warmth and good wishes.",
  "I am proud of how far I have come.",
  "My body is not a burden  -  it is a home.",
  "Breathing slowly, I let tension leave my shoulders.",
  "I hold space for both fear and excitement.",
  "Today I will do one kind thing just for me.",
  "My baby and I are a team.",
  "I trust that everything is unfolding as it should.",
  "Sleep, food and stillness are my medicine today.",
  "I am learning, and learning is enough.",
  "My love is the first language my baby will know.",
  "I let go of what I cannot control.",
  "This moment, right now, is peaceful.",
  "I am worthy of care, comfort and joy.",
  "My story is being written with courage.",
  "Every day my baby grows stronger, and so do I.",
  "I greet today with a soft heart.",
  "I am a good mother, starting today.",
];

/** Stable index for a given date, so the affirmation changes once per day. */
export function affirmationForDate(d: Date = new Date()) {
  const day = Math.floor(
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5,
  );
  return AFFIRMATIONS[((day % AFFIRMATIONS.length) + AFFIRMATIONS.length) % AFFIRMATIONS.length];
}

export function dateKey(d: Date = new Date()) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
