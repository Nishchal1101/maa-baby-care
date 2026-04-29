export type Scheme = {
  id: string;
  name: string;
  shortName: string;
  ministry: string;
  benefit: string;
  eligibility: string[];
  howToApply: string[];
  link: string;
};

export const schemes: Scheme[] = [
  {
    id: "pmmvy",
    name: "Pradhan Mantri Matru Vandana Yojana",
    shortName: "PMMVY",
    ministry: "Ministry of Women & Child Development",
    benefit: "₹5,000 cash incentive in instalments for first living child to support nutrition and partial wage loss compensation.",
    eligibility: [
      "Pregnant & lactating mothers (excluding those in regular employment with Central/State Govt or PSUs)",
      "For the first living child only (₹6,000 for second child if it's a girl in some states)",
      "Age 19 years and above at date of LMP",
    ],
    howToApply: [
      "Visit the nearest Anganwadi Centre (AWC) or approved health facility.",
      "Fill Form 1A with Aadhaar, MCP card, bank account details.",
      "Submit subsequent forms after each ANC visit / child birth registration.",
    ],
    link: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana",
  },
  {
    id: "jsy",
    name: "Janani Suraksha Yojana",
    shortName: "JSY",
    ministry: "Ministry of Health & Family Welfare",
    benefit: "Cash assistance for institutional delivery — ₹1,400 (rural) / ₹1,000 (urban) in Low Performing States; lower amounts elsewhere. Promotes safe delivery in govt facilities.",
    eligibility: [
      "All pregnant women in Low Performing States (LPS) for institutional delivery",
      "BPL / SC / ST women in High Performing States",
      "Up to two live births",
    ],
    howToApply: [
      "Register at nearest ASHA worker / sub-centre / PHC.",
      "Get JSY card during ANC visits.",
      "Cash benefit released after institutional delivery.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309",
  },
  {
    id: "jssk",
    name: "Janani Shishu Suraksha Karyakram",
    shortName: "JSSK",
    ministry: "Ministry of Health & Family Welfare",
    benefit: "FREE delivery (including C-section), free medicines, diagnostics, blood, diet, and transport for every pregnant woman & sick newborn (up to 1 year) at govt health facilities.",
    eligibility: [
      "All pregnant women delivering in public health institutions",
      "All sick newborns up to 30 days (extended to 1 year in many states)",
    ],
    howToApply: [
      "No separate application — entitlements are automatic at any govt facility.",
      "Show MCP card at registration.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=842&lid=308",
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat — PM-JAY",
    shortName: "PM-JAY",
    ministry: "National Health Authority",
    benefit: "Health cover up to ₹5 lakh per family per year for secondary and tertiary care including maternity, C-section, neonatal care, in empanelled hospitals.",
    eligibility: [
      "Families listed under SECC 2011 deprivation criteria (rural & urban)",
      "Check eligibility on pmjay.gov.in or call 14555",
    ],
    howToApply: [
      "Check status at mera.pmjay.gov.in or any Common Service Centre.",
      "Get Ayushman card (PVC) from CSC or empanelled hospital.",
      "Show card at any empanelled hospital — cashless treatment.",
    ],
    link: "https://pmjay.gov.in",
  },
  {
    id: "icds",
    name: "ICDS — Anganwadi services",
    shortName: "ICDS",
    ministry: "Ministry of Women & Child Development",
    benefit: "Free supplementary nutrition (Take-Home Ration), health check-ups, immunisation, and nutrition counselling for pregnant & lactating mothers.",
    eligibility: ["All pregnant women & nursing mothers can register at the local Anganwadi Centre."],
    howToApply: [
      "Visit your nearest Anganwadi Centre with ID proof.",
      "Get registered — services are free.",
    ],
    link: "https://wcd.nic.in/schemes/integrated-child-development-services-icds-scheme",
  },
];

export const emergencyContacts = [
  { name: "National Ambulance", number: "108", desc: "24×7 free emergency ambulance" },
  { name: "Medical Helpline", number: "102", desc: "Free maternal & child healthcare ambulance (JSSK)" },
  { name: "Childline India", number: "1098", desc: "Helpline for children in distress" },
  { name: "Women Helpline", number: "1091", desc: "Distress helpline for women" },
  { name: "COVID / Disaster", number: "112", desc: "All-in-one emergency response number" },
];
