const fs = require('fs');
let data = fs.readFileSync('src/data/menu.ts', 'utf8');
data = data.replace(/imageUrl: '\/images\//g, "imageUrl: './images/");
fs.writeFileSync('src/data/menu.ts', data);
