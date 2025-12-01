# Design Document: Tabletop Nexus (Working Title)

## 1. Executive Summary
Tabletop Nexus is a comprehensive digital companion for Tabletop Role-Playing Games (TTRPGs), designed to streamline the experience for Game Masters (GMs) and Players. It leverages modern LLM (Large Language Model) technology to assist in campaign creation, world-building, and asset generation, while providing robust tools for session management, character tracking, and interactive mapping.

## 2. Vision & Goals
*   **Empower GMs**: Reduce prep time with AI-assisted generation of lore, NPCs, and items.
*   **Immerse Players**: Provide a visual and interactive portal for character management and dungeon exploration.
*   **Centralize Data**: Keep all campaign information, stats, and maps in one "Point of Truth".
*   **Monetization**: Sustainable subscription model offering premium AI features and storage.

## 3. Core Features

### 3.1 Authentication & Roles
*   **Unified Login**: Single entry point for all users.
*   **Role-Based Access**:
    *   **GM (Game Master)**: Has administrative control over campaigns, can invite players, and access generation tools.
    *   **Player**: Can join campaigns via invite code, manage their specific character, and view player-facing maps/journals.

### 3.2 GM Portal (The Creator's Forge)
The command center for the Game Master.
*   **Campaign Manager**: Create and organize multiple campaigns.
*   **AI Asset Generator**:
    *   **Maps**: Generate dungeon layouts or upload existing maps.
    *   **Items**: Create magical items with stats, lore, and *unique generated artwork*.
    *   **NPCs**: Generate detailed NPCs with stats, backstories, quirks, and portraits.
    *   **Monsters**: Generate stat blocks and visual tokens for enemies.
*   **Session Management**:
    *   **Scene Control**: Manage which map or scene is currently active for players.
    *   **Fog of War**: Control what players can see on the map.
    *   **Combat Tracker**: Manage initiative and HP for all entities.

### 3.3 Player Portal (The Adventurer's Kit)
A dedicated view for players to interact with the game.
*   **Digital Character Sheet**:
    *   **Live Stats**: Real-time tracking of HP, AC, Speed, etc.
    *   **Inventory**: Visual grid showing items (with their generated art).
    *   **Spells & Abilities**: Quick reference cards for class features.
*   **Interactive Dice Roller**:
    *   **Customizable Dice**: Select standard dice (d4, d6, d8, d10, d12, d20) or custom values.
    *   **Multi-Roll**: Roll multiple dice at once (e.g., "4d6" or "2d20 + 5").
    *   **Visual Feedback**: 3D or animated 2D dice rolling on screen.
    *   **Log**: History of rolls shared with the GM (to prevent cheating).
*   **Journal & Notes**: Personal quest logs and session notes.

### 3.4 Interactive Maps & Real-time Play
*   **Shared Map View**:
    *   Players see the map revealed by the GM.
    *   Real-time token movement (synced via Supabase Realtime).
*   **Live Chat/Log**: A scrolling log of dice rolls, loot acquisition, and chat messages.

## 4. User Experience (UX) & Design
*   **Aesthetics**: "Premium & Immersive". Dark mode by default, utilizing glassmorphism and high-quality typography (e.g., Inter, Cinzel for headers).
*   **Responsiveness**: Fully functional on Desktop (primary for GM) and Tablet/Mobile (primary for Players).
*   **Ease of Use**: Minimal clicks to reach critical information during combat.

## 5. Technical Architecture

### 5.1 Tech Stack
*   **Frontend**: Next.js (React) - For a fast, SEO-friendly, and highly interactive web application.
*   **Styling**: Vanilla CSS / TailwindCSS (if requested) with a focus on custom design tokens for the "Premium" feel.
*   **Backend**: Next.js API Routes (Serverless).
*   **Database**: **Supabase** (PostgreSQL) - Confirmed for Auth, Database, and Realtime subscriptions.
*   **Real-time**: Supabase Realtime (for map updates and dice rolls).
*   **AI Integration**:
    *   **Text**: OpenAI API (GPT-4o) or Google Gemini API (Flash/Pro).
    *   **Images**: OpenAI DALL-E 3 (Primary) or Stability AI (Secondary for specific styles).

### 5.2 Data Model (High Level)
*   `User`: Auth details, Subscription Tier.
*   `Campaign`: GM_ID, Settings, ArtStyleConfig.
*   `Character`: Player_ID, Campaign_ID, Stats JSON, Inventory.
*   `Item`: Name, Description, Stats, ImageURL.
*   `Map`: ImageURL, GridData, FogData.

## 6. Monetization Strategy
**Standard Subscription Model (SaaS)**

*   **Free Tier (The Adventurer)**
    *   Join campaigns as a player.
    *   Create 1 Campaign (limited storage).
    *   Basic Character Sheet.
    *   No AI Generation.

*   **Silver Tier (The Storyteller) - $9.99/mo**
    *   Unlimited Campaigns.
    *   Advanced Character Sheets.
    *   50 AI Image Generations / month.
    *   Unlimited AI Text Generation (Fair use).

*   **Gold Tier (The Dungeon Master) - $19.99/mo**
    *   All Silver features.
    *   Unlimited AI Image Generations (or high cap).
    *   Priority Support.
    *   Access to Beta Features (e.g., Dynamic Lighting).

## 7. Roadmap
1.  **Phase 1: Foundation** - Auth, Basic Campaign/Character CRUD, UI Shell.
2.  **Phase 2: The Table** - Map viewer, Dice roller, Real-time sync.
3.  **Phase 3: The Brain** - LLM integration for text generation (NPCs, Plot).
4.  **Phase 4: The Eye** - Image generation pipeline for Items/Flavor.
5.  **Phase 5: Polish & Paywall** - Stripe integration, Subscription gating, Beta launch.
