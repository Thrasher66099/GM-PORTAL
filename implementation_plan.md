# Implementation Plan: Tabletop Nexus

This document outlines the technical steps required to build Tabletop Nexus, based on the [Design Document](./design_doc.md).

## Phase 1: Foundation & Database (Current Status: Partial)
**Goal**: Establish the database schema, authentication flows, and base application shell.

### 1.1 Database Schema (Supabase/PostgreSQL)
We need to run the following SQL in the Supabase SQL Editor to set up our core tables.

```sql
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
```

### 1.2 Row Level Security (RLS) Policies
*   **Profiles**: Users can read all profiles, but only update their own.
*   **Campaigns**: GMs can CRUD their own campaigns. Players can read campaigns they are members of.
*   **Characters**: Players can CRUD their own characters. GMs can read/update characters in their campaigns.
*   **Maps/Logs**: Visible to members of the campaign.

---

## Phase 2: GM Portal - Campaign Management
**Goal**: Allow GMs to create campaigns and manage the basic settings.

### 2.1 Components
*   [x] `CampaignList`: Grid view of campaigns.
*   [x] `CreateCampaignModal`: Form to set title and system.
*   [x] `CampaignDashboard`: Main layout for a specific campaign.
*   [x] `InviteLinkGenerator`: Component to display/refresh the invite code.

### 2.2 Server Actions
*   [x] `createCampaign(formData)`
*   [ ] `updateCampaignSettings(id, data)`
*   [ ] `deleteCampaign(id)`

---

## Phase 3: Player Portal - Character Sheet
**Goal**: A functional, interactive character sheet.

### 3.1 Components
*   [x] `CharacterBuilder`: Wizard to step through creation (Race -> Class -> Stats).
*   [ ] `StatBlock`: Component to display Str/Dex/Con etc. with modifiers.
*   [ ] `InventoryGrid`: Grid displaying items.
*   [x] `DiceRoller`: Floating or sidebar component accessible at all times.

### 3.2 Logic
*   [x] `createCharacter` server action.
*   [x] **Real-time Sync**: Subscribing to `characters` table changes so the GM sees updates instantly.

---

## Phase 4: The Game Table (Real-time)
**Goal**: The shared space where the game happens.

### 4.1 Map System
*   [x] **Canvas/WebGL Viewer**: Use `react-konva` or HTML5 Canvas for the map.
*   [ ] **Fog of War**: Implement a mask layer that the GM can erase/paint.
*   [x] **Token Layer**: Draggable tokens synced via Supabase Realtime.
*   [x] **Map Creation**: Upload and Generate (Stub) maps.

### 4.2 Dice & Chat
*   [x] **Supabase Realtime**: Listen for `INSERT` on `game_logs`.
*   [x] **Dice Animation**: Basic random number generation with history.
*   [ ] **Chat Window**: [DEFERRED] Standard chat interface with roll parsing (e.g., `/r 1d20`). Note: We are currently skipping the text chat input feature to focus on core gameplay mechanics first.

---

## Phase 5: AI Integration (The "Nexus")
**Goal**: Connect the app to LLMs and Image Generators.

### 5.1 API Routes
*   `/api/ai/generate-lore`: POST request to OpenAI/Gemini.
*   `/api/ai/generate-image`: POST request to DALL-E/Stability.

### 5.2 Features
*   **NPC Generator**: Form -> Prompt Engineering -> JSON Response -> Save to DB.
*   **Item Forger**: Form -> Prompt -> Image Gen -> Save to Storage -> Save to DB.

---

## Phase 6: Polish & Monetization
*   **Stripe Integration**: Webhooks for subscription status updates.
*   **Usage Limits**: Check DB counts before allowing AI generation.
*   **UI Polish**: Glassmorphism, animations, sound effects.
