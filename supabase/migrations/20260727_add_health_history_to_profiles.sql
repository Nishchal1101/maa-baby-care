ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS blood_group text,
ADD COLUMN IF NOT EXISTS previously_pregnant boolean,
ADD COLUMN IF NOT EXISTS previous_pregnancies_count integer,
ADD COLUMN IF NOT EXISTS previous_pregnancy_complications text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS medical_conditions text[] DEFAULT '{}';