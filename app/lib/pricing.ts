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
    option("house-six","House Six · one of each listed flavour","ஹவுஸ் சிக்ஸ் · பட்டியலிட்ட ஒவ்வொரு சுவையிலும் ஒன்று",1090,"Dark Cacao, Walnut, Pista, Strawberry, Biscoff and Wafer when all are validated","அனைத்தும் சோதிக்கப்பட்டால் டார்க் காகாவ், வால்நட், பிஸ்தா, ஸ்ட்ராபெரி, பிஸ்காஃப் மற்றும் வேஃபர்"),
    option("ragi-walnut-3-3","3 Ragi + 3 Walnut Reserve","3 ராகி + 3 வால்நட் ரிசர்வ்",1150,"Recommended two-flavour mix; one formulation per box","பரிந்துரைக்கப்பட்ட இரண்டு சுவை கலவை; ஒரு பெட்டிக்கு ஒரே வகை"),
    option("choose-two-3-3","Choose 2 validated flavours · 3+3","சோதிக்கப்பட்ட 2 சுவைகள் · 3+3",1190,"Premium and seasonal flavours may be subject to availability","பிரீமியம் மற்றும் பருவகால சுவைகள் கிடைப்பதற்கு உட்பட்டவை"),
  ]},
  "reserve-collection": { decision:"approve", options:[
    option("house-nine","House Nine · curated assortment","ஹவுஸ் நைன் · தேர்ந்தெடுத்த கலவை",1590,"Six flavour identities with three considered repeats","ஆறு சுவைகளுடன் கவனமாக தேர்ந்தெடுத்த மூன்று மறுபதிப்புகள்"),
    option("ragi-walnut-pista-3-3-3","3 Ragi + 3 Walnut + 3 Pista","3 ராகி + 3 வால்நட் + 3 பிஸ்தா",1790,"Recommended three-flavour mix; one formulation per box","பரிந்துரைக்கப்பட்ட மூன்று சுவை கலவை; ஒரு பெட்டிக்கு ஒரே வகை"),
    option("six-flavour-nine","Six-flavour mix · 9 pieces","ஆறு சுவை கலவை · 9 துண்டுகள்",1890,"One of each available flavour plus three customer-selected repeats","கிடைக்கும் ஒவ்வொரு சுவையிலும் ஒன்று மற்றும் வாடிக்கையாளர் தேர்ந்தெடுக்கும் மூன்று மறுபதிப்புகள்"),
  ]},
  "brownie-tin-3-piece": { decision:"conditional", options:[
    option("one-flavour-classic","1 flavour · 3 Classic pieces","1 சுவை · 3 கிளாசிக் துண்டுகள்",549,"Three matching Dark Cacao or Ragi pieces","ஒரே டார்க் காகாவ் அல்லது ராகி சுவையில் மூன்று துண்டுகள்"),
    option("two-flavour-duo","2 flavours · 2+1 composition","2 சுவைகள் · 2+1 கலவை",599,"Choose two confirmed flavours; premium availability applies","உறுதி செய்யப்பட்ட இரண்டு சுவைகளைத் தேர்வு செய்யலாம்; பிரீமியம் கிடைப்புக்கு உட்பட்டது"),
    option("three-flavour-trio","3 flavours · 1+1+1 composition","3 சுவைகள் · 1+1+1 கலவை",625,"Choose three confirmed flavours for one Tin","ஒரு டினுக்கு உறுதி செய்யப்பட்ட மூன்று சுவைகளைத் தேர்வு செய்யலாம்"),
    option("one-flavour-premium","1 premium flavour · 3 pieces","1 பிரீமியம் சுவை · 3 துண்டுகள்",649,"Walnut, Pista or a validated seasonal/confectionery flavour","வால்நட், பிஸ்தா அல்லது சோதிக்கப்பட்ட பருவகால/கான்ஃபெக்ஷனரி சுவை"),
  ]},
  "whole-brownie-tin": { decision:"conditional", options:[
    option("one-topping","1 whole Brownie Tin · 1 flavour topping","1 முழு பிரௌனி டின் · 1 சுவை டாப்பிங்",549,"One continuous brownie with one confirmed topping across the full Tin","ஒரே தொடர்ச்சியான பிரௌனியில் உறுதி செய்யப்பட்ட ஒரு டாப்பிங்"),
    option("two-toppings","1 whole Brownie Tin · 2 flavour-topping sections","1 முழு பிரௌனி டின் · 2 சுவை டாப்பிங் பகுதிகள்",599,"Two topping flavours split across one continuous brownie—not two pieces","இரண்டு துண்டுகள் அல்ல; ஒரே தொடர்ச்சியான பிரௌனியில் இரண்டு சுவை டாப்பிங் பகுதிகள்"),
    option("three-toppings","1 whole Brownie Tin · 3 flavour-topping sections","1 முழு பிரௌனி டின் · 3 சுவை டாப்பிங் பகுதிகள்",649,"Three topping flavours arranged across one continuous brownie—not three pieces","மூன்று துண்டுகள் அல்ல; ஒரே தொடர்ச்சியான பிரௌனியில் மூன்று சுவை டாப்பிங் பகுதிகள்"),
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
    option("box-9","Box of 9 cupcakes","9 கப் கேக் பெட்டி",1890,"Single flavour; 5-day preorder after launch","ஒரே சுவை; அறிமுகத்திற்குப் பிறகு 5 நாள் முன்பதிவு"),
    option("box-12","Box of 12 cupcakes","12 கப் கேக் பெட்டி",2490,"Single flavour and finish","ஒரே சுவை மற்றும் அலங்காரம்"),
  ]},
  "cupcake-pista": { decision:"conditional", options:[
    option("box-6","Box of 6 cupcakes","6 கப் கேக் பெட்டி",1390,"Pistachio premium; transport test pending","பிஸ்தா பிரீமியம்; போக்குவரத்து சோதனை நிலுவையில்"),
    option("box-9","Box of 9 cupcakes","9 கப் கேக் பெட்டி",2090,"Single flavour; 5-day preorder after launch","ஒரே சுவை; அறிமுகத்திற்குப் பிறகு 5 நாள் முன்பதிவு"),
    option("box-12","Box of 12 cupcakes","12 கப் கேக் பெட்டி",2690,"Single flavour and finish","ஒரே சுவை மற்றும் அலங்காரம்"),
  ]},
  "cupcake-discovery": { decision:"conditional", options:[
    option("box-6","Discovery box of 6 · one of each","6 டிஸ்கவரி பெட்டி · ஒவ்வொரு சுவையிலும் ஒன்று",1390,"Six planned flavours; only validated flavours will launch","திட்டமிட்ட ஆறு சுவைகள்; சோதிக்கப்பட்டவை மட்டுமே அறிமுகமாகும்"),
    option("box-9","Discovery box of 9 · six flavours + 3 repeats","9 டிஸ்கவரி பெட்டி · ஆறு சுவைகள் + 3 மறுபதிப்புகள்",2090,"Customer selects three repeats after availability confirmation","கிடைப்பை உறுதி செய்த பிறகு மூன்று மறுபதிப்புகளைத் தேர்வு செய்யலாம்"),
    option("box-12","Discovery box of 12 · two of each","12 டிஸ்கவரி பெட்டி · ஒவ்வொரு சுவையிலும் இரண்டு",2690,"Balanced paired assortment across the six planned flavours","திட்டமிட்ட ஆறு சுவைகளில் சமமான ஜோடி கலவை"),
  ]},
  "corporate-mini-box": { decision:"quotation", options:[
    option("tier-25-ragi-walnut","25–49 boxes · 2 Ragi + 2 Walnut · per box","25–49 பெட்டிகள் · 2 ராகி + 2 வால்நட் · ஒரு பெட்டி",690,"Recommended lead composition; one common message","பரிந்துரைக்கப்பட்ட முக்கிய கலவை; ஒரு பொதுவான செய்தி"),
    option("tier-25-four-flavour","25–49 boxes · 4-flavour curated · per box","25–49 பெட்டிகள் · 4 சுவை கலவை · ஒரு பெட்டி",745,"One of four confirmed flavours; premium ingredients included","உறுதி செய்யப்பட்ட நான்கு சுவைகளில் ஒவ்வொன்றும் ஒன்று; பிரீமியம் பொருட்கள் சேர்க்கப்பட்டுள்ளன"),
    option("tier-50","50–99 boxes · 2 Ragi + 2 Walnut · per box","50–99 பெட்டிகள் · 2 ராகி + 2 வால்நட் · ஒரு பெட்டி",655,"Controlled 2+2 mix and one common message","கட்டுப்படுத்தப்பட்ட 2+2 கலவை மற்றும் ஒரு பொதுவான செய்தி"),
    option("tier-100","100+ boxes · 2 Ragi + 2 Walnut · per box","100+ பெட்டிகள் · 2 ராகி + 2 வால்நட் · ஒரு பெட்டி",635,"Margin floor and home-kitchen capacity approval still apply","மார்ஜின் வரம்பும் வீட்டு சமையலறை திறன் அனுமதியும் பொருந்தும்"),
  ]},
  "seasonal-hamper": { decision:"conditional", options:[
    option("classic-hamper","Classic seasonal hamper","கிளாசிக் பருவகால ஹாம்பர்",1990,"Final contents fixed for each season","ஒவ்வொரு பருவத்திற்கும் இறுதி உள்ளடக்கம் நிர்ணயிக்கப்படும்"),
    option("reserve-hamper","Reserve seasonal hamper","ரிசர்வ் பருவகால ஹாம்பர்",2990,"Premium tin/box composition","பிரீமியம் டின்/பெட்டி தொகுப்பு"),
  ]},
  "bespoke-corporate": { decision:"quotation", options:[
    option("proposal","Custom proposal · minimum 25 boxes or ₹15,000","தனிப்பயன் விலை · குறைந்தபட்சம் 25 பெட்டிகள் அல்லது ₹15,000",null,"7–21 day lead time based on branding and addresses","பிராண்டிங் மற்றும் முகவரிகளுக்கு ஏற்ப 7–21 நாட்கள்"),
  ]},
  "party-single-brownies": { decision:"quotation", options:[
    option("classic-25","25 Classic brownies · individually packed","25 கிளாசிக் பிரௌனிகள் · தனித்தனி பேக்கிங்",4375,"₹175 each · up to two flavours","ஒன்றுக்கு ₹175 · இரண்டு சுவைகள் வரை"),
    option("reserve-25","25 Reserve / assorted brownies · individually packed","25 ரிசர்வ் / கலவை பிரௌனிகள் · தனித்தனி பேக்கிங்",4875,"₹195 each · up to two flavours","ஒன்றுக்கு ₹195 · இரண்டு சுவைகள் வரை"),
    option("classic-50","50 Classic brownies · individually packed","50 கிளாசிக் பிரௌனிகள் · தனித்தனி பேக்கிங்",8500,"₹170 each · up to four flavours","ஒன்றுக்கு ₹170 · நான்கு சுவைகள் வரை"),
    option("classic-100","100 Classic brownies · individually packed","100 கிளாசிக் பிரௌனிகள் · தனித்தனி பேக்கிங்",16500,"₹165 each · 10–14 day lead time","ஒன்றுக்கு ₹165 · 10–14 நாட்கள் முன்னதாக"),
  ]},
  "party-brownie-tins": { decision:"quotation", options:[
    option("piece-classic-10","10 Classic three-piece Tins","10 கிளாசிக் மூன்று-துண்டு டின்கள்",5250,"₹525 per Tin · three separate matching brownie pieces","ஒரு டினுக்கு ₹525 · மூன்று தனித்தனி ஒரே சுவை பிரௌனி துண்டுகள்"),
    option("piece-assorted-10","10 Curated assorted three-piece Tins","10 தேர்ந்தெடுத்த கலவை மூன்று-துண்டு டின்கள்",6100,"₹610 per Tin · three separate pieces in a curated mix","ஒரு டினுக்கு ₹610 · தேர்ந்தெடுத்த கலவையில் மூன்று தனித்தனி துண்டுகள்"),
    option("whole-single-10","10 Whole Brownie Tins · 1 topping flavour","10 முழு பிரௌனி டின்கள் · 1 டாப்பிங் சுவை",5250,"₹525 per Tin · one continuous brownie with one coordinated topping","ஒரு டினுக்கு ₹525 · ஒரே டாப்பிங்குடன் ஒரு தொடர்ச்சியான பிரௌனி"),
    option("whole-multi-10","10 Whole Brownie Tins · 2 or 3 topping sections","10 முழு பிரௌனி டின்கள் · 2 அல்லது 3 டாப்பிங் பகுதிகள்",6100,"₹610 per Tin · one continuous brownie with divided topping sections","ஒரு டினுக்கு ₹610 · பிரிக்கப்பட்ட டாப்பிங் பகுதிகளுடன் ஒரு தொடர்ச்சியான பிரௌனி"),
    option("larger","25+ Tins · custom proposal","25+ டின்கள் · தனிப்பயன் விலை",null,"Quoted after flavour, packaging and margin validation","சுவை, பேக்கிங் மற்றும் மார்ஜின் சோதனைக்குப் பிறகு விலை"),
  ]},
  "party-brownie-tubs": { decision:"quotation", options:[
    option("classic-10","10 Classic Brownie Tubs","10 கிளாசிக் பிரௌனி டப்கள்",3750,"₹375 per Tub · one coordinated finish","ஒரு டப்புக்கு ₹375 · ஒருங்கிணைந்த அலங்காரம்"),
    option("loaded-10","10 Loaded Brownie Tubs","10 லோடெட் பிரௌனி டப்கள்",4550,"₹455 per Tub · topping validation required","ஒரு டப்புக்கு ₹455 · டாப்பிங் சோதனை தேவை"),
    option("larger","25+ Tubs · custom proposal","25+ டப்கள் · தனிப்பயன் விலை",null,"Quoted after topping, seal and delivery validation","டாப்பிங், சீல் மற்றும் டெலிவரி சோதனைக்குப் பிறகு விலை"),
  ]},
  "occasion-brownie-cake": { decision:"quotation", options:[
    option("classic-500","500 g · classic occasion finish","500 கிராம் · கிளாசிக் நிகழ்ச்சி அலங்காரம்",1590,"Short message and restrained finish included","குறுகிய செய்தி மற்றும் அளவான அலங்காரம் சேர்க்கப்பட்டுள்ளது"),
    option("reserve-500","500 g · reserve occasion finish","500 கிராம் · ரிசர்வ் நிகழ்ச்சி அலங்காரம்",1790,"Walnut or pistachio-led finish","வால்நட் அல்லது பிஸ்தா அலங்காரம்"),
    option("classic-1kg","1 kg · classic occasion finish","1 கிலோ · கிளாசிக் நிகழ்ச்சி அலங்காரம்",2850,"Recommended for a fuller gathering","பெரிய நிகழ்ச்சிக்கான பரிந்துரை"),
    option("reserve-1kg","1 kg · reserve occasion finish","1 கிலோ · ரிசர்வ் நிகழ்ச்சி அலங்காரம்",3250,"Premium nut finish; custom topper separate","பிரீமியம் நட் அலங்காரம்; தனிப்பயன் டாப்பர் கூடுதல்"),
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
  "whole-brownie-tin",
  "party-single-brownies",
  "party-brownie-tins",
  "party-brownie-tubs",
  "occasion-brownie-cake",
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
export const getMinimumOrderQuantity = (productId:string, optionId:string) => {
  if (productId !== "corporate-mini-box") return 1;
  if (optionId === "tier-100") return 100;
  if (optionId === "tier-50") return 50;
  return 25;
};
export const decisionLabel: Record<PriceDecision, { en:string; ta:string }> = {
  approve:{ en:"Recommended for approval", ta:"அனுமதிக்க பரிந்துரை" },
  conditional:{ en:"Conditional — validation required", ta:"நிபந்தனை — சோதனை தேவை" },
  quotation:{ en:"Quotation rules proposed", ta:"விலை மதிப்பீட்டு விதிகள்" },
};
