import { makeSelectionKey, parseSelectionKey } from "./pricing.ts";

export type EnquiryItems = Record<string, number>;

export function sanitiseItems(value:unknown):EnquiryItems {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.entries(value).reduce<EnquiryItems>((items, [key, quantity]) => {
    if (typeof quantity !== "number" || !Number.isFinite(quantity) || quantity <= 0) return items;
    const segments = key.split("::");
    if ((segments.length !== 2 && segments.length !== 3) || !segments[0] || !segments[1]) return items;
    if (segments.length === 3 && segments[2] !== "regular" && segments[2] !== "eggless") return items;
    const { productId, optionId, formulation } = parseSelectionKey(key);
    const canonicalKey = makeSelectionKey(productId, optionId, formulation);
    items[canonicalKey] = (items[canonicalKey] ?? 0) + Math.floor(quantity);
    return items;
  }, {});
}
