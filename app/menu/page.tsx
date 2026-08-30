"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { usePreorder } from "../components/PreorderProvider";
import { decisionLabel, formatPrice, getPricing, makeSelectionKey } from "../lib/pricing";
import { categories, products, statusLabel } from "../lib/products";

export default function MenuPage() {
  const query = useSearchParams();
  const initial = query.get("category");
  const [active, setActive] = useState(initial && categories.some((c) => c.id === initial) ? initial : "all");
  const [selectedOptions, setSelectedOptions] = useState<Record<string,string>>({});
  const { language } = useLanguage();
  const { addItem, count } = usePreorder();
  const en = language === "en";
  const visible = useMemo(() => active === "all" ? products : products.filter((product) => product.category === active), [active]);

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
            <div><strong>{en ? "Brownie Tins" : "பிரௌனி டின்கள்"}</strong><span>₹549–₹2,850</span><small>{en ? "3 pieces per Tin · single or 2/3/5-Tin flights" : "ஒரு டினில் 3 துண்டுகள் · ஒரு டின் அல்லது 2/3/5 டின் தொகுப்பு"}</small></div>
            <div><strong>{en ? "Millet tea cakes" : "சிறுதானிய டீ கேக்குகள்"}</strong><span>₹723–₹808</span><small>{en ? "Recipe/yield validation pending" : "ரெசிபி சோதனை நிலுவையில்"}</small></div>
            <div><strong>{en ? "Birthday brownie cakes" : "பிறந்தநாள் பிரௌனி கேக்குகள்"}</strong><span>₹808–₹2,678</span><small>{en ? "Classic finish · 250 g to 1 kg" : "கிளாசிக் அலங்காரம் · 250 கிராம் முதல் 1 கிலோ"}</small></div>
            <div><strong>{en ? "Cupcakes" : "கப் கேக்குகள்"}</strong><span>{en ? "Planning ₹1,097 / 6" : "திட்ட விலை ₹1,097 / 6"}</span><small>{en ? "Transport test pending" : "போக்குவரத்து சோதனை நிலுவையில்"}</small></div>
            <div><strong>{en ? "Brownie Tubs" : "பிரௌனி டப்கள்"}</strong><span>₹382–₹467</span><small>{en ? "Revised single-tub prices · validation required" : "திருத்திய ஒரு டப் விலை · சோதனை தேவை"}</small></div>
          </div>
        </div>
        <div className="filterBar" aria-label="Filter menu by collection">
          {categories.map((category) => <button className={active === category.id ? "active" : ""} key={category.id} onClick={() => setActive(category.id)} type="button">{en ? category.name : category.nameTa}</button>)}
        </div>
        <div className="menuNotice"><strong>{en ? "Enquiry mode" : "விசாரணை நிலை"}</strong><span>{en ? "Online checkout is intentionally disabled while FSSAI registration and final recipe validation are pending." : "FSSAI பதிவு மற்றும் இறுதி ரெசிபி சோதனை நிலுவையில் உள்ளதால் ஆன்லைன் கட்டணம் முடக்கப்பட்டுள்ளது."}</span></div>
        <div className="menuGrid">
          {visible.map((product) => {
            const pricing = getPricing(product.id);
            const selectedId = selectedOptions[product.id] ?? pricing.options[0].id;
            const selectedOption = pricing.options.find((item) => item.id === selectedId) ?? pricing.options[0];
            return <article className="menuCard" key={product.id}>
              <div className={`menuCardImage ${product.image ? "" : "imagePlaceholder"}`}>
                {product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw" /> : <span>SAN<br />BAKES</span>}
                <span className={`statusBadge ${product.status}`}>{en ? statusLabel[product.status].en : statusLabel[product.status].ta}</span>
              </div>
              <div className="menuCardBody">
                <p className="cardEyebrow">{en ? categories.find((c) => c.id === product.category)?.name : categories.find((c) => c.id === product.category)?.nameTa}</p>
                <h2>{en ? product.name : product.nameTa}</h2>
                <p>{en ? product.description : product.descriptionTa}</p>
                <div className={`decisionLine ${pricing.decision}`}><span>{en ? decisionLabel[pricing.decision].en : decisionLabel[pricing.decision].ta}</span><small>{product.format}</small></div>
                <label className="variantPicker">
                  <span>{en ? "Pack / quantity option" : "பேக் / அளவு விருப்பம்"}</span>
                  <select value={selectedOption.id} onChange={(event) => setSelectedOptions((current) => ({ ...current, [product.id]:event.target.value }))}>
                    {pricing.options.map((item) => <option value={item.id} key={item.id}>{en ? item.label : item.labelTa} — {formatPrice(item.price)}</option>)}
                  </select>
                  <small>{en ? selectedOption.note : selectedOption.noteTa}</small>
                </label>
                <div className="selectedPrice"><span>{en ? "Recommended price" : "பரிந்துரைக்கப்பட்ட விலை"}</span><strong>{formatPrice(selectedOption.price)}</strong></div>
                <button className="button buttonCacao" onClick={() => addItem(makeSelectionKey(product.id,selectedOption.id))} type="button">{en ? "Add option to enquiry" : "விருப்பத்தை விசாரணையில் சேர்க்க"}</button>
              </div>
            </article>;
          })}
        </div>
        {count > 0 && <div className="basketDock"><span>{en ? `${count} item${count === 1 ? "" : "s"} in your enquiry` : `விசாரணையில் ${count} பொருட்கள்`}</span><Link className="button buttonLight" href="/preorder">{en ? "Review enquiry" : "விசாரணையைப் பார்க்க"}</Link></div>}
      </section>
    </main>
  );
}
