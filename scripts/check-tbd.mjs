// GO-LIVE BLOCKER: fails if any [TBD] placeholder remains in app/**/*.tsx
// Run: npm run check:tbd
// Add to CI pre-deploy step so [TBD] can never reach production.
import { readdirSync, readFileSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_DIR = resolve(__dirname, "..", "app");

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else if (full.endsWith(".tsx") || full.endsWith(".ts")) files.push(full);
  }
  return files;
}

const hits = [];
for (const file of walk(APP_DIR)) {
  if (readFileSync(file, "utf8").includes("[TBD —")) hits.push(file);
}

if (hits.length > 0) {
  console.error("GO-LIVE BLOCKER: [TBD] placeholders found in:");
  hits.forEach((f) => console.error("  " + f));
  process.exit(1);
} else {
  console.log("check:tbd passed — no [TBD] placeholders found.");
}
