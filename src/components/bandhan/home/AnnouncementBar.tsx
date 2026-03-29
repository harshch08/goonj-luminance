import { useEffect, useRef, useState } from 'react';

const messages = [
  "Dream Destination, Sweet Savings! 🌴 15% Off for Early Birds - Plan Your Dream Wedding Now!",
  "Love is in the Air... and on Sale! 💕 15% Off for Early Bookings - Your Dream Destination Wedding Awaits!",
];

// Theme colors: gold = hsl(43,96%,46%), brown = hsl(25,30%,25%), ivory = hsl(40,40%,97%)
export const AnnouncementBar = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, hsl(38,90%,38%) 0%, hsl(43,96%,46%) 25%, hsl(45,100%,52%) 50%, hsl(43,96%,46%) 75%, hsl(38,90%,38%) 100%)',
        height: '38px',
        borderBottom: '1px solid hsl(38,90%,32%)',
      }}
    >
      {/* Decorative side ornaments */}
      <span
        className="absolute left-4 select-none pointer-events-none hidden sm:block"
        style={{ color: 'hsl(25,30%,20%)', opacity: 0.4, fontSize: '14px', letterSpacing: '2px' }}
      >
        ✦ ✦
      </span>
      <span
        className="absolute right-4 select-none pointer-events-none hidden sm:block"
        style={{ color: 'hsl(25,30%,20%)', opacity: 0.4, fontSize: '14px', letterSpacing: '2px' }}
      >
        ✦ ✦
      </span>

      {/* Shimmer sweep */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
          animation: 'bandhan-shimmer 3.5s infinite linear',
        }}
      />

      <p
        className="font-bold text-xs sm:text-sm tracking-wide text-center px-12 select-none"
        style={{
          // White text on bright gold
          color: '#ffffff',
          textShadow: '0 1px 2px rgba(0,0,0,0.25)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(-6px)' : 'translateY(0)',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {messages[current]}
      </p>

      <style>{`
        @keyframes bandhan-shimmer {
          0%   { background-position: -300% 0; }
          100% { background-position: 300% 0; }
        }
      `}</style>
    </div>
  );
};
