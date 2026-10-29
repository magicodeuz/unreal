// Modul 11 — Arxitektura va ilg'or Blueprint (Kun 61–66)
window.UE_LESSONS.push(
{
  d: 61, t: "Blueprint best practices va kutubxonalar", time: "2–3 soat",
  g: "Katta loyihada ham o'qiladigan, tez va xatosiz Blueprint yozish qoidalari hamda umumiy funksiyalar kutubxonalari.",
  learn: ["Blueprint Function Library", "Macro Library", "Nomlash va kategoriyalar", "Graf gigiyenasi", "Hard reference'larni kamaytirish", "Kod sharhlash (review) checklist"],
  body: [
    { h: "Blueprint Function Library",
      p: "Ko'p joyda kerak bo'ladigan, hech qanday Actor'ga tegishli bo'lmagan funksiyalar uchun: {{Blueprint Class → Blueprint Function Library}} → `BFL_Game`. Ichidagi funksiyalar **static** — istalgan Blueprint'dan bevosita chaqiriladi.",
      bp: `BFL_Game
├── GetHeroCharacter(WorldContext) → BP_Hero          // Get Player Character + Cast, bir joyda
├── GetUEGameInstance(WorldContext) → BP_UEGameInstance
├── FormatTime(Seconds) → Text                         // 125.4 → "02:05"
├── GetItemData(ItemID) → F_ItemData, bFound           // DT_Items'dan
├── IsInFrontOf(A, B, Threshold) → bool               // Dot Product
└── PlayUISound(WorldContext, Sound)`,
      warn: "Function Library'da o'zgaruvchi (holat) saqlab bo'lmaydi va Delay/Timeline ishlatib bo'lmaydi. Unda faqat «sof» yordamchi funksiyalar bo'ladi." },
    { h: "Macro Library",
      p: "{{Blueprint → Blueprint Macro Library}} (parent: Actor yoki Object) → `BML_Utils`. Masalan: `IsValidWithLog` (Is Valid + xato xabari), `ForEachWithDelay` (har element orasida kutish). Macro'larda bir nechta exec chiqish va latent node'lar bo'lishi mumkin." },
    { h: "Graf gigiyenasi",
      table: [["Qoida", "Nima uchun"],
              ["Bitta funksiya — bitta vazifa, ekranga sig'adi", "O'qilishi va testlash oson"],
              ["Simlar kesishmasin — Reroute nuqtalari", "Mantiq oqimi ko'rinadi"],
              ["Comment bloklari (C) rang bilan", "Bo'limlarni tez topish"],
              ["O'zgaruvchilar Category bo'yicha", "Details paneli tartibli"],
              ["Ichki o'zgaruvchilar Private", "Boshqalar tasodifan o'zgartirmasin"],
              ["Get bir marta — local o'zgaruvchiga", "Pure funksiyalar qayta hisoblanmasin"],
              ["Magic number yo'q", "600 o'rniga `SprintSpeed` o'zgaruvchisi"],
              ["Tick faqat zarur bo'lsa", "Unumdorlik"]],
      tip: "**Blueprint Assist** (Fab'dagi plagin) grafni bir tugma bilan avtomatik tartiblaydi. Professional jamoalar ko'p foydalanadi." },
    { h: "Hard reference'lar zanjiri",
      p: ["Har Cast, o'zgaruvchi turi va funksiya parametri hard reference yaratadi. `BP_Coin` → `BP_Hero` ga Cast qilsa, Hero → ABP, mesh, qurollar, UI... hammasi tanga bilan birga yuklanadi. Size Map (Kun 29) buni ko'rsatadi.",
          "Kamaytirish usullari:"],
      ul: ["Interface'lar (Kun 15) — Cast o'rniga.",
           "Kichik base klasslar: `BP_HeroBase` (mesh'siz, faqat mantiq) va unga Cast qilish.",
           "Component orqali so'rash (Get Component by Class) — Kun 27.",
           "Soft reference va async yuklash — Kun 29, 64.",
           "Gameplay Tags — Kun 64."] },
    { h: "Code review checklist",
      ul: ["Accessed None xavfi bormi? (Is Valid)", "Tick'da og'ir ish yo'qmi?", "Timer va Bind'lar EndPlay'da tozalanadimi?",
           "Funksiya nomi nima qilishini aytadimi?", "Takrorlangan mantiq bormi (funksiyaga chiqarish)?", "Hard reference zanjiri keragidan katta emasmi?",
           "Output Log'da ogohlantirishlar yo'qmi?"] },
    { h: "Amaliy topshiriq",
      steps: ["`BFL_Game` yarating va loyihangizdagi takrorlangan Cast'larni (Get Player Character → Cast) uning funksiyalari bilan almashtiring.",
              "`FormatTime` ni yozing va barcha taymerlarni u bilan ko'rsating.",
              "Eng katta Blueprint'ingizni (ehtimol BP_Hero) review checklist bo'yicha tozalang: funksiyalarga bo'ling, izohlang, Private qiling.",
              "Size Map bilan BP_Coin/BP_Pickup'ning xotira hajmini o'lchang, Interface'ga o'tgandan keyin qayta o'lchang.",
              "`BML_Utils.IsValidWithLog` macro'sini yarating."] }
  ],
  check: ["Function Library yaratdim", "Macro Library'ni bilaman", "Graf gigiyenasi qoidalarini qo'llayman", "Hard reference zanjirlarini Size Map bilan topaman", "Review checklist bo'yicha kodni tozaladim"],
  err: [["Function Library funksiyasi «World Context» so'rayapti", "Bu normal — ba'zi node'lar (Get Player Character) dunyoni bilishi kerak. Actor ichidan chaqirganda Self avtomatik beriladi."],
        ["Kodni tozalagach biror narsa ishlamay qoldi", "Katta refaktoringni kichik bosqichlarda qiling va har bosqichdan keyin o'yinni sinang. Version control (Kun 85) bu yerda juda yordam beradi."]],
  ch: "Loyihangiz uchun «Blueprint style guide» hujjatini yozing (1 sahifa): nomlash, kategoriyalar, Comment ranglari (masalan qizil — TODO, yashil — input, ko'k — UI), ruxsat etilgan va taqiqlangan usullar.",
  quiz: [["Static yordamchi funksiyalar joyi:", ["Actor Component", "Blueprint Function Library", "GameMode", "Widget"], 1, "BFL."],
         ["Function Library'da nima qilib bo'lmaydi?", ["Matematik hisob", "Holat (o'zgaruvchi) saqlash", "Struct qaytarish", "Data Table o'qish"], 1, "Holat saqlanmaydi."],
         ["Asset qanchalik ko'p narsani yuklashini ko'rsatuvchi vosita:", ["Reference Viewer", "Size Map", "Output Log", "Profiler"], 1, "Size Map."]]
},
{
  d: 62, t: "Meros (Inheritance) va obyektga yo'naltirilgan dizayn", time: "3 soat",
  g: "Blueprint'larda meros, override va abstraksiya orqali kengaytiriladigan tizimlar qurish.",
  learn: ["Parent va Child Blueprint", "Funksiya va event override", "Parent'ni chaqirish", "Abstrakt base klasslar", "Composition va Inheritance balansi", "Polimorfizm"],
  body: [
    { h: "Meros asoslari",
      p: ["Child Blueprint parent'ning barcha component'lari, o'zgaruvchilari va funksiyalarini oladi. U ularni o'zgartirishi (**override**) va yangilarini qo'shishi mumkin.",
          "Yaratish: Blueprint'ga o'ng tugma → {{Create Child Blueprint Class}}. Yoki yangi Blueprint yaratishda parent sifatida o'z klassingizni tanlash."],
      bp: `BP_InteractableBase (Actor, BPI_Interactable)
   Variables: InteractText, bIsEnabled, InteractSound
   Interact()      → [PlayInteractSound] ──▶ [OnInteracted]  (bo'sh, child'lar to'ldiradi)
   GetInteractText → InteractText
├── BP_DoorBase      → OnInteracted override: Toggle
│     ├── BP_LockedDoor   → OnInteracted override: kalit tekshiruvi ──▶ Parent: OnInteracted
│     └── BP_SlidingDoor  → Open/Close override: Timeline siljish
├── BP_Chest         → OnInteracted override: Loot
└── BP_Lever         → OnInteracted override: Dispatcher` },
    { h: "Override va Parent chaqiruvi",
      steps: ["Child'da My Blueprint → {{Functions → Override}} → parent funksiyasi tanlanadi.",
              "Event'larni ham override qilish mumkin (masalan BeginPlay, yoki parent'dagi Custom Event).",
              "Parent mantiqi ham bajarilishi kerak bo'lsa: override node'iga o'ng tugma → {{Add Call to Parent Function}}.",
              "Parent chaqiruvini qayerga qo'yish muhim: oldin (avval umumiy, keyin maxsus) yoki keyin."],
      warn: "Eng ko'p uchraydigan xato: child'da BeginPlay qo'shib, Parent: BeginPlay'ni chaqirmaslik. Natijada parent'dagi barcha boshlang'ich sozlashlar bajarilmaydi. Child'da BeginPlay qo'shganingizda node'ning o'zi parent chaqiruvini avtomatik qo'shadi — uni o'chirmang!" },
    { h: "Abstraksiya va polimorfizm",
      p: ["**Abstrakt base** — o'zi levelga qo'yilmaydi, faqat umumiy shablon (Class Settings → {{Generate Abstract Class}} ✔). Masalan `BP_WeaponBase`, `BP_EnemyBase`.",
          "**Polimorfizm** — `BP_WeaponBase` turidagi o'zgaruvchida Rifle ham, Shotgun ham saqlanishi mumkin. `CurrentWeapon.Fire()` chaqirilganda har biri o'z override'ini bajaradi. Character qurol turini bilishi shart emas."] },
    { h: "Composition yoki Inheritance?",
      table: [["Savol", "Javob"],
              ["«X — bu Y ning bir turi»mi? (Shotgun — qurol)", "Inheritance"],
              ["«X da Y imkoniyati bor»mi? (Dushmanda sog'liq bor)", "Composition (Component)"],
              ["Turli ierarxiyalardagi obyektlarga bir xil xatti-harakat", "Interface yoki Component"],
              ["Meros 3 qavatdan chuqur", "Ehtimol noto'g'ri — Component'ga o'ting"]],
      tip: "Chuqur meros (Base → Enemy → Humanoid → Soldier → Sniper → EliteSniper) — o'zgartirish qiyin bo'lgan mo'rt tuzilma. Yaxshi amaliyot: yassi ierarxiya + ko'p Component." },
    { h: "Amaliy topshiriq",
      steps: ["`BP_InteractableBase` (abstrakt) yarating va Kun 18/30 dagi barcha interaktiv obyektlarni undan meros oldiring.",
              "`OnInteracted` — BlueprintImplementable uslubidagi bo'sh event, har child o'zinikini yozadi.",
              "`BP_DoorBase` → `BP_LockedDoor`, `BP_SlidingDoor`, `BP_DoubleDoor`.",
              "Barcha interaktiv obyektlarda bir xil ovoz va highlight mantiqi faqat base'da bo'lsin.",
              "Qurollar va dushmanlar ierarxiyasini ham tekshiring: base'da umumiy, child'da faqat farqlar.",
              "Ierarxiya diagrammasini chizing."] }
  ],
  check: ["Child Blueprint yaratib override qilaman", "Parent funksiyani chaqirishni unutmayman", "Abstrakt klass nima ekanini bilaman", "Polimorfizmni tushuntira olaman", "Composition va Inheritance'ni to'g'ri tanlayman"],
  err: [["Child'da parent o'zgaruvchisi ko'rinmaydi", "My Blueprint'da {{⚙ → Show Inherited Variables}} ✔. Private o'zgaruvchilar child'da ko'rinmaydi — Protected qiling."],
        ["Parent'ga component qo'shgandan keyin child'lar buzildi", "Child'larni ochib qayta kompilyatsiya qiling. Child'dagi component nomi parent'dagisi bilan to'qnashmasin."]],
  ch: "`BP_PickupBase` → `BP_Pickup_Health`, `BP_Pickup_Ammo`, `BP_Pickup_Weapon`, `BP_Pickup_Key` ierarxiyasini yarating. Inventar (Kun 28) bilan birga ishlaydigan qiling — faqat `ApplyTo(Actor)` override qilinsin.",
  quiz: [["Child override'da parent mantiqini ham bajarish:", ["Cast to Parent", "Add Call to Parent Function", "Duplicate", "Interface"], 1, "Parent: FunctionName node."],
         ["«Dushmanda sog'liq bor» — qaysi usul?", ["Inheritance", "Composition", "Level BP", "Macro"], 1, "Component."],
         ["Levelga qo'yilmaydigan shablon klass:", ["Abstract", "Const", "Pure", "Static"], 0, "Generate Abstract Class."]]
},
{
  d: 63, t: "Level Streaming va World Partition", time: "3 soat",
  g: "Katta dunyolarni qismlarga bo'lib yuklash: Level Streaming, Level Instance, World Partition va Data Layers.",
  learn: ["Persistent Level va Sub-level'lar", "Load/Unload Stream Level", "Level Streaming Volume", "World Partition va Grid", "Data Layers", "Level Instance va Packed Level Actor"],
  body: [
    { h: "Nima uchun streaming?",
      p: "Butun o'yin dunyosini birdaniga xotiraga yuklab bo'lmaydi. Streaming — o'yinchi yaqinidagi qismlarni yuklash va uzoqdagilarini chiqarib yuborish. Yuklash ekransiz uzluksiz dunyo (seamless) shu bilan quriladi." },
    { h: "Klassik Level Streaming",
      steps: ["{{Window → Levels}} paneli. Asosiy level — **Persistent Level** (doim yuklangan: GameMode, yorug'lik, o'yinchi).",
              "{{Levels → Create New}} yoki {{Add Existing}} — sub-level'lar: `L_Town_Buildings`, `L_Town_Interior`, `L_Dungeon`.",
              "Actor'larni sub-level'ga ko'chirish: tanlab → Levels panelida level'ga o'ng tugma → {{Move Selected Actors to Level}}.",
              "Streaming Method: **Blueprint** (kod bilan yuklash) yoki **Always Loaded**."],
      bp: `// Zindon eshigiga yaqinlashganda
[On Begin Overlap] ──▶ [Load Stream Level (by Name)] ("L_Dungeon",
                          Make Visible After Load ✔, Should Block on Load ✘)
                     ──▶ Completed ──▶ eshikni ochish
// Uzoqlashganda
[Unload Stream Level] ("L_Town_Interior")`,
      tip: "**Level Streaming Volume** — kodsiz usul: hajm ichiga kirganda bog'langan level'lar yuklanadi. Levels panelida level'ga Volume'ni ulang." },
    { h: "World Partition",
      p: ["UE5 da katta ochiq dunyolar uchun **World Partition** standart: dunyo avtomatik ravishda grid katakchalariga bo'linadi va o'yinchi atrofidagi kataklar yuklanadi. Sub-level'larni qo'lda boshqarish shart emas.",
          "{{File → New Level → Open World}} — World Partition yoqilgan level. Mavjud levelni o'tkazish: {{Tools → Convert Level}}."],
      table: [["Tushuncha", "Ma'nosi"],
              ["World Partition editor ({{Window → World Partition}})", "Xarita, qaysi hudud Editor'da yuklangan"],
              ["Runtime Grid / Loading Range", "Qancha masofada yuklanadi"],
              ["Is Spatially Loaded (Actor sozlamasi)", "✘ bo'lsa — doim yuklangan"],
              ["One File Per Actor", "Har Actor alohida fayl — jamoa bilan ishlashda konfliktsiz"],
              ["HLOD", "Uzoqdagi hududlarning soddalashtirilgan ko'rinishi"]],
      warn: "World Partition'da Level Blueprint'ga tayanmang va doim yuklanib turishi kerak bo'lgan Actor'larda (GameMode bilan bog'liq menejerlar) Is Spatially Loaded ✘ qiling — aks holda o'yinchi uzoqlashganda ular yo'qoladi." },
    { h: "Data Layers",
      p: "Bir xil hududning turli holatlari: «shahar urushdan oldin» va «urushdan keyin», «kunduzgi bozor» va «tungi bozor». {{Window → Data Layers Outliner}} → Data Layer asset'lari. Actor'larni layer'larga biriktirasiz va o'yin paytida [[Set Data Layer Runtime State]] (Activated / Loaded / Unloaded) bilan almashtirasiz." },
    { h: "Level Instance",
      p: "Bir nechta Actor'dan iborat «blok»ni (uy, xona, lager) qayta ishlatiladigan qism qilish: tanlab → o'ng tugma → {{Level → Create Level Instance}}. Uni xaritaning 20 joyiga qo'yasiz; asl nusxani tahrirlasangiz, hammasi yangilanadi. **Packed Level Actor** — statik mesh'lar uchun yanada samarali variant (instanced)." },
    { h: "Amaliy topshiriq",
      steps: ["Persistent + 3 sub-level: tashqi hovli, bino ichi, yerto'la. Eshiklar va triggerlar bilan Load/Unload.",
              "Yuklanish paytida qisqa fade (Kun 35) — o'yinchi «pop-in» ko'rmasin.",
              "Kun 53 dagi Open World xaritasida 3 ta qishloqni Level Instance qilib joylashtiring.",
              "Data Layer: «Bayram» — qishloqda bayroqlar va chiroqlar, kvest bajarilganda yoqiladi.",
              "Konsolda `wp.Runtime.ToggleDrawRuntimeHash2D` — yuklanayotgan kataklarni ko'ring."] }
  ],
  check: ["Persistent va sub-level farqini bilaman", "Load/Unload Stream Level'ni ishlatdim", "World Partition qanday ishlashini tushunaman", "Data Layer bilan holat almashtirdim", "Level Instance yaratdim"],
  err: [["Sub-level yuklanganda o'yinchi yerdan tushib ketadi", "Pol sub-level'da, o'yinchi esa yuklanish tugamasdan u yerda. Pollarni Persistent'da saqlang yoki Should Block on Load ✔ qiling."],
        ["World Partition'da obyekt uzoqlashganda yo'qolib, holati tiklanmadi", "Spatially loaded Actor'lar qayta yuklanganda boshlang'ich holatda paydo bo'ladi. Holatni saqlash kerak bo'lsa — Kun 59 dagi usul (ID + SaveGame yoki GameInstance)."]],
  ch: "Seamless o'tish: tashqi dunyodan zindon ichiga yuklash ekransiz o'ting — uzun koridor (yuklanish vaqtini «yashirish» uchun) va Load Stream Level'ning Completed event'ida koridor oxiridagi eshik ochilsin.",
  quiz: [["Doim yuklangan asosiy level:", ["Sub-level", "Persistent Level", "Data Layer", "Level Instance"], 1, "Persistent."],
         ["UE5 da ochiq dunyoni avtomatik bo'luvchi tizim:", ["World Composition", "World Partition", "Nanite", "HLOD"], 1, "World Partition."],
         ["Bir hududning turli holatlari uchun:", ["Data Layers", "Level Instance", "Streaming Volume", "LOD"], 0, "Data Layers."]]
},
{
  d: 64, t: "Gameplay Tags, Soft reference va Async yuklash", time: "3 soat",
  g: "Katta loyihalarning ikki asosiy vositasi: ierarxik Gameplay Tag'lar va xotirani tejovchi asinxron yuklash.",
  learn: ["Gameplay Tag nima", "Tag yaratish va ierarxiya", "Gameplay Tag Container va so'rovlar", "Tag'lar bilan holat va mos kelish", "Soft Object/Class Reference", "Async Load Asset / Class"],
  body: [
    { h: "Gameplay Tags",
      p: ["**Gameplay Tag** — ierarxik nom: `Status.Stunned`, `Damage.Fire`, `Item.Weapon.Rifle`, `Ability.Dash`. Ular Enum va bool'larning kuchli o'rnini bosuvchisi: kengaytirilishi oson, kodsiz qo'shiladi va ierarxiya bo'yicha so'raladi.",
          "{{Project Settings → GameplayTags → Manage Gameplay Tags}} → + bilan qo'shiladi (`DefaultGameplayTags.ini` ga yoziladi)."],
      table: [["So'rov", "Ma'nosi"],
              ["Has Tag (Container, Status.Stunned)", "Aniq shu tag (yoki uning bolasi) bormi"],
              ["Has Tag Exact", "Aynan shu tag"],
              ["Has Any (Container, Query)", "Ro'yxatdan birortasi"],
              ["Has All", "Hammasi"],
              ["Matches Tag", "Tag'ni boshqa tag bilan solishtirish"]],
      tip: "Ierarxiya kuchi: `Item.Weapon.Rifle` tag'i `Item.Weapon` ga ham mos keladi. «Barcha qurollar» degan so'rov yangi qurol turlarini avtomatik qamrab oladi." },
    { h: "Amaliy foydalanish",
      bp: `// Holatlar — bool'lar o'rniga
BP_Hero.ActiveTags (Gameplay Tag Container)
Stun:  [Add Gameplay Tag] (ActiveTags, Status.Stunned)  → 2 s → [Remove Gameplay Tag]
Input: [Has Any Tags] (ActiveTags, {Status.Stunned, Status.Dead}) ? return

// Zarar turlari — Damage Type klasslari o'rniga
BPC_Health.Resistances: Map<GameplayTag, Float>  { Damage.Fire: 0.5, Damage.Poison: 0 }

// Interaksiya mosligi
BP_LockedDoor.RequiredTag = Item.Key.Red
Inventar item'larida tag bor ──▶ Has Tag

// Teg orqali Actor'ni identifikatsiya: Gameplay Tag Asset Interface (C++ da) yoki
// Actor'da "Tags" container o'zgaruvchisi + BPI orqali so'rash`,
      warn: "Gameplay Tag'larni string sifatida yaratmang ([[Make Literal Gameplay Tag]] yoki ro'yxatdan tanlash). Mavjud bo'lmagan tag xatosiz «None» bo'lib qoladi va mantiq jimgina ishlamay qoladi." },
    { h: "Soft reference — chuqurroq",
      table: [["Tur", "Pin rangi", "Nima saqlaydi"],
              ["Object Reference (hard)", "Ko'k", "Yuklangan obyekt — o'zi bilan birga yuklanadi"],
              ["Soft Object Reference", "Och yashil", "Asset yo'li — yuklanmaydi"],
              ["Class Reference (hard)", "Binafsha", "Klass — yuklanadi"],
              ["Soft Class Reference", "Pushti", "Klass yo'li"]],
      bp: `// Do'kon: 50 ta qurol ikonkasi — hammasini yuklash kerak emas
WeaponIcon: Soft Object Reference (Texture2D)

[Async Load Asset] (WeaponIcon) ──▶ Completed (Object)
   ──▶ [Cast To Texture2D] ──▶ [Set Brush from Texture] (Image)

// Dushman klassini kerak bo'lganda yuklash
[Async Load Class Asset] (SoftEnemyClass) ──▶ Completed ──▶ [Spawn Actor from Class]`,
      tip: "Async yuklash paytida ikonkaga placeholder (kulrang to'rtburchak) qo'ying va [[Is Valid Soft Object Reference]] bilan tekshiring." },
    { h: "Asset Manager haqida",
      p: "Yirik loyihalarda **Asset Manager** (Project Settings → Asset Manager) Primary Data Asset'larni tur bo'yicha ro'yxatga oladi va ularni ID orqali yuklash imkonini beradi ([[Async Load Primary Asset]], [[Get Primary Asset Id List]]). Bu DLC, mavsumiy kontent va katta katalog (masalan 500 ta qurol) uchun asosiy usul." },
    { h: "Amaliy topshiriq",
      steps: ["Tag ierarxiyasi: `Status.*`, `Damage.*`, `Item.*`, `Ability.*`, `Team.*`.",
              "BP_Hero'dagi holat bool'larini (bIsDead, bInvulnerable, bIsStunned) `ActiveTags` bilan almashtiring.",
              "Zarar tizimini `Damage.*` tag'lariga o'tkazing, BPC_Health'da qarshilik Map'i.",
              "Kalitli eshiklar `Item.Key.*` tag'lari bilan ishlasin.",
              "Inventar UI ikonkalari Soft Reference va async yuklansin.",
              "Wave Manager (Kun 60) dushman klasslarini Soft Class orqali yuklasin."] }
  ],
  check: ["Gameplay Tag ierarxiyasini yaratdim", "Tag Container bilan holatlarni boshqaraman", "Has Tag / Has Any / Has All farqini bilaman", "Soft va hard reference farqini bilaman", "Async Load Asset ishlataman"],
  err: [["Tag tanlash ro'yxatida yangi tag yo'q", "Tag Project Settings'da qo'shilmagan yoki Editor uni hali o'qimagan — Project Settings'ni yopib-oching."],
        ["Async yuklangan ikonka ko'rinmaydi", "Completed'dan keyin Cast muvaffaqiyatsiz (noto'g'ri tur) yoki widget allaqachon yo'q qilingan. Is Valid tekshiring."]],
  ch: "Gameplay Tag asosidagi «qobiliyat cheklovlari»: har qobiliyatda `BlockedByTags` va `GrantsTags`. Dash `Status.Stunned` bo'lsa ishlamaydi va ishlayotgan paytda `Status.Invulnerable` beradi. Bu GAS (Gameplay Ability System) tamoyillariga birinchi qadam.",
  quiz: [["`Item.Weapon.Rifle` qaysi so'rovga mos keladi?", ["Has Tag (Item.Weapon)", "Has Tag Exact (Item.Weapon)", "Has Tag (Status)", "Hech biri"], 0, "Ierarxik moslik."],
         ["Soft reference afzalligi:", ["Tezroq Cast", "Asset kerak bo'lgunicha yuklanmaydi", "Replikatsiya", "Kamroq kod"], 1, "Xotira tejaladi."],
         ["Primary Data Asset'larni ID bo'yicha boshqaruvchi tizim:", ["Asset Manager", "Content Browser", "Size Map", "Data Table"], 0, "Asset Manager."]]
},
{
  d: 65, t: "Debugging va profiling asoslari", time: "3 soat",
  g: "Xatolarni tez topish: breakpoint'lar, watch, Output Log, Visual Logger va konsol buyruqlari.",
  learn: ["Breakpoint va qadamma-qadam bajarish", "Watch Value", "Blueprint Debugger", "Output Log va kategoriyalar", "Visual Logger", "Asosiy konsol buyruqlari va cheat'lar"],
  body: [
    { h: "Breakpoint",
      steps: ["Node'ni tanlab {{F9}} — qizil nuqta (breakpoint).",
              "O'yinni ishga tushiring — bajarilish shu node'ga yetganda o'yin to'xtaydi va Blueprint oynasi ochiladi.",
              "Pin'lar ustiga sichqonchani olib boring — joriy qiymatlar ko'rinadi.",
              "{{F10}} — keyingi node (Step Over), {{F11}} — funksiya ichiga kirish (Step Into), {{Resume}} — davom etish.",
              "Pin'ga o'ng tugma → {{Watch This Value}} — qiymat doimiy ko'rinadi."],
      tip: "**Blueprint Debugger** ({{Tools → Debug → Blueprint Debugger}}) — barcha breakpoint'lar, watch'lar va Call Stack (qaysi funksiya qaysini chaqirgani) bir oynada." },
    { h: "Debug Filter",
      p: "Levelda bir xil Blueprint'ning 20 nusxasi bo'lsa, breakpoint hammasida ishlaydi. Blueprint toolbar'idagi **Debug Object** ro'yxatidan aniq nusxani tanlang — vizual oqim (sariq yonuvchi simlar) faqat shu nusxa uchun ko'rinadi." },
    { h: "Output Log",
      table: [["Daraja", "Ma'nosi"],
              ["Display / Log", "Oddiy ma'lumot"],
              ["Warning (sariq)", "Ogohlantirish — e'tibor bering"],
              ["Error (qizil)", "Xato — tuzatish shart"]],
      p2: "Filtrlar: Categories (LogBlueprintUserMessages — Print String, LogScript — Accessed None, LogNavigation...), qidiruv. [[Print String]] da {{Print to Log}} ✔ bo'lsa log'ga ham yoziladi. Packaged o'yinda log: `Saved/Logs/`.",
      warn: "«Accessed None trying to read property X» xabarida Blueprint nomi va funksiya yoziladi — ustiga bossangiz, aynan o'sha node'ga olib boradi. Bu xabarlarni hech qachon e'tiborsiz qoldirmang." },
    { h: "Vizual debug",
      ul: ["[[Draw Debug Line]], [[Draw Debug Sphere]], [[Draw Debug Arrow]], [[Draw Debug String]] — dunyoda chizish (faqat Development build'da).",
           "**Visual Logger** ({{Tools → Debug → Visual Logger}}) — AI va gameplay voqealarini vaqt chizig'iga yozib, keyin kadrma-kadr ko'rib chiqish. Blueprint'dan: [[VisLog Text]], [[VisLog Location]], [[VisLog Box Shape]].",
           "**Gameplay Debugger** ({{'}}) — AI (Kun 44).",
           "Show flags: `show collision`, `show navigation`, `show bounds`."] },
    { h: "Konsol buyruqlari",
      table: [["Buyruq", "Vazifasi"],
              ["stat fps / stat unit", "FPS va kadr vaqtlari (Game, Draw, GPU)"],
              ["slomo 0.2", "Sekinlashtirish — tez hodisalarni ko'rish uchun"],
              ["pause", "Pauza"],
              ["ghost / fly / walk", "Devorlardan o'tish, uchish, oddiy rejim"],
              ["god", "O'lmaslik (shablon Character'da)"],
              ["viewmode wireframe / unlit / lit", "Ko'rinish rejimi"],
              ["r.ScreenPercentage 50", "Render ruxsatini kamaytirish (GPU testi)"],
              ["ke * EventName", "Barcha Actor'larda Custom Event chaqirish!"]],
      tip: "`ke * GiveAllItems` — har qanday Actor'dagi `GiveAllItems` Custom Event'ini konsoldan chaqiradi. O'z debug event'laringizni shunday qiling — maxsus cheat tizimi shart emas. Yana bir usul: **CheatManager** klassi (PlayerController → Cheat Class)." },
    { h: "Amaliy topshiriq",
      steps: ["Loyihangizga ataylab 3 ta xato kiriting (do'stingizdan iltimos qilishingiz ham mumkin): Accessed None, noto'g'ri Branch sharti, ishlamaydigan Bind. Ularni faqat debug vositalari bilan toping.",
              "BTT_Attack va UpdateFocus funksiyalarida breakpoint + Step Into bilan oqimni kuzating.",
              "Dushman AI'si uchun Visual Logger yozuvlari: holat o'zgarishlari va maqsad nuqtalari.",
              "`BP_UEPlayerController` da CheatManager yoki `ke` uchun event'lar: GodMode, GiveAllItems, SkipWave, TeleportToCursor.",
              "Output Log'dagi barcha sariq va qizil xabarlarni nolga tushiring."] }
  ],
  check: ["Breakpoint, Step Into/Over'ni ishlataman", "Watch va Debug Filter'ni bilaman", "Output Log'ni filtrlay olaman", "Visual Logger yozuv qildim", "Cheat event'lari bor", "Loyihada log ogohlantirishlari yo'q"],
  err: [["Breakpoint ishlamayapti", "Debug Object boshqa nusxada yoki node hech qachon bajarilmayapti (oldingi Branch). Oldingi node'ga breakpoint qo'yib tekshiring."],
        ["Draw Debug packaged o'yinda ko'rinmaydi", "Bu normal — Shipping build'da debug chizish o'chiriladi."]],
  ch: "O'z «debug HUD»ingizni yarating: F3 bosilganda ekran burchagida FPS, o'yinchi joylashuvi, faol Gameplay Tag'lar, joriy to'lqin va tirik dushmanlar soni chiqsin — faqat Development build'da.",
  quiz: [["Breakpoint qo'yish tugmasi:", ["F5", "F9", "F10", "F11"], 1, "F9."],
         ["Funksiya ichiga kirib qadamlab ko'rish:", ["Step Over (F10)", "Step Into (F11)", "Resume", "Stop"], 1, "Step Into."],
         ["Konsoldan barcha Actor'larda Custom Event chaqirish:", ["stat unit", "ke * EventName", "slomo", "show collision"], 1, "ke — Kismet Event."]]
},
{
  d: 66, t: "LOYIHA: Qayta ishlatiladigan o'yin shabloni (framework)", time: "5 soat",
  g: "Shu paytgacha yozilgan tizimlarni har qanday yangi o'yinda ishlatsa bo'ladigan toza, hujjatlashtirilgan «starter kit»ga aylantirish.",
  learn: ["Modulli papka tuzilishi", "Core tizimlarni ajratish", "Plugin sifatida qadoqlash (Content-only)", "Hujjatlashtirish", "Demo level", "Migrate — boshqa loyihaga ko'chirish"],
  body: [
    { h: "Maqsad",
      p: "Har yangi o'yinni noldan boshlamaslik uchun o'z **framework**ingizni yarating: Character, Component'lar, Interaction, Inventory, Save, UI asoslari va debug vositalari. 15-modulda o'z o'yiningizni aynan shu framework ustiga qurasiz.",
      table: [["Modul", "Tarkibi"],
              ["Core", "GameMode/State/Instance/Controller base'lari, BFL_Game, Gameplay Tags"],
              ["Character", "BP_HeroBase, Enhanced Input (IA/IMC), kamera rejimlari"],
              ["Components", "BPC_Health, BPC_Stamina, BPC_Interactor, BPC_Inventory, BPC_Loot"],
              ["Interaction", "BPI_Interactable, BP_InteractableBase va namunalar"],
              ["Items", "F_ItemData, DT_Items shablon, BP_PickupBase"],
              ["Save", "SG_Progress, SG_Settings, BPI_Saveable, SaveGameManager"],
              ["UI", "WBP_Button, WBP_OptionSelector, Main/Pause/Settings/GameOver, HUD bloklari"],
              ["Debug", "Cheat'lar, Debug HUD, Visual Logger yordamchilari"]] },
    { h: "Papka tuzilishi",
      bp: `Content/
└── UE90Kit/
    ├── Core/          (GameFramework, Library, Tags)
    ├── Character/     (Blueprints, Input, Camera)
    ├── Components/
    ├── Interaction/
    ├── Items/
    ├── Save/
    ├── UI/            (Common, Menus, HUD, Inventory)
    ├── Debug/
    └── Demo/          (L_KitDemo va namunaviy assetlar — keyin o'chirsa bo'ladi)`,
      tip: "Framework ichida **hech qanday** o'yinga xos narsa bo'lmasin (masalan «Generator» yoki «BossDragon»). Faqat umumiy tizimlar. O'yinga xos narsalar har o'yinning o'z papkasida." },
    { h: "Mustaqillikni tekshirish",
      ul: ["Har Blueprint'ning Reference Viewer'ini oching: `UE90Kit` dan tashqariga (o'yinga xos assetlarga) havola bo'lmasligi kerak.",
           "Shablon assetlar (DT_Items) bo'sh yoki namunaviy bo'lsin.",
           "Barcha sozlanadigan narsalar Instance Editable / Data Asset orqali.",
           "Yangi loyiha yarating va {{Asset Actions → Migrate}} bilan `UE90Kit` ni ko'chiring — xatosiz ochilishi kerak."],
      warn: "Migrate bog'liq assetlarni ham ko'chiradi. Agar ro'yxatda kutilmagan assetlar paydo bo'lsa (masalan levelingizdagi model), demak qayerdadir keraksiz hard reference bor." },
    { h: "Content-only plugin (ixtiyoriy)",
      p: "{{Edit → Plugins → + Add}} → **Content Only** shablon → `UE90Kit`. Plugin'ning `Content/` papkasiga framework'ni ko'chirasiz. Endi uni har loyihaning `Plugins/` papkasiga nusxalab, bitta galochka bilan yoqasiz. Kun 73 dan keyin unga C++ ham qo'shish mumkin." },
    { h: "Hujjatlashtirish",
      steps: ["`README.md` (framework ildizida): nima bor, qanday o'rnatiladi, tezkor boshlash (5 qadam).",
              "Har tizim uchun 5–10 qator: maqsad, asosiy funksiyalar, dispatcher'lar, kengaytirish usuli.",
              "Demo level: har tizimning ishlaydigan namunasi bilan «muzey» — har bir stend yonida izoh (Text Render Actor).",
              "CHANGELOG — versiyalar (v0.1, v0.2 ...)."] }
  ],
  check: ["Framework alohida papkada va o'yinga xos narsasiz", "Migrate bilan yangi loyihaga xatosiz ko'chadi", "Har tizim hujjatlashtirilgan", "Demo level bor", "Gameplay Tags va BFL ishlatilgan"],
  err: [["Migrate'dan keyin yangi loyihada Input ishlamayapti", "Enhanced Input sozlamalari, Collision kanallari va Gameplay Tags `Config/*.ini` fayllarida — ular Migrate bilan ko'chmaydi. README'da qo'lda sozlash qadamlarini yozing yoki ini qatorlarini nusxalang."],
        ["Struct'li Blueprint'lar ko'chirilgandan keyin buzildi", "Avval Struct va Enum'larni, keyin ularga bog'liq Blueprint'larni ko'chiring va qayta kompilyatsiya qiling."]],
  ch: "Framework'ga «Interaction Prompt» va «Inventory» uchun gamepad ikonkalari tizimini qo'shing: oxirgi ishlatilgan kiritish qurilmasiga qarab (klaviatura yoki gamepad) UI'dagi tugma belgilari avtomatik almashsin.",
  quiz: [["Framework'da nima bo'lmasligi kerak?", ["BPC_Health", "O'yinga xos «BossDragon»", "BFL_Game", "WBP_Button"], 1, "Faqat umumiy tizimlar."],
         ["Migrate bilan nima ko'chmaydi?", ["Blueprint'lar", "Config .ini sozlamalari", "Struct'lar", "Materiallar"], 1, "Collision kanallari, Tags va hokazo — qo'lda."]]
}
);
