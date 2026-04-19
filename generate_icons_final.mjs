import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const API_URL = 'https://api.gptnb.ai/v1';
const API_KEY_TXT = 'sk-3oxaXxNeNJIBMVYBF36867533c554f0689A9D9E268A7AfF3';
const API_KEY_IMG = 'sk-T5GcjhAMvwbIXXcA4d6a880dB1D74f398233A050342e3aBd';

const GAMES_DATA_PATH = path.resolve(__dirname, './src/config/games-data.json');
const OUTPUT_DIR = path.resolve(__dirname, './public/assets/games');

// --- HELPERS ---

async function callChat(messages) {
    const response = await fetch(`${API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY_TXT}`
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages,
            temperature: 0.5
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

async function generateImage(prompt) {
    const response = await fetch(`${API_URL}/images/generations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY_IMG}`
        },
        body: JSON.stringify({
            model: 'nano-banana-2-1k',
            prompt: prompt,
            n: 1,
            size: '1024x1024'
        })
    });
    const data = await response.json();
    return data.data[0].url || data.data[0].b64_json;
}

async function saveImage(imgData, filePath) {
    if (imgData.startsWith('http')) {
        const response = await fetch(imgData);
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));
    } else {
        const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
        fs.writeFileSync(filePath, base64Data, 'base64');
    }
}

async function pLimit(tasks, limit) {
    const results = [];
    let index = 0;
    async function worker() {
        while (index < tasks.length) {
            const taskIndex = index++;
            try {
                results[taskIndex] = await tasks[taskIndex]();
            } catch (err) {
                results[taskIndex] = { error: err.message };
            }
        }
    }
    const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
    await Promise.all(workers);
    return results;
}

// --- MAIN ---

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const games = JSON.parse(fs.readFileSync(GAMES_DATA_PATH, 'utf-8'));
    const CONCURRENCY = 3;

    console.log(`\n🚀 Regenerating images with ORIGINAL ART STYLE...\n`);

    const tasks = games.map((game) => async () => {
        const filePath = path.join(OUTPUT_DIR, `${game.slug}.png`);
        console.log(`[PROCESS] ${game.title}`);

        try {
            // 1. Generate Prompt
            const systemPrompt = `You are a professional game asset artist. Your goal is to recreate an EXACT HIGH-RESOLUTION REPLICA of the official icon for "${game.title}".
CRITICAL REQUIREMENTS:
- ABSOLUTE IDENTITY: The artwork MUST be identical to the official ${game.title} icon used globally. Do not change the character, the pose, or the color scheme.
- STYLE: Recreate the exact art style of the original icon (e.g., if it's 2D vector, keep it 2D vector; if it's pixel art, keep it pixel art).
- FULL-BLEED: The icon's content must fill the entire square canvas from edge to edge. 
- NO CONTAINERS: NO rounded corners, NO frames, NO borders, NO button-like backgrounds. 
- The user wants the icon to be recognizable as the official ${game.title} at a glance.`;

            const imagePrompt = await callChat([
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Game Title: ${game.title}\nCategory: ${game.category}\nTags: ${game.tags}\n\nGenerate the standalone English prompt for the image model.` }
            ]);

            const imgData = await generateImage(imagePrompt);
            await saveImage(imgData, filePath);
            console.log(`[SUCCESS] ${game.title} - Style: ${imagePrompt.slice(0, 30)}...`);

        } catch (error) {
            console.error(`[ERROR] ${game.title}:`, error.message);
        }
    });

    await pLimit(tasks, CONCURRENCY);
    console.log(`\n✅ All images regenerated with correct original styles.`);
}

main();
