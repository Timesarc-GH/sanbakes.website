"use client";

import Image from "next/image";
import { useState } from "react";
import { useInventory } from "../../components/InventoryProvider";
import { useLanguage } from "../../components/LanguageProvider";
import { usePreorder } from "../../components/PreorderProvider";
import { isInventoryUnavailable } from "../../lib/inventory";
import { formatPrice, getMinimumOrderQuantity, makeSelectionKey, type ProductPricing } from "../../lib/pricing";
import type { Product } from "../../lib/products";
import styles from "./product-detail.module.css";

type ProductDetailClientProps = {
  product: Product;
  pricing: ProductPricing;
  category: { name: string; nameTa: string };
};

function collectionHref(category: string) {
  if (category === "cupcakes") return "/cupcakes";
  if (category === "parties") return "/parties";
  if (category === "corporate") return "/corporate";
  if (category === "gifting") return "/gifting";
  return "/menu";
}

function leadTime(productId: string, category: string, optionId: string, minimumQuantity: number) {
  if (productId === "bespoke-corporate") {
    return { en: "Allow 7–21 calendar days, depending on branding and delivery requirements.", ta: "பிராண்டிங் மற்றும் டெலிவரி தேவைகளுக்கு ஏற்ப 7–21 நாட்கள் ஒதுக்கவும்." };
  }
  if (productId === "corporate-mini-box") {
    const days = minimumQuantity >= 50 ? 10 : 7;
    return { en: `Preorder at least ${days} calendar days ahead.`, ta: `குறைந்தது ${days} நாட்களுக்கு முன் முன்பதிவு செய்யவும்.` };
  }
  if (category === "cupcakes") {
    const days = optionId === "box-6" ? 3 : 5;
    return { en: `Preorder at least ${days} calendar days ahead.`, ta: `குறைந்தது ${days} நாட்களுக்கு முன் முன்பதிவு செய்யவும்.` };
  }
  if (productId === "party-single-brownies") {
    const days = optionId.includes("100") ? 10 : optionId.includes("50") ? 7 : 5;
    return { en: `Preorder at least ${days} calendar days ahead.`, ta: `குறைந்தது ${days} நாட்களுக்கு முன் முன்பதிவு செய்யவும்.` };
  }
  if (productId === "party-brownie-tins" || productId === "party-brownie-tubs") {
    const days = optionId === "larger" ? 7 : 5;
    return { en: `Preorder at least ${days} calendar days ahead.`, ta: `குறைந்தது ${days} நாட்களுக்கு முன் முன்பதிவு செய்யவும்.` };
  }
  if (category === "parties") {
    return { en: "Preorder at least 5 calendar days ahead.", ta: "குறைந்தது 5 நாட்களுக்கு முன் முன்பதிவு செய்யவும்." };
  }
  if (productId === "seasonal-hamper") {
    return { en: "Enquire early; seasonal contents and the preparation window are confirmed for your date.", ta: "முன்கூட்டியே விசாரிக்கவும்; பருவகால உள்ளடக்கம் மற்றும் தயாரிப்பு நேரம் உங்கள் தேதிக்காக உறுதி செய்யப்படும்." };
  }
  return { en: "Preorder at least 48 hours ahead; your slot is confirmed after the production schedule is reviewed.", ta: "குறைந்தது 48 மணி நேரத்திற்கு முன் முன்பதிவு செய்யவும்; தயாரிப்பு அட்டவணை சரிபார்க்கப்பட்ட பிறகு ஸ்லாட் உறுதி செய்யப்படும்." };
}

export function ProductDetailClient({ product, pricing, category }: ProductDetailClientProps) {
  const { language } = useLanguage();
  const { getInventory, loading } = useInventory();
  const { addItem, count } = usePreorder();
  const [selectedId, setSelectedId] = useState(pricing.options[0].id);
  const [added, setAdded] = useState(false);
  const en = language === "en";
  const selectedOption = pricing.options.find((option) => option.id === selectedId) ?? pricing.options[0];
  const minimumQuantity = getMinimumOrderQuantity(product.id, selectedOption.id);
  const availability = getInventory(product.id);
  const insufficientQuantity = availability.availableQuantity !== null && availability.availableQuantity < minimumQuantity;
  const unavailable = isInventoryUnavailable(availability.status) || insufficientQuantity;
  const lead = leadTime(product.id, product.category, selectedOption.id, minimumQuantity);
  const backHref = collectionHref(product.category);

  const addSelectedOption = () => {
    addItem(makeSelectionKey(product.id, selectedOption.id), minimumQuantity);
    setAdded(true);
  };

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <a href={backHref}>← {en ? "Back to collection" : "தொகுப்பிற்குத் திரும்பு"}</a>
        <span aria-hidden="true">/</span>
        <span>{en ? category.name : category.nameTa}</span>
      </div>

      <section className={styles.product}>
        <div className={`${styles.media} ${product.image ? "" : styles.placeholder}`}>
          {product.image
            ? <Image src={product.image} alt={en ? product.name : product.nameTa} fill priority sizes="(max-width: 780px) 92vw, 52vw" />
            : <span>SAN<br />BAKES</span>}
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>{en ? category.name : category.nameTa}</p>
          <h1>{en ? product.name : product.nameTa}</h1>
          <p className={styles.description}>{en ? product.description : product.descriptionTa}</p>

          <div className={`${styles.preorderStatus} ${unavailable ? styles.preordersPaused : ""}`} aria-live="polite">
            <strong>{loading ? (en ? "Confirming preorder status" : "முன்பதிவு நிலை உறுதி செய்யப்படுகிறது") : unavailable ? (en ? "Preorders currently paused" : "முன்பதிவு தற்போது இடைநிறுத்தப்பட்டுள்ளது") : (en ? "Preorder only" : "முன்பதிவு மட்டும்")}</strong>
            <small>{unavailable ? (en ? "Please choose another product or ask us on WhatsApp." : "வேறு தயாரிப்பைத் தேர்ந்தெடுக்கவும் அல்லது WhatsApp-ல் கேட்கவும்.") : (en ? "Your date and production slot are confirmed personally before payment." : "கட்டணத்திற்கு முன் தேதி மற்றும் தயாரிப்பு ஸ்லாட் தனிப்பட்ட முறையில் உறுதி செய்யப்படும்.")}</small>
          </div>

          <label className={styles.variant}>
            <span>{en ? "Choose your pack or composition" : "பேக் அல்லது கலவையைத் தேர்ந்தெடுக்கவும்"}</span>
            <select
              value={selectedOption.id}
              onChange={(event) => {
                setSelectedId(event.target.value);
                setAdded(false);
              }}
            >
              {pricing.options.map((option) => (
                <option value={option.id} key={option.id}>
                  {en ? option.label : option.labelTa} — {formatPrice(option.price)}
                </option>
              ))}
            </select>
            <small>{en ? selectedOption.note : selectedOption.noteTa}</small>
          </label>

          <div className={styles.orderNote}>
            <span>{en ? "Preparation guidance" : "தயாரிப்பு வழிகாட்டல்"}</span>
            <p>{en ? lead.en : lead.ta}</p>
          </div>

          <div className={styles.purchase}>
            <div className={styles.price}>
              <span>{en ? "Price" : "விலை"}</span>
              <strong>{formatPrice(selectedOption.price)}</strong>
              {minimumQuantity > 1 && <small>{en ? `Minimum ${minimumQuantity} boxes` : `குறைந்தபட்சம் ${minimumQuantity} பெட்டிகள்`}</small>}
            </div>
            <button type="button" disabled={unavailable || loading} onClick={addSelectedOption}>
              {loading
                ? (en ? "Confirming preorder" : "முன்பதிவு உறுதி செய்யப்படுகிறது")
                : unavailable
                  ? (en ? "Preorders paused" : "முன்பதிவு இடைநிறுத்தப்பட்டுள்ளது")
                  : minimumQuantity > 1
                    ? (en ? `Add ${minimumQuantity} boxes to cart` : `${minimumQuantity} பெட்டிகளை கார்ட்டில் சேர்க்க`)
                    : (en ? "Add to cart" : "கார்ட்டில் சேர்க்க")}
            </button>
          </div>

          {added && (
            <div className={styles.added} role="status">
              <span>{en ? "Added to your preorder cart." : "முன்பதிவு கார்ட்டில் சேர்க்கப்பட்டது."}</span>
              <a href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"} →</a>
            </div>
          )}
        </div>
      </section>

      <section className={styles.assurance} aria-label={en ? "Ordering information" : "ஆர்டர் தகவல்"}>
        <article>
          <span>01</span>
          <strong>{en ? "Made after you preorder" : "முன்பதிவுக்குப் பிறகு தயாரிக்கப்படும்"}</strong>
          <p>{en ? "Your date and selected option are confirmed before payment." : "கட்டணத்திற்கு முன் உங்கள் தேதி மற்றும் தேர்வு உறுதி செய்யப்படும்."}</p>
        </article>
        <article>
          <span>02</span>
          <strong>{en ? "Delivery within Chennai" : "சென்னைக்குள் டெலிவரி"}</strong>
          <p>{en ? "The live delivery charge is added after your address is reviewed." : "உங்கள் முகவரி சரிபார்க்கப்பட்ட பிறகு டெலிவரி கட்டணம் சேர்க்கப்படும்."}</p>
        </article>
        <article>
          <span>03</span>
          <strong>{en ? "Pay after confirmation" : "உறுதிப்படுத்திய பிறகு கட்டணம்"}</strong>
          <p>{en ? "Send the cart on WhatsApp first, then pay the confirmed total by UPI." : "முதலில் WhatsApp மூலம் கார்ட்டை அனுப்பி, உறுதி செய்யப்பட்ட மொத்தத்தை UPI மூலம் செலுத்தவும்."}</p>
        </article>
      </section>

      {count > 0 && !added && (
        <div className={styles.cartLink}>
          <span>{en ? `${count} unit${count === 1 ? "" : "s"} in your cart` : `கார்ட்டில் ${count} யூனிட்கள்`}</span>
          <a href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a>
        </div>
      )}
    </main>
  );
}
