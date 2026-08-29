"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { usePreorder } from "../components/PreorderProvider";
import { categories, products, statusLabel } from "../lib/products";

export default function MenuPage() {
  const query = useSearchParams();
  const initial = query.get("category");
  const [active, setActive] = useState(initial && categories.some((c) => c.id === initial) ? initial : "all");
  const { language } = useLanguage();
  const { addItem, count } = usePreorder();
  const en = language === "en";
  const visible = useMemo(() => active === "all" ? products : products.filter((product) => product.category === active), [active]);

  return (
    <main>
      <section className="innerHero menuHero">
        <p className="eyebrow">THE SAN BAKES COLLECTION</p>
        <h1>{en ? "The preorder menu" : "முன்பதிவு மெனு"}</h1>
        <p>{en ? "A focused collection for everyday indulgence, considered gifting and celebrations. Planning prices are provisional until recipe, yield and supplier-cost validation is complete." : "தினசரி மகிழ்ச்சி, பரிசுகள் மற்றும் கொண்டாட்டங்களுக்கான மெனு. ரெசிபி மற்றும் செலவு சோதனை முடியும் வரை திட்டமிட்ட விலைகள் தற்காலிகமானவை."}</p>
      </section>
      <section className="menuSection">
        <div className="filterBar" aria-label="Filter menu by collection">
          {categories.map((category) => <button className={active === category.id ? "active" : ""} key={category.id} onClick={() => setActive(category.id)} type="button">{en ? category.name : category.nameTa}</button>)}
        </div>
        <div className="menuNotice"><strong>{en ? "Enquiry mode" : "விசாரணை நிலை"}</strong><span>{en ? "Online checkout is intentionally disabled while FSSAI registration and final recipe validation are pending." : "FSSAI பதிவு மற்றும் இறுதி ரெசிபி சோதனை நிலுவையில் உள்ளதால் ஆன்லைன் கட்டணம் முடக்கப்பட்டுள்ளது."}</span></div>
        <div className="menuGrid">
          {visible.map((product) => (
            <article className="menuCard" key={product.id}>
              <div className={`menuCardImage ${product.image ? "" : "imagePlaceholder"}`}>
                {product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw" /> : <span>SAN<br />BAKES</span>}
                <span className={`statusBadge ${product.status}`}>{en ? statusLabel[product.status].en : statusLabel[product.status].ta}</span>
              </div>
              <div className="menuCardBody">
                <p className="cardEyebrow">{en ? categories.find((c) => c.id === product.category)?.name : categories.find((c) => c.id === product.category)?.nameTa}</p>
                <h2>{en ? product.name : product.nameTa}</h2>
                <p>{en ? product.description : product.descriptionTa}</p>
                <div className="productMeta"><span>{product.price}</span><small>{product.format}</small></div>
                <button className="button buttonCacao" onClick={() => addItem(product.id)} type="button">{en ? "Add to enquiry" : "விசாரணையில் சேர்க்க"}</button>
              </div>
            </article>
          ))}
        </div>
        {count > 0 && <div className="basketDock"><span>{en ? `${count} item${count === 1 ? "" : "s"} in your enquiry` : `விசாரணையில் ${count} பொருட்கள்`}</span><Link className="button buttonLight" href="/preorder">{en ? "Review enquiry" : "விசாரணையைப் பார்க்க"}</Link></div>}
      </section>
    </main>
  );
}
