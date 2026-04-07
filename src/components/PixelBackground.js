import { useEffect, useRef } from 'react';

export default function PixelBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let pixels = [];

    const PIXEL_SIZE = 4;
    const COLORS = ['#00D9FF', '#0099cc', '#004466', '#002233', '#00ffcc', '#0066aa'];
    const MAX_PIXELS = 80;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Pixel {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = PIXEL_SIZE * (0.5 + Math.random() * 1.5);
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = 0;
        this.targetAlpha = 0.05 + Math.random() * 0.18;
        this.fadeSpeed = 0.003 + Math.random() * 0.006;
        this.fadeIn = true;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.life = 0;
        this.maxLife = 200 + Math.random() * 300;
      }

      update() {
        this.life++;
        this.x += this.vx;
        this.y += this.vy;

        if (this.fadeIn) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= this.targetAlpha) {
            this.alpha = this.targetAlpha;
            this.fadeIn = false;
          }
        } else if (this.life > this.maxLife * 0.7) {
          this.alpha -= this.fadeSpeed * 0.5;
        }

        if (this.life > this.maxLife || this.alpha <= 0) {
          this.reset();
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fillRect(
          Math.floor(this.x / this.size) * this.size,
          Math.floor(this.y / this.size) * this.size,
          this.size,
          this.size
        );
        ctx.restore();
      }
    }

    // Burst pixels - occasional bursts of pixels from random locations
    class BurstPixel {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = PIXEL_SIZE * (0.5 + Math.random());
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = 0.4 + Math.random() * 0.4;
        this.vx = (Math.random() - 0.5) * 2.5;
        this.vy = (Math.random() - 0.5) * 2.5;
        this.life = 0;
        this.maxLife = 40 + Math.random() * 40;
        this.isBurst = true;
      }

      update() {
        this.life++;
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.alpha -= this.alpha / this.maxLife * 2;
      }

      draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillRect(
          Math.floor(this.x / this.size) * this.size,
          Math.floor(this.y / this.size) * this.size,
          this.size,
          this.size
        );
        ctx.restore();
      }

      isDead() {
        return this.life >= this.maxLife || this.alpha <= 0.01;
      }
    }

    let bursts = [];
    let burstTimer = 0;

    function spawnBurst() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const count = 8 + Math.floor(Math.random() * 12);
      for (let i = 0; i < count; i++) {
        bursts.push(new BurstPixel(x, y));
      }
    }

    // Init pixels
    for (let i = 0; i < MAX_PIXELS; i++) {
      const p = new Pixel();
      p.life = Math.random() * p.maxLife; // stagger lifetimes
      pixels.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ambient pixels
      pixels.forEach(p => { p.update(); p.draw(ctx); });

      // Draw burst pixels
      bursts = bursts.filter(b => !b.isDead());
      bursts.forEach(b => { b.update(); b.draw(ctx); });

      // Trigger random bursts every ~3 seconds
      burstTimer++;
      if (burstTimer > 180) {
        spawnBurst();
        burstTimer = 0;
      }

      animId = requestAnimationFrame(animate);
    }

    resize();
    animate();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
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
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
}
