/* SOLO — logika strani / логика страницы */
(function () {
  'use strict';

  var CONFIG = window.SOLO_CONFIG || {};
  var I18N = window.SOLO_I18N || {};
  var QZ = window.SOLO_QUIZ || {};
  var lang = (CONFIG.langs && CONFIG.langs.default) || 'sl';

  function getParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]+)').exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function available() { return (CONFIG.langs && CONFIG.langs.available) || ['sl']; }

  function t(key, vars) {
    var pack = I18N[lang] || I18N[available()[0]] || {};
    var s = pack[key];
    if (s === undefined) {
      var fb = I18N[available()[0]] || {};
      s = fb[key];
    }
    if (s === undefined) return '';
    if (vars) {
      for (var k in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, k)) {
          s = s.split('{' + k + '}').join(vars[k]);
        }
      }
    }
    return s;
  }

  function initLang() {
    var fromUrl = getParam('lang');
    var stored = null;
    try { stored = window.localStorage.getItem('solo-lang'); } catch (e) { stored = null; }
    var l = fromUrl || stored || lang;
    if (available().indexOf(l) === -1) l = lang;
    lang = l;
    try { window.localStorage.setItem('solo-lang', lang); } catch (e) {}
  }

  function setLang(l) {
    if (available().indexOf(l) === -1) return;
    lang = l;
    try { window.localStorage.setItem('solo-lang', l); } catch (e) {}
    document.documentElement.lang = l;
    applyI18n();
    if (quiz.open) renderQuiz();
  }

  function applyI18n() {
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = t(nodes[i].getAttribute('data-i18n'));
    var htmlNodes = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlNodes.length; j++) htmlNodes[j].innerHTML = t(htmlNodes[j].getAttribute('data-i18n-html'));
    var phNodes = document.querySelectorAll('[data-i18n-ph]');
    for (var p = 0; p < phNodes.length; p++) phNodes[p].setAttribute('placeholder', t(phNodes[p].getAttribute('data-i18n-ph')));
    document.title = t('meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));
    var btns = document.querySelectorAll('[data-lang-btn]');
    for (var b = 0; b < btns.length; b++) {
      if (btns[b].getAttribute('data-lang-btn') === lang) btns[b].classList.add('on');
      else btns[b].classList.remove('on');
    }
    var rt = document.querySelectorAll('[data-route]');
    for (var r = 0; r < rt.length; r++) {
      var key = rt[r].getAttribute('data-route');
      var href = CONFIG.routes && CONFIG.routes[key];
      if (href) rt[r].setAttribute('href', href + '?lang=' + lang);
    }
    buildContacts();
  }

  function buildContacts() {
    var box = document.getElementById('footlinks');
    if (!box) return;
    var c = CONFIG.contact || {};
    var lgl = CONFIG.legal || {};
    var parts = [];
    if (c.telegram) parts.push('<a href="' + c.telegram + '" rel="noopener">Telegram</a>');
    if (c.email) parts.push('<a href="mailto:' + c.email + '">' + c.email + '</a>');
    if (c.phone) parts.push('<a href="tel:' + c.phone + '">' + c.phone + '</a>');
    if (lgl.privacyUrl) parts.push('<a href="' + lgl.privacyUrl + '">' + (lang === 'ru' ? 'Политика конфиденциальности' : 'Politika zasebnosti') + '</a>');
    box.innerHTML = parts.join('');
    var legalBox = document.getElementById('footlegal');
    if (legalBox) {
      var lparts = [];
      if (lgl.companyName) lparts.push(lgl.companyName);
      if (lgl.address) lparts.push(lgl.address);
      if (lgl.taxId) lparts.push((lang === 'ru' ? 'Налоговый номер: ' : 'Davčna št.: ') + lgl.taxId);
      legalBox.textContent = lparts.join(' · ');
    }
  }

  /* ---------- anketa / анкета ---------- */
  var quiz = { open: false, branch: null, step: 0, answers: [], mode: 'quiz' };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function el(id) { return document.getElementById(id); }
  function overlay() { return el('overlay'); }

  function openModal() {
    quiz.open = true;
    overlay().classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    quiz.open = false;
    overlay().classList.remove('on');
    document.body.style.overflow = '';
  }

  function quizPack() { return QZ[lang] || QZ[available()[0]]; }

  function startQuiz(branch) {
    quiz = { open: false, branch: branch || null, step: 0, answers: [], mode: 'quiz' };
    openModal();
    renderQuiz();
  }

  function renderQuiz() {
    if (!quiz.open) return;
    var body = el('modalBody');
    if (!body) return;
    if (quiz.mode === 'contact') { body.innerHTML = contactFormHtml(); return; }
    if (!quiz.branch) { body.innerHTML = entryHtml(); return; }
    var pack = quizPack();
    var br = pack.branches[quiz.branch];
    if (quiz.step >= br.steps.length) { body.innerHTML = finalHtml(); return; }
    var st = br.steps[quiz.step];
    var total = br.steps.length;
    var pct = Math.round((quiz.step / (total + 1)) * 100) + 10;
    var h = '<div class="qnum">' + esc(br.title) + ' · ' + esc(t('quiz.step', { n: quiz.step + 1, t: total })) + '</div>';
    h += '<div class="prog"><i style="width:' + pct + '%"></i></div>';
    h += '<div class="qtitle">' + esc(st.q) + '</div>';
    if (st.multi) h += '<p class="qhint">' + esc(t('quiz.multi')) + '</p>';
    h += '<div class="opts">';
    var sel = quiz.answers[quiz.step] || (st.multi ? [] : null);
    for (var i = 0; i < st.o.length; i++) {
      var on = st.multi ? (sel.indexOf(st.o[i]) !== -1) : (sel === st.o[i]);
      h += '<button type="button" class="opt' + (on ? ' sel' : '') + '" onclick="SOLO.choose(' + i + ')">' + esc(st.o[i]) + '</button>';
    }
    h += '</div>';
    h += '<div class="mnav"><button type="button" class="link" onclick="SOLO.back()">&#8592; ' + esc(t('quiz.back')) + '</button>';
    if (st.multi) h += '<button type="button" class="btn" onclick="SOLO.next()">' + esc(t('quiz.next')) + '</button>';
    else h += '<button type="button" class="link" onclick="SOLO.close()">' + esc(t('quiz.close')) + '</button>';
    h += '</div>';
    body.innerHTML = h;
  }

  function entryHtml() {
    var pack = quizPack();
    var labels = pack.entry;
    var keys = ['a', 'b', 'c'];
    var h = '<div class="qnum">SOLO</div><div class="qtitle">' + esc(t('quiz.entry.title')) + '</div><div class="opts">';
    for (var i = 0; i < keys.length; i++) {
      h += '<button type="button" class="opt" onclick="SOLO.chooseBranch(\'' + keys[i] + '\')">' + esc(labels[i]) + '</button>';
    }
    h += '</div><div class="mnav"><span></span><button type="button" class="link" onclick="SOLO.close()">' + esc(t('quiz.close')) + '</button></div>';
    return h;
  }

  function chooseBranch(b) { quiz.branch = b; quiz.step = 0; quiz.answers = []; renderQuiz(); }

  function choose(i) {
    var st = quizPack().branches[quiz.branch].steps[quiz.step];
    if (st.multi) {
      var cur = quiz.answers[quiz.step] || [];
      var v = st.o[i];
      var idx = cur.indexOf(v);
      if (idx === -1) cur.push(v); else cur.splice(idx, 1);
      quiz.answers[quiz.step] = cur;
      renderQuiz();
      return;
    }
    quiz.answers[quiz.step] = st.o[i];
    next();
  }

  function next() {
    var br = quizPack().branches[quiz.branch];
    var st = br.steps[quiz.step];
    if (st.multi && (!quiz.answers[quiz.step] || quiz.answers[quiz.step].length === 0)) return;
    if (quiz.step + 1 < br.steps.length) { quiz.step++; renderQuiz(); }
    else { quiz.step = br.steps.length; renderQuiz(); }
  }

  function back() {
    if (quiz.step > 0) { quiz.step--; renderQuiz(); }
    else { quiz.branch = null; renderQuiz(); }
  }

  function recommendation() {
    var br = quizPack().branches[quiz.branch];
    var rec = br.rec;
    if (quiz.branch === 'c') {
      var a2 = quiz.answers[1] || '';
      if (/^(Ne,|Нет,)/.test(a2)) rec = 'mix';
      else rec = 'c';
    }
    if (rec === 'mix') return t('quiz.rec.mix');
    if (rec === 'a') return t('quiz.rec.a');
    if (rec === 'b') return t('quiz.rec.b');
    return t('quiz.rec.c');
  }

  function answersRows() {
    var br = quizPack().branches[quiz.branch];
    var out = [];
    for (var i = 0; i < br.steps.length; i++) {
      var a = quiz.answers[i];
      if (a === undefined || a === null) continue;
      out.push({ q: br.steps[i].q, a: Array.isArray(a) ? a.join(', ') : a });
    }
    return out;
  }

  function summaryHtml() {
    var rows = answersRows();
    var h = '<div class="sum"><h4>' + esc(t('quiz.summary')) + '</h4>';
    for (var i = 0; i < rows.length; i++) {
      h += '<div class="row">' + esc(rows[i].q) + ' — <b>' + esc(rows[i].a) + '</b></div>';
    }
    h += '<div class="rec">' + esc(t('quiz.recommend')) + ': <b>' + esc(recommendation()) + '</b></div></div>';
    return h;
  }

  function finalHtml() {
    var h = '<div class="qnum">SOLO</div><div class="prog"><i style="width:100%"></i></div>';
    h += '<div class="qtitle">' + esc(t('quiz.final.title')) + '</div>';
    h += summaryHtml();
    h += '<form id="quizForm" onsubmit="return SOLO.submitQuiz(event)">';
    h += field('f-business', 'quiz.f.business', 'quiz.f.business.ph', 'text', true);
    h += field('f-site', 'quiz.f.site', 'quiz.f.site.ph', 'text', false);
    h += field('f-contact', 'quiz.f.contact', 'quiz.f.contact.ph', 'text', true);
    h += '<div class="field"><label>' + esc(t('quiz.f.notes')) + '</label><textarea rows="3" id="f-notes" data-i18n-ph="quiz.f.notes.ph"></textarea></div>';
    h += '<div class="mnav"><button type="button" class="link" onclick="SOLO.back()">&#8592; ' + esc(t('quiz.back')) + '</button>';
    h += '<button type="submit" class="btn">' + esc(t('quiz.submit')) + '</button></div>';
    h += '</form>';
    return h;
  }

  function field(id, labelKey, phKey, type, req) {
    return '<div class="field"><label>' + esc(t(labelKey)) + '</label><input type="' + type + '" id="' + id + '" data-i18n-ph="' + phKey + '"' + (req ? ' required' : '') + ' placeholder="' + esc(t(phKey)) + '"></div>';
  }

  function contactFormHtml() {
    var h = '<div class="qnum">SOLO</div><div class="qtitle">' + esc(t('cta.talk')) + '</div>';
    h += '<form id="contactForm" onsubmit="return SOLO.submitContact(event)">';
    h += field('c-business', 'quiz.f.business', 'quiz.f.business.ph', 'text', false);
    h += field('c-contact', 'quiz.f.contact', 'quiz.f.contact.ph', 'text', true);
    h += '<div class="field"><label>' + esc(t('quiz.f.notes')) + '</label><textarea rows="4" id="c-notes" data-i18n-ph="quiz.f.notes.ph"></textarea></div>';
    h += '<div class="mnav"><button type="button" class="link" onclick="SOLO.startQuiz()">' + esc(t('hero.btn.pick')) + '</button>';
    h += '<button type="submit" class="btn">' + esc(t('quiz.submit')) + '</button></div>';
    h += '</form>';
    return h;
  }

  function val(id) { var e = el(id); return e ? e.value.replace(/^\s+|\s+$/g, '') : ''; }

  function buildText(kind) {
    var L = lang === 'ru';
    var lines = [];
    lines.push((L ? 'Заявка SOLO' : 'Povpraševanje SOLO') + (kind === 'quiz' ? ' (' + (L ? 'мини-анкета' : 'mini anketa') + ')' : ''));
    if (kind === 'quiz') {
      var rows = answersRows();
      for (var i = 0; i < rows.length; i++) lines.push(rows[i].q + ': ' + rows[i].a);
      lines.push((L ? 'Рекомендуемое решение' : 'Predlagana rešitev') + ': ' + recommendation());
    }
    var b = val(kind === 'quiz' ? 'f-business' : 'c-business');
    var c = val(kind === 'quiz' ? 'f-contact' : 'c-contact');
    var n = val(kind === 'quiz' ? 'f-notes' : 'c-notes');
    var s = kind === 'quiz' ? val('f-site') : '';
    if (b) lines.push((L ? 'Бизнес' : 'Dejavnost') + ': ' + b);
    if (s) lines.push((L ? 'Существующий сайт' : 'Obstoječa stran') + ': ' + s);
    if (c) lines.push((L ? 'Связь' : 'Kontakt') + ': ' + c);
    if (n) lines.push((L ? 'Пожелания' : 'Želje') + ': ' + n);
    return lines.join('\n');
  }

  function notReadyHtml(text) {
    var h = '<div class="qnum">SOLO</div><div class="qtitle">' + esc(t('quiz.notready.t')) + '</div>';
    h += '<div class="notice">' + t('quiz.notready.p') + '</div>';
    h += '<pre class="copyout" id="copyout">' + esc(text) + '</pre>';
    h += '<div class="mnav"><button type="button" class="link" onclick="SOLO.close()">' + esc(t('quiz.close2')) + '</button>';
    h += '<button type="button" class="btn" id="copyBtn" onclick="SOLO.copyText()">' + esc(t('quiz.copy')) + '</button></div>';
    return h;
  }

  function deliver(text) {
    if (CONFIG.submit && CONFIG.submit.enabled && CONFIG.submit.endpoint) {
      try {
        window.fetch(CONFIG.submit.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang: lang, text: text }) });
      } catch (e) {}
    }
    el('modalBody').innerHTML = notReadyHtml(text);
  }

  function submitQuiz(e) {
    e.preventDefault();
    var f = el('quizForm');
    if (f && !f.checkValidity()) { f.reportValidity(); return false; }
    deliver(buildText('quiz'));
    return false;
  }

  function submitContact(e) {
    e.preventDefault();
    var f = el('contactForm');
    if (f && !f.checkValidity()) { f.reportValidity(); return false; }
    deliver(buildText('contact'));
    return false;
  }

  function copyText() {
    var pre = el('copyout');
    if (!pre) return;
    var txt = pre.textContent;
    var done = function () {
      var b = el('copyBtn');
      if (b) { b.textContent = t('quiz.copied'); }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(pre, done); });
    } else { fallbackCopy(pre, done); }
  }

  function fallbackCopy(pre, done) {
    try {
      var r = document.createRange();
      r.selectNodeContents(pre);
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      document.execCommand('copy');
      done();
    } catch (e) {}
  }

  function openContact(e) {
    if (e && e.preventDefault) e.preventDefault();
    quiz = { open: false, branch: null, step: 0, answers: [], mode: 'contact' };
    openModal();
    renderQuiz();
  }

  window.SOLO = {
    startQuiz: startQuiz, chooseBranch: chooseBranch, choose: choose,
    next: next, back: back, close: closeModal,
    submitQuiz: submitQuiz, submitContact: submitContact,
    copyText: copyText, openContact: openContact, setLang: setLang,
    renderQuiz: renderQuiz, t: t, getLang: function () { return lang; }
  };

  initLang();
  document.addEventListener('DOMContentLoaded', function () {
    applyI18n();
    var panel = document.querySelectorAll('[data-quiz]');
    for (var i = 0; i < panel.length; i++) {
      (function (node) {
        node.addEventListener('click', function () { startQuiz(node.getAttribute('data-quiz')); });
      })(panel[i]);
    }
    var m = getParam('quiz');
    if (m && quizPack().branches[m]) startQuiz(m);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  });
})();
