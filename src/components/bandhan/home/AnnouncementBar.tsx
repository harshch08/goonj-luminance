import { useEffect, useRef, useState } from 'react';

const messages = [
  "Dream Destination, Sweet Savings! 🌴 15% Off for Early Birds - Plan Your Dream Wedding Now!",
  "Love is in the Air... and on Sale! 💕 15% Off for Early Bookings - Your Dream Destination Wedding Awaits!",
];

export const AnnouncementBar = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastScrollY.current || y < 10);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % messages.length);
        setAnimating(false);
      }, 400);
    }, 3500);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current]);

  const barStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, hsl(38,90%,38%) 0%, hsl(43,96%,46%) 25%, hsl(45,100%,52%) 50%, hsl(43,96%,46%) 75%, hsl(38,90%,38%) 100%)',
    height: '38px',
    borderBottom: '1px solid hsl(38,90%,32%)',
  };

  const textStyle: React.CSSProperties = {
    color: '#ffffff',
    textShadow: '0 1px 2px rgba(0,0,0,0.25)',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center overflow-hidden"
      style={{
        ...barStyle,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Shimmer sweep */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
          animation: 'bandhan-shimmer 3.5s infinite linear',
        }}
      />

      {/* Mobile: marquee ticker */}
      <div className="sm:hidden w-full overflow-hidden">
        <div style={{ animation: 'bandhan-ticker 18s linear infinite', display: 'inline-flex', gap: '4rem' }}>
          {/* Duplicate for seamless loop */}
          {[...messages, ...messages].map((msg, i) => (
            <span key={i} style={textStyle}>✦ {msg}</span>
          ))}
        </div>
      </div>

      {/* Desktop: fade-swap */}
      <div className="hidden sm:flex w-full items-center justify-center px-12 relative">
        <span
          className="absolute left-4 select-none pointer-events-none"
          style={{ color: 'hsl(25,30%,20%)', opacity: 0.4, fontSize: '14px', letterSpacing: '2px' }}
        >
          ✦ ✦
        </span>
        <span
          className="absolute right-4 select-none pointer-events-none"
          style={{ color: 'hsl(25,30%,20%)', opacity: 0.4, fontSize: '14px', letterSpacing: '2px' }}
        >
          ✦ ✦
        </span>
        <p
          style={{
            ...textStyle,
            fontSize: '0.875rem',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(-6px)' : 'translateY(0)',
          }}
        >
          {messages[current]}
        </p>
      </div>

      <style>{`
        @keyframes bandhan-shimmer {
          0%   { background-position: -300% 0; }
          100% { background-position: 300% 0; }
        }
        @keyframes bandhan-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
