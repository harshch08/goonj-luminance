import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div key={current} className="absolute inset-0" initial={{ x: "100%", opacity: 0.8 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0.8 }} transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <img src={slides[current].src} alt={slides[current].label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div key={current} className="max-w-4xl mx-auto" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.7, ease: "easeInOut" }}>
            <div className="inline-block mb-5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-xs uppercase tracking-widest font-semibold">{slides[current].label}</div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-5 leading-tight">{slides[current].heading[0]}<br />{slides[current].heading[1]}</h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 font-body max-w-2xl mx-auto leading-relaxed">{slides[current].sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg shadow-elegant" onClick={() => navigate(slides[current].href)}>Explore Services<ArrowRight className="ml-2" size={20} /></Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm px-8 py-6 text-lg" onClick={() => navigate("/bandhan/gallery")}>View Our Work</Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={"rounded-full transition-all duration-300 " + (i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/40 hover:bg-white/70")} />))}
      </div>

    </section>
  );
};

export default HeroSection;
