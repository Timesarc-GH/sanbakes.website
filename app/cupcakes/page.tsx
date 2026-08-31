"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { useInventory } from "../components/InventoryProvider";
import { usePreorder } from "../components/PreorderProvider";
import { ProductChoiceSelect } from "../components/ProductChoiceSelect";
import { isInventoryUnavailable } from "../lib/inventory";
import { formatPrice, getPricing, makeSelectionKey, parseSelectionKey } from "../lib/pricing";
import { products } from "../lib/products";

const cupcakeProducts = products.filter((product) => product.category === "cupcakes");

const cupcakeFlavours = [
  { en: "Dark Cacao Ragi", ta: "டார்க் காகாவ் ராகி", note: "Cacao-led · millet crumb" },
  { en: "Walnut Cacao", ta: "வால்நட் காகாவ்", note: "Toasted walnut" },
  { en: "Pista Cardamom", ta: "பிஸ்தா ஏலக்காய்", note: "Measured cardamom finish" },
  { en: "Strawberry Cacao", ta: "ஸ்ட்ராபெரி காகாவ்", note: "Seasonal availability" },
  { en: "Caramelised Biscuit Crunch", ta: "கரமேலைஸ் பிஸ்கட் கிரஞ்ச்", note: "Caramelised biscuit crunch" },
  { en: "Chocolate Wafer Crunch", ta: "சாக்லேட் வேஃபர் கிரஞ்ச்", note: "Chocolate wafer finish" },
];

export default function CupcakesPage() {
  const { language } = useLanguage();
  const { getInventory } = useInventory();
  const { addItem, count } = usePreorder();
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const en = language === "en";

  return (
    <main className="cupcakePage">
      <section className="cupcakeHero">
        <div>
          <p className="eyebrow">CUPCAKES · AVAILABLE TO PREORDER</p>
          <h1>{en ? "Cupcakes, considered from crumb to carry." : "கப் கேக்குகள் — சுவையிலிருந்து பாதுகாப்பான பயணம் வரை கவனமாக."}</h1>
          <p>{en ? "Order Dark Cacao Ragi, Pista Cardamom or the six-flavour Discovery Collection in boxes of 6, 9 or 12. Select your box below and add it directly to the preorder cart." : "டார்க் காகாவ் ராகி, பிஸ்தா ஏலக்காய் அல்லது ஆறு சுவை டிஸ்கவரி தொகுப்பை 6, 9 அல்லது 12 பெட்டிகளில் ஆர்டர் செய்யலாம். கீழே பெட்டியைத் தேர்ந்து முன்பதிவு கார்ட்டில் சேர்க்கவும்."}</p>
          <div className="cupcakeHeroActions"><a className="button buttonLight" href="#cupcake-collection">{en ? "Choose a Cupcake box" : "கப் கேக் பெட்டியைத் தேர்வு செய்ய"}</a><a className="button buttonOutlineLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>
        </div>
        <aside>
          <span>{en ? "Ordering format" : "ஆர்டர் வடிவம்"}</span>
          <strong>{en ? "Boxes of 6, 9 or 12" : "6, 9 அல்லது 12 பெட்டிகள்"}</strong>
          <p>{en ? "Every cupcake is secured in its own fitted holder inside a deeper cupcake-specific presentation box." : "ஒவ்வொரு கப் கேக்கும் ஆழமான கப் கேக் பெட்டியில் தனித்தனி பொருத்தப்பட்ட ஹோல்டரில் பாதுகாக்கப்படுகிறது."}</p>
        </aside>
      </section>

      <section className="menuSection cupcakeCollection" id="cupcake-collection">
        <div className="menuNotice"><strong>{en ? "Available to preorder" : "முன்பதிவுக்கு கிடைக்கும்"}</strong><span>{en ? "Choose a collection and box size, add it to your cart and place the complete order through WhatsApp. Pay only after San Bakes confirms availability, delivery and the final total." : "தொகுப்பு மற்றும் பெட்டி அளவைத் தேர்ந்து கார்ட்டில் சேர்த்து, முழு ஆர்டரை WhatsApp மூலம் அனுப்பவும். கிடைப்பு, டெலிவரி மற்றும் இறுதி மொத்தத்தை San Bakes உறுதி செய்த பிறகு மட்டும் கட்டணம் செலுத்தவும்."}</span></div>
        <div className="menuGrid">
          {cupcakeProducts.map((product) => {
            const pricing = getPricing(product.id);
            const selectedKey = selectedChoices[product.id] ?? makeSelectionKey(product.id, pricing.options[0].id, "regular");
            const { optionId } = parseSelectionKey(selectedKey);
            const selectedOption = pricing.options.find((item) => item.id === optionId) ?? pricing.options[0];
            const unavailable = isInventoryUnavailable(getInventory(product.id).status);
            return <article className="menuCard" key={product.id}>
              <a href={`/products/${product.id}`} aria-label={`${en ? "View" : "பார்க்க"} ${en ? product.name : product.nameTa}`} style={{ display: "block" }}>
                <div className="menuCardImage">
                  {product.image && <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 24vw" />}
                </div>
              </a>
              <div className="menuCardBody">
                <p className="cardEyebrow">{en ? "CUPCAKE COLLECTION" : "கப் கேக் தொகுப்பு"}</p>
                <h2><a href={`/products/${product.id}`}>{en ? product.name : product.nameTa}</a></h2>
                <p>{en ? product.description : product.descriptionTa}</p>
                <label className="variantPicker"><span>{en ? "Box, composition & formulation" : "பெட்டி, கலவை & தயாரிப்பு வகை"}</span><ProductChoiceSelect language={language} pricing={pricing} productId={product.id} value={selectedKey} onChange={(choice) => setSelectedChoices((current) => ({ ...current, [product.id]:choice }))} /><small>{en ? selectedOption.note : selectedOption.noteTa}</small></label>
                <div className="productPurchaseRow">
                  <div className="selectedPrice"><span>{en ? "Price" : "விலை"}</span><strong>{formatPrice(selectedOption.price)}</strong></div>
                  <button className="button buttonCacao" disabled={unavailable} onClick={() => addItem(selectedKey)} type="button">{unavailable ? (en ? "Preorders paused" : "முன்பதிவு இடைநிறுத்தப்பட்டுள்ளது") : (en ? "Add to cart" : "கார்ட்டில் சேர்க்க")}</button>
                </div>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className="cupcakePlan">
        <div className="cupcakePlanIntro"><p className="eyebrow dark">THE BOX FORMAT</p><h2>{en ? "Six identities. Three box sizes." : "ஆறு சுவைகள். மூன்று பெட்டி அளவுகள்."}</h2><p>{en ? "Every size uses a larger, deeper cupcake-specific box with one fitted individual holder for each cupcake—clearly distinct from the compact Brownie boxes." : "ஒவ்வொரு அளவிலும் ஒவ்வொரு கப் கேக்கிற்கும் தனி ஹோல்டர் கொண்ட பெரிய, ஆழமான கப் கேக் பெட்டி பயன்படுத்தப்படும்; இது பிரௌனி பெட்டிகளிலிருந்து தெளிவாக வேறுபடும்."}</p></div>
        <div className="cupcakeFacts"><article><span>06</span><strong>{en ? "Discovery" : "டிஸ்கவரி"}</strong><p>{en ? "One of each of the six flavours, or a single-flavour box." : "ஆறு சுவைகளில் ஒவ்வொன்றும் ஒன்று அல்லது ஒரே சுவை பெட்டி."}</p></article><article><span>09</span><strong>{en ? "Gathering" : "கேதரிங்"}</strong><p>{en ? "Six flavours plus three selected repeats, or a single-flavour box." : "ஆறு சுவைகள் மற்றும் தேர்ந்தெடுத்த மூன்று மறுபதிப்புகள் அல்லது ஒரே சுவை பெட்டி."}</p></article><article><span>12</span><strong>{en ? "Full collection" : "முழு தொகுப்பு"}</strong><p>{en ? "Two of each flavour, or one flavour throughout." : "ஒவ்வொரு சுவையிலும் இரண்டு அல்லது ஒரே சுவை முழுவதும்."}</p></article></div>
      </section>

      <section className="cupcakeFlavours">
        <div><p className="eyebrow">FLAVOURS</p><h2>{en ? "Familiar cues, a quieter finish." : "பழக்கமான சுவைகள், அளவான அலங்காரம்."}</h2></div>
        <ol>{cupcakeFlavours.map((flavour, index) => <li key={flavour.en}><span>{String(index + 1).padStart(2, "0")}</span><strong>{en ? flavour.en : flavour.ta}</strong><small>{flavour.note}</small></li>)}</ol>
      </section>

      <section className="cupcakeGate"><div><p className="eyebrow dark">ORDERING & CARE</p><h2>{en ? "Made after you order." : "ஆர்டருக்குப் பிறகு தயாரிக்கப்படுகிறது."}</h2></div><ul><li>{en ? "Choose Regular (with egg) or Eggless inside the same box selector; the kitchen still handles egg and other declared allergens." : "அதே பெட்டி தேர்வில் வழக்கமானது (முட்டையுடன்) அல்லது முட்டையில்லா என்பதைத் தேர்ந்தெடுக்கலாம்; சமையலறையில் முட்டை மற்றும் அறிவிக்கப்பட்ட பிற அலர்ஜன்கள் கையாளப்படுகின்றன."}</li><li>{en ? "Preorder boxes of 6 at least three days ahead; boxes of 9 or 12 need at least five days." : "6 பெட்டிக்கு குறைந்தது 3 நாட்களும், 9 அல்லது 12 பெட்டிக்கு குறைந்தது 5 நாட்களும் முன்பதிவு தேவை."}</li><li>{en ? "Every cupcake travels in an individual holder with adequate frosting clearance." : "ஒவ்வொரு கப் கேக்கும் ஃப்ராஸ்டிங் இடைவெளியுடன் தனித்தனி ஹோல்டரில் அனுப்பப்படும்."}</li><li>{en ? "Chennai delivery is confirmed by route; additional distance-based charges apply beyond 20 km." : "சென்னை டெலிவரி பாதைக்கு ஏற்ப உறுதி செய்யப்படும்; 20 கி.மீ.க்கு அப்பால் கூடுதல் தூரக் கட்டணம் பொருந்தும்."}</li></ul></section>

      {count > 0 && <div className="basketDock"><span>{en ? `${count} item${count === 1 ? "" : "s"} in your cart` : `கார்ட்டில் ${count} பொருட்கள்`}</span><a className="button buttonLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>}
    </main>
  );
}
