"use client";

import Image from "next/image";
import { useLanguage } from "./components/LanguageProvider";
import { formatPrice, formatPriceRangeForProducts, formatStartingPriceForProducts, getProductPriceRange } from "./lib/pricing";

const featured = [
  {
    title: "The Brownie Atelier",
    titleTa: "பிரௌனி கலைத் தொகுப்பு",
    copy: "Signature brownies, true Tins, spoonable Tubs and millet tea cakes, gathered in one small-batch collection.",
    copyTa: "சிக்னேச்சர் பிரௌனிகள், டின்கள், டப்கள் மற்றும் சிறுதானிய டீ கேக்குகள் கொண்ட சிறுதொகுப்பு.",
    image: "/images/editorial/home-opening-brownie-atelier-v1.webp",
    alt: "Brownie Tin, Brownie Tub and sliced ragi millet tea cake",
    altTa: "பிரௌனி டின், பிரௌனி டப் மற்றும் துண்டாக்கப்பட்ட ராகி சிறுதானிய டீ கேக்",
    label: "Brownies · Tins · Tubs · Tea cakes",
    labelTa: "பிரௌனிகள் · டின்கள் · டப்கள் · டீ கேக்குகள்",
    productIds: ["ragi-no-01", "brownie-tin-3-piece", "whole-brownie-tin", "classic-brownie-tub", "ragi-cacao-tea-cake"],
    href: "/menu",
    cta: "Explore brownies →",
    ctaTa: "பிரௌனி தொகுப்பைப் பார்க்க →",
  },
  {
    title: "The Cupcake Edit",
    titleTa: "கப் கேக் தேர்வு",
    copy: "Boxes of six, nine or twelve; every cupcake sits in its own fitted holder for gifting or sharing.",
    copyTa: "ஆறு, ஒன்பது அல்லது பன்னிரண்டு கப் கேக்குகள்; ஒவ்வொன்றும் தனிப்பட்ட ஹோல்டரில் அழகாக அமர்த்தப்படும்.",
    image: "/images/editorial/home-opening-cupcake-edit-v1.webp",
    alt: "Six assorted San Bakes cupcakes in individual fitted holders",
    altTa: "தனித்தனி ஹோல்டர்களில் ஆறு வகை San Bakes கப் கேக்குகள்",
    label: "Boxes of 6 · 9 · 12",
    labelTa: "6 · 9 · 12 பெட்டிகள்",
    productIds: ["cupcake-ragi", "cupcake-pista", "cupcake-discovery"],
    href: "/cupcakes",
    cta: "Explore cupcakes →",
    ctaTa: "கப் கேக்குகளைப் பார்க்க →",
  },
  {
    title: "The Celebration Table",
    titleTa: "கொண்டாட்ட மேசை",
    copy: "Brownie cakes, individually packed pieces, Tins and Tubs planned around your guest count and date.",
    copyTa: "உங்கள் விருந்தினர் எண்ணிக்கை மற்றும் தேதிக்கேற்ப பிரௌனி கேக்குகள், தனிப்பட்ட பேக்குகள், டின்கள் மற்றும் டப்கள்.",
    image: "/images/editorial/home-opening-celebration-table-v1.webp",
    alt: "Brownie birthday cake, party Brownie Tin and individually packed brownies",
    altTa: "பிரௌனி பிறந்தநாள் கேக், பார்ட்டி பிரௌனி டின் மற்றும் தனித்தனி பேக்கிங் பிரௌனிகள்",
    label: "Birthdays · Parties · Occasions",
    labelTa: "பிறந்தநாள் · பார்ட்டி · நிகழ்ச்சிகள்",
    productIds: ["birthday-250", "mini-brownie-tower", "party-single-brownies", "party-brownie-tins", "party-brownie-tubs"],
    href: "/parties",
    cta: "Plan a celebration →",
    ctaTa: "கொண்டாட்டத்தைத் திட்டமிட →",
  },
  {
    title: "The Gifting Room",
    titleTa: "பரிசுத் தொகுப்பு",
    copy: "Discovery boxes, reserve assortments, Tins and seasonal hampers composed for a thoughtful handover.",
    copyTa: "டிஸ்கவரி பெட்டிகள், ரிசர்வ் தொகுப்புகள், டின்கள் மற்றும் பருவகால ஹாம்பர்கள் கவனமாகத் தொகுக்கப்படும்.",
    image: "/images/editorial/home-opening-gifting-room-v1.webp",
    alt: "Personal gift box with assorted brownies, a Brownie Tin and ribbon",
    altTa: "வகை பிரௌனிகள், பிரௌனி டின் மற்றும் ரிப்பன் கொண்ட தனிப்பட்ட பரிசுப் பெட்டி",
    label: "Personal gifts",
    labelTa: "தனிப்பட்ட பரிசுகள்",
    productIds: ["signature-discovery-box", "reserve-collection", "seasonal-hamper"],
    href: "/gifting",
    cta: "Explore personal gifting →",
    ctaTa: "பரிசுத் தொகுப்பைப் பார்க்க →",
  },
  {
    title: "Business, Beautifully Boxed",
    titleTa: "அழகாகப் பெட்டியிடப்பட்ட வணிகப் பரிசுகள்",
    copy: "Scalable brownie formats, mini boxes and bespoke presentation for clients, teams and branded events.",
    copyTa: "வாடிக்கையாளர்கள், குழுக்கள் மற்றும் நிறுவன நிகழ்வுகளுக்கான பிரௌனி வடிவங்கள், மினி பெட்டிகள் மற்றும் தனிப்பயன் பேக்கிங்.",
    image: "/images/editorial/home-opening-corporate-boxed-v1.webp",
    alt: "Corporate brownie presentation box with mini boxes and a Brownie Tin",
    altTa: "மினி பெட்டிகள் மற்றும் பிரௌனி டின் கொண்ட நிறுவனப் பரிசுத் தொகுப்பு",
    label: "Clients · Teams · Events",
    labelTa: "வாடிக்கையாளர்கள் · குழுக்கள் · நிகழ்வுகள்",
    productIds: ["corporate-mini-box", "bespoke-corporate"],
    href: "/corporate",
    cta: "Plan a corporate order →",
    ctaTa: "நிறுவன ஆர்டரைத் திட்டமிட →",
  },
];

export default function Home() {
  const { language } = useLanguage();
  const en = language === "en";
  const corporateUnitPrice = getProductPriceRange("corporate-mini-box")?.minimum ?? null;

  return (
    <main>
      <div className="homeOpening">
      <section className="hero">
        <div className="heroImage">
          <Image
            src="/images/ragi-brownie-hero.png"
            alt="San Bakes dark cacao brownie with a crackly top"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="heroShade" />
        <div className="heroContent">
          <p className="eyebrow">SAN BAKES · CHENNAI</p>
          <h1>{en ? <>Dark cacao.<br />Ancient grains.</> : <>டார்க் காகாவ்.<br />பழமையான தானியங்கள்.</>}</h1>
          <p className="heroCopy">
            {en
              ? "Small-batch brownies and celebration bakes, made after you order with a considered ingredient list and an unhurried process."
              : "நீங்கள் ஆர்டர் செய்த பிறகு மட்டுமே, கவனமாகத் தேர்ந்தெடுத்த பொருட்களுடன் தயாரிக்கப்படும் பிரௌனிகள் மற்றும் கொண்டாட்ட பேக்குகள்."}
          </p>
          <p className="heroTamil">{en ? "Made in small batches, with care, after your preorder." : "குறைந்த அளவில், முன்பதிவுக்குப் பிறகு அன்புடன் தயாரிக்கப்படுகிறது."}</p>
          <div className="heroActions">
            <a className="button buttonLight" href="/preorder">{en ? "Start a preorder" : "முன்பதிவைத் தொடங்க"}</a>
            <a className="button buttonOutlineLight" href="/menu">{en ? "Brownie" : "பிரௌனி"}</a>
            <a className="textLink" href="/about">{en ? "Our ingredient standard →" : "எங்கள் பொருள் தரநிலை →"}</a>
          </div>
        </div>
      </section>

      <section className="trustStrip" aria-label="Service highlights">
        <div><span>01</span><strong>{en ? "Small batch" : "குறைந்த அளவு"}</strong><p>{en ? "We accept a limited number of orders for each date so every confirmed batch receives focused attention." : "ஒவ்வொரு உறுதி செய்யப்பட்ட தொகுதியும் கவனமாக தயாரிக்க, ஒவ்வொரு தேதிக்கும் குறைந்த எண்ணிக்கையிலான ஆர்டர்களை ஏற்கிறோம்."}</p></div>
        <div><span>02</span><strong>{en ? "Made after you order" : "ஆர்டருக்குப் பிறகு தயாரிப்பு"}</strong><p>{en ? "Every confirmed batch is scheduled for its reserved date rather than held as ready stock." : "ரெடி ஸ்டாக்காக வைக்காமல், உறுதி செய்யப்பட்ட தேதிக்காக ஒவ்வொரு தொகுதியும் தயாரிக்கப்படுகிறது."}</p></div>
        <div><span>03</span><strong>{en ? "Delivery within Chennai" : "சென்னை முழுவதும் டெலிவரி"}</strong><p>{en ? "Appointment pickup or Chennai delivery; addresses beyond 20 km include additional distance-based charges." : "முன்பதிவு பிக்கப் அல்லது சென்னை டெலிவரி; 20 கி.மீ.க்கு அப்பால் கூடுதல் தூரக் கட்டணம் சேர்க்கப்படும்."}</p></div>
      </section>

      <section className="collectionSection">
        <div className="sectionHeading">
          <div><p className="eyebrow dark">THE OPENING COLLECTION</p><h2>{en ? "Familiar pleasure, considered differently." : "பழக்கமான சுவை, புதிய கவனத்துடன்."}</h2></div>
          <p>{en ? "A focused menu spanning signature brownies, true Brownie Tins, Brownie Tubs, millet tea cakes, Cupcakes, birthday and party formats, personal gifting and corporate orders." : "சிக்னேச்சர் பிரௌனிகள், பிரௌனி டின்கள், பிரௌனி டப்கள், சிறுதானிய டீ கேக்குகள், கப் கேக்குகள், பிறந்தநாள் மற்றும் பார்ட்டி வடிவங்கள், பரிசுகள் மற்றும் நிறுவன ஆர்டர்கள்."}</p>
        </div>
        <div className="productGrid openingGrid">
          {featured.map((item) => (
            <article className="productCard" key={item.href}>
              <a className="productImage" href={item.href} aria-label={`${en ? item.title : item.titleTa}: ${en ? item.cta : item.ctaTa}`}>
                <Image src={item.image} alt={en ? item.alt : item.altTa} fill sizes="(max-width: 620px) 90vw, (max-width: 900px) 45vw, (max-width: 1100px) 30vw, 20vw" />
              </a>
              <div className="productBody">
                <p className="cardEyebrow">{en ? item.label : item.labelTa}</p>
                <h3>{en ? item.title : item.titleTa}</h3>
                <p>{en ? item.copy : item.copyTa}</p>
                <div><span>{en ? `From ${formatStartingPriceForProducts(item.productIds)}` : `${formatStartingPriceForProducts(item.productIds)} முதல்`}</span><a href={item.href}>{en ? item.cta : item.ctaTa}</a></div>
              </div>
            </article>
          ))}
        </div>
      </section>
      </div>

      <section className="storySection">
        <div className="storyCopy">
          <p className="eyebrow dark">OUR STANDARD</p>
          <h2>{en ? "Trust begins with precise words." : "தெளிவான தகவலில்தான் நம்பிக்கை தொடங்குகிறது."}</h2>
          <p>{en ? "We share the ingredients and allergens relevant to each bake and avoid blanket wellness promises. Please rely on the product-specific ingredient and allergen information confirmed with your order." : "ஒவ்வொரு பேக்கிற்கும் பொருந்தும் பொருட்கள் மற்றும் அலர்ஜன் தகவலைத் தெளிவாக பகிர்கிறோம். உங்கள் ஆர்டருடன் உறுதி செய்யப்படும் தயாரிப்பு சார்ந்த தகவலைப் பார்க்கவும்."}</p>
          <ul className="standardList">
            <li><strong>{en ? "Ingredient-led" : "பொருட்களை மையமாக"}</strong><span>{en ? "Dark chocolate, ragi, walnut, pistachio and warm spice selected for flavour and function." : "டார்க் சாக்லேட், ராகி, வால்நட், பிஸ்தா மற்றும் மசாலா."}</span></li>
            <li><strong>{en ? "Made after reservation" : "முன்பதிவுக்குப் பிறகு"}</strong><span>{en ? "No always-on shelf; production is scheduled around confirmed dates." : "உறுதி செய்யப்பட்ட தேதிகளுக்கு ஏற்ப தயாரிப்பு திட்டமிடப்படும்."}</span></li>
            <li><strong>{en ? "Clear confirmation" : "தெளிவான உறுதிப்படுத்தல்"}</strong><span>{en ? "Every preorder is confirmed for date, flavour, fulfilment and final payable total before payment." : "கட்டணத்திற்கு முன் ஒவ்வொரு முன்பதிவின் தேதி, சுவை, பெறும் முறை மற்றும் இறுதி தொகை உறுதி செய்யப்படும்."}</span></li>
          </ul>
          <a className="button buttonCacao" href="/about">{en ? "Read our approach" : "எங்கள் அணுகுமுறை"}</a>
        </div>
        <div className="storyMedia">
          <video controls preload="metadata" poster="/images/editorial/home-our-standard-video-poster-v1.webp" aria-label={en ? "Why the San Bakes ingredient list matters" : "San Bakes பொருள் பட்டியல் ஏன் முக்கியம்"}>
            <source src="/video/why-san-bakes.mp4" type="video/mp4" />
            <track kind="captions" src="/video/why-san-bakes.en.vtt" srcLang="en" label="English" default />
          </video>
          <div><strong>{en ? "Why the ingredient list matters" : "பொருள் பட்டியல் ஏன் முக்கியம்"}</strong><span>{en ? "A kitchen note from San Bakes" : "San Bakes சமையலறை குறிப்பு"}</span></div>
        </div>
      </section>

      <section className="occasionSection">
        <div className="occasionImage"><Image src="/images/editorial/home-birthday-brownie-celebration-v2.webp" alt="San Bakes brownie birthday cake" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className="occasionCopy"><p className="eyebrow dark">BIRTHDAYS & PARTIES</p><h2>{en ? "A celebration, with the soul of a brownie." : "பிரௌனியின் சுவையுடன் ஒரு கொண்டாட்டம்."}</h2><p>{en ? "Choose a birthday cake, occasion cake, brownie tower, individually packed brownie, Tin or Tub plan. Every event order is designed around your guest count and date." : "பிறந்தநாள் கேக், நிகழ்ச்சி கேக், பிரௌனி டவர், தனித்தனி பிரௌனி, டின் அல்லது டப் திட்டத்தை விருந்தினர் எண்ணிக்கை மற்றும் தேதிக்கு ஏற்ப தேர்ந்தெடுக்கலாம்."}</p><a className="button buttonCacao" href="/parties">{en ? "Plan a birthday or party" : "பிறந்தநாள் அல்லது பார்ட்டியைத் திட்டமிட"}</a></div>
      </section>

      <section className="menuSection homePriceGuide">
        <div className="priceGuide">
          <div className="priceGuideHead"><p className="eyebrow dark">{en ? "LAUNCH PRICING GUIDE" : "அறிமுக விலை வழிகாட்டி"}</p><h2>{en ? "A clear starting point." : "தெளிவான தொடக்க விலை."}</h2><p>{en ? "These are current starting prices. Your WhatsApp confirmation will state the selected size, customisation, delivery charge and final total before payment. Please allow at least 48 hours for standard brownies and personal gifts, five days for celebrations, and seven days for corporate orders." : "இவை தற்போதைய தொடக்க விலைகள். கட்டணத்திற்கு முன் தேர்ந்தெடுத்த அளவு, தனிப்பயன், டெலிவரி கட்டணம் மற்றும் இறுதி மொத்தம் WhatsApp மூலம் உறுதி செய்யப்படும். சாதாரண பிரௌனிகள் மற்றும் தனிப்பட்ட பரிசுகளுக்கு குறைந்தது 48 மணி நேரம், கொண்டாட்ட ஆர்டர்களுக்கு ஐந்து நாட்கள், நிறுவன ஆர்டர்களுக்கு ஏழு நாட்கள் வழங்கவும்."}</p></div>
          <div className="priceGuideGrid">
            <div><strong>{en ? "Brownie Tubs" : "பிரௌனி டப்கள்"}</strong><span>{formatPriceRangeForProducts(["classic-brownie-tub", "loaded-brownie-tub"])}</span><small>{en ? "Single Tub or duo" : "ஒரு டப் அல்லது டூயோ"}</small></div>
            <div><strong>{en ? "Brownie Tins" : "பிரௌனி டின்கள்"}</strong><span>{formatPriceRangeForProducts(["brownie-tin-3-piece", "whole-brownie-tin"])}</span><small>{en ? "Three separate pieces, or one whole brownie with 1/2/3 topping sections" : "மூன்று தனித் துண்டுகள் அல்லது 1/2/3 டாப்பிங் பகுதிகளுடன் ஒரு முழு பிரௌனி"}</small></div>
            <div><strong>{en ? "Personal gifting" : "தனிப்பட்ட பரிசுகள்"}</strong><span>{formatPriceRangeForProducts(["signature-discovery-box", "reserve-collection", "brownie-tin-3-piece", "whole-brownie-tin", "seasonal-hamper"])}</span><small>{en ? "Curated boxes, Tins and seasonal hampers" : "தேர்ந்தெடுத்த பெட்டிகள், டின்கள் மற்றும் பருவகால ஹாம்பர்கள்"}</small></div>
            <div><strong>{en ? "Millet tea cakes" : "சிறுதானிய டீ கேக்குகள்"}</strong><span>{formatPriceRangeForProducts(["ragi-cacao-tea-cake", "pista-cardamom-tea-cake"])}</span><small>{en ? "Single loaf or gift duo" : "ஒரு லோஃப் அல்லது பரிசு டூயோ"}</small></div>
            <div><strong>{en ? "Birthdays & parties" : "பிறந்தநாள் & பார்ட்டி"}</strong><span>{en ? `Cakes ${formatPriceRangeForProducts(["birthday-250", "birthday-500", "birthday-1kg", "occasion-brownie-cake"])}` : `கேக்குகள் ${formatPriceRangeForProducts(["birthday-250", "birthday-500", "birthday-1kg", "occasion-brownie-cake"])}`}</span><small>{en ? "Packed brownies from 25 · Tins/Tubs from 10" : "தனித்தனி பிரௌனிகள் 25 முதல் · டின்கள்/டப்கள் 10 முதல்"}</small></div>
            <div><strong>{en ? "Corporate" : "நிறுவன ஆர்டர்கள்"}</strong><span>{en ? `Corporate Mini Box · ${formatPrice(corporateUnitPrice)} per box` : `Corporate Mini Box · ஒரு பெட்டி ${formatPrice(corporateUnitPrice)}`}</span><small>{en ? "Individually packed brownies start at 25 pieces; Mini Boxes use their listed box minimum" : "தனித்தனி பேக்கிங் பிரௌனிகள் 25 துண்டுகள் முதல்; Mini Box-க்கு பட்டியலிட்ட குறைந்தபட்ச அளவு பொருந்தும்"}</small></div>
            <div><strong>{en ? "Cupcake boxes" : "கப் கேக் பெட்டிகள்"}</strong><span>{formatPriceRangeForProducts(["cupcake-ragi", "cupcake-pista", "cupcake-discovery"])}</span><small>{en ? "Boxes of 6, 9 or 12 · available to preorder" : "6, 9 அல்லது 12 பெட்டிகள் · முன்பதிவுக்கு கிடைக்கும்"}</small></div>
            <div><strong>{en ? "Brownie boxes" : "பிரௌனி பெட்டிகள்"}</strong><span>{formatPriceRangeForProducts(["dark-cacao-sea-salt", "ragi-no-01"])}</span><small>{en ? "Core 6 or 9-piece boxes" : "முக்கிய 6 அல்லது 9 துண்டு பெட்டிகள்"}</small></div>
          </div>
        </div>
      </section>

      <section className="preorder">
        <p className="eyebrow">PREORDER, PREPARE, DELIVER</p>
        <h2>{en ? "Reserve the bake. We’ll confirm the details personally." : "உங்கள் பேக்கை முன்பதிவு செய்யுங்கள். விவரங்களை நாங்கள் உறுதி செய்கிறோம்."}</h2>
        <p>{en ? "Build an enquiry here, then send one structured WhatsApp message. We confirm availability, your date, pickup or delivery, final price and payment instructions personally." : "விசாரணையை உருவாக்கி ஒரே WhatsApp செய்தியாக அனுப்புங்கள். கிடைக்கும் நிலை, தேதி, பிக்கப் அல்லது டெலிவரி, இறுதி விலை மற்றும் கட்டண விவரங்களை நாங்கள் உறுதி செய்கிறோம்."}</p>
        <a className="button buttonCacao" href="/preorder">{en ? "Start an enquiry" : "விசாரணையைத் தொடங்க"}</a>
      </section>
    </main>
  );
}
