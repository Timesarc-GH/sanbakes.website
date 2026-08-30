export type PriceDecision = "approve" | "conditional" | "quotation";

export type PricingOption = {
  id: string;
  label: string;
  labelTa: string;
  price: number | null;
  originalPrice?: number;
  note: string;
  noteTa: string;
};

export type ProductPricing = {
  decision: PriceDecision;
  options: PricingOption[];
};

const option = (id:string, label:string, labelTa:string, price:number|null, note:string, noteTa:string): PricingOption => ({ id, label, labelTa, price, note, noteTa });

const baseProductPricing: Record<string, ProductPricing> = {
  "dark-cacao-sea-salt": { decision:"approve", options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",1090,"Recommended core launch format","பரிந்துரைக்கப்பட்ட முக்கிய அறிமுக அளவு"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",1590,"Recommended sharing and gifting format","பகிர்வு மற்றும் பரிசளிப்பு அளவு"),
  ]},
  "ragi-no-01": { decision:"approve", options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",1090,"Same launch price for Egg and Eggless","முட்டை மற்றும் முட்டையில்லா வகைகளுக்கு ஒரே விலை"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",1590,"Recommended sharing and gifting format","பகிர்வு மற்றும் பரிசளிப்பு அளவு"),
  ]},
  "walnut-reserve": { decision:"approve", options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",1190,"Includes toasted-walnut ingredient premium","வறுத்த வால்நட் பொருள் விலை சேர்க்கப்பட்டுள்ளது"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",1740,"Recommended gifting format","பரிந்துரைக்கப்பட்ட பரிசு அளவு"),
  ]},
  "pista-rose-cardamom": { decision:"approve", options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",1290,"Premium pistachio-led finish","பிரீமியம் பிஸ்தா அலங்காரம்"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",1890,"Recommended premium gifting format","பிரீமியம் பரிசளிப்பு அளவு"),
  ]},
  "biscoff-crunch": { decision:"conditional", options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",1190,"Release after ingredient and allergen verification","பொருள் மற்றும் அலர்ஜன் சோதனைக்குப் பிறகு"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",1740,"Conditional launch price","நிபந்தனை அறிமுக விலை"),
  ]},
  "chocolate-wafer-crunch": { decision:"conditional", options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",1190,"Release after ingredient and allergen verification","பொருள் மற்றும் அலர்ஜன் சோதனைக்குப் பிறகு"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",1740,"Conditional launch price","நிபந்தனை அறிமுக விலை"),
  ]},
  "strawberry-cacao": { decision:"conditional", options:[
    option("box-6","Seasonal box of 6","பருவகால 6 துண்டு பெட்டி",1290,"Fresh-fruit and delivery test required","புதிய பழம் மற்றும் டெலிவரி சோதனை தேவை"),
    option("box-9","Seasonal box of 9","பருவகால 9 துண்டு பெட்டி",1890,"Limited verified dates only","சோதிக்கப்பட்ட குறிப்பிட்ட தேதிகளில் மட்டும்"),
  ]},
  "signature-discovery-box": { decision:"approve", options:[
    option("box-6","6 pieces · curated flavours","6 துண்டுகள் · தேர்ந்தெடுத்த சுவைகள்",1090,"One controlled flavour mix selected by San Bakes","San Bakes தேர்ந்தெடுக்கும் கட்டுப்படுத்தப்பட்ட சுவை கலவை"),
  ]},
  "reserve-collection": { decision:"approve", options:[
    option("box-9","9 pieces · curated flavours","9 துண்டுகள் · தேர்ந்தெடுத்த சுவைகள்",1590,"Best-value premium sharing format","பிரீமியம் பகிர்வுக்கான பரிந்துரைக்கப்பட்ட அளவு"),
  ]},
  "brownie-tin-3-piece": { decision:"conditional", options:[
    option("same-classic","Same-flavour classic · 3 pieces","ஒரே கிளாசிக் சுவை · 3 துண்டுகள்",549,"Dark Cacao or Biscoff; final flavour confirmed personally","டார்க் காகாவ் அல்லது பிஸ்காஃப்; இறுதி சுவை தனிப்பட்ட முறையில் உறுதி செய்யப்படும்"),
    option("same-premium","Same-flavour premium · 3 pieces","ஒரே பிரீமியம் சுவை · 3 துண்டுகள்",649,"Pista, seasonal strawberry or chocolate wafer; availability applies","பிஸ்தா, பருவகால ஸ்ட்ராபெரி அல்லது சாக்லேட் வேஃபர்; கிடைப்பதற்கு உட்பட்டது"),
    option("curated-assorted","Curated assorted · 3 pieces","தேர்ந்தெடுத்த கலவை · 3 துண்டுகள்",625,"Three flavours selected from the validated Tin list","சோதிக்கப்பட்ட டின் பட்டியலிலிருந்து மூன்று சுவைகள் தேர்ந்தெடுக்கப்படும்"),
  ]},
  "brownie-tin-flight": { decision:"conditional", options:[
    option("flight-2","2 Tins · 6 pieces","2 டின்கள் · 6 துண்டுகள்",1190,"Same-flavour or assorted after confirmation","உறுதிப்படுத்திய பிறகு ஒரே சுவை அல்லது கலவை"),
    option("flight-3","3 Tins · 9 pieces","3 டின்கள் · 9 துண்டுகள்",1740,"Recommended sharing and gifting flight","பகிர்வு மற்றும் பரிசளிப்புக்கான பரிந்துரைக்கப்பட்ட தொகுப்பு"),
    option("flight-5","5 Tins · 15 pieces","5 டின்கள் · 15 துண்டுகள்",2850,"One five-flavour flight when every flavour is validated and available","அனைத்து சுவைகளும் சோதிக்கப்பட்டு கிடைக்கும் போது ஐந்து சுவை தொகுப்பு"),
  ]},
  "classic-brownie-tub": { decision:"conditional", options:[
    option("single-tub","1 regular tub · target 250 g","1 சாதாரண டப் · இலக்கு 250 கிராம்",449,"Recommended replacement for the historical ₹299 price","பழைய ₹299 விலைக்குப் பதிலான பரிந்துரை"),
    option("tub-duo","Duo · 2 regular tubs","2 சாதாரண டப்கள்",890,"No discounting until margin is validated","மார்ஜின் சோதனை வரை தள்ளுபடி இல்லை"),
  ]},
  "loaded-brownie-tub": { decision:"conditional", options:[
    option("single-tub","1 loaded tub · target 250 g","1 லோடெட் டப் · இலக்கு 250 கிராம்",549,"Recommended replacement for the historical ₹349 price","பழைய ₹349 விலைக்குப் பதிலான பரிந்துரை"),
    option("tub-duo","Duo · 2 loaded tubs","2 லோடெட் டப்கள்",1090,"Topping cost and transport test required","டாப்பிங் செலவு மற்றும் போக்குவரத்து சோதனை தேவை"),
  ]},
  "ragi-cacao-tea-cake": { decision:"conditional", options:[
    option("loaf-450","1 loaf · target 450 g","1 லோஃப் · இலக்கு 450 கிராம்",850,"Approve after yield and shelf-life test","யீல்ட் மற்றும் சேமிப்பு சோதனைக்குப் பிறகு"),
    option("loaf-duo","Gift duo · 2 × target 450 g","பரிசு டூயோ · 2 × இலக்கு 450 கிராம்",1650,"One presentation, one delivery address","ஒரே பேக்கிங் மற்றும் ஒரு டெலிவரி முகவரி"),
  ]},
  "pista-cardamom-tea-cake": { decision:"conditional", options:[
    option("loaf-450","1 loaf · target 450 g","1 லோஃப் · இலக்கு 450 கிராம்",950,"Approve after pistachio cost and yield test","பிஸ்தா செலவு மற்றும் யீல்ட் சோதனைக்குப் பிறகு"),
    option("loaf-duo","Gift duo · 2 × target 450 g","பரிசு டூயோ · 2 × இலக்கு 450 கிராம்",1850,"One presentation, one delivery address","ஒரே பேக்கிங் மற்றும் ஒரு டெலிவரி முகவரி"),
  ]},
  "birthday-250": { decision:"approve", options:[
    option("classic-finish","250 g · classic finish","250 கிராம் · கிளாசிக் அலங்காரம்",950,"Short message included","குறுகிய செய்தி சேர்க்கப்பட்டுள்ளது"),
    option("reserve-finish","250 g · reserve nut finish","250 கிராம் · ரிசர்வ் நட் அலங்காரம்",1090,"Premium walnut/pistachio finish","பிரீமியம் வால்நட்/பிஸ்தா அலங்காரம்"),
  ]},
  "birthday-500": { decision:"approve", options:[
    option("classic-finish","500 g · classic finish","500 கிராம் · கிளாசிக் அலங்காரம்",1750,"Short message included","குறுகிய செய்தி சேர்க்கப்பட்டுள்ளது"),
    option("reserve-finish","500 g · reserve nut finish","500 கிராம் · ரிசர்வ் நட் அலங்காரம்",1990,"Premium walnut/pistachio finish","பிரீமியம் வால்நட்/பிஸ்தா அலங்காரம்"),
  ]},
  "birthday-1kg": { decision:"approve", options:[
    option("classic-finish","1 kg · classic finish","1 கிலோ · கிளாசிக் அலங்காரம்",3150,"Short message included","குறுகிய செய்தி சேர்க்கப்பட்டுள்ளது"),
    option("reserve-finish","1 kg · reserve nut finish","1 கிலோ · ரிசர்வ் நட் அலங்காரம்",3590,"Premium walnut/pistachio finish","பிரீமியம் வால்நட்/பிஸ்தா அலங்காரம்"),
  ]},
  "mini-brownie-tower": { decision:"conditional", options:[
    option("tower-12","Tower of 12 pieces","12 துண்டு டவர்",1390,"Pickup preferred during launch validation","அறிமுக சோதனையில் பிக்கப் பரிந்துரைக்கப்படுகிறது"),
    option("tower-18","Tower of 18 pieces","18 துண்டு டவர்",1990,"Delivery route must be approved","டெலிவரி பாதை அனுமதிக்கப்பட வேண்டும்"),
  ]},
  "cupcake-ragi": { decision:"conditional", options:[
    option("box-6","Box of 6 cupcakes","6 கப் கேக் பெட்டி",1290,"Release only after transport test","போக்குவரத்து சோதனைக்குப் பிறகு மட்டும்"),
    option("box-12","Box of 12 cupcakes","12 கப் கேக் பெட்டி",2490,"Single flavour and finish","ஒரே சுவை மற்றும் அலங்காரம்"),
  ]},
  "cupcake-pista": { decision:"conditional", options:[
    option("box-6","Box of 6 cupcakes","6 கப் கேக் பெட்டி",1390,"Pistachio premium; transport test pending","பிஸ்தா பிரீமியம்; போக்குவரத்து சோதனை நிலுவையில்"),
    option("box-12","Box of 12 cupcakes","12 கப் கேக் பெட்டி",2690,"Single flavour and finish","ஒரே சுவை மற்றும் அலங்காரம்"),
  ]},
  "corporate-mini-box": { decision:"quotation", options:[
    option("tier-25","25–49 boxes · price per box","25–49 பெட்டிகள் · ஒரு பெட்டியின் விலை",690,"Up to two flavours; one common message","இரண்டு சுவைகள் வரை; ஒரு பொதுவான செய்தி"),
    option("tier-50","50–99 boxes · price per box","50–99 பெட்டிகள் · ஒரு பெட்டியின் விலை",655,"Up to 5% volume adjustment","5% வரை அளவு விலை மாற்றம்"),
    option("tier-100","100+ boxes · price per box","100+ பெட்டிகள் · ஒரு பெட்டியின் விலை",635,"Up to 8% adjustment; margin floor still applies","8% வரை மாற்றம்; மார்ஜின் வரம்பு பொருந்தும்"),
  ]},
  "seasonal-hamper": { decision:"conditional", options:[
    option("classic-hamper","Classic seasonal hamper","கிளாசிக் பருவகால ஹாம்பர்",1990,"Final contents fixed for each season","ஒவ்வொரு பருவத்திற்கும் இறுதி உள்ளடக்கம் நிர்ணயிக்கப்படும்"),
    option("reserve-hamper","Reserve seasonal hamper","ரிசர்வ் பருவகால ஹாம்பர்",2990,"Premium tin/box composition","பிரீமியம் டின்/பெட்டி தொகுப்பு"),
  ]},
  "bespoke-corporate": { decision:"quotation", options:[
    option("proposal","Custom proposal · minimum 25 boxes or ₹15,000","தனிப்பயன் விலை · குறைந்தபட்சம் 25 பெட்டிகள் அல்லது ₹15,000",null,"7–21 day lead time based on branding and addresses","பிராண்டிங் மற்றும் முகவரிகளுக்கு ஏற்ப 7–21 நாட்கள்"),
  ]},
};

export const priceRevisionPercent = 15;
export const priceRevisionExclusions = new Set([
  "corporate-mini-box",
  "seasonal-hamper",
  "bespoke-corporate",
]);

export const directPlanningPriceIds = new Set([
  "brownie-tin-3-piece",
  "brownie-tin-flight",
]);

export const productPricing: Record<string, ProductPricing> = Object.fromEntries(
  Object.entries(baseProductPricing).map(([productId, pricing]) => [
    productId,
    priceRevisionExclusions.has(productId) || directPlanningPriceIds.has(productId) ? pricing : {
      ...pricing,
      options: pricing.options.map((item) => item.price === null ? item : {
        ...item,
        originalPrice: item.price,
        price: Math.round(item.price * (1 - priceRevisionPercent / 100)),
      }),
    },
  ]),
);

export const formatPrice = (price:number|null) => price === null ? "By quotation" : new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(price);
export const makeSelectionKey = (productId:string, optionId:string) => `${productId}::${optionId}`;
export const parseSelectionKey = (key:string) => { const [productId, optionId] = key.split("::"); return { productId, optionId }; };
export const getPricing = (productId:string) => productPricing[productId];
export const decisionLabel: Record<PriceDecision, { en:string; ta:string }> = {
  approve:{ en:"Recommended for approval", ta:"அனுமதிக்க பரிந்துரை" },
  conditional:{ en:"Conditional — validation required", ta:"நிபந்தனை — சோதனை தேவை" },
  quotation:{ en:"Quotation rules proposed", ta:"விலை மதிப்பீட்டு விதிகள்" },
};
