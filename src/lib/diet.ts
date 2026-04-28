export type DietPref = "veg" | "nonveg" | "egg";
export type Trim = 1 | 2 | 3;

type Meal = { breakfast: string[]; lunch: string[]; snack: string[]; dinner: string[] };

const veg: Record<Trim, Meal> = {
  1: {
    breakfast: ["Poha with peanuts & lemon", "Ragi dosa with coconut chutney", "Vegetable upma + curd"],
    lunch: ["Dal + jeera rice + lauki sabzi + curd", "Roti + palak paneer + salad", "Khichdi with ghee + papad"],
    snack: ["Roasted chana + nimbu pani", "Banana with peanut butter", "Sprouts chaat"],
    dinner: ["2 roti + mixed dal + bhindi sabzi", "Vegetable pulao + raita", "Idli + sambar"],
  },
  2: {
    breakfast: ["Besan chilla with paneer", "Methi thepla + curd", "Oats with banana, almonds & dates"],
    lunch: ["Roti + rajma + jeera rice + salad", "Dal makhani + roti + beetroot sabzi", "Curd rice + papad + pickle (low salt)"],
    snack: ["Dates + walnuts", "Paneer tikka", "Fruit + almonds"],
    dinner: ["Palak khichdi + ghee + curd", "Roti + tofu bhurji + sabzi", "Vegetable daliya"],
  },
  3: {
    breakfast: ["Ragi porridge with jaggery", "Vegetable paratha + curd", "Idli + sambar + chutney"],
    lunch: ["Roti + dal + paneer sabzi + salad", "Bisi bele bath + raita", "Khichdi + ghee + steamed veg"],
    snack: ["Dry fruit ladoo (small)", "Roasted makhana", "Banana milkshake"],
    dinner: ["Soft roti + mixed dal + lauki", "Vegetable soup + grilled paneer", "Curd rice (light)"],
  },
};

const nonveg: Record<Trim, Meal> = {
  1: {
    breakfast: ["Boiled egg + toast + fruit", "Omelette + paratha", "Poha + boiled egg"],
    lunch: ["Chicken curry + rice + salad", "Fish curry (well-cooked) + rice + sabzi", "Egg curry + roti + dal"],
    snack: ["Roasted chana", "Banana + nuts", "Yogurt with seeds"],
    dinner: ["Roti + dal + chicken sabzi", "Khichdi + curd", "Vegetable soup + 1 egg"],
  },
  2: {
    breakfast: ["Egg bhurji + paratha", "Chicken sandwich + milk", "Oats + boiled egg"],
    lunch: ["Chicken biryani (light) + raita", "Fish curry + rice + sabzi (avoid high-mercury fish)", "Mutton stew + appam (occasional)"],
    snack: ["Boiled egg", "Paneer tikka", "Dates + nuts"],
    dinner: ["Grilled chicken + roti + sabzi", "Dal + rice + egg curry", "Fish tikka + salad"],
  },
  3: {
    breakfast: ["Egg paratha + curd", "Chicken soup + toast", "Idli + egg curry"],
    lunch: ["Chicken curry + roti + dal", "Fish curry + rice + sabzi", "Egg pulao + raita"],
    snack: ["Boiled egg + fruit", "Sprouts chaat", "Milk + dates"],
    dinner: ["Soft roti + chicken stew", "Khichdi + curd + egg", "Light fish curry + rice"],
  },
};

const egg: Record<Trim, Meal> = {
  1: { ...veg[1], breakfast: ["Boiled egg + 2 idli + chutney", ...veg[1].breakfast.slice(0, 2)] },
  2: { ...veg[2], breakfast: ["Egg bhurji + paratha", ...veg[2].breakfast.slice(0, 2)] },
  3: { ...veg[3], breakfast: ["Egg paratha + curd", ...veg[3].breakfast.slice(0, 2)] },
};

export function mealPlan(pref: DietPref, t: Trim): Meal {
  if (pref === "nonveg") return nonveg[t];
  if (pref === "egg") return egg[t];
  return veg[t];
}

export const foodsToAvoid = [
  "Raw or undercooked papaya (can trigger contractions)",
  "Raw pineapple in large quantity",
  "Excess caffeine — limit to 1 cup tea/coffee/day",
  "Unpasteurized milk and soft cheeses",
  "High-mercury fish (king mackerel, shark, swordfish)",
  "Raw eggs, runny yolks",
  "Sprouts that are raw — cook them well",
  "Street food, cut fruits from stalls",
  "Alcohol and tobacco — completely avoid",
  "Excess saunf, methi seeds, ajwain in 1st trimester",
];
