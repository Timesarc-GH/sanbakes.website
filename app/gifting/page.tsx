"use client";

import Image from "next/image";
import { useLanguage } from "../components/LanguageProvider";

const giftOptions = [
  { title: "Signature Discovery Box", titleTa: "சிக்னேச்சர் டிஸ்கவரி பாக்ஸ்", price: "6 pieces · ₹927", copy: "A concise introduction to the San Bakes collection.", copyTa: "San Bakes தொகுப்பின் சிறந்த அறிமுகம்." },
  { title: "Reserve Collection", titleTa: "ரிசர்வ் கலெக்ஷன்", price: "9 pieces · ₹1,352", copy: "A generous curated box for sharing or a considered thank-you.", copyTa: "பகிர்வதற்கும் நன்றி பரிசுக்கும் தேர்ந்தெடுக்கப்பட்ட பெரிய பெட்டி." },
  { title: "Three-Piece Brownie Tin", titleTa: "மூன்று துண்டு பிரௌனி டின்", price: "₹549–₹649", copy: "A reusable Tin in one flavour or a curated three-flavour mix.", copyTa: "ஒரே சுவை அல்லது தேர்ந்தெடுத்த மூன்று சுவை கலவையுடன் மறுபயன்பாட்டு டின்." },
  { title: "Whole Brownie Tin", titleTa: "முழு பிரௌனி டின்", price: "₹549–₹649", copy: "One continuous brownie—not separate pieces—with one, two or three flavour-topping sections.", copyTa: "தனித்தனி துண்டுகள் அல்ல; ஒன்று, இரண்டு அல்லது மூன்று சுவை டாப்பிங் பகுதிகளுடன் ஒரு தொடர்ச்சியான பிரௌனி." },
  { title: "Seasonal Hamper", titleTa: "பருவகால ஹாம்பர்", price: "₹1,990–₹2,990", copy: "A limited composition released only after its contents and packaging are approved.", copyTa: "உள்ளடக்கம் மற்றும் பேக்கிங் உறுதி செய்யப்பட்ட பிறகு மட்டும் வெளியாகும் பருவகால தொகுப்பு." },
];

export default function GiftingPage() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <main>
      <section className="innerHero giftingHero">
        <p className="eyebrow">PERSONAL GIFTING</p>
        <h1>{en ? "A gift should feel considered before it is opened." : "திறப்பதற்கு முன்பே பரிசு கவனமாகத் தேர்ந்தெடுக்கப்பட்டதாக உணர வேண்டும்."}</h1>
        <p>{en ? "Choose a curated brownie collection, add a personal message and select delivery or appointment pickup. Each confirmed gift is baked for its date—not taken from a shelf." : "தேர்ந்தெடுக்கப்பட்ட பிரௌனி தொகுப்பு, தனிப்பட்ட செய்தி மற்றும் டெலிவரி அல்லது பிக்கப். ஒவ்வொரு பரிசும் உறுதி செய்யப்பட்ட தேதிக்காக தயாரிக்கப்படும்."}</p>
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
          <a className="button buttonCacao" href="/menu?category=gifting">{en ? "Choose a personal gift" : "தனிப்பட்ட பரிசைத் தேர்ந்தெடுக்க"}</a>
        </div>
      </section>

      <section className="offerSection">
        <div className="offerIntro"><p className="eyebrow dark">CURATED FORMATS</p><h2>{en ? "Five clear ways to give well." : "நேர்த்தியாக பரிசளிக்க ஐந்து தெளிவான வழிகள்."}</h2><p>{en ? "Planning prices exclude delivery and paid customisation. Final contents, flavours and availability are confirmed before payment." : "திட்ட விலைகளில் டெலிவரி மற்றும் கூடுதல் தனிப்பயன் செலவு சேர்க்கப்படவில்லை. கட்டணத்திற்கு முன் உள்ளடக்கம், சுவை மற்றும் கிடைக்கும் நிலை உறுதி செய்யப்படும்."}</p></div>
        <div className="offerGrid">{giftOptions.map((item) => <article key={item.title}><small>PERSONAL GIFT</small><h3>{en ? item.title : item.titleTa}</h3><strong>{item.price}</strong><p>{en ? item.copy : item.copyTa}</p></article>)}</div>
      </section>

      <section className="giftSteps">
        <div><span>01</span><h3>{en ? "Choose the collection" : "தொகுப்பைத் தேர்ந்தெடுக்க"}</h3><p>{en ? "Start with a six- or nine-piece box, Brownie Tin or approved seasonal hamper." : "ஆறு அல்லது ஒன்பது துண்டு பெட்டி, பிரௌனி டின் அல்லது பருவகால ஹாம்பரைத் தேர்ந்தெடுக்கவும்."}</p></div>
        <div><span>02</span><h3>{en ? "Write the message" : "செய்தியை எழுதுங்கள்"}</h3><p>{en ? "One shared gift note is included. Complex artwork and multiple notes are quoted separately." : "ஒரு பொதுவான பரிசுச் செய்தி சேர்க்கப்பட்டுள்ளது. கூடுதல் வடிவமைப்பு தனியாக விலை நிர்ணயிக்கப்படும்."}</p></div>
        <div><span>03</span><h3>{en ? "Confirm the handover" : "ஹேண்ட்ஓவரை உறுதிசெய்ய"}</h3><p>{en ? "Send within the approved radius or collect by confirmed appointment." : "அனுமதிக்கப்பட்ட சுற்றளவில் அனுப்பவும் அல்லது உறுதி செய்யப்பட்ட நேரத்தில் பிக்கப் செய்யவும்."}</p></div>
      </section>

      <section className="crossLink"><div><p className="eyebrow dark">ORDERING FOR A TEAM?</p><h2>{en ? "Corporate orders now have their own planning desk." : "நிறுவன ஆர்டர்களுக்கு தனி திட்டமிடல் பக்கம் உள்ளது."}</h2><p>{en ? "For employee gifts, client appreciation, branded sleeves and multi-address fulfilment, use the Corporate page." : "ஊழியர் பரிசுகள், வாடிக்கையாளர் நன்றி, பிராண்டட் ஸ்லீவ் மற்றும் பல முகவரி டெலிவரிக்கு Corporate பக்கத்தைப் பயன்படுத்தவும்."}</p></div><a className="button buttonCacao" href="/corporate">{en ? "Explore Corporate" : "நிறுவன பக்கத்தைப் பார்க்க"}</a></section>
    </main>
  );
}
