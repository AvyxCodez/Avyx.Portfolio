// src/components/useCanvasCursor.js
import { useEffect } from 'react';

const useCanvasCursor = () => {
  useEffect(() => {
    // Twenty trails of fifty nodes are re-integrated and re-stroked every frame,
    // which is the most expensive thing on the page. Skip it outright for anyone
    // who has asked for less motion — Oneko already does the same.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx;
    let f;
    let pos = {};
    let lines = [];
    let running = true;
    // The trail converges on the pointer within a few hundred ms of it stopping,
    // after which every further frame redraws an identical picture. Park the loop
    // once the pointer goes quiet and let the next move restart it; nothing looks
    // different, the CPU just stops burning on a static image.
    let looping = false;
    let lastMove = 0;
    const IDLE_MS = 900;

    const E = {
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };

    function Node() { this.x = 0; this.y = 0; this.vx = 0; this.vy = 0; }

    function n(e) { this.init(e || {}); }
    n.prototype = {
      init(e) { this.phase = e.phase || 0; this.offset = e.offset || 0; this.frequency = e.frequency || 0.001; this.amplitude = e.amplitude || 1; },
      update() { this.phase += this.frequency; return this.offset + Math.sin(this.phase) * this.amplitude; },
    };

    function Line(e) { this.init(e || {}); }
    Line.prototype = {
      init(e) {
        this.spring = e.spring + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (let n = 0; n < E.size; n++) {
          const t = new Node(); t.x = pos.x; t.y = pos.y; this.nodes.push(t);
        }
      },
      update() {
        let e = this.spring; let t = this.nodes[0];
        t.vx += (pos.x - t.x) * e; t.vy += (pos.y - t.y) * e;
        for (let i = 0; i < this.nodes.length; i++) {
          t = this.nodes[i];
          if (i > 0) {
            const n = this.nodes[i - 1];
            t.vx += (n.x - t.x) * e; t.vy += (n.y - t.y) * e;
            t.vx += n.vx * E.dampening; t.vy += n.vy * E.dampening;
          }
          t.vx *= this.friction; t.vy *= this.friction;
          t.x += t.vx; t.y += t.vy; e *= E.tension;
        }
      },
      draw() {
        let n = this.nodes[0].x, i = this.nodes[0].y;
        ctx.beginPath(); ctx.moveTo(n, i);
        for (let a = 1; a < this.nodes.length - 1; a++) {
          const e = this.nodes[a], t = this.nodes[a + 1];
          n = 0.5 * (e.x + t.x); i = 0.5 * (e.y + t.y);
          ctx.quadraticCurveTo(e.x, e.y, n, i);
        }
        ctx.quadraticCurveTo(this.nodes[this.nodes.length-2].x, this.nodes[this.nodes.length-2].y, this.nodes[this.nodes.length-1].x, this.nodes[this.nodes.length-1].y);
        ctx.stroke();
      },
    };

    function initLines() {
      lines = [];
      for (let e = 0; e < E.trails; e++) lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
    }

    function handleMove(e) {
      pos.x = e.touches ? e.touches[0].pageX : e.clientX;
      pos.y = e.touches ? e.touches[0].pageY : e.clientY;
      lastMove = performance.now();
      if (!looping) { looping = true; requestAnimationFrame(render); }
    }

    function onMousemove(e) {
      document.removeEventListener('mousemove', onMousemove);
      document.addEventListener('touchstart', onMousemove, { passive: true });
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('touchmove', handleMove, { passive: true });
      handleMove(e); initLines(); startLoop();
    }

    // Every node still carrying meaningful velocity means the trail is mid-swing.
    // Checked before parking so the loop can only stop on a settled picture — on
    // a throttled or low-power frame rate an elapsed-time check alone would freeze
    // a half-drawn squiggle on screen.
    function isSettled() {
      for (let i = 0; i < lines.length; i++) {
        const nodes = lines[i].nodes;
        for (let j = 0; j < nodes.length; j++) {
          if (Math.abs(nodes[j].vx) > 0.05 || Math.abs(nodes[j].vy) > 0.05) return false;
        }
      }
      return true;
    }

    function render() {
      if (!running || !ctx) { looping = false; return; }
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',90%,70%,0.55)';
      ctx.lineWidth = 2;
      for (let i = 0; i < lines.length; i++) { lines[i].update(); lines[i].draw(); }
      if (performance.now() - lastMove > IDLE_MS && isSettled()) { looping = false; return; }
      requestAnimationFrame(render);
    }

    function startLoop() {
      lastMove = performance.now();
      if (!looping) { looping = true; requestAnimationFrame(render); }
    }

    function resizeCanvas() {
      if (!ctx?.canvas) return;
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    const canvas = document.getElementById('canvas');
    if (canvas) {
      ctx = canvas.getContext('2d');
      f = new n({ phase: Math.random() * 2 * Math.PI, amplitude: 85, frequency: 0.0015, offset: 285 });
      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('touchstart', onMousemove);
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
    }

    return () => {
      running = false;
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
};

export default useCanvasCursor;