import { asc } from "drizzle-orm";
import { getDb } from "../../../db";
import { inventory } from "../../../db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await getDb().select({
      productId: inventory.productId,
      status: inventory.status,
      availableQuantity: inventory.availableQuantity,
      noteEn: inventory.noteEn,
      noteTa: inventory.noteTa,
      updatedAt: inventory.updatedAt,
    }).from(inventory).orderBy(asc(inventory.productId));

    return Response.json(
      { inventory: rows },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Inventory is temporarily unavailable";
    return Response.json({ error: message }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
