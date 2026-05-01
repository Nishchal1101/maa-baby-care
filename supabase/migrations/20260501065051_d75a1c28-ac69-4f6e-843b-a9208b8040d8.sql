-- Baby profiles
CREATE TABLE public.baby_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT,
  dob DATE NOT NULL,
  sex TEXT CHECK (sex IN ('male','female','other')),
  birth_weight_kg NUMERIC,
  birth_length_cm NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.baby_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own baby select" ON public.baby_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own baby insert" ON public.baby_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own baby update" ON public.baby_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own baby delete" ON public.baby_profiles FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER baby_profiles_updated_at BEFORE UPDATE ON public.baby_profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Baby growth logs
CREATE TABLE public.baby_growth_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  baby_id UUID NOT NULL,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  weight_kg NUMERIC,
  height_cm NUMERIC,
  head_circumference_cm NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.baby_growth_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own growth select" ON public.baby_growth_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own growth insert" ON public.baby_growth_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own growth update" ON public.baby_growth_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own growth delete" ON public.baby_growth_logs FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX baby_growth_logs_baby_idx ON public.baby_growth_logs(baby_id, log_date DESC);

-- Vaccinations
CREATE TABLE public.vaccinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  baby_id UUID NOT NULL,
  vaccine_code TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  administered_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.vaccinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own vac select" ON public.vaccinations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own vac insert" ON public.vaccinations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own vac update" ON public.vaccinations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own vac delete" ON public.vaccinations FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX vaccinations_baby_idx ON public.vaccinations(baby_id, scheduled_date);
CREATE TRIGGER vaccinations_updated_at BEFORE UPDATE ON public.vaccinations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Feed logs
CREATE TABLE public.feed_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  baby_id UUID NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  feed_type TEXT NOT NULL CHECK (feed_type IN ('breast_left','breast_right','formula','expressed','solid')),
  duration_minutes INTEGER,
  amount_ml NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.feed_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own feed select" ON public.feed_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own feed insert" ON public.feed_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own feed update" ON public.feed_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own feed delete" ON public.feed_logs FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX feed_logs_baby_idx ON public.feed_logs(baby_id, started_at DESC);

-- Postpartum check-ins
CREATE TABLE public.postpartum_checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  mood_score INTEGER CHECK (mood_score BETWEEN 1 AND 5),
  sleep_hours NUMERIC,
  epds_score INTEGER,
  feeling_overwhelmed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.postpartum_checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own ppc select" ON public.postpartum_checkins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own ppc insert" ON public.postpartum_checkins FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own ppc update" ON public.postpartum_checkins FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own ppc delete" ON public.postpartum_checkins FOR DELETE USING (auth.uid() = user_id);