import { SRC } from "./sources";

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  { q: "Which side should I sleep on?", a: "Left side is best from the 2nd trimester — it improves blood flow to the placenta. Right side is also fine. Avoid lying flat on your back for long after 16 weeks." },
  { q: "Is travel safe during pregnancy?", a: "The 2nd trimester (14–28 weeks) is usually the safest window. Avoid long journeys after 34–36 weeks. Wear a seat belt low across the hips. Discuss with your doctor for flights above 36 weeks or if high-risk." },
  { q: "Is sex safe during pregnancy?", a: "In a normal pregnancy, yes. Avoid it if you have bleeding, placenta previa, cervical weakness, water leak, or a history of preterm labor — confirm with your doctor." },
  { q: "How much weight should I gain?", a: "For a normal-BMI mother, about 10–12 kg in total: little in the 1st trimester, then 300–400 g/week. Underweight women gain more; overweight women gain less. Your doctor will guide you." },
  { q: "Can I drink tea or coffee?", a: "Limit caffeine to about 200 mg/day — roughly 1 cup of coffee or 2 cups of tea. Avoid energy drinks." },
  { q: "Is fasting safe?", a: "Long fasts are not recommended, especially in the 2nd and 3rd trimesters. If you must fast for religious reasons, discuss with your doctor first." },
  { q: "Can I dye my hair?", a: "Occasional use of standard hair dyes is generally considered low risk, especially after the 1st trimester. Prefer highlights or ammonia-free products." },
  { q: "Is it safe to work till the end?", a: "Most desk jobs are fine till near term if you feel well. Avoid long standing, night shifts, heavy lifting, or exposure to chemicals/X-rays." },
  { q: "Which fish should I avoid?", a: "Avoid high-mercury fish (shark, king mackerel, swordfish). Well-cooked local fish twice a week is fine." },
  { q: "Can I eat papaya or pineapple?", a: "Ripe papaya in small amounts is fine. Raw/green papaya and very large amounts of raw pineapple are traditionally avoided as they may trigger contractions." },
  { q: "Is a C-section safer than a normal delivery?", a: "Normal (vaginal) delivery is preferred when safe. A C-section is done when it is safer for mother or baby — your doctor will decide based on labor progress, baby's position, and other factors." },
  { q: "When should I feel the baby move?", a: "First-time mothers usually feel movements around 18–22 weeks; second-time mothers earlier. From 28 weeks, count movements daily (10 movements in 2 hours). Report reduced movements the same day." },
  { q: "Are ultrasounds safe?", a: "Yes, medically indicated ultrasounds are safe. In India, sex determination through ultrasound is illegal under the PC-PNDT Act." },
  { q: "Can I take a hot bath or sauna?", a: "Avoid very hot baths, saunas, and steam rooms — overheating is not good in early pregnancy. Warm baths are fine." },
];

export const faqSource = `${SRC.fogsi}; ${SRC.nice}; ${SRC.mohfwSM}`;
