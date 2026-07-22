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
"Vaccination timing may vary based on previous immunization history and local recommendations. Discuss the appropriate schedule with your healthcare provider. Tdap is often considered between 27–36 weeks.",
    why: "Helps protect the mother and baby from tetanus. Tdap may also help provide passive protection against pertussis (whooping cough) in early infancy.",
  },
  {
    name: "Influenza (flu)  -  inactivated",
    when: "Any trimester during flu season. Single dose each year.",
    why: "Helps reduce the risk of severe influenza during pregnancy and may provide some protection to the baby in early infancy."
  },
  {
    name: "COVID-19",
    when: "As per current MoHFW guidance for pregnant and lactating women.",
    why: "May help reduce the risk of severe COVID-19 illness during pregnancy."
  }
];

export const contraindicatedVaccines = {
  note: "Some live vaccines are generally avoided during pregnancy unless specifically recommended by a healthcare provider.",
  list: ["MMR (Measles-Mumps-Rubella)", "Varicella (chicken pox)", "Live typhoid (oral)", "Yellow fever (unless travel is unavoidable  -  discuss with doctor)"] ,
};

export const maternalVaccinesSource = `${SRC.mohfwANC}; ${SRC.fogsi}; ${SRC.who}`;
