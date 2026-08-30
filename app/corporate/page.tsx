"use client";

import { useLanguage } from "../components/LanguageProvider";

const corporateFormats = [
  { title:"Corporate Mini Box — 4 pieces", titleTa:"கார்ப்பரேட் மினி பாக்ஸ் — 4 துண்டுகள்", price:"₹690 / ₹655 / ₹635 per box", detail:"25–49 / 50–99 / 100+ boxes", detailTa:"25–49 / 50–99 / 100+ பெட்டிகள்" },
  { title:"Individually Packed Brownies", titleTa:"தனித்தனியாக பேக் செய்யப்பட்ட பிரௌனிகள்", price:"₹175–₹195 each", detail:"Minimum 25 · from ₹4,375", detailTa:"குறைந்தபட்சம் 25 · ₹4,375 முதல்" },
  { title:"Three-Piece Brownie Tins", titleTa:"மூன்று துண்டு பிரௌனி டின்கள்", price:"₹525–₹610 per Tin", detail:"Minimum 10 · from ₹5,250", detailTa:"குறைந்தபட்சம் 10 · ₹5,250 முதல்" },
  { title:"Classic or Loaded Tubs", titleTa:"கிளாசிக் அல்லது லோடெட் டப்கள்", price:"₹375–₹455 per Tub", detail:"Minimum 10 · from ₹3,750", detailTa:"குறைந்தபட்சம் 10 · ₹3,750 முதல்" },
];

export default function CorporatePage() {
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <main>
      <section className="innerHero corporateHero">
        <p className="eyebrow">CORPORATE ORDERS</p>
        <h1>{en ? "Structured for teams. Still personal." : "குழுக்களுக்காக திட்டமிடப்பட்டது. இன்னும் தனிப்பட்டது."}</h1>
        <p>{en ? "For client appreciation, employee milestones, meetings and festive programmes, San Bakes controls flavour, packaging and approvals so every unit arrives consistently." : "வாடிக்கையாளர் நன்றி, ஊழியர் சாதனைகள், கூட்டங்கள் மற்றும் பண்டிகை திட்டங்களுக்காக சுவை, பேக்கிங் மற்றும் அனுமதிகள் கட்டுப்படுத்தப்படுகின்றன."}</p>
        <div className="innerHeroActions"><a className="button buttonLight" href="https://wa.me/919940058623?text=Hello%20San%20Bakes%2C%20I%27d%20like%20a%20corporate%20order%20proposal.%0ACompany%3A%0ARequired%20date%3A%0AProduct%20and%20quantity%3A%0ABudget%3A%0AOne%20or%20multiple%20addresses%3A" target="_blank" rel="noreferrer">{en ? "Request a proposal" : "விலை மதிப்பீடு கேட்க"}</a><a className="button buttonOutlineLight" href="/menu?category=corporate">{en ? "View Corporate menu" : "நிறுவன மெனு"}</a></div>
      </section>

      <section className="offerSection">
        <div className="offerIntro"><p className="eyebrow dark">PLANNING PRICES</p><h2>{en ? "Choose the format before the finish." : "அலங்காரத்திற்கு முன் வடிவத்தைத் தேர்ந்தெடுக்கவும்."}</h2><p>{en ? "These recommendations keep a premium product viable at controlled volumes. Delivery, printed sleeves, individual names, artwork changes and multiple addresses are additional." : "கட்டுப்படுத்தப்பட்ட அளவில் பிரீமியம் தயாரிப்பை நிலைத்திருக்க இந்த விலைகள் பரிந்துரைக்கப்படுகின்றன. டெலிவரி, அச்சிடப்பட்ட ஸ்லீவ், தனிப்பட்ட பெயர்கள், வடிவமைப்பு மாற்றங்கள் மற்றும் பல முகவரிகள் கூடுதல்."}</p></div>
        <div className="offerGrid">{corporateFormats.map((item) => <article key={item.title}><small>CORPORATE FORMAT</small><h3>{en ? item.title : item.titleTa}</h3><strong>{item.price}</strong><p>{en ? item.detail : item.detailTa}</p></article>)}</div>
        <p className="planningNote">{en ? "Planning prices are pending recipe yield, final packaging, supplier invoice and margin validation. Egg and Eggless are proposed at the same launch price." : "ரெசிபி யீல்ட், இறுதி பேக்கிங், சப்ளையர் இன்வாய்ஸ் மற்றும் மார்ஜின் சோதனை வரை திட்ட விலைகள் தற்காலிகமானவை. Egg மற்றும் Eggless ஒரே அறிமுக விலையில் பரிந்துரைக்கப்படுகின்றன."}</p>
      </section>

      <section className="corporateSection">
        <div className="corporateIntro"><p className="eyebrow dark">LEAD TIME</p><h2>{en ? "Enough time protects consistency." : "போதுமான நேரம் ஒரே தரத்தை உறுதி செய்கிறது."}</h2><p>{en ? "The enquiry date is not reserved until the specification, capacity and payment plan are confirmed in writing." : "விவரங்கள், திறன் மற்றும் கட்டண திட்டம் எழுத்தில் உறுதி செய்யப்படும் வரை தேதி முன்பதிவு செய்யப்படாது."}</p></div>
        <div className="corporateFacts">
          <article><small>{en ? "STANDARD" : "சாதாரணம்"}</small><strong>{en ? "7 calendar days" : "7 நாட்கள்"}</strong><span>{en ? "San Bakes presentation and one common message" : "San Bakes பேக்கிங் மற்றும் ஒரு பொதுவான செய்தி"}</span></article>
          <article><small>{en ? "50+ UNITS" : "50+ யூனிட்கள்"}</small><strong>{en ? "10 calendar days" : "10 நாட்கள்"}</strong><span>{en ? "Capacity and flavour plan locked together" : "திறன் மற்றும் சுவை திட்டம் ஒன்றாக உறுதி செய்யப்படும்"}</span></article>
          <article><small>{en ? "BRANDED SLEEVE" : "பிராண்டட் ஸ்லீவ்"}</small><strong>{en ? "14 calendar days" : "14 நாட்கள்"}</strong><span>{en ? "One logo, one design, one proof and one correction" : "ஒரு லோகோ, ஒரு வடிவமைப்பு, ஒரு ப்ரூஃப் மற்றும் ஒரு திருத்தம்"}</span></article>
          <article><small>{en ? "MULTI-ADDRESS" : "பல முகவரிகள்"}</small><strong>{en ? "14–21 calendar days" : "14–21 நாட்கள்"}</strong><span>{en ? "Quoted with a separate fulfilment plan" : "தனி நிறைவேற்றும் திட்டத்துடன் விலை"}</span></article>
        </div>
        <div className="corporateTerms"><h3>{en ? "Recommended commercial conditions" : "பரிந்துரைக்கப்பட்ட வர்த்தக நிபந்தனைகள்"}</h3><ul><li>{en ? "A 50% deposit reserves the production slot after quotation acceptance." : "விலை மதிப்பீட்டை ஏற்ற பிறகு 50% முன்பணம் தயாரிப்பு ஸ்லாட்டை உறுதி செய்யும்."}</li><li>{en ? "The balance is due five business days before dispatch." : "மீதித் தொகை டிஸ்பாட்சுக்கு ஐந்து வேலை நாட்களுக்கு முன் செலுத்த வேண்டும்."}</li><li>{en ? "Up to two flavours for 25–49 units and up to four flavours for 50+ units." : "25–49 யூனிட்களுக்கு இரண்டு சுவைகள் வரை; 50+ யூனிட்களுக்கு நான்கு சுவைகள் வரை."}</li><li>{en ? "Final quantity, wording and artwork close before ingredients or printed material are committed." : "பொருட்கள் அல்லது அச்சு வேலை தொடங்குவதற்கு முன் இறுதி அளவு, வாசகம் மற்றும் வடிவமைப்பு முடிக்கப்பட வேண்டும்."}</li><li>{en ? "Bespoke corporate gifting retains a minimum of 25 boxes or ₹15,000 before delivery, whichever is reached first." : "தனிப்பயன் நிறுவன பரிசுகளுக்கு டெலிவரிக்கு முன் குறைந்தபட்சம் 25 பெட்டிகள் அல்லது ₹15,000; முதலில் எது நிறைவடைகிறதோ அது பொருந்தும்."}</li></ul><a className="button buttonCacao" href="https://wa.me/919940058623?text=Hello%20San%20Bakes%2C%20I%27d%20like%20a%20corporate%20order%20proposal.%0ACompany%3A%0ARequired%20date%3A%0AProduct%20and%20quantity%3A%0ABudget%3A%0AOne%20or%20multiple%20addresses%3A" target="_blank" rel="noreferrer">{en ? "Start a Corporate enquiry" : "நிறுவன விசாரணையைத் தொடங்க"}</a></div>
      </section>
    </main>
  );
}
