import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CuisineStations.css';

interface CuisineStation {
  title: string;
  image: string;
  items: string[];
  accompaniments?: string[];
}

const cuisineStations: CuisineStation[] = [
  {
    title: "Lebanese Station",
    image: "/api/placeholder/600/400",
    items: [
      "Falafel Pita Pockets",
      "Cottage Cheese Shawarma",
      "Classical Chicken Shawarma"
    ],
    accompaniments: [
      "Classical Hummus",
      "Beetroot Hummus",
      "Baba Ganoush",
      "Muhammara",
      "Tzatziki",
      "Salad"
    ]
  },
  {
    title: "Burrata Bar",
    image: "/api/placeholder/600/400",
    items: [
      "Focaccia with Mushroom and Burrata",
      "Tomato Pomegranate Burrata Salad",
      "Burrata-Strawberry and Quinoa Salad",
      "Imported Italian Burrata with Various Accompaniments"
    ],
    accompaniments: [
      "Strawberry Compote",
      "Onion Compote",
      "Pesto Sauce",
      "Chilly",
      "Roasted Cherry"
    ]
  },
  {
    title: "Woodfired Pizza",
    image: "/api/placeholder/600/400",
    items: [
      "New York and Neapolitan Style Pizza",
      "Handmade Margherita de Pesto",
      "Choice of Spring Toppings",
      "Truffle Mushroom Pizza",
      "Pepper Salami Double Pepperoni & Sausage",
      "Pepper Salami Double Pepperoni & Sausage Mushroom"
    ]
  },
  {
    title: "Teppanyaki",
    image: "/api/placeholder/600/400",
    items: [
      "Spicy Greens & Asparagus in Lemongrass and Hot Basil Sauce",
      "Silken Tofu-Mushroom in Hot Coriander Sauce",
      "Teppanyaki Greens",
      "Chilli Udon",
      "Teppanyaki Shredded Chicken with Korean Sauce",
      "Teriyaki Chicken"
    ]
  },
  {
    title: "Dimsum Station",
    image: "/api/placeholder/600/400",
    items: [
      "Wild Mushroom and Basil Dimsum",
      "Black Pepper Crushed Water Chestnut Dimsum",
      "Exotic Vegetable Dimsum Beetroot Dimsum",
      "Chives and Chicken Dimsum",
      "Prawns Hargow"
    ],
    accompaniments: [
      "Served with Chilli Oil",
      "Sesame Tomato",
      "Scallion Sauce"
    ]
  },
  {
    title: "Amsterdam Station",
    image: "/api/placeholder/600/400",
    items: [
      "Hot Dog",
      "Veg Corn Cheese Hot Dog",
      "Chicken Sausage Hot Dog",
      "Fries",
      "Peri Peri Fries",
      "Potato Wedges"
    ],
    accompaniments: [
      "Cottage Cheese Cubes",
      "Truffle Sauce",
      "Peri Peri Sauce"
    ]
  },
  {
    title: "Sushi Station",
    image: "/api/placeholder/600/400",
    items: [
      "Asparagus Cream Cheese Maki Carrot, Radish, Cucumber Roll",
      "Red and Green Pepper Nigiri",
      "Spicy Avocado Roll",
      "Dragon Chicken",
      "Tempura Crispy Prawn Roll/Norwegian Smoked Salmon"
    ],
    accompaniments: [
      "Teriyaki Sauce",
      "Soya Sauce",
      "Gari"
    ]
  },
  {
    title: "Mexican Station",
    image: "/api/placeholder/600/400",
    items: [
      "Crispy Corn Easy Veggie Tacos",
      "Mushroom & Cheese Quesadillas",
      "Guacamole Chicken Tacos",
      "Cajun Spice Chicken Quesadillas"
    ],
    accompaniments: [
      "Salsa (Watermelon/Pineapple/Tomato)"
    ]
  },
  {
    title: "Continental",
    image: "/api/placeholder/600/400",
    items: [
      "Exotic Veg Giardiniera",
      "Grilled Pineapple in BBQ Sauce",
      "Grilled Mushroom in Pesto Sauce",
      "Orange Glaze Sesame Chicken",
      "Thai Chilli Chicken/Grilled Chicken Breast",
      "Grilled Fish Fillet/Grilled Butter Sauce"
    ]
  },
  {
    title: "Avocado Bar",
    image: "/api/placeholder/600/400",
    items: [
      "Avocado Cream Cheese and Roasted Pumpkin Seed Bruschette",
      "Sliced Avocado with Tangy Sauce",
      "Avocado, Cranberry, Walnut Salad",
      "Stuffed Greek Avocado with Lemon Dressing",
      "Chicken Bruschette with Guacamole",
      "Stuffed Avocado with Flavoured Chicken"
    ]
  },
  {
    title: "Gourmet Pasta",
    image: "/api/placeholder/600/400",
    items: [
      "Handmade Pasta",
      "Truffle Scented Wild Mushroom Ravioli (in Porcini Sauce)",
      "Garlic Boursin with Shiitake Mushroom and Chicken Tortellini (in Pomodoro Sauce)",
      "Variety of Pastas (Spaghetti)"
    ]
  },
  {
    title: "Korean Station",
    image: "/api/placeholder/600/400",
    items: [
      "Korean Easy Fusion Rice",
      "Korean Fried Rice",
      "Korean Fried BBQ Chicken Rice Balls",
      "Korean Style Chicken Wrap",
      "Bibimbap",
      "Kimchi Chicken"
    ],
    accompaniments: [
      "Korean Sauce",
      "Spring Onion Pickle"
    ]
  }
];

const CuisineStations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalCards = cuisineStations.length;
  const maxIndex = totalCards - cardsPerView;

  // Handle responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCardsPerView(1);
      } else if (window.innerWidth <= 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset to first card when cards per view changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [cardsPerView]);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary tracking-tight mb-4">
              International Cuisine Stations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated culinary experiences from around the world, crafted with premium ingredients
            </p>
          </div>

          {/* Cuisine Slider */}
          <div className="cuisine-slider-container">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`slider-nav slider-nav-left ${!canGoPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Previous card"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`slider-nav slider-nav-right ${!canGoNext ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Next card"
            >
              <ChevronRight size={32} />
            </button>

            {/* Slider Track */}
            <div className="slider-track-wrapper" ref={sliderRef}>
              <div
                className="slider-track"
                style={{
                  transform: `translateX(calc(-${currentIndex} * (100% / ${cardsPerView} + 32px)))`,
                }}
              >
                {cuisineStations.map((station) => (
                  <div
                    key={station.title}
                    className="cuisine-card-slide"
                  >
                    {/* Torn Paper Card */}
                    <div className="cuisine-card group h-full">
                      <div className="relative bg-white rounded-sm shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 h-full flex flex-col">
                        {/* Decorative corner flower */}
                        <div className="absolute top-3 right-3 w-8 h-8 opacity-40 z-10">
                          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="8" fill="#D4AF37" opacity="0.5" />
                            <circle cx="20" cy="20" r="4" fill="#D4AF37" opacity="0.7" />
                          </svg>
                        </div>

                        {/* Image with torn edge effect */}
                        <div className="relative h-56 overflow-hidden torn-edge">
                          <img
                            src={station.image}
                            alt={station.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          {/* Title */}
                          <h3 className="text-2xl font-heading font-bold text-accent mb-4 tracking-wide">
                            {station.title}
                          </h3>

                          {/* Menu Items */}
                          <div className="space-y-2 mb-4 flex-1">
                            {station.items.map((item, idx) => (
                              <p key={idx} className="text-sm text-foreground/80 leading-relaxed">
                                {item}
                              </p>
                            ))}
                          </div>

                          {/* Accompaniments */}
                          {station.accompaniments && (
                            <div className="mt-4 pt-4 border-t border-accent/20">
                              <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">
                                Accompaniments
                              </p>
                              <div className="space-y-1">
                                {station.accompaniments.map((acc, idx) => (
                                  <p key={idx} className="text-xs text-foreground/70 italic">
                                    {acc}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Dots */}
            <div className="slider-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`slider-dot ${currentIndex === index ? 'active' : ''}`}
                  aria-label={`Go to position ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuisineStations;
