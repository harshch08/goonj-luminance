const FloralDecor = () => {
  return (
    <div className="absolute bottom-8 left-8 opacity-60 pointer-events-none">
      <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Decorative floral element */}
        <circle cx="25" cy="25" r="15" fill="#D4AF37" opacity="0.3" />
        <circle cx="25" cy="25" r="8" fill="#D4AF37" opacity="0.5" />
        <path d="M25 40 L25 95" stroke="#8B7355" strokeWidth="2" />
        <ellipse cx="35" cy="70" rx="8" ry="12" fill="#D4AF37" opacity="0.2" transform="rotate(20 35 70)" />
        <ellipse cx="15" cy="75" rx="8" ry="12" fill="#D4AF37" opacity="0.2" transform="rotate(-20 15 75)" />
        <ellipse cx="30" cy="85" rx="6" ry="10" fill="#D4AF37" opacity="0.2" transform="rotate(10 30 85)" />
      </svg>
    </div>
  );
};

export default FloralDecor;
