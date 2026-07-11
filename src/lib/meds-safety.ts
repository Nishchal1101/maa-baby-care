import { SRC } from "./sources";

// GENERAL GUIDANCE ONLY. No dosages. No prescriptions.
export const medsGuidance = [
  {
    title: "Never self-medicate in pregnancy",
    body: "Even common over-the-counter medicines can affect the baby. Always confirm with your doctor before taking anything  -  including herbal, ayurvedic, or homeopathic remedies.",
  },
  {
    title: "Pain & fever",
    body: "Paracetamol is generally considered acceptable for short-term use when needed. NSAIDs (ibuprofen, diclofenac, aspirin) are usually avoided, especially after 20 weeks. Confirm with your doctor.",
  },
  {
    title: "Cold, cough & allergy",
    body: "Many cold/cough combinations, decongestants, and sedating antihistamines are not recommended. Steam inhalation, warm fluids, and saline nasal drops are safe first steps.",
  },
  {
    title: "Antibiotics",
    body: "Some antibiotics are safe in pregnancy, others are not. Take antibiotics only when a doctor prescribes them and complete the full course.",
  },
  {
    title: "Iron, calcium, folic acid",
    body: "Take routinely as advised by your ANC provider. Iron works best with vitamin C (lemon, orange). Space calcium and iron tablets at least 2 hours apart.",
  },
  {
    title: "Herbal, home & traditional remedies",
    body: "Avoid unprescribed churnas, kadhas, or heating herbs (ajwain, methi seeds, saunf) in large amounts, especially in the 1st trimester. Show any home remedy to your doctor first.",
  },
];

export const medsSource = `${SRC.fogsi}; ${SRC.nice}; ${SRC.who}`;
