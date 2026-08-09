const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const postsDir = path.join(__dirname, '../public/images/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.svg'));

async function convertAll() {
  console.log(`Starting conversion of ${files.length} SVG files to PNG...`);

  for (const file of files) {
    const svgPath = path.join(postsDir, file);
    const pngName = file.replace('.svg', '.png');
    const pngPath = path.join(postsDir, pngName);

    try {
      await sharp(svgPath)
        .resize(1200, 675)
        .png({ quality: 100 })
        .toFile(pngPath);

      console.log(`Successfully converted ${file} -> ${pngName}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }

  console.log('All image conversions finished!');
}

convertAll();
