import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya & Rahul",
    role: "Destination Wedding",
    content: "Bandhan made our dream wedding come true! Every detail was perfect, from the venue to the smallest decoration. Highly recommended!",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Ananya Sharma",
    role: "College Fest Organizer",
    content: "The team handled our college fest with such professionalism. The event was a huge success and everyone loved it!",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Vikram Industries",
    role: "Corporate Event",
    content: "Outstanding service for our annual corporate event. Everything was seamless and our clients were thoroughly impressed.",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "St. Mary's School",
    role: "School Annual Day",
    content: "Bandhan transformed our annual day into a spectacular event. The kids and parents were absolutely delighted!",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Meera & Arjun",
    role: "Wedding Planning",
    content: "From start to finish, the experience was magical. They understood our vision and brought it to life beautifully.",
    image: "/placeholder.svg",
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 50);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 50);
  };

  const getCardPosition = (index: number) => {
    const diff = (index - currentIndex + testimonials.length) % testimonials.length;
    
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(testimonials.length - 1)) return "right";
    if (diff === testimonials.length - 1 || diff === -1) return "left";
    if (diff < testimonials.length / 2) return "far-right";
    return "far-left";
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-4">
            What Our Clients Say
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from couples and organizations who trusted us with their special moments
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div 
          className="relative h-[400px] md:h-[350px] flex items-center justify-center"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {testimonials.map((testimonial, index) => {
              const position = getCardPosition(index);
              
              let transformClass = "";
              let opacityClass = "";
              let zIndexClass = "";
              let pointerEvents = "pointer-events-none";

              switch (position) {
                case "center":
                  transformClass = "translate-x-0 scale-100";
                  opacityClass = "opacity-100";
                  zIndexClass = "z-30";
                  pointerEvents = "pointer-events-auto";
                  break;
                case "left":
                  transformClass = "-translate-x-[280px] md:-translate-x-[380px] scale-75";
                  opacityClass = "opacity-40";
                  zIndexClass = "z-20";
                  pointerEvents = "pointer-events-auto";
                  break;
                case "right":
                  transformClass = "translate-x-[280px] md:translate-x-[380px] scale-75";
                  opacityClass = "opacity-40";
                  zIndexClass = "z-20";
                  pointerEvents = "pointer-events-auto";
                  break;
                case "far-left":
                  transformClass = "-translate-x-[600px] scale-50";
                  opacityClass = "opacity-0";
                  zIndexClass = "z-0";
                  break;
                case "far-right":
                  transformClass = "translate-x-[600px] scale-50";
                  opacityClass = "opacity-0";
                  zIndexClass = "z-0";
                  break;
              }

              return (
                <Card
                  key={testimonial.id}
                  className={`absolute transition-all duration-700 ease-out cursor-pointer ${transformClass} ${opacityClass} ${zIndexClass} ${pointerEvents} w-[280px] md:w-[400px] bg-card/95 backdrop-blur-sm border-accent/20 ${
                    position === "center" ? "shadow-elegant" : "shadow-soft"
                  }`}
                  onClick={() => {
                    if (position === "left") {
                      handlePrev();
                    } else if (position === "right") {
                      handleNext();
                    }
                  }}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Quote Icon */}
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <Quote className="w-6 h-6 text-accent" />
                      </div>

                      {/* Testimonial Content */}
                      <p className="text-foreground/90 text-sm md:text-base leading-relaxed italic">
                        "{testimonial.content}"
                      </p>

                      {/* Divider */}
                      <div className="w-16 h-0.5 bg-accent/30"></div>

                      {/* Author Info */}
                      <div className="space-y-1">
                        <h4 className="font-heading font-semibold text-foreground text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 50);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-accent"
                  : "w-2 h-2 bg-accent/30 hover:bg-accent/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

