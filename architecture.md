# Tabletop Nexus Architecture Overview

This document outlines the high-level architecture of the Tabletop Nexus application, detailing where key components live and how they interact.

## 1. Tech Stack
*   **Framework**: Next.js 14+ (App Router)
*   **Language**: TypeScript
*   **Database & Auth**: Supabase (PostgreSQL)
*   **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid)
*   **Real-time**: Supabase Realtime (Websockets)
*   **Graphics**: React Konva (Canvas)

## 2. Directory Structure

### `src/app` (Routes & Pages)
*   **(Root)**: Landing page (`page.tsx`), global layout (`layout.tsx`), global styles (`globals.css`).
*   **`auth/`**: Authentication logic.
    *   `actions.ts`: Server actions for Login/Signup.
    *   `login/`, `signup/`: Pages rendering the `AuthForm`.
*   **`gm/`**: Game Master Portal.
    *   `layout.tsx`: GM Sidebar navigation.
    *   `campaigns/`: Campaign management.
        *   `[id]/`: Campaign Dashboard.
            *   `maps/`: Map management.
                *   `[mapId]/`: **Interactive Map Viewer** page.
                *   `new/`: Map creation form.
*   **`player/`**: Player Portal.
    *   `layout.tsx`: Player Sidebar navigation & **Global Dice Roller**.
    *   `join/`: Join campaign flow.
    *   `campaign/[id]/`: Player Campaign Dashboard (Character Sheet, Map, Logs).
    *   `character/`: Character creation and management.

### `src/components` (UI Components)
*   **`AuthForm.tsx`**: Reusable Login/Signup form.
*   **`DiceRoller.tsx`**: Floating dice widget. **Crucial**: Handles real-time logging of rolls to Supabase.
*   **`GameLog.tsx`**: Displays chat and dice rolls, subscribed to Supabase Realtime.
*   **`Navbar.tsx`**: Top navigation for landing page.
*   **`campaign/`**: Campaign-specific components (e.g., `CreateCampaignForm`).
*   **`player/`**: Player-specific components (e.g., `CharacterCreationForm`).
*   **`map/`**: Map system components.
    *   **`MapViewer.tsx`**: The core canvas component. Handles:
        *   Image rendering
        *   Grid drawing
        *   Token rendering & dragging
        *   Zoom/Pan logic
        *   Real-time token syncing
    *   `CreateMapForm.tsx`: Form for uploading/generating maps.

### `src/lib` (Utilities)
*   **`supabase/`**: Supabase configuration.
    *   `client.ts`: Browser client.
    *   `server.ts`: Server component client (cookie handling).
    *   `middleware.ts`: Session management middleware.

## 3. Key Data Flows

### Authentication
1.  User submits `AuthForm`.
2.  `auth/actions.ts` calls `supabase.auth.signInWithPassword`.
3.  Middleware refreshes session on navigation.

### Campaign Management
1.  GM creates campaign via `CreateCampaignForm` -> `createCampaign` server action.
2.  Campaign is saved to `campaigns` table.
3.  Player joins via `JoinCampaignForm` -> `joinCampaign` server action (validates Invite Code).
4.  Player added to `campaign_members`.

### Real-time Dice Rolling
1.  User clicks dice in `DiceRoller`.
2.  `DiceRoller` inserts a row into `game_logs` table via Supabase Client.
3.  `GameLog` component (subscribed to `game_logs`) receives `INSERT` event.
4.  New log is appended to the state and displayed instantly.

### Interactive Map System
1.  GM creates map via `CreateMapForm`.
2.  Map data (image URL, grid settings) saved to `maps` table.
3.  **Viewing**: `MapViewer` fetches map data.
4.  **Token Movement**:
    *   GM drags token on Canvas.
    *   `onDragEnd` triggers update to `maps` table (`tokens` JSONB column).
    *   Supabase Realtime broadcasts `UPDATE` event.
    *   All connected clients (Players/GM) receive new token data and update their canvas.

## 4. Database Schema (Simplified)
*   `profiles`: Users (GM/Player roles).
*   `campaigns`: Game instances.
*   `campaign_members`: Link between Users and Campaigns.
*   `characters`: Player characters (Stats, Inventory).
*   `maps`: Map images, grid settings, and **Token State**.
*   `game_logs`: Chat messages and Dice Rolls.

## 5. Future Considerations
*   **Fog of War**: Will require a new JSONB column in `maps` or a separate table for complex mask data.
*   **AI Generation**: Will interact with external APIs via Next.js API Routes (to hide keys).
