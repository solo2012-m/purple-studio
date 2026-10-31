/* Solo.Pov — logika strani / логика страницы */
(function () {
  'use strict';

  var CONFIG = window.SOLO_CONFIG || {};
  var I18N = window.SOLO_I18N || {};
  var QZ = window.SOLO_QUIZ || {};
  var lang = (CONFIG.langs && CONFIG.langs.default) || 'sl';

  function utmParams() {
    var keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'];
    var out = {};
    keys.forEach(function (k) {
      var m = new RegExp('[?&]' + k + '=([^&]+)').exec(window.location.search);
      if (m) out[k] = decodeURIComponent(m[1].replace(/\+/g, ' '));
    });
    return out;
  }

  function getParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]+)').exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function available() { return (CONFIG.langs && CONFIG.langs.available) || ['sl']; }

  function t(key, vars) {
    var pack = I18N[lang] || {};
    var s = pack[key];
    if (s === undefined && available()[0] !== lang) s = (I18N[available()[0]] || {})[key];
    if (s === undefined) return '';
    if (vars) for (var k in vars) if (Object.prototype.hasOwnProperty.call(vars, k)) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  }

  function initLang() {
    var fromUrl = getParam('lang');
    var stored = null;
    try { stored = window.localStorage.getItem('solo-lang'); } catch (e) {}
    var l = fromUrl || stored || lang;
    if (available().indexOf(l) === -1) l = lang;
    lang = l;
    try { window.localStorage.setItem('solo-lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
  }

  function setLang(l) {
    if (available().indexOf(l) === -1) return;
    lang = l;
    try { window.localStorage.setItem('solo-lang', l); } catch (e) {}
    document.documentElement.lang = l;
    applyI18n();
    renderWorks();
    if (window.renderTelegramHome) window.renderTelegramHome();
    resetDemo();
    retype();
    if (quiz.open) renderQuiz();
  }
  function retype() {
    var line = document.getElementById('typeLine');
    if (!line) return;
    clearTimeout(typeTimer);
    typeStarted = true;
    line.textContent = t('picker.type');
    line.parentNode.classList.add('done');
  }

  function applyI18n() {
    var n = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < n.length; i++) { var tv = t(n[i].getAttribute('data-i18n')); if (n[i].textContent !== tv) n[i].textContent = tv; }
    var h = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < h.length; j++) { var hv = t(h[j].getAttribute('data-i18n-html')); if (h[j].innerHTML !== hv) h[j].innerHTML = hv; }
    var p = document.querySelectorAll('[data-i18n-ph]');
    for (var q = 0; q < p.length; q++) { var pv = t(p[q].getAttribute('data-i18n-ph')); if (p[q].getAttribute('placeholder') !== pv) p[q].setAttribute('placeholder', pv); }
    document.title = t('meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));
    var b = document.querySelectorAll('[data-lang-btn]');
    for (var k = 0; k < b.length; k++) b[k].classList.toggle('on', b[k].getAttribute('data-lang-btn') === lang);
    var r = document.querySelectorAll('[data-route]');
    for (var z = 0; z < r.length; z++) {
      var href = CONFIG.routes && CONFIG.routes[r[z].getAttribute('data-route')];
      if (href) r[z].setAttribute('href', href + '?lang=' + lang);
    }
    document.documentElement.classList.remove('pre-lang');
    buildContacts();
  }

  function buildContacts() {
    var box = document.getElementById('footlinks');
    if (box) {
      var c = CONFIG.contact || {};
      var parts = [];
      if (c.telegram) parts.push('<a href="' + c.telegram + '" rel="noopener" target="_blank">Telegram</a>');
      if (c.facebook) parts.push('<a href="' + c.facebook + '" rel="noopener" target="_blank">Facebook</a>');
      if (c.email) parts.push('<a href="mailto:' + c.email + '">' + c.email + '</a>');
      if (c.phone) parts.push('<a href="tel:' + c.phone + '">' + c.phone + '</a>');
      if (!parts.length) parts.push('<span style="color:var(--muted);font-size:13.5px">' + (lang === 'ru' ? 'Контакты появятся после подтверждения.' : 'Kontakti bodo objavljeni po potrditvi.') + '</span>');
      box.innerHTML = parts.join('');
    }
    var legal = document.getElementById('footlegal');
    if (legal) {
      var g = CONFIG.legal || {};
      var lp = [];
      if (g.companyName) lp.push(g.companyName);
      if (g.address) lp.push(g.address);
      if (g.taxId) lp.push((lang === 'ru' ? 'Налоговый номер: ' : 'Davčna št.: ') + g.taxId);
      if (g.privacyUrl) lp.push('<a href="' + g.privacyUrl + '" style="color:var(--muted)">' + t('footer.privacy') + '</a>');
      legal.innerHTML = lp.join(' · ');
    }
  }

  /* ---------- works ---------- */
  function renderWorks() {
    var box = document.getElementById('worksBox');
    if (!box) return;
    var projects = (CONFIG.projects || []).filter(function (p) { return p && p.title; });
    if (!projects.length) {
      box.innerHTML = '<div class="work-empty"><b>' + esc(t('s7.empty.t')) + '</b><p>' + esc(t('s7.empty.d')) + '</p></div>';
      return;
    }
    var h = '<div class="works-grid">';
    for (var i = 0; i < projects.length; i++) {
      var p = projects[i];
      var title = p.title[lang] || p.title.sl || '';
      var sector = p.sector ? (p.sector[lang] || p.sector.sl || '') : '';
      var task = p.task ? (p.task[lang] || p.task.sl || '') : '';
      var host = p.host || (p.url ? p.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : '');
      var tags = [t('s7.tag.site')].concat(p.tags || []);
      var card = '<a class="work-card" href="' + esc(p.url || '#') + '" target="_blank" rel="noopener">';
      card += '<div class="work-frame"><div class="work-bar"><span class="wd"></span><span class="wd"></span><span class="wd"></span><span class="work-url">' + esc(host) + '</span></div>';
      if (p.img) card += '<div class="work-shot"><img src="' + esc(p.img) + '" alt="' + esc(title) + '" width="1200" height="750" loading="lazy"></div>';
      card += '</div><div class="work-body"><div class="work-head"><h3>' + esc(title) + '</h3><span class="work-arrow" aria-hidden="true">&#8599;</span></div>';
      if (sector) card += '<div class="work-field">' + esc(sector) + '</div>';
      if (task) card += '<p class="work-task">' + esc(task) + '</p>';
      card += '<div class="work-tags">';
      for (var j = 0; j < tags.length; j++) card += '<span>' + esc(tags[j]) + '</span>';
      card += '</div><span class="work-link"><span>' + esc(t('s7.open')) + '</span><span class="ar" aria-hidden="true">&rarr;</span></span>';
      card += '</div></a>';
      h += card;
    }
    h += '</div>';
    box.innerHTML = h;
  }

  /* ---------- demo ---------- */
  var demoTimers = [];
  function clearDemoTimers() { for (var i = 0; i < demoTimers.length; i++) clearTimeout(demoTimers[i]); demoTimers = []; }
  function resetDemo() {
    clearDemoTimers();
    ['dm2', 'dm3', 'dm4', 'svcCard'].forEach(function (id) {
      var e = document.getElementById(id); if (e) e.classList.remove('on');
    });
    var b = document.getElementById('demoBtn');
    if (b) { b.disabled = false; b.textContent = t('s5.demo.btn'); }
  }
  function runDemo() {
    resetDemo();
    var b = document.getElementById('demoBtn');
    if (b) b.disabled = true;
    var steps = [
      ['dm1', 250], ['dm2', 1200], ['dm3', 2200], ['svcCard', 2500], ['dm4', 3400]
    ];
    steps.forEach(function (s) {
      demoTimers.push(setTimeout(function () {
        var e = document.getElementById(s[0]); if (e) e.classList.add('on');
      }, s[1]));
    });
    demoTimers.push(setTimeout(function () {
      var b = document.getElementById('demoBtn');
      if (b) { b.disabled = false; b.textContent = t('s5.demo.again'); }
    }, 3600));
  }

  /* ---------- firefly ---------- */
  function initFirefly() {
    var f = document.getElementById('firefly');
    if (!f) return;
    var coarse = false;
    try { coarse = window.matchMedia('(pointer: coarse)').matches; } catch (e) {}
    if (coarse || reducedMotion()) { f.style.display = 'none'; return; }
    var x = -600, y = -600, tx = x, ty = y, active = false, raf = null;
    function move(e) {
      tx = e.clientX; ty = e.clientY;
      if (!active) {
        active = true;
        x = tx; y = ty;
        f.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
        f.classList.add('on');
      }
      var t = e.target;
      if (t && t.closest && t.closest('a,button,.pick,.opt,summary')) f.classList.add('hot'); else f.classList.remove('hot');
      if (!raf) raf = requestAnimationFrame(loop);
    }
    function loop() {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      f.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) translate(-50%,-50%)';
      if (Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5) { raf = null; return; }
      raf = requestAnimationFrame(loop);
    }
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', function () { f.classList.remove('on'); });
  }

  /* ---------- picker ---------- */
  var pickedBranch = null;
  function initPicker() {
    var box = document.getElementById('heroPicks');
    if (!box) return;
    box.addEventListener('click', function (ev) {
      var btn = ev.target.closest ? ev.target.closest('.pick') : null;
      if (!btn) return;
      var all = box.querySelectorAll('.pick');
      for (var i = 0; i < all.length; i++) all[i].classList.remove('on');
      btn.classList.add('on');
      var branch = btn.getAttribute('data-branch');
      if (!branch) return;
      setTimeout(function () { startQuiz(branch); }, 120);
    });
  }
  function startFromPicker() { startQuiz(pickedBranch || null); }

  /* ---------- stamp + typewriter ---------- */
  function reducedMotion() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  }
  function startStamp() {
    var logo = document.getElementById('logoStamp');
    if (!logo) return;
    if (reducedMotion() || (window.sessionStorage && sessionStorage.getItem('solo-stamp'))) return;
    logo.classList.remove('play');
    void logo.offsetWidth;
    logo.classList.add('play');
    try { sessionStorage.setItem('solo-stamp', '1'); } catch (e) {}
  }
  var typeTimer = null, typeStarted = false;
  function startType() {
    var line = document.getElementById('typeLine');
    if (!line) return;
    var txt = t('picker.type');
    if (reducedMotion() || typeStarted) { line.textContent = txt; line.parentNode.classList.add('done'); return; }
    typeStarted = true;
    line.textContent = '';
    line.parentNode.classList.remove('done');
    var i = 0;
    function tick() {
      if (i > txt.length) { line.parentNode.classList.add('done'); return; }
      line.textContent = txt.slice(0, i);
      i++;
      typeTimer = setTimeout(tick, 26);
    }
    typeTimer = setTimeout(tick, 900);
  }

  /* ---------- anketa ---------- */
  var quiz = { open: false, branch: null, step: 0, answers: {}, url: '', mode: 'quiz' };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function el(id) { return document.getElementById(id); }
  function overlay() { return el('overlay'); }
  function openModal() { quiz.open = true; if (overlay()) overlay().classList.add('on'); document.body.style.overflow = 'hidden'; }
  function closeModal() { quiz.open = false; if (overlay()) overlay().classList.remove('on'); document.body.style.overflow = ''; }
  function quizPack() { return QZ[lang] || QZ[available()[0]]; }
  function ui(k) { var u = quizPack().ui || {}; return u[k] || ''; }
  function fmt(s, vars) { if (!s) return ''; for (var k in vars) if (vars.hasOwnProperty(k)) s = s.split('{' + k + '}').join(vars[k]); return s; }

  function startQuiz(branch) {
    quiz = { open: false, branch: (branch && quizPack().branches[branch]) ? branch : null, step: 0, answers: {}, url: '', mode: 'quiz' };
    openModal(); renderQuiz();
  }

  function setModal(html) {
    var b = el('modalBody'); if (!b) return;
    b.innerHTML = html;
    b.classList.remove('swap');
    void b.offsetWidth;
    b.classList.add('swap');
  }

  function stepsFor() {
    var br = quizPack().branches[quiz.branch], out = [];
    if (!br) return out;
    if (br.urlStep && !br.urlAtEnd) out.push({ type: 'url' });
    for (var i = 0; i < br.steps.length; i++) {
      out.push({ type: 'q', st: br.steps[i] });
      if (br.urlAfter === i && hasSite()) out.push({ type: 'url' });
    }
    if (br.urlAtEnd) out.push({ type: 'url' });
    return out;
  }
  function hasSite() {
    var br = quizPack().branches[quiz.branch];
    if (!br || br.urlAfter == null) return false;
    var st = br.steps[br.urlAfter];
    var a = quiz.answers[st.id];
    return Array.isArray(a) && a.indexOf(0) !== -1;
  }

  function renderQuiz() {
    if (!quiz.open) return;
    var body = el('modalBody'); if (!body) return;
    if (quiz.mode === 'contact') { setModal(contactFormHtml()); return; }
    if (!quiz.branch) { setModal(entryHtml()); return; }
    var flow = stepsFor();
    if (quiz.step >= flow.length) { setModal(resultHtml()); return; }
    var item = flow[quiz.step];
    var br = quizPack().branches[quiz.branch];
    var pct = Math.round(((quiz.step + 1) / flow.length) * 100);
    var head = '<div class="qnum">' + esc(br.title) + (item.type === 'q' ? ' · ' + esc(fmt(ui('step'), { n: countQuestionsBefore(flow, quiz.step) + 1, t: br.steps.length })) : '') + '</div>';
    head += '<div class="prog"><i style="width:' + pct + '%"></i></div>';
    if (item.type === 'url') { setModal(head + urlHtml()); return; }

    var st = item.st;
    var h = head + '<div class="qtitle">' + esc(st.q) + '</div>';
    if (st.multi) h += '<p class="qhint">' + esc(ui('multi')) + '</p>';
    var sel = quiz.answers[st.id];
    if (st.multi && !Array.isArray(sel)) sel = [];
    h += '<div class="opts">';
    for (var i = 0; i < st.o.length; i++) {
      var on = st.multi ? (sel.indexOf(i) !== -1) : (sel === i);
      h += '<button type="button" class="opt' + (on ? ' sel' : '') + '" onclick="SOLO.choose(' + i + ')">' + esc(st.o[i]) + '</button>';
    }
    h += '</div><div class="mnav"><button type="button" class="link" onclick="SOLO.back()">&#8592; ' + esc(ui('back')) + '</button>';
    if (st.multi) {
      var empty = !sel.length;
      h += '<button type="button" class="btn" id="qNext"' + (empty ? ' disabled' : '') + ' onclick="SOLO.next()">' + esc(ui('next')) + '</button>';
    } else {
      h += '<button type="button" class="link" onclick="SOLO.close()">' + esc(ui('close')) + '</button>';
    }
    h += '</div>';
    setModal(h);
  }
  function countQuestionsBefore(flow, idx) {
    var n = 0;
    for (var i = 0; i < idx; i++) if (flow[i].type === 'q') n++;
    return n;
  }

  function entryHtml() {
    var p = quizPack(), keys = ['a', 'b', 'c', 'd'];
    var h = '<div class="qnum">Solo.Pov</div>';
    h += '<div class="qtitle">' + esc(p.entryTitle) + '</div>';
    h += '<p class="qhint">' + esc(p.entryLead) + '</p><div class="opts">';
    for (var i = 0; i < keys.length; i++) {
      h += '<button type="button" class="opt" onclick="SOLO.chooseBranch(\'' + keys[i] + '\')">' + esc(p.branches[keys[i]].title) + '</button>';
    }
    h += '</div><div class="mnav"><span></span><button type="button" class="link" onclick="SOLO.close()">' + esc(ui('close')) + '</button></div>';
    return h;
  }

  function urlHtml() {
    var h = '<div class="qtitle">' + esc(ui('urlTitle')) + '</div>';
    h += '<p class="qhint">' + esc(ui('urlLead')) + '</p>';
    h += '<div class="field"><label>' + esc(ui('urlTitle')) + '</label><input type="text" id="siteUrl" inputmode="url" placeholder="' + esc(ui('urlPh')) + '" value="' + esc(quiz.url) + '"></div>';
    h += '<div class="qerr" id="urlErr"></div>';
    h += '<div class="mnav"><button type="button" class="link" onclick="SOLO.back()">&#8592; ' + esc(ui('back')) + '</button>';
    h += '<button type="button" class="btn" onclick="SOLO.saveUrl()">' + esc(ui('next')) + '</button></div>';
    h += '<div class="urlskip"><button type="button" class="link" onclick="SOLO.skipUrl()">' + esc(ui('urlSkip')) + '</button></div>';
    return h;
  }

  function chooseBranch(b) {
    if (!quizPack().branches[b]) return;
    quiz.branch = b; quiz.step = 0; quiz.answers = {}; quiz.url = ''; quiz.mode = 'quiz';
    renderQuiz();
  }

  function choose(i) {
    var flow = stepsFor(), item = flow[quiz.step];
    if (!item || item.type !== 'q') return;
    var st = item.st, cur = quiz.answers[st.id];
    if (st.multi) {
      if (!Array.isArray(cur)) cur = [];
      var pos = cur.indexOf(i);
      if (pos === -1) cur.push(i); else cur.splice(pos, 1);
      if (st.exclusive != null && i === st.exclusive && pos === -1) cur = [i];
      else if (st.exclusive != null) cur = cur.filter(function (v) { return v !== st.exclusive; });
      cur.sort(function (a, b) { return a - b; });
      quiz.answers[st.id] = cur;
      renderQuiz(); return;
    }
    quiz.answers[st.id] = i;
    next();
  }

  function next() {
    var flow = stepsFor(), item = flow[quiz.step];
    if (!item) return;
    if (item.type === 'q' && item.st.multi) {
      var a = quiz.answers[item.st.id];
      if (!Array.isArray(a) || !a.length) return;
    }
    quiz.step++;
    renderQuiz();
  }
  function back() {
    if (quiz.step > 0) { quiz.step--; renderQuiz(); }
    else { quiz.branch = null; quiz.step = 0; renderQuiz(); }
  }

  function normalizeUrl(v) {
    v = (v || '').replace(/^\s+|\s+$/g, '');
    if (!v) return '';
    if (!/^https?:\/\//i.test(v)) v = 'https://' + v;
    return v;
  }
  function validUrl(v) {
    if (!v) return true;
    return /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,63}(:\d{1,5})?([\/?#][^\s]*)?$/i.test(v);
  }
  function saveUrl() {
    var inp = el('siteUrl');
    var raw = inp ? inp.value : '';
    var v = normalizeUrl(raw);
    var err = el('urlErr');
    if (!validUrl(v)) { if (err) err.textContent = ui('urlErr'); return; }
    quiz.url = v;
    next();
  }
  function skipUrl() { quiz.url = ''; next(); }

  function pickVariant() {
    var a = quiz.answers, b = quiz.branch;
    if (b === 'a') {
      if (a.q1 === 2 || a.q2 === 2) return 'shop';
      if (a.q1 === 3) return 'booking';
      if (a.q1 === 0) return 'leads';
      if (a.q1 === 1) return 'presentation';
      if (a.q2 === 1) return 'multi';
      return 'unknown';
    }
    if (b === 'b') return a.q2 === 3 ? 'renew' : 'modernize';
    if (b === 'c') return ['visibility', 'conversion', 'sales', 'diagnostics'][a.q1] || 'diagnostics';
    if (b === 'd') {
      var sel = Array.isArray(a.q2) ? a.q2 : [];
      var cats = sel.map(function (i) { return ['assistant', 'content', 'content', 'booking', 'integration'][i]; });
      var uniq = cats.filter(function (v, i) { return v && cats.indexOf(v) === i; });
      if (!uniq.length) return 'combined';
      return uniq.length > 1 ? 'combined' : uniq[0];
    }
    return 'unknown';
  }

  function resultData() {
    var br = quizPack().branches[quiz.branch];
    var v = pickVariant();
    var res = (br.res && br.res[v]) || (br.res && br.res[Object.keys(br.res)[0]]) || { t: '', inc: [], next: '' };
    return { res: res, variant: v };
  }

  function whyList() {
    var br = quizPack().branches[quiz.branch], out = [];
    for (var i = 0; i < br.steps.length; i++) {
      var st = br.steps[i], a = quiz.answers[st.id];
      if (a == null) continue;
      var idxs = Array.isArray(a) ? a : [a];
      for (var j = 0; j < idxs.length; j++) {
        var w = st.why && st.why[idxs[j]];
        if (w && out.indexOf(w) === -1) out.push(w);
        if (out.length >= 3) break;
      }
      if (out.length >= 3) break;
    }
    if (out.length < 2) out.push(br.baseWhy);
    return out.slice(0, 3);
  }

  function resultHtml() {
    var br = quizPack().branches[quiz.branch];
    var data = resultData(), r = data.res, h = '';
    h += '<div class="qnum">Solo.Pov</div><div class="prog"><i style="width:100%"></i></div>';
    h += '<div class="qtitle">' + esc(ui('resultTitle')) + '</div>';
    h += '<div class="qres">';
    h += '<div class="qres-block"><h4>' + esc(ui('resultRec')) + '</h4><p class="qres-title">' + esc(r.t) + '</p></div>';
    var whys = whyList();
    h += '<div class="qres-block"><h4>' + esc(ui('resultWhy')) + '</h4><ul>';
    for (var i = 0; i < whys.length; i++) h += '<li>' + esc(whys[i]) + '</li>';
    h += '</ul></div>';
    h += '<div class="qres-block"><h4>' + esc(ui('resultInc')) + '</h4><ul>';
    for (var j = 0; j < r.inc.length; j++) h += '<li>' + esc(r.inc[j]) + '</li>';
    h += '</ul></div>';
    h += '<div class="qres-block"><h4>' + esc(ui('resultNext')) + '</h4><p>' + esc(r.next) + '</p></div>';
    if (quiz.branch === 'b' || quiz.branch === 'c') {
      var durl = 'pages/brezplacna-analiza.html?lang=' + lang + (quiz.url ? '&site=' + encodeURIComponent(quiz.url) : '');
      h += '<div class="qres-block qres-diag"><h4>' + esc(ui('resDiagTitle')) + '</h4><p>' + esc(ui('resDiagText')) + '</p>' +
           '<a class="btn ghost sm" href="' + durl + '">' + esc(ui('resDiagBtn')) + '</a></div>';
    }
    h += '</div>';
    h += '<p class="result-note">' + esc(ui('resultNote')) + '</p>';
    if (quiz.url) h += '<div class="notice small">' + esc(ui('urlSaved')) + '</div>';
    h += '<div class="emailbox">';
    h += '<h4>' + esc(ui('emailTitle')) + '</h4><p class="qhint">' + esc(ui('emailLead')) + '</p>';
    h += '<div class="field"><label>' + esc(ui('industryLabel')) + ' <span class="rec-badge">' + esc(ui('industryRecommended')) + '</span></label><input type="text" id="planIndustry" placeholder="' + esc(ui('industryPh')) + '"></div>';
    h += '<div class="field"><label>' + esc(ui('notesLabel')) + '</label><textarea rows="3" id="planNotes" placeholder="' + esc(ui('notesPh')) + '"></textarea></div>';
    h += '<small class="meta plan-help">' + esc(ui('planHelp')) + '</small>';
    h += '<div class="field"><label>' + esc(ui('emailLabel')) + '</label><input type="email" id="planEmail" placeholder="' + esc(ui('emailPh')) + '"></div>';
    h += '<small class="meta email-purpose">' + esc(ui('emailPurpose')) + '</small>';
    h += '<label class="check"><input type="checkbox" id="planConsent"><span>' + esc(ui('consentLabel')) + '</span></label>';
    h += '<small class="consent-note">' + esc(ui('consentNote')) + '</small>';
    var purl = (CONFIG.legal && CONFIG.legal.privacyUrl) ? CONFIG.legal.privacyUrl : 'privacy.html';
    h += '<a class="privacy-link" href="' + esc(purl) + '" target="_blank" rel="noopener">' + esc(ui('privacy')) + '</a>';
    h += '<div class="qerr" id="emailErr"></div>';
    h += '<button type="button" class="btn" onclick="SOLO.submitPlan()">' + esc(ui('emailBtn')) + '</button>';
    h += '<small class="meta">' + esc(ui('emailNote')) + '</small>';
    h += '</div>';
    h += '<div class="mnav"><button type="button" class="link" onclick="SOLO.startQuiz()">' + esc(ui('start')) + '</button>';
    h += '<button type="button" class="link" onclick="SOLO.close()">' + esc(ui('close')) + '</button></div>';
    return h;
  }

  function answersRows() {
    var br = quizPack().branches[quiz.branch], out = [];
    for (var i = 0; i < br.steps.length; i++) {
      var st = br.steps[i], a = quiz.answers[st.id];
      if (a == null || (Array.isArray(a) && !a.length)) continue;
      var labels = Array.isArray(a) ? a.map(function (x) { return st.o[x]; }) : [st.o[a]];
      out.push({ q: st.q, a: labels.join('; ') });
    }
    return out;
  }

  function emailValid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  var CONSENT_VERSION = '2026-10-18';
  function submitPlan() {
    var inp = el('planEmail'), err = el('emailErr');
    var email = inp ? inp.value.replace(/^\s+|\s+$/g, '') : '';
    if (!emailValid(email)) { if (err) err.textContent = ui('emailErr'); return; }
    var consent = el('planConsent');
    var on = !!(consent && consent.checked);
    var industry = val('planIndustry'), notes = val('planNotes');
    deliver(buildText('plan', email, on, industry, notes), buildLead(email, on, industry, notes));
  }

  function buildLead(email, consent, industry, notes) {
    var br = quizPack().branches[quiz.branch], data = resultData(), answers = [];
    for (var i = 0; i < br.steps.length; i++) {
      var st = br.steps[i], a = quiz.answers[st.id];
      if (a == null || (Array.isArray(a) && !a.length)) continue;
      var ids = Array.isArray(a) ? a.slice() : [a];
      answers.push({
        questionId: st.id,
        question: st.q,
        optionIds: ids,
        answers: ids.map(function (x) { return st.o[x]; })
      });
    }
    var interest = { a: 'site_creation', b: 'site_redesign', c: 'seo_leads', d: 'ai_automation' }[quiz.branch] || '';
    return {
      id: 'lead_' + Date.now(),
      email: email,
      date: new Date().toISOString(),
      lang: lang,
      branch: quiz.branch,
      branchTitle: br.title,
      interest: interest,
      answers: answers,
      siteUrl: quiz.url || '',
      industry: industry || '',
      notes: notes || '',
      recommendation: { key: data.variant, title: data.res.t, next: data.res.next },
      type: 'quiz',
      utm: utmParams(),
      marketingConsent: !!consent,
      consentTextVersion: CONSENT_VERSION,
      consentDate: consent ? new Date().toISOString() : null,
      status: 'new'
    };
  }

  function buildText(kind, email, consent, industry, notes) {
    var L = lang === 'ru', lines = [], br = quiz.branch ? quizPack().branches[quiz.branch] : null;
    lines.push((L ? 'Заявка Solo.Pov' : 'Povpraševanje Solo.Pov') + (kind === 'plan' ? (L ? ' — подробный план' : ' — podroben načrt') : ''));
    lines.push((L ? 'Дата' : 'Datum') + ': ' + new Date().toLocaleString(L ? 'ru-RU' : 'sl-SI'));
    lines.push((L ? 'Язык' : 'Jezik') + ': ' + lang.toUpperCase());
    if (br) {
      lines.push((L ? 'Ситуация' : 'Izhodišče') + ': ' + br.title);
      var rows = answersRows();
      for (var i = 0; i < rows.length; i++) lines.push(rows[i].q + ': ' + rows[i].a);
      if (quiz.url) lines.push((L ? 'Сайт' : 'Spletna stran') + ': ' + quiz.url);
      var rd = resultData();
      lines.push((L ? 'Рекомендация' : 'Priporočilo') + ': ' + rd.res.t);
      lines.push((L ? 'Следующий шаг' : 'Naslednji korak') + ': ' + rd.res.next);
    }
    if (kind === 'contact') {
      var b = val('c-business'), c = val('c-contact'), n = val('c-notes');
      if (b) lines.push((L ? 'Бизнес' : 'Dejavnost') + ': ' + b);
      if (c) lines.push((L ? 'Связь' : 'Kontakt') + ': ' + c);
      if (n) lines.push((L ? 'Пожелания' : 'Želje') + ': ' + n);
      return lines.join('\n');
    }
    if (industry) lines.push((L ? 'Сфера деятельности' : 'Dejavnost') + ': ' + industry);
    if (notes) lines.push((L ? 'Дополнительно' : 'Dodatne informacije') + ': ' + notes);
    if (email) lines.push((L ? 'Email' : 'Email') + ': ' + email);
    lines.push((L ? 'Согласие на маркетинговые сообщения' : 'Soglasje za marketinška obvestila') + ': ' + (consent ? (L ? 'да' : 'da') : (L ? 'нет' : 'ne')));
    lines.push((L ? 'Версия текста согласия' : 'Različica besedila soglasja') + ': ' + CONSENT_VERSION);
    if (consent) lines.push((L ? 'Дата согласия' : 'Datum soglasja') + ': ' + new Date().toISOString());
    return lines.join('\n');
  }

  function notReadyHtml(text) {
    var h = '<div class="qnum">Solo.Pov</div><div class="qtitle">' + esc(ui('notReadyTitle')) + '</div>';
    h += '<div class="notice">' + ui('notReadyText') + '</div>';
    h += '<pre class="copyout" id="copyout">' + esc(text) + '</pre>';
    h += '<div class="mnav"><button type="button" class="link" onclick="SOLO.close()">' + esc(ui('ok')) + '</button>';
    h += '<button type="button" class="btn" id="copyBtn" onclick="SOLO.copyText()">' + esc(ui('copy')) + '</button></div>';
    return h;
  }

  function sentHtml() {
    var h = '<div class="qnum">Solo.Pov</div><div class="qtitle">' + esc(ui('sentTitle')) + '</div>';
    h += '<div class="notice">' + esc(ui('sentText')) + '</div>';
    h += '<div class="mnav"><span></span><button type="button" class="link" onclick="SOLO.close()">' + esc(ui('close')) + '</button></div>';
    return h;
  }
  function deliver(text, lead) {
    var ep = (CONFIG.crm && CONFIG.crm.enabled && CONFIG.crm.endpoint) || (CONFIG.submit && CONFIG.submit.enabled && CONFIG.submit.endpoint);
    if (ep) {
      try {
        window.fetch(ep, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(lead || { lang: lang, text: text }) })
          .then(function () { if (window.soloTrack) window.soloTrack('generate_lead', { form: 'contact' }); setModal(sentHtml()); })
          .catch(function () { setModal(notReadyHtml(text)); });
        return;
      } catch (e) {}
    }
    setModal(notReadyHtml(text));
  }

  function field(id, labelKey, phKey, req) {
    return '<div class="field"><label>' + esc(t(labelKey)) + '</label><input type="text" id="' + id + '" data-i18n-ph="' + phKey + '"' + (req ? ' required' : '') + ' placeholder="' + esc(t(phKey)) + '"></div>';
  }
  function contactFormHtml() {
    var h = '<div class="qnum">Solo.Pov</div><div class="qtitle">' + esc(t('cta.talk')) + '</div>';
    h += '<form id="contactForm" onsubmit="return SOLO.submitContact(event)">';
    h += field('c-business', 'quiz.f.business', 'quiz.f.business.ph', false);
    h += field('c-contact', 'quiz.f.contact', 'quiz.f.contact.ph', true);
    h += '<div class="field"><label>' + esc(t('quiz.f.notes')) + '</label><textarea rows="4" id="c-notes" data-i18n-ph="quiz.f.notes.ph"></textarea></div>';
    h += '<div class="mnav"><button type="button" class="link" onclick="SOLO.startQuiz()">' + esc(t('picker.btn')) + '</button>';
    h += '<button type="submit" class="btn">' + esc(t('quiz.submit')) + '</button></div></form>';
    return h;
  }
  function val(id) { var e = el(id); return e ? e.value.replace(/^\s+|\s+$/g, '') : ''; }
  function submitContact(e) {
    e.preventDefault();
    var f = el('contactForm');
    if (f && !f.checkValidity()) { f.reportValidity(); return false; }
    var leadC = {
      type: 'contact', id: 'lead_' + Date.now(), date: new Date().toISOString(),
      lang: lang, branch: '', interest: '', branchTitle: '',
      email: '', contact: val('c-contact'), industry: val('c-business'),
      notes: val('c-notes'), answers: [], utm: utmParams(), status: 'new'
    };
    deliver(buildText('contact', '', false, val('c-business'), val('c-notes')), leadC); return false;
  }

  function copyText() {
    var pre = el('copyout'); if (!pre) return;
    var txt = pre.textContent;
    var done = function () { var b = el('copyBtn'); if (b) b.textContent = ui('copied'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(pre, done); });
    else fallbackCopy(pre, done);
  }
  function fallbackCopy(pre, done) {
    try {
      var r = document.createRange(); r.selectNodeContents(pre);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      document.execCommand('copy'); done();
    } catch (e) {}
  }

  function openContact(e) {
    if (e && e.preventDefault) e.preventDefault();
    quiz = { open: false, branch: null, step: 0, answers: {}, url: '', mode: 'contact' };
    openModal(); renderQuiz();
  }

  window.SOLO = {
    startQuiz: startQuiz, chooseBranch: chooseBranch, choose: choose, next: next, back: back,
    close: closeModal, submitPlan: submitPlan, submitContact: submitContact, copyText: copyText,
    saveUrl: saveUrl, skipUrl: skipUrl, buildLead: buildLead,
    openContact: openContact, setLang: setLang, renderQuiz: renderQuiz, t: t,
    runDemo: runDemo, startFromPicker: startFromPicker,
    getLang: function () { return lang; }
  };

  initLang();
  document.addEventListener('DOMContentLoaded', function () {
    applyI18n();
    renderWorks();
    initPicker();
    startStamp();
    startType();
    var cards = document.querySelectorAll('[data-quiz]');
    for (var i = 0; i < cards.length; i++) {
      (function (node) { node.addEventListener('click', function () { startQuiz(node.getAttribute('data-quiz')); }); })(cards[i]);
    }
    var m = getParam('quiz');
    if (m && quizPack().branches[m]) startQuiz(m);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  });
})();
