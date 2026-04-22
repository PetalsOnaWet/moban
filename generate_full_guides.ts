import fs from 'fs';
import path from 'path';
import { callChatCompletion } from './src/lib/core/ai';

/**
 * Script to generate high-quality, 1000+ word guides for all games.
 */

async function generateFullGuide(game: any) {
  console.log(`\n>> [Guide] Generating 1000+ word master guide for: ${game.title}...`);

  const prompt = `
Write a comprehensive, professional, and highly engaging "Full Walkthrough & Strategy Guide" for the game "${game.title}". 
The goal is to provide maximum value to players and dominate SEO for "how to play ${game.title}" and "${game.title} walkthrough".

STRICT REQUIREMENTS:
1. Length: Minimum 1000 words.
2. Language: English.
3. Style: Expert gamer, enthusiastic, helpful, and detailed.
4. Formatting: Use clear headings, bullet points, and numbered lists.

STRUCTURE TO FOLLOW:
- Introduction: The history of ${game.title}, its rise in popularity, and what makes it unique in the unblocked games genre.
- Core Gameplay Mechanics: A deep dive into physics, controls, and objectives. Explain every nuance of the mechanics.
- Comprehensive Controls Guide: List controls for PC (Keyboard/Mouse) and mobile (Touch), including secret keyboard shortcuts if any.
- Level-by-Level Walkthrough: General advice on how to tackle different stages or scenarios. Mention specific hurdles and how to clear them.
- Advanced Strategies & Pro Tips: High-level tactics to achieve top scores, win faster, or unlock secret features.
- Why Play on Unblocked Games 76: Emphasize performance, reliability, and the 100% free experience.
- Frequently Asked Questions (FAQ): At least 5 detailed questions and answers about common player struggles.

Focus on providing "Insider Knowledge" that casual players wouldn't know.
    `;

  try {
    const response: any = await callChatCompletion({
      messages: [
        { role: "system", content: "You are a professional gaming journalist and SEO specialist. You write deep-dive walkthroughs that exceed 1000 words." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
    });

    const content = response.choices[0].message.content;
    
    if (content.length < 3000) { // Rough check for ~1000 words (avg 6 chars per word)
        console.warn(`[Guide] Warning: Content length for ${game.title} might be short (${content.length} chars).`);
    }

    return content;
  } catch (err: any) {
    console.error(`[Guide] Failed for ${game.title}:`, err.message);
    return null;
  }
}

async function main() {
  const jsonPath = path.join(process.cwd(), 'src/config/games-data.json');
  const games = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`--- Starting 1000+ Word Guide Generation for ${games.length} games ---`);

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    
    // Skip if already has a long guide
    if (game.full_guide && game.full_guide.length > 3000) {
      console.log(`[Skip] ${game.title} already has a guide.`);
      continue;
    }

    const guide = await generateFullGuide(game);
    if (guide) {
      games[i].full_guide = guide;
      
      // Save after each generation to prevent data loss on failure
      fs.writeFileSync(jsonPath, JSON.stringify(games, null, 2), 'utf-8');
      console.log(`[Success] Guide saved for ${game.title} (${guide.length} chars).`);
    }

    // Optional: Add a small delay to respect rate limits if needed
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log("\n--- Master Guide Generation Task Complete ---");
}

main();
