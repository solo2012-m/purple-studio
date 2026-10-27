/* Hero plasma globe: glass sphere with tapered plasma filaments that follow the pointer. */
(() => {
  const host = document.querySelector('.hero-art');
  if (!host) return;
  const legacy = host.querySelector('svg.bolt');
  const canvas = document.createElement('canvas');
  canvas.className = 'plasma-hero';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  host.insertBefore(canvas, host.firstChild);
  if (legacy) legacy.style.display = 'none';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const TAU = Math.PI * 2;
  const S = { w: 0, h: 0, raf: 0, pointer: null, inside: false, flash: 0, t0: performance.now() };
  const FIL = 7;
  const norm = a => ((a % TAU) + TAU) % TAU;
  const delta = (a, b) => { let d = norm(a - b); if (d > Math.PI) d -= TAU; return d; };

  function resize() {
    const r = host.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    S.w = Math.max(1, Math.round(r.width));
    S.h = Math.max(1, Math.round(r.height));
    canvas.width = S.w * dpr; canvas.height = S.h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const geom = () => ({ cx: S.w / 2, cy: S.h / 2, R: Math.min(S.w, S.h) * 0.40 });

  function path(g, angle, t, seed, bend) {
    const pts = [];
    for (let i = 0; i <= 26; i++) {
      const f = i / 26;
      const r = g.R * (0.06 + 0.93 * f);
      const wob = Math.sin(t * 1.6 + seed + f * 4.4) * 0.30 * f
                + Math.sin(t * 2.7 + seed * 1.7 + f * 9.5) * 0.10 * f
                + bend * Math.pow(f, 1.6);
      const a = angle + wob;
      pts.push([g.cx + Math.cos(a) * r, g.cy + Math.sin(a) * r]);
    }
    return pts;
  }
  function stroke(pts, width, color, blur, alpha, taper) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.shadowColor = color; ctx.shadowBlur = blur;
    for (let i = 1; i < pts.length; i++) {
      const f = i / pts.length;
      ctx.beginPath();
      ctx.moveTo(pts[i - 1][0], pts[i - 1][1]);
      ctx.quadraticCurveTo(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1]);
      ctx.lineWidth = Math.max(0.3, width * (taper ? (1 - Math.pow(f, 0.8) * 0.72) : 1));
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha * (1 - 0.15 * f);
      ctx.stroke();
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  }

  function frame(now) {
    const g = geom();
    const t = reduced.matches ? 0 : (now - S.t0) / 1000;
    if (S.flash > 0) S.flash = Math.max(0, S.flash - 0.025);
    ctx.clearRect(0, 0, S.w, S.h);

    const halo = ctx.createRadialGradient(g.cx, g.cy, g.R * 0.3, g.cx, g.cy, g.R * 1.85);
    halo.addColorStop(0, 'rgba(132,54,232,.30)');
    halo.addColorStop(0.45, 'rgba(104,40,198,.11)');
    halo.addColorStop(1, 'rgba(70,22,150,0)');
    ctx.fillStyle = halo; ctx.fillRect(0, 0, S.w, S.h);

    const body = ctx.createRadialGradient(g.cx - g.R * .34, g.cy - g.R * .4, g.R * .05, g.cx, g.cy, g.R);
    body.addColorStop(0, 'rgba(58,34,92,.92)');
    body.addColorStop(0.55, 'rgba(22,12,40,.95)');
    body.addColorStop(0.92, 'rgba(10,6,20,.98)');
    body.addColorStop(1, 'rgba(6,4,12,.99)');
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.fillStyle = body; ctx.fill();

    let target = null;
    if (S.inside && S.pointer) {
      const r = host.getBoundingClientRect();
      const x = S.pointer.x - r.left, y = S.pointer.y - r.top;
      if (Math.hypot(x - g.cx, y - g.cy) < g.R * 1.2) target = Math.atan2(y - g.cy, x - g.cx);
    }

    ctx.save();
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R * 0.985, 0, TAU); ctx.clip();
    ctx.globalCompositeOperation = 'lighter';

    // back filaments (dimmer, deeper)
    for (let i = 0; i < FIL; i++) {
      const base = (i / FIL) * TAU + Math.sin(t * 0.42 + i * 1.3) * 0.34;
      let angle = base, heat = 0;
      if (target !== null) {
        const d = delta(target, base);
        const pull = Math.max(0, 1 - Math.abs(d) / 1.2);
        angle = base + d * pull * 0.82; heat = pull;
      }
      const back = i % 2 === 0;
      const pts = path(g, angle, t, i * 2.1, 0);
      const a = (back ? 0.34 : 0.62) + heat * 0.35;
      stroke(pts, back ? 4.5 : 6.5, 'rgba(146,84,255,' + (a * 0.5) + ')', back ? 12 : 24, 0.9, true);
      stroke(pts, back ? 1.6 : 2.4, 'rgba(206,170,255,' + a + ')', 10, 0.9, true);
      stroke(pts, back ? 0.6 : 0.95, 'rgba(255,252,255,' + (a * 0.95) + ')', 4, 0.95, true);
      // one branch per filament
      if (!back) {
        const k = Math.floor(pts.length * 0.55);
        const p = pts[k];
        const dir = Math.atan2(p[1] - g.cy, p[0] - g.cx) + (i % 2 ? 0.5 : -0.5);
        const br = [];
        for (let j = 0; j <= 8; j++) {
          const f = j / 8;
          const rr = g.R * (0.45 + 0.5 * f);
          br.push([g.cx + Math.cos(dir) * rr + Math.sin(t * 3 + j) * 3 * f,
                   g.cy + Math.sin(dir) * rr + Math.cos(t * 2.6 + j) * 3 * f]);
        }
        stroke(br, 2.0, 'rgba(168,108,255,' + (a * 0.7) + ')', 10, 0.8, true);
        stroke(br, 0.7, 'rgba(240,226,255,' + (a * 0.8) + ')', 4, 0.85, true);
      }
    }
    const core = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.R * 0.19);
    core.addColorStop(0, 'rgba(255,255,255,.92)');
    core.addColorStop(0.32, 'rgba(208,166,255,.5)');
    core.addColorStop(1, 'rgba(140,70,255,0)');
    ctx.fillStyle = core; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R * 0.19, 0, TAU); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();

    // glass: inner shading, specular, rim
    ctx.save();
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.clip();
    const spec = ctx.createRadialGradient(g.cx - g.R * .44, g.cy - g.R * .5, 0, g.cx - g.R * .44, g.cy - g.R * .5, g.R * 1.15);
    spec.addColorStop(0, 'rgba(255,255,255,.20)');
    spec.addColorStop(0.45, 'rgba(255,255,255,.05)');
    spec.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = spec; ctx.fillRect(g.cx - g.R, g.cy - g.R, g.R * 2, g.R * 2);
    const under = ctx.createRadialGradient(g.cx + g.R * .3, g.cy + g.R * .5, 0, g.cx + g.R * .3, g.cy + g.R * .5, g.R * 1.1);
    under.addColorStop(0, 'rgba(0,0,0,.35)');
    under.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = under; ctx.fillRect(g.cx - g.R, g.cy - g.R, g.R * 2, g.R * 2);
    ctx.restore();
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R - 0.7, 0, TAU);
    ctx.strokeStyle = 'rgba(222,204,255,.34)'; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R * 0.995, 0, TAU);
    ctx.strokeStyle = 'rgba(150,90,230,.18)'; ctx.lineWidth = 5; ctx.stroke();

    if (target !== null) {
      const ex = g.cx + Math.cos(target) * g.R, ey = g.cy + Math.sin(target) * g.R;
      ctx.globalCompositeOperation = 'lighter';
      const contact = ctx.createRadialGradient(ex, ey, 0, ex, ey, g.R * (0.42 + S.flash * 0.5));
      contact.addColorStop(0, 'rgba(255,255,255,' + (0.75 + S.flash * 0.25) + ')');
      contact.addColorStop(0.4, 'rgba(198,148,255,.32)');
      contact.addColorStop(1, 'rgba(140,70,255,0)');
      ctx.fillStyle = contact; ctx.beginPath(); ctx.arc(ex, ey, g.R * (0.42 + S.flash * 0.5), 0, TAU); ctx.fill();
      const arcPts = [];
      for (let i = 0; i <= 12; i++) {
        const f = i / 12;
        arcPts.push([g.cx + (ex - g.cx) * f + Math.sin(f * 9 + t * 6) * 5 * (1 - f),
                     g.cy + (ey - g.cy) * f + Math.cos(f * 7 + t * 5) * 5 * (1 - f)]);
      }
      stroke(arcPts, 3.2, 'rgba(196,140,255,.8)', 22, 0.9, true);
      stroke(arcPts, 1.2, 'rgba(255,253,255,.95)', 8, 0.95, true);
      ctx.globalCompositeOperation = 'source-over';
    }
    S.raf = requestAnimationFrame(frame);
  }

  function restart() { cancelAnimationFrame(S.raf); resize(); S.t0 = performance.now(); frame(performance.now()); }
  host.addEventListener('pointermove', e => { S.pointer = { x: e.clientX, y: e.clientY }; S.inside = true; });
  host.addEventListener('pointerleave', () => { S.inside = false; S.pointer = null; });
  host.addEventListener('pointerdown', e => { S.pointer = { x: e.clientX, y: e.clientY }; S.inside = true; S.flash = 1; });
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(S.raf); else restart(); });
  reduced.addEventListener('change', restart);
  new ResizeObserver(restart).observe(host);
  restart();
})();
