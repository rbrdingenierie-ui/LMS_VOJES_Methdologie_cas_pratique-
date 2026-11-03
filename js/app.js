/* Navigation, pages, accessibilité, bilan. */
(function () {
  'use strict';
  var h = U.h, esc = U.esc, norm = U.norm;
  var L = window.LMS, S = Store.S;
  var main = document.getElementById('main');
  var navEl = document.getElementById('nav');
  var sideEl = document.getElementById('side');
  var lastRoute = '';

  /* ---------- progression ---------- */
  function key(n, k) { return 's' + n + '/' + k; }
  function stepDone(n, k) { return !!Store.S.steps[key(n, k)]; }
  function modProg(m) {
    var d = 0; m.steps.forEach(function (s, i) { if (stepDone(m.n, i + 1)) d++; });
    return { done: d, total: m.steps.length, pct: m.steps.length ? Math.round(100 * d / m.steps.length) : 0 };
  }
  /* l'Arcade se débloque quand toutes les étapes des modules sont terminées */
  function courseCount() {
    var d = 0, t = 0;
    L.modules.forEach(function (m) { var p = modProg(m); d += p.done; t += p.total; });
    return { done: d, total: t };
  }
  function courseDone() { var c = courseCount(); return c.total > 0 && c.done === c.total; }
  /* étapes verrouillées : on ne passe à l'étape suivante qu'une fois l'étape précédente terminée */
  var lockNotice = '';
  function prevOf(n, k) { if (k > 1) return { n: n, k: k - 1 }; var pm = mod(n - 1); return pm ? { n: pm.n, k: pm.steps.length } : null; }
  function unlocked(n, k) { var p = prevOf(n, k); return !p || stepDone(p.n, p.k); }
  function firstOpen() {
    for (var i = 0; i < L.modules.length; i++) for (var k = 1; k <= L.modules[i].steps.length; k++) if (!stepDone(L.modules[i].n, k)) return { n: L.modules[i].n, k: k };
    return null;
  }
  function allBlocks(blocks) { var a = []; Blocks.collect(blocks, function (b) { a.push(b); }); return a; }
  function activities(st) { return allBlocks(st.blocks).filter(Blocks.isInteractive); }
  function modScore(m) {
    var sc = 0, mx = 0;
    m.steps.forEach(function (s) { allBlocks(s.blocks).forEach(function (b) { var r = Blocks.scoreOf(b); if (r) { sc += r.sc; mx += r.mx; } }); });
    return { sc: sc, mx: mx };
  }
  // résultats du quiz final, module par module (null tant que le quiz n'est pas corrigé)
  function quizMods() { var s = Store.S.blocks['quiz']; return s && s.chk && s.mods ? s.mods : null; }
  /* ---------- badges ---------- */
  function badgeList() { return (L.meta && L.meta.badges) || []; }
  function badgeEarned(b) {
    switch (b.type) {
      case 'diag': return !!blockScore('diag');
      case 'diag2': return !!blockScore('diag2');
      case 'module': { var m = mod(b.n); if (!m) return false; var p = modProg(m); return p.total > 0 && p.done === p.total; }
      case 'parcours': return courseDone();
      case 'maitrise': { var qm = quizMods(); return !!(qm && qm[b.n] && Blocks.level(qm[b.n].sc, qm[b.n].mx).k === 'ok'); }
      case 'parfait': { var q = blockScore('quiz'); return !!(q && q.mx && q.sc === q.mx); }
      case 'sansfaute': {
        var ok = false;
        L.modules.forEach(function (m) { m.steps.forEach(function (s) { allBlocks(s.blocks).forEach(function (x) { var r = Blocks.scoreOf(x); if (r && r.mx > 0 && r.sc === r.mx) ok = true; }); }); });
        return ok;
      }
    }
    return false;
  }
  // un badge gagné le reste : on retient ceux déjà annoncés (Store.S.badges)
  function hasBadge(b) { var g = Store.S.badges; return !!(g && g[b.id]) || badgeEarned(b); }
  function badgeCount() { var n = 0; badgeList().forEach(function (b) { if (hasBadge(b)) n++; }); return n; }
  var toastTimer = null;
  function showToast(fresh) {
    var box = document.getElementById('toast'); if (!box) return;
    box.innerHTML = '';
    var txt = fresh.length === 1
      ? h('span', null, '🏅 Nouveau badge : ', h('b', { text: fresh[0].titre }))
      : h('span', null, '🏅 ' + fresh.length + ' nouveaux badges : ', h('b', { text: fresh.map(function (b) { return b.titre; }).join(' · ') }));
    box.appendChild(txt);
    box.appendChild(h('a', { href: '#/badges', onclick: function () { box.hidden = true; } }, 'Voir mes badges'));
    box.appendChild(h('button', { type: 'button', class: 'tclose', 'aria-label': 'Fermer ce message', onclick: function () { box.hidden = true; } }, '×'));
    box.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { box.hidden = true; }, 9000);
  }
  var checking = false;
  function checkBadges() {
    if (checking || !window.LMS || !badgeList().length) return;
    checking = true;
    try {
      var S2 = Store.S, earned = badgeList().filter(badgeEarned);
      if (!S2.badges) {           // première fois (ou ancienne sauvegarde) : on enregistre l'existant sans fête
        S2.badges = {}; earned.forEach(function (b) { S2.badges[b.id] = 1; }); Store.save(); refreshBadgeUI(); return;
      }
      var fresh = earned.filter(function (b) { return !S2.badges[b.id]; });
      if (fresh.length) { fresh.forEach(function (b) { S2.badges[b.id] = 1; }); Store.save(); refreshBadgeUI(); showToast(fresh); }
    } finally { checking = false; }
  }
  function refreshBadgeUI() {
    buildNav();
    var n = document.getElementById('bdgCount'); if (n) n.textContent = badgeCount() + ' sur ' + badgeList().length;
  }
  /* ---------- XP (points d'expérience) : 1 bonne réponse à un exercice corrigé automatiquement = 1 XP ;
     le meilleur résultat de chaque exercice est conservé, donc l'XP ne baisse jamais (même en recommençant) ---------- */
  var XPMAP = null;
  function xpMap() {
    if (XPMAP) return XPMAP;
    var m = {};
    function maxOf(b) {
      if (b.t === 'trous') { var n = 0, re = /\[\[(.+?)\]\]/g; while (re.exec(b.texte || '')) n++; return n; }
      return (b.items || []).length;
    }
    function scan(blocks) {
      allBlocks(blocks).forEach(function (b) {
        if (Blocks.AUTO[b.t] && b.id) m[b.id] = maxOf(b);
        else if (b.t === 'ipsative') { var d = ((L.diag && L.diag.blocks) || []).filter(function (x) { return x.t === 'vf'; })[0]; m.diag2 = d ? d.items.length : 0; }
      });
    }
    if (L.diag) scan(L.diag.blocks);
    if (L.quiz) scan(L.quiz.blocks);
    L.modules.forEach(function (mm) { mm.steps.forEach(function (st) { scan(st.blocks); }); });
    return (XPMAP = m);
  }
  function xpTotals() {
    var m = xpMap(), best = Store.S.xp || {}, xp = 0, mx = 0;
    Object.keys(m).forEach(function (id) { mx += m[id]; xp += Math.min(best[id] || 0, m[id]); });
    return { xp: xp, mx: mx };
  }
  var xpChip = null, xpTimer = null;
  function xpPaint(gain) {
    var t = xpTotals();
    if (!xpChip) {
      var anchor = document.getElementById('menuBtn') || document.getElementById('a11yBtn');
      if (!anchor) return;
      xpChip = h('span', { class: 'tb-xp', id: 'xpChip', role: 'status', 'aria-live': 'polite', title: 'Points d\'expérience (XP) : 1 bonne réponse à un exercice corrigé automatiquement = 1 XP. L\'XP ne baisse jamais.' },
        h('span', { 'aria-hidden': 'true', text: '⭐' }), ' ', h('b', { id: 'xpNum' }), ' ', h('span', { class: 'sr', text: 'points d\'expérience' }), h('span', { 'aria-hidden': 'true', class: 'xp-u', text: 'XP' }),
        h('span', { class: 'xp-gain', id: 'xpGain', 'aria-hidden': 'true' }));
      anchor.parentNode.insertBefore(xpChip, anchor);
    }
    document.getElementById('xpNum').textContent = String(t.xp);
    if (gain > 0) {
      var g = document.getElementById('xpGain');
      g.textContent = '+' + gain; g.classList.remove('on'); xpChip.classList.remove('pop'); void g.offsetWidth;
      g.classList.add('on'); xpChip.classList.add('pop');
      clearTimeout(xpTimer); xpTimer = setTimeout(function () { g.classList.remove('on'); xpChip.classList.remove('pop'); }, 1900);
    }
  }
  function xpTick() {
    var S2 = Store.S, first = !S2.xp;
    if (first) S2.xp = {};
    var m = xpMap(), changed = false, gain = 0;
    Object.keys(m).forEach(function (id) {
      var st = S2.blocks[id];
      if (st && st.chk) {
        var sc = Math.max(0, Math.min(st.sc || 0, m[id])), prev = S2.xp[id] || 0;
        if (sc > prev) { S2.xp[id] = sc; gain += sc - prev; changed = true; }
      }
    });
    if (changed) Store.save();
    xpPaint(first ? 0 : gain);   // première lecture d'une sauvegarde : on enregistre l'existant sans animation
  }
  function xpHome() {
    var hs = location.hash || '#/';
    if (hs !== '#/' && hs !== '#') return;
    if (main.querySelector('#xpCard')) return;
    var t = xpTotals(), pct = t.mx ? Math.round(100 * t.xp / t.mx) : 0;
    var title = h('h2', { text: 'Mes points d\'expérience (XP)' });
    var card = h('div', { class: 'card', id: 'xpCard' },
      h('p', { class: 'xp-big' }, h('b', { text: String(t.xp) }), ' XP ', h('span', { class: 'xp-of', text: 'sur ' + t.mx + ' possibles' })),
      h('div', { class: 'prog', role: 'img', 'aria-label': t.xp + ' XP sur ' + t.mx + ' possibles' }, h('i', { style: 'width:' + pct + '%' })),
      h('p', { class: 'hint', text: 'Chaque bonne réponse à un exercice corrigé automatiquement (diagnostic, exercices, quiz final) rapporte 1 XP. L\'XP ne baisse jamais : le meilleur résultat de chaque exercice est conservé, même en recommençant. Les réponses rédigées, que l\'on compare à la réponse attendue, ne rapportent pas d\'XP.' }));
    var anchor = null;
    Array.prototype.forEach.call(main.querySelectorAll('h2'), function (x) { if (!anchor && /^Mes badges/.test(x.textContent)) anchor = x; });
    if (anchor) { anchor.parentNode.insertBefore(title, anchor); anchor.parentNode.insertBefore(card, anchor); }
    else { main.appendChild(title); main.appendChild(card); }
  }
  function xpBilan() {
    if ((location.hash || '') !== '#/bilan') return;
    var tb = null;
    Array.prototype.forEach.call(main.querySelectorAll('table.dt caption'), function (c) { if (!tb && /points/i.test(c.textContent)) tb = c.parentNode.querySelector('tbody'); });
    if (!tb || tb.querySelector('.xp-row')) return;
    var t = xpTotals();
    tb.appendChild(h('tr', { class: 'xp-row' }, h('th', { scope: 'row', text: 'Points d\'expérience (XP)' }), h('td', { class: 'num', text: '—' }), h('td', { class: 'num', text: t.xp + ' / ' + t.mx })));
  }
  function xpBilanLine() { var t = xpTotals(); return 'Points d\'expérience (XP) : ' + t.xp + ' / ' + t.mx; }
  /* ---------- relevé du temps passé : compté sur les pages d'un module, du diagnostic et du quiz, tant que la page est visible
     et active (pause après 3 min sans action : clic, frappe, défilement, toucher) ; enregistré sur l'appareil, repris dans le bilan ---------- */
  var tpsLast = Date.now(), tpsPrev = Date.now(), tpsDirty = false, tpsSaved = Date.now();
  function tpsIdle() { return ((L.meta && L.meta.inactiviteSec) || 180) * 1000; }
  function tpsKey() {
    var hs = location.hash || '#/', m = hs.match(/^#\/m\/(\d+)/);
    if (m) return 'm' + m[1];
    if (/^#\/diag/.test(hs)) return 'diag';
    if (/^#\/quiz/.test(hs)) return 'quiz';
    return null;
  }
  ['pointerdown', 'keydown', 'scroll', 'touchstart', 'mousemove', 'input', 'click'].forEach(function (ev) {
    document.addEventListener(ev, function () { tpsLast = Date.now(); }, { passive: true, capture: true });
  });
  function tpsSave() { if (tpsDirty) { tpsDirty = false; tpsSaved = Date.now(); Store.save(); } }
  function tpsTick() {
    var now = Date.now(), dt = Math.min(now - tpsPrev, 2500) / 1000;   // un écart plus grand = ordinateur en veille : on ne le compte pas
    tpsPrev = now;
    var k = tpsKey();
    if (k && document.visibilityState === 'visible' && now - tpsLast <= tpsIdle()) {
      var S2 = Store.S; if (!S2.time) S2.time = {};
      S2.time[k] = Math.round(((S2.time[k] || 0) + dt) * 10) / 10; tpsDirty = true;
    }
    if (tpsDirty && now - tpsSaved >= 5000) tpsSave();
  }
  setInterval(tpsTick, 1000);
  document.addEventListener('visibilitychange', function () { tpsPrev = Date.now(); if (document.visibilityState === 'hidden') tpsSave(); });
  window.addEventListener('pagehide', tpsSave);
  function tpsSec(k) { var t = Store.S.time; return (t && t[k]) || 0; }
  function tpsMin(sec) { return Math.round(sec / 60); }
  function tpsFmtMin(min) { return min < 60 ? min + ' min' : Math.floor(min / 60) + ' h ' + ('0' + (min % 60)).slice(-2); }
  function tpsFmt(sec) { if (!sec) return '—'; var mn = tpsMin(sec); return mn < 1 ? 'moins d\'1 min' : tpsFmtMin(mn); }
  function tpsKeys() { var a = []; (L.modules || []).forEach(function (m) { a.push('m' + m.n); }); a.push('diag'); a.push('quiz'); return a; }
  function tpsTotalMin() { var t = 0; tpsKeys().forEach(function (k) { t += tpsMin(tpsSec(k)); }); return t; }
  function tpsLabel(m) { return (m.lib || ('Module ' + m.n)) + ' — ' + m.titre; }
  function tpsModule() {
    var m = (location.hash || '').match(/^#\/m\/(\d+)$/);
    if (!m || main.querySelector('#tpsMod')) return;
    var anchor = main.querySelector('p.duree') || main.querySelector('p.lead');
    if (!anchor) return;
    var p = h('p', { class: 'duree tps', id: 'tpsMod' }, '⏱ Temps déjà passé ici : ', h('b', { text: tpsFmt(tpsSec('m' + m[1])) }), ' (mesuré tant que la page est ouverte et active).');
    anchor.parentNode.insertBefore(p, anchor.nextSibling);
  }
  function tpsHome() {
    var hs = location.hash || '#/';
    if (hs !== '#/' && hs !== '#') return;
    (L.modules || []).forEach(function (m) {
      var sec = tpsSec('m' + m.n), card = main.querySelector('a.mcard.m' + m.n);
      if (!card || card.querySelector('.tps')) return;
      var p = h('p', { class: 'duree tps' }, '⏱ Temps passé : ', h('b', { text: tpsFmt(sec) }));
      var anchor = card.querySelector('p.duree') || card.querySelector('h3 + p') || card.querySelector('h3');
      if (anchor) anchor.parentNode.insertBefore(p, anchor.nextSibling);
    });
  }
  function tpsBilan() {
    if ((location.hash || '') !== '#/bilan') return;
    var table = null;
    Array.prototype.forEach.call(main.querySelectorAll('table.dt caption'), function (c) { if (!table && /points/i.test(c.textContent)) table = c.parentNode; });
    if (!table || table.querySelector('.tps-col')) return;
    var head = table.querySelector('thead tr'), body = table.querySelector('tbody');
    if (!head || !body) return;
    head.appendChild(h('th', { scope: 'col', class: 'num tps-col', text: 'Temps passé' }));
    var rows = Array.prototype.filter.call(body.querySelectorAll('tr'), function (r) { return !r.classList.contains('sub') && !r.classList.contains('xp-row'); });
    var mods = L.modules || [], used = {};
    Array.prototype.forEach.call(body.querySelectorAll('tr'), function (r) {
      var th = r.querySelector('th'), txt = th ? th.textContent : '', val = '—';
      if (!r.classList.contains('sub') && !r.classList.contains('xp-row')) {
        if (r === rows[0]) val = tpsFmt(tpsSec('diag'));
        else if (/^Quiz final$/.test(txt.trim())) val = tpsFmt(tpsSec('quiz'));
        else mods.forEach(function (m) { if (!used[m.n] && txt.indexOf(m.titre) >= 0) { used[m.n] = 1; val = tpsFmt(tpsSec('m' + m.n)); } });
      }
      r.appendChild(h('td', { class: 'num tps-col', text: val }));
    });
    body.appendChild(h('tr', { class: 'tps-total' }, h('th', { scope: 'row', text: 'Temps total passé sur le cours' }), h('td', { class: 'num', text: '—' }), h('td', { class: 'num', text: '—' }), h('td', { class: 'num tps-col', text: tpsFmtMin(tpsTotalMin()) })));
    var wrap = table.parentNode;
    wrap.parentNode.insertBefore(h('p', { class: 'hint tps-note', text: 'Le temps est compté tant que la page d\'un module, du diagnostic ou du quiz est ouverte et active : il se met en pause quand l\'onglet est caché ou après 3 minutes sans aucune action (clic, frappe, défilement). C\'est une mesure approximative, enregistrée sur cet appareil.' }), wrap.nextSibling);
  }
  function tpsLines() {
    var out = ['', 'TEMPS PASSÉ (page ouverte et active ; mesure approximative)'];
    (L.modules || []).forEach(function (m) { out.push('   ' + tpsLabel(m) + ' : ' + tpsFmt(tpsSec('m' + m.n))); });
    out.push('   ' + ((L.diag && L.diag.titre) || 'Diagnostic') + ' : ' + tpsFmt(tpsSec('diag')));
    out.push('   Quiz final : ' + tpsFmt(tpsSec('quiz')));
    out.push('   Temps total : ' + tpsFmtMin(tpsTotalMin()));
    return out;
  }
  new MutationObserver(function () { xpHome(); xpBilan(); tpsHome(); tpsModule(); tpsBilan(); }).observe(main, { childList: true });
  Store.onSave = function () { checkBadges(); xpTick(); };
  xpTick();

  function blockScore(id) { var s = Store.S.blocks[id]; return s && s.chk ? { sc: s.sc || 0, mx: s.mx || 0 } : null; }

  /* ---------- accessibilité ---------- */
  var speakTimer = null;
  function applyA11y() {
    var a = Store.S.a11y, b = document.body;
    b.classList.toggle('a11y-font', !!a.font);
    b.classList.toggle('a11y-contrast', !!a.contrast);
    b.classList.toggle('falc', !!a.falc);
    b.classList.toggle('anim-off', !!a.anim);
    document.documentElement.style.setProperty('--scale', String(1 + (a.size || 0) * 0.1));
    [['tgFont', 'font'], ['tgContrast', 'contrast'], ['tgFalc', 'falc'], ['tgRead', 'read'], ['tgAnim', 'anim']].forEach(function (p) {
      var el = document.getElementById(p[0]); if (el) el.setAttribute('aria-pressed', a[p[1]] ? 'true' : 'false');
    });
    if (!a.read && window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (e) { } }
  }
  function initA11y() {
    var panel = document.getElementById('a11yPanel'), btn = document.getElementById('a11yBtn');
    btn.addEventListener('click', function () {
      var open = panel.hidden; panel.hidden = !open; btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    [['tgFont', 'font'], ['tgContrast', 'contrast'], ['tgFalc', 'falc'], ['tgRead', 'read'], ['tgAnim', 'anim']].forEach(function (p) {
      document.getElementById(p[0]).addEventListener('click', function () {
        Store.S.a11y[p[1]] = !Store.S.a11y[p[1]]; Store.save(); applyA11y();
      });
    });
    function size(d) { var a = Store.S.a11y; a.size = Math.max(-1, Math.min(5, (d === 0 ? 0 : (a.size || 0) + d))); Store.save(); applyA11y(); }
    document.getElementById('szDown').addEventListener('click', function () { size(-1); });
    document.getElementById('szUp').addEventListener('click', function () { size(1); });
    document.getElementById('szReset').addEventListener('click', function () { size(0); });
    if (!window.speechSynthesis) {
      var r = document.getElementById('tgRead'); r.disabled = true; r.title = 'La lecture à voix haute n\'est pas disponible sur ce navigateur.';
    }
    // lecture au survol / au focus
    function speak(el) {
      if (!Store.S.a11y.read || !window.speechSynthesis || !el) return;
      var t = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
      if (!t) return; if (t.length > 450) t = t.slice(0, 450);
      clearTimeout(speakTimer);
      speakTimer = setTimeout(function () {
        try { window.speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = 'fr-FR'; window.speechSynthesis.speak(u); } catch (e) { }
      }, 250);
    }
    var SEL = 'p,li,h1,h2,h3,h4,legend,label,th,td,button,a,figcaption,summary,blockquote';
    main.addEventListener('mouseover', function (e) { var t = e.target.closest && e.target.closest(SEL); if (t) speak(t); });
    main.addEventListener('focusin', function (e) { var t = e.target.closest && e.target.closest(SEL); if (t) speak(t); });
    applyA11y();
  }

  /* ---------- visionneuse d'image ---------- */
  var lb = document.getElementById('lb'), lbBody = document.getElementById('lbBody'), lbImg = document.getElementById('lbImg');
  var lbFrom = null, blobs = {};
  /* image intégrée (data:) : les navigateurs refusent de l'ouvrir dans un onglet, on passe par un lien temporaire */
  function openHref(src) {
    if (src.indexOf('data:') !== 0) return src;
    if (blobs[src]) return blobs[src];
    try {
      var m = /^data:([^;,]+);base64,(.*)$/.exec(src), bin = atob(m[2]), a = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
      return (blobs[src] = URL.createObjectURL(new Blob([a], { type: m[1] })));
    } catch (e) { return src; }
  }
  window.LB = {
    open: function (src, alt) {
      lbFrom = document.activeElement; lbImg.src = src; lbImg.alt = alt || '';
      document.getElementById('lbOpen').href = openHref(src); lbBody.classList.add('fit');
      lb.classList.add('open'); document.body.style.overflow = 'hidden'; document.getElementById('lbClose').focus();
    },
    close: function () {
      lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.removeAttribute('src');
      if (lbFrom && lbFrom.focus) lbFrom.focus();
    }
  };
  document.getElementById('lbClose').addEventListener('click', LB.close);
  document.getElementById('lbFit').addEventListener('click', function () { lbBody.classList.toggle('fit'); });
  lbImg.addEventListener('click', function () { lbBody.classList.toggle('fit'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) LB.close(); });

  /* ---------- menu latéral ---------- */
  function buildNav() {
    navEl.innerHTML = '';
    var cur = location.hash || '#/';
    function item(href, cls, num, label, pct, locked, lockWhy, sr) {
      var a = h('a', { class: 'mi ' + cls + (locked ? ' lk' : ''), href: href }, h('span', { class: 'num', 'aria-hidden': 'true', text: num }),
        h('span', { class: 'mt' }, sr ? h('span', { class: 'sr', text: sr + ' : ' }) : null, label, locked ? h('span', { class: 'sr', text: ' (verrouillé : ' + (lockWhy || 'terminez la partie précédente') + ')' }) : null, locked ? h('span', { 'aria-hidden': 'true', text: ' 🔒' }) : null, pct != null ? h('span', { class: 'bar', 'aria-hidden': 'true' }, h('i', { style: 'width:' + pct + '%' })) : null));
      if (cur === href || (href !== '#/' && cur.indexOf(href + '/') === 0)) a.setAttribute('aria-current', 'page');
      return a;
    }
    navEl.appendChild(item('#/', 'm1', '⌂', 'Accueil'));
    navEl.appendChild(h('h2', { text: 'Pour commencer' }));
    var dd = blockScore('diag');
    navEl.appendChild(item('#/diag', 'mq', '?', L.diag.titre + (dd ? ' ✔' : ''), dd ? 100 : 0));
    navEl.appendChild(h('h2', { text: 'Le parcours' }));
    L.modules.forEach(function (m) {
      var p = modProg(m);
      navEl.appendChild(item('#/m/' + m.n, 'm' + m.n, String(m.num || m.n), m.court, p.pct, !unlocked(m.n, 1), null, m.lib));
    });
    navEl.appendChild(h('h2', { text: 'Pour finir' }));
    var qq = blockScore('quiz');
    navEl.appendChild(item('#/quiz', 'mq', '★', 'Quiz final' + (qq ? ' ✔' : ''), qq ? 100 : 0, !courseDone(), 'terminez d\'abord ' + L.meta.parcours));
    navEl.appendChild(item('#/badges', 'mq', '🏅', 'Mes badges (' + badgeCount() + '/' + badgeList().length + ')'));
    navEl.appendChild(item('#/bilan', 'mq', '✎', 'Mon bilan'));
  }
  document.getElementById('menuBtn').addEventListener('click', function () {
    var o = sideEl.classList.toggle('open'); this.setAttribute('aria-expanded', o ? 'true' : 'false');
  });

  /* ---------- utilitaires de vue ---------- */
  function mod(n) { for (var i = 0; i < L.modules.length; i++) if (L.modules[i].n === n) return L.modules[i]; return null; }
  function card(cls) { var c = h('div', { class: 'card ' + (cls || '') }); for (var i = 1; i < arguments.length; i++) if (arguments[i]) c.appendChild(arguments[i]); return c; }
  function progBar(p) { return h('div', null, h('div', { class: 'prog', role: 'img', 'aria-label': p.pct + ' % terminé' }, h('i', { style: 'width:' + p.pct + '%' })), h('div', { class: 'ptxt', text: p.done + ' étape' + (p.done > 1 ? 's' : '') + ' sur ' + p.total + ' terminée' + (p.done > 1 ? 's' : '') })); }
  function scoreTxt(r) { return r.mx ? (r.sc + ' / ' + r.mx) : '—'; }

  /* objectifs pédagogiques + savoirs associés, avec les deux pictogrammes du cours (décoratifs) */
  function objCol(titre, intro, items, ico, lvl) {
    return h('div', { class: 'ob' },
      h('div', { class: 'ob-h' }, ico ? h('img', { class: 'ob-ic', src: ico, alt: '', width: 56, height: 56, loading: 'lazy' }) : null, h(lvl || 'h2', { text: titre })),
      h('p', { text: intro }),
      h('ul', { class: 'objs' }, items.map(function (o) { return h('li', { html: o }); })));
  }
  function objSavoirs(de, objectifs, savoirs, lvl, savIntro) {
    var cols = [objCol('Objectifs pédagogiques', 'À la fin de ' + de + ', vous serez capable de :', objectifs, L.meta.icoObjectifs, lvl)];
    if (savoirs && savoirs.length) cols.push(objCol('Savoirs associés', 'À la fin de ' + de + ', ' + (savIntro || 'vous devrez savoir') + ' :', savoirs, L.meta.icoSavoirs, lvl));
    return h('div', { class: 'og' }, cols);
  }
  /* ---------- vue : accueil ---------- */
  function viewHome() {
    var out = [];
    var hero = h('section', { class: 'hero' },
      h('p', { class: 'kicker', style: 'color:#fff;opacity:.85', text: L.meta.sous }),
      h('h1', { text: L.meta.titre }),
      h('p', { class: 'lead', style: 'color:#E6ECF8', html: L.meta.accroche }),
      h('div', { class: 'btns' }, h('a', { class: 'btn', href: nextHref() }, nextLabel()), h('a', { class: 'btn sec', href: '#/bilan' }, 'Mon bilan')),
      h('p', { class: 'save', text: '💾 Votre travail est enregistré automatiquement sur cet appareil : vous pouvez fermer la page et reprendre plus tard.' }));
    out.push(hero);
    // même règle pour tous les titres de l'accueil : un titre de section (h2) hors cadre, puis le contenu dans un cadre
    if (L.meta.contexte) {
      out.push(h('h2', { text: L.meta.contexte.titre }));
      out.push(Blocks.render(Object.assign({}, L.meta.contexte, { noTitle: true })));
    }
    if (L.meta.objectifs) {
      out.push(h('h2', { text: 'Objectifs et savoirs' }));
      out.push(card('', objSavoirs('la séquence', L.meta.objectifs, L.meta.savoirs, 'h3', L.meta.savIntro || 'vous connaîtrez')));
    }
    // diagnostic
    var dd = blockScore('diag');
    out.push(h('h2', { text: 'Pour commencer' }));
    out.push(h('div', { class: 'mcards' }, h('a', { class: 'mcard mq', href: '#/diag' },
      h('div', { class: 'n', text: 'Avant de commencer · non noté' }), h('h3', { text: L.diag.titre }), h('p', { text: L.diag.court }),
      h('div', { class: 'ptxt', text: dd ? 'Fait ✔ — ' + scoreTxt(dd) : 'À faire (' + L.diag.blocks[0].items.length + ' affirmations' + (L.meta.dureeDiag ? ', environ ' + L.meta.dureeDiag : '') + ')' }))));
    out.push(h('h2', { text: 'Le parcours' }));
    if (L.meta.dureeTotale) out.push(h('p', { class: 'duree' }, '⏱ Le parcours représente environ ', h('b', { text: L.meta.dureeTotale }), ' de travail au total (durées prévues en classe, données à titre indicatif).'));
    out.push(h('div', { class: 'mcards' }, L.modules.map(function (m) {
      var p = modProg(m);
      return h('a', { class: 'mcard m' + m.n, href: '#/m/' + m.n }, h('div', { class: 'n', text: m.lib }), h('h3', { text: m.titre }), h('p', { text: m.accroche }),
        m.duree ? h('p', { class: 'duree' }, '⏱ Temps de travail : environ ' + m.duree) : null, progBar(p),
        unlocked(m.n, 1) ? null : h('div', { class: 'ptxt lockt', text: '🔒 Se débloque quand la partie précédente est terminée.' }));
    })));
    var qq = blockScore('quiz');
    out.push(h('h2', { text: 'Pour finir' }));
    out.push(h('div', { class: 'mcards' },
      h('a', { class: 'mcard mq', href: '#/quiz' }, h('div', { class: 'n', text: 'Quiz final' }), h('h3', { text: L.quiz.titre }), h('p', { text: L.quiz.court }), courseDone() ? h('div', { class: 'ptxt', text: qq ? 'Fait ✔ — ' + scoreTxt(qq) : 'À faire' }) : h('div', { class: 'ptxt lockt', text: '🔒 Se débloque quand vous avez terminé ' + L.meta.parcours + '.' })),
      h('a', { class: 'mcard mq', href: '#/bilan' }, h('div', { class: 'n', text: 'À rendre à votre enseignant' }), h('h3', { text: 'Mon bilan' }), h('p', { text: 'Récapitulatif de votre travail : étapes terminées, scores et compositions, à imprimer ou enregistrer.' }))));
    if (badgeList().length) {
      var earnedB = badgeList().filter(hasBadge);
      out.push(h('h2', { text: 'Mes badges' }));
      out.push(card('',
        h('p', null, 'Vous avez ', h('b', { id: 'bdgCount', text: earnedB.length + ' sur ' + badgeList().length }), ' badges.'),
        h('div', { class: 'bdg-strip', 'aria-hidden': 'true' }, badgeList().map(function (b) { return h('span', { class: 'bdg-mini ' + (hasBadge(b) ? 'on' : 'off'), text: b.ico }); })),
        h('p', null, h('a', { class: 'btn sec', href: '#/badges' }, 'Voir mes badges'))));
    }
    if (L.meta.arcade) {
      var cc = courseCount();
      out.push(h('h2', { text: 'Pour réviser en jouant' }));
      if (courseDone()) {
        out.push(card('', h('p', { class: 'res ok', text: '🎉 Vous avez terminé le parcours : l\'Arcade de Mnémosia est débloquée !' }), h('p', { html: L.meta.arcadeTexte }),
          h('p', null, h('a', { class: 'btn sec', href: L.meta.arcade, target: '_blank', rel: 'noopener' }, 'Ouvrir l\'Arcade de Mnémosia ↗'))));
      } else {
        out.push(card('', h('p', { html: L.meta.arcadeTexte }),
          h('p', null, h('span', { class: 'btn locked', 'aria-disabled': 'true', role: 'img', 'aria-label': 'Arcade verrouillée' }, '🔒 Arcade de Mnémosia')),
          h('p', { class: 'ptxt lockt', text: 'Elle se débloque quand vous avez terminé le parcours (' + cc.done + ' étape' + (cc.done > 1 ? 's' : '') + ' sur ' + cc.total + ' terminée' + (cc.done > 1 ? 's' : '') + ').' })));
      }
    }
    return out;
  }
  function nextTarget() {
    if (!blockScore('diag')) return { href: '#/diag', label: 'Commencer par le diagnostic' };
    for (var i = 0; i < L.modules.length; i++) {
      var m = L.modules[i];
      for (var k = 0; k < m.steps.length; k++) if (!stepDone(m.n, k + 1)) {
        var started = Store.S.steps && Object.keys(Store.S.steps).length;
        return { href: '#/m/' + m.n + '/' + (k + 1), label: (started ? 'Reprendre' : 'Commencer') + ' : ' + m.lib + ', étape ' + (k + 1) };
      }
    }
    if (!blockScore('quiz')) return { href: '#/quiz', label: 'Passer au quiz final' };
    return { href: '#/bilan', label: 'Voir mon bilan' };
  }
  function nextHref() { return nextTarget().href; }
  function nextLabel() { return nextTarget().label; }

  /* ---------- vue : diagnostic ---------- */
  function viewDiag() {
    var c = card('m-q mq');
    c.appendChild(h('p', { class: 'kicker', text: 'Avant de commencer' }));
    c.appendChild(h('h1', { text: L.diag.titre }));
    c.appendChild(h('p', { class: 'lead', html: L.diag.intro }));
    L.diag.blocks.forEach(function (b) { c.appendChild(Blocks.render(b)); });
    c.appendChild(h('div', { class: 'stepnav' }, h('a', { class: 'btn sec', href: '#/' }, '← Accueil'), h('a', { class: 'btn', href: '#/m/1' }, L.modules[0].lib + ' →')));
    return [c];
  }

  /* ---------- vue : module ---------- */
  function viewModule(n) {
    var m = mod(n); if (!m) return viewHome();
    var wrap = h('div', { class: 'm' + m.n });
    wrap.appendChild(h('p', { class: 'crumb' }, h('a', { href: '#/' }, 'Accueil'), ' › ' + m.lib));
    var c = card('m' + m.n);
    c.appendChild(h('p', { class: 'kicker', text: m.lib }));
    c.appendChild(h('h1', { text: m.titre }));
    c.appendChild(h('p', { class: 'lead', text: m.accroche }));
    if (m.duree) c.appendChild(h('p', { class: 'duree' }, '⏱ Temps de travail approximatif : ', h('b', { text: 'environ ' + m.duree }), ' (durée prévue en classe ; selon votre rythme, vous pouvez y passer un peu plus ou un peu moins de temps).'));
    // accès direct à la suite : l'apprenant n'a pas à faire défiler la page pour retrouver sa place
    var mp = modProg(m), nextK = 0;
    for (var ik = 1; ik <= m.steps.length; ik++) if (!stepDone(m.n, ik)) { nextK = ik; break; }
    c.appendChild(h('div', { style: 'margin:12px 0 6px' }, progBar(mp)));
    if (nextK && unlocked(m.n, nextK)) c.appendChild(h('div', { class: 'btns' }, h('a', { class: 'btn', href: '#/m/' + m.n + '/' + nextK }, (mp.done ? 'Continuer : étape ' + nextK + ' →' : 'Commencer →'))));
    else if (!nextK) c.appendChild(h('p', { class: 'res ok', text: '✔ Partie terminée. Vous pouvez relire n\'importe quelle étape ci-dessous.' }));
    if (m.contexte) c.appendChild(Blocks.render(m.contexte));
    if (m.objectifs && m.objectifs.length) c.appendChild(objSavoirs('la partie', m.objectifs, m.savoirs));
    c.appendChild(h('h2', { text: 'Les étapes' }));
    c.appendChild(h('ol', { class: 'steplist' }, m.steps.map(function (s, i) {
      var d = stepDone(m.n, i + 1);
      if (!unlocked(m.n, i + 1)) {
        return h('li', { class: 'locked' }, h('div', { class: 'lockrow' }, h('span', { class: 'sn', 'aria-hidden': 'true', text: '🔒' }),
          h('span', null, h('b', { text: s.titre }), h('div', { class: 'tag', text: 'Verrouillée : terminez l\'étape précédente pour l\'ouvrir.' })),
          h('span', { class: 'tag', text: 'Verrouillée' })));
      }
      var a = h('a', { href: '#/m/' + m.n + '/' + (i + 1) }, h('span', { class: 'sn', 'aria-hidden': 'true', text: d ? '✓' : String(i + 1) }),
        h('span', null, h('b', { text: s.titre }), s.tag ? h('div', { class: 'tag', text: s.tag }) : null),
        h('span', { class: 'tag', text: d ? 'Terminée' : 'À faire' }));
      return h('li', { class: d ? 'done' : '' }, a);
    })));
    var sc = modScore(m);
    if (sc.mx) c.appendChild(h('p', { class: 'hint', text: 'Points des exercices corrigés automatiquement dans cette partie : ' + sc.sc + ' / ' + sc.mx + ' (compte uniquement les exercices déjà vérifiés).' }));
    var pm = mod(m.n - 1), nm = mod(m.n + 1);
    var prev = pm ? h('a', { class: 'btn sec', href: '#/m/' + pm.n }, '← ' + pm.lib) : h('a', { class: 'btn sec', href: '#/' }, '← Accueil');
    var next = nm ? h('a', { class: 'btn', href: '#/m/' + nm.n }, nm.lib + ' →') : h('a', { class: 'btn', href: '#/quiz' }, 'Quiz final →');
    c.appendChild(h('div', { class: 'stepnav' }, prev, next));
    wrap.appendChild(c);
    return [wrap];
  }

  /* ---------- vue : étape ---------- */
  function viewStep(n, k) {
    var m = mod(n); if (!m || !m.steps[k - 1]) return viewModule(n);
    var st = m.steps[k - 1], total = m.steps.length;
    var wrap = h('div', { class: 'm' + m.n });
    wrap.appendChild(h('p', { class: 'crumb' }, h('a', { href: '#/' }, 'Accueil'), ' › ', h('a', { href: '#/m/' + m.n }, m.lib + ' · ' + m.court), ' › Étape ' + k));
    if (lockNotice) { wrap.appendChild(h('p', { class: 'res part', role: 'alert', text: '🔒 ' + lockNotice })); lockNotice = ''; }
    var c = card('m' + m.n);
    var sb = h('div', { class: 'stepbar', role: 'navigation', 'aria-label': 'Étapes de cette partie' });
    function paintBar() {
      sb.innerHTML = '';
      m.steps.forEach(function (s, i) {
        if (!unlocked(m.n, i + 1)) { sb.appendChild(h('span', { class: 'locked', role: 'img', 'aria-label': 'Étape ' + (i + 1) + ' : verrouillée' })); return; }
        var cls = (stepDone(m.n, i + 1) ? 'done ' : '') + (i + 1 === k ? 'cur' : '');
        var a = h('a', { href: '#/m/' + m.n + '/' + (i + 1), class: cls, 'aria-label': 'Étape ' + (i + 1) + ' : ' + s.titre + (stepDone(m.n, i + 1) ? ' (terminée)' : '') });
        if (i + 1 === k) a.setAttribute('aria-current', 'step');
        sb.appendChild(a);
      });
    }
    paintBar();
    c.appendChild(h('p', { class: 'kicker', text: m.lib + ' · étape ' + k + ' sur ' + total + (st.tag ? ' · ' + st.tag : '') }));
    c.appendChild(sb);
    c.appendChild(h('h1', { text: st.titre }));
    // Après la synthèse de l'élève (bloc « bilan »), la suite de l'étape (cours, synthèse visuelle…)
    // reste cachée tant que la synthèse n'est pas validée.
    var gateBox = null;
    st.blocks.forEach(function (b, idx) {
      if (gateBox) { gateBox.appendChild(Blocks.render(b)); return; }
      if ((b.t === 'ouvert' && b.bilan) || b.t === 'fait') {
        var rest = st.blocks.slice(idx + 1), lab = b.gl || 'la réponse attendue';
        if (b.t === 'fait') lab = 'la synthèse de votre enseignant';
        if (rest.some(function (x) { return x.t === 'cours'; })) lab = 'le cours';
        else if (rest.some(function (x) { return x.t === 'img'; })) lab = 'la synthèse visuelle';
        var bb = {}; for (var kk in b) bb[kk] = b[kk]; bb.gate = lab;
        c.appendChild(Blocks.render(bb));
        if (rest.length) {
          gateBox = h('div', { class: 'gated' });
          gateBox.hidden = !(Store.S.blocks[b.id] && Store.S.blocks[b.id].rev);
          c.appendChild(gateBox);
          (function (id, box) {
            function onVal(e) {
              if (!document.body.contains(box)) { document.removeEventListener('lms-validated', onVal); return; }
              if (e.detail === id) box.hidden = false;
            }
            document.addEventListener('lms-validated', onVal);
          })(b.id, gateBox);
        }
        return;
      }
      c.appendChild(Blocks.render(b));
    });

    // fin d'étape : on ne passe à la suite que lorsque toutes les activités de la page sont faites
    var acts = activities(st);
    var msg = h('p', { class: 'res part', role: 'status', 'aria-live': 'polite' });
    var btn = h('button', { type: 'button', class: 'btn' });
    var nextSlot = h('span', { class: 'nxt' });
    function remaining() { return acts.filter(function (b) { return !Blocks.isDone(b); }); }
    function showRemaining(left) {
      msg.className = 'res part';
      msg.textContent = 'Il reste ' + left.length + ' activité' + (left.length > 1 ? 's' : '') + ' à terminer sur cette page avant de passer à la suite : la première est entourée en orange. Vérifiez vos réponses, validez votre composition ou comparez avec la réponse attendue, selon l\'activité.';
      var id = left[0].t === 'ipsative' ? 'diag2' : left[0].id, el = id ? c.querySelector('[data-bid="' + id + '"]') : null;
      if (el) {
        el.classList.add('todo'); setTimeout(function () { el.classList.remove('todo'); }, 4500);
        try { el.scrollIntoView({ block: 'center', behavior: 'auto' }); } catch (e) { }
      }
    }
    var nx = k < total ? { href: '#/m/' + m.n + '/' + (k + 1), label: 'Étape suivante →' }
      : (mod(m.n + 1) ? { href: '#/m/' + (m.n + 1), label: mod(m.n + 1).lib + ' →' } : { href: '#/quiz', label: 'Quiz final →' });
    function paintNext() {
      nextSlot.innerHTML = '';
      if (stepDone(m.n, k)) nextSlot.appendChild(h('a', { class: 'btn', href: nx.href }, nx.label));
      else nextSlot.appendChild(h('button', { type: 'button', class: 'btn locked', 'aria-disabled': 'true', onclick: function () {
        var left = remaining();
        if (left.length) showRemaining(left);
        else { msg.className = 'res part'; msg.textContent = 'Cliquez d\'abord sur « J\'ai terminé cette étape » pour débloquer la suite.'; }
      } }, '🔒 ' + nx.label));
    }
    function paintBtn() {
      var d = stepDone(m.n, k);
      btn.textContent = d ? '✓ Étape terminée' : '✔ J\'ai terminé cette étape';
      btn.className = d ? 'btn sec' : 'btn'; btn.disabled = d;
      paintNext();
    }
    var arc = L.meta.arcade ? h('p', { class: 'res ok', role: 'status' }, '🎮 Vous avez terminé le parcours : l\'Arcade de Mnémosia est débloquée. ',
      h('a', { href: L.meta.arcade, target: '_blank', rel: 'noopener' }, 'Ouvrir l\'Arcade ↗'), ' (elle est aussi sur la page d\'accueil).') : h('p', { hidden: true });
    var lastStep = m.n === L.modules.length && k === total;
    function paintArc() { arc.hidden = !(L.meta.arcade && lastStep && courseDone()); }
    btn.addEventListener('click', function () {
      if (stepDone(m.n, k)) return;
      var left = remaining();
      if (left.length) { showRemaining(left); return; }
      Store.S.steps[key(m.n, k)] = true; Store.save(); paintBtn(); paintBar(); buildNav(); paintArc();
      msg.className = 'res ok'; msg.textContent = '✔ Étape terminée : vous pouvez passer à la suite.';
    });
    paintBtn(); paintArc();
    c.appendChild(h('div', { class: 'btns noprint' }, btn)); c.appendChild(msg); c.appendChild(arc);

    var prev;
    if (k > 1) prev = h('a', { class: 'btn sec', href: '#/m/' + m.n + '/' + (k - 1) }, '← Étape précédente');
    else prev = h('a', { class: 'btn sec', href: '#/m/' + m.n }, '← ' + m.lib);
    c.appendChild(h('div', { class: 'stepnav' }, prev, nextSlot));
    wrap.appendChild(c);
    return [wrap];
  }
  /* ---------- vue : quiz final ---------- */
  function viewQuiz() {
    var c = card('mq');
    c.appendChild(h('p', { class: 'kicker', text: 'Pour finir' }));
    c.appendChild(h('h1', { text: L.quiz.titre }));
    c.appendChild(h('p', { class: 'lead', html: L.quiz.intro }));
    L.quiz.blocks.forEach(function (b) { c.appendChild(Blocks.render(b)); });
    c.appendChild(h('div', { class: 'stepnav' }, h('a', { class: 'btn sec', href: '#/m/' + L.modules.length }, '← ' + L.modules[L.modules.length - 1].lib), h('a', { class: 'btn', href: '#/bilan' }, 'Mon bilan →')));
    return [c];
  }

  /* ---------- vue : mes badges ---------- */
  function viewBadges() {
    var list = badgeList(), n = badgeCount();
    var c = card('mq');
    c.appendChild(h('p', { class: 'kicker', text: 'Pour progresser en s\'amusant' }));
    c.appendChild(h('h1', { text: 'Mes badges' }));
    c.appendChild(h('p', { class: 'lead', text: L.meta.badgesIntro || '' }));
    var pct = list.length ? Math.round(100 * n / list.length) : 0;
    c.appendChild(h('p', null, h('b', { text: n + ' badge' + (n > 1 ? 's' : '') + ' sur ' + list.length })));
    c.appendChild(h('div', { class: 'prog', role: 'img', 'aria-label': pct + ' % des badges obtenus' }, h('i', { style: 'width:' + pct + '%' })));
    var groups = [];
    list.forEach(function (b) { if (groups.indexOf(b.g) < 0) groups.push(b.g); });
    groups.forEach(function (g) {
      c.appendChild(h('h2', { text: g }));
      c.appendChild(h('ul', { class: 'bdgs' }, list.filter(function (b) { return b.g === g; }).map(function (b) {
        var on = hasBadge(b);
        return h('li', { class: 'bdg ' + (on ? 'on' : 'off') + ((b.type === 'module' || b.type === 'maitrise') ? ' m' + b.n : '') },
          h('span', { class: 'bd-ic', 'aria-hidden': 'true', text: b.ico }),
          h('div', { class: 'bd-tx' }, h('h3', { text: b.titre }), h('p', { text: b.cond }),
            h('p', { class: 'bd-st' }, on ? '✔ Obtenu' : '🔒 À débloquer')));
      })));
    });
    c.appendChild(h('div', { class: 'stepnav' }, h('a', { class: 'btn sec', href: '#/' }, 'Accueil'), h('a', { class: 'btn', href: nextHref() }, nextLabel())));
    return [c];
  }

  /* ---------- vue : bilan ---------- */
  function bilanText() {
    var id = Store.S.id, lines = [];
    var who = [id.prenom, id.nom].filter(Boolean).join(' ') || '(nom non renseigné)';
    lines.push('BILAN — ' + L.meta.titre + ' (' + L.meta.sous + ')');
    lines.push('Apprenant(e) : ' + who + (id.classe ? ' · Classe : ' + id.classe : ''));
    lines.push('Date : ' + new Date().toLocaleDateString('fr-FR'));
    lines.push('');
    var dd = blockScore('diag'), qq = blockScore('quiz');
    lines.push(L.diag.titre + ' : ' + (dd ? scoreTxt(dd) : 'non fait'));
    L.modules.forEach(function (m) { var p = modProg(m), s = modScore(m); lines.push(m.lib + ' — ' + m.titre + ' : ' + p.done + '/' + p.total + ' étapes terminées ; exercices corrigés : ' + scoreTxt(s)); });
    var d2 = blockScore('diag2'); lines.push('Diagnostic refait à la fin : ' + (d2 ? scoreTxt(d2) : 'non fait'));
    lines.push('Quiz final : ' + (qq ? scoreTxt(qq) : 'non fait'));
    lines.push(xpBilanLine());
    if (badgeList().length) lines.push('Badges obtenus : ' + badgeCount() + ' / ' + badgeList().length + (badgeCount() ? ' (' + badgeList().filter(hasBadge).map(function (b) { return b.titre; }).join(' ; ') + ')' : ''));
    var qm = quizMods();
    if (qm) Object.keys(qm).sort().forEach(function (n) { var o = qm[n]; lines.push('   Quiz final, ' + Blocks.modLabel(+n) + ' : ' + o.sc + ' / ' + o.mx + ' (' + Blocks.level(o.sc, o.mx).t.replace(/^\S+\s/, '') + ')'); });
    tpsLines().forEach(function (l) { lines.push(l); });
    lines.push('');
    lines.push('MES COMPOSITIONS RÉDIGÉES');
    synthBlocks().forEach(function (x) {
      var st = Store.S.blocks[x.b.id] || {};
      lines.push(''); lines.push('— ' + x.label + (st.self ? ' [auto-évaluation : ' + ({ ok: 'conforme', part: 'en partie', rev: 'à revoir' })[st.self] + ']' : ''));
      lines.push(st.t && st.t.trim() ? st.t.trim() : '(non rédigée)');
    });
    return lines.join('\n');
  }
  function synthBlocks() {
    var out = [];
    L.modules.forEach(function (m) {
      m.steps.forEach(function (s, i) {
        allBlocks(s.blocks).forEach(function (b) { if (b.t === 'ouvert' && b.bilan) out.push({ b: b, label: m.lib + ' · ' + (b.bilan === true ? s.titre : b.bilan) }); });
      });
    });
    return out;
  }
  function download(name, text, type) {
    try {
      var blob = new Blob([text], { type: type || 'text/plain;charset=utf-8' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    } catch (e) { alert('Le téléchargement n\'est pas possible sur ce navigateur.'); }
  }
  function copyText(text, done) {
    function fb() { var ta = h('textarea', { style: 'position:fixed;left:-9999px' }); ta.value = text; document.body.appendChild(ta); ta.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) { } ta.remove(); done(ok); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, fb); else fb();
  }
  function viewBilan() {
    var c = card('mq bilan');
    c.appendChild(h('p', { class: 'kicker', text: 'À rendre à votre enseignant' }));
    c.appendChild(h('h1', { text: 'Mon bilan' }));
    c.appendChild(h('p', { class: 'lead', html: L.meta.bilanIntro }));
    var id = Store.S.id;
    var row = h('div', { class: 'idrow' });
    [['prenom', 'Prénom'], ['nom', 'Nom'], ['classe', 'Classe']].forEach(function (f) {
      var inp = h('input', { type: 'text', id: 'id-' + f[0], autocomplete: f[0] === 'classe' ? 'off' : (f[0] === 'prenom' ? 'given-name' : 'family-name') });
      inp.value = id[f[0]] || '';
      inp.addEventListener('input', function () { Store.S.id[f[0]] = inp.value; Store.save(); fillPrintId(); });
      row.appendChild(h('div', null, h('label', { for: 'id-' + f[0], text: f[1] }), inp));
    });
    c.appendChild(row);
    var pid = h('p', { class: 'syn', style: 'display:none', id: 'printId' });
    function fillPrintId() { pid.textContent = 'Apprenant(e) : ' + ([Store.S.id.prenom, Store.S.id.nom].filter(Boolean).join(' ') || '…') + (Store.S.id.classe ? ' · Classe : ' + Store.S.id.classe : '') + ' · ' + new Date().toLocaleDateString('fr-FR'); }
    fillPrintId(); c.appendChild(pid);

    c.appendChild(h('h2', { text: 'Mon parcours' }));
    var rows = [];
    var dd = blockScore('diag');
    rows.push(h('tr', null, h('th', { scope: 'row', text: L.diag.titre }), h('td', { class: 'num', text: dd ? 'Fait' : '—' }), h('td', { class: 'num', text: dd ? scoreTxt(dd) : '—' })));
    L.modules.forEach(function (m) {
      var p = modProg(m), s = modScore(m);
      rows.push(h('tr', null, h('th', { scope: 'row', text: m.lib + ' — ' + m.titre }), h('td', { class: 'num', text: p.done + ' / ' + p.total }), h('td', { class: 'num', text: scoreTxt(s) })));
    });
    var d2 = blockScore('diag2'), qq = blockScore('quiz');
    rows.push(h('tr', null, h('th', { scope: 'row', text: 'Diagnostic refait à la fin' }), h('td', { class: 'num', text: d2 ? 'Fait' : '—' }), h('td', { class: 'num', text: d2 ? scoreTxt(d2) : '—' })));
    rows.push(h('tr', null, h('th', { scope: 'row', text: 'Quiz final' }), h('td', { class: 'num', text: qq ? 'Fait' : '—' }), h('td', { class: 'num', text: qq ? scoreTxt(qq) : '—' })));
    var qm = quizMods();
    if (qm) Object.keys(qm).sort().forEach(function (n) {
      var o = qm[n];
      rows.push(h('tr', { class: 'sub' }, h('th', { scope: 'row', text: 'Quiz final · ' + Blocks.modLabel(+n) + ' (' + Blocks.level(o.sc, o.mx).t + ')' }), h('td', { class: 'num', text: '—' }), h('td', { class: 'num', text: o.sc + ' / ' + o.mx })));
    });
    if (badgeList().length) rows.push(h('tr', null, h('th', { scope: 'row', text: 'Badges obtenus' }), h('td', { class: 'num', text: '—' }), h('td', { class: 'num', text: badgeCount() + ' / ' + badgeList().length })));
    c.appendChild(h('div', { class: 'tscroll' }, h('table', { class: 'dt' }, h('caption', { text: 'Étapes terminées et points des exercices corrigés automatiquement' }),
      h('thead', null, h('tr', null, h('th', { scope: 'col', text: 'Partie du cours' }), h('th', { scope: 'col', class: 'num', text: 'Étapes' }), h('th', { scope: 'col', class: 'num', text: 'Points' }))), h('tbody', null, rows))));

    c.appendChild(h('h2', { text: 'Mes compositions rédigées' }));
    var sb = synthBlocks(), any = false;
    sb.forEach(function (x) {
      var st = Store.S.blocks[x.b.id] || {};
      c.appendChild(h('h3', { text: x.label }));
      if (st.t && st.t.trim()) { any = true; c.appendChild(h('div', { class: 'syn', text: st.t.trim() })); }
      else c.appendChild(h('p', { class: 'hint', text: 'Pas encore rédigée.' }));
    });
    if (!any) c.appendChild(h('p', { class: 'warn', text: 'Vous n\'avez pas encore rédigé de composition. Elles se trouvent à la fin des parties 1 et 3.' }));

    c.appendChild(h('h2', { class: 'noprint', text: 'Rendre mon travail' }));
    c.appendChild(h('p', { class: 'noprint', html: L.meta.bilanRendre }));
    c.appendChild(h('div', { class: 'btns noprint' },
      h('button', { type: 'button', class: 'btn', onclick: function () { window.print(); } }, '🖨️ Imprimer / enregistrer en PDF')));

    // sauvegarde / transfert
    var det = h('details', { class: 'bloc det noprint' }, h('summary', { text: 'Changer d\'appareil ou sauvegarder mon travail' }));
    det.appendChild(h('p', { text: 'Vos réponses sont enregistrées dans ce navigateur, sur cet appareil uniquement. Pour continuer sur un autre appareil, téléchargez votre sauvegarde puis chargez-la là-bas.' }));
    var imsg = h('p', { class: 'res part', role: 'status', 'aria-live': 'polite' });
    var file = h('input', { type: 'file', accept: '.json,application/json', id: 'impFile', style: 'display:none' });
    file.addEventListener('change', function () {
      var f = file.files && file.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () { try { Store.importJSON(String(r.result)); S = Store.S; applyA11y(); buildNav(); route(true); } catch (e) { imsg.textContent = 'Ce fichier n\'est pas une sauvegarde valable.'; } };
      r.readAsText(f);
    });
    var reset = h('button', { type: 'button', class: 'btn sec' }, '🗑 Effacer mes réponses sur cet appareil'), armed = false;
    reset.addEventListener('click', function () {
      if (!armed) { armed = true; reset.textContent = 'Confirmer : tout effacer'; imsg.textContent = 'Cette action supprime vos réponses et votre progression sur cet appareil. Cliquez encore pour confirmer.'; return; }
      Store.reset(); S = Store.S; applyA11y(); buildNav(); route(true);
    });
    det.appendChild(h('div', { class: 'btns' },
      h('button', { type: 'button', class: 'btn sec', onclick: function () { download('sauvegarde-methodologie-cas-pratique.json', Store.exportJSON(), 'application/json'); } }, '⬇ Télécharger ma sauvegarde'),
      h('label', { class: 'btn sec', for: 'impFile', tabindex: '0', role: 'button', onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } } }, '⬆ Charger une sauvegarde'), file, reset));
    det.appendChild(imsg);
    c.appendChild(det);
    c.appendChild(h('div', { class: 'stepnav' }, h('a', { class: 'btn sec', href: '#/quiz' }, '← Quiz final'), h('a', { class: 'btn', href: '#/' }, 'Accueil')));
    return [c];
  }

  /* ---------- routeur ---------- */
  function parse() {
    var p = (location.hash || '#/').replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!p.length) return { v: 'home', t: L.meta.titre };
    if (p[0] === 'diag') return { v: 'diag', t: L.diag.titre };
    if (p[0] === 'quiz') return { v: 'quiz', t: L.quiz.titre };
    if (p[0] === 'bilan') return { v: 'bilan', t: 'Mon bilan' };
    if (p[0] === 'badges') return { v: 'badges', t: 'Mes badges' };
    if (p[0] === 'm') {
      var n = parseInt(p[1], 10), m = mod(n); if (!m) return { v: 'home', t: L.meta.titre };
      var k = parseInt(p[2], 10);
      if (k >= 1 && m.steps[k - 1]) return { v: 'step', n: n, k: k, t: m.steps[k - 1].titre + ' · ' + m.lib };
      return { v: 'module', n: n, t: m.lib + ' · ' + m.titre };
    }
    return { v: 'home', t: L.meta.titre };
  }
  function fixHeadings() {
    var prev = 0;
    main.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function (e) {
      var lv = +e.tagName.charAt(1);
      if (e.hasAttribute('data-fl')) { e.removeAttribute('aria-level'); e.removeAttribute('data-fl'); }
      if (prev && lv > prev + 1) { e.setAttribute('aria-level', String(prev + 1)); e.setAttribute('data-fl', '1'); lv = prev + 1; }
      prev = lv;
    });
  }
  function route(force) {
    var r = parse(), id = (location.hash || '#/');
    if (r.v === 'step' && !unlocked(r.n, r.k)) {
      var fo = firstOpen();
      if (fo) { lockNotice = 'Cette étape est verrouillée : terminez d\'abord l\'étape ' + fo.k + ' (' + mod(fo.n).lib + '), puis les suivantes dans l\'ordre.'; location.replace('#/m/' + fo.n + '/' + fo.k); return; }
    }
    if (r.v === 'quiz' && !courseDone()) {
      var fq = firstOpen();
      if (fq) { lockNotice = 'Le quiz final se débloque quand vous avez terminé ' + L.meta.parcours + ' : continuez avec l\'étape ' + fq.k + ' (' + mod(fq.n).lib + ').'; location.replace('#/m/' + fq.n + '/' + fq.k); return; }
    }
    var views = { home: viewHome, diag: viewDiag, quiz: viewQuiz, bilan: viewBilan, badges: viewBadges, module: function () { return viewModule(r.n); }, step: function () { return viewStep(r.n, r.k); } };
    var nodes = views[r.v]();
    var tb = document.getElementById('toast'); if (tb && id !== lastRoute) tb.hidden = true;   // la notification disparaît quand on change de page
    main.innerHTML = '';
    nodes.forEach(function (x) { main.appendChild(x); });
    fixHeadings();
    document.title = r.t + ' · La méthodologie du cas pratique';
    buildNav();
    sideEl.classList.remove('open'); document.getElementById('menuBtn').setAttribute('aria-expanded', 'false');
    if (id !== lastRoute || force === true) { window.scrollTo(0, 0); }
    if (id !== lastRoute) { try { main.focus({ preventScroll: true }); } catch (e) { main.focus(); } }
    lastRoute = id;
  }
  window.addEventListener('hashchange', function () { route(); });

  // Tableaux qui défilent horizontalement : atteignables au clavier (Tab, puis flèches)
  function focusTables() {
    main.querySelectorAll('.tscroll:not([tabindex])').forEach(function (e) {
      e.setAttribute('tabindex', '0');
    });
  }
  if (window.MutationObserver) new MutationObserver(function () { focusTables(); fixHeadings(); }).observe(main, { childList: true, subtree: true });

  if (!window.LMS) { main.textContent = 'Le contenu du cours est introuvable (js/content.js).'; return; }
  initA11y();
  checkBadges();
  route();
})();
