/* SOLO.POV — enotna oddaja povpraševanj.
   JSON pošljemo kot text/plain (brez CORS preflighta), nato preverimo odgovor strežnika.
   Uspeh je samo pri HTTP 2xx in JSON {"ok":true}. Brez lažnega potrdila. */
(function () {
  'use strict';

  window.soloSubmitLead = function (endpoint, payload, timeoutMs) {
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
