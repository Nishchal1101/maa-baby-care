create table if not exists public.maternal_vaccinations (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references auth.users(id) on delete cascade,

  vaccine text not null,
  dose text not null,

  date_received date,

pregnancy_context text not null default 'current'
  check (pregnancy_context in ('current', 'previous')),

status text not null default 'completed'
    check (status in ('completed', 'scheduled')),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists maternal_vaccinations_user_id_idx
  on public.maternal_vaccinations(user_id);

alter table public.maternal_vaccinations enable row level security;

create policy "Users can view their own maternal vaccinations"
  on public.maternal_vaccinations
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own maternal vaccinations"
  on public.maternal_vaccinations
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own maternal vaccinations"
  on public.maternal_vaccinations
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own maternal vaccinations"
  on public.maternal_vaccinations
  for delete
  using (auth.uid() = user_id);