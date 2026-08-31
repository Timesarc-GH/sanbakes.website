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
  assert.match(html, /<title>Order Brownies Online in Chennai \| San Bakes<\/title>/i);
  assert.match(html, /Dark cacao/);
  assert.match(html, /class="heroTamil">Made in small batches, with care, after your preorder\./);
  assert.match(html, /Start a preorder/);
  assert.match(html, /LAUNCH PRICING GUIDE/);
  assert.ok(html.indexOf("LAUNCH PRICING GUIDE") > html.indexOf("BIRTHDAYS &amp; PARTIES"));
  const pricingGuideStart = html.indexOf("LAUNCH PRICING GUIDE");
  const pricingOrder = ["Brownie Tubs", "Brownie Tins", "Personal gifting", "Millet tea cakes", "Birthdays &amp; parties", "Corporate", "Cupcake boxes", "Brownie boxes"];
  let previousPricingItem = pricingGuideStart;
  for (const item of pricingOrder) {
    const itemIndex = html.indexOf(item, pricingGuideStart);
    assert.ok(itemIndex > previousPricingItem, `Expected ${item} to follow the prior minimum-price tier`);
    previousPricingItem = itemIndex;
  }
  assert.match(html, /₹520–₹910/);
  assert.match(html, /Delivery within Chennai/);
  assert.match(html, /addresses beyond 20 km include additional distance-based charges/i);
  assert.doesNotMatch(html, /Eggless/i);
  assert.match(html, /one continuous brownie with three topping sections/i);
  assert.match(html, /home-brownie-tins-dual-format-v3\.webp/);
  assert.match(html, /From ₹590/);
  assert.match(html, /From ₹310/);
  assert.match(html, /From ₹270/);
  assert.match(html, /href="\/menu\?category=signature"/);
  assert.match(html, /href="\/menu\?category=tins"/);
  assert.match(html, /href="\/menu\?category=tubs"/);
  assert.match(html, /₹12,250 minimum before delivery/);
  assert.match(html, /at least 48 hours for standard brownies and personal gifts/i);
  assert.doesNotMatch(html, /Egg formulation/);
  assert.match(html, /ragi-brownie-hero\.png/);
  assert.match(html, /alt="San Bakes dark cacao brownie with a crackly top"/);
  assert.doesNotMatch(html, /san-bakes-product-collection\.mp4|Play music|heroVideo/);
  assert.match(html, />Policies</);
  assert.match(html, /FSSAI registration pending/);
});

test("publishes grouped navigation, crawl controls and product-level SEO", async () => {
  const root = await (await render("/")).text();
  assert.match(root, /<summary>Shop<\/summary>/);
  assert.match(root, /<summary>Help<\/summary>/);
  for (const href of ["/menu", "/cupcakes", "/parties", "/gifting", "/corporate", "/delivery", "/faq", "/policies"]) {
    assert.match(root, new RegExp(`href="${href}"`));
  }
  assert.match(root, /<link rel="canonical" href="https:\/\/san-bakes-chennai\.timesarctech\.chatgpt\.site"\/>/);
  assert.match(root, /<meta property="og:image" content="https:\/\/san-bakes-chennai\.timesarctech\.chatgpt\.site\/og\.png"\/>/);
  assert.doesNotMatch(root, /http:\/\/localhost:3000\/og\.png/);
  assert.match(root, /"@type":"Bakery"/);

  const menu = await (await render("/menu")).text();
  assert.match(menu, /<link rel="canonical" href="https:\/\/san-bakes-chennai\.timesarctech\.chatgpt\.site\/menu"\/>/);

  const productResponse = await render("/products/ragi-no-01");
  assert.equal(productResponse.status, 200);
  const product = await productResponse.text();
  assert.match(product, /<title>Ragi No\. 01 — Dark Cacao Millet Brownie \| San Bakes<\/title>/);
  assert.match(product, /<link rel="canonical" href="https:\/\/san-bakes-chennai\.timesarctech\.chatgpt\.site\/products\/ragi-no-01">/);
  assert.match(product, /"@type":"Product"/);
  assert.match(product, /"availability":"https:\/\/schema\.org\/PreOrder"/);
  assert.match(product, /Checking availability/);
  const productClient = await readFile(new URL("../app/products/[id]/ProductDetailClient.tsx", import.meta.url), "utf8");
  assert.match(productClient, /Add to cart/);
  assert.equal((await render("/products/not-a-product")).status, 404);

  const faq = await (await render("/faq")).text();
  assert.match(faq, /"@type":"FAQPage"/);
  assert.match(faq, /"@type":"Question"/);

  const robots = await (await render("/robots.txt")).text();
  assert.match(robots, /Disallow: \/admin/);
  assert.match(robots, /Disallow: \/launch-review/);
  assert.match(robots, /Disallow: \/api/);
  assert.match(robots, /Sitemap: https:\/\/san-bakes-chennai\.timesarctech\.chatgpt\.site\/sitemap\.xml/);

  const sitemap = await (await render("/sitemap.xml")).text();
  assert.match(sitemap, /<loc>https:\/\/san-bakes-chennai\.timesarctech\.chatgpt\.site\/products\/ragi-no-01<\/loc>/);
  assert.doesNotMatch(sitemap, /\/admin|\/launch-review|\/api/);
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
  assert.match(menu, /The Brownie preorder collection/);
  assert.doesNotMatch(menu, /LAUNCH PRICING GUIDE/);
  assert.match(menu, /Brownie Tubs/);
  assert.match(menu, /Millet Tea Cakes/);
  assert.match(menu, /Pack \/ quantity option/);
  assert.match(menu, /₹310/);
  assert.match(menu, /₹590/);
  assert.match(menu, /Three-Piece Brownie Tin/);
  assert.match(menu, /Whole Brownie Tin/);
  assert.doesNotMatch(menu, /productMeta|>Format<|Egg formulation/);
  assert.match(menu, /class="productPurchaseRow"[\s\S]*?class="selectedPrice"[\s\S]*?class="button buttonCacao"/);
  assert.doesNotMatch(menu, /Eggless/i);
  assert.match(menu, /1 whole Brownie Tin · 3 flavour-topping sections/);
  assert.match(menu, /one continuous brownie baked as a full Tin slab—not separate pieces/i);
  assert.doesNotMatch(menu, /Brownie Tin Flight/);
  assert.match(menu, /Walnut Reserve/);
  assert.doesNotMatch(menu, /6-Tin Full Flavour Flight · 18 pieces/);
  assert.doesNotMatch(menu, /Cupcakes are available on their own ordering page/);
  assert.doesNotMatch(menu, /Order Cupcakes/);
  assert.doesNotMatch(menu, /Dark Cacao Ragi Cupcake Collection/);
  assert.doesNotMatch(menu, /Corporate Mini Box/);
  assert.doesNotMatch(menu, /Individually Packed Party Brownies/);
  assert.doesNotMatch(menu, /statusBadge|decisionLine|Launch validation|Coming soon|Recommended for approval|Conditional — validation required/);
  const preorder = await (await render("/preorder")).text();
  assert.match(preorder, /CART &amp; WHATSAPP CHECKOUT/);
  assert.match(preorder, /Review your preorder/);
  assert.doesNotMatch(preorder, /Review once\. Send one complete order/);
  assert.match(preorder, /Place order through WhatsApp/);
  assert.match(preorder, /UPI PAYMENT/);
  assert.match(preorder, /A QR tied to the confirmed amount/);
  assert.match(preorder, /Delivery within Chennai/);
  assert.match(preorder, /additional charges beyond 20 km/i);
  assert.match(preorder, /Allow at least 2 calendar days/);
  assert.match(preorder, /Earliest request date for this cart/);
  assert.match(preorder, /Pickup is by confirmed appointment/);
  assert.match(preorder, /View delivery and pickup guide/);
  assert.doesNotMatch(preorder, /Planning subtotal/i);
  assert.doesNotMatch(preorder, /Eggless/i);
});

test("keeps a quantity-only cart for seven days and localises WhatsApp checkout", async () => {
  const provider = await readFile(new URL("../app/components/PreorderProvider.tsx", import.meta.url), "utf8");
  const checkout = await readFile(new URL("../app/preorder/page.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(provider, /CART_TTL_MS = 7 \* 24 \* 60 \* 60 \* 1000/);
  assert.match(provider, /StoredEnquiry = \{\s*items: EnquiryItems;\s*expiresAt: number;/);
  assert.match(provider, /Legacy carts were a quantity-only object/);
  assert.doesNotMatch(provider, /price|subtotal/i);
  assert.match(checkout, /clearItems/);
  assert.match(checkout, /Clear cart/);
  assert.match(checkout, /Saved on this device for 7 days/);
  assert.match(styles, /menuSection:has\(> \.basketDock\) \.menuGrid/);
  assert.match(styles, /body:has\(\.basketDock\) \.whatsappFloat/);

  const { buildWhatsAppOrderMessage } = await import("../app/preorder/orderMessage.ts");
  const base = {
    selections: [{ productName: "Walnut Reserve", productNameTa: "வால்நட் ரிசர்வ்", optionLabel: "Box of 6", optionLabelTa: "6 துண்டு பெட்டி", priceLabel: "₹620", quantity: 2 }],
    subtotalLabel: "₹1,240",
    hasQuotationSelection: false,
    details: { name: "Sangeetha", phone: "9940058623", date: "2026-09-10", formulation: "Egg", fulfilment: "Delivery within Chennai", pincode: "600117", address: "Chennai", notes: "No note" },
  };
  const english = buildWhatsAppOrderMessage({ ...base, language: "en" });
  assert.match(english, /^Hello San Bakes, I would like to place a preorder\./);
  assert.match(english, /Walnut Reserve · Box of 6 · ₹620 × 2/);
  assert.match(english, /SUBTOTAL: ₹1,240/);
  assert.match(english, /Required date: 2026-09-10/);
  assert.match(english, /Fulfilment: Delivery within Chennai/);

  const tamil = buildWhatsAppOrderMessage({ ...base, language: "ta" });
  assert.match(tamil, /^வணக்கம் San Bakes/);
  assert.match(tamil, /வால்நட் ரிசர்வ் · 6 துண்டு பெட்டி · ₹620 × 2/);
  assert.match(tamil, /இடைக்கூட்டுத்தொகை: ₹1,240/);
  assert.match(tamil, /தேவையான தேதி: 2026-09-10/);
  assert.match(tamil, /பெறும் முறை: சென்னை முழுவதும் டெலிவரி/);
  assert.doesNotMatch(tamil, /Required date|Fulfilment|CUSTOMER|Please confirm/);
});

test("uses the owner-selected V5 prices directly", async () => {
  const { formatPriceRangeForProducts, formatProductPriceRange, formatStartingPriceForProducts, productPricing, priceRevisionPercent } = await import("../app/lib/pricing.ts");
  const { products } = await import("../app/lib/products.ts");
  const options = products.flatMap((product) => productPricing[product.id].options.map((option) => ({ productId: product.id, ...option })));
  assert.equal(products.length, 29);
  assert.equal(options.length, 75);
  assert.equal(options.filter((option) => option.price !== null).length, 74);
  assert.equal(options.filter((option) => option.price === null).length, 1);
  assert.equal(priceRevisionPercent, 0);
  assert.equal(productPricing["dark-cacao-sea-salt"].options[0].price, 590);
  assert.equal(productPricing["cupcake-pista"].options[0].price, 520);
  assert.equal(productPricing["party-brownie-tins"].options.at(-1).price, 7800);
  assert.equal(productPricing["party-brownie-tubs"].options.at(-1).price, 5500);
  assert.equal(productPricing["bespoke-corporate"].options[0].price, null);
  assert.ok(options.every((option) => option.originalPrice === undefined));
  assert.ok(Object.values(productPricing).every((pricing) => !("decision" in pricing)));
  assert.ok(products.every((product) => !("status" in product)));
  assert.ok(products.every((product) => !("price" in product)));
  assert.equal(formatProductPriceRange("signature-discovery-box"), "₹590–₹620");
  assert.equal(formatPriceRangeForProducts(["brownie-tin-3-piece", "whole-brownie-tin"]), "₹310–₹360");
  assert.equal(formatStartingPriceForProducts(["classic-brownie-tub", "loaded-brownie-tub"]), "₹270");
  assert.equal(products.find((product) => product.id === "biscoff-crunch")?.name, "Caramelised Biscuit Crunch Brownie");
  assert.doesNotMatch(options.map((option) => option.note).join(" "), /V5|test required|verification required|yield confirmation|cost and|margin floor|home-kitchen capacity|after testing/i);
  assert.doesNotMatch(products.map((product) => product.format).join(" "), /Egg formulation|verification required|after testing|recipe details pending|₹15,000/i);
});

test("protects the owner inventory console and mutation API", async () => {
  const admin = await render("/admin");
  assert.ok([302, 307, 308].includes(admin.status));
  assert.match(admin.headers.get("location") ?? "", /\/signin-with-chatgpt\?return_to=%2Fadmin/);

  const inventoryApi = await render("/api/admin/inventory", { headers: { accept: "application/json" } });
  assert.equal(inventoryApi.status, 401);
  assert.deepEqual(await inventoryApi.json(), { error: "Authentication required" });
});

test("renders Cupcakes as an active orderable collection", async () => {
  const cupcakes = await (await render("/cupcakes")).text();
  assert.match(cupcakes, /CUPCAKES · AVAILABLE TO PREORDER/);
  assert.match(cupcakes, /Dark Cacao Ragi Cupcake Collection/);
  assert.match(cupcakes, /Pista Cardamom Cupcake Collection/);
  assert.match(cupcakes, /Cupcake Discovery Collection/);
  assert.match(cupcakes, /Box of 6 cupcakes/);
  assert.match(cupcakes, /Box of 9 cupcakes/);
  assert.match(cupcakes, /Box of 12 cupcakes/);
  assert.match(cupcakes, /Discovery box of 12 · two of each/);
  assert.match(cupcakes, /one fitted individual holder for each cupcake/i);
  assert.match(cupcakes, /cupcake-ragi-box-6-v2\.webp/);
  assert.match(cupcakes, /cupcake-pista-box-9-v2\.webp/);
  assert.match(cupcakes, /cupcake-discovery-box-12-v2\.webp/);
  assert.match(cupcakes, /Available to preorder/);
  assert.match(cupcakes, /Add to cart/);
  assert.match(cupcakes, /₹650/);
  assert.match(cupcakes, /₹520/);
  assert.match(cupcakes, /₹910/);
  assert.match(cupcakes, /Preorder boxes of 6 at least three days ahead/);
  assert.doesNotMatch(cupcakes, /productMeta|>Format</);
  assert.match(cupcakes, /class="productPurchaseRow"[\s\S]*?class="selectedPrice"[\s\S]*?class="button buttonCacao"/);
  assert.doesNotMatch(cupcakes, /statusBadge|decisionLine|Recommended for approval|Conditional — validation required/);
  assert.doesNotMatch(cupcakes, /planned launch|coming soon/i);
});

test("renders the expanded customer information pages", async () => {
  const faq = await (await render("/faq")).text();
  assert.match(faq, /Everything to know before you reserve/);
  assert.match(faq, /Are San Bakes products healthy/);
  assert.match(faq, /How does UPI payment work/);
  assert.match(faq, /Cupcake boxes of 6 need at least three days/);
  assert.match(faq, /Corporate orders start at seven days/);
  assert.match(faq, /25 four-piece boxes \/ ₹12,250 before delivery/);
  assert.doesNotMatch(faq, /₹15,000/);
  const delivery = await (await render("/delivery")).text();
  assert.match(delivery, /Delivery is available within Chennai/);
  assert.match(delivery, /Beyond 20 km · Chennai/);
  assert.match(delivery, /Live quote \+ distance surcharge/);
  assert.match(delivery, /additional distance-based charge/);
  assert.match(delivery, /appointment pickup/i);
  const gifting = await (await render("/gifting")).text();
  assert.match(gifting, /PERSONAL GIFTING/);
  assert.match(gifting, /Corporate orders now have their own planning desk/);
  assert.match(gifting, /reserve personal gifts at least 48 hours ahead/i);
  assert.match(gifting, /6 pieces · (?:<!-- -->)?₹590–₹620/);
  assert.doesNotMatch(gifting, /₹15,000/);
  const giftingMenu = await (await render("/menu?category=gifting")).text();
  assert.match(giftingMenu, /Signature Discovery Box/);
  assert.match(giftingMenu, /Seasonal Hamper/);
  assert.doesNotMatch(giftingMenu, /Corporate Mini Box/);
  const corporate = await (await render("/corporate")).text();
  assert.match(corporate, /CORPORATE ORDERS/);
  assert.match(corporate, /25 boxes \/ ₹12,250 before delivery/);
  assert.doesNotMatch(corporate, /₹15,000/);
  assert.match(corporate, /Corporate Mini Box/);
  assert.match(corporate, /25–49 boxes · 2 Ragi \+ 2 Walnut · per box/);
  assert.match(corporate, /Add 25 boxes to cart/);
  assert.match(corporate, /Bespoke Corporate Gifting/);
  assert.match(corporate, /7 calendar days/);
  assert.doesNotMatch(corporate, /productMeta|>Format</);
  assert.match(corporate, /class="productPurchaseRow"[\s\S]*?class="selectedPrice"[\s\S]*?class="button buttonCacao"/);
  assert.doesNotMatch(corporate, /statusBadge|decisionLine|Recommended for approval|Conditional — validation required|Quotation rules proposed/);
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
  assert.doesNotMatch(parties, /productMeta|>Format</);
  assert.match(parties, /class="productPurchaseRow"[\s\S]*?class="selectedPrice"[\s\S]*?class="button buttonCacao"/);
  assert.doesNotMatch(parties, /statusBadge|decisionLine|Recommended for approval|Conditional — validation required|Quotation rules proposed/);
});

test("keeps UPI payment disabled until a verified recipient is configured", async () => {
  const response = await render("/api/payment-config", { headers: { accept: "application/json" } });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { enabled: false, payeeName: "San Bakes" });
});

test("renders the owner approved-price reference without review statuses", async () => {
  const review = await (await render("/launch-review")).text();
  assert.match(review, /Approved V5 menu, quantities and prices/);
  assert.match(review, /Egg formulation only at launch/);
  assert.match(review, /distance-based charge for addresses beyond 20 km/);
  assert.doesNotMatch(review, /Eggless/i);
  assert.match(review, /Classic Brownie Tub/);
  assert.match(review, /Every populated New Price value from the V5 Price Review sheet is now treated as an approved selling price/i);
  assert.match(review, /Three-Piece Brownie Tin contains three separate brownie pieces/);
  assert.match(review, /Whole Brownie Tin is one continuous brownie slab—not separate pieces/);
  assert.match(review, /one, two or three divided flavour-topping sections/);
  assert.match(review, /Ragi No\. 01 — Dark Cacao Millet Brownie/);
  assert.match(review, /Walnut Reserve/);
  assert.match(review, /Boxes of 6, 9 and 12/);
  assert.match(review, /Cupcakes active for preorder/);
  assert.match(review, /DOMAINS/);
  assert.match(review, /sanbakes\.com/);
  assert.match(review, /₹270/);
  assert.match(review, /₹310/);
  assert.match(review, /Corporate Mini Box/);
  assert.match(review, /₹490/);
  assert.match(review, /Party minimums/);
  assert.match(review, /25 individually packed brownies/);
  assert.match(review, /Five-day event cutoff/);
  assert.match(review, /74(?:<!-- -->)? fixed options/);
  assert.match(review, /1(?:<!-- -->)? bespoke option/);
  assert.doesNotMatch(review, /Recommended for approval|Conditional — validation required|Quotation rules proposed|Owner decision|V5 price applied|Pending product gates/);
  assert.match(review, /name="robots" content="noindex, nofollow"/);
});
