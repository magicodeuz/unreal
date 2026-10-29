// Blueprint grafiklarini Unreal Editor uslubida chizish.
//
// Grafik formati (dars ichida `graph: {...}`):
//   t:   "BP_Door · Event Graph"           — yuqoridagi tab nomi
//   n:   [ node, ... ]                      — node'lar
//   w:   ["a.0-b.0", ...]                   — simlar: <node>.<chiqish indeksi>-<node>.<kirish indeksi>
//   cm:  [{ t: "Izoh", n: ["a","b"], c: "#4a7" }]  — comment bloklari
//   how: ["1-qadam ...", ...]               — Editor'da yig'ish qadamlari (node'dagi s: raqamiga mos)
//
// Node: { id, k, t, x, y, i: [pin...], o: [pin...], s?: qadam raqami, d?: tooltip, sub?: kichik sarlavha }
//   k: event | input | custom | func | pure | latent | flow | macro | cast | msg | set | var | op | entry | ret
//   x: ustun (butun son), y: qator (1 = ~64px)
// Pin satri: "<tur> <nom> = <qiymat>"   masalan  ">", "> True", "float Delta Seconds", "str In String = Salom"
//   tur: > (exec) | bool | int | float | str | name | text | vec | rot | tr | obj | class | struct | enum | any | evt
//   oxiriga [] — massiv: "obj[] Out Actors"
(function () {
  'use strict';

  const TYPES = {
    '>': '#ffffff', bool: '#d42a35', int: '#1fe0a7', float: '#9ef24a', str: '#f02ad8', name: '#c88cff',
    text: '#ec8aab', vec: '#f7c600', rot: '#9ab7ff', tr: '#ff8a1c', obj: '#2aa6f2', class: '#8a55ff',
    struct: '#3b7fe0', enum: '#13a08d', any: '#a3a8b0', evt: '#ff4d4d', soft: '#7fe0ff'
  };
  const KINDS = {
    event: { c: '#8f2121', ic: '◆' }, input: { c: '#8f2121', ic: '⌨' }, custom: { c: '#8f2121', ic: '◆' },
    func: { c: '#1d4f8c', ic: 'ƒ' }, latent: { c: '#1d4f8c', ic: '◷' }, pure: { c: '#2e6b37', ic: 'ƒ' },
    flow: { c: '#4a4d55', ic: '⇆' }, macro: { c: '#4a4d55', ic: '⧉' }, cast: { c: '#16707a', ic: '⇢' },
    msg: { c: '#2a6488', ic: '✉' }, set: { c: '#3b3f4a', ic: '' },
    entry: { c: '#5a2f86', ic: 'ƒ' }, ret: { c: '#5a2f86', ic: '⏎' }
  };
  const UNIT = 64, COL_GAP = 60, PAD = 24;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function parsePin(spec) {
    let s = spec.trim(), def = null;
    const eq = s.indexOf(' = ');
    if (eq >= 0) { def = s.slice(eq + 3); s = s.slice(0, eq); }
    const sp = s.indexOf(' ');
    let type = sp < 0 ? s : s.slice(0, sp);
    const label = sp < 0 ? '' : s.slice(sp + 1);
    const arr = type.endsWith('[]');
    if (arr) type = type.slice(0, -2);
    if (!TYPES[type]) type = 'any';
    return { type, label, def, arr };
  }

  function pinIcon(p, linked, side) {
    const col = TYPES[p.type];
    if (p.type === '>') {
      return `<svg class="bpg-ic" viewBox="0 0 14 14"><path d="M2 2h6l5 5-5 5H2z" fill="${linked ? col : 'none'}" stroke="${col}" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
    }
    if (p.arr) {
      let r = '';
      for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) r += `<rect x="${1 + x * 4.3}" y="${1 + y * 4.3}" width="3.3" height="3.3" fill="${col}"/>`;
      return `<svg class="bpg-ic" viewBox="0 0 14 14">${r}</svg>`;
    }
    if (p.type === 'evt') return `<svg class="bpg-ic" viewBox="0 0 14 14"><rect x="2.5" y="2.5" width="9" height="9" fill="${linked ? col : 'none'}" stroke="${col}" stroke-width="1.6"/></svg>`;
    return `<svg class="bpg-ic" viewBox="0 0 14 14"><circle cx="7" cy="7" r="4.6" fill="${linked ? col : 'none'}" stroke="${col}" stroke-width="1.8"/></svg>`;
  }

  function defBox(p) {
    if (p.def == null) return '';
    if (p.type === 'bool') return `<span class="bpg-chk">${/^(true|✔|1)$/i.test(p.def) ? '✔' : ''}</span>`;
    return `<span class="bpg-def">${esc(p.def)}</span>`;
  }

  function nodeHTML(n, linkedIn, linkedOut) {
    const kind = KINDS[n.k];
    const ins = (n.i || []).map(parsePin), outs = (n.o || []).map(parsePin);
    const tip = n.d ? ` title="${esc(n.d)}"` : '';
    const badge = n.s ? `<span class="bpg-step">${n.s}</span>` : '';
    const row = (p, idx, side) => {
      const linked = side === 'i' ? linkedIn.has(idx) : linkedOut.has(idx);
      const ic = `<span class="bpg-pin" data-pin="${side}${idx}">${pinIcon(p, linked)}</span>`;
      const lab = p.label ? `<span class="bpg-lab">${esc(p.label)}</span>` : '';
      return side === 'i'
        ? `<div class="bpg-row in">${ic}${lab}${linked ? '' : defBox(p)}</div>`
        : `<div class="bpg-row out">${lab}${ic}</div>`;
    };
    const rows = Math.max(ins.length, outs.length);
    let body = '';
    for (let r = 0; r < rows; r++) {
      body += `<div class="bpg-pair">${ins[r] ? row(ins[r], r, 'i') : '<span></span>'}${outs[r] ? row(outs[r], r, 'o') : '<span></span>'}</div>`;
    }

    if (n.k === 'var') {
      const p = outs[0] || parsePin('any');
      return `<div class="bpg-node var" data-id="${n.id}" style="--pc:${TYPES[p.type]}"${tip}>${badge}
        <div class="bpg-pair"><span class="bpg-vname">${esc(n.t)}</span>${row(p, 0, 'o')}</div></div>`;
    }
    if (n.k === 'op') {
      return `<div class="bpg-node op" data-id="${n.id}"${tip}>${badge}
        <div class="bpg-opcol">${ins.map((p, r) => row(p, r, 'i')).join('')}</div>
        <div class="bpg-optitle">${esc(n.t)}</div>
        <div class="bpg-opcol">${outs.map((p, r) => row(p, r, 'o')).join('')}</div></div>`;
    }
    return `<div class="bpg-node" data-id="${n.id}" style="--hc:${kind ? kind.c : '#444'}"${tip}>${badge}
      <div class="bpg-head"><span class="bpg-hic">${kind ? kind.ic : ''}</span><span>${esc(n.t)}${n.sub ? `<small>${esc(n.sub)}</small>` : ''}</span></div>
      <div class="bpg-body">${body}</div></div>`;
  }

  function parseWire(w) {
    const m = /^(\w+)\.(\d+)-(\w+)\.(\d+)$/.exec(w.replace(/\s+/g, ''));
    return m ? { a: m[1], ao: +m[2], b: m[3], bi: +m[4] } : null;
  }

  function render(host, g) {
    const wires = (g.w || []).map(parseWire).filter(Boolean);
    const linkIn = {}, linkOut = {};
    wires.forEach(w => {
      (linkOut[w.a] = linkOut[w.a] || new Set()).add(w.ao);
      (linkIn[w.b] = linkIn[w.b] || new Set()).add(w.bi);
    });

    host.innerHTML = `<div class="bpg-bar"><span class="bpg-tab">${esc(g.t || 'Event Graph')}</span>
        <span class="bpg-tools"><button type="button" data-zoom>100%</button> <button type="button" data-legend>Pin ranglari</button></span></div>
      <div class="bpg-legend hidden">${Object.entries({ '>': 'Exec (oqim)', bool: 'Boolean', int: 'Integer', float: 'Float', str: 'String', name: 'Name', text: 'Text', vec: 'Vector', rot: 'Rotator', tr: 'Transform', obj: 'Object', class: 'Class', struct: 'Struct', enum: 'Enum', evt: 'Delegate' })
        .map(([k, v]) => `<span>${pinIcon({ type: k }, true)}${v}</span>`).join('')}</div>
      <div class="bpg-scroll"><div class="bpg-fit"><div class="bpg-canvas"><svg class="bpg-wires"></svg>
        ${(g.cm || []).map((c, i) => `<div class="bpg-cm" data-cm="${i}" style="--cc:${c.c || '#5b6b8c'}"><span>${esc(c.t)}</span></div>`).join('')}
        ${g.n.map(n => nodeHTML(n, linkIn[n.id] || new Set(), linkOut[n.id] || new Set())).join('')}
      </div></div></div>
      ${g.how ? `<div class="bpg-how"><b>Editor'da qanday yig'iladi</b><ol>${g.how.map(h => `<li>${window.UE90fmt ? window.UE90fmt(h) : esc(h)}</li>`).join('')}</ol></div>` : ''}`;

    host.querySelector('[data-legend]').addEventListener('click', () =>
      host.querySelector('.bpg-legend').classList.toggle('hidden'));

    const canvas = host.querySelector('.bpg-canvas');
    const state = { fit: true };
    const layout = () => { doLayout(canvas, g, wires); fit(host, canvas, state); };
    host.querySelector('[data-zoom]').addEventListener('click', e => {
      state.fit = !state.fit;
      e.target.textContent = state.fit ? '100%' : 'Sig‘dirish';
      fit(host, canvas, state);
    });
    layout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    let t;
    window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => fit(host, canvas, state), 120); });
  }

  // Keng grafni ekranga sig'dirish (eng kamida 55%), qolgani scroll bilan
  function fit(host, canvas, state) {
    const box = host.querySelector('.bpg-fit');
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const avail = host.querySelector('.bpg-scroll').clientWidth;
    const s = state.fit ? Math.max(0.55, Math.min(1, avail / W)) : 1;
    canvas.style.transform = s < 1 ? `scale(${s})` : '';
    box.style.width = W * s + 'px';
    box.style.height = H * s + 'px';
    host.querySelector('[data-zoom]').style.display = avail >= W ? 'none' : '';
  }

  function doLayout(canvas, g, wires) {
    canvas.style.transform = '';
    const els = {};
    canvas.querySelectorAll('.bpg-node').forEach(el => { els[el.dataset.id] = el; });

    // Ustun kengliklari
    const colW = {};
    g.n.forEach(n => { const c = n.x || 0; colW[c] = Math.max(colW[c] || 0, els[n.id].offsetWidth); });
    const cols = Object.keys(colW).map(Number).sort((a, b) => a - b);
    const colX = {};
    let acc = PAD;
    for (let c = cols[0]; c <= cols[cols.length - 1]; c++) {
      colX[c] = acc;
      acc += (colW[c] || 0) + (colW[c] ? COL_GAP : 40);
    }
    // Ustun ichida ustma-ust tushmaslik
    const bottom = {};
    let maxX = 0, maxY = 0;
    g.n.slice().sort((a, b) => (a.y || 0) - (b.y || 0)).forEach(n => {
      const el = els[n.id], c = n.x || 0;
      let top = PAD + 26 + (n.y || 0) * UNIT;
      if (bottom[c] != null && top < bottom[c] + 18) top = bottom[c] + 18;
      el.style.left = colX[c] + 'px';
      el.style.top = top + 'px';
      bottom[c] = top + el.offsetHeight;
      maxX = Math.max(maxX, colX[c] + el.offsetWidth);
      maxY = Math.max(maxY, bottom[c]);
    });

    // Comment bloklari
    (g.cm || []).forEach((c, i) => {
      const box = canvas.querySelector(`[data-cm="${i}"]`);
      const ns = c.n.map(id => els[id]).filter(Boolean);
      if (!ns.length) return;
      const l = Math.min(...ns.map(e => e.offsetLeft)) - 14, t = Math.min(...ns.map(e => e.offsetTop)) - 34;
      const r = Math.max(...ns.map(e => e.offsetLeft + e.offsetWidth)) + 14, b = Math.max(...ns.map(e => e.offsetTop + e.offsetHeight)) + 14;
      Object.assign(box.style, { left: l + 'px', top: t + 'px', width: (r - l) + 'px', height: (b - t) + 'px' });
      maxX = Math.max(maxX, r); maxY = Math.max(maxY, b);
    });

    const W = maxX + PAD, H = maxY + PAD;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    // Simlar
    const svg = canvas.querySelector('.bpg-wires');
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    const base = canvas.getBoundingClientRect();
    const pinPos = (id, key) => {
      const p = els[id] && els[id].querySelector(`[data-pin="${key}"]`);
      if (!p) return null;
      const r = p.getBoundingClientRect();
      return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 };
    };
    svg.innerHTML = wires.map(w => {
      const A = pinPos(w.a, 'o' + w.ao), B = pinPos(w.b, 'i' + w.bi);
      if (!A || !B) return '';
      const nA = g.n.find(n => n.id === w.a);
      const p = parsePin((nA.o || [])[w.ao] || 'any');
      const col = TYPES[p.type];
      const dx = Math.max(60, Math.abs(B.x - A.x) * 0.5);
      return `<path d="M${A.x} ${A.y} C${A.x + dx} ${A.y} ${B.x - dx} ${B.y} ${B.x} ${B.y}" stroke="${col}" stroke-width="${p.type === '>' ? 2.6 : 2}" fill="none" opacity=".95"/>`;
    }).join('');
  }

  window.BPGraph = { render };
})();
