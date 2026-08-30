import { asc } from "drizzle-orm";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { isSanBakesAdmin } from "../../../lib/admin-auth";
import { isInventoryStatus, type InventoryStatus } from "../../../lib/inventory";
import { products } from "../../../lib/products";
import { inventory } from "../../../../db/schema";

export const dynamic = "force-dynamic";

type InventoryUpdate = {
  productId: string;
  status: InventoryStatus;
  availableQuantity: number | null;
  noteEn: string;
  noteTa: string;
};

const productIds = new Set(products.map((product) => product.id));

async function requireAdmin() {
  const user = await getChatGPTUser();
  if (!user) return { error: Response.json({ error: "Authentication required" }, { status: 401 }) };
  if (!await isSanBakesAdmin(user)) return { error: Response.json({ error: "Owner access required" }, { status: 403 }) };
  return { user };
}

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const { getDb } = await import("../../../../db");
    const rows = await getDb().select().from(inventory).orderBy(asc(inventory.productId));
    return Response.json({ inventory: rows }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Inventory is temporarily unavailable";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid request origin" }, { status: 403 });
  }

  try {
    const payload = await request.json() as { updates?: unknown };
    if (!Array.isArray(payload.updates) || payload.updates.length < 1 || payload.updates.length > products.length) {
      return Response.json({ error: "Provide between 1 and the full catalogue of inventory updates" }, { status: 400 });
    }

    const updates: InventoryUpdate[] = [];
    for (const raw of payload.updates) {
      if (!raw || typeof raw !== "object") return Response.json({ error: "Invalid inventory update" }, { status: 400 });
      const item = raw as Partial<InventoryUpdate>;
      const productId = typeof item.productId === "string" ? item.productId.trim() : "";
      const noteEn = typeof item.noteEn === "string" ? item.noteEn.trim().slice(0, 160) : "";
      const noteTa = typeof item.noteTa === "string" ? item.noteTa.trim().slice(0, 160) : "";
      const rawQuantity = (item as { availableQuantity?: unknown }).availableQuantity;
      const availableQuantity = rawQuantity === null || rawQuantity === undefined || rawQuantity === ""
        ? null
        : Number(rawQuantity);

      if (!productIds.has(productId) || !isInventoryStatus(item.status)) {
        return Response.json({ error: `Invalid product or status: ${productId || "unknown"}` }, { status: 400 });
      }
      if (availableQuantity !== null && (!Number.isInteger(availableQuantity) || availableQuantity < 0 || availableQuantity > 9999)) {
        return Response.json({ error: `Invalid available quantity for ${productId}` }, { status: 400 });
      }
      updates.push({ productId, status: item.status, availableQuantity, noteEn, noteTa });
    }

    const updatedAt = new Date().toISOString();
    const { getD1 } = await import("../../../../db");
    const d1 = getD1();
    await d1.batch(updates.map((item) => d1.prepare(`
      INSERT INTO inventory (product_id, status, available_quantity, note_en, note_ta, updated_at, updated_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(product_id) DO UPDATE SET
        status = excluded.status,
        available_quantity = excluded.available_quantity,
        note_en = excluded.note_en,
        note_ta = excluded.note_ta,
        updated_at = excluded.updated_at,
        updated_by = excluded.updated_by
    `).bind(item.productId, item.status, item.availableQuantity, item.noteEn, item.noteTa, updatedAt, auth.user.userId)));

    return Response.json({ updated: updates.length, updatedAt });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Inventory could not be updated";
    return Response.json({ error: message }, { status: 500 });
  }
}
