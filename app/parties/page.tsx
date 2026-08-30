"use client";

import { useLanguage } from "../components/LanguageProvider";

const partyFormats = [
  { label:"CAKES", labelTa:"கேக்குகள்", title:"Birthday & Occasion Brownie Cakes", titleTa:"பிறந்தநாள் & நிகழ்ச்சி பிரௌனி கேக்குகள்", price:"₹808–₹3,250", detail:"250 g, 500 g or 1 kg · classic or reserve finish", detailTa:"250 கிராம், 500 கிராம் அல்லது 1 கிலோ · கிளாசிக் அல்லது ரிசர்வ் அலங்காரம்" },
  { label:"PARTY FAVOURS", labelTa:"பார்ட்டி பரிசுகள்", title:"Individually Packed Brownies", titleTa:"தனித்தனியாக பேக் செய்யப்பட்ட பிரௌனிகள்", price:"25 from ₹4,375", detail:"₹175 Classic or ₹195 Reserve · minimum 25 pieces", detailTa:"கிளாசிக் ₹175 அல்லது ரிசர்வ் ₹195 · குறைந்தபட்சம் 25 துண்டுகள்" },
  { label:"THREE-PIECE TINS", labelTa:"மூன்று துண்டு டின்கள்", title:"Party Brownie Tins", titleTa:"பார்ட்டி பிரௌனி டின்கள்", price:"10 from ₹5,250", detail:"₹525 Classic or ₹610 curated assorted · minimum 10 Tins", detailTa:"கிளாசிக் ₹525 அல்லது கலவை ₹610 · குறைந்தபட்சம் 10 டின்கள்" },
  { label:"INDIVIDUAL DESSERTS", labelTa:"தனிப்பட்ட டெசர்ட்கள்", title:"Party Brownie Tubs", titleTa:"பார்ட்டி பிரௌனி டப்கள்", price:"10 from ₹3,750", detail:"₹375 Classic or ₹455 Loaded · minimum 10 Tubs", detailTa:"கிளாசிக் ₹375 அல்லது லோடெட் ₹455 · குறைந்தபட்சம் 10 டப்கள்" },
];

export default function PartiesPage() {
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <main>
      <section className="innerHero partyHero">
        <p className="eyebrow">BIRTHDAYS & PARTIES</p>
        <h1>{en ? "One bake plan for the whole occasion." : "முழு நிகழ்ச்சிக்கும் ஒரே பேக் திட்டம்."}</h1>
        <p>{en ? "Build a birthday, anniversary, engagement, farewell or milestone order around a brownie cake, individually packed favours, Brownie Tins or Tubs. Every proposal starts with the date and guest count." : "பிறந்தநாள், திருமண நாள், நிச்சயதார்த்தம், பிரியாவிடை அல்லது முக்கிய நிகழ்ச்சிக்காக பிரௌனி கேக், தனித்தனி பரிசுகள், பிரௌனி டின்கள் அல்லது டப்கள் மூலம் ஆர்டர் திட்டமிடலாம்."}</p>
        <div className="innerHeroActions"><a className="button buttonLight" href="/preorder">{en ? "Start a party enquiry" : "பார்ட்டி விசாரணையைத் தொடங்க"}</a><a className="button buttonOutlineLight" href="/menu?category=parties">{en ? "View prices & quantities" : "விலை & அளவுகள்"}</a></div>
      </section>

      <section className="offerSection">
        <div className="offerIntro"><p className="eyebrow dark">RECOMMENDED EVENT MENU</p><h2>{en ? "Celebrate without an overcomplicated menu." : "தேவையற்ற சிக்கல் இல்லாத கொண்டாட்ட மெனு."}</h2><p>{en ? "Choose one centrepiece and one guest format. Prices are planning recommendations pending recipe, packaging and supplier-cost validation; delivery and paid customisation are separate." : "ஒரு மைய கேக் மற்றும் ஒரு விருந்தினர் வடிவத்தைத் தேர்ந்தெடுக்கவும். ரெசிபி, பேக்கிங் மற்றும் சப்ளையர் செலவு சோதனை வரை இவை திட்ட விலைகள்; டெலிவரி மற்றும் கூடுதல் தனிப்பயன் தனியாகும்."}</p></div>
        <div className="offerGrid">{partyFormats.map((item) => <article key={item.title}><small>{en ? item.label : item.labelTa}</small><h3>{en ? item.title : item.titleTa}</h3><strong>{item.price}</strong><p>{en ? item.detail : item.detailTa}</p></article>)}</div>
      </section>

      <section className="partyCakeSection">
        <div><p className="eyebrow dark">CAKES FOR MORE THAN BIRTHDAYS</p><h2>{en ? "The message changes. The brownie stays central." : "செய்தி மாறும். பிரௌனி மையமாக இருக்கும்."}</h2><p>{en ? "Birthday cakes remain available in 250 g, 500 g and 1 kg formats. The Occasion Brownie Cake adds a restrained finish for anniversaries, engagements, welcomes, farewells and milestone celebrations." : "பிறந்தநாள் கேக்குகள் 250 கிராம், 500 கிராம் மற்றும் 1 கிலோ அளவுகளில் கிடைக்கும். நிகழ்ச்சி பிரௌனி கேக் திருமண நாள், நிச்சயதார்த்தம், வரவேற்பு, பிரியாவிடை மற்றும் முக்கிய கொண்டாட்டங்களுக்கு அளவான அலங்காரத்தை வழங்கும்."}</p></div>
        <div className="cakePriceList">
          <div><span>{en ? "Little Celebration · 250 g" : "லிட்டில் செலிப்ரேஷன் · 250 கிராம்"}</span><strong>₹808 / ₹927</strong></div>
          <div><span>{en ? "Birthday Brownie Cake · 500 g" : "பிறந்தநாள் பிரௌனி கேக் · 500 கிராம்"}</span><strong>₹1,488 / ₹1,692</strong></div>
          <div><span>{en ? "Grand Celebration · 1 kg" : "கிராண்ட் செலிப்ரேஷன் · 1 கிலோ"}</span><strong>₹2,678 / ₹3,052</strong></div>
          <div><span>{en ? "Occasion Brownie Cake · 500 g" : "நிகழ்ச்சி பிரௌனி கேக் · 500 கிராம்"}</span><strong>₹1,590 / ₹1,790</strong></div>
          <div><span>{en ? "Occasion Brownie Cake · 1 kg" : "நிகழ்ச்சி பிரௌனி கேக் · 1 கிலோ"}</span><strong>₹2,850 / ₹3,250</strong></div>
        </div>
      </section>

      <section className="eventRules">
        <div className="eventRulesIntro"><p className="eyebrow">PREORDER CONDITIONS</p><h2>{en ? "Five days is the working minimum." : "ஐந்து நாட்கள் குறைந்தபட்ச தயாரிப்பு நேரம்."}</h2><p>{en ? "Earlier enquiries receive the best choice of date, flavour and finish. A slot exists only after San Bakes confirms availability and the deposit." : "முன்பே விசாரிப்பதால் தேதி, சுவை மற்றும் அலங்காரத்தில் சிறந்த தேர்வு கிடைக்கும். San Bakes கிடைக்கும் நிலை மற்றும் முன்பணத்தை உறுதி செய்த பிறகே ஸ்லாட் ஒதுக்கப்படும்."}</p></div>
        <div className="eventLeadGrid">
          <article><span>05</span><h3>{en ? "Five calendar days" : "ஐந்து நாட்கள்"}</h3><p>{en ? "Standard cake, 25–49 packed brownies, or 10–19 Tins/Tubs." : "சாதாரண கேக், 25–49 தனித்தனி பிரௌனிகள் அல்லது 10–19 டின்கள்/டப்கள்."}</p></article>
          <article><span>07</span><h3>{en ? "Seven calendar days" : "ஏழு நாட்கள்"}</h3><p>{en ? "50+ packed brownies, 20+ Tins/Tubs or two coordinated party formats." : "50+ தனித்தனி பிரௌனிகள், 20+ டின்கள்/டப்கள் அல்லது இரண்டு ஒருங்கிணைந்த வடிவங்கள்."}</p></article>
          <article><span>10–14</span><h3>{en ? "Ten to fourteen days" : "பத்து முதல் பதினான்கு நாட்கள்"}</h3><p>{en ? "100+ units, custom sleeves, complex toppers or event-specific artwork." : "100+ யூனிட்கள், தனிப்பயன் ஸ்லீவ், சிக்கலான டாப்பர் அல்லது நிகழ்ச்சி வடிவமைப்பு."}</p></article>
        </div>
        <div className="eventTerms"><h3>{en ? "Recommended booking rules" : "பரிந்துரைக்கப்பட்ட முன்பதிவு விதிகள்"}</h3><ul><li>{en ? "A 50% deposit reserves the date; the balance is due three business days before handover." : "50% முன்பணம் தேதியை உறுதி செய்யும்; மீதித் தொகை ஹேண்ட்ஓவருக்கு மூன்று வேலை நாட்களுக்கு முன் செலுத்த வேண்டும்."}</li><li>{en ? "Final quantity, Egg/Eggless choice, flavours, message and finish close five calendar days before the event." : "இறுதி அளவு, Egg/Eggless தேர்வு, சுவைகள், செய்தி மற்றும் அலங்காரம் நிகழ்ச்சிக்கு ஐந்து நாட்களுக்கு முன் முடிக்கப்பட வேண்டும்."}</li><li>{en ? "Up to two flavours for 25–49 packed brownies; up to four flavours for 50+ pieces. Tins and Tubs use one or two coordinated finishes per batch." : "25–49 தனித்தனி பிரௌனிகளுக்கு இரண்டு சுவைகள் வரை; 50+ துண்டுகளுக்கு நான்கு வரை. டின்கள் மற்றும் டப்களுக்கு ஒரு அல்லது இரண்டு ஒருங்கிணைந்த அலங்காரங்கள்."}</li><li>{en ? "Delivery is quoted separately within the validated 20 km road radius; appointment pickup is available." : "சோதிக்கப்பட்ட 20 கி.மீ. சாலை சுற்றளவில் டெலிவரி தனியாக விலை; நேரம் உறுதி செய்த பிக்கப் கிடைக்கும்."}</li><li>{en ? "Within 72 hours of handover, committed ingredient, printing and production costs are non-refundable. One reschedule may be offered where capacity permits." : "ஹேண்ட்ஓவருக்கு 72 மணி நேரத்திற்குள் உறுதி செய்யப்பட்ட பொருள், அச்சு மற்றும் தயாரிப்பு செலவுகள் திருப்ப முடியாது. திறன் இருந்தால் ஒரு முறை தேதி மாற்றம் வழங்கப்படலாம்."}</li></ul></div>
      </section>

      <section className="eventCta"><p className="eyebrow">READY TO PLAN?</p><h2>{en ? "Send the date, guest count and preferred format." : "தேதி, விருந்தினர் எண்ணிக்கை மற்றும் விருப்பமான வடிவத்தை அனுப்புங்கள்."}</h2><p>{en ? "We will reply with capacity, the most suitable quantities, delivery or pickup options, and a written planning total before any payment." : "எந்த கட்டணத்திற்கும் முன் திறன், பொருத்தமான அளவுகள், டெலிவரி அல்லது பிக்கப் மற்றும் எழுத்துப்பூர்வ திட்ட மொத்தம் வழங்கப்படும்."}</p><div><a className="button buttonLight" href="/preorder">{en ? "Build an enquiry" : "விசாரணையை உருவாக்க"}</a><a className="button buttonOutlineLight" href="https://wa.me/919940058623?text=Hello%20San%20Bakes%2C%20I%27d%20like%20to%20plan%20a%20birthday%20or%20party%20order.%0AEvent%20date%3A%0AGuest%20count%3A%0ACake%20size%3A%0APacked%20brownies%20%2F%20Tins%20%2F%20Tubs%3A%0AEgg%20or%20Eggless%3A%0APickup%20or%20delivery%3A" target="_blank" rel="noreferrer">{en ? "Plan on WhatsApp" : "WhatsApp-ல் திட்டமிட"}</a></div></section>
    </main>
  );
}
