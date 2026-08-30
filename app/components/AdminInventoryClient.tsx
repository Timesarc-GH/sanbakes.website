"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultInventory, inventoryStatuses, inventoryStatusLabel, type InventoryRecord, type InventoryStatus } from "../lib/inventory";
import { categories, products } from "../lib/products";

type DraftMap = Record<string, InventoryRecord>;

const comparable = (record: InventoryRecord) => JSON.stringify({
  status: record.status,
  availableQuantity: record.availableQuantity,
  noteEn: record.noteEn,
  noteTa: record.noteTa,
});

export function AdminInventoryClient({ adminName, signOutPath }: { adminName: string; signOutPath: string }) {
  const [drafts, setDrafts] = useState<DraftMap>({});
  const [saved, setSaved] = useState<DraftMap>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadInventory = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/inventory", { cache: "no-store" });
      const payload = await response.json() as { inventory?: Array<InventoryRecord>; error?: string };
      if (!response.ok) throw new Error(payload.error || "Inventory could not be loaded");
      const rows = Object.fromEntries((payload.inventory ?? []).map((row) => [row.productId, row]));
      const complete = Object.fromEntries(products.map((product) => [product.id, rows[product.id] ?? defaultInventory(product.id)]));
      setDrafts(complete);
      setSaved(complete);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Inventory could not be loaded");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load the authoritative D1-backed inventory only after the protected console hydrates.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadInventory();
  }, []);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const searchMatch = !query || `${product.name} ${product.nameTa} ${product.id}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  const counts = useMemo(() => Object.values(drafts).reduce<Record<InventoryStatus, number>>((result, item) => {
    result[item.status] += 1;
    return result;
  }, { in_stock: 0, low_stock: 0, out_of_stock: 0, paused: 0 }), [drafts]);

  const dirtyIds = useMemo(() => products.map((product) => product.id).filter((id) => comparable(drafts[id] ?? defaultInventory(id)) !== comparable(saved[id] ?? defaultInventory(id))), [drafts, saved]);

  const updateDraft = (productId: string, changes: Partial<InventoryRecord>) => {
    setDrafts((current) => ({ ...current, [productId]: { ...(current[productId] ?? defaultInventory(productId)), ...changes } }));
    setMessage("");
  };

  const saveRecords = async (productIds: string[]) => {
    if (productIds.length === 0) return;
    setSaving(true);
    setMessage("");
    try {
      const updates = productIds.map((id) => drafts[id] ?? defaultInventory(id));
      const response = await fetch("/api/admin/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      const payload = await response.json() as { error?: string; updatedAt?: string };
      if (!response.ok) throw new Error(payload.error || "Inventory could not be saved");
      const updatedAt = payload.updatedAt ?? new Date().toISOString();
      setDrafts((current) => Object.fromEntries(Object.entries(current).map(([id, row]) => [id, productIds.includes(id) ? { ...row, updatedAt } : row])));
      setSaved((current) => ({ ...current, ...Object.fromEntries(productIds.map((id) => [id, { ...(drafts[id] ?? defaultInventory(id)), updatedAt }])) }));
      setMessage(`${productIds.length} item${productIds.length === 1 ? "" : "s"} saved.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Inventory could not be saved");
    } finally {
      setSaving(false);
    }
  };

  const applyBulkStatus = (status: InventoryStatus) => {
    setDrafts((current) => {
      const next = { ...current };
      for (const product of visibleProducts) {
        const row = next[product.id] ?? defaultInventory(product.id);
        next[product.id] = { ...row, status, availableQuantity: status === "out_of_stock" ? 0 : row.availableQuantity };
      }
      return next;
    });
    setMessage(`${visibleProducts.length} visible item${visibleProducts.length === 1 ? "" : "s"} changed. Save changes to publish.`);
  };

  return (
    <main className="adminConsole">
      <header className="adminHeader"><div><p className="eyebrow">SAN BAKES · OWNER CONSOLE</p><h1>Inventory &amp; availability</h1><p>Signed in as {adminName}. Customer menus update after you save.</p></div><div><a className="button buttonLight" href="/menu" target="_blank" rel="noreferrer">Open customer menu</a><a className="adminSignOut" href={signOutPath}>Sign out</a></div></header>

      <section className="adminWorkspace">
        <div className="adminSummary">
          {inventoryStatuses.map((status) => <article key={status} className={status}><span>{inventoryStatusLabel[status].en}</span><strong>{counts[status]}</strong></article>)}
        </div>

        <div className="adminToolbar">
          <label><span>Find an item</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Brownie, Tin, cupcake…" /></label>
          <label><span>Collection</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All collections</option>{categories.filter((item) => item.id !== "all").map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
          <div className="adminBulk"><span>Set visible items</span><button type="button" onClick={() => applyBulkStatus("in_stock")}>In stock</button><button type="button" onClick={() => applyBulkStatus("out_of_stock")}>Out of stock</button><button type="button" onClick={() => applyBulkStatus("paused")}>Pause</button></div>
          <button className="button buttonCacao adminSaveAll" type="button" disabled={saving || dirtyIds.length === 0} onClick={() => void saveRecords(dirtyIds)}>{saving ? "Saving…" : `Save ${dirtyIds.length || ""} change${dirtyIds.length === 1 ? "" : "s"}`}</button>
        </div>

        {message && <div className="adminMessage" role="status">{message}</div>}

        {loading ? <div className="adminLoading">Loading the catalogue…</div> : <div className="adminInventoryList">
          {visibleProducts.map((product) => {
            const row = drafts[product.id] ?? defaultInventory(product.id);
            const isDirty = comparable(row) !== comparable(saved[product.id] ?? defaultInventory(product.id));
            const categoryName = categories.find((item) => item.id === product.category)?.name ?? product.category;
            return <article className={`adminInventoryCard ${row.status}`} key={product.id}>
              <div className="adminItemIdentity"><span className={`inventoryDot ${row.status}`} /><div><small>{categoryName} · {product.id}</small><h2>{product.name}</h2><p>{product.nameTa}</p></div>{isDirty && <em>Unsaved</em>}</div>
              <div className="adminItemControls">
                <label><span>Ordering status</span><select value={row.status} onChange={(event) => updateDraft(product.id, { status: event.target.value as InventoryStatus, availableQuantity: event.target.value === "out_of_stock" ? 0 : row.availableQuantity })}>{inventoryStatuses.map((status) => <option value={status} key={status}>{inventoryStatusLabel[status].en}</option>)}</select></label>
                <label><span>Available packs / slots</span><input type="number" min="0" max="9999" value={row.availableQuantity ?? ""} placeholder="No limit" onChange={(event) => updateDraft(product.id, { availableQuantity: event.target.value === "" ? null : Number(event.target.value) })} /></label>
                <label className="adminNote"><span>Customer note · English</span><input maxLength={160} value={row.noteEn} placeholder="Example: Available for 7 September onward" onChange={(event) => updateDraft(product.id, { noteEn: event.target.value })} /></label>
                <label className="adminNote"><span>Customer note · Tamil</span><input maxLength={160} value={row.noteTa} placeholder="வாடிக்கையாளர் குறிப்பு" onChange={(event) => updateDraft(product.id, { noteTa: event.target.value })} /></label>
              </div>
              <div className="adminItemFooter"><span>{row.updatedAt ? `Last saved ${new Date(row.updatedAt).toLocaleString("en-IN")}` : "Not yet changed from the default"}</span><button type="button" disabled={saving || !isDirty} onClick={() => void saveRecords([product.id])}>Save item</button></div>
            </article>;
          })}
          {visibleProducts.length === 0 && <div className="adminEmpty">No catalogue items match this filter.</div>}
        </div>}
      </section>
    </main>
  );
}
