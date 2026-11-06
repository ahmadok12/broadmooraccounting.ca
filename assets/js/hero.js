/* ==========================================================================
   Homepage hero animation — looping dot-matrix chart
   A faint grid of dots. Bars rise column by column into a skyline-shaped
   chart, a green trend line draws across the tops, a pulse runs along it,
   then the dots dissolve back into the grid and the loop starts again.
   The "Key dates" card advances once per loop step.
   Pauses off-screen / in background tabs; static frame for reduced motion.
   ========================================================================== */
(function () {
  'use strict';
  var hero = document.querySelector('.hx');
  if (!hero) return;
  var canvas = hero.querySelector('.hx-canvas');
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CYCLE = 12800;            // one full chart loop (ms)
  var STEP = CYCLE / 4;         // key-dates card advances 4× per loop
  var GREEN = [58, 173, 90];
  var BLUE = [126, 164, 232];

  var W = 0, H = 0, dpr = 1, pitch = 16, cols = [], gridCanvas = null, line = [];
  var pointer = { x: -9999, y: -9999 };
  var running = false, raf = 0, t0 = performance.now(), pausedAt = 0;

  // Deterministic pseudo-random so the skyline keeps its shape across resizes
  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function easeOut(x) { x = clamp(x, 0, 1); return 1 - Math.pow(1 - x, 3); }
  function easeInOut(x) { x = clamp(x, 0, 1); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  function layout() {
    var r = hero.getBoundingClientRect();
    W = r.width; H = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var mobile = W < 720;
    pitch = mobile ? 12 : 13;

    // static background grid, drawn once
    gridCanvas = document.createElement('canvas');
    gridCanvas.width = canvas.width; gridCanvas.height = canvas.height;
    var g = gridCanvas.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = 'rgba(255,255,255,0.07)';
    for (var y = pitch / 2; y < H; y += pitch)
      for (var x = pitch / 2; x < W; x += pitch) g.fillRect(x - 1, y - 1, 2, 2);

    // chart area: right side on desktop, lower band on phones
    var x0 = mobile ? 0 : W * 0.46;
    var x1 = W;
    var base = H - pitch * 2;
    var maxRows = Math.floor(H * 0.62 / pitch);
    var card = hero.querySelector('.hx-dates');
    if (W < 1020 && card) {
      // stacked layout: the chart grows in the open band above the key-dates card
      var hr = hero.getBoundingClientRect(), cr = card.getBoundingClientRect();
      base = cr.top - hr.top + pitch * 3;
      maxRows = Math.floor((mobile ? 168 : 200) / pitch);
    }
    var barW = 3, gap = 1;
    var startCol = Math.ceil(x0 / pitch), endCol = Math.floor(x1 / pitch);
    var n = Math.floor((endCol - startCol) / (barW + gap));
    var rand = rng(7);
    cols = [];
    for (var i = 0; i < n; i++) {
      var p = n > 1 ? i / (n - 1) : 0;
      // rising trend with a skyline rhythm: towers, low blocks, a few spires
      var trend = 0.22 + 0.62 * Math.pow(p, 1.15);
      var wobble = (rand() - 0.5) * 0.28;
      if (rand() > 0.82) wobble += 0.18;
      var h = clamp(trend + wobble, 0.12, 1);
      var rows = Math.max(3, Math.round(h * maxRows));
      var cx = (startCol + i * (barW + gap)) * pitch + pitch / 2;
      var windows = [];
      for (var k = 0; k < rows * barW; k++) if (rand() > 0.86) windows.push(k);
      cols.push({ x: cx, rows: rows, w: barW, delay: p, windows: windows, seed: rand() });
    }
    // trend line through a smoothed version of the bar tops
    line = cols.map(function (c, i) {
      var a = cols[Math.max(0, i - 1)], b = cols[Math.min(cols.length - 1, i + 1)];
      var rows = (a.rows + c.rows * 2 + b.rows) / 4;
      return { x: c.x + (c.w - 1) * pitch / 2, y: base - rows * pitch - pitch * 1.6 };
    });
    hero._base = base;
  }

  function dot(x, y, s, rgb, a) {
    ctx.fillStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a + ')';
    ctx.fillRect(x - s / 2, y - s / 2, s, s);
  }

  function frame(now) {
    var t = reduce ? CYCLE * 0.5 : (now - t0) % CYCLE;
    var u = t / CYCLE;              // 0..1 through the loop
    ctx.clearRect(0, 0, W, H);
    if (gridCanvas) ctx.drawImage(gridCanvas, 0, 0, W, H);
    var base = hero._base;

    // phases (fractions of the loop)
    var riseEnd = 0.34, lineStart = 0.24, lineEnd = 0.46, holdEnd = 0.74, fadeEnd = 0.9;
    var fade = u < holdEnd ? 0 : easeInOut((u - holdEnd) / (fadeEnd - holdEnd));

    for (var i = 0; i < cols.length; i++) {
      var c = cols[i];
      var start = c.delay * riseEnd * 0.7;
      var grow = easeOut((u - start) / (riseEnd * 0.4));
      var lit = Math.round(c.rows * grow);
      for (var col = 0; col < c.w; col++) {
        var x = c.x + col * pitch;
        for (var r = 0; r < lit; r++) {
          var y = base - r * pitch - pitch / 2;
          // dissolve: each dot leaves at its own moment
          var leave = (c.seed * 0.6 + ((r * 7 + col * 13) % 10) / 25);
          var alive = 1 - clamp((fade - leave * 0.6) / 0.25, 0, 1);
          if (alive <= 0) continue;
          var top = r >= lit - 1;
          var idx = r * c.w + col;
          var isWin = c.windows.indexOf(idx) !== -1;
          var a = (0.34 + 0.56 * (r / c.rows)) * alive;
          // pointer glow (desktop only)
          var dx = x - pointer.x, dy = y - pointer.y, d2 = dx * dx + dy * dy;
          var near = d2 < 14400 ? 1 - d2 / 14400 : 0;
          if (top) dot(x, y, 3.5, GREEN, Math.min(1, 0.9 * alive + near * 0.2));
          else if (isWin && u > riseEnd && u < holdEnd) {
            var tw = 0.5 + 0.5 * Math.sin(now / 420 + idx * 1.7 + c.seed * 9);
            dot(x, y, 2.5, [255, 214, 140], (0.25 + 0.6 * tw) * alive);
          } else dot(x, y, 3, BLUE, Math.min(1, a + near * 0.35));
        }
      }
    }

    // trend line
    if (line.length > 1 && u > lineStart) {
      var prog = easeInOut((u - lineStart) / (lineEnd - lineStart));
      var la = 1 - fade;
      var last = Math.floor(prog * (line.length - 1));
      var frac = prog * (line.length - 1) - last;
      ctx.save();
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(58,173,90,' + 0.95 * la + ')';
      ctx.shadowColor = 'rgba(58,173,90,' + 0.8 * la + ')';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(line[0].x, line[0].y);
      for (var j = 1; j <= last; j++) ctx.lineTo(line[j].x, line[j].y);
      var tip = line[0];
      if (last < line.length - 1) {
        var p0 = line[last], p1 = line[last + 1];
        tip = { x: p0.x + (p1.x - p0.x) * frac, y: p0.y + (p1.y - p0.y) * frac };
        ctx.lineTo(tip.x, tip.y);
      } else tip = line[line.length - 1];
      ctx.stroke();
      ctx.restore();

      // pen tip while drawing, then a pulse that travels the finished line
      var pulse = null;
      if (u < lineEnd) pulse = tip;
      else if (u < holdEnd) {
        var q = ((u - lineEnd) / (holdEnd - lineEnd) * 1.6) % 1;
        var f = q * (line.length - 1), k = Math.floor(f), fr = f - k;
        var a0 = line[k], a1 = line[Math.min(k + 1, line.length - 1)];
        pulse = { x: a0.x + (a1.x - a0.x) * fr, y: a0.y + (a1.y - a0.y) * fr };
      }
      if (pulse && la > 0) {
        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,' + la + ')';
        ctx.shadowColor = 'rgba(58,173,90,1)'; ctx.shadowBlur = 20;
        ctx.beginPath(); ctx.arc(pulse.x, pulse.y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    }

    if (running && !reduce) raf = requestAnimationFrame(frame);
  }

  function start() { if (running || reduce) return; running = true; if (pausedAt) { t0 += performance.now() - pausedAt; pausedAt = 0; } raf = requestAnimationFrame(frame); }
  function stop() { if (!running) return; running = false; pausedAt = performance.now(); cancelAnimationFrame(raf); }

  layout();
  frame(performance.now());
  var ro = new ResizeObserver(function () { layout(); frame(performance.now()); });
  ro.observe(hero);
  new IntersectionObserver(function (e) { e[0].isIntersecting ? start() : stop(); }, { threshold: 0.05 }).observe(hero);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  if (window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('pointermove', function (e) { var r = hero.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; });
    hero.addEventListener('pointerleave', function () { pointer.x = pointer.y = -9999; });
  }

  /* ── Key dates card ── */
  var items = hero.querySelectorAll('.hx-dates-list li');
  var bars = hero.querySelectorAll('.hx-dates-progress span');
  var current = 0;
  hero.style.setProperty('--hx-step', STEP + 'ms');
  function show(i) {
    items.forEach(function (li, k) {
      li.classList.toggle('is-active', k === i);
      li.classList.toggle('is-leaving', k === current && k !== i);
      li.setAttribute('aria-hidden', k === i ? 'false' : 'true');
    });
    bars.forEach(function (b, k) {
      b.classList.remove('run'); b.classList.toggle('done', k < i);
      if (k === i) { void b.offsetWidth; b.classList.add('run'); }
    });
    current = i;
  }
  if (items.length) {
    show(0);
    if (!reduce) {
      var timer = null, card = hero.querySelector('.hx-dates'), hovering = false;
      var tick = function () { if (running && !hovering) show((current + 1) % items.length); };
      timer = setInterval(tick, STEP);
      card.addEventListener('mouseenter', function () { hovering = true; bars.forEach(function (b) { b.style.animationPlayState = 'paused'; }); });
      card.addEventListener('mouseleave', function () { hovering = false; bars.forEach(function (b) { b.style.animationPlayState = ''; }); });
    } else {
      bars.forEach(function (b) { b.classList.add('done'); });
    }
  }
})();
