# Game Content Generation SOP (Standard Operating Procedure)

This document defines the standardized workflow for adding or updating high-quality game content to the platform. Follow these steps to ensure maximum SEO impact and user familiarity.

---

## Phase 1: Game Discovery & Resource Extraction
1.  **Target Selection**: Identify popular unblocked games (e.g., from top sites or trend lists).
2.  **Pure Iframe Extraction**:
    *   Visit the source site using a browser.
    *   Inspect the DOM to find the `<iframe>` source.
    *   Priority: Direct links on `gitlab.io`, `github.io`, or `pages.dev`. Avoid portal wrappers.
    *   **Mirrors**: Find at least 3-5 functional mirror URLs for high availability.

## Phase 2: AI-Powered Icon Redrawing
1.  **Original Reference**: Search for the official game icon to identify key colors and subjects.
2.  **Generation**:
    *   Use GPTNB `nano-banana-2-1k` model.
    *   **Prompting**: Focus on "Style Consistency". Describe the original icon accurately but ask for a high-quality, modern render.
    *   **Format**: Save to `public/assets/games/[slug].webp`.

## Phase 3: Automated Screenshot Capture
1.  **Environment**: Run the local dev server (`npm run dev`).
2.  **Capture**:
    *   Use the Playwright script (`capture_screenshots.mjs`) to visit `localhost:3000/[slug]`.
    *   Trigger "Play", wait for game load, and capture 3 frames (Initial, Interaction, Mid-game).
    *   **Path**: `public/assets/screenshots/[slug]/[1-3].png`.

## Phase 4: Long-Form Content Generation (1000+ Words)
1.  **SEO Strategy**: Target "How to play", "Walkthrough", "Unblocked", and "Strategies" keywords.
2.  **AI Model**: Use `gemini-3-flash-preview` via the `callChatCompletion` service.
3.  **Structure**:
    *   **Introduction**: History and overview of the game.
    *   **Core Mechanics**: Deep dive into how the game works.
    *   **Detailed Controls**: Comprehensive list for all platforms.
    *   **Advanced Strategies**: Expert tips for high scores/winning.
    *   **Level/Scenario Walkthrough**: Specific advice for different stages.
    *   **FAQ**: Common user questions.
4.  **Length**: Strictly 1000+ words in English.

## Phase 5: JSON Integration & Deployment
1.  **Update `games-data.json`**:
    *   Fill in `thumbnail`, `iframe_url`, `mirror_urls`.
    *   Embed 3 screenshots in the `description` (top, middle, bottom).
    *   Store the 1000+ word content in the `full_guide` field.
    *   Update `screenshots` and `screenshot_alts` metadata.
2.  **Verification**: Check the main game page `/[slug]` and ensure the "Master Strategy Guide" section appears at the bottom with the generated content.

---

## Script References
- **Icon Redraw**: `redraw_icons.ts`
- **Screenshots**: `capture_screenshots.mjs`
- **Full Guide**: `generate_full_guides.ts` (coming soon)
- **AI Client**: `src/lib/core/ai.ts`
