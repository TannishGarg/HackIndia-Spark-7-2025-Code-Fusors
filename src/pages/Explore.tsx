
import { useState } from "react";
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
  ArrowRight
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

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredDestinations = popularDestinations.filter(
    (dest) => dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-8 px-4"
    >
      {/* Hero section */}
      <div className="relative rounded-3xl overflow-hidden mb-10">
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
          >
            <Input 
              type="text" 
              placeholder="Search destinations, experiences, activities..." 
              className="px-4 py-3 pl-12 bg-white/90 text-black rounded-full w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
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
