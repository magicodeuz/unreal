// Kurs tuzilmasi: 15 modul × 6 kun = 90 dars.
// Har modulning 6-kuni — shu moduldagi bilimlarni birlashtiruvchi amaliy loyiha.
window.UE_COURSE = {
  title: "Unreal Engine 5 — 90 kunlik to'liq kurs",
  short: "UE5 · 90 kun",
  engine: "Unreal Engine 5.4+",
  modules: [
    { n: 1,  title: "Asoslar va muhit",            color: "#38bdf8", desc: "O'rnatish, Editor interfeysi, Actor/Component, assetlar va birinchi sahna.", project: "Diorama sahna" },
    { n: 2,  title: "Blueprint asoslari",          color: "#a78bfa", desc: "Event Graph, o'zgaruvchilar, oqim boshqaruvi, funksiyalar, massiv va struct.", project: "Tanga yig'ish xonasi" },
    { n: 3,  title: "Blueprint aloqasi va Framework", color: "#f472b6", desc: "Collision, Cast, Interface, Event Dispatcher va Gameplay Framework.", project: "Kalit–eshik–sandiq tizimi" },
    { n: 4,  title: "Player va Input",             color: "#34d399", desc: "Character, Enhanced Input, kamera, sprint/stamina, Timeline va Timer.", project: "To'liq boshqariladigan qahramon" },
    { n: 5,  title: "Gameplay tizimlari",          color: "#fbbf24", desc: "Trace, Damage, Actor Component, Inventory, Data Table va Data Asset.", project: "Interaction + Inventory + Health" },
    { n: 6,  title: "UI — UMG",                    color: "#fb923c", desc: "Widget, HUD, menyular, dinamik ro'yxatlar, UI animatsiya va sozlamalar.", project: "Menu + HUD + Settings" },
    { n: 7,  title: "Animatsiya",                  color: "#f87171", desc: "Skeletal Mesh, Anim Blueprint, State Machine, Blend Space, Montage, IK.", project: "Combo hujumli jangchi" },
    { n: 8,  title: "Sun'iy intellekt (AI)",       color: "#c084fc", desc: "NavMesh, Behavior Tree, Blackboard, Perception, EQS va StateTree.", project: "Patrul qiluvchi dushman" },
    { n: 9,  title: "Grafika: Material, Light, VFX", color: "#22d3ee", desc: "PBR materiallar, Lumen, Nanite, Post Process, Niagara, Landscape, PCG.", project: "Atmosferali level" },
    { n: 10, title: "Audio, Kino, Fizika, Saqlash", color: "#4ade80", desc: "MetaSounds, Sequencer, Chaos fizika, qurollar va Save Game.", project: "Mini shooter" },
    { n: 11, title: "Arxitektura va ilg'or Blueprint", color: "#facc15", desc: "Kutubxonalar, meros, World Partition, Gameplay Tags, debugging.", project: "Qayta ishlatiladigan shablon" },
    { n: 12, title: "Multiplayer",                 color: "#f97316", desc: "Server/Client, Replication, RPC, Authority, Sessions va lobby.", project: "Co-op arena" },
    { n: 13, title: "C++ asoslari",                color: "#60a5fa", desc: "UCLASS/UPROPERTY/UFUNCTION, C++ Actor va Component, BP bilan birga ishlash.", project: "C++ Health Component" },
    { n: 14, title: "Optimizatsiya va Build",      color: "#2dd4bf", desc: "Profiling, LOD, Unreal Insights, Scalability, Windows va Android build.", project: "Optimallashtirilgan build" },
    { n: 15, title: "Capstone — o'z o'yiningiz",   color: "#e879f9", desc: "GDD, prototip, kontent, polish, playtest va relizgacha to'liq sikl.", project: "Shaxsiy o'yin v1.0" }
  ]
};

// Har bir modul fayli (data/lessons/mXX.js) shu massivga darslarni qo'shadi.
window.UE_LESSONS = [];
