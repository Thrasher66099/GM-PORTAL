-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends Auth)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  username text unique,
  avatar_url text,
  role text check (role in ('gm', 'player')) default 'player',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Campaigns
create table campaigns (
  id uuid default uuid_generate_v4() primary key,
  gm_id uuid references profiles(id) not null,
  title text not null,
  description text,
  system text default '5e',
  art_style_config jsonb, -- Stores prompt modifiers for AI generation
  invite_code text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Campaign Members (Players joining campaigns)
create table campaign_members (
  id uuid default uuid_generate_v4() primary key,
  campaign_id uuid references campaigns(id) on delete cascade not null,
  player_id uuid references profiles(id) on delete cascade not null,
  character_id uuid, -- Link to their character in this campaign
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(campaign_id, player_id)
);

-- Characters
create table characters (
  id uuid default uuid_generate_v4() primary key,
  player_id uuid references profiles(id) not null,
  campaign_id uuid references campaigns(id), -- Can be null if not assigned yet
  name text not null,
  class text,
  race text,
  level int default 1,
  stats jsonb default '{}', -- { str: 10, dex: 12, ... }
  inventory jsonb default '[]', -- Array of item objects
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Items (Global & Custom)
create table items (
  id uuid default uuid_generate_v4() primary key,
  campaign_id uuid references campaigns(id), -- Null for global items
  name text not null,
  description text,
  stats jsonb,
  image_url text, -- Generated AI image
  created_by uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Maps
create table maps (
  id uuid default uuid_generate_v4() primary key,
  campaign_id uuid references campaigns(id) not null,
  name text not null,
  image_url text not null,
  grid_data jsonb, -- Grid size, offset
  fog_data jsonb, -- Mask data for fog of war
  tokens jsonb default '[]', -- Array of token positions { id, x, y, type }
  is_active boolean default false, -- If this is the map currently shown to players
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Chat/Roll Logs
create table game_logs (
  id uuid default uuid_generate_v4() primary key,
  campaign_id uuid references campaigns(id) not null,
  sender_id uuid references profiles(id),
  type text check (type in ('chat', 'roll', 'system')),
  content jsonb not null, -- { message: "Hello", roll: { result: 15, formula: "1d20+2" } }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies

-- Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Campaigns
alter table campaigns enable row level security;
create policy "Campaigns are viewable by everyone (for now)." on campaigns for select using (true);
create policy "GMs can create campaigns." on campaigns for insert with check (auth.uid() = gm_id);
create policy "GMs can update own campaigns." on campaigns for update using (auth.uid() = gm_id);

-- Campaign Members
alter table campaign_members enable row level security;
create policy "Members viewable by campaign participants." on campaign_members for select using (true);
create policy "Players can join campaigns." on campaign_members for insert with check (auth.uid() = player_id);

-- Characters
alter table characters enable row level security;
create policy "Characters viewable by everyone." on characters for select using (true);
create policy "Players can create characters." on characters for insert with check (auth.uid() = player_id);
create policy "Players can update own characters." on characters for update using (auth.uid() = player_id);

-- Items
alter table items enable row level security;
create policy "Items viewable by everyone." on items for select using (true);
create policy "Users can create items." on items for insert with check (auth.uid() = created_by);

-- Maps
alter table maps enable row level security;
create policy "Maps viewable by everyone." on maps for select using (true);
create policy "GMs can manage maps." on maps for all using (exists (select 1 from campaigns where id = maps.campaign_id and gm_id = auth.uid()));

-- Game Logs
alter table game_logs enable row level security;
create policy "Logs viewable by everyone." on game_logs for select using (true);
create policy "Users can insert logs." on game_logs for insert with check (auth.uid() = sender_id);
