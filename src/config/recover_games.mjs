import fs from 'fs';
import path from 'path';

const gamesDataPath = 'src/config/games-data.json';
const mirrorsPath = 'mirrors_results.json';

const currentGames = JSON.parse(fs.readFileSync(gamesDataPath, 'utf8'));
const mirrors = JSON.parse(fs.readFileSync(mirrorsPath, 'utf8'));

// Slug map for titles that don't match slug directly
const titleToSlug = {
  "Retro Bowl": "retro-bowl",
  "Wacky Flip": "wacky-flip",
  "Tunnel Rush": "tunnel-rush",
  "Eggy Car": "eggy-car",
  "Run 3": "run-3",
  "Moto X3M": "moto-x3m",
  "Drift Hunters": "drift-hunters",
  "Shell Shockers": "shell-shockers",
  "1v1.lol": "1v1-lol",
  "Paper.io 2": "paper-io-2",
  "Hole.io": "hole-io",
  "Vex 7": "vex-7",
  "Fireboy and Watergirl 1": "fireboy-and-watergirl-1",
  "Happy Wheels": "happy-wheels",
  "Smash Karts": "smash-karts",
  "Temple Run 2": "temple-run-2",
  "Cookie Clicker": "cookie-clicker",
  "Candy Crush": "candy-crush",
  "Doodle Jump": "doodle-jump",
  "Flappy Bird": "flappy-bird"
};

const categories = {
  "Retro Bowl": "Sports",
  "Wacky Flip": "Arcade",
  "Tunnel Rush": "Arcade",
  "Eggy Car": "Racing",
  "Run 3": "Racing",
  "Moto X3M": "Racing",
  "Drift Hunters": "Racing",
  "Shell Shockers": "Action",
  "1v1.lol": "Action",
  "Paper.io 2": "Strategy",
  "Hole.io": "Action",
  "Vex 7": "Action",
  "Fireboy and Watergirl 1": "Adventure",
  "Happy Wheels": "Action",
  "Smash Karts": "Action",
  "Temple Run 2": "Arcade",
  "Cookie Clicker": "Arcade",
  "Candy Crush": "Strategy",
  "Doodle Jump": "Arcade",
  "Flappy Bird": "Arcade"
};

const tags = {
  "Retro Bowl": "Sports, American Football, Retro",
  "Wacky Flip": "Arcade, Physics, Fun",
  "Tunnel Rush": "Arcade, High-speed, Reaction",
  "Eggy Car": "Racing, Physics, Challenging",
  "Run 3": "Racing, Endless, Space",
  "Moto X3M": "Racing, Bike, Stunts",
  "Drift Hunters": "Racing, Car, Drifting",
  "Shell Shockers": "Action, FPS, Egg",
  "1v1.lol": "Action, Building, Shooter",
  "Paper.io 2": "Strategy, Multiplayer, Territorial",
  "Hole.io": "Action, Arcade, Multiplayer",
  "Vex 7": "Action, Platformer, Hardcore",
  "Fireboy and Watergirl 1": "Adventure, Puzzle, Co-op",
  "Happy Wheels": "Action, Physics, Gory",
  "Smash Karts": "Action, Racing, Combat",
  "Temple Run 2": "Arcade, Endless, Running",
  "Cookie Clicker": "Arcade, Idle, Clicker",
  "Candy Crush": "Strategy, Puzzle, Match-3",
  "Doodle Jump": "Arcade, Jumping, Platformer",
  "Flappy Bird": "Arcade, Hard, Minimalist"
};

const newGames = [];

for (const [title, urls] of Object.entries(mirrors)) {
  const slug = titleToSlug[title] || title.toLowerCase().replace(/\s+/g, '-');
  
  // Check if it's already in core games
  if (currentGames.find(g => g.slug === slug)) continue;

  newGames.push({
    slug,
    title,
    description: `Play ${title} unblocked on Unblocked Games 76. ${title} is a popular ${categories[title] || 'Arcade'} game that you can play for free in your browser.`,
    thumbnail: `/assets/games/${slug}.webp`,
    screenshots: [
      `/assets/screenshots/${slug}/1.webp`,
      `/assets/screenshots/${slug}/2.webp`,
      `/assets/screenshots/${slug}/3.webp`
    ],
    screenshot_alts: [
      `${title} gameplay screenshot 1`,
      `${title} gameplay screenshot 2`,
      `${title} gameplay screenshot 3`
    ],
    iframe_url: urls[0],
    mirror_urls: urls.slice(1, 6),
    category: categories[title] || "Arcade",
    tags: tags[title] || "Arcade",
    is_featured: false,
    created_at: "2026-04-20",
    expert_tips: `Stay focused and practice regularly to improve your skills in ${title}.`,
    secrets: [
      `Secret level: Try reaching a high score to unlock hidden features.`,
      `Easter egg: Look for hidden items in the main menu.`
    ]
  });
}

// Add other games that are in public/assets/games but not in currentGames or newGames
const allIcons = fs.readdirSync('public/assets/games').filter(f => f.endsWith('.webp')).map(f => f.replace('.webp', ''));
for (const slug of allIcons) {
  if (currentGames.find(g => g.slug === slug)) continue;
  if (newGames.find(g => g.slug === slug)) continue;

  newGames.push({
    slug,
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: `Play ${slug} unblocked on Unblocked Games 76.`,
    thumbnail: `/assets/games/${slug}.webp`,
    iframe_url: "",
    mirror_urls: [],
    category: "Arcade",
    tags: "Arcade",
    is_featured: false,
    created_at: "2026-04-20",
    expert_tips: "Focus and have fun!",
    secrets: ["Keep playing to discover secrets."]
  });
}

const finalGames = [...currentGames, ...newGames];
fs.writeFileSync(gamesDataPath, JSON.stringify(finalGames, null, 2), 'utf8');
console.log(`Restored ${finalGames.length} games to ${gamesDataPath}`);
