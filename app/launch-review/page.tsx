import { formatPrice, getPricing } from "../lib/pricing";
import { products } from "../lib/products";

const operationalGroups = [
  { title:"Brownie Tins", approach:"Keep two distinct formats. The Three-Piece Brownie Tin contains three separate brownie pieces in 3+0, 2+1 or 1+1+1 compositions at ₹310–₹360. The Whole Brownie Tin is one continuous brownie slab—not separate pieces—with one, two or three divided flavour-topping sections at ₹360.", checks:"Validate the net weight and liner separately for each format; confirm topping-section stability, packaging cost, flavour availability, allergens, storage and short-/long-route condition tests." },
  { title:"Brownie Tubs", approach:"Use ₹270 for one target-250 g Classic or Loaded Tub and ₹490 for a two-Tub duo.", checks:"Confirm actual net weight, chocolate/drizzle specification, topping allergens, kraft-tub seal, spoonability and margin." },
  { title:"Millet Tea Cakes", approach:"Use ₹420 for one target-450 g loaf and ₹790 for a two-loaf gift duo in either listed flavour.", checks:"Confirm exact millet quantity, baked yield, slice count, shelf life, loaf packaging and supplier prices." },
  { title:"Celebration Classics & Strawberry", approach:"Keep them limited rather than part of the ingredient-led flagship collection.", checks:"Confirm brand-specific ingredient panels, allergens, fresh-fruit sourcing, cold-chain risk and seasonal availability." },
  { title:"Birthday Brownie Cakes", approach:"Use classic and reserve-nut finishes only; include one short message and charge for toppers separately.", checks:"Confirm finished net weight, serving guide, message limit, board/box cost and route suitability by size." },
  { title:"Birthday & Party Orders", approach:"Use a five-day minimum for standard events, seven days for 50+ packed brownies or 20+ Tins/Tubs, and 10–14 days for 100+ units or custom artwork. Minimums: 25 individually packed brownies and 10 Tins or Tubs.", checks:"Confirm individual food-safe pack and label cost, event batch yield, sealing, guest-format handling, Chennai transport suitability and realistic weekly home-kitchen capacity." },
  { title:"Corporate Programme", approach:"Keep Corporate separate from Personal Gifting. Use seven days standard, 10 days for 50+ units, 14 days for branded sleeves and 14–21 days for multi-address fulfilment.", checks:"Confirm the company proposal template, GST/entity requirements, artwork proofing, print minimums, payment/settlement account, invoice process and delivery manifest." },
];

export default function LaunchReviewPage() {
  const allOptions = products.flatMap((product) => getPricing(product.id).options);
  const fixedPriceCount = allOptions.filter((item) => item.price !== null).length;
  const customPriceCount = allOptions.length - fixedPriceCount;

  return <main className="reviewPage">
    <section className="reviewHero">
      <p className="eyebrow">OWNER REFERENCE · DO NOT PUBLISH</p>
      <h1>Approved V5 menu, quantities and prices.</h1>
      <p>Every populated New Price value from the V5 Price Review sheet is now treated as an approved selling price and used directly without an additional discount or rounding rule.</p>
      <div className="reviewHeroActions"><a className="button buttonLight" href="/menu">Open customer menu</a><a className="button buttonOutlineLight" href="/preorder">Test preorder flow</a></div>
    </section>

    <section className="reviewSection">
      <div className="domainStatus"><span>DOMAINS</span><strong>sanbakes.com · sanbakes.in · sanbakes.co.in</strong><p>Purchased for two years. Registration is in progress; DNS and custom-domain connection have not been activated.</p></div>
      <div className="reviewSummary">
        <article><small>CATALOGUE</small><strong>{products.length} products</strong><span>Brownies, Tins, Tubs, tea cakes, celebrations, cupcakes and gifting</span></article>
        <article><small>APPROVED V5 PRICES</small><strong>{fixedPriceCount} fixed options</strong><span>Owner-entered prices are used directly throughout the website</span></article>
        <article><small>CUSTOM PRICING</small><strong>{customPriceCount} bespoke option</strong><span>Bespoke Corporate Gifting remains individually priced because scope varies</span></article>
        <article><small>FORMULATION</small><strong>Egg at launch</strong><span>The current customer menu offers the egg formulation only</span></article>
      </div>

      <div className="reviewDecision">
        <div><p className="eyebrow dark">COMMERCIAL RULES</p><h2>The approved operating model.</h2></div>
        <ol>
          <li><strong>Egg formulation only at launch</strong><span>Alternative formulations remain outside the launch menu until a separate recipe and process are complete.</span></li>
          <li><strong>Cupcakes active for preorder</strong><span>Boxes of 6, 9 and 12 are orderable from the dedicated Cupcakes page with three- or five-day minimum lead times.</span></li>
          <li><strong>Delivery charged separately</strong><span>Pass through the live courier quote and add the distance-based charge for addresses beyond 20 km to the confirmed order total.</span></li>
          <li><strong>One short cake message included</strong><span>Reserve-nut finish, toppers, sleeves, artwork and complex changes are paid additions.</span></li>
          <li><strong>Party minimums</strong><span>25 individually packed brownies; 10 Brownie Tins or 10 Brownie Tubs.</span></li>
          <li><strong>Five-day event cutoff</strong><span>Use seven days for 50+ packed brownies or 20+ Tins/Tubs and 10–14 days for 100+ units or custom artwork.</span></li>
          <li><strong>50% event deposit</strong><span>Reserve the slot after written confirmation; balance due three business days before party handover.</span></li>
          <li><strong>V5 prices are direct selling prices</strong><span>Use each owner-entered amount exactly; do not apply the retired 30% revision again.</span></li>
          <li><strong>Re-cost at a 5% input change</strong><span>Review chocolate, pistachio, walnut and packaging costs monthly.</span></li>
        </ol>
      </div>

      <div className="reviewTableWrap">
        <div className="reviewTableHead"><p className="eyebrow dark">COMPLETE V5 PRICE LIST</p><h2>Every approved priced option.</h2><p>Prices exclude delivery and paid customisation. Bespoke Corporate Gifting remains individually priced because branding, packaging and fulfilment vary.</p></div>
        <div className="reviewTable">
          <div className="reviewRow reviewColumns"><span>Product</span><span>Pack / quantity and price</span></div>
          {products.map((product) => {
            const pricing = getPricing(product.id);
            return <div className="reviewRow" key={product.id}>
              <span><strong>{product.name}</strong><small>{product.format}</small></span>
              <span>{pricing.options.map((item) => <span className="reviewOption" key={item.id}><b>{item.label}</b><span className="reviewPrice"><strong>{formatPrice(item.price)}</strong></span><small>{item.note}</small></span>)}</span>
            </div>;
          })}
        </div>
      </div>

      <div className="validationSection">
        <div><p className="eyebrow dark">OPERATIONAL CHECKLIST</p><h2>Checks that protect quality and reliable fulfilment.</h2></div>
        <div className="validationGrid">{operationalGroups.map((group,index) => <article key={group.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{group.title}</h3><strong>Operating approach</strong><p>{group.approach}</p><strong>Verify</strong><p>{group.checks}</p></article>)}</div>
      </div>

      <div className="approvalPrompt"><div><p className="eyebrow">NEXT OPERATIONS REVIEW</p><h2>Confirm recipes, packaging and capacity separately.</h2><p>The V5 selling prices are approved. Continue checking yield, packaging, availability and fulfilment without displaying price-review statuses to customers.</p></div><a className="button buttonLight" href="/menu">Review the customer menu</a></div>
    </section>
  </main>;
}
