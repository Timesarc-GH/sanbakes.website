export type OrderMessageSelection = {
  productName: string;
  productNameTa: string;
  optionLabel: string;
  optionLabelTa: string;
  formulationLabel: string;
  formulationLabelTa: string;
  priceLabel: string;
  quantity: number;
};

export type OrderMessageDetails = {
  name: string;
  phone: string;
  date: string;
  fulfilment: string;
  pincode: string;
  address: string;
  notes: string;
};

type BuildOrderMessageInput = {
  language: "en" | "ta";
  selections: OrderMessageSelection[];
  subtotalLabel: string;
  hasQuotationSelection: boolean;
  details: OrderMessageDetails;
};

function tamilFulfilment(value: string) {
  if (value === "Pickup by appointment") return "உறுதி செய்யப்பட்ட நேரத்தில் பிக்கப்";
  if (value === "Delivery within Chennai") return "சென்னை முழுவதும் டெலிவரி";
  return value;
}

export function buildWhatsAppOrderMessage({ language, selections, subtotalLabel, hasQuotationSelection, details }: BuildOrderMessageInput) {
  const tamil = language === "ta";
  const lines = selections.map((selection) => `• ${tamil ? selection.productNameTa : selection.productName} · ${tamil ? selection.optionLabelTa : selection.optionLabel} · ${tamil ? selection.formulationLabelTa : selection.formulationLabel} · ${selection.priceLabel} × ${selection.quantity}`);

  if (!tamil) {
    return [
      "Hello San Bakes, I would like to place a preorder.", "", "CART", ...lines,
      "", `SUBTOTAL: ${subtotalLabel}`,
      hasQuotationSelection ? "Bespoke item included: its price and final total will be confirmed separately." : "Delivery and paid customisation are additional until confirmed.",
      "", "CUSTOMER", `Name: ${details.name}`, `Phone: ${details.phone}`,
      `Required date: ${details.date}`,
      `Fulfilment: ${details.fulfilment}`, `Pincode: ${details.pincode || "Not applicable"}`,
      `Address / pickup note: ${details.address || "Not provided"}`,
      `Message / dietary note: ${details.notes || "None"}`, "",
      "Please confirm availability, final payable amount, allergens and the UPI recipient before I pay.",
    ].join("\n");
  }

  return [
    "வணக்கம் San Bakes, நான் முன்பதிவு செய்ய விரும்புகிறேன்.", "", "கார்ட்", ...lines,
    "", `இடைக்கூட்டுத்தொகை: ${subtotalLabel}`,
    hasQuotationSelection ? "தனிப்பயன் பொருள் சேர்க்கப்பட்டுள்ளது; அதன் விலையும் இறுதி மொத்தமும் தனியாக உறுதி செய்யப்படும்." : "டெலிவரி மற்றும் கட்டணத் தனிப்பயனாக்கம் உறுதிப்படுத்தும் வரை கூடுதலாகும்.",
    "", "வாடிக்கையாளர்", `பெயர்: ${details.name}`, `தொலைபேசி: ${details.phone}`,
    `தேவையான தேதி: ${details.date}`,
    `பெறும் முறை: ${tamilFulfilment(details.fulfilment)}`, `அஞ்சல் குறியீடு: ${details.pincode || "பொருந்தாது"}`,
    `முகவரி / பிக்கப் குறிப்பு: ${details.address || "வழங்கப்படவில்லை"}`,
    `செய்தி / உணவுக் குறிப்பு: ${details.notes || "இல்லை"}`, "",
    "நான் செலுத்துவதற்கு முன் கிடைக்கும் நிலை, இறுதி கட்டணத் தொகை, அலர்ஜன்கள் மற்றும் UPI பெறுநரை உறுதிப்படுத்தவும்.",
  ].join("\n");
}
