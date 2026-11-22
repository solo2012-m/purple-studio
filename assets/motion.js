/* Solo.Pov — motion layer (22.11.2026)
   1) Lenis: smooth wheel scrolling on desktop (touch stays native)
   2) Hero headline: letters rise in, one-time glint on the accent line (home page)
   3) Telegram demo: messages appear one by one, bot "typing…" before replies (home page)
   Everything is skipped when the visitor prefers reduced motion. */
(function () {
  'use strict';
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var root = document.documentElement;

  /* ---------- 1. Lenis ---------- */
  var lenis = null;
  function headerOffset() {
    var h = document.querySelector('header');
    return (h ? h.offsetHeight : 72) + 20;
  }
  function isNestedScroller(node) {
    if (!node || node.nodeType !== 1) return false;
    var s = window.getComputedStyle(node);
    if (s.position === 'fixed') return true; // modals, cookie banner, overlays scroll natively
    var oy = s.overflowY;
    return (oy === 'auto' || oy === 'scroll') && node.scrollHeight > node.clientHeight + 1;
  }
  function initLenis() {
    if (reduce || !window.Lenis) return;
    try {
      lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, prevent: isNestedScroller });
    } catch (e) { lenis = null; return; }
    root.classList.add('mx-lenis');
    function raf(t) { if (!lenis) return; lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    // In-page links (#solutions, #process …): smooth glide with the sticky header taken into account
    document.addEventListener('click', function (e) {
      if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + (window.pageYOffset || root.scrollTop) - headerOffset();
      lenis.scrollTo(Math.max(0, Math.round(y)));
      if (history.pushState) history.pushState(null, '', '#' + id);
    });
    window.soloLenis = lenis;
  }

  /* ---------- 2. Hero headline ---------- */
  function splitLine(span, startIndex) {
    var text = span.textContent;
    var words = text.split(/(\s+)/);
    var html = '', i = startIndex, j = 0;
    for (var w = 0; w < words.length; w++) {
      var word = words[w];
      if (!word) continue;
      if (/^\s+$/.test(word)) { html += word; continue; }
      html += '<span class="mx-w">';
      for (var c = 0; c < word.length; c++) {
        var ch = word.charAt(c).replace(/&/g, '&amp;').replace(/</g, '&lt;');
        html += '<span class="mx-c" style="--i:' + i + ';--j:' + j + '">' + ch + '</span>';
        i++; j++;
      }
      html += '</span>';
    }
    span.innerHTML = html;
    return i;
  }
  function initHero() {
    var h1 = document.querySelector('.hero h1');
    if (!h1) { root.classList.remove('mx-intro'); return; }
    if (reduce) { root.classList.remove('mx-intro'); return; }
    var spans = h1.querySelectorAll('span[data-i18n]');
    if (!spans.length) { root.classList.remove('mx-intro'); return; }
    function label() {
      var parts = [], sp = h1.querySelectorAll('span[data-i18n]');
      for (var q = 0; q < sp.length; q++) parts.push(sp[q].textContent.trim());
      h1.setAttribute('aria-label', parts.join(' '));
    }
    label();
    var idx = 0;
    for (var s = 0; s < spans.length; s++) idx = splitLine(spans[s], idx + (s ? 3 : 0));
    h1.style.setProperty('--mx-total', idx);
    h1.classList.add('mx-split');
    // keep the accessible name in sync when the language is switched
    if ('MutationObserver' in window) {
      new MutationObserver(label).observe(h1, { childList: true, subtree: true, characterData: true });
    }
    requestAnimationFrame(function () {
      h1.classList.add('mx-play');
      root.classList.remove('mx-intro');
      // after the letters have landed, let the glint glow outside the word masks
      setTimeout(function () { h1.classList.add('mx-done'); }, idx * 22 + 950);
    });
  }

  /* ---------- 3. Telegram demo ---------- */
  var TYPING = '<div class="tgm-bubble mx-dots" aria-hidden="true"><i></i><i></i><i></i></div>';
  function playPhone(phone) {
    if (reduce || !phone) return;
    var chat = phone.querySelector('.tgm-chat');
    if (!chat) return;
    var rows = chat.querySelectorAll('.tgm-row:not(.mx-typing)');
    if (!rows.length) return;
    var token = (phone._mxToken || 0) + 1;
    phone._mxToken = token;
    var old = chat.querySelectorAll('.mx-typing');
    for (var o = 0; o < old.length; o++) old[o].parentNode.removeChild(old[o]);
    for (var r = 0; r < rows.length; r++) { rows[r].classList.add('mx-wait'); rows[r].classList.remove('mx-in'); }
    chat.scrollTop = 0;
    var i = 0;
    function alive() { return phone._mxToken === token && document.body.contains(phone); }
    function follow() {
      var over = chat.scrollHeight - chat.clientHeight;
      if (over > 0) chat.scrollTo({ top: over, behavior: 'smooth' });
    }
    function showRow(row) {
      row.classList.remove('mx-wait');
      row.classList.add('mx-in');
      follow();
    }
    function next() {
      if (!alive() || i >= rows.length) return;
      var row = rows[i++];
      if (row.classList.contains('in')) {
        var typing = document.createElement('div');
        typing.className = 'tgm-row in mx-typing';
        typing.innerHTML = TYPING;
        row.parentNode.insertBefore(typing, row);
        follow();
        setTimeout(function () {
          if (typing.parentNode) typing.parentNode.removeChild(typing);
          if (!alive()) return;
          showRow(row);
          setTimeout(next, 650);
        }, 1100);
      } else {
        showRow(row);
        setTimeout(next, 900);
      }
    }
    setTimeout(next, 350);
  }
  function initTelegram() {
    var box = document.getElementById('telegramHome');
    if (!box || reduce || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        var en = entries[k];
        if (!en.isIntersecting) continue;
        var phone = en.target;
        if (phone.offsetParent === null || phone._mxPlayed) continue;
        phone._mxPlayed = true;
        playPhone(phone);
      }
    }, { threshold: 0.45 });
    function arm() {
      var phones = box.querySelectorAll('.tgm-phone');
      for (var p = 0; p < phones.length; p++) io.observe(phones[p]);
    }
    arm();
    // re-render on language switch rebuilds the phones
    new MutationObserver(function (list) {
      for (var m = 0; m < list.length; m++) if (list[m].target === box) { io.disconnect(); arm(); return; }
    }).observe(box, { childList: true });
    // tab switch (mobile shows one phone at a time): replay the chosen conversation
    box.addEventListener('click', function (e) {
      var tab = e.target && e.target.closest ? e.target.closest('.tgm-tab') : null;
      if (!tab) return;
      var idx = tab.getAttribute('data-idx');
      setTimeout(function () {
        var phone = box.querySelector('.tgm-phone[data-phone="' + idx + '"]');
        if (phone && phone.offsetParent !== null) { phone._mxPlayed = true; playPhone(phone); }
      }, 30);
    });
  }

  function start() {
    initLenis();
    initHero();
    initTelegram();
  }
  // Run after app.js has applied the language (its DOMContentLoaded handler is registered first)
  var started = false;
  function once() { if (started) return; started = true; start(); }
  if (document.readyState === 'complete') once();
  else { document.addEventListener('DOMContentLoaded', once); window.addEventListener('load', once); }
})();
