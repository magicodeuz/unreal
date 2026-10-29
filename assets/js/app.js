// Umumiy dvigatel: progress saqlash, matn formatlash, bosh sahifa va dars sahifasini chizish.
// Ma'lumotlar: window.UE_COURSE (data/curriculum.js) va window.UE_LESSONS (data/lessons/mXX.js).
(function () {
  'use strict';

  const TOTAL = 90;
  const PER_MODULE = 6;
  const KEY = 'ue90_progress_v1';

  // ---------- Saqlash (localStorage bo'lmasa — xotirada) ----------
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  const state = Object.assign({ done: {}, checks: {}, quiz: {} }, load());
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  // ---------- Yordamchilar ----------
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Inline belgilash: `kod`, **qalin**, [[Node nomi]], {{UI element}}
  function fmt(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[\[([^\]]+)\]\]/g, '<span class="node">$1</span>')
      .replace(/\{\{([^}]+)\}\}/g, '<span class="ui">$1</span>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }
  // Blueprint oqimi: [Node] ajratiladi, // izoh xira
  function fmtBp(s) {
    return esc(s)
      .replace(/(\/\/[^\n]*)/g, '<span class="cm">$1</span>')
      .replace(/\[([^\]\n]+)\]/g, '<span class="bpn">[$1]</span>');
  }

  const lessons = () => window.UE_LESSONS.slice().sort((a, b) => a.d - b.d);
  const lessonByDay = d => window.UE_LESSONS.find(l => l.d === d);
  const moduleOf = d => window.UE_COURSE.modules[Math.ceil(d / PER_MODULE) - 1];
  const daysOf = m => Array.from({ length: PER_MODULE }, (_, i) => (m.n - 1) * PER_MODULE + i + 1);
  const doneCount = () => Object.keys(state.done).filter(k => state.done[k]).length;
  const pad = n => String(n).padStart(2, '0');
  const lessonUrl = d => `lesson.html?day=${d}`;

  // ---------- Mavzu (theme) ----------
  function initTheme() {
    try { const t = localStorage.getItem('ue90_theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) {}
    const btn = $('#theme-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const cur = document.documentElement.dataset.theme ||
        (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      const next = cur === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('ue90_theme', next); } catch (e) {}
    });
  }

  function updateTopProgress() {
    const n = doneCount();
    const bar = $('#top-pbar');
    if (bar) bar.style.width = (n / TOTAL * 100) + '%';
    const t = $('#top-ptext');
    if (t) t.textContent = `${n} / ${TOTAL} kun`;
  }

  // ================= BOSH SAHIFA =================
  function renderHome() {
    const n = doneCount();
    const pct = Math.round(n / TOTAL * 100);
    const C = 2 * Math.PI * 50;
    $('#ring-fg').style.strokeDasharray = C;
    $('#ring-fg').style.strokeDashoffset = C * (1 - n / TOTAL);
    $('#ring-text').textContent = pct + '%';
    $('#st-done').textContent = n;
    $('#st-left').textContent = TOTAL - n;
    const modsDone = window.UE_COURSE.modules.filter(m => daysOf(m).every(d => state.done[d])).length;
    $('#st-mods').textContent = `${modsDone} / 15`;
    const next = Array.from({ length: TOTAL }, (_, i) => i + 1).find(d => !state.done[d]) || TOTAL;
    $('#st-next').textContent = 'Kun ' + next;
    const cont = $('#continue-btn');
    cont.href = lessonUrl(next);
    cont.lastChild.textContent = n ? ` Davom etish — Kun ${next}` : ' Kursni boshlash';

    $('#path').innerHTML = window.UE_COURSE.modules.map(m =>
      `<a class="path-step" href="#mod-${m.n}" style="--mc:${m.color}"><b style="color:${m.color}">Modul ${m.n}</b>${esc(m.title)}</a>`
    ).join('');

    $('#modules').innerHTML = window.UE_COURSE.modules.map(m => {
      const days = daysOf(m);
      const d = days.filter(x => state.done[x]).length;
      const items = days.map(day => {
        const l = lessonByDay(day);
        const isProj = day % PER_MODULE === 0;
        const title = l ? l.t : 'Tayyorlanmoqda';
        return `<li data-q="${esc((title + ' ' + (l ? (l.learn || []).join(' ') : '')).toLowerCase())}">
          <a href="${lessonUrl(day)}" class="${state.done[day] ? 'done' : ''}">
            <span class="chk">${state.done[day] ? '✓' : ''}</span>
            <span class="dn">${pad(day)}</span>
            <span class="${isProj ? 'proj' : ''}">${esc(title)}</span>
            ${isProj ? '<span class="tag">Loyiha</span>' : ''}
          </a></li>`;
      }).join('');
      return `<article class="module" id="mod-${m.n}" style="--mc:${m.color}">
        <div class="module-head">
          <div><div class="module-num">Modul ${m.n} · Kun ${days[0]}–${days[5]}</div><h3>${esc(m.title)}</h3></div>
          <div class="module-pct">${d}/6</div>
        </div>
        <p>${esc(m.desc)}</p>
        <ul class="lesson-list">${items}</ul>
      </article>`;
    }).join('');

    $('#search').addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('.module').forEach(mod => {
        let any = false;
        mod.querySelectorAll('li').forEach(li => {
          const hit = !q || li.dataset.q.includes(q);
          li.classList.toggle('hidden', !hit);
          any = any || hit;
        });
        mod.classList.toggle('hidden', !any);
      });
    });

    $('#reset-btn').addEventListener('click', () => {
      if (!confirm("Barcha progress o'chiriladi. Davom etasizmi?")) return;
      state.done = {}; state.checks = {}; state.quiz = {};
      save(); location.reload();
    });
  }

  window.UE90fmt = fmt;

  // ================= DARS SAHIFASI =================
  const FIGS = {
    'bp-editor': () => `<div class="fig-editor">
      <div class="fe-menu"><h5><span class="n">1</span>Menyu</h5><p>File, Edit, Asset, View, Debug, Window — Blueprint oynasining umumiy menyusi.</p></div>
      <div class="fe-tool"><h5><span class="n">2</span>Toolbar: Compile · Save · Browse · Find · Class Settings · Class Defaults · Simulate · Play</h5><p>Compile — eng ko'p bosiladigan tugma: yashil ✔ bo'lishi shart.</p></div>
      <div><h5><span class="n">3</span>Components</h5><p>Actor ichidagi qismlar daraxti: DefaultSceneRoot, Mesh, Light, Collision... + Add bilan qo'shiladi.</p></div>
      <div class="fe-graph"><h5><span class="n">5</span>Viewport / Construction Script / Event Graph tablari</h5><p>Markaziy maydon. Event Graph'da node'lar joylanadi va simlar bilan ulanadi. O'ng tugma — node qidirish, g'ildirak — zoom, o'ng tugmani bosib surish — siljitish.</p></div>
      <div class="fe-det"><h5><span class="n">6</span>Details</h5><p>Tanlangan component, o'zgaruvchi, funksiya yoki node'ning sozlamalari: turi, standart qiymati, Instance Editable, Category...</p></div>
      <div><h5><span class="n">4</span>My Blueprint</h5><p>Graphs, Functions, Macros, Variables, Event Dispatchers ro'yxati. Har biri yonidagi + bilan yaratiladi; grafga sudrab tashlanadi.</p></div>
    </div>`
  };
  let pendingGraphs = [];

  function renderSection(s, i) {
    let h = `<section class="sec" id="s${i}"><h2><span class="no">${pad(i + 1)}</span>${fmt(s.h)}</h2>`;
    const ps = s.p == null ? [] : (Array.isArray(s.p) ? s.p : [s.p]);
    ps.forEach(p => { h += `<p>${fmt(p)}</p>`; });
    if (s.ul) h += '<ul>' + s.ul.map(x => `<li>${fmt(x)}</li>`).join('') + '</ul>';
    if (s.table) {
      const [head, ...rows] = s.table;
      h += '<div class="table-wrap"><table><thead><tr>' + head.map(c => `<th>${fmt(c)}</th>`).join('') +
        '</tr></thead><tbody>' + rows.map(r => '<tr>' + r.map(c => `<td>${fmt(c)}</td>`).join('') + '</tr>').join('') +
        '</tbody></table></div>';
    }
    if (s.steps) h += '<ol class="steps">' + s.steps.map(x => `<li>${fmt(x)}</li>`).join('') + '</ol>';
    if (s.fig && FIGS[s.fig]) h += FIGS[s.fig]();
    if (s.graph) (Array.isArray(s.graph) ? s.graph : [s.graph]).forEach(g => {
      pendingGraphs.push(g);
      h += `<div class="bpg" data-g="${pendingGraphs.length - 1}"></div>`;
    });
    if (s.bp) h += `<div class="bp"><div class="bp-head"><span>${esc(s.bpt || (/──▶|→/.test(s.bp) ? 'Mantiq (psevdokod)' : 'Sxema'))}</span><button data-copy>Nusxa</button></div><pre>${fmtBp(s.bp)}</pre></div>`;
    if (s.code) h += `<div class="bp"><div class="bp-head"><span>${esc(s.lang || 'C++')}</span><button data-copy>Nusxa</button></div><pre>${esc(s.code)}</pre></div>`;
    if (s.p2) (Array.isArray(s.p2) ? s.p2 : [s.p2]).forEach(p => { h += `<p>${fmt(p)}</p>`; });
    if (s.tip) h += `<div class="callout tip"><div class="ic">💡</div><div><b>Maslahat</b>${fmt(s.tip)}</div></div>`;
    if (s.warn) h += `<div class="callout warn"><div class="ic">⚠️</div><div><b>Diqqat</b>${fmt(s.warn)}</div></div>`;
    return h + '</section>';
  }

  function renderSidebar(day) {
    const cur = moduleOf(day);
    $('#sidebar').innerHTML = window.UE_COURSE.modules.map(m => {
      const days = daysOf(m);
      const d = days.filter(x => state.done[x]).length;
      return `<div class="side-mod ${m.n === cur.n ? 'open' : ''}" style="--mc:${m.color}">
        <button type="button"><i></i>${m.n}. ${esc(m.title)}<span class="c">${d}/6</span></button>
        <ul>${days.map(x => {
          const l = lessonByDay(x);
          return `<li><a href="${lessonUrl(x)}" class="${x === day ? 'cur' : ''} ${state.done[x] ? 'done' : ''}"><span class="dn">${pad(x)}</span>${esc(l ? l.t : 'Tayyorlanmoqda')}</a></li>`;
        }).join('')}</ul></div>`;
    }).join('');
    document.querySelectorAll('.side-mod > button').forEach(b =>
      b.addEventListener('click', () => b.parentElement.classList.toggle('open')));
    // Faqat sidebar'ni aylantiramiz — scrollIntoView butun sahifani ham surib yuboradi
    const sb = $('#sidebar');
    const curLink = $('.side-mod a.cur');
    if (curLink) sb.scrollTop = curLink.offsetTop - sb.clientHeight / 2;
  }

  function renderLesson() {
    const day = Math.min(TOTAL, Math.max(1, parseInt(new URLSearchParams(location.search).get('day'), 10) || 1));
    const m = moduleOf(day);
    const l = lessonByDay(day);
    document.documentElement.style.setProperty('--mc', m.color);
    renderSidebar(day);

    const main = $('#content');
    if (!l) {
      main.innerHTML = `<div class="empty"><h2>Kun ${day}</h2><p>Bu dars hali tayyorlanmoqda.</p><a class="btn" href="index.html">Bosh sahifa</a></div>`;
      return;
    }
    document.title = `Kun ${day}: ${l.t} — ${document.body.dataset.brand || 'UE5 90 kun'}`;
    const isProj = day % PER_MODULE === 0;
    const body = l.body || [];

    let h = `<div class="crumbs"><a href="index.html">Bosh sahifa</a> / <a href="index.html#mod-${m.n}">Modul ${m.n}</a> / <span>Kun ${day}</span></div>
      <header class="lesson-head">
        <h1>${fmt(l.t)}</h1>
        <p class="goal">${fmt(l.g)}</p>
        <div class="meta">
          <span class="pill">Modul ${m.n} · ${esc(m.title)}</span>
          <span>Kun ${day} / ${TOTAL}</span>
          <span>⏱ ${esc(l.time || '2–3 soat')}</span>
          ${isProj ? '<span>🏗 Modul loyihasi</span>' : ''}
        </div>
        ${l.learn ? `<div class="learn-box"><h3>Bugun o'rganasiz</h3><ul>${l.learn.map(x => `<li>${fmt(x)}</li>`).join('')}</ul></div>` : ''}
      </header>`;

    h += body.map(renderSection).join('');
    let idx = body.length;
    const toc = body.map((s, i) => ({ id: 's' + i, h: s.h }));

    if (l.check) {
      const saved = state.checks[day] || [];
      h += `<section class="sec" id="s-check"><h2><span class="no">${pad(++idx)}</span>O'zingizni tekshiring</h2>
        <ul class="checklist">${l.check.map((c, i) =>
          `<li><label><input type="checkbox" data-ci="${i}" ${saved[i] ? 'checked' : ''}><span>${fmt(c)}</span></label></li>`).join('')}</ul></section>`;
      toc.push({ id: 's-check', h: "O'zingizni tekshiring" });
    }
    if (l.err) {
      h += `<section class="sec" id="s-err"><h2><span class="no">${pad(++idx)}</span>Ko'p uchraydigan xatolar</h2>
        ${l.err.map(([p, f]) => `<details class="err"><summary>${fmt(p)}</summary><div>${fmt(f)}</div></details>`).join('')}</section>`;
      toc.push({ id: 's-err', h: "Ko'p uchraydigan xatolar" });
    }
    if (l.ch) {
      h += `<section class="sec" id="s-ch"><h2><span class="no">${pad(++idx)}</span>Challenge</h2><div class="challenge">${fmt(l.ch)}</div></section>`;
      toc.push({ id: 's-ch', h: 'Challenge' });
    }
    if (l.quiz) {
      h += `<section class="sec" id="s-quiz"><h2><span class="no">${pad(++idx)}</span>Mini test</h2>
        ${l.quiz.map(([q, opts], qi) => `<div class="quiz-q" data-qi="${qi}"><h4>${qi + 1}. ${fmt(q)}</h4>
          <div class="quiz-opts">${opts.map((o, oi) => `<button type="button" data-oi="${oi}">${fmt(o)}</button>`).join('')}</div>
          <div class="quiz-ex hidden"></div></div>`).join('')}
        <div class="quiz-score" id="quiz-score"></div></section>`;
      toc.push({ id: 's-quiz', h: 'Mini test' });
    }

    const prev = day > 1 ? lessonByDay(day - 1) : null;
    const next = day < TOTAL ? lessonByDay(day + 1) : null;
    h += `<div class="finish"><div><b>Darsni tugatdingizmi?</b><div style="color:var(--muted);font-size:14px">Topshiriqni bajarib, testdan o'tgach belgilang.</div></div>
        <button class="btn" id="done-btn" type="button"></button></div>
      <nav class="pager">
        ${day > 1 ? `<a href="${lessonUrl(day - 1)}"><small>← Oldingi · Kun ${day - 1}</small>${esc(prev ? prev.t : '')}</a>` : '<span></span>'}
        ${day < TOTAL ? `<a class="nx" href="${lessonUrl(day + 1)}"><small>Keyingi · Kun ${day + 1} →</small>${esc(next ? next.t : '')}</a>` : '<span></span>'}
      </nav>`;
    main.innerHTML = h;
    if (window.BPGraph) main.querySelectorAll('.bpg[data-g]').forEach(el => window.BPGraph.render(el, pendingGraphs[+el.dataset.g]));

    $('#toc').innerHTML = '<h4>Mundarija</h4>' + toc.map(t => `<a href="#${t.id}">${fmt(t.h)}</a>`).join('');

    // Bajarildi tugmasi
    const btn = $('#done-btn');
    const paint = () => {
      const on = !!state.done[day];
      btn.className = on ? 'btn ok' : 'btn';
      btn.textContent = on ? '✓ Bajarildi' : 'Bajarildi deb belgilash';
    };
    paint();
    btn.addEventListener('click', () => {
      state.done[day] = !state.done[day];
      save(); paint(); updateTopProgress(); renderSidebar(day);
    });

    // Checklist
    main.querySelectorAll('[data-ci]').forEach(cb => cb.addEventListener('change', () => {
      const arr = state.checks[day] || [];
      arr[+cb.dataset.ci] = cb.checked;
      state.checks[day] = arr; save();
    }));

    // Nusxa olish
    main.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', () => {
      const txt = b.closest('.bp').querySelector('pre').innerText;
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(
        () => { b.textContent = 'Nusxalandi'; setTimeout(() => (b.textContent = 'Nusxa'), 1400); },
        () => { b.textContent = 'Xato'; });
    }));

    // Test
    if (l.quiz) {
      const answers = state.quiz[day] || {};
      const score = () => {
        const a = state.quiz[day] || {};
        const total = l.quiz.length;
        const right = l.quiz.filter((q, i) => a[i] === q[2]).length;
        const answered = Object.keys(a).length;
        $('#quiz-score').textContent = answered ? `Natija: ${right} / ${total}` + (answered === total && right === total ? ' — a\'lo!' : '') : '';
      };
      const reveal = (qi, oi) => {
        const box = main.querySelector(`.quiz-q[data-qi="${qi}"]`);
        const q = l.quiz[qi];
        box.querySelectorAll('button').forEach(b => {
          const i = +b.dataset.oi;
          b.disabled = true;
          if (i === q[2]) b.classList.add('right');
          else if (i === oi) b.classList.add('wrong');
        });
        const ex = box.querySelector('.quiz-ex');
        ex.innerHTML = (oi === q[2] ? '✅ To\'g\'ri. ' : '❌ Noto\'g\'ri. ') + fmt(q[3] || '');
        ex.classList.remove('hidden');
      };
      Object.keys(answers).forEach(qi => reveal(+qi, answers[qi]));
      main.querySelectorAll('.quiz-q').forEach(box => box.querySelectorAll('button').forEach(b =>
        b.addEventListener('click', () => {
          const qi = +box.dataset.qi, oi = +b.dataset.oi;
          state.quiz[day] = Object.assign(state.quiz[day] || {}, { [qi]: oi });
          save(); reveal(qi, oi); score();
        })));
      score();
    }

    // Mundarija — faol bo'limni belgilash
    const links = [...document.querySelectorAll('#toc a')];
    if ('IntersectionObserver' in window && links.length) {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }), { rootMargin: '-20% 0px -70% 0px' });
      main.querySelectorAll('.sec').forEach(s => io.observe(s));
    }

    // Mobil menyu
    const mb = $('#menu-btn');
    if (mb) mb.addEventListener('click', () => $('#sidebar').classList.toggle('show'));

    // Klaviatura: ← → bilan darslar orasida yurish
    document.addEventListener('keydown', e => {
      if (e.target.closest('input, textarea')) return;
      if (e.key === 'ArrowLeft' && day > 1) location.href = lessonUrl(day - 1);
      if (e.key === 'ArrowRight' && day < TOTAL) location.href = lessonUrl(day + 1);
    });
  }

  // Sticky sidebar/mundarija yuqoridagi panel ostidan boshlansin (NeoCoder header balandroq)
  function syncTopOffset() {
    const bar = document.querySelector('header.header') || document.querySelector('.topbar');
    if (bar) document.documentElement.style.setProperty('--top', bar.offsetHeight + 'px');
  }

  document.addEventListener('DOMContentLoaded', () => {
    syncTopOffset();
    window.addEventListener('resize', syncTopOffset);
    setTimeout(syncTopOffset, 300); // neo.js header'ni qayta quradi
    initTheme();
    updateTopProgress();
    if (document.body.dataset.page === 'home') renderHome();
    if (document.body.dataset.page === 'lesson') renderLesson();
  });
})();
