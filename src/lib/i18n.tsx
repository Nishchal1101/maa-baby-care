import * as React from "react";

export type Lang = "en" | "hi";

type Dict = Record<string, string>;

const en: Dict = {
  app_name: "MatruCare",
  tagline: "Your pregnancy companion",
  login: "Log in",
  signup: "Sign up",
  logout: "Log out",
  email: "Email",
  password: "Password",
  name: "Your name",
  continue: "Continue",
  back: "Back",
  finish: "Finish",
  save: "Save",
  cancel: "Cancel",
  loading: "Loading…",
  language: "Language",
  english: "English",
  hindi: "हिन्दी",

  // Onboarding
  welcome: "Welcome, mama 🌸",
  onb_intro: "Let's set up your pregnancy journey.",
  lmp_question: "First day of your last period (LMP)",
  due_question: "Or your due date if you know it",
  diet_question: "Your diet preference",
  veg: "Vegetarian",
  nonveg: "Non-vegetarian",
  egg: "Eggetarian",
  city: "City",
  state: "State",

  // Home
  week_of: "You are in",
  week: "Week",
  baby_size: "Baby is the size of",
  todays_tip: "Today's tip",
  next_appt: "Next appointment",
  none_scheduled: "Nothing scheduled",
  quick_actions: "Quick actions",
  count_kicks: "Count kicks",
  log_symptom: "Log symptom",
  view_diet: "Today's diet",
  view_week: "This week",

  // Nav
  home: "Home",
  tracker: "Tracker",
  diet: "Diet",
  appts: "Visits",
  more: "More",

  // Diet
  diet_title: "Indian Diet for Pregnancy",
  trimester: "Trimester",
  breakfast: "Breakfast",
  lunch: "Lunch",
  snack: "Snack",
  dinner: "Dinner",
  avoid: "Foods to avoid",

  // Appointments
  appts_title: "Appointments & Checkups",
  add_appt: "Add appointment",
  appt_title: "Title",
  doctor: "Doctor",
  hospital: "Hospital / Clinic",
  date_time: "Date & time",
  notes: "Notes",
  anc_schedule: "Indian ANC schedule",

  // Kicks
  kicks_title: "Kick Counter",
  kicks_help: "Aim for 10 kicks within 2 hours (3rd trimester).",
  start: "Start",
  stop: "Stop",
  kick: "Kick",
  reset: "Reset",
  elapsed: "Elapsed",

  // Symptoms
  sym_title: "Daily Log",
  weight_kg: "Weight (kg)",
  bp: "Blood pressure",
  systolic: "Systolic",
  diastolic: "Diastolic",
  mood: "Mood",
  symptoms: "Symptoms",
  saved: "Saved!",
};

const hi: Dict = {
  app_name: "मातृकेयर",
  tagline: "आपकी गर्भावस्था की साथी",
  login: "लॉग इन",
  signup: "साइन अप",
  logout: "लॉग आउट",
  email: "ईमेल",
  password: "पासवर्ड",
  name: "आपका नाम",
  continue: "आगे",
  back: "वापस",
  finish: "पूरा करें",
  save: "सहेजें",
  cancel: "रद्द",
  loading: "लोड हो रहा है…",
  language: "भाषा",
  english: "English",
  hindi: "हिन्दी",

  welcome: "स्वागत है, माँ 🌸",
  onb_intro: "आइए आपकी गर्भावस्था यात्रा सेट करें।",
  lmp_question: "आपकी अंतिम माहवारी का पहला दिन (LMP)",
  due_question: "या आपकी अनुमानित जन्म तिथि",
  diet_question: "आपका आहार",
  veg: "शाकाहारी",
  nonveg: "मांसाहारी",
  egg: "अंडाहारी",
  city: "शहर",
  state: "राज्य",

  week_of: "आप हैं",
  week: "सप्ताह",
  baby_size: "शिशु का आकार",
  todays_tip: "आज का सुझाव",
  next_appt: "अगली अपॉइंटमेंट",
  none_scheduled: "कुछ निर्धारित नहीं",
  quick_actions: "त्वरित क्रियाएँ",
  count_kicks: "किक गिनें",
  log_symptom: "लक्षण दर्ज करें",
  view_diet: "आज का आहार",
  view_week: "इस सप्ताह",

  home: "होम",
  tracker: "ट्रैकर",
  diet: "आहार",
  appts: "विज़िट",
  more: "और",

  diet_title: "गर्भावस्था के लिए भारतीय आहार",
  trimester: "तिमाही",
  breakfast: "नाश्ता",
  lunch: "दोपहर का भोजन",
  snack: "हल्का नाश्ता",
  dinner: "रात का भोजन",
  avoid: "इन चीज़ों से बचें",

  appts_title: "अपॉइंटमेंट और जाँच",
  add_appt: "नई अपॉइंटमेंट",
  appt_title: "शीर्षक",
  doctor: "डॉक्टर",
  hospital: "अस्पताल / क्लिनिक",
  date_time: "दिनांक और समय",
  notes: "नोट्स",
  anc_schedule: "भारतीय ANC शेड्यूल",

  kicks_title: "किक काउंटर",
  kicks_help: "तीसरी तिमाही में 2 घंटे में 10 किक का लक्ष्य रखें।",
  start: "शुरू",
  stop: "रोकें",
  kick: "किक",
  reset: "रीसेट",
  elapsed: "बीता समय",

  sym_title: "रोज़ाना लॉग",
  weight_kg: "वज़न (किग्रा)",
  bp: "रक्तचाप",
  systolic: "सिस्टोलिक",
  diastolic: "डायस्टोलिक",
  mood: "मनोदशा",
  symptoms: "लक्षण",
  saved: "सहेज लिया!",
};

const dicts: Record<Lang, Dict> = { en, hi };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof en) => string };
const I18nCtx = React.createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");

  React.useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "en" || stored === "hi") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = React.useCallback(
    (k: keyof typeof en) => dicts[lang][k] ?? en[k] ?? String(k),
    [lang],
  );

  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
