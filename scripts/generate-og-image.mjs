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
const MARK_HEIGHT = 340;

const BG = "#fafafa";

const mark = await sharp(path.join(root, "public/images/logo black.png"))
  .trim()
  .resize({ height: MARK_HEIGHT })
  .toBuffer({ resolveWithObject: true });

await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: BG,
  },
})
  .composite([{ input: mark.data, gravity: "centre" }])
  .png()
  .toFile(path.join(root, "src/app/opengraph-image.png"));

console.log("wrote src/app/opengraph-image.png");
