/* ============================================================
   İKİ — Discipline Hero Animations v2
   Pure Canvas + DOM, zero dependencies
   ============================================================ */
(function () {
  'use strict';

  /* ---------- HELPERS ---------- */
  function createCanvas(parent) {
    var c = document.createElement('canvas');
    c.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    parent.style.position = 'relative';
    parent.insertBefore(c, parent.firstChild);
    return c;
  }

  function sz(canvas) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.parentElement.getBoundingClientRect();
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { w: r.width, h: r.height, ctx: ctx };
  }

  /* ==========================================================
     1. ARCHITEKTUR — Radial Orbital Discipline Navigator
     Zentraler Punkt + 6 kreisende Nodes (klickbar)
     ========================================================== */
  function animArchitektur(container) {
    var canvas = createCanvas(container);
    canvas.style.pointerEvents = 'auto';
    canvas.style.cursor = 'default';
    var S = sz(canvas);
    var w = S.w, h = S.h, ctx = S.ctx;
    var t = 0;
    var hovered = -1;
    var mouseX = -999, mouseY = -999;

    var disciplines = [
      { name: 'Architektur', short: 'ARCH',   url: '/architektur/', color: '#C8BEA0', orbit: 0.7, speed: 0.0004, angle: 0 },
      { name: 'Museen',      short: 'MUS',    url: '	/ausstellung/',      color: '#D4C48A', orbit: 0.85, speed: 0.0003, angle: Math.PI * 0.33 },
      { name: 'Produkt',     short: 'PROD',   url: '/produkt/',     color: '#B48C5A', orbit: 0.75, speed: 0.00035, angle: Math.PI * 0.66 },
      { name: 'Grafik',      short: 'GRAF',   url: '/bauprojekt/',      color: '#E0E0E0', orbit: 0.9, speed: 0.00025, angle: Math.PI },
      { name: 'Motion',      short: 'MOT',    url: '/sanierung/',      color: '#8AB4DC', orbit: 0.8, speed: 0.00045, angle: Math.PI * 1.33 },
      { name: 'Lab',         short: 'LAB',    url: '/lab/',         color: '#00DCA8', orbit: 0.65, speed: 0.0005, angle: Math.PI * 1.66 }
    ];

    /* Positions cache for hit-testing */
    var nodePositions = [];

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t++;

      var cx = w / 2;
      var cy = h / 2;
      var baseR = Math.min(w, h) * 0.32;

      /* Orbit rings */
      for (var i = 0; i < disciplines.length; i++) {
        var d = disciplines[i];
        var orbitR = baseR * d.orbit;
        ctx.beginPath();
        ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(200,190,170,0.04)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      /* Center pulsing dot */
      var pulse = 0.6 + 0.4 * Math.sin(t * 0.015);
      var centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 25 * pulse);
      centerGlow.addColorStop(0, 'rgba(200,190,170,0.15)');
      centerGlow.addColorStop(1, 'rgba(200,190,170,0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(cx - 30, cy - 30, 60, 60);
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,190,170,0.4)';
      ctx.fill();

      /* Center label */
      ctx.font = '600 10px Inter, sans-serif';
      ctx.fillStyle = 'rgba(200,190,170,0.25)';
      ctx.textAlign = 'center';
      ctx.fillText('İKİ', cx, cy + 18);

      /* Nodes */
      nodePositions = [];
      for (var j = 0; j < disciplines.length; j++) {
        var disc = disciplines[j];
        disc.angle += disc.speed;
        var orbitRadius = baseR * disc.orbit;
        var nx = cx + Math.cos(disc.angle) * orbitRadius;
        var ny = cy + Math.sin(disc.angle) * orbitRadius;
        var nodeR = (hovered === j) ? 28 : 20;

        nodePositions.push({ x: nx, y: ny, r: nodeR + 10 });

        /* Connection line to center */
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = (hovered === j)
          ? disc.color.replace(')', ',0.2)').replace('rgb', 'rgba').replace('#', '')
          : 'rgba(200,190,170,0.03)';
        /* Manual hex to rgba for connection */
        var connAlpha = (hovered === j) ? 0.15 : 0.03;
        ctx.strokeStyle = 'rgba(200,190,170,' + connAlpha + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        /* Node glow */
        var glowR = nodeR * 2.5;
        var glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, glowR);
        var glowAlpha = (hovered === j) ? 0.12 : 0.04;
        glow.addColorStop(0, hexToRgba(disc.color, glowAlpha));
        glow.addColorStop(1, hexToRgba(disc.color, 0));
        ctx.fillStyle = glow;
        ctx.fillRect(nx - glowR, ny - glowR, glowR * 2, glowR * 2);

        /* Node circle */
        ctx.beginPath();
        ctx.arc(nx, ny, nodeR, 0, Math.PI * 2);
        var nodeAlpha = (hovered === j) ? 0.35 : 0.12;
        ctx.strokeStyle = hexToRgba(disc.color, nodeAlpha);
        ctx.lineWidth = (hovered === j) ? 1.5 : 0.8;
        ctx.stroke();

        /* Inner dot */
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(disc.color, (hovered === j) ? 0.6 : 0.25);
        ctx.fill();

        /* Label */
        ctx.font = (hovered === j) ? '600 9px Inter, sans-serif' : '400 8px Inter, sans-serif';
        ctx.fillStyle = hexToRgba(disc.color, (hovered === j) ? 0.8 : 0.35);
        ctx.textAlign = 'center';
        ctx.fillText(disc.short, nx, ny + nodeR + 14);

        /* Full name on hover */
        if (hovered === j) {
          ctx.font = '300 11px Inter, sans-serif';
          ctx.fillStyle = hexToRgba(disc.color, 0.6);
          ctx.fillText(disc.name, nx, ny - nodeR - 8);
        }
      }

      /* Subtle connecting particles */
      for (var k = 0; k < 3; k++) {
        var partAngle = t * 0.003 + k * Math.PI * 2 / 3;
        var partR = baseR * 0.5 + Math.sin(t * 0.01 + k) * 30;
        var px = cx + Math.cos(partAngle) * partR;
        var py = cy + Math.sin(partAngle) * partR;
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,190,170,0.08)';
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    function hexToRgba(hex, alpha) {
      if (hex.charAt(0) === '#') {
        var r = parseInt(hex.substring(1, 3), 16);
        var g = parseInt(hex.substring(3, 5), 16);
        var b = parseInt(hex.substring(5, 7), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
      }
      return hex;
    }

    /* Mouse tracking */
    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      hovered = -1;
      for (var i = 0; i < nodePositions.length; i++) {
        var dx = mouseX - nodePositions[i].x;
        var dy = mouseY - nodePositions[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < nodePositions[i].r) {
          hovered = i;
          canvas.style.cursor = 'pointer';
          break;
        }
      }
      if (hovered === -1) canvas.style.cursor = 'default';
    });

    canvas.addEventListener('mouseleave', function () {
      hovered = -1;
      canvas.style.cursor = 'default';
    });

    canvas.addEventListener('click', function () {
      if (hovered >= 0 && hovered < disciplines.length) {
        window.location.href = disciplines[hovered].url;
      }
    });

    /* Touch support */
    canvas.addEventListener('touchstart', function (e) {
      var rect = canvas.getBoundingClientRect();
      var touch = e.touches[0];
      mouseX = touch.clientX - rect.left;
      mouseY = touch.clientY - rect.top;
      for (var i = 0; i < nodePositions.length; i++) {
        var dx = mouseX - nodePositions[i].x;
        var dy = mouseY - nodePositions[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < nodePositions[i].r * 1.5) {
          window.location.href = disciplines[i].url;
          e.preventDefault();
          break;
        }
      }
    });

    window.addEventListener('resize', function () {
      var ns = sz(canvas); w = ns.w; h = ns.h; ctx = ns.ctx;
    });
    draw();
  }

  /* ==========================================================
     2. MUSEEN — Floating Light Particles (Spotlights)
     ========================================================== */
  function animMuseen(container) {
    var canvas = createCanvas(container);
    var S = sz(canvas);
    var w = S.w, h = S.h, ctx = S.ctx;
    var particles = [];

    function seed() {
      particles = [];
      var count = Math.max(20, Math.floor((w * h) / 8000));
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          r: 1 + Math.random() * 2.5,
          vx: (Math.random() - 0.5) * 0.15, vy: -0.1 - Math.random() * 0.2,
          alpha: 0.1 + Math.random() * 0.4,
          pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.01 + Math.random() * 0.02
        });
      }
    }
    seed();

    function draw() {
      ctx.clearRect(0, 0, w, h);
      var grd = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, h * 0.8);
      grd.addColorStop(0, 'rgba(210,190,140,0.04)');
      grd.addColorStop(1, 'rgba(210,190,140,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed;
        var a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, 'rgba(220,195,130,' + a + ')');
        grad.addColorStop(1, 'rgba(220,195,130,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(p.x - p.r * 4, p.y - p.r * 4, p.r * 8, p.r * 8);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240,220,170,' + Math.min(1, a * 1.5) + ')';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', function () {
      var ns = sz(canvas); w = ns.w; h = ns.h; ctx = ns.ctx; seed();
    });
    draw();
  }

  /* ==========================================================
     3. PRODUKT — Rotating Wireframe Chair + Lamp
     ========================================================== */
  function animProdukt(container) {
    var canvas = createCanvas(container);
    var S = sz(canvas);
    var w = S.w, h = S.h, ctx = S.ctx;
    var angle = 0;

    var verts = [
      [-1,0,-0.8],[1,0,-0.8],[1,0,0.8],[-1,0,0.8],
      [-1,-1.8,-0.8],[1,-1.8,-0.8],
      [-1,1.2,0.8],[1,1.2,0.8],[-1,1.2,-0.8],[1,1.2,-0.8]
    ];
    var edges = [[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,1],[3,6],[2,7],[0,8],[1,9],[6,7],[8,9]];

    function proj(v) {
      var ca = Math.cos(angle), sa = Math.sin(angle);
      var x = v[0]*ca - v[2]*sa, z = v[0]*sa + v[2]*ca;
      var cb = Math.cos(0.35), sb = Math.sin(0.35);
      var y2 = v[1]*cb - z*sb, z2 = v[1]*sb + z*cb;
      var s = 80, p = 4/(4+z2);
      return { x: w/2 + x*s*p, y: h/2 + y2*s*p, z: z2 };
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      angle += 0.004;

      for (var i = 0; i < edges.length; i++) {
        var pa = proj(verts[edges[i][0]]), pb = proj(verts[edges[i][1]]);
        var depth = (pa.z + pb.z) / 2;
        var alpha = 0.08 + 0.15 * (1 - depth / 3);
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = 'rgba(180,140,90,' + alpha + ')';
        ctx.lineWidth = 1; ctx.stroke();
      }

      /* floating lamp shape */
      var la = angle * 0.7;
      var lx = w/2 + Math.cos(la)*140, ly = h/2 - 70 + Math.sin(la*0.5)*25;
      var lp = 0.06 + 0.04 * Math.sin(angle*2);
      ctx.beginPath(); ctx.arc(lx, ly, 18, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(180,140,90,' + lp + ')'; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(lx, ly-18); ctx.lineTo(lx, ly-55);
      ctx.strokeStyle = 'rgba(180,140,90,' + lp*0.7 + ')'; ctx.lineWidth = 0.5; ctx.stroke();

      /* soft glow under lamp */
      var lampGlow = ctx.createRadialGradient(lx, ly, 0, lx, ly, 40);
      lampGlow.addColorStop(0, 'rgba(180,140,90,0.03)');
      lampGlow.addColorStop(1, 'rgba(180,140,90,0)');
      ctx.fillStyle = lampGlow;
      ctx.fillRect(lx-40, ly-40, 80, 80);

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', function () {
      var ns = sz(canvas); w = ns.w; h = ns.h; ctx = ns.ctx;
    });
    draw();
  }

  /* ==========================================================
     4. GRAFIK — Morphing Geometric Shapes + Grid Lines
     ========================================================== */
  function animGrafik(container) {
    var canvas = createCanvas(container);
    var S = sz(canvas);
    var w = S.w, h = S.h, ctx = S.ctx;
    var t = 0;
    var shapes = [];

    function seed() {
      shapes = [];
      var count = 12 + Math.floor(w / 100);
      for (var i = 0; i < count; i++) {
        shapes.push({
          x: Math.random()*w, y: Math.random()*h,
          size: 15+Math.random()*40, rotation: Math.random()*Math.PI*2,
          rotSpeed: (Math.random()-0.5)*0.008,
          type: Math.floor(Math.random()*3),
          morphPhase: Math.random()*Math.PI*2,
          drift: (Math.random()-0.5)*0.2
        });
      }
    }
    seed();

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.01;
      for (var i = 0; i < shapes.length; i++) {
        var s = shapes[i];
        s.rotation += s.rotSpeed;
        s.x += s.drift; s.y += Math.sin(t+s.morphPhase)*0.15;
        if (s.x > w+60) s.x = -60; if (s.x < -60) s.x = w+60;
        var morph = Math.sin(t*0.5+s.morphPhase);
        var alpha = 0.05 + 0.06*Math.abs(morph);
        var svz = s.size*(0.8+0.2*morph);
        ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.rotation);
        ctx.strokeStyle = 'rgba(240,240,240,'+alpha+')'; ctx.lineWidth = 0.8;
        if (s.type===0) { ctx.strokeRect(-svz/2,-svz/2,svz,svz); }
        else if (s.type===1) { ctx.beginPath(); ctx.moveTo(0,-svz/2); ctx.lineTo(svz/2,svz/2); ctx.lineTo(-svz/2,svz/2); ctx.closePath(); ctx.stroke(); }
        else { ctx.beginPath(); ctx.arc(0,0,svz/2,0,Math.PI*2); ctx.stroke(); }
        ctx.restore();
      }
      var ca = 0.04+0.02*Math.sin(t);
      ctx.setLineDash([4,8]);
      ctx.strokeStyle = 'rgba(240,240,240,'+ca+')'; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(w/2,0); ctx.lineTo(w/2,h);
      ctx.moveTo(0,h/2); ctx.lineTo(w,h/2); ctx.stroke();
      ctx.setLineDash([]);
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', function () {
      var ns = sz(canvas); w = ns.w; h = ns.h; ctx = ns.ctx; seed();
    });
    draw();
  }

  /* ==========================================================
     5. MOTION — Spiral Arms (inspired by 21st.dev)
     ========================================================== */
  function animMotion(container) {
    var canvas = createCanvas(container);
    var S = sz(canvas);
    var w = S.w, h = S.h, ctx = S.ctx;
    var t = 0;

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.035)';
      ctx.fillRect(0, 0, w, h);
      t += 0.012;
      var cx = w/2, cy = h/2, arms = 5, pts = 120;
      for (var a = 0; a < arms; a++) {
        var base = (a/arms)*Math.PI*2 + t*0.3;
        ctx.beginPath();
        for (var i = 0; i < pts; i++) {
          var r = i/pts, ang = base + r*Math.PI*4;
          var rad = r*Math.min(w,h)*0.4;
          var wob = Math.sin(t*2+i*0.1)*8;
          var x = cx+Math.cos(ang)*(rad+wob), y = cy+Math.sin(ang)*(rad+wob);
          if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        var hue = (a*60+t*20)%360;
        ctx.strokeStyle = 'hsla('+hue+',60%,60%,0.12)'; ctx.lineWidth = 1.2; ctx.stroke();
      }
      var glow = ctx.createRadialGradient(cx,cy,0,cx,cy,30);
      glow.addColorStop(0,'rgba(255,255,255,0.06)');
      glow.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle = glow; ctx.fillRect(cx-30,cy-30,60,60);
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', function () {
      var ns = sz(canvas); w = ns.w; h = ns.h; ctx = ns.ctx;
    });
    draw();
  }

  /* ==========================================================
     6. LAB — Parametric Deforming Mesh
     ========================================================== */
  function animLab(container) {
    var canvas = createCanvas(container);
    var S = sz(canvas);
    var w = S.w, h = S.h, ctx = S.ctx;
    var t = 0, spacing = 40, cols, rows;

    function calcGrid() {
      cols = Math.ceil(w/spacing)+2; rows = Math.ceil(h/spacing)+2;
    }
    calcGrid();

    function deform(bx, by) {
      var dist = Math.sqrt(Math.pow(bx-w/2,2)+Math.pow(by-h/2,2));
      var wv = Math.sin(dist*0.008-t*2)*15;
      var wv2 = Math.cos(bx*0.01+t)*Math.sin(by*0.01+t)*10;
      return { x: bx+wv, y: by+wv2 };
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.008;
      /* Horizontal */
      for (var r = 0; r < rows; r++) {
        ctx.beginPath();
        for (var c = 0; c < cols; c++) {
          var p = deform(c*spacing, r*spacing);
          if (c===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
        }
        ctx.strokeStyle = 'rgba(0,220,180,0.07)'; ctx.lineWidth = 0.6; ctx.stroke();
      }
      /* Vertical */
      for (var c2 = 0; c2 < cols; c2++) {
        ctx.beginPath();
        for (var r2 = 0; r2 < rows; r2++) {
          var p2 = deform(c2*spacing, r2*spacing);
          if (r2===0) ctx.moveTo(p2.x,p2.y); else ctx.lineTo(p2.x,p2.y);
        }
        ctx.strokeStyle = 'rgba(0,220,180,0.07)'; ctx.lineWidth = 0.6; ctx.stroke();
      }
      /* Center nodes */
      for (var rn = 0; rn < rows; rn++) {
        for (var cn = 0; cn < cols; cn++) {
          var bx = cn*spacing, by = rn*spacing;
          var dist = Math.sqrt(Math.pow(bx-w/2,2)+Math.pow(by-h/2,2));
          if (dist < 150) {
            var pn = deform(bx, by);
            var na = 0.15*(1-dist/150);
            ctx.beginPath(); ctx.arc(pn.x,pn.y,2,0,Math.PI*2);
            ctx.fillStyle = 'rgba(0,255,200,'+na+')'; ctx.fill();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', function () {
      var ns = sz(canvas); w = ns.w; h = ns.h; ctx = ns.ctx; calcGrid();
    });
    draw();
  }

  /* ---------- INIT ---------- */
  v  var map = {
    architektur: animArchitektur,
    ausstellung: animMuseen,
    produkt: animProdukt,
    bauprojekt: animGrafik,
    sanierung: animMotion,
    lab: animLab
  };

  function init() {
    var disc = document.body.getAttribute('data-discipline');
    var hero = document.querySelector('.disc-hero, .fullscreen-hero, [class*="hero"]');
    if (disc && map[disc] && hero) {
      map[disc](hero);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
