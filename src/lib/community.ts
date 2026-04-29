export const COMMUNITY_TOPICS = [
  { id: "nutrition", label: "Nutrition", emoji: "🥗" },
  { id: "symptoms", label: "Symptoms", emoji: "🤰" },
  { id: "labor", label: "Labor & Delivery", emoji: "👶" },
  { id: "newborn", label: "Newborn Care", emoji: "🍼" },
  { id: "mental_health", label: "Mental Health", emoji: "💗" },
  { id: "general", label: "General", emoji: "💬" },
] as const;

export type TopicId = (typeof COMMUNITY_TOPICS)[number]["id"];

export const REPORT_REASONS = [
  "Spam or advertising",
  "Misinformation / unsafe medical advice",
  "Harassment or hate",
  "Inappropriate content",
  "Other",
];
