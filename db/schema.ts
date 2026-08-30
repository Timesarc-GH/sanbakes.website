import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inventory = sqliteTable("inventory", {
  productId: text("product_id").primaryKey(),
  status: text("status").notNull().default("in_stock"),
  availableQuantity: integer("available_quantity"),
  noteEn: text("note_en").notNull().default(""),
  noteTa: text("note_ta").notNull().default(""),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedBy: text("updated_by").notNull().default(""),
});
