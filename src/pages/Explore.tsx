import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Search, 
  Plane,
  Palmtree,
  Utensils, 
  Hotel,
  Star,
  ArrowRight,
  Globe
} from "lucide-react";

// Sample destination data
const popularDestinations = [
  {
    id: 1,
    name: "Goa",
    description: "Beach paradise with vibrant nightlife",
    image: "https://picsum.photos/800/600?random=1",
    tags: ["Beach", "Nightlife", "Adventure"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Kerala",
    description: "God's own country with serene backwaters",
    image: "https://picsum.photos/800/600?random=2",
    tags: ["Nature", "Peaceful", "Culture"],
    rating: 4.9
  },
  {
    id: 3,
    name: "Manali",
    description: "Himalayan beauty with adventure sports",
    image: "https://picsum.photos/800/600?random=3",
    tags: ["Mountains", "Adventure", "Cold"],
    rating: 4.7
  },
  {
    id: 4,
    name: "Rajasthan",
    description: "Royal heritage and desert landscapes",
    image: "https://picsum.photos/800/600?random=4",
    tags: ["Culture", "Heritage", "Desert"],
    rating: 4.6
  },
  {
    id: 5,
    name: "Andaman",
    description: "Pristine beaches and coral reefs",
    image: "https://picsum.photos/800/600?random=5",
    tags: ["Island", "Beach", "Diving"],
    rating: 4.8
  },
  {
    id: 6,
    name: "Darjeeling",
    description: "Tea gardens and mountain views",
    image: "https://picsum.photos/800/600?random=6",
    tags: ["Mountains", "Tea", "Scenic"],
    rating: 4.5
  }
];

const activities = [
  "Trekking",
  "Scuba Diving",
  "Wildlife Safari",
  "River Rafting",
  "Cultural Tours",
  "Food Tours",
  "Helicopter Rides",
  "Paragliding"
];

// Enhanced list of popular cities with additional information
const popularCities = [
  // Major Indian Cities
  { name: "Mumbai, India", country: "India", code: "IN", description: "Financial capital of India, home to Bollywood" },
  { name: "Delhi, India", country: "India", code: "IN", description: "Capital city with rich history and modern charm" },
  { name: "Bangalore, India", country: "India", code: "IN", description: "Silicon Valley of India, garden city" },
  { name: "Hyderabad, India", country: "India", code: "IN", description: "City of Pearls and tech hub" },
  { name: "Chennai, India", country: "India", code: "IN", description: "Gateway to South India, cultural capital" },
  { name: "Kolkata, India", country: "India", code: "IN", description: "City of Joy, cultural and intellectual hub" },
  { name: "Pune, India", country: "India", code: "IN", description: "Oxford of the East, cultural capital of Maharashtra" },
  { name: "Ahmedabad, India", country: "India", code: "IN", description: "First UNESCO World Heritage City in India" },
  { name: "Jaipur, India", country: "India", code: "IN", description: "Pink City, royal heritage of Rajasthan" },
  
  // Popular Tourist Destinations in India
  { name: "Goa, India", country: "India", code: "IN", description: "Beach paradise with Portuguese heritage" },
  { name: "Kerala, India", country: "India", code: "IN", description: "God's own country, famous for backwaters" },
  { name: "Manali, India", country: "India", code: "IN", description: "Himalayan resort town, adventure sports hub" },
  { name: "Rajasthan, India", country: "India", code: "IN", description: "Land of Kings, desert and palaces" },
  { name: "Andaman Islands, India", country: "India", code: "IN", description: "Tropical paradise with pristine beaches" },
  { name: "Darjeeling, India", country: "India", code: "IN", description: "Queen of Hills, famous for tea gardens" },
  
  // Additional Indian Cities
  { name: "Agra, India", country: "India", code: "IN", description: "Home to the Taj Mahal, Mughal architecture" },
  { name: "Varanasi, India", country: "India", code: "IN", description: "Spiritual capital of India, oldest living city" },
  { name: "Udaipur, India", country: "India", code: "IN", description: "City of Lakes, Venice of the East" },
  { name: "Amritsar, India", country: "India", code: "IN", description: "Home to Golden Temple, Punjabi culture" },
  { name: "Rishikesh, India", country: "India", code: "IN", description: "Yoga capital of the world, spiritual hub" },
  { name: "Shimla, India", country: "India", code: "IN", description: "Queen of Hills, former summer capital" },
  { name: "Ooty, India", country: "India", code: "IN", description: "Queen of Nilgiris, hill station paradise" },
  { name: "Mysore, India", country: "India", code: "IN", description: "City of Palaces, cultural capital of Karnataka" },
  { name: "Ladakh, India", country: "India", code: "IN", description: "Land of high passes, Buddhist culture" },
  { name: "Coorg, India", country: "India", code: "IN", description: "Scotland of India, coffee country" },
  { name: "Munnar, India", country: "India", code: "IN", description: "Kashmir of South India, tea plantations" },
  { name: "Hampi, India", country: "India", code: "IN", description: "UNESCO site, ancient Vijayanagara ruins" },
  { name: "Kochi, India", country: "India", code: "IN", description: "Queen of Arabian Sea, historic port city" },
  { name: "Mahabaleshwar, India", country: "India", code: "IN", description: "Strawberry country, hill station retreat" },
  { name: "Pushkar, India", country: "India", code: "IN", description: "Holy city, famous for camel fair" },
  { name: "Gangtok, India", country: "India", code: "IN", description: "Capital of Sikkim, gateway to Northeast" },
  { name: "Alleppey, India", country: "India", code: "IN", description: "Venice of the East, backwater paradise" },
  { name: "Madurai, India", country: "India", code: "IN", description: "Temple City, cultural center of Tamil Nadu" },
  { name: "Khajuraho, India", country: "India", code: "IN", description: "Temple town, UNESCO World Heritage site" },
  { name: "Ranthambore, India", country: "India", code: "IN", description: "Tiger reserve, wildlife sanctuary" },
  { name: "Kovalam, India", country: "India", code: "IN", description: "Beach paradise of Kerala" },
  { name: "Nainital, India", country: "India", code: "IN", description: "Lake District of India" },
  { name: "Mussoorie, India", country: "India", code: "IN", description: "Queen of Hills, writer's paradise" },
  { name: "Mahabalipuram, India", country: "India", code: "IN", description: "Ancient port city, shore temples" },
  { name: "Pondicherry, India", country: "India", code: "IN", description: "French colonial town, spiritual hub" },
  { name: "Jodhpur, India", country: "India", code: "IN", description: "Blue City, Mehrangarh Fort" },
  { name: "Ajmer, India", country: "India", code: "IN", description: "Pilgrimage city, Dargah Sharif" },
  { name: "Dehradun, India", country: "India", code: "IN", description: "Valley of Knowledge, education hub" },
  { name: "Lucknow, India", country: "India", code: "IN", description: "City of Nawabs, culinary capital" },
  { name: "Bhubaneswar, India", country: "India", code: "IN", description: "Temple City of India, ancient architecture" },

  // Rest of the international cities...
  { name: "New York, USA", country: "United States", code: "US", description: "The Big Apple" },
  { name: "London, UK", country: "United Kingdom", code: "GB", description: "The Big Smoke" },
  { name: "Paris, France", country: "France", code: "FR", description: "City of Light" },
  { name: "Tokyo, Japan", country: "Japan", code: "JP", description: "Land of the Rising Sun" },
  { name: "Dubai, UAE", country: "United Arab Emirates", code: "AE", description: "City of Gold" },
  { name: "Singapore", country: "Singapore", code: "SG", description: "Lion City" },
  { name: "Bangkok, Thailand", country: "Thailand", code: "TH", description: "City of Angels" },
  { name: "Sydney, Australia", country: "Australia", code: "AU", description: "Harbour City" },
  { name: "Rome, Italy", country: "Italy", code: "IT", description: "Eternal City" },
  { name: "Barcelona, Spain", country: "Spain", code: "ES", description: "City of Counts" },
  { name: "Amsterdam, Netherlands", country: "Netherlands", code: "NL", description: "Venice of the North" },
  { name: "Vienna, Austria", country: "Austria", code: "AT", description: "City of Music" },
  { name: "Prague, Czech Republic", country: "Czech Republic", code: "CZ", description: "City of a Hundred Spires" },
  { name: "Budapest, Hungary", country: "Hungary", code: "HU", description: "Pearl of the Danube" },
  { name: "Istanbul, Turkey", country: "Turkey", code: "TR", description: "City of the World's Desire" },
  { name: "Cairo, Egypt", country: "Egypt", code: "EG", description: "City of a Thousand Minarets" },
  { name: "Cape Town, South Africa", country: "South Africa", code: "ZA", description: "Mother City" },
  { name: "Rio de Janeiro, Brazil", country: "Brazil", code: "BR", description: "Marvelous City" },
  { name: "Buenos Aires, Argentina", country: "Argentina", code: "AR", description: "Paris of South America" },
  { name: "Mexico City, Mexico", country: "Mexico", code: "MX", description: "City of Palaces" },
  { name: "Toronto, Canada", country: "Canada", code: "CA", description: "The Six" },
  { name: "Vancouver, Canada", country: "Canada", code: "CA", description: "Hollywood North" },
  { name: "Seoul, South Korea", country: "South Korea", code: "KR", description: "The Soul of Asia" },
  { name: "Hong Kong", country: "China", code: "HK", description: "Pearl of the Orient" },
  { name: "Shanghai, China", country: "China", code: "CN", description: "Paris of the East" },
  { name: "Moscow, Russia", country: "Russia", code: "RU", description: "Third Rome" },
  { name: "St. Petersburg, Russia", country: "Russia", code: "RU", description: "Venice of the North" },
  { name: "Berlin, Germany", country: "Germany", code: "DE", description: "Athens on the Spree" },
  { name: "Munich, Germany", country: "Germany", code: "DE", description: "Athens of the Isar" },
  { name: "Zurich, Switzerland", country: "Switzerland", code: "CH", description: "Little Big City" },
  { name: "Geneva, Switzerland", country: "Switzerland", code: "CH", description: "Peace Capital" },
  { name: "Oslo, Norway", country: "Norway", code: "NO", description: "Tiger City" },
  { name: "Stockholm, Sweden", country: "Sweden", code: "SE", description: "Venice of the North" },
  { name: "Copenhagen, Denmark", country: "Denmark", code: "DK", description: "City of Spires" },
  { name: "Helsinki, Finland", country: "Finland", code: "FI", description: "Daughter of the Baltic" },
  { name: "Reykjavik, Iceland", country: "Iceland", code: "IS", description: "Smoky Bay" },
  { name: "Dublin, Ireland", country: "Ireland", code: "IE", description: "Fair City" },
  { name: "Edinburgh, UK", country: "United Kingdom", code: "GB", description: "Athens of the North" },
  { name: "Manchester, UK", country: "United Kingdom", code: "GB", description: "Cottonopolis" },
  { name: "Liverpool, UK", country: "United Kingdom", code: "GB", description: "The Pool of Life" },
  { name: "Glasgow, UK", country: "United Kingdom", code: "GB", description: "Dear Green Place" },
  { name: "Birmingham, UK", country: "United Kingdom", code: "GB", description: "Workshop of the World" },
  { name: "Cardiff, UK", country: "United Kingdom", code: "GB", description: "City of Castles" },
  { name: "Belfast, UK", country: "United Kingdom", code: "GB", description: "Linenopolis" },
  { name: "Wellington, New Zealand", country: "New Zealand", code: "NZ", description: "Windy City" },
  { name: "Auckland, New Zealand", country: "New Zealand", code: "NZ", description: "City of Sails" },
  { name: "Christchurch, New Zealand", country: "New Zealand", code: "NZ", description: "Garden City" },
  { name: "Queenstown, New Zealand", country: "New Zealand", code: "NZ", description: "Adventure Capital" },
  { name: "Rotorua, New Zealand", country: "New Zealand", code: "NZ", description: "Sulphur City" }
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof popularCities>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const filteredDestinations = popularDestinations.filter(
    (dest) => dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter cities based on search query
  useEffect(() => {
    if (searchQuery.length < 1) { // Changed to show suggestions after 1 character
      setSuggestions([]);
      return;
    }

    const filtered = popularCities.filter(city => 
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-8 px-4"
    >
      {/* Hero section */}
      <div className="relative mb-12 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://picsum.photos/1600/500?random=7" 
          alt="Explore destinations" 
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-4 text-center"
          >
            Explore Amazing Destinations
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl mb-6 text-center max-w-2xl"
          >
            Discover beautiful places and unforgettable experiences
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md relative"
            ref={searchRef}
          >
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search destinations, experiences, activities..." 
                className="px-4 py-3 pl-12 bg-white/90 text-black rounded-full w-full"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            
            {/* Enhanced location suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
                {suggestions.map((city, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b last:border-b-0 transition-colors"
                    onClick={() => {
                      setSearchQuery(city.name);
                      setShowSuggestions(false);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <MapPin className="h-5 w-5 text-goginie-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{city.name}</span>
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {city.country}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{city.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Main content */}
      <Tabs defaultValue="destinations" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="destinations" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Destinations
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Palmtree className="h-4 w-4" /> Activities
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <Plane className="h-4 w-4" /> Trending
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="destinations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="aspect-video relative">
                      <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                      <p className="text-muted-foreground mb-3">{destination.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="text-xs py-1 px-2 bg-goginie-primary/10 text-goginie-primary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Hotel className="h-4 w-4" /> 20+ hotels
                          <Utensils className="h-4 w-4 ml-2" /> 15+ restaurants
                        </div>
                        <Button size="sm" asChild>
                          <Link to="/plan-trip" className="flex items-center gap-1">
                            Plan <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-xl text-muted-foreground">No destinations found. Try a different search.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="activities">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {activities.map((activity) => (
              <motion.div
                key={activity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden h-full cursor-pointer hover:border-goginie-primary transition-colors">
                  <div className="aspect-video bg-gradient-to-br from-goginie-primary/20 to-goginie-secondary/20 flex items-center justify-center">
                    <Palmtree className="h-12 w-12 text-goginie-primary" />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-medium">{activity}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularDestinations.slice(0, 4).map((destination) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-2/5">
                      <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="w-full h-full object-cover aspect-video md:aspect-auto"
                      />
                    </div>
                    <CardContent className="p-5 md:w-3/5">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">{destination.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                          <span className="text-sm font-medium">{destination.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{destination.description}</p>
                      <Button size="sm" className="mt-2" asChild>
                        <Link to="/plan-trip" className="flex items-center gap-1">
                          Explore now <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Call to action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start your adventure?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Let GoGinie help you plan the perfect trip based on your preferences
        </p>
        <Button size="lg" asChild>
          <Link to="/plan-trip" className="flex items-center gap-2">
            Plan Your Trip <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
