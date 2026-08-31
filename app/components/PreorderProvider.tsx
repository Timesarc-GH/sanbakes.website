"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { sanitiseItems, type EnquiryItems } from "../lib/cart";

const CART_STORAGE_KEY = "san-bakes-enquiry";
const CART_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type StoredEnquiry = {
  items: EnquiryItems;
  expiresAt: number;
};

function removeSavedItems() {
  try {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } catch {
    // Browser storage can be unavailable in private or restricted contexts.
  }
}

function saveItems(next: EnquiryItems, expiresAt = Date.now() + CART_TTL_MS) {
  try {
    if (Object.keys(next).length === 0) {
      removeSavedItems();
      return;
    }
    const stored: StoredEnquiry = { items: next, expiresAt };
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // The cart still works for this visit when browser storage is unavailable.
  }
}

const PreorderContext = createContext<{
  items: EnquiryItems;
  count: number;
  addItem: (id: string, quantity?: number) => void;
  updateItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}>({
  items: {},
  count: 0,
  addItem: () => undefined,
  updateItem: () => undefined,
  removeItem: () => undefined,
  clearItems: () => undefined,
});

export function PreorderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EnquiryItems>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as unknown;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid cart");
      const isStoredEnquiry = "items" in parsed;
      if (isStoredEnquiry) {
        const stored = parsed as Partial<StoredEnquiry>;
        if (typeof stored.expiresAt !== "number" || stored.expiresAt <= Date.now()) {
          removeSavedItems();
          return;
        }
      }
      // Legacy two-part selection keys are migrated to the Regular formulation without losing quantities.
      const restored = sanitiseItems(isStoredEnquiry ? (parsed as Partial<StoredEnquiry>).items : parsed);
      if (Object.keys(restored).length === 0) {
        removeSavedItems();
        return;
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(restored);
      saveItems(restored, isStoredEnquiry ? (parsed as Partial<StoredEnquiry>).expiresAt : undefined);
    } catch {
      removeSavedItems();
    }
  }, []);

  const commit = useCallback((next: EnquiryItems) => {
    setItems(next);
    saveItems(next);
  }, []);

  const value = useMemo(
    () => ({
      items,
      count: Object.values(items).reduce((sum, quantity) => sum + quantity, 0),
      addItem: (id: string, quantity = 1) => commit({ ...items, [id]: (items[id] ?? 0) + quantity }),
      updateItem: (id: string, quantity: number) => {
        if (quantity <= 0) {
          const next = { ...items };
          delete next[id];
          commit(next);
          return;
        }
        commit({ ...items, [id]: quantity });
      },
      removeItem: (id: string) => {
        const next = { ...items };
        delete next[id];
        commit(next);
      },
      clearItems: () => {
        setItems({});
        removeSavedItems();
      },
    }),
    [commit, items],
  );

  return <PreorderContext.Provider value={value}>{children}</PreorderContext.Provider>;
}

export function usePreorder() {
  return useContext(PreorderContext);
}
