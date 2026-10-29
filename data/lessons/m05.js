// Modul 5 — Gameplay tizimlari (Kun 25–30)
window.UE_LESSONS.push(
{
  d: 25, t: "Line Trace va Interaction tizimi", time: "3 soat",
  g: "Nur (trace) yordamida o'yinchi qarab turgan obyektni aniqlash va professional interaction tizimini qurish.",
  learn: ["Line Trace by Channel", "Sphere/Box Trace", "Multi Trace", "Hit Result tahlili", "Kameradan trace", "Fokus va highlight"],
  body: [
    { h: "Trace nima?",
      p: ["**Trace** — dunyoga ko'rinmas nur yoki shakl otib, nimaga tegishini tekshirish. U o'q otish, interaksiya, yer balandligini aniqlash, AI ko'rish chizig'i va boshqa yuzlab vazifalarda ishlatiladi.",
          "Overlap usulidan (Kun 15) farqi: trace aynan o'yinchi **qarab turgan** obyektni topadi. Shu sababli zamonaviy o'yinlarda interaction asosan trace bilan quriladi."],
      table: [["Node", "Vazifasi"],
              ["Line Trace By Channel", "Ingichka nur — birinchi Block qilgan obyekt"],
              ["Sphere Trace By Channel", "Qalin nur (radiusli) — kichik obyektlarni ham oson topadi"],
              ["Box / Capsule Trace", "Boshqa shakllar"],
              ["Multi... variantlari", "Yo'ldagi barcha obyektlar (Overlap javob berganlar ham)"],
              ["...For Objects", "Kanal emas, Object Type bo'yicha"]] },
    { h: "Kameradan trace",
      graph: {
        t: "BP_Hero · TraceForInteractable",
        n: [
          { id: "en", k: "entry", t: "Trace For Interactable", x: 0, y: 0, o: [">"] },
          { id: "cam", k: "var", t: "FollowCamera", x: 0, y: 2.4, o: ["obj"] },
          { id: "wl", k: "pure", t: "Get World Location", x: 1, y: 2.2, i: ["obj Target"], o: ["vec Return Value"], s: 1 },
          { id: "fv", k: "pure", t: "Get Forward Vector", x: 1, y: 3.8, i: ["obj Target"], o: ["vec Return Value"] },
          { id: "mul", k: "op", t: "×", x: 2, y: 4, i: ["vec", "float = 550.0"], o: ["vec"] },
          { id: "add", k: "op", t: "+", x: 2, y: 2.4, i: ["vec", "vec"], o: ["vec"], s: 2 },
          { id: "mk", k: "pure", t: "Make Array", x: 2, y: 5.6, i: ["obj [0] = self"], o: ["obj[] Array"] },
          { id: "lt", k: "func", t: "Line Trace By Channel", x: 3, y: 0, i: [">", "vec Start", "vec End", "enum Trace Channel = Visibility", "bool Trace Complex", "obj[] Actors to Ignore", "enum Draw Debug Type = For One Frame"], o: [">", "struct Out Hit", "bool Return Value"], s: 3 },
          { id: "bh", k: "pure", t: "Break Hit Result", x: 4, y: 2.6, i: ["struct Hit"], o: ["bool Blocking Hit", "float Distance", "vec Location", "vec Impact Normal", "obj Hit Actor", "obj Hit Component"], s: 4 },
          { id: "r", k: "ret", t: "Return Node", x: 5, y: 0, i: [">", "obj Hit Actor"] }
        ],
        w: ["en.0-lt.0", "cam.0-wl.0", "cam.0-fv.0", "fv.0-mul.0", "wl.0-add.0", "mul.0-add.1", "wl.0-lt.1", "add.0-lt.2", "mk.0-lt.5", "lt.0-r.0", "lt.1-bh.0", "bh.4-r.1"],
        how: ["Start — kamera joylashuvi, End — Start + kamera oldinga yo'nalishi × masofa.",
              "[[Line Trace By Channel]]: **Draw Debug Type = For One Frame** — sinash paytida nurni ko'rasiz (qizil — tegmadi, yashil — tegdi).",
              "**Actors to Ignore** ga [[Make Array]] (Self) — nur o'yinchining o'ziga tegmasin.",
              "**Out Hit** dan [[Break Hit Result]] — tegilgan Actor, joy, normal va boshqalar."] },
      tip: "TPS kamerada nur personaj orqasidan boshlanadi va personaj ortidagi obyektlarni topishi mumkin. Start'ni kameradan Arm Length qadar oldinga suring yoki masofani tekshiring: Hit Location va personaj orasidagi masofa ≤ 250." },
    { h: "Interaction tizimi arxitekturasi",
      steps: ["Har 0.1 s da (Timer — Tick shart emas) `TraceForInteractable` chaqiriladi.",
              "Topilgan Actor `BPI_Interactable` ni amalga oshirsa — u `FocusedActor` bo'ladi.",
              "`FocusedActor` o'zgarganda: eski obyektdan highlight olib tashlanadi, yangisiga qo'yiladi, UI matni yangilanadi (`GetInteractText`).",
              "E bosilganda faqat `FocusedActor` ga Interact message yuboriladi."],
      bpt: "Mantiq (psevdokod)", bp: `[Timer 0.1s: UpdateFocus]
   NewFocus ← (Hit Actor implements BPI_Interactable) ? Hit Actor : None
   [Branch] NewFocus != FocusedActor
      True ──▶ [Is Valid FocusedActor] ──▶ [Set Render Custom Depth] false
           ──▶ FocusedActor = NewFocus
           ──▶ [Is Valid] ──▶ [Set Render Custom Depth] true
           ──▶ [Call OnFocusChanged] (UI uchun)` },
    { h: "Highlight (kontur)",
      p: "Obyektni ajratib ko'rsatishning oddiy usuli — **Custom Depth**: mesh'da [[Set Render Custom Depth]] = true, Post Process Volume'da (Infinite Extent ✔) esa kontur materiali. Material'ni hozircha tayyor olish mumkin (Fab'da bepul «outline» paketlari bor) yoki 9-modulda o'zingiz yasaysiz.",
      tip: "Eng oddiy alternativ: fokuslangan obyekt Material Instance'ining `Emissive` parametrini oshirish (Kun 50)." },
    { h: "Hit Result — nimani beradi?",
      table: [["Maydon", "Foydalanish"],
              ["Hit Actor / Component", "Kimga tegdi"],
              ["Location / Impact Point", "Qayerga tegdi — effekt va o'q izi uchun"],
              ["Impact Normal", "Sirt yo'nalishi — dekalni sirtga moslab burish uchun"],
              ["Phys Mat", "Fizik material — qadam ovozi va effekt turi (tosh, yog'och, metall)"],
              ["Bone Name", "Skelet suyagi — headshot uchun"],
              ["Distance", "Masofa"]] },
    { h: "Amaliy topshiriq",
      steps: ["{{Project Settings → Collision → New Trace Channel}}: `Interaction`, Default Response = Ignore. Interaktiv obyektlar mesh'ida bu kanalni Block qiling.",
              "`BP_Hero` da Timer asosidagi `UpdateFocus` va E → Interact ni yozing (overlap usulini olib tashlang).",
              "Kun 18 dagi barcha obyektlar (eshik, sandiq, tugma) endi qarash orqali ishlasin.",
              "Fokus paytida obyekt yorqinroq ko'rinsin (Custom Depth yoki Emissive).",
              "Print String bilan `GetInteractText` chiqsin (UI'ni Kun 32 da qilamiz)."] }
  ],
  check: ["Line va Sphere trace farqini bilaman", "Kameradan to'g'ri trace qila olaman", "Hit Result'ni Break qila olaman", "O'z Trace Channel'imni yaratdim", "Fokus tizimi Timer bilan ishlaydi"],
  err: [["Trace hech narsaga tegmayapti", "Obyekt tanlangan kanalni Block qilmayapti. Draw Debug'ni yoqing: qizil — tegmadi, yashil — tegdi."],
        ["Trace o'yinchining o'ziga tegyapti", "Actors to Ignore'ga Self qo'shing yoki {{Ignore Self}} ✔."]],
  ch: "Fokuslangan obyekt ustida «E» tugmasi tasviri suzib tursin: obyektga **Widget Component** (Screen space) qo'shing va faqat fokusda ko'rinadigan qiling. (UMG'ni Kun 31 da boshlaymiz — oldindan sinab ko'ring.)",
  quiz: [["Trace qaysi javob turida to'xtaydi?", ["Ignore", "Overlap", "Block", "Har qanday"], 2, "Single trace birinchi Block'da to'xtaydi."],
         ["Sirt yo'nalishini qaysi maydon beradi?", ["Location", "Impact Normal", "Distance", "Bone Name"], 1, "Impact Normal — sirtga perpendikulyar vektor."],
         ["Interaction trace uchun Tick o'rniga yaxshiroq:", ["Delay", "Timer (0.1 s)", "Loop", "Construction Script"], 1, "Sekundiga 10 marta yetarli."]]
},
{
  d: 26, t: "Damage tizimi va Health", time: "2–3 soat",
  g: "Unreal'ning o'rnatilgan Damage tizimi bilan zarar berish, qabul qilish, o'lim va qayta tug'ilish.",
  learn: ["Apply Damage / Point / Radial Damage", "Event AnyDamage, PointDamage", "Damage Type klasslari", "Instigator va Damage Causer", "O'lim: ragdoll", "Respawn GameMode orqali"],
  body: [
    { h: "Unreal Damage tizimi",
      p: "Unreal'da tayyor zarar tizimi bor: zarar beruvchi [[Apply Damage]] chaqiradi, oluvchida esa [[Event AnyDamage]] ishga tushadi. Bu ham Interface kabi ishlaydi: beruvchi oluvchining turini bilishi shart emas.",
      table: [["Beruvchi node", "Oluvchi event", "Qachon"],
              ["Apply Damage", "Event AnyDamage", "Oddiy zarar"],
              ["Apply Point Damage", "Event PointDamage (+AnyDamage)", "O'q — qayerga tekkani, suyak nomi bilan"],
              ["Apply Radial Damage (with Falloff)", "Event RadialDamage (+AnyDamage)", "Portlash — masofaga qarab kamayadi"]] },
    { h: "Parametrlar",
      table: [["Pin", "Ma'nosi"],
              ["Damaged Actor", "Kimga"],
              ["Base Damage", "Qancha"],
              ["Event Instigator", "Qaysi **Controller** zarar berdi (ball va «kim o'ldirdi» uchun)"],
              ["Damage Causer", "Qaysi **Actor** (o'q, granata, qilich)"],
              ["Damage Type Class", "Zarar turi: olov, zahar, yiqilish"]],
      graph: [{
        t: "BP_Sword · zarba berish",
        n: [
          { id: "e", k: "custom", t: "DealDamage", sub: "Custom Event", x: 0, y: 0, o: [">", "obj Hit Actor"] },
          { id: "ic", k: "pure", t: "Get Instigator Controller", x: 0, y: 2.6, i: ["obj Target = self"], o: ["obj Return Value"] },
          { id: "ad", k: "func", t: "Apply Damage", x: 1, y: 0, i: [">", "obj Damaged Actor", "float Base Damage = 25.0", "obj Event Instigator", "obj Damage Causer = self", "class Damage Type Class = DT_Physical"], o: [">", "float Return Value"], s: 1 }
        ],
        w: ["e.0-ad.0", "e.1-ad.1", "ic.0-ad.3"] },
      {
        t: "BP_Hero · zarar qabul qilish",
        n: [
          { id: "ad", k: "event", t: "Event AnyDamage", x: 0, y: 0, o: [">", "float Damage", "obj Damage Type", "obj Instigated By", "obj Damage Causer"], s: 2 },
          { id: "h", k: "var", t: "Health", x: 0, y: 4.6, o: ["float"] },
          { id: "mi", k: "op", t: "−", x: 1, y: 3.4, i: ["float", "float"], o: ["float"] },
          { id: "cl", k: "pure", t: "Clamp (Float)", x: 2, y: 3, i: ["float Value", "float Min = 0.0", "float Max = 100.0"], o: ["float Return Value"] },
          { id: "s", k: "set", t: "SET", x: 3, y: 0, i: [">", "float Health"], o: [">", "float"] },
          { id: "le", k: "op", t: "≤", x: 3, y: 3, i: ["float", "float = 0.0"], o: ["bool"] },
          { id: "br", k: "flow", t: "Branch", x: 4, y: 0, i: [">", "bool Condition"], o: ["> True", "> False"] },
          { id: "d", k: "func", t: "Die", x: 5, y: 0, i: [">", "obj Target = self"], o: [">"] }
        ],
        w: ["ad.0-s.0", "h.0-mi.0", "ad.1-mi.1", "mi.0-cl.0", "cl.0-s.1", "s.0-br.0", "s.1-le.0", "le.0-br.1", "br.0-d.0"],
        how: ["Beruvchi: [[Apply Damage]] — kimga, qancha, kim (Controller) va nima bilan (Actor).",
              "Oluvchi: o'ng tugma → [[Event AnyDamage]] — Damage qiymati keladi. Health'ni kamaytirib, 0 bo'lsa `Die`.",
              "Beruvchi oluvchining turini bilmaydi — Interface kabi ishlaydi."] }],
      warn: "Actor zarar olishi uchun uning {{Can be Damaged}} sozlamasi yoqilgan bo'lishi kerak (standartda yoqilgan). Base Damage 0 bo'lsa, event umuman chaqirilmaydi." },
    { h: "Damage Type",
      p: "Content Browser → {{Blueprint Class → DamageType}} → `DT_Fire`, `DT_Poison`, `DT_Fall`. Oluvchi [[Event AnyDamage]] da Damage Type'ni tekshiradi: masalan, olovga chidamli dushman `DT_Fire` dan yarim zarar oladi. Damage Type ichida o'zgaruvchilar ham bo'lishi mumkin (masalan `bCausesBurning`)." },
    { h: "O'lim va ragdoll",
      graph: {
        t: "BP_Hero · Event Graph",
        n: [
          { id: "d", k: "custom", t: "Die", sub: "Custom Event", x: 0, y: 0, o: [">"] },
          { id: "s", k: "set", t: "SET", x: 1, y: 0, i: [">", "bool bIsDead = true"], o: [">", "bool"] },
          { id: "di", k: "func", t: "Disable Input", x: 2, y: 0, i: [">", "obj Target = self", "obj Player Controller"], o: [">"] },
          { id: "cc", k: "func", t: "Set Collision Enabled", sub: "Capsule", x: 3, y: 0, i: [">", "obj Target", "enum New Type = No Collision"], o: [">"] },
          { id: "cp", k: "func", t: "Set Collision Profile Name", sub: "Mesh", x: 0, y: 3.4, i: [">", "obj Target", "name In Collision Profile Name = Ragdoll"], o: [">"], s: 1 },
          { id: "sp", k: "func", t: "Set Simulate Physics", sub: "Mesh", x: 1, y: 3.4, i: [">", "obj Target", "bool Simulate = true"], o: [">"], s: 2 },
          { id: "gm", k: "func", t: "Player Died", sub: "Target is BP UE Game Mode", x: 2, y: 3.4, i: [">", "obj Target", "obj Controller"], o: [">"], s: 3 }
        ],
        w: ["d.0-s.0", "s.0-di.0", "di.0-cc.0", "cc.0-cp.0", "cp.0-sp.0", "sp.0-gm.0"],
        cm: [{ t: "Boshqaruvni o'chirish", n: ["s", "di", "cc"], c: "#4a4d55" }, { t: "Ragdoll va GameMode'ga xabar", n: ["cp", "sp", "gm"], c: "#8f2121" }],
        how: ["Mesh'ni ragdoll qilish: avval collision profilini `Ragdoll` ga, keyin [[Set Simulate Physics]] ✔ — personaj «yiqiladi».",
              "Respawn'ni GameMode bajaradi: 3 s Delay → eski Pawn'ni Destroy → [[Find Player Start]] → Spawn → [[Possess]]."] },
      tip: "Respawn mantiqi Character'da emas, GameMode'da bo'lishi kerak: Character o'chib ketadi, GameMode esa qoladi. Yangi Pawn joyini [[Find Player Start]] beradi, [[Possess]] esa Controller'ga ulaydi." },
    { h: "Amaliy topshiriq",
      steps: ["`BP_Hero` ga Health/MaxHealth, AnyDamage, Die (ragdoll) qo'shing.",
              "`BP_FireZone`: ichida turganda har 0.5 s da 5 zarar (`DT_Fire`) — Timer'ni Begin/End Overlap'da yoqib-o'chiring.",
              "`BP_ExplosiveBarrel`: Damage olsa portlaydi — [[Apply Radial Damage with Falloff]] (Inner 200, Outer 600), effekt va ovoz bilan; atrofdagi boshqa bochkalar ham zanjir bo'lib portlasin.",
              "Yiqilish zarari: [[Event On Landed]] da vertikal tezlik > 1200 bo'lsa, ortiqchasiga mutanosib zarar (`DT_Fall`).",
              "GameMode'da respawn: o'lgandan 3 s keyin PlayerStart'da yangi personaj."] }
  ],
  check: ["Apply Damage va AnyDamage'ni ishlatdim", "Instigator va Causer farqini bilaman", "Radial damage bilan portlash qildim", "Ragdoll o'lim ishlaydi", "Respawn GameMode'da"],
  err: [["Ragdoll'da personaj yerdan o'tib ketadi", "Mesh collision profili `Ragdoll` bo'lsin va Skeletal Mesh'ning Physics Asset'i mavjud bo'lsin (Manny'da bor)."],
        ["Radial damage devor ortidagilarga ham tegyapti", "Apply Radial Damage'dagi {{Damage Prevention Channel}} = Visibility — devor orqasidagilar himoyalanadi."]],
  ch: "Zahar effekti: `DT_Poison` olgan nishon keyingi 5 soniya davomida har soniyada 3 zarar olib tursin (Timer + hisoblagich), bu vaqtda ekranga yashil «Zaharlangan» yozuvi chiqsin.",
  quiz: [["Portlash uchun mos node:", ["Apply Damage", "Apply Point Damage", "Apply Radial Damage", "Destroy Actor"], 2, "Radial — radius bo'yicha."],
         ["«Kim o'ldirdi» ma'lumoti qaysi pinda?", ["Damage Causer", "Event Instigator", "Damage Type", "Base Damage"], 1, "Instigator — Controller."],
         ["Respawn mantiqi qayerda bo'lgani ma'qul?", ["Character", "GameMode", "Widget", "Level Blueprint"], 1, "Character o'chadi, GameMode qoladi."]]
},
{
  d: 27, t: "Actor Component'lar: qayta ishlatiladigan tizimlar", time: "3 soat",
  g: "Mantiqni alohida Component'larga ajratib, istalgan Actor'ga «ulab» ishlatiladigan tizimlar yaratish.",
  learn: ["Actor Component va Scene Component", "Component'da o'zgaruvchi va dispatcher", "Get Owner", "Get Component by Class", "BPC_Health", "Composition vs Inheritance"],
  body: [
    { h: "Nima uchun Component?",
      p: ["Health o'yinchida ham, dushmanda ham, bochkada ham, eshikda ham kerak. Har birida qayta yozish — xatolar va takrorlanish. Yechim: **`BPC_Health`** — sog'liq mantiqini o'z ichiga olgan component. Uni istalgan Actor'ga qo'shasiz va u darhol «tirik» bo'ladi.",
          "Bu **Composition** (yig'ish) tamoyili: obyekt imkoniyatlarini meros orqali emas, kichik bo'laklar yig'indisi orqali qurish. Zamonaviy o'yin arxitekturasining asosi."],
      table: [["Tur", "Transform bormi", "Misol"],
              ["Actor Component", "Yo'q — faqat mantiq", "BPC_Health, BPC_Inventory, BPC_Stamina"],
              ["Scene Component", "Ha — joylashuvi bor", "BPC_Interactor (kamera oldida nuqta), qurol tutqichi"]] },
    { h: "BPC_Health yaratish",
      steps: ["{{Blueprint Class → Actor Component}} → `BPC_Health`.",
              "O'zgaruvchilar: `MaxHealth` (Instance Editable, 100), `Health`, `bIsDead`.",
              "Dispatcher'lar: `OnHealthChanged(NewHealth, Delta)`, `OnDeath(Killer — Controller)`.",
              "BeginPlay: Health = MaxHealth. [[Get Owner]] → [[Bind Event to OnTakeAnyDamage]] — egasining zarar event'iga obuna bo'lish!",
              "Funksiyalar: `ApplyHeal(Amount)`, `GetHealthPercent()` (Pure), `Kill()`."],
      graph: {
        t: "BPC_Health · Event Graph",
        n: [
          { id: "b", k: "event", t: "Event BeginPlay", x: 0, y: 0, o: [">"] },
          { id: "mh", k: "var", t: "MaxHealth", x: 0, y: 2, o: ["float"] },
          { id: "s", k: "set", t: "SET", x: 1, y: 0, i: [">", "float Health"], o: [">", "float"] },
          { id: "go", k: "pure", t: "Get Owner", x: 1, y: 2.6, i: ["obj Target = self"], o: ["obj Return Value"], s: 1 },
          { id: "bd", k: "func", t: "Bind Event to OnTakeAnyDamage", x: 2, y: 0, i: [">", "obj Target", "evt Event"], o: [">"], s: 2 },
          { id: "hd", k: "custom", t: "HandleDamage", sub: "Custom Event", x: 0, y: 5, o: ["evt", ">", "obj Damaged Actor", "float Damage", "obj Damage Type", "obj Instigated By"], s: 3 },
          { id: "td", k: "func", t: "Apply Damage Internal", sub: "Health kamaytirish (funksiya)", x: 1, y: 5, i: [">", "float Damage"], o: [">", "bool bDied"] },
          { id: "c1", k: "func", t: "Call On Health Changed", x: 2, y: 5, i: [">", "obj Target = self", "float New Health", "float Delta"], o: [">"], s: 4 },
          { id: "br", k: "flow", t: "Branch", x: 3, y: 5, i: [">", "bool Condition"], o: ["> True", "> False"] },
          { id: "c2", k: "func", t: "Call On Death", x: 4, y: 5, i: [">", "obj Target = self", "obj Killer"], o: [">"] }
        ],
        w: ["b.0-s.0", "mh.0-s.1", "s.0-bd.0", "go.0-bd.1", "hd.0-bd.2", "hd.1-td.0", "hd.3-td.1", "td.0-c1.0", "c1.0-br.0", "td.1-br.1", "br.0-c2.0", "hd.5-c2.2"],
        how: ["Actor Component'da ham BeginPlay bor. Health = MaxHealth.",
              "[[Get Owner]] — component biriktirilgan Actor. Undan `bind on take any damage` → [[Bind Event to OnTakeAnyDamage]].",
              "Event pinidan Custom Event `HandleDamage` — imzo avtomatik.",
              "Ichida: sog'liqni kamaytirish (alohida funksiya), `OnHealthChanged` va kerak bo'lsa `OnDeath` dispatcher'larini Call qilish."] },
      tip: "Component o'z egasining event'iga obuna bo'ladi — Actor'ning o'zida bitta node ham yozish shart emas. Actor faqat `OnDeath` ga obuna bo'lib, o'ziga xos o'lim reaksiyasini bajaradi." },
    { h: "Component'ni ishlatish",
      graph: [{
        t: "BP_Hero · Event Graph",
        n: [
          { id: "b", k: "event", t: "Event BeginPlay", x: 0, y: 0, o: [">"] },
          { id: "hc", k: "var", t: "BPC_Health", x: 0, y: 2, o: ["obj"] },
          { id: "bd", k: "func", t: "Bind Event to On Death", x: 1, y: 0, i: [">", "obj Target", "evt Event"], o: [">"] },
          { id: "od", k: "custom", t: "OnHeroDied", sub: "Custom Event", x: 0, y: 3.6, o: ["evt", ">", "obj Killer"] },
          { id: "die", k: "func", t: "Die", sub: "ragdoll", x: 1, y: 3.6, i: [">", "obj Target = self"], o: [">"] }
        ],
        w: ["b.0-bd.0", "hc.0-bd.1", "od.0-bd.2", "od.1-die.0"] },
      {
        t: "Istalgan Blueprint · boshqa Actor sog'lig'ini so'rash",
        n: [
          { id: "sa", k: "var", t: "SomeActor", x: 0, y: 0, o: ["obj"] },
          { id: "gc", k: "pure", t: "Get Component by Class", x: 1, y: 0, i: ["obj Target", "class Component Class = BPC_Health"], o: ["obj Return Value"], s: 1 },
          { id: "iv", k: "pure", t: "Is Valid", x: 2, y: 2.4, i: ["obj Object"], o: ["bool Return Value"] },
          { id: "hp", k: "pure", t: "Get Health Percent", sub: "Target is BPC Health", x: 2, y: 0, i: ["obj Target"], o: ["float Return Value"], s: 2 }
        ],
        w: ["sa.0-gc.0", "gc.0-hp.0", "gc.0-iv.0"],
        how: ["[[Get Component by Class]] — Actor'da BPC_Health bormi? Bo'lsa — havola qaytadi, yo'q bo'lsa — None.",
              "Natijani doim [[Is Valid]] bilan tekshiring, keyin component funksiyalarini chaqiring."] }],
      p2: "Health'ni har bir Actor'da o'zgaruvchi sifatida emas, component orqali so'rash — interface'siz ham universal yechim." },
    { h: "Component'lar to'plami — namuna",
      table: [["Component", "Vazifasi", "Kimda"],
              ["BPC_Health", "Sog'liq, zarar, o'lim", "Hero, Enemy, Barrel"],
              ["BPC_Stamina", "Chidamlilik", "Hero"],
              ["BPC_Interactor", "Trace, fokus, Interact", "Hero"],
              ["BPC_Inventory", "Buyumlar", "Hero, Chest, Merchant"],
              ["BPC_Loot", "O'lganda buyum tashlash", "Enemy, Crate"]],
      warn: "Component'lar bir-biriga to'g'ridan-to'g'ri bog'lanib ketmasin. Masalan BPC_Loot BPC_Health'ni Get Component by Class orqali topib, uning OnDeath'iga obuna bo'lsin — Health esa Loot haqida bilmasin." },
    { h: "Amaliy topshiriq",
      steps: ["`BPC_Health` ni yozing va `BP_Hero` dan eski Health mantiqini olib tashlang.",
              "Kun 22 dagi stamina'ni `BPC_Stamina` ga ko'chiring (Timer bilan). Hero faqat `TryConsume(Amount) → bool` ni chaqirsin.",
              "Kun 25 dagi trace/fokus mantiqini `BPC_Interactor` ga ko'chiring.",
              "`BP_TrainingDummy` (qo'g'irchoq): BPC_Health + OnHealthChanged'da qizarib-tiklanish + OnDeath'da yiqilish va 5 s dan keyin tiklanish.",
              "`BPC_Loot`: egasi o'lganda tasodifiy tanga spawn qilsin. Uni dummy va bochkaga qo'shing — boshqa hech narsa o'zgartirmasdan."] }
  ],
  check: ["Actor va Scene Component farqini bilaman", "BPC_Health OnTakeAnyDamage'ga obuna bo'ladi", "Get Owner va Get Component by Class'ni ishlatdim", "Hero mantiqi component'larga bo'lingan", "Composition tamoyilini tushunaman"],
  err: [["Component'da Timeline qo'shib bo'lmayapti", "Actor Component'da Timeline yo'q. Timer yoki egasidagi Timeline'dan foydalaning."],
        ["OnTakeAnyDamage ishlamayapti", "Bind BeginPlay'da Get Owner orqali qilinganini va egasida Can be Damaged ✔ ekanini tekshiring."]],
  ch: "`BPC_Shield`: Health'dan oldin zararni yutadigan qalqon (Shield 50). U zararni oldin o'zi olsin, qalqon tugagandagina Health kamaysin. Health component'ni o'zgartirmasdan qilishga harakat qiling (maslahat: zarar Apply'dan oldin modifikatsiya qilinadigan «filter» funksiyasi).",
  quiz: [["Transform'i yo'q, faqat mantiqli component:", ["Scene Component", "Actor Component", "Static Mesh", "Spring Arm"], 1, "Actor Component."],
         ["Component o'z Actor'ini qanday topadi?", ["Get Player Character", "Get Owner", "Get Parent", "Self"], 1, "Get Owner."],
         ["Composition'ning afzalligi:", ["Tezroq kompilyatsiya", "Imkoniyatlarni bo'laklar bilan yig'ish, qayta ishlatish", "Grafika yaxshilanadi", "Multiplayer avtomatik"], 1, "Qayta ishlatish va mustaqillik."]]
},
{
  d: 28, t: "Inventory tizimi: Pickup va Struct", time: "3–4 soat",
  g: "Buyumlarni terish, saqlash, ishlatish va tashlash imkonini beruvchi inventar component'ini qurish.",
  learn: ["F_InventorySlot struct", "BPC_Inventory: Add, Remove, Has", "Stack (to'plam) mantiqi", "BP_Pickup", "Use va Drop", "Inventar o'zgarganda dispatcher"],
  body: [
    { h: "Ma'lumot modeli",
      p: "Inventar — slotlar massivi. Har slotda buyum identifikatori va soni bor. Buyumning o'zi haqidagi ma'lumot (ikonka, nom, og'irlik) alohida — Data Table'da saqlanadi (Kun 29). Bugun ID sifatida `Name` ishlatamiz.",
      bpt: "Ma'lumot tuzilmasi", bp: `F_InventorySlot (Struct)
├── ItemID   : Name        // "Potion_Small", "Key_Red"
└── Quantity : Integer

BPC_Inventory (Actor Component)
├── Slots       : F_InventorySlot [ ]
├── MaxSlots    : Integer = 20
├── MaxStack    : Integer = 99     // keyin har buyumga alohida bo'ladi
└── OnInventoryChanged (Dispatcher)` },
    { h: "AddItem mantiqi",
      bpt: "Mantiq (psevdokod)", bp: `// AddItem(ItemID, Amount) → Remaining (Integer)
Remaining = Amount
// 1) Mavjud to'plamlarga qo'shish
[For Each Slots] (Index, Element)
   Element.ItemID == ItemID AND Element.Quantity < MaxStack ?
      Add = Min(MaxStack − Quantity, Remaining)
      [Set Array Elem] Slots[Index].Quantity += Add
      Remaining −= Add
      Remaining == 0 ? ──▶ break
// 2) Yangi slotlar
[While] Remaining > 0 AND Slots.Length < MaxSlots
      Add = Min(MaxStack, Remaining) ──▶ [Add] (ItemID, Add) ──▶ Remaining −= Add
[Call OnInventoryChanged]
Return Remaining     // 0 bo'lmasa — joy yetmadi`,
      warn: "For Each ichida massivning **o'zini** o'zgartirmang (Add/Remove) — indekslar siljiydi. Struct maydonini o'zgartirish uchun [[Set Array Elem]] ishlating, chunki Get nusxa qaytaradi." },
    { h: "Boshqa funksiyalar",
      table: [["Funksiya", "Vazifasi"],
              ["RemoveItem(ItemID, Amount) → bool", "Teskari tartibda kamaytiradi, 0 bo'lgan slotni o'chiradi (Reverse For Each!)"],
              ["GetItemCount(ItemID) → int", "Barcha slotlardagi yig'indi"],
              ["HasItem(ItemID, Amount) → bool", "Yetarlimi?"],
              ["UseItem(SlotIndex)", "Buyumni ishlatish (Kun 29 da turiga qarab)"],
              ["DropItem(SlotIndex, Amount)", "Oldinga BP_Pickup spawn qilib, inventardan olib tashlaydi"]],
      tip: "O'chirishda massivni oxiridan boshiga aylanib chiqing ([[Reverse For Each Loop]]) — shunda o'chirilgan element keyingi indekslarga ta'sir qilmaydi." },
    { h: "BP_Pickup",
      steps: ["`BP_Pickup`: Static Mesh + Sphere (Interaction kanali Block yoki Overlap) + `ItemID` (Name, Instance Editable, Expose on Spawn) + `Quantity`.",
              "`BPI_Interactable` → Interact(Interactor): Interactor'dan [[Get Component by Class]] (BPC_Inventory) → AddItem.",
              "Remaining == 0 bo'lsa Destroy; aks holda Quantity = Remaining (qolgani yerda qoladi) va «Inventar to'la» xabari.",
              "Kichik «bob» animatsiyasi (aylanish + suzish) va olinganda ovoz."] },
    { h: "Amaliy topshiriq",
      steps: ["`F_InventorySlot`, `BPC_Inventory` (Add/Remove/Count/Has/Drop) ni yozing.",
              "`BP_Hero` ga BPC_Inventory qo'shing. `I` tugmasi — inventarni Print String bilan ro'yxat qilib chiqarsin.",
              "Levelga 5 xil pickup (`Coin`, `Potion`, `Key_Red`, `Ammo`, `Gem`) har xil sonda qo'ying.",
              "Kun 18 dagi kalitli eshikni `Keys` massividan `HasItem` ga o'tkazing — eshik kalitni sarflab (RemoveItem) ochilsin.",
              "G — birinchi slotni yerga tashlash (Drop). Tashlangan pickup'ni qayta olish mumkin bo'lsin.",
              "MaxSlots = 5 qilib inventar to'lishini sinab ko'ring."] }
  ],
  check: ["Struct + array asosidagi inventar ishlaydi", "Stack mantiqi to'g'ri", "Pickup interface orqali olinadi", "Drop pickup spawn qiladi", "Kalitli eshik inventardan foydalanadi", "OnInventoryChanged chaqiriladi"],
  err: [["Quantity o'zgarmayapti", "[[Get (a copy)]] dan keyin struct'ni o'zgartirgansiz. [[Set Array Elem]] yoki [[Get (a ref)]] + [[Set Members in F_InventorySlot]] ishlating."],
        ["O'chirishda ba'zi slotlar o'tkazib yuborilyapti", "Oldinga aylanayotgan loop ichida Remove qilingan. Reverse For Each ishlating."]],
  ch: "Og'irlik cheklovi: har bir ItemID ning og'irligini Map'da saqlang (Name → Float). Umumiy og'irlik 50 dan oshsa, pickup olinmasin; 40 dan oshsa — personaj sekinlashsin (Kun 22 dagi UpdateSpeed'ga ulang).",
  quiz: [["Massiv ichidagi struct maydonini o'zgartirish:", ["Get (a copy) + Set", "Set Array Elem", "Add", "Make Array"], 1, "Get nusxa qaytaradi."],
         ["Loop ichida element o'chirishda xavfsiz usul:", ["For Each", "Reverse For Each", "While", "Sequence"], 1, "Oxiridan boshlash indekslarni buzmaydi."],
         ["Pickup inventarni qanday topadi?", ["Cast to BP_Hero", "Get Component by Class", "Get All Actors", "GameMode"], 1, "Har qanday inventarli Actor'da ishlaydi."]]
},
{
  d: 29, t: "Data Table, Data Asset va ma'lumotga asoslangan dizayn", time: "3 soat",
  g: "O'yin kontentini koddan ajratish: buyumlar, dushmanlar va sozlamalarni jadvallarda saqlash.",
  learn: ["Data-driven dizayn", "Data Table yaratish (Struct asosida)", "Get Data Table Row", "CSV/JSON import", "Primary Data Asset", "Soft reference"],
  body: [
    { h: "Nima uchun?",
      p: ["Sizda 200 xil buyum bor. Har biri uchun alohida Blueprint yaratish — dahshat. Yechim: **bitta** `BP_Pickup` va har bir buyum haqidagi ma'lumot saqlanadigan **jadval**. Game designer kodga tegmasdan yangi buyum qo'sha oladi yoki balansni o'zgartira oladi.",
          "Bu **data-driven** (ma'lumotga asoslangan) dizayn. Barcha yirik o'yinlar shu tamoyil asosida qurilgan."] },
    { h: "Data Table",
      steps: ["Struct `F_ItemData` (Kun 11 dagini kengaytiring): `DisplayName` (Text), `Description` (Text), `Icon` (Texture2D — **Soft Object Reference**), `Mesh` (Static Mesh — Soft), `Type` (E_ItemType), `MaxStack` (Int), `Weight` (Float), `Value` (Int), `HealAmount` (Float).",
              "Content Browser → {{Miscellaneous → Data Table}} → Row Structure: `F_ItemData` → `DT_Items`.",
              "{{+ Add}} bilan qatorlar qo'shing. **Row Name** — buyum ID'si: `Potion_Small`, `Key_Red`, `Coin`...",
              "Inventardagi `ItemID` (Name) endi aynan shu Row Name."],
      graph: {
        t: "BP_Pickup · Event Graph",
        n: [
          { id: "e", k: "custom", t: "LoadItemData", sub: "Custom Event", x: 0, y: 0, o: [">"] },
          { id: "id", k: "var", t: "ItemID", x: 0, y: 2, o: ["name"] },
          { id: "gr", k: "func", t: "Get Data Table Row", x: 1, y: 0, i: [">", "obj Data Table = DT_Items", "name Row Name"], o: ["> Row Found", "> Row Not Found", "struct Out Row"], s: 1 },
          { id: "br", k: "pure", t: "Break F_ItemData", x: 2, y: 2.6, i: ["struct F Item Data"], o: ["text Display Name", "soft Icon", "soft Mesh", "int Max Stack", "float Weight"], s: 2 },
          { id: "p", k: "func", t: "Print Text", x: 3, y: 0, i: [">", "text In Text"], o: [">"] },
          { id: "er", k: "func", t: "Print String", x: 2, y: 0.9, i: [">", "str In String = DT_Items: ID topilmadi"], o: [">"] }
        ],
        w: ["e.0-gr.0", "id.0-gr.2", "gr.0-p.0", "gr.1-er.0", "gr.2-br.0", "br.0-p.1"],
        how: ["[[Get Data Table Row]] — Data Table'da `DT_Items` ni tanlang; Out Row avtomatik `F_ItemData` turiga keladi.",
              "**Row Found** / **Row Not Found** — ikkala holatni ham yozing.",
              "Out Row → [[Break F_ItemData]] — kerakli maydonlar."] },
      tip: "ItemID'ni qo'lda yozish o'rniga **Data Table Row Handle** turidagi o'zgaruvchi ishlating: Details'da jadval va qator ochiluvchi ro'yxatdan tanlanadi — xato yozish imkonsiz bo'ladi." },
    { h: "CSV / JSON bilan ishlash",
      p: "Jadvalni Excel yoki Google Sheets'da yuritish qulay: Data Table'ga o'ng tugma → {{Export as CSV}}, tahrirlang va qayta import qiling (faylni sudrab tashlash → Reimport). Birinchi ustun — Row Name, qolganlari struct maydonlari nomlari bilan.",
      warn: "CSV'dagi ustun nomlari struct maydon nomlariga aynan mos kelishi kerak. Struct'da maydon nomini o'zgartirsangiz, CSV'ni ham yangilang." },
    { h: "Data Asset",
      p: ["**Primary Data Asset** — har biri alohida fayl bo'lgan ma'lumot obyekti. Data Table'dan farqi: meros (inheritance) bo'ladi, funksiyalar qo'shish mumkin va har bir asset alohida ochiladi.",
          "Yaratish: {{Blueprint Class → PrimaryDataAsset}} → `PDA_Weapon` (o'zgaruvchilar: Damage, FireRate, Mesh, Sound...). Keyin {{Miscellaneous → Data Asset}} → klass `PDA_Weapon` → `DA_Pistol`, `DA_Rifle`."],
      table: [["", "Data Table", "Data Asset"],
              ["Ko'rinishi", "Bitta jadval, ko'p qator", "Ko'p alohida fayl"],
              ["Excel/CSV bilan", "Juda qulay", "Yo'q"],
              ["Meros, murakkab tuzilma", "Cheklangan", "Ha"],
              ["Qachon", "Ko'p, bir xil tuzilmali yozuvlar: buyumlar, dialoglar, darajalar", "Murakkab konfiguratsiya: qurollar, qahramonlar, dushman turlari"]] },
    { h: "Soft va Hard reference",
      p: ["**Hard reference** (oddiy ko'k pin) — havola qilingan asset darhol xotiraga yuklanadi. 200 ta buyum ikonkasi va mesh'i hard reference bo'lsa, jadval yuklanishi bilan hammasi xotiraga tushadi.",
          "**Soft reference** (och yashil/pushti pin) — faqat «manzil». Kerak bo'lganda yuklanadi: [[Async Load Asset]] yoki [[Load Asset Blocking]]. Data Table va Data Asset'larda katta assetlar uchun doim Soft ishlating."],
      tip: "Asset'ga o'ng tugma → {{Size Map}} — u qancha xotira «tortib» kelishini ko'rsatadi. Hard reference zanjirlari shu yerda ko'rinadi." },
    { h: "Amaliy topshiriq",
      steps: ["`F_ItemData` va `DT_Items` (kamida 8 buyum) yarating.",
              "`BP_Pickup` ga `ItemRow` (Data Table Row Handle) qo'shing. Construction Script'da Mesh jadvaldan olinib qo'yilsin — Editor'da darhol ko'rinadi.",
              "BPC_Inventory endi MaxStack'ni jadvaldan olsin.",
              "`UseItem(Slot)`: Type = Potion → BPC_Health.ApplyHeal(HealAmount) va 1 dona sarflansin; Type = Key → «Kalitni eshikda ishlating».",
              "`I` — inventar ro'yxati DisplayName bilan chiqsin.",
              "Jadvalni CSV ga eksport qiling, Excel'da 3 ta yangi buyum qo'shib qayta import qiling."] }
  ],
  check: ["Struct asosida Data Table yaratdim", "Get Data Table Row'ni ishlatdim", "Row Handle o'zgaruvchidan foydalandim", "Data Asset va Data Table farqini bilaman", "Soft reference nima uchun kerakligini bilaman"],
  err: [["Row Not Found doim", "Row Name katta-kichik harflarga sezgir emas, lekin bo'sh joy va tinish belgilariga sezgir. ID'ni Row Handle bilan tanlang."],
        ["Struct o'zgartirilgach Data Table ma'lumotlari yo'qoldi", "Struct maydonini o'chirish yoki turini o'zgartirish shu ustundagi ma'lumotni yo'qotadi. Avval CSV'ga eksport qilib zaxiralang."]],
  ch: "`DT_LootTable` yarating: har dushman turi uchun buyumlar va ularning tushish ehtimoli (Weight). `BPC_Loot` jadvaldan og'irlikli tasodifiy tanlov (weighted random) bilan buyum tashlasin.",
  quiz: [["Data Table qaysi asosda yaratiladi?", ["Enum", "Struct", "Blueprint", "Material"], 1, "Row Structure — Struct."],
         ["Katta assetlar uchun jadvalda qaysi havola?", ["Hard", "Soft", "Weak", "Farqi yo'q"], 1, "Soft — kerak bo'lganda yuklanadi."],
         ["Excel bilan ishlash uchun qulayroq:", ["Data Asset", "Data Table", "Enum", "Level"], 1, "CSV import/export."]]
},
{
  d: 30, t: "LOYIHA: Interaction + Inventory + Health — «Omborxona»", time: "4–5 soat",
  g: "5-modulni yakunlab, to'liq gameplay tizimlari bilan kichik o'ynaladigan level yaratish.",
  learn: ["Component'larni birlashtirish", "Data-driven kontent", "Gameplay sikli dizayni", "Debug va sinov", "Kodni hujjatlashtirish", "Tizimlar o'rtasidagi bog'liqlikni kamaytirish"],
  body: [
    { h: "Ssenariy",
      p: "Tashlab ketilgan omborxona. O'yinchi generatorni yoqishi kerak, buning uchun **3 ta yoqilg'i bakini** topadi. Yo'lda yonayotgan zonalar, portlovchi bochkalar va qulflangan xonalar bor. Sog'liqni **dori** bilan tiklaydi, eshiklarni **rangli kalitlar** bilan ochadi. Generator yoqilgach — chiqish eshigi ochiladi.",
      table: [["Tizim", "Manba"],
              ["BPC_Interactor (trace, fokus)", "Kun 25, 27"],
              ["BPC_Health + Damage Type'lar", "Kun 26, 27"],
              ["BPC_Inventory + DT_Items", "Kun 28, 29"],
              ["Dispatcher bilan generator mantiqi", "Kun 16"],
              ["Timeline eshiklar", "Kun 23"],
              ["Checkpoint / respawn", "Kun 24"]] },
    { h: "Yangi elementlar",
      steps: ["`BP_Generator` (Interactable): `RequiredFuel` = 3. Interact → o'yinchida `Fuel` bo'lsa olib, `InsertedFuel` +1. 3 ga yetsa — `OnPowered` dispatcher, chiroqlar yonadi, ovoz.",
              "`BP_PoweredDoor` va `BP_PoweredLight`: generatorning OnPowered'iga obuna — Eyedropper havola orqali.",
              "`BP_Locker`: ichida tasodifiy buyum — DT_LootTable'dan.",
              "`BP_HealthStation`: Interact → 3 s davomida asta-sekin davolaydi (Timer), bitta stansiya bir marta ishlaydi.",
              "Barcha buyumlar `DT_Items` da: Fuel, Key_Red, Key_Blue, Potion_Small, Potion_Big, Scrap."] },
    { h: "Level dizayni",
      ul: ["3 zona: **Kirish** (o'rgatish — birinchi pickup, birinchi eshik), **Ombor** (yonayotgan zona, bochkalar, 2 ta yoqilg'i), **Ofis** (ko'k kalit kerak, 3-yoqilg'i, generator xonasi).",
           "O'yinchiga yo'l ko'rsatish: yorug'lik va rang (sariq — interaktiv), maslahat yozuvlari (BP_Note).",
           "Xavf va mukofot: dori yonidagi bochkalar, yashirin xonadagi katta dori.",
           "Har zona boshida checkpoint."] },
    { h: "Debug vositalari",
      table: [["Vosita", "Nima uchun"],
              ["Print String (Key bilan)", "Holatlarni kuzatish"],
              ["Breakpoint (F9)", "Node'da o'yinni to'xtatib qiymatlarni ko'rish (Kun 65)"],
              ["Debug Filter (Blueprint toolbar)", "Aynan qaysi nusxani kuzatayotganingizni tanlash"],
              ["Cheat tugmalari", "Masalan F1 — barcha buyumlar, F2 — to'liq sog'liq (faqat Development'da)"],
              ["Output Log", "Accessed None va ogohlantirishlar"]],
      tip: "Cheat'larni `BP_UEPlayerController` da alohida «Debug» kategoriyasida yozing va [[Is Packaged for Distribution]] false bo'lgandagina ishlasin." },
    { h: "Hujjatlashtirish",
      p: "Loyiha ildizida `SYSTEMS.md` (yoki Blueprint ichidagi izohlar) yozing: har bir component nimani qiladi, qaysi dispatcher'lari bor va yangi buyum/interaktiv obyekt qanday qo'shiladi. 15-moduldagi o'z o'yiningizda shu hujjat bilan ishlaysiz." }
  ],
  check: ["Level boshidan oxirigacha o'ynaladi", "Barcha buyumlar DT_Items'dan", "Generator — Dispatcher, eshiklar — Timeline", "Zarar turlari va respawn ishlaydi", "Kamida 2 cheat tugmasi bor", "Tizimlar hujjatlashtirilgan"],
  err: [["Generator OnPowered'da ba'zi chiroqlar yonmayapti", "Chiroqlarda generator havolasi bog'lanmagan. Is Valid xabarlari Output Log'da ko'rinadi."],
        ["Respawn'dan keyin inventar bo'shab qoladi", "Inventar Character'da — yangi Pawn bilan yangilanadi. Saqlanishi kerak bo'lsa, inventarni PlayerState yoki Controller'ga ko'chiring yoki respawn'da nusxalang."]],
  ch: "«Crafting»: `DT_Recipes` (natija ItemID, kerakli buyumlar ro'yxati). `BP_Workbench` da Scrap ×3 + Fuel ×1 → Potion_Big. Tizim jadvaldan istalgan retseptni o'qisin.",
  quiz: [["Generator va eshik o'rtasidagi aloqa usuli:", ["Cast", "Event Dispatcher", "Tick", "Get All Actors"], 1, "Generator tinglovchilarni bilmaydi."],
         ["Respawn'da inventar saqlanishi uchun uni qayerga qo'yish mumkin?", ["Widget", "PlayerState / Controller", "Pickup", "Level Blueprint"], 1, "Ular Pawn o'lganda ham qoladi."]]
}
);
