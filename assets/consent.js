/* Solo.Pov — soglasje za piškotke + Google Analytics + Meta Pixel (naloži se šele po privolitvi) */
(function () {
  var KEY = 'solo_consent_v1';
  var cfg = window.SOLO_CONFIG || {};
  var gaId = (cfg.analytics && cfg.analytics.ga4) || '';
  var pixelId = (cfg.analytics && cfg.analytics.metaPixel) || '';
  var lang = (document.documentElement.lang || 'sl').slice(0, 2);

  function loadGA() {
    if (!gaId || window.__soloGaLoaded) return;
    window.__soloGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId, { anonymize_ip: true });
  }

  /* Meta Pixel: brez zahteve do Facebooka pred soglasjem. */
  function loadMeta() {
    if (!pixelId || window.__soloFbLoaded) return;
    window.__soloFbLoaded = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', pixelId, {}, { autoConfig: false });
    window.fbq('track', 'PageView');
  }

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function banner() {
    if (stored()) return;
    var T = {
      sl: { text: 'Uporabljamo nujne piškotke za delovanje strani. Analitične in oglaševalske piškotke (Google Analytics, Meta) naložimo le z vašim soglasjem.', yes: 'Sprejmi', no: 'Zavrni', more: 'Politika zasebnosti' },
      ru: { text: 'Мы используем обязательные cookie для работы сайта. Аналитические и рекламные cookie (Google Analytics, Meta) подключаем только с вашего согласия.', yes: 'Принять', no: 'Отклонить', more: 'Политика конфиденциальности' }
    };
    var t = T[lang] || T.sl;
    var d = document.createElement('div');
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Cookies');
    d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:720px;margin:0 auto;padding:16px 18px;border-radius:14px;background:#141018;color:#f3eefc;border:1px solid rgba(255,255,255,.14);box-shadow:0 10px 40px rgba(0,0,0,.45);font:14px/1.5 system-ui,sans-serif;display:flex;gap:12px;flex-wrap:wrap;align-items:center';
    d.innerHTML = '<div style="flex:1 1 320px">' + t.text + ' <a href="/pages/zasebnost.html" style="color:#c9b6ff">' + t.more + '</a></div>' +
      '<div style="display:flex;gap:10px;flex:1 1 240px">' +
      '<button type="button" data-c="1" style="flex:1 1 0;min-width:0;padding:11px 16px;border-radius:10px;border:1px solid transparent;background:#7c5cff;color:#fff;font:inherit;cursor:pointer">' + t.yes + '</button>' +
      '<button type="button" data-c="0" style="flex:1 1 0;min-width:0;padding:11px 16px;border-radius:10px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#f3eefc;font:inherit;cursor:pointer">' + t.no + '</button>' +
      '</div>';
    d.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-c]');
      if (!b) return;
      var ok = b.getAttribute('data-c') === '1';
      store(ok ? 'granted' : 'denied');
      if (ok) { loadGA(); loadMeta(); }
      d.remove();
    });
    document.body.appendChild(d);
  }

  var FB_EVENTS = { generate_lead: 'Lead', quiz_start: 'QuizStart', click_telegram: 'Contact', click_email: 'Contact', click_phone: 'Contact' };

  window.soloTrack = function (name, params) {
    try {
      if (window.__soloGaLoaded && typeof window.gtag === 'function') {
        window.gtag('event', name, params || {});
      }
    } catch (e) {}
    try {
      if (window.__soloFbLoaded && typeof window.fbq === 'function' && FB_EVENTS[name]) {
        var p = {};
        if (params && params.form) p.content_name = params.form;
        if (params && params.branch) p.content_category = params.branch;
        window.fbq('track', FB_EVENTS[name], p);
      }
    } catch (e) {}
  };

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/^https?:\/\/(t\.me|telegram\.me)\//i.test(href)) { if (window.soloTrack) window.soloTrack('click_telegram', { form: 'telegram' }); }
    else if (/^mailto:/i.test(href)) { if (window.soloTrack) window.soloTrack('click_email', { form: 'email' }); }
    else if (/^tel:/i.test(href)) { if (window.soloTrack) window.soloTrack('click_phone', { form: 'phone' }); }
  }, true);

  if (stored() === 'granted') { loadGA(); loadMeta(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner);
  else banner();
})();
