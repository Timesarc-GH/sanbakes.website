"use client";

import { useLanguage } from "../components/LanguageProvider";
import { ProductCollection } from "../components/ProductCollection";

export default function PartiesPage() {
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <main>
      <section className="innerHero partyHero">
        <p className="eyebrow">BIRTHDAYS & PARTIES</p>
        <h1>{en ? "One bake plan for the whole occasion." : "முழு நிகழ்ச்சிக்கும் ஒரே பேக் திட்டம்."}</h1>
        <p>{en ? "Build a birthday, anniversary, engagement, farewell or milestone order around a brownie cake, individually packed favours, Brownie Tins or Tubs. Every proposal starts with the date and guest count." : "பிறந்தநாள், திருமண நாள், நிச்சயதார்த்தம், பிரியாவிடை அல்லது முக்கிய நிகழ்ச்சிக்காக பிரௌனி கேக், தனித்தனி பரிசுகள், பிரௌனி டின்கள் அல்லது டப்கள் மூலம் ஆர்டர் திட்டமிடலாம்."}</p>
        <div className="innerHeroActions"><a className="button buttonLight" href="#party-collection">{en ? "Shop party formats" : "பார்ட்டி வகைகளை வாங்க"}</a><a className="button buttonOutlineLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>
      </section>

      <div id="party-collection">
        <ProductCollection
          productIds={["birthday-250", "birthday-500", "birthday-1kg", "mini-brownie-tower", "occasion-brownie-cake", "party-single-brownies", "party-brownie-tins", "party-brownie-tubs"]}
          eyebrowEn="RECOMMENDED EVENT MENU"
          eyebrowTa="பரிந்துரைக்கப்பட்ட நிகழ்ச்சி மெனு"
          titleEn="Choose a centrepiece and a guest format."
          titleTa="ஒரு மைய கேக் மற்றும் விருந்தினர் வகையைத் தேர்ந்தெடுக்கவும்."
          introEn="Every product has its own image, selectable quantity or finish, planning price and cart control. Delivery and paid customisation are confirmed separately on WhatsApp."
          introTa="ஒவ்வொரு பொருளுக்கும் தனிப்பட்ட படம், அளவு அல்லது அலங்காரத் தேர்வு, திட்டமிட்ட விலை மற்றும் கார்ட் வசதி உள்ளது. டெலிவரி மற்றும் கூடுதல் தனிப்பயன் WhatsApp-ல் தனியாக உறுதி செய்யப்படும்."
        />
      </div>

      <section className="partyCakeSection">
        <div><p className="eyebrow dark">CAKES FOR MORE THAN BIRTHDAYS</p><h2>{en ? "The message changes. The brownie stays central." : "செய்தி மாறும். பிரௌனி மையமாக இருக்கும்."}</h2><p>{en ? "Birthday cakes remain available in 250 g, 500 g and 1 kg formats. The Occasion Brownie Cake adds a restrained finish for anniversaries, engagements, welcomes, farewells and milestone celebrations." : "பிறந்தநாள் கேக்குகள் 250 கிராம், 500 கிராம் மற்றும் 1 கிலோ அளவுகளில் கிடைக்கும். நிகழ்ச்சி பிரௌனி கேக் திருமண நாள், நிச்சயதார்த்தம், வரவேற்பு, பிரியாவிடை மற்றும் முக்கிய கொண்டாட்டங்களுக்கு அளவான அலங்காரத்தை வழங்கும்."}</p></div>
        <div className="cakePriceList">
          <div><span>{en ? "Little Celebration · 250 g" : "லிட்டில் செலிப்ரேஷன் · 250 கிராம்"}</span><strong>₹670 / ₹760</strong></div>
          <div><span>{en ? "Birthday Brownie Cake · 500 g" : "பிறந்தநாள் பிரௌனி கேக் · 500 கிராம்"}</span><strong>₹1,230 / ₹1,390</strong></div>
          <div><span>{en ? "Grand Celebration · 1 kg" : "கிராண்ட் செலிப்ரேஷன் · 1 கிலோ"}</span><strong>₹2,210 / ₹2,510</strong></div>
          <div><span>{en ? "Occasion Brownie Cake · 500 g" : "நிகழ்ச்சி பிரௌனி கேக் · 500 கிராம்"}</span><strong>₹1,110 / ₹1,250</strong></div>
          <div><span>{en ? "Occasion Brownie Cake · 1 kg" : "நிகழ்ச்சி பிரௌனி கேக் · 1 கிலோ"}</span><strong>₹2,000 / ₹2,280</strong></div>
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

      <section className="eventCta"><p className="eyebrow">READY TO PLAN?</p><h2>{en ? "Review the cart, then send one complete WhatsApp order." : "கார்ட்டை சரிபார்த்து, முழுமையான WhatsApp ஆர்டரை அனுப்புங்கள்."}</h2><p>{en ? "The checkout carries your products, quantities, date, fulfilment preference and planning subtotal into WhatsApp for final confirmation." : "செக்அவுட் உங்கள் பொருட்கள், அளவுகள், தேதி, பெறும் முறை மற்றும் திட்டமிட்ட மொத்தத்தை WhatsApp உறுதிப்படுத்தலுக்கு எடுத்துச் செல்லும்."}</p><div><a className="button buttonLight" href="/preorder">{en ? "Review cart & order" : "கார்ட் & ஆர்டரைப் பார்க்க"}</a></div></section>
    </main>
  );
}
