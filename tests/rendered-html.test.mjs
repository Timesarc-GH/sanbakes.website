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
  assert.match(html, /class="homeOpening"/);
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
  assert.equal((html.match(/class="productCard"/g) ?? []).length, 5);
  for (const title of ["The Brownie Atelier", "The Cupcake Edit", "The Celebration Table", "The Gifting Room", "Business, Beautifully Boxed"]) {
    assert.match(html, new RegExp(title));
  }
  for (const image of [
    "home-opening-brownie-atelier-v1.webp",
    "home-opening-cupcake-edit-v1.webp",
    "home-opening-celebration-table-v1.webp",
    "home-opening-gifting-room-v1.webp",
    "home-opening-corporate-boxed-v1.webp",
  ]) {
    assert.match(html, new RegExp(image.replace(".", "\\.")));
  }
  for (const href of ["/menu", "/cupcakes", "/parties", "/gifting", "/corporate"]) {
    assert.match(html, new RegExp(`<a class="productImage" href="${href}"`));
  }
  assert.match(html, /Brownies · Tins · Tubs · Tea cakes/);
  assert.match(html, /From ₹270/);
  assert.match(html, /From ₹520/);
  assert.match(html, /From ₹450/);
  assert.match(html, /From ₹590/);
  assert.match(html, /From ₹490/);
  assert.match(html, /Individually packed brownies start at 25 pieces/);
  assert.match(html, />FAQs<\/a>/);
  assert.doesNotMatch(html, /Corporate minimum:|₹12,250/);
  assert.match(html, /at least 48 hours for standard brownies and personal gifts/i);
  assert.doesNotMatch(html, /Egg formulation/);
  assert.match(html, /ragi-brownie-hero\.png/);
  assert.match(html, /alt="San Bakes dark cacao brownie with a crackly top"/);
  assert.doesNotMatch(html, /san-bakes-product-collection\.mp4|Play music|heroVideo/);
  assert.match(html, /<figure class="storyMedia">/);
  assert.match(html, /aria-describedby="story-video-caption"/);
  assert.match(html, /why-san-bakes-wide-v2\.mp4/);
  assert.match(html, /home-our-standard-video-poster-v2\.webp/);
  assert.match(html, /<figcaption class="storyMediaCaption" id="story-video-caption">/);
  assert.doesNotMatch(html, /<video[^>]*autoplay/i);
  assert.match(html, />Policies</);
  assert.match(html, /FSSAI registration pending/);
});

test("uses compact banners, a five-card opening collection and responsive product grids", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const productCss = await readFile(new URL("../app/products/[id]/product-detail.module.css", import.meta.url), "utf8");
  const header = await readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8");
  const storyCaptions = await readFile(new URL("../public/video/why-san-bakes.en.vtt", import.meta.url), "utf8");
  assert.match(css, /\.hero \{[^}]*min-height: 230px/);
  assert.match(css, /\.innerHero \{[^}]*padding: 28px 8vw 32px/);
  assert.match(css, /\.cupcakeHero \{[^}]*padding: 28px 8vw 32px/);
  assert.match(css, /\.productGrid \{[^}]*grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.openingGrid \{[^}]*grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.menuGrid \{[^}]*grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 1100px\)[\s\S]*?\.productGrid, \.menuGrid \{ grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(min-width: 901px\) and \(max-width: 1240px\)[\s\S]*?\.openingGrid \{ grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.productGrid \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*?\.productGrid \{ grid-template-columns: 1fr/);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*?\.openingGrid \.productImage \{ aspect-ratio: 4 \/ 3/);
  assert.match(css, /\.priceGuideGrid \{[^}]*grid-template-columns: repeat\(4, 1fr\)/);
  assert.match(css, /\.siteHeader \{[\s\S]*?min-height: 74px;[\s\S]*?overflow: visible;/);
  assert.match(css, /\.brandSeal \{[^}]*position: absolute;[^}]*width: var\(--brand-seal-size\);[^}]*transform: translateY\(-66%\)/);
  assert.match(header, /width=\{96\} height=\{96\}/);
  assert.match(productCss, /min-height: clamp\(420px, calc\(100svh - 298px\), 500px\)/);
  assert.match(productCss, /@media \(max-width: 780px\)/);
  assert.match(productCss, /font-size: var\(--price-size\)/);
  assert.match(css, /--font-display:/);
  assert.match(css, /--font-ui:/);
  assert.match(css, /--price-size: 18px/);
  assert.match(css, /\.storySection \{[^}]*grid-template-columns: 1\.35fr \.65fr;[^}]*min-height: 290px/);
  assert.match(css, /\.storyMedia \{[^}]*min-height: 290px;[^}]*margin: 0/);
  assert.match(css, /\.storyMedia video \{[^}]*position: absolute;[^}]*min-height: 0;[^}]*object-fit: contain/);
  assert.match(css, /\.storyMediaCaption \{[^}]*top: clamp\(12px, 2vw, 22px\);[^}]*right: auto;[^}]*bottom: auto;[^}]*max-width: min\(16rem, 42%\);[^}]*background: transparent;[^}]*pointer-events: none/);
  assert.doesNotMatch(css, /\.storyMediaCaption \{[^}]*backdrop-filter/);
  assert.match(css, /\.occasionSection \{[^}]*min-height: 437px/);
  assert.match(css, /\.occasionImage \{[^}]*min-height: 437px/);
  assert.match(css, /\.occasionImage img \{[^}]*object-position: center 58%/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.storyMedia \{ min-height: 242px/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.occasionImage \{ min-height: 414px/);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*?\.storyMedia \{ min-height: 219px/);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*?\.occasionImage \{ min-height: 368px/);
  assert.match(css, /@media \(min-width: 1360px\)[\s\S]*?html:lang\(en\) \.innerHero h1,[\s\S]*?white-space: nowrap/);
  assert.match(css, /@media \(min-width: 901px\)[\s\S]*?\.cupcakeHero > div > h1 \{ grid-column: 1 \/ -1/);
  assert.match(css, /\.giftFeature \{[^}]*min-height: 384px/);
  assert.match(css, /\.giftImage \{[^}]*min-height: 384px/);
  assert.match(css, /\.giftCopy h2 \{[^}]*font-size: clamp\(40px, 4\.25vw, 58px\)/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.giftImage \{ min-height: 288px/);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*?\.giftImage \{ min-height: 256px/);
  assert.match(css, /\.dedicatedCollection \.collectionIntro \{[\s\S]*?grid-template-areas: "eyebrow eyebrow" "title intro";[\s\S]*?row-gap: 0;/);
  assert.match(css, /\.dedicatedCollection \.collectionIntro \.eyebrow \{[^}]*margin: 0/);
  assert.match(css, /\.offerSection \{[^}]*max-width: 1560px;[^}]*padding: 54px 4vw 72px/);
  assert.match(css, /\.offerSection \.offerIntro \{[\s\S]*?grid-template-areas: "eyebrow eyebrow" "title intro";[\s\S]*?row-gap: 0;[\s\S]*?margin-bottom: 34px/);
  assert.match(css, /\.offerSection \.offerIntro \.eyebrow \{[^}]*margin: 0/);
  assert.match(css, /\.offerGrid \{[^}]*grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.offerGrid article \{[^}]*min-width: 0/);
  assert.match(css, /@media \(max-width: 1280px\)[\s\S]*?\.offerGrid \{ grid-template-columns: 1fr 1fr/);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*?\.offerGrid \{ grid-template-columns: 1fr/);
  assert.match(css, /@media \(min-width: 1241px\)[\s\S]*?\.homeOpening \.trustStrip div \{ padding: 12px 3vw 14px; \}/);
  assert.match(css, /@media \(min-width: 1241px\)[\s\S]*?\.homeOpening \.collectionSection \{ padding: 18px 4vw 20px; \}/);
  assert.match(css, /@media \(min-width: 1241px\)[\s\S]*?\.homeOpening \.openingGrid \.productImage \{ aspect-ratio: 1\.65 \/ 1; \}/);
  assert.match(css, /@media \(min-width: 1241px\) and \(min-height: 881px\)[\s\S]*?max-width: 1628px/);
  assert.match(css, /@media \(min-width: 1241px\) and \(min-height: 881px\)[\s\S]*?\.homeOpening \.openingGrid \.productBody h3 \{ font-size: 21px; \}/);
  assert.match(storyCaptions, /00:15\.000 --> 00:27\.700/);
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
  assert.match(product, /Confirming preorder status/);
  assert.doesNotMatch(product, /In stock|Out of stock|Currently unavailable|Checking availability/);
  const productClient = await readFile(new URL("../app/products/[id]/ProductDetailClient.tsx", import.meta.url), "utf8");
  assert.match(productClient, /Add to cart/);
  assert.match(product, /Choose your pack, composition &amp; formulation/);
  assert.match(product, /Regular \(with egg\)/);
  assert.match(product, /Eggless/);
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
  assert.match(menu, /Pack, quantity &amp; formulation/);
  assert.match(menu, /₹310/);
  assert.match(menu, /₹590/);
  assert.match(menu, /Three-Piece Brownie Tin/);
  assert.match(menu, /Whole Brownie Tin/);
  assert.doesNotMatch(menu, /productMeta|>Format<|Egg formulation/);
  assert.match(menu, /class="productPurchaseRow"[\s\S]*?class="selectedPrice"[\s\S]*?class="button buttonCacao"/);
  assert.match(menu, /Regular \(with egg\)/);
  assert.match(menu, /Eggless/);
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
  assert.doesNotMatch(menu, /In stock|Out of stock|stockBadge|availabilityLine/);
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
  assert.doesNotMatch(preorder, /name="formulation"|Formulation:/i);
  assert.doesNotMatch(preorder, /In stock|Out of stock|Currently unavailable|stockBadge|availabilityLine/);
});

test("keeps a formulation-aware quantity cart for seven days and localises WhatsApp checkout", async () => {
  const provider = await readFile(new URL("../app/components/PreorderProvider.tsx", import.meta.url), "utf8");
  const checkout = await readFile(new URL("../app/preorder/page.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(provider, /CART_TTL_MS = 7 \* 24 \* 60 \* 60 \* 1000/);
  assert.match(provider, /StoredEnquiry = \{\s*items: EnquiryItems;\s*expiresAt: number;/);
  assert.match(provider, /Legacy two-part selection keys are migrated to the Regular formulation/);
  assert.doesNotMatch(provider, /price|subtotal/i);
  assert.match(checkout, /clearItems/);
  assert.match(checkout, /Clear cart/);
  assert.match(checkout, /Saved on this device for 7 days/);
  assert.match(checkout, /productQuantities/);
  assert.match(checkout, /combined cart quantity exceeds/);
  assert.doesNotMatch(checkout, /name="formulation"|value="Egg"/);
  assert.match(styles, /menuSection:has\(> \.basketDock\) \.menuGrid/);
  assert.match(styles, /body:has\(\.basketDock\) \.whatsappFloat/);

  const { makeSelectionKey, parseSelectionKey } = await import("../app/lib/pricing.ts");
  const { sanitiseItems } = await import("../app/lib/cart.ts");
  const regularKey = makeSelectionKey("walnut-reserve", "box-6", "regular");
  const egglessKey = makeSelectionKey("walnut-reserve", "box-6", "eggless");
  assert.notEqual(regularKey, egglessKey);
  assert.deepEqual(parseSelectionKey(regularKey), { productId:"walnut-reserve", optionId:"box-6", formulation:"regular" });
  assert.deepEqual(parseSelectionKey(egglessKey), { productId:"walnut-reserve", optionId:"box-6", formulation:"eggless" });
  assert.deepEqual(parseSelectionKey("walnut-reserve::box-6"), { productId:"walnut-reserve", optionId:"box-6", formulation:"regular" });
  assert.deepEqual(sanitiseItems({ "walnut-reserve::box-6":2, [regularKey]:3, [egglessKey]:4, "walnut-reserve::box-6::unknown":99 }), { [regularKey]:5, [egglessKey]:4 });

  const { buildWhatsAppOrderMessage } = await import("../app/preorder/orderMessage.ts");
  const base = {
    selections: [
      { productName: "Walnut Reserve", productNameTa: "வால்நட் ரிசர்வ்", optionLabel: "Box of 6", optionLabelTa: "6 துண்டு பெட்டி", formulationLabel:"Regular (with egg)", formulationLabelTa:"வழக்கமானது (முட்டையுடன்)", priceLabel: "₹620", quantity: 2 },
      { productName: "Ragi No. 01", productNameTa: "ராகி நம்பர் 01", optionLabel: "Box of 6", optionLabelTa: "6 துண்டு பெட்டி", formulationLabel:"Eggless", formulationLabelTa:"முட்டையில்லா", priceLabel: "₹590", quantity: 1 },
    ],
    subtotalLabel: "₹1,830",
    hasQuotationSelection: false,
    details: { name: "Sangeetha", phone: "9940058623", date: "2026-09-10", fulfilment: "Delivery within Chennai", pincode: "600117", address: "Chennai", notes: "No note" },
  };
  const english = buildWhatsAppOrderMessage({ ...base, language: "en" });
  assert.match(english, /^Hello San Bakes, I would like to place a preorder\./);
  assert.match(english, /Walnut Reserve · Box of 6 · Regular \(with egg\) · ₹620 × 2/);
  assert.match(english, /Ragi No\. 01 · Box of 6 · Eggless · ₹590 × 1/);
  assert.match(english, /SUBTOTAL: ₹1,830/);
  assert.match(english, /Required date: 2026-09-10/);
  assert.match(english, /Fulfilment: Delivery within Chennai/);
  assert.doesNotMatch(english, /^Formulation:/m);

  const tamil = buildWhatsAppOrderMessage({ ...base, language: "ta" });
  assert.match(tamil, /^வணக்கம் San Bakes/);
  assert.match(tamil, /வால்நட் ரிசர்வ் · 6 துண்டு பெட்டி · வழக்கமானது \(முட்டையுடன்\) · ₹620 × 2/);
  assert.match(tamil, /ராகி நம்பர் 01 · 6 துண்டு பெட்டி · முட்டையில்லா · ₹590 × 1/);
  assert.match(tamil, /இடைக்கூட்டுத்தொகை: ₹1,830/);
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
  assert.match(cupcakes, /Box, composition &amp; formulation/);
  assert.match(cupcakes, /Regular \(with egg\)/);
  assert.match(cupcakes, /Eggless/);
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
  assert.match(faq, /Can every product be ordered Eggless/);
  assert.match(faq, /not presented as vegan or allergen-free/);
  assert.match(faq, /Are San Bakes products healthy/);
  assert.match(faq, /How does UPI payment work/);
  assert.match(faq, /Cupcake boxes of 6 need at least three days/);
  assert.match(faq, /Corporate orders start at seven days/);
  assert.match(faq, /Corporate orders start at 25 individually packed brownies/);
  assert.doesNotMatch(faq, /25 four-piece boxes|₹12,250/);
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
  assert.equal((gifting.match(/<small>PERSONAL GIFT<\/small>/g) ?? []).length, 5);
  assert.doesNotMatch(gifting, /₹15,000/);
  const giftingMenu = await (await render("/menu?category=gifting")).text();
  assert.match(giftingMenu, /Signature Discovery Box/);
  assert.match(giftingMenu, /Seasonal Hamper/);
  assert.doesNotMatch(giftingMenu, /Corporate Mini Box/);
  const corporate = await (await render("/corporate")).text();
  assert.match(corporate, /CORPORATE ORDERS/);
  assert.match(corporate, /Corporate orders start at 25 individually packed brownies/);
  assert.doesNotMatch(corporate, /The corporate minimum is 25 boxes \/ ₹12,250|₹15,000/);
  assert.match(corporate, /Individually Packed Party Brownies/);
  assert.match(corporate, /Corporate Mini Box/);
  assert.match(corporate, /25–49 boxes · 2 Ragi \+ 2 Walnut · per box/);
  assert.match(corporate, /Add 25 boxes to cart/);
  assert.match(corporate, /Regular \(with egg\)/);
  assert.match(corporate, /Eggless/);
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
  assert.match(parties, /Regular \(with egg\)/);
  assert.match(parties, /Eggless/);
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
  assert.match(review, /Regular and Eggless formulations/);
  assert.match(review, /Every product can be ordered Regular \(with egg\) or Eggless/);
  assert.match(review, /distance-based charge for addresses beyond 20 km/);
  assert.doesNotMatch(review, /Egg formulation only at launch|Egg at launch|offers the egg formulation only/i);
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
