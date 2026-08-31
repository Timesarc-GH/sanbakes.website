"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { usePreorder } from "./PreorderProvider";

const shopLinks = [
  { href: "/menu", en: "Brownies", ta: "பிரௌனிகள்" },
  { href: "/cupcakes", en: "Cupcakes", ta: "கப் கேக்குகள்" },
  { href: "/parties", en: "Birthdays & Parties", ta: "பிறந்தநாள் & பார்ட்டி" },
  { href: "/gifting", en: "Gifting", ta: "பரிசுகள்" },
  { href: "/corporate", en: "Corporate", ta: "நிறுவனங்கள்" },
];

const helpLinks = [
  { href: "/delivery", en: "Delivery", ta: "டெலிவரி" },
  { href: "/faq", en: "FAQ", ta: "கேள்விகள்" },
  { href: "/policies", en: "Policies", ta: "கொள்கைகள்" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { count } = usePreorder();
  const [menuOpen, setMenuOpen] = useState(false);
  const shopActive = shopLinks.some((link) => pathname === link.href);
  const helpActive = helpLinks.some((link) => pathname === link.href);

  return (
    <>
      <div className="announcement">
        <span>{language === "en" ? "Preorder only · Delivery within Chennai" : "முன்பதிவு மட்டும் · சென்னை முழுவதும் டெலிவரி"}</span>
        <span className="announcementNote">{language === "en" ? "FSSAI registration pending · Preorders subject to confirmation" : "FSSAI பதிவு நிலுவையில் உள்ளது · முன்பதிவுகள் உறுதிப்படுத்தலுக்கு உட்பட்டவை"}</span>
      </div>
      <header className="siteHeader">
        <a className="brand" href="/" aria-label={language === "en" ? "San Bakes home" : "San Bakes முகப்பு"}>
          <Image src="/brand/san-bakes-logo.jpg" width={96} height={96} alt="San Bakes" className="brandSeal" priority />
          <span>
            <strong>SAN BAKES</strong>
            <small>{language === "en" ? "Small-batch cacao & millet patisserie" : "குறைந்த அளவு காகாவ் & சிறுதானிய பட்டிசெரி"}</small>
          </span>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label={language === "en" ? "Primary navigation" : "முதன்மை வழிசெலுத்தல்"}>
          <a className={pathname === "/" ? "active" : ""} href="/" onClick={() => setMenuOpen(false)}>{language === "en" ? "Home" : "முகப்பு"}</a>
          <details className={`navGroup ${shopActive ? "active" : ""}`}>
            <summary>{language === "en" ? "Shop" : "வாங்க"}</summary>
            <div className="navDropdown">
              {shopLinks.map((link) => <a className={pathname === link.href ? "active" : ""} href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{language === "en" ? link.en : link.ta}</a>)}
            </div>
          </details>
          <a className={pathname === "/about" ? "active" : ""} href="/about" onClick={() => setMenuOpen(false)}>{language === "en" ? "Our Standard" : "எங்கள் தரநிலை"}</a>
          <details className={`navGroup ${helpActive ? "active" : ""}`}>
            <summary>{language === "en" ? "Help" : "உதவி"}</summary>
            <div className="navDropdown">
              {helpLinks.map((link) => <a className={pathname === link.href ? "active" : ""} href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{language === "en" ? link.en : link.ta}</a>)}
            </div>
          </details>
          <a className="mobileOrderLink" href="/preorder" onClick={() => setMenuOpen(false)}>{language === "en" ? "Review cart & order" : "கார்ட் & ஆர்டரைப் பார்க்க"}</a>
        </nav>
        <div className="headerTools">
          <div className="languageToggle" aria-label={language === "en" ? "Language" : "மொழி"}>
            <button className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")} type="button">EN</button>
            <button className={language === "ta" ? "selected" : ""} onClick={() => setLanguage("ta")} type="button">தமிழ்</button>
          </div>
          <a className="headerCta" href="/preorder">
            {language === "en" ? "Cart" : "கார்ட்"}{count > 0 ? ` (${count})` : ""}
          </a>
          <button className="menuToggle" type="button" aria-expanded={menuOpen} aria-label={language === "en" ? (menuOpen ? "Close menu" : "Open menu") : (menuOpen ? "மெனுவை மூடு" : "மெனுவைத் திற")} onClick={() => setMenuOpen((current) => !current)}>
            <span /> <span /> <span />
          </button>
        </div>
      </header>
      {menuOpen && <button className="navBackdrop" aria-label={language === "en" ? "Close menu" : "மெனுவை மூடு"} onClick={() => setMenuOpen(false)} type="button" />}
    </>
  );
}
