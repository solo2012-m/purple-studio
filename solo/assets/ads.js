/* Solo.Pov — advertising and promotion page logic */
(function () {
  'use strict';
  var state = { options: {}, issues: {} };
  var CONSENT_VERSION = '2026-10-18';

  function lang() { return (window.SOLO && SOLO.getLang) ? SOLO.getLang() : 'sl'; }
  function D() { var d = window.SOLO_ADS || {}; return d[lang()] || d.sl; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function $(id) { return document.getElementById(id); }

  function syncHeader() { var h = document.querySelector('header'); if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px'); }
  function scrollToId(id) {
    var el = document.getElementById(id); if (!el) return;
    var h = document.querySelector('header'), off = (h ? h.offsetHeight : 0) + 20;
    var reduce = false; try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - off), behavior: reduce ? 'auto' : 'smooth' });
  }
  window.adsScrollTo = scrollToId;
  window.adsGo = function (e, id) { if (e) e.preventDefault(); scrollToId(id); return false; };

  function allOptions() { var out = [], cs = D().catalog.categories; for (var i = 0; i < cs.length; i++) for (var j = 0; j < cs[i].options.length; j++) out.push({ cat: cs[i], opt: cs[i].options[j] }); return out; }
  function optionById(id) { var a = allOptions(); for (var i = 0; i < a.length; i++) if (a[i].opt.id === id) return a[i]; return null; }
  function selectedOptions() { var a = allOptions(), out = []; for (var i = 0; i < a.length; i++) if (state.options[a[i].opt.id]) out.push(a[i]); return out; }
  function selectedIssues() { var a = D().issues.items, out = []; for (var i = 0; i < a.length; i++) if (state.issues[a[i].id]) out.push(a[i]); return out; }
  function typeLabel(t) { var f = D().form; return t === 'monthly' ? f.monthly : (t === 'individual' ? f.individual : f.setup); }
  function optLabel(x) { return (x.cat.id === 'google' || x.cat.id === 'meta' ? x.cat.title + ' — ' : '') + x.opt.title; }

  function renderHero() {
    var d = D(), h = '';
    h += '<span class="eyebrow">' + esc(d.hero.eyebrow) + '</span><h1 class="ads-title">' + esc(d.hero.title) + '</h1><p class="ads-lead">' + esc(d.hero.sub) + '</p>';
    h += '<div class="ads-scenarios">';
    for (var i = 0; i < d.scenarios.length; i++) {
      var s = d.scenarios[i];
      h += '<a class="ads-scenario" href="#' + (s.id === 'start' ? 'catalog' : 'issues') + '" onclick="return adsGo(event,\'' + (s.id === 'start' ? 'catalog' : 'issues') + '\')"><span class="ads-num">' + esc(s.n) + '</span><b>' + esc(s.title) + '</b><p>' + esc(s.desc) + '</p><span class="ads-link">' + esc(lang() === 'ru' ? 'Перейти →' : 'Naprej →') + '</span></a>';
    }
    h += '</div>';
    $('adsHero').innerHTML = h;
  }

  function optionCard(x) {
    var sel = !!state.options[x.opt.id], h = '';
    h += '<div class="ads-option' + (sel ? ' sel' : '') + '" data-opt="' + x.opt.id + '" role="button" tabindex="0" aria-pressed="' + sel + '" onclick="toggleOption(\'' + x.opt.id + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleOption(\'' + x.opt.id + '\')}">';
    if (sel) h += '<span class="ads-sel">' + esc(lang() === 'ru' ? 'Выбрано' : 'Izbrano') + '</span>';
    h += '<span class="ads-type">' + esc(typeLabel(x.opt.type)) + '</span>';
    h += '<b>' + esc(x.opt.title) + '</b>';
    if (x.opt.features) {
      h += '<ul>';
      for (var i = 0; i < x.opt.features.length; i++) h += '<li>' + esc(x.opt.features[i]) + '</li>';
      h += '</ul>';
    }
    h += '<span class="ads-price">' + esc(x.opt.price) + '</span>';
    if (x.opt.note) h += '<small class="ads-note">' + esc(x.opt.note) + '</small>';
    h += '</div>';
    return h;
  }

  function groupHead(g) {
    return '<div class="ads-group-head"><span class="ads-group-num">' + esc(g.num) + '</span><div><h3>' + esc(g.title) + '</h3><p>' + esc(g.sub) + '</p></div></div>';
  }
  function paidCard(c) {
    var h = '<div class="ads-paid-card"><div class="ads-cat-head"><span class="ads-letter">' + esc(c.letter) + '</span><div><h4>' + esc(c.title) + '</h4><p>' + esc(c.desc) + '</p></div></div>';
    h += '<ul class="ads-features">';
    for (var i = 0; i < c.features.length; i++) h += '<li>' + esc(c.features[i]) + '</li>';
    h += '</ul><div class="ads-options">';
    for (var j = 0; j < c.options.length; j++) h += optionCard({ cat: c, opt: c.options[j] });
    return h + '</div></div>';
  }
  function renderCatalog() {
    var d = D().catalog, g = d.groups, byId = {};
    for (var i = 0; i < d.categories.length; i++) byId[d.categories[i].id] = d.categories[i];
    var h = '<div class="ads-section-head"><h2>' + esc(d.title) + '</h2><p class="ads-lead">' + esc(d.sub) + '</p></div>';
    h += '<div class="ads-group"><div class="ads-section-head ads-section-head--small">' + groupHead(g[0]) + '</div><div class="ads-paid-grid">';
    h += paidCard(byId.google) + paidCard(byId.meta);
    h += '</div><p class="ads-budget-note">' + esc(D().form.budgetNote) + '</p></div>';
    var seo = byId.seo;
    h += '<div class="ads-group">' + groupHead(g[1]) + '<p class="ads-cat-note">' + esc(seo.desc) + '</p><div class="ads-options ads-options--3">';
    for (var j = 0; j < seo.options.length; j++) h += optionCard({ cat: seo, opt: seo.options[j] });
    h += '</div><p class="ads-cat-note">' + esc(seo.note) + '</p></div>';
    var a = byId.analytics;
    h += '<div class="ads-group">' + groupHead(g[2]) + '<ul class="ads-features">';
    for (var k = 0; k < a.features.length; k++) h += '<li>' + esc(a.features[k]) + '</li>';
    h += '</ul><div class="ads-options ads-options--3">';
    for (var m = 0; m < a.options.length; m++) h += optionCard({ cat: a, opt: a.options[m] });
    h += '</div><p class="ads-cat-note">' + esc(a.note) + '</p></div>';
    $('catalogBox').innerHTML = h;
  }
  window.toggleOption = function (id) { state.options[id] = !state.options[id]; renderCatalog(); refreshSummary(); };

  function renderIssues() {
    var d = D().issues, e = D().explainer, g = D().catalog.groups[3], h = '';
    h += '<div class="ads-group ads-group--last">' + groupHead(g);
    h += '<div class="ads-section-head ads-section-head--small"><h2>' + esc(d.title) + '</h2><p class="ads-lead">' + esc(d.sub) + '</p></div><div class="ads-issues">';
    for (var i = 0; i < d.items.length; i++) {
      var it = d.items[i], sel = !!state.issues[it.id];
      h += '<div class="ads-issue' + (sel ? ' sel' : '') + '" role="button" tabindex="0" aria-pressed="' + sel + '" onclick="toggleIssue(\'' + it.id + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleIssue(\'' + it.id + '\')}"><span class="ads-issue-check">' + (sel ? '✓' : '') + '</span>' + esc(it.label) + '</div>';
    }
    h += '</div><p class="ads-footnote">' + esc(d.note) + '</p><div class="ads-actions"><button type="button" class="btn" onclick="adsScrollTo(\'request\')">' + esc(d.cta) + '</button></div>';
    h += '<div class="ads-explainer-block"><h3>' + esc(e.title) + '</h3><div class="ads-explainer ads-explainer--compact">';
    for (var j = 0; j < e.items.length; j++) h += '<div class="ads-expl"><b>' + esc(e.items[j].title) + '</b><p>' + esc(e.items[j].desc) + '</p></div>';
    h += '</div><p class="ads-footnote">' + esc(e.note) + '</p></div></div>';
    $('issuesBox').innerHTML = h;
  }
  window.toggleIssue = function (id) { state.issues[id] = !state.issues[id]; renderIssues(); refreshSummary(); };

  function renderExplainer() {
    var d = D().explainer, h = '<div class="ads-section-head"><h2>' + esc(d.title) + '</h2></div><div class="ads-explainer">';
    for (var i = 0; i < d.items.length; i++) h += '<div class="ads-expl"><b>' + esc(d.items[i].title) + '</b><p>' + esc(d.items[i].desc) + '</p></div>';
    h += '</div><p class="ads-footnote">' + esc(d.note) + '</p>';
    $('explainerBox').innerHTML = h;
  }

  function readForm() {
    var v = {};
    ['adsSite', 'adsBusiness', 'adsRegion', 'adsBudget', 'adsComment', 'adsEmail', 'adsTelegram'].forEach(function (id) { var e = $(id); v[id] = e ? e.value : ''; });
    var c = $('adsConsent'); v.consent = !!(c && c.checked);
    return v;
  }
  function renderRequest() {
    var d = D().form, old = readForm(), h = '';
    h += '<div class="ads-form-panel"><h2>' + esc(d.title) + '</h2><p class="ads-lead">' + esc(d.desc) + '</p><div id="adsSummary" class="ads-summary"></div><p class="ads-help">' + esc(d.help) + '</p>';
    h += '<form id="adsForm" onsubmit="return submitAds(event)"><div class="grid g2">';
    h += '<div class="field"><label>' + esc(d.siteLabel) + '</label><input id="adsSite" inputmode="url" placeholder="' + esc(d.sitePh) + '"></div>';
    h += '<div class="field"><label>' + esc(d.emailLabel) + '</label><input type="email" id="adsEmail" placeholder="' + esc(d.emailPh) + '"></div></div>';
    h += '<div class="field"><label>' + esc(d.businessLabel) + '</label><input id="adsBusiness" placeholder="' + esc(d.businessPh) + '"></div>';
    h += '<div class="field"><label>' + esc(d.regionLabel) + '</label><input id="adsRegion" placeholder="' + esc(d.regionPh) + '"></div>';
    h += '<div class="field"><label>' + esc(d.budgetLabel) + '</label><input id="adsBudget" placeholder="' + esc(d.budgetPh) + '"><small class="ads-budget-note">' + esc(d.budgetNote) + '</small></div>';
    h += '<div class="field"><label>' + esc(d.commentLabel) + '</label><textarea id="adsComment" rows="3" placeholder="' + esc(d.commentPh) + '"></textarea></div>';
    h += '<div class="field"><label>' + esc(d.telegramLabel) + '</label><input id="adsTelegram" placeholder="' + esc(d.telegramPh) + '"></div>';
    h += '<label class="check"><input type="checkbox" id="adsConsent"><span>' + esc(d.consent) + '</span></label><small class="consent-note">' + esc(d.consentNote) + '</small>';
    h += '<a class="privacy-link" href="../privacy.html" target="_blank" rel="noopener">' + esc(d.privacy) + '</a>';
    h += '<div class="qerr" id="adsErr"></div><button type="submit" class="btn">' + esc(d.submit) + '</button><small class="meta">' + esc(d.note) + '</small></form><div id="adsResult" class="ads-result" hidden></div></div>';
    $('requestBox').innerHTML = h;
    if (old.adsSite || old.adsBusiness || old.adsRegion || old.adsBudget || old.adsComment || old.adsEmail || old.adsTelegram) {
      ['adsSite', 'adsBusiness', 'adsRegion', 'adsBudget', 'adsComment', 'adsEmail', 'adsTelegram'].forEach(function (id) { if ($(id)) $(id).value = old[id]; });
      if ($('adsConsent')) $('adsConsent').checked = old.consent;
    }
    refreshSummary();
  }

  function refreshSummary() {
    var box = $('adsSummary'); if (!box) return;
    var d = D().form, sel = selectedOptions(), iss = selectedIssues(), h = '<h3>' + esc(d.summaryTitle) + '</h3>';
    var groups = { once: [], monthly: [], individual: [] };
    for (var i = 0; i < sel.length; i++) groups[sel[i].opt.type].push(sel[i]);
    function group(type, label) {
      if (!groups[type].length) return '';
      var s = '<div class="ads-sum-group"><small>' + esc(label) + '</small>';
      for (var j = 0; j < groups[type].length; j++) {
        s += '<div class="ads-sum-row"><span>' + esc(optLabel(groups[type][j])) + '</span><b>' + esc(groups[type][j].opt.price) + '</b><button type="button" onclick="removeOption(\'' + groups[type][j].opt.id + '\')" aria-label="' + esc(d.remove) + '">&times;</button></div>';
      }
      return s + '</div>';
    }
    h += group('once', d.setup) + group('monthly', d.monthly) + group('individual', d.individual);
    if (iss.length) {
      h += '<div class="ads-sum-group"><small>' + esc(d.issue) + '</small>';
      for (var k = 0; k < iss.length; k++) h += '<div class="ads-sum-row"><span>' + esc(iss[k].label) + '</span><button type="button" onclick="removeIssue(\'' + iss[k].id + '\')" aria-label="' + esc(d.remove) + '">&times;</button></div>';
      h += '</div>';
    }
    if (!sel.length && !iss.length) h += '<p class="ads-sum-empty">' + esc(d.none) + '</p>';
    box.innerHTML = h;
  }
  window.removeOption = function (id) { state.options[id] = false; renderCatalog(); refreshSummary(); };
  window.removeIssue = function (id) { state.issues[id] = false; renderIssues(); refreshSummary(); };

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function validUrl(v) { return /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,63}(:\d{1,5})?([\/?#][^\s]*)?$/i.test(v); }
  function normUrl(v) { v = (v || '').replace(/^\s+|\s+$/g, ''); return v && !/^https?:\/\//i.test(v) ? 'https://' + v : v; }

  function buildText(site, business, region, budget, comment, email, telegram, consent) {
    var ru = lang() === 'ru', lines = [];
    lines.push(ru ? 'Заявка Solo.Pov — реклама и продвижение' : 'Povpraševanje Solo.Pov — oglaševanje in promocija');
    lines.push((ru ? 'Дата' : 'Datum') + ': ' + new Date().toLocaleString(ru ? 'ru-RU' : 'sl-SI'));
    var sel = selectedOptions();
    if (sel.length) {
      lines.push((ru ? 'Выбранные услуги' : 'Izbrane storitve') + ':');
      for (var i = 0; i < sel.length; i++) lines.push('- ' + optLabel(sel[i]) + ' — ' + sel[i].opt.price + ' (' + typeLabel(sel[i].opt.type) + ')');
    }
    var iss = selectedIssues();
    if (iss.length) { lines.push((ru ? 'Дополнительные задачи' : 'Dodatne naloge') + ':'); for (var j = 0; j < iss.length; j++) lines.push('- ' + iss[j].label); }
    if (site) lines.push((ru ? 'Сайт' : 'Stran') + ': ' + site);
    if (business) lines.push((ru ? 'Бизнес' : 'Dejavnost') + ': ' + business);
    if (region) lines.push((ru ? 'Регион' : 'Regija') + ': ' + region);
    if (budget) lines.push((ru ? 'Рекламный бюджет' : 'Oglaševalski proračun') + ': ' + budget + (ru ? ' (отдельно от услуг)' : ' (ločeno od storitev)'));
    if (comment) lines.push((ru ? 'Пожелания' : 'Želje') + ': ' + comment);
    lines.push('Email: ' + email);
    if (telegram) lines.push('Telegram: ' + telegram);
    lines.push((ru ? 'Согласие на материалы' : 'Soglasje za gradiva') + ': ' + (consent ? (ru ? 'да' : 'da') : (ru ? 'нет' : 'ne')));
    lines.push((ru ? 'Версия согласия' : 'Različica soglasja') + ': ' + CONSENT_VERSION);
    return lines.join('\n');
  }
  function buildLead(site, business, region, budget, comment, email, telegram, consent) {
    return { id: 'lead_' + Date.now(), date: new Date().toISOString(), lang: lang(), options: selectedOptions().map(function (x) { return x.opt.id; }), issues: selectedIssues().map(function (x) { return x.id; }), siteUrl: site, business: business, region: region, budget: budget, comment: comment, email: email, telegram: telegram, marketingConsent: !!consent, consentTextVersion: CONSENT_VERSION, consentDate: consent ? new Date().toISOString() : null, status: 'new' };
  }

  window.submitAds = function (e) {
    e.preventDefault();
    var d = D().form, err = $('adsErr');
    var site = normUrl(($('adsSite') || {}).value || '');
    var business = ($('adsBusiness') || {}).value || '';
    var region = ($('adsRegion') || {}).value || '';
    var budget = ($('adsBudget') || {}).value || '';
    var comment = ($('adsComment') || {}).value || '';
    var email = (($('adsEmail') || {}).value || '').replace(/^\s+|\s+$/g, '');
    var telegram = (($('adsTelegram') || {}).value || '').replace(/^\s+|\s+$/g, '');
    var consent = !!($('adsConsent') || {}).checked;
    if (site && !validUrl(site)) { if (err) err.textContent = d.errSite; return false; }
    if (!validEmail(email)) { if (err) err.textContent = d.errEmail; return false; }
    if (!selectedOptions().length && !selectedIssues().length && !comment) { if (err) err.textContent = d.errEmpty; return false; }
    if (err) err.textContent = '';
    var text = buildText(site, business, region, budget, comment, email, telegram, consent);
    deliverAds(text, buildLead(site, business, region, budget, comment, email, telegram, consent));
    return false;
  };
  function deliverAds(text, lead) {
    var ep = (window.CONFIG && CONFIG.ads && CONFIG.ads.enabled && CONFIG.ads.endpoint) || (window.CONFIG && CONFIG.submit && CONFIG.submit.enabled && CONFIG.submit.endpoint);
    if (ep) { try { fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) }).then(function (r) { showAdsResult(r && r.ok, text); }).catch(function () { showAdsResult(false, text); }); return; } catch (ex) {} }
    showAdsResult(false, text);
  }
  function showAdsResult(sent, text) {
    var d = D().form, form = $('adsForm'), res = $('adsResult'); if (!res) return;
    if (form) form.hidden = true; res.hidden = false;
    res.innerHTML = '<h3>' + esc(sent ? (lang() === 'ru' ? 'Спасибо!' : 'Hvala!') : d.notSentTitle) + '</h3>';
    if (sent) res.innerHTML += '<p>' + esc(lang() === 'ru' ? 'Заявка отправлена.' : 'Zahteva je poslana.') + '</p>';
    else res.innerHTML += '<div class="notice">' + d.notSentText + '</div><pre class="copyout" id="adsCopyout">' + esc(text) + '</pre><div class="mnav"><button type="button" class="link" onclick="backAdsForm()">' + esc(d.back) + '</button><button type="button" class="btn" id="adsCopyBtn" onclick="copyAds()">' + esc(d.copy) + '</button></div>';
    res.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.backAdsForm = function () { var f = $('adsForm'), r = $('adsResult'); if (f) f.hidden = false; if (r) r.hidden = true; scrollToId('request'); };
  window.copyAds = function () {
    var pre = $('adsCopyout'); if (!pre) return;
    var done = function () { var b = $('adsCopyBtn'); if (b) b.textContent = D().form.copied; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(pre.textContent).then(done, function () { fallback(pre, done); });
    else fallback(pre, done);
  };
  function fallback(pre, done) { try { var r = document.createRange(); r.selectNodeContents(pre); var s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand('copy'); done(); } catch (e) {} }

  function renderProcess() {
    var d = D().process, h = '<div class="ads-section-head"><h2>' + esc(d.title) + '</h2></div><ol class="ads-steps">';
    for (var i = 0; i < d.steps.length; i++) h += '<li><span>' + (i + 1) + '</span><b>' + esc(d.steps[i]) + '</b></li>';
    h += '</ol><p class="ads-footnote">' + esc(d.note) + '</p>';
    $('processBox').innerHTML = h;
  }
  function renderFAQ() {
    var d = D().faq, h = '<div class="ads-section-head"><h2>' + esc(d.title) + '</h2></div>';
    for (var i = 0; i < d.items.length; i++) h += '<details class="faq"><summary>' + esc(d.items[i].q) + '</summary><p>' + esc(d.items[i].a) + '</p></details>';
    $('faqBox').innerHTML = h;
  }

  window.renderAds = function () {
    syncHeader();
    document.title = lang() === 'ru' ? 'Solo.Pov — Реклама и продвижение' : 'Solo.Pov — Oglaševanje in promocija';
    renderHero(); renderCatalog(); renderIssues(); renderRequest(); renderProcess(); renderFAQ();
  };
  document.addEventListener('DOMContentLoaded', function () { window.renderAds(); });
  window.addEventListener('resize', syncHeader);
  window.addEventListener('load', syncHeader);
  if (window.ResizeObserver) { var hh = document.querySelector('header'); if (hh) new ResizeObserver(syncHeader).observe(hh); }
})();
