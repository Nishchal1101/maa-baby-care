ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS previous_td_history text,
ADD COLUMN IF NOT EXISTS previous_pregnancy_end_date date;
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_previous_td_history_check
CHECK (
  previous_td_history IS NULL
  OR previous_td_history IN ('yes', 'no', 'not_sure')
);