// Modul 6 — UI: UMG (Kun 31–36)
window.UE_LESSONS.push(
{
  d: 31, t: "UMG asoslari: Widget Blueprint", time: "2–3 soat",
  g: "Unreal'ning UI tizimi UMG bilan tanishish: widget yaratish, joylashtirish va ekranga chiqarish.",
  learn: ["Widget Blueprint (WBP_)", "Designer va Graph", "Canvas Panel va Anchor'lar", "Horizontal/Vertical Box, Overlay, Size Box", "Text, Image, Button, Progress Bar", "Create Widget va Add to Viewport"],
  body: [
    { h: "Widget Blueprint",
      p: "Content Browser → {{User Interface → Widget Blueprint}} → `User Widget` → `WBP_Test`. Oynada ikki rejim: **Designer** (vizual joylashtirish) va **Graph** (mantiq — oddiy Blueprint kabi).",
      table: [["Panel", "Vazifasi"],
              ["Palette", "Barcha widget'lar: Text, Button, Image..."],
              ["Hierarchy", "Widget'lar daraxti"],
              ["Details", "Tanlangan widget sozlamalari: Slot, Appearance, Behavior"],
              ["Animations", "UI animatsiyalari (Kun 35)"]] },
    { h: "Layout panellari",
      table: [["Panel", "Vazifasi"],
              ["Canvas Panel", "Erkin joylashtirish, Anchor bilan. Odatda faqat eng tashqi qatlamda"],
              ["Horizontal / Vertical Box", "Elementlarni qator yoki ustun qilib terish"],
              ["Overlay", "Ustma-ust qo'yish (fon + matn)"],
              ["Grid / Uniform Grid", "Jadval (inventar)"],
              ["Size Box", "Aniq o'lcham berish"],
              ["Scale Box", "Ichidagini moslab kattalashtirish"],
              ["Border", "Fon va padding bilan konteyner"],
              ["Scroll Box", "Aylantiriladigan ro'yxat"],
              ["Spacer", "Bo'sh joy"]],
      tip: "Canvas Panel'ni ichma-ich ko'p ishlatmang. Professional UI asosan Box'lar va Overlay'lar bilan quriladi — ular har xil ekran o'lchamlarida yaxshiroq moslashadi." },
    { h: "Anchor'lar — ekran o'lchamiga moslashish",
      p: ["Canvas ichidagi har bir element **Anchor**ga (langar) ega: u ekranning qaysi nuqtasiga «bog'langan». Health bar chap pastki burchakka, minimap esa o'ng yuqoriga bog'lanadi. Ekran 1080p dan 4K ga o'zgarsa ham element o'z burchagida qoladi.",
          "Slot → {{Anchors}} — tayyor 16 variant. {{Ctrl}} bilan tanlasangiz pozitsiya ham, {{Shift}} bilan esa alignment ham moslashadi."],
      warn: "Hammasini markazga (standart) anchor qilib qoldirish — eng ko'p uchraydigan xato. Keng ekranda UI markazga «yig'ilib», chetlari bo'sh qoladi." },
    { h: "Asosiy widget'lar",
      table: [["Widget", "Muhim sozlamalar"],
              ["Text", "Font, Size, Color, Justification, Auto Wrap"],
              ["Rich Text Block", "Bir matnda turli uslublar (<b>, <red>)"],
              ["Image", "Brush → Texture/Material, Tint, Draw As (Box/Image)"],
              ["Button", "Style: Normal/Hovered/Pressed; event'lar OnClicked, OnHovered"],
              ["Progress Bar", "Percent (0–1), Fill Color, Bar Fill Type"],
              ["Slider, Check Box, Combo Box", "Sozlamalar menyusi uchun"],
              ["Editable Text", "Matn kiritish (ism)"]] },
    { h: "Ekranga chiqarish",
      graph: {
        t: "BP_UEPlayerController · Event Graph",
        n: [
          { id: "b", k: "event", t: "Event BeginPlay", x: 0, y: 0, o: [">"] },
          { id: "cw", k: "func", t: "Create WBP HUD Widget", x: 1, y: 0, i: [">", "class Class = WBP_HUD", "obj Owning Player = self"], o: [">", "obj Return Value"], s: 1 },
          { id: "s", k: "set", t: "SET", x: 2, y: 0, i: [">", "obj HUDRef"], o: [">", "obj"], s: 2 },
          { id: "av", k: "func", t: "Add to Viewport", x: 3, y: 0, i: [">", "obj Target", "int ZOrder = 0"], o: [">"], s: 3 }
        ],
        w: ["b.0-cw.0", "cw.0-s.0", "cw.1-s.1", "s.0-av.0", "s.1-av.1"],
        how: ["[[Create Widget]] — Class'da `WBP_HUD` ni tanlang (node nomi o'zgaradi). Owning Player — Self (Controller).",
              "Return Value'ga o'ng tugma → {{Promote to Variable}} → `HUDRef`.",
              "[[Add to Viewport]] — widget ekranda paydo bo'ladi. Yopish: HUDRef → [[Remove from Parent]]."] },
      tip: "Widget havolasini o'zgaruvchiga saqlang — keyin uni yangilash yoki yopish kerak bo'ladi. Har safar yangi Create Widget qilish xotirani to'ldiradi va ustma-ust nusxalar paydo bo'ladi." },
    { h: "Amaliy topshiriq",
      steps: ["`WBP_Test` da: chap yuqorida o'yin nomi (Text), o'ng yuqorida «Ball: 0», pastda markazda «[E] Interact» yozuvi — har biri to'g'ri anchor bilan.",
              "Markazda Button «Salom» — OnClicked'da matnni «Bosildi!» ga o'zgartirsin (Text'da {{Is Variable}} ✔ qiling).",
              "`BP_UEPlayerController` da Create Widget + Add to Viewport.",
              "Designer'ning yuqorisidagi ekran o'lchamini (Screen Size) 720p, 1080p, 4K, 21:9 qilib almashtiring — joylashuv buzilmasligini tekshiring.",
              "Sichqoncha kursorini ko'rsatish: Controller'da {{Show Mouse Cursor}} ✔ (tugmani bosish uchun)."] }
  ],
  check: ["Widget Blueprint yaratdim", "Anchor'larni to'g'ri qo'ydim", "Box'lar bilan layout qilaman", "Create Widget va Add to Viewport'ni Controller'da ishlatdim", "Button OnClicked ishlaydi"],
  err: [["Widget ekranda ko'rinmayapti", "Add to Viewport chaqirilmagan yoki Visibility = Hidden/Collapsed."],
        ["Button bosilmayapti", "Ustida boshqa widget (masalan, to'liq ekranli Image) turibdi va bosishni ushlab qolyapti. Uning Visibility'sini {{Not Hit-Testable (Self & All Children)}} qiling."]],
  ch: "O'yindagi «buyum olindi» xabarini yasang: o'ng tomonda paydo bo'ladigan va 3 soniyadan keyin yo'qoladigan kichik panel (ikonka + nom). Hozircha animatsiyasiz.",
  quiz: [["UI ning ekran burchagiga bog'lanishini nima ta'minlaydi?", ["Z Order", "Anchor", "Padding", "Visibility"], 1, "Anchor."],
         ["UI odatda qaysi klassda yaratiladi?", ["GameMode", "PlayerController", "GameState", "Pickup"], 1, "UI — lokal o'yinchiga tegishli."],
         ["Ustma-ust qo'yish uchun panel:", ["Horizontal Box", "Overlay", "Grid", "Spacer"], 1, "Overlay."]]
},
{
  d: 32, t: "HUD: Health, Stamina va to'g'ri yangilash usuli", time: "3 soat",
  g: "O'yin HUD'ini yaratish va uni Binding emas, event (dispatcher) asosida samarali yangilash.",
  learn: ["HUD tarkibi", "Property Binding va uning narxi", "Event-driven yangilash", "Widget ichida widget (kompozitsiya)", "Crosshair va interaction prompt", "Format Text"],
  body: [
    { h: "Ikki usul: Binding va Event",
      p: ["**Binding** — Designer'da Text yoki Percent yonidagi {{Bind}} tugmasi. Funksiya yaratiladi va u **har kadrda** chaqiriladi. Qulay, lekin 50 ta binding har kadrda ishlaydi — UI ko'p bo'lsa unumdorlik pasayadi.",
          "**Event-driven** — qiymat o'zgargandagina yangilash: `BPC_Health.OnHealthChanged` dispatcher'iga obuna bo'lib, faqat o'shanda Progress Bar'ni o'zgartirish. Professional usul shu."],
      table: [["", "Binding", "Event"],
              ["Yozish", "Tez", "Biroz ko'proq"],
              ["Unumdorlik", "Har kadr", "Faqat o'zgarganda"],
              ["Qachon", "Prototip, kichik UI", "Doimiy ishlatish uchun"]] },
    { h: "WBP_HUD tuzilishi",
      bp: `WBP_HUD (Canvas Panel)
├── [Overlay — chap past]  WBP_StatBars
│      ├── PB_Health  (Progress Bar, qizil)
│      └── PB_Stamina (Progress Bar, yashil, ingichka)
├── [Image — markaz]       Crosshair
├── [WBP_InteractPrompt — markazdan pastroq]  "[E] Eshikni ochish"
└── [Vertical Box — o'ng past]  Ammo / Coins`,
      tip: "Katta UI'ni kichik widget'larga bo'ling: `WBP_StatBars`, `WBP_InteractPrompt`. Ular Palette'dagi {{User Created}} bo'limida chiqadi va boshqa widget ichiga qo'yiladi." },
    { h: "Event bilan ulash",
      graph: {
        t: "WBP_StatBars · Event Graph",
        n: [
          { id: "ec", k: "event", t: "Event Construct", x: 0, y: 0, o: [">"] },
          { id: "op", k: "pure", t: "Get Owning Player Pawn", x: 0, y: 2, o: ["obj Return Value"] },
          { id: "gc", k: "pure", t: "Get Component by Class", x: 1, y: 2, i: ["obj Target", "class Component Class = BPC_Health"], o: ["obj Return Value"], s: 1 },
          { id: "bd", k: "func", t: "Bind Event to On Health Changed", x: 2, y: 0, i: [">", "obj Target", "evt Event"], o: [">"], s: 2 },
          { id: "h", k: "custom", t: "HandleHealthChanged", sub: "Custom Event", x: 0, y: 5, o: ["evt", ">", "float New Health", "float Delta"], s: 3 },
          { id: "dv", k: "op", t: "÷", x: 1, y: 6.4, i: ["float", "float = 100.0"], o: ["float"] },
          { id: "pb", k: "var", t: "PB_Health", x: 1, y: 5, o: ["obj"] },
          { id: "sp", k: "func", t: "Set Percent", sub: "Target is Progress Bar", x: 2, y: 5, i: [">", "obj Target", "float In Percent"], o: [">"] }
        ],
        w: ["ec.0-bd.0", "op.0-gc.0", "gc.0-bd.1", "h.0-bd.2", "h.1-sp.0", "h.2-dv.0", "dv.0-sp.2", "pb.0-sp.1"],
        how: ["Widget'da BeginPlay o'rniga [[Event Construct]].",
              "[[Get Owning Player Pawn]] → [[Get Component by Class]] (BPC_Health) → [[Bind Event to On Health Changed]].",
              "Custom Event'da Progress Bar'ni yangilang. Designer'da Progress Bar'ning {{Is Variable}} ✔ bo'lsa, u grafda o'zgaruvchi bo'lib ko'rinadi.",
              "Bind'dan keyin boshlang'ich qiymatni bir marta qo'lda ko'rsatishni unutmang."] },
      warn: "Pawn o'lib qayta tug'ilsa, widget eski Pawn'ning component'iga bog'langan bo'lib qoladi. PlayerController'da [[Event On Possess]] dan keyin HUD'ga «yangi Pawn» haqida xabar bering va qayta Bind qiling." },
    { h: "Interaction prompt",
      ul: ["`BPC_Interactor` ga `OnFocusChanged(Actor)` dispatcher (Kun 25 da qo'shgan edik).",
           "`WBP_InteractPrompt` obuna bo'ladi: Actor valid bo'lsa → `GetInteractText` (interface message) → Text'ga, Visibility = Visible; aks holda Collapsed.",
           "Matn formatlash: [[Format Text]] — «[{Key}] {Action}» shablonida pinlar avtomatik paydo bo'ladi.",
           "Visibility: **Collapsed** — joy egallamaydi, **Hidden** — joy egallaydi, lekin ko'rinmaydi, **Hit Test Invisible** — ko'rinadi, lekin bosilmaydi (HUD uchun eng yaxshi tanlov)."] },
    { h: "Amaliy topshiriq",
      steps: ["`WBP_HUD`, `WBP_StatBars`, `WBP_InteractPrompt` yarating.",
              "Health va Stamina barlari dispatcher orqali yangilansin (Binding'siz).",
              "Health 30% dan past bo'lsa bar qizil-to'q sariq bo'lib miltillasin (rangni o'zgartirish).",
              "Markazda crosshair, fokus bo'lganda kattalashsin.",
              "Inventar o'zgarganda o'ng pastda tangalar soni yangilansin (`OnInventoryChanged`).",
              "Respawn'dan keyin HUD to'g'ri ishlashini tekshiring."] }
  ],
  check: ["HUD event-driven yangilanadi", "Kichik widget'lardan yig'ilgan", "Interaction prompt fokusga ergashadi", "Visibility turlarini bilaman", "Respawn'dan keyin ham ishlaydi"],
  err: [["Bar boshida bo'sh, faqat zarardan keyin to'ladi", "Bind'dan keyin boshlang'ich qiymatni qo'lda bir marta o'rnatish kerak."],
        ["Get Owning Player Pawn None qaytaryapti", "Widget Pawn possess qilinishidan oldin yaratilgan. Controller'da OnPossess'dan keyin yarating yoki Pawn'ni keyinroq so'rang."]],
  ch: "«Kechikuvchi» health bar (Souls uslubida): zarar olganda oq bar darhol kamayadi, uning orqasidagi sariq bar esa 0.5 s dan keyin asta-sekin yetib boradi.",
  quiz: [["Binding'ning kamchiligi:", ["Ishlamaydi", "Har kadr chaqiriladi", "Faqat C++ da", "Ranglarni o'zgartirmaydi"], 1, "Har kadr hisoblash."],
         ["HUD elementlari bosilishni ushlamasligi uchun Visibility:", ["Visible", "Hit Test Invisible", "Collapsed", "Hidden"], 1, "Ko'rinadi, lekin bosilmaydi."],
         ["Widget yaratilganda ishlaydigan event:", ["BeginPlay", "Event Construct", "Tick", "On Possess"], 1, "Event Construct (yoki Pre Construct — Designer'da)."]]
},
{
  d: 33, t: "Menyular: Main Menu, Pause va Input Mode", time: "3 soat",
  g: "To'liq menyu oqimi: bosh menyu, pauza, o'lim ekrani, level'lar orasida o'tish va input rejimlari.",
  learn: ["Main Menu level", "Open Level", "Input Mode: Game Only / UI Only / Game and UI", "Set Game Paused", "Widget Stack (menyular ichma-ich)", "Klaviatura/gamepad bilan navigatsiya"],
  body: [
    { h: "Menyu oqimi",
      bp: `L_MainMenu ── [Play] ──▶ L_Game
     │                     │
     ├─ [Settings]          ├─ Esc ──▶ WBP_Pause ── [Resume] / [Settings] / [Main Menu]
     └─ [Quit]              └─ O'lim ──▶ WBP_GameOver ── [Retry] / [Main Menu]` },
    { h: "Input Mode",
      table: [["Node", "Holat"],
              ["Set Input Mode Game Only", "O'yin — kursor yo'q, barcha input o'yinga"],
              ["Set Input Mode UI Only", "Menyu — input faqat UI ga (Widget to Focus ni bering)"],
              ["Set Input Mode Game and UI", "Inventar ochiq, lekin o'yin davom etadi"]],
      p2: "Har biri bilan birga {{Show Mouse Cursor}} ni ham to'g'ri o'rnating. Bularni bitta `SetUIMode(bool)` funksiyasiga jamlash xatolarni kamaytiradi.",
      warn: "UI Only rejimida Esc tugmasini Enhanced Input ushlamaydi — menyu yopilishi uchun widget'ning o'zida [[On Key Down]] funksiyasini override qiling yoki Game and UI rejimidan foydalaning." },
    { h: "Main Menu",
      steps: ["`L_MainMenu` — oddiy fon sahnasi (yoki 2D fon), `GM_MainMenu` (Default Pawn = None) bilan.",
              "`WBP_MainMenu`: Play, Settings, Quit tugmalari, o'yin nomi.",
              "`PC_MainMenu` BeginPlay: Create → Add to Viewport → Input Mode UI Only → Show Mouse Cursor.",
              "Play → [[Open Level (by Object Reference)]] `L_Game`. Quit → [[Quit Game]].",
              "{{Project Settings → Maps & Modes}}: Game Default Map = `L_MainMenu`."] },
    { h: "Pause menyu",
      graph: {
        t: "BP_UEPlayerController · Event Graph",
        n: [
          { id: "ip", k: "input", t: "IA_Pause", sub: "Trigger when Paused ✔", x: 0, y: 0, o: ["> Started"] },
          { id: "gp", k: "pure", t: "Is Game Paused", x: 0, y: 2, o: ["bool Return Value"] },
          { id: "br", k: "flow", t: "Branch", x: 1, y: 0, i: [">", "bool Condition"], o: ["> True", "> False"] },
          { id: "rs", k: "func", t: "Resume", x: 2, y: 0, i: [">", "obj Target = self"], o: [">"] },
          { id: "sp", k: "func", t: "Set Game Paused", x: 2, y: 2.4, i: [">", "bool Paused = true"], o: [">", "bool Return Value"], s: 1 },
          { id: "cw", k: "func", t: "Create WBP Pause Widget", x: 3, y: 2.4, i: [">", "class Class = WBP_Pause", "obj Owning Player = self"], o: [">", "obj Return Value"] },
          { id: "av", k: "func", t: "Add to Viewport", x: 4, y: 2.4, i: [">", "obj Target"], o: [">"] },
          { id: "im", k: "func", t: "Set Input Mode Game And UI", x: 4, y: 5, i: [">", "obj Player Controller = self", "obj In Widget to Focus"], o: [">"], s: 2 },
          { id: "mc", k: "set", t: "SET Show Mouse Cursor", x: 4, y: 7.6, i: [">", "bool Value = true"], o: [">"] }
        ],
        w: ["ip.0-br.0", "gp.0-br.1", "br.0-rs.0", "br.1-sp.0", "sp.0-cw.0", "cw.0-av.0", "cw.1-av.1", "av.0-im.0", "cw.1-im.2", "im.0-mc.0"],
        how: ["`IA_Pause` Input Action'ida {{Trigger when Paused}} ✔ — aks holda pauzadan chiqib bo'lmaydi.",
              "Pauza: [[Set Game Paused]] → widget → [[Set Input Mode Game And UI]] (fokus — pauza widget'i) → kursor.",
              "`Resume` funksiyasi teskari amallarni bajaradi: Remove from Parent, Set Game Paused ✘, Input Mode Game Only, kursor ✘."] },
      tip: "Pauza paytida input ishlashi uchun Input Action'da {{Trigger when Paused}} ✔ bo'lishi kerak. Widget animatsiyalari pauzada ham ishlaydi." },
    { h: "Klaviatura va gamepad navigatsiyasi",
      ul: ["Menyu ochilganda birinchi tugmaga fokus bering: [[Set Keyboard Focus]] yoki Input Mode'ning {{In Widget to Focus}} pini.",
           "Button'larda {{Is Focusable}} ✔. Navigation sozlamasi (Details → Navigation) bilan yo'nalishlarni boshqarish mumkin.",
           "Fokusdagi tugma ko'rinib turishi kerak — Style'da Hovered holatini fokus uchun ham ishlating yoki [[On Focus Received]] da o'zgartiring.",
           "**CommonUI** plagini (Epic) — gamepad, menyu stack va kiritish turini avtomatik boshqaradi. Katta loyihalar uchun tavsiya etiladi; asoslarni bilgandan so'ng o'rganing."] },
    { h: "Amaliy topshiriq",
      steps: ["Main Menu leveli va widget'i (Play, Settings — hozircha bo'sh, Quit).",
              "Pause menyu: Resume, Restart ([[Open Level]] joriy level — [[Get Current Level Name]]), Main Menu.",
              "Game Over ekrani: o'yinchi o'lganda 2 s dan keyin chiqsin — Retry va Main Menu.",
              "Barcha menyular klaviatura (strelkalar + Enter) bilan ham boshqarilsin.",
              "Menyulardan o'yinga qaytganda kursor yashirinsin va input o'yinga qaytsin."] }
  ],
  check: ["Main Menu → Game → Pause → Main Menu oqimi ishlaydi", "Input Mode'larni to'g'ri almashtiraman", "Pauza va Trigger when Paused'ni bilaman", "Game Over ekrani bor", "Menyular klaviatura bilan boshqariladi"],
  err: [["Pauzadan keyin personaj harakatlanmaydi", "Input Mode UI Only'da qolib ketgan. Resume'da Game Only'ga qaytaring."],
        ["Main Menu'ga qaytgach kursor yo'q", "Yangi levelda PlayerController qayta yaratiladi — PC_MainMenu BeginPlay'da kursor va Input Mode'ni qayta o'rnating."]],
  ch: "Yuklanish ekrani: level almashganda «Yuklanmoqda...» widget'i chiqsin. Maslahat: [[Open Level]] dan oldin widget'ni ko'rsating; murakkabroq yechim uchun Async Loading Screen plagini va Level Streaming (Kun 63) ni o'rganing.",
  quiz: [["Menyu ochiqligida faqat UI'ga input:", ["Game Only", "UI Only", "Game and UI", "Ignore Input"], 1, "UI Only."],
         ["Pauzada Input Action ishlashi uchun:", ["Consume Input", "Trigger when Paused", "Hold", "Priority"], 1, "Input Action sozlamasi."],
         ["O'yindan chiqish node'i:", ["Exit", "Quit Game", "Close", "End Play"], 1, "Quit Game."]]
},
{
  d: 34, t: "Inventar UI: dinamik ro'yxat va grid", time: "3–4 soat",
  g: "Inventar component'ini vizual qilish: slot widget'larini dinamik yaratish, tooltip va drag & drop.",
  learn: ["Slot widget (WBP_InventorySlot)", "Wrap Box / Uniform Grid'da dinamik yaratish", "Data Table'dan ikonka va nom", "Tooltip widget", "Drag & Drop Operation", "List View (katta ro'yxatlar)"],
  body: [
    { h: "Arxitektura",
      bp: `WBP_Inventory
├── Title, Weight text
└── [Uniform Grid Panel] GridSlots
       └── WBP_InventorySlot × N   (dinamik yaratiladi)
              ├── Border (fon, hover rangi)
              ├── Image  Icon
              └── Text   Quantity

Ma'lumot oqimi:
BPC_Inventory.OnInventoryChanged ──▶ WBP_Inventory.Refresh()
   ──▶ GridSlots.ClearChildren
   ──▶ For each slot: Create WBP_InventorySlot (SlotIndex, SlotData) ──▶ Add Child to Uniform Grid (Row, Column)` },
    { h: "Slot widget",
      steps: ["`WBP_InventorySlot`: Size Box (80×80) → Overlay → Border, Image, Text (o'ng past).",
              "O'zgaruvchilar: `SlotIndex` (Int), `SlotData` (F_InventorySlot), `InventoryRef` (BPC_Inventory) — hammasi {{Expose on Spawn}} ✔.",
              "Event Construct: Data Table'dan Icon (Soft → [[Load Asset Blocking]] yoki async) va DisplayName'ni oling. Quantity > 1 bo'lsa son ko'rsatilsin.",
              "Bo'sh slot uchun ikonka yashirin bo'lsin.",
              "[[On Mouse Button Down]] override: o'ng tugma → `InventoryRef.UseItem(SlotIndex)`."],
      tip: "Row va Column hisoblash: Row = Index / Columns (butun bo'lish), Column = Index % Columns. Integer bo'linish uchun [[Integer / Integer]] va [[% (Integer)]] node'larini ishlating." },
    { h: "Tooltip",
      p: "Slot'ning Details → {{Behavior → Tool Tip Widget}} → Bind → funksiya ichida `WBP_ItemTooltip` yaratib qaytaring (Name, Description, Weight, Value). U sichqoncha ustiga kelganda avtomatik ko'rinadi." },
    { h: "Drag & Drop",
      bpt: "Mantiq (psevdokod)", bp: `// WBP_InventorySlot
[On Mouse Button Down] ──▶ [Detect Drag if Pressed] (Left Mouse Button)

[On Drag Detected] ──▶ [Create Drag & Drop Operation] (Class ← DDO_InventorySlot,
                         Payload ← Self, Default Drag Visual ← yangi WBP_InventorySlot nusxasi)

[On Drop] (Operation) ──▶ [Cast To DDO_InventorySlot]
   ──▶ InventoryRef.SwapSlots(Operation.SourceIndex, SlotIndex) ──▶ return true

// Inventardan tashqariga tashlash: WBP_Inventory fonidagi On Drop → DropItem(SourceIndex)`,
      p2: "`DDO_InventorySlot` — {{Blueprint Class → DragDropOperation}}, ichida `SourceIndex` o'zgaruvchisi." },
    { h: "Katta ro'yxatlar: List View",
      p: "Yuzlab element bo'lsa (do'kon, yutuqlar ro'yxati) har biri uchun widget yaratish og'ir. **List View / Tile View** faqat ekranda ko'rinayotgan elementlar uchun widget yaratadi va ularni qayta ishlatadi. Entry widget'i {{User Object List Entry}} interface'ini amalga oshiradi, ma'lumot esa UObject sifatida beriladi.",
      warn: "List View'ga to'g'ridan-to'g'ri struct berib bo'lmaydi — har element uchun kichik Object (masalan `UO_ItemEntry`, parent: Object) yaratish kerak." },
    { h: "Amaliy topshiriq",
      steps: ["`WBP_Inventory` (5×4 grid) — `I`/Tab bilan ochilib-yopiladi (Game and UI rejim).",
              "Slotlar Data Table'dan ikonka va son bilan chiqsin, OnInventoryChanged'da yangilansin.",
              "Tooltip: nom, tavsif, og'irlik.",
              "O'ng tugma — ishlatish (Potion davolaydi).",
              "Drag & drop bilan slotlarni almashtirish (`SwapSlots` funksiyasini BPC_Inventory'ga qo'shing).",
              "Inventar oynasidan tashqariga sudrab tashlash — Drop."] }
  ],
  check: ["Slot widget'lar dinamik yaratiladi", "Data Table'dan ikonka chiqadi", "Tooltip ishlaydi", "Drag & drop bilan slotlar almashadi", "UI inventar o'zgarganda o'zi yangilanadi"],
  err: [["Har ochilganda slotlar ko'payib ketyapti", "Refresh boshida [[Clear Children]] chaqirilmagan."],
        ["On Drop chaqirilmayapti", "Slot widget'ida Visibility = Visible (Hit-Testable) bo'lishi va drop qilingan joy widget ustida bo'lishi kerak."]],
  ch: "Ekipirovka slotlari: inventar yonida «Qurol» va «Zirh» slotlari. Faqat mos `E_ItemType` dagi buyumni sudrab qo'yish mumkin bo'lsin, noto'g'ri tur bo'lsa slot qizil rangda yonsin.",
  quiz: [["Butun sonli qoldiq (ustun indeksi) uchun:", ["/", "%", "Clamp", "Round"], 1, "Modul operatori."],
         ["Yuzlab element uchun samarali widget:", ["Vertical Box", "List View", "Canvas", "Overlay"], 1, "Widget'larni qayta ishlatadi."],
         ["Drag boshlanishini aniqlash node'i:", ["On Drop", "Detect Drag if Pressed", "On Clicked", "Set Focus"], 1, "Keyin On Drag Detected chaqiriladi."]]
},
{
  d: 35, t: "UI animatsiya, uslub va moslashuvchanlik", time: "2–3 soat",
  g: "UI'ni jonli va professional qilish: animatsiyalar, yagona uslub, shriftlar va turli ekranlarga moslashish.",
  learn: ["Widget Animations", "Play Animation, Reverse, Event'lar", "Shrift import va Font Family", "Umumiy uslub (Style) va qayta ishlatiladigan tugma", "DPI Scaling", "Safe Zone"],
  body: [
    { h: "Widget animatsiyalari",
      steps: ["Widget'da pastdagi {{Animations → + Animation}} → `Anim_FadeIn`.",
              "{{+ Track}} → widget'ni tanlang → {{Render Opacity}} va {{Transform}} trek'lari.",
              "0 s: Opacity 0, Translation Y = 30; 0.25 s: Opacity 1, Y = 0. Key'lar orasida egri chiziq (Cubic).",
              "Graph'da: [[Play Animation]] (Anim_FadeIn) — Event Construct'da.",
              "Yopilishda: [[Play Animation Reverse]] → [[Bind to Animation Finished]] → Remove from Parent."],
      tip: "Yaxshi UI animatsiyasi qisqa: 0.15–0.3 soniya. Uzun animatsiya o'yinchini kutishga majbur qiladi va zeriktiradi." },
    { h: "Qayta ishlatiladigan tugma",
      p: "Har menyuda tugmani qayta sozlamang. `WBP_Button` yarating: ichida Button + Text, o'zgaruvchilar `Label` (Text, Instance Editable), Event Dispatcher `OnClicked`. **Event Pre Construct** da Label'ni Text'ga bering — Designer'da darhol ko'rinadi. Hover'da kichik kattalashish animatsiyasi va ovoz.",
      graph: {
        t: "WBP_Button · Event Graph",
        n: [
          { id: "pc", k: "event", t: "Event Pre Construct", x: 0, y: 0, o: [">", "bool Is Design Time"], s: 1 },
          { id: "lb", k: "var", t: "Label", x: 0, y: 2.4, o: ["text"] },
          { id: "tl", k: "var", t: "TXT_Label", x: 0, y: 3.4, o: ["obj"] },
          { id: "st", k: "func", t: "Set Text", sub: "Target is Text Block", x: 1, y: 0, i: [">", "obj Target", "text In Text"], o: [">"] },
          { id: "oh", k: "event", t: "On Hovered (Button)", x: 0, y: 5, o: [">"] },
          { id: "pa", k: "func", t: "Play Animation", x: 1, y: 5, i: [">", "obj In Animation = Anim_Hover"], o: [">", "obj Return Value"] },
          { id: "ps", k: "func", t: "Play Sound 2D", x: 2, y: 5, i: [">", "obj Sound = S_UI_Hover"], o: [">"] },
          { id: "oc", k: "event", t: "On Clicked (Button)", x: 0, y: 8, o: [">"] },
          { id: "ps2", k: "func", t: "Play Sound 2D", x: 1, y: 8, i: [">", "obj Sound = S_UI_Click"], o: [">"] },
          { id: "cl", k: "func", t: "Call On Clicked", x: 2, y: 8, i: [">", "obj Target = self"], o: [">"], s: 2 }
        ],
        w: ["pc.0-st.0", "tl.0-st.1", "lb.0-st.2", "oh.0-pa.0", "pa.0-ps.0", "oc.0-ps2.0", "ps2.0-cl.0"],
        how: ["[[Event Pre Construct]] Designer'da ham ishlaydi — Label o'zgarishi darhol ko'rinadi.",
              "Ichki Button'ning OnClicked'ini o'zimizning `OnClicked` Event Dispatcher'imiz orqali tashqariga chiqaramiz — menyular faqat shunga obuna bo'ladi."] },
      p2: "Endi barcha menyular shu tugmadan foydalanadi. Uslubni bir joyda o'zgartirsangiz, hamma joyda o'zgaradi." },
    { h: "Shriftlar",
      ul: ["TTF/OTF faylni Content Browser'ga tashlang → **Font Face** va **Font** asset'lari yaratiladi.",
           "Font asset'ida Regular, Bold va boshqa variantlarni bitta oilaga yig'ing.",
           "O'zbek harflari (o', g', sh) va kirill uchun shriftda kerakli glyph'lar borligini tekshiring. Google Fonts'dagi Inter, Roboto, Noto Sans bu talabga javob beradi.",
           "Shrift litsenziyasini tekshiring — o'yinda ishlatish uchun ruxsat bo'lishi kerak (OFL — bepul)."] },
    { h: "DPI Scaling va Safe Zone",
      p: ["{{Project Settings → User Interface → DPI Scaling}}: UI ekran o'lchamiga qarab kattalashadi. Standart: 1080p da 1.0. Designer'da turli o'lchamlarni sinab ko'ring.",
          "**Safe Zone** widget'i — televizor va telefonlarda (notch, kesilgan burchaklar) UI xavfsiz hududda qolishini ta'minlaydi. Butun HUD'ni Safe Zone ichiga o'rang."],
      warn: "Kichik shriftlar (14 px dan kichik) televizor va Steam Deck'da o'qilmaydi. HUD matni kamida 18–20 px bo'lsin." },
    { h: "Amaliy topshiriq",
      steps: ["`WBP_Button` yarating va barcha menyulardagi tugmalarni u bilan almashtiring.",
              "Har menyuga Fade+Slide in/out animatsiyasini qo'shing.",
              "«Buyum olindi» xabari (Kun 31 challenge): o'ngdan kirib, 2 s turib, chiqib ketsin.",
              "Bitta shrift oilasini import qilib, butun UI'da ishlating.",
              "HUD'ni Safe Zone ichiga oling va 21:9 hamda 4:3 ekranlarda tekshiring.",
              "Zarar olganda ekran chetlari qizarib o'chsin (to'liq ekranli Image + Opacity animatsiyasi)."] }
  ],
  check: ["Widget animatsiyalarini yarataman va ijro etaman", "Qayta ishlatiladigan WBP_Button bor", "Pre Construct nima uchun kerakligini bilaman", "Shrift import qildim", "UI har xil ekranlarda to'g'ri ko'rinadi"],
  err: [["Pre Construct'da o'zgartirish Designer'da ko'rinmayapti", "Widget'ni Compile qiling va asosiy widget'ni qayta oching."],
        ["Animatsiya tugashini kutmasdan widget yo'qoladi", "Remove from Parent'ni animatsiya Finished event'iga ulang."]],
  ch: "Hover'da tugma ortida yorug'lik «oqib o'tadigan» effekt: Material'li Image (Kun 50 bilimlari kerak) yoki ikkita Image + Translation animatsiyasi bilan.",
  quiz: [["Designer'da ham ishlaydigan event:", ["Event Construct", "Event Pre Construct", "Tick", "BeginPlay"], 1, "Pre Construct Editor'da ham chaqiriladi."],
         ["Telefon notch'idan himoya qiluvchi widget:", ["Size Box", "Safe Zone", "Spacer", "Border"], 1, "Safe Zone."],
         ["Yaxshi UI animatsiyasi davomiyligi:", ["2–3 s", "0.15–0.3 s", "5 s", "1 kadr"], 1, "Qisqa va sezilarli."]]
},
{
  d: 36, t: "LOYIHA: To'liq menyu tizimi + HUD + Sozlamalar", time: "4–5 soat",
  g: "Haqiqiy o'yindagi kabi to'liq UI paketi: menyular, HUD, inventar va saqlanadigan grafik/audio sozlamalar.",
  learn: ["Game User Settings", "Ruxsat (resolution), oyna rejimi, VSync", "Scalability (Quality) darajalari", "Ovoz balandligi (Sound Class Mix — kirish)", "Sichqoncha sezgirligi", "Sozlamalarni saqlash va qo'llash"],
  body: [
    { h: "Talablar",
      table: [["Ekran", "Tarkibi"],
              ["Main Menu", "Play, Settings, Credits, Quit — animatsiyali"],
              ["Settings", "Grafika / Audio / Boshqaruv tablari; Apply va Back"],
              ["HUD", "Health, Stamina, crosshair, prompt, buyum xabarlari"],
              ["Inventory", "Grid, tooltip, drag & drop"],
              ["Pause / Game Over", "Kun 33 dagi"]] },
    { h: "Game User Settings",
      p: "Unreal'da grafik sozlamalar uchun tayyor obyekt bor: [[Get Game User Settings]]. U o'zgarishlarni `GameUserSettings.ini` ga saqlaydi.",
      table: [["Node", "Vazifasi"],
              ["Set Screen Resolution / Get Supported...", "Ruxsat"],
              ["Set Fullscreen Mode", "Fullscreen, Windowed Fullscreen, Windowed"],
              ["Set VSync Enabled", "VSync"],
              ["Set Frame Rate Limit", "FPS chegarasi"],
              ["Set Overall Scalability Level (0–4)", "Low, Medium, High, Epic, Cinematic"],
              ["Set View Distance / Shadow / AA / Texture / Effects Quality", "Alohida sozlamalar"],
              ["Run Hardware Benchmark → Apply Hardware Benchmark Results", "Avtomatik sozlash"],
              ["Apply Settings → Save Settings", "Qo'llash va saqlash"]],
      warn: "Apply Settings'dan keyin ruxsat o'zgarganda o'yinchiga «Saqlaysizmi? (10)» teskari sanovli tasdiq bering — monitor qo'llamaydigan ruxsatda o'yinchi qorong'i ekranda qolmasligi uchun." },
    { h: "Settings menyusi tuzilishi",
      bp: `WBP_Settings
├── Tabs: [Grafika] [Audio] [Boshqaruv]        // Widget Switcher bilan almashadi
├── Widget Switcher
│   ├── Grafika:   Resolution (ComboBox), WindowMode, VSync (CheckBox),
│   │              Quality: Low/Med/High/Epic (WBP_OptionSelector ◀ ▶), FPS limit
│   ├── Audio:     Master / Music / SFX (Slider 0–1)
│   └── Boshqaruv: Mouse Sensitivity (Slider), Invert Y (CheckBox)
└── [Apply] [Back]`,
      tip: "`WBP_OptionSelector` — «◀ High ▶» ko'rinishidagi qayta ishlatiladigan widget (Options — Text array, CurrentIndex, OnChanged dispatcher). Gamepad bilan ComboBox'dan ancha qulay." },
    { h: "Audio va boshqaruv sozlamalari",
      ul: ["Ovoz: Sound Class'lar (`SC_Master`, `SC_Music`, `SC_SFX`) va Sound Class Mix (`SCM_Settings`) yarating. Slider o'zgarganda [[Set Sound Mix Class Override]] + [[Push Sound Mix Modifier]]. Batafsil — Kun 55.",
           "Game User Settings'da ovoz va sichqoncha uchun joy yo'q — ularni o'zingizning **SaveGame** obyektingizda saqlang (Kun 59) yoki hozircha GameInstance'da.",
           "Mouse Sensitivity va Invert Y: Character'ning IA_Look'ida GameInstance'dagi qiymatlarga ko'paytiring."] },
    { h: "Ish tartibi",
      steps: ["Kun 31–35 dagi barcha widget'larni bitta `UI/` papkaga tartiblang: `Common/`, `Menus/`, `HUD/`, `Inventory/`.",
              "Settings menyusini yozing — Main Menu va Pause'dan ochilsin (bitta widget, ikki joyda).",
              "Grafika sozlamalari Apply'da qo'llansin va o'yin qayta ochilganda saqlanib qolsin.",
              "Birinchi ishga tushishda Run Hardware Benchmark avtomatik sozlasin.",
              "Credits ekrani: Scroll Box'da avtomatik pastga suriluvchi matn.",
              "Butun UI gamepad bilan to'liq boshqarilishini tekshiring."] }
  ],
  check: ["Barcha menyular yagona uslubda", "Grafik sozlamalar saqlanadi va qo'llanadi", "Ruxsat o'zgarishida tasdiqlash bor", "Audio slider'lar ishlaydi", "Sichqoncha sezgirligi ta'sir qiladi", "UI gamepad bilan boshqariladi"],
  err: [["Sozlamalar saqlanmayapti", "Apply Settings'dan keyin Save Settings chaqirilmagan. Editor'da (PIE) ba'zi sozlamalar ishlamaydi — Standalone'da sinang."],
        ["Fullscreen PIE'da ishlamaydi", "Bu normal — Editor oynasi ichida fullscreen bo'lmaydi. Standalone Game yoki packaged build'da tekshiring."]],
  ch: "Tugmalarni qayta bog'lash (Key Rebinding): Enhanced Input'ning **Player Mappable Key Settings** imkoniyati bilan Boshqaruv tabida «Sakrash: Space — [O'zgartirish]» qatorlarini yarating. (Maslahat: [[Input Key Selector]] widget va Enhanced Input User Settings.)",
  quiz: [["Grafik sozlamalarni saqlovchi tayyor obyekt:", ["SaveGame", "Game User Settings", "GameInstance", "Config Variable"], 1, "GameUserSettings.ini ga yoziladi."],
         ["Tablar orasida almashish uchun widget:", ["Scroll Box", "Widget Switcher", "Overlay", "Grid"], 1, "Widget Switcher — Active Widget Index."]]
}
);
