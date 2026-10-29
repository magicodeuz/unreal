// Modul 10 — Audio, Kino, Fizika, Saqlash (Kun 55–60)
window.UE_LESSONS.push(
{
  d: 55, t: "Audio: Sound Cue, MetaSounds va Attenuation", time: "3 soat",
  g: "O'yin ovozlarini to'g'ri qurish: 3D ovoz, tasodifiy variatsiyalar, musiqa va ovoz balandligi boshqaruvi.",
  learn: ["Sound Wave import (WAV)", "2D va 3D ovoz", "Attenuation (masofa bo'yicha so'nish)", "Sound Cue va MetaSounds", "Sound Class va Sound Mix", "Sirtga qarab qadam ovozlari (Physical Material)"],
  body: [
    { h: "Ovoz assetlari",
      table: [["Asset", "Prefiks", "Vazifasi"],
              ["Sound Wave", "S_ / SW_", "Import qilingan WAV fayl"],
              ["Sound Cue", "SC_", "Graf: tasodifiy tanlash, balandlik o'zgarishi, aralashtirish (eski usul, hali ham keng ishlatiladi)"],
              ["MetaSound Source", "MS_", "UE5 ning yangi, protsedural audio tizimi — kuchliroq va tezroq"],
              ["Sound Attenuation", "ATT_", "3D masofa sozlamalari"],
              ["Sound Class / Sound Class Mix", "SCL_ / SCM_", "Guruhlar (Music, SFX, Voice) va ularning balandligi"],
              ["Sound Concurrency", "SCC_", "Bir vaqtda nechta nusxa yangrashi mumkin"]],
      tip: "WAV formatida 44.1/48 kHz, 16-bit import qiling. Musiqa — stereo, 3D effektlar — **mono** (stereo ovoz 3D'da to'g'ri joylashmaydi)." },
    { h: "2D va 3D ovoz",
      bp: `// 2D — UI, musiqa, o'yinchining o'z ovozlari
[Play Sound 2D] (Sound ← S_UI_Click)

// 3D — dunyoda joylashgan
[Play Sound at Location] (Sound ← MS_Explosion, Location, Attenuation Settings ← ATT_Large)

// Obyektga biriktirilgan, keyin boshqariladigan
[Spawn Sound Attached] (MS_EngineLoop, Attach to ← Mesh) ──▶ Set AudioComp
[Fade Out] (AudioComp, 1.0)`,
      p2: "Audio Component: Actor'ga {{+ Add → Audio}} — doimiy ovoz manbai (generator g'ingillashi, sharshara). {{Auto Activate}} va Attenuation'ni sozlang." },
    { h: "Attenuation",
      table: [["Sozlama", "Ma'nosi"],
              ["Inner Radius", "Bu radius ichida to'liq balandlik"],
              ["Falloff Distance", "Qancha masofada nolga tushadi"],
              ["Attenuation Function", "Natural Sound (eng tabiiy), Linear, Logarithmic"],
              ["Spatialization", "Chap/o'ng quloq bo'yicha joylashuv"],
              ["Air Absorption", "Uzoqda yuqori chastotalar so'nadi (bo'g'iq ovoz)"],
              ["Occlusion", "Devor ortidagi ovoz bo'g'iqlashadi"],
              ["Reverb Send", "Xona aks-sadosi (Audio Volume bilan)"]] },
    { h: "MetaSounds",
      p: ["{{Audio → MetaSound Source}} → `MS_Footstep`. Graf: **Wave Player** node'lari, [[Random Get]] bilan bir nechta Sound Wave'dan tasodifiy tanlash, **Random Float** bilan pitch (0.9–1.1) va balandlikni (0.8–1.0) o'zgartirish.",
          "Input'lar orqali Blueprint'dan boshqarish: masalan `Speed` (Float) input — dvigatel ovozining pitch'i tezlikka bog'lanadi: [[Set Float Parameter]] (Audio Component, «Speed», value)."],
      tip: "Takrorlanuvchi ovozlar (qadam, o'q, zarba) doim 3–5 variant + tasodifiy pitch bilan bo'lsin. Bir xil ovozning 100 marta takrorlanishi «mashinadek» eshitiladi." },
    { h: "Sirt turiga qarab qadam ovozi",
      steps: ["{{Project Settings → Physics → Physical Surface}}: Surface1 = Grass, Surface2 = Wood, Surface3 = Metal, Surface4 = Stone.",
              "Har biri uchun **Physical Material** (`PM_Grass`...) yarating, Surface Type'ni bering va materiallarga (Phys Material maydoni) biriktiring.",
              "Qadam notify'da (Kun 40): oyoq ostiga Line Trace ({{Return Physical Material}} ✔) → Hit Result → Phys Mat → [[Get Surface Type]] → [[Switch on EPhysicalSurface]] → mos ovoz.",
              "Xuddi shu usul bilan o'q izlari va effektlarni ham sirtga qarab tanlaysiz."] },
    { h: "Sound Class va Mix",
      p: "`SCL_Master` → bolalari `SCL_Music`, `SCL_SFX`, `SCL_UI`, `SCL_Voice`. Har bir ovoz asset'ida Sound Class belgilanadi. `SCM_Settings` (Sound Class Mix) da modifikatorlar. Kun 36 dagi Settings slider'lari: [[Set Sound Mix Class Override]] (Mix, Class, Volume, Fade Time) + [[Push Sound Mix Modifier]].",
      warn: "Push Sound Mix Modifier'ni har slider o'zgarishida chaqirmang — bir marta (o'yin boshida) push qiling, keyin faqat Override'ni o'zgartiring." },
    { h: "Amaliy topshiriq",
      steps: ["Freesound.org (CC0 litsenziyali) yoki Fab'dan 15–20 ta ovoz yuklab, import qiling.",
              "`MS_Footstep_[Surface]` — 4 sirt uchun MetaSound'lar, tasodifiy variatsiya bilan.",
              "Physical Material'lar va qadam ovozlari — personaj o't, yog'och, metall ustida yurganda farq sezilsin.",
              "Omborxona: generator g'ingillashi (Audio Component, attenuation), yomg'ir (2D loop), portlashlar (3D).",
              "Fon musiqasi: o'yinchi dushmanga ko'ringanda «jang musiqasi»ga silliq o'tish (ikki Audio Component, Fade In/Out).",
              "Settings'dagi Music/SFX slider'lari ishlasin."] }
  ],
  check: ["2D va 3D ovoz farqini bilaman", "Attenuation sozlay olaman", "MetaSound'da tasodifiy variatsiya qildim", "Sirtga qarab qadam ovozi ishlaydi", "Sound Class/Mix orqali balandlik boshqariladi"],
  err: [["3D ovoz har joydan bir xil eshitiladi", "Attenuation berilmagan yoki ovoz stereo. 3D ovozlar mono bo'lsin."],
        ["Physical Material Hit Result'da bo'sh", "Trace'da Return Physical Material ✔ emas yoki material'ga PM biriktirilmagan (Landscape'da — Layer Info'ga)."]],
  ch: "Ichki/tashqi akustika: binoga kirganda **Audio Volume** reverb'ni yoqsin (katta xona — aks-sado), yomg'ir ovozi esa bo'g'iqlashsin (Low Pass filter).",
  quiz: [["3D effektlar uchun kanal soni:", ["Stereo", "Mono", "5.1", "Farqi yo'q"], 1, "Mono to'g'ri joylashadi."],
         ["Devor ortidagi ovozni bo'g'iqlashtiruvchi sozlama:", ["Spatialization", "Occlusion", "Concurrency", "Pitch"], 1, "Occlusion."],
         ["UE5 ning yangi protsedural audio tizimi:", ["Sound Cue", "MetaSounds", "Wwise", "FMOD"], 1, "MetaSounds."]]
},
{
  d: 56, t: "Sequencer: kat-sahnalar va kinematografiya", time: "3 soat",
  g: "Sequencer bilan kat-sahna yaratish, uni o'yindan ishga tushirish va Movie Render Queue bilan video olish.",
  learn: ["Level Sequence", "Track'lar: Transform, Animation, Camera Cut", "CineCameraActor va Camera Rig", "Event Track", "O'yindan ishga tushirish", "Movie Render Queue"],
  body: [
    { h: "Level Sequence",
      steps: ["Toolbar'dagi {{Cinematics}} (klaket ikonka) → {{Add Level Sequence}} → `LS_Intro`.",
              "Sequencer oynasi: chapda track'lar, o'ngda vaqt chizig'i. Standart 30 fps.",
              "Levelda Actor'ni tanlab {{+ Track → Actor To Sequencer}} — u Sequencer'ga «possessable» bo'lib qo'shiladi.",
              "Actor ostida {{+ → Transform}}: kadrni tanlang, Actor'ni suring, {{Enter}} yoki track'dagi ◆ tugmasi — key qo'yiladi."],
      table: [["Track", "Vazifasi"],
              ["Transform", "Joylashuv/burilish/o'lcham animatsiyasi"],
              ["Animation", "Skeletal Mesh uchun animatsiya klipi"],
              ["Camera Cut", "Qaysi kamera faol"],
              ["Audio", "Musiqa va ovozlar"],
              ["Fade", "Qoraga/oqqa o'tish"],
              ["Event", "Blueprint event chaqirish"],
              ["Visibility, Material Parameter, Light", "Ko'rinish, material, yorug'lik o'zgarishlari"]] },
    { h: "Kameralar",
      ul: ["Sequencer'da {{Create Camera}} (kamera ikonka) — CineCameraActor yaratib, Camera Cut track'iga qo'shadi.",
           "CineCamera sozlamalari: **Focal Length** (18 mm — keng, 85 mm — portret), **Aperture** (f/1.4 — kuchli fon xiralashuvi), **Focus Distance** (yoki Tracking — ob'ektni kuzatib fokus).",
           "**Camera Rig Rail** — relsda silliq harakat, **Camera Rig Crane** — kran harakati.",
           "{{Pilot}} rejimi: Viewport kamerani to'g'ridan-to'g'ri boshqaradi — kadrni topib key qo'yasiz.",
           "Bir nechta kadr (shot) uchun: **Master Sequence** + **Shot Track** — har kadr alohida Sequence."],
      tip: "Kino qoidalari: «uchdan bir» qoidasi, 180° qoidasi (ikki personaj orasidagi chiziqni kesib o'tmang) va kadr davomiyligi 2–6 soniya." },
    { h: "Personajlar va animatsiya",
      p: "Skeletal Mesh Actor'ni qo'shing → {{+ Animation}} → kerakli animatsiya. Klipni o'ng tugma bilan Blend In/Out, kesish va tezligini o'zgartirish mumkin. Murakkab harakatlar uchun Control Rig bilan to'g'ridan-to'g'ri Sequencer'da animatsiya yaratish mumkin (Animation Mode).",
      warn: "O'yinchi personajini kat-sahnada ishlatish uchun **Spawnable** yoki o'yin paytida binding'ni almashtirish kerak. Oddiy yo'l — kat-sahnada alohida «aktyor» nusxasini ishlatib, o'yinchini vaqtincha yashirish." },
    { h: "O'yindan ishga tushirish",
      graph: {
        t: "BP_CutsceneTrigger · Event Graph",
        n: [
          { id: "ov", k: "event", t: "Event ActorBeginOverlap", x: 0, y: 0, o: [">", "obj Other Actor"] },
          { id: "do", k: "macro", t: "DoOnce", x: 1, y: 0, i: [">", "> Reset"], o: ["> Completed"] },
          { id: "cp", k: "func", t: "Create Level Sequence Player", x: 2, y: 0, i: [">", "obj Level Sequence = LS_DoorOpens", "struct Settings"], o: [">", "obj Out Actor", "obj Return Value"], s: 1 },
          { id: "pl", k: "func", t: "Play", sub: "Target is Movie Scene Sequence Player", x: 3, y: 0, i: [">", "obj Target"], o: [">"], s: 2 },
          { id: "bf", k: "func", t: "Bind Event to On Finished", x: 4, y: 0, i: [">", "obj Target", "evt Event"], o: [">"] },
          { id: "fn", k: "custom", t: "CutsceneFinished", sub: "Custom Event", x: 3, y: 3.4, o: ["evt", ">"], s: 3 },
          { id: "sh", k: "func", t: "Show HUD", x: 4, y: 3.4, i: [">"], o: [">"] }
        ],
        w: ["ov.0-do.0", "do.0-cp.0", "cp.0-pl.0", "cp.2-pl.1", "pl.0-bf.0", "cp.2-bf.1", "fn.0-bf.2", "fn.1-sh.0"],
        how: ["[[Create Level Sequence Player]] — Settings pinini Split qilib: Disable Movement/Look Input, Hide Player, Hide HUD.",
              "[[Play]], keyin **On Finished** ga obuna bo'ling — kat-sahna tugaganda o'yin davom etadi."] },
      tip: "Kat-sahnani o'tkazib yuborish (Skip): kat-sahna paytida {{Space}}/{{Esc}} → Sequence Player'da [[Go to End and Stop]]." },
    { h: "Movie Render Queue",
      steps: ["{{Plugins → Movie Render Queue}} ✔ (odatda yoqilgan).",
              "{{Window → Cinematics → Movie Render Queue}} → {{+ Render}} → Sequence'ni tanlang.",
              "Settings: Output — 1920×1080 yoki 3840×2160, Format — PNG sequence yoki Apple ProRes/H.264 (MP4 uchun plagin kerak bo'lishi mumkin).",
              "Anti-aliasing: Spatial Sample Count 1, Temporal Sample Count 8 — silliq harakat xiralashuvi.",
              "{{Render (Local)}}."] },
    { h: "Amaliy topshiriq",
      steps: ["Kun 54 dagi xaritada 30 soniyalik «intro» kat-sahna: 4 ta kadr, kran harakati, musiqa, oxirida Fade.",
              "Kat-sahna o'yin boshida ijro etilsin, oxirida boshqaruv o'yinchiga o'tsin. Skip imkoniyati bilan.",
              "Generator yoqilganda (Kun 30) qisqa kat-sahna: kamera eshikka uchadi, eshik Event Track orqali ochiladi.",
              "Movie Render Queue bilan intro'ni 1080p videoga render qiling — portfolio uchun."] }
  ],
  check: ["Level Sequence yaratib, keyframe qo'yaman", "CineCamera va Camera Cut'ni ishlataman", "Kat-sahnani triggerdan ishga tushiraman", "Event Track bilan Blueprint chaqiraman", "Movie Render Queue bilan video oldim"],
  err: [["Kat-sahnadan keyin kamera qaytmayapti", "Sequence Player Settings'da {{Restore State}} yoki Camera Cut'ning «Can Blend» va oxiridagi kadrni tekshiring."],
        ["Render qilingan videoda Lumen «shovqinli»", "Movie Render Queue'da Warm Up Count'ni oshiring (32+) va Console Variables'da Lumen sifatini oshiring."]],
  ch: "Dialog kat-sahna: ikki personaj gaplashadi — shot/reverse shot kameralari, subtitrlar (Event Track → UI matni) va har replika uchun yuz ifodasi (agar MetaHuman bo'lsa) yoki tana animatsiyasi.",
  quiz: [["Qaysi kamera faolligini boshqaruvchi track:", ["Transform", "Camera Cut", "Fade", "Event"], 1, "Camera Cut."],
         ["Kat-sahnadan Blueprint funksiyani chaqirish:", ["Audio Track", "Event Track", "Visibility", "Shot Track"], 1, "Event Track + Director BP."],
         ["Yuqori sifatli video olish vositasi:", ["HighResShot", "Movie Render Queue", "OBS", "Play in Editor"], 1, "MRQ."]]
},
{
  d: 57, t: "Fizika: Chaos, Constraint va buziladigan obyektlar", time: "3 soat",
  g: "Unreal'ning Chaos fizika tizimi: kuchlar, bog'lanishlar (constraint), buziladigan geometriya va fizik o'zaro ta'sirlar.",
  learn: ["Simulate Physics, massa, damping", "Add Force, Add Impulse, Radial Force", "Physics Constraint", "Physics Handle (ko'tarib olish)", "Chaos Destruction: Geometry Collection", "Physical Material: ishqalanish va sakrash"],
  body: [
    { h: "Fizik obyekt",
      table: [["Sozlama", "Ta'siri"],
              ["Simulate Physics", "Gravitatsiya va to'qnashuvlar ta'sir qiladi"],
              ["Mass (kg)", "Avtomatik yoki Mass Override"],
              ["Linear / Angular Damping", "Havo qarshiligi — harakat va aylanish so'nishi"],
              ["Enable Gravity", "Gravitatsiya"],
              ["Lock Position / Rotation", "Ma'lum o'qlarni qotirish (2D o'yin uchun)"],
              ["CCD", "Tez obyektlar devordan «o'tib ketmasligi» uchun"]],
      bp: `[Add Impulse] (Target ← Mesh, Impulse ← Forward × 50000, Vel Change ✘)   // bir zumlik zarba
[Add Force]   (Target ← Mesh, Force ← (0,0,98000))                       // doimiy kuch (Tick'da)
[Add Radial Impulse] (Origin, Radius 500, Strength 2000, Falloff Linear, Vel Change ✔)
[Add Torque in Radians]                                                   // aylantirish`,
      tip: "{{Vel Change}} ✔ bo'lsa massa hisobga olinmaydi — barcha obyektlar bir xil tezlik oladi. Portlashlarda yengil va og'ir narsalar farqli uchishi uchun uni ✘ qoldiring." },
    { h: "Physics Constraint",
      p: "Ikki fizik jismni bog'laydi: eshik ilmog'i, zanjir, mayatnik, osma ko'prik. **Physics Constraint Actor** yoki component — Component 1 va Component 2 tanlanadi.",
      table: [["Limit", "Variantlar"],
              ["Linear X/Y/Z", "Free, Limited, Locked"],
              ["Angular Swing1/Swing2/Twist", "Free, Limited (masalan 90°), Locked"],
              ["Motor", "Constraint'ni burovchi motor (avtomatik eshik)"],
              ["Break Threshold", "Kuch oshsa uziladi"]] },
    { h: "Physics Handle — buyumni ko'tarish",
      graph: {
        t: "BP_Hero · Event Graph",
        n: [
          { id: "g", k: "input", t: "IA_Grab", sub: "Enhanced Input Action", x: 0, y: 0, o: ["> Started", "> Completed"] },
          { id: "tr", k: "func", t: "Trace For Interactable", sub: "Kun 25", x: 1, y: 0, i: [">"], o: [">", "obj Hit Actor", "obj Hit Component", "vec Location"] },
          { id: "gc", k: "func", t: "Grab Component at Location with Rotation", sub: "PhysicsHandle", x: 2, y: 0, i: [">", "obj Target", "obj Component", "name Bone Name", "vec Location", "rot Rotation"], o: [">"], s: 1 },
          { id: "rl", k: "func", t: "Release Component", sub: "PhysicsHandle", x: 1, y: 4.4, i: [">", "obj Target"], o: [">"], s: 2 },
          { id: "t", k: "event", t: "Event Tick", x: 0, y: 6.4, o: [">", "float Delta Seconds"] },
          { id: "tg", k: "func", t: "Set Target Location and Rotation", sub: "PhysicsHandle", x: 1, y: 6.4, i: [">", "obj Target", "vec New Location", "rot New Rotation"], o: [">"], s: 3 },
          { id: "hp", k: "pure", t: "Camera Location + Forward × 200", x: 0, y: 9, o: ["vec Return Value"] },
          { id: "ph", k: "var", t: "PhysicsHandle", x: 1, y: 2.6, o: ["obj"] }
        ],
        w: ["g.0-tr.0", "tr.0-gc.0", "tr.2-gc.2", "tr.3-gc.4", "ph.0-gc.1", "g.1-rl.0", "ph.0-rl.1", "t.0-tg.0", "ph.0-tg.1", "hp.0-tg.2"],
        how: ["Character'ga **PhysicsHandle** component qo'shing.",
              "Ushlash: trace bilan Simulate Physics'li component topiladi → [[Grab Component at Location with Rotation]].",
              "Har kadr ushlangan obyekt maqsad nuqtaga tortiladi — [[Set Target Location and Rotation]].",
              "Qo'yib yuborish — [[Release Component]]. Otish uchun undan keyin [[Add Impulse]]."] },
      warn: "Ushlangan obyekt o'yinchini itarib yubormasligi uchun ushlab turilganda uning Pawn kanaliga javobini Ignore qiling yoki massasini cheklang." },
    { h: "Chaos Destruction",
      steps: ["Rejim {{Fracture}} (Modes menyusi). Static Mesh'ni levelda tanlab {{New}} → **Geometry Collection** (`GC_Wall`) yaratiladi.",
              "{{Uniform}} / {{Cluster}} / {{Radial}} / {{Planar}} fracture — bo'laklarga bo'lish. Level'lar: avval katta bo'laklar, keyin ichida kichik.",
              "Geometry Collection'da: **Damage Threshold** — har level uchun qancha kuch kerak.",
              "Buzish: kuchli to'qnashuv yoki **Field System** (Master Field — radial kuch va zarar) — `FS_MasterField` ni spawn qiling.",
              "Bo'laklar uchun: Remove on Sleep yoki Max Lifetime — vaqt o'tib yo'qolsin (unumdorlik)."],
      tip: "Destruction qimmat: faqat o'yinda muhim joylarda ishlating. Ko'p hollarda «yaxlit mesh → buzilgan mesh + Niagara chang» almashtiruvi yetarli va ancha arzon." },
    { h: "Physical Material",
      p: "Kun 55 dagi Physical Material'larda **Friction** (muz uchun 0.05), **Restitution** (sakrash: rezina to'p 0.9) va **Density** ham bor. Muz polida personaj sirpanishi uchun CharacterMovement Ground Friction ham kerak bo'ladi." },
    { h: "Amaliy topshiriq",
      steps: ["Fizika maydoni: turli massali qutilar, to'p (Restitution 0.8), muz qoplamali qiya.",
              "Physics Handle bilan obyektlarni ko'tarish, aylantirish va otish.",
              "Physics Constraint: ilmoqli eshik (itarib ochiladi), mayatnikli tuzoq (Motor bilan aylanadi), zanjirli ko'prik (5 ta taxta).",
              "Buziladigan devor: Geometry Collection, bochka portlaganda (Kun 26) Field bilan buzilsin.",
              "Fizik jumboq: og'ir qutini bosim plitasiga (Kun 16) qo'yib eshikni ochish."] }
  ],
  check: ["Impulse va Force farqini bilaman", "Physics Constraint bilan eshik/mayatnik yasadim", "Physics Handle bilan obyekt ushlayman", "Geometry Collection yaratib, buzdim", "Physical Material ishqalanish va sakrashni boshqaradi"],
  err: [["Fizik obyekt titrab, «qaltirab» turadi", "Juda kichik yoki juda yengil obyektlar yoki bir-biriga kirib qolgan collision. Massani oshiring, collision'ni soddalashtiring, Position Solver Iteration'ni oshiring."],
        ["Geometry Collection buzilmayapti", "Damage Threshold juda yuqori yoki kuch Field orqali emas. Master Field'ni zarb joyida spawn qiling."]],
  ch: "«Domino effekti»: 50 ta domino PCG yoki For Loop bilan spline bo'ylab joylashtirilsin, birinchisiga turtki — oxirgisi tushganda tugma bosilib eshik ochilsin.",
  quiz: [["Bir zumlik zarba uchun:", ["Add Force", "Add Impulse", "Set Velocity", "Add Torque"], 1, "Impulse — bir martalik."],
         ["Ikki fizik jismni bog'lash:", ["Spring Arm", "Physics Constraint", "Socket", "Attach"], 1, "Constraint."],
         ["Buziladigan geometriya asset'i:", ["Static Mesh", "Geometry Collection", "Skeletal Mesh", "Niagara"], 1, "Chaos Destruction."]]
},
{
  d: 58, t: "Qurol tizimi: Projectile, Hitscan va o'q-dorilar", time: "3–4 soat",
  g: "Shooter o'yinlarning asosi: hitscan va snaryad qurollari, o'q-dori, qayta o'qlash, otish tezligi va otishdagi tarqoqlik (spread).",
  learn: ["Hitscan (Line Trace) qurol", "Projectile Movement Component", "Qurol base klassi va Data Asset", "Otish tezligi va avtomatik otish", "Ammo va Reload", "Spread va Recoil"],
  body: [
    { h: "Ikki yondashuv",
      table: [["", "Hitscan", "Projectile"],
              ["Usul", "Bir zumda Line Trace", "Haqiqiy uchuvchi Actor"],
              ["Misol", "Avtomat, pistolet, lazer", "Raketa, granata, kamon o'qi, sekin plazma"],
              ["Afzallik", "Arzon, aniq", "Gravitatsiya, ko'rinadigan o'q, tezlik"],
              ["Kamchilik", "O'q ko'rinmaydi (tracer effekt kerak)", "Qimmatroq, multiplayer'da murakkab"]] },
    { h: "Qurol arxitekturasi",
      bp: `PDA_WeaponData (Primary Data Asset) — Kun 29
   Damage, FireRate (o'q/s), bAutomatic, MagSize, ReloadTime,
   Range, SpreadDeg, RecoilPitch, ProjectileClass (ixtiyoriy),
   Mesh, MuzzleFX (NS_), FireSound (MS_), ImpactFX, AnimMontage_Fire, AnimMontage_Reload

BP_WeaponBase (Actor): WeaponData, CurrentAmmo, ReserveAmmo, bIsReloading
   StartFire() / StopFire() / Fire() / Reload()
├── BP_Weapon_Rifle    (DA_Rifle)
├── BP_Weapon_Shotgun  (DA_Shotgun — Fire() override: 8 ta trace)
└── BP_Weapon_Launcher (DA_Launcher — projectile)`,
      tip: "Qurol farqlarining 90% i — raqamlar. Ularni Data Asset'da saqlang: yangi qurol = yangi DA + mesh, kod o'zgarmaydi." },
    { h: "Hitscan otish",
      bp: `// BP_WeaponBase.Fire
CurrentAmmo <= 0 ? ──▶ Play "click" ──▶ return
CurrentAmmo −= 1
Start = Camera Location;  Dir = Camera Forward
Dir = [Random Unit Vector in Cone in Degrees] (Dir, SpreadDeg)   // tarqoqlik
[Line Trace By Channel] (Start, Start + Dir × Range, Channel ← Visibility/Weapon)
   Hit ? ──▶ [Apply Point Damage] (Hit Actor, Damage, Dir, Hit Result, Instigator, Self)
        ──▶ [Spawn System at Location] ImpactFX (Phys Mat bo'yicha — Kun 55)
        ──▶ [Spawn Decal at Location] o'q izi
[Spawn System Attached] MuzzleFX (socket "Muzzle")
[Play Sound at Location] FireSound
Owner Controller ──▶ [Add Pitch Input] (−RecoilPitch)   // tepish`,
      warn: "TPS'da trace kameradan boshlanadi (o'yinchi ko'rgan nuqtaga), effekt va tracer esa qurol uchidan chiqadi. Aks holda o'qlar burchak ortidan «uchib» chiqadi." },
    { h: "Avtomatik otish",
      bp: `StartFire ──▶ CanFire ? ──▶ Fire()
   ──▶ bAutomatic ? ──▶ [Set Timer by Function Name] ("Fire", 1 / FireRate, Looping ✔) → FireTimer
StopFire ──▶ [Clear and Invalidate Timer by Handle] (FireTimer)
// Juda tez bosishda FireRate'dan oshib ketmaslik uchun: LastFireTime + 1/FireRate > Now ? return` },
    { h: "Projectile",
      steps: ["`BP_ProjectileBase`: Root — Sphere Collision (radius 5, BlockAllDynamic, Ignore Pawn-Owner), Static Mesh (NoCollision), **Projectile Movement Component**.",
              "PMC: Initial Speed 3000, Max Speed 3000, Projectile Gravity Scale 0 (raketa) yoki 1 (granata), Should Bounce (granata uchun ✔).",
              "Spawn qilishda: [[Spawn Actor]] (Instigator ← Owner Pawn), Collision sozlamasida otuvchini ignore qiling ([[Ignore Actor when Moving]]).",
              "On Component Hit: Apply Damage yoki Radial Damage, effekt, Destroy. Initial Life Span = 5 s."] },
    { h: "Amaliy topshiriq",
      steps: ["`PDA_WeaponData` va `BP_WeaponBase` yarating; qurolni Kun 37 dagi socket'ga biriktiring.",
              "Avtomat (hitscan, avtomatik), shotgun (8 o'q, katta spread), granata otar (projectile, bounce, radial damage).",
              "1/2/3 tugmalari bilan qurol almashtirish. R — reload (Montage + Notify'da ammo to'ldiriladi).",
              "HUD: «24 / 120» ammo hisoblagich (dispatcher bilan).",
              "Crosshair spread bilan kengaysin (yugurganda va otganda katta, turganda kichik).",
              "Dushmanlar (Kun 48) zarar olib o'ladi."] }
  ],
  check: ["Hitscan va projectile farqini bilaman", "Qurol Data Asset'ga asoslangan", "Avtomatik otish Timer bilan", "Spread va recoil bor", "Reload Montage + Notify bilan", "Kamida 3 xil qurol"],
  err: [["Projectile o'z otuvchisiga tegib portlaydi", "Spawn joyi otuvchining kapsulasi ichida. Muzzle socket'dan spawn qiling va Owner'ni ignore qiling."],
        ["Tez otishda o'qlar devordan o'tib ketadi", "Projectile juda tez va kichik. Collision radiusini oshiring yoki CCD ✔."]],
  ch: "Snayper miltig'i: O'ng tugma bilan optik nishon (Kun 21 dagi zoom + skope widget), nafas olish tebranishi (Sine bilan) va Shift — nafasni ushlab turish (stamina sarflab, tebranish yo'qoladi).",
  quiz: [["Granata uchun mos usul:", ["Hitscan", "Projectile + Bounce", "Line Trace", "Overlap"], 1, "Gravitatsiya va sakrash bilan."],
         ["Tarqoqlik uchun vektor node:", ["Normalize", "Random Unit Vector in Cone in Degrees", "Dot Product", "Lerp"], 1, "Konus ichida tasodifiy yo'nalish."],
         ["Qurol raqamlari qayerda saqlanishi ma'qul?", ["Har BP'da alohida", "Primary Data Asset", "Level Blueprint", "Widget"], 1, "Data-driven."]]
},
{
  d: 59, t: "Save Game tizimi", time: "3 soat",
  g: "O'yin holatini saqlash va yuklash: sozlamalar, progress, dunyodagi obyektlar va bir nechta saqlash sloti.",
  learn: ["SaveGame klassi", "Save Game to Slot / Load Game from Slot", "Async save/load", "Nimani saqlash kerak", "Dunyodagi Actor'larni saqlash (GUID)", "Bir nechta slot va avtosaqlash"],
  body: [
    { h: "SaveGame obyekti",
      p: "{{Blueprint Class → SaveGame}} → `SG_Progress`. Bu oddiy ma'lumot konteyneri: unga saqlanishi kerak bo'lgan o'zgaruvchilarni qo'shasiz. Fayl `Saved/SaveGames/<SlotName>.sav` ga yoziladi.",
      table: [["O'zgaruvchi", "Tur"],
              ["PlayerTransform", "Transform"],
              ["Health, Stamina", "Float"],
              ["Inventory", "F_InventorySlot array"],
              ["CurrentLevel", "Name"],
              ["CollectedPickups", "Name / Guid array"],
              ["OpenedDoors", "Name set"],
              ["PlayTime, SaveDate", "Float, Date Time"]],
      warn: "Object reference'larni (Actor havolalari) saqlamang — ular faqat joriy sessiyada mavjud. Faqat ma'lumot saqlang: raqamlar, nomlar, transform'lar, ID'lar." },
    { h: "Saqlash va yuklash",
      bp: `// Saqlash — odatda GameInstance'da (Kun 17): SaveGameManager vazifasi
[SaveGame(SlotName)]
   ──▶ [Does Save Game Exist] (SlotName, 0) ? Load : [Create Save Game Object] (SG_Progress)
   ──▶ Cast To SG_Progress ──▶ ma'lumotlarni yig'ish (Player, Inventory, World)
   ──▶ [Async Save Game to Slot] (SaveGameObject, SlotName, User Index 0)
          Completed (Success) ──▶ "Saqlandi" xabari

// Yuklash
[Async Load Game from Slot] (SlotName) ──▶ Cast To SG_Progress
   ──▶ [Open Level] (CurrentLevel)  // level yuklangach ma'lumotlarni qo'llash:
   // GameMode BeginPlay ──▶ GameInstance.PendingLoad ? ──▶ ApplySaveData`,
      tip: "Async variantlarni ishlating — katta saqlash fayllarida oddiy Save Game to Slot o'yinni bir lahzaga «qotirib» qo'yadi." },
    { h: "Dunyo holatini saqlash",
      p: ["Muammo: levelda 50 ta tanga bor, o'yinchi 20 tasini oldi. Yuklashda shu 20 tasi qayta paydo bo'lmasligi kerak. Har bir saqlanadigan Actor'ga **barqaror ID** kerak.",
          "Usul: `BPI_Saveable` interface (`GetSaveID` → Name, `SaveState` → String/struct, `LoadState`). Har Actor'da `SaveID` (Name, Instance Editable) — levelda yagona bo'lsin. Yoki Construction Script'da Guid yaratib saqlash (bir marta)."],
      bp: `// Saqlashda
[Get All Actors with Interface] (BPI_Saveable) ──▶ For Each
   ──▶ SaveGame.WorldStates.Add (Key ← GetSaveID, Value ← SaveState)   // Map<Name, String>

// Yuklashda (level ochilgandan keyin)
For Each Saveable ──▶ WorldStates.Find(GetSaveID) ──▶ LoadState(Value)
// Pickup.LoadState("Collected") ──▶ Destroy Actor
// Door.LoadState("Open") ──▶ ochiq holatga o'rnatish (animatsiyasiz)`,
      p2: "Murakkab holatlar uchun String o'rniga struct yoki **Serialize** usullari (C++ da `FArchive` bilan SaveGame flag'li property'lar) ishlatiladi. Blueprint loyihalar uchun Map<Name, String> yondashuvi yetarli." },
    { h: "Slotlar va avtosaqlash",
      ul: ["Slot nomlari: `Slot_0`, `Slot_1`, `Slot_2`, `Autosave`. Main Menu'da «Continue» eng so'nggi saqlanganini yuklaydi.",
           "Har slot uchun yengil `SG_SlotInfo` (sana, o'yin vaqti, level nomi, skrinshot yo'q) — menyuda ro'yxat ko'rsatish uchun to'liq faylni yuklash shart emas.",
           "Avtosaqlash: checkpoint'da (Kun 24), level almashganda va har 5 daqiqada (Timer).",
           "O'chirish: [[Delete Game in Slot]].",
           "Sozlamalar (ovoz, sezgirlik) uchun alohida `SG_Settings` — progressdan mustaqil."] },
    { h: "Amaliy topshiriq",
      steps: ["`SG_Progress`, `SG_Settings` va GameInstance'da `SaveGameManager` funksiyalarini yarating.",
              "Saqlanadi: o'yinchi joyi, sog'lig'i, inventari, ammo, level.",
              "`BPI_Saveable`: pickup'lar, eshiklar, generator, sandiqlar.",
              "Pause menyusiga «Saqlash» va «Yuklash», Main Menu'ga «Davom etish» va 3 slotli Load ekrani.",
              "Kun 36 dagi audio va sichqoncha sozlamalari `SG_Settings` da saqlansin.",
              "Kun 12 dagi tanga o'yinida eng yaxshi vaqt (high score) saqlansin."] }
  ],
  check: ["SaveGame klassi yaratdim", "Async save/load ishlaydi", "Object reference saqlamaslik kerakligini bilaman", "Dunyo obyektlari ID orqali tiklanadi", "Bir nechta slot va avtosaqlash bor", "Sozlamalar alohida saqlanadi"],
  err: [["Yuklashda o'yinchi eski joyda paydo bo'lmaydi", "Ma'lumot Open Level'dan oldin qo'llangan — yangi level yuklanganda hammasi qayta yaratiladi. Ma'lumotni GameInstance'da kutib turib, yangi level BeginPlay'da qo'llang."],
        ["Ikki Actor bir xil SaveID bilan", "Nusxalashda (Alt+drag) Instance Editable ID ham nusxalanadi. ID'larni tekshiruvchi Editor Utility yoki Guid ishlating."]],
  ch: "Saqlash faylining versiyalash: `SaveVersion` (Int) qo'shing. O'yinni yangilab, saqlashga yangi maydon qo'shganingizda eski fayllar ham to'g'ri yuklansin (yo'q maydonlar uchun standart qiymat).",
  quiz: [["SaveGame'da nimani saqlamaslik kerak?", ["Transform", "Actor havolasini", "Integer", "Name"], 1, "Havolalar sessiyadan keyin yaroqsiz."],
         ["Saqlash mantiqi qayerda bo'lgani qulay?", ["Pickup", "GameInstance", "Widget", "Projectile"], 1, "Level almashsa ham yashaydi."],
         ["O'yin qotib qolmasligi uchun:", ["Save Game to Slot", "Async Save Game to Slot", "Delay", "Tick"], 1, "Async."]]
},
{
  d: 60, t: "LOYIHA: Mini shooter — «Arena Survival»", time: "5 soat",
  g: "10-modulni yakunlash: qurollar, AI, audio, kat-sahna, fizika va saqlash bilan to'liq o'ynaladigan mini o'yin.",
  learn: ["To'liq o'yin sikli", "To'lqinlar va qiyinlik o'sishi", "Ball va high score", "Audio dizayn", "Intro kat-sahna", "Polish ro'yxati"],
  body: [
    { h: "O'yin dizayni",
      p: "O'yinchi arenada. Dushmanlar to'lqin-to'lqin bo'lib keladi, har to'lqin kuchliroq. To'lqinlar orasida 15 soniya tanaffus — o'q-dori va dorilar paydo bo'ladi. O'yinchi o'lganda: ball, yetib kelgan to'lqin va eng yaxshi natija ko'rsatiladi.",
      table: [["Tizim", "Manba"],
              ["Qurollar (3 xil)", "Kun 58"],
              ["Dushmanlar (2–3 tur)", "Kun 48"],
              ["Wave Manager", "GameMode + Data Table"],
              ["Pickup spawn", "Kun 28–29"],
              ["Buziladigan qopqonlar / bochkalar", "Kun 26, 57"],
              ["Musiqa: tanaffus ↔ jang", "Kun 55"],
              ["Intro kat-sahna", "Kun 56"],
              ["High score saqlash", "Kun 59"],
              ["Menyular, HUD", "6-modul"]] },
    { h: "Wave Manager",
      bp: `DT_Waves (F_WaveData): Wave, EnemyCounts (Map<Class, Int>), SpawnInterval, HealthMultiplier
// 10 dan keyingi to'lqinlar formulaga ko'ra: oxirgi qator × (1 + 0.15 × n)

BP_ArenaGameMode
   State: E_ArenaState (Intro, Break, Fighting, GameOver)
   StartWave(n) ──▶ SpawnQueue to'ldiriladi ──▶ Timer (SpawnInterval) ──▶ SpawnNext
   SpawnNext ──▶ tasodifiy BP_SpawnPoint (o'yinchi ko'rmaydigan — dot product yoki trace)
   OnEnemyDied ──▶ AliveCount −1 ──▶ 0 va navbat bo'sh ? ──▶ Break (15 s) ──▶ StartWave(n+1)
   PlayerDied ──▶ GameOver ──▶ HighScore tekshirish va saqlash`,
      tip: "Dushmanni o'yinchi ko'z oldida «paydo» qilmang: spawn nuqtasini tanlashda kameraga yo'nalishni (Dot Product > 0.5 bo'lsa ko'rinadi) va masofani tekshiring." },
    { h: "Polish ro'yxati",
      ul: ["**Feedback:** har zarbada hit marker (crosshair'da X), dushman o'lganda ovoz va effekt, ball «+100» suzib chiqishi.",
           "**Ritm:** tanaffusda tinch musiqa, jangda tez; oxirgi dushman qolganda uning joylashuvi HUD'da ko'rsatiladi.",
           "**Qiyinlik:** har to'lqin bilan dushman soni va HP oshadi, lekin pickup'lar ham ko'payadi.",
           "**O'qilish:** muhim narsalar yorqin rangda (pickup — yashil yorug'lik), xavfli narsalar — qizil.",
           "**Game Over ekrani:** ball, to'lqin, eng yaxshi natija, «Qayta» va «Menyu»."] },
    { h: "Topshirish",
      steps: ["O'yinni boshidan oxirigacha 5 marta o'ynab, topilgan xatolarni tuzating.",
              "2 kishiga o'ynatib, fikr-mulohazalarni yozing.",
              "Movie Render Queue bilan 30 s trailer (intro + gameplay kadrlari).",
              "Loyiha zaxirasi va qisqa README: boshqaruv, tizimlar, ma'lum muammolar."] }
  ],
  check: ["To'lqin tizimi Data Table'dan ishlaydi", "3 qurol, 2+ dushman turi", "Musiqa holatga qarab almashadi", "High score saqlanadi", "Intro kat-sahna va Game Over ekrani bor", "Playtest o'tkazildi"],
  err: [["To'lqin tugamaydi — bitta dushman xaritadan tashqariga tushib ketgan", "Kill Z (World Settings) ni sozlang va dushman Destroy bo'lganda ham (EndPlay) AliveCount kamaysin."],
        ["Ko'p dushmanda FPS tushib ketdi", "Tick'larni tekshiring, Perception yangilanish chastotasini kamaytiring va ABP'da Update Rate Optimization ✔. 14-modulda to'liq profiling qilamiz."]],
  ch: "Har 5-to'lqinda Boss (Kun 48 challenge) va to'lqinlar orasida qurolni yaxshilash do'koni (ball evaziga Damage +10% yoki MagSize +5).",
  quiz: [["Dushman o'yinchi oldida paydo bo'lmasligi uchun tekshirish:", ["Vector Length", "Dot Product (kamera yo'nalishi)", "Random Bool", "Delay"], 1, "Ko'rish yo'nalishi."],
         ["Dushman xaritadan tushib ketsa yo'q bo'lishi uchun:", ["Kill Z", "NavMesh", "Constraint", "LOD"], 0, "World Settings → Kill Z."]]
}
);
