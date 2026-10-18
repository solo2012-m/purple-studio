/* Solo.Pov — shared cursor light (firefly) */
(function () {
  'use strict';
  function init() {
    var f = document.getElementById('firefly');
    if (!f || f.getAttribute('data-cursor-ready') === '1') return;
    f.setAttribute('data-cursor-ready', '1');
    var coarse = false, reduced = false;
    try { coarse = window.matchMedia('(pointer: coarse)').matches; } catch (e) {}
    try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    if (coarse || reduced) { f.style.display = 'none'; return; }
    var x = -600, y = -600, tx = x, ty = y, active = false, raf = null;
    function move(e) {
      tx = e.clientX; ty = e.clientY;
      if (!active) {
        active = true;
        x = tx; y = ty;
        f.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
        f.classList.add('on');
      }
      var t = e.target;
      if (t && t.closest && t.closest('a,button,.pick,.opt,summary,.tariff-card,.solution-card,.info-wrap')) f.classList.add('hot');
      else f.classList.remove('hot');
      if (!raf) raf = requestAnimationFrame(loop);
    }
    function loop() {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      f.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) translate(-50%,-50%)';
      if (Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5) { raf = null; return; }
      raf = requestAnimationFrame(loop);
    }
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', function () { f.classList.remove('on'); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
