/**
 * Full-page screenshots for docs/ (light + dark).
 * Prerequisite: `npm run dev` so http://127.0.0.1:3000 responds.
 *
 *   SCREENSHOT_URL=http://127.0.0.1:3456 npm run screenshots
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import http from "node:http";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BASE = process.env.SCREENSHOT_URL ?? "http://127.0.0.1:3000";
const OUT = join(ROOT, "docs", "screenshots");

async function waitForServer(url, maxAttempts = 90) {
  const { hostname, port } = new URL(url);
  for (let i = 0; i < maxAttempts; i++) {
    const ok = await new Promise((resolve) => {
      const req = http.request(
        { hostname, port, path: "/", method: "GET", timeout: 1500 },
        (res) => {
          res.resume();
          resolve(res.statusCode != null && res.statusCode < 500);
        },
      );
      req.on("error", () => resolve(false));
      req.on("timeout", () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    });
    if (ok) return;
    await delay(1000);
  }
  throw new Error(
    `Could not reach ${url}. Start the app first:\n  npm run dev\nThen re-run:\n  npm run screenshots`,
  );
}

await mkdir(OUT, { recursive: true });

await waitForServer(BASE);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
});

try {
  await page.goto(BASE, { waitUntil: "load", timeout: 120000 });
  await delay(3500);
  await page.screenshot({ path: join(OUT, "home-light.png"), fullPage: true });
  console.log("Wrote home-light.png");

  await page.evaluate(() => {
    try {
      localStorage.setItem("hub360-theme", "dark");
    } catch {
      /* ignore */
    }
  });
  await page.reload({ waitUntil: "load", timeout: 120000 });
  await delay(3500);
  await page.screenshot({ path: join(OUT, "home-dark.png"), fullPage: true });
  console.log("Wrote home-dark.png");
} finally {
  await browser.close();
}

console.log("Done.");
