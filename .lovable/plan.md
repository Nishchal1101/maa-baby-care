# Plan: Trusted Pregnancy Guidance for Maa Baby Care

Turn the app into an India-focused pregnancy companion grounded in MoHFW / NHM / ICMR / AIIMS / FOGSI / WHO / UNICEF / NICE guidance. Every medical screen will carry a source citation and a clear "educational, not a diagnosis" disclaimer, with red-flag symptoms surfaced prominently.

## Guiding principles (applied on every new/edited screen)

- Every medical claim shows a short **Source** line (e.g. "Source: MoHFW ANC Guidelines 2018; FOGSI GCPR 2022").
- Every medical screen shows a persistent **disclaimer** ("Educational guidance only. Not a substitute for your doctor.").
- **Red flags** get a dedicated red-tinted card + a global "Emergency signs" shortcut, always visible.
- **No medicine names, no dosages, no diagnoses.** Only categories ("your doctor may prescribe iron/calcium") and safety flags.
- Content authored in EN + HI where i18n keys already exist; new content ships EN first, HI keys stubbed.

## New content modules (`src/lib/`)

- `sources.ts` — canonical citation strings + a `<SourceNote>` helper component.
- `red-flags.ts` — pregnancy & postpartum danger signs (bleeding, severe headache, blurred vision, reduced fetal movement, fluid leak, fever ≥38°C, severe abdominal pain, convulsions, breathlessness). Source: MoHFW Safe Motherhood Booklet, WHO ANC 2016.
- `symptoms-guide.ts` — expand beyond the current logger: for each common symptom (nausea, heartburn, constipation, cramps, swelling, discharge, back pain, breathlessness, itching) list *what's normal*, *self-care*, *see a doctor if*. Source: NICE NG201, FOGSI.
- `investigations.ts` — trimester-wise ANC investigations per MoHFW ANC 2018 (Hb, blood group + Rh, VDRL, HIV, HBsAg, urine R/M, blood sugar / OGTT 24–28w, thyroid profile, dating + NT + anomaly + growth scans, GBS where offered).
- `vaccines-pregnancy.ts` — Td/Tdap (FOGSI: 2 doses 4 weeks apart, booster if prior; Tdap 27–36w), Influenza (seasonal, any trimester), COVID as per MoHFW; contraindicated live vaccines list.
- `nutrition.ts` — ICMR-NIN 2020 RDA for pregnancy (extra ~350 kcal T2/T3, +9.5g protein T2 / +22g T3, iron 27 mg, calcium 1000 mg, folate 600 µg, iodine 220 µg). Indian food sources per ICMR "My Plate for the Mother".
- `exercise-safety.ts` — ACOG/NICE-aligned safe activity (30 min moderate, Kegels, prenatal yoga asanas already listed, walking); avoid supine after 16w, contact sports, hot yoga. Warning signs to stop.
- `meds-safety.ts` — general categories only: paracetamol generally considered safe short-term (per FOGSI/NICE) vs. avoid NSAIDs after 20w, avoid unprescribed herbal, always confirm with doctor. No dosages.
- `kick-counts.ts` (extend `kicks.tsx`) — DFMC / Cardiff "count to 10" from 28w, when to alert doctor. Source: FOGSI, RCOG GTG 57.
- `labor-signs.ts` — true vs false labor, water break, bloody show, when to leave for hospital; preterm labor red flags <37w.
- `postpartum.ts` (extend) — 6-week recovery signs, PPH red flags, perineal care, mental health (EPDS awareness), contraception timing per MoHFW postpartum family planning.
- `newborn-care.ts` (extend existing `baby-care.ts`) — cord care, exclusive breastfeeding 6 months (UNICEF/IYCF), Kangaroo Mother Care for LBW, danger signs in newborn per IMNCI.
- `faq.ts` — 20–30 common OB/GYN questions (travel, sex, sleeping side, hair dye, coffee, seafood, fasting, working late pregnancy) with sourced short answers.

## New routes (`src/routes/`)

Each new route uses `MobileShell`, back button, disclaimer banner, and per-item source lines.

- `/emergency` — full-screen red-flag list, phone tel: links (108 ambulance, user's saved doctor). Linked from home + a persistent floating pill.
- `/investigations` — trimester-wise ANC tests checklist merged with the existing `anc.ts`.
- `/vaccines-pregnancy` — maternal vaccination schedule (separate from baby UIP which already exists).
- `/nutrition-guide` — RDA + Indian food sources + iron/calcium/folate/iodine deep dives. Complements `/diet` meal plans.
- `/exercise` — safe activity guide (links out to existing `/yoga`).
- `/meds-safety` — general safety categories + big "confirm with doctor" CTA.
- `/faq` — searchable Q&A.
- `/labor-signs` — true vs false labor + preterm signs.
- Extend `/symptoms` — add "Symptom guide" tab beside the log using `symptoms-guide.ts`.
- Extend `/kicks` — add DFMC instructions + alert threshold.
- Extend `/postpartum` — recovery timeline, PPH red flags, mental health check-in.
- Extend `/week/$week` — add "This week's red flags" + "This week's checkup" sections pulled from `investigations.ts`.

## Home + navigation updates

- Home: add prominent **Emergency signs** button (red pill under greeting) and a "This week's checkup" card.
- `/more`: group new pages under sections — *Learn* (Nutrition, Exercise, FAQ, Meds safety), *Care* (Investigations, Vaccines, Symptoms, Labor signs), *After birth* (Postpartum, Newborn).
- Add global disclaimer chip in `MobileShell` footer.

## Shared UI

- `src/components/source-note.tsx` — small "Source: …" line.
- `src/components/disclaimer-banner.tsx` — soft banner for medical screens.
- `src/components/red-flag-card.tsx` — red-tinted card with warning icon + call-doctor CTA.

## Out of scope

- No prescribing, dosing, or diagnostic logic.
- No AI symptom checker (explicitly avoided — misuse risk).
- No changes to auth, DB schema, or backend.
- Hindi translations for new strings will be stubbed to EN and filled incrementally.

## Sources referenced

MoHFW Maternal Health Division — ANC Guidelines 2018 & Safe Motherhood Booklet; NHM RCH portal; ICMR-NIN RDA 2020 & Dietary Guidelines for Indians 2024; FOGSI Good Clinical Practice Recommendations; WHO ANC 2016 & Postnatal Care 2022; UNICEF IYCF; NICE NG201 (Antenatal Care) & NG194 (Postnatal); IAP/IMNCI for newborn danger signs.

Confirm and I'll start implementing — I'd build in this order: shared UI + disclaimer/sources → red flags + emergency route → investigations + vaccines → nutrition + exercise + meds → FAQ → symptom/kick/labor/postpartum extensions → home & /more wiring.
