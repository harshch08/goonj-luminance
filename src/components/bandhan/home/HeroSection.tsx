import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const slides = [
  { src: "/gallery/Destination-Wedding/Dest Wedding.jpeg", label: "Destination Weddings", heading: ["Where Love Meets", "Breathtaking Horizons"], sub: "Riverside ceremonies, mountain retreats, and resort celebrations crafted just for you", href: "/bandhan/destination-weddings" },
  { src: "/gallery/Wedding/sangeet-decor.png", label: "Catering & Decor", heading: ["Every Detail,", "Perfectly Adorned"], sub: "World-class cuisine and breathtaking decor that transform your venue into a dream", href: "/bandhan/catering" },
  { src: "/gallery/Photography&Videography/photographybanner.jpg", label: "Photography & Videography", heading: ["Moments Frozen", "In Time, Forever"], sub: "Cinematic films and candid portraits that tell your love story beautifully", href: "/bandhan/photography" },
  { src: "/gallery/stage&sound/stagebanner.jpg", label: "Stage Setup & Sound", heading: ["The Stage Is Set", "For Your Story"], sub: "Professional lighting, sound, and stage design that set the perfect ambiance", href: "/bandhan/stage-setup" },
  { src: "/gallery/Corporate/corporate-1.jpg", label: "Corporate Events", heading: ["Elevating Every", "Professional Gathering"], sub: "From conferences to galas, seamless execution that reflects your brand prestige", href: "/bandhan/corporate-events" },
  { src: "/gallery/Wedding/haldi-concept.png", label: "Haldi, Mehendi & Sangeet", heading: ["Celebrate Every", "Ritual With Joy"], sub: "Sangeet, Mehendi, Anchoring, Fireworks and more, all under one roof", href: "/bandhan/other-services" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-end sm:items-center justify-center overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div key={current} className="absolute inset-0" initial={{ x: "100%", opacity: 0.8 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0.8 }} transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <img src={slides[current].src} alt={slides[current].label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full px-5 pb-16 sm:pb-0 sm:container sm:mx-auto sm:px-4 sm:text-center">
        <AnimatePresence mode="wait">
          <motion.div key={current} className="sm:max-w-4xl sm:mx-auto" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.7, ease: "easeInOut" }}>

            {/* Label pill */}
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
              {slides[current].label}
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-3 sm:mb-5 leading-tight">
              {slides[current].heading[0]}<br />{slides[current].heading[1]}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-10 font-body max-w-xs sm:max-w-2xl sm:mx-auto leading-relaxed">
              {slides[current].sub}
            </p>

            {/* Buttons — row on mobile, row centered on desktop */}
            <div className="flex flex-row gap-3 sm:gap-4 sm:justify-center">
              <button
                onClick={() => navigate(slides[current].href)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary font-semibold px-5 py-3 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-lg shadow-lg transition-all duration-200"
              >
                Explore <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/bandhan/gallery")}
                className="flex-1 sm:flex-none flex items-center justify-center bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm px-5 py-3 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-lg font-medium transition-all duration-200"
              >
                Our Work
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 sm:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={"rounded-full transition-all duration-300 " + (i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/40 hover:bg-white/70")} />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
