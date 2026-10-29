// Modul 8 — Sun'iy intellekt (Kun 43–48)
window.UE_LESSONS.push(
{
  d: 43, t: "AI asoslari: AIController va NavMesh", time: "2–3 soat",
  g: "Dushmanni harakatlantirish uchun navigatsiya tizimi va AIController bilan ishlash.",
  learn: ["AIController va Auto Possess AI", "Nav Mesh Bounds Volume", "Navigatsiyani ko'rish (P tugmasi)", "AI Move To va Simple Move To", "Nav Modifier va Nav Link", "Dinamik NavMesh"],
  body: [
    { h: "AI tuzilishi",
      p: "Unreal'da AI ham o'yinchi kabi tuzilgan: **AIController** (miya) **Pawn/Character**ni (tana) boshqaradi. Dushman Character'i o'yinchinikiga o'xshash bo'lishi mumkin, faqat uni klaviatura emas, AIController boshqaradi.",
      steps: ["`BP_EnemyBase` (Character) yarating, Mesh = Manny/Quinn (boshqa rang material bilan), ABP = ABP_Hero yoki shablondagisi.",
              "`BP_EnemyAIController` (AIController) yarating.",
              "Enemy'ning Class Defaults'ida: {{AI Controller Class}} = BP_EnemyAIController, {{Auto Possess AI}} = **Placed in World or Spawned**.",
              "CharacterMovement: {{Orient Rotation to Movement}} ✔, Use Controller Rotation Yaw ✘ — dushman yurgan tomonga buriladi."],
      warn: "Auto Possess AI standart holatda faqat «Placed in World». Spawn qilingan dushmanlar boshqarilmay qolmasligi uchun «Placed in World or Spawned» ni tanlang." },
    { h: "NavMesh — yuriladigan joylar xaritasi",
      steps: ["{{Place Actors → Volumes → Nav Mesh Bounds Volume}} ni levelga qo'ying va butun o'yin maydonini qamrab oladigan qilib kattalashtiring.",
              "Viewport'da {{P}} tugmasini bosing — yashil maydon yuriladigan joylarni ko'rsatadi.",
              "{{Project Settings → Navigation Mesh}}: Agent Radius (34), Agent Height (144), Agent Max Slope, Agent Max Step Height — dushman o'lchamiga mos bo'lsin.",
              "Statik to'siqlar NavMesh'da avtomatik teshik hosil qiladi."],
      tip: "Harakatlanuvchi to'siqlar (eshik, quti) uchun: {{Project Settings → Navigation Mesh → Runtime Generation}} = **Dynamic** yoki obyektda {{Can Ever Affect Navigation}} bilan Nav Modifier ishlating." },
    { h: "Harakat buyruqlari",
      table: [["Node", "Qachon"],
              ["AI Move To", "Async: On Success / On Fail pinlari bilan. Pawn'dan chaqiriladi"],
              ["Move to Location or Actor", "AIController node'i, Acceptance Radius bilan"],
              ["Simple Move to Location", "Eng oddiy (top-down sichqoncha bilan yurish)"],
              ["Stop Movement", "To'xtatish"],
              ["Get Random Reachable Point in Radius", "NavMesh'da tasodifiy yetib boriladigan nuqta"]],
      graph: {
        t: "BP_EnemyBase · Event Graph",
        n: [
          { id: "b", k: "event", t: "Event BeginPlay", x: 0, y: 0, o: [">"] },
          { id: "w", k: "custom", t: "Wander", sub: "Custom Event", x: 0, y: 2.4, o: [">"], s: 1 },
          { id: "al", k: "pure", t: "Get Actor Location", x: 0, y: 4.4, i: ["obj Target = self"], o: ["vec Return Value"] },
          { id: "rp", k: "func", t: "Get Random Reachable Point in Radius", x: 1, y: 2.4, i: [">", "vec Origin", "float Radius = 1000.0"], o: [">", "vec Random Location", "bool Return Value"], s: 2 },
          { id: "mv", k: "latent", t: "AI Move To", x: 2, y: 2.4, i: [">", "obj Pawn = self", "vec Destination", "obj Target Actor", "float Acceptance Radius = 50.0"], o: [">", "> On Success", "> On Fail"], s: 3 },
          { id: "d1", k: "latent", t: "Delay", x: 3, y: 2.4, i: [">", "float Duration = 2.0"], o: ["> Completed"] },
          { id: "w2", k: "func", t: "Wander", x: 4, y: 2.4, i: [">", "obj Target = self"], o: [">"] }
        ],
        w: ["b.0-w2.0", "w.0-rp.0", "al.0-rp.1", "rp.0-mv.0", "rp.1-mv.2", "mv.1-d1.0", "mv.2-d1.0", "d1.0-w2.0"],
        how: ["`Wander` Custom Event — o'zini qayta chaqiradigan sikl (BeginPlay ham uni chaqiradi).",
              "[[Get Random Reachable Point in Radius]] — NavMesh'da yetib borish mumkin bo'lgan tasodifiy nuqta.",
              "[[AI Move To]] — async: yetib borsa **On Success**, yo'l topmasa **On Fail**. Ikkalasidan keyin ham kutib, qayta Wander."] } },
    { h: "Nav Modifier va Nav Link",
      ul: ["**Nav Modifier Volume:** hududning «narxi»ni o'zgartiradi (Area Class): `NavArea_Null` — umuman yurilmaydi, `NavArea_Obstacle` — qimmat, AI iloji boricha aylanib o'tadi (masalan olov zona).",
           "**Nav Link Proxy:** NavMesh'lar orasini bog'laydi — AI tokchadan sakrab tushishi yoki chuqurlik ustidan sakrab o'tishi uchun.",
           "**Nav Mesh Modifier component:** Actor'ga qo'shib, uning atrofini boshqa Area qilish."] },
    { h: "Amaliy topshiriq",
      steps: ["Sinov leveli: to'siqlar, zinapoya, ikki qavatli platforma.",
              "Nav Mesh Bounds qo'shing, P bilan tekshiring. Agent sozlamalarini moslang.",
              "`BP_EnemyBase` Wander mantiqi bilan 3 ta dushman qo'ying.",
              "Olov zonasiga NavArea_Obstacle — dushmanlar uni aylanib o'tishini kuzating.",
              "Tokchadan pastga Nav Link Proxy — dushman sakrab tushsin.",
              "O'yin paytida harakatlanuvchi quti qo'ying va Runtime Generation = Dynamic bilan NavMesh yangilanishini tekshiring."] }
  ],
  check: ["AIController'ni Pawn'ga ulay olaman", "NavMesh yaratib, P bilan tekshiraman", "AI Move To va uning natija pinlarini ishlataman", "Nav Modifier va Nav Link'ni bilaman"],
  err: [["Dushman joyidan qimirlamaydi", "NavMesh yo'q (P bilan tekshiring), Auto Possess AI noto'g'ri yoki AI Move To On Fail beryapti — Destination NavMesh'dan tashqarida."],
        ["NavMesh ba'zi joylarda yo'q", "Agent Radius/Height juda katta yoki sirt qiyaligi Agent Max Slope'dan oshgan."]],
  ch: "«Kuzatuvchi it»: dushman o'yinchidan 300 sm masofada uni kuzatib yursin (har 0.5 s Timer bilan AI Move To o'yinchiga, Acceptance Radius 300).",
  quiz: [["Yuriladigan joylarni ko'rsatish tugmasi:", ["N", "P", "G", "F"], 1, "P — Show Navigation."],
         ["Spawn qilingan dushman AI bilan boshqarilishi uchun:", ["Auto Possess Player", "Auto Possess AI = Placed in World or Spawned", "Enable Input", "Possess Player"], 1, "Standart faqat Placed in World."],
         ["AI aylanib o'tishi kerak bo'lgan qimmat hudud:", ["Nav Link", "NavArea_Obstacle", "NavArea_Default", "Trigger Box"], 1, "Area Class narxi."]]
},
{
  d: 44, t: "Behavior Tree va Blackboard", time: "3 soat",
  g: "AI qarorlarini daraxt ko'rinishida tashkil qilish: Blackboard'da xotira, Behavior Tree'da mantiq.",
  learn: ["Blackboard: kalitlar", "Behavior Tree: Root, Composite, Task", "Selector va Sequence", "Run Behavior Tree", "Tayyor task'lar: Move To, Wait", "BT ni debug qilish"],
  body: [
    { h: "Ikki asset",
      table: [["Asset", "Vazifasi", "Misol"],
              ["Blackboard (BB_)", "AI xotirasi — kalit-qiymatlar", "TargetActor, PatrolLocation, bCanSeePlayer, LastKnownLocation"],
              ["Behavior Tree (BT_)", "Qaror qabul qilish daraxti", "«Ko'rsa — quv, aks holda patrul qil»"]],
      steps: ["{{Artificial Intelligence → Blackboard}} → `BB_Enemy`. Kalitlar: `TargetActor` (Object, Base Class = Actor), `PatrolLocation` (Vector), `State` (Enum yoki Int).",
              "{{Artificial Intelligence → Behavior Tree}} → `BT_Enemy`, Blackboard Asset = BB_Enemy.",
              "AIController'da: [[Event On Possess]] → [[Run Behavior Tree]] (BT_Enemy)."] },
    { h: "Daraxt qanday ishlaydi",
      p: ["Daraxt yuqoridan pastga, **chapdan o'ngga** baholanadi. Har node natija qaytaradi: **Succeeded**, **Failed** yoki **In Progress**.",
          "Composite node'lar:"],
      table: [["Node", "Mantiqi", "Analog"],
              ["Selector", "Bolalarni chapdan o'ngga sinaydi, **birinchi muvaffaqiyatli**da to'xtaydi", "OR — «buni qil, bo'lmasa buni»"],
              ["Sequence", "Bolalarni ketma-ket bajaradi, **birinchi muvaffaqiyatsiz**da to'xtaydi", "AND — «buni, keyin buni, keyin buni»"],
              ["Simple Parallel", "Asosiy task bilan birga fon task'ini bajaradi", "Yurib turib otish"]],
      bp: `ROOT
└── Selector
    ├── Sequence  "Quvish"     [Decorator: Blackboard TargetActor Is Set]
    │     ├── Move To (TargetActor)
    │     └── Attack (Kun 45)
    └── Sequence  "Patrul"
          ├── FindPatrolPoint (custom task → PatrolLocation)
          ├── Move To (PatrolLocation)
          └── Wait (2 s, random deviation 1)`,
      tip: "Eng muhim xulq daraxtda eng chapda turadi. Selector chapdagini birinchi sinaydi — demak, «hujum/quvish» patruldan chapda bo'lishi kerak." },
    { h: "Tayyor task'lar",
      table: [["Task", "Vazifasi"],
              ["Move To", "Blackboard kalitidagi Actor/Vector'ga borish"],
              ["Wait / Wait Blackboard Time", "Kutish"],
              ["Rotate to Face BB Entry", "Nishonga burilish"],
              ["Play Animation / Play Sound", "Animatsiya/ovoz"],
              ["Run Behavior", "Ichki (sub) daraxt"],
              ["Finish With Result", "Majburiy natija"]] },
    { h: "Debug",
      ul: ["O'yin paytida BT oynasini oching va yuqorida debug nusxani tanlang — faol yo'l sariq rangda yonadi.",
           "Blackboard qiymatlari pastki o'ng panelda real vaqtda ko'rinadi.",
           "**Gameplay Debugger:** o'yin paytida {{'}} (apostrof) tugmasi — AI'ga qarab tursangiz, uning BT holati, Perception va NavMesh yo'li ekranda chiqadi. Raqam tugmalari bilan kategoriyalarni yoqing."] },
    { h: "Amaliy topshiriq",
      steps: ["`BB_Enemy` va `BT_Enemy` yarating, AIController'da ishga tushiring.",
              "Hozircha `TargetActor` ni AIController BeginPlay'da qo'lda o'rnating ([[Set Value as Object]] ← Get Player Character) — ertaga Perception bilan almashtiramiz.",
              "Daraxt: TargetActor bor bo'lsa — unga yugur; yo'q bo'lsa — tasodifiy nuqtalar bo'ylab patrul.",
              "O'yin paytida O tugmasi bilan TargetActor'ni tozalab ([[Clear Value]]) — dushman patrulga qaytishini kuzating.",
              "Gameplay Debugger'ni ishlatib ko'ring."] }
  ],
  check: ["Blackboard va BT farqini bilaman", "Selector va Sequence mantiqini tushuntira olaman", "Run Behavior Tree'ni AIController'da chaqirdim", "BT'ni real vaqtda debug qila olaman"],
  err: [["Daraxt umuman ishlamaydi", "Run Behavior Tree chaqirilmagan yoki AIController Pawn'ni possess qilmagan."],
        ["TargetActor o'chirilsa ham dushman quvishda davom etadi", "Decorator'ning {{Observer Aborts}} sozlamasi None. Uni **Both** yoki **Self** qiling (ertangi dars)."]],
  ch: "Ikki holatli qorovul: kunduzi (GameState'dagi bool) patrul qiladi, tunda esa o'z postida turib atrofga qaraydi (Rotate + Wait). Holat Blackboard kaliti orqali.",
  quiz: [["Birinchi muvaffaqiyatli bolada to'xtaydigan node:", ["Sequence", "Selector", "Parallel", "Task"], 1, "Selector — «yoki»."],
         ["AI xotirasi qayerda?", ["Behavior Tree", "Blackboard", "NavMesh", "AnimBP"], 1, "Blackboard kalitlari."],
         ["Daraxt qaysi yo'nalishda baholanadi?", ["O'ngdan chapga", "Chapdan o'ngga", "Tasodifiy", "Pastdan yuqoriga"], 1, "Chapdagi — ustuvor."]]
},
{
  d: 45, t: "Task, Decorator va Service: o'z AI bloklaringiz", time: "3 soat",
  g: "Behavior Tree uchun o'z Task, Decorator va Service'laringizni yaratish va Observer Aborts bilan reaktiv AI qurish.",
  learn: ["Custom Task (BTT_)", "Finish Execute", "Custom Decorator (BTD_)", "Observer Aborts", "Custom Service (BTS_)", "Blackboard Key Selector"],
  body: [
    { h: "Custom Task",
      p: "{{Blueprint Class → BTTask_BlueprintBase}} → `BTT_Attack`. Override: **Receive Execute AI** (Owner Controller, Controlled Pawn). Oxirida **albatta** [[Finish Execute]] (Success true/false) chaqiring — aks holda daraxt shu task'da qotib qoladi.",
      graph: {
        t: "BTT_FindPatrolPoint · Event Graph",
        n: [
          { id: "ex", k: "event", t: "Event Receive Execute AI", x: 0, y: 0, o: [">", "obj Owner Controller", "obj Controlled Pawn"], s: 1 },
          { id: "al", k: "pure", t: "Get Actor Location", x: 1, y: 3.4, i: ["obj Target"], o: ["vec Return Value"] },
          { id: "rp", k: "func", t: "Get Random Reachable Point in Radius", x: 1, y: 0, i: [">", "vec Origin", "float Radius = 1500.0"], o: [">", "vec Random Location", "bool Return Value"] },
          { id: "pk", k: "var", t: "PatrolKey", x: 2, y: 3.6, o: ["struct"] },
          { id: "sb", k: "func", t: "Set Blackboard Value as Vector", x: 2, y: 0, i: [">", "struct Key", "vec Value"], o: [">"], s: 2 },
          { id: "fe", k: "func", t: "Finish Execute", x: 3, y: 0, i: [">", "bool Success"], o: [">"], s: 3 }
        ],
        w: ["ex.0-rp.0", "ex.2-al.0", "al.0-rp.1", "rp.0-sb.0", "pk.0-sb.1", "rp.1-sb.2", "sb.0-fe.0", "rp.2-fe.1"],
        how: ["Task Blueprint'ida Functions → Override → **Receive Execute AI**.",
              "`PatrolKey` — **Blackboard Key Selector** turidagi o'zgaruvchi (Instance Editable) — BT'da qaysi kalitga yozishni tanlaysiz.",
              "Oxirida **albatta** [[Finish Execute]] — aks holda daraxt shu task'da qotib qoladi."] },
      tip: "**Blackboard Key Selector** o'zgaruvchisi (Instance Editable) bilan task istalgan kalit bilan ishlaydi — BT'da tanlanadi. Kalit nomini task ichiga qattiq yozmang." },
    { h: "Decorator — shart",
      p: "Decorator node ustiga qo'yiladi va u bajarilishi mumkinmi yoki yo'qligini hal qiladi. Tayyorlari: **Blackboard** (kalit o'rnatilganmi / qiymat), **Cooldown**, **Loop**, **Time Limit**, **Is At Location**, **Does Path Exist**.",
      table: [["Observer Aborts", "Ma'nosi"],
              ["None", "Shart faqat kirishda tekshiriladi"],
              ["Self", "Shart false bo'lsa — o'zini (shu tarmoqni) to'xtatadi"],
              ["Lower Priority", "Shart true bo'lsa — o'ngdagi (past ustuvor) tarmoqlarni to'xtatib, shunga o'tadi"],
              ["Both", "Ikkalasi ham"]],
      warn: "Observer Aborts — reaktiv AI'ning kaliti. Dushman patrul qilayotganda o'yinchini ko'rib qolsa, «Quvish» tarmog'idagi Blackboard decorator'i **Lower Priority** (yoki Both) bo'lishi kerak — aks holda dushman patrul nuqtasiga yetib borgunicha o'yinchini e'tiborsiz qoldiradi." },
    { h: "Custom Decorator",
      bp: `// BTD_InRange — nishonga masofa
Variables: TargetKey (Key Selector), MaxDistance = 200
[Perform Condition Check AI] (Owner Controller, Controlled Pawn)
   ──▶ Target = [Get Blackboard Value as Actor] (TargetKey)
   ──▶ Return: [Get Distance To] (Controlled Pawn, Target) <= MaxDistance` },
    { h: "Service — fonda yangilash",
      p: "Service composite node'ga biriktiriladi va shu tarmoq faol ekan, har **Interval** (masalan 0.3 s) da ishlaydi. Masofani yangilash, nishonni tanlash va ammo'ni tekshirish uchun ishlatiladi.",
      bp: `// BTS_UpdateDistance (Interval 0.25)
[Event Receive Tick AI] (Owner Controller, Controlled Pawn, Delta)
   ──▶ Target valid ? ──▶ [Set Blackboard Value as Float] DistanceToTarget
                      ──▶ [Set Blackboard Value as Vector] LastKnownLocation` },
    { h: "Amaliy topshiriq",
      steps: ["`BTT_FindPatrolPoint`, `BTT_Attack`, `BTD_InRange`, `BTS_UpdateDistance` yarating.",
              "Daraxt: Selector → [Quvish: TargetActor Is Set, Aborts Both] → Selector → [Hujum: BTD_InRange 150] → Rotate to Face + BTT_Attack + Wait 0.5 | [aks holda] Move To Target.",
              "Patrul: BTT_FindPatrolPoint → Move To → Wait.",
              "Hujum: dushman Montage'ida Notify orqali Apply Damage (Kun 40 dagi kabi).",
              "Cooldown decorator: hujumlar orasida kamida 1.5 s."] }
  ],
  check: ["Custom Task yaratib, Finish Execute'ni chaqiraman", "Blackboard Key Selector'ni ishlataman", "Observer Aborts turlarini tushuntira olaman", "Service bilan fonda yangilayman", "Dushman yaqinlashib hujum qiladi"],
  err: [["Task'da daraxt qotib qoladi", "Finish Execute chaqirilmagan (masalan, Cast muvaffaqiyatsiz tarmog'ida). Har bir yo'l Finish Execute bilan tugasin."],
        ["Decorator o'zgarishga javob bermaydi", "Observer Aborts = None. Custom decorator uchun esa shart avtomatik qayta tekshirilmaydi — Blackboard decorator'larini afzal ko'ring."]],
  ch: "`BTT_FleeWhenLowHealth`: dushman Health 25% dan kam bo'lsa, o'yinchidan teskari tomonga qochsin (masofa 1200) va 5 s dan keyin qaytib hujum qilsin.",
  quiz: [["Task tugaganini bildiruvchi node:", ["Return Node", "Finish Execute", "End Play", "Stop Logic"], 1, "Majburiy."],
         ["Patruldagi AI o'yinchini ko'rganda darhol quvishga o'tishi uchun:", ["Observer Aborts = Lower Priority/Both", "Wait", "Loop", "Time Limit"], 0, "Past ustuvor tarmoq to'xtatiladi."],
         ["Interval bilan fonda ishlaydigan blok:", ["Task", "Decorator", "Service", "Composite"], 2, "Service."]]
},
{
  d: 46, t: "AI Perception: ko'rish va eshitish", time: "3 soat",
  g: "Dushmanga «sezgi organlari» berish: ko'rish burchagi, eshitish va zarar sezish orqali o'yinchini topish.",
  learn: ["AIPerception component", "Sight config", "Hearing va Report Noise Event", "Damage sense", "Detection by Affiliation", "Stimuli Source va Perception event'lari"],
  body: [
    { h: "AIPerception component",
      steps: ["`BP_EnemyAIController` ga {{+ Add → AIPerception}} qo'shing.",
              "{{Senses Config → +}} → **AI Sight config**: Sight Radius 1500, Lose Sight Radius 1800, Peripheral Vision Half Angle 60°, Max Age 5.",
              "{{Detection by Affiliation}}: Enemies, Neutrals, Friendlies — uchalasini ✔ (Blueprint'da jamoalar (Team) sozlash qiyin, shuning uchun hammasini yoqib, keyin teg bilan filtrlaymiz).",
              "Dominant Sense = Sight."],
      tip: "O'yinchi Character'iga {{AIPerception Stimuli Source}} component qo'shing va Sight'ni ro'yxatdan o'tkazing (Register as Source for Senses). Bu ixtiyoriy, lekin qaysi Actor'lar sezilishini aniq boshqarish imkonini beradi." },
    { h: "Perception event'lari",
      graph: {
        t: "BP_EnemyAIController · Event Graph",
        n: [
          { id: "pu", k: "event", t: "On Target Perception Updated (AIPerception)", x: 0, y: 0, o: [">", "obj Actor", "struct Stimulus"], s: 1 },
          { id: "ht", k: "pure", t: "Actor Has Tag", x: 1, y: 2.6, i: ["obj Target", "name Tag = Player"], o: ["bool Return Value"] },
          { id: "b1", k: "flow", t: "Branch", x: 1, y: 0, i: [">", "bool Condition"], o: ["> True", "> False"] },
          { id: "bs", k: "pure", t: "Break AIStimulus", x: 2, y: 2.8, i: ["struct Stimulus"], o: ["bool Successfully Sensed", "vec Stimulus Location"], s: 2 },
          { id: "b2", k: "flow", t: "Branch", x: 2, y: 0, i: [">", "bool Condition"], o: ["> True", "> False"] },
          { id: "so", k: "func", t: "Set Value as Object", sub: "Blackboard: TargetActor", x: 3, y: 0, i: [">", "name Key Name = TargetActor", "obj Object Value"], o: [">"], s: 3 },
          { id: "cv", k: "func", t: "Clear Value", sub: "Blackboard: TargetActor", x: 3, y: 2.4, i: [">", "name Key Name = TargetActor"], o: [">"] },
          { id: "sv", k: "func", t: "Set Value as Vector", sub: "Blackboard: LastKnownLocation", x: 4, y: 2.4, i: [">", "name Key Name = LastKnownLocation", "vec Vector Value"], o: [">"], s: 4 }
        ],
        w: ["pu.0-b1.0", "pu.1-ht.0", "ht.0-b1.1", "b1.0-b2.0", "pu.2-bs.0", "bs.0-b2.1", "b2.0-so.0", "pu.1-so.2", "b2.1-cv.0", "cv.0-sv.0", "bs.1-sv.2"],
        how: ["AIPerception component tanlangan holda Details → Events → **On Target Perception Updated** +.",
              "Faqat `Player` tegli Actor bilan ishlaymiz.",
              "[[Break AIStimulus]]: **Successfully Sensed** — ko'rdimi (true) yoki ko'zdan yo'qotdimi (false).",
              "Ko'rdi → Blackboard'ga TargetActor. Yo'qotdi → TargetActor tozalanadi va oxirgi ko'rilgan joy yoziladi (Blackboard Set/Clear node'lari `Get Blackboard` orqali chaqiriladi)."] },
      table: [["Event", "Qachon"],
              ["On Target Perception Updated", "Bitta Actor'ning sezilish holati o'zgarganda — eng qulayi"],
              ["On Perception Updated", "Bir nechta Actor ro'yxati bilan"],
              ["On Target Perception Forgotten", "Max Age tugab, unutilganda"]] },
    { h: "Eshitish",
      p: "AI Hearing config qo'shing (Hearing Range 2000). Shovqin manbalari o'zlari xabar beradi: [[Report Noise Event]] (Noise Location, Loudness, Instigator, Max Range). Masalan: o'q otish, yugurish qadami, yiqilgan quti.",
      bp: `// BP_Hero — sprint qadami notify'da yoki otishda
[Report Noise Event] (Noise Location ← Actor Location, Loudness ← 1.0,
                      Instigator ← Self, Max Range ← 1200, Tag ← "Footstep")`,
      warn: "Report Noise Event sezilishi uchun manbada Pawn Noise Emitter yoki Stimuli Source shart emas, lekin Instigator to'g'ri berilishi kerak — aks holda AI shovqin kimdan kelganini bilmaydi." },
    { h: "AI holatlari va Blackboard",
      bp: `BB_Enemy: TargetActor, LastKnownLocation, NoiseLocation, AIState (E_AIState: Patrol, Investigate, Chase, Search)

BT:
Selector
├── [TargetActor Is Set]           → Chase / Attack
├── [AIState == Investigate]       → Move To NoiseLocation → Wait 3 → AIState = Patrol
├── [AIState == Search]            → Move To LastKnownLocation → atrofda 3 ta tasodifiy nuqta → Patrol
└── Patrol`,
      tip: "O'yinchiga dushmanning holatini ko'rsating: dushman boshi ustida «?» (eshitdi) va «!» (ko'rdi) belgilari — Widget Component orqali. Bu stealth o'yinlarda juda muhim." },
    { h: "Amaliy topshiriq",
      steps: ["Sight va Hearing sezgilarini sozlang. O'yinchiga `Player` tegini bering.",
              "Debug: o'yin paytida Gameplay Debugger ({{'}}) → 4 (Perception) — ko'rish konusi ko'rinadi.",
              "Ko'rganda — quvish, ko'zdan yo'qotganda — oxirgi ko'rgan joyga borib qidirish.",
              "Sprint qadamlari va tosh otish (G bilan tosh tashlash, yerga tekkanda Report Noise) — dushman shovqin tomonga borib tekshirsin.",
              "Cho'kkalab yurish shovqin chiqarmasin — stealth!",
              "Boshi ustida ? va ! indikatorlari."] }
  ],
  check: ["Sight va Hearing sozladim", "On Target Perception Updated'da Stimulus'ni tahlil qilaman", "Report Noise Event'ni ishlataman", "Investigate/Search holatlari bor", "Gameplay Debugger'da Perception'ni ko'raman"],
  err: [["AI o'yinchini ko'rmayapti", "Detection by Affiliation'da Neutrals ✔ yo'q (Blueprint Actor'lar standartda Neutral), yoki ko'rish chizig'ini to'sib turgan obyekt bor."],
        ["AI devor orqasidan ko'rib turibdi", "Devor mesh'i Visibility kanalini Block qilishi kerak."]],
  ch: "Qorovul kamerasi: harakatsiz `BP_SecurityCam` faqat AIPerception (Sight) bilan. O'yinchini 2 s ko'rib tursa, yaqin atrofdagi barcha dushmanlarga «signal» bersin (ularning Blackboard'iga LastKnownLocation yoziladi).",
  quiz: [["Shovqin chiqarish node'i:", ["Play Sound", "Report Noise Event", "Make Noise Event", "AI Hearing"], 1, "Report Noise Event."],
         ["Blueprint Actor'lar standartda qaysi affiliation'da?", ["Enemies", "Friendlies", "Neutrals", "None"], 2, "Shuning uchun Neutrals ✔."],
         ["AI ko'rish konusini o'yinda ko'rish:", ["P tugmasi", "Gameplay Debugger", "Show Collision", "Wireframe"], 1, "Apostrof tugmasi."]]
},
{
  d: 47, t: "EQS va StateTree", time: "3 soat",
  g: "AI uchun aqlli joy tanlash (EQS) va UE5 ning yangi holat mashinasi — StateTree bilan tanishish.",
  learn: ["Environment Query System (EQS)", "Generator, Context, Test", "Run EQS Query", "EQS Testing Pawn", "StateTree asoslari", "BT va StateTree'ni qachon tanlash"],
  body: [
    { h: "EQS — «eng yaxshi joy qayerda?»",
      p: ["Dushman o'q yeganda qayerga yashirinishi kerak? Snayper qayerdan otishi kerak? Qaysi qurol eng yaqin? **EQS** atrofdagi ko'plab nuqtalarni yaratadi, ularni testlardan o'tkazadi va eng yaxshi ball olganini tanlaydi.",
          "Yaratish: {{Artificial Intelligence → Environment Query}} → `EQ_FindCover`."],
      table: [["Qism", "Vazifasi", "Misol"],
              ["Generator", "Nomzod nuqtalarni yaratadi", "Points: Grid (atrofda 1500 sm, oralig'i 150)"],
              ["Context", "Nimaga nisbatan", "Querier (AI o'zi), Player (custom context)"],
              ["Test", "Har nuqtani baholaydi yoki filtrlaydi", "Trace (o'yinchidan ko'rinmasin), Distance (menga yaqin), Pathfinding (yetib borish mumkin)"]] },
    { h: "Yashirinish joyi so'rovi",
      bp: `EQ_FindCover
Generator: Points: Grid (GridHalfSize 1500, Spacing 150, Around Querier)
Tests:
  1. Trace  (Context ← EQC_Player, Bool Match ← false)   → Filter: o'yinchidan ko'rinmaydigan
  2. Distance (to Querier)  → Score: yaqinroq yaxshi (Inverse Linear)
  3. Distance (to EQC_Player) → Filter: min 600   // juda yaqin emas
  4. PathExist (from Querier) → Filter

// Custom Context: EQC_Player (EnvQueryContext_BlueprintBase)
[Provide Single Actor] ──▶ Return [Get Player Character]

// BT ichida: Run EQS Query (EQ_FindCover → Blackboard CoverLocation) ──▶ Move To CoverLocation`,
      tip: "**EQS Testing Pawn**: levelga `EQSTestingPawn` qo'yib, Details'da Query'ni tanlang — Editor'da barcha nuqtalar va ularning ballari rangli sharlar bilan ko'rinadi. Debug uchun ajoyib vosita." },
    { h: "StateTree — yangi avlod",
      p: ["**StateTree** — UE 5.1+ dagi umumiy holat mashinasi: Behavior Tree'ning tanlash mantiqi va State Machine'ning aniq holatlarini birlashtiradi. U AI va boshqa ko'plab tizimlar (Smart Objects, Mass AI) uchun ishlatiladi.",
          "Yoqish: {{Plugins → StateTree}} va {{GameplayStateTree}} ✔. AIController'ga {{StateTreeAI}} component qo'shiladi."],
      bp: `ST_Enemy
Root
├── Patrol      [Enter condition: —]
│     Tasks: FindPatrolPoint, MoveTo
│     Transition: On Event "PlayerSpotted" → Chase
├── Chase
│     Tasks: MoveTo(Target)
│     Transitions: Distance < 150 → Attack;  Target lost → Search
├── Attack     Tasks: PlayMontage → On Completed → Chase
└── Search     Tasks: MoveTo(LastKnown), Wait 3 → Patrol`,
      table: [["", "Behavior Tree", "StateTree"],
              ["Fikrlash usuli", "Ustuvorlik daraxti, har safar qayta baholash", "Aniq holatlar va o'tishlar"],
              ["Ma'lumot", "Blackboard", "Parametrlar va binding'lar"],
              ["Kuchli tomoni", "Ko'p sonli shartli reaktiv xulq", "Tushunarli holatlar, unumdorlik, Mass bilan ishlash"],
              ["Hozirgi holat", "Barqaror, ko'p resurs", "Epic faol rivojlantiryapti"]] },
    { h: "Amaliy topshiriq",
      steps: ["`EQ_FindCover` va `EQC_Player` yarating, EQS Testing Pawn bilan sinang.",
              "BT'ga qo'shing: dushman zarar olganda (Damage sense yoki AnyDamage → BB bHurt) 3 s yashirinsin, keyin qaytib hujum qilsin.",
              "`EQ_FindFlankPosition`: o'yinchining yon tomonidagi (Dot test) va ko'rinadigan nuqta.",
              "StateTree pluginini yoqib, oddiy 3 holatli (Patrol/Chase/Attack) ikkinchi dushman turini StateTree bilan yasang.",
              "Ikkala yondashuvni solishtirib, o'zingizga qulayini yozib qo'ying."] }
  ],
  check: ["EQS Generator/Context/Test tuzilishini bilaman", "Custom Context yaratdim", "EQS Testing Pawn bilan debug qildim", "StateTree bilan oddiy AI yasadim", "BT va StateTree farqini bilaman"],
  err: [["EQS hech qanday nuqta qaytarmaydi", "Filtrlar juda qattiq yoki Grid NavMesh'dan tashqarida. Testing Pawn bilan har testni alohida yoqib-o'chirib tekshiring."],
        ["StateTree task'lari ko'rinmaydi", "GameplayStateTree plagini yoqilmagan yoki Schema = StateTree AI Component Schema emas."]],
  ch: "Snayper dushman: EQS bilan o'yinchini ko'radigan, lekin undan 2000+ sm uzoqdagi va balandroq nuqtani topsin, u yerga chiqib o'q uzsin; o'yinchi 800 sm ga yaqinlashsa — boshqa pozitsiyaga ko'chsin.",
  quiz: [["EQS'da nomzod nuqtalarni nima yaratadi?", ["Test", "Generator", "Context", "Decorator"], 1, "Generator."],
         ["EQS natijalarini Editor'da ko'rish:", ["Gameplay Debugger", "EQS Testing Pawn", "Output Log", "Profiler"], 1, "Testing Pawn."],
         ["UE5 ning aniq holat va o'tishlarga asoslangan AI tizimi:", ["Behavior Tree", "StateTree", "Blackboard", "NavMesh"], 1, "StateTree."]]
},
{
  d: 48, t: "LOYIHA: Patrul, quvish va hujum qiluvchi dushmanlar", time: "4–5 soat",
  g: "AI modulini yakunlash: stealth va jang elementlari bo'lgan kichik level, bir necha turdagi dushmanlar bilan.",
  learn: ["Dushman arxitekturasi (base + child)", "Patrul yo'llari (Spline)", "To'liq BT", "Guruh xulqi (signal berish)", "Spawner va to'lqinlar", "AI balansi"],
  body: [
    { h: "Talablar",
      table: [["Dushman", "Xulqi"],
              ["BP_Enemy_Guard", "Spline bo'ylab patrul, ko'rish+eshitish, quvish, yaqin jang"],
              ["BP_Enemy_Archer", "EQS bilan pozitsiya, masofadan otish (projectile), yaqinlashsa qochish"],
              ["BP_Enemy_Brute", "Sekin, ko'p HP, kuchli hujum oldidan 1 s «tayyorlanish» (o'yinchiga signal)"],
              ["BP_EnemySpawner", "Signal bo'lganda to'lqin bilan dushman chiqaradi"]],
      tip: "Barcha dushmanlar `BP_EnemyBase` dan meros oladi: BPC_Health, AIController, ABP, umumiy funksiyalar. Child'larda faqat farqlar: mesh, tezlik, BT, hujum montage'i." },
    { h: "Spline bo'ylab patrul",
      bp: `BP_PatrolRoute (Actor + Spline Component) — levelda chiziladi
BP_Enemy_Guard: PatrolRoute (Instance Editable, Eyedropper bilan), PatrolIndex

BTT_GetNextPatrolPoint:
   Point = PatrolRoute.Spline.[Get Location at Spline Point] (PatrolIndex, World)
   PatrolIndex = (PatrolIndex + 1) % [Get Number of Spline Points]
   Set BB PatrolLocation = Point ──▶ Finish Execute (true)`,
      p2: "Spline nuqtalarini levelda Alt bilan surib qo'shasiz. Bitta route'ni bir nechta qorovul ishlatishi mumkin." },
    { h: "Guruh xulqi",
      ul: ["Dushman o'yinchini ko'rganda — `AlertRadius` (1500) ichidagi boshqa dushmanlarga xabar beradi: [[Sphere Overlap Actors]] (Class BP_EnemyBase) → ularning AIController'iga `ReceiveAlert(Location)` (interface yoki funksiya).",
           "Xabar olgan dushman Investigate holatiga o'tadi va o'sha joyga boradi.",
           "Bir vaqtda faqat 2 ta dushman hujum qilsin (qolganlari atrofida aylanadi) — buni GameMode'dagi «hujum tokenlari» bilan qilish mumkin: hujumdan oldin token so'raladi, tugagach qaytariladi."] },
    { h: "Level",
      steps: ["**1-zona — Stealth:** 3 ta qorovul spline'larda, soyalar, tosh otib chalg'itish. Maqsad: ko'rinmasdan kalitni olish.",
              "**2-zona — Arena:** kalit olingach eshik yopiladi va spawner 3 to'lqin chiqaradi (Guard ×3, keyin Archer ×2 + Guard ×2, keyin Brute).",
              "**3-zona — Chiqish:** hamma dushman o'lgach eshik ochiladi.",
              "HUD'da to'lqin raqami va qolgan dushmanlar soni."] },
    { h: "Balans",
      ul: ["O'yinchi dushman nima qilmoqchi ekanini oldindan sezishi kerak (telegraphing): hujumdan oldin animatsiya, ovoz, belgi.",
           "Dushmanlar «adolatli» bo'lsin: orqadan ko'rmasin, xabar berishdan oldin qisqa reaksiya vaqti (0.3–0.5 s) bo'lsin.",
           "Tezlik: dushman o'yinchining sprintidan biroz sekin — qochish imkoni bo'lsin.",
           "Do'stingizga o'ynatib, qayerda o'lganini yozib boring."] }
  ],
  check: ["3 xil dushman base klassdan meros olgan", "Spline patrul ishlaydi", "Ko'rish/eshitish/qidirish xulqlari bor", "Dushmanlar bir-biriga signal beradi", "To'lqinli spawner ishlaydi", "Kamida bitta playtest o'tkazildi"],
  err: [["Spawn qilingan dushmanlar turib qoladi", "Auto Possess AI = Placed in World or Spawned emas, yoki spawn nuqtasi NavMesh'dan tashqarida."],
        ["Barcha dushmanlar bir nuqtaga to'planib qoladi", "Move To'da Acceptance Radius kichik va hammasi bir xil maqsadga boradi. Crowd avoidance: CharacterMovement'da {{Use RVO Avoidance}} ✔ yoki DetourCrowdAIController."]],
  ch: "Boss: 3 fazali dushman (HP 66% va 33% da xulqi o'zgaradi), har fazada yangi hujum turi. Fazani Blackboard kaliti bilan boshqaring va har fazada BT'ning alohida sub-tree'si ishlasin (Run Behavior Dynamic).",
  quiz: [["Dushmanlarning bir-biriga yopishib qolmasligi uchun:", ["Use RVO Avoidance", "Orient Rotation", "Gravity Scale", "Can Crouch"], 0, "RVO yoki Detour Crowd."],
         ["Barcha dushman turlari uchun umumiy mantiq qayerda?", ["Har child'da nusxalab", "BP_EnemyBase'da", "Level Blueprint'da", "GameState'da"], 1, "Meros — umumiy kod bir joyda."]]
}
);
