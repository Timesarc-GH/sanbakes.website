"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { useInventory } from "../components/InventoryProvider";
import { usePreorder } from "../components/PreorderProvider";
import { ProductChoiceSelect } from "../components/ProductChoiceSelect";
import { isInventoryUnavailable } from "../lib/inventory";
import { formatPrice, getPricing, makeSelectionKey, parseSelectionKey } from "../lib/pricing";
import { categories, menuCategories, products } from "../lib/products";

const groupedCategoryProducts: Record<string, Set<string>> = {
  gifting: new Set(["signature-discovery-box", "reserve-collection", "brownie-tin-3-piece", "whole-brownie-tin", "seasonal-hamper"]),
  corporate: new Set(["corporate-mini-box", "bespoke-corporate", "party-single-brownies", "party-brownie-tins", "party-brownie-tubs"]),
};

const mainMenuProducts = products.filter((product) => !["cupcakes", "parties", "corporate"].includes(product.category));

export default function MenuPage() {
  const query = useSearchParams();
  const initial = query.get("category");
  const [active, setActive] = useState(initial && menuCategories.some((c) => c.id === initial) ? initial : "all");
  const [selectedChoices, setSelectedChoices] = useState<Record<string,string>>({});
  const { language } = useLanguage();
  const { getInventory } = useInventory();
  const { addItem, count } = usePreorder();
  const en = language === "en";
  const visible = useMemo(() => active === "all" ? mainMenuProducts : mainMenuProducts.filter((product) => groupedCategoryProducts[active]?.has(product.id) ?? product.category === active), [active]);

  return (
    <main>
      <section className="innerHero shopHero menuHero">
        <p className="eyebrow">THE SAN BAKES COLLECTION</p>
        <h1>{en ? "The Brownie preorder collection" : "பிரௌனி முன்பதிவு தொகுப்பு"}</h1>
        <p>{en ? "Signature Brownies, boxes, Tins, Tubs, millet tea cakes and personal gifting formats—made in small batches after you reserve." : "சிக்னேச்சர் பிரௌனிகள், பெட்டிகள், டின்கள், டப்கள், சிறுதானிய டீ கேக்குகள் மற்றும் தனிப்பட்ட பரிசுகள்—முன்பதிவுக்குப் பிறகு சிறிய தொகுதிகளாக தயாரிக்கப்படும்."}</p>
        <div className="innerHeroActions"><a className="button buttonLight" href="#brownie-collection">{en ? "Choose a Brownie" : "பிரௌனியைத் தேர்ந்தெடுக்க"}</a><a className="button buttonOutlineLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>
      </section>
      <section className="menuSection shopCollection" id="brownie-collection">
        <div className="filterBar" aria-label="Filter menu by collection">
          {menuCategories.map((category) => <button className={active === category.id ? "active" : ""} key={category.id} onClick={() => setActive(category.id)} type="button">{en ? category.name : category.nameTa}</button>)}
        </div>
        <div className="menuNotice"><strong>{en ? "Preorder cart" : "முன்பதிவு கார்ட்"}</strong><span>{en ? "Add a pack, review the subtotal and send the completed order on WhatsApp. Pay by UPI only after San Bakes confirms the final total." : "பேக்கை சேர்த்து, மொத்தத்தை சரிபார்த்து முழுமையான ஆர்டரை WhatsApp-ல் அனுப்புங்கள். San Bakes இறுதி மொத்தத்தை உறுதி செய்த பிறகு மட்டும் UPI மூலம் செலுத்துங்கள்."}</span></div>
        <div className="menuGrid">
          {visible.map((product) => {
            const pricing = getPricing(product.id);
            const selectedKey = selectedChoices[product.id] ?? makeSelectionKey(product.id, pricing.options[0].id, "regular");
            const { optionId } = parseSelectionKey(selectedKey);
            const selectedOption = pricing.options.find((item) => item.id === optionId) ?? pricing.options[0];
            const unavailable = isInventoryUnavailable(getInventory(product.id).status);
            return <article className="menuCard" key={product.id}>
              <a href={`/products/${product.id}`} aria-label={`${en ? "View" : "பார்க்க"} ${en ? product.name : product.nameTa}`} style={{ display: "block" }}>
                <div className={`menuCardImage ${product.image ? "" : "imagePlaceholder"}`}>
                  {product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 24vw" /> : <span>SAN<br />BAKES</span>}
                </div>
              </a>
              <div className="menuCardBody">
                <p className="cardEyebrow">{en ? categories.find((c) => c.id === product.category)?.name : categories.find((c) => c.id === product.category)?.nameTa}</p>
                <h2><a href={`/products/${product.id}`}>{en ? product.name : product.nameTa}</a></h2>
                <p>{en ? product.description : product.descriptionTa}</p>
                <label className="variantPicker">
                  <span>{en ? "Pack, quantity & formulation" : "பேக், அளவு & தயாரிப்பு வகை"}</span>
                  <ProductChoiceSelect language={language} pricing={pricing} productId={product.id} value={selectedKey} onChange={(choice) => setSelectedChoices((current) => ({ ...current, [product.id]:choice }))} />
                  <small>{en ? selectedOption.note : selectedOption.noteTa}</small>
                </label>
                <div className="productPurchaseRow">
                  <div className="selectedPrice"><span>{en ? "Price" : "விலை"}</span><strong>{formatPrice(selectedOption.price)}</strong></div>
                  <button className="button buttonCacao" disabled={unavailable} onClick={() => addItem(selectedKey)} type="button">{unavailable ? (en ? "Preorders paused" : "முன்பதிவு இடைநிறுத்தப்பட்டுள்ளது") : (en ? "Add to cart" : "கார்ட்டில் சேர்க்க")}</button>
                </div>
              </div>
            </article>;
          })}
        </div>
        {count > 0 && <div className="basketDock"><span>{en ? `${count} item${count === 1 ? "" : "s"} in your cart` : `கார்ட்டில் ${count} பொருட்கள்`}</span><a className="button buttonLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>}
      </section>
    </main>
  );
}
