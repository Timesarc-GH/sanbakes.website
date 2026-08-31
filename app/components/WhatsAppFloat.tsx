"use client";

import { useLanguage } from "./LanguageProvider";

export function WhatsAppFloat() {
  const { language } = useLanguage();
  return (
    <a
      className="whatsappFloat"
      href="https://wa.me/919940058623?text=Hello%20San%20Bakes%2C%20I%27d%20like%20to%20ask%20about%20a%20preorder."
      target="_blank"
      rel="noreferrer"
      aria-label={language === "en" ? "Contact San Bakes on WhatsApp" : "WhatsApp மூலம் San Bakes-ஐ தொடர்புகொள்ளவும்"}
    >
      <span aria-hidden="true">◉</span>{language === "en" ? "WhatsApp" : "வாட்ஸ்அப்"}
    </a>
  );
}
