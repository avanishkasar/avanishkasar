import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simple counter animation
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 800);
      }
      setCount(current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`preloader ${done ? 'done' : ''}`} id="preloader">
      <div className="preloader-inner">
        <div className="preloader-text">
          {['A', 'V', 'A', 'N', 'I', 'S', 'H'].map((letter, i) => (
            <span key={i} className="preloader-letter">{letter}</span>
          ))}
        </div>
        <div className="preloader-line"></div>
        <div className="preloader-counter">{count}</div>
      </div>
    </div>
  );
}
