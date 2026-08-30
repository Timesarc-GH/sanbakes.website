"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultInventory, isInventoryStatus, type InventoryRecord } from "../lib/inventory";

type InventoryMap = Record<string, InventoryRecord>;

const InventoryContext = createContext<{
  inventory: InventoryMap;
  loading: boolean;
  getInventory: (productId: string) => InventoryRecord;
  refreshInventory: () => Promise<void>;
}>({
  inventory: {},
  loading: true,
  getInventory: defaultInventory,
  refreshInventory: async () => undefined,
});

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [inventory, setInventory] = useState<InventoryMap>({});
  const [loading, setLoading] = useState(true);

  const refreshInventory = useCallback(async () => {
    try {
      const response = await fetch("/api/inventory", { cache: "no-store" });
      if (!response.ok) throw new Error("Inventory unavailable");
      const payload = await response.json() as { inventory?: Array<Partial<InventoryRecord>> };
      const next: InventoryMap = {};
      for (const row of payload.inventory ?? []) {
        if (!row.productId || !isInventoryStatus(row.status)) continue;
        next[row.productId] = {
          productId: row.productId,
          status: row.status,
          availableQuantity: typeof row.availableQuantity === "number" ? row.availableQuantity : null,
          noteEn: typeof row.noteEn === "string" ? row.noteEn : "",
          noteTa: typeof row.noteTa === "string" ? row.noteTa : "",
          updatedAt: typeof row.updatedAt === "string" ? row.updatedAt : null,
        };
      }
      setInventory(next);
    } catch {
      // Missing inventory data must never hide the catalogue; products remain available by default.
      setInventory({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Availability is runtime data and must refresh after the static catalogue hydrates.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshInventory();
  }, [refreshInventory]);

  const value = useMemo(() => ({
    inventory,
    loading,
    getInventory: (productId: string) => inventory[productId] ?? defaultInventory(productId),
    refreshInventory,
  }), [inventory, loading, refreshInventory]);

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  return useContext(InventoryContext);
}
