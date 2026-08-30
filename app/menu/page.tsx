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
  gifting: new Set(["signature-discovery-box", "reserve-collection", "brownie-tin-3-piece", "brownie-tin-flight", "seasonal-hamper"]),
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
        <h1>{en ? "The preorder menu" : "முன்பதிவு மெனு"}</h1>
        <p>{en ? "A focused collection for everyday indulgence, considered gifting and celebrations. Planning prices are provisional until recipe, yield and supplier-cost validation is complete." : "தினசரி மகிழ்ச்சி, பரிசுகள் மற்றும் கொண்டாட்டங்களுக்கான மெனு. ரெசிபி மற்றும் செலவு சோதனை முடியும் வரை திட்டமிட்ட விலைகள் தற்காலிகமானவை."}</p>
      </section>
      <section className="menuSection">
        <div className="priceGuide">
          <div className="priceGuideHead"><p className="eyebrow dark">{en ? "LAUNCH PRICING GUIDE" : "அறிமுக விலை வழிகாட்டி"}</p><h2>{en ? "A clear starting point." : "தெளிவான தொடக்க விலை."}</h2><p>{en ? "These are recommended planning prices. A WhatsApp confirmation will state the final recipe, size, customisation, delivery fee and total before payment." : "இவை பரிந்துரைக்கப்பட்ட திட்டமிட்ட விலைகள். கட்டணத்திற்கு முன் இறுதி ரெசிபி, அளவு, தனிப்பயன், டெலிவரி மற்றும் மொத்த விலை WhatsApp மூலம் உறுதி செய்யப்படும்."}</p></div>
          <div className="priceGuideGrid">
            <div><strong>{en ? "Brownie boxes" : "பிரௌனி பெட்டிகள்"}</strong><span>₹927–₹1,352</span><small>{en ? "Core 6 or 9-piece boxes" : "முக்கிய 6 அல்லது 9 துண்டு பெட்டிகள்"}</small></div>
            <div><strong>{en ? "Brownie Tins" : "பிரௌனி டின்கள்"}</strong><span>₹549–₹3,390</span><small>{en ? "3 pieces per Tin · single or 2/3/5/6-Tin flights" : "ஒரு டினில் 3 துண்டுகள் · ஒரு டின் அல்லது 2/3/5/6 டின் தொகுப்பு"}</small></div>
            <div><strong>{en ? "Millet tea cakes" : "சிறுதானிய டீ கேக்குகள்"}</strong><span>₹723–₹808</span><small>{en ? "Recipe/yield validation pending" : "ரெசிபி சோதனை நிலுவையில்"}</small></div>
            <div><strong>{en ? "Birthdays & parties" : "பிறந்தநாள் & பார்ட்டி"}</strong><span>{en ? "Cakes ₹808–₹3,250" : "கேக்குகள் ₹808–₹3,250"}</span><small>{en ? "Packed brownies from 25 · Tins/Tubs from 10" : "தனித்தனி பிரௌனிகள் 25 முதல் · டின்கள்/டப்கள் 10 முதல்"}</small></div>
            <div><strong>{en ? "Brownie Tubs" : "பிரௌனி டப்கள்"}</strong><span>₹382–₹467</span><small>{en ? "Revised single-tub prices · validation required" : "திருத்திய ஒரு டப் விலை · சோதனை தேவை"}</small></div>
            <div><strong>{en ? "Personal gifting" : "தனிப்பட்ட பரிசுகள்"}</strong><span>₹927–₹2,990</span><small>{en ? "Curated boxes, Tins and seasonal hampers" : "தேர்ந்தெடுத்த பெட்டிகள், டின்கள் மற்றும் பருவகால ஹாம்பர்கள்"}</small></div>
            <div><strong>{en ? "Corporate" : "நிறுவன ஆர்டர்கள்"}</strong><span>{en ? "From 25 boxes / ₹15,000" : "25 பெட்டிகள் / ₹15,000 முதல்"}</span><small>{en ? "Separate proposal, branding and fulfilment rules" : "தனி விலை, பிராண்டிங் மற்றும் நிறைவேற்றும் விதிகள்"}</small></div>
          </div>
        </div>
        <div className="menuCrossLink"><div><strong>{en ? "Cupcakes have their own planned-launch page." : "கப் கேக்குகளுக்கு தனி திட்டமிட்ட அறிமுக பக்கம் உள்ளது."}</strong><span>{en ? "Preview boxes of 6, 9 and 12, the proposed flavours and validation gates." : "6, 9 மற்றும் 12 பெட்டிகள், திட்டமிட்ட சுவைகள் மற்றும் சோதனை நிலைகளைப் பாருங்கள்."}</span></div><a className="button buttonCacao" href="/cupcakes">{en ? "Preview Cupcakes" : "கப் கேக்குகளைப் பார்க்க"}</a></div>
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
