"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type EnquiryItems = Record<string, number>;

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
    const saved = window.localStorage.getItem("san-bakes-enquiry");
    if (!saved) return;
    try {
      // Restore the locally saved enquiry after hydration; no customer data leaves the browser here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(JSON.parse(saved) as EnquiryItems);
    } catch {
      window.localStorage.removeItem("san-bakes-enquiry");
    }
  }, []);

  const commit = (next: EnquiryItems) => {
    setItems(next);
    window.localStorage.setItem("san-bakes-enquiry", JSON.stringify(next));
  };

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
      clearItems: () => commit({}),
    }),
    [items],
  );

  return <PreorderContext.Provider value={value}>{children}</PreorderContext.Provider>;
}

export function usePreorder() {
  return useContext(PreorderContext);
}
