/**
 * Renders the Open Graph card (src/app/opengraph-image.png) from the brand
 * logo, so link previews on Facebook, LinkedIn and X show the company mark
 * rather than whichever photo the scraper happens to find first on the page.
 *
 * Run with `node scripts/generate-og-image.mjs` after changing the logo or
 * the card copy; the generated PNG is committed.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 90;
const MARK_HEIGHT = 190;

const BG = "#fafafa";
const INK = "#0a0a0a";
const MUTED = "#52525b";
const ACCENT = "#4f46e5";

const mark = await sharp(path.join(root, "public/images/logo black.png"))
  .trim()
  .resize({ height: MARK_HEIGHT })
  .toBuffer({ resolveWithObject: true });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <g font-family="Space Grotesk, Segoe UI, Arial, sans-serif" fill="${INK}">
    <text x="${PAD}" y="440" font-size="104" font-weight="700" letter-spacing="-3">Infectech</text>
  </g>
  <text x="${PAD}" y="500" font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="${MUTED}">Engineering Intelligent Digital Products</text>
  <rect x="${PAD}" y="536" width="72" height="5" rx="2.5" fill="${ACCENT}"/>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([{ input: mark.data, left: PAD, top: 140 }])
  .png()
  .toFile(path.join(root, "src/app/opengraph-image.png"));

console.log("wrote src/app/opengraph-image.png");
