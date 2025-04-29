
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Beach,
  Coffee,
  Compass,
  Heart,
  MountainSnow,
  PalmTree,
  Search,
  Star,
  Tags,
  Tent,
} from "lucide-react";

interface Destination {
  id: number;
  title: string;
  location: string;
  image: string;
  category: string;
  rating: number;
  tags: string[];
}

const destinations: Destination[] = [
  {
    id: 1,
    title: "Kerala Backwaters",
    location: "Kerala, India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80",
    category: "Relaxation",
    rating: 4.8,
    tags: ["Nature", "Boating", "Peaceful"]
  },
  {
    id: 2,
    title: "Taj Mahal",
    location: "Agra, India",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    category: "Heritage",
    rating: 4.9,
    tags: ["Wonder", "Architecture", "History"]
  },
  {
    id: 3,
    title: "Goa Beaches",
    location: "Goa, India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    category: "Beach",
    rating: 4.7,
    tags: ["Party", "Beaches", "Nightlife"]
  },
  {
    id: 4,
    title: "Manali Hills",
    location: "Himachal Pradesh, India",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Mountains",
    rating: 4.6,
    tags: ["Trekking", "Snow", "Adventure"]
  },
  {
    id: 5,
    title: "Jaipur City",
    location: "Rajasthan, India",
    image: "https://images.unsplash.com/photo-1477586957327-847a0f3f4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Heritage",
    rating: 4.7,
    tags: ["Culture", "Forts", "History"]
  },
  {
    id: 6,
    title: "Andaman Islands",
    location: "Andaman & Nicobar, India",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    category: "Beach",
    rating: 4.9,
    tags: ["Islands", "Scuba", "Beaches"]
  },
  {
    id: 7,
    title: "Darjeeling Tea Gardens",
    location: "West Bengal, India",
    image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    category: "Nature",
    rating: 4.5,
    tags: ["Tea", "Hills", "Scenic"]
  },
  {
    id: 8,
    title: "Varanasi Ghats",
    location: "Uttar Pradesh, India",
    image: "https://images.unsplash.com/photo-1561361058-c24cecda2081?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    category: "Spiritual",
    rating: 4.6,
    tags: ["Spiritual", "Ancient", "Culture"]
  }
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || destination.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { name: "Beach", icon: <Beach className="h-5 w-5" /> },
    { name: "Mountains", icon: <MountainSnow className="h-5 w-5" /> },
    { name: "Heritage", icon: <Tent className="h-5 w-5" /> },
    { name: "Nature", icon: <PalmTree className="h-5 w-5" /> },
    { name: "Spiritual", icon: <Coffee className="h-5 w-5" /> },
    { name: "Relaxation", icon: <Coffee className="h-5 w-5" /> },
  ];
  
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover amazing places around India and plan your next adventure with GoGinie.
        </p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search destinations, locations, or activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
        
        <Button 
          onClick={() => {
            setSearchQuery("");
            setSelectedCategory(null);
          }}
          variant="outline"
          className="whitespace-nowrap"
        >
          Clear Filters
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? "default" : "outline"}
            className={`flex items-center gap-2 ${selectedCategory === category.name ? "bg-goginie-primary" : ""}`}
            onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
          >
            {category.icon}
            {category.name}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDestinations.map((destination, index) => (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-red-500" />
                </button>
                <div className="absolute bottom-3 left-3 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-goginie-primary/90 px-2 py-1 rounded-full">
                  <span className="text-xs font-medium text-white">{destination.category}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{destination.title}</h3>
                <div className="flex items-center mb-3 text-muted-foreground text-sm">
                  <Compass className="h-4 w-4 mr-1" />
                  {destination.location}
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <Tags className="h-3 w-3 text-muted-foreground" />
                  {destination.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-goginie-primary"
                    onClick={() => {
                      window.location.href = `/plan-trip?destination=${destination.title}`;
                    }}
                  >
                    Plan a Trip
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-goginie-primary hover:bg-goginie-secondary"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <Compass className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold mb-2">No destinations found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
