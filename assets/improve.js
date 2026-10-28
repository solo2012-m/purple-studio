/* Solo.Pov — improvement page logic */
(function () {
  'use strict';
  var state = { services: {}, type: 'improve' };
  var CONSENT_VERSION = '2026-10-18';

  var ICONS = {
    content: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 14l1-3 7-7 2 2-7 7-3 1z"/><path d="M10 5l3 3"/></svg>',
    bug: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M9 15a4 4 0 004-4v-1a4 4 0 00-8 0v1a4 4 0 004 4z"/><path d="M9 6V4M6 5l-2-1M12 5l2-1M5 10H2M13 10h3M6 13l-2 2M12 13l2 2"/></svg>',
    block: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="3" width="12" height="12" rx="2"/><path d="M9 6v6M6 9h6"/></svg>',
    page: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="4" y="2.5" width="10" height="13" rx="2"/><path d="M7 6h4M7 9h4M7 12h2"/></svg>',
    form: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="3" width="12" height="12" rx="2"/><path d="M6 7h6M6 10h6M6 13h3"/></svg>',
    mobile: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="5" y="2.5" width="8" height="13" rx="2"/><path d="M8 5h2M8 13h2"/></svg>',
    speed: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M3 13a6 6 0 1112 0"/><path d="M9 13l3-4"/><circle cx="9" cy="13" r="1"/></svg>',
    seo: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="8" cy="8" r="4.5"/><path d="M11.5 11.5L15 15"/></svg>',
    lang: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="9" cy="9" r="6"/><path d="M3 9h12M9 3c2 2.2 2 9.8 0 12M9 3c-2 2.2-2 9.8 0 12"/></svg>',
    booking: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="4" width="12" height="11" rx="2"/><path d="M3 7h12M6 2.5v3M12 2.5v3M6 10h2M10 10h2M6 12.5h2"/></svg>',
    redesign: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2.5" y="3" width="13" height="12" rx="2"/><path d="M2.5 6.5h13M6 9.5h3M6 12h5"/></svg>',
    complex: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M9 2.5l6 3v7l-6 3-6-3v-7l6-3z"/><path d="M3 5.5l6 3 6-3M9 8.5v7"/></svg>'
  };

  function lang() { return (window.SOLO && SOLO.getLang) ? SOLO.getLang() : 'sl'; }
  function t(k) { return (window.SOLO && SOLO.t) ? SOLO.t(k) : ''; }
  function data() { var d = window.SOLO_IMPROVE || {}; return d[lang()] || d.sl; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function money(n) { return n == null ? (lang() === 'ru' ? 'Индивидуально' : 'Individualno') : (lang() === 'ru' ? 'от ' : 'od ') + n + ' €'; }
  function selected() {
    var all = data().services, out = [];
    for (var i = 0; i < all.length; i++) if (state.services[all[i].id]) out.push(all[i]);
    return out;
  }
  function typeKey() {
    return state.type === 'express' ? 'improve.request.typeExpress' : (state.type === 'audit' ? 'improve.request.typeAudit' : 'improve.request.typeImprove');
  }

  function renderServices() {
    var box = document.getElementById('serviceGrid'); if (!box) return;
    var all = data().services, h = '';
    for (var i = 0; i < all.length; i++) {
      var s = all[i], on = !!state.services[s.id];
      h += '<label class="service-card' + (on ? ' sel' : '') + '" data-service="' + s.id + '">';
      h += '<input type="checkbox" ' + (on ? 'checked ' : '') + 'onchange="toggleService(\'' + s.id + '\')">';
      h += '<span class="service-check" aria-hidden="true"></span>';
      h += '<span class="service-ico" aria-hidden="true">' + (ICONS[s.id] || '') + '</span>';
      h += '<b>' + esc(s.title) + '</b><span class="service-desc">' + esc(s.desc) + '</span>';
      h += '<span class="service-price">' + esc(money(s.price)) + '</span>';
      h += '</label>';
    }
    box.innerHTML = h;
  }

  function renderRequest() {
    var list = document.getElementById('selectedList'); if (!list) return;
    var sel = selected(), h = '';
    var typeLabel = t(typeKey());
    var typeEl = document.getElementById('requestType'); if (typeEl) typeEl.textContent = typeLabel;
    if (sel.length) {
      for (var i = 0; i < sel.length; i++) {
        h += '<div class="selected-item"><span><b>' + esc(sel[i].title) + '</b><small>' + esc(money(sel[i].price)) + '</small></span>';
        h += '<button type="button" class="sel-remove" onclick="removeService(\'' + sel[i].id + '\')" aria-label="' + esc(t('improve.request.remove')) + '">&times;</button></div>';
      }
      list.innerHTML = h;
    } else if (state.type === 'express' || state.type === 'audit') {
      var note = state.type === 'express' ? t('improve.request.expressNote') : t('improve.request.auditNote');
      list.innerHTML = '<div class="selected-item"><span><b>' + esc(typeLabel) + '</b><small>' + esc(note) + '</small></span></div>';
    } else {
      list.innerHTML = '<div class="request-empty"><p>' + esc(t('improve.request.empty')) + '</p><button type="button" class="btn ghost sm" onclick="openExpress()">' + esc(t('improve.request.emptyBtn')) + '</button></div>';
    }
    var submit = document.getElementById('improveSubmit');
    if (submit) submit.disabled = (state.type === 'improve' && !sel.length);
    var err = document.getElementById('reqErr');
    if (err) err.textContent = '';
  }

  function renderAudit() {
    var d = data(), dirs = document.getElementById('auditDirections'), list = document.getElementById('auditDetailsList'), h = '';
    if (dirs) {
      for (var i = 0; i < d.auditDirections.length; i++) {
        var x = d.auditDirections[i];
        h += '<div class="audit-dir"><span>0' + (i + 1) + '</span><b>' + esc(x.title) + '</b><p>' + esc(x.desc) + '</p></div>';
      }
      dirs.innerHTML = h;
    }
    if (list) {
      h = '';
      for (var j = 0; j < d.auditItems.length; j++) h += '<li>' + esc(d.auditItems[j]) + '</li>';
      list.innerHTML = h;
    }
  }

  function renderImprove() { renderServices(); renderRequest(); renderAudit(); }

  window.renderImprove = renderImprove;
  window.toggleService = function (id) {
    state.services[id] = !state.services[id];
    state.type = 'improve';
    renderImprove();
  };
  window.removeService = function (id) {
    state.services[id] = false;
    if (!selected().length) state.type = 'improve';
    renderImprove();
  };
  function improveScrollTo(id) {
    var target = document.getElementById(id); if (!target) return;
    var header = document.querySelector('header');
    var off = (header ? header.offsetHeight : 0) + 20;
    var reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    var top = target.getBoundingClientRect().top + window.scrollY - off;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
  }
  window.improveScrollTo = improveScrollTo;

  window.openExpress = function () {
    improveScrollTo('express');
    var input = document.getElementById('expressUrl');
    if (input) setTimeout(function () { input.focus(); }, 350);
  };
  window.requestFromExpress = function () {
    var u = document.getElementById('expressUrl'), c = document.getElementById('expressConcern');
    var ru = document.getElementById('reqUrl'), rc = document.getElementById('reqComment');
    if (ru && u && !ru.value) ru.value = normalizeUrl(u.value);
    if (rc && c && !rc.value) rc.value = c.value;
    state.type = 'express';
    renderRequest();
    var req = document.getElementById('request');
    if (req) req.scrollIntoView({ behavior: 'smooth', block: 'start' });
    var email = document.getElementById('reqEmail');
    if (email) setTimeout(function () { email.focus(); }, 350);
  };
  window.startAudit = function () {
    state.services = {};
    state.type = 'audit';
    var c = document.getElementById('reqComment');
    if (c && !c.value) c.value = lang() === 'ru' ? 'Профессиональный аудит сайта.' : 'Profesionalna revizija strani.';
    renderRequest();
    var req = document.getElementById('request');
    if (req) req.scrollIntoView({ behavior: 'smooth', block: 'start' });
    var email = document.getElementById('reqEmail');
    if (email) setTimeout(function () { email.focus(); }, 350);
  };

  function validUrl(v) { return /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,63}(:\d{1,5})?([\/?#][^\s]*)?$/i.test(v); }
  function normalizeUrl(v) {
    v = (v || '').replace(/^\s+|\s+$/g, '');
    if (v && !/^https?:\/\//i.test(v)) v = 'https://' + v;
    return v;
  }
  function emailValid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  window.submitExpress = function (e) {
    e.preventDefault();
    var input = document.getElementById('expressUrl'), err = document.getElementById('expressErr');
    var url = normalizeUrl(input ? input.value : '');
    if (!validUrl(url)) { if (err) err.textContent = t('improve.express.errUrl'); return false; }
    if (err) err.textContent = '';
    if (window.CONFIG && CONFIG.express && CONFIG.express.enabled && CONFIG.express.endpoint) {
      try {
        window.fetch(CONFIG.express.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url, concern: (document.getElementById('expressConcern') || {}).value || '', lang: lang() }) })
          .then(function (r) { return r.json(); })
          .then(function (d) { renderExpressResults(d); })
          .catch(function () { showExpressNotice(); });
        return false;
      } catch (ex) {}
    }
    showExpressNotice();
    return false;
  };
  function showExpressNotice() {
    var n = document.getElementById('expressNotice');
    if (n) { n.hidden = false; n.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  }
  /* Future: render actual PageSpeed/SEO results here. Never show invented values. */
  function renderExpressResults(d) {
    var n = document.getElementById('expressNotice');
    if (!n) return;
    n.hidden = false;
    n.innerHTML = '<b>' + esc(lang() === 'ru' ? 'Результат проверки' : 'Rezultat pregleda') + '</b><p>' + esc(lang() === 'ru' ? 'Показатели получены.' : 'Kazalniki so pridobljeni.') + '</p>';
  }

  function buildText(type, url, services, comment, email, consent) {
    var ru = lang() === 'ru', lines = [];
    lines.push(ru ? 'Заявка Solo.Pov — улучшение сайта' : 'Povpraševanje Solo.Pov — izboljšanje strani');
    lines.push((ru ? 'Дата' : 'Datum') + ': ' + new Date().toLocaleString(ru ? 'ru-RU' : 'sl-SI'));
    lines.push((ru ? 'Язык' : 'Jezik') + ': ' + lang().toUpperCase());
    lines.push((ru ? 'Тип запроса' : 'Vrsta zahteve') + ': ' + t(typeKey()));
    if (url) lines.push((ru ? 'Сайт' : 'Stran') + ': ' + url);
    if (services.length) {
      lines.push((ru ? 'Выбранные работы' : 'Izbrana dela') + ':');
      for (var i = 0; i < services.length; i++) lines.push('- ' + services[i].title + ' — ' + money(services[i].price));
    }
    if (comment) lines.push((ru ? 'Комментарий' : 'Komentar') + ': ' + comment);
    if (email) lines.push('Email: ' + email);
    lines.push((ru ? 'Согласие на материалы' : 'Soglasje za gradiva') + ': ' + (consent ? (ru ? 'да' : 'da') : (ru ? 'нет' : 'ne')));
    lines.push((ru ? 'Версия согласия' : 'Različica soglasja') + ': ' + CONSENT_VERSION);
    return lines.join('\n');
  }

  function buildLead(type, url, services, comment, email, consent) {
    return {
      id: 'lead_' + Date.now(),
      date: new Date().toISOString(),
      lang: lang(),
      type: type,
      siteUrl: url,
      services: services.map(function (s) { return { id: s.id, title: s.title, price: s.price }; }),
      comment: comment,
      email: email,
      marketingConsent: !!consent,
      consentTextVersion: CONSENT_VERSION,
      consentDate: consent ? new Date().toISOString() : null,
      status: 'new'
    };
  }

  window.submitImprove = function (e) {
    e.preventDefault();
    var err = document.getElementById('reqErr');
    var url = normalizeUrl((document.getElementById('reqUrl') || {}).value || '');
    var comment = (document.getElementById('reqComment') || {}).value || '';
    var email = ((document.getElementById('reqEmail') || {}).value || '').replace(/^\s+|\s+$/g, '');
    var consent = !!(document.getElementById('reqConsent') || {}).checked;
    var sel = selected();
    if (url && !validUrl(url)) { if (err) err.textContent = t('improve.request.errUrl'); return false; }
    if (!emailValid(email)) { if (err) err.textContent = t('improve.request.errEmail'); return false; }
    if (state.type === 'improve' && !sel.length) { if (err) err.textContent = t('improve.request.errService'); return false; }
    if (err) err.textContent = '';
    var text = buildText(state.type, url, sel, comment, email, consent);
    var lead = buildLead(state.type, url, sel, comment, email, consent);
    deliverImprove(text, lead);
    return false;
  };

  function deliverImprove(text, lead) {
    var ep = (window.CONFIG && CONFIG.improve && CONFIG.improve.enabled && CONFIG.improve.endpoint) || (window.CONFIG && CONFIG.submit && CONFIG.submit.enabled && CONFIG.submit.endpoint);
    if (ep) {
      try {
        window.fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
          .then(function (r) { if (r && r.ok) { if (window.soloTrack) window.soloTrack('generate_lead', { form: 'improve' }); showImproveResult(true, text); } else showImproveResult(false, text); })
          .catch(function () { showImproveResult(false, text); });
        return;
      } catch (ex) {}
    }
    showImproveResult(false, text);
  }

  function showImproveResult(sent, text) {
    var form = document.getElementById('improveForm'), res = document.getElementById('improveResult');
    if (!res) return;
    if (form) form.hidden = true;
    res.hidden = false;
    res.innerHTML = '<h3>' + esc(sent ? (lang() === 'ru' ? 'Спасибо!' : 'Hvala!') : t('improve.request.notSentTitle')) + '</h3>';
    if (sent) {
      res.innerHTML += '<p>' + esc(lang() === 'ru' ? 'Заявка отправлена.' : 'Zahteva je poslana.') + '</p>';
    } else {
      res.innerHTML += '<div class="notice">' + t('improve.request.notSentText') + '</div>';
      res.innerHTML += '<pre class="copyout" id="improveCopyout">' + esc(text) + '</pre>';
      res.innerHTML += '<div class="mnav"><button type="button" class="link" onclick="backToImproveForm()">' + esc(t('improve.request.back')) + '</button>';
      res.innerHTML += '<button type="button" class="btn" id="improveCopyBtn" onclick="copyImprove()">' + esc(t('improve.request.copy')) + '</button></div>';
    }
    res.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.backToImproveForm = function () {
    var form = document.getElementById('improveForm'), res = document.getElementById('improveResult');
    if (form) form.hidden = false;
    if (res) res.hidden = true;
    var req = document.getElementById('request'); if (req) req.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  window.copyImprove = function () {
    var pre = document.getElementById('improveCopyout'); if (!pre) return;
    var txt = pre.textContent, done = function () { var b = document.getElementById('improveCopyBtn'); if (b) b.textContent = t('improve.request.copied'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(pre, done); });
    else fallbackCopy(pre, done);
  };
  function fallbackCopy(pre, done) {
    try { var r = document.createRange(); r.selectNodeContents(pre); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand('copy'); done(); } catch (e) {}
  }

  function syncHeader() {
    var h = document.querySelector('header');
    if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
  }
  syncHeader();
  window.addEventListener('resize', syncHeader);
  window.addEventListener('load', syncHeader);
  if (window.ResizeObserver) {
    var hh = document.querySelector('header');
    if (hh) new ResizeObserver(syncHeader).observe(hh);
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderImprove();
    var link = document.querySelector('.entry-card[href="#services"]');
    if (link) link.addEventListener('click', function (e) { e.preventDefault(); improveScrollTo('services'); });
  });
})();
