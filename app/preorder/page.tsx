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

export default function PreorderPage() {
  const { language } = useLanguage();
  const { getInventory } = useInventory();
  const { items, updateItem, removeItem } = usePreorder();
  const [sent, setSent] = useState(false);
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
    const lines = selections.map(({ product, selectedOption, quantity }) => `• ${product?.name} · ${selectedOption?.label} · ${formatPrice(selectedOption?.price ?? null)} × ${quantity}`);
    const message = [
      "Hello San Bakes, I would like to place a preorder.", "", "CART", ...lines,
      "", `SUBTOTAL: ${formatPrice(subtotal)}`,
      hasQuotationSelection ? "Bespoke item included: its price and final total will be confirmed separately." : "Delivery and paid customisation are additional until confirmed.",
      "", "CUSTOMER", `Name: ${form.get("name")}`, `Phone: ${form.get("phone")}`,
      `Required date: ${form.get("date")}`, `Formulation: ${form.get("formulation")}`,
      `Fulfilment: ${form.get("fulfilment")}`, `Pincode: ${form.get("pincode") || "Not applicable"}`,
      `Address / pickup note: ${form.get("address") || "Not provided"}`,
      `Message / dietary note: ${form.get("notes") || "None"}`, "",
      "Please confirm availability, final payable amount, allergens and the UPI recipient before I pay.",
    ].join("\n");
    setSent(true);
    window.open(`https://wa.me/919940058623?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <section className="innerHero preorderHero"><p className="eyebrow">CART & WHATSAPP CHECKOUT</p><h1>{en ? "Review once. Send one complete order." : "ஒருமுறை சரிபார்த்து, முழுமையான ஆர்டரை அனுப்புங்கள்."}</h1><p>{en ? "Confirm products, quantities, date and fulfilment, then send the prepared order on WhatsApp. UPI payment is offered only after the final amount is confirmed." : "பொருட்கள், அளவுகள், தேதி மற்றும் பெறும் முறையை உறுதி செய்து தயாரான ஆர்டரை WhatsApp-ல் அனுப்புங்கள். இறுதி தொகை உறுதி செய்யப்பட்ட பிறகு மட்டுமே UPI கட்டணம் வழங்கப்படும்."}</p></section>
      <section className="orderLayout">
        <div className="orderSummary">
          <p className="eyebrow dark">YOUR CART</p>
          <h2>{en ? "Order summary" : "ஆர்டர் சுருக்கம்"}</h2>
          {selections.length === 0 ? <div className="emptyState"><p>{en ? "Your cart is empty." : "உங்கள் கார்ட் காலியாக உள்ளது."}</p><a className="button buttonCacao" href="/menu">{en ? "Browse the menu" : "மெனுவைப் பார்க்க"}</a></div> : selections.map(({ key, product, selectedOption, quantity, availability, minimumQuantity, belowMinimumQuantity, unavailable }) => <div className={`summaryItem ${unavailable ? "unavailable" : ""}`} key={key}><div><strong>{en ? product?.name : product?.nameTa}</strong><small>{en ? selectedOption?.label : selectedOption?.labelTa} · {formatPrice(selectedOption?.price ?? null)}</small>{belowMinimumQuantity ? <em>{en ? `Minimum ${minimumQuantity} boxes` : `குறைந்தபட்சம் ${minimumQuantity} பெட்டிகள்`}</em> : unavailable && <em>{en ? inventoryStatusLabel[availability.status].en : inventoryStatusLabel[availability.status].ta}{availability.availableQuantity !== null ? ` · ${availability.availableQuantity} available` : ""}</em>}</div><div className="quantityControl">{belowMinimumQuantity ? <button className="setMinimum" onClick={() => updateItem(key, minimumQuantity)} type="button">{en ? `Set ${minimumQuantity}` : `${minimumQuantity} அமைக்க`}</button> : <button disabled={quantity <= minimumQuantity} onClick={() => updateItem(key, quantity - 1)} type="button" aria-label="Decrease">−</button>}<span>{quantity}</span><button disabled={availability.availableQuantity !== null && quantity >= availability.availableQuantity} onClick={() => updateItem(key, quantity + 1)} type="button" aria-label="Increase">+</button><button className="remove" onClick={() => removeItem(key)} type="button">{en ? "Remove" : "நீக்கு"}</button></div></div>)}
          {selections.length > 0 && <div className="cartTotal"><span>{en ? "Subtotal" : "இடைக்கூட்டுத்தொகை"}</span><strong>{formatPrice(subtotal)}</strong><small>{hasQuotationSelection ? (en ? "A bespoke item is included; its price is confirmed separately." : "தனிப்பயன் பொருள் சேர்க்கப்பட்டுள்ளது; அதன் விலை தனியாக உறுதி செய்யப்படும்.") : (en ? "Delivery and paid customisation are added after confirmation." : "உறுதிப்படுத்திய பிறகு டெலிவரி மற்றும் கூடுதல் தனிப்பயன் சேர்க்கப்படும்.")}</small></div>}
          {hasUnavailableSelection && <div className="availabilityWarning"><strong>{en ? "Update your selection before sending." : "அனுப்பும் முன் உங்கள் தேர்வை மாற்றவும்."}</strong><span>{en ? "One or more items are unavailable or exceed the available preorder slots." : "ஒன்று அல்லது அதற்கு மேற்பட்ட பொருட்கள் கிடைக்கவில்லை அல்லது கிடைக்கும் முன்பதிவு அளவை மீறுகின்றன."}</span></div>}
          <div className="enquiryCallout"><strong>{en ? "WhatsApp confirmation comes before payment." : "கட்டணத்திற்கு முன் WhatsApp உறுதிப்படுத்தல் வரும்."}</strong><span>{en ? "San Bakes confirms capacity, recipe, delivery, customisation and the exact payable amount before the UPI QR is used." : "UPI QR பயன்படுத்துவதற்கு முன் தயாரிப்பு, ரெசிபி, டெலிவரி, தனிப்பயன் மற்றும் சரியான கட்டண தொகையை San Bakes உறுதி செய்யும்."}</span></div>
        </div>
        <form className="orderForm" onSubmit={sendWhatsApp}>
          <p className="eyebrow dark">ORDER DETAILS</p><h2>{en ? "Tell us about the order" : "ஆர்டர் விவரங்களை தெரிவிக்கவும்"}</h2>
          <div className="fieldRow"><label>{en ? "Your name" : "உங்கள் பெயர்"}<input name="name" required autoComplete="name" /></label><label>{en ? "Mobile number" : "மொபைல் எண்"}<input name="phone" required inputMode="tel" pattern="[0-9 +()-]{8,18}" autoComplete="tel" /></label></div>
          <div className="fieldRow"><label>{en ? "Required date" : "தேவையான தேதி"}<input name="date" required type="date" /></label><input type="hidden" name="formulation" value="Egg" /></div>
          <fieldset><legend>{en ? "Fulfilment" : "பெறும் முறை"}</legend><label className="radio"><input type="radio" name="fulfilment" value="Pickup by appointment" defaultChecked />{en ? "Pickup by confirmed appointment" : "உறுதி செய்யப்பட்ட நேரத்தில் பிக்கப்"}</label><label className="radio"><input type="radio" name="fulfilment" value="Delivery within Chennai" />{en ? "Delivery within Chennai · additional charges beyond 20 km" : "சென்னை முழுவதும் டெலிவரி · 20 கி.மீ.க்கு அப்பால் கூடுதல் கட்டணம்"}</label></fieldset>
          <div className="fieldRow"><label>{en ? "Delivery pincode" : "டெலிவரி அஞ்சல் குறியீடு"}<input name="pincode" inputMode="numeric" pattern="[0-9]{6}" placeholder="600117" /></label><label>{en ? "Address / pickup note" : "முகவரி / பிக்கப் குறிப்பு"}<input name="address" /></label></div>
          <label>{en ? "Short cake message, allergies or other notes" : "கேக் செய்தி, அலர்ஜி அல்லது பிற குறிப்புகள்"}<textarea name="notes" rows={4} /></label>
          <label className="consent"><input type="checkbox" required />{en ? "I understand San Bakes handles wheat, milk, egg, nuts and soy; suitability must be confirmed before payment." : "San Bakes-ல் கோதுமை, பால், முட்டை, நட்ஸ் மற்றும் சோயா கையாளப்படுவதை புரிந்துகொள்கிறேன்."}</label>
          <button className="button buttonCacao submitButton" type="submit" disabled={selections.length === 0 || hasUnavailableSelection}>{en ? "Place order through WhatsApp" : "WhatsApp மூலம் ஆர்டர் செய்ய"}</button>
          {sent && <p className="successNote">{en ? "WhatsApp opened with your complete cart. Return here after San Bakes confirms the final payable amount." : "உங்கள் முழுமையான கார்ட்டுடன் WhatsApp திறக்கப்பட்டது. San Bakes இறுதி கட்டண தொகையை உறுதி செய்த பிறகு இங்கே திரும்பவும்."}</p>}
        </form>
      </section>
      <section className="upiSection">
        <div className="upiIntro"><p className="eyebrow dark">UPI PAYMENT</p><h2>{en ? "A QR tied to the confirmed amount." : "உறுதி செய்யப்பட்ட தொகைக்கான QR."}</h2><p>{en ? "Send the WhatsApp order first. When San Bakes confirms availability, delivery and the final amount, enter that exact total and verify the recipient name in your UPI app before paying." : "முதலில் WhatsApp ஆர்டரை அனுப்புங்கள். கிடைக்கும் நிலை, டெலிவரி மற்றும் இறுதி தொகையை San Bakes உறுதி செய்த பிறகு அந்த சரியான தொகையை உள்ளிட்டு, செலுத்தும் முன் UPI செயலியில் பெறுநர் பெயரை சரிபார்க்கவும்."}</p></div>
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
