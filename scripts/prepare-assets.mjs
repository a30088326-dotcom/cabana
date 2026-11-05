import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
const root = resolve(import.meta.dirname, ".."),
  out = resolve(root, "frontend/public/images");
await mkdir(out, { recursive: true });
const generated = resolve(root, "assets/generated");
const images = [
  ["hero", "hero.png"],
  ["interior", "interior.png"],
  ["dining", "dining.png"],
  ["exterior", "exterior.png"],
];
for (const [name, file] of images) {
  await sharp(resolve(generated, file))
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(resolve(out, name + ".webp"));
  console.log("Prepared " + name);
}
const references = [
  [
    "sri-lanka-pool",
    "https://www.bogalavillageecoresort.com/images/Infinity%20Pool%20at%20Bogala%20Village.jpg",
  ],
  [
    "sri-lanka-treehouse",
    "https://www.backofbeyond.lk/wp-content/uploads/2025/09/tree-house1.webp",
  ],
];
for (const [name, url] of references) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok)
    throw new Error(name + " download failed " + response.status);
  const buffer = Buffer.from(await response.arrayBuffer());
  await sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(resolve(out, name + ".webp"));
  console.log("Prepared reference " + name);
}
// Self-host typography; browser visitors do not contact Google Fonts.
try {
  const css = await (
    await fetch(
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    )
  ).text();
  let n = 0;
  const dir = resolve(root, "frontend/public/fonts");
  await mkdir(dir, { recursive: true });
  let local = css;
  for (const url of [
    ...new Set(css.match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g) || []),
  ]) {
    const file = "font-" + n++ + (url.includes(".woff2") ? ".woff2" : ".ttf");
    const result = await fetch(url);
    if (!result.ok) throw new Error("Font unavailable");
    await writeFile(
      resolve(dir, file),
      Buffer.from(await result.arrayBuffer()),
    );
    local = local.split(url).join("/fonts/" + file);
  }
  await writeFile(resolve(root, "frontend/src/app/fonts.css"), local);
  console.log("Self-hosted " + n + " fonts");
} catch (error) {
  console.log("Using system font fallback: " + error.message);
}
