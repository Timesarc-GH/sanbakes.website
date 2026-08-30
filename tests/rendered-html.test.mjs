import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the San Bakes storefront", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>San Bakes \| Small-Batch Brownies in Chennai<\/title>/i);
  assert.match(html, /Dark cacao/);
  assert.match(html, /class="heroTamil">Made in small batches, with care, after your preorder\./);
  assert.match(html, /Start a preorder/);
  assert.match(html, />Policies</);
  assert.match(html, /FSSAI registration pending/);
});

test("uses each customer-facing content image in only one source placement", async () => {
  const appRoot = new URL("../app/", import.meta.url);
  const sourceFiles = [];
  async function collect(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const target = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);
      if (entry.isDirectory()) await collect(target);
      else if (/\.(?:ts|tsx)$/.test(entry.name)) sourceFiles.push(target);
    }
  }
  await collect(appRoot);
  const placements = new Map();
  for (const sourceFile of sourceFiles) {
    const source = await readFile(sourceFile, "utf8");
    for (const match of source.matchAll(/["'`](\/images\/[^"'`]+)["'`]/g)) {
      const placement = `${path.basename(sourceFile.pathname)}:${source.slice(0, match.index).split("\n").length}`;
      placements.set(match[1], [...(placements.get(match[1]) ?? []), placement]);
    }
  }
  const duplicates = [...placements].filter(([, uses]) => uses.length > 1);
  assert.deepEqual(duplicates, []);
});

test("renders the complete menu and preorder route", async () => {
  const menu = await (await render("/menu")).text();
  assert.match(menu, /Brownie Tubs/);
  assert.match(menu, /Millet Tea Cakes/);
  assert.match(menu, /The Grand Celebration/);
  assert.match(menu, /Pack \/ quantity option/);
  assert.match(menu, /₹382/);
  assert.match(menu, /₹927/);
  assert.match(menu, /Three-Piece Brownie Tin/);
  assert.match(menu, /Brownie Tin Flight/);
  assert.match(menu, /₹3,390/);
  assert.match(menu, /Walnut Reserve/);
  assert.match(menu, /6-Tin Full Flavour Flight · 18 pieces/);
  const preorder = await (await render("/preorder")).text();
  assert.match(preorder, /Send request on WhatsApp/);
  assert.match(preorder, /No payment will be collected here/);
});

test("renders the expanded customer information pages", async () => {
  const faq = await (await render("/faq")).text();
  assert.match(faq, /Everything to know before you reserve/);
  assert.match(faq, /Are San Bakes products healthy/);
  assert.match(faq, /Can I pay on the website now/);
  const delivery = await (await render("/delivery")).text();
  assert.match(delivery, /20 km road radius/);
  assert.match(delivery, /appointment pickup/i);
  const gifting = await (await render("/gifting")).text();
  assert.match(gifting, /25 four-piece boxes or ₹15,000/);
  assert.match(gifting, /corporate gifting/i);
});

test("renders the owner pricing and approval review", async () => {
  const review = await (await render("/launch-review")).text();
  assert.match(review, /Menu, quantity and pricing approval/);
  assert.match(review, /Same price for Egg and Eggless/);
  assert.match(review, /Classic Brownie Tub/);
  assert.match(review, /Legacy consumer recommendations are 15% below the previous proposal/);
  assert.match(review, /3 Tins · 9 pieces/);
  assert.match(review, /six flavours are Dark Cacao, Walnut Reserve/);
  assert.match(review, /DOMAIN PURCHASE STATUS/);
  assert.match(review, /sanbakes\.com/);
  assert.match(review, /₹449/);
  assert.match(review, /₹382/);
  assert.match(review, /Corporate Mini Box/);
  assert.match(review, /₹635/);
  assert.match(review, /Pending owner approval/);
  assert.match(review, /name="robots" content="noindex, nofollow"/);
});
