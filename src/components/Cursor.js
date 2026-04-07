import { useEffect, useRef } from 'react';

export default function Cursor() {
  const curRef  = useRef(null);
  const ringRef = useRef(null);
  const rx = useRef(0), ry = useRef(0);
  const mx = useRef(0), my = useRef(0);

  useEffect(() => {
    const cur  = curRef.current;
    const ring = ringRef.current;

    const onMove = (e) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      cur.style.left  = e.clientX + 'px';
      cur.style.top   = e.clientY + 'px';

      // trail
      const dot = document.createElement('div');
      dot.className = 'trail-dot';
      const hue = 200 + Math.round(Math.random() * 50);
      const sz  = 3 + Math.random() * 5;
      dot.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${sz}px;height:${sz}px;background:hsl(${hue},100%,62%);`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 600);
    };

    const animRing = () => {
      rx.current += (mx.current - rx.current) * 0.13;
      ry.current += (my.current - ry.current) * 0.13;
      ring.style.left = rx.current + 'px';
      ring.style.top  = ry.current + 'px';
      requestAnimationFrame(animRing);
    };
    animRing();

    const expand = () => { cur.classList.add('cursor-expanded'); ring.classList.add('ring-expanded'); };
    const shrink = () => { cur.classList.remove('cursor-expanded'); ring.classList.remove('ring-expanded'); };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,.btn,.proj-card,.about-card,.cert-card,.contact-item').forEach(el => {
      el.addEventListener('mouseenter', expand);
      el.addEventListener('mouseleave', shrink);
    });

    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div id="cursor" ref={curRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}