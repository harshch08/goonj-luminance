import { Link } from "react-router-dom";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Palette, Camera, Utensils, Music } from "lucide-react";
import destinationWeddingImg from "@/assets/bandhan/wedding-decor.jpg";
import photographyImg from "@/assets/bandhan/destination-setup.jpg";
import cateringImg from "@/assets/bandhan/wedding-decor.jpg";
import stageSetupImg from "@/assets/bandhan/destination-setup.jpg";

const IntroSection = () => {
  const services = [
    {
      icon: Palette,
      image: destinationWeddingImg,
      title: "Destination Weddings",
      description: "Create unforgettable experiences in breathtaking locations worldwide",
      link: "/services/destination-weddings",
    },
    {
      icon: Utensils,
      image: cateringImg,
      title: "Catering & Decor",
      description: "Exquisite cuisine and stunning aesthetics for your event",
      link: "/services/catering",
    },
    {
      icon: Camera,
      image: photographyImg,
      title: "Photography",
      description: "Capture every precious moment with professional artistry",
      link: "/services/photography",
    },
    {
      icon: Music,
      image: stageSetupImg,
      title: "Stage Setup & Lighting / Sound",
      description: "State-of-the-art audio-visual production",
      link: "/services/stage-setup",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Your Dream Wedding Begins Here
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              At Bandhan by Cardinal Revolution, we transform your vision into reality. 
              From intimate ceremonies to grand destination celebrations, we craft every 
              moment with meticulous attention to detail and heartfelt passion.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link 
                key={service.title}
                to={service.link}
                className="block group"
              >
                <Card 
                  className="shadow-soft hover:shadow-elegant transition-all duration-500 animate-fade-in-up border-0 cursor-pointer overflow-hidden relative rounded-3xl h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-80 overflow-hidden">
                    {/* Background Image */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-5 right-5">
                      <div className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="text-accent" size={20} />
                      </div>
                    </div>

                    {/* Content at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <CardTitle className="text-xl font-heading text-white drop-shadow-lg leading-tight mb-2">
                        {service.title}
                      </CardTitle>
                      
                      <CardDescription className="text-sm leading-relaxed text-white/85 drop-shadow-md mb-3 line-clamp-2">
                        {service.description}
                      </CardDescription>

                      {/* CTA Link */}
                      <div className="flex items-center text-accent font-semibold text-xs group-hover:gap-1.5 transition-all duration-300">
                        <span className="drop-shadow-md">Explore Service</span>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300 drop-shadow-md">→</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

