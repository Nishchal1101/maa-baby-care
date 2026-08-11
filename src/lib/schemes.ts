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
    benefit: "Cash assistance for institutional delivery  -  ₹1,400 (rural) / ₹1,000 (urban) in Low Performing States; lower amounts elsewhere. Promotes safe delivery in govt facilities.",
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
      "No separate application  -  entitlements are automatic at any govt facility.",
      "Show MCP card at registration.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=842&lid=308",
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat  -  PM-JAY",
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
      "Show card at any empanelled hospital  -  cashless treatment.",
    ],
    link: "https://pmjay.gov.in",
  },
  {
    id: "icds",
    name: "ICDS  -  Anganwadi services",
    shortName: "ICDS",
    ministry: "Ministry of Women & Child Development",
    benefit: "Free supplementary nutrition (Take-Home Ration), health check-ups, immunisation, and nutrition counselling for pregnant & lactating mothers.",
    eligibility: ["All pregnant women & nursing mothers can register at the local Anganwadi Centre."],
    howToApply: [
      "Visit your nearest Anganwadi Centre with ID proof.",
      "Get registered  -  services are free.",
    ],
    link: "https://wcd.nic.in/schemes/integrated-child-development-services-icds-scheme",
  },
  {
    id: "sterilization-compensation",
    name: "Compensation Scheme for Sterilization Acceptors",
    shortName: "Sterilization Compensation",
    ministry: "Ministry of Health & Family Welfare  -  National Health Mission",
    benefit:
      "Compensation for loss of wages after sterilisation  -  female sterilisation (tubectomy / minilap / laparoscopic) and male sterilisation (No-Scalpel Vasectomy, NSV). Incentives are also paid to the service provider and health team. Amount varies by state and type of facility.",
    eligibility: [
      "Eligible couples opting for permanent contraception at a public health facility",
      "Also available at private facilities accredited under NHM",
      "As per state-specific NHM norms",
    ],
    howToApply: [
      "Speak to your ASHA worker, ANM or the nearest PHC/CHC about family planning counselling.",
      "Register for a sterilisation camp or fixed-day service at a government or NHM-accredited facility.",
      "Compensation is credited after the procedure  -  carry Aadhaar and bank account details.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=816&lid=222",
  },
  {
    id: "fpis",
    name: "Family Planning Indemnity Scheme",
    shortName: "FPIS",
    ministry: "Ministry of Health & Family Welfare  -  National Health Mission",
    benefit:
      "Financial protection if something goes wrong after sterilisation  -  covers death following the procedure, failure of sterilisation (pregnancy afterwards), and treatment of complications. Also gives legal indemnity cover to doctors and accredited facilities.",
    eligibility: [
      "Any person who has undergone sterilisation at a government or NHM-accredited facility",
      "Claims are as per the timelines and categories notified under the scheme",
    ],
    howToApply: [
      "Report the death, failure or complication to the facility where the procedure was done.",
      "The District Quality Assurance Committee processes the claim  -  no premium is paid by you.",
      "Keep the sterilisation certificate and hospital records safe.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=821&lid=222",
  },
  {
    id: "ppiucd",
    name: "PPIUCD Incentive Scheme",
    shortName: "PPIUCD",
    ministry: "Ministry of Health & Family Welfare  -  National Health Mission",
    benefit:
      "Promotes Post-Partum IUCD insertion immediately after delivery. Incentive for the woman accepting PPIUCD (as per the applicable state/central package), plus incentives for the provider and supporting health workers.",
    eligibility: [
      "Women delivering at a public health facility who choose a PPIUCD",
      "Insertion within the post-partum window as advised by the doctor",
    ],
    howToApply: [
      "Ask for family planning counselling during your ANC visits.",
      "Give consent for PPIUCD before delivery  -  insertion is done free of cost at the facility.",
      "Attend the follow-up visit for a check of the IUCD.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=816&lid=222",
  },
  {
    id: "iucd-compensation",
    name: "IUCD Insertion Compensation Scheme",
    shortName: "IUCD Compensation",
    ministry: "Ministry of Health & Family Welfare  -  National Health Mission",
    benefit:
      "Free interval IUCD insertion (Cu 380A or Cu 375) at government facilities, with a compensation package for eligible beneficiaries and incentives for providers and ASHAs as per NHM guidelines.",
    eligibility: [
      "Eligible women choosing an interval IUCD (not immediately after delivery)",
      "Services availed at a government or NHM-accredited facility",
    ],
    howToApply: [
      "Visit your sub-centre, PHC or CHC on a fixed-day family planning service day.",
      "Counselling and insertion are free  -  your ASHA can accompany you.",
      "Compensation, where applicable, is paid as per state NHM norms.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=816&lid=222",
  },
  {
    id: "asha-fp-incentive",
    name: "ASHA Incentive Scheme (Family Planning)",
    shortName: "ASHA Incentives",
    ministry: "Ministry of Health & Family Welfare  -  National Health Mission",
    benefit:
      "ASHAs are paid incentives for motivating eligible couples for sterilisation, for IUCD/PPIUCD acceptance, for follow-up after family planning services, and for home delivery of contraceptives (condoms, oral pills, emergency contraceptive pills).",
    eligibility: [
      "Accredited ASHA workers under NHM",
      "Families get free counselling and doorstep contraceptive supplies through their ASHA",
    ],
    howToApply: [
      "Contact your area ASHA worker for counselling or contraceptive supplies at home.",
      "ASHAs claim incentives through the ANM / PHC records.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=1&sublinkid=150&lid=226",
  },
  {
    id: "mpv",
    name: "Mission Parivar Vikas",
    shortName: "MPV",
    ministry: "Ministry of Health & Family Welfare  -  National Health Mission",
    benefit:
      "Implemented in selected high-focus states and districts to improve access to family planning  -  expanded contraceptive choices, easier access to sterilisation, IUCD and PPIUCD services, plus community awareness and counselling.",
    eligibility: [
      "Eligible couples living in Mission Parivar Vikas districts",
      "Check with your ASHA or PHC whether your district is covered",
    ],
    howToApply: [
      "Attend Saas-Bahu Sammelan / Nayi Pahel counselling sessions in your village.",
      "Collect free Nayi Pahel kits and contraceptives from your ASHA.",
      "Avail services on fixed-day family planning days at the nearest facility.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=1489&lid=798",
  },
];

export const emergencyContacts = [
  { name: "National Ambulance", number: "108", desc: "24×7 free emergency ambulance" },
  { name: "Medical Helpline", number: "102", desc: "Free maternal & child healthcare ambulance (JSSK)" },
  { name: "Childline India", number: "1098", desc: "Helpline for children in distress" },
  { name: "Women Helpline", number: "1091", desc: "Distress helpline for women" },
  { name: "COVID / Disaster", number: "112", desc: "All-in-one emergency response number" },
];
