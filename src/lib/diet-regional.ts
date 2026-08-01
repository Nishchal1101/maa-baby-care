import type { DietRegion } from "@/lib/diet-region";
import { mealPlan, type DietPref, type Trim } from "@/lib/diet";

type Meal = ReturnType<typeof mealPlan>;
type Slot = keyof Meal;

// Region-specific vegetarian dishes shown first, before the shared base plan.
const vegByRegion: Record<DietRegion, Meal> = {
  north: {
    breakfast: ["Stuffed methi paratha + curd", "Aloo-matar poha + nimbu", "Daliya with milk & jaggery"],
    lunch: ["Roti + rajma + jeera rice + salad", "Roti + chole + boondi raita", "Sarson saag + makki roti + gud"],
    snack: ["Roasted chana + gud", "Lassi (fresh, chilled)", "Til-gud ladoo (small)"],
    dinner: ["Roti + moong dal + lauki sabzi", "Vegetable pulao + raita", "Palak khichdi + ghee"],
  },
  south: {
    breakfast: ["Idli + sambar + coconut chutney", "Ragi dosa + tomato chutney", "Upma with vegetables + curd"],
    lunch: ["Sambar rice + poriyal + curd", "Bisi bele bath + raita", "Rice + rasam + beans thoran"],
    snack: ["Sundal (boiled chana with coconut)", "Banana + roasted peanuts", "Ragi malt with jaggery"],
    dinner: ["Curd rice + steamed veg", "Appam + vegetable stew", "Pesarattu + ginger chutney"],
  },
  east: {
    breakfast: ["Chirer polao (poha) + peanuts", "Luchi (few) + aloo dum + fruit", "Muri with milk & banana"],
    lunch: ["Rice + cholar dal + aloo posto + curd", "Rice + mixed sabzi + shukto", "Dalma (dal with vegetables) + rice"],
    snack: ["Chana chaat + lemon", "Sandesh / chhena (fresh)", "Roasted makhana"],
    dinner: ["Rice + moong dal + begun bhaja (less oil)", "Khichuri + labra + ghee", "Roti + mixed vegetable curry"],
  },
  west: {
    breakfast: ["Methi thepla + curd", "Poha with peanuts & lemon", "Handvo / dhokla (steamed) + chutney"],
    lunch: ["Roti + gujarati dal + bhindi sabzi + rice", "Puran poli (small) + varan bhaat", "Roti + undhiyu (light) + curd"],
    snack: ["Khakhra + curd", "Sprouts misal (mild)", "Dates + walnuts"],
    dinner: ["Bhakri + pithla + salad", "Vegetable khichdi + kadhi", "Roti + tofu/paneer bhurji"],
  },
  central: {
    breakfast: ["Poha-jalebi style poha (light) + peanuts", "Besan chilla + curd", "Daliya with milk & dates"],
    lunch: ["Roti + chana dal + kaddu sabzi + curd", "Bafla-dal (light) + salad", "Rice + tuvar dal + mixed sabzi"],
    snack: ["Roasted chana + murmura", "Banana with peanut butter", "Til ladoo (small)"],
    dinner: ["Roti + moong dal + methi sabzi", "Vegetable daliya khichdi", "Rice + kadhi + steamed veg"],
  },
};

// Region-specific non-vegetarian / egg dishes.
const nonvegByRegion: Record<DietRegion, Partial<Record<Slot, string[]>>> = {
  north: {
    lunch: ["Chicken curry + roti + salad", "Egg curry + jeera rice"],
    dinner: ["Grilled chicken + roti + sabzi", "Chicken stew + soft roti"],
  },
  south: {
    lunch: ["Chettinad chicken curry + rice", "Fish curry (low mercury) + rice + poriyal"],
    dinner: ["Egg roast + appam", "Grilled fish + curd rice (light)"],
  },
  east: {
    lunch: ["Macher jhol (rohu/katla) + rice", "Chicken jhol + rice + sabzi"],
    dinner: ["Egg curry + rice", "Light fish stew + rice"],
  },
  west: {
    lunch: ["Chicken curry + bhakri + salad", "Fish curry (surmai/pomfret) + rice"],
    dinner: ["Egg bhurji + roti", "Chicken sukka (less oil) + rice"],
  },
  central: {
    lunch: ["Chicken curry + roti + dal", "Egg curry + rice + sabzi"],
    dinner: ["Chicken stew + soft roti", "Egg pulao + raita"],
  },
};

const eggByRegion: Record<DietRegion, Partial<Record<Slot, string[]>>> = {
  north: { breakfast: ["Egg bhurji + paratha"], snack: ["Boiled egg + fruit"] },
  south: { breakfast: ["Egg dosa + chutney"], snack: ["Boiled egg + banana"] },
  east: { breakfast: ["Egg toast + milk"], snack: ["Boiled egg + muri"] },
  west: { breakfast: ["Egg bhurji + thepla"], snack: ["Boiled egg + khakhra"] },
  central: { breakfast: ["Egg paratha + curd"], snack: ["Boiled egg + fruit"] },
};

const SLOTS: Slot[] = ["breakfast", "lunch", "snack", "dinner"];

function merge(...lists: (string[] | undefined)[]): string[] {
  const out: string[] = [];
  for (const list of lists) {
    for (const item of list ?? []) if (!out.includes(item)) out.push(item);
  }
  return out.slice(0, 4);
}

export function regionalMealPlan(region: DietRegion, pref: DietPref, t: Trim): Meal {
  const base = mealPlan(pref, t);
  const regional = vegByRegion[region];
  const extras =
    pref === "nonveg" ? nonvegByRegion[region] : pref === "egg" ? eggByRegion[region] : {};

  const result = {} as Meal;
  for (const slot of SLOTS) {
    result[slot] = merge(extras[slot], regional[slot], base[slot]);
  }
  return result;
}
