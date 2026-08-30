import assert from "node:assert/strict";
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

test("renders the complete menu and preorder route", async () => {
  const menu = await (await render("/menu")).text();
  assert.match(menu, /Brownie Tubs/);
  assert.match(menu, /Millet Tea Cakes/);
  assert.match(menu, /The Grand Celebration/);
  assert.match(menu, /Pack \/ quantity option/);
  assert.match(menu, /₹449/);
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
  assert.match(review, /Pending owner approval/);
  assert.match(review, /name="robots" content="noindex, nofollow"/);
});
