import { SRC } from "./sources";

export const rda = [
  { nutrient: "Energy", value: "+350 kcal/day in 2nd trimester, +450 kcal/day in 3rd" },
  { nutrient: "Protein", value: "+9.5 g/day in 2nd trimester, +22 g/day in 3rd" },
  { nutrient: "Iron", value: "27 mg/day" },
  { nutrient: "Calcium", value: "1000 mg/day" },
  { nutrient: "Folate", value: "600 µg/day (start 400 µg pre-conception)" },
  { nutrient: "Iodine", value: "220 µg/day — use iodised salt" },
  { nutrient: "Vitamin B12", value: "2.2 µg/day" },
  { nutrient: "Water", value: "2.5 – 3 L/day" },
];

export const indianFoodSources = [
  { key: "Iron", foods: "Palak, methi, beetroot, jaggery, dates, ragi, rajma, chana, liver (if non-veg), poha with lemon" },
  { key: "Calcium", foods: "Milk, curd, paneer, ragi, til (sesame), almonds, drumstick leaves, small fish with bones" },
  { key: "Protein", foods: "Dal, rajma, chana, sprouts, paneer, curd, egg, chicken, fish" },
  { key: "Folate", foods: "Dark green leafy vegetables, sprouts, oranges, mosambi, dals" },
  { key: "Vitamin C (helps iron absorption)", foods: "Amla, guava, orange, lemon, tomato" },
  { key: "Healthy fats", foods: "Ghee (in moderation), til, almonds, walnuts, flaxseed" },
];

export const nutritionTips = [
  "Eat 5–6 small meals rather than 3 large ones",
  "Take iron tablets with lemon/orange juice, NOT with tea, coffee, or milk",
  "Take calcium tablets at a different time from iron tablets",
  "Wash fruits & vegetables well; avoid cut fruit and street food",
  "Cook eggs, meat, and fish thoroughly",
  "Limit tea/coffee to 1 cup/day",
];

export const nutritionSource = `${SRC.icmr}; ${SRC.mohfwANC}`;
