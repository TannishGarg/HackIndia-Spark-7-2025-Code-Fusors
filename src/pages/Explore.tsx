
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Heart, Search, Compass, Utensils, Hotel, Star } from "lucide-react";
import { Map } from "@/components";

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  popularFor: string[];
  rating: number;
}

const destinations: Destination[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&auto=format&fit=crop",
    description: "The financial capital of India, home to Bollywood and iconic landmarks.",
    popularFor: ["Gateway of India", "Marine Drive", "Bollywood", "Street Food"],
    rating: 4.8
  },
  {
    id: "delhi",
    name: "Delhi",
    country: "India",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop",
    description: "India's capital with a perfect blend of historical monuments and modern architecture.",
    popularFor: ["Red Fort", "India Gate", "Qutub Minar", "Chandni Chowk"],
    rating: 4.9
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop",
    description: "Known as the Pink City, famous for its colorful buildings and royal history.",
    popularFor: ["Hawa Mahal", "Amber Fort", "City Palace", "Local Crafts"],
    rating: 4.7
  },
  {
    id: "bangalore",
    name: "Bangalore",
    country: "India",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&auto=format&fit=crop",
    description: "India's Silicon Valley with pleasant weather, gardens, and a vibrant nightlife.",
    popularFor: ["Cubbon Park", "Lalbagh", "MG Road", "Tech Parks"],
    rating: 4.6
  },
  {
    id: "goa",
    name: "Goa",
    country: "India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop",
    description: "Famous beach destination known for its Portuguese influence and relaxed vibes.",
    popularFor: ["Beaches", "Water Sports", "Nightlife", "Portuguese Architecture"],
    rating: 4.8
  },
  {
    id: "varanasi",
    name: "Varanasi",
    country: "India", 
    image: "https://images.unsplash.com/photo-1561361058-c24ceccc5936?w=800&auto=format&fit=crop",
    description: "One of the oldest living cities in the world and a spiritual hub on the Ganges.",
    popularFor: ["Ganges Ghats", "Spiritual Experience", "Ancient Temples", "Boat Rides"],
    rating: 4.7
  },
  {
    id: "agra",
    name: "Agra",
    country: "India",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop",
    description: "Home to the iconic Taj Mahal, one of the seven wonders of the world.",
    popularFor: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mughal Architecture"],
    rating: 4.9
  },
  {
    id: "udaipur",
    name: "Udaipur",
    country: "India",
    image: "https://images.unsplash.com/photo-1599661046369-d39balvurpd?w=800&auto=format&fit=crop",
    description: "Known as the City of Lakes with beautiful palaces and romantic settings.",
    popularFor: ["Lake Palace", "City Palace", "Lake Pichola", "Vintage Car Museum"],
    rating: 4.8
  }
];

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  image: string;
}

interface Restaurant {
  id: string;
  name: string;
  location: string;
  cuisine: string;
  rating: number;
  image: string;
}

export default function Explore() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"destinations" | "hotels" | "restaurants">("destinations");
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  useEffect(() => {
    // If a destination is selected, fetch hotels and restaurants for that destination
    if (selectedDestination) {
      fetchHotels(selectedDestination);
      fetchRestaurants(selectedDestination);
    }
  }, [selectedDestination]);

  const fetchHotels = async (destination: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to a real service
      // For now, we'll simulate the API response with sample data
      const mockHotels: Hotel[] = [
        {
          id: `hotel-${destination}-1`,
          name: "Grand Palace Hotel",
          location: destination,
          price: "$150/night",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop"
        },
        {
          id: `hotel-${destination}-2`,
          name: "Riverside Resort",
          location: destination,
          price: "$120/night",
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop"
        },
        {
          id: `hotel-${destination}-3`,
          name: "City Center Suites",
          location: destination,
          price: "$200/night",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop"
        },
        {
          id: `hotel-${destination}-4`,
          name: "Heritage Inn",
          location: destination,
          price: "$90/night",
          rating: 4.2,
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop"
        }
      ];
      
      // Simulate API delay
      setTimeout(() => {
        setHotels(mockHotels);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setIsLoading(false);
    }
  };

  const fetchRestaurants = async (destination: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to a real service
      // For now, we'll simulate the API response with sample data
      const mockRestaurants: Restaurant[] = [
        {
          id: `restaurant-${destination}-1`,
          name: "Spice Garden",
          location: destination,
          cuisine: "Indian",
          rating: 4.6,
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop"
        },
        {
          id: `restaurant-${destination}-2`,
          name: "Ocean Blue",
          location: destination,
          cuisine: "Seafood",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop"
        },
        {
          id: `restaurant-${destination}-3`,
          name: "The Greens",
          location: destination,
          cuisine: "Vegetarian",
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop"
        },
        {
          id: `restaurant-${destination}-4`,
          name: "Fire & Ice",
          location: destination,
          cuisine: "Italian",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop"
        }
      ];
      
      // Simulate API delay
      setTimeout(() => {
        setRestaurants(mockRestaurants);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setIsLoading(false);
    }
  };

  const handleDestinationClick = (id: string) => {
    setSelectedDestination(id);
    setActiveTab("hotels"); // Switch to hotels tab when a destination is selected
  };

  const filteredDestinations = destinations.filter(destination => 
    destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-12">
      {/* Hero Banner */}
      <div className="relative h-[400px] bg-gray-700 mb-6">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=2021&auto=format&fit=crop" 
          alt="Explore destinations"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Explore Amazing Destinations</h1>
          <p className="text-xl mb-8 text-center">Discover beautiful places and unforgettable experiences</p>
          
          <div className="w-full max-w-md relative">
            <Input 
              type="text" 
              placeholder="Search destinations, experiences, activities..."
              className="pl-10 bg-white/90 text-gray-800 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className="flex mb-8 bg-gray-100 rounded-lg p-1 max-w-md mx-auto">
          <button 
            className={`flex items-center gap-2 py-2 px-4 rounded-md flex-1 justify-center ${activeTab === "destinations" ? "bg-white shadow-sm" : ""}`}
            onClick={() => setActiveTab("destinations")}
          >
            <MapPin className="h-4 w-4" />
            <span>Destinations</span>
          </button>
          <button 
            className={`flex items-center gap-2 py-2 px-4 rounded-md flex-1 justify-center ${activeTab === "hotels" ? "bg-white shadow-sm" : ""}`}
            onClick={() => setActiveTab("hotels")}
            disabled={!selectedDestination}
          >
            <Hotel className="h-4 w-4" />
            <span>Hotels</span>
          </button>
          <button 
            className={`flex items-center gap-2 py-2 px-4 rounded-md flex-1 justify-center ${activeTab === "restaurants" ? "bg-white shadow-sm" : ""}`}
            onClick={() => setActiveTab("restaurants")}
            disabled={!selectedDestination}
          >
            <Utensils className="h-4 w-4" />
            <span>Restaurants</span>
          </button>
        </div>

        {/* Selected destination info */}
        {selectedDestination && (
          <div className="mb-8">
            {destinations.filter(d => d.id === selectedDestination).map(destination => (
              <div key={destination.id} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h2 className="text-3xl font-bold mb-2">{destination.name}, {destination.country}</h2>
                  <p className="mb-4 text-muted-foreground">{destination.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{destination.rating}</span>
                  </div>

                  <h3 className="font-semibold mb-2">Popular For:</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {destination.popularFor.map((item, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-goginie-primary/10 text-goginie-primary text-sm rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <Map startLocation="" destination={destination.name} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Destinations Grid */}
        {activeTab === "destinations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden group cursor-pointer" onClick={() => handleDestinationClick(destination.id)}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`bg-white/70 hover:bg-white ${
                        favorites.includes(destination.id) ? 'text-red-500' : 'text-gray-500'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(destination.id);
                      }}
                    >
                      <Heart className={favorites.includes(destination.id) ? 'fill-current' : ''} />
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-md flex items-center">
                    <Star className="h-3 w-3 fill-current mr-1" /> 
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{destination.country}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{destination.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {destination.description}
                  </p>
                  <div className="mt-3">
                    <div className="text-xs font-medium mb-1">Popular for:</div>
                    <div className="flex flex-wrap gap-1">
                      {destination.popularFor.slice(0, 3).map((item, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-goginie-primary/10 text-goginie-primary text-xs rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                      {destination.popularFor.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                          +{destination.popularFor.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Hotels Grid */}
        {activeTab === "hotels" && (
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-goginie-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {hotels.map((hotel) => (
                  <Card key={hotel.id} className="overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`bg-white/70 hover:bg-white ${
                            favorites.includes(hotel.id) ? 'text-red-500' : 'text-gray-500'
                          }`}
                          onClick={() => toggleFavorite(hotel.id)}
                        >
                          <Heart className={favorites.includes(hotel.id) ? 'fill-current' : ''} />
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-md flex items-center">
                        <Star className="h-3 w-3 fill-current mr-1" /> 
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{hotel.location}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-goginie-primary">{hotel.price}</span>
                        <Button size="sm" className="bg-goginie-primary hover:bg-goginie-secondary text-white">
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Restaurants Grid */}
        {activeTab === "restaurants" && (
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-goginie-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`bg-white/70 hover:bg-white ${
                            favorites.includes(restaurant.id) ? 'text-red-500' : 'text-gray-500'
                          }`}
                          onClick={() => toggleFavorite(restaurant.id)}
                        >
                          <Heart className={favorites.includes(restaurant.id) ? 'fill-current' : ''} />
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-md flex items-center">
                        <Star className="h-3 w-3 fill-current mr-1" /> 
                        <span className="text-sm font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{restaurant.location}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        Cuisine: <span className="text-goginie-primary">{restaurant.cuisine}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium"></span>
                        <Button size="sm" className="bg-goginie-primary hover:bg-goginie-secondary text-white">
                          View Menu
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* No results */}
        {activeTab === "destinations" && filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <Compass className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
            <p className="text-muted-foreground">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
