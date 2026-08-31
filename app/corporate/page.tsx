"use client";

import { useLanguage } from "../components/LanguageProvider";
import { ProductCollection } from "../components/ProductCollection";

export default function CorporatePage() {
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <main>
      <section className="innerHero corporateHero">
        <p className="eyebrow">CORPORATE ORDERS</p>
        <h1>{en ? "Structured for teams. Still personal." : "குழுக்களுக்காக திட்டமிடப்பட்டது. இன்னும் தனிப்பட்டது."}</h1>
        <p>{en ? "For client appreciation, employee milestones, meetings and festive programmes, choose a coordinated flavour, presentation and delivery plan for every recipient." : "வாடிக்கையாளர் நன்றி, ஊழியர் சாதனைகள், கூட்டங்கள் மற்றும் பண்டிகை திட்டங்களுக்கு ஒருங்கிணைந்த சுவை, பேக்கிங் மற்றும் டெலிவரி திட்டத்தைத் தேர்ந்தெடுக்கவும்."}</p>
        <div className="innerHeroActions"><a className="button buttonLight" href="#corporate-collection">{en ? "Choose a Corporate format" : "நிறுவன வகையைத் தேர்ந்தெடுக்க"}</a><a className="button buttonOutlineLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>
      </section>

      <div id="corporate-collection">
        <ProductCollection
          productIds={["corporate-mini-box", "bespoke-corporate"]}
          eyebrowEn="CORPORATE COLLECTION"
          eyebrowTa="நிறுவன தொகுப்பு"
          titleEn="Choose the format before the finish."
          titleTa="அலங்காரத்திற்கு முன் வடிவத்தைத் தேர்ந்தெடுக்கவும்."
          introEn="Select a volume tier and add the minimum quantity directly to the cart. Bespoke branding remains quotation-led because artwork, packaging and fulfilment affect the final price."
          introTa="அளவு நிலையைத் தேர்ந்தெடுத்து குறைந்தபட்ச எண்ணிக்கையை நேரடியாக கார்ட்டில் சேர்க்கவும். வடிவமைப்பு, பேக்கிங் மற்றும் நிறைவேற்றம் இறுதி விலையை மாற்றுவதால் தனிப்பயன் பிராண்டிங் விலை மதிப்பீட்டில் தொடரும்."
        />
      </div>

      <section className="corporateSection">
        <div className="corporateIntro"><p className="eyebrow dark">LEAD TIME</p><h2>{en ? "Enough time protects consistency." : "போதுமான நேரம் ஒரே தரத்தை உறுதி செய்கிறது."}</h2><p>{en ? "Standard corporate orders require at least seven calendar days. Your date is reserved after the order details, availability and payment schedule are confirmed in writing." : "சாதாரண நிறுவன ஆர்டர்களுக்கு குறைந்தது ஏழு நாட்கள் தேவை. ஆர்டர் விவரங்கள், கிடைக்கும் நிலை மற்றும் கட்டண அட்டவணை எழுத்தில் உறுதி செய்யப்பட்ட பிறகு தேதி முன்பதிவு செய்யப்படும்."}</p></div>
        <div className="corporateFacts">
          <article><small>{en ? "STANDARD" : "சாதாரணம்"}</small><strong>{en ? "7 calendar days" : "7 நாட்கள்"}</strong><span>{en ? "San Bakes presentation and one common message" : "San Bakes பேக்கிங் மற்றும் ஒரு பொதுவான செய்தி"}</span></article>
          <article><small>{en ? "50+ UNITS" : "50+ யூனிட்கள்"}</small><strong>{en ? "10 calendar days" : "10 நாட்கள்"}</strong><span>{en ? "Final quantity and flavour selection confirmed together" : "இறுதி அளவும் சுவை தேர்வும் ஒன்றாக உறுதி செய்யப்படும்"}</span></article>
          <article><small>{en ? "BRANDED SLEEVE" : "பிராண்டட் ஸ்லீவ்"}</small><strong>{en ? "14 calendar days" : "14 நாட்கள்"}</strong><span>{en ? "One logo, one design, one proof and one correction" : "ஒரு லோகோ, ஒரு வடிவமைப்பு, ஒரு ப்ரூஃப் மற்றும் ஒரு திருத்தம்"}</span></article>
          <article><small>{en ? "MULTI-ADDRESS" : "பல முகவரிகள்"}</small><strong>{en ? "14–21 calendar days" : "14–21 நாட்கள்"}</strong><span>{en ? "Quoted with a separate fulfilment plan" : "தனி நிறைவேற்றும் திட்டத்துடன் விலை"}</span></article>
        </div>
        <div className="corporateTerms"><h3>{en ? "Commercial conditions" : "வர்த்தக நிபந்தனைகள்"}</h3><ul><li>{en ? "A 50% deposit reserves the production slot after proposal acceptance." : "திட்டத்தை ஏற்ற பிறகு 50% முன்பணம் தயாரிப்பு ஸ்லாட்டை உறுதி செய்யும்."}</li><li>{en ? "The balance is due five business days before dispatch." : "மீதித் தொகை டிஸ்பாட்சுக்கு ஐந்து வேலை நாட்களுக்கு முன் செலுத்த வேண்டும்."}</li><li>{en ? "Up to two flavours for 25–49 units and up to four flavours for 50+ units." : "25–49 யூனிட்களுக்கு இரண்டு சுவைகள் வரை; 50+ யூனிட்களுக்கு நான்கு சுவைகள் வரை."}</li><li>{en ? "Final quantity, wording and artwork close before ingredients or printed material are committed." : "பொருட்கள் அல்லது அச்சு வேலை தொடங்குவதற்கு முன் இறுதி அளவு, வாசகம் மற்றும் வடிவமைப்பு முடிக்கப்பட வேண்டும்."}</li><li>{en ? "The corporate minimum is 25 boxes / ₹12,250 before delivery. Branding and multi-address fulfilment are quoted separately." : "நிறுவன ஆர்டரின் குறைந்தபட்சம் 25 பெட்டிகள் / டெலிவரிக்கு முன் ₹12,250. பிராண்டிங் மற்றும் பல முகவரி டெலிவரி தனியாக விலைமதிப்பிடப்படும்."}</li></ul><a className="button buttonCacao" href="https://wa.me/919940058623?text=Hello%20San%20Bakes%2C%20I%27d%20like%20a%20corporate%20order%20proposal.%0ACompany%3A%0ARequired%20date%3A%0AProduct%20and%20quantity%3A%0ABudget%3A%0AOne%20or%20multiple%20addresses%3A" target="_blank" rel="noreferrer">{en ? "Start a Corporate enquiry" : "நிறுவன விசாரணையைத் தொடங்க"}</a></div>
      </section>
    </main>
  );
}
