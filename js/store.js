/* Sauvegarde locale (navigateur) et petits outils. Rien n'est envoyé sur internet. */
(function () {
  'use strict';
  var KEY = 'lms-bts-cas-pratique-v1';
  var mem = null;

  function defaults() {
    return {
      v: 1,
      id: { prenom: '', nom: '', classe: '' },
      a11y: { font: false, contrast: false, falc: false, read: false, anim: false, size: 0 },
      steps: {},   // "s1/2": true quand l'étape est terminée
      blocks: {},  // état de chaque activité
      badges: null, // badges déjà annoncés (null = pas encore initialisé)
      xp: null, // XP : meilleur nombre de bonnes réponses par exercice (null = pas encore initialisé)
      time: null // temps actif passé (en secondes) par module (m1, m2…), diagnostic (diag) et quiz (quiz)
    };
  }
  function load() {
    try {
      var r = window.localStorage.getItem(KEY);
      if (r) {
        var o = JSON.parse(r), d = defaults();
        for (var k in d) if (!(k in o)) o[k] = d[k];
        return o;
      }
    } catch (e) { /* stockage indisponible : on travaille en mémoire */ }
    return defaults();
  }
  var S = load();
  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { mem = JSON.stringify(S); }
    if (typeof Store.onSave === 'function') setTimeout(Store.onSave, 0);
  }

  var Store = {
    get S() { return S; },
    save: save,
    block: function (id) { return S.blocks[id] || (S.blocks[id] = {}); },
    reset: function () { S = defaults(); save(); },
    exportJSON: function () { return JSON.stringify(S); },
    importJSON: function (txt) {
      var o = JSON.parse(txt);
      if (!o || o.v !== 1 || typeof o.blocks !== 'object') throw new Error('Fichier non reconnu');
      var d = defaults();
      for (var k in d) if (!(k in o)) o[k] = d[k];
      S = o; save();
    }
  };

  /* ---------- outils ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  // création d'éléments : h('div', {class:'x', html:'<b>..</b>'}, enfants...)
  function h(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      var v = attrs[k];
      if (v === false || v == null) continue;
      if (k === 'html') e.innerHTML = v;
      else if (k === 'text') e.textContent = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') e.addEventListener(k.slice(2), v);
      else if (v === true) e.setAttribute(k, '');
      else e.setAttribute(k, v);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      if (Array.isArray(c)) c.forEach(function (x) { if (x) e.appendChild(typeof x === 'string' ? document.createTextNode(x) : x); });
      else e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return e;
  }
  // normalisation pour comparer des réponses libres (accents, casse, ponctuation)
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[’']/g, "'").replace(/œ/g, 'oe').replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  // mélange reproductible (même ordre à chaque visite)
  function shuffle(arr, seed) {
    var a = arr.slice(), s = 0, i;
    for (i = 0; i < String(seed).length; i++) s = (s * 31 + String(seed).charCodeAt(i)) >>> 0;
    function rnd() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
    for (i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  window.Store = Store;
  window.U = { esc: esc, h: h, norm: norm, shuffle: shuffle };
})();
