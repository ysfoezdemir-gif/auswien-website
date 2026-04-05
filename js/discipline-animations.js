/* ============================================================
   İKİ — Discipline Hero Animations
   Pure Canvas, zero dependencies
   Each discipline gets a unique generative background
   ============================================================ */

(function () {
  'use strict';

  // --- UTILITY ---
  function createCanvas(parent) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    parent.style.position = 'relative';
    parent.insertBefore(canvas, parent.firstChild);
    return canvas;
  }

  function resize(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { w: rect.width, h: rect.height, ctx };
  }

  // --- 1. ARCHITEKTUR: Growing Blueprint Grid ---
  function animArchitektur(container) {
    const canvas = createCanvas(container);
    let { w, h, ctx } = resize(canvas);
    let lines = [];
    let t = 0;

    function seed() {
      lines = [];
      const cols = Math.floor(w / 80) + 1;
      const rows = Math.floor(h / 80) + 1;
      for (let c = 0; c <= cols; c++) {
        lines.push({ x1: c * 80, y1: 0, x2: c * 80, y2: h, progress: 0, speed: 0.003 + Math.random() * 0.004, delay: Math.random() * 120 });
      }
      for (let r = 0; r <= rows; r++) {
        lines.push({ x1: 0, y1: r * 80, x2: w, y2: r * 80, progress: 0, speed: 0.003 + Math.random() * 0.004, delay: Math.random() * 120 });
      }
    }

    seed();

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t++;
      for (const l of lines) {
        if (t < l.delay) continue;
        l.progress = Math.min(1, l.progress + l.speed);
        const p = l.progress;
        const ex = l.x1 + (l.x2 - l.x1) * p;
        const ey = l.y1 + (l.y2 - l.y1) * p;
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = 'rgba(200,190,170,' + (0.08 + 0.12 * p) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // node dots at intersections
        if (p > 0.5) {
          ctx.beginPath();
          ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200,190,170,' + (0.15 * p) + ')';
          ctx.fill();
        }
      }

      // Subtle pulsing crosshair at center
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.02);
      ctx.strokeStyle = 'rgba(200,190,170,' + (0.06 * pulse) + ')';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 40 + 20 * pulse, 0, Math.PI * 2);
      ctx.stroke();

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      ({ w, h, ctx } = resize(canvas));
      seed();
    });
    draw();
  }

  // --- 2. MUSEEN: Floating Light Particles (Spotlights) ---
  function animMuseen(container) {
    const canvas = createCanvas(container);
    let { w, h, ctx } = resize(canvas);
    let particles = [];

    function seed() {
      particles = [];
      const count = Math.floor((w * h) / 8000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1 + Math.random() * 2.5,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.1 - Math.random() * 0.2,
          alpha: Math.random() * 0.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02
        });
      }
    }
    seed();

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Subtle radial spotlight from top center
      const grd = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, h * 0.8);
      grd.addColorStop(0, 'rgba(210,190,140,0.04)');
      grd.addColorStop(1, 'rgba(210,190,140,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // Warm golden glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, 'rgba(220,195,130,' + a + ')');
        grad.addColorStop(1, 'rgba(220,195,130,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(p.x - p.r * 4, p.y - p.r * 4, p.r * 8, p.r * 8);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240,220,170,' + a * 1.5 + ')';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      ({ w, h, ctx } = resize(canvas));
      seed();
    });
    draw();
  }

  // --- 3. PRODUKT: Rotating Wireframe Object ---
  function animProdukt(container) {
    const canvas = createCanvas(container);
    let { w, h, ctx } = resize(canvas);
    let angle = 0;

    // Simple chair wireframe vertices (side view)
    const vertices = [
      // Seat
      [-1, 0, -0.8], [1, 0, -0.8], [1, 0, 0.8], [-1, 0, 0.8],
      // Backrest
      [-1, 0, -0.8], [-1, -1.8, -0.8], [1, -1.8, -0.8], [1, 0, -0.8],
      // Front legs
      [-1, 0, 0.8], [-1, 1.2, 0.8], [1, 0, 0.8], [1, 1.2, 0.8],
      // Back legs
      [-1, 0, -0.8], [-1, 1.2, -0.8], [1, 0, -0.8], [1, 1.2, -0.8]
    ];

    const edges = [
      // Seat
      [0, 1], [1, 2], [2, 3], [3, 0],
      // Backrest
      [4, 5], [5, 6], [6, 7],
      // Legs
      [8, 9], [10, 11], [12, 13], [14, 15],
      // Cross brace
      [9, 11], [13, 15]
    ];

    function project(v) {
      const cosA = Math.cos(angle), sinA = Math.sin(angle);
      const x = v[0] * cosA - v[2] * sinA;
      const z = v[0] * sinA + v[2] * cosA;
      const cosB = Math.cos(0.3), sinB = Math.sin(0.3);
      const y2 = v[1] * cosB - z * sinB;
      const z2 = v[1] * sinB + z * cosB;
      const scale = 80;
      const perspective = 4 / (4 + z2);
      return {
        x: w / 2 + x * scale * perspective,
        y: h / 2 + y2 * scale * perspective,
        z: z2
      };
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      angle += 0.005;

      for (const [a, b] of edges) {
        const pa = project(vertices[a]);
        const pb = project(vertices[b]);
        const depth = (pa.z + pb.z) / 2;
        const alpha = 0.1 + 0.15 * (1 - depth / 3);

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = 'rgba(180,140,90,' + alpha + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Floating secondary shape (lamp/circle)
      const lampAngle = angle * 0.7;
      const lampX = w / 2 + Math.cos(lampAngle) * 160;
      const lampY = h / 2 - 80 + Math.sin(lampAngle * 0.5) * 30;
      const lampPulse = 0.08 + 0.04 * Math.sin(angle * 2);
      ctx.beginPath();
      ctx.arc(lampX, lampY, 20, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(180,140,90,' + lampPulse + ')';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      // Lamp line
      ctx.beginPath();
      ctx.moveTo(lampX, lampY - 20);
      ctx.lineTo(lampX, lampY - 60);
      ctx.strokeStyle = 'rgba(180,140,90,' + lampPulse * 0.7 + ')';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      ({ w, h, ctx } = resize(canvas));
    });
    draw();
  }

  // --- 4. GRAFIK: Morphing Typography / Geometric Shapes ---
  function animGrafik(container) {
    const canvas = createCanvas(container);
    let { w, h, ctx } = resize(canvas);
    let t = 0;
    let shapes = [];

    function seed() {
      shapes = [];
      const count = 12 + Math.floor(w / 100);
      for (let i = 0; i < count; i++) {
        shapes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 15 + Math.random() * 40,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.008,
          type: Math.floor(Math.random() * 3), // 0=square, 1=triangle, 2=circle
          morphPhase: Math.random() * Math.PI * 2,
          drift: (Math.random() - 0.5) * 0.2
        });
      }
    }
    seed();

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.01;

      for (const s of shapes) {
        s.rotation += s.rotSpeed;
        s.x += s.drift;
        s.y += Math.sin(t + s.morphPhase) * 0.15;
        if (s.x > w + 60) s.x = -60;
        if (s.x < -60) s.x = w + 60;

        const morph = Math.sin(t * 0.5 + s.morphPhase);
        const alpha = 0.06 + 0.06 * Math.abs(morph);

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.strokeStyle = 'rgba(240,240,240,' + alpha + ')';
        ctx.lineWidth = 0.8;

        const sz = s.size * (0.8 + 0.2 * morph);

        if (s.type === 0) {
          // Square morphing to diamond
          ctx.beginPath();
          ctx.rect(-sz / 2, -sz / 2, sz, sz);
          ctx.stroke();
        } else if (s.type === 1) {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -sz / 2);
          ctx.lineTo(sz / 2, sz / 2);
          ctx.lineTo(-sz / 2, sz / 2);
          ctx.closePath();
          ctx.stroke();
        } else {
          // Circle
          ctx.beginPath();
          ctx.arc(0, 0, sz / 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Crosshair alignment lines (graphic design feel)
      const cx = w / 2, cy = h / 2;
      const cAlpha = 0.04 + 0.02 * Math.sin(t);
      ctx.setLineDash([4, 8]);
      ctx.strokeStyle = 'rgba(240,240,240,' + cAlpha + ')';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      ({ w, h, ctx } = resize(canvas));
      seed();
    });
    draw();
  }

  // --- 5. MOTION: Spiral Lines (inspired by 21st.dev) ---
  function animMotion(container) {
    const canvas = createCanvas(container);
    let { w, h, ctx } = resize(canvas);
    let t = 0;

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.03)';
      ctx.fillRect(0, 0, w, h);
      t += 0.015;

      const cx = w / 2, cy = h / 2;
      const arms = 5;
      const points = 120;

      for (let arm = 0; arm < arms; arm++) {
        const baseAngle = (arm / arms) * Math.PI * 2 + t * 0.3;
        ctx.beginPath();

        for (let i = 0; i < points; i++) {
          const ratio = i / points;
          const angle = baseAngle + ratio * Math.PI * 4;
          const radius = ratio * Math.min(w, h) * 0.4;
          const wobble = Math.sin(t * 2 + i * 0.1) * 8;
          const x = cx + Math.cos(angle) * (radius + wobble);
          const y = cy + Math.sin(angle) * (radius + wobble);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const hue = (arm * 60 + t * 20) % 360;
        ctx.strokeStyle = 'hsla(' + hue + ',60%,60%,0.12)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Center glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      glow.addColorStop(0, 'rgba(255,255,255,0.06)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(cx - 30, cy - 30, 60, 60);

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      ({ w, h, ctx } = resize(canvas));
    });
    draw();
  }

  // --- 6. LAB: Parametric Mesh / Deforming Grid ---
  function animLab(container) {
    const canvas = createCanvas(container);
    let { w, h, ctx } = resize(canvas);
    let t = 0;
    let cols, rows, spacing;

    function calcGrid() {
      spacing = 40;
      cols = Math.ceil(w / spacing) + 2;
      rows = Math.ceil(h / spacing) + 2;
    }
    calcGrid();

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.008;

      // Draw deformed grid
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;
          const dist = Math.sqrt(Math.pow(bx - w / 2, 2) + Math.pow(by - h / 2, 2));
          const wave = Math.sin(dist * 0.008 - t * 2) * 15;
          const wave2 = Math.cos(bx * 0.01 + t) * Math.sin(by * 0.01 + t) * 10;
          const x = bx + wave;
          const y = by + wave2;
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(0,220,180,0.07)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const bx = c * spacing;
          const by = r * spacing;
          const dist = Math.sqrt(Math.pow(bx - w / 2, 2) + Math.pow(by - h / 2, 2));
          const wave = Math.sin(dist * 0.008 - t * 2) * 15;
          const wave2 = Math.cos(bx * 0.01 + t) * Math.sin(by * 0.01 + t) * 10;
          const x = bx + wave;
          const y = by + wave2;
          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(0,220,180,0.07)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Node highlights near center
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;
          const dist = Math.sqrt(Math.pow(bx - w / 2, 2) + Math.pow(by - h / 2, 2));
          if (dist < 150) {
            const wave = Math.sin(dist * 0.008 - t * 2) * 15;
            const wave2 = Math.cos(bx * 0.01 + t) * Math.sin(by * 0.01 + t) * 10;
            const x = bx + wave;
            const y = by + wave2;
            const a = 0.15 * (1 - dist / 150);
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,255,200,' + a + ')';
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      ({ w, h, ctx } = resize(canvas));
      calcGrid();
    });
    draw();
  }

  // --- INIT ---
  const disciplineMap = {
    architektur: animArchitektur,
    museen: animMuseen,
    produkt: animProdukt,
    grafik: animGrafik,
    motion: animMotion,
    lab: animLab
  };

  function init() {
    const body = document.body;
    const discipline = body.getAttribute('data-discipline');
    const hero = document.querySelector('.disc-hero, .fullscreen-hero, [class*="hero"]');

    if (discipline && disciplineMap[discipline] && hero) {
      disciplineMap[discipline](hero);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
