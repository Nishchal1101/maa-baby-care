import { SRC } from "./sources";

export type MaternalVaccine = {
  name: string;
  when: string;
  why: string;
};

export const maternalVaccines: MaternalVaccine[] = [
  {
    name: "Td / Tdap (Tetanus, or Tetanus + Diphtheria + Pertussis)",
    when:
      "First dose as early as possible (around 4th month), 2nd dose 4 weeks later (around 5th month). Booster if a full course was received in the last 3 years. Tdap ideally between 27–36 weeks to protect the baby from whooping cough.",
    why: "Prevents maternal & neonatal tetanus; Tdap gives the newborn passive protection against pertussis.",
  },
  {
    name: "Influenza (flu) — inactivated",
    when: "Any trimester during flu season. Single dose each year.",
    why: "Pregnant women are at higher risk of severe flu; the antibodies also protect the baby for the first months.",
  },
  {
    name: "COVID-19",
    when: "As per current MoHFW guidance for pregnant and lactating women.",
    why: "Reduces risk of severe COVID during pregnancy.",
  },
];

export const contraindicatedVaccines = {
  note: "Live vaccines are generally avoided during pregnancy",
  list: ["MMR (Measles-Mumps-Rubella)", "Varicella (chicken pox)", "Live typhoid (oral)", "Yellow fever (unless travel is unavoidable — discuss with doctor)"] ,
};

export const maternalVaccinesSource = `${SRC.mohfwANC}; ${SRC.fogsi}; ${SRC.who}`;
