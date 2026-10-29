// Modul 12 — Multiplayer (Kun 67–72)
window.UE_LESSONS.push(
{
  d: 67, t: "Tarmoq asoslari: Server, Client va Authority", time: "3 soat",
  g: "Unreal'ning server-avtoritar tarmoq modelini tushunish va Editor'da multiplayer sinovini sozlash.",
  learn: ["Server-authoritative model", "Listen Server va Dedicated Server", "PIE'da multiplayer sinovi", "Has Authority / Is Locally Controlled", "Kim nimani ko'radi (Framework jadvali)", "Net Mode va rollar"],
  body: [
    { h: "Asosiy g'oya: server — haqiqat manbai",
      p: ["Unreal multiplayer'i **server-avtoritar**: o'yin holatining yagona to'g'ri nusxasi serverda. Mijozlar (client) faqat input yuboradi va serverdan kelgan natijani ko'rsatadi. Bu cheat'ga qarshi asosiy himoya: mijoz «menda 1000 o'q bor» deb ayta olmaydi.",
          "Oltin qoida: **muhim o'zgarish faqat serverda bo'ladi**. Mijoz «o'q uzmoqchiman» deb so'raydi, server tekshiradi, bajaradi va natijani hammaga tarqatadi."],
      table: [["Tur", "Tavsif", "Qachon"],
              ["Listen Server", "O'yinchilardan biri ham server, ham o'yinchi", "Co-op, do'stlar bilan o'ynash"],
              ["Dedicated Server", "Grafikasiz alohida server jarayoni (C++ manba kodli build kerak)", "Raqobatli o'yinlar, ko'p o'yinchi"],
              ["Standalone", "Tarmoqsiz", "Bitta o'yinchi"]] },
    { h: "Editor'da sinash",
      steps: ["Play tugmasi yonidagi {{⋮}} menyusi → {{Number of Players}} = 2 (yoki 3).",
              "{{Net Mode}}: **Play as Listen Server** (1-oyna — server+o'yinchi) yoki **Play as Client** (alohida yashirin server).",
              "{{Advanced Settings → Multiplayer Options}}: {{Run Under One Process}} ✔ — tez sinov; ✘ — haqiqatga yaqinroq.",
              "Play → ikki oyna ochiladi. Print String'larda «Server:» va «Client 1:» prefikslari ko'rinadi."],
      tip: "Tarmoq kechikishini simulyatsiya qiling: {{Editor Preferences → Level Editor → Play → Network Emulation}} ✔ — Average profili. Mukammal tarmoqda ishlagan kod 100 ms ping'da buzilishi mumkin." },
    { h: "Framework'ning tarmoqdagi o'rni",
      table: [["Klass", "Server", "Egasi bo'lgan mijoz", "Boshqa mijozlar"],
              ["GameMode", "✔", "✘", "✘"],
              ["GameState", "✔", "✔", "✔"],
              ["PlayerController", "✔ (hammasi)", "✔ (faqat o'ziniki)", "✘"],
              ["PlayerState", "✔", "✔", "✔"],
              ["Pawn / Character", "✔", "✔", "✔"],
              ["HUD / Widget", "✘ (listen server'da o'ziniki)", "✔ (o'ziniki)", "✘"],
              ["GameInstance", "Har mashinada alohida, replikatsiya qilinmaydi", "", ""]],
      warn: "Mijozda [[Get Game Mode]] None qaytaradi! Shuning uchun Kun 17 da GameMode'ga yozilgan mantiqni mijozdan chaqira olmaysiz — bu buyruqlar RPC orqali serverga yuborilishi kerak (Kun 69)." },
    { h: "Authority va rollar",
      graph: {
        t: "BP_Pickup · Event Graph",
        n: [
          { id: "ov", k: "event", t: "Event ActorBeginOverlap", x: 0, y: 0, o: [">", "obj Other Actor"] },
          { id: "sa", k: "macro", t: "Switch Has Authority", x: 1, y: 0, i: [">"], o: ["> Authority", "> Remote"], s: 1 },
          { id: "gi", k: "func", t: "Give Item", sub: "faqat serverda", x: 2, y: 0, i: [">", "obj Target", "name Item ID"], o: [">"], s: 2 },
          { id: "ds", k: "func", t: "Destroy Actor", x: 3, y: 0, i: [">", "obj Target = self"], o: [">"] },
          { id: "fx", k: "func", t: "Play Sound 2D", sub: "mijozda — faqat kosmetika", x: 2, y: 2.6, i: [">", "obj Sound = S_Pickup"], o: [">"], s: 3 }
        ],
        w: ["ov.0-sa.0", "sa.0-gi.0", "ov.1-gi.1", "gi.0-ds.0", "sa.1-fx.0"],
        how: ["[[Switch Has Authority]] — bitta graf ikki joyda ishlaydi: **Authority** chiqishi serverda, **Remote** esa mijozdagi nusxada.",
              "O'yin holatini o'zgartiruvchi hamma narsa (buyum berish, Destroy) — Authority tarmog'ida.",
              "Remote — faqat vizual va ovoz."] },
      table: [["Rol", "Ma'nosi"],
              ["Authority", "Serverdagi asl nusxa"],
              ["Autonomous Proxy", "Mijozdagi, o'sha mijoz boshqaradigan Pawn (o'zining qahramoni)"],
              ["Simulated Proxy", "Mijozdagi boshqa o'yinchilar va obyektlar nusxasi"]] },
    { h: "Amaliy topshiriq",
      steps: ["Third Person shablon bilan yangi `UE90_MP` loyihasini yarating (multiplayer sinovlari uchun toza loyiha).",
              "2 o'yinchi, Listen Server bilan ishga tushiring — CharacterMovement allaqachon replikatsiya qilinadi, ikkala o'yinchi bir-birini ko'radi.",
              "Character BeginPlay'da Switch Has Authority + Is Locally Controlled bilan 4 xil xabar chiqaring va har oynada qaysi xabar chiqishini jadvalga yozing.",
              "Shablondagi Character'ga kub qo'shib, BeginPlay'da faqat serverda rangini o'zgartiring — mijoz buni ko'rmasligini kuzating (ertaga tuzatamiz).",
              "Network Emulation'ni yoqib, 2 o'yinchi bilan harakatni sinang."] }
  ],
  check: ["Server-avtoritar modelni tushuntira olaman", "Listen va Dedicated Server farqini bilaman", "PIE'da 2+ o'yinchi bilan sinay olaman", "Switch Has Authority va Is Locally Controlled'ni ishlataman", "Qaysi klass qayerda mavjudligini bilaman"],
  err: [["Mijozda Get Game Mode → Cast muvaffaqiyatsiz", "GameMode faqat serverda. Mijoz tomonidagi ma'lumot uchun GameState'dan foydalaning."],
        ["Serverdagi o'zgarish mijozda ko'rinmaydi", "O'zgaruvchi yoki Actor replikatsiya qilinmagan — ertangi mavzu."]],
  ch: "Har o'yinchi oynasida ekranning yuqorisida «Siz: Server / Client N», shuningdek ping ([[Get Ping]] PlayerState'dan) ko'rsatilsin.",
  quiz: [["O'yin holatining haqiqiy manbai:", ["Mijoz", "Server", "Ikkalasi teng", "GameInstance"], 1, "Server-authoritative."],
         ["Mijozda mavjud bo'lmagan klass:", ["GameState", "PlayerState", "GameMode", "Character"], 2, "GameMode faqat serverda."],
         ["Mijozdagi o'zi boshqarayotgan Pawn roli:", ["Authority", "Autonomous Proxy", "Simulated Proxy", "None"], 1, "Autonomous Proxy."]]
},
{
  d: 68, t: "Replication: Actor'lar va o'zgaruvchilar", time: "3 soat",
  g: "Serverdagi holatni mijozlarga avtomatik yetkazish: replikatsiya qilinadigan Actor'lar, o'zgaruvchilar va RepNotify.",
  learn: ["Replicates va Replicate Movement", "Replicated o'zgaruvchilar", "RepNotify", "Replication Condition", "Net Relevancy va Net Update Frequency", "Component replikatsiyasi"],
  body: [
    { h: "Actor replikatsiyasi",
      p: ["Actor'ning Class Defaults'ida {{Replicates}} ✔ — server bu Actor'ni yaratganda mijozlarda ham nusxasi paydo bo'ladi. {{Replicate Movement}} ✔ — joylashuvi sinxronlanadi.",
          "Muhim: replikatsiya faqat **serverdan mijozga** yo'nalishda ishlaydi. Mijozda yaratilgan yoki o'zgartirilgan narsa hech qayerga ketmaydi."],
      warn: "Replicates ✔ Actor'ni faqat serverda spawn qiling (Switch Has Authority → Authority). Mijozda spawn qilinsa, u faqat o'sha mijozda ko'rinadigan lokal nusxa bo'ladi." },
    { h: "O'zgaruvchi replikatsiyasi",
      p: "O'zgaruvchining Details'ida {{Replication}}: **None**, **Replicated** yoki **RepNotify**. Server o'zgaruvchini o'zgartirganda yangi qiymat mijozlarga yuboriladi.",
      graph: {
        t: "BP_Lamp · Event Graph va OnRep",
        n: [
          { id: "ei", k: "event", t: "Event Interact", sub: "serverda chaqiriladi", x: 0, y: 0, o: [">", "obj Interactor"] },
          { id: "on", k: "var", t: "bIsOn", x: 0, y: 2.4, o: ["bool"] },
          { id: "nt", k: "op", t: "NOT", x: 1, y: 2.4, i: ["bool"], o: ["bool"] },
          { id: "sw", k: "set", t: "SET w/ Notify", x: 2, y: 0, i: [">", "bool bIsOn"], o: [">", "bool"], s: 1 },
          { id: "or", k: "entry", t: "OnRep_bIsOn", sub: "har mashinada", x: 0, y: 4.6, o: [">"], s: 2 },
          { id: "on2", k: "var", t: "bIsOn", x: 0, y: 6.4, o: ["bool"] },
          { id: "pl", k: "var", t: "PointLight", x: 1, y: 6.4, o: ["obj"] },
          { id: "sv", k: "func", t: "Set Visibility", x: 2, y: 4.6, i: [">", "obj Target", "bool New Visibility"], o: [">"] }
        ],
        w: ["ei.0-sw.0", "on.0-nt.0", "nt.0-sw.1", "or.0-sv.0", "pl.0-sv.1", "on2.0-sv.2"],
        how: ["`bIsOn` o'zgaruvchisi Details → **Replication = RepNotify**. Avtomatik `OnRep_bIsOn` funksiyasi yaratiladi.",
              "Serverda qiymat o'zgarganda (node nomi **SET w/ Notify**) — yangi qiymat barcha mijozlarga ketadi va har birida OnRep chaqiriladi.",
              "OnRep'da faqat ko'rinishni yangilang. Keyinroq ulangan o'yinchi ham to'g'ri holatni ko'radi."] },
      tip: "**RepNotify** — vizual natijalar uchun asosiy usul: holat (bool) replikatsiya qilinadi, ko'rinish esa har mashinada OnRep'da hisoblanadi. Blueprint'da OnRep serverda ham chaqiriladi (C++ dan farqli) — shuning uchun mantiq bir joyda bo'ladi." },
    { h: "Qachon nima replikatsiya qilinadi",
      table: [["Holat", "Usul"],
              ["Doimiy holat (eshik ochiq, sog'liq, ball)", "Replicated / RepNotify o'zgaruvchi"],
              ["Bir martalik hodisa (portlash effekti, ovoz)", "Multicast RPC (ertaga)"],
              ["Faqat egasiga kerak (o'q-dori)", "Replication Condition = Owner Only"],
              ["Faqat vizual, o'yinga ta'sirsiz (titrash)", "Replikatsiya kerak emas — har mashinada lokal"]],
      p2: "**Replication Condition**: Initial Only (faqat boshida), Owner Only, Skip Owner, Simulated Only, Autonomous Only va boshqalar — trafikni tejaydi." },
    { h: "Tarmoq samaradorligi",
      ul: ["**Net Update Frequency** — sekundiga necha marta tekshiriladi (standart 100). Kam o'zgaradigan Actor'lar (eshik) uchun 2–10 yetarli.",
           "**Net Cull Distance** — shu masofadan uzoqdagi mijozlarga yuborilmaydi (relevancy).",
           "**Always Relevant** — hamma uchun doim (GameState kabi).",
           "**Net Dormancy** — umuman o'zgarmayotgan Actor'larni «uxlatish».",
           "Katta massivlar va struct'larni har kadr replikatsiya qilmang."] },
    { h: "Component'lar",
      p: "Actor Component'da ham {{Component Replicates}} ✔ va replicated o'zgaruvchilar bo'lishi mumkin. Masalan `BPC_Health.Health` — RepNotify bilan, `OnRep_Health` esa `OnHealthChanged` dispatcher'ini chaqiradi va UI barcha mashinalarda to'g'ri yangilanadi." },
    { h: "Amaliy topshiriq",
      steps: ["`BP_Lamp` va `BP_Door` ni RepNotify bilan qayta yozing — bir o'yinchi ochsa, ikkinchisi ham ko'radi.",
              "Kecha serverda rangi o'zgargan kub — `CubeColor` (RepNotify) bilan tuzating.",
              "`BPC_Health` ni replikatsiyaga moslang: Health — RepNotify, zarar faqat serverda hisoblanadi (AnyDamage serverda chaqiriladi).",
              "Sinov: kechi kelgan o'yinchi (Late join) — o'yinchi keyinroq ulanganda eshik holati to'g'ri ko'rinishi kerak (RepNotify buni avtomatik hal qiladi).",
              "Mijozda o'zgaruvchini o'zgartirib ko'ring — u serverga ketmasligini isbotlang."] }
  ],
  check: ["Replicates va Replicate Movement'ni bilaman", "Replicated va RepNotify farqini bilaman", "Replicated Actor'ni faqat serverda spawn qilaman", "Replication Condition'larni bilaman", "Health component replikatsiya qilinadi"],
  err: [["Mijozda o'zgaruvchi o'zgarmaydi", "Uni mijozda o'zgartiryapsiz (replikatsiya teskari ishlamaydi) yoki Actor Replicates ✘."],
        ["OnRep chaqirilmaydi", "Qiymat o'zgarmagan (bir xil qiymat qayta Set qilingan) yoki oddiy Set ishlatilgan — RepNotify uchun «Set w/ Notify» node'i chiqadi."]],
  ch: "Replikatsiya qilinadigan «ball jadvali»: PlayerState'da `Kills` (Replicated), GameState'da `PlayerArray` orqali barcha o'yinchilar ro'yxati — Tab bosilganda hammada bir xil jadval chiqsin.",
  quiz: [["Replikatsiya yo'nalishi:", ["Mijoz → server", "Server → mijoz", "Ikki tomonlama", "Mijoz → mijoz"], 1, "Faqat serverdan."],
         ["Holat o'zgarganda vizualni yangilash uchun eng yaxshi usul:", ["Tick", "RepNotify", "Delay", "Multicast har kadr"], 1, "OnRep funksiyasi."],
         ["Faqat egasiga yuboriladigan o'zgaruvchi sharti:", ["Initial Only", "Owner Only", "Skip Owner", "None"], 1, "Owner Only."]]
},
{
  d: 69, t: "RPC: Server, Client va Multicast", time: "3 soat",
  g: "Mijozdan serverga so'rov yuborish va serverdan mijozlarga hodisa tarqatish uchun Remote Procedure Call'lar.",
  learn: ["Run on Server", "Run on owning Client", "Multicast", "Reliable va Unreliable", "Ownership — RPC ishlashi sharti", "Server validatsiyasi"],
  body: [
    { h: "RPC turlari",
      p: "Custom Event'ning Details'ida {{Replicates}}:",
      table: [["Tur", "Kim chaqiradi → qayerda bajariladi", "Misol"],
              ["Run on Server", "Egasi bo'lgan mijoz → server", "«Men eshikni ochmoqchiman», «Men o'q uzdim»"],
              ["Run on owning Client", "Server → faqat egasi bo'lgan mijoz", "«Senga yutuq berildi» UI xabari"],
              ["Multicast", "Server → hamma (server + barcha mijozlar)", "Portlash effekti va ovozi"],
              ["Not Replicated", "Oddiy lokal event", "—"]],
      warn: "Server RPC'ni faqat mijoz **egasi** bo'lgan Actor'dan chaqirish mumkin: o'z PlayerController'i, Pawn'i, PlayerState'i yoki ular egalik qiladigan Actor'lar. Levelga qo'yilgan eshikda Server RPC chaqirsangiz — u jimgina **tashlab yuboriladi**." },
    { h: "To'g'ri interaction oqimi",
      graph: {
        t: "BP_Hero · Event Graph",
        n: [
          { id: "ia", k: "input", t: "IA_Interact", sub: "mijozda bosildi", x: 0, y: 0, o: ["> Started"] },
          { id: "fa", k: "var", t: "FocusedActor", x: 0, y: 2, o: ["obj"] },
          { id: "sr", k: "func", t: "Server Interact", sub: "Replicated To Server", x: 1, y: 0, i: [">", "obj Target = self", "obj Target Actor"], o: [">"], s: 1 },
          { id: "ev", k: "custom", t: "Server_Interact", sub: "Run on Server · Reliable", x: 0, y: 4, o: [">", "obj Target Actor"], s: 2 },
          { id: "dist", k: "pure", t: "Get Distance To", x: 1, y: 6, i: ["obj Target = self", "obj Other Actor"], o: ["float Return Value"] },
          { id: "lt", k: "op", t: "<", x: 2, y: 6, i: ["float", "float = 300.0"], o: ["bool"] },
          { id: "br", k: "flow", t: "Branch", x: 2, y: 4, i: [">", "bool Condition"], o: ["> True", "> False"], s: 3 },
          { id: "m", k: "msg", t: "Interact (Message)", x: 3, y: 4, i: [">", "obj Target", "obj Interactor = self"], o: [">"], s: 4 }
        ],
        w: ["ia.0-sr.0", "fa.0-sr.2", "ev.0-br.0", "ev.1-dist.1", "dist.0-lt.0", "lt.0-br.1", "br.0-m.0", "ev.1-m.1"],
        how: ["Custom Event `Server_Interact` → Details → **Replicates: Run on Server**, **Reliable** ✔.",
              "Mijoz input'ida faqat shu RPC'ni chaqiradi — o'zi hech narsani o'zgartirmaydi.",
              "Serverda tekshiruv (masofa, holat) va keyin Interact. Eshik o'z holatini RepNotify bilan hammaga tarqatadi."] },
      tip: "Qoida: input → **Server RPC** (o'z Pawn'ida) → server mantiqni bajaradi → natija **RepNotify** yoki **Multicast** orqali tarqaladi. Shu bitta sxema multiplayer'ning 80% ini qamrab oladi." },
    { h: "Multicast — kosmetik hodisalar",
      bp: `// Server: bochka portladi
[Server: Explode] ──▶ Apply Radial Damage (faqat serverda!)
                  ──▶ [Multicast_PlayExplosionFX] (Location)   // Unreliable
                  ──▶ Destroy (biroz kechiktirib)

[Multicast_PlayExplosionFX] ──▶ Spawn System at Location + Play Sound`,
      warn: "Multicast'ni doimiy holat uchun ishlatmang: keyinroq ulangan o'yinchi o'tgan multicast'larni olmaydi. «Bochka portlagan» holati — replicated bool (bExploded), effekt esa — multicast." },
    { h: "Reliable va Unreliable",
      table: [["", "Reliable", "Unreliable"],
              ["Kafolat", "Albatta yetadi, tartib saqlanadi", "Yo'qolishi mumkin"],
              ["Qachon", "Muhim: o'q uzish, buyum olish, ovoz berish", "Tez-tez va kosmetik: effektlar, ovozlar, aim yo'nalishi"],
              ["Xavf", "Ko'p yuborilsa — bufer to'lib, ulanish uziladi", "—"]],
      tip: "Tick'da hech qachon Reliable RPC yubormang." },
    { h: "Validatsiya — cheat'ga qarshi",
      ul: ["Server mijozga ishonmasligi kerak: «Men 500 zarar berdim» emas, «Men otdim» — zararni server hisoblaydi.",
           "Server RPC'da masofa, cooldown, o'q-dori va holatni tekshiring.",
           "Mijoz faqat **niyatini** yuboradi: input yo'nalishi, tanlov, maqsad Actor."] },
    { h: "Amaliy topshiriq",
      steps: ["Interaction'ni Server RPC orqali qayta yozing — mijozlar ham eshik ocha olsin, hammada ko'rinsin.",
              "Qurol otish (Kun 58): mijoz → Server_Fire (Reliable) → serverda trace va zarar → Multicast_FireFX (Unreliable) — muzzle flash va ovoz hammada.",
              "Owning Client RPC: o'yinchi buyum olganda faqat unga «+1 Potion» xabari chiqsin.",
              "Pickup: Server RPC orqali olinadi, inventar serverda yangilanadi (Inventory — Owner Only replikatsiya).",
              "Network Emulation (Bad) bilan sinang."] }
  ],
  check: ["Uch RPC turini va ularning yo'nalishini bilaman", "Server RPC faqat ega Actor'da ishlashini bilaman", "Reliable/Unreliable'ni to'g'ri tanlayman", "Multicast va RepNotify farqini bilaman", "Server tomonida validatsiya qilaman"],
  err: [["Server RPC chaqirildi, lekin serverda hech narsa bo'lmadi", "RPC ega bo'lmagan Actor'da chaqirilgan (masalan levelga qo'yilgan eshik). RPC'ni Pawn yoki Controller'da qiling."],
        ["Effekt serverda ikki marta ko'rinyapti", "Listen server ham o'yinchi: lokal effekt + multicast. Effektni faqat multicast'da qoldiring yoki Is Locally Controlled bilan ajrating."]],
  ch: "Chat: Enter bilan matn kiritish (Editable Text), Server_SendChat → serverda tekshirish (uzunlik ≤ 100) → Multicast_ReceiveChat → hammada chat oynasida «Ism: matn».",
  quiz: [["Mijozdan serverga so'rov:", ["Multicast", "Run on Server", "Run on owning Client", "RepNotify"], 1, "Server RPC."],
         ["Server RPC ishlashi sharti:", ["Actor Static bo'lishi", "Chaqiruvchi mijoz Actor'ning egasi bo'lishi", "Reliable bo'lishi", "Tick'da chaqirilishi"], 1, "Ownership."],
         ["Keyinroq ulangan o'yinchi oladi:", ["O'tgan Multicast'larni", "Replicated o'zgaruvchilarning joriy qiymatini", "Ikkalasini", "Hech birini"], 1, "Holat — o'zgaruvchilar orqali."]]
},
{
  d: 70, t: "Multiplayer gameplay: health, o'lim, respawn va jamoalar", time: "3–4 soat",
  g: "Haqiqiy multiplayer gameplay tizimlarini qurish: replikatsiya qilinadigan jang, o'lim, qayta tug'ilish va ball.",
  learn: ["Replicated Health va o'lim", "GameMode'da respawn (serverda)", "PlayerState'da ball", "GameState'da match holati", "Replikatsiya qilinadigan animatsiya (Montage)", "Lag kompensatsiyasi haqida"],
  body: [
    { h: "Jang sikli tarmoqda",
      bp: `Mijoz A: LMB ──▶ Server_Fire (aim yo'nalishi bilan)
Server:  trace ──▶ Apply Damage (B) ──▶ B.BPC_Health.Health (RepNotify) kamayadi
         Multicast_FireFX (A ning quroli)
Hamma:   OnRep_Health ──▶ OnHealthChanged ──▶ B ning HUD'i (faqat B da), B ustidagi health bar (hammada)
Server:  Health <= 0 ──▶ B.bIsDead (RepNotify) ──▶ OnRep: ragdoll hammada
         GameMode.PlayerKilled(Killer A, Victim B)
             ──▶ A.PlayerState.Kills += 1 (Replicated)
             ──▶ 5 s ──▶ RestartPlayer(B.Controller)` },
    { h: "Respawn",
      p: "GameMode'da (faqat serverda): eski Pawn'ni [[Destroy Actor]] qiling (yoki ragdoll'ni qoldiring), keyin [[Restart Player]] (Controller) — GameMode'ning o'zi PlayerStart topib, yangi Pawn yaratib, possess qiladi. Maxsus joy kerak bo'lsa: [[Choose Player Start]] ni override qiling.",
      tip: "Spawn nuqtasini tanlashda dushmanlardan uzoq va ko'rinmaydigan PlayerStart'ni tanlang — «spawn kill»ning oldini olish uchun." },
    { h: "Match holati",
      table: [["Joy", "Ma'lumot"],
              ["GameMode", "Qoidalar: KillsToWin = 10, round vaqti, jamoalarga taqsimlash, PostLogin/Logout"],
              ["GameState (replicated)", "MatchState (Waiting, Playing, Ended), RemainingTime, TeamScores, WinnerName"],
              ["PlayerState (replicated)", "PlayerName, Kills, Deaths, TeamID"],
              ["PlayerController", "Mijozga xos UI: scoreboard, o'lim ekrani (Client RPC orqali)"]],
      bp: `// GameMode
[Event OnPostLogin] (New Player) ──▶ TeamID tayinlash ──▶ Players.Add
[Event OnLogout] (Exiting Controller) ──▶ ro'yxatdan olib tashlash
// Har soniya (Timer): GameState.RemainingTime −= 1 (Replicated) ──▶ 0 ? ──▶ EndMatch` },
    { h: "Animatsiyalar tarmoqda",
      ul: ["Harakat animatsiyalari (yurish, sakrash) — avtomatik: CharacterMovement replikatsiya qilinadi, ABP har mashinada tezlikdan hisoblaydi.",
           "Montage (hujum, reload) — Multicast orqali: `Multicast_PlayMontage(Montage)`. Egasi lokal darhol ijro etadi (sezgirlik uchun), boshqalar multicast orqali (Skip Owner).",
           "Aim Offset uchun Pitch — [[Get Base Aim Rotation]] avtomatik replikatsiya qilinadi.",
           "Crouch — CharacterMovement'da tayyor replikatsiya (bIsCrouched)."] },
    { h: "Lag haqida",
      p: "100 ms ping'da mijoz o'q uzganda dushman serverda allaqachon boshqa joyda bo'ladi. Professional o'yinlar **client-side prediction** (mijoz natijani darhol taxminan ko'rsatadi) va **server rewind** (server o'tmishga qaytib tekshiradi) usullarini ishlatadi. Bu ilg'or mavzu — C++ va maxsus tizimlar talab qiladi. Hozircha: hitscan zararini server hisoblaydi, effektni esa otuvchi darhol lokal ko'radi.",
      warn: "Hech qachon mijozning «men tegdim» xabariga to'liq ishonmang — agar shunday qilsangiz, serverda kamida masofa va ko'rinishni tekshiring." },
    { h: "Amaliy topshiriq",
      steps: ["`UE90_MP` da Team Deathmatch: 2 jamoa, 10 o'ldirishgacha yoki 5 daqiqa.",
              "Replicated health, o'lim (ragdoll hammada), 5 s dan keyin respawn.",
              "PlayerState: Kills/Deaths, GameState: jamoa ballari va vaqt.",
              "HUD: o'z sog'lig'i, jamoa ballari, vaqt; Tab — scoreboard; kill feed («A → B», Multicast).",
              "Match tugaganda: Client RPC orqali hammaga natija ekrani, 10 s dan keyin Server Travel bilan qayta boshlash (`ServerTravel` konsol buyrug'i — [[Execute Console Command]] serverda).",
              "3 o'yinchi va Network Emulation bilan sinang."] }
  ],
  check: ["Zarar faqat serverda hisoblanadi", "O'lim va respawn hammada to'g'ri ko'rinadi", "Ball PlayerState va GameState'da", "Montage'lar boshqa o'yinchilarda ham ko'rinadi", "Match boshlanadi va tugaydi"],
  err: [["Respawn'dan keyin HUD eski Pawn'ni ko'rsatadi", "Widget yangi Pawn'ga qayta bog'lanmagan. PlayerController'da OnPossess (yoki Client RPC) orqali HUD'ni yangilang."],
        ["Mijozda boshqa o'yinchining hujum animatsiyasi ko'rinmaydi", "Montage faqat lokal ijro etilgan. Server orqali Multicast qiling."]],
  ch: "Capture the Flag: bayroq Actor'i (replicated), o'yinchiga biriktiriladi (Attach — avtomatik replikatsiya qilinadi), olib kelinganda jamoaga ball, egasi o'lsa bayroq joyida tushib qoladi.",
  quiz: [["Respawn qayerda bajariladi?", ["Mijozda", "Serverdagi GameMode'da", "Widget'da", "GameInstance'da"], 1, "Restart Player — GameMode."],
         ["O'yinchining o'ldirishlar soni qayerda saqlanadi?", ["Character", "PlayerState", "GameMode", "HUD"], 1, "Pawn o'lsa ham saqlanadi va hammaga ko'rinadi."],
         ["Boshqalarga hujum animatsiyasini ko'rsatish:", ["RepNotify int", "Multicast RPC", "Owning Client RPC", "Hech narsa"], 1, "Bir martalik hodisa — Multicast."]]
},
{
  d: 71, t: "Sessiyalar: Create, Find, Join va lobby", time: "3–4 soat",
  g: "O'yinchilar bir-birini topib ulanishi uchun sessiya tizimi: LAN, Steam va lobby menyusi.",
  learn: ["Online Subsystem (Null, Steam, EOS)", "Create Session, Find Sessions, Join Session", "Open Level ?listen", "Lobby level va Seamless Travel", "Steam sozlash asoslari", "Port forwarding va NAT haqida"],
  body: [
    { h: "Online Subsystem",
      table: [["Subsystem", "Vazifasi"],
              ["Null", "Standart — LAN va lokal sinov uchun"],
              ["Steam", "Steam do'stlari, server ro'yxati, NAT o'tish (Steam relay)"],
              ["EOS (Epic Online Services)", "Bepul, platformalararo: lobby, matchmaking, ovozli chat"]],
      p2: "Blueprint'da tayyor node'lar: [[Create Session]], [[Find Sessions]], [[Join Session]], [[Destroy Session]]. Ular faol Online Subsystem bilan ishlaydi. Kengaytirilgan imkoniyatlar (sessiya nomi, sozlamalar) uchun bepul **Advanced Sessions** plagini mashhur." },
    { h: "Host qilish",
      bp: `// WBP_MainMenu → [Host]
[Create Session] (Player Controller ← Get Player Controller,
                  Public Connections ← 4, Use LAN ← bUseLAN)
   On Success ──▶ [Open Level] (L_Lobby, Options ← "listen")
   On Failure ──▶ xato xabari`,
      warn: "`listen` opsiyasisiz level oddiy (tarmoqsiz) ochiladi va hech kim ulana olmaydi." },
    { h: "Topish va qo'shilish",
      bp: `// WBP_ServerBrowser → [Refresh]
[Find Sessions] (Player Controller, Max Results ← 50, Use LAN)
   On Success (Results: Blueprint Session Result array)
      ──▶ For Each ──▶ Create WBP_ServerRow (Result) ──▶ ScrollBox.Add Child
          // Qatorda: [Get Server Name], [Get Current Players]/[Get Max Players], [Get Ping in Ms]

// WBP_ServerRow → [Join]
[Join Session] (Player Controller, Search Result ← Result)
   On Success ──▶ (avtomatik ravishda host'ning leveliga o'tadi)` },
    { h: "Lobby",
      steps: ["`L_Lobby` + `GM_Lobby`: o'yinchilar kutadi, har biri «Tayyor» bosadi.",
              "PlayerState'da `bReady` (Replicated), `PlayerName`. GameState orqali hammaga ro'yxat.",
              "Host «Start» bosadi (faqat hamma tayyor bo'lsa): serverda `ServerTravel L_Arena` (Execute Console Command).",
              "**Seamless Travel** (GameMode'da ✔): level almashganda mijozlar uzilmaydi va PlayerState ma'lumotlari ko'chiriladi ([[Event Copy Properties]] PlayerState'da)."],
      tip: "Seamless Travel PIE'da to'liq ishlamaydi — Standalone yoki packaged build'da sinang." },
    { h: "Steam va internet orqali",
      ul: ["Plugins: **Online Subsystem Steam** ✔. `DefaultEngine.ini` ga Steam sozlamalari qo'shiladi (Steam App ID — sinov uchun 480 «Spacewar»).",
           "Steam ochiq bo'lishi kerak; ikki xil Steam akkauntli kompyuterda sinang.",
           "Steam relay NAT muammolarini hal qiladi — port ochish shart emas.",
           "Null subsystem bilan internet orqali ulanish uchun host IP va port (7777, UDP) ochiq bo'lishi kerak: `open 192.168.1.5` konsol buyrug'i.",
           "EOS — Epic Developer Portal'da bepul ro'yxatdan o'tib, platformalararo multiplayer qilish mumkin."],
      warn: "Steam'ning `DefaultEngine.ini` sozlamalari versiyaga qarab farq qiladi — rasmiy hujjatdagi (Online Subsystem Steam) aniq qatorlarni nusxalang." },
    { h: "Amaliy topshiriq",
      steps: ["Main Menu: Host (LAN ✔/✘), Server ro'yxati (Refresh, Join), ism kiritish.",
              "Lobby: o'yinchilar ro'yxati, Ready, Start (faqat host), jamoa tanlash.",
              "Seamless Travel bilan Kun 70 dagi arenaga o'tish, PlayerName saqlansin.",
              "Match tugaganda lobby'ga qaytish.",
              "Packaged (Development) build olib (Kun 83 ga qarang yoki {{Platforms → Windows → Package Project}}), ikki kompyuterda LAN orqali sinang."] }
  ],
  check: ["Create/Find/Join Session ishlaydi", "listen opsiyasini bilaman", "Server browser ro'yxati bor", "Lobby'da Ready va Start", "Seamless Travel bilan ma'lumot ko'chadi", "LAN orqali ikki kompyuterda sinadim"],
  err: [["Find Sessions hech narsa topmaydi", "Use LAN bir xil emas, firewall o'yinni bloklayapti yoki PIE'da Run Under One Process ✘ bo'lishi kerak."],
        ["Join'dan keyin mijoz Main Menu'ga qaytdi", "Host level `listen` bilan ochilmagan yoki versiyalar mos emas (ikkala build bir xil bo'lishi kerak)."]],
  ch: "Do'stlarni taklif qilish: Steam overlay orqali «Invite to Game» (Advanced Steam Sessions plagini) va taklif qabul qilinganda avtomatik lobby'ga qo'shilish.",
  quiz: [["Host level qaysi opsiya bilan ochiladi?", ["?game", "listen", "server", "host"], 1, "Open Level options: listen."],
         ["LAN sinovi uchun subsystem:", ["Steam", "Null", "EOS", "Xbox"], 1, "Null."],
         ["Level almashganda mijozlarni uzmaslik:", ["Open Level", "Seamless Travel", "Load Stream Level", "Restart"], 1, "Seamless Travel."]]
},
{
  d: 72, t: "LOYIHA: 2–4 o'yinchilik co-op arena", time: "5–6 soat",
  g: "Multiplayer modulini yakunlash: Kun 60 dagi Arena Survival o'yinini co-op multiplayer'ga aylantirish.",
  learn: ["Single-player kodni multiplayer'ga o'tkazish", "Replikatsiya qilinadigan AI", "Umumiy to'lqin holati", "Revive (tiriltirish) mexanikasi", "Tarmoq sinovi metodologiyasi", "Bandwidth tejash"],
  body: [
    { h: "Vazifa",
      p: "Kun 60 dagi «Arena Survival» o'yinini 2–4 o'yinchilik co-op'ga aylantiring: o'yinchilar birga to'lqinlarga qarshi kurashadi, yiqilgan sherikni tiriltira oladi, hammasi yiqilsa — o'yin tugaydi.",
      table: [["Tizim", "Multiplayer o'zgarishi"],
              ["Qurollar", "Server_Fire + Multicast FX, ammo — Owner Only"],
              ["Dushmanlar", "AI faqat serverda (AIController mijozlarda yo'q), Character replikatsiya qilinadi"],
              ["Wave Manager", "GameMode (server), to'lqin raqami/qolgan dushmanlar — GameState"],
              ["Pickup'lar", "Server spawn qiladi, Server RPC bilan olinadi"],
              ["Health", "Replicated, Downed holati"],
              ["UI", "Har o'yinchining o'z HUD'i + sheriklar sog'lig'i paneli"],
              ["Musiqa", "Lokal, GameState holatiga (OnRep) qarab"]] },
    { h: "AI multiplayer'da",
      ul: ["AIController faqat serverda mavjud — BT, Perception, EQS faqat serverda ishlaydi. Bu yaxshi: mijozlar AI hisobiga qatnashmaydi.",
           "Enemy Character Replicates ✔ — harakat avtomatik replikatsiya qilinadi.",
           "Perception: barcha o'yinchilarni ko'rishi kerak (Stimuli Source har Pawn'da).",
           "Nishon tanlash: eng yaqin yoki eng kam sog'liqli o'yinchi (Service bilan).",
           "Dushman hujum montage'i — Multicast."] },
    { h: "Downed va Revive",
      bp: `Health 0 ──▶ (server) Tags + Status.Downed (yoki bIsDowned RepNotify)
   ──▶ OnRep: yotgan animatsiya, harakat sekin, qurol yo'q
   ──▶ BleedOut Timer 30 s ──▶ tugasa ──▶ Dead (spectator)
Sherik E ni 3 s bosib turadi (Hold trigger) ──▶ Server_Revive(Target)
   ──▶ serverda masofa tekshiruvi ──▶ Health = 30, Downed olib tashlanadi
GameMode: barcha o'yinchilar Downed/Dead ──▶ GameOver (Multicast/Client RPC natija ekrani)`,
      tip: "O'lgan o'yinchiga **spectator** rejimi bering: kamerani tirik sherikka [[Set View Target with Blend]] orqali o'tkazing va to'lqin oxirida respawn qiling." },
    { h: "Sinov metodologiyasi",
      steps: ["**Listen server + 2 client**, Network Emulation **Average**.",
              "Har tizim uchun 3 savol: serverda ishlaydimi? Egasi mijozda ishlaydimi? Boshqa mijozda ko'rinadimi?",
              "**Late join**: o'yin o'rtasida ulanish — to'lqin, dushmanlar, ochiq eshiklar to'g'ri ko'rinishi kerak.",
              "**Host chiqib ketishi**: mijozlar Main Menu'ga to'g'ri qaytadimi (Network Error event'i GameInstance'da).",
              "**Net profiling**: konsolda `stat net` — sekundiga yuborilayotgan baytlar."] },
    { h: "Bandwidth tejash",
      ul: ["Kosmetik narsalarni replikatsiya qilmang.",
           "Dushmanlar uchun Net Update Frequency 30 dan oshmasin.",
           "Tez-tez o'zgaradigan float'larni (masalan Stamina) faqat egasiga (Owner Only) yuboring.",
           "Multicast'larni Unreliable qiling, agar ular kosmetik bo'lsa."] }
  ],
  check: ["2–4 o'yinchi co-op ishlaydi", "AI faqat serverda, hammada to'g'ri ko'rinadi", "Downed/Revive va spectator bor", "To'lqin holati GameState orqali", "Late join to'g'ri ishlaydi", "stat net bilan trafik tekshirildi"],
  err: [["Mijozlarda dushmanlar «sakrab» harakatlanadi", "Net Update Frequency juda past yoki Network Smoothing o'chirilgan (CharacterMovement → Network Smoothing Mode = Exponential)."],
        ["Pickup ikki o'yinchiga birdan berildi", "Ikkala Server RPC bir kadrda keldi. Serverda olishdan oldin `bPickedUp` ni tekshiring va darhol true qiling."]],
  ch: "Ovozli ping tizimi: o'rta tugma bilan ko'rsatilgan joyda hammaga ko'rinadigan belgi (dushman — qizil, buyum — sariq) 5 soniya turadi va ovoz chiqaradi.",
  quiz: [["AIController qayerda ishlaydi?", ["Har mijozda", "Faqat serverda", "Faqat host mijozda", "GameInstance'da"], 1, "AI mantiqi — server."],
         ["Tarmoq trafigini ko'rish buyrug'i:", ["stat fps", "stat net", "stat unit", "show net"], 1, "stat net."]]
}
);
