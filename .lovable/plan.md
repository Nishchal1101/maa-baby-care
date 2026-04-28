# MatruCare — Pregnancy Care App for Indian Mothers

A mobile-first web app (installable as a PWA on any Android/iPhone) that guides Indian mothers from pregnancy through the baby's first year. Designed for the viewport of a phone, with large touch targets, soft colors, and Indian cultural context throughout.

## Who it's for
Expecting & new mothers in India who want a trusted companion in English, Hindi, and other Indian languages — with advice rooted in Indian food, lifestyle, healthcare system, and government schemes.

## Core experience (v1)

### 1. Onboarding & account
- Sign up with email or phone (OTP) + password
- Profile setup: name, due date (or last menstrual period → auto-calculates due date & current week), city/state, preferred language, veg/non-veg/eggetarian, any high-risk conditions (diabetes, BP, thyroid)
- Language switcher: English, Hindi, Tamil, Telugu, Bengali, Marathi (v1 ships EN + HI fully; others as the content scales)

### 2. Home dashboard
- "You are in Week 18" banner with baby size comparison (e.g., "size of a mango")
- Today's tip card, next appointment card, today's diet suggestion, kick counter shortcut
- Quick actions: Log symptom, Count kicks, Ask community

### 3. Week-by-week pregnancy tracker (weeks 1–40)
- Each week: baby development, mom's body changes, what to expect, warning signs to watch, recommended tests/scans for that week (as per Indian ANC schedule)
- "Baby today" illustration + size comparison using Indian fruits (guava, pomegranate, coconut, watermelon)

### 4. Diet & nutrition (Indian foods)
- Trimester-wise meal plans: veg / non-veg / eggetarian
- Indian breakfast/lunch/snack/dinner suggestions (dal, roti, sabzi, curd, ragi, etc.)
- Foods to avoid list (papaya, raw pineapple, excess caffeine, specific fish)
- Regional variations (North / South / East / West)
- Iron, calcium, folic acid, protein trackers

### 5. Appointment & checkup reminders
- Pre-loaded Indian ANC visit schedule (1st trimester booking, NT scan, anomaly scan, growth scans, TT/Tdap shots, iron-folic-acid tablets)
- Add custom appointments with doctor name, hospital, date/time, notes
- Browser + optional email/SMS reminders

### 6. Kick counter & symptom tracker
- Kick counter: start/stop timer, target 10 kicks in 2 hours (3rd trimester)
- Log daily: weight, BP, mood, symptoms (nausea, swelling, pain), and get flagged warnings ("contact doctor if…")
- Simple trend charts

### 7. Yoga & exercise
- Trimester-wise safe prenatal yoga poses with illustrated steps and short descriptions
- Kegels, breathing (pranayama), walking goals
- Clear "avoid these" list

### 8. Government schemes & hospital info
- Directory of Indian schemes: PMMVY (Pradhan Mantri Matru Vandana Yojana), JSY (Janani Suraksha Yojana), JSSK, Ayushman Bharat — eligibility, benefits, how to apply
- Emergency contacts: 102 (ambulance), 108, 1098 (child helpline)
- "Find hospitals near me" — user enters city, shows informational list (static curated list for v1; external API later)

### 9. Community Q&A forum
- Browse by topic (Nutrition, Symptoms, Labor, Newborn, Mental health)
- Post questions anonymously or with display name
- Reply, upvote, report inappropriate content
- Moderation queue for admins

### 10. Post-delivery & baby care
- Newborn care basics (bathing, umbilical cord, sleep)
- Breastfeeding guide + feed tracker
- India's Universal Immunization Programme schedule (BCG, OPV, Pentavalent, MR, etc.) with reminders
- Baby growth tracker (weight/height percentiles)
- Postpartum mental health check-ins

## Design language
- Warm, calming palette: soft rose, sage green, cream; subtle gradients
- Rounded cards, generous spacing, large readable fonts (body min 16px)
- Friendly illustrations over stock photos
- Fully mobile-first (works beautifully at 390px width); desktop is a centered column
- Installable as PWA with app icon and splash screen

## Technical details

- **Frontend**: TanStack Start (React 19 + Vite) with Tailwind v4, shadcn/ui components already in the project
- **Backend**: Lovable Cloud (Supabase) — auth, Postgres, RLS, storage for user avatars
- **Auth**: Email+password and Phone OTP (both supported natively by Lovable Cloud)
- **i18n**: `react-i18next` with JSON locale files per language (en, hi seeded; others scaffolded)
- **PWA**: manifest + service worker via `vite-plugin-pwa` for installability and offline tip caching
- **Key tables** (all with Row-Level Security, user can only read/write their own rows):
  - `profiles` (user_id, name, due_date, lmp_date, language, diet, city, state, high_risk_conditions)
  - `appointments` (user_id, title, doctor, hospital, datetime, notes, reminder_minutes)
  - `symptom_logs` (user_id, date, weight, bp_systolic, bp_diastolic, mood, symptoms[], notes)
  - `kick_sessions` (user_id, started_at, ended_at, kick_count)
  - `baby_profiles` (user_id, name, dob, sex) — created after delivery
  - `baby_growth_logs` (baby_id, date, weight_kg, height_cm)
  - `vaccinations` (baby_id, vaccine_code, scheduled_date, administered_date)
  - `community_posts` (id, user_id, topic, title, body, anonymous, created_at)
  - `community_replies` (id, post_id, user_id, body, created_at)
  - `post_votes` (post_id, user_id)
  - `reports` (post_id/reply_id, user_id, reason) — for moderation
  - `user_roles` separate table with `app_role` enum (`user`, `moderator`, `admin`) + `has_role()` security-definer function
- **Static content** (weekly info, diet plans, yoga poses, schemes, vaccine schedule) ships as versioned JSON in the repo — no DB needed, and translations live alongside each entry
- **Routes** (separate files for SSR/SEO): `/`, `/login`, `/signup`, `/onboarding`, `/_authenticated/home`, `/week/$week`, `/diet`, `/appointments`, `/tracker`, `/kick-counter`, `/yoga`, `/schemes`, `/community`, `/community/$postId`, `/baby`, `/baby/vaccinations`, `/settings`

## v1 scope & staged rollout

Because this is a big app, build in 3 phases after plan approval:

**Phase 1 — Foundation & pregnancy core**
Auth, onboarding, home dashboard, week-by-week tracker, Indian diet content, symptom/kick tracker, appointments with reminders, settings & language switch (EN + HI).

**Phase 2 — Wellness & support**
Yoga & exercise library, government schemes & emergency info, community forum with moderation.

**Phase 3 — Post-delivery**
Baby profile, immunization schedule, growth tracker, breastfeeding & newborn care guides, postpartum check-ins. Add more Indian languages.

## Out of scope for v1 (can add later)
- Native iOS/Android apps (the PWA covers mobile install)
- Telemedicine / video calls with doctors
- Real-time hospital directory via live API
- Payment / premium tier
- AI chatbot for health Q&A (can be added via Lovable AI later)

After you approve, I'll start with Phase 1.