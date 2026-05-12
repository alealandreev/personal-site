#!/usr/bin/env node
// scripts/generate-pdf-cv.ts
// Run: npx tsx scripts/generate-pdf-cv.ts
// Requires: pnpm add -D puppeteer tsx

import puppeteer from "puppeteer";
import { join } from "path";

const PORT = process.env.PORT ?? 3000;
const CV_URL = `http://localhost:${PORT}/cv?print=1`;
const OUTPUT = join(process.cwd(), "public", "cv.pdf");

async function main() {
  console.log(`Generating CV PDF from ${CV_URL}...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(CV_URL, { waitUntil: "networkidle0" });

  await page.pdf({
    path: OUTPUT,
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
  });

  await browser.close();
  console.log(`CV PDF written to ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
