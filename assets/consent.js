/* Solo.Pov — soglasje za piškotke + Google Analytics (naloži se šele po privolitvi) */
(function () {
  var KEY = 'solo_consent_v1';
  var cfg = window.SOLO_CONFIG || {};
  var gaId = (cfg.analytics && cfg.analytics.ga4) || '';
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

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function banner() {
    if (stored()) return;
    var T = {
      sl: { text: 'Uporabljamo nujne piškotke za delovanje strani. Analitične piškotke naložimo le z vašim soglasjem.', yes: 'Sprejmi', no: 'Zavrni', more: 'Politika zasebnosti' },
      ru: { text: 'Мы используем обязательные cookie для работы сайта. Аналитические cookie подключаем только с вашего согласия.', yes: 'Принять', no: 'Отклонить', more: 'Политика конфиденциальности' }
    };
    var t = T[lang] || T.sl;
    var d = document.createElement('div');
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Cookies');
    d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:720px;margin:0 auto;padding:16px 18px;border-radius:14px;background:#141018;color:#f3eefc;border:1px solid rgba(255,255,255,.14);box-shadow:0 10px 40px rgba(0,0,0,.45);font:14px/1.5 system-ui,sans-serif;display:flex;gap:12px;flex-wrap:wrap;align-items:center';
    d.innerHTML = '<div style="flex:1 1 320px">' + t.text + ' <a href="/pages/zasebnost.html" style="color:#c9b6ff">' + t.more + '</a></div>' +
      '<button type="button" data-c="1" style="padding:9px 16px;border-radius:10px;border:0;background:#7c5cff;color:#fff;font:inherit;cursor:pointer">' + t.yes + '</button>' +
      '<button type="button" data-c="0" style="padding:9px 16px;border-radius:10px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#f3eefc;font:inherit;cursor:pointer">' + t.no + '</button>';
    d.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-c]');
      if (!b) return;
      var ok = b.getAttribute('data-c') === '1';
      store(ok ? 'granted' : 'denied');
      if (ok) loadGA();
      d.remove();
    });
    document.body.appendChild(d);
  }

  if (stored() === 'granted') loadGA();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner);
  else banner();
})();