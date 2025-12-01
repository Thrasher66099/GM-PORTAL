# Design Document: Tabletop Nexus (Working Title)

## 1. Executive Summary
Tabletop Nexus is a comprehensive digital companion for Tabletop Role-Playing Games (TTRPGs), designed to streamline the experience for Game Masters (GMs) and Players. It leverages modern LLM (Large Language Model) technology to assist in campaign creation, world-building, and asset generation, while providing robust tools for session management, character tracking, and interactive mapping.

## 2. Vision & Goals
*   **Empower GMs**: Reduce prep time with AI-assisted generation of lore, NPCs, and items.
*   **Immerse Players**: Provide a visual and interactive portal for character management and dungeon exploration.
*   **Centralize Data**: Keep all campaign information, stats, and maps in one "Point of Truth".
*   **Monetization**: Sustainable subscription model offering premium AI features and storage.

## 3. Core Features

### 3.1 GM Portal
The command center for the Game Master.
*   **Campaign Manager**: Create and organize multiple campaigns.
*   **AI Campaign Assistant**:
    *   **Lore Generator**: Create histories, pantheons, and factions based on prompts.
    *   **Session Planner**: Outline plot points and encounters.
    *   **NPC Generator**: Create detailed NPCs with stats, backstories, and quirks.
*   **Asset Studio (Flavor Creation)**:
    *   **Style Selector**: Define the artistic direction of the campaign (e.g., "Dark Fantasy Oil Painting", "Cel-Shaded Anime", "Classic Sketch").
    *   **Item Image Generator**: Generate unique visuals for loot and artifacts based on the selected style.
    *   **Scene Visualizer**: Generate mood images for locations.

### 3.2 Player Portal
A dedicated view for players to interact with the game.
*   **Digital Character Sheets**: Full support for stats, skills, spells, and inventory.
    *   *Auto-calculations* for modifiers and combat stats.
*   **Journal**: Personal notes and quest logs.
*   **Loot Bag**: Visual inventory showing generated item images.

### 3.3 Interactive Maps & Combat
*   **Dungeon Map Viewer**:
    *   GM uploads or generates maps.
    *   **Fog of War**: GM controls visibility.
    *   **Token Management**: Move player and monster tokens in real-time.
*   **Dice Roller**: Integrated 3D dice rolling with shared results in the chat/log.

### 3.4 Rules & Mechanics
*   **System Agnostic Core** (initially focused on 5E OGL for structure).
*   **Homebrew Support**: Allow GMs to edit stats and items manually.

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
