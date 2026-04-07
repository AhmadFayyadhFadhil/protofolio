import { useEffect, useRef } from 'react';

export default function ClickSpark() {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#00D9FF', '#ffffff', '#00ffcc', '#7dd8ff', '#00aaff'];

    class Spark {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.5;
        this.alpha = 1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.size = 2 + Math.random() * 3;
        this.gravity = 0.12;
        this.friction = 0.94;
        this.trail = [];
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
        if (this.trail.length > 6) this.trail.shift();

        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.032;
      }

      draw(ctx) {
        // Draw trail
        this.trail.forEach((t, i) => {
          ctx.save();
          ctx.globalAlpha = (t.alpha * (i / this.trail.length)) * 0.4;
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 4;
          ctx.shadowColor = this.color;
          const sz = this.size * (i / this.trail.length);
          ctx.fillRect(t.x - sz / 2, t.y - sz / 2, sz, sz);
          ctx.restore();
        });

        // Draw spark pixel
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.restore();
      }

      isDead() {
        return this.alpha <= 0;
      }
    }

    // Ring burst on click
    class Ring {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 40 + Math.random() * 20;
        this.alpha = 0.8;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }

      update() {
        this.radius += 3;
        this.alpha -= 0.05;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.strokeRect(
          this.x - this.radius,
          this.y - this.radius,
          this.radius * 2,
          this.radius * 2
        );
        ctx.restore();
      }

      isDead() {
        return this.alpha <= 0;
      }
    }

    let rings = [];

    function handleClick(e) {
      const x = e.clientX;
      const y = e.clientY;

      // Spawn sparks
      const count = 12 + Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i++) {
        sparksRef.current.push(new Spark(x, y));
      }

      // Spawn ring
      rings.push(new Ring(x, y));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(s => !s.isDead());
      sparksRef.current.forEach(s => { s.update(); s.draw(ctx); });

      rings = rings.filter(r => !r.isDead());
      rings.forEach(r => { r.update(); r.draw(ctx); });

      animRef.current = requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
