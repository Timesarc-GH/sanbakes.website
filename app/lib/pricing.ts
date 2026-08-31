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
  options: PricingOption[];
};

const option = (id:string, label:string, labelTa:string, price:number|null, note:string, noteTa:string): PricingOption => ({ id, label, labelTa, price, note, noteTa });

export const productPricing: Record<string, ProductPricing> = {
  "dark-cacao-sea-salt": { options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",590,"Six generous pieces for a focused tasting","சுவைத்து மகிழ ஆறு பெரிய துண்டுகள்"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",860,"Nine pieces for sharing or gifting","பகிர்வதற்கும் பரிசளிப்பதற்கும் ஒன்பது துண்டுகள்"),
  ]},
  "ragi-no-01": { options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",590,"Six dark-cacao and ragi brownie pieces","ஆறு டார்க் காகாவ் மற்றும் ராகி பிரௌனி துண்டுகள்"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",860,"Nine pieces for sharing or gifting","பகிர்வதற்கும் பரிசளிப்பதற்கும் ஒன்பது துண்டுகள்"),
  ]},
  "walnut-reserve": { options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",620,"Toasted walnut through every piece","ஒவ்வொரு துண்டிலும் வறுத்த வால்நட்"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",890,"Nine-piece Walnut Reserve collection","ஒன்பது துண்டு வால்நட் ரிசர்வ் தொகுப்பு"),
  ]},
  "pista-rose-cardamom": { options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",620,"Premium pistachio-led finish","பிரீமியம் பிஸ்தா அலங்காரம்"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",890,"Recommended premium gifting format","பிரீமியம் பரிசளிப்பு அளவு"),
  ]},
  "biscoff-crunch": { options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",620,"Caramelised biscuit crunch finish","கரமேலைஸ் செய்யப்பட்ட பிஸ்கட் கிரஞ்ச் அலங்காரம்"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",905,"Nine pieces for sharing or gifting","பகிர்வதற்கும் பரிசளிப்பதற்கும் ஒன்பது துண்டுகள்"),
  ]},
  "chocolate-wafer-crunch": { options:[
    option("box-6","Box of 6 pieces","6 துண்டு பெட்டி",620,"Chocolate finish with crisp wafer contrast","மொறுமொறுப்பான வேஃபருடன் சாக்லேட் அலங்காரம்"),
    option("box-9","Box of 9 pieces","9 துண்டு பெட்டி",905,"Nine pieces for sharing or gifting","பகிர்வதற்கும் பரிசளிப்பதற்கும் ஒன்பது துண்டுகள்"),
  ]},
  "strawberry-cacao": { options:[
    option("box-6","Seasonal box of 6","பருவகால 6 துண்டு பெட்டி",650,"Available on selected seasonal dates","தேர்ந்தெடுக்கப்பட்ட பருவகால தேதிகளில் கிடைக்கும்"),
    option("box-9","Seasonal box of 9","பருவகால 9 துண்டு பெட்டி",950,"Nine-piece seasonal sharing box","ஒன்பது துண்டு பருவகால பகிர்வு பெட்டி"),
  ]},
  "signature-discovery-box": { options:[
    option("house-six","House Six · one of each listed flavour","ஹவுஸ் சிக்ஸ் · பட்டியலிட்ட ஒவ்வொரு சுவையிலும் ஒன்று",590,"Dark Cacao, Walnut, Pista, Strawberry, Caramelised Biscuit and Chocolate Wafer","டார்க் காகாவ், வால்நட், பிஸ்தா, ஸ்ட்ராபெரி, கரமேலைஸ் பிஸ்கட் மற்றும் சாக்லேட் வேஃபர்"),
    option("ragi-walnut-3-3","3 Ragi + 3 Walnut Reserve","3 ராகி + 3 வால்நட் ரிசர்வ்",620,"Two-flavour composition with three pieces of each","இரண்டு சுவைகளிலும் தலா மூன்று துண்டுகள்"),
    option("choose-two-3-3","Choose 2 available flavours · 3+3","கிடைக்கும் 2 சுவைகள் · 3+3",620,"Choose from the flavours available for your date","உங்கள் தேதியில் கிடைக்கும் சுவைகளில் தேர்ந்தெடுக்கலாம்"),
  ]},
  "reserve-collection": { options:[
    option("house-nine","House Nine · curated assortment","ஹவுஸ் நைன் · தேர்ந்தெடுத்த கலவை",860,"Six flavour identities with three considered repeats","ஆறு சுவைகளுடன் கவனமாக தேர்ந்தெடுத்த மூன்று மறுபதிப்புகள்"),
    option("ragi-walnut-pista-3-3-3","3 Ragi + 3 Walnut + 3 Pista","3 ராகி + 3 வால்நட் + 3 பிஸ்தா",860,"Three-flavour composition with three pieces of each","மூன்று சுவைகளிலும் தலா மூன்று துண்டுகள்"),
    option("six-flavour-nine","Six-flavour mix · 9 pieces","ஆறு சுவை கலவை · 9 துண்டுகள்",890,"One of each available flavour plus three customer-selected repeats","கிடைக்கும் ஒவ்வொரு சுவையிலும் ஒன்று மற்றும் வாடிக்கையாளர் தேர்ந்தெடுக்கும் மூன்று மறுபதிப்புகள்"),
  ]},
  "brownie-tin-3-piece": { options:[
    option("one-flavour-classic","1 flavour · 3 Classic pieces","1 சுவை · 3 கிளாசிக் துண்டுகள்",310,"Three matching Dark Cacao or Ragi pieces","ஒரே டார்க் காகாவ் அல்லது ராகி சுவையில் மூன்று துண்டுகள்"),
    option("two-flavour-duo","2 flavours · 2+1 composition","2 சுவைகள் · 2+1 கலவை",330,"Choose two confirmed flavours; premium availability applies","உறுதி செய்யப்பட்ட இரண்டு சுவைகளைத் தேர்வு செய்யலாம்; பிரீமியம் கிடைப்புக்கு உட்பட்டது"),
    option("three-flavour-trio","3 flavours · 1+1+1 composition","3 சுவைகள் · 1+1+1 கலவை",330,"Choose three confirmed flavours for one Tin","ஒரு டினுக்கு உறுதி செய்யப்பட்ட மூன்று சுவைகளைத் தேர்வு செய்யலாம்"),
    option("one-flavour-premium","1 premium flavour · 3 pieces","1 பிரீமியம் சுவை · 3 துண்டுகள்",360,"Walnut, Pista or another flavour available for your date","வால்நட், பிஸ்தா அல்லது உங்கள் தேதியில் கிடைக்கும் மற்றொரு சுவை"),
  ]},
  "whole-brownie-tin": { options:[
    option("one-topping","1 whole Brownie Tin · 1 flavour topping","1 முழு பிரௌனி டின் · 1 சுவை டாப்பிங்",360,"One continuous brownie with one confirmed topping across the full Tin","ஒரே தொடர்ச்சியான பிரௌனியில் உறுதி செய்யப்பட்ட ஒரு டாப்பிங்"),
    option("two-toppings","1 whole Brownie Tin · 2 flavour-topping sections","1 முழு பிரௌனி டின் · 2 சுவை டாப்பிங் பகுதிகள்",360,"Two topping flavours split across one continuous brownie—not two pieces","இரண்டு துண்டுகள் அல்ல; ஒரே தொடர்ச்சியான பிரௌனியில் இரண்டு சுவை டாப்பிங் பகுதிகள்"),
    option("three-toppings","1 whole Brownie Tin · 3 flavour-topping sections","1 முழு பிரௌனி டின் · 3 சுவை டாப்பிங் பகுதிகள்",360,"Three topping flavours arranged across one continuous brownie—not three pieces","மூன்று துண்டுகள் அல்ல; ஒரே தொடர்ச்சியான பிரௌனியில் மூன்று சுவை டாப்பிங் பகுதிகள்"),
  ]},
  "classic-brownie-tub": { options:[
    option("single-tub","1 regular tub · approx. 250 g","1 சாதாரண டப் · சுமார் 250 கிராம்",270,"Classic chocolate-led drizzle","கிளாசிக் சாக்லேட் டிரிசில்"),
    option("tub-duo","Duo · 2 regular tubs","2 சாதாரண டப்கள்",490,"Two Classic Tubs in one order","ஒரே ஆர்டரில் இரண்டு கிளாசிக் டப்கள்"),
  ]},
  "loaded-brownie-tub": { options:[
    option("single-tub","1 loaded tub · approx. 250 g","1 லோடெட் டப் · சுமார் 250 கிராம்",270,"Loaded chocolate-and-crunch finish","லோடெட் சாக்லேட் மற்றும் கிரஞ்ச் அலங்காரம்"),
    option("tub-duo","Duo · 2 loaded tubs","2 லோடெட் டப்கள்",490,"Choose the topping available for your date","உங்கள் தேதியில் கிடைக்கும் டாப்பிங்கைத் தேர்ந்தெடுக்கலாம்"),
  ]},
  "ragi-cacao-tea-cake": { options:[
    option("loaf-450","1 loaf · approx. 450 g","1 லோஃப் · சுமார் 450 கிராம்",420,"Ragi and dark cacao loaf","ராகி மற்றும் டார்க் காகாவ் லோஃப்"),
    option("loaf-duo","Gift duo · 2 × approx. 450 g","பரிசு டூயோ · 2 × சுமார் 450 கிராம்",790,"One presentation, one delivery address","ஒரே பேக்கிங் மற்றும் ஒரு டெலிவரி முகவரி"),
  ]},
  "pista-cardamom-tea-cake": { options:[
    option("loaf-450","1 loaf · approx. 450 g","1 லோஃப் · சுமார் 450 கிராம்",420,"Pistachio and cardamom loaf","பிஸ்தா மற்றும் ஏலக்காய் லோஃப்"),
    option("loaf-duo","Gift duo · 2 × approx. 450 g","பரிசு டூயோ · 2 × சுமார் 450 கிராம்",790,"One presentation, one delivery address","ஒரே பேக்கிங் மற்றும் ஒரு டெலிவரி முகவரி"),
  ]},
  "birthday-250": { options:[
    option("classic-finish","250 g · classic finish","250 கிராம் · கிளாசிக் அலங்காரம்",450,"Short message included","குறுகிய செய்தி சேர்க்கப்பட்டுள்ளது"),
    option("reserve-finish","250 g · reserve nut finish","250 கிராம் · ரிசர்வ் நட் அலங்காரம்",590,"Premium walnut/pistachio finish","பிரீமியம் வால்நட்/பிஸ்தா அலங்காரம்"),
  ]},
  "birthday-500": { options:[
    option("classic-finish","500 g · classic finish","500 கிராம் · கிளாசிக் அலங்காரம்",860,"Short message included","குறுகிய செய்தி சேர்க்கப்பட்டுள்ளது"),
    option("reserve-finish","500 g · reserve nut finish","500 கிராம் · ரிசர்வ் நட் அலங்காரம்",950,"Premium walnut/pistachio finish","பிரீமியம் வால்நட்/பிஸ்தா அலங்காரம்"),
  ]},
  "birthday-1kg": { options:[
    option("classic-finish","1 kg · classic finish","1 கிலோ · கிளாசிக் அலங்காரம்",1150,"Short message included","குறுகிய செய்தி சேர்க்கப்பட்டுள்ளது"),
    option("reserve-finish","1 kg · reserve nut finish","1 கிலோ · ரிசர்வ் நட் அலங்காரம்",1300,"Premium walnut/pistachio finish","பிரீமியம் வால்நட்/பிஸ்தா அலங்காரம்"),
  ]},
  "mini-brownie-tower": { options:[
    option("tower-12","Tower of 12 pieces","12 துண்டு டவர்",690,"Pickup preferred for the tower format","டவர் வடிவத்திற்கு பிக்கப் பரிந்துரைக்கப்படுகிறது"),
    option("tower-18","Tower of 18 pieces","18 துண்டு டவர்",780,"Delivery suitability is confirmed with your address","உங்கள் முகவரியுடன் டெலிவரி பொருத்தம் உறுதி செய்யப்படும்"),
  ]},
  "cupcake-ragi": { options:[
    option("box-6","Box of 6 cupcakes","6 கப் கேக் பெட்டி",650,"Dark Cacao Ragi · preorder at least 3 days ahead","டார்க் காகாவ் ராகி · குறைந்தது 3 நாட்கள் முன்பதிவு"),
    option("box-9","Box of 9 cupcakes","9 கப் கேக் பெட்டி",780,"Single flavour · preorder at least 5 days ahead","ஒரே சுவை · குறைந்தது 5 நாட்கள் முன்பதிவு"),
    option("box-12","Box of 12 cupcakes","12 கப் கேக் பெட்டி",910,"Single flavour and finish · preorder at least 5 days ahead","ஒரே சுவை மற்றும் அலங்காரம் · குறைந்தது 5 நாட்கள் முன்பதிவு"),
  ]},
  "cupcake-pista": { options:[
    option("box-6","Box of 6 cupcakes","6 கப் கேக் பெட்டி",520,"Pista Cardamom · preorder at least 3 days ahead","பிஸ்தா ஏலக்காய் · குறைந்தது 3 நாட்கள் முன்பதிவு"),
    option("box-9","Box of 9 cupcakes","9 கப் கேக் பெட்டி",780,"Single flavour · preorder at least 5 days ahead","ஒரே சுவை · குறைந்தது 5 நாட்கள் முன்பதிவு"),
    option("box-12","Box of 12 cupcakes","12 கப் கேக் பெட்டி",910,"Single flavour and finish · preorder at least 5 days ahead","ஒரே சுவை மற்றும் அலங்காரம் · குறைந்தது 5 நாட்கள் முன்பதிவு"),
  ]},
  "cupcake-discovery": { options:[
    option("box-6","Discovery box of 6 · one of each","6 டிஸ்கவரி பெட்டி · ஒவ்வொரு சுவையிலும் ஒன்று",520,"Six flavours · one of each · preorder at least 3 days ahead","ஆறு சுவைகள் · ஒவ்வொன்றிலும் ஒன்று · குறைந்தது 3 நாட்கள் முன்பதிவு"),
    option("box-9","Discovery box of 9 · six flavours + 3 repeats","9 டிஸ்கவரி பெட்டி · ஆறு சுவைகள் + 3 மறுபதிப்புகள்",780,"Customer selects three repeats after availability confirmation","கிடைப்பை உறுதி செய்த பிறகு மூன்று மறுபதிப்புகளைத் தேர்வு செய்யலாம்"),
    option("box-12","Discovery box of 12 · two of each","12 டிஸ்கவரி பெட்டி · ஒவ்வொரு சுவையிலும் இரண்டு",910,"Balanced paired assortment across all six flavours · preorder at least 5 days ahead","ஆறு சுவைகளிலும் சமமான ஜோடி கலவை · குறைந்தது 5 நாட்கள் முன்பதிவு"),
  ]},
  "corporate-mini-box": { options:[
    option("tier-25-ragi-walnut","25–49 boxes · 2 Ragi + 2 Walnut · per box","25–49 பெட்டிகள் · 2 ராகி + 2 வால்நட் · ஒரு பெட்டி",490,"Two Ragi and two Walnut pieces with one common message","இரண்டு ராகி மற்றும் இரண்டு வால்நட் துண்டுகளுடன் ஒரு பொதுவான செய்தி"),
    option("tier-25-four-flavour","25–49 boxes · 4-flavour curated · per box","25–49 பெட்டிகள் · 4 சுவை கலவை · ஒரு பெட்டி",490,"One of four confirmed flavours; premium ingredients included","உறுதி செய்யப்பட்ட நான்கு சுவைகளில் ஒவ்வொன்றும் ஒன்று; பிரீமியம் பொருட்கள் சேர்க்கப்பட்டுள்ளன"),
    option("tier-50","50–99 boxes · 2 Ragi + 2 Walnut · per box","50–99 பெட்டிகள் · 2 ராகி + 2 வால்நட் · ஒரு பெட்டி",490,"Two Ragi and two Walnut pieces with one common message","இரண்டு ராகி மற்றும் இரண்டு வால்நட் துண்டுகளுடன் ஒரு பொதுவான செய்தி"),
    option("tier-100","100+ boxes · 2 Ragi + 2 Walnut · per box","100+ பெட்டிகள் · 2 ராகி + 2 வால்நட் · ஒரு பெட்டி",490,"One coordinated composition and one common message","ஒருங்கிணைந்த ஒரே கலவை மற்றும் ஒரு பொதுவான செய்தி"),
  ]},
  "seasonal-hamper": { options:[
    option("classic-hamper","Classic seasonal hamper","கிளாசிக் பருவகால ஹாம்பர்",1150,"Final contents fixed for each season","ஒவ்வொரு பருவத்திற்கும் இறுதி உள்ளடக்கம் நிர்ணயிக்கப்படும்"),
    option("reserve-hamper","Reserve seasonal hamper","ரிசர்வ் பருவகால ஹாம்பர்",1490,"Premium tin/box composition","பிரீமியம் டின்/பெட்டி தொகுப்பு"),
  ]},
  "bespoke-corporate": { options:[
    option("proposal","Custom proposal · starts at 25 individually packed brownies","தனிப்பயன் திட்டம் · தனித்தனி பேக்கிங்கில் 25 பிரௌனிகள் முதல்",null,"Allow 7–21 calendar days depending on branding and delivery addresses","பிராண்டிங் மற்றும் டெலிவரி முகவரிகளுக்கு ஏற்ப 7–21 நாட்கள் தேவை"),
  ]},
  "party-single-brownies": { options:[
    option("classic-25","25 Classic brownies · individually packed","25 கிளாசிக் பிரௌனிகள் · தனித்தனி பேக்கிங்",2400,"25-piece bundle · up to two flavours","25 துண்டு தொகுப்பு · இரண்டு சுவைகள் வரை"),
    option("reserve-25","25 Reserve / assorted brownies · individually packed","25 ரிசர்வ் / கலவை பிரௌனிகள் · தனித்தனி பேக்கிங்",2700,"25-piece Reserve bundle · up to two flavours","25 துண்டு ரிசர்வ் தொகுப்பு · இரண்டு சுவைகள் வரை"),
    option("classic-50","50 Classic brownies · individually packed","50 கிளாசிக் பிரௌனிகள் · தனித்தனி பேக்கிங்",4600,"50-piece event bundle · up to four flavours","50 துண்டு நிகழ்ச்சி தொகுப்பு · நான்கு சுவைகள் வரை"),
    option("classic-100","100 Classic brownies · individually packed","100 கிளாசிக் பிரௌனிகள் · தனித்தனி பேக்கிங்",9200,"100-piece event bundle · 10–14 day lead time","100 துண்டு நிகழ்ச்சி தொகுப்பு · 10–14 நாட்கள் முன்னதாக"),
  ]},
  "party-brownie-tins": { options:[
    option("piece-classic-10","10 Classic three-piece Tins","10 கிளாசிக் மூன்று-துண்டு டின்கள்",3200,"10-Tin bundle · three separate matching brownie pieces","10 டின் தொகுப்பு · மூன்று தனித்தனி ஒரே சுவை பிரௌனி துண்டுகள்"),
    option("piece-assorted-10","10 Curated assorted three-piece Tins","10 தேர்ந்தெடுத்த கலவை மூன்று-துண்டு டின்கள்",3200,"10-Tin bundle · three separate pieces in a curated mix","10 டின் தொகுப்பு · தேர்ந்தெடுத்த கலவையில் மூன்று தனித்தனி துண்டுகள்"),
    option("whole-single-10","10 Whole Brownie Tins · 1 topping flavour","10 முழு பிரௌனி டின்கள் · 1 டாப்பிங் சுவை",3200,"10-Tin bundle · one continuous brownie with one coordinated topping","10 டின் தொகுப்பு · ஒரே டாப்பிங்குடன் ஒரு தொடர்ச்சியான பிரௌனி"),
    option("whole-multi-10","10 Whole Brownie Tins · 2 or 3 topping sections","10 முழு பிரௌனி டின்கள் · 2 அல்லது 3 டாப்பிங் பகுதிகள்",3200,"10-Tin bundle · one continuous brownie with divided topping sections","10 டின் தொகுப்பு · பிரிக்கப்பட்ட டாப்பிங் பகுதிகளுடன் ஒரு தொடர்ச்சியான பிரௌனி"),
    option("larger","25+ Tins · coordinated event order","25+ டின்கள் · ஒருங்கிணைந்த நிகழ்ச்சி ஆர்டர்",7800,"Flavour and packaging details are confirmed with the event order","நிகழ்ச்சி ஆர்டருடன் சுவை மற்றும் பேக்கிங் விவரங்கள் உறுதி செய்யப்படும்"),
  ]},
  "party-brownie-tubs": { options:[
    option("classic-10","10 Classic Brownie Tubs","10 கிளாசிக் பிரௌனி டப்கள்",2300,"10-Tub bundle · one coordinated finish","10 டப் தொகுப்பு · ஒருங்கிணைந்த அலங்காரம்"),
    option("loaded-10","10 Loaded Brownie Tubs","10 லோடெட் பிரௌனி டப்கள்",2300,"10-Tub bundle with one coordinated topping","ஒரே டாப்பிங்குடன் 10 டப் தொகுப்பு"),
    option("larger","25+ Tubs · coordinated event order","25+ டப்கள் · ஒருங்கிணைந்த நிகழ்ச்சி ஆர்டர்",5500,"Topping, presentation and delivery details are confirmed with the order","ஆர்டருடன் டாப்பிங், பேக்கிங் மற்றும் டெலிவரி விவரங்கள் உறுதி செய்யப்படும்"),
  ]},
  "occasion-brownie-cake": { options:[
    option("classic-500","500 g · classic occasion finish","500 கிராம் · கிளாசிக் நிகழ்ச்சி அலங்காரம்",860,"Short message and restrained finish included","குறுகிய செய்தி மற்றும் அளவான அலங்காரம் சேர்க்கப்பட்டுள்ளது"),
    option("reserve-500","500 g · reserve occasion finish","500 கிராம் · ரிசர்வ் நிகழ்ச்சி அலங்காரம்",905,"Walnut or pistachio-led finish","வால்நட் அல்லது பிஸ்தா அலங்காரம்"),
    option("classic-1kg","1 kg · classic occasion finish","1 கிலோ · கிளாசிக் நிகழ்ச்சி அலங்காரம்",1400,"Recommended for a fuller gathering","பெரிய நிகழ்ச்சிக்கான பரிந்துரை"),
    option("reserve-1kg","1 kg · reserve occasion finish","1 கிலோ · ரிசர்வ் நிகழ்ச்சி அலங்காரம்",1400,"Premium nut finish; custom topper separate","பிரீமியம் நட் அலங்காரம்; தனிப்பயன் டாப்பர் கூடுதல்"),
  ]},
};

export const priceRevisionPercent = 0;
export const priceRevisionExclusions = new Set<string>();
export const directPlanningPriceIds = new Set(Object.keys(productPricing));

export const formatPrice = (price:number|null) => price === null ? "By quotation" : new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(price);
export const getPriceRangeForProducts = (productIds:string[]) => {
  const prices = productIds.flatMap((productId) => productPricing[productId]?.options.map((pricingOption) => pricingOption.price).filter((price): price is number => price !== null) ?? []);
  if (prices.length === 0) return null;
  return { minimum: Math.min(...prices), maximum: Math.max(...prices) };
};
export const getProductPriceRange = (productId:string) => getPriceRangeForProducts([productId]);
export const formatPriceRangeForProducts = (productIds:string[]) => {
  const range = getPriceRangeForProducts(productIds);
  if (!range) return "By quotation";
  return range.minimum === range.maximum ? formatPrice(range.minimum) : `${formatPrice(range.minimum)}–${formatPrice(range.maximum)}`;
};
export const formatProductPriceRange = (productId:string) => formatPriceRangeForProducts([productId]);
export const formatStartingPriceForProducts = (productIds:string[]) => {
  const range = getPriceRangeForProducts(productIds);
  return formatPrice(range?.minimum ?? null);
};
export const makeSelectionKey = (productId:string, optionId:string) => `${productId}::${optionId}`;
export const parseSelectionKey = (key:string) => { const [productId, optionId] = key.split("::"); return { productId, optionId }; };
export const getPricing = (productId:string) => productPricing[productId];
export const getMinimumOrderQuantity = (productId:string, optionId:string) => {
  if (productId !== "corporate-mini-box") return 1;
  if (optionId === "tier-100") return 100;
  if (optionId === "tier-50") return 50;
  return 25;
};
