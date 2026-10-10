/* Original procedural background lightning. No external assets or dependencies. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  canvas.className = 'storm-background';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width, height, timer, frame;
  const random = (a, b) => a + Math.random() * (b - a);
  function resize() {
    width = innerWidth; height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio; canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function path(x, y, endX, endY, spread) {
    const points = [[x, y], [endX, endY]];
    for (let level = 0; level < 6; level++) {
      for (let i = points.length - 1; i > 0; i--) {
        const a = points[i - 1], b = points[i];
        points.splice(i, 0, [(a[0] + b[0]) / 2 + random(-spread, spread), (a[1] + b[1]) / 2 + random(-spread * .2, spread * .2)]);
      }
      spread *= .5;
    }
    return points;
  }
  function stroke(points, thickness, color, blur) {
    ctx.beginPath();
    points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.lineWidth = thickness; ctx.strokeStyle = color;
    ctx.shadowColor = '#a46dff'; ctx.shadowBlur = blur;
    ctx.stroke();
  }
  function schedule(delay = random(12000, 22000)) {
    clearTimeout(timer);
    if (!reduced.matches && !document.hidden) timer = setTimeout(strike, delay);
  }
  function strike() {
    const x = width * (Math.random() < .5 ? random(.04, .23) : random(.77, .96));
    const bolt = path(x, -15, x + random(-width * .14, width * .14), height * random(.65, 1), width * .09);
    const branches = [];
    for (let n = 0; n < 5; n++) {
      const p = bolt[Math.floor(random(12, 49))];
      branches.push(path(p[0], p[1], p[0] + random(-width * .2, width * .2), p[1] + random(60, height * .3), width * .035));
    }
    const start = performance.now();
    function paint(now) {
      const t = now - start;
      ctx.clearRect(0, 0, width, height);
      if (t > 1100 || reduced.matches || document.hidden) { schedule(); return; }
      // One soft discharge, followed by a long afterglow; no strobing.
      const alpha = Math.min(t / 65, 1) * Math.exp(-t / 270) * .62;
      ctx.globalAlpha = alpha;
      const glow = ctx.createRadialGradient(x, height * .3, 0, x, height * .3, height * .7);
      glow.addColorStop(0, '#7940c82b'); glow.addColorStop(1, '#7940c800');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      branches.forEach(b => stroke(b, .65, '#b798e8', 5));
      stroke(bolt, 5, '#8250c855', 20);
      stroke(bolt, 1.35, '#d8c4ff', 9);
      stroke(bolt, .55, '#f4ebff', 2);
      ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      frame = requestAnimationFrame(paint);
    }
    frame = requestAnimationFrame(paint);
  }
  function reset() {
    clearTimeout(timer); cancelAnimationFrame(frame);
    ctx.clearRect(0, 0, width, height); schedule(4500);
  }
  resize(); schedule(3000);
  addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', reset);
  reduced.addEventListener('change', reset);
})();
