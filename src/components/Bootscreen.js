import { useEffect, useState } from 'react';

const LINES = [
  '> Initializing portfolio kernel...',
  '> Loading Ahmad Fayyadh Fadhil...',
  '> Mounting: React · Laravel · MySQL · Linux...',
  '> Connecting to Sidoarjo, East Java, ID...',
  '> Status: OPEN TO FREELANCE',
  '> System ready. Welcome.',
];

export default function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < LINES.length) {
        setLines(prev => [...prev, LINES[i++]]);
        setTimeout(tick, 340);
      } else {
        setTimeout(() => { setHidden(true); setTimeout(onDone, 700); }, 500);
      }
    };
    tick();
  }, [onDone]);

  return (
    <div className={`boot-screen${hidden ? ' hide' : ''}`}>
      <div className="boot-logo">Fayyadh<span>Tzy</span>.</div>
      <div className="boot-log">
        {lines.map((l, i) => (
          <div key={i} className="boot-line" style={{ animationDelay: '0s' }}>{l}</div>
        ))}
      </div>
      <div className="boot-bar-wrap"><div className="boot-bar" /></div>
    </div>
  );
}