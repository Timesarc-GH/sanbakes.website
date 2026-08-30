"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { useInventory } from "../components/InventoryProvider";
import { usePreorder } from "../components/PreorderProvider";
import { inventoryStatusLabel, isInventoryUnavailable } from "../lib/inventory";
import { decisionLabel, formatPrice, getPricing, makeSelectionKey } from "../lib/pricing";
import { categories, menuCategories, products, statusLabel } from "../lib/products";

const groupedCategoryProducts: Record<string, Set<string>> = {
  gifting: new Set(["signature-discovery-box", "reserve-collection", "brownie-tin-3-piece", "whole-brownie-tin", "seasonal-hamper"]),
  corporate: new Set(["corporate-mini-box", "bespoke-corporate", "party-single-brownies", "party-brownie-tins", "party-brownie-tubs"]),
};

const mainMenuProducts = products.filter((product) => !["cupcakes", "parties", "corporate"].includes(product.category));

export default function MenuPage() {
  const query = useSearchParams();
  const initial = query.get("category");
  const [active, setActive] = useState(initial && menuCategories.some((c) => c.id === initial) ? initial : "all");
  const [selectedOptions, setSelectedOptions] = useState<Record<string,string>>({});
  const { language } = useLanguage();
  const { getInventory } = useInventory();
  const { addItem, count } = usePreorder();
  const en = language === "en";
  const visible = useMemo(() => active === "all" ? mainMenuProducts : mainMenuProducts.filter((product) => groupedCategoryProducts[active]?.has(product.id) ?? product.category === active), [active]);

  return (
    <main>
      <section className="innerHero menuHero">
        <p className="eyebrow">THE SAN BAKES COLLECTION</p>
        <h1>{en ? "The Brownie preorder collection" : "பிரௌனி முன்பதிவு தொகுப்பு"}</h1>
        <p>{en ? "Signature Brownies, boxes, Tins, Tubs, millet tea cakes and personal gifting formats—made in small batches after you reserve." : "சிக்னேச்சர் பிரௌனிகள், பெட்டிகள், டின்கள், டப்கள், சிறுதானிய டீ கேக்குகள் மற்றும் தனிப்பட்ட பரிசுகள்—முன்பதிவுக்குப் பிறகு சிறிய தொகுதிகளாக தயாரிக்கப்படும்."}</p>
      </section>
      <section className="menuSection">
        <div className="filterBar" aria-label="Filter menu by collection">
          {menuCategories.map((category) => <button className={active === category.id ? "active" : ""} key={category.id} onClick={() => setActive(category.id)} type="button">{en ? category.name : category.nameTa}</button>)}
        </div>
        <div className="menuNotice"><strong>{en ? "Preorder cart" : "முன்பதிவு கார்ட்"}</strong><span>{en ? "Add a pack, review the planning subtotal and send the completed order on WhatsApp. Pay by UPI only after San Bakes confirms the total." : "பேக்கை சேர்த்து, திட்டமிட்ட மொத்தத்தை சரிபார்த்து முழுமையான ஆர்டரை WhatsApp-ல் அனுப்புங்கள். San Bakes மொத்தத்தை உறுதி செய்த பிறகு மட்டும் UPI மூலம் செலுத்துங்கள்."}</span></div>
        <div className="menuGrid">
          {visible.map((product) => {
            const pricing = getPricing(product.id);
            const selectedId = selectedOptions[product.id] ?? pricing.options[0].id;
            const selectedOption = pricing.options.find((item) => item.id === selectedId) ?? pricing.options[0];
            const availability = getInventory(product.id);
            const unavailable = isInventoryUnavailable(availability.status);
            const availabilityNote = en ? availability.noteEn : availability.noteTa || availability.noteEn;
            return <article className="menuCard" key={product.id}>
              <div className={`menuCardImage ${product.image ? "" : "imagePlaceholder"}`}>
                {product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw" /> : <span>SAN<br />BAKES</span>}
                <span className={`statusBadge ${product.status}`}>{en ? statusLabel[product.status].en : statusLabel[product.status].ta}</span>
                {availability.updatedAt && <span className={`stockBadge ${availability.status}`}>{en ? inventoryStatusLabel[availability.status].en : inventoryStatusLabel[availability.status].ta}{availability.availableQuantity !== null && availability.status !== "out_of_stock" ? ` · ${availability.availableQuantity}` : ""}</span>}
              </div>
              <div className="menuCardBody">
                <p className="cardEyebrow">{en ? categories.find((c) => c.id === product.category)?.name : categories.find((c) => c.id === product.category)?.nameTa}</p>
                <h2>{en ? product.name : product.nameTa}</h2>
                <p>{en ? product.description : product.descriptionTa}</p>
                <div className={`decisionLine ${pricing.decision}`}><span>{en ? decisionLabel[pricing.decision].en : decisionLabel[pricing.decision].ta}</span><small>{product.format}</small></div>
                {(availabilityNote || unavailable) && <div className={`availabilityLine ${availability.status}`}><strong>{en ? inventoryStatusLabel[availability.status].en : inventoryStatusLabel[availability.status].ta}</strong>{availabilityNote && <span>{availabilityNote}</span>}</div>}
                <label className="variantPicker">
                  <span>{en ? "Pack / quantity option" : "பேக் / அளவு விருப்பம்"}</span>
                  <select value={selectedOption.id} onChange={(event) => setSelectedOptions((current) => ({ ...current, [product.id]:event.target.value }))}>
                    {pricing.options.map((item) => <option value={item.id} key={item.id}>{en ? item.label : item.labelTa} — {formatPrice(item.price)}</option>)}
                  </select>
                  <small>{en ? selectedOption.note : selectedOption.noteTa}</small>
                </label>
                <div className="selectedPrice"><span>{en ? "Recommended price" : "பரிந்துரைக்கப்பட்ட விலை"}</span><strong>{formatPrice(selectedOption.price)}</strong></div>
                <button className="button buttonCacao" disabled={unavailable} onClick={() => addItem(makeSelectionKey(product.id,selectedOption.id))} type="button">{unavailable ? (en ? "Currently unavailable" : "தற்போது கிடைக்கவில்லை") : (en ? "Add to cart" : "கார்ட்டில் சேர்க்க")}</button>
              </div>
            </article>;
          })}
        </div>
        {count > 0 && <div className="basketDock"><span>{en ? `${count} item${count === 1 ? "" : "s"} in your cart` : `கார்ட்டில் ${count} பொருட்கள்`}</span><a className="button buttonLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>}
      </section>
    </main>
  );
}
