"use client";

import { useLanguage } from "./LanguageProvider";

export function SiteFooter() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <footer className="siteFooter">
      <div className="footerLead">
        <p className="eyebrow">SAN BAKES · CHENNAI</p>
        <h2>{en ? "A considered batch, for a date that matters." : "முக்கியமான நாளுக்காக, கவனமாக தயாரிக்கப்படும் தொகுதி."}</h2>
        <a href="https://wa.me/919940058623" target="_blank" rel="noreferrer">WhatsApp +91 99400 58623 ↗</a>
      </div>
      <div className="footerGrid">
        <div><strong>{en ? "Explore" : "பார்க்க"}</strong><a href="/menu">{en ? "Menu & pricing" : "மெனு & விலை"}</a><a href="/cupcakes">{en ? "Cupcakes · planned launch" : "கப் கேக்குகள் · திட்டமிட்ட அறிமுகம்"}</a><a href="/parties">{en ? "Birthdays & parties" : "பிறந்தநாள் & பார்ட்டி"}</a><a href="/about">{en ? "Our standard" : "எங்கள் தரநிலை"}</a><a href="/faq">{en ? "Frequently asked questions" : "அடிக்கடி கேட்கப்படும் கேள்விகள்"}</a></div>
        <div><strong>{en ? "Order" : "ஆர்டர்"}</strong><a href="/preorder">{en ? "Preorder enquiry" : "முன்பதிவு விசாரணை"}</a><a href="/delivery">{en ? "Delivery & pickup" : "டெலிவரி & பிக்கப்"}</a><a href="/policies">{en ? "Policies & allergens" : "கொள்கைகள் & அலர்ஜன்கள்"}</a></div>
        <div><strong>{en ? "Gifting & business" : "பரிசுகள் & நிறுவனங்கள்"}</strong><a href="/gifting">{en ? "Personal gifting" : "தனிப்பட்ட பரிசுகள்"}</a><a href="/corporate">{en ? "Corporate orders" : "நிறுவன ஆர்டர்கள்"}</a><span>{en ? "Corporate minimum: 25 boxes or ₹15,000" : "குறைந்தபட்சம்: 25 பெட்டிகள் அல்லது ₹15,000"}</span></div>
        <div><strong>{en ? "Follow" : "பின்தொடர"}</strong><a href="https://www.instagram.com/san.homebakes/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://wa.me/919940058623" target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
        <div><strong>{en ? "Kitchen" : "சமையலறை"}</strong><span>{en ? "Pickup by confirmed appointment" : "உறுதி செய்யப்பட்ட நேரத்தில் பிக்கப்"}</span><span>{en ? "Keelkattalai, Chennai 600117" : "கீழ்க்கட்டளை, சென்னை 600117"}</span><span>{en ? "Delivery within a validated 20 km radius" : "சோதிக்கப்பட்ட 20 கி.மீ. சுற்றளவில் டெலிவரி"}</span></div>
      </div>
      <div className="footerBottom">
        <span>© 2026 San Bakes</span>
        <span>{en ? "FSSAI details will appear before transactional launch." : "ஆன்லைன் விற்பனைக்கு முன் FSSAI விவரங்கள் வெளியிடப்படும்."}</span>
      </div>
    </footer>
  );
}
