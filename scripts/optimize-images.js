// Simple image optimization helper using sharp
// Usage:
// 1) npm install sharp --save-dev
// 2) node scripts/optimize-images.js

const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const sharp = require('sharp');
    const inputDir = path.join(__dirname, '..', 'public');
    const file = path.join(inputDir, 'hero-center.jpg');
    if (!fs.existsSync(file)) {
      console.error('Source image public/hero-center.jpg not found.');
      process.exit(1);
    }

    const outWebp = path.join(inputDir, 'hero-center.webp');
    const out480 = path.join(inputDir, 'hero-center-480.jpg');
    const out768 = path.join(inputDir, 'hero-center-768.jpg');

    // create webp
    await sharp(file)
      .resize({ width: 1200 })
      .webp({ quality: 80 })
      .toFile(outWebp);

    // create responsive jpegs
    await sharp(file).resize(480).jpeg({ quality: 75 }).toFile(out480);
    await sharp(file).resize(768).jpeg({ quality: 80 }).toFile(out768);

    console.log('Optimized images created: hero-center.webp, hero-center-480.jpg, hero-center-768.jpg');
  } catch (err) {
    console.error('Error running optimization script. Make sure `sharp` is installed.');
    console.error(err);
    process.exit(1);
  }
}

run();
