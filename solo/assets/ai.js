/* Solo.Pov — AI, support and automation page logic (v2) */
(function () {
  'use strict';
  var state = { support: null, ai: null, automations: {}, interest: null };
  var CONSENT_VERSION = '2026-10-18';
  var tipTimer = null;

  var ICONS = {
    telegram: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2.5 9l13-5-4 11-3-4-6-2z"/><path d="M8.5 11l3-3"/></svg>',
    reply: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M15 9a6 6 0 01-6 6H4l-2 2V9a6 6 0 016-6h1a6 6 0 016 6z"/><path d="M6 8h6M6 11h4"/></svg>',
    booking: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="4" width="12" height="11" rx="2"/><path d="M3 7h12M6 2.5v3M12 2.5v3M6 10h2M10 10h2"/></svg>',
    crm: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><ellipse cx="9" cy="5" rx="5" ry="2"/><path d="M4 5v4c0 1.1 2.2 2 5 2s5-.9 5-2V5M4 9v4c0 1.1 2.2 2 5 2s5-.9 5-2V9"/></svg>',
    'ai-process': '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="4" y="4" width="10" height="10" rx="3"/><path d="M7 8h4M7 11h4M9 2v2M9 14v2M2 9h2M14 9h2"/></svg>',
    publish: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 14l1-3 7-7 2 2-7 7-3 1z"/><path d="M10 5l3 3"/></svg>'
  };

  function lang() { return (window.SOLO && SOLO.getLang) ? SOLO.getLang() : 'sl'; }
  function D() { var d = window.SOLO_AI || {}; return d[lang()] || d.sl; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function $(id) { return document.getElementById(id); }
  function supportById(id) { var a = D().support.tariffs; for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; }
  function aiById(id) { var a = D().ai.tariffs; for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; }
  function autoById(id) { var a = D().automation.cards; for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; }
  function selectedAutomations() { var a = D().automation.cards, out = []; for (var i = 0; i < a.length; i++) if (state.automations[a[i].id]) out.push(a[i]); return out; }

  function syncHeader() {
    var h = document.querySelector('header');
    if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
  }
  function aiScrollTo(id) {
    var el = document.getElementById(id); if (!el) return;
    var h = document.querySelector('header');
    var off = (h ? h.offsetHeight : 0) + 20;
    var reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    var top = el.getBoundingClientRect().top + window.scrollY - off;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
  }
  window.aiScrollTo = aiScrollTo;
  window.aiGo = function (e, id) { if (e) e.preventDefault(); aiScrollTo(id); return false; };

  function renderHero() {
    var d = D().hero, h = '';
    h += '<span class="eyebrow">' + esc(d.eyebrow) + '</span>';
    h += '<h1 class="ai-title">' + esc(d.title) + '</h1>';
    var lines = Array.isArray(d.sub) ? d.sub : [d.sub];
    h += '<p class="ai-lead">' + lines.map(function (x) { return '<span class="ai-lead-line">' + esc(x) + '</span>'; }).join('') + '</p>';
    h += '<div class="ai-cards">';
    for (var i = 0; i < d.cards.length; i++) {
      var c = d.cards[i];
      h += '<a class="ai-card" href="#' + c.id + '" onclick="return aiGo(event,\'' + c.id + '\')">';
      h += '<b>' + esc(c.title) + '</b><p>' + esc(c.desc) + '</p><span class="ai-card-cta">' + esc(c.cta) + '</span></a>';
    }
    h += '</div>';
    $('aiHero').innerHTML = h;
  }

  function supportCards() {
    var box = $('supportCards'); if (!box) return;
    var d = D().support, h = '';
    for (var i = 0; i < d.tariffs.length; i++) {
      var t = d.tariffs[i], sel = state.support === t.id;
      h += '<div class="ai-tariff ai-selectable' + (sel ? ' sel' : '') + '" data-support="' + t.id + '" role="button" tabindex="0" aria-pressed="' + sel + '" onclick="selectSupport(\'' + t.id + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();selectSupport(\'' + t.id + '\')}">';
      if (sel) h += '<span class="ai-sel-badge">' + esc(lang() === 'ru' ? 'Выбрано' : 'Izbrano') + '</span>';
      h += '<div class="ai-tariff-name">' + esc(t.name) + '</div><div class="ai-tariff-price">' + esc(t.price) + '</div><p class="ai-tariff-desc">' + esc(t.desc) + '</p><ul>';
      for (var j = 0; j < t.features.length; j++) h += '<li>' + esc(t.features[j]) + '</li>';
      h += '</ul></div>';
    }
    box.innerHTML = h;
  }

  function renderSupport() {
    var d = D().support, h = '';
    h += '<div class="ai-section-head"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + esc(d.title) + '</h2><p class="ai-lead">' + esc(d.explainer) + '</p></div>';
    h += '<div class="ai-tariffs" id="supportCards"></div>';
    h += '<div class="ai-details-stack">';
    for (var i = 0; i < d.details.length; i++) {
      h += '<details class="ai-details"><summary>' + esc(d.details[i].title) + '</summary><div>';
      for (var j = 0; j < d.details[i].body.length; j++) h += '<p>' + esc(d.details[i].body[j]) + '</p>';
      h += '</div></details>';
    }
    h += '</div>';
    h += '<p id="supportHint" class="ai-hint" hidden>' + esc(d.hint) + '</p>';
    h += '<div class="ai-actions"><button type="button" class="btn" onclick="supportCTA()">' + esc(d.cta) + '</button></div>';
    $('supportBox').innerHTML = h;
    supportCards();
  }

  window.selectSupport = function (id) {
    state.support = id;
    var hint = $('supportHint'); if (hint) hint.hidden = true;
    supportCards();
    refreshSummary();
  };
  window.supportCTA = function () {
    if (!state.support) {
      var hint = $('supportHint'); if (hint) hint.hidden = false;
      var first = document.querySelector('#supportCards .ai-tariff');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    aiScrollTo('request');
  };

  function previewHTML(p) {
    if (p.type === 'service') {
      return '<div class="phone-preview"><span class="pp-label">' + esc(lang() === 'ru' ? 'Предпросмотр' : 'Predogled') + '</span><b>' + esc(p.title) + '</b><p>' + esc(p.desc) + '</p><span class="pp-price">' + esc(p.price) + '</span><span class="pp-btn">' + esc(p.button) + '</span></div>';
    }
    if (p.type === 'article') {
      return '<div class="phone-preview"><span class="pp-label">' + esc(lang() === 'ru' ? 'Предпросмотр статьи' : 'Predogled članka') + '</span><b>' + esc(p.title) + '</b><p>' + esc(p.excerpt) + '</p></div>';
    }
    var lines = '';
    for (var i = 0; i < p.lines.length; i++) lines += '<span>' + esc(p.lines[i]) + '</span>';
    return '<div class="phone-preview"><span class="pp-label">' + esc(lang() === 'ru' ? 'Предпросмотр' : 'Predogled') + '</span><b>' + esc(p.title) + '</b><div class="pp-hours">' + lines + '</div></div>';
  }

  function phoneHTML(p) {
    var tg = '<svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M2.5 9l13-5-4 11-3-4-6-2z" fill="#fff"/><path d="M8.5 11l3-3" stroke="#2AABEE" stroke-width="1.2"/></svg>';
    var h = '<div class="ai-phone"><div class="phone-top"></div><div class="phone-head"><span class="phone-avatar tg">' + tg + '</span><div><b>Telegram</b><small>SOLO.POV · ' + esc(lang() === 'ru' ? 'пример' : 'primer') + '</small></div><span class="phone-badge">' + esc(p.title) + '</span></div><div class="phone-chat">';
    for (var i = 0; i < p.chat.length; i++) {
      var m = p.chat[i];
      h += '<div class="phone-msg ' + (m.who === 'client' ? 'client' : 'ai') + '" style="--d:' + (i * 0.28).toFixed(2) + 's"><span>' + esc(m.text) + '</span></div>';
      if (p.previewAfter === i) h += '<div class="phone-preview-wrap" style="--d:' + ((i + 1) * 0.28).toFixed(2) + 's">' + previewHTML(p.preview) + '</div>';
    }
    h += '<div class="phone-status" style="--d:' + (p.chat.length * 0.28 + 0.2).toFixed(2) + 's">' + esc(p.status) + '</div>';
    h += '</div></div>';
    return h;
  }

  function aiTariffCards() {
    var box = $('aiTariffs'); if (!box) return;
    var d = D().ai, h = '';
    for (var i = 0; i < d.tariffs.length; i++) {
      var t = d.tariffs[i], sel = state.ai === t.id;
      h += '<div class="ai-tariff ai-selectable' + (sel ? ' sel' : '') + (t.id === 'ai-control' ? ' rec' : '') + '" data-ai="' + t.id + '" role="button" tabindex="0" aria-pressed="' + sel + '" onclick="selectAITariff(\'' + t.id + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();selectAITariff(\'' + t.id + '\')}">';
      if (t.badge) h += '<span class="ai-tariff-badge' + (t.id === 'ai-control' ? ' rec' : '') + '">' + esc(t.badge) + '</span>';
      if (sel) h += '<span class="ai-sel-badge">' + esc(lang() === 'ru' ? 'Выбрано' : 'Izbrano') + '</span>';
      h += '<div class="ai-tariff-name">' + esc(t.name) + '</div><div class="ai-tariff-price">' + esc(t.price) + '</div><ul>';
      for (var j = 0; j < t.features.length; j++) h += '<li>' + esc(t.features[j]) + '</li>';
      h += '</ul></div>';
    }
    box.innerHTML = h;
  }
  window.selectAITariff = function (id) { state.ai = id; aiTariffCards(); refreshSummary(); };

  function scenarioById(id) {
    var a = D().ai.scenarios.items;
    for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i];
    return a[0] || null;
  }
  function msgTime(i) {
    var m = 2 + i * 3, hh = 10 + Math.floor(m / 60), mm = m % 60;
    return hh + ':' + (mm < 10 ? '0' : '') + mm;
  }
  function chatHTML(item) {
    var ru = lang() === 'ru';
    var h = '<div class="ai-tg"><div class="ai-tg-head"><span class="ai-tg-avatar">' + esc(item.bot.charAt(0)) + '</span><div class="ai-tg-id"><b>' + esc(item.bot) + '</b><small>bot · ' + esc(ru ? 'пример' : 'primer') + '</small></div><span class="ai-tg-badge">' + esc(ru ? 'Демо' : 'Demo') + '</span></div><div class="ai-tg-body">';
    for (var i = 0; i < item.messages.length; i++) {
      var m = item.messages[i], out = m.who === 'client';
      h += '<div class="ai-msg ' + (out ? 'out' : 'in') + '" style="--d:' + (i * 0.18).toFixed(2) + 's"><p>' + esc(m.text).replace(/\n/g, '<br>') + '</p><span class="ai-msg-meta">' + msgTime(i) + (out ? ' <i class="ticks">&#10003;&#10003;</i>' : '') + '</span></div>';
    }
    h += '</div><div class="ai-tg-input"><span>' + esc(ru ? 'Сообщение' : 'Sporočilo') + '</span><i class="ai-tg-send"></i></div></div>';
    return h;
  }
  function resultHTML(item) {
    var r = item.result, ru = lang() === 'ru';
    var h = '<div class="ai-res-card"><div class="ai-res-bar"><span class="ai-res-dots"><i></i><i></i><i></i></span><span class="ai-res-url">' + esc(r.url || '') + '</span></div><div class="ai-res-body"><span class="ai-res-label">' + esc(r.label) + '</span>';
    if (item.kind === 'site') {
      h += '<div class="ai-site-preview"><span class="ai-site-kicker">' + esc(r.kicker) + '</span><h4>' + esc(r.title) + '</h4><p>' + esc(r.desc) + '</p><div class="ai-site-foot"><span class="ai-site-price">' + esc(r.meta) + '</span><span class="ai-site-btn">' + esc(r.button) + '</span></div></div>';
    } else if (item.kind === 'research') {
      h += '<h4>' + esc(r.title) + '</h4><div class="ai-res-rows">';
      for (var i = 0; i < r.rows.length; i++) h += '<div class="ai-res-row"><span>' + esc(r.rows[i].k) + '</span><b>' + esc(r.rows[i].v) + '</b></div>';
      h += '</div><p class="ai-res-note">' + esc(r.note) + '</p>';
    } else {
      h += '<h4>' + esc(r.title) + '</h4><div class="ai-booking">';
      for (var j = 0; j < r.services.length; j++) h += '<div class="ai-booking-row"><span class="ai-booking-dot"></span><span class="ai-booking-name">' + esc(r.services[j].name) + '</span><span class="ai-booking-dur">' + esc(r.services[j].dur) + '</span></div>';
      h += '</div><div class="ai-cal"><div class="ai-cal-days"><span>' + esc(ru ? 'Пн' : 'Pon') + '</span><span>' + esc(ru ? 'Вт' : 'Tor') + '</span><span>' + esc(ru ? 'Ср' : 'Sre') + '</span><span class="on">' + esc(ru ? 'Чт' : 'Čet') + '</span><span>' + esc(ru ? 'Пт' : 'Pet') + '</span><span>' + esc(ru ? 'Сб' : 'Sob') + '</span><span>' + esc(ru ? 'Вс' : 'Ned') + '</span></div><div class="ai-cal-slots"><span>09:00</span><span>10:30</span><span class="off">12:00</span><span>14:00</span><span>15:30</span><span>17:00</span></div></div><p class="ai-res-note">' + esc(r.note) + '</p>';
    }
    h += '</div></div>';
    return h;
  }
  window.selectScenario = function (id) {
    var item = scenarioById(id); if (!item) return;
    var tabs = document.querySelectorAll('.ai-sc-tab');
    for (var i = 0; i < tabs.length; i++) {
      var on = tabs[i].getAttribute('data-scenario') === id;
      tabs[i].classList.toggle('on', on);
      tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
    }
    $('aiChat').innerHTML = chatHTML(item);
    $('aiResultPanel').innerHTML = resultHTML(item);
  };
  window.startTrial = function () {
    state.interest = 'trial';
    refreshSummary();
    aiScrollTo('request');
  };

  function renderAISection() {
    var d = D().ai, h = '';
    h += '<div class="ai-section-head"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + esc(d.title) + '</h2><p class="ai-lead">' + esc(d.sub) + '</p></div>';
    h += '<div class="ai-offer"><p class="ai-offer-accent">' + esc(d.offer.accent) + '</p><button type="button" class="btn" onclick="aiScrollTo(\'aiScenario\')">' + esc(d.offer.cta) + '</button><p class="ai-offer-note">' + esc(d.offer.note) + '</p></div>';
    h += '<div class="ai-scenarios" id="aiScenario"><div class="ai-sc-head"><span class="eyebrow">' + esc(d.scenarios.label) + '</span><h3>' + esc(d.scenarios.title) + '</h3><p class="ai-lead">' + esc(d.scenarios.note) + '</p></div><div class="ai-sc-tabs" role="tablist">';
    for (var i = 0; i < d.scenarios.items.length; i++) {
      var it = d.scenarios.items[i];
      h += '<button type="button" class="ai-sc-tab' + (i === 0 ? ' on' : '') + '" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '" data-scenario="' + esc(it.id) + '" onclick="selectScenario(\'' + esc(it.id) + '\')"><span>' + esc(it.tab) + '</span><small>' + esc(it.project) + '</small></button>';
    }
    h += '</div><div class="ai-sc-grid"><div class="ai-sc-chat" id="aiChat"></div><div class="ai-sc-result" id="aiResultPanel"></div></div><p class="ai-demo-note">' + esc(d.scenarios.disclaimer) + '</p></div>';
    h += '<div class="ai-trial" id="aiTrial"><div class="ai-trial-copy"><span class="eyebrow">' + esc(d.trial.eyebrow) + '</span><h3>' + esc(d.trial.title) + '</h3><p class="ai-lead">' + esc(d.trial.desc) + '</p></div><div class="ai-trial-steps">';
    for (var j = 0; j < d.trial.steps.length; j++) {
      h += '<div class="ai-trial-step"><span class="ai-trial-num">0' + (j + 1) + '</span><b>' + esc(d.trial.steps[j].t) + '</b><p>' + esc(d.trial.steps[j].d) + '</p></div>';
    }
    h += '</div><p class="ai-trial-note">' + esc(d.trial.note) + '</p><div class="ai-actions"><button type="button" class="btn" onclick="startTrial()">' + esc(d.trial.cta) + '</button></div></div>';
    h += '<div class="ai-tariffs-head"><span class="eyebrow">' + esc(d.tariffsEyebrow) + '</span><h3>' + esc(d.tariffsTitle) + '</h3></div>';
    h += '<div class="ai-tariffs ai-tariffs--4" id="aiTariffs"></div>';
    h += '<p class="ai-footnote">' + esc(d.tariffNote) + '</p><p class="ai-footnote ai-footnote--small">' + esc(d.tariffFootnote) + '</p>';
    h += '<div class="ai-actions"><button type="button" class="btn" onclick="aiScrollTo(\'request\')">' + esc(d.cta) + '</button></div>';
    $('aiBox').innerHTML = h;
    aiTariffCards();
    selectScenario(d.scenarios.items[0].id);
  }

  function automationCards() {
    var box = $('autoCards'); if (!box) return;
    var d = D().automation, h = '';
    for (var i = 0; i < d.cards.length; i++) {
      var c = d.cards[i], sel = !!state.automations[c.id];
      h += '<div class="ai-auto-card' + (sel ? ' sel' : '') + '" data-auto="' + c.id + '" role="button" tabindex="0" aria-pressed="' + sel + '" onclick="toggleAutomation(\'' + c.id + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleAutomation(\'' + c.id + '\')}">';
      h += '<span class="ai-auto-ico">' + (ICONS[c.id] || '') + '</span>';
      h += '<span class="ai-auto-check" aria-hidden="true">' + (sel ? '✓' : '') + '</span>';
      h += '<div class="ai-auto-title"><b>' + esc(c.title) + '</b><button type="button" class="ai-info" aria-label="' + esc(lang() === 'ru' ? 'Подробнее' : 'Več') + '" aria-expanded="false" onclick="event.stopPropagation();showAITip(this)" onmouseenter="showAITip(this)" onfocus="showAITip(this)" onmouseleave="hideAITip()" onkeydown="event.stopPropagation()">i</button></div>';
      h += '<p>' + esc(c.desc) + '</p></div>';
    }
    box.innerHTML = h;
  }
  window.toggleAutomation = function (id) {
    state.automations[id] = !state.automations[id];
    automationCards();
    refreshSummary();
  };

  function renderAutomation() {
    var d = D().automation, h = '';
    h += '<div class="ai-section-head"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + esc(d.title) + '</h2><p class="ai-lead">' + esc(d.desc) + '</p></div>';
    h += '<div class="ai-auto-grid" id="autoCards"></div>';
    h += '<p class="ai-footnote">' + esc(d.priceNote) + '</p><div class="ai-prices">';
    for (var i = 0; i < d.prices.length; i++) h += '<div><span>' + esc(d.prices[i].title) + '</span><b>' + esc(d.prices[i].price) + '</b></div>';
    h += '</div><p class="ai-footnote ai-footnote--small">' + esc(d.footnote) + '</p>';
    h += '<div class="ai-actions"><button type="button" class="btn" onclick="aiScrollTo(\'request\')">' + esc(d.cta) + '</button></div>';
    $('automationBox').innerHTML = h;
    automationCards();
  }

  function readForm() {
    var v = {};
    ['aiSite', 'aiComment', 'aiEmail', 'aiTelegram'].forEach(function (id) { var e = $(id); v[id] = e ? e.value : ''; });
    var c = $('aiConsent'); v.consent = !!(c && c.checked);
    return v;
  }
  function renderRequest() {
    var d = D().form, old = readForm(), h = '';
    h += '<div class="ai-form-panel"><h2>' + esc(d.title) + '</h2><p class="ai-lead">' + esc(d.desc) + '</p>';
    h += '<div id="aiSummary" class="ai-summary"></div>';
    h += '<p class="ai-help">' + esc(d.help) + '</p>';
    h += '<form id="aiForm" onsubmit="return submitAI(event)">';
    h += '<div class="grid g2"><div class="field"><label>' + esc(d.siteLabel) + '</label><input id="aiSite" inputmode="url" placeholder="' + esc(d.sitePh) + '"></div>';
    h += '<div class="field"><label>' + esc(d.emailLabel) + '</label><input type="email" id="aiEmail" placeholder="' + esc(d.emailPh) + '"></div></div>';
    h += '<div class="field"><label>' + esc(d.commentLabel) + '</label><textarea id="aiComment" rows="3" placeholder="' + esc(d.commentPh) + '"></textarea></div>';
    h += '<div class="field"><label>' + esc(d.telegramLabel) + '</label><input id="aiTelegram" placeholder="' + esc(d.telegramPh) + '"></div>';
    h += '<label class="check"><input type="checkbox" id="aiConsent"><span>' + esc(d.consent) + '</span></label><small class="consent-note">' + esc(d.consentNote) + '</small>';
    h += '<a class="privacy-link" href="../privacy.html" target="_blank" rel="noopener">' + esc(d.privacy) + '</a>';
    h += '<div class="qerr" id="aiErr"></div><button type="submit" class="btn">' + esc(d.submit) + '</button><small class="meta">' + esc(d.note) + '</small>';
    h += '</form><div id="aiResult" class="ai-result" hidden></div></div>';
    $('requestBox').innerHTML = h;
    if (old.aiSite || old.aiComment || old.aiEmail || old.aiTelegram) {
      ['aiSite', 'aiComment', 'aiEmail', 'aiTelegram'].forEach(function (id) { if ($(id)) $(id).value = old[id]; });
      if ($('aiConsent')) $('aiConsent').checked = old.consent;
    }
    refreshSummary();
  }

  function refreshSummary() {
    var box = $('aiSummary'); if (!box) return;
    var d = D().form, h = '<h3>' + esc(d.summaryTitle) + '</h3>', count = 0, monthly = 0;
    if (state.interest) {
      count++;
      h += '<div class="ai-sum-row"><span><small>' + esc(D().ai.trial.interestLabel) + '</small><b>' + esc(D().ai.trial.interest) + '</b></span><button type="button" class="ai-sum-remove" onclick="removeSelection(\'interest\')" aria-label="' + esc(d.remove) + '">&times;</button></div>';
    }
    if (state.support) {
      var s = supportById(state.support);
      if (s) {
        count++; monthly += s.monthly;
        h += '<div class="ai-sum-row"><span><small>' + esc(d.supportLabel) + '</small><b>' + esc(s.name) + ' — ' + esc(s.price) + '</b></span><button type="button" class="ai-sum-remove" onclick="removeSelection(\'support\')" aria-label="' + esc(d.remove) + '">&times;</button></div>';
      }
    }
    if (state.ai) {
      var a = aiById(state.ai);
      if (a) {
        count++; monthly += a.monthly;
        h += '<div class="ai-sum-row"><span><small>' + esc(d.aiLabel) + '</small><b>' + esc(a.name) + ' — ' + esc(a.price) + '</b></span><button type="button" class="ai-sum-remove" onclick="removeSelection(\'ai\')" aria-label="' + esc(d.remove) + '">&times;</button></div>';
      }
    }
    var autos = selectedAutomations();
    if (autos.length) {
      count += autos.length;
      h += '<div class="ai-sum-group"><small>' + esc(d.automationLabel) + '</small>';
      for (var i = 0; i < autos.length; i++) h += '<div class="ai-sum-auto"><span>' + esc(autos[i].title) + '</span><button type="button" class="ai-sum-remove" onclick="removeAutomation(\'' + autos[i].id + '\')" aria-label="' + esc(d.remove) + '">&times;</button></div>';
      h += '</div>';
    }
    if (monthly > 0) h += '<div class="ai-sum-total"><span>' + esc(d.monthlyLabel) + '</span><b>' + (lang() === 'ru' ? 'от ' + monthly + ' €/мес.' : 'od ' + monthly + ' €/mesec') + '</b></div>';
    if (autos.length) h += '<div class="ai-sum-onetime"><span>' + esc(d.oneTimeLabel) + '</span><b>' + esc(d.afterEstimate) + '</b></div>';
    if (!count) h += '<p class="ai-sum-empty">' + esc(d.none) + '</p>';
    box.innerHTML = h;
  }
  window.removeSelection = function (kind) {
    if (kind === 'support') state.support = null;
    if (kind === 'ai') state.ai = null;
    if (kind === 'interest') state.interest = null;
    if (kind === 'support') supportCards();
    if (kind === 'ai') aiTariffCards();
    refreshSummary();
  };
  window.removeAutomation = function (id) {
    state.automations[id] = false;
    automationCards();
    refreshSummary();
  };

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function validUrl(v) { return /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,63}(:\d{1,5})?([\/?#][^\s]*)?$/i.test(v); }
  function normUrl(v) { v = (v || '').replace(/^\s+|\s+$/g, ''); return v && !/^https?:\/\//i.test(v) ? 'https://' + v : v; }

  function buildText(site, comment, email, telegram, consent) {
    var ru = lang() === 'ru', lines = [];
    lines.push(ru ? 'Заявка Solo.Pov — AI и поддержка' : 'Povpraševanje Solo.Pov — AI in podpora');
    lines.push((ru ? 'Дата' : 'Datum') + ': ' + new Date().toLocaleString(ru ? 'ru-RU' : 'sl-SI'));
    if (state.support) { var s = supportById(state.support); if (s) lines.push((ru ? 'Техническая поддержка' : 'Tehnična podpora') + ': ' + s.name + ' — ' + s.price); }
    if (state.ai) { var a = aiById(state.ai); if (a) lines.push((ru ? 'AI-ассистент' : 'AI-asistent') + ': ' + a.name + ' — ' + a.price); }
    if (state.interest) lines.push((ru ? 'Интерес' : 'Zanimanje') + ': ' + D().ai.trial.interest);
    var autos = selectedAutomations();
    if (autos.length) {
      lines.push((ru ? 'Автоматизация' : 'Avtomatizacija') + ':');
      for (var i = 0; i < autos.length; i++) lines.push('- ' + autos[i].title);
    }
    var monthly = (state.support ? supportById(state.support).monthly : 0) + (state.ai ? aiById(state.ai).monthly : 0);
    if (monthly > 0) lines.push((ru ? 'Предварительные ежемесячные тарифы' : 'Predhodni mesečni tarifi') + ': ' + (ru ? 'от ' + monthly + ' €/мес.' : 'od ' + monthly + ' €/mesec'));
    if (autos.length) lines.push((ru ? 'Разовая стоимость автоматизации' : 'Enkratni strošek avtomatizacije') + ': ' + (ru ? 'определяется после оценки' : 'določi se po oceni'));
    if (site) lines.push((ru ? 'Сайт' : 'Stran') + ': ' + site);
    if (comment) lines.push((ru ? 'Задача' : 'Naloga') + ': ' + comment);
    lines.push('Email: ' + email);
    if (telegram) lines.push('Telegram: ' + telegram);
    lines.push((ru ? 'Согласие на новости' : 'Soglasje za novice') + ': ' + (consent ? (ru ? 'да' : 'da') : (ru ? 'нет' : 'ne')));
    lines.push((ru ? 'Версия согласия' : 'Različica soglasja') + ': ' + CONSENT_VERSION);
    return lines.join('\n');
  }
  function buildLead(site, comment, email, telegram, consent) {
    return { id: 'lead_' + Date.now(), date: new Date().toISOString(), lang: lang(), support: state.support, ai: state.ai, interest: state.interest, automations: selectedAutomations().map(function (a) { return a.id; }), siteUrl: site, comment: comment, email: email, telegram: telegram, marketingConsent: !!consent, consentTextVersion: CONSENT_VERSION, consentDate: consent ? new Date().toISOString() : null, status: 'new' };
  }

  window.submitAI = function (e) {
    e.preventDefault();
    var d = D().form, err = $('aiErr');
    var site = normUrl(($('aiSite') || {}).value || '');
    var comment = ($('aiComment') || {}).value || '';
    var email = (($('aiEmail') || {}).value || '').replace(/^\s+|\s+$/g, '');
    var telegram = (($('aiTelegram') || {}).value || '').replace(/^\s+|\s+$/g, '');
    var consent = !!($('aiConsent') || {}).checked;
    if (site && !validUrl(site)) { if (err) err.textContent = d.errUrl; return false; }
    if (!validEmail(email)) { if (err) err.textContent = d.errEmail; return false; }
    if (!state.support && !state.ai && !state.interest && !selectedAutomations().length && !comment) { if (err) err.textContent = d.errEmpty; return false; }
    if (err) err.textContent = '';
    var text = buildText(site, comment, email, telegram, consent);
    deliverAI(text, buildLead(site, comment, email, telegram, consent));
    return false;
  };
  function deliverAI(text, lead) {
    var ep = (window.CONFIG && CONFIG.ai && CONFIG.ai.enabled && CONFIG.ai.endpoint) || (window.CONFIG && CONFIG.submit && CONFIG.submit.enabled && CONFIG.submit.endpoint);
    if (ep) {
      try {
        window.fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
          .then(function (r) { showAIResult(r && r.ok, text); })
          .catch(function () { showAIResult(false, text); });
        return;
      } catch (ex) {}
    }
    showAIResult(false, text);
  }
  function showAIResult(sent, text) {
    var d = D().form, form = $('aiForm'), res = $('aiResult');
    if (!res) return;
    if (form) form.hidden = true;
    res.hidden = false;
    res.innerHTML = '<h3>' + esc(sent ? (lang() === 'ru' ? 'Спасибо!' : 'Hvala!') : d.notSentTitle) + '</h3>';
    if (sent) res.innerHTML += '<p>' + esc(lang() === 'ru' ? 'Заявка отправлена.' : 'Zahteva je poslana.') + '</p>';
    else {
      res.innerHTML += '<div class="notice">' + d.notSentText + '</div><pre class="copyout" id="aiCopyout">' + esc(text) + '</pre>';
      res.innerHTML += '<div class="mnav"><button type="button" class="link" onclick="backAIForm()">' + esc(d.back) + '</button><button type="button" class="btn" id="aiCopyBtn" onclick="copyAI()">' + esc(d.copy) + '</button></div>';
    }
    res.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.backAIForm = function () {
    var form = $('aiForm'), res = $('aiResult');
    if (form) form.hidden = false;
    if (res) res.hidden = true;
    aiScrollTo('request');
  };
  window.copyAI = function () {
    var pre = $('aiCopyout'); if (!pre) return;
    var done = function () { var b = $('aiCopyBtn'); if (b) b.textContent = D().form.copied; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(pre.textContent).then(done, function () { fallback(pre, done); });
    else fallback(pre, done);
  };
  function fallback(pre, done) {
    try { var r = document.createRange(); r.selectNodeContents(pre); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand('copy'); done(); } catch (e) {}
  }

  function showAITip(btn) {
    var card = btn.closest ? btn.closest('.ai-auto-card') : null; if (!card) return;
    var id = card.getAttribute('data-auto'), c = autoById(id); if (!c) return;
    var tip = $('aiTip');
    if (!tip) {
      tip = document.createElement('div'); tip.id = 'aiTip'; tip.className = 'ai-tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true;
      document.body.appendChild(tip);
    }
    tip.innerHTML = esc(c.tip);
    tip.hidden = false;
    tip.style.visibility = 'hidden';
    var r = btn.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
    var left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), window.innerWidth - w - 12);
    var top = r.bottom + 8;
    if (top + h > window.innerHeight - 12) top = Math.max(12, r.top - h - 8);
    tip.style.left = left + 'px'; tip.style.top = top + 'px'; tip.style.visibility = '';
    btn.setAttribute('aria-expanded', 'true');
  }
  window.showAITip = showAITip;
  window.hideAITip = function () {
    var tip = $('aiTip'); if (tip) tip.hidden = true;
    var b = document.querySelectorAll('.ai-info[aria-expanded="true"]'); for (var i = 0; i < b.length; i++) b[i].setAttribute('aria-expanded', 'false');
  };
  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.ai-info')) hideAITip();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideAITip(); });
  window.addEventListener('scroll', hideAITip, true);

  function renderFAQ() {
    var d = D().faq, h = '<div class="ai-section-head"><h2>' + esc(d.title) + '</h2></div>';
    for (var i = 0; i < d.items.length; i++) h += '<details class="faq"><summary>' + esc(d.items[i].q) + '</summary><p>' + esc(d.items[i].a) + '</p></details>';
    $('faqBox').innerHTML = h;
  }
  function renderCross() {
    var d = D().cross, h = '<div class="ai-cross"><h2>' + esc(d.title) + '</h2><div class="ai-cross-links">';
    h += '<a class="btn ghost" href="izdelava-spletnih-strani.html?lang=' + lang() + '">' + esc(d.link) + '</a>';
    h += '<span class="ai-future">' + esc(d.future) + '</span></div></div>';
    $('crossBox').innerHTML = h;
  }

  window.renderAI = function () {
    syncHeader();
    document.title = lang() === 'ru' ? 'Solo.Pov — AI и техническая поддержка' : 'Solo.Pov — AI in tehnična podpora';
    renderHero(); renderSupport(); renderAISection(); renderAutomation(); renderRequest(); renderFAQ(); renderCross();
  };

  document.addEventListener('DOMContentLoaded', function () { window.renderAI(); });
  window.addEventListener('resize', syncHeader);
  window.addEventListener('load', syncHeader);
  if (window.ResizeObserver) { var hh = document.querySelector('header'); if (hh) new ResizeObserver(syncHeader).observe(hh); }
})();
