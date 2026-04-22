const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'src/data/games');
const outputPath = path.join(__dirname, 'src/config/games-data.json');

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.json'));
const games = files.map(file => {
    return JSON.parse(fs.readFileSync(path.join(inputDir, file), 'utf8'));
});

// Sort by created_at or title if needed
games.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

fs.writeFileSync(outputPath, JSON.stringify(games, null, 2), 'utf8');
console.log(`Merged ${games.length} games into ${outputPath}`);
