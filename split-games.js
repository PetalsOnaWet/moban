const fs = require('fs');
const path = require('path');

const gamesDataPath = path.join(__dirname, 'src/config/games-data.json');
const outputDir = path.join(__dirname, 'src/data/games');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const games = JSON.parse(fs.readFileSync(gamesDataPath, 'utf8'));

games.forEach(game => {
    const filePath = path.join(outputDir, `${game.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(game, null, 2), 'utf8');
    console.log(`Saved ${game.slug}.json`);
});

console.log('Split complete.');
