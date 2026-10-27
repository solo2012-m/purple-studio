/* Solo.Pov — tariffs renderer and selector */
(function () {
  'use strict';
  var state = { tariff: null, addons: {}, compareTab: 'start' };

  function lang() { return (window.SOLO && SOLO.getLang) ? SOLO.getLang() : 'sl'; }
  function data() { var d = window.SOLO_TARIFFS || {}; return d[lang()] || d.sl; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function money(n) { if (n == null) return ''; return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €'; }
  function byId(id) { var a = data().tariffs; for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; }
  function addonById(id) { var a = data().addons; for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; }
  function isIncluded(id) { var t = byId(state.tariff); return !!(t && t.includes && t.includes.indexOf(id) !== -1); }
  function selectedAddons() { return data().addons.filter(function (a) { return state.addons[a.id] && !isIncluded(a.id); }); }
  function cell(v) {
    if (v === true) return '<span class="yes">&#10003;</span>';
    if (v === false) return '<span class="no">&mdash;</span>';
    return esc(v);
  }

  var ICONS = {
    page: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="4" y="2.5" width="10" height="13" rx="2"/><path d="M7 6h4M7 9h4M7 12h2"/></svg>',
    language: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="9" cy="9" r="6"/><path d="M3 9h12M9 3c2 2.2 2 9.8 0 12M9 3c-2 2.2-2 9.8 0 12"/></svg>',
    blog: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 14l1-3 7-7 2 2-7 7-3 1z"/><path d="M10 5l3 3"/></svg>',
    form: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="3" width="12" height="12" rx="2"/><path d="M6 7h6M6 10h6M6 13h3"/></svg>',
    booking: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="4" width="12" height="11" rx="2"/><path d="M3 7h12M6 2.5v3M12 2.5v3M6 10h2M10 10h2M6 12.5h2"/></svg>',
    analytics: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M3 15V9M7 15V5M11 15v-4M15 15V7"/></svg>',
    tracking: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="9" cy="9" r="6"/><circle cx="9" cy="9" r="2"/><path d="M9 3v2M9 13v2M3 9h2M13 9h2"/></svg>',
    gbp: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M9 16s5-4.5 5-8a5 5 0 10-10 0c0 3.5 5 8 5 8z"/><circle cx="9" cy="8" r="1.8"/></svg>',
    calculator: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="4" y="2.5" width="10" height="13" rx="2"/><path d="M6 5h6M6 9h2M10 9h2M6 12h2M10 12h2"/></svg>',
    integrations: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M7 11l4-4"/><path d="M6 8l-1 1a2.5 2.5 0 003.5 3.5l1-1M12 10l1-1a2.5 2.5 0 00-3.5-3.5l-1 1"/></svg>'
  };

  function renderCards() {
    var d = data(), h = '';
    for (var i = 0; i < d.tariffs.length; i++) {
      var t = d.tariffs[i], sel = state.tariff === t.id;
      h += '<article class="tariff-card' + (sel ? ' sel' : '') + (t.id === 'custom' ? ' custom' : '') + '" data-tariff="' + t.id + '" role="button" tabindex="0" aria-pressed="' + (sel ? 'true' : 'false') + '" onclick="tariffCard(\'' + t.id + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();tariffCard(\'' + t.id + '\')}">';
      h += '<span class="tariff-arrow">&#8594;</span>';
      if (sel) h += '<span class="tariff-badge">' + esc(d.ui.selected) + '</span>';
      h += '<div class="tariff-name">' + esc(t.name) + '</div>';
      var priceText = t.price == null ? t.priceLabel : (d.ui.from + ' ' + money(t.price));
      h += '<div class="tariff-price' + (t.price == null ? ' small' : '') + '">' + esc(priceText) + '</div>';
      h += '<p class="tariff-desc">' + esc(t.desc) + '</p>';
      h += '<ul class="tariff-feats">';
      for (var j = 0; j < t.features.length; j++) h += '<li>' + esc(t.features[j]) + '</li>';
      h += '</ul>';
      h += '<button type="button" class="btn ' + (sel ? '' : 'ghost') + ' tariff-btn" onclick="event.stopPropagation();tariffCard(\'' + t.id + '\')">' + esc(sel ? d.ui.selected : t.cta) + '</button>';
      h += '</article>';
    }
    document.getElementById('tariffCards').innerHTML = h;
  }

  function rowLabel(row) {
    var l = esc(row.label);
    if (row.key === 'revisions') {
      return '<span class="info-wrap" data-tip="rev">' + l + ' <button type="button" class="info-btn" aria-label="' + esc(data().ui.revInfoLabel) + '" aria-expanded="false">i</button></span>';
    }
    return l;
  }

  function renderCompare() {
    var d = data(), ids = ['start', 'business', 'pro'], h = '';
    var tab = (state.compareTab === 'business' || state.compareTab === 'pro') ? state.compareTab : 'start';
    h += '<div class="cmp">';
    h += '<table class="cmp-table"><thead><tr><th></th>';
    for (var c = 0; c < ids.length; c++) {
      h += '<th data-col="' + ids[c] + '" class="' + (state.tariff === ids[c] ? 'on' : '') + '">' + esc(d.table.columns[c]) + '</th>';
    }
    h += '</tr></thead><tbody>';
    for (var r = 0; r < d.table.rows.length; r++) {
      var row = d.table.rows[r];
      h += '<tr><th>' + rowLabel(row) + '</th>';
      for (var v = 0; v < 3; v++) {
        h += '<td data-col="' + ids[v] + '" class="' + (state.tariff === ids[v] ? 'on' : '') + '">' + cell(row.values[v]) + '</td>';
      }
      h += '</tr>';
    }
    h += '</tbody></table>';
    h += '<div class="cmp-mobile">';
    h += '<div class="cmp-tabs">';
    for (var b = 0; b < ids.length; b++) {
      h += '<button type="button" class="' + (tab === ids[b] ? 'on' : '') + '" onclick="selectCompareTab(\'' + ids[b] + '\')">' + esc(d.table.columns[b]) + '</button>';
    }
    h += '</div><div class="cmp-list">';
    var idx = ids.indexOf(tab);
    for (var m = 0; m < d.table.rows.length; m++) {
      h += '<div class="cmp-item"><span>' + rowLabel(d.table.rows[m]) + '</span><b>' + cell(d.table.rows[m].values[idx]) + '</b></div>';
    }
    h += '</div></div></div>';
    h += '<p class="cmp-hint"><span class="hint-desktop">' + esc(d.ui.revHintDesktop) + '</span><span class="hint-mobile">' + esc(d.ui.revHintMobile) + '</span></p>';
    document.getElementById('tariffCompare').innerHTML = h;
  }

  function renderAddons() {
    var d = data(), h = '';
    for (var i = 0; i < d.addons.length; i++) {
      var a = d.addons[i], inc = isIncluded(a.id), checked = !!state.addons[a.id] && !inc;
      var price = inc ? d.ui.includedInTariff : (a.individual ? d.ui.individual : d.ui.from + ' ' + money(a.price));
      h += '<div class="addon-card' + (inc ? ' incl' : '') + '">';
      h += '<input type="checkbox" ' + (checked ? 'checked ' : '') + (inc ? 'disabled ' : '') + 'onchange="toggleAddon(\'' + a.id + '\')" aria-label="' + esc(a.title) + '">';
      h += '<span class="addon-ico">' + (ICONS[a.id] || '') + '</span>';
      h += '<div class="addon-body"><b>' + esc(a.title) + '</b><span class="addon-price">' + esc(price) + '</span></div>';
      h += '</div>';
    }
    document.getElementById('tariffAddons').innerHTML = h + '<p class="addons-note">' + esc(d.ui.addonsNote) + '</p>';
  }

  function renderCalc() {
    var d = data(), t = byId(state.tariff), box = document.getElementById('tariffCalc'), h = '';
    h += '<div class="calc">';
    if (!t) {
      h += '<h3>' + esc(d.ui.calcTitle) + '</h3><p class="calc-empty">' + esc(d.ui.calcEmpty) + '</p>';
      h += '<div class="calc-actions"><button type="button" class="btn ghost" onclick="javascript:document.getElementById(\'tariffs\').scrollIntoView({behavior:\'smooth\'})">' + esc(d.ui.choose || d.ui.calcTitle) + '</button>';
      h += '<button type="button" class="btn ghost" onclick="SOLO.startQuiz(\'a\')">' + esc(d.ui.unsure) + '</button></div>';
      h += '</div>';
      box.innerHTML = h;
      return;
    }
    var addons = selectedAddons(), addTotal = 0, ind = false;
    for (var i = 0; i < addons.length; i++) {
      if (addons[i].individual) ind = true; else addTotal += addons[i].price;
    }
    var total = t.price == null ? null : t.price + addTotal;
    h += '<h3>' + esc(d.ui.calcTitle) + '</h3>';
    h += '<div class="calc-row"><span>' + esc(d.ui.calcBase) + '</span><b>' + esc(t.name) + ' &mdash; ' + esc(t.priceLabel) + '</b></div>';
    h += '<div class="calc-row"><span>' + esc(d.ui.calcAddons) + '</span><b>';
    if (addons.length) {
      var parts = [];
      for (var j = 0; j < addons.length; j++) {
        parts.push(esc(addons[j].title) + (addons[j].individual ? ' &mdash; ' + esc(d.ui.individual) : ' &mdash; ' + esc(d.ui.from) + ' ' + money(addons[j].price)));
      }
      h += parts.join('<br>');
    } else { h += '&mdash;'; }
    h += '</b></div>';
    h += '<div class="calc-total"><span>' + esc(d.ui.calcTotal) + '</span><b>' + (total == null ? esc(d.ui.calcCustom) : money(total)) + '</b></div>';
    if (ind) h += '<p class="calc-ind">' + esc(d.ui.calcIndividual) + '</p>';
    h += '<p class="calc-note">' + esc(d.ui.calcNote) + '</p>';
    h += '<div class="calc-actions"><button type="button" class="btn" onclick="discussTariff()">' + esc(d.ui.discuss) + '</button>';
    h += '<button type="button" class="btn ghost" onclick="resetAddons()">' + esc(d.ui.reset) + '</button>';
    h += '<button type="button" class="btn ghost" onclick="SOLO.startQuiz(\'a\')">' + esc(d.ui.unsure) + '</button></div>';
    h += '</div>';
    box.innerHTML = h;
  }

  function renderPay() {
    var d = data(), L = lang() === 'ru', h = '';
    h += '<div class="payflow">';
    h += '<span class="eyebrow">' + (L ? 'Оплата' : 'Plačilo') + '</span>';
    h += '<h2>' + esc(d.ui.payTitle) + '</h2><p class="pay-lead">' + esc(d.ui.payLead) + '</p>';
    h += '<ol class="paysteps three">';
    for (var i = 0; i < d.ui.paySteps.length; i++) h += '<li><span>' + (i + 1) + '</span><b>' + esc(d.ui.paySteps[i]) + '</b></li>';
    h += '</ol>';
    h += '<p class="paynote">' + esc(d.ui.payNote) + '</p>';
    h += '<details class="pay-details"><summary>' + esc(d.ui.payDetailsTitle) + '</summary><ul>';
    for (var j = 0; j < d.ui.payDetails.length; j++) h += '<li>' + esc(d.ui.payDetails[j]) + '</li>';
    h += '</ul><p class="vat-note">' + esc(d.ui.vatNote) + '</p></details>';
    h += '</div>';
    document.getElementById('payinfo').innerHTML = h;
  }

  var tipTimer = null;
  function cancelTipHide() { if (tipTimer) { clearTimeout(tipTimer); tipTimer = null; } }
  function scheduleTipHide() { cancelTipHide(); tipTimer = setTimeout(hideTip, 140); }
  function getTip() {
    var el = document.getElementById('revTooltip');
    if (!el) {
      el = document.createElement('div');
      el.id = 'revTooltip';
      el.className = 'rev-tooltip';
      el.setAttribute('role', 'tooltip');
      el.hidden = true;
      el.addEventListener('mouseenter', cancelTipHide);
      el.addEventListener('mouseleave', scheduleTipHide);
      document.body.appendChild(el);
    }
    return el;
  }
  function showTip(target) {
    var d = data(), el = getTip();
    cancelTipHide();
    el.innerHTML = d.ui.revTooltip.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    el.hidden = false;
    el.style.visibility = 'hidden';
    var r = target.getBoundingClientRect();
    var w = el.offsetWidth, h = el.offsetHeight;
    var left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), window.innerWidth - w - 12);
    var top = r.bottom + 10;
    if (top + h > window.innerHeight - 12) top = Math.max(12, r.top - h - 10);
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.style.visibility = '';
    var btn = target.querySelector('.info-btn');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
  function hideTip() {
    cancelTipHide();
    var el = document.getElementById('revTooltip');
    if (el) el.hidden = true;
    var b = document.querySelectorAll('.info-wrap .info-btn[aria-expanded="true"]');
    for (var i = 0; i < b.length; i++) b[i].setAttribute('aria-expanded', 'false');
  }
  function toggleTip(target) {
    var el = document.getElementById('revTooltip');
    if (el && !el.hidden) hideTip(); else showTip(target);
  }
  document.addEventListener('mouseover', function (e) {
    var t = e.target.closest ? e.target.closest('.info-wrap') : null;
    if (t) showTip(t);
  });
  document.addEventListener('mouseout', function (e) {
    var t = e.target.closest ? e.target.closest('.info-wrap') : null;
    if (t && !t.contains(e.relatedTarget)) scheduleTipHide();
  });
  document.addEventListener('focusin', function (e) {
    var t = e.target.closest ? e.target.closest('.info-wrap') : null;
    if (t) showTip(t);
  });
  document.addEventListener('focusout', function (e) {
    var t = e.target.closest ? e.target.closest('.info-wrap') : null;
    if (t) scheduleTipHide();
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('.info-wrap') : null;
    if (t) { e.preventDefault(); e.stopPropagation(); toggleTip(t); return; }
    var el = document.getElementById('revTooltip');
    if (el && !el.hidden && !el.contains(e.target)) hideTip();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideTip(); });
  window.addEventListener('scroll', function () { hideTip(); }, true);
  window.addEventListener('resize', hideTip);

  function render() {
    if (!window.SOLO_TARIFFS) return;
    hideTip();
    renderCards(); renderCompare(); renderAddons(); renderCalc(); renderPay();
  }

  window.renderTariffs = render;
  window.tariffCard = function (id) {
    if (id === 'custom') { selectTariff('custom'); discussTariff(); }
    else selectTariff(id);
  };
  window.resetAddons = function () { state.addons = {}; render(); };
  window.selectTariff = function (id) {
    state.tariff = id;
    if (id === 'start' || id === 'business' || id === 'pro') state.compareTab = id;
    var t = byId(id);
    if (t && t.includes) {
      for (var k in state.addons) if (state.addons.hasOwnProperty(k) && t.includes.indexOf(k) !== -1) delete state.addons[k];
    }
    render();
  };
  window.toggleAddon = function (id) {
    if (isIncluded(id)) return;
    state.addons[id] = !state.addons[id];
    render();
  };
  window.selectCompareTab = function (id) {
    state.compareTab = id;
    renderCompare();
  };
  window.discussTariff = function () {
    var d = data(), t = byId(state.tariff);
    if (!t) { var el = document.getElementById('tariffs'); if (el) el.scrollIntoView({ behavior: 'smooth' }); return; }
    var addons = selectedAddons(), lines = [];
    lines.push((lang() === 'ru' ? 'Тариф' : 'Paket') + ': ' + t.name + ' — ' + (t.price == null ? t.priceLabel : (d.ui.from + ' ' + money(t.price))));
    if (addons.length) {
      var parts = [];
      for (var i = 0; i < addons.length; i++) parts.push(addons[i].title + ' — ' + (addons[i].individual ? d.ui.individual : d.ui.from + ' ' + money(addons[i].price)));
      lines.push((lang() === 'ru' ? 'Дополнительно' : 'Dodatno') + ': ' + parts.join('; '));
    }
    if (t.price != null) {
      var total = t.price;
      for (var j = 0; j < addons.length; j++) if (!addons[j].individual) total += addons[j].price;
      lines.push(d.ui.calcTotal + ': ' + money(total));
    } else {
      lines.push((lang() === 'ru' ? 'Стоимость' : 'Cena') + ': ' + d.ui.calcCustom);
    }
    lines.push(d.ui.calcNote);
    SOLO.openContact();
    var n = document.getElementById('c-notes');
    if (n) n.value = lines.join('\n');
  };

  document.addEventListener('DOMContentLoaded', render);
})();
