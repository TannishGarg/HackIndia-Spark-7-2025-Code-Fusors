
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Heart, 
  Zap, 
  Coffee, 
  Utensils, 
  Moon, 
  Sun, 
  Compass
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import MoodBasedRecommendations from "@/components/mood/MoodBasedRecommendations";

// Define the moods available in the app
const moods = [
  { value: "adventurous", label: "Adventurous", icon: <Zap className="h-5 w-5 text-yellow-500" /> },
  { value: "relaxed", label: "Relaxed", icon: <Coffee className="h-5 w-5 text-blue-500" /> },
  { value: "romantic", label: "Romantic", icon: <Heart className="h-5 w-5 text-pink-500" /> },
  { value: "hungry", label: "Hungry", icon: <Utensils className="h-5 w-5 text-orange-500" /> },
  { value: "tired", label: "Tired", icon: <Moon className="h-5 w-5 text-indigo-500" /> },
  { value: "energetic", label: "Energetic", icon: <Sun className="h-5 w-5 text-red-500" /> }
];

// Define the time periods
const timePeriods = [
  { value: "morning", label: "Morning (6 AM - 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM - 5 PM)" },
  { value: "evening", label: "Evening (5 PM - 9 PM)" },
  { value: "night", label: "Night (9 PM - 6 AM)" }
];

interface FormValues {
  location: string;
  mood: string;
  timePeriod: string;
}

export default function MoodBasedTrip() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    defaultValues: {
      location: "",
      mood: "",
      timePeriod: "afternoon"
    }
  });

  const onSubmit = (values: FormValues) => {
    if (!values.location) {
      toast.error("Please enter a location");
      return;
    }
    
    if (!values.mood) {
      toast.error("Please select your mood");
      return;
    }
    
    console.log("Form values:", values);
    setFormData(values);
    setShowRecommendations(true);
    toast.success("Generating recommendations based on your mood!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Mood-Based Travel Recommendations</h1>
          <p className="text-muted-foreground">
            Tell us how you're feeling and we'll suggest the perfect activities for your current mood
          </p>
        </div>
        
        {!showRecommendations ? (
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Location input */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Where are you?</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              placeholder="Enter city or location" 
                              className="pl-10" 
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Mood selection */}
                  <FormField
                    control={form.control}
                    name="mood"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>How are you feeling right now?</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            value={field.value}
                            className="grid grid-cols-2 md:grid-cols-3 gap-3"
                          >
                            {moods.map((mood) => (
                              <div key={mood.value}>
                                <RadioGroupItem
                                  value={mood.value}
                                  id={`mood-${mood.value}`}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={`mood-${mood.value}`}
                                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-goginie-primary [&:has([data-state=checked])]:border-goginie-primary"
                                >
                                  {mood.icon}
                                  <span className="mt-2">{mood.label}</span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Time period selection */}
                  <FormField
                    control={form.control}
                    name="timePeriod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>What time is it?</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-3"
                          >
                            {timePeriods.map((time) => (
                              <div key={time.value}>
                                <RadioGroupItem
                                  value={time.value}
                                  id={`time-${time.value}`}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={`time-${time.value}`}
                                  className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-goginie-primary [&:has([data-state=checked])]:border-goginie-primary"
                                >
                                  <span>{time.label}</span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-goginie-primary hover:bg-goginie-secondary"
                    >
                      <Compass className="mr-2 h-5 w-5" />
                      Find Perfect Activities
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate("/plan-trip")}
                    >
                      Back to Traditional Planning
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <MoodBasedRecommendations
            formData={formData!}
            onReset={() => setShowRecommendations(false)}
          />
        )}
      </div>
    </div>
  );
}
