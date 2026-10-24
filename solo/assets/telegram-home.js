/* Solo.Pov — three Telegram demos on the home page, reusing SOLO_AI scenarios and .tgm-* styles */
(function () {
  'use strict';
  var state = { idx: 0 };

  var TICKS = '<svg class="tgm-ticks" width="15" height="10" viewBox="0 0 16 11" aria-hidden="true"><path d="M1 5.5l3 3L10 2" fill="none" stroke="#4FC3F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 8.5L13 2" fill="none" stroke="#4FC3F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function lang() { return (window.SOLO && SOLO.getLang) ? SOLO.getLang() : 'sl'; }
  function D() { var d = window.SOLO_AI || {}; return d[lang()] || d.sl; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function botLabel() { return lang() === 'ru' ? 'бот' : 'bot'; }
  function dayLabel() { return lang() === 'ru' ? 'Сегодня' : 'Danes'; }
  function inputLabel() { return lang() === 'ru' ? 'Сообщение' : 'Sporočilo'; }
  function msgTime(i) {
    var t = 10 * 60 + 24 + i * 2, hh = Math.floor(t / 60) % 24, mm = t % 60;
    return hh + ':' + (mm < 10 ? '0' : '') + mm;
  }

  function phoneHTML(item, idx) {
    var av = String(item.avatar || '').replace(/^\.\.\//, '');
    var h = '<div class="tgm-phone" data-phone="' + idx + '">';
    h += '<div class="tgm-screen"><div class="tgm-notch" aria-hidden="true"></div>';
    h += '<div class="tgm-status"><span>10:24</span><span class="tgm-sys" aria-hidden="true"><svg width="43" height="11" viewBox="0 0 43 11" fill="#111"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="6" rx="1"/><rect x="10" y="3" width="3" height="8" rx="1"/><rect x="15" y="1" width="3" height="10" rx="1"/><path d="M25.5 2.1a6.3 6.3 0 017.9 0l-1 1.2a4.8 4.8 0 00-5.9 0zM27.1 4.3a3.6 3.6 0 014.7 0l-1 1.2a2.1 2.1 0 00-2.7 0zM29.4 6.5c.4-.3.9-.3 1.3 0l-.65.8z"/><rect x="36" y="2" width="6.2" height="7" rx="1.8" fill="none" stroke="#111" stroke-width="1"/><rect x="37.2" y="3.2" width="3.6" height="4.6" rx="1"/><rect x="42.5" y="4" width="1" height="3" rx=".5"/></svg></span></div>';
    h += '<div class="tgm-head"><span class="tgm-back" aria-hidden="true">&#8249;</span><span class="tgm-avatar"><img src="' + esc(av) + '" alt="" width="72" height="72" loading="lazy"></span><span class="tgm-peer"><b>' + esc(item.bot) + '</b><small>' + esc(botLabel()) + '</small></span><span class="tgm-menu" aria-hidden="true"><i></i><i></i><i></i></span></div>';
    h += '<div class="tgm-chat"><span class="tgm-day">' + esc(dayLabel()) + '</span>';
    for (var i = 0; i < item.messages.length; i++) {
      var m = item.messages[i], out = m.who === 'client';
      h += '<div class="tgm-row ' + (out ? 'out' : 'in') + '"><div class="tgm-bubble"><p>' + esc(m.text).replace(/\n/g, '<br>') + '</p><span class="tgm-meta">' + msgTime(i) + (out ? TICKS : '') + '</span></div></div>';
    }
    h += '</div><div class="tgm-input"><span class="tgm-emoji" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b8f96" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.2 2.1 1.8 3.5 1.8s2.5-.6 3.5-1.8M9 9.5h.01M15 9.5h.01" stroke-linecap="round"/></svg></span><span class="tgm-field">' + esc(inputLabel()) + '</span><span class="tgm-attach" aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8b8f96" stroke-width="1.7" stroke-linecap="round"><path d="M20 11.5l-8.2 8.2a5 5 0 01-7.1-7.1l8.5-8.5a3.4 3.4 0 014.8 4.8l-8.4 8.4a1.8 1.8 0 01-2.6-2.6l7.7-7.7"/></svg></span><span class="tgm-mic" aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8b8f96" stroke-width="1.7" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0012 0M12 17v3"/></svg></span></div><div class="tgm-home" aria-hidden="true"></div></div></div>';
    return h;
  }

  function render() {
    var box = document.getElementById('telegramHome'); if (!box) return;
    var d = D(), items = d && d.ai && d.ai.scenarios ? d.ai.scenarios.items : null;
    if (!items || !items.length) { box.innerHTML = ''; return; }
    if (state.idx >= items.length) state.idx = 0;
    var h = '<div class="tgm-tabs" role="tablist">';
    for (var i = 0; i < items.length; i++) {
      h += '<button type="button" class="tgm-tab' + (i === state.idx ? ' on' : '') + '" role="tab" aria-selected="' + (i === state.idx ? 'true' : 'false') + '" data-idx="' + i + '" onclick="selectHomeScenario(' + i + ')"><span>' + esc(items[i].tab) + '</span><small>' + esc(items[i].project) + '</small></button>';
    }
    h += '</div><div class="tgm-grid">';
    for (var j = 0; j < items.length; j++) {
      h += '<div class="tgm-col' + (j === state.idx ? ' on' : '') + '" data-col="' + j + '"><div class="tgm-caption">' + esc(items[j].tab) + '</div>' + phoneHTML(items[j], j) + '</div>';
    }
    h += '</div>';
    box.innerHTML = h;
    select(state.idx);
  }

  function select(idx) {
    var items = (D().ai && D().ai.scenarios) ? D().ai.scenarios.items : [];
    idx = Number(idx) || 0;
    if (idx < 0 || idx >= items.length) idx = 0;
    state.idx = idx;
    var tabs = document.querySelectorAll('#telegramHome .tgm-tab');
    for (var i = 0; i < tabs.length; i++) {
      var on = Number(tabs[i].getAttribute('data-idx')) === idx;
      tabs[i].classList.toggle('on', on);
      tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
    }
    var cols = document.querySelectorAll('#telegramHome .tgm-col');
    for (var j = 0; j < cols.length; j++) cols[j].classList.toggle('on', Number(cols[j].getAttribute('data-col')) === idx);
  }

  window.selectHomeScenario = select;
  window.renderTelegramHome = render;
  document.addEventListener('DOMContentLoaded', render);
})();
