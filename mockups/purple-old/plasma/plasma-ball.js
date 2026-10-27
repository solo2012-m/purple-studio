/* Plasma globe: procedural canvas sphere with curved filaments that follow the pointer. */
(() => {
  const canvas = document.getElementById('plasma');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const S = { w: 0, h: 0, dpr: 1, pointer: null, inside: false, raf: 0, flash: 0 };
  const FIL = 8;
  const TAU = Math.PI * 2;
  const norm = a => ((a % TAU) + TAU) % TAU;
  const delta = (a, b) => { let d = norm(a - b); if (d > Math.PI) d -= TAU; return d; };

  function resize() {
    const r = canvas.getBoundingClientRect();
    S.dpr = Math.min(devicePixelRatio || 1, 2);
    S.w = Math.max(1, Math.round(r.width)); S.h = Math.max(1, Math.round(r.height));
    canvas.width = S.w * S.dpr; canvas.height = S.h * S.dpr;
    ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
  }
  const geom = () => ({ cx: S.w / 2, cy: S.h / 2, R: Math.min(S.w, S.h) * 0.42 });

  function points(g, angle, t, seed) {
    const out = [];
    for (let i = 0; i <= 22; i++) {
      const f = i / 22;
      const r = g.R * (0.07 + 0.92 * f);
      const wob = Math.sin(t * 1.7 + seed + f * 4.2) * 0.34 * f
                + Math.sin(t * 2.9 + seed * 1.6 + f * 9) * 0.11 * f;
      const a = angle + wob;
      out.push([g.cx + Math.cos(a) * r, g.cy + Math.sin(a) * r]);
    }
    return out;
  }
  function smooth(pts) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length - 1; i++) {
      const xc = (pts[i][0] + pts[i + 1][0]) / 2, yc = (pts[i][1] + pts[i + 1][1]) / 2;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], xc, yc);
    }
    ctx.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]);
  }
  function filament(g, angle, t, seed, heat) {
    const pts = points(g, angle, t, seed);
    const h = Math.min(1, heat + S.flash);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(176,104,255,.9)';
    smooth(pts);
    ctx.strokeStyle = 'rgba(146,84,255,' + (0.16 + h * 0.42) + ')';
    ctx.lineWidth = 7 + h * 4; ctx.shadowBlur = 26; ctx.stroke();
    smooth(pts);
    ctx.strokeStyle = 'rgba(198,158,255,' + (0.42 + h * 0.5) + ')';
    ctx.lineWidth = 2.4 + h * 1.4; ctx.shadowBlur = 12; ctx.stroke();
    smooth(pts);
    ctx.strokeStyle = 'rgba(255,250,255,' + (0.34 + h * 0.6) + ')';
    ctx.lineWidth = 0.85; ctx.shadowBlur = 3; ctx.stroke();
  }

  function frame(now) {
    const g = geom(), t = reduced.matches ? 0 : now / 1000;
    if (S.flash > 0) S.flash = Math.max(0, S.flash - 0.03);
    ctx.clearRect(0, 0, S.w, S.h);

    const glow = ctx.createRadialGradient(g.cx, g.cy, g.R * 0.25, g.cx, g.cy, g.R * 2);
    glow.addColorStop(0, 'rgba(138,58,238,.28)');
    glow.addColorStop(0.45, 'rgba(112,44,210,.10)');
    glow.addColorStop(1, 'rgba(80,26,170,0)');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, S.w, S.h);

    const body = ctx.createRadialGradient(g.cx - g.R * .32, g.cy - g.R * .38, g.R * .06, g.cx, g.cy, g.R);
    body.addColorStop(0, 'rgba(52,30,84,.9)');
    body.addColorStop(0.55, 'rgba(20,11,36,.94)');
    body.addColorStop(1, 'rgba(7,4,14,.98)');
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.fillStyle = body; ctx.fill();

    let targetAngle = null;
    if (S.inside && S.pointer) {
      const r = canvas.getBoundingClientRect();
      const x = S.pointer.x - r.left, y = S.pointer.y - r.top;
      if (Math.hypot(x - g.cx, y - g.cy) < g.R * 1.15) targetAngle = Math.atan2(y - g.cy, x - g.cx);
    }

    ctx.save();
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R * 0.99, 0, TAU); ctx.clip();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < FIL; i++) {
      const base = (i / FIL) * TAU + Math.sin(t * 0.4 + i) * 0.3;
      let angle = base, heat = 0;
      if (targetAngle !== null) {
        const d = delta(targetAngle, base);
        const pull = Math.max(0, 1 - Math.abs(d) / 1.15);
        angle = base + d * pull * 0.8; heat = pull * 0.9;
      }
      filament(g, angle, t, i * 1.9, heat);
    }
    const core = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.R * 0.2);
    core.addColorStop(0, 'rgba(255,255,255,.9)');
    core.addColorStop(0.3, 'rgba(206,164,255,.5)');
    core.addColorStop(1, 'rgba(140,70,255,0)');
    ctx.fillStyle = core; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R * 0.2, 0, TAU); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();

    // glass: soft inner highlight, then rim
    ctx.save();
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.clip();
    const hi = ctx.createRadialGradient(g.cx - g.R * .42, g.cy - g.R * .48, 0, g.cx - g.R * .42, g.cy - g.R * .48, g.R * 1.1);
    hi.addColorStop(0, 'rgba(255,255,255,.16)');
    hi.addColorStop(0.5, 'rgba(255,255,255,.04)');
    hi.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hi; ctx.fillRect(g.cx - g.R, g.cy - g.R, g.R * 2, g.R * 2);
    ctx.restore();
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU);
    ctx.strokeStyle = 'rgba(214,192,255,.30)'; ctx.lineWidth = 1.3; ctx.stroke();

    if (targetAngle !== null) {
      const ex = g.cx + Math.cos(targetAngle) * g.R, ey = g.cy + Math.sin(targetAngle) * g.R;
      ctx.globalCompositeOperation = 'lighter';
      const contact = ctx.createRadialGradient(ex, ey, 0, ex, ey, g.R * 0.5);
      contact.addColorStop(0, 'rgba(255,255,255,.8)');
      contact.addColorStop(0.42, 'rgba(198,146,255,.30)');
      contact.addColorStop(1, 'rgba(140,70,255,0)');
      ctx.fillStyle = contact; ctx.beginPath(); ctx.arc(ex, ey, g.R * 0.5, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.moveTo(g.cx, g.cy);
      ctx.quadraticCurveTo((g.cx + ex) / 2 + 6, (g.cy + ey) / 2 - 6, ex, ey);
      ctx.strokeStyle = 'rgba(255,252,255,.8)'; ctx.lineWidth = 2.2;
      ctx.shadowColor = 'rgba(212,160,255,.95)'; ctx.shadowBlur = 28; ctx.stroke();
      ctx.globalCompositeOperation = 'source-over'; ctx.shadowBlur = 0;
    }

    S.raf = requestAnimationFrame(frame);
  }

  function restart() { cancelAnimationFrame(S.raf); resize(); frame(performance.now()); }
  canvas.addEventListener('pointermove', e => { S.pointer = { x: e.clientX, y: e.clientY }; S.inside = true; });
  canvas.addEventListener('pointerleave', () => { S.inside = false; S.pointer = null; });
  canvas.addEventListener('pointerdown', e => { S.pointer = { x: e.clientX, y: e.clientY }; S.inside = true; S.flash = 1; });
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(S.raf); else restart(); });
  reduced.addEventListener('change', restart);
  new ResizeObserver(restart).observe(canvas);
  restart();
})();

