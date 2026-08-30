import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

async function render(path = "/", init = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { ...init, headers: { accept: "text/html", ...(init.headers ?? {}) } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the San Bakes storefront", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>San Bakes \| Small-Batch Brownies in Chennai<\/title>/i);
  assert.match(html, /Dark cacao/);
  assert.match(html, /class="heroTamil">Made in small batches, with care, after your preorder\./);
  assert.match(html, /Start a preorder/);
  assert.match(html, /one continuous brownie with three topping sections/i);
  assert.match(html, /home-brownie-tins-dual-format-v3\.webp/);
  assert.match(html, /san-bakes-product-collection\.mp4/);
  assert.match(html, /Play music/);
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
  assert.match(menu, /Pack \/ quantity option/);
  assert.match(menu, /₹310/);
  assert.match(menu, /₹760/);
  assert.match(menu, /Three-Piece Brownie Tin/);
  assert.match(menu, /Whole Brownie Tin/);
  assert.match(menu, /1 whole Brownie Tin · 3 flavour-topping sections/);
  assert.match(menu, /one continuous brownie baked as a full Tin slab—not separate pieces/i);
  assert.doesNotMatch(menu, /Brownie Tin Flight/);
  assert.match(menu, /Walnut Reserve/);
  assert.doesNotMatch(menu, /6-Tin Full Flavour Flight · 18 pieces/);
  assert.match(menu, /Cupcakes have their own planned-launch page/);
  assert.doesNotMatch(menu, /Dark Cacao Ragi Cupcake Collection/);
  assert.doesNotMatch(menu, /Corporate Mini Box/);
  assert.doesNotMatch(menu, /Individually Packed Party Brownies/);
  const preorder = await (await render("/preorder")).text();
  assert.match(preorder, /CART &amp; WHATSAPP CHECKOUT/);
  assert.match(preorder, /Place order through WhatsApp/);
  assert.match(preorder, /UPI PAYMENT/);
  assert.match(preorder, /A QR tied to the confirmed amount/);
});

test("applies the 30% base-price revision and nearest-₹10 rounding", async () => {
  const { productPricing, priceRevisionExclusions, priceRevisionPercent } = await import("../app/lib/pricing.ts");
  assert.equal(priceRevisionPercent, 30);
  for (const [productId, pricing] of Object.entries(productPricing)) {
    for (const option of pricing.options) {
      if (option.price === null) continue;
      if (priceRevisionExclusions.has(productId)) {
        assert.equal(option.originalPrice, undefined);
      } else {
        assert.equal(option.price % 10, 0);
        assert.equal(option.price, Math.round(option.originalPrice * 70 / 1000) * 10);
      }
    }
  }
});

test("protects the owner inventory console and mutation API", async () => {
  const admin = await render("/admin");
  assert.ok([302, 307, 308].includes(admin.status));
  assert.match(admin.headers.get("location") ?? "", /\/signin-with-chatgpt\?return_to=%2Fadmin/);

  const inventoryApi = await render("/api/admin/inventory", { headers: { accept: "application/json" } });
  assert.equal(inventoryApi.status, 401);
  assert.deepEqual(await inventoryApi.json(), { error: "Authentication required" });
});

test("renders Cupcakes as a separate planned-launch collection", async () => {
  const cupcakes = await (await render("/cupcakes")).text();
  assert.match(cupcakes, /PLANNED NEW LAUNCH · COMING SOON/);
  assert.match(cupcakes, /Dark Cacao Ragi Cupcake Collection/);
  assert.match(cupcakes, /Pista Cardamom Cupcake Collection/);
  assert.match(cupcakes, /Cupcake Discovery Collection/);
  assert.match(cupcakes, /Box of 6 cupcakes/);
  assert.match(cupcakes, /Box of 9 cupcakes/);
  assert.match(cupcakes, /Box of 12 cupcakes/);
  assert.match(cupcakes, /Discovery box of 12 · two of each/);
  assert.match(cupcakes, /Add planned box to cart/);
  assert.match(cupcakes, /transport test/);
});

test("renders the expanded customer information pages", async () => {
  const faq = await (await render("/faq")).text();
  assert.match(faq, /Everything to know before you reserve/);
  assert.match(faq, /Are San Bakes products healthy/);
  assert.match(faq, /How does UPI payment work/);
  const delivery = await (await render("/delivery")).text();
  assert.match(delivery, /20 km road radius/);
  assert.match(delivery, /appointment pickup/i);
  const gifting = await (await render("/gifting")).text();
  assert.match(gifting, /PERSONAL GIFTING/);
  assert.match(gifting, /Corporate orders now have their own planning desk/);
  assert.doesNotMatch(gifting, /25 four-piece boxes or ₹15,000/);
  const giftingMenu = await (await render("/menu?category=gifting")).text();
  assert.match(giftingMenu, /Signature Discovery Box/);
  assert.match(giftingMenu, /Seasonal Hamper/);
  assert.doesNotMatch(giftingMenu, /Corporate Mini Box/);
  const corporate = await (await render("/corporate")).text();
  assert.match(corporate, /CORPORATE ORDERS/);
  assert.match(corporate, /25 boxes or ₹15,000/);
  assert.match(corporate, /Corporate Mini Box/);
  assert.match(corporate, /25–49 boxes · 2 Ragi \+ 2 Walnut · per box/);
  assert.match(corporate, /Add 25 boxes to cart/);
  assert.match(corporate, /Bespoke Corporate Gifting/);
  assert.match(corporate, /7 calendar days/);
  const corporateMenu = await (await render("/menu?category=corporate")).text();
  assert.doesNotMatch(corporateMenu, /Corporate Mini Box/);
  assert.doesNotMatch(corporateMenu, /Individually Packed Party Brownies/);
  const parties = await (await render("/parties")).text();
  assert.match(parties, /BIRTHDAYS &amp; PARTIES/);
  assert.match(parties, /Five days is the working minimum/);
  assert.match(parties, /Little Celebration/);
  assert.match(parties, /Individually Packed Party Brownies/);
  assert.match(parties, /25 Classic brownies · individually packed/);
  assert.match(parties, /10 Classic three-piece Tins/);
  assert.match(parties, /10 Classic Brownie Tubs/);
  assert.match(parties, /Occasion Brownie Cake/);
  assert.match(parties, /Add to cart/);
  assert.match(parties, /Within 72 hours of handover/);
});

test("keeps UPI payment disabled until a verified recipient is configured", async () => {
  const response = await render("/api/payment-config", { headers: { accept: "application/json" } });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { enabled: false, payeeName: "San Bakes" });
});

test("renders the owner pricing and approval review", async () => {
  const review = await (await render("/launch-review")).text();
  assert.match(review, /Menu, quantity and pricing approval/);
  assert.match(review, /Same price for Egg and Eggless/);
  assert.match(review, /Classic Brownie Tub/);
  assert.match(review, /Customer recommendations are 30% below their original base prices and rounded to the nearest ₹10/);
  assert.match(review, /Three-Piece Brownie Tin contains three separate brownie pieces/);
  assert.match(review, /Whole Brownie Tin is one continuous brownie slab—not separate pieces/);
  assert.match(review, /one, two or three divided flavour-topping sections/);
  assert.match(review, /Ragi No\. 01 — Dark Cacao Millet Brownie/);
  assert.match(review, /Walnut Reserve/);
  assert.match(review, /boxes of 6, 9 and 12/);
  assert.match(review, /DOMAIN PURCHASE STATUS/);
  assert.match(review, /sanbakes\.com/);
  assert.match(review, /₹449/);
  assert.match(review, /₹310/);
  assert.match(review, /Corporate Mini Box/);
  assert.match(review, /₹635/);
  assert.match(review, /Party minimums/);
  assert.match(review, /25 individually packed brownies/);
  assert.match(review, /Five-day event cutoff/);
  assert.match(review, /Pending owner approval/);
  assert.match(review, /name="robots" content="noindex, nofollow"/);
});
