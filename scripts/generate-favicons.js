// generate-favicons.js
// Usage:
// 1. npm install --save-dev sharp png-to-ico
// 2. node scripts/generate-favicons.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

const root = path.join(__dirname, '..');
const svgPath = path.join(root, 'favicon.svg');
const out32 = path.join(root, 'favicon-32.png');
const out16 = path.join(root, 'favicon-16.png');
const outIco = path.join(root, 'favicon.ico');

async function run(){
  if(!fs.existsSync(svgPath)){
    console.error('favicon.svg not found at', svgPath);
    process.exit(1);
  }

  try{
    console.log('Generating 32x32 PNG...');
    await sharp(svgPath).resize(32,32).png({compressionLevel:9}).toFile(out32);
    console.log('Generated', out32);

    console.log('Generating 16x16 PNG...');
    await sharp(svgPath).resize(16,16).png({compressionLevel:9}).toFile(out16);
    console.log('Generated', out16);

  console.log('Generating favicon.ico from PNGs...');
  // png-to-ico may export the function as default or as module itself depending on environment
  const pngToIcoFn = (typeof pngToIco === 'function') ? pngToIco : (pngToIco && pngToIco.default) ? pngToIco.default : null;
  if(!pngToIcoFn) throw new Error('png-to-ico is not available as a function');
  const icoBuffer = await pngToIcoFn([out32, out16]);
  fs.writeFileSync(outIco, icoBuffer);
    console.log('Generated', outIco);

    console.log('\nAll favicons generated successfully.');
  }catch(err){
    console.error('Error generating favicons:', err);
    process.exit(1);
  }
}

run();
