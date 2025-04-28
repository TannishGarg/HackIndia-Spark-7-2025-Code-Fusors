
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Compass,
  MapPin, 
  Hotel, 
  Map, 
  Plane, 
  Calendar, 
  Utensils, 
  Star, 
  Globe,
  ArrowRight, 
  CheckCircle, 
  UserCheck, 
  Camera, 
  LayoutGrid
} from "lucide-react";

// Popular destinations
const popularDestinations = [
  {
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    description: "The City of Light awaits with iconic landmarks and charming cafés."
  },
  {
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop",
    description: "Experience the perfect blend of tradition and futuristic innovation."
  },
  {
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2074&auto=format&fit=crop",
    description: "White-washed buildings and breathtaking sunsets over the Aegean Sea."
  },
  {
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    description: "The Big Apple offers world-class dining, shopping, and entertainment."
  }
];

// Features
const features = [
  {
    icon: <Globe className="h-8 w-8 text-goginie-primary" />,
    title: "AI-Powered Trip Planning",
    description: "Our advanced AI creates personalized itineraries based on your preferences and interests."
  },
  {
    icon: <Hotel className="h-8 w-8 text-goginie-primary" />,
    title: "Hotel Recommendations",
    description: "Find the perfect place to stay with our curated selection of accommodations."
  },
  {
    icon: <Utensils className="h-8 w-8 text-goginie-primary" />,
    title: "Food & Dining Suggestions",
    description: "Discover local cuisines and top-rated restaurants tailored to your dietary preferences."
  },
  {
    icon: <Map className="h-8 w-8 text-goginie-primary" />,
    title: "Interactive Maps",
    description: "Visualize your entire trip with interactive maps showing all your planned destinations."
  },
  {
    icon: <Plane className="h-8 w-8 text-goginie-primary" />,
    title: "Transportation Planning",
    description: "Get recommendations for flights, trains, and local transportation options."
  },
  {
    icon: <Camera className="h-8 w-8 text-goginie-primary" />,
    title: "Activity Suggestions",
    description: "Explore must-see attractions and hidden gems based on your interests."
  }
];

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    quote: "GoGinie made planning my trip to Japan effortless! The AI recommendations were spot on and saved me hours of research."
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    quote: "I was amazed by how accurately the app predicted my travel preferences. Our family vacation to Greece was perfectly planned."
  },
  {
    name: "Olivia Garcia",
    location: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    quote: "The restaurant recommendations were incredible! As a foodie, I appreciated discovering authentic local cuisines I wouldn't have found otherwise."
  }
];

export default function Index() {
  const [destination, setDestination] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[650px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-goginie-dark/80 to-goginie-dark/40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="animate-fade-in">
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full border border-goginie-primary bg-goginie-primary/10 px-3 py-1 text-sm text-white">
                  <span className="mr-1">✨</span> AI-Powered Travel Planning
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Your Dream Vacation, <span className="text-goginie-primary">Planned</span> by AI
              </h1>
              
              <p className="text-xl text-white mb-8 opacity-90">
                Experience the future of travel planning with GoGinie. Our AI creates personalized itineraries, suggests hotels, restaurants, and activities based on your preferences.
              </p>
              
              <div className="bg-white p-4 rounded-xl shadow-lg max-w-lg animate-scale-in">
                <form className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="Where do you want to go?" 
                      className="pl-10"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  <Link to="/plan-trip">
                    <Button className="w-full md:w-auto bg-goginie-primary hover:bg-goginie-secondary">
                      Plan Trip <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </form>
              </div>
              
              <div className="flex items-center mt-8 gap-6">
                <div className="flex">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white overflow-hidden">
                        <img 
                          src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} 
                          alt="User avatar" 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-white text-sm">
                  Trusted by <span className="font-bold">10,000+</span> happy travelers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore some of our most popular travel destinations, complete with AI-generated itineraries and recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <Link to="/plan-trip" key={index}>
                <Card className="overflow-hidden hover:shadow-lg transition-all group h-full">
                  <div className="relative h-48">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-semibold text-lg">{destination.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{destination.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                      </div>
                      <span className="text-xs text-muted-foreground">1000+ trips planned</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/explore">
              <Button variant="outline" className="gap-2">
                Explore More Destinations <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How GoGinie Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes trip planning effortless, personalized, and fun.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-goginie-soft-purple flex items-center justify-center mb-4">
                <LayoutGrid className="h-8 w-8 text-goginie-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Share Your Preferences</h3>
              <p className="text-muted-foreground">
                Tell us your destination, dates, budget, and interests to help our AI understand your travel style.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-goginie-soft-purple flex items-center justify-center mb-4">
                <Compass className="h-8 w-8 text-goginie-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Get Your Personalized Plan</h3>
              <p className="text-muted-foreground">
                Our AI generates a custom itinerary with activities, accommodations, and dining recommendations.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-goginie-soft-purple flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-goginie-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Enjoy Your Trip</h3>
              <p className="text-muted-foreground">
                Access your itinerary anytime, make adjustments on the go, and create memories that last a lifetime.
              </p>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link to="/plan-trip">
              <Button className="bg-goginie-primary hover:bg-goginie-secondary flex items-center gap-2">
                Start Planning Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-gradient-to-br from-goginie-soft-purple to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to plan the perfect trip, all in one platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow h-full">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from travelers who have planned unforgettable journeys with GoGinie.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-goginie-primary opacity-70" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 8v6c0 3.314-2.686 6-6 6h-2c-1.105 0-2 .895-2 2 0 1.105.895 2 2 2h2c5.523 0 10-4.477 10-10v-6c0-1.105-.895-2-2-2s-2 .895-2 2zM22 8v6c0 3.314-2.686 6-6 6h-2c-1.105 0-2 .895-2 2 0 1.105.895 2 2 2h2c5.523 0 10-4.477 10-10v-6c0-1.105-.895-2-2-2s-2 .895-2 2z"></path>
                    </svg>
                  </div>
                  <p className="mb-6 flex-grow text-muted-foreground">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-goginie-dark relative">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Plan Your Next Adventure?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of happy travelers who have experienced the future of travel planning with GoGinie's AI-powered platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-goginie-primary hover:bg-goginie-secondary text-white w-full sm:w-auto">
                  <UserCheck className="mr-2 h-4 w-4" /> Create Free Account
                </Button>
              </Link>
              <Link to="/plan-trip">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-goginie-dark w-full sm:w-auto">
                  <Compass className="mr-2 h-4 w-4" /> Try Demo
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80 text-sm">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-goginie-primary" /> No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-goginie-primary" /> 14-day free trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-goginie-primary" /> Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
