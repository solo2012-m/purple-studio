/* Solo.Pov — AI, support and automation page logic */
(function () {
  'use strict';
  var state = { demo: 0 };
  var CONSENT_VERSION = '2026-10-18';

  var ICONS = {
    telegram: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2.5 9l13-5-4 11-3-4-6-2z"/><path d="M8.5 11l3-3"/></svg>',
    reply: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M15 9a6 6 0 01-6 6H4l-2 2V9a6 6 0 016-6h1a6 6 0 016 6z"/><path d="M6 8h6M6 11h4"/></svg>',
    calendar: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="4" width="12" height="11" rx="2"/><path d="M3 7h12M6 2.5v3M12 2.5v3M6 10h2M10 10h2"/></svg>',
    crm: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><ellipse cx="9" cy="5" rx="5" ry="2"/><path d="M4 5v4c0 1.1 2.2 2 5 2s5-.9 5-2V5M4 9v4c0 1.1 2.2 2 5 2s5-.9 5-2V9"/></svg>',
    ai: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="4" y="4" width="10" height="10" rx="3"/><path d="M7 8h4M7 11h4M9 2v2M9 14v2M2 9h2M14 9h2"/></svg>',
    publish: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 14l1-3 7-7 2 2-7 7-3 1z"/><path d="M10 5l3 3"/></svg>'
  };

  function lang() { return (window.SOLO && SOLO.getLang) ? SOLO.getLang() : 'sl'; }
  function D() { var d = window.SOLO_AI || {}; return d[lang()] || d.sl; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function $(id) { return document.getElementById(id); }

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
    h += '<p class="ai-lead">' + esc(d.sub) + '</p>';
    h += '<span class="ai-demo-badge">' + esc(d.badge) + '</span>';
    h += '<div class="ai-cards">';
    for (var i = 0; i < d.cards.length; i++) {
      var c = d.cards[i];
      h += '<a class="ai-card" href="#' + c.id + '" onclick="return aiGo(event,\'' + c.id + '\')">';
      h += '<span class="ai-card-num">' + esc(c.n) + '</span>';
      h += '<b>' + esc(c.title) + '</b><p>' + esc(c.desc) + '</p><span class="ai-card-cta">' + esc(c.cta) + '</span></a>';
    }
    h += '</div>';
    $('aiHero').innerHTML = h;
  }

  function renderSupport() {
    var d = D().support, h = '';
    h += '<div class="ai-section-head"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + esc(d.title) + '</h2><p class="ai-lead">' + esc(d.desc) + '</p></div>';
    h += '<div class="ai-tariffs">';
    for (var i = 0; i < d.tariffs.length; i++) {
      var t = d.tariffs[i];
      h += '<article class="ai-tariff"><div class="ai-tariff-name">' + esc(t.name) + '</div><div class="ai-tariff-price">' + esc(t.price) + '</div>';
      h += '<p class="ai-tariff-desc">' + esc(t.desc) + '</p><ul>';
      for (var j = 0; j < t.features.length; j++) h += '<li>' + esc(t.features[j]) + '</li>';
      h += '</ul>';
      if (t.note) h += '<p class="ai-tariff-note">' + esc(t.note) + '</p>';
      h += '</article>';
    }
    h += '</div>';
    h += '<div class="ai-conditions"><h3>' + esc(d.conditionsTitle) + '</h3><ul>';
    for (var k = 0; k < d.conditions.length; k++) h += '<li>' + esc(d.conditions[k]) + '</li>';
    h += '</ul></div>';
    h += '<details class="ai-details"><summary>' + esc(d.smallTitle) + '</summary><p>' + esc(d.smallText) + '</p></details>';
    h += '<div class="ai-actions"><button type="button" class="btn" onclick="startAIRequest(\'support\')">' + esc(d.cta) + '</button></div>';
    $('supportBox').innerHTML = h;
  }

  function chatHTML(demo) {
    var ru = lang() === 'ru', h = '';
    h += '<div class="tg-head"><span class="tg-avatar">AI</span><div><b>SOLO.POV</b><small>' + esc(ru ? 'пример переписки' : 'primer pogovora') + '</small></div></div>';
    h += '<div class="tg-body">';
    for (var i = 0; i < demo.chat.length; i++) {
      var m = demo.chat[i], out = m.who === 'client';
      h += '<div class="tg-row' + (out ? ' out' : '') + '"><span class="tg-who">' + esc(out ? (ru ? 'Клиент' : 'Naročnik') : 'AI') + '</span><div class="tg-bubble">' + esc(m.text) + '</div></div>';
    }
    h += '</div>';
    return h;
  }
  function showDemo(i) {
    state.demo = i;
    var d = D().ai;
    var tabs = document.querySelectorAll('.ai-demo-tab');
    for (var j = 0; j < tabs.length; j++) tabs[j].classList.toggle('on', Number(tabs[j].getAttribute('data-demo')) === i);
    var win = $('tgWindow'); if (win && d.demos[i]) win.innerHTML = chatHTML(d.demos[i]);
  }
  window.showDemo = showDemo;

  function renderAISection() {
    var d = D().ai, h = '';
    h += '<div class="ai-section-head"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + esc(d.title) + '</h2><p class="ai-lead">' + esc(d.sub) + '</p></div>';
    h += '<div class="ai-demo">';
    h += '<div class="ai-demo-side"><span class="ai-demo-label">' + esc(d.demoLabel) + '</span><div class="ai-demo-tabs">';
    for (var i = 0; i < d.demos.length; i++) h += '<button type="button" class="ai-demo-tab' + (state.demo === i ? ' on' : '') + '" data-demo="' + i + '" onclick="showDemo(' + i + ')">' + esc(d.demos[i].label) + '</button>';
    h += '</div></div><div class="tg-window" id="tgWindow">' + chatHTML(d.demos[state.demo] || d.demos[0]) + '</div></div>';
    h += '<p class="ai-demo-note">' + esc(d.note) + '</p>';
    h += '<div class="ai-tariffs ai-tariffs--ai">';
    for (var j = 0; j < d.tariffs.length; j++) {
      var t = d.tariffs[j];
      h += '<article class="ai-tariff"><div class="ai-tariff-name">' + esc(t.name) + '</div><div class="ai-tariff-price">' + esc(t.price) + '</div><ul>';
      for (var k = 0; k < t.features.length; k++) h += '<li>' + esc(t.features[k]) + '</li>';
      h += '</ul></article>';
    }
    h += '</div>';
    h += '<p class="ai-footnote">' + esc(d.tariffNote) + '</p><p class="ai-footnote ai-footnote--small">' + esc(d.tariffFootnote) + '</p>';
    h += '<div class="ai-actions"><button type="button" class="btn" onclick="startAIRequest(\'ai\')">' + esc(d.cta) + '</button></div>';
    $('aiBox').innerHTML = h;
  }

  function renderAutomation() {
    var d = D().automation, h = '';
    h += '<div class="ai-section-head"><span class="eyebrow">' + esc(d.eyebrow) + '</span><h2>' + esc(d.title) + '</h2><p class="ai-lead">' + esc(d.desc) + '</p></div>';
    h += '<div class="ai-auto-grid">';
    var keys = ['telegram', 'reply', 'calendar', 'crm', 'ai', 'publish'];
    for (var i = 0; i < d.cards.length; i++) {
      h += '<div class="ai-auto-card"><span class="ai-auto-ico">' + ICONS[keys[i]] + '</span><b>' + esc(d.cards[i].title) + '</b><p>' + esc(d.cards[i].desc) + '</p></div>';
    }
    h += '</div>';
    h += '<p class="ai-footnote">' + esc(d.priceNote) + '</p>';
    h += '<div class="ai-prices">';
    for (var j = 0; j < d.prices.length; j++) h += '<div><span>' + esc(d.prices[j].title) + '</span><b>' + esc(d.prices[j].price) + '</b></div>';
    h += '</div><p class="ai-footnote ai-footnote--small">' + esc(d.footnote) + '</p>';
    h += '<div class="ai-actions"><button type="button" class="btn" onclick="startAIRequest(\'automation_leads\')">' + esc(d.cta) + '</button></div>';
    $('automationBox').innerHTML = h;
  }

  function readForm() {
    var v = {};
    ['aiTopic', 'aiSite', 'aiComment', 'aiEmail', 'aiTelegram'].forEach(function (id) { var e = $(id); v[id] = e ? e.value : ''; });
    var c = $('aiConsent'); v.consent = !!(c && c.checked);
    return v;
  }
  function renderRequest() {
    var d = D().form, old = readForm(), h = '';
    h += '<div class="ai-form-panel"><h2>' + esc(d.title) + '</h2><p class="ai-lead">' + esc(d.desc) + '</p>';
    h += '<form id="aiForm" onsubmit="return submitAI(event)">';
    h += '<div class="field"><label>' + esc(d.topicLabel) + '</label><select id="aiTopic"><option value="">—</option>';
    for (var i = 0; i < d.topics.length; i++) h += '<option value="' + d.topics[i].value + '">' + esc(d.topics[i].label) + '</option>';
    h += '</select></div>';
    h += '<div class="grid g2"><div class="field"><label>' + esc(d.siteLabel) + '</label><input id="aiSite" inputmode="url" placeholder="' + esc(d.sitePh) + '"></div>';
    h += '<div class="field"><label>' + esc(d.emailLabel) + '</label><input type="email" id="aiEmail" placeholder="' + esc(d.emailPh) + '"></div></div>';
    h += '<div class="field"><label>' + esc(d.commentLabel) + '</label><textarea id="aiComment" rows="3" placeholder="' + esc(d.commentPh) + '"></textarea></div>';
    h += '<div class="field"><label>' + esc(d.telegramLabel) + '</label><input id="aiTelegram" placeholder="' + esc(d.telegramPh) + '"></div>';
    h += '<label class="check"><input type="checkbox" id="aiConsent"><span>' + esc(d.consent) + '</span></label><small class="consent-note">' + esc(d.consentNote) + '</small>';
    h += '<a class="privacy-link" href="../privacy.html" target="_blank" rel="noopener">' + esc(d.privacy) + '</a>';
    h += '<div class="qerr" id="aiErr"></div><button type="submit" class="btn">' + esc(d.submit) + '</button><small class="meta">' + esc(d.note) + '</small>';
    h += '</form><div id="aiResult" class="ai-result" hidden></div></div>';
    $('requestBox').innerHTML = h;
    if (old.aiTopic || old.aiSite || old.aiComment || old.aiEmail || old.aiTelegram) {
      ['aiTopic', 'aiSite', 'aiComment', 'aiEmail', 'aiTelegram'].forEach(function (id) { if ($(id)) $(id).value = old[id]; });
      if ($('aiConsent')) $('aiConsent').checked = old.consent;
    }
  }

  window.startAIRequest = function (topic) {
    var sel = $('aiTopic'); if (sel) sel.value = topic;
    aiScrollTo('request');
    var email = $('aiEmail'); if (email) setTimeout(function () { email.focus(); }, 350);
  };

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function validUrl(v) { return /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,63}(:\d{1,5})?([\/?#][^\s]*)?$/i.test(v); }
  function normUrl(v) { v = (v || '').replace(/^\s+|\s+$/g, ''); return v && !/^https?:\/\//i.test(v) ? 'https://' + v : v; }

  function topicLabel(v) {
    var topics = D().form.topics;
    for (var i = 0; i < topics.length; i++) if (topics[i].value === v) return topics[i].label;
    return v;
  }
  function buildText(topic, site, comment, email, telegram, consent) {
    var ru = lang() === 'ru', lines = [];
    lines.push(ru ? 'Заявка Solo.Pov — AI и поддержка' : 'Povpraševanje Solo.Pov — AI in podpora');
    lines.push((ru ? 'Дата' : 'Datum') + ': ' + new Date().toLocaleString(ru ? 'ru-RU' : 'sl-SI'));
    lines.push((ru ? 'Интересует' : 'Zanima') + ': ' + topicLabel(topic));
    if (site) lines.push((ru ? 'Сайт' : 'Stran') + ': ' + site);
    if (comment) lines.push((ru ? 'Задача' : 'Naloga') + ': ' + comment);
    lines.push('Email: ' + email);
    if (telegram) lines.push('Telegram: ' + telegram);
    lines.push((ru ? 'Согласие на новости' : 'Soglasje za novice') + ': ' + (consent ? (ru ? 'да' : 'da') : (ru ? 'нет' : 'ne')));
    lines.push((ru ? 'Версия согласия' : 'Različica soglasja') + ': ' + CONSENT_VERSION);
    return lines.join('\n');
  }
  function buildLead(topic, site, comment, email, telegram, consent) {
    return { id: 'lead_' + Date.now(), date: new Date().toISOString(), lang: lang(), topic: topic, siteUrl: site, comment: comment, email: email, telegram: telegram, marketingConsent: !!consent, consentTextVersion: CONSENT_VERSION, consentDate: consent ? new Date().toISOString() : null, status: 'new' };
  }

  window.submitAI = function (e) {
    e.preventDefault();
    var d = D().form, err = $('aiErr');
    var topic = ($('aiTopic') || {}).value || '';
    var site = normUrl(($('aiSite') || {}).value || '');
    var comment = ($('aiComment') || {}).value || '';
    var email = (($('aiEmail') || {}).value || '').replace(/^\s+|\s+$/g, '');
    var telegram = (($('aiTelegram') || {}).value || '').replace(/^\s+|\s+$/g, '');
    var consent = !!($('aiConsent') || {}).checked;
    if (!topic) { if (err) err.textContent = d.errTopic; return false; }
    if (site && !validUrl(site)) { if (err) err.textContent = d.errUrl; return false; }
    if (!validEmail(email)) { if (err) err.textContent = d.errEmail; return false; }
    if (err) err.textContent = '';
    var text = buildText(topic, site, comment, email, telegram, consent);
    var lead = buildLead(topic, site, comment, email, telegram, consent);
    deliverAI(text, lead);
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

  function renderFAQ() {
    var d = D().faq, h = '<div class="ai-section-head"><h2>' + esc(d.title) + '</h2></div>';
    for (var i = 0; i < d.items.length; i++) h += '<details class="faq"><summary>' + esc(d.items[i].q) + '</summary><p>' + esc(d.items[i].a) + '</p></details>';
    $('faqBox').innerHTML = h;
  }
  function renderCross() {
    var d = D().cross, h = '';
    h += '<div class="ai-cross"><h2>' + esc(d.title) + '</h2><div class="ai-cross-links">';
    h += '<a class="btn ghost" href="izdelava-spletnih-strani.html">' + esc(d.link) + '</a>';
    h += '<span class="ai-future">' + esc(d.future) + '</span>';
    h += '</div></div>';
    $('crossBox').innerHTML = h;
  }

  window.renderAI = function () {
    syncHeader();
    document.title = lang() === 'ru' ? 'Solo.Pov — AI и техническая поддержка' : 'Solo.Pov — AI in tehnična podpora';
    renderHero(); renderSupport(); renderAISection(); renderAutomation(); renderRequest(); renderFAQ(); renderCross();
  };

  document.addEventListener('DOMContentLoaded', function () {
    syncHeader();
    window.renderAI();
  });
  window.addEventListener('resize', syncHeader);
  window.addEventListener('load', syncHeader);
  if (window.ResizeObserver) {
    var hh = document.querySelector('header');
    if (hh) new ResizeObserver(syncHeader).observe(hh);
  }
})();
