export const inventoryStatuses = ["in_stock", "low_stock", "out_of_stock", "paused"] as const;

export type InventoryStatus = (typeof inventoryStatuses)[number];

export type InventoryRecord = {
  productId: string;
  status: InventoryStatus;
  availableQuantity: number | null;
  noteEn: string;
  noteTa: string;
  updatedAt: string | null;
};

export const defaultInventory = (productId: string): InventoryRecord => ({
  productId,
  status: "in_stock",
  availableQuantity: null,
  noteEn: "",
  noteTa: "",
  updatedAt: null,
});

export const inventoryStatusLabel: Record<InventoryStatus, { en: string; ta: string }> = {
  in_stock: { en: "In stock", ta: "கையிருப்பில் உள்ளது" },
  low_stock: { en: "Limited availability", ta: "குறைந்த அளவு மட்டுமே" },
  out_of_stock: { en: "Out of stock", ta: "கையிருப்பில் இல்லை" },
  paused: { en: "Orders paused", ta: "ஆர்டர்கள் தற்காலிகமாக நிறுத்தப்பட்டுள்ளன" },
};

export const isInventoryStatus = (value: unknown): value is InventoryStatus =>
  typeof value === "string" && inventoryStatuses.includes(value as InventoryStatus);

export const isInventoryUnavailable = (status: InventoryStatus) =>
  status === "out_of_stock" || status === "paused";
