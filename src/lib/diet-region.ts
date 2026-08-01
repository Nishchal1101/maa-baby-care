export type DietRegion = "north" | "south" | "east" | "west" | "central";

export const DIET_REGIONS: DietRegion[] = ["north", "south", "east", "west", "central"];

export const regionLabels: Record<DietRegion, string> = {
  north: "North",
  south: "South",
  east: "East",
  west: "West",
  central: "Central",
};

const stateRegionMap: Record<string, DietRegion> = {
  "Jammu and Kashmir": "north",
  Ladakh: "north",
  "Himachal Pradesh": "north",
  Punjab: "north",
  Haryana: "north",
  Chandigarh: "north",
  Delhi: "north",
  Uttarakhand: "north",
  "Uttar Pradesh": "north",
  Rajasthan: "north",

  Karnataka: "south",
  Kerala: "south",
  "Tamil Nadu": "south",
  "Andhra Pradesh": "south",
  Telangana: "south",
  Puducherry: "south",
  Lakshadweep: "south",
  "Andaman and Nicobar Islands": "south",

  Bihar: "east",
  Jharkhand: "east",
  Odisha: "east",
  "West Bengal": "east",
  Sikkim: "east",
  Assam: "east",
  "Arunachal Pradesh": "east",
  Manipur: "east",
  Meghalaya: "east",
  Mizoram: "east",
  Nagaland: "east",
  Tripura: "east",

  Gujarat: "west",
  Maharashtra: "west",
  Goa: "west",
  "Dadra and Nagar Haveli and Daman and Diu": "west",

  "Madhya Pradesh": "central",
  Chhattisgarh: "central",
};

export function stateToDietRegion(state?: string | null): DietRegion {
  if (!state) return "north";
  return stateRegionMap[state.trim()] ?? "north";
}

export function resolveDietRegion(
  dietRegion?: string | null,
  state?: string | null,
): DietRegion {
  const saved = (dietRegion ?? "").trim().toLowerCase() as DietRegion;
  if (DIET_REGIONS.includes(saved)) return saved;
  return stateToDietRegion(state);
}
