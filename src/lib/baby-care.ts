// Newborn care, breastfeeding & postpartum content (EN + HI)

export type Tip = { title: { en: string; hi: string }; body: { en: string; hi: string } };

export const NEWBORN_TIPS: Tip[] = [
  {
    title: { en: "Skin-to-skin in the first hour", hi: "पहले घंटे में त्वचा-से-त्वचा संपर्क" },
    body: {
      en: "Hold baby on your bare chest right after birth  -  it regulates temperature, kickstarts breastfeeding and bonding.",
      hi: "जन्म के तुरंत बाद शिशु को अपनी छाती से लगाएं  -  यह तापमान संतुलित रखता है और स्तनपान शुरू करने में मदद करता है।",
    },
  },
  {
    title: { en: "Umbilical cord care", hi: "नाभि की देखभाल" },
    body: {
      en: "Keep the stump clean and dry. Do NOT apply oil, turmeric, or kajal  -  only sterile water if soiled. Cord falls off in 5–15 days.",
      hi: "नाभि को साफ़ और सूखा रखें। तेल, हल्दी या काजल न लगाएं  -  केवल साफ़ पानी से ज़रूरत पड़ने पर पोंछें। 5–15 दिन में नाभि गिर जाती है।",
    },
  },
  {
    title: { en: "Bathing", hi: "स्नान" },
    body: {
      en: "Sponge bath until cord falls off. Then a quick warm bath 2–3 times a week is enough. Mustard or coconut oil massage before bath is fine.",
      hi: "नाभि गिरने तक स्पंज से सफाई करें। उसके बाद हफ्ते में 2–3 बार गुनगुने पानी से स्नान काफी है। नहलाने से पहले सरसों/नारियल तेल की मालिश ठीक है।",
    },
  },
  {
    title: { en: "Safe sleep", hi: "सुरक्षित नींद" },
    body: {
      en: "Always on the back, on a firm surface, no pillows or loose blankets. Same room as parents for the first 6 months.",
      hi: "हमेशा पीठ के बल, सख्त सतह पर, बिना तकिया या ढीले कंबल के। पहले 6 महीने माता-पिता के साथ ही कमरे में सुलाएं।",
    },
  },
  {
    title: { en: "When to call the doctor", hi: "डॉक्टर को कब बुलाएं" },
    body: {
      en: "Fever >100.4°F, refusing feeds, very fast breathing, yellowing of eyes/skin worsening, fewer than 6 wet nappies in 24h, blood in stool.",
      hi: "बुखार 100.4°F से अधिक, दूध न पीना, बहुत तेज़ सांस, आंख/त्वचा का पीला होना बढ़ना, 24 घंटे में 6 से कम गीले डायपर, मल में खून।",
    },
  },
];

export const BREASTFEEDING_TIPS: Tip[] = [
  {
    title: { en: "Colostrum is liquid gold", hi: "कोलोस्ट्रम  -  सोने जैसा मूल्यवान" },
    body: {
      en: "The first thick yellow milk is full of antibodies. Feed it  -  never discard, never give honey or ghutti.",
      hi: "पहली गाढ़ी पीली खीस इम्युनिटी से भरपूर होती है। ज़रूर पिलाएं  -  कभी न फेंकें, शहद/घुट्टी न दें।",
    },
  },
  {
    title: { en: "Feed on demand", hi: "जब-जब चाहे, तब-तब पिलाएं" },
    body: {
      en: "Newborns feed 8–12 times in 24 hours. Watch for cues: rooting, sucking on hands, lip smacking  -  don't wait for crying.",
      hi: "नवजात 24 घंटे में 8–12 बार दूध पीते हैं। संकेत देखें: मुंह घुमाना, हाथ चूसना  -  रोने तक इंतज़ार न करें।",
    },
  },
  {
    title: { en: "Latch matters", hi: "सही पकड़ ज़रूरी है" },
    body: {
      en: "Baby's mouth should cover most of the areola, not just the nipple. If it hurts past 30 seconds, gently break suction and re-latch.",
      hi: "शिशु का मुंह केवल निप्पल नहीं, बल्कि अधिकांश एरियोला ढके। 30 सेकंड बाद भी दर्द हो तो उंगली से छुड़ाकर दोबारा लगाएं।",
    },
  },
  {
    title: { en: "Mom's diet", hi: "माँ का आहार" },
    body: {
      en: "Eat 500 extra kcal  -  dal, roti, sabzi, ghee, methi laddoo, gond ke laddoo, jeera water, plenty of fluids. Avoid heavy caffeine and alcohol.",
      hi: "500 अतिरिक्त कैलोरी लें  -  दाल, रोटी, सब्ज़ी, घी, मेथी/गोंद के लड्डू, जीरा पानी, खूब तरल पदार्थ। चाय/कॉफ़ी कम करें।",
    },
  },
  {
    title: { en: "Exclusive breastfeeding for 6 months", hi: "6 महीने तक केवल स्तनपान" },
    body: {
      en: "No water, honey, formula or solids before 6 months unless medically advised. Continue breastfeeding alongside solids till 2 years.",
      hi: "6 महीने तक केवल माँ का दूध  -  पानी, शहद, फॉर्मूला या ठोस आहार नहीं (जब तक डॉक्टर न कहें)। 2 वर्ष तक स्तनपान जारी रखें।",
    },
  },
];

export const POSTPARTUM_QUESTIONS: { id: string; q: { en: string; hi: string } }[] = [
  { id: "q1", q: { en: "I have been able to laugh and see the funny side of things", hi: "मैं हँस पाई हूँ और बातों में मज़ा ले पाई हूँ" } },
  { id: "q2", q: { en: "I have looked forward with enjoyment to things", hi: "मैं चीज़ों का इंतज़ार खुशी से कर पाई हूँ" } },
  { id: "q3", q: { en: "I have blamed myself unnecessarily when things went wrong", hi: "गलत होने पर मैंने बिना वजह खुद को दोष दिया है" } },
  { id: "q4", q: { en: "I have felt anxious or worried for no good reason", hi: "मुझे बिना वजह चिंता या घबराहट हुई है" } },
  { id: "q5", q: { en: "I have felt scared or panicky for no good reason", hi: "मुझे बिना वजह डर या घबराहट हुई है" } },
  { id: "q6", q: { en: "Things have been getting on top of me", hi: "मुझे लग रहा है कि चीज़ें मुझ पर हावी हो रही हैं" } },
  { id: "q7", q: { en: "I have been so unhappy that I have had difficulty sleeping", hi: "मैं इतनी दुखी रही हूँ कि नींद नहीं आ रही" } },
  { id: "q8", q: { en: "I have felt sad or miserable", hi: "मैं उदास या दुखी महसूस कर रही हूँ" } },
  { id: "q9", q: { en: "I have been so unhappy that I have been crying", hi: "मैं इतनी दुखी रही हूँ कि रो रही हूँ" } },
  { id: "q10", q: { en: "The thought of harming myself has occurred to me", hi: "खुद को नुकसान पहुँचाने का विचार मन में आया है" } },
];
