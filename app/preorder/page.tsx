"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { usePreorder } from "../components/PreorderProvider";
import { formatPrice, getPricing, parseSelectionKey } from "../lib/pricing";
import { findProduct } from "../lib/products";

export default function PreorderPage() {
  const { language } = useLanguage();
  const { items, updateItem, removeItem } = usePreorder();
  const [sent, setSent] = useState(false);
  const en = language === "en";
  const selections = useMemo(() => Object.entries(items).map(([key, quantity]) => {
    const { productId, optionId } = parseSelectionKey(key);
    const product = findProduct(productId);
    const pricing = getPricing(productId);
    const selectedOption = pricing?.options.find((option) => option.id === optionId) ?? pricing?.options[0];
    return { key, product, selectedOption, quantity };
  }).filter((item) => item.product && item.selectedOption), [items]);

  const sendWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = selections.map(({ product, selectedOption, quantity }) => `• ${product?.name} · ${selectedOption?.label} · ${formatPrice(selectedOption?.price ?? null)} × ${quantity}`);
    const message = [
      "Hello San Bakes, I would like to request a preorder.", "", "ITEMS", ...lines,
      "", "CUSTOMER", `Name: ${form.get("name")}`, `Phone: ${form.get("phone")}`,
      `Required date: ${form.get("date")}`, `Formulation: ${form.get("formulation")}`,
      `Fulfilment: ${form.get("fulfilment")}`, `Pincode: ${form.get("pincode") || "Not applicable"}`,
      `Address / pickup note: ${form.get("address") || "Not provided"}`,
      `Message / dietary note: ${form.get("notes") || "None"}`, "",
      "I understand this is an enquiry, not a confirmed order. Please confirm availability, final price, allergens and payment instructions.",
    ].join("\n");
    setSent(true);
    window.open(`https://wa.me/919940058623?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <section className="innerHero preorderHero"><p className="eyebrow">PREORDER ENQUIRY</p><h1>{en ? "One clear message. A personal confirmation." : "ஒரே தெளிவான செய்தி. தனிப்பட்ட உறுதிப்படுத்தல்."}</h1><p>{en ? "Choose products, tell us the date and fulfilment preference, then send the prepared request on WhatsApp." : "பொருட்கள், தேதி மற்றும் பெறும் முறையைத் தேர்ந்தெடுத்து WhatsApp-ல் கோரிக்கையை அனுப்புங்கள்."}</p></section>
      <section className="orderLayout">
        <div className="orderSummary">
          <p className="eyebrow dark">YOUR SELECTION</p>
          <h2>{en ? "Enquiry summary" : "விசாரணை சுருக்கம்"}</h2>
          {selections.length === 0 ? <div className="emptyState"><p>{en ? "No products selected yet." : "இன்னும் பொருட்கள் தேர்ந்தெடுக்கப்படவில்லை."}</p><Link className="button buttonCacao" href="/menu">{en ? "Browse the menu" : "மெனுவைப் பார்க்க"}</Link></div> : selections.map(({ key, product, selectedOption, quantity }) => <div className="summaryItem" key={key}><div><strong>{en ? product?.name : product?.nameTa}</strong><small>{en ? selectedOption?.label : selectedOption?.labelTa} · {formatPrice(selectedOption?.price ?? null)}</small></div><div className="quantityControl"><button onClick={() => updateItem(key, quantity - 1)} type="button" aria-label="Decrease">−</button><span>{quantity}</span><button onClick={() => updateItem(key, quantity + 1)} type="button" aria-label="Increase">+</button><button className="remove" onClick={() => removeItem(key)} type="button">{en ? "Remove" : "நீக்கு"}</button></div></div>)}
          <div className="enquiryCallout"><strong>{en ? "No payment will be collected here." : "இங்கே கட்டணம் வசூலிக்கப்படாது."}</strong><span>{en ? "Final pricing follows capacity, recipe, delivery and customisation confirmation." : "தயாரிப்பு, டெலிவரி மற்றும் தனிப்பயன் உறுதிப்படுத்தலுக்குப் பிறகு இறுதி விலை தெரிவிக்கப்படும்."}</span></div>
        </div>
        <form className="orderForm" onSubmit={sendWhatsApp}>
          <p className="eyebrow dark">REQUEST DETAILS</p><h2>{en ? "Tell us about the order" : "ஆர்டர் விவரங்களை தெரிவிக்கவும்"}</h2>
          <div className="fieldRow"><label>{en ? "Your name" : "உங்கள் பெயர்"}<input name="name" required autoComplete="name" /></label><label>{en ? "Mobile number" : "மொபைல் எண்"}<input name="phone" required inputMode="tel" pattern="[0-9 +()-]{8,18}" autoComplete="tel" /></label></div>
          <div className="fieldRow"><label>{en ? "Required date" : "தேவையான தேதி"}<input name="date" required type="date" /></label><label>{en ? "Formulation" : "வகை"}<select name="formulation" required defaultValue=""><option value="" disabled>{en ? "Choose" : "தேர்வு"}</option><option>Egg</option><option>Eggless</option></select></label></div>
          <fieldset><legend>{en ? "Fulfilment" : "பெறும் முறை"}</legend><label className="radio"><input type="radio" name="fulfilment" value="Pickup by appointment" defaultChecked />{en ? "Pickup by confirmed appointment" : "உறுதி செய்யப்பட்ட நேரத்தில் பிக்கப்"}</label><label className="radio"><input type="radio" name="fulfilment" value="Delivery within 20 km" />{en ? "Delivery within validated 20 km radius" : "சோதிக்கப்பட்ட 20 கி.மீ. சுற்றளவில் டெலிவரி"}</label></fieldset>
          <div className="fieldRow"><label>{en ? "Delivery pincode" : "டெலிவரி அஞ்சல் குறியீடு"}<input name="pincode" inputMode="numeric" pattern="[0-9]{6}" placeholder="600117" /></label><label>{en ? "Address / pickup note" : "முகவரி / பிக்கப் குறிப்பு"}<input name="address" /></label></div>
          <label>{en ? "Short cake message, allergies or other notes" : "கேக் செய்தி, அலர்ஜி அல்லது பிற குறிப்புகள்"}<textarea name="notes" rows={4} /></label>
          <label className="consent"><input type="checkbox" required />{en ? "I understand San Bakes handles wheat, milk, egg, nuts and soy; suitability must be confirmed before payment." : "San Bakes-ல் கோதுமை, பால், முட்டை, நட்ஸ் மற்றும் சோயா கையாளப்படுவதை புரிந்துகொள்கிறேன்."}</label>
          <button className="button buttonCacao submitButton" type="submit" disabled={selections.length === 0}>{en ? "Send request on WhatsApp" : "WhatsApp-ல் கோரிக்கை அனுப்ப"}</button>
          {sent && <p className="successNote">{en ? "WhatsApp opened with your structured request. Your order is confirmed only after San Bakes replies with availability and payment instructions." : "உங்கள் கோரிக்கையுடன் WhatsApp திறக்கப்பட்டது. San Bakes உறுதிப்படுத்திய பிறகே ஆர்டர் உறுதியாகும்."}</p>}
        </form>
      </section>
      <section className="processStrip"><div><span>1</span><strong>{en ? "Send enquiry" : "விசாரணை"}</strong><p>{en ? "Prefer 48 hours for brownies and 72 hours or more for celebration cakes." : "பிரௌனிகளுக்கு 48 மணி, கொண்டாட்ட கேக்குகளுக்கு 72 மணி முன்பதிவு."}</p></div><div><span>2</span><strong>{en ? "Receive confirmation" : "உறுதிப்படுத்தல்"}</strong><p>{en ? "We confirm capacity, ingredients, allergens, price and delivery quote." : "தயாரிப்பு, பொருட்கள், விலை மற்றும் டெலிவரி உறுதி செய்யப்படும்."}</p></div><div><span>3</span><strong>{en ? "Pay only when invited" : "அறிவித்த பின் கட்டணம்"}</strong><p>{en ? "Payment instructions are shared only after the order summary is agreed." : "ஆர்டர் விவரங்கள் ஒப்புக்கொண்ட பிறகு கட்டண தகவல் அனுப்பப்படும்."}</p></div></section>
    </main>
  );
}
