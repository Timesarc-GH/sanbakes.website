"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { usePreorder } from "./PreorderProvider";

const links = [
  { href: "/", en: "Home", ta: "முகப்பு" },
  { href: "/menu", en: "Menu & Pricing", ta: "மெனு & விலை" },
  { href: "/cupcakes", en: "Cupcakes", ta: "கப் கேக்குகள்" },
  { href: "/parties", en: "Birthdays & Parties", ta: "பிறந்தநாள் & பார்ட்டி" },
  { href: "/gifting", en: "Gifting", ta: "பரிசுகள்" },
  { href: "/corporate", en: "Corporate", ta: "நிறுவனங்கள்" },
  { href: "/about", en: "Our Standard", ta: "எங்கள் தரநிலை" },
  { href: "/delivery", en: "Delivery", ta: "டெலிவரி" },
  { href: "/faq", en: "FAQ", ta: "கேள்விகள்" },
  { href: "/policies", en: "Policies", ta: "கொள்கைகள்" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { count } = usePreorder();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement">
        <span>{language === "en" ? "Preorder only · Delivery within Chennai" : "முன்பதிவு மட்டும் · சென்னை முழுவதும் டெலிவரி"}</span>
        <span className="announcementNote">FSSAI registration pending · Preorders subject to confirmation</span>
      </div>
      <header className="siteHeader">
        <a className="brand" href="/" aria-label="San Bakes home">
          <Image src="/brand/san-bakes-logo.jpg" width={48} height={48} alt="San Bakes" className="brandSeal" priority />
          <span>
            <strong>SAN BAKES</strong>
            <small>{language === "en" ? "Small-batch cacao & millet patisserie" : "குறைந்த அளவு காகாவ் & சிறுதானிய பட்டிசெரி"}</small>
          </span>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          {links.map((link) => (
            <a className={pathname === link.href ? "active" : ""} href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
              {language === "en" ? link.en : link.ta}
            </a>
          ))}
          <a className="mobileOrderLink" href="/preorder" onClick={() => setMenuOpen(false)}>{language === "en" ? "Review cart & order" : "கார்ட் & ஆர்டரைப் பார்க்க"}</a>
        </nav>
        <div className="headerTools">
          <div className="languageToggle" aria-label="Language">
            <button className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")} type="button">EN</button>
            <button className={language === "ta" ? "selected" : ""} onClick={() => setLanguage("ta")} type="button">தமிழ்</button>
          </div>
          <a className="headerCta" href="/preorder">
            {language === "en" ? "Cart" : "கார்ட்"}{count > 0 ? ` (${count})` : ""}
          </a>
          <button className="menuToggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((current) => !current)}>
            <span /> <span /> <span />
          </button>
        </div>
      </header>
      {menuOpen && <button className="navBackdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} type="button" />}
    </>
  );
}
