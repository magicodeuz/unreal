// Modul 7 — Animatsiya (Kun 37–42)
window.UE_LESSONS.push(
{
  d: 37, t: "Skeletal Mesh, Skeleton va Retargeting", time: "2–3 soat",
  g: "Animatsiya tizimining asosiy assetlarini tushunish va boshqa modellarga animatsiyalarni ko'chirish.",
  learn: ["Skeletal Mesh, Skeleton, Physics Asset", "Animation Sequence", "Socket'lar", "Mixamo va Fab'dan animatsiya", "IK Rig va IK Retargeter", "Root motion haqida"],
  body: [
    { h: "Asosiy assetlar",
      table: [["Asset", "Prefiks", "Vazifasi"],
              ["Skeletal Mesh", "SK_ / SKM_", "Suyakka bog'langan (skinned) model"],
              ["Skeleton", "SKEL_", "Suyaklar ierarxiyasi — animatsiyalar shunga bog'lanadi"],
              ["Physics Asset", "PHYS_", "Ragdoll va to'qnashuv uchun kapsulalar"],
              ["Animation Sequence", "A_ / AS_", "Bitta animatsiya klipi (Idle, Run, Jump)"],
              ["Blend Space", "BS_", "Parametr bo'yicha animatsiyalarni aralashtirish (Kun 39)"],
              ["Animation Montage", "AM_", "Kodan ijro etiladigan animatsiya (Kun 40)"],
              ["Animation Blueprint", "ABP_", "Animatsiya mantiqi (Kun 38)"]],
      tip: "Animatsiyalar Skeleton'ga bog'lanadi, Mesh'ga emas. Bir xil Skeleton'li barcha Mesh'lar bir xil animatsiyalardan foydalana oladi." },
    { h: "Socket'lar",
      p: "Socket — suyakka bog'langan nuqta. Qurolni qo'lga tutqazish, shlyapa kiydirish, effektni og'izdan chiqarish uchun ishlatiladi. Skeleton Editor'da suyakka o'ng tugma → {{Add Socket}} → `hand_r_weapon`. Preview Asset qo'shib, joylashuvini moslang.",
      graph: {
        t: "BP_Hero · Event Graph",
        n: [
          { id: "b", k: "event", t: "Event BeginPlay", x: 0, y: 0, o: [">"] },
          { id: "wm", k: "var", t: "WeaponMesh", x: 0, y: 2, o: ["obj"] },
          { id: "m", k: "var", t: "Mesh", x: 0, y: 3, o: ["obj"] },
          { id: "at", k: "func", t: "Attach Component To Component", x: 1, y: 0, i: [">", "obj Target", "obj Parent", "name Socket Name = hand_r_weapon", "enum Location Rule = Snap to Target", "enum Rotation Rule = Snap to Target", "enum Scale Rule = Keep World", "bool Weld Simulated Bodies"], o: [">", "bool Return Value"], s: 1 }
        ],
        w: ["b.0-at.0", "wm.0-at.1", "m.0-at.2"],
        how: ["Target — biriktiriladigan component (qurol mesh'i), Parent — personaj Mesh'i.", "Socket Name'ga Skeleton'da yaratgan socket nomini aynan yozing."] } },
    { h: "Animatsiya manbalari",
      ul: ["**Shablonlar:** Third Person — Manny/Quinn va asosiy harakatlar.",
           "**Game Animation Sample (Epic, bepul):** 500+ yuqori sifatli harakat animatsiyalari va Motion Matching namunasi.",
           "**Fab:** bepul va pullik animatsiya paketlari.",
           "**Mixamo (Adobe, bepul):** minglab animatsiyalar. FBX, «Without Skin» bilan yuklab olinadi. Skeleton boshqacha — retargeting kerak.",
           "**O'zingiz:** Blender yoki Unreal'ning o'zida Control Rig bilan (Kun 41)."] },
    { h: "IK Retargeting — UE5 usuli",
      p: "Turli skeletlar orasida animatsiya ko'chirish uchun ikki asset kerak:",
      steps: ["**IK Rig** — har bir skelet uchun: {{Animation → Retargeting → IK Rig}}. Retarget Root (odatda pelvis) va zanjirlar (Spine, Head, LeftArm, RightArm, LeftLeg, RightLeg) belgilanadi. UE 5.4+ da {{Auto Create Retarget Chains}} ko'p ishni o'zi qiladi.",
              "Manba (Mixamo) va maqsad (Manny) uchun IK Rig yarating.",
              "**IK Retargeter**: Source IK Rig va Target IK Rig'ni tanlang. Ikkala skelet bir xil pozada (T-pose yoki A-pose) bo'lishi kerak — {{Edit Retarget Pose}} bilan to'g'rilang.",
              "Pastdagi ro'yxatdan animatsiyalarni tanlab {{Export Selected Animations}}."],
      tip: "UE 5.4+ da tezkor usul: animatsiya yoki Skeletal Mesh'ga o'ng tugma → {{Retarget Animations}} — standart skeletlar uchun avtomatik IK Rig yaratadi." },
    { h: "Root Motion",
      p: ["Ko'pchilik animatsiyalar «joyida» (in place) bo'ladi: personaj joyida yuguradi, uni CharacterMovement suradi. **Root motion** animatsiyalarida esa harakat animatsiyaning o'zida — root suyagi siljiydi.",
          "Root motion odatda hujum, dodge va vault kabi aniq masofa talab qiladigan harakatlar uchun ishlatiladi. Animation Sequence'da {{Enable Root Motion}} ✔ bo'lishi kerak."] },
    { h: "Amaliy topshiriq",
      steps: ["Manny'ning Skeleton'ini oching: suyaklar ierarxiyasini ko'rib chiqing. `hand_r` ga `hand_r_weapon` socket qo'shing.",
              "Fab yoki Starter Content'dan qilich/tayoq mesh'ini olib, BeginPlay'da socket'ga attach qiling.",
              "Mixamo'dan 3 ta animatsiya yuklab oling (masalan Sword Slash, Dodge, Dance) va IK Retargeter bilan Manny'ga ko'chiring.",
              "Ko'chirilgan animatsiyalarni Persona'da ochib, qo'l va oyoqlar to'g'ri ekanini tekshiring.",
              "Physics Asset'ni oching va {{Simulate}} bilan ragdoll'ni sinab ko'ring."] }
  ],
  check: ["Skeleton va Skeletal Mesh farqini bilaman", "Socket yaratib, obyekt biriktirdim", "IK Rig va IK Retargeter bilan animatsiya ko'chirdim", "Root motion nima ekanini tushunaman"],
  err: [["Retarget'dan keyin qo'llar g'alati buralgan", "Retarget Pose'lar mos emas (biri T-pose, biri A-pose). Edit Retarget Pose'da qo'llarni moslang."],
        ["Mixamo animatsiyasi import qilinmaydi", "FBX import'da Skeleton maydonini bo'sh qoldiring — Mixamo skeleti uchun yangi Skeleton yaratilsin, keyin retarget qiling."]],
  ch: "Fab'dan yoki boshqa manbadan butunlay boshqa proporsiyali personaj (masalan past bo'yli gnom) oling va Manny animatsiyalarini unga retarget qiling.",
  quiz: [["Animatsiyalar nimaga bog'lanadi?", ["Mesh", "Skeleton", "Material", "Physics Asset"], 1, "Bir Skeleton — ko'p Mesh."],
         ["Qurolni qo'lga biriktirish nuqtasi:", ["Bone", "Socket", "Notify", "Slot"], 1, "Socket."],
         ["Turli skeletlar orasida animatsiya ko'chirish:", ["Blend Space", "IK Retargeter", "Montage", "Sequencer"], 1, "IK Rig + IK Retargeter."]]
},
{
  d: 38, t: "Animation Blueprint va State Machine", time: "3 soat",
  g: "Personajning harakatiga mos ravishda animatsiyalarni avtomatik almashtiruvchi Animation Blueprint yaratish.",
  learn: ["ABP: Event Graph va AnimGraph", "Event Blueprint Update Animation", "Thread Safe Update", "State Machine: State va Transition", "Locomotion: Idle/Walk/Run/Jump", "Conduit va Blend Logic"],
  body: [
    { h: "ABP tuzilishi",
      p: ["Animation Blueprint ikki qismdan iborat: **Event Graph** — personajdan ma'lumot (tezlik, havodami, cho'kkalaganmi) yig'adi; **AnimGraph** — shu ma'lumot asosida qaysi animatsiya ijro etilishini hal qiladi va yakuniy pozani **Output Pose** ga beradi.",
          "Yaratish: Skeleton yoki Skeletal Mesh'ga o'ng tugma → {{Create → Anim Blueprint}} → `ABP_Hero`."],
      graph: [{
        t: "ABP_Hero · Event Graph — boshlash",
        n: [
          { id: "in", k: "event", t: "Event Blueprint Initialize Animation", x: 0, y: 0, o: [">"] },
          { id: "po", k: "pure", t: "Try Get Pawn Owner", x: 0, y: 2, o: ["obj Return Value"] },
          { id: "c", k: "cast", t: "Cast To BP_Hero", x: 1, y: 0, i: [">", "obj Object"], o: [">", "> Cast Failed", "obj As BP Hero"], s: 1 },
          { id: "s1", k: "set", t: "SET", x: 2, y: 0, i: [">", "obj HeroRef"], o: [">", "obj"] },
          { id: "cm", k: "pure", t: "Get Character Movement", x: 2, y: 3, i: ["obj Target"], o: ["obj Return Value"] },
          { id: "s2", k: "set", t: "SET", x: 3, y: 0, i: [">", "obj MovementRef"], o: [">", "obj"] }
        ],
        w: ["in.0-c.0", "po.0-c.1", "c.0-s1.0", "c.2-s1.1", "s1.1-cm.0", "s1.0-s2.0", "cm.0-s2.1"] },
      {
        t: "ABP_Hero · Event Graph — har kadr",
        n: [
          { id: "up", k: "event", t: "Event Blueprint Update Animation", x: 0, y: 0, o: [">", "float Delta Time X"], s: 2 },
          { id: "mr", k: "var", t: "MovementRef", x: 0, y: 2.6, o: ["obj"] },
          { id: "iv", k: "macro", t: "Is Valid", x: 1, y: 0, i: ["> Exec", "obj Input Object"], o: ["> Is Valid", "> Is Not Valid"] },
          { id: "vel", k: "pure", t: "Get Velocity", x: 1, y: 3, i: ["obj Target"], o: ["vec Return Value"] },
          { id: "vl", k: "pure", t: "Vector Length XY", x: 2, y: 3, i: ["vec A"], o: ["float Return Value"] },
          { id: "sp", k: "set", t: "SET", x: 2, y: 0, i: [">", "float Speed"], o: [">", "float"], s: 3 },
          { id: "fa", k: "pure", t: "Is Falling", x: 3, y: 3, i: ["obj Target"], o: ["bool Return Value"] },
          { id: "sf", k: "set", t: "SET", x: 3, y: 0, i: [">", "bool bIsFalling"], o: [">", "bool"] }
        ],
        w: ["up.0-iv.0", "mr.0-iv.1", "iv.0-sp.0", "mr.0-vel.0", "vel.0-vl.0", "vl.0-sp.1", "sp.0-sf.0", "mr.0-fa.0", "fa.0-sf.1"],
        how: ["Initialize'da bir marta personaj va uning Movement component'iga havola saqlanadi.",
              "Update har kadr ishlaydi: tezlik ([[Vector Length XY]] — gorizontal tezlik) va havodaligi o'zgaruvchilarga yoziladi.",
              "AnimGraph va State Machine qoidalari faqat shu o'zgaruvchilarni o'qiydi."] }],
      tip: "UE5 da yaxshiroq usul: **Thread Safe** funksiyalar va [[Property Access]] node — animatsiya alohida oqimda (thread) hisoblanadi va o'yin tezlashadi. Shablondagi ABP_Manny ni o'rganing. Boshlang'ich bosqichda Event Graph yetarli." },
    { h: "State Machine",
      p: "AnimGraph'da o'ng tugma → {{Add New State Machine}} → `Locomotion`. Ichida holatlar (State) va ular orasidagi o'tishlar (Transition) bo'ladi.",
      bp: `Locomotion (State Machine)
[Entry] ──▶ (Idle/Move) ──bIsFalling──▶ (JumpStart) ──auto──▶ (FallLoop)
                ▲                                                   │
                └────────────── (Land) ◀──── NOT bIsFalling ────────┘

(Idle/Move) ichida: BS_Locomotion (Blend Space, Speed bo'yicha) — Kun 39
Transition qoidasi (Rule): bool qaytaradigan kichik graf
JumpStart → FallLoop: "Automatic Rule Based on Sequence Player in State" ✔` },
    { h: "Transition sozlamalari",
      table: [["Sozlama", "Ma'nosi"],
              ["Transition Rule", "Bool ifoda — true bo'lganda o'tadi"],
              ["Blend Duration", "Animatsiyalar orasida silliq o'tish vaqti (0.1–0.25 s)"],
              ["Blend Logic: Standard / Inertialization", "Inertialization — zamonaviy, yengil va tabiiy o'tish (AnimGraph'da Inertialization node kerak)"],
              ["Automatic Rule Based on Sequence Player", "Animatsiya tugaganda avtomatik o'tish"],
              ["Priority Order", "Bir nechta qoida bir vaqtda true bo'lsa"]],
      warn: "Transition qoidalarida og'ir hisob-kitob qilmang. Event Graph'da tayyorlangan oddiy bool'larni ishlating." },
    { h: "Crouch qatlamini qo'shish",
      p: "Crouch uchun alohida State Machine yoki Locomotion ichida `bIsCrouch` bo'yicha ikkita Blend Space'ni almashtirish mumkin: [[Blend Poses by Bool]] (bIsCrouch) → True: BS_Crouch, False: BS_Locomotion. Bu holatlar sonini oshirmasdan oddiy yechim." },
    { h: "Amaliy topshiriq",
      steps: ["`ABP_Hero` yarating (Manny skeleti) va `BP_Hero` Mesh'ida Anim Class sifatida tanlang.",
              "Event Graph: Speed, bIsFalling, bShouldMove, bIsCrouch.",
              "State Machine: Idle, Walk/Run (hozircha bitta Run animatsiya), JumpStart, FallLoop, Land.",
              "Blend Duration'larni sozlab, o'tishlar silliq bo'lishini ta'minlang.",
              "Crouch uchun Blend Poses by Bool.",
              "Debug: ABP oynasida pastdagi Preview'da o'yindagi nusxani tanlang (Debug Filter) — real vaqtda qaysi State faolligini ko'rasiz."] }
  ],
  check: ["ABP Event Graph va AnimGraph farqini bilaman", "Locomotion State Machine yaratdim", "Transition Rule va Blend Duration'ni sozladim", "Sakrash 3 bosqichda ishlaydi", "ABP'ni o'yin paytida debug qila olaman"],
  err: [["Personaj T-pose'da turibdi", "ABP Mesh'ga ulanmagan yoki AnimGraph'da Output Pose'ga hech narsa ulanmagan."],
        ["Speed doim 0", "Cast muvaffaqiyatsiz (ABP boshqa Pawn'da) yoki HeroRef Initialize'da emas, Update'da Set qilinmagan."]],
  ch: "«Turn in place»: personaj joyida turganda kamera 90° dan ko'p burilsa, joyida burilish animatsiyasi ijro etilsin (Yaw farqini hisoblash kerak).",
  quiz: [["Animatsiya ma'lumotlari qayerda yig'iladi?", ["AnimGraph", "Event Graph", "Montage", "Skeleton"], 1, "Event Graph → o'zgaruvchilar → AnimGraph."],
         ["Ikki pozani bool bo'yicha almashtiradigan node:", ["Layered Blend per Bone", "Blend Poses by Bool", "Slot", "Cache Pose"], 1, "Blend Poses by Bool."],
         ["Zamonaviy, yengil o'tish usuli:", ["Standard", "Inertialization", "Custom", "Snap"], 1, "Inertialization."]]
},
{
  d: 39, t: "Blend Space va Aim Offset", time: "2–3 soat",
  g: "Tezlik va yo'nalishga qarab animatsiyalarni silliq aralashtirish hamda personajni qaralayotgan tomonga burish.",
  learn: ["Blend Space 1D", "Blend Space (2D): Speed × Direction", "Strafe harakat", "Aim Offset", "Additive animatsiya", "Layered Blend per Bone"],
  body: [
    { h: "Blend Space 1D",
      p: "Bitta parametr bo'yicha aralashtirish. Masalan `BS_Locomotion1D`: o'q — Speed (0–600). 0 da Idle, 200 da Walk, 600 da Run. Speed 400 bo'lsa Walk va Run avtomatik aralashadi.",
      steps: ["{{Animation → Legacy → Blend Space 1D}} yoki UE 5.4+ da {{Blend Space}} → Skeleton.",
              "Asset Details → Axis Settings: Name = Speed, Min 0, Max 600.",
              "Pastdagi Asset Browser'dan animatsiyalarni o'qqa sudrab tashlang.",
              "{{Ctrl}} bosib sichqonchani surib — natijani preview'da ko'ring."] },
    { h: "2D Blend Space — strafe",
      p: "Ikki parametr: **Speed** (0–600) va **Direction** (−180…180). Nishonga olib yurganda personaj kameraga qarab turadi va istalgan tomonga yuradi: oldinga, orqaga, yonga.",
      bp: `Direction = [Calculate Direction] (Velocity, Actor Rotation)  // ABP ichida
         // UE 5.x: KismetAnimationLibrary → Calculate Direction

BS_Strafe:
        Direction:  -180   -90    0    90   180
Speed 600:          RunB   RunL  RunF RunR RunB
Speed 0:            Idle   Idle  Idle Idle Idle`,
      tip: "Grid nuqtalarini kerakli joyga snap qiling va chegaraviy (−180 va 180) nuqtalarga bir xil animatsiyani qo'ying — aks holda orqaga yurishda «sakrash» bo'ladi." },
    { h: "Aim Offset",
      p: ["**Aim Offset** — additive animatsiyalar asosidagi Blend Space. U asosiy animatsiya ustiga qo'shiladi: personaj yugurayotgan bo'lsa ham, tanasining yuqori qismi qaralayotgan tomonga buriladi.",
          "Parametrlar: **Pitch** (−90…90) va **Yaw** (−90…90). Kerakli pozalar: markaz, yuqori, past, chap, o'ng va burchaklar (9 ta)."],
      bp: `// ABP Event Graph
AimRotation = [Delta (Rotator)] ([Get Base Aim Rotation], [Get Actor Rotation])
AimPitch = AimRotation.Pitch;  AimYaw = AimRotation.Yaw

// AnimGraph
[Locomotion] ──▶ [AO_Hero] (Pitch ← AimPitch, Yaw ← AimYaw) ──▶ [Output Pose]`,
      warn: "Aim Offset uchun animatsiyalar **Additive** bo'lishi kerak: Animation Sequence → Additive Anim Type = **Mesh Space**, Base Pose Type = Selected animation frame (markaziy poza)." },
    { h: "Layered Blend per Bone",
      p: "Tananing bir qismida bitta, boshqa qismida boshqa animatsiya: oyoqlar yuguradi, qo'llar qayta o'qlaydi. [[Layered Blend per Bone]]: Base Pose — Locomotion, Blend Pose 0 — Upper body animatsiya, Layer Setup → Branch Filters → Bone Name = `spine_01`, Blend Depth = 0.",
      tip: "Bu usul Montage Slot'lari bilan birga ishlatiladi (ertangi dars): hujum animatsiyasi faqat yuqori tanaga ta'sir qiladi va yugurish to'xtamaydi." },
    { h: "Amaliy topshiriq",
      steps: ["`BS_Locomotion` (1D: Idle/Walk/Run) yaratib, State Machine'dagi Idle/Move holatiga qo'ying.",
              "Game Animation Sample yoki Fab'dan strafe animatsiyalarini oling va `BS_Strafe` (2D) yarating.",
              "Aim (o'ng tugma) paytida `bIsAiming` bo'yicha BS_Strafe ga o'tilsin va Character Use Controller Rotation Yaw = true bo'lsin.",
              "Agar 9 ta aim pozasi bo'lsa — Aim Offset qo'shing; bo'lmasa, Manny'ning `spine` suyagini [[Transform (Modify) Bone]] bilan Pitch bo'yicha burib, oddiy aim imitatsiyasini qiling."] }
  ],
  check: ["1D Blend Space yaratdim", "2D strafe Blend Space va Calculate Direction'ni bilaman", "Aim Offset va additive animatsiyani tushunaman", "Layered Blend per Bone'ni bilaman"],
  err: [["Yurishda oyoqlar «sirpanadi» (foot sliding)", "Blend Space'dagi animatsiyalar tezligi CharacterMovement tezligiga mos emas. Run animatsiyasi 600 da yaratilgan bo'lsa, Max Walk Speed ham 600 bo'lsin."],
        ["Aim Offset tanani g'alati buraydi", "Animatsiyalar Additive emas yoki noto'g'ri Base Pose."]],
  ch: "Blend Space'da Speed bo'yicha animatsiya o'ynash tezligini moslang ({{Sync Groups}} va Play Rate) — foot sliding'ni minimallashtiring. Natijani video bilan avval/keyin solishtiring.",
  quiz: [["Strafe uchun Blend Space parametrlari:", ["Speed, Pitch", "Speed, Direction", "Yaw, Roll", "Health, Speed"], 1, "Tezlik va yo'nalish."],
         ["Aim Offset animatsiyalari qanday bo'lishi kerak?", ["Root motion", "Additive", "Looping", "Montage"], 1, "Additive — asosiy pozaga qo'shiladi."],
         ["Faqat yuqori tanaga animatsiya qo'yish:", ["Blend Poses by Bool", "Layered Blend per Bone", "State Machine", "Aim Offset"], 1, "Suyak bo'yicha qatlam."]]
},
{
  d: 40, t: "Animation Montage va Anim Notify", time: "3 soat",
  g: "Hujum, qayta o'qlash, ishlatish kabi harakatlarni Montage orqali ijro etish va animatsiyaning aniq lahzalarida voqealar chaqirish.",
  learn: ["Montage yaratish", "Slot va DefaultSlot", "Play Montage, Montage Play", "Section'lar va combo", "Anim Notify va Notify State", "Montage event'lari: Blend Out, Interrupted"],
  body: [
    { h: "Montage nima?",
      p: ["State Machine — doimiy holatlar (yurish, sakrash) uchun. **Montage** esa kod buyurganda bir martalik harakat uchun: qilich zarbasi, granata otish, eshik ochish, emote.",
          "Yaratish: Animation Sequence'ga o'ng tugma → {{Create → Create AnimMontage}} → `AM_Attack1`."] },
    { h: "Slot — Montage qayerda ijro etiladi",
      p: "Montage ijro etilishi uchun AnimGraph'da **Slot** node bo'lishi shart. Aks holda Montage «ijro etiladi», lekin ko'rinmaydi.",
      bp: `// AnimGraph — butun tana
[Locomotion] ──▶ [Slot 'DefaultSlot'] ──▶ [Output Pose]

// Faqat yuqori tana (yugurayotganda hujum)
[Locomotion] ──▶ [Cache Pose: LocoCache]
[LocoCache] ──▶ [Slot 'UpperBody'] ──┐
[LocoCache] ─────────────────────────┴▶ [Layered Blend per Bone] (spine_01) ──▶ [Output Pose]`,
      warn: "Eng ko'p uchraydigan xato: «Montage ishlamayapti». Sabab 90% hollarda — AnimGraph'da Slot yo'q yoki Montage boshqa Slot nomida." },
    { h: "Ijro etish",
      graph: {
        t: "BP_Hero · Event Graph",
        n: [
          { id: "ia", k: "input", t: "IA_Attack", sub: "Enhanced Input Action", x: 0, y: 0, o: ["> Started"] },
          { id: "at", k: "var", t: "bIsAttacking", x: 0, y: 2, o: ["bool"] },
          { id: "nt", k: "op", t: "NOT", x: 1, y: 2, i: ["bool"], o: ["bool"] },
          { id: "br", k: "flow", t: "Branch", x: 1, y: 0, i: [">", "bool Condition"], o: ["> True", "> False"] },
          { id: "s", k: "set", t: "SET", x: 2, y: 0, i: [">", "bool bIsAttacking = true"], o: [">", "bool"] },
          { id: "pm", k: "latent", t: "Play Montage", x: 3, y: 0, i: [">", "obj In Skeletal Mesh Component", "obj Montage to Play = AM_Attack1", "float Play Rate = 1.0"], o: [">", "> On Completed", "> On Blend Out", "> On Interrupted", "> On Notify Begin", "name Notify Name"], s: 1 },
          { id: "m", k: "var", t: "Mesh", x: 2, y: 3, o: ["obj"] },
          { id: "r", k: "set", t: "SET", x: 4, y: 1.4, i: [">", "bool bIsAttacking = false"], o: [">", "bool"], s: 2 }
        ],
        w: ["ia.0-br.0", "at.0-nt.0", "nt.0-br.1", "br.0-s.0", "s.0-pm.0", "m.0-pm.1", "pm.1-r.0", "pm.3-r.0"],
        how: ["Hujum davom etayotganda qayta bosish e'tiborsiz qoldiriladi (`bIsAttacking`).",
              "[[Play Montage]] — async node: tugaganda **On Completed**, to'xtatilsa **On Interrupted**. Ikkalasi ham holatni tiklaydi.",
              "Montage ko'rinishi uchun AnimGraph'da mos **Slot** bo'lishi shart!"] },
      p2: "Character'da oddiyroq node ham bor: [[Play Anim Montage]] (davomiylikni qaytaradi). Montage'ni to'xtatish — [[Stop Anim Montage]]." },
    { h: "Anim Notify",
      p: "Animatsiya vaqt chizig'idagi belgilar. Montage yoki Sequence'da Notifies trekida o'ng tugma → {{Add Notify}}:",
      table: [["Notify", "Vazifasi"],
              ["Play Sound", "Qadam, qilich shivirlashi — kod yozmasdan"],
              ["Play Niagara Effect", "Chang, uchqun"],
              ["New Notify... (Custom)", "ABP Event Graph'da [[AnimNotify_Name]] event'i bo'ladi"],
              ["Notify State (davomiyli)", "Boshlanish va tugash: masalan qilichning «zarar beradigan oynasi»"]],
      bp: `// Hujum: zarba faqat qilich harakatining o'rtasida
AM_Attack1 Notifies:  |----[ANS_DamageWindow]----|
ANS_DamageWindow (Anim Notify State Blueprint):
   Received_NotifyBegin ──▶ Owner → Cast BP_Hero → StartWeaponTrace
   Received_NotifyEnd   ──▶ StopWeaponTrace`,
      tip: "Qadam ovozlari uchun: Run animatsiyasida har oyoq yerga tekkan kadrga `Footstep` notify qo'ying. Keyin ovoz sirt turiga qarab tanlanadi (Kun 55)." },
    { h: "Section'lar va combo",
      p: "Montage'ni bo'limlarga (Section) bo'lish mumkin: `Attack1`, `Attack2`, `Attack3`. Montage Sections panelida ularni zanjirlash yoki ajratish mumkin. Kod bilan: [[Montage Jump to Section]] yoki [[Montage Set Next Section]].",
      bp: `// Combo oynasi: ANS_ComboWindow davomida tugma bosilsa — keyingi zarba
[IA_Attack] ──▶ bIsAttacking ?
   No  ──▶ Play Montage AM_Combo (Section Attack1)
   Yes ──▶ bComboWindowOpen ? ──▶ bQueuedNext = true
[AnimNotify ComboCheck] ──▶ bQueuedNext ? ──▶ Montage Set Next Section (Current → Next)` },
    { h: "Amaliy topshiriq",
      steps: ["Kun 37 da retarget qilingan hujum animatsiyasidan `AM_Attack1` yarating.",
              "AnimGraph'ga `UpperBody` slot'ini Layered Blend bilan qo'shing.",
              "LMB → hujum; tugaguncha qayta hujum qilib bo'lmasin (`bIsAttacking`).",
              "`ANS_DamageWindow` bilan qilich bo'ylab Sphere Trace — tegsa Apply Damage (BPC_Health'li dummy'ga).",
              "Run animatsiyasiga qadam notify'lari bilan ovoz qo'shing.",
              "Interact (Kun 25) paytida qisqa «qo'l cho'zish» montage'i ijro etilsin."] }
  ],
  check: ["Montage yaratdim va Slot qo'shdim", "Play Montage event pinlarini ishlataman", "Notify va Notify State farqini bilaman", "Qurol zarari faqat zarba oynasida", "Qadam ovozlari notify bilan"],
  err: [["Montage ko'rinmaydi", "AnimGraph'da mos nomli Slot yo'q. Montage oynasida Slot nomini tekshiring (masalan DefaultGroup.UpperBody)."],
        ["Hujum paytida personaj sirpanib ketadi", "Root motion montage bo'lsa — ABP Class Defaults'da Root Motion Mode = Root Motion from Montages Only; aks holda hujum paytida harakatni cheklang."]],
  ch: "3 zarbali combo: ketma-ket 3 xil animatsiya, har biri combo oynasida bosilsagina davom etadi; uchinchisi kuchliroq zarar va kamera silkinishi bilan.",
  quiz: [["Montage ijro etilishi uchun AnimGraph'da shart:", ["State Machine", "Slot node", "Blend Space", "Aim Offset"], 1, "Slot."],
         ["Davomiyligi bor notify:", ["Anim Notify", "Anim Notify State", "Sync Marker", "Curve"], 1, "Begin va End event'lari bor."],
         ["Montage'ni boshqa bo'limga o'tkazish:", ["Play Montage", "Montage Jump to Section", "Stop Anim Montage", "Set Play Rate"], 1, "Section'lar."]]
},
{
  d: 41, t: "Control Rig, IK va Motion Matching'ga kirish", time: "3 soat",
  g: "Prosedural animatsiya: oyoqlarni notekis yerga moslash, qo'lni obyektga yetkazish va zamonaviy UE5 animatsiya usullari.",
  learn: ["Foot IK g'oyasi", "Control Rig asoslari", "Two Bone IK", "Leg IK / Full Body IK", "Look At", "Motion Matching va Pose Search haqida"],
  body: [
    { h: "Prosedural animatsiya nima uchun kerak?",
      p: ["Animatsiyalar tekis yerda yaratilgan. Zinapoyada personajning bir oyog'i havoda «osilib» qoladi, ikkinchisi esa pog'onaga botib ketadi. **IK** (Inverse Kinematics) oyoq uchini yerga qo'yib, qolgan suyaklarni (tizza, son) avtomatik hisoblaydi.",
          "Shuningdek: boshni yaqindagi obyektga burish, qo'lni eshik dastasiga yetkazish, qurolni ikkala qo'lda to'g'ri ushlash."] },
    { h: "Control Rig",
      p: "**Control Rig** — skeletni grafik orqali boshqarish tizimi. U animatsiya yaratish (Sequencer'da) va o'yin paytida prosedural tuzatishlar uchun ishlatiladi. Yaratish: {{Animation → Control Rig}} → Skeletal Mesh tanlanadi.",
      bp: `CR_FootIK (Forward Solve)
For foot in [foot_l, foot_r]:
   [Sphere Trace] foot joylashuvidan pastga (50 sm)
   Offset = HitLocation.Z − FootLocation.Z
[Pelvis] Z −= Min(OffsetL, OffsetR)          // tanani pastroq tushirish
[Full Body IK] yoki [Basic IK] har oyoq uchun → maqsad: Hit Location
[Foot rotation] ← Impact Normal'ga moslash`,
      tip: "Noldan yozish shart emas: Game Animation Sample va Third Person shablonining yangi versiyalarida tayyor Foot IK Control Rig bor. Uni oching va qatorma-qator o'qing." },
    { h: "AnimGraph'dagi IK node'lari",
      table: [["Node", "Vazifasi"],
              ["Two Bone IK", "2 suyakli zanjir (son-boldir yoki yelka-bilak) uchini maqsadga yetkazadi"],
              ["Leg IK", "Oyoqlar uchun maxsus"],
              ["Look At", "Suyakni (bosh) nuqtaga qaratadi"],
              ["Transform (Modify) Bone", "Suyakni qo'lda siljitish/burish"],
              ["Control Rig node", "Control Rig asset'ini AnimGraph'da ishlatish"],
              ["Full Body IK", "Butun tanani tabiiy moslash (Control Rig ichida)"]] },
    { h: "Look At — boshni burish",
      bp: `// ABP Event Graph
LookTarget = HeroRef.FocusedActor ? FocusedActor.Location : (oldinga nuqta)
LookAlpha  = FInterpTo(LookAlpha, FocusedActor valid ? 1 : 0, Delta, 5)

// AnimGraph
... ──▶ [Look At] (Bone to Modify ← head, Look at Location ← LookTarget,
                    Look at Clamp ← 60°, Alpha ← LookAlpha) ──▶ [Output Pose]`,
      warn: "Look At'ni cheklang (Clamp): aks holda bosh 180° burilib, «boyqush» effekti chiqadi." },
    { h: "Motion Matching (UE 5.4+)",
      p: ["Zamonaviy yondashuv: State Machine'da holatlarni qo'lda ulash o'rniga, tizim katta animatsiya bazasidan har kadrda **eng mos keladigan pozani** o'zi qidiradi (personaj tezligi, yo'nalishi, kelajakdagi trayektoriyasi bo'yicha). Natijada juda tabiiy harakat hosil bo'ladi.",
          "Asosiy assetlar: **Pose Search Schema**, **Pose Search Database**, **Chooser Table**. Epic'ning bepul **Game Animation Sample** loyihasi to'liq ishlaydigan namuna. Bu ilg'or mavzu: avval State Machine'ni yaxshi o'zlashtiring, keyin namunani o'rganing."] },
    { h: "Amaliy topshiriq",
      steps: ["Zinapoya va qiya yuzali sinov maydonini yasang.",
              "Game Animation Sample yoki shablondagi Foot IK Control Rig'ni `ABP_Hero` ga ulang (Control Rig node, Output Pose'dan oldin) — yoki o'zingiz Two Bone IK + trace bilan yozing.",
              "Look At: fokuslangan interaktiv obyektga bosh burilsin (Kun 25 dagi FocusedActor).",
              "Qiya yuzada va zinapoyada avval/keyin skrinshotlarni solishtiring.",
              "Game Animation Sample'ni yuklab oling va Motion Matching personajini 15 daqiqa davomida o'ynab, ABP'sini ko'rib chiqing."] }
  ],
  check: ["IK nima uchun kerakligini tushunaman", "Control Rig asset'ini ochib, grafni o'qiy olaman", "Foot IK yoki Two Bone IK ishlaydi", "Look At cheklangan va silliq", "Motion Matching g'oyasini bilaman"],
  err: [["IK yoqilgach oyoqlar titraydi", "Trace natijasini silliqlang (FInterp To) va kichik farqlarni (1–2 sm) e'tiborsiz qoldiring."],
        ["Control Rig node hech narsa qilmayapti", "Control Rig'da Forward Solve grafi bo'sh yoki Alpha = 0."]],
  ch: "Qo'l IK: o'yinchi devor yonida turganda (yon tomonga trace) qo'li devorga «tayansin» — Two Bone IK bilan qo'l uchi devordagi nuqtaga.",
  quiz: [["IK nimani hisoblaydi?", ["Rang", "Suyak uchini maqsadga yetkazish uchun zanjirdagi burchaklarni", "Fizika massasini", "Ovozni"], 1, "Inverse Kinematics."],
         ["Bosh suyagini nuqtaga qaratuvchi node:", ["Two Bone IK", "Look At", "Slot", "Blend Space"], 1, "Look At."],
         ["Animatsiya bazasidan eng mos pozani qidiruvchi texnologiya:", ["Blend Space", "Motion Matching", "Montage", "Retargeting"], 1, "Pose Search."]]
},
{
  d: 42, t: "LOYIHA: Combo hujumli jangchi va mashg'ulot maydoni", time: "4–5 soat",
  g: "Animatsiya modulini yakunlash: harakat, hujum, dodge, zarar reaksiyasi va o'lim animatsiyalari bilan to'liq jangchi personaj.",
  learn: ["Combat animatsiya arxitekturasi", "Combo tizimi", "Dodge (root motion)", "Hit reaction", "Target lock (ixtiyoriy)", "Animatsiya va gameplay sinxronizatsiyasi"],
  body: [
    { h: "Talablar",
      table: [["Mexanika", "Texnika"],
              ["Locomotion", "BS + State Machine + Foot IK"],
              ["3 zarbali combo", "Montage Section'lar + combo oynasi notify"],
              ["Zarar", "Notify State oynasida qurol trace + Apply Damage"],
              ["Dodge (Alt yoki Ctrl)", "Root motion montage, stamina sarfi, i-frame (zarar olmaydi)"],
              ["Hit reaction", "Zarar olganda yo'nalishga qarab Montage (old/orqa)"],
              ["O'lim", "Death montage yoki ragdoll"],
              ["Dushman manekeni", "BPC_Health + hit reaction + qayta tiklanish"]] },
    { h: "Holat boshqaruvi",
      bp: `E_CombatState: Idle, Attacking, Dodging, HitStun, Dead

CanAct() → CombatState == Idle  (yoki Attacking + combo window)
[IA_Attack] ──▶ CanAct ? ──▶ SetCombatState(Attacking) ──▶ Play Montage AM_Combo
[IA_Dodge]  ──▶ CombatState != Dead AND Stamina.TryConsume(25)
             ──▶ SetCombatState(Dodging) ──▶ Montage (yo'nalish bo'yicha section)
On Completed / On Interrupted ──▶ SetCombatState(Idle)`,
      tip: "Bitta `SetCombatState` funksiyasi orqali holat almashsin — u boshqa holatlardan chiqishda tozalash ishlarini (masalan qurol trace'ni o'chirish) bajaradi." },
    { h: "Hit reaction yo'nalishi",
      bp: `// Zarar olganda: zarba qayerdan keldi?
ToAttacker = Normalize(Attacker.Location − Self.Location)
Dot = [Dot Product] (Self.ForwardVector, ToAttacker)
Dot > 0 ? Play AM_HitFront : Play AM_HitBack`,
      p2: "Dot Product — ikki vektor qanchalik bir yo'nalishda ekanini ko'rsatadi: 1 — bir xil, 0 — perpendikulyar, −1 — qarama-qarshi. Bu o'yin matematikasining eng foydali formulalaridan biri." },
    { h: "I-frame (dodge paytida zararsizlik)",
      ul: ["`ANS_Invulnerable` notify state → Begin: `bInvulnerable` = true, End: false.",
           "BPC_Health'ning HandleDamage'ida bInvulnerable bo'lsa zarar e'tiborsiz qoldirilsin (Owner'dan so'rash orqali yoki component'ning o'zida flag).",
           "Notify'ni dodge animatsiyasining faqat o'rta qismiga qo'ying — boshi va oxirida zarar olish mumkin bo'lsin (adolatli o'yin)."] },
    { h: "Game feel uchun qo'shimchalar",
      ul: ["**Hit stop:** zarba tekkanda 0.05 s davomida [[Set Global Time Dilation]] 0.1 (yoki faqat ikki Actor uchun Custom Time Dilation).",
           "**Kamera silkinishi:** kuchli zarbada.",
           "**Ovoz va effekt:** zarba tekkan joyda uchqun (Niagara — Kun 52; hozircha Starter Content'dagi P_Sparks).",
           "**Hit flash:** dushman materiali 0.1 s oq rangda (Kun 50)."] }
  ],
  check: ["3 zarbali combo ishlaydi", "Dodge stamina sarflaydi va i-frame bor", "Zarar faqat zarba oynasida", "Hit reaction yo'nalishga qarab", "Holatlar Enum bilan boshqariladi", "Hit stop va silkinish bor"],
  err: [["Dodge paytida yana hujum qilib bo'lyapti", "CanAct holatni tekshirmayapti — barcha input'lar bitta CanAct funksiyasidan o'tsin."],
        ["Bir zarba dushmanga bir necha marta tegyapti", "Qurol trace'i har kadr bir xil dushmanni topadi. Har zarba uchun `HitActors` massivini yuriting va qayta zarar bermang; zarba oynasi boshida massivni tozalang."]],
  ch: "Target lock: Tab bosilganda eng yaqin dushmanga kamera qotsin, personaj unga qarab strafe qilsin (Kun 39 dagi BS_Strafe), dodge esa yo'nalishga qarab 4 xil bo'lsin.",
  quiz: [["Ikki vektor yo'nalishini solishtiruvchi amal:", ["Cross Product", "Dot Product", "Vector Length", "Normalize"], 1, "Dot Product: 1 / 0 / −1."],
         ["Dodge paytida zarar olmaslik qanday ataladi?", ["Hit stop", "I-frame", "Root motion", "Ragdoll"], 1, "Invincibility frames."]]
}
);
