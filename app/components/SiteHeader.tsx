"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { usePreorder } from "./PreorderProvider";

const links = [
  { href: "/menu", en: "Menu & Pricing", ta: "மெனு & விலை" },
  { href: "/about", en: "Our Standard", ta: "எங்கள் தரநிலை" },
  { href: "/gifting", en: "Gifting", ta: "பரிசுகள்" },
  { href: "/delivery", en: "Delivery", ta: "டெலிவரி" },
  { href: "/faq", en: "FAQ", ta: "கேள்விகள்" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { count } = usePreorder();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement">
        <span>{language === "en" ? "Preorder only · Chennai delivery within 20 km" : "முன்பதிவு மட்டும் · சென்னையில் 20 கி.மீ. வரை"}</span>
        <span className="announcementNote">FSSAI registration pending · Enquiries open, payment disabled</span>
      </div>
      <header className="siteHeader">
        <Link className="brand" href="/" aria-label="San Bakes home">
          <Image src="/brand/san-bakes-logo.jpg" width={48} height={48} alt="San Bakes" className="brandSeal" priority />
          <span>
            <strong>SAN BAKES</strong>
            <small>{language === "en" ? "Small-batch cacao & millet patisserie" : "குறைந்த அளவு காகாவ் & சிறுதானிய பட்டிசெரி"}</small>
          </span>
        </Link>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          {links.map((link) => (
            <Link className={pathname === link.href ? "active" : ""} href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
              {language === "en" ? link.en : link.ta}
            </Link>
          ))}
          <Link className="mobileOrderLink" href="/preorder" onClick={() => setMenuOpen(false)}>{language === "en" ? "Start preorder enquiry" : "முன்பதிவு விசாரணை"}</Link>
        </nav>
        <div className="headerTools">
          <div className="languageToggle" aria-label="Language">
            <button className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")} type="button">EN</button>
            <button className={language === "ta" ? "selected" : ""} onClick={() => setLanguage("ta")} type="button">தமிழ்</button>
          </div>
          <Link className="headerCta" href="/preorder">
            {language === "en" ? "Enquiry" : "விசாரணை"}{count > 0 ? ` (${count})` : ""}
          </Link>
          <button className="menuToggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((current) => !current)}>
            <span /> <span /> <span />
          </button>
        </div>
      </header>
      {menuOpen && <button className="navBackdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} type="button" />}
    </>
  );
}
