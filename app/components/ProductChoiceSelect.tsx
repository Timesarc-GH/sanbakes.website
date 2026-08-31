"use client";

import { formatPrice, makeSelectionKey, productFormulations, type ProductPricing } from "../lib/pricing";

type ProductChoiceSelectProps = {
  language: "en" | "ta";
  onChange: (selectionKey:string) => void;
  pricing: ProductPricing;
  productId: string;
  value: string;
};

export function ProductChoiceSelect({ language, onChange, pricing, productId, value }:ProductChoiceSelectProps) {
  const en = language === "en";
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {pricing.options.flatMap((option) => productFormulations.map((formulation) => (
        <option value={makeSelectionKey(productId, option.id, formulation.id)} key={`${option.id}-${formulation.id}`}>
          {en ? option.label : option.labelTa} · {en ? formulation.label : formulation.labelTa} — {formatPrice(option.price)}
        </option>
      )))}
    </select>
  );
}
