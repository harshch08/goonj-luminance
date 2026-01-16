import { useEffect, useRef, useState } from 'react';
import flowerImg from '@/assets/bandhan/flower.png';
import './FloatingFlowers.css';

const FloatingFlowers = () => {
  const leftFlowerRef = useRef<HTMLDivElement>(null);
  const rightFlowerRef = useRef<HTMLDivElement>(null);
  const centerFlowerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Gradient fade zones
      const heroFadeStart = 200;
      const heroFadeEnd = 500;
      const footerFadeStart = documentHeight - windowHeight - 700;
      const footerFadeEnd = documentHeight - windowHeight - 400;
      
      let calculatedOpacity = 1;
      
      // Fade in from hero
      if (scrollY < heroFadeStart) {
        calculatedOpacity = 0;
      } else if (scrollY < heroFadeEnd) {
        calculatedOpacity = (scrollY - heroFadeStart) / (heroFadeEnd - heroFadeStart);
      }
      // Fade out to footer
      else if (scrollY > footerFadeEnd) {
        calculatedOpacity = 0;
      } else if (scrollY > footerFadeStart) {
        calculatedOpacity = 1 - (scrollY - footerFadeStart) / (footerFadeEnd - footerFadeStart);
      }
      
      setOpacity(calculatedOpacity);

      // Parallax with horizontal translation for side flowers
      const parallaxSpeedY = 0.3;
      const parallaxSpeedX = 0.15;

      if (leftFlowerRef.current) {
        leftFlowerRef.current.style.transform = `translateY(${scrollY * parallaxSpeedY}px) translateX(${scrollY * parallaxSpeedX}px) rotate(-8deg)`;
      }
      if (rightFlowerRef.current) {
        rightFlowerRef.current.style.transform = `translateY(${scrollY * parallaxSpeedY * 0.8}px) translateX(-${scrollY * parallaxSpeedX}px) rotate(6deg)`;
      }
      if (centerFlowerRef.current) {
        centerFlowerRef.current.style.transform = `translateY(${scrollY * parallaxSpeedY * 0.5}px) rotate(3deg)`;
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="floating-flowers-container"
      style={{ opacity }}
    >
      <div ref={leftFlowerRef} className="flower-left">
        <img src={flowerImg} alt="" />
      </div>
      <div ref={rightFlowerRef} className="flower-right">
        <img src={flowerImg} alt="" />
      </div>
      <div ref={centerFlowerRef} className="flower-center">
        <img src={flowerImg} alt="" />
      </div>
    </div>
  );
};

export default FloatingFlowers;
