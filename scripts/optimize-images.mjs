import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, isAbsolute } from "node:path";

const RENDER = "C:/Users/Usr/Downloads/granja union/imagenes render";
const ROOT = process.cwd();
const OUT = join(ROOT, "public", "images");
const ASSETS = join(ROOT, "src", "assets");

// asset.json base  ->  render source file. null asset = new (no asset.json yet)
const MAP = [
  { asset: "portada.png", src: "portada.png", out: "portada", hero: true },
  { asset: "pollo.png", src: "pollo.png", out: "pollo" },
  { asset: "suprema.png", src: "suprema.png", out: "suprema" },
  { asset: "pechuga.png", src: "pechuga.png", out: "pechuga" },
  { asset: "pataMuslo.png", src: "pataMuslo.png", out: "pataMuslo" },
  { asset: "pataDeshuesada.png", src: "pataDeshuesada.png", out: "pataDeshuesada" },
  { asset: "alitas.png", src: "alitas.png", out: "alitas" },
  { asset: "crispy.jpg", src: "Pollo Crispy.jpg", out: "crispy" },
  { asset: "nuggets.png", src: "nuggets.png", out: "nuggets" },
  { asset: "huevos.jpg", src: "719117huevos.jpg", out: "huevos" },
  { asset: "milanesaRellena.png", src: "milanesaRellena.png", out: "milanesaRellena" },
  { asset: "milanesaPata.png", src: "milanesaPata.png", out: "milanesaPata" },
  { asset: "milanesaPechuga.png", src: "milanesaPechuga.png", out: "milanesaPechuga" },
  { asset: "hamburguesas.jpeg", src: "hamburguesas.jpeg", out: "hamburguesas" },
  { asset: "bastoncitos.jpg", src: "bastoncitos.jpg", out: "bastoncitos" },
  { asset: "arrollados.jpeg", src: "arrollados.jpeg", out: "arrollados" },
  { asset: "patitas.jpg", src: "patitas.jpg", out: "patitas" },
  { asset: "pechugasRebosadas.png", src: "pechugasRebosadas.png", out: "pechugasRebosadas" },
  { asset: "milanesaSemillas.png", src: "milanesaSemillas.png", out: "milanesaSemillas", isNew: true },
  { asset: "logo.png", src: "C:/Users/Usr/Downloads/Untitled design (21).png", out: "logo", logo: true },
];

await mkdir(OUT, { recursive: true });

for (const m of MAP) {
  const srcPath = isAbsolute(m.src) ? m.src : join(RENDER, m.src);
  const outPath = join(OUT, `${m.out}.webp`);
  const pipeline = sharp(srcPath).rotate();
  if (m.hero) {
    pipeline.resize({ width: 1920, height: 1080, fit: "cover", position: "centre" });
    await pipeline.webp({ quality: 82 }).toFile(outPath);
  } else if (m.logo) {
    // logo: preservar transparencia (alpha), no recortar
    pipeline.resize({ width: 480, height: 480, fit: "inside", withoutEnlargement: true });
    await pipeline.webp({ quality: 90, alphaQuality: 100 }).toFile(outPath);
  } else {
    pipeline.resize({ width: 900, height: 900, fit: "inside", withoutEnlargement: true });
    await pipeline.webp({ quality: 80 }).toFile(outPath);
  }

  // write/update the asset.json so its .url points to the local optimized file
  const assetPath = join(ASSETS, `${m.asset}.asset.json`);
  let json;
  try {
    json = JSON.parse(await readFile(assetPath, "utf8"));
  } catch {
    json = { version: 1, original_filename: m.asset, content_type: "image/webp" };
  }
  json.url = `/images/${m.out}.webp`;
  await mkdir(dirname(assetPath), { recursive: true });
  await writeFile(assetPath, JSON.stringify(json, null, 2) + "\n");

  console.log(`${m.out.padEnd(18)} -> images/${m.out}.webp  (asset ${m.isNew ? "CREATED" : "updated"})`);
}
console.log("done");
