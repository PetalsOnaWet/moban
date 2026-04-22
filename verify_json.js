const fs = require('fs');
const path = '/Users/longyujiang/project/moban/src/config/games-data.json';

try {
    const data = fs.readFileSync(path, 'utf8');
    JSON.parse(data);
    console.log('JSON is valid!');
} catch (e) {
    console.error('JSON is still invalid:');
    console.error(e.message);
    process.exit(1);
}
