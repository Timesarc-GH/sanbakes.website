"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useInventory } from "./InventoryProvider";
import { usePreorder } from "./PreorderProvider";
import { inventoryStatusLabel, isInventoryUnavailable } from "../lib/inventory";
import { formatPrice, getMinimumOrderQuantity, getPricing, makeSelectionKey } from "../lib/pricing";
import { categories, findProduct } from "../lib/products";

type ProductCollectionProps = {
  productIds: string[];
  eyebrowEn: string;
  eyebrowTa: string;
  titleEn: string;
  titleTa: string;
  introEn: string;
  introTa: string;
};

export function ProductCollection({ productIds, eyebrowEn, eyebrowTa, titleEn, titleTa, introEn, introTa }: ProductCollectionProps) {
  const { language } = useLanguage();
  const { getInventory } = useInventory();
  const { addItem, count } = usePreorder();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const en = language === "en";
  const collection = productIds.map(findProduct).filter((product) => Boolean(product));

  return (
    <section className="menuSection dedicatedCollection">
      <div className="offerIntro collectionIntro">
        <p className="eyebrow dark">{en ? eyebrowEn : eyebrowTa}</p>
        <h2>{en ? titleEn : titleTa}</h2>
        <p>{en ? introEn : introTa}</p>
      </div>
      <div className="menuGrid">
        {collection.map((product) => {
          if (!product) return null;
          const pricing = getPricing(product.id);
          const selectedId = selectedOptions[product.id] ?? pricing.options[0].id;
          const selectedOption = pricing.options.find((item) => item.id === selectedId) ?? pricing.options[0];
          const minimumQuantity = getMinimumOrderQuantity(product.id, selectedOption.id);
          const availability = getInventory(product.id);
          const unavailable = isInventoryUnavailable(availability.status);
          const availabilityNote = en ? availability.noteEn : availability.noteTa || availability.noteEn;
          const category = categories.find((item) => item.id === product.category);

          return (
            <article className="menuCard" key={product.id}>
              <div className={`menuCardImage ${product.image ? "" : "imagePlaceholder"}`}>
                {product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw" /> : <span>SAN<br />BAKES</span>}
                {availability.updatedAt && <span className={`stockBadge ${availability.status}`}>{en ? inventoryStatusLabel[availability.status].en : inventoryStatusLabel[availability.status].ta}{availability.availableQuantity !== null && availability.status !== "out_of_stock" ? ` · ${availability.availableQuantity}` : ""}</span>}
              </div>
              <div className="menuCardBody">
                <p className="cardEyebrow">{en ? category?.name : category?.nameTa}</p>
                <h3>{en ? product.name : product.nameTa}</h3>
                <p>{en ? product.description : product.descriptionTa}</p>
                <div className="productMeta"><span>{en ? "Format" : "வடிவம்"}</span><small>{product.format}</small></div>
                {(availabilityNote || unavailable) && <div className={`availabilityLine ${availability.status}`}><strong>{en ? inventoryStatusLabel[availability.status].en : inventoryStatusLabel[availability.status].ta}</strong>{availabilityNote && <span>{availabilityNote}</span>}</div>}
                <label className="variantPicker">
                  <span>{en ? "Pack / quantity option" : "பேக் / அளவு விருப்பம்"}</span>
                  <select value={selectedOption.id} onChange={(event) => setSelectedOptions((current) => ({ ...current, [product.id]: event.target.value }))}>
                    {pricing.options.map((item) => <option value={item.id} key={item.id}>{en ? item.label : item.labelTa} — {formatPrice(item.price)}</option>)}
                  </select>
                  <small>{en ? selectedOption.note : selectedOption.noteTa}</small>
                </label>
                <div className="selectedPrice"><span>{en ? "Price" : "விலை"}</span><strong>{formatPrice(selectedOption.price)}</strong></div>
                <button className="button buttonCacao" disabled={unavailable} onClick={() => addItem(makeSelectionKey(product.id, selectedOption.id), minimumQuantity)} type="button">
                  {unavailable ? (en ? "Currently unavailable" : "தற்போது கிடைக்கவில்லை") : minimumQuantity > 1 ? (en ? `Add ${minimumQuantity} boxes to cart` : `${minimumQuantity} பெட்டிகளை கார்ட்டில் சேர்க்க`) : (en ? "Add to cart" : "கார்ட்டில் சேர்க்க")}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {count > 0 && <div className="basketDock"><span>{en ? `${count} unit${count === 1 ? "" : "s"} in your cart` : `கார்ட்டில் ${count} யூனிட்கள்`}</span><a className="button buttonLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>}
    </section>
  );
}
