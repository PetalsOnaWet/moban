const fs = require('fs');
const path = './src/config/games-data.json';

let content = fs.readFileSync(path, 'utf8');
let lines = content.split('\n');
let newLines = [];
let changed = false;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // 如果发现这一行只有特定的 secrets 字符串（不带键名）
    if ((line.includes('"Easter egg:') || line.includes('"Keep playing to discover secrets."')) && !lines[i-1].includes('"secrets": [')) {
        console.log(`Fixing line ${i+1}`);
        let prevLine = lines[i-1];
        if (prevLine.includes('"created_at"')) {
            newLines.push('    "expert_tips": "Stay focused and practice regularly to improve your skills.",');
            newLines.push('    "secrets": [');
            changed = true;
        } else if (prevLine.includes('"expert_tips"')) {
            newLines.push('    "secrets": [');
            changed = true;
        }
    }
    newLines.push(line);
}

if (changed) {
    fs.writeFileSync(path, newLines.join('\n'));
    console.log('Fixed malformed entries!');
} else {
    console.log('No more malformed entries found.');
}
