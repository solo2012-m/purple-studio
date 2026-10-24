/* Solo.Pov — AI assistant and automation page logic (v3, 2026-10-24) */
(function () {
  'use strict';
  var state = { ai: null, automations: {}, interest: null, scenario: 0 };
  var CONSENT_VERSION = '2026-10-24';
  var tipTimer = null;

  var ICONS = {
    telegram: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2.5 9l13-5-4 11-3-4-6-2z"/><path d="M8.5 11l3-3"/></svg>',
    reply: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M15 9a6 6 0 01-6 6H4l-2 2V9a6 6 0 016-6h1a6 6 0 016 6z"/><path d="M6 8h6M6 11h4"/></svg>',
    booking: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="4" width="12" height="11" rx="2"/><path d="M3 7h12M6 2.5v3M12 2.5v3M6 10h2M10 10h2"/></svg>',
    crm: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><ellipse cx="9" cy="5" rx="5" ry="2"/><path d="M4 5v4c0 1.1 2.2 2 5 2s5-.9 5-2V5M4 9v4c0 1.1 2.2 2 5 2s5-.9 5-2V9"/></svg>',
    'ai-process': '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="4" y="4" width="10" height="10" rx="3"/><path d="M7 8h4M7 11h4M9 2v2M9 14v2M2 9h2M14 9h2"/></svg>',
    publish: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 14l1-3 7-7 2 2-7 7-3 1z"/><path d="M10 5l3 3"/></svg>'
  };

  var TICKS = '<svg class="tgm-ticks" width="15" height="10" viewBox="0 0 16 11" aria-hidden="true"><path d="M1 5.5l3 3L10 2" fill="none" stroke="#4FC3F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 8.5L13 2" fill="none" stroke="#4FC3F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function lang() { return (window.SOLO && SOLO.getLang) ? SOLO.getLang() : 'sl'; }
  function D() { var d = window.SOLO_AI || {}; return d[lang()] || d.sl; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function $(id) { return document.getElementById(id); }
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
      h += '<a class="ai-card" href="#' + esc(c.id) + '" onclick="return aiGo(event,\'' + esc(c.id) + '\')">';
      h += '<b>' + esc(c.title) + '</b><p>' + esc(c.desc) + '</p><span class="ai-card-cta">' + esc(c.cta) + '</span></a>';
    }
    h += '</div>';
    $('aiHero').innerHTML = h;
  }

  function msgTime(i) {
    var t = 10 * 60 + 24 + i * 2, hh = Math.floor(t / 60) % 24, mm = t % 60;
    return hh + ':' + (mm < 10 ? '0' : '') + mm;
  }
  function botLabel() { return lang() === 'ru' ? 'бот' : 'bot'; }
  function dayLabel() { return lang() === 'ru' ? 'Сегодня' : 'Danes'; }
  function inputLabel() { return lang() === 'ru' ? 'Сообщение' : 'Sporočilo'; }

  function phoneHTML(item, idx) {
    var h = '<div class="tgm-phone" data-phone="' + idx + '">';
    h += '<div class="tgm-screen">';
    h += '<div class="tgm-notch" aria-hidden="true"></div>';
    h += '<div class="tgm-status"><span>10:24</span><span class="tgm-sys" aria-hidden="true"><svg width="43" height="11" viewBox="0 0 43 11" fill="#111"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="6" rx="1"/><rect x="10" y="3" width="3" height="8" rx="1"/><rect x="15" y="1" width="3" height="10" rx="1"/><path d="M25.5 2.1a6.3 6.3 0 017.9 0l-1 1.2a4.8 4.8 0 00-5.9 0zM27.1 4.3a3.6 3.6 0 014.7 0l-1 1.2a2.1 2.1 0 00-2.7 0zM29.4 6.5c.4-.3.9-.3 1.3 0l-.65.8z"/><rect x="36" y="2" width="6.2" height="7" rx="1.8" fill="none" stroke="#111" stroke-width="1"/><rect x="37.2" y="3.2" width="3.6" height="4.6" rx="1"/><rect x="42.5" y="4" width="1" height="3" rx=".5"/></svg></span></div>';
    h += '<div class="tgm-head"><span class="tgm-back" aria-hidden="true">&#8249;</span>';
    h += '<span class="tgm-avatar"><img src="' + esc(item.avatar) + '" alt="" width="72" height="72" loading="lazy"></span>';
    h += '<span class="tgm-peer"><b>' + esc(item.bot) + '</b><small>' + esc(botLabel()) + '</small></span>';
    h += '<span class="tgm-menu" aria-hidden="true"><i></i><i></i><i></i></span></div>';
    h += '<div class="tgm-chat">';
    h += '<span class="tgm-day">' + esc(dayLabel()) + '</span>';
    for (var i = 0; i < item.messages.length; i++) {
      var m = item.messages[i], out = m.who === 'client';
      h += '<div class="tgm-row ' + (out ? 'out' : 'in') + '"><div class="tgm-bubble"><p>' + esc(m.text).replace(/\n/g, '<br>') + '</p><span class="tgm-meta">' + msgTime(i) + (out ? TICKS : '') + '</span></div></div>';
    }
    h += '</div>';
    h += '<div class="tgm-input"><span class="tgm-emoji" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b8f96" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.2 2.1 1.8 3.5 1.8s2.5-.6 3.5-1.8M9 9.5h.01M15 9.5h.01" stroke-linecap="round"/></svg></span>';
    h += '<span class="tgm-field">' + esc(inputLabel()) + '</span>';
    h += '<span class="tgm-attach" aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8b8f96" stroke-width="1.7" stroke-linecap="round"><path d="M20 11.5l-8.2 8.2a5 5 0 01-7.1-7.1l8.5-8.5a3.4 3.4 0 014.8 4.8l-8.4 8.4a1.8 1.8 0 01-2.6-2.6l7.7-7.7"/></svg></span>';
    h += '<span class="tgm-mic" aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8b8f96" stroke-width="1.7" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0012 0M12 17v3"/></svg></span>';
    h += '</div><div class="tgm-home" aria-hidden="true"></div></div></div>';
    return h;
  }

  function phoneSection() {
    var d = D().ai.scenarios, h = '';
    h += '<div class="ai-sc-head"><span class="eyebrow">' + esc(d.label) + '</span><h3>' + esc(d.title) + '</h3><p class="ai-lead">' + esc(d.note) + '</p></div>';
    h += '<div class="tgm-tabs" role="tablist">';
    for (var i = 0; i < d.items.length; i++) {
      h += '<button type="button" class="tgm-tab' + (i === state.scenario ? ' on' : '') + '" role="tab" aria-selected="' + (i === state.scenario ? 'true' : 'false') + '" data-idx="' + i + '" onclick="selectScenario(' + i + ')"><span>' + esc(d.items[i].tab) + '</span><small>' + esc(d.items[i].project) + '</small></button>';
    }
    h += '</div><div class="tgm-grid">';
    for (var j = 0; j < d.items.length; j++) {
      var it = d.items[j];
      h += '<div class="tgm-col' + (j === state.scenario ? ' on' : '') + '" data-col="' + j + '">';
      h += '<div class="tgm-caption"><span>0' + (j + 1) + '</span>' + esc(it.tab) + '</div>';
      h += phoneHTML(it, j);
      if (it.note) h += '<p class="tgm-note">' + esc(it.note) + '</p>';
      h += '</div>';
    }
    h += '</div>';
    h += '<p class="ai-demo-note">' + esc(d.afterNote) + '</p>';
    h += '<p class="ai-demo-note ai-demo-note--small">' + esc(d.disclaimer) + '</p>';
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

  function renderAISection() {
    var d = D().ai, h = '';
    h += '<div class="ai-section-head"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + esc(d.title) + '</h2><p class="ai-lead">' + esc(d.sub) + '</p></div>';
    h += '<div class="ai-offer"><p class="ai-offer-accent">' + esc(d.offer.accent) + '</p><button type="button" class="btn" onclick="startTrial()">' + esc(d.offer.cta) + '</button><p class="ai-offer-note">' + esc(d.offer.note) + '</p></div>';
    h += '<div class="ai-scenarios" id="aiScenario">' + phoneSection() + '</div>';
    h += '<div class="ai-tariffs-head"><span class="eyebrow">' + esc(d.tariffsEyebrow) + '</span><h3>' + esc(d.tariffsTitle) + '</h3></div>';
    h += '<div class="ai-tariffs ai-tariffs--4" id="aiTariffs"></div>';
    h += '<p class="ai-footnote">' + esc(d.tariffNote) + '</p><p class="ai-footnote ai-footnote--small">' + esc(d.tariffFootnote) + '</p>';
    h += '<div class="ai-actions"><button type="button" class="btn" onclick="aiScrollTo(\'request\')">' + esc(d.cta) + '</button></div>';
    $('aiBox').innerHTML = h;
    aiTariffCards();
    selectScenario(state.scenario);
  }

  window.selectScenario = function (idx) {
    var items = D().ai.scenarios.items;
    idx = Number(idx) || 0;
    if (idx < 0 || idx >= items.length) idx = 0;
    state.scenario = idx;
    var tabs = document.querySelectorAll('.tgm-tab');
    for (var i = 0; i < tabs.length; i++) {
      var on = Number(tabs[i].getAttribute('data-idx')) === idx;
      tabs[i].classList.toggle('on', on);
      tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
    }
    var cols = document.querySelectorAll('.tgm-col');
    for (var j = 0; j < cols.length; j++) cols[j].classList.toggle('on', Number(cols[j].getAttribute('data-col')) === idx);
  };
  window.startTrial = function () {
    state.interest = 'trial';
    refreshSummary();
    aiScrollTo('request');
  };

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
    if (d.integrationNote) h += '<p class="ai-footnote ai-footnote--small">' + esc(d.integrationNote) + '</p>';
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
      var interestLabel = lang() === 'ru' ? 'Бесплатная демонстрация' : 'Brezplačna predstavitev';
      h += '<div class="ai-sum-row"><span><small>' + esc(d.aiLabel) + '</small><b>' + esc(interestLabel) + '</b></span><button type="button" class="ai-sum-remove" onclick="removeSelection(\'interest\')" aria-label="' + esc(d.remove) + '">&times;</button></div>';
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
    if (kind === 'ai') state.ai = null;
    if (kind === 'interest') state.interest = null;
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
    lines.push(ru ? 'Заявка Solo.Pov — AI-ассистент и автоматизация' : 'Povpraševanje Solo.Pov — AI-asistent in avtomatizacija');
    lines.push((ru ? 'Дата' : 'Datum') + ': ' + new Date().toLocaleString(ru ? 'ru-RU' : 'sl-SI'));
    if (state.ai) { var a = aiById(state.ai); if (a) lines.push((ru ? 'AI-ассистент' : 'AI-asistent') + ': ' + a.name + ' — ' + a.price); }
    if (state.interest) lines.push((ru ? 'Интерес' : 'Zanimanje') + ': ' + (ru ? 'Бесплатная демонстрация' : 'Brezplačna predstavitev'));
    var autos = selectedAutomations();
    if (autos.length) {
      lines.push((ru ? 'Автоматизация' : 'Avtomatizacija') + ':');
      for (var i = 0; i < autos.length; i++) lines.push('- ' + autos[i].title);
    }
    var monthly = (state.ai ? aiById(state.ai).monthly : 0);
    if (monthly > 0) lines.push((ru ? 'Предварительный ежемесячный тариф' : 'Predhodni mesečni paket') + ': ' + (ru ? 'от ' + monthly + ' €/мес.' : 'od ' + monthly + ' €/mesec'));
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
    return { id: 'lead_' + Date.now(), date: new Date().toISOString(), lang: lang(), ai: state.ai, interest: state.interest, automations: selectedAutomations().map(function (a) { return a.id; }), siteUrl: site, comment: comment, email: email, telegram: telegram, marketingConsent: !!consent, consentTextVersion: CONSENT_VERSION, consentDate: consent ? new Date().toISOString() : null, status: 'new' };
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
    if (!state.ai && !state.interest && !selectedAutomations().length && !comment) { if (err) err.textContent = d.errEmpty; return false; }
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
    document.title = lang() === 'ru' ? 'Solo.Pov — AI-ассистент и автоматизация' : 'Solo.Pov — AI-asistent in avtomatizacija';
    renderHero(); renderAISection(); renderAutomation(); renderRequest(); renderFAQ(); renderCross();
  };

  document.addEventListener('DOMContentLoaded', function () { window.renderAI(); });
  window.addEventListener('resize', syncHeader);
  window.addEventListener('load', syncHeader);
  if (window.ResizeObserver) { var hh = document.querySelector('header'); if (hh) new ResizeObserver(syncHeader).observe(hh); }
})();
