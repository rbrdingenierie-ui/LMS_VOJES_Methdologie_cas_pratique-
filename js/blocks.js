/* Blocs de contenu et activités corrigées automatiquement. */
(function () {
  'use strict';
  var h = U.h, esc = U.esc, norm = U.norm, shuffle = U.shuffle;
  var AUTO = { vf: 1, relier: 1, trous: 1, ordre: 1, tri: 1, qcm: 1 };
  var OPEN = { ouvert: 1, tableau: 1, fait: 1 };
  var LETTERS = 'abcdefghij';
  var MIN_MOTS_SYNTHESE = 15;   // nombre minimal de mots pour pouvoir valider une synthèse

  function isInteractive(b) { return !!(AUTO[b.t] || OPEN[b.t] || b.t === 'ipsative'); }
  function isDone(b) {
    if (b.t === 'ipsative') return !!(Store.S.blocks['diag2'] || {}).chk;
    var st = Store.S.blocks[b.id] || {};
    if (AUTO[b.t]) return !!st.chk;
    if (OPEN[b.t]) return !!st.rev;
    return true;
  }
  // score automatique d'un bloc (null si non noté)
  function scoreOf(b) {
    if (!AUTO[b.t]) return null;
    var st = Store.S.blocks[b.id];
    if (!st || !st.chk) return null;
    return { sc: st.sc || 0, mx: st.mx || 0 };
  }
  function collect(blocks, fn) {
    (blocks || []).forEach(function (b) {
      fn(b);
      if (b.blocks) collect(b.blocks, fn);
    });
  }

  function head(b) {
    var out = [];
    if (b.titre) out.push(h('h3', { text: b.titre }));
    if (b.consigne) out.push(h('p', { class: 'consigne', html: b.consigne }));
    return out;
  }
  function resEl() { return h('p', { class: 'res', role: 'status', 'aria-live': 'polite' }); }
  function setRes(el, sc, mx) {
    el.className = 'res ' + (sc === mx ? 'ok' : 'part');
    el.textContent = 'Résultat : ' + sc + ' / ' + mx + (sc === mx ? ' — bravo !' : ' — lisez les corrections ci-dessus, puis recommencez si vous le souhaitez.');
    reveal(el);
  }
  /* clic de l'élève : le résultat qui s'affiche est ramené à l'écran (pas au chargement de la page) */
  var userAct = false;
  document.addEventListener('click', function (e) {
    if (e.target && e.target.closest && e.target.closest('button')) { userAct = true; setTimeout(function () { userAct = false; }, 0); }
  }, true);
  function reveal(el) { if (userAct) { try { el.scrollIntoView({ block: 'nearest', behavior: 'auto' }); } catch (e) { } } }
  function flag(el) {
    if (!el) return;
    el.classList.add('todo'); setTimeout(function () { el.classList.remove('todo'); }, 4500);
    try { el.scrollIntoView({ block: 'center', behavior: 'auto' }); } catch (e) { }
  }
  function missing(n, test) { var m = []; for (var i = 0; i < n; i++) if (!test(i)) m.push(i); return m; }
  function reste(m, one, many) { return 'Il reste ' + m.length + ' ' + (m.length > 1 ? many : one) + ' sans réponse : la première est entourée en orange.'; }
  function warn(el, msg, target) { el.className = 'res part'; el.textContent = msg; flag(target); }
  function tryAgain(b, st, box, rerender) {
    return h('button', { type: 'button', class: 'btn sec', onclick: function () {
      var keep = st.t; Store.S.blocks[b.id] = {}; Store.save(); rerender(); } }, 'Recommencer');
  }

  /* ---------- Vrai / Faux ---------- */
  function vf(b) {
    var st = Store.block(b.id); if (!st.a) st.a = [];
    var opts = [['v', 'Vrai'], ['f', 'Faux']]; if (b.ns) opts.push(['n', 'Je ne sais pas']);
    var box = h('section', { class: 'bloc act', 'data-bid': b.id });
    head(b).forEach(function (x) { box.appendChild(x); });
    var rows = [];
    b.items.forEach(function (it, i) {
      var fs = h('fieldset', { class: 'item' }, h('legend', { text: (i + 1) + '. ' + it.q }));
      var ch = h('div', { class: 'choices' });
      opts.forEach(function (o) {
        var inp = h('input', { type: 'radio', name: b.id + '-' + i, value: o[0] });
        if (st.a[i] === o[0]) inp.checked = true;
        inp.addEventListener('change', function () { st.a[i] = o[0]; Store.save(); });
        ch.appendChild(h('label', null, inp, h('span', { text: o[1] })));
      });
      var fb = h('p', { class: 'fb', hidden: true });
      fs.appendChild(ch); fs.appendChild(fb); box.appendChild(fs);
      rows.push({ fs: fs, fb: fb, ch: ch });
    });
    var res = resEl();
    function paint() {
      var sc = 0;
      b.items.forEach(function (it, i) {
        var good = (it.a ? 'v' : 'f') === st.a[i];
        if (good) sc++;
        var r = rows[i];
        r.fs.className = 'item ' + (good ? 'good' : 'bad');
        r.fb.hidden = false; r.fb.className = 'fb ' + (good ? 'g' : 'b');
        r.fb.innerHTML = (good ? '✔ Bonne réponse. ' : '✘ La bonne réponse est : ' + (it.a ? 'Vrai' : 'Faux') + '. ') +
          (it.e ? '<span class="ex">' + it.e + '</span>' : '');
        [].forEach.call(r.ch.querySelectorAll('input'), function (i2) { i2.disabled = true; });
      });
      st.sc = sc; st.mx = b.items.length; setRes(res, sc, st.mx);
    }
    var bc = h('button', { type: 'button', class: 'btn', onclick: function () {
      var mq = missing(b.items.length, function (i) { return !!st.a[i]; });
      if (mq.length) { warn(res, reste(mq, 'affirmation', 'affirmations'), rows[mq[0]].fs); return; }
      st.chk = true; Store.save(); paint(); bc.hidden = true; br.hidden = false;
      document.dispatchEvent(new CustomEvent('lms-checked', { detail: b.id }));
    } }, 'Vérifier mes réponses');
    var br = tryAgain(b, st, box, function () { box.replaceWith(vf(b)); document.dispatchEvent(new CustomEvent('lms-checked', { detail: b.id })); });
    br.hidden = true;
    box.appendChild(h('div', { class: 'btns' }, bc, br)); box.appendChild(res);
    if (st.chk) { paint(); bc.hidden = true; br.hidden = false; }
    return box;
  }

  /* ---------- Relier : on touche un élément, puis sa proposition ; un trait se trace ---------- */
  var LINK_COLORS = ['#1F3864', '#C2410C', '#12796B', '#5E3E96', '#B4235A', '#8A6A32'];
  var SVGNS = 'http://www.w3.org/2000/svg';
  function relier(b) {
    var st = Store.block(b.id); if (!st.a) st.a = [];
    var keys = Object.keys(b.props), n = b.items.length;
    var box = h('section', { class: 'bloc act relier', 'data-bid': b.id });
    head(b).forEach(function (x) { box.appendChild(x); });
    box.appendChild(h('p', { class: 'hint', text: 'Touchez (ou cliquez sur) un élément à gauche, puis la proposition qui lui correspond à droite : un trait les relie. Pour changer un lien, touchez à nouveau l\'élément déjà relié.' }));
    var zone = h('div', { class: 'rl', role: 'group', 'aria-label': 'Éléments à relier à leurs propositions' });
    var svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'rl-svg'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
    var left = h('ul', { class: 'rl-col' }), right = h('ul', { class: 'rl-col' });
    var bi = [], bp = {}, sel = null, locked = !!st.chk;
    var live = h('p', { class: 'sr', role: 'status', 'aria-live': 'polite' });
    function say(t) { live.textContent = t; }
    function colorOf(i) { return LINK_COLORS[i % LINK_COLORS.length]; }
    function ownerOf(k) { for (var i = 0; i < n; i++) if (st.a[i] === k) return i; return -1; }

    b.items.forEach(function (it, i) {
      var tag = h('span', { class: 'rl-tag', 'aria-hidden': 'true' }), sr = h('span', { class: 'sr' });
      var btn = h('button', { type: 'button', class: 'rl-b', 'aria-pressed': 'false' },
        h('span', { class: 'rl-n', text: String(i + 1) }), h('span', { class: 'rl-t', html: it.q }), tag, sr);
      btn.addEventListener('click', function () { pick('i', i); });
      bi.push({ btn: btn, tag: tag, sr: sr }); left.appendChild(h('li', null, btn));
    });
    keys.forEach(function (k) {
      var tag = h('span', { class: 'rl-tag', 'aria-hidden': 'true' }), sr = h('span', { class: 'sr' });
      var btn = h('button', { type: 'button', class: 'rl-b', 'aria-pressed': 'false' },
        h('span', { class: 'rl-n', text: k }), h('span', { class: 'rl-t', html: b.props[k] }), tag, sr);
      btn.addEventListener('click', function () { pick('p', k); });
      bp[k] = { btn: btn, tag: tag, sr: sr }; right.appendChild(h('li', null, btn));
    });
    zone.appendChild(svg); zone.appendChild(left); zone.appendChild(right);
    box.appendChild(zone); box.appendChild(live);

    function pick(side, id) {
      if (locked) return;
      if (sel && sel.side !== side) {                       // 2e clic, dans l'autre colonne : on relie
        var i = side === 'i' ? id : sel.id, k = side === 'p' ? id : sel.id, o = ownerOf(k);
        if (o >= 0) st.a[o] = '';
        st.a[i] = k; sel = null; Store.save();
        say('Élément ' + (i + 1) + ' relié à la proposition ' + k + '.'); update(); return;
      }
      if (sel && sel.side === side && sel.id === id) { sel = null; update(); return; }   // on annule la sélection
      if (side === 'i' && st.a[id]) { st.a[id] = ''; Store.save(); say('Lien défait. Choisissez la proposition de l\'élément ' + (id + 1) + '.'); }
      else if (side === 'p' && ownerOf(id) >= 0) { st.a[ownerOf(id)] = ''; Store.save(); say('Lien défait. Choisissez l\'élément de la proposition ' + id + '.'); }
      else say(side === 'i' ? 'Élément ' + (id + 1) + ' sélectionné : choisissez sa proposition.' : 'Proposition ' + id + ' sélectionnée : choisissez son élément.');
      sel = { side: side, id: id }; update();
    }
    function update() {
      bi.forEach(function (o, i) {
        var k = st.a[i], on = sel && sel.side === 'i' && sel.id === i;
        o.btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        o.btn.classList.toggle('sel', !!on); o.btn.classList.toggle('linked', !!k);
        if (k) o.btn.style.setProperty('--lc', colorOf(i)); else o.btn.style.removeProperty('--lc');
        o.tag.textContent = k || '';
        o.sr.textContent = k ? ' Relié à la proposition ' + k + '.' : ' Pas encore relié.';
      });
      keys.forEach(function (k) {
        var o = bp[k], w = ownerOf(k), on = sel && sel.side === 'p' && sel.id === k;
        o.btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        o.btn.classList.toggle('sel', !!on); o.btn.classList.toggle('linked', w >= 0);
        if (w >= 0) o.btn.style.setProperty('--lc', colorOf(w)); else o.btn.style.removeProperty('--lc');
        o.tag.textContent = w >= 0 ? String(w + 1) : '';
        o.sr.textContent = w >= 0 ? ' Reliée à l\'élément ' + (w + 1) + '.' : ' Pas encore reliée.';
      });
      draw();
    }
    function line(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
    function draw() {
      var zr = zone.getBoundingClientRect();
      if (!zr.width) return;
      svg.setAttribute('width', zr.width); svg.setAttribute('height', zr.height); svg.setAttribute('viewBox', '0 0 ' + zr.width + ' ' + zr.height);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      for (var i = 0; i < n; i++) {
        var k = st.a[i]; if (!k || !bp[k]) continue;
        var a = bi[i].btn.getBoundingClientRect(), p = bp[k].btn.getBoundingClientRect();
        var x1 = a.right - zr.left, y1 = a.top + a.height / 2 - zr.top, x2 = p.left - zr.left, y2 = p.top + p.height / 2 - zr.top;
        var cls = st.chk ? (k === b.items[i].a ? ' good' : ' bad') : '', col = colorOf(i);
        // trait « en coude » : chaque lien a son propre couloir vertical, pour que les traits ne se superposent pas
        var gw = x2 - x1, xm = x1 + gw * (i + 1) / (n + 1), dy = y2 - y1, sg = dy > 0 ? 1 : -1;
        var r = Math.max(0, Math.min(9, Math.abs(dy) / 2, gw / (n + 1) * 0.9));
        var d = Math.abs(dy) < 1 ? 'M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2
          : 'M' + x1 + ' ' + y1 + ' H' + (xm - r) + ' Q' + xm + ' ' + y1 + ' ' + xm + ' ' + (y1 + sg * r) + ' V' + (y2 - sg * r) + ' Q' + xm + ' ' + y2 + ' ' + (xm + r) + ' ' + y2 + ' H' + x2;
        svg.appendChild(line('path', { 'class': 'rl-line' + cls, stroke: col, d: d }));
        svg.appendChild(line('circle', { 'class': 'rl-dot' + cls, fill: col, cx: x1, cy: y1, r: 5 }));
        svg.appendChild(line('circle', { 'class': 'rl-dot' + cls, fill: col, cx: x2, cy: y2, r: 5 }));
      }
    }
    if (window.ResizeObserver) new ResizeObserver(function () { draw(); }).observe(zone);
    window.addEventListener('resize', draw);
    window.addEventListener('load', draw);

    var res = resEl(), fbl = h('div', { class: 'rl-fb' });
    function paint() {
      locked = true; zone.classList.add('locked');
      var sc = 0; fbl.innerHTML = '';
      b.items.forEach(function (it, i) {
        var good = st.a[i] === it.a; if (good) sc++;
        var cls = good ? 'good' : 'bad';
        bi[i].btn.classList.add(cls); bi[i].btn.setAttribute('aria-disabled', 'true');
        if (bp[st.a[i]]) { bp[st.a[i]].btn.classList.add(cls); bp[st.a[i]].btn.setAttribute('aria-disabled', 'true'); }
        fbl.appendChild(h('p', { class: 'fb ' + (good ? 'g' : 'b'), html: '<b>' + (i + 1) + '.</b> ' + (good ? '✔ Bonne réponse (proposition ' + it.a + ').' : '✘ Vous l\'avez relié à la proposition ' + esc(st.a[i]) + ' ; la bonne proposition est <b>' + it.a + '</b>.') }));
      });
      st.sc = sc; st.mx = n; setRes(res, sc, n); draw();
    }
    var bc = h('button', { type: 'button', class: 'btn', onclick: function () {
      var mq = missing(n, function (i) { return !!st.a[i]; });
      if (mq.length) { warn(res, 'Il reste ' + mq.length + ' élément' + (mq.length > 1 ? 's' : '') + ' à relier : le premier est entouré en orange.', bi[mq[0]].btn); return; }
      sel = null; st.chk = true; Store.save(); update(); paint(); bc.hidden = true; bx.hidden = true; br.hidden = false;
    } }, 'Vérifier mes réponses');
    var bx = h('button', { type: 'button', class: 'btn sec', onclick: function () {
      st.a = []; sel = null; Store.save(); res.textContent = ''; say('Tous les liens sont effacés.'); update();
    } }, 'Tout effacer');
    var br = tryAgain(b, st, box, function () { box.replaceWith(relier(b)); }); br.hidden = true;
    box.appendChild(h('div', { class: 'btns' }, bc, bx, br)); box.appendChild(res); box.appendChild(fbl);
    update();
    if (st.chk) { paint(); bc.hidden = true; bx.hidden = true; br.hidden = false; }
    requestAnimationFrame(draw);
    return box;
  }

  /* ---------- Textes à trous ---------- */
  function trous(b) {
    var st = Store.block(b.id); if (!st.a) st.a = [];
    var box = h('section', { class: 'bloc act', 'data-bid': b.id });
    head(b).forEach(function (x) { box.appendChild(x); });
    var re = /\[\[(.+?)\]\]/g, last = 0, m, k = 0, inputs = [], answers = [];
    var wrap = h('p', { class: 'gaptext' });
    function pushHtml(t) { if (t) wrap.appendChild(h('span', { html: t })); }
    while ((m = re.exec(b.texte))) {
      pushHtml(b.texte.slice(last, m.index));
      var alts = m[1].split('|'); answers.push(alts);
      var idx = k++;
      var inp = h('input', { type: 'text', class: 'gap', size: Math.max(5, alts[0].length + 2), 'aria-label': 'Mot manquant n°' + (idx + 1), autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
      inp.value = st.a[idx] || '';
      inp.addEventListener('input', function (i) { return function (e) { st.a[i] = e.target.value; Store.save(); }; }(idx));
      wrap.appendChild(inp); inputs.push(inp); last = m.index + m[0].length;
    }
    pushHtml(b.texte.slice(last));
    box.appendChild(wrap);
    var fb = h('p', { class: 'fb', hidden: true }), res = resEl();
    function paint() {
      var sc = 0, wrong = [];
      inputs.forEach(function (inp, i) {
        var ok = answers[i].some(function (a) { return norm(a) === norm(st.a[i]); });
        if (ok) sc++; else wrong.push((i + 1) + ') ' + answers[i][0]);
        inp.className = 'gap ' + (ok ? 'good' : 'bad'); inp.readOnly = true;
      });
      st.sc = sc; st.mx = inputs.length;
      if (wrong.length) { fb.hidden = false; fb.className = 'fb b'; fb.innerHTML = '✘ À corriger : <span class="ex">' + esc(wrong.join(' ; ')) + '</span>'; }
      else { fb.hidden = false; fb.className = 'fb g'; fb.textContent = '✔ Tous les mots sont justes.'; }
      setRes(res, sc, st.mx);
    }
    var bc = h('button', { type: 'button', class: 'btn', onclick: function () {
      var mq = missing(inputs.length, function (i) { return !!norm(st.a[i]); });
      if (mq.length) { warn(res, 'Il reste ' + mq.length + ' trou' + (mq.length > 1 ? 's' : '') + ' à compléter : le premier est entouré en orange.', inputs[mq[0]]); return; }
      st.chk = true; Store.save(); paint(); bc.hidden = true; br.hidden = false;
    } }, 'Vérifier');
    var br = tryAgain(b, st, box, function () { box.replaceWith(trous(b)); }); br.hidden = true;
    box.appendChild(fb); box.appendChild(h('div', { class: 'btns' }, bc, br)); box.appendChild(res);
    if (st.chk) { paint(); bc.hidden = true; br.hidden = false; }
    return box;
  }

  /* ---------- Classer dans l'ordre ---------- */
  function ordre(b) {
    var st = Store.block(b.id);
    var n = b.items.length;
    if (!st.o) {
      var o = shuffle(b.items.map(function (_, i) { return i; }), b.id);
      var sorted = o.every(function (v, i) { return v === i; });
      if (sorted) o = o.slice(1).concat(o[0]);
      st.o = o; Store.save();
    }
    var box = h('section', { class: 'bloc act', 'data-bid': b.id });
    head(b).forEach(function (x) { box.appendChild(x); });
    var ul = h('ol', { class: 'ordlist' });
    var res = resEl(), fb = h('p', { class: 'fb', hidden: true });
    function draw(focusIdx, focusDir) {
      ul.innerHTML = '';
      st.o.forEach(function (val, pos) {
        var li = h('li', null, h('span', { html: b.items[val] }));
        var up = h('button', { type: 'button', 'aria-label': 'Monter : ' + b.items[val].replace(/<[^>]+>/g, ''), text: '▲' });
        var dn = h('button', { type: 'button', 'aria-label': 'Descendre : ' + b.items[val].replace(/<[^>]+>/g, ''), text: '▼' });
        if (st.chk) { up.disabled = dn.disabled = true; li.className = (val === pos ? 'good' : 'bad'); }
        up.disabled = up.disabled || pos === 0; dn.disabled = dn.disabled || pos === n - 1;
        up.addEventListener('click', function () { move(pos, -1); });
        dn.addEventListener('click', function () { move(pos, 1); });
        li.appendChild(h('span', { class: 'mv' }, up, dn)); ul.appendChild(li);
      });
      if (focusIdx != null) {
        var lis = ul.children, target = lis[focusIdx];
        if (target) { var btn = target.querySelectorAll('button')[focusDir > 0 ? 1 : 0]; if (btn && !btn.disabled) btn.focus(); else target.querySelector('button:not([disabled])') && target.querySelector('button:not([disabled])').focus(); }
      }
    }
    function move(pos, d) {
      var t = pos + d; if (t < 0 || t >= n) return;
      var a = st.o; var x = a[pos]; a[pos] = a[t]; a[t] = x; Store.save(); draw(t, d);
    }
    function paint() {
      var sc = 0; st.o.forEach(function (v, p) { if (v === p) sc++; });
      st.sc = sc; st.mx = n; draw();
      fb.hidden = false; fb.className = 'fb ' + (sc === n ? 'g' : 'b');
      fb.innerHTML = sc === n ? '✔ L\'ordre est correct.' + (b.e ? '<br><span class="ex">' + b.e + '</span>' : '') : '✘ Ordre attendu : <span class="ex">' + b.items.map(function (t, i) { return (i + 1) + '. ' + t; }).join(' → ') + '</span>' + (b.e ? '<br><span class="ex">' + b.e + '</span>' : '');
      setRes(res, sc, n);
    }
    draw();
    var bc = h('button', { type: 'button', class: 'btn', onclick: function () { st.chk = true; Store.save(); paint(); bc.hidden = true; br.hidden = false; } }, 'Vérifier l\'ordre');
    var br = h('button', { type: 'button', class: 'btn sec', hidden: true, onclick: function () { Store.S.blocks[b.id] = {}; Store.save(); box.replaceWith(ordre(b)); } }, 'Recommencer');
    box.appendChild(ul); box.appendChild(fb); box.appendChild(h('div', { class: 'btns' }, bc, br)); box.appendChild(res);
    if (st.chk) { paint(); bc.hidden = true; br.hidden = false; }
    return box;
  }

  /* ---------- Classer dans des catégories ---------- */
  function tri(b) {
    var st = Store.block(b.id); if (!st.a) st.a = [];
    var box = h('section', { class: 'bloc act', 'data-bid': b.id });
    head(b).forEach(function (x) { box.appendChild(x); });
    if (b.legende) box.appendChild(h('ul', { class: 'props' }, b.cats.map(function (c, i) { return h('li', null, h('b', { text: LETTERS[i].toUpperCase() }), h('span', { html: c })); })));
    var rows = [];
    b.items.forEach(function (it, i) {
      var fs = h('fieldset', { class: 'item' }, h('legend', { html: (i + 1) + '. ' + it.q }));
      var ch = h('div', { class: 'choices' });
      b.cats.forEach(function (c, ci) {
        var inp = h('input', { type: 'radio', name: b.id + '-' + i, value: ci });
        if (st.a[i] === ci) inp.checked = true;
        inp.addEventListener('change', function () { st.a[i] = ci; Store.save(); });
        ch.appendChild(h('label', null, inp, h('span', { html: b.legende ? '<b>' + LETTERS[ci].toUpperCase() + '</b>' : c })));
      });
      var fb = h('p', { class: 'fb', hidden: true });
      fs.appendChild(ch); fs.appendChild(fb); box.appendChild(fs); rows.push({ fs: fs, fb: fb, ch: ch });
    });
    var res = resEl();
    function paint() {
      var sc = 0;
      b.items.forEach(function (it, i) {
        var good = st.a[i] === it.a; if (good) sc++;
        var r = rows[i]; r.fs.className = 'item ' + (good ? 'good' : 'bad');
        r.fb.hidden = false; r.fb.className = 'fb ' + (good ? 'g' : 'b');
        r.fb.innerHTML = (good ? '✔ Bonne réponse. ' : '✘ Bonne réponse : ' + (b.legende ? '<b>' + LETTERS[it.a].toUpperCase() + '</b> — ' : '') + b.cats[it.a] + '. ') + (it.e ? '<span class="ex">' + it.e + '</span>' : '');
        [].forEach.call(r.ch.querySelectorAll('input'), function (x) { x.disabled = true; });
      });
      st.sc = sc; st.mx = b.items.length; setRes(res, sc, st.mx);
    }
    var bc = h('button', { type: 'button', class: 'btn', onclick: function () {
      var mq = missing(b.items.length, function (i) { return st.a[i] != null; });
      if (mq.length) { warn(res, reste(mq, 'ligne', 'lignes'), rows[mq[0]].fs); return; }
      st.chk = true; Store.save(); paint(); bc.hidden = true; br.hidden = false;
    } }, 'Vérifier mes réponses');
    var br = tryAgain(b, st, box, function () { box.replaceWith(tri(b)); }); br.hidden = true;
    box.appendChild(h('div', { class: 'btns' }, bc, br)); box.appendChild(res);
    if (st.chk) { paint(); bc.hidden = true; br.hidden = false; }
    return box;
  }

  /* ---------- QCM ---------- */
  function qcm(b) {
    var st = Store.block(b.id); if (!st.a) st.a = [];
    var box = h('section', { class: 'bloc act', 'data-bid': b.id });
    head(b).forEach(function (x) { box.appendChild(x); });
    var rows = [], prevM = null;
    b.items.forEach(function (it, i) {
      var multi = it.a.length > 1;
      if (it.m && it.m !== prevM) { prevM = it.m; box.appendChild(h('h4', { class: 'qmod', text: modLabel(it.m) })); }
      var fs = h('fieldset', { class: 'item' }, h('legend', { html: (b.items.length > 1 ? (i + 1) + '. ' : '') + it.q + (multi ? ' <span class="hint">(plusieurs réponses possibles)</span>' : '') }));
      var ch = h('div', { class: 'choices col' });
      it.o.forEach(function (txt, oi) {
        var inp = h('input', { type: multi ? 'checkbox' : 'radio', name: b.id + '-' + i, value: oi });
        if ((st.a[i] || []).indexOf(oi) >= 0) inp.checked = true;
        inp.addEventListener('change', function () {
          var cur = st.a[i] || [];
          if (multi) { cur = inp.checked ? cur.concat(oi) : cur.filter(function (x) { return x !== oi; }); } else cur = [oi];
          st.a[i] = cur; Store.save();
        });
        ch.appendChild(h('label', null, inp, h('span', { html: txt })));
      });
      var fb = h('p', { class: 'fb', hidden: true });
      fs.appendChild(ch); fs.appendChild(fb); box.appendChild(fs); rows.push({ fs: fs, fb: fb, ch: ch });
    });
    var res = resEl();
    function same(x, y) { x = (x || []).slice().sort(); y = y.slice().sort(); return x.length === y.length && x.every(function (v, i) { return v === y[i]; }); }
    function paint() {
      var sc = 0;
      b.items.forEach(function (it, i) {
        var good = same(st.a[i], it.a); if (good) sc++;
        var r = rows[i]; r.fs.className = 'item ' + (good ? 'good' : 'bad');
        r.fb.hidden = false; r.fb.className = 'fb ' + (good ? 'g' : 'b');
        r.fb.innerHTML = (good ? '✔ Bonne réponse. ' : '✘ Bonne réponse : ' + it.a.map(function (x) { return it.o[x]; }).join(' ; ') + '. ') + (it.e ? '<span class="ex">' + it.e + '</span>' : '');
        [].forEach.call(r.ch.querySelectorAll('input'), function (x) { x.disabled = true; });
      });
      st.sc = sc; st.mx = b.items.length; setRes(res, sc, st.mx);
      var mods = {}, any = false;
      b.items.forEach(function (it, i) {
        if (!it.m) return; any = true;
        var o = mods[it.m] || (mods[it.m] = { sc: 0, mx: 0 });
        o.mx++; if (same(st.a[i], it.a)) o.sc++;
      });
      if (any) { st.mods = mods; Store.save(); sum.innerHTML = ''; sum.appendChild(modSummary(mods)); sum.hidden = false; }
    }
    var sum = h('div', { class: 'modsum', hidden: true });
    var bc = h('button', { type: 'button', class: 'btn', onclick: function () {
      var mq = missing(b.items.length, function (i) { return !!(st.a[i] && st.a[i].length); });
      if (mq.length) { warn(res, reste(mq, 'question', 'questions'), rows[mq[0]].fs); return; }
      st.chk = true; Store.save(); paint(); bc.hidden = true; br.hidden = false;
    } }, 'Vérifier mes réponses');
    var br = tryAgain(b, st, box, function () { box.replaceWith(qcm(b)); }); br.hidden = true;
    box.appendChild(h('div', { class: 'btns' }, bc, br)); box.appendChild(res); box.appendChild(sum);
    if (st.chk) { paint(); bc.hidden = true; br.hidden = false; }
    return box;
  }

  /* ---------- acquis par module (quiz final) ---------- */
  function modLabel(n) { var m = window.LMS.modules[n - 1]; return (m ? m.lib : 'Partie ' + n) + (m ? ' · ' + m.court : ''); }
  // niveau d'acquisition : au moins 3 réponses justes sur 4 = acquis (soit 75 %)
  function level(sc, mx) {
    var r = mx ? sc / mx : 0;
    if (r >= 0.75) return { k: 'ok', t: '✔ Acquis' };
    if (r >= 0.5) return { k: 'part', t: '◐ À consolider' };
    return { k: 'rev', t: '✘ À revoir' };
  }
  function modSummary(mods) {
    var items = Object.keys(mods).sort().map(function (n) {
      var o = mods[n], lv = level(o.sc, o.mx);
      return h('li', { class: 'lv-' + lv.k },
        h('strong', { class: 'ml', text: modLabel(+n) }),
        h('span', { class: 'ms' }, h('span', { class: 'sc', text: o.sc + ' / ' + o.mx }), ' · ', h('span', { class: 'lv', text: lv.t })),
        lv.k === 'ok' ? null : h('a', { class: 'rv', href: '#/m/' + n }, 'Revoir : ' + (window.LMS.modules[n - 1] ? window.LMS.modules[n - 1].lib : 'la partie ' + n)));
    });
    return h('div', null,
      h('h4', { class: 'qmod', text: 'Mes acquis, partie par partie' }),
      h('p', { class: 'hint', text: 'Réponses justes à chaque partie : 3 sur 4 ou plus = acquis.' }),
      h('ul', { class: 'modlist' }, items));
  }

  /* ---------- auto-évaluation (réponses ouvertes) ---------- */
  function selfEval(b, st) {
    var fs = h('fieldset', { class: 'self' }, h('legend', { text: 'Je compare avec la réponse attendue. Ma réponse est…' }));
    var ch = h('div', { class: 'choices' });
    [['ok', '✅ conforme'], ['part', '🟡 en partie'], ['rev', '🔴 à revoir']].forEach(function (o) {
      var inp = h('input', { type: 'radio', name: b.id + '-self', value: o[0] });
      if (st.self === o[0]) inp.checked = true;
      inp.addEventListener('change', function () { st.self = o[0]; Store.save(); });
      ch.appendChild(h('label', null, inp, h('span', { text: o[1] })));
    });
    fs.appendChild(ch); return fs;
  }
  function stem(t) { return norm(t).split(' ').map(function (w) { return w.replace(/(s|x)$/, ''); }).join(' '); }
  function kwEl(b, getText) {
    var wrap = h('div', { class: 'kw' }, h('span', { class: 'lab', text: 'Mots-clés à utiliser :' }));
    var chips = (b.motsCles || []).map(function (k) {
      var label = Array.isArray(k) ? k[0] : k.split('|')[0];
      var alts = Array.isArray(k) ? k[1] : k.split('|');
      var c = h('span', { class: 'chip miss', text: label });
      c._label = label; c._alts = alts.map(stem);
      wrap.appendChild(c); return c;
    });
    function upd() {
      var t = stem(getText());
      chips.forEach(function (c) {
        var ok = c._alts.some(function (a) { return a && t.indexOf(a) >= 0; });
        c.className = 'chip ' + (ok ? 'ok' : 'miss'); c.textContent = (ok ? '✔ ' : '') + c._label;
      });
    }
    upd(); return { el: wrap, upd: upd };
  }
  function checklist(b, st) {
    if (!b.checklist) return null;
    st.cl = st.cl || [];
    var ul = h('ul', { class: 'cl', 'aria-label': b.clt || 'Je vérifie ma réponse' });
    b.checklist.forEach(function (t, i) {
      var inp = h('input', { type: 'checkbox' }); inp.checked = !!st.cl[i];
      inp.addEventListener('change', function () { st.cl[i] = inp.checked; Store.save(); });
      ul.appendChild(h('li', null, h('label', null, inp, h('span', { html: t }))));
    });
    return h('div', null, h('h4', { text: b.clt || 'Je vérifie ma réponse', style: 'margin:8px 0 2px' }), ul);
  }

  /* ---------- Réponse rédigée ---------- */
  function ouvert(b) {
    var st = Store.block(b.id);
    var box = h('section', { class: 'bloc act', 'data-bid': b.id });
    head(b).forEach(function (x) { box.appendChild(x); });
    if (b.q) box.appendChild(h('p', { html: b.q }));
    var ta = h('textarea', { 'aria-label': 'Ma réponse', rows: b.lignes || 5, placeholder: 'Écrivez votre réponse ici…' });
    ta.value = st.t || '';
    var kw = b.motsCles ? kwEl(b, function () { return ta.value; }) : null;
    ta.addEventListener('input', function () { st.t = ta.value; Store.save(); if (kw) kw.upd(); });
    if (kw) box.appendChild(kw.el);
    box.appendChild(ta);
    var cl = checklist(b, st); if (cl) box.appendChild(cl);
    var mod = h('div', { class: 'modele', hidden: !st.rev }, h('h4', { text: b.mt || 'Réponse attendue' }), h('div', { html: b.modele }));
    var self = selfEval(b, st); self.hidden = !st.rev;
    var msg = h('p', { class: 'res part', role: 'status', 'aria-live': 'polite' });
    var syn = !!b.bilan;
    var W = b.mot || 'synthèse', WC = W.charAt(0).toUpperCase() + W.slice(1);
    var bt = h('button', { type: 'button', class: 'btn', onclick: function () {
      if (syn) {
        var w = norm(ta.value).split(' ').filter(Boolean).length;
        if (w < MIN_MOTS_SYNTHESE) { msg.className = 'res part'; msg.textContent = 'Votre ' + W + ' est encore trop courte (' + w + ' mot' + (w > 1 ? 's' : '') + ' sur ' + MIN_MOTS_SYNTHESE + ' au minimum). Rédigez-la avec vos propres phrases, puis validez-la : ' + (b.gate || 'la réponse attendue') + ' s\'affichera.'; return; }
      } else if (norm(ta.value).length < 8) { msg.textContent = 'Écrivez d\'abord votre réponse, même courte : vous pourrez ensuite la comparer à la réponse attendue.'; return; }
      st.rev = true; Store.save(); mod.hidden = false; self.hidden = false; bt.hidden = true; if (hint) hint.hidden = true;
      if (syn) { msg.className = 'res ok'; msg.textContent = '✔ ' + WC + ' validée. Comparez-la avec ' + (b.gate || 'la réponse attendue') + ' ci-dessous.'; }
      else msg.textContent = '';
      mod.scrollIntoView({ block: 'start', behavior: 'auto' });
      document.dispatchEvent(new CustomEvent('lms-validated', { detail: b.id }));
    } }, syn ? 'Valider ma ' + W : 'Voir la réponse attendue');
    if (st.rev) bt.hidden = true;
    var hint = syn ? h('p', { class: 'hint', hidden: !!st.rev, text: 'Quand votre ' + W + ' est rédigée, cliquez sur « Valider ma ' + W + ' » : ' + (b.gate || 'la réponse attendue') + ' s\'affichera pour que vous puissiez la comparer.' }) : null;
    if (hint) box.appendChild(hint);
    box.appendChild(h('div', { class: 'btns' }, bt)); box.appendChild(msg); box.appendChild(mod); box.appendChild(self);
    return box;
  }

  /* ---------- Tableau à compléter ---------- */
  function lab(b, ci) { return (b.head && ci > 0 && b.head[ci]) ? b.head[ci].replace(/<[^>]+>/g, '') : null; }
  function tableau(b) {
    var st = Store.block(b.id); st.c = st.c || {};
    var box = h('section', { class: 'bloc act', 'data-bid': b.id });
    head(b).forEach(function (x) { box.appendChild(x); });
    var t = h('table', { class: 'dt stack' + (b.cls ? ' ' + b.cls : '') });
    if (b.head) t.appendChild(h('thead', null, h('tr', null, b.head.map(function (x) { return h('th', { scope: 'col', html: x }); }))));
    var tb = h('tbody');
    b.rows.forEach(function (row, ri) {
      tb.appendChild(h('tr', null, row.map(function (cell, ci) {
        if (cell !== null) return h(ci === 0 ? 'th' : 'td', { scope: ci === 0 ? 'row' : null, 'data-label': lab(b, ci), html: cell });
        var key = ri + '-' + ci;
        var ta = h('textarea', { rows: 3, style: 'min-height:90px;min-width:160px', 'aria-label': 'Ma réponse, ligne ' + (ri + 1) + ', colonne ' + (ci + 1) });
        ta.value = st.c[key] || '';
        ta.addEventListener('input', function () { st.c[key] = ta.value; Store.save(); });
        return h('td', { 'data-label': (b.head && b.head[ci]) ? b.head[ci].replace(/<[^>]+>/g, '') : null }, ta);
      })));
    });
    t.appendChild(tb); box.appendChild(h('div', { class: 'tscroll' }, t));
    var mt = h('table', { class: 'dt stack' + (b.cls ? ' ' + b.cls : '') });
    if (b.head) mt.appendChild(h('thead', null, h('tr', null, b.head.map(function (x) { return h('th', { scope: 'col', html: x }); }))));
    mt.appendChild(h('tbody', null, b.modele.map(function (row) { return h('tr', null, row.map(function (c, ci) { return h(ci === 0 ? 'th' : 'td', { 'data-label': lab(b, ci), html: c }); })); })));
    var mod = h('div', { class: 'modele', hidden: !st.rev }, h('h4', { text: b.mt || 'Réponse attendue' }), b.pre ? h('div', { class: 'pre', html: b.pre }) : null, h('div', { class: 'tscroll' }, mt), b.plus ? h('div', { class: 'plus', html: b.plus }) : null);
    var self = selfEval(b, st); self.hidden = !st.rev;
    var msg = h('p', { class: 'res part', role: 'status', 'aria-live': 'polite' });
    var bt = h('button', { type: 'button', class: 'btn', onclick: function () {
      var filled = Object.keys(st.c).some(function (k) { return norm(st.c[k]).length > 1; });
      if (!filled) { msg.textContent = 'Remplissez d\'abord le tableau, même en partie : vous pourrez ensuite le comparer à la réponse attendue.'; return; }
      msg.textContent = ''; st.rev = true; Store.save(); mod.hidden = false; self.hidden = false; bt.hidden = true;
      mod.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    } }, 'Voir la réponse attendue');
    if (st.rev) bt.hidden = true;
    box.appendChild(h('div', { class: 'btns' }, bt)); box.appendChild(msg); box.appendChild(mod); box.appendChild(self);
    return box;
  }

  /* ---------- blocs de lecture ---------- */
  function table(b) {
    var t = h('table', { class: 'dt' });
    if (b.cap) t.appendChild(h('caption', { text: b.cap }));
    if (b.head) t.appendChild(h('thead', null, h('tr', null, b.head.map(function (x) { return h('th', { scope: 'col', html: x }); }))));
    t.appendChild(h('tbody', null, b.rows.map(function (r) { return h('tr', null, r.map(function (c, i) { return h(i === 0 ? 'th' : 'td', { scope: i === 0 ? 'row' : null, html: c }); })); })));
    return h('div', { class: 'bloc tscroll' }, t);
  }
  function list(b) {
    function build(items, tag) {
      return h(tag, null, items.map(function (it) {
        if (typeof it === 'string') return h('li', { html: it });
        var li = h('li', { html: it.x }); if (it.sub) li.appendChild(build(it.sub, tag)); return li;
      }));
    }
    var l = build(b.items, b.t === 'ol' ? 'ol' : 'ul'); l.className = 'bloc'; return l;
  }
  function img(b) {
    var im = h('img', { src: b.src, alt: b.alt || '', loading: 'lazy' });
    var open = function () { if (window.LB) window.LB.open(b.src, b.alt || ''); };
    im.addEventListener('click', open);
    var fig = h('figure', { class: 'fig bloc' }, im);
    if (b.cap) fig.appendChild(h('figcaption', { html: b.cap }));
    fig.appendChild(h('div', { class: 'zoom', style: 'text-align:center' }, h('button', { type: 'button', class: 'btn sec', onclick: open }, '🔍 Voir en grand')));
    if (!b.txt) return fig;
    var wrap = h('div', { class: 'bloc' }, fig);
    wrap.appendChild(h('details', { class: 'det' }, h('summary', { text: 'Version texte de ce document (pour lire sans l\'image)' }), h('div', { class: 'imgtxt', html: b.txt })));
    return wrap;
  }
  function video(b) {
    var body = [h('h3', { text: b.titre }), b.x ? h('p', { html: b.x }) : null];
    if (b.url) {
      var links = [h('a', { class: 'btn', href: b.url, target: '_blank', rel: 'noopener' }, 'Ouvrir la vidéo (nouvel onglet) ↗')];
      if (b.url2) links.push(h('a', { class: 'btn sec', href: b.url2, target: '_blank', rel: 'noopener' }, (b.lab2 || 'Autre lien') + ' ↗'));
      body.push(h('div', { class: 'btns' }, links));
    }
    else body.push(h('p', { class: 'hint', text: 'Le lien de cette vidéo sera ajouté par votre enseignant. En attendant, appuyez-vous sur le texte et sur le cours.' }));
    return h('div', { class: 'vid bloc' }, h('div', { class: 'pl', 'aria-hidden': 'true', text: '▶' }), h('div', null, body));
  }
  function doc(b) {
    return h('div', { class: 'docbox bloc' }, b.titre ? h('h3', { class: b.icon ? 'dh' : null, style: 'margin-top:0' }, b.icon ? h('img', { class: 'doc-ic', src: b.icon, alt: '', width: 32, height: 32 }) : null, b.titre) : null, h('blockquote', { html: b.html }),
      b.src ? h('p', { class: 'hint', html: b.src }) : null);
  }
  function note(b) { return h('div', { class: 'note bloc' }, b.icon ? h('img', { class: 'note-ic', src: b.icon, alt: '', width: 32, height: 32 }) : null, h('b', { class: 'nt', text: (b.titre || 'Remarque') + ' · ' }), h('span', { html: b.x })); }
  function essentiel(b) {
    return h('section', { class: 'essentiel bloc', 'aria-label': 'L\'essentiel' }, h('h3', { text: b.titre || 'L\'essentiel à retenir' }),
      h('ul', null, b.items.map(function (x) { return h('li', { html: x }); })));
  }
  function details(b) {
    var d = h('details', { class: 'bloc det' }, h('summary', { text: b.titre }));
    (b.blocks || []).forEach(function (x) { d.appendChild(render(x)); });
    return d;
  }
  var ANS = { v: 'Vrai', f: 'Faux', n: 'Je ne sais pas' };
  function ipsative(b) {
    var wrap = h('div', { class: 'bloc' });
    var src = (window.LMS.diag.blocks.filter(function (x) { return x.t === 'vf'; })[0]) || { items: [] };
    var b2 = { t: 'vf', id: 'diag2', titre: b.titre, consigne: b.consigne, items: src.items };
    wrap.appendChild(vf(b2));
    var holder = h('div');
    wrap.appendChild(holder);
    function draw() {
      holder.innerHTML = '';
      var s1 = Store.S.blocks['diag'] || {}, s2 = Store.S.blocks['diag2'] || {};
      if (!s2.chk) return;
      var rows = src.items.map(function (it, i) {
        var good = it.a ? 'v' : 'f';
        var a1 = s1.a ? s1.a[i] : null, a2 = s2.a[i];
        return h('tr', null, h('th', { scope: 'row', text: String(i + 1) }),
          h('td', { text: a1 ? ANS[a1] + (a1 === good ? ' ✔' : ' ✘') : '—' }),
          h('td', { text: ANS[a2] + (a2 === good ? ' ✔' : ' ✘') }),
          h('td', { text: ANS[good] }));
      });
      var n1 = 0, n2 = 0;
      src.items.forEach(function (it, i) { var g = it.a ? 'v' : 'f'; if (s1.a && s1.a[i] === g) n1++; if (s2.a[i] === g) n2++; });
      holder.appendChild(h('h3', { text: 'Ma progression' }));
      holder.appendChild(h('div', { class: 'tscroll' }, h('table', { class: 'dt' },
        h('caption', { text: 'Mes réponses avant et après la séquence' }),
        h('thead', null, h('tr', null, ['N°', 'Au début', 'Maintenant', 'Bonne réponse'].map(function (x) { return h('th', { scope: 'col', text: x }); }))),
        h('tbody', null, rows))));
      holder.appendChild(h('p', { class: 'res ok', role: 'status', text: s1.chk ? ('Au début : ' + n1 + ' / ' + src.items.length + ' · Maintenant : ' + n2 + ' / ' + src.items.length) : ('Maintenant : ' + n2 + ' / ' + src.items.length + ' (vous n\'aviez pas fait le diagnostic du début)') }));
    }
    function onChk(e) { if (!document.body.contains(wrap)) { document.removeEventListener('lms-checked', onChk); return; } if (e.detail === 'diag2') draw(); }
    document.addEventListener('lms-checked', onChk);
    draw();
    return wrap;
  }
  /* ---------- contexte (séquence ou séance) ---------- */
  function contexte(b) {
    var box = h('section', { class: 'ctx bloc', 'aria-label': b.titre });
    if (b.icon) box.appendChild(h('img', { class: 'ctx-ic', src: b.icon, alt: '', width: 64, height: 64 }));
    box.appendChild(h('div', { class: 'ctx-b' }, b.noTitle ? null : h('h2', { class: 'ctx-t', text: b.titre }), h('div', { class: 'ctx-x', html: b.x })));
    return box;
  }
  /* ---------- « J'ai fait » : l'élève déclare avoir réalisé sa synthèse visuelle ; la proposition de l'enseignant apparaît ---------- */
  function fait(b) {
    var st = Store.block(b.id);
    var box = h('section', { class: 'bloc act fait', 'data-bid': b.id });
    var inp = h('input', { type: 'checkbox', id: 'f-' + b.id });
    inp.checked = !!st.rev; inp.disabled = !!st.rev;
    var msg = h('p', { class: 'res ok', role: 'status', 'aria-live': 'polite' });
    if (st.rev) msg.textContent = '✔ Synthèse réalisée. Vous pouvez la comparer avec celle de votre enseignant ci-dessous.';
    inp.addEventListener('change', function () {
      if (!inp.checked) return;
      st.rev = true; Store.save(); inp.disabled = true;
      msg.textContent = '✔ Bravo ! Comparez maintenant votre synthèse avec celle de votre enseignant, juste en dessous.';
      document.dispatchEvent(new CustomEvent('lms-validated', { detail: b.id }));
      var g = box.parentNode && box.parentNode.querySelector('.gated');
      if (g) { try { g.scrollIntoView({ block: 'start', behavior: 'auto' }); } catch (e) { } }
    });
    box.appendChild(h('label', { class: 'fait-l', for: 'f-' + b.id }, inp, h('span', { text: b.label })));
    box.appendChild(msg);
    return box;
  }
  function cours(b) {
    var d = h('div', { class: 'cours' });
    b.blocks.forEach(function (x) { d.appendChild(render(x)); });
    return d;
  }

  function render(b) {
    switch (b.t) {
      case 'h3': return h('h3', { text: b.x });
      case 'h2': return h('h2', { text: b.x });
      case 'p': return h('p', { html: b.x, class: b.c || null });
      case 'ul': case 'ol': return list(b);
      case 'note': return note(b);
      case 'table': return table(b);
      case 'img': return img(b);
      case 'video': return video(b);
      case 'doc': return doc(b);
      case 'essentiel': return essentiel(b);
      case 'cours': return cours(b);
      case 'contexte': return contexte(b);
      case 'fait': return fait(b);
      case 'details': return details(b);
      case 'ipsative': return ipsative(b);
      case 'vf': return vf(b);
      case 'relier': return relier(b);
      case 'trous': return trous(b);
      case 'ordre': return ordre(b);
      case 'tri': return tri(b);
      case 'qcm': return qcm(b);
      case 'ouvert': return ouvert(b);
      case 'tableau': return tableau(b);
      default: return h('p', { text: '[bloc inconnu : ' + b.t + ']' });
    }
  }

  window.Blocks = { modLabel: modLabel, level: level, render: render, isInteractive: isInteractive, isDone: isDone, scoreOf: scoreOf, collect: collect, AUTO: AUTO, OPEN: OPEN };
})();
