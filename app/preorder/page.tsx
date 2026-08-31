"use client";

import Image from "next/image";
import QRCode from "qrcode";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { useInventory } from "../components/InventoryProvider";
import { usePreorder } from "../components/PreorderProvider";
import { inventoryStatusLabel, isInventoryUnavailable } from "../lib/inventory";
import { formatPrice, getMinimumOrderQuantity, getPricing, parseSelectionKey } from "../lib/pricing";
import { findProduct } from "../lib/products";
import { buildWhatsAppOrderMessage } from "./orderMessage";

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function minimumLeadDays(productId: string, optionId: string, quantity: number) {
  if (productId === "corporate-mini-box") return quantity >= 50 ? 10 : 7;
  if (productId === "bespoke-corporate") return 7;
  if (productId.startsWith("cupcake-")) return optionId === "box-6" ? 3 : 5;
  if (productId === "party-single-brownies") {
    if (optionId.includes("100")) return 10;
    if (optionId.includes("50")) return 7;
    return 5;
  }
  if (productId === "party-brownie-tins" || productId === "party-brownie-tubs") return optionId === "larger" ? 7 : 5;
  if (["birthday-250", "birthday-500", "birthday-1kg", "mini-brownie-tower", "occasion-brownie-cake"].includes(productId)) return 5;
  return 2;
}

export default function PreorderPage() {
  const { language } = useLanguage();
  const { getInventory } = useInventory();
  const { items, updateItem, removeItem, clearItems } = usePreorder();
  const [sent, setSent] = useState(false);
  const [fulfilment, setFulfilment] = useState<"pickup" | "delivery">("pickup");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentAmountInput, setPaymentAmountInput] = useState("");
  const [paymentQr, setPaymentQr] = useState("");
  const [paymentConfig, setPaymentConfig] = useState<{ enabled: boolean; upiId?: string; payeeName: string } | null>(null);
  const en = language === "en";
  const selections = useMemo(() => Object.entries(items).map(([key, quantity]) => {
    const { productId, optionId } = parseSelectionKey(key);
    const product = findProduct(productId);
    const pricing = getPricing(productId);
    const selectedOption = pricing?.options.find((option) => option.id === optionId) ?? pricing?.options[0];
    const availability = getInventory(productId);
    const minimumQuantity = getMinimumOrderQuantity(productId, optionId);
    const exceedsAvailableQuantity = availability.availableQuantity !== null && quantity > availability.availableQuantity;
    const belowMinimumQuantity = quantity < minimumQuantity;
    return { key, product, selectedOption, quantity, availability, minimumQuantity, belowMinimumQuantity, unavailable: isInventoryUnavailable(availability.status) || exceedsAvailableQuantity || belowMinimumQuantity };
  }).filter((item) => item.product && item.selectedOption), [getInventory, items]);
  const hasUnavailableSelection = selections.some((item) => item.unavailable);
  const hasQuotationSelection = selections.some((item) => item.selectedOption?.price === null);
  const subtotal = selections.reduce((sum, item) => sum + (item.selectedOption?.price ?? 0) * item.quantity, 0);
  const leadTimeDays = useMemo(() => {
    const selectedLeadTime = selections.reduce((longest, item) => {
      const { productId, optionId } = parseSelectionKey(item.key);
      return Math.max(longest, minimumLeadDays(productId, optionId, item.quantity));
    }, 2);
    const partyItems = selections.filter((item) => item.product?.category === "parties").length;
    return partyItems > 1 ? Math.max(selectedLeadTime, 7) : selectedLeadTime;
  }, [selections]);
  const earliestDate = useMemo(() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + leadTimeDays);
    return date;
  }, [leadTimeDays]);
  const earliestDateInput = formatDateInput(earliestDate);
  const earliestDateLabel = new Intl.DateTimeFormat(en ? "en-IN" : "ta-IN", { day: "numeric", month: "short", year: "numeric" }).format(earliestDate);
  const enteredPaymentAmount = Number(paymentAmountInput);
  const paymentAmount = Number.isFinite(enteredPaymentAmount) && enteredPaymentAmount > 0 ? enteredPaymentAmount : subtotal;

  useEffect(() => {
    fetch("/api/payment-config", { cache: "no-store" })
      .then((response) => response.json())
      // Payment configuration is intentionally loaded at runtime so a verified UPI ID can be changed without editing customer-facing code.
      .then((config) => setPaymentConfig(config as { enabled: boolean; upiId?: string; payeeName: string }))
      .catch(() => setPaymentConfig({ enabled: false, payeeName: "San Bakes" }));
  }, []);

  const upiPaymentUri = useMemo(() => {
    if (!sent || !paymentConfirmed || !paymentConfig?.enabled || !paymentConfig.upiId || hasQuotationSelection || paymentAmount <= 0) return "";
    const query = new URLSearchParams({
      pa: paymentConfig.upiId,
      pn: paymentConfig.payeeName,
      am: paymentAmount.toFixed(2),
      cu: "INR",
      tn: "San Bakes confirmed preorder",
    });
    return `upi://pay?${query.toString()}`;
  }, [hasQuotationSelection, paymentAmount, paymentConfig, paymentConfirmed, sent]);

  useEffect(() => {
    if (!upiPaymentUri) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPaymentQr("");
      return;
    }
    QRCode.toDataURL(upiPaymentUri, { width: 420, margin: 2, color: { dark: "#2a180f", light: "#fffaf2" } })
      .then(setPaymentQr)
      .catch(() => setPaymentQr(""));
  }, [upiPaymentUri]);

  const sendWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasUnavailableSelection) return;
    const form = new FormData(event.currentTarget);
    const message = buildWhatsAppOrderMessage({
      language,
      selections: selections.map(({ product, selectedOption, quantity }) => ({
        productName: product?.name ?? "",
        productNameTa: product?.nameTa ?? "",
        optionLabel: selectedOption?.label ?? "",
        optionLabelTa: selectedOption?.labelTa ?? "",
        priceLabel: !en && selectedOption?.price === null ? "விலை உறுதிப்படுத்தப்படும்" : formatPrice(selectedOption?.price ?? null),
        quantity,
      })),
      subtotalLabel: formatPrice(subtotal),
      hasQuotationSelection,
      details: {
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        date: String(form.get("date") ?? ""),
        formulation: String(form.get("formulation") ?? ""),
        fulfilment: String(form.get("fulfilment") ?? ""),
        pincode: String(form.get("pincode") ?? ""),
        address: String(form.get("address") ?? ""),
        notes: String(form.get("notes") ?? ""),
      },
    });
    setSent(true);
    window.open(`https://wa.me/919940058623?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const clearCart = () => {
    if (!window.confirm(en ? "Clear every item from this cart?" : "இந்த கார்ட்டிலிருந்து அனைத்து பொருட்களையும் நீக்கவா?")) return;
    clearItems();
    setSent(false);
    setPaymentConfirmed(false);
    setPaymentAmountInput("");
  };

  return (
    <main>
      <section className="innerHero preorderHero"><p className="eyebrow">{en ? "CART & WHATSAPP CHECKOUT" : "கார்ட் & WHATSAPP செக்அவுட்"}</p><h1>{en ? "Review your preorder." : "உங்கள் முன்பதிவை சரிபார்க்கவும்."}</h1><p>{en ? "Check the cart, choose pickup or delivery, and send one complete request on WhatsApp. Pay only after the final total is confirmed." : "கார்ட்டை சரிபார்த்து, பிக்கப் அல்லது டெலிவரியைத் தேர்ந்து, முழுமையான கோரிக்கையை WhatsApp-ல் அனுப்புங்கள். இறுதி தொகை உறுதி செய்யப்பட்ட பிறகு மட்டும் செலுத்துங்கள்."}</p></section>
      <section className="orderLayout">
        <div className="orderSummary">
          <div className="cartSummaryHeader"><div><p className="eyebrow dark">{en ? "YOUR CART" : "உங்கள் கார்ட்"}</p><h2>{en ? "Order summary" : "ஆர்டர் சுருக்கம்"}</h2></div>{selections.length > 0 && <button className="clearCartButton" onClick={clearCart} type="button">{en ? "Clear cart" : "கார்ட்டை காலி செய்"}</button>}</div>
          {selections.length > 0 && <p className="cartRetentionNote">{en ? "Saved on this device for 7 days from your last cart change." : "கடைசி கார்ட் மாற்றத்திலிருந்து 7 நாட்களுக்கு இந்த சாதனத்தில் சேமிக்கப்படும்."}</p>}
          {selections.length === 0 ? <div className="emptyState"><p>{en ? "Your cart is empty." : "உங்கள் கார்ட் காலியாக உள்ளது."}</p><a className="button buttonCacao" href="/menu">{en ? "Browse the menu" : "மெனுவைப் பார்க்க"}</a></div> : selections.map(({ key, product, selectedOption, quantity, availability, minimumQuantity, belowMinimumQuantity, unavailable }) => <div className={`summaryItem ${unavailable ? "unavailable" : ""}`} key={key}><div><strong>{en ? product?.name : product?.nameTa}</strong><small>{en ? selectedOption?.label : selectedOption?.labelTa} · {formatPrice(selectedOption?.price ?? null)}</small>{belowMinimumQuantity ? <em>{en ? `Minimum ${minimumQuantity} boxes` : `குறைந்தபட்சம் ${minimumQuantity} பெட்டிகள்`}</em> : unavailable && <em>{en ? inventoryStatusLabel[availability.status].en : inventoryStatusLabel[availability.status].ta}{availability.availableQuantity !== null ? ` · ${availability.availableQuantity} available` : ""}</em>}</div><div className="quantityControl">{belowMinimumQuantity ? <button className="setMinimum" onClick={() => updateItem(key, minimumQuantity)} type="button">{en ? `Set ${minimumQuantity}` : `${minimumQuantity} அமைக்க`}</button> : <button disabled={quantity <= minimumQuantity} onClick={() => updateItem(key, quantity - 1)} type="button" aria-label={en ? "Decrease quantity" : "அளவைக் குறைக்க"}>−</button>}<span>{quantity}</span><button disabled={availability.availableQuantity !== null && quantity >= availability.availableQuantity} onClick={() => updateItem(key, quantity + 1)} type="button" aria-label={en ? "Increase quantity" : "அளவை அதிகரிக்க"}>+</button><button className="remove" onClick={() => removeItem(key)} type="button">{en ? "Remove" : "நீக்கு"}</button></div></div>)}
          {selections.length > 0 && <div className="cartTotal"><span>{en ? "Subtotal" : "இடைக்கூட்டுத்தொகை"}</span><strong>{formatPrice(subtotal)}</strong><small>{hasQuotationSelection ? (en ? "A bespoke item is included; its price is confirmed separately." : "தனிப்பயன் பொருள் சேர்க்கப்பட்டுள்ளது; அதன் விலை தனியாக உறுதி செய்யப்படும்.") : (en ? "Delivery and paid customisation are added after confirmation." : "உறுதிப்படுத்திய பிறகு டெலிவரி மற்றும் கூடுதல் தனிப்பயன் சேர்க்கப்படும்.")}</small></div>}
          {hasUnavailableSelection && <div className="availabilityWarning"><strong>{en ? "Update your selection before sending." : "அனுப்பும் முன் உங்கள் தேர்வை மாற்றவும்."}</strong><span>{en ? "One or more items are unavailable or exceed the available preorder slots." : "ஒன்று அல்லது அதற்கு மேற்பட்ட பொருட்கள் கிடைக்கவில்லை அல்லது கிடைக்கும் முன்பதிவு அளவை மீறுகின்றன."}</span></div>}
          <div className="enquiryCallout"><strong>{en ? "WhatsApp confirmation comes before payment." : "கட்டணத்திற்கு முன் WhatsApp உறுதிப்படுத்தல் வரும்."}</strong><span>{en ? "San Bakes confirms capacity, recipe, delivery, customisation and the exact payable amount before the UPI QR is used." : "UPI QR பயன்படுத்துவதற்கு முன் தயாரிப்பு, ரெசிபி, டெலிவரி, தனிப்பயன் மற்றும் சரியான கட்டண தொகையை San Bakes உறுதி செய்யும்."}</span></div>
        </div>
        <form className="orderForm" onSubmit={sendWhatsApp}>
          <p className="eyebrow dark">{en ? "ORDER DETAILS" : "ஆர்டர் விவரங்கள்"}</p><h2>{en ? "Tell us about the order" : "ஆர்டர் விவரங்களை தெரிவிக்கவும்"}</h2>
          <div className="fieldRow"><label>{en ? "Your name" : "உங்கள் பெயர்"}<input name="name" required autoComplete="name" /></label><label>{en ? "Mobile number" : "மொபைல் எண்"}<input name="phone" required inputMode="tel" pattern="[0-9 +()-]{8,18}" autoComplete="tel" /></label></div>
          <div className="fieldRow"><label>{en ? "Required date" : "தேவையான தேதி"}<input name="date" required type="date" min={earliestDateInput} aria-describedby="leadTimeGuidance" /></label><input type="hidden" name="formulation" value="Egg" /></div>
          <div className="leadTimeGuidance" id="leadTimeGuidance"><strong>{en ? `Allow at least ${leadTimeDays} calendar days` : `குறைந்தது ${leadTimeDays} நாட்கள் அனுமதிக்கவும்`}</strong><span>{en ? `Earliest request date for this cart: ${earliestDateLabel}. The date remains subject to capacity confirmation; branding and multi-address orders may need longer.` : `இந்த கார்ட்டிற்கான முதல் கோரிக்கை தேதி: ${earliestDateLabel}. திறன் உறுதிப்படுத்தலுக்கு உட்பட்டது; பிராண்டிங் மற்றும் பல முகவரி ஆர்டர்களுக்கு கூடுதல் நேரம் தேவைப்படலாம்.`}</span></div>
          <fieldset><legend>{en ? "Fulfilment" : "பெறும் முறை"}</legend><label className="radio"><input type="radio" name="fulfilment" value="Pickup by appointment" checked={fulfilment === "pickup"} onChange={() => setFulfilment("pickup")} />{en ? "Pickup by confirmed appointment" : "உறுதி செய்யப்பட்ட நேரத்தில் பிக்கப்"}</label><label className="radio"><input type="radio" name="fulfilment" value="Delivery within Chennai" checked={fulfilment === "delivery"} onChange={() => setFulfilment("delivery")} />{en ? "Delivery within Chennai · additional charges beyond 20 km" : "சென்னை முழுவதும் டெலிவரி · 20 கி.மீ.க்கு அப்பால் கூடுதல் கட்டணம்"}</label></fieldset>
          <div className="fieldRow"><label>{en ? "Delivery pincode" : "டெலிவரி அஞ்சல் குறியீடு"}<input name="pincode" inputMode="numeric" pattern="[0-9]{6}" placeholder="600117" autoComplete="postal-code" required={fulfilment === "delivery"} aria-describedby="deliveryGuidance" /></label><label>{en ? "Address / pickup note" : "முகவரி / பிக்கப் குறிப்பு"}<input name="address" required={fulfilment === "delivery"} aria-describedby="deliveryGuidance" /></label></div>
          <div className="deliveryGuidance" id="deliveryGuidance">{fulfilment === "delivery" ? <><strong>{en ? "Address required for a live courier quote" : "நேரடி கூரியர் விலைக்கு முகவரி தேவை"}</strong><span>{en ? "The pincode alone cannot confirm distance. San Bakes checks the full road route; published planning bands apply, with an additional charge beyond 20 km." : "அஞ்சல் குறியீடு மட்டும் தூரத்தை உறுதி செய்யாது. முழு சாலை பாதை சரிபார்க்கப்பட்டு, 20 கி.மீ.க்கு அப்பால் கூடுதல் கட்டணம் சேர்க்கப்படும்."}</span></> : <><strong>{en ? "Pickup is by confirmed appointment" : "உறுதி செய்யப்பட்ட நேரத்தில் பிக்கப்"}</strong><span>{en ? "The private handover point and 15-minute arrival window are shared after confirmation." : "தனிப்பட்ட ஹேண்ட்ஓவர் இடம் மற்றும் 15 நிமிட வருகை நேரம் உறுதிப்படுத்திய பிறகு பகிரப்படும்."}</span></>}<a href="/delivery">{en ? "View delivery and pickup guide" : "டெலிவரி மற்றும் பிக்கப் வழிகாட்டியைப் பார்க்க"}</a></div>
          <label>{en ? "Short cake message, allergies or other notes" : "கேக் செய்தி, அலர்ஜி அல்லது பிற குறிப்புகள்"}<textarea name="notes" rows={4} /></label>
          <label className="consent"><input type="checkbox" required />{en ? "I understand San Bakes handles wheat, milk, egg, nuts and soy; suitability must be confirmed before payment." : "San Bakes-ல் கோதுமை, பால், முட்டை, நட்ஸ் மற்றும் சோயா கையாளப்படுவதை புரிந்துகொள்கிறேன்."}</label>
          <button className="button buttonCacao submitButton" type="submit" disabled={selections.length === 0 || hasUnavailableSelection}>{en ? "Place order through WhatsApp" : "WhatsApp மூலம் ஆர்டர் செய்ய"}</button>
          {sent && <p className="successNote">{en ? "WhatsApp opened with your complete cart. Return here after San Bakes confirms the final payable amount." : "உங்கள் முழுமையான கார்ட்டுடன் WhatsApp திறக்கப்பட்டது. San Bakes இறுதி கட்டண தொகையை உறுதி செய்த பிறகு இங்கே திரும்பவும்."}</p>}
        </form>
      </section>
      <section className="upiSection">
        <div className="upiIntro"><p className="eyebrow dark">{en ? "UPI PAYMENT" : "UPI கட்டணம்"}</p><h2>{en ? "A QR tied to the confirmed amount." : "உறுதி செய்யப்பட்ட தொகைக்கான QR."}</h2><p>{en ? "Send the WhatsApp order first. When San Bakes confirms availability, delivery and the final amount, enter that exact total and verify the recipient name in your UPI app before paying." : "முதலில் WhatsApp ஆர்டரை அனுப்புங்கள். கிடைக்கும் நிலை, டெலிவரி மற்றும் இறுதி தொகையை San Bakes உறுதி செய்த பிறகு அந்த சரியான தொகையை உள்ளிட்டு, செலுத்தும் முன் UPI செயலியில் பெறுநர் பெயரை சரிபார்க்கவும்."}</p></div>
        <div className="upiCard">
          <div className="paymentTotal"><span>{en ? "Cart subtotal" : "கார்ட் இடைக்கூட்டுத்தொகை"}</span><strong>{formatPrice(subtotal)}</strong></div>
          {!sent && <div className="paymentGate"><span>1</span><p>{en ? "Place the order through WhatsApp to unlock the payment confirmation step." : "கட்டண உறுதிப்படுத்தல் படியைத் திறக்க WhatsApp மூலம் ஆர்டர் செய்யவும்."}</p></div>}
          {sent && hasQuotationSelection && <div className="paymentGate"><span>!</span><p>{en ? "This cart contains a bespoke item. Wait for San Bakes to confirm its price and the final payable total before using UPI." : "இந்த கார்ட்டில் தனிப்பயன் பொருள் உள்ளது. UPI பயன்படுத்துவதற்கு முன் அதன் விலையும் இறுதி கட்டண தொகையும் San Bakes உறுதி செய்யும் வரை காத்திருக்கவும்."}</p></div>}
          {sent && !hasQuotationSelection && <>
            <label className="confirmedAmount"><span>{en ? "Final amount confirmed on WhatsApp" : "WhatsApp-ல் உறுதி செய்யப்பட்ட இறுதி தொகை"}</span><div><span>₹</span><input type="number" inputMode="decimal" min="1" step="1" value={paymentAmountInput} onChange={(event) => { setPaymentAmountInput(event.target.value); setPaymentConfirmed(false); }} placeholder={String(subtotal)} /></div><small>{en ? "Leave blank only when the confirmed amount equals the cart subtotal." : "உறுதி செய்யப்பட்ட தொகை கார்ட் இடைக்கூட்டுத்தொகைக்கு சமமாக இருந்தால் மட்டும் காலியாக விடவும்."}</small></label>
            <label className="consent paymentConsent"><input type="checkbox" checked={paymentConfirmed} onChange={(event) => setPaymentConfirmed(event.target.checked)} />{en ? `San Bakes confirmed that ${formatPrice(paymentAmount)} is payable for this order.` : `இந்த ஆர்டருக்கு ${formatPrice(paymentAmount)} செலுத்த வேண்டும் என்று San Bakes உறுதி செய்துள்ளது.`}</label>
            {paymentConfirmed && paymentConfig && !paymentConfig.enabled && <div className="paymentSetupPending"><strong>{en ? "UPI QR setup pending owner review" : "UPI QR அமைப்பு உரிமையாளர் மதிப்பாய்வில் உள்ளது"}</strong><span>{en ? "The checkout is ready, but a verified San Bakes UPI ID must be configured before a payment QR can be displayed." : "செக்அவுட் தயாராக உள்ளது; கட்டண QR காட்டுவதற்கு முன் சரிபார்க்கப்பட்ட San Bakes UPI ID அமைக்கப்பட வேண்டும்."}</span></div>}
            {paymentQr && upiPaymentUri && <div className="qrReady"><Image src={paymentQr} alt={`UPI QR to pay ${formatPrice(paymentAmount)} to ${paymentConfig?.payeeName ?? "San Bakes"}`} width={260} height={260} unoptimized /><div><small>{en ? "PAYABLE NOW" : "இப்போது செலுத்த வேண்டியது"}</small><strong>{formatPrice(paymentAmount)}</strong><span>{paymentConfig?.payeeName}</span><a className="button buttonCacao" href={upiPaymentUri}>{en ? "Open UPI app" : "UPI செயலியைத் திறக்க"}</a><p>{en ? "Verify the recipient name and amount in your UPI app. The QR does not itself confirm the order or payment receipt." : "UPI செயலியில் பெறுநர் பெயர் மற்றும் தொகையை சரிபார்க்கவும். QR மட்டும் ஆர்டர் அல்லது கட்டண ரசீதை உறுதி செய்யாது."}</p></div></div>}
          </>}
        </div>
      </section>
      <section className="processStrip"><div><span>1</span><strong>{en ? "Build the cart" : "கார்ட்டை உருவாக்க"}</strong><p>{en ? "Choose products, packs and quantities from any catalogue page." : "எந்த பட்டியல் பக்கத்திலிருந்தும் பொருட்கள், பேக்குகள் மற்றும் அளவுகளைத் தேர்ந்தெடுக்கவும்."}</p></div><div><span>2</span><strong>{en ? "Confirm on WhatsApp" : "WhatsApp-ல் உறுதி"}</strong><p>{en ? "We confirm capacity, ingredients, allergens, final total and delivery." : "தயாரிப்பு, பொருட்கள், அலர்ஜன்கள், இறுதி தொகை மற்றும் டெலிவரி உறுதி செய்யப்படும்."}</p></div><div><span>3</span><strong>{en ? "Pay verified total" : "உறுதி செய்யப்பட்ட தொகை"}</strong><p>{en ? "Generate the amount-linked QR and verify San Bakes in your UPI app before paying." : "தொகைக்கான QR உருவாக்கி, செலுத்தும் முன் UPI செயலியில் San Bakes-ஐ சரிபார்க்கவும்."}</p></div></section>
    </main>
  );
}
