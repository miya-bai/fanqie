const sharp = require('sharp');
const path = require('path');
const iconDir = './src-tauri/icons';

// Create a simple tomato-colored icon (red/orange circle with green stem)
async function createIcon(size, filename) {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#FF6B6B"/>
    <ellipse cx="${size*0.3}" cy="${size*0.25}" rx="${size*0.08}" ry="${size*0.04}" fill="#4CAF50"/>
  </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(iconDir, filename));
  console.log('Created', filename);
}

// Generate icons
(async () => {
  await createIcon(32, '32x32.png');
  await createIcon(128, '128x128.png');
  await createIcon(256, '128x128@2x.png');
  await createIcon(256, 'icon.icns.png');
  await createIcon(512, 'icon.png');
  console.log('All icons created!');
})();
