const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const snippet = fs.readFileSync('reviews-snippet.html', 'utf8');

// The marker where we insert
const marker = '      </div> <!-- End tab-home -->';
html = html.replace(marker, snippet + '\n' + marker);

fs.writeFileSync('index.html', html);
console.log("Reviews inserted!");
