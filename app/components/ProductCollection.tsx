"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useInventory } from "./InventoryProvider";
import { usePreorder } from "./PreorderProvider";
import { ProductChoiceSelect } from "./ProductChoiceSelect";
import { isInventoryUnavailable } from "../lib/inventory";
import { formatPrice, getMinimumOrderQuantity, getPricing, makeSelectionKey, parseSelectionKey } from "../lib/pricing";
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
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
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
          const selectedKey = selectedChoices[product.id] ?? makeSelectionKey(product.id, pricing.options[0].id, "regular");
          const { optionId } = parseSelectionKey(selectedKey);
          const selectedOption = pricing.options.find((item) => item.id === optionId) ?? pricing.options[0];
          const minimumQuantity = getMinimumOrderQuantity(product.id, selectedOption.id);
          const unavailable = isInventoryUnavailable(getInventory(product.id).status);
          const category = categories.find((item) => item.id === product.category);

          return (
            <article className="menuCard" key={product.id}>
              <a href={`/products/${product.id}`} aria-label={`${en ? "View" : "பார்க்க"} ${en ? product.name : product.nameTa}`} style={{ display: "block" }}>
                <div className={`menuCardImage ${product.image ? "" : "imagePlaceholder"}`}>
                  {product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 24vw" /> : <span>SAN<br />BAKES</span>}
                </div>
              </a>
              <div className="menuCardBody">
                <p className="cardEyebrow">{en ? category?.name : category?.nameTa}</p>
                <h3><a href={`/products/${product.id}`}>{en ? product.name : product.nameTa}</a></h3>
                <p>{en ? product.description : product.descriptionTa}</p>
                <label className="variantPicker">
                  <span>{en ? "Pack, quantity & formulation" : "பேக், அளவு & தயாரிப்பு வகை"}</span>
                  <ProductChoiceSelect language={language} pricing={pricing} productId={product.id} value={selectedKey} onChange={(choice) => setSelectedChoices((current) => ({ ...current, [product.id]:choice }))} />
                  <small>{en ? selectedOption.note : selectedOption.noteTa}</small>
                </label>
                <div className="productPurchaseRow">
                  <div className="selectedPrice"><span>{en ? "Price" : "விலை"}</span><strong>{formatPrice(selectedOption.price)}</strong></div>
                  <button className="button buttonCacao" disabled={unavailable} onClick={() => addItem(selectedKey, minimumQuantity)} type="button">
                    {unavailable ? (en ? "Preorders paused" : "முன்பதிவு இடைநிறுத்தப்பட்டுள்ளது") : minimumQuantity > 1 ? (en ? `Add ${minimumQuantity} boxes to cart` : `${minimumQuantity} பெட்டிகளை கார்ட்டில் சேர்க்க`) : (en ? "Add to cart" : "கார்ட்டில் சேர்க்க")}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {count > 0 && <div className="basketDock"><span>{en ? `${count} unit${count === 1 ? "" : "s"} in your cart` : `கார்ட்டில் ${count} யூனிட்கள்`}</span><a className="button buttonLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>}
    </section>
  );
}
