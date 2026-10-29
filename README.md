# Unreal Engine 5 — 90 kunlik to'liq kurs

O'zbek tilidagi bosqichma-bosqich kurs: Editor va Blueprint asoslaridan C++, multiplayer, optimizatsiya va o'z o'yiningizni relizgacha chiqarishgacha. 15 modul × 6 kun; har modulning 6-kuni — amaliy loyiha.

## Ishga tushirish

Build talab qilinmaydi. `index.html` ni brauzerda oching (to'g'ridan-to'g'ri fayl sifatida ham ishlaydi). Progress, checklist va test javoblari brauzerning `localStorage` ida saqlanadi.

## Tuzilma

```
index.html              Bosh sahifa: o'quv yo'li, 15 modul, progress, qidiruv
lesson.html?day=N       Bitta umumiy dars shabloni (1–90)
assets/css/style.css    Barcha uslublar (qorong'i/yorug' mavzu)
assets/js/app.js        Dvigatel: render, progress, test, navigatsiya
assets/js/bpgraph.js    Blueprint grafiklarini Unreal Editor uslubida chizish
data/curriculum.js      Modullar ro'yxati (nom, rang, tavsif, loyiha)
data/lessons/mXX.js     Har modulning 6 ta darsi
archive/                Eski versiya (faqat ma'lumot uchun)
```

## Dars formati (`data/lessons/mXX.js`)

```js
{
  d: 7, t: "Sarlavha", time: "2 soat", g: "Maqsad",
  learn: ["Bugun o'rganasiz ..."],
  body: [ { h: "Bo'lim", p: [...], ul: [...], table: [[...]], steps: [...],
            bp: `Blueprint sxema`, code: `C++`, lang: "C++", p2: "...", tip: "...", warn: "..." } ],
  check: ["O'zini tekshirish"],
  err: [["Muammo", "Yechim"]],
  ch: "Challenge",
  quiz: [["Savol", ["A", "B", "C"], 1, "Izoh"]]   // 1 — to'g'ri javob indeksi
}
```

Matn ichidagi belgilar: `` `kod` ``, `**qalin**`, `[[Blueprint node]]`, `{{UI element}}`. `bp` — matnli sxema (papka, arxitektura, psevdokod); unda `[Node]` ajratib ko'rsatiladi, `// izoh` xira chiqadi. `fig: "bp-editor"` — Blueprint Editor anatomiyasi rasmi.

## Blueprint grafiklari (`graph`)

Haqiqiy Blueprint grafiklari `graph` maydonida yoziladi (bitta obyekt yoki massiv) va Editor uslubida chiziladi: rangli sarlavhalar, tur bo'yicha rangli pinlar, egri simlar, comment bloklari va qadam raqamlari.

```js
graph: {
  t: "BP_Door · Event Graph",
  n: [
    { id: "b", k: "event", t: "Event BeginPlay", x: 0, y: 0, o: [">"], s: 1 },
    { id: "p", k: "func",  t: "Print String",   x: 1, y: 0, i: [">", "str In String = Salom"], o: [">"], s: 2 }
  ],
  w: ["b.0-p.0"],                       // <node>.<chiqish>-<node>.<kirish>
  cm: [{ t: "Izoh", n: ["b", "p"], c: "#3d6fb0" }],
  how: ["1-qadam ...", "2-qadam ..."]    // node'dagi s: raqamiga mos
}
```

Node turlari (`k`): `event`, `input`, `custom`, `func`, `latent`, `pure`, `flow`, `macro`, `cast`, `msg`, `set`, `var`, `op`, `entry`, `ret`. Pin turlari: `>` (exec), `bool`, `int`, `float`, `str`, `name`, `text`, `vec`, `rot`, `tr`, `obj`, `class`, `struct`, `enum`, `evt`, `soft`, `any`; massiv uchun oxiriga `[]`. To'liq tavsif — `assets/js/bpgraph.js` boshida.

## NeoCoder'dagi nusxa

Kurs NeoCoder saytida (`typing_games/unreal/`) ham ishlaydi: sayt header'i, Darslar sahifasi, Profil va Supabase sinxronlash (`ue90_progress_v1` kaliti) bilan. U yerdagi `index.html`/`lesson.html` qobiqlari va `assets/css/neo.css` NeoCoder'ga xos; qolgan fayllar (`app.js`, `bpgraph.js`, `style.css`, `data/`) shu loyihadan nusxalanadi — o'zgartirishni shu yerda qilib, keyin ko'chiring.

## Modullar

1. Asoslar va muhit · 2. Blueprint asoslari · 3. Blueprint aloqasi va Framework · 4. Player va Input · 5. Gameplay tizimlari · 6. UI (UMG) · 7. Animatsiya · 8. AI · 9. Grafika · 10. Audio, Kino, Fizika, Saqlash · 11. Arxitektura · 12. Multiplayer · 13. C++ · 14. Optimizatsiya va Build · 15. Capstone
