"use client";

import Image from "next/image";
import { useLanguage } from "./components/LanguageProvider";

const featured = [
  {
    title: "Ragi No. 01",
    titleTa: "ராகி நம்பர் 01",
    copy: "Dark cacao and ragi, developed for a dense crumb and a gently roasted grain note.",
    copyTa: "டார்க் காகாவும் ராகியும் இணையும் அடர்த்தியான பிரௌனி.",
    image: "/images/editorial/home-ragi-collection-v1.webp",
    label: "Signature brownie",
  },
  {
    title: "Brownie Tins",
    titleTa: "பிரௌனி டின்கள்",
    copy: "A generous, giftable brownie presentation finished only after you reserve a date.",
    copyTa: "முன்பதிவு செய்யப்பட்ட நாளுக்காக தயாரிக்கப்படும் பரிசளிக்க ஏற்ற பிரௌனி டின்.",
    image: "/images/editorial/home-brownie-tins-collection-v2.webp",
    label: "Celebration format",
  },
  {
    title: "Brownie Tubs",
    titleTa: "பிரௌனி டப்கள்",
    copy: "Spoonable brownie pieces with a chocolate-led finish. Final recipe validation is underway.",
    copyTa: "சாக்லேட் அலங்காரத்துடன் பிரௌனி துண்டுகள். இறுதி ரெசிபி சோதனை நடைபெறுகிறது.",
    image: "/images/editorial/home-brownie-tubs-collection-v2.webp",
    label: "Coming soon",
  },
];

export default function Home() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <main>
      <section className="hero">
        <div className="heroImage">
          <Image src="/images/ragi-brownie-hero.png" alt="Dark cacao ragi brownie by San Bakes" fill priority sizes="100vw" />
        </div>
        <div className="heroShade" />
        <div className="heroContent">
          <p className="eyebrow">SAN BAKES · KĪḺKKAṬṬAḶAI, CHENNAI</p>
          <h1>{en ? <>Dark cacao.<br />Ancient grains.</> : <>டார்க் காகாவ்.<br />பழமையான தானியங்கள்.</>}</h1>
          <p className="heroCopy">
            {en
              ? "Small-batch brownies and celebration bakes, made after you order with a considered ingredient list and an unhurried process."
              : "நீங்கள் ஆர்டர் செய்த பிறகு மட்டுமே, கவனமாகத் தேர்ந்தெடுத்த பொருட்களுடன் தயாரிக்கப்படும் பிரௌனிகள் மற்றும் கொண்டாட்ட பேக்குகள்."}
          </p>
          <p className="heroTamil">{en ? "Made in small batches, with care, after your preorder." : "குறைந்த அளவில், முன்பதிவுக்குப் பிறகு அன்புடன் தயாரிக்கப்படுகிறது."}</p>
          <div className="heroActions">
            <a className="button buttonLight" href="/preorder">{en ? "Start a preorder" : "முன்பதிவைத் தொடங்க"}</a>
            <a className="button buttonOutlineLight" href="/menu">{en ? "Menu & pricing" : "மெனு & விலை"}</a>
            <a className="textLink" href="/about">{en ? "Our ingredient standard →" : "எங்கள் பொருள் தரநிலை →"}</a>
          </div>
        </div>
      </section>

      <section className="trustStrip" aria-label="Service highlights">
        <div><span>01</span><strong>{en ? "Small batch" : "குறைந்த அளவு"}</strong><p>{en ? "Home-kitchen capacity is protected so each confirmed batch gets focused attention." : "ஒவ்வொரு உறுதி செய்யப்பட்ட தொகுதியும் கவனமாக தயாரிக்கப்படுகிறது."}</p></div>
        <div><span>02</span><strong>{en ? "Egg or eggless" : "முட்டை அல்லது முட்டையில்லா"}</strong><p>{en ? "Choose your formulation when you enquire; separate-process limitations are declared clearly." : "விசாரணையின் போது உங்கள் விருப்பத்தைத் தேர்ந்தெடுக்கலாம்."}</p></div>
        <div><span>03</span><strong>{en ? "Preorder only" : "முன்பதிவு மட்டும்"}</strong><p>{en ? "Planned production, pickup by appointment and delivery within a validated 20 km radius." : "திட்டமிட்ட தயாரிப்பு, முன்பதிவு பிக்கப் மற்றும் 20 கி.மீ. வரை டெலிவரி."}</p></div>
      </section>

      <section className="collectionSection">
        <div className="sectionHeading">
          <div><p className="eyebrow dark">THE OPENING COLLECTION</p><h2>{en ? "Familiar pleasure, considered differently." : "பழக்கமான சுவை, புதிய கவனத்துடன்."}</h2></div>
          <p>{en ? "A focused menu spanning signature brownies, true Brownie Tins, Brownie Tubs, millet tea cakes, cupcakes, birthday and party formats, personal gifting and corporate orders." : "சிக்னேச்சர் பிரௌனிகள், பிரௌனி டின்கள், பிரௌனி டப்கள், சிறுதானிய டீ கேக்குகள், கப் கேக்குகள், பிறந்தநாள் மற்றும் பார்ட்டி வடிவங்கள், தனிப்பட்ட பரிசுகள் மற்றும் நிறுவன ஆர்டர்கள்."}</p>
        </div>
        <div className="productGrid">
          {featured.map((item) => (
            <article className="productCard" key={item.title}>
              <div className="productImage"><Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 90vw, 30vw" /></div>
              <div className="productBody">
                <p className="cardEyebrow">{item.label}</p>
                <h3>{en ? item.title : item.titleTa}</h3>
                <p>{en ? item.copy : item.copyTa}</p>
                <div><span>{en ? "Egg & eggless options" : "முட்டை & முட்டையில்லா"}</span><a href="/menu">{en ? "View menu →" : "மெனு →"}</a></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="storySection">
        <div className="storyCopy">
          <p className="eyebrow dark">OUR STANDARD</p>
          <h2>{en ? "Trust begins with precise words." : "தெளிவான தகவலில்தான் நம்பிக்கை தொடங்குகிறது."}</h2>
          <p>{en ? "We say what is in each bake, identify allergens, and avoid blanket wellness promises. The core collection is being developed without artificial preservatives or artificial colours; every final claim will be confirmed against the approved recipe and supplier label before sale." : "ஒவ்வொரு பேக்கிலும் உள்ள பொருட்கள் மற்றும் அலர்ஜன்களைத் தெளிவாக அறிவிப்போம். இறுதி விற்பனைக்கு முன் ரெசிபி மற்றும் சப்ளையர் லேபிள்களுடன் அனைத்து கூற்றுகளும் சரிபார்க்கப்படும்."}</p>
          <ul className="standardList">
            <li><strong>{en ? "Ingredient-led" : "பொருட்களை மையமாக"}</strong><span>{en ? "Dark chocolate, ragi, walnut, pistachio and warm spice selected for flavour and function." : "டார்க் சாக்லேட், ராகி, வால்நட், பிஸ்தா மற்றும் மசாலா."}</span></li>
            <li><strong>{en ? "Made after reservation" : "முன்பதிவுக்குப் பிறகு"}</strong><span>{en ? "No always-on shelf; production is scheduled around confirmed dates." : "உறுதி செய்யப்பட்ட தேதிகளுக்கு ஏற்ப தயாரிப்பு திட்டமிடப்படும்."}</span></li>
            <li><strong>{en ? "Honest launch" : "நேர்மையான அறிமுகம்"}</strong><span>{en ? "Items marked validation or coming soon are enquiries—not confirmed purchases." : "சோதனை அல்லது விரைவில் என்று குறிக்கப்பட்டவை விசாரணைகள் மட்டுமே."}</span></li>
          </ul>
          <a className="button buttonCacao" href="/about">{en ? "Read our approach" : "எங்கள் அணுகுமுறை"}</a>
        </div>
        <div className="storyMedia">
          <video controls preload="metadata" poster="/images/editorial/home-our-standard-video-poster-v1.webp">
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

      <section className="preorder">
        <p className="eyebrow">PREORDER, PREPARE, DELIVER</p>
        <h2>{en ? "Reserve the bake. We’ll confirm the details personally." : "உங்கள் பேக்கை முன்பதிவு செய்யுங்கள். விவரங்களை நாங்கள் உறுதி செய்கிறோம்."}</h2>
        <p>{en ? "Build an enquiry here, then send one structured WhatsApp message. We confirm capacity, formulation, pickup or delivery, final price and payment instructions personally." : "விசாரணையை உருவாக்கி ஒரே WhatsApp செய்தியாக அனுப்புங்கள். தயாரிப்பு, பிக்கப் அல்லது டெலிவரி, இறுதி விலை மற்றும் கட்டண விவரங்களை நாங்கள் உறுதி செய்கிறோம்."}</p>
        <a className="button buttonCacao" href="/preorder">{en ? "Start an enquiry" : "விசாரணையைத் தொடங்க"}</a>
      </section>
    </main>
  );
}
