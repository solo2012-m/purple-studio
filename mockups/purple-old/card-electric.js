/* Four repeatable natural spark shapes, selected independently on each entry.
   Separate from lightning.js; SVG sized in CSS pixels avoids stretched small sparks. */
(() => {
  const elements = document.querySelectorAll('.service, .faq details, .button, .language, .tags span');
  const compact = el => el.matches('.button, .language, .tags span');
  function artwork(width, height, variant, small) {
    let seed = [173, 947, 2027, 3911][variant];
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const pad = 15, left = 12, top = 12, right = width + 18, bottom = height + 18;
    const lengthX = Math.min(width * .28, small ? 42 : 105);
    const lengthY = Math.min(height * .24, small ? 18 : 65);
    const paths = [];
    const corners = [[0, 2], [1, 3], [0, 3], [1, 2]][variant];
    for (const corner of corners) {
      const x = corner === 0 || corner === 3 ? left : right;
      const y = corner < 2 ? top : bottom;
      const sx = x === left ? 1 : -1, sy = y === top ? 1 : -1;
      const armX = lengthX * (.7 + random() * .3);
      const armY = lengthY * (.65 + random() * .35);
      const points = [];
      for (let i = 0; i <= 8; i++) {
        const t = i / 8;
        points.push([x + (random() - .5) * 4, y + sy * armY * (1 - t)]);
      }
      for (let i = 1; i <= 12; i++) {
        const t = i / 12;
        points.push([x + sx * armX * t, y + (random() - .5) * 5]);
      }
      paths.push('M' + points.map(p => p.map(n => n.toFixed(1)).join(',')).join(' '));
      const b = points[12 + Math.floor(random() * 5)];
      paths.push(`M${b[0]},${b[1]} l${sx * 5},${-sy * 4} ${sx * 6},${-sy * 1} ${sx * 3},${-sy * 4}`);
    }
    const d = paths.join(' ');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width+pad*2}" height="${height+pad*2}" viewBox="0 0 ${width+pad*2} ${height+pad*2}"><defs><filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.5"/></filter></defs><g fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="${d}" stroke="#a270e8" stroke-width="3" opacity=".5" filter="url(#g)"/><path d="${d}" stroke="#b994ee" stroke-width="1.1"/><path d="${d}" stroke="#f3eaff" stroke-width=".45"/></g></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }
  elements.forEach(el => {
    let previous = -1;
    function draw(next) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--card-spark', artwork(Math.round(rect.width), Math.round(rect.height), next, compact(el)));
      el.dataset.sparkVariant = String(next + 1);
    }
    function choose() {
      const next = previous < 0 ? Math.floor(Math.random() * 4) : (previous + 1 + Math.floor(Math.random() * 3)) % 4;
      previous = next; draw(next);
    }
    choose();
    el.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') choose(); });
    el.addEventListener('focusin', choose);
    new ResizeObserver(() => draw(previous)).observe(el);
  });
})();
