import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
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
  ArrowRight,
  Sparkles,
  Hotel,
  ChevronRight,
  MoveRight
} from "lucide-react";

// Step titles and avatars for gamification
const steps = [
  { 
    title: "Where are you planning to go?",
    subtitle: "Let's start your journey!",
    icon: <Compass className="h-8 w-8 text-goginie-primary" />,
    mascotTip: "Choose a destination you've always dreamed of visiting!"
  },
  { 
    title: "When are you traveling?",
    subtitle: "Let's check dates in your calendar",
    icon: <CalendarRange className="h-8 w-8 text-goginie-primary" />,
    mascotTip: "Pro tip: Off-season travel often means fewer crowds and better deals!"
  },
  { 
    title: "What's your travel budget?",
    subtitle: "Let's plan your expenses",
    icon: <Coins className="h-8 w-8 text-goginie-primary" />,
    mascotTip: "Setting a budget helps us find the best options for your trip."
  },
  { 
    title: "What are your interests?",
    subtitle: "Let's personalize your experience",
    icon: <Sparkles className="h-8 w-8 text-goginie-primary" />,
    mascotTip: "Your interests help us curate the perfect experiences for you!"
  },
  { 
    title: "How many people are traveling?",
    subtitle: "Let's know your travel companions",
    icon: <Users className="h-8 w-8 text-goginie-primary" />,
    mascotTip: "Different group sizes create different travel experiences."
  },
  { 
    title: "What are your food preferences?",
    subtitle: "Taste the flavors!",
    icon: <Utensils className="h-8 w-8 text-goginie-primary" />,
    mascotTip: "Local cuisine is one of the best ways to experience a new culture!"
  },
  { 
    title: "How do you want to travel?",
    subtitle: "Ready to take off?",
    icon: <Plane className="h-8 w-8 text-goginie-primary" />,
    mascotTip: "Each mode of transport offers a unique way to see your destination."
  }
];

export default function PlanTrip() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state using react-hook-form
  const methods = useForm({
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
      budget: 50000,
      interests: [],
      travelGroupSize: 1,
      foodPreference: "",
      localFood: false,
      transportationMode: "airways"
    }
  });

  // State for multi-step form
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Progress calculation
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleInterestChange = (interest: string) => {
    const currentInterests = methods.getValues("interests") || [];
    
    if (currentInterests.includes(interest)) {
      methods.setValue("interests", 
        currentInterests.filter((i: string) => i !== interest)
      );
    } else {
      methods.setValue("interests", [...currentInterests, interest]);
    }
  };
  
  const onSubmit = (data: any) => {
    // Validation for the current step before submission
    if (currentStep === steps.length - 1) {
      setIsLoading(true);
      
      // Show confetti
      setShowConfetti(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        toast({
          title: "Trip plan created!",
          description: `Your trip to ${data.destination} is being prepared.`,
        });
        setIsLoading(false);
        setShowConfetti(false);
        navigate("/trip-result");
      }, 3000);
    } else {
      nextStep();
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl relative">
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={500} />}
      
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Plan Your Dream Trip</h1>
        <p className="text-muted-foreground">
          Let our genie craft a personalized itinerary for you
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6 px-4">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-muted-foreground">{progress.toFixed(0)}% Complete</span>
          <span className="text-sm font-medium text-goginie-primary">
            {currentStep < steps.length * 0.6 
              ? "Just getting started!"
              : currentStep < steps.length - 1 
                ? "Almost there traveler! 🌍"
                : "Final step! 🎉"}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Card className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Step header with icon */}
                    <div className="flex items-center gap-3 mb-6">
                      {steps[currentStep].icon}
                      <div>
                        <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
                        <p className="text-sm text-muted-foreground">{steps[currentStep].subtitle}</p>
                      </div>
                    </div>
                    
                    {/* Mascot tip */}
                    <div className="bg-goginie-primary/10 p-4 rounded-lg border border-goginie-primary/20 flex items-start gap-3 mb-6">
                      <div className="bg-goginie-primary text-white p-2 rounded-full">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <p className="text-sm">{steps[currentStep].mascotTip}</p>
                    </div>

                    {/* Step content */}
                    {currentStep === 0 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="destination">Destination</Label>
                          <Input 
                            id="destination" 
                            placeholder="City, Country" 
                            {...methods.register("destination", { required: true })}
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input 
                            id="startDate" 
                            type="date" 
                            {...methods.register("startDate", { required: true })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <Input 
                            id="endDate" 
                            type="date" 
                            {...methods.register("endDate", { required: true })}
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Total Budget (INR)</Label>
                            <span className="font-medium">₹{methods.watch("budget")}</span>
                          </div>
                          <Slider
                            value={[methods.watch("budget")]}
                            min={10000}
                            max={500000}
                            step={5000}
                            onValueChange={(value) => methods.setValue("budget", value[0])}
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>₹10,000</span>
                            <span>₹500,000</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <Label>Select your interests</Label>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                          {/* FIX: Remove the onClick handler from Card and use separate handler */}
                          <Card className={`p-4 cursor-pointer transition-all ${methods.watch("interests")?.includes("adventure") ? "border-goginie-primary bg-goginie-primary/10" : ""}`}>
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                id="interest-adventure" 
                                checked={methods.watch("interests")?.includes("adventure")}
                                onCheckedChange={() => handleInterestChange("adventure")}
                              />
                              <label htmlFor="interest-adventure" className="text-base font-medium cursor-pointer flex-1" onClick={() => handleInterestChange("adventure")}>
                                Adventure
                              </label>
                            </div>
                          </Card>
                          
                          <Card className={`p-4 cursor-pointer transition-all ${methods.watch("interests")?.includes("culture") ? "border-goginie-primary bg-goginie-primary/10" : ""}`}>
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                id="interest-culture" 
                                checked={methods.watch("interests")?.includes("culture")}
                                onCheckedChange={() => handleInterestChange("culture")}
                              />
                              <label htmlFor="interest-culture" className="text-base font-medium cursor-pointer flex-1" onClick={() => handleInterestChange("culture")}>
                                Culture
                              </label>
                            </div>
                          </Card>
                          
                          <Card className={`p-4 cursor-pointer transition-all ${methods.watch("interests")?.includes("foodie") ? "border-goginie-primary bg-goginie-primary/10" : ""}`}>
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                id="interest-foodie" 
                                checked={methods.watch("interests")?.includes("foodie")}
                                onCheckedChange={() => handleInterestChange("foodie")}
                              />
                              <label htmlFor="interest-foodie" className="text-base font-medium cursor-pointer flex-1" onClick={() => handleInterestChange("foodie")}>
                                Foodie
                              </label>
                            </div>
                          </Card>
                          
                          <Card className={`p-4 cursor-pointer transition-all ${methods.watch("interests")?.includes("relaxation") ? "border-goginie-primary bg-goginie-primary/10" : ""}`}>
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                id="interest-relaxation" 
                                checked={methods.watch("interests")?.includes("relaxation")}
                                onCheckedChange={() => handleInterestChange("relaxation")}
                              />
                              <label htmlFor="interest-relaxation" className="text-base font-medium cursor-pointer flex-1" onClick={() => handleInterestChange("relaxation")}>
                                Relaxation
                              </label>
                            </div>
                          </Card>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <Label>How many people are traveling?</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Card 
                            className={`p-4 cursor-pointer transition-all ${methods.watch("travelGroupSize") === 1 ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                            onClick={() => methods.setValue("travelGroupSize", 1)}
                          >
                            <div className="flex flex-col items-center gap-2 py-2">
                              <Users className="h-8 w-8 text-goginie-primary" />
                              <label className="text-base font-medium cursor-pointer">Solo</label>
                              <span className="text-sm text-muted-foreground">1 Person</span>
                            </div>
                          </Card>
                          <Card 
                            className={`p-4 cursor-pointer transition-all ${methods.watch("travelGroupSize") === 2 ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                            onClick={() => methods.setValue("travelGroupSize", 2)}
                          >
                            <div className="flex flex-col items-center gap-2 py-2">
                              <Users className="h-8 w-8 text-goginie-primary" />
                              <label className="text-base font-medium cursor-pointer">Couple</label>
                              <span className="text-sm text-muted-foreground">2 People</span>
                            </div>
                          </Card>
                          <Card 
                            className={`p-4 cursor-pointer transition-all ${methods.watch("travelGroupSize") === 4 ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                            onClick={() => methods.setValue("travelGroupSize", 4)}
                          >
                            <div className="flex flex-col items-center gap-2 py-2">
                              <Users className="h-8 w-8 text-goginie-primary" />
                              <label className="text-base font-medium cursor-pointer">Family</label>
                              <span className="text-sm text-muted-foreground">4 People</span>
                            </div>
                          </Card>
                          <Card 
                            className={`p-4 cursor-pointer transition-all ${methods.watch("travelGroupSize") === 6 ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                            onClick={() => methods.setValue("travelGroupSize", 6)}
                          >
                            <div className="flex flex-col items-center gap-2 py-2">
                              <Users className="h-8 w-8 text-goginie-primary" />
                              <label className="text-base font-medium cursor-pointer">Friends</label>
                              <span className="text-sm text-muted-foreground">6 People</span>
                            </div>
                          </Card>
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-4">
                        <Label>What are your food preferences?</Label>
                        <RadioGroup 
                          value={methods.watch("foodPreference") || ""} 
                          onValueChange={(value) => methods.setValue("foodPreference", value)}
                        >
                          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
                            <Card 
                              className={`p-4 cursor-pointer transition-all ${methods.watch("foodPreference") === "vegetarian" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                              onClick={() => methods.setValue("foodPreference", "vegetarian")}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="vegetarian" id="food-vegetarian" />
                                <label htmlFor="food-vegetarian" className="text-base font-medium cursor-pointer flex-1">
                                  Vegetarian
                                </label>
                              </div>
                            </Card>
                            <Card 
                              className={`p-4 cursor-pointer transition-all ${methods.watch("foodPreference") === "non-vegetarian" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                              onClick={() => methods.setValue("foodPreference", "non-vegetarian")}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="non-vegetarian" id="food-non-vegetarian" />
                                <label htmlFor="food-non-vegetarian" className="text-base font-medium cursor-pointer flex-1">
                                  Non-Vegetarian
                                </label>
                              </div>
                            </Card>
                            <Card 
                              className={`p-4 cursor-pointer transition-all ${methods.watch("foodPreference") === "vegan" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                              onClick={() => methods.setValue("foodPreference", "vegan")}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="vegan" id="food-vegan" />
                                <label htmlFor="food-vegan" className="text-base font-medium cursor-pointer flex-1">
                                  Vegan
                                </label>
                              </div>
                            </Card>
                            <Card 
                              className={`p-4 cursor-pointer transition-all ${methods.watch("foodPreference") === "no-preference" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                              onClick={() => methods.setValue("foodPreference", "no-preference")}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="no-preference" id="food-no-preference" />
                                <label htmlFor="food-no-preference" className="text-base font-medium cursor-pointer flex-1">
                                  No Preference
                                </label>
                              </div>
                            </Card>
                          </div>
                        </RadioGroup>
                        
                        <Card className={`p-4 cursor-pointer transition-all ${methods.watch("localFood") ? "border-goginie-primary bg-goginie-primary/10" : ""}`}>
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              id="local-food" 
                              checked={methods.watch("localFood")}
                              onCheckedChange={(checked) => methods.setValue("localFood", !!checked)}
                            />
                            <label htmlFor="local-food" className="text-base font-medium cursor-pointer flex-1" onClick={() => methods.setValue("localFood", !methods.watch("localFood"))}>
                              Interested in local food
                            </label>
                          </div>
                        </Card>
                      </div>
                    )}

                    {currentStep === 6 && (
                      <div className="space-y-4">
                        <Label>Preferred mode of transportation?</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card 
                            className={`p-4 cursor-pointer transition-all ${methods.watch("transportationMode") === "roadways" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                            onClick={() => methods.setValue("transportationMode", "roadways")}
                          >
                            <div className="flex flex-col items-center gap-2 py-3">
                              <Car className="h-8 w-8 text-goginie-primary" />
                              <label className="text-base font-medium cursor-pointer">Roadways</label>
                            </div>
                          </Card>
                          <Card 
                            className={`p-4 cursor-pointer transition-all ${methods.watch("transportationMode") === "railways" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                            onClick={() => methods.setValue("transportationMode", "railways")}
                          >
                            <div className="flex flex-col items-center gap-2 py-3">
                              <Train className="h-8 w-8 text-goginie-primary" />
                              <label className="text-base font-medium cursor-pointer">Railways</label>
                            </div>
                          </Card>
                          <Card 
                            className={`p-4 cursor-pointer transition-all ${methods.watch("transportationMode") === "airways" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                            onClick={() => methods.setValue("transportationMode", "airways")}
                          >
                            <div className="flex flex-col items-center gap-2 py-3">
                              <Plane className="h-8 w-8 text-goginie-primary" />
                              <label className="text-base font-medium cursor-pointer">Airways</label>
                            </div>
                          </Card>
                        </div>
                      </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex justify-between pt-4 mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-goginie-primary hover:bg-goginie-secondary flex items-center gap-2"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          "Creating your trip plan..."
                        ) : currentStep === steps.length - 1 ? (
                          <>Create Trip Plan <Sparkles className="h-4 w-4" /></>
                        ) : (
                          <>Next <ChevronRight className="h-4 w-4" /></>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Card>
            </form>
          </FormProvider>
        </div>
        
        {/* Trip Preview Sidebar */}
        <div className="md:col-span-1">
          <Card className="p-6 sticky top-4">
            <div className="space-y-5">
              <div className="text-center">
                <h3 className="font-semibold text-lg">Trip Preview</h3>
                <p className="text-sm text-muted-foreground">Your adventure is taking shape!</p>
              </div>
              
              <div className="space-y-3 text-sm">
                {methods.watch("destination") && (
                  <div className="flex items-center gap-2">
                    <Map className="h-4 w-4 text-goginie-primary shrink-0" />
                    <span className="font-medium">Destination:</span>
                    <span className="ml-1">{methods.watch("destination")}</span>
                  </div>
                )}
                
                {(methods.watch("startDate") || methods.watch("endDate")) && (
                  <div className="flex items-center gap-2">
                    <CalendarRange className="h-4 w-4 text-goginie-primary shrink-0" />
                    <span className="font-medium">Dates:</span>
                    <span className="ml-1">
                      {methods.watch("startDate") && new Date(methods.watch("startDate")).toLocaleDateString()}
                      {methods.watch("startDate") && methods.watch("endDate") && " to "}
                      {methods.watch("endDate") && new Date(methods.watch("endDate")).toLocaleDateString()}
                    </span>
                  </div>
                )}
                
                {methods.watch("budget") && (
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-goginie-primary shrink-0" />
                    <span className="font-medium">Budget:</span>
                    <span className="ml-1">₹{methods.watch("budget").toLocaleString()}</span>
                  </div>
                )}
                
                {methods.watch("travelGroupSize") && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-goginie-primary shrink-0" />
                    <span className="font-medium">Group Size:</span>
                    <span className="ml-1">{methods.watch("travelGroupSize")} {methods.watch("travelGroupSize") === 1 ? "Person" : "People"}</span>
                  </div>
                )}
                
                {methods.watch("foodPreference") && (
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-goginie-primary shrink-0" />
                    <span className="font-medium">Food:</span>
                    <span className="ml-1">
                      {methods.watch("foodPreference") === "vegetarian" && "Vegetarian"}
                      {methods.watch("foodPreference") === "non-vegetarian" && "Non-Vegetarian"}
                      {methods.watch("foodPreference") === "vegan" && "Vegan"}
                      {methods.watch("foodPreference") === "no-preference" && "No Preference"}
                      {methods.watch("localFood") && " (Local Food Lover)"}
                    </span>
                  </div>
                )}
                
                {methods.watch("transportationMode") && (
                  <div className="flex items-center gap-2">
                    {methods.watch("transportationMode") === "roadways" && <Car className="h-4 w-4 text-goginie-primary shrink-0" />}
                    {methods.watch("transportationMode") === "railways" && <Train className="h-4 w-4 text-goginie-primary shrink-0" />}
                    {methods.watch("transportationMode") === "airways" && <Plane className="h-4 w-4 text-goginie-primary shrink-0" />}
                    <span className="font-medium">Transport:</span>
                    <span className="ml-1">
                      {methods.watch("transportationMode") === "roadways" && "By Road"}
                      {methods.watch("transportationMode") === "railways" && "By Train"}
                      {methods.watch("transportationMode") === "airways" && "By Air"}
                    </span>
                  </div>
                )}
                
                {methods.watch("interests")?.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Compass className="h-4 w-4 text-goginie-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Interests:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {methods.watch("interests").map((interest: string) => (
                          <span key={interest} className="px-2 py-0.5 bg-goginie-primary/10 text-xs rounded-full">
                            {interest.charAt(0).toUpperCase() + interest.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mascot helper */}
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-goginie-primary rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">GoGinie says:</p>
                    <p className="text-muted-foreground">
                      {!methods.watch("destination") ? "Where would you like to travel?" :
                       !methods.watch("startDate") ? "When are you planning to visit " + methods.watch("destination") + "?" :
                       !methods.watch("budget") ? "What's your budget for this trip?" :
                       !methods.watch("interests") || methods.watch("interests").length === 0 ? "What are you interested in exploring?" :
                       `I'm preparing a magical journey to ${methods.watch("destination")} for you!`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Loading overlay when submitting */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md mx-auto text-center">
            <Sparkles className="h-12 w-12 text-goginie-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">GoGinie is crafting your adventure...</h2>
            <p className="text-muted-foreground mb-4">Hold tight while we prepare your personalized trip plan!</p>
            <Progress value={75} className="h-2 mb-2" />
          </Card>
        </div>
      )}
    </div>
  );
}
