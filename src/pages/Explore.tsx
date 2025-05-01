
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Heart } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  popularFor: string[];
}

const destinations: Destination[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&auto=format&fit=crop",
    description: "The financial capital of India, home to Bollywood and iconic landmarks.",
    popularFor: ["Gateway of India", "Marine Drive", "Bollywood", "Street Food"]
  },
  {
    id: "delhi",
    name: "Delhi",
    country: "India",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop",
    description: "India's capital with a perfect blend of historical monuments and modern architecture.",
    popularFor: ["Red Fort", "India Gate", "Qutub Minar", "Chandni Chowk"]
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop",
    description: "Known as the Pink City, famous for its colorful buildings and royal history.",
    popularFor: ["Hawa Mahal", "Amber Fort", "City Palace", "Local Crafts"]
  },
  {
    id: "bangalore",
    name: "Bangalore",
    country: "India",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&auto=format&fit=crop",
    description: "India's Silicon Valley with pleasant weather, gardens, and a vibrant nightlife.",
    popularFor: ["Cubbon Park", "Lalbagh", "MG Road", "Tech Parks"]
  },
  {
    id: "goa",
    name: "Goa",
    country: "India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop",
    description: "Famous beach destination known for its Portuguese influence and relaxed vibes.",
    popularFor: ["Beaches", "Water Sports", "Nightlife", "Portuguese Architecture"]
  },
  {
    id: "varanasi",
    name: "Varanasi",
    country: "India", 
    image: "https://images.unsplash.com/photo-1561361058-c24ceccc5936?w=800&auto=format&fit=crop",
    description: "One of the oldest living cities in the world and a spiritual hub on the Ganges.",
    popularFor: ["Ganges Ghats", "Spiritual Experience", "Ancient Temples", "Boat Rides"]
  },
  {
    id: "agra",
    name: "Agra",
    country: "India",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop",
    description: "Home to the iconic Taj Mahal, one of the seven wonders of the world.",
    popularFor: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mughal Architecture"]
  },
  {
    id: "udaipur",
    name: "Udaipur",
    country: "India",
    image: "https://images.unsplash.com/photo-1599661046369-d39balvurpd?w=800&auto=format&fit=crop",
    description: "Known as the City of Lakes with beautiful palaces and romantic settings.",
    popularFor: ["Lake Palace", "City Palace", "Lake Pichola", "Vintage Car Museum"]
  }
];

export default function Explore() {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Amazing Destinations</h1>
        <p className="text-muted-foreground">
          Discover incredible places across India and plan your perfect trip
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 bg-white/70 hover:bg-white ${
                  favorites.includes(destination.id) ? 'text-red-500' : 'text-gray-500'
                }`}
                onClick={() => toggleFavorite(destination.id)}
              >
                <Heart className={favorites.includes(destination.id) ? 'fill-current' : ''} />
              </Button>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                <MapPin className="h-4 w-4" />
                <span>{destination.country}</span>
              </div>
              <h3 className="font-bold text-lg mb-1">{destination.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {destination.description}
              </p>
              <div className="mt-3">
                <div className="text-xs font-medium mb-1">Popular for:</div>
                <div className="flex flex-wrap gap-1">
                  {destination.popularFor.map((item, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-goginie-primary/10 text-goginie-primary text-xs rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
