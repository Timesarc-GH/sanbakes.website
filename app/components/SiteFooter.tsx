"use client";

import Link from "next/link";
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
        <div><strong>{en ? "Explore" : "பார்க்க"}</strong><Link href="/menu">{en ? "Full menu" : "முழு மெனு"}</Link><Link href="/about">{en ? "Our standard" : "எங்கள் தரநிலை"}</Link><Link href="/preorder">{en ? "Preorder enquiry" : "முன்பதிவு விசாரணை"}</Link></div>
        <div><strong>{en ? "Follow" : "பின்தொடர"}</strong><a href="https://www.instagram.com/san.homebakes/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://wa.me/919940058623" target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
        <div><strong>{en ? "Information" : "தகவல்"}</strong><Link href="/policies">{en ? "Policies & allergens" : "கொள்கைகள் & அலர்ஜன்கள்"}</Link><span>{en ? "Pickup by confirmed appointment" : "உறுதி செய்யப்பட்ட நேரத்தில் பிக்கப்"}</span><span>{en ? "Keelkattalai, Chennai 600117" : "கீழ்க்கட்டளை, சென்னை 600117"}</span></div>
      </div>
      <div className="footerBottom">
        <span>© 2026 San Bakes</span>
        <span>{en ? "FSSAI details will appear before transactional launch." : "ஆன்லைன் விற்பனைக்கு முன் FSSAI விவரங்கள் வெளியிடப்படும்."}</span>
      </div>
    </footer>
  );
}
