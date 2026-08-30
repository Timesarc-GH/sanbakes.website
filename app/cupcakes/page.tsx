"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { useInventory } from "../components/InventoryProvider";
import { usePreorder } from "../components/PreorderProvider";
import { inventoryStatusLabel, isInventoryUnavailable } from "../lib/inventory";
import { decisionLabel, formatPrice, getPricing, makeSelectionKey } from "../lib/pricing";
import { products, statusLabel } from "../lib/products";

const cupcakeProducts = products.filter((product) => product.category === "cupcakes");

const plannedFlavours = [
  { en: "Dark Cacao Ragi", ta: "டார்க் காகாவ் ராகி", note: "Cacao-led · millet crumb" },
  { en: "Walnut Cacao", ta: "வால்நட் காகாவ்", note: "Toasted walnut" },
  { en: "Pista Cardamom", ta: "பிஸ்தா ஏலக்காய்", note: "Measured cardamom finish" },
  { en: "Strawberry Cacao", ta: "ஸ்ட்ராபெரி காகாவ்", note: "Seasonal · cold-chain validation" },
  { en: "Biscoff Crunch", ta: "பிஸ்காஃப் கிரஞ்ச்", note: "Ingredient verification required" },
  { en: "Chocolate Wafer Crunch", ta: "சாக்லேட் வேஃபர் கிரஞ்ச்", note: "Ingredient verification required" },
];

export default function CupcakesPage() {
  const { language } = useLanguage();
  const { getInventory } = useInventory();
  const { addItem, count } = usePreorder();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const en = language === "en";

  return (
    <main className="cupcakePage">
      <section className="cupcakeHero">
        <div>
          <p className="eyebrow">PLANNED NEW LAUNCH · COMING SOON</p>
          <h1>{en ? "Cupcakes, considered from crumb to carry." : "கப் கேக்குகள் — சுவையிலிருந்து பாதுகாப்பான பயணம் வரை கவனமாக."}</h1>
          <p>{en ? "A separate phase-two collection in boxes of 6, 9 and 12. The names, photography and planning prices are ready for review; recipes, inserts and the full 20 km transport test must pass before release." : "6, 9 மற்றும் 12 பெட்டிகளில் தனி இரண்டாம் கட்ட தொகுப்பு. பெயர்கள், படங்கள் மற்றும் திட்டமிட்ட விலைகள் மதிப்பாய்வுக்கு தயாராக உள்ளன; அறிமுகத்திற்கு முன் ரெசிபி, இன்சர்ட் மற்றும் 20 கி.மீ. போக்குவரத்து சோதனை நிறைவேற வேண்டும்."}</p>
          <div className="cupcakeHeroActions"><a className="button buttonLight" href="#planned-collection">{en ? "Preview the collection" : "தொகுப்பைப் பார்க்க"}</a><a className="button buttonOutlineLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>
        </div>
        <aside>
          <span>{en ? "Launch rule" : "அறிமுக விதி"}</span>
          <strong>{en ? "No single cupcakes" : "ஒற்றை கப் கேக் இல்லை"}</strong>
          <p>{en ? "Box-led ordering protects the premium presentation and makes small-batch production predictable." : "பெட்டி அடிப்படையிலான ஆர்டர் பிரீமியம் தோற்றத்தையும் சிறிய தொகுதி தயாரிப்பையும் பாதுகாக்கிறது."}</p>
        </aside>
      </section>

      <section className="cupcakePlan">
        <div className="cupcakePlanIntro"><p className="eyebrow dark">THE PROPOSED FORMAT</p><h2>{en ? "Six identities. Three box sizes." : "ஆறு சுவைகள். மூன்று பெட்டி அளவுகள்."}</h2><p>{en ? "The product-first structure uses clearly named flavours and box-led selection. San Bakes keeps its own cacao, millet and restrained-finish point of view." : "தெளிவாக பெயரிடப்பட்ட சுவைகளும் பெட்டி அடிப்படையிலான தேர்வும் மையமாக இருக்கும். San Bakes தனது காகாவ், சிறுதானியம் மற்றும் அளவான அலங்கார அடையாளத்தைத் தொடர்கிறது."}</p></div>
        <div className="cupcakeFacts"><article><span>06</span><strong>{en ? "Discovery" : "டிஸ்கவரி"}</strong><p>{en ? "One of each planned flavour when all six pass validation." : "ஆறு சுவைகளும் சோதனையை கடந்தால் ஒவ்வொன்றிலும் ஒன்று."}</p></article><article><span>09</span><strong>{en ? "Gathering" : "கேதரிங்"}</strong><p>{en ? "Six flavours plus three selected repeats, or a controlled single-flavour box." : "ஆறு சுவைகள் மற்றும் தேர்ந்தெடுத்த மூன்று மறுபதிப்புகள் அல்லது ஒரே சுவை பெட்டி."}</p></article><article><span>12</span><strong>{en ? "Full collection" : "முழு தொகுப்பு"}</strong><p>{en ? "Two of each planned flavour, or one validated flavour throughout." : "ஒவ்வொரு சுவையிலும் இரண்டு அல்லது ஒரே சோதிக்கப்பட்ட சுவை முழுவதும்."}</p></article></div>
      </section>

      <section className="cupcakeFlavours">
        <div><p className="eyebrow">PLANNED FLAVOURS</p><h2>{en ? "Familiar cues, a quieter finish." : "பழக்கமான சுவைகள், அளவான அலங்காரம்."}</h2></div>
        <ol>{plannedFlavours.map((flavour, index) => <li key={flavour.en}><span>{String(index + 1).padStart(2, "0")}</span><strong>{en ? flavour.en : flavour.ta}</strong><small>{flavour.note}</small></li>)}</ol>
      </section>

      <section className="menuSection cupcakeCollection" id="planned-collection">
        <div className="menuNotice"><strong>{en ? "Coming soon" : "விரைவில் வருகிறது"}</strong><span>{en ? "You may add a planned box to the cart for review. Production and UPI payment remain subject to San Bakes confirming the launch and total on WhatsApp." : "திட்டமிட்ட பெட்டியை மதிப்பாய்வுக்காக கார்ட்டில் சேர்க்கலாம். தயாரிப்பும் UPI கட்டணமும் San Bakes WhatsApp-ல் அறிமுகம் மற்றும் மொத்தத்தை உறுதி செய்வதற்கு உட்பட்டவை."}</span></div>
        <div className="menuGrid">
          {cupcakeProducts.map((product) => {
            const pricing = getPricing(product.id);
            const selectedId = selectedOptions[product.id] ?? pricing.options[0].id;
            const selectedOption = pricing.options.find((item) => item.id === selectedId) ?? pricing.options[0];
            const availability = getInventory(product.id);
            const unavailable = isInventoryUnavailable(availability.status);
            const availabilityNote = en ? availability.noteEn : availability.noteTa || availability.noteEn;
            return <article className="menuCard" key={product.id}>
              <div className="menuCardImage">
                {product.image && <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw" />}
                <span className={`statusBadge ${product.status}`}>{en ? statusLabel[product.status].en : statusLabel[product.status].ta}</span>
                {availability.updatedAt && <span className={`stockBadge ${availability.status}`}>{en ? inventoryStatusLabel[availability.status].en : inventoryStatusLabel[availability.status].ta}{availability.availableQuantity !== null && availability.status !== "out_of_stock" ? ` · ${availability.availableQuantity}` : ""}</span>}
              </div>
              <div className="menuCardBody">
                <p className="cardEyebrow">{en ? "PLANNED CUPCAKE COLLECTION" : "திட்டமிட்ட கப் கேக் தொகுப்பு"}</p>
                <h2>{en ? product.name : product.nameTa}</h2>
                <p>{en ? product.description : product.descriptionTa}</p>
                <div className={`decisionLine ${pricing.decision}`}><span>{en ? decisionLabel[pricing.decision].en : decisionLabel[pricing.decision].ta}</span><small>{product.format}</small></div>
                {(availabilityNote || unavailable) && <div className={`availabilityLine ${availability.status}`}><strong>{en ? inventoryStatusLabel[availability.status].en : inventoryStatusLabel[availability.status].ta}</strong>{availabilityNote && <span>{availabilityNote}</span>}</div>}
                <label className="variantPicker"><span>{en ? "Box / composition option" : "பெட்டி / கலவை விருப்பம்"}</span><select value={selectedOption.id} onChange={(event) => setSelectedOptions((current) => ({ ...current, [product.id]: event.target.value }))}>{pricing.options.map((item) => <option value={item.id} key={item.id}>{en ? item.label : item.labelTa} — {formatPrice(item.price)}</option>)}</select><small>{en ? selectedOption.note : selectedOption.noteTa}</small></label>
                <div className="selectedPrice"><span>{en ? "Planned price" : "திட்டமிட்ட விலை"}</span><strong>{formatPrice(selectedOption.price)}</strong></div>
                <button className="button buttonCacao" disabled={unavailable} onClick={() => addItem(makeSelectionKey(product.id, selectedOption.id))} type="button">{unavailable ? (en ? "Currently unavailable" : "தற்போது கிடைக்கவில்லை") : (en ? "Add planned box to cart" : "திட்டமிட்ட பெட்டியை கார்ட்டில் சேர்க்க")}</button>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className="cupcakeGate"><div><p className="eyebrow dark">RELEASE GATES</p><h2>{en ? "The images are concepts. The launch must earn them." : "படங்கள் ஒரு கருத்து. அறிமுகம் அதை உண்மையாக்க வேண்டும்."}</h2></div><ul><li>{en ? "Final Egg and Eggless recipe yield, allergen declaration and shelf-life record." : "இறுதி முட்டை மற்றும் முட்டையில்லா ரெசிபி யீல்ட், அலர்ஜன் மற்றும் சேமிப்பு பதிவு."}</li><li>{en ? "Low-profile finish that survives two hours ambient and a validated 20 km route." : "இரண்டு மணி நேர அறை வெப்பமும் 20 கி.மீ. சோதனை பயணமும் தாங்கும் அலங்காரம்."}</li><li>{en ? "6, 9 and 12-cavity inserts tested for movement, smearing and handover." : "6, 9 மற்றும் 12 இட இன்சர்ட்கள் நகர்வு, தடவல் மற்றும் ஒப்படைப்பு சோதனை."}</li><li>{en ? "Biscoff and wafer flavours released only after ingredient-brand and allergen verification." : "பிஸ்காஃப் மற்றும் வேஃபர் சுவைகள் பொருள் பிராண்ட் மற்றும் அலர்ஜன் சோதனைக்குப் பிறகு மட்டும்."}</li></ul></section>

      {count > 0 && <div className="basketDock"><span>{en ? `${count} item${count === 1 ? "" : "s"} in your cart` : `கார்ட்டில் ${count} பொருட்கள்`}</span><a className="button buttonLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>}
    </main>
  );
}
