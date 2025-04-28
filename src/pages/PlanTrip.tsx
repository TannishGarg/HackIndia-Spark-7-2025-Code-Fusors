
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  Map, 
  CalendarRange, 
  Coins, 
  Compass, 
  Utensils, 
  Train, 
  Car, 
  Plane,
  Users,
  ArrowRight
} from "lucide-react";

export default function PlanTrip() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState([2000]);
  const [travelStyle, setTravelStyle] = useState("solo");
  const [interests, setInterests] = useState<string[]>([]);
  const [foodPreference, setFoodPreference] = useState("");
  const [localFood, setLocalFood] = useState(false);
  const [transportationMode, setTransportationMode] = useState("airways");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInterestChange = (interest: string) => {
    setInterests((current) => {
      if (current.includes(interest)) {
        return current.filter((i) => i !== interest);
      } else {
        return [...current, interest];
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!destination || !startDate || !endDate || !foodPreference || interests.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Submit form
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast({
        title: "Trip plan created!",
        description: `Your trip to ${destination} is being prepared.`,
      });
      setIsLoading(false);
      navigate("/trip-result");
    }, 2000);
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Plan Your Dream Trip</h1>
        <p className="text-muted-foreground">
          Fill in your preferences and our AI will generate a personalized itinerary for you
        </p>
      </div>
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Destination */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Map className="h-5 w-5 text-goginie-primary" />
              <h2 className="text-xl font-semibold">Where do you want to go?</h2>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input 
                id="destination" 
                placeholder="City, Country" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Date Range */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarRange className="h-5 w-5 text-goginie-primary" />
              <h2 className="text-xl font-semibold">When are you traveling?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate" 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Budget */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-goginie-primary" />
              <h2 className="text-xl font-semibold">What's your budget?</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Total Budget (USD)</Label>
                  <span className="font-medium">${budget[0]}</span>
                </div>
                <Slider
                  value={budget}
                  min={500}
                  max={10000}
                  step={100}
                  onValueChange={setBudget}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$500</span>
                  <span>$10,000</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-goginie-primary" />
              <h2 className="text-xl font-semibold">What are your interests?</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interest-adventure" 
                  checked={interests.includes("adventure")}
                  onCheckedChange={() => handleInterestChange("adventure")}
                />
                <label
                  htmlFor="interest-adventure"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Adventure
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interest-culture" 
                  checked={interests.includes("culture")}
                  onCheckedChange={() => handleInterestChange("culture")}
                />
                <label
                  htmlFor="interest-culture"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Culture
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interest-foodie" 
                  checked={interests.includes("foodie")}
                  onCheckedChange={() => handleInterestChange("foodie")}
                />
                <label
                  htmlFor="interest-foodie"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Foodie
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interest-relaxation" 
                  checked={interests.includes("relaxation")}
                  onCheckedChange={() => handleInterestChange("relaxation")}
                />
                <label
                  htmlFor="interest-relaxation"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Relaxation
                </label>
              </div>
            </div>
          </div>
          
          {/* Travel Style */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-goginie-primary" />
              <h2 className="text-xl font-semibold">How are you traveling?</h2>
            </div>
            <RadioGroup value={travelStyle} onValueChange={setTravelStyle}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="travel-solo" />
                  <Label htmlFor="travel-solo">Solo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="couple" id="travel-couple" />
                  <Label htmlFor="travel-couple">Couple</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family" id="travel-family" />
                  <Label htmlFor="travel-family">Family</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="travel-friends" />
                  <Label htmlFor="travel-friends">Friends</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {/* Food Preferences */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-goginie-primary" />
              <h2 className="text-xl font-semibold">What are your food preferences?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="food-preference">Food Preference</Label>
                <Select value={foodPreference} onValueChange={setFoodPreference}>
                  <SelectTrigger id="food-preference">
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="no-preference">No Preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="local-food" 
                  checked={localFood}
                  onCheckedChange={(checked) => setLocalFood(!!checked)}
                />
                <label
                  htmlFor="local-food"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Interested in local food
                </label>
              </div>
            </div>
          </div>
          
          {/* Travel Mode */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Train className="h-5 w-5 text-goginie-primary" />
              <h2 className="text-xl font-semibold">Preferred mode of transportation?</h2>
            </div>
            <RadioGroup value={transportationMode} onValueChange={setTransportationMode}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="roadways" id="transport-roadways" />
                  <Car className="h-4 w-4 mr-1" />
                  <Label htmlFor="transport-roadways">Roadways</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="railways" id="transport-railways" />
                  <Train className="h-4 w-4 mr-1" />
                  <Label htmlFor="transport-railways">Railways</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="airways" id="transport-airways" />
                  <Plane className="h-4 w-4 mr-1" />
                  <Label htmlFor="transport-airways">Airways</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-goginie-primary hover:bg-goginie-secondary flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? "Creating your trip plan..." : "Create Trip Plan"}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      </Card>
    </div>
  );
}
