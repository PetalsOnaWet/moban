const fs = require('fs');
const path = './src/config/games-data.json';

let content = fs.readFileSync(path, 'utf8');

// 批量将 2024 替换为 2026
content = content.replace(/"created_at":\s*"2024-/g, '"created_at": "2026-');

fs.writeFileSync(path, content);
console.log('All games marked as new (2026)!');
