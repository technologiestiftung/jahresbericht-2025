import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the built index.html in dist/
const indexPath = path.join(__dirname, "..", "dist", "index.html");

const MATOMO_URL = process.env.MATOMO_URL;

if (!MATOMO_URL) {
  console.error("❌ MATOMO_URL not set in Netlify env vars.");
  process.exit(1);
}

// Load built HTML
let html = fs.readFileSync(indexPath, "utf8");

// Replace placeholder string with real value
html = html.replace(/__MATOMO_URL__/g, MATOMO_URL);

// Save modified HTML back to dist
fs.writeFileSync(indexPath, html);

console.log("✅ Injected MATOMO_URL into dist/index.html");
