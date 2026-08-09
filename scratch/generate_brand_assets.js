const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const appDir = path.join(__dirname, '../src/app');

// 1. Logo SVG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="100%" height="100%">
  <defs>
    <linearGradient id="playzyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="50%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>
  </defs>
  <!-- Logo Icon Badge -->
  <rect x="10" y="15" width="70" height="70" rx="22" fill="url(#playzyGrad)" />
  <path d="M35 30 L60 50 L35 70 Z" fill="#ffffff" />
  <circle cx="55" cy="35" r="5" fill="#38bdf8" />
  <!-- Logo Text -->
  <text x="100" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="46" font-weight="900" fill="#0f172a" letter-spacing="-1.5">playzy<tspan fill="#2563eb">.me</tspan></text>
</svg>`;

// 2. Favicon SVG / Icon
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <linearGradient id="favGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="30" fill="url(#favGrad)" />
  <path d="M36 28 L68 50 L36 72 Z" fill="#ffffff" />
  <circle cx="62" cy="34" r="7" fill="#38bdf8" />
</svg>`;

fs.writeFileSync(path.join(publicDir, 'logo.svg'), logoSvg);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
fs.writeFileSync(path.join(appDir, 'icon.svg'), faviconSvg);

console.log('Successfully generated brand logo and favicon assets!');
