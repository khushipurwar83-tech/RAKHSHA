const fs = require('fs');

// A minimal 1x1 black PNG Base64
const minimalPng = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const buffer = Buffer.from(minimalPng, 'base64');

const paths = [
    'assets/images/icon.png',
    'assets/images/adaptive-icon.png',
    'assets/images/favicon.png',
    'assets/images/splash.png'
];

paths.forEach(p => {
    fs.writeFileSync(p, buffer);
    console.log(`Created clean placeholder at ${p}`);
});
