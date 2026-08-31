"use client";

import Image from "next/image";
import { useLanguage } from "../components/LanguageProvider";
import { ProductCollection } from "../components/ProductCollection";

export default function GiftingPage() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <main>
      <section className="innerHero shopHero giftingHero">
        <p className="eyebrow">PERSONAL GIFTING</p>
        <h1>{en ? "A gift should feel considered before it is opened." : "திறப்பதற்கு முன்பே பரிசு கவனமாகத் தேர்ந்தெடுக்கப்பட்டதாக உணர வேண்டும்."}</h1>
        <p>{en ? "Choose a curated brownie collection, add a personal message and select delivery or appointment pickup. Each confirmed gift is baked for its date—not taken from a shelf." : "தேர்ந்தெடுக்கப்பட்ட பிரௌனி தொகுப்பு, தனிப்பட்ட செய்தி மற்றும் டெலிவரி அல்லது பிக்கப். ஒவ்வொரு பரிசும் உறுதி செய்யப்பட்ட தேதிக்காக தயாரிக்கப்படும்."}</p>
        <div className="innerHeroActions"><a className="button buttonLight" href="#gifting-collection">{en ? "Choose a personal gift" : "தனிப்பட்ட பரிசைத் தேர்ந்தெடுக்க"}</a><a className="button buttonOutlineLight" href="/preorder">{en ? "Review cart" : "கார்ட்டைப் பார்க்க"}</a></div>
      </section>

      <section className="giftFeature">
        <div className="giftImage"><Image src="/images/editorial/gifting-feature-editorial-v1.webp" alt="San Bakes premium brownie gifting presentation" fill sizes="(max-width: 900px) 100vw, 52vw" /></div>
        <div className="giftCopy">
          <p className="eyebrow dark">A COMPLETE GIFT</p>
          <h2>{en ? "Elegant because every detail has a purpose." : "ஒவ்வொரு விவரத்திற்கும் ஒரு நோக்கம் இருப்பதால் நேர்த்தியானது."}</h2>
          <ul>
            <li>{en ? "Selected brownie box, Tin or seasonal collection" : "தேர்ந்தெடுக்கப்பட்ட பிரௌனி பெட்டி, டின் அல்லது பருவகால தொகுப்பு"}</li>
            <li>{en ? "Protective food-safe presentation" : "உணவு பாதுகாப்பான பேக்கிங்"}</li>
            <li>{en ? "Flavour and allergen guide" : "சுவை மற்றும் அலர்ஜன் வழிகாட்டி"}</li>
            <li>{en ? "One personal message within the stated limit" : "குறிப்பிட்ட வரம்பில் ஒரு தனிப்பட்ட செய்தி"}</li>
            <li>{en ? "Bake date, storage and serving guidance" : "பேக் தேதி, சேமிப்பு மற்றும் பரிமாறும் வழிமுறை"}</li>
          </ul>
          <a className="button buttonCacao" href="#gifting-collection">{en ? "Choose a personal gift" : "தனிப்பட்ட பரிசைத் தேர்ந்தெடுக்க"}</a>
        </div>
      </section>

      <div id="gifting-collection" className="collectionAnchor">
        <ProductCollection
          productIds={["signature-discovery-box", "reserve-collection", "brownie-tin-3-piece", "whole-brownie-tin", "seasonal-hamper"]}
          eyebrowEn="CURATED FORMATS"
          eyebrowTa="தேர்ந்தெடுக்கப்பட்ட பரிசு வகைகள்"
          titleEn="Five clear ways to give well."
          titleTa="நேர்த்தியாக பரிசளிக்க ஐந்து தெளிவான வழிகள்."
          introEn="Choose the gift, pack and formulation here, then add it directly to your cart. Listed prices exclude delivery and paid customisation. Please reserve personal gifts at least 48 hours ahead; seasonal hampers and coordinated multi-gift requests may need more time. Contents, flavours, availability and your date are confirmed before payment."
          introTa="பரிசு, பேக் மற்றும் தயாரிப்பு வகையை இங்கே தேர்ந்தெடுத்து நேரடியாக கார்ட்டில் சேர்க்கவும். பட்டியலிட்ட விலைகளில் டெலிவரி மற்றும் கூடுதல் தனிப்பயன் செலவு சேர்க்கப்படவில்லை. தனிப்பட்ட பரிசுகளை குறைந்தது 48 மணி நேரத்திற்கு முன் முன்பதிவு செய்யவும்; பருவகால ஹாம்பர் மற்றும் ஒருங்கிணைந்த பல பரிசு ஆர்டர்களுக்கு கூடுதல் நேரம் தேவைப்படலாம். உள்ளடக்கம், சுவை, கிடைக்கும் நிலை மற்றும் தேதி கட்டணத்திற்கு முன் உறுதி செய்யப்படும்."
        />
      </div>

      <section className="giftSteps">
        <div><span>01</span><h3>{en ? "Choose the collection" : "தொகுப்பைத் தேர்ந்தெடுக்க"}</h3><p>{en ? "Start with a six- or nine-piece box, Brownie Tin or seasonal hamper." : "ஆறு அல்லது ஒன்பது துண்டு பெட்டி, பிரௌனி டின் அல்லது பருவகால ஹாம்பரைத் தேர்ந்தெடுக்கவும்."}</p></div>
        <div><span>02</span><h3>{en ? "Write the message" : "செய்தியை எழுதுங்கள்"}</h3><p>{en ? "One shared gift note is included. Complex artwork and multiple notes are quoted separately." : "ஒரு பொதுவான பரிசுச் செய்தி சேர்க்கப்பட்டுள்ளது. கூடுதல் வடிவமைப்பு தனியாக விலை நிர்ணயிக்கப்படும்."}</p></div>
        <div><span>03</span><h3>{en ? "Confirm the handover" : "ஹேண்ட்ஓவரை உறுதிசெய்ய"}</h3><p>{en ? "Arrange delivery within Chennai or collect by confirmed appointment." : "சென்னை டெலிவரி ஏற்பாடு செய்யவும் அல்லது உறுதி செய்யப்பட்ட நேரத்தில் பிக்கப் செய்யவும்."}</p></div>
      </section>

      <section className="crossLink"><div><p className="eyebrow dark">ORDERING FOR A TEAM?</p><h2>{en ? "Corporate orders now have their own planning desk." : "நிறுவன ஆர்டர்களுக்கு தனி திட்டமிடல் பக்கம் உள்ளது."}</h2><p>{en ? "For employee gifts, client appreciation, branded sleeves and multi-address fulfilment, use the Corporate page." : "ஊழியர் பரிசுகள், வாடிக்கையாளர் நன்றி, பிராண்டட் ஸ்லீவ் மற்றும் பல முகவரி டெலிவரிக்கு Corporate பக்கத்தைப் பயன்படுத்தவும்."}</p></div><a className="button buttonCacao" href="/corporate">{en ? "Explore Corporate" : "நிறுவன பக்கத்தைப் பார்க்க"}</a></section>
    </main>
  );
}
