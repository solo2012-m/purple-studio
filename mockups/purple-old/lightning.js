/* Background lightning: tapered channel with branches, double flash and afterglow. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  canvas.className = 'storm-background';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let w, h, timer, frame;
  const rnd = (a, b) => a + Math.random() * (b - a);

  function resize() {
    w = innerWidth; h = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function jagged(x1, y1, x2, y2, spread, levels) {
    let pts = [[x1, y1], [x2, y2]], s = spread;
    for (let l = 0; l < levels; l++) {
      const next = [pts[0]];
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        next.push([(a[0] + b[0]) / 2 + rnd(-s, s), (a[1] + b[1]) / 2 + rnd(-s * 0.25, s * 0.25)]);
        next.push(b);
      }
      pts = next; s *= 0.55;
    }
    return pts;
  }
  function tapered(pts, maxWidth, color, blur, alpha) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.shadowColor = color; ctx.shadowBlur = blur;
    for (let i = 1; i < pts.length; i++) {
      const t = i / pts.length;
      ctx.beginPath();
      ctx.moveTo(pts[i - 1][0], pts[i - 1][1]);
      ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.lineWidth = Math.max(0.25, maxWidth * (1 - Math.pow(t, 0.75)));
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha * (1 - 0.35 * t);
      ctx.stroke();
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  }
  function schedule(delay = rnd(8000, 15000)) {
    clearTimeout(timer);
    if (!reduced.matches && !document.hidden) timer = setTimeout(strike, delay);
  }
  function strike() {
    const x = w * (Math.random() < 0.5 ? rnd(0.05, 0.24) : rnd(0.76, 0.95));
    const endX = x + rnd(-w * 0.12, w * 0.12), endY = h * rnd(0.62, 0.98);
    const main = jagged(x, -20, endX, endY, w * 0.055, 5);
    const branches = [];
    for (let n = 0; n < 5; n++) {
      const i = Math.floor(rnd(main.length * 0.35, main.length * 0.92));
      const p = main[i];
      const b = jagged(p[0], p[1], p[0] + rnd(-w * 0.16, w * 0.16), p[1] + rnd(h * 0.08, h * 0.28), w * 0.03, 3);
      branches.push(b);
      if (Math.random() < 0.6) {
        const q = b[Math.floor(rnd(b.length * 0.4, b.length * 0.9))];
        branches.push(jagged(q[0], q[1], q[0] + rnd(-w * 0.07, w * 0.07), q[1] + rnd(40, 140), w * 0.015, 2));
      }
    }
    const start = performance.now();
    function paint(now) {
      const t = now - start;
      ctx.clearRect(0, 0, w, h);
      if (t > 1250 || reduced.matches || document.hidden) { schedule(); return; }
      // two quick peaks, then a long afterglow
      const env = Math.min(1, 0.9 * Math.exp(-t / 300) + 0.6 * Math.exp(-Math.pow(t - 165, 2) / 4200)) * Math.min(1, t / 26);
      const haze = ctx.createRadialGradient(x, endY * 0.5, 0, x, endY * 0.5, h * 0.75);
      haze.addColorStop(0, 'rgba(126,62,208,' + (0.20 * env) + ')');
      haze.addColorStop(1, 'rgba(126,62,208,0)');
      ctx.fillStyle = haze; ctx.fillRect(0, 0, w, h);
      for (const b of branches) {
        tapered(b, 2.1, 'rgba(168,110,255,' + (0.55 * env) + ')', 10, 0.8);
        tapered(b, 0.7, 'rgba(244,232,255,' + (0.75 * env) + ')', 3, 0.85);
      }
      tapered(main, 7.5, 'rgba(140,72,240,' + (0.5 * env) + ')', 26, 0.7);
      tapered(main, 2.6, 'rgba(206,170,255,' + (0.85 * env) + ')', 12, 0.9);
      tapered(main, 0.9, 'rgba(255,253,255,' + (0.95 * env) + ')', 4, 0.95);
      frame = requestAnimationFrame(paint);
    }
    frame = requestAnimationFrame(paint);
  }
  function reset() {
    clearTimeout(timer); cancelAnimationFrame(frame);
    ctx.clearRect(0, 0, w, h); schedule(5000);
  }
  resize(); schedule(3000);
  addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', reset);
  reduced.addEventListener('change', reset);
})();
