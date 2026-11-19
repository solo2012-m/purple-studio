/* SOLO.POV — enotna oddaja povpraševanj.
   JSON pošljemo kot text/plain (brez CORS preflighta), nato preverimo odgovor strežnika.
   Uspeh je samo pri HTTP 2xx in JSON {"ok":true}. Brez lažnega potrdila. */
(function () {
  'use strict';

  /* UTM oznake iz prve strani obiska hranimo v sessionStorage,
     da jih ne izgubimo ob prehodu na drugo stran (npr. z domače na analizo). */
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
  function readUtm() {
    var out = {}, found = false;
    UTM_KEYS.forEach(function (k) {
      var m = new RegExp('[?&]' + k + '=([^&]+)').exec(window.location.search);
      if (m) { out[k] = decodeURIComponent(m[1].replace(/\+/g, ' ')); found = true; }
    });
    return found ? out : null;
  }
  (function () {
    var cur = readUtm();
    try {
      if (cur) sessionStorage.setItem('solo-utm', JSON.stringify(cur));
      if (!sessionStorage.getItem('solo-ref') && document.referrer && document.referrer.indexOf(location.host) === -1) {
        sessionStorage.setItem('solo-ref', document.referrer.slice(0, 200));
      }
    } catch (e) {}
  })();
  window.soloUtm = function () {
    var cur = readUtm();
    if (cur) return cur;
    try { var s = sessionStorage.getItem('solo-utm'); if (s) return JSON.parse(s) || {}; } catch (e) {}
    return {};
  };
  window.soloReferrer = function () {
    try { return sessionStorage.getItem('solo-ref') || ''; } catch (e) { return ''; }
  };

  window.soloSubmitLead = function (endpoint, payload, timeoutMs) {
    payload = payload || {};
    if (!payload.utm || !Object.keys(payload.utm).length) payload.utm = window.soloUtm();
    if (!payload.referrer) payload.referrer = window.soloReferrer();
    if (!endpoint) return Promise.reject(new Error('missing-endpoint'));
    var ms = timeoutMs || 20000;
    var ctrl = null, timer = null;
    if (typeof AbortController !== 'undefined') {
      ctrl = new AbortController();
      timer = setTimeout(function () { ctrl.abort(); }, ms);
    }
    var opts = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload || {})
    };
    if (ctrl) opts.signal = ctrl.signal;
    function stop() { if (timer) { clearTimeout(timer); timer = null; } }
    return fetch(endpoint, opts).then(function (r) {
      return r.text().then(function (body) {
        if (!r.ok) throw new Error('http-' + r.status);
        var data = null;
        try { data = JSON.parse(body); } catch (e) { data = null; }
        if (!data || data.ok !== true) throw new Error('not-confirmed');
        return data;
      });
    }).then(function (v) { stop(); return v; }, function (e) { stop(); throw e; });
  };
})();
