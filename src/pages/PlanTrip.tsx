import { useState, useEffect, useRef } from "react";
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
  Map as MapIcon, 
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
  MoveRight,
  Plus,
  Minus,
  MapPin,
  Navigation,
  User,
  Mail,
  Lock
} from "lucide-react";
import Map from "@/components/Map";

// List of all available interests
const allInterests = [
  { id: "adventure", label: "Adventure" },
  { id: "culture", label: "Culture" },
  { id: "foodie", label: "Foodie" },
  { id: "relaxation", label: "Relaxation" },
  { id: "history", label: "History" },
  { id: "nature", label: "Nature" },
  { id: "shopping", label: "Shopping" },
  { id: "nightlife", label: "Nightlife" },
  { id: "photography", label: "Photography" },
  { id: "art", label: "Art" },
  { id: "wellness", label: "Wellness" },
  { id: "sports", label: "Sports" },
  { id: "architecture", label: "Architecture" },
  { id: "technology", label: "Technology" },
  { id: "education", label: "Education" },
  { id: "science", label: "Science" },
  { id: "wildlife", label: "Wildlife" },
  { id: "diving", label: "Diving" },
  { id: "hiking", label: "Hiking" },
  { id: "camping", label: "Camping" }
];

// List of popular cities with details
const popularCities = [
  // Major Metro Cities (Tier 1)
  { name: "Mumbai, India", country: "India", code: "IN", description: "Financial capital of India, home to Bollywood" },
  { name: "Delhi, India", country: "India", code: "IN", description: "Capital city with rich history and modern charm" },
  { name: "Bangalore, India", country: "India", code: "IN", description: "Silicon Valley of India, garden city" },
  { name: "Hyderabad, India", country: "India", code: "IN", description: "City of Pearls and tech hub" },
  { name: "Chennai, India", country: "India", code: "IN", description: "Gateway to South India, cultural capital" },
  { name: "Kolkata, India", country: "India", code: "IN", description: "City of Joy, cultural and intellectual hub" },
  { name: "Pune, India", country: "India", code: "IN", description: "Oxford of the East, cultural capital of Maharashtra" },
  { name: "Ahmedabad, India", country: "India", code: "IN", description: "First UNESCO World Heritage City in India" },

  // North India Region
  // Delhi-NCR
  { name: "New Delhi, India", country: "India", code: "IN", description: "National capital, heart of India" },
  { name: "Gurgaon, India", country: "India", code: "IN", description: "Millennium City, corporate hub" },
  { name: "Noida, India", country: "India", code: "IN", description: "IT and industrial hub" },
  { name: "Faridabad, India", country: "India", code: "IN", description: "Industrial city in NCR" },
  { name: "Ghaziabad, India", country: "India", code: "IN", description: "Gateway to UP in NCR" },

  // Uttar Pradesh
  { name: "Lucknow, India", country: "India", code: "IN", description: "City of Nawabs and kebabs" },
  { name: "Kanpur, India", country: "India", code: "IN", description: "Manchester of the East" },
  { name: "Varanasi, India", country: "India", code: "IN", description: "Spiritual capital of India" },
  { name: "Agra, India", country: "India", code: "IN", description: "City of Taj Mahal" },
  { name: "Prayagraj, India", country: "India", code: "IN", description: "Sangam city" },
  { name: "Gorakhpur, India", country: "India", code: "IN", description: "Gateway to Nepal" },
  { name: "Meerut, India", country: "India", code: "IN", description: "Sports goods hub" },
  { name: "Bareilly, India", country: "India", code: "IN", description: "Jhumka city" },
  { name: "Aligarh, India", country: "India", code: "IN", description: "City of locks" },
  { name: "Moradabad, India", country: "India", code: "IN", description: "Brass city" },

  // Punjab
  { name: "Chandigarh, India", country: "India", code: "IN", description: "The City Beautiful" },
  { name: "Amritsar, India", country: "India", code: "IN", description: "Golden Temple city" },
  { name: "Ludhiana, India", country: "India", code: "IN", description: "Manchester of India" },
  { name: "Jalandhar, India", country: "India", code: "IN", description: "Sports industry hub" },
  { name: "Patiala, India", country: "India", code: "IN", description: "Royal city of Punjab" },
  { name: "Bathinda, India", country: "India", code: "IN", description: "City of lakes" },
  { name: "Mohali, India", country: "India", code: "IN", description: "IT hub of Punjab" },

  // Haryana
  { name: "Gurgaon, India", country: "India", code: "IN", description: "Cyber city" },
  { name: "Faridabad, India", country: "India", code: "IN", description: "Industrial hub" },
  { name: "Panipat, India", country: "India", code: "IN", description: "City of weavers" },
  { name: "Ambala, India", country: "India", code: "IN", description: "Gateway to Haryana" },
  { name: "Hisar, India", country: "India", code: "IN", description: "Steel city" },
  { name: "Karnal, India", country: "India", code: "IN", description: "Rice bowl of India" },

  // Rajasthan
  { name: "Jaipur, India", country: "India", code: "IN", description: "Pink City" },
  { name: "Jodhpur, India", country: "India", code: "IN", description: "Blue City" },
  { name: "Udaipur, India", country: "India", code: "IN", description: "City of Lakes" },
  { name: "Ajmer, India", country: "India", code: "IN", description: "Pilgrimage city" },
  { name: "Kota, India", country: "India", code: "IN", description: "Education city" },
  { name: "Bikaner, India", country: "India", code: "IN", description: "Camel country" },
  { name: "Jaisalmer, India", country: "India", code: "IN", description: "Golden City" },
  { name: "Pushkar, India", country: "India", code: "IN", description: "Sacred lake city" },
  { name: "Mount Abu, India", country: "India", code: "IN", description: "Hill station" },
  { name: "Bharatpur, India", country: "India", code: "IN", description: "Bird sanctuary city" },

  // South India Region
  // Karnataka
  { name: "Bangalore, India", country: "India", code: "IN", description: "Garden City" },
  { name: "Mysore, India", country: "India", code: "IN", description: "City of Palaces" },
  { name: "Mangalore, India", country: "India", code: "IN", description: "Port City" },
  { name: "Hubli-Dharwad, India", country: "India", code: "IN", description: "Twin cities" },
  { name: "Belgaum, India", country: "India", code: "IN", description: "Sugar bowl of Karnataka" },
  { name: "Gulbarga, India", country: "India", code: "IN", description: "City of domes" },
  { name: "Hampi, India", country: "India", code: "IN", description: "UNESCO heritage site" },
  { name: "Coorg, India", country: "India", code: "IN", description: "Scotland of India" },

  // Tamil Nadu
  { name: "Chennai, India", country: "India", code: "IN", description: "Detroit of India" },
  { name: "Coimbatore, India", country: "India", code: "IN", description: "Manchester of South India" },
  { name: "Madurai, India", country: "India", code: "IN", description: "Temple City" },
  { name: "Salem, India", country: "India", code: "IN", description: "Steel City" },
  { name: "Tiruchirapalli, India", country: "India", code: "IN", description: "Rock Fort City" },
  { name: "Tirunelveli, India", country: "India", code: "IN", description: "City of halwa" },
  { name: "Vellore, India", country: "India", code: "IN", description: "Leather city" },
  { name: "Thanjavur, India", country: "India", code: "IN", description: "Rice bowl of Tamil Nadu" },

  // Kerala
  { name: "Thiruvananthapuram, India", country: "India", code: "IN", description: "Evergreen city" },
  { name: "Kochi, India", country: "India", code: "IN", description: "Queen of Arabian Sea" },
  { name: "Kozhikode, India", country: "India", code: "IN", description: "City of spices" },
  { name: "Thrissur, India", country: "India", code: "IN", description: "Cultural capital" },
  { name: "Kollam, India", country: "India", code: "IN", description: "Cashew capital" },
  { name: "Alappuzha, India", country: "India", code: "IN", description: "Venice of the East" },
  { name: "Munnar, India", country: "India", code: "IN", description: "Tea garden hill station" },
  { name: "Wayanad, India", country: "India", code: "IN", description: "Green paradise" },

  // Andhra Pradesh & Telangana
  { name: "Hyderabad, India", country: "India", code: "IN", description: "City of Pearls" },
  { name: "Visakhapatnam, India", country: "India", code: "IN", description: "Port city" },
  { name: "Vijayawada, India", country: "India", code: "IN", description: "Business hub" },
  { name: "Warangal, India", country: "India", code: "IN", description: "Temple town" },
  { name: "Tirupati, India", country: "India", code: "IN", description: "Temple city" },
  { name: "Guntur, India", country: "India", code: "IN", description: "Chilli city" },
  { name: "Nellore, India", country: "India", code: "IN", description: "Rice city" },
  { name: "Kurnool, India", country: "India", code: "IN", description: "Gateway to Rayalaseema" },

  // East India Region
  // West Bengal
  { name: "Kolkata, India", country: "India", code: "IN", description: "City of Joy" },
  { name: "Howrah, India", country: "India", code: "IN", description: "Sheffield of India" },
  { name: "Durgapur, India", country: "India", code: "IN", description: "Steel city" },
  { name: "Siliguri, India", country: "India", code: "IN", description: "Gateway to Northeast" },
  { name: "Asansol, India", country: "India", code: "IN", description: "Coal city" },
  { name: "Darjeeling, India", country: "India", code: "IN", description: "Queen of Hills" },
  { name: "Kharagpur, India", country: "India", code: "IN", description: "IIT city" },
  { name: "Haldia, India", country: "India", code: "IN", description: "Port city" },

  // Bihar
  { name: "Patna, India", country: "India", code: "IN", description: "Ancient city" },
  { name: "Gaya, India", country: "India", code: "IN", description: "Buddhist pilgrimage" },
  { name: "Muzaffarpur, India", country: "India", code: "IN", description: "Lichi city" },
  { name: "Bhagalpur, India", country: "India", code: "IN", description: "Silk city" },
  { name: "Darbhanga, India", country: "India", code: "IN", description: "Cultural capital" },
  { name: "Nalanda, India", country: "India", code: "IN", description: "Ancient university" },
  { name: "Purnia, India", country: "India", code: "IN", description: "Agricultural hub" },
  { name: "Ara, India", country: "India", code: "IN", description: "Historical city" },

  // Odisha
  { name: "Bhubaneswar, India", country: "India", code: "IN", description: "Temple city" },
  { name: "Cuttack, India", country: "India", code: "IN", description: "Silver city" },
  { name: "Rourkela, India", country: "India", code: "IN", description: "Steel city" },
  { name: "Sambalpur, India", country: "India", code: "IN", description: "Textile city" },
  { name: "Puri, India", country: "India", code: "IN", description: "Temple town" },
  { name: "Berhampur, India", country: "India", code: "IN", description: "Silk city" },
  { name: "Balasore, India", country: "India", code: "IN", description: "Missile city" },
  { name: "Konark, India", country: "India", code: "IN", description: "Sun temple city" },

  // Jharkhand
  { name: "Ranchi, India", country: "India", code: "IN", description: "City of waterfalls" },
  { name: "Jamshedpur, India", country: "India", code: "IN", description: "Steel city" },
  { name: "Dhanbad, India", country: "India", code: "IN", description: "Coal capital" },
  { name: "Bokaro, India", country: "India", code: "IN", description: "Steel city" },
  { name: "Hazaribagh, India", country: "India", code: "IN", description: "City of thousand gardens" },
  { name: "Deoghar, India", country: "India", code: "IN", description: "Temple city" },
  { name: "Giridih, India", country: "India", code: "IN", description: "Mica city" },
  { name: "Dumka, India", country: "India", code: "IN", description: "Cultural hub" },

  // Northeast India Region
  // Assam
  { name: "Guwahati, India", country: "India", code: "IN", description: "Gateway to Northeast" },
  { name: "Dibrugarh, India", country: "India", code: "IN", description: "Tea city" },
  { name: "Silchar, India", country: "India", code: "IN", description: "Barak valley hub" },
  { name: "Jorhat, India", country: "India", code: "IN", description: "Cultural capital" },
  { name: "Nagaon, India", country: "India", code: "IN", description: "Agricultural hub" },
  { name: "Tezpur, India", country: "India", code: "IN", description: "City of eternal romance" },
  { name: "Kaziranga, India", country: "India", code: "IN", description: "National park" },
  { name: "Majuli, India", country: "India", code: "IN", description: "World's largest river island" },

  // Other Northeast States
  { name: "Shillong, India", country: "India", code: "IN", description: "Scotland of the East" },
  { name: "Aizawl, India", country: "India", code: "IN", description: "Capital of Mizoram" },
  { name: "Imphal, India", country: "India", code: "IN", description: "Capital of Manipur" },
  { name: "Agartala, India", country: "India", code: "IN", description: "Capital of Tripura" },
  { name: "Kohima, India", country: "India", code: "IN", description: "Capital of Nagaland" },
  { name: "Itanagar, India", country: "India", code: "IN", description: "Capital of Arunachal" },
  { name: "Gangtok, India", country: "India", code: "IN", description: "Capital of Sikkim" },
  { name: "Dimapur, India", country: "India", code: "IN", description: "Commercial capital of Nagaland" },

  // West India Region
  // Maharashtra
  { name: "Mumbai, India", country: "India", code: "IN", description: "Financial capital" },
  { name: "Pune, India", country: "India", code: "IN", description: "Cultural capital" },
  { name: "Nagpur, India", country: "India", code: "IN", description: "Orange city" },
  { name: "Nashik, India", country: "India", code: "IN", description: "Wine capital" },
  { name: "Aurangabad, India", country: "India", code: "IN", description: "Tourism capital" },
  { name: "Kolhapur, India", country: "India", code: "IN", description: "Historical city" },
  { name: "Solapur, India", country: "India", code: "IN", description: "Textile hub" },
  { name: "Amravati, India", country: "India", code: "IN", description: "Cultural city" },

  // Gujarat
  { name: "Ahmedabad, India", country: "India", code: "IN", description: "Manchester of India" },
  { name: "Surat, India", country: "India", code: "IN", description: "Diamond city" },
  { name: "Vadodara, India", country: "India", code: "IN", description: "Cultural capital" },
  { name: "Rajkot, India", country: "India", code: "IN", description: "Engineering hub" },
  { name: "Bhavnagar, India", country: "India", code: "IN", description: "Cultural center" },
  { name: "Jamnagar, India", country: "India", code: "IN", description: "Oil city" },
  { name: "Gandhinagar, India", country: "India", code: "IN", description: "State capital" },
  { name: "Bhuj, India", country: "India", code: "IN", description: "Craft city" },

  // Central India Region
  // Madhya Pradesh
  { name: "Bhopal, India", country: "India", code: "IN", description: "City of Lakes" },
  { name: "Indore, India", country: "India", code: "IN", description: "Cleanest city" },
  { name: "Jabalpur, India", country: "India", code: "IN", description: "Marble city" },
  { name: "Gwalior, India", country: "India", code: "IN", description: "Historical city" },
  { name: "Ujjain, India", country: "India", code: "IN", description: "Temple city" },
  { name: "Sagar, India", country: "India", code: "IN", description: "University city" },
  { name: "Rewa, India", country: "India", code: "IN", description: "White tiger city" },
  { name: "Satna, India", country: "India", code: "IN", description: "Cement city" },

  // Chhattisgarh
  { name: "Raipur, India", country: "India", code: "IN", description: "Rice bowl" },
  { name: "Bhilai, India", country: "India", code: "IN", description: "Steel city" },
  { name: "Bilaspur, India", country: "India", code: "IN", description: "City of festivals" },
  { name: "Korba, India", country: "India", code: "IN", description: "Power hub" },
  { name: "Raigarh, India", country: "India", code: "IN", description: "Cultural capital" },
  { name: "Jagdalpur, India", country: "India", code: "IN", description: "Tribal hub" },
  { name: "Durg, India", country: "India", code: "IN", description: "Industrial city" },
  { name: "Rajnandgaon, India", country: "India", code: "IN", description: "Historical city" },

  // Union Territories
  { name: "Chandigarh, India", country: "India", code: "IN", description: "The City Beautiful" },
  { name: "Puducherry, India", country: "India", code: "IN", description: "French colonial town" },
  { name: "Port Blair, India", country: "India", code: "IN", description: "Island capital" },
  { name: "Daman, India", country: "India", code: "IN", description: "Portuguese influence" },
  { name: "Diu, India", country: "India", code: "IN", description: "Beach paradise" },
  { name: "Silvassa, India", country: "India", code: "IN", description: "DNH capital" },
  { name: "Kavaratti, India", country: "India", code: "IN", description: "Lakshadweep capital" },
  { name: "Jammu, India", country: "India", code: "IN", description: "Winter capital" }
];

// Step titles and avatars for gamification
const steps = [
  { 
    title: "Create your account",
    subtitle: "Start your journey with us",
    icon: <User className="h-8 w-8 text-goginie-primary" />,
    mascotTip: "Your account lets you save and access all your trips!"
  },
  { 
    title: "Your trip details",
    subtitle: "Plan your journey",
    icon: <Compass className="h-8 w-8 text-goginie-primary" />,
    mascotTip: "Tell us where you're starting from and where you want to go!"
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
  const [startLocationSuggestions, setStartLocationSuggestions] = useState<typeof popularCities>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<typeof popularCities>([]);
  const [showStartSuggestions, setShowStartSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const startLocationRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  
  // Form state using react-hook-form
  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      startLocation: "",
      destination: "",
      startDate: "",
      endDate: "",
      budget: 50000,
      interests: [],
      travelGroupSize: 2,
      foodPreference: "",
      localFood: false,
      transportationMode: "airways"
    }
  });

  // State for multi-step form
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
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

  // Handle traveler count changes
  const incrementTravelers = () => {
    const currentValue = methods.getValues("travelGroupSize") || 1;
    methods.setValue("travelGroupSize", currentValue + 1);
  };

  const decrementTravelers = () => {
    const currentValue = methods.getValues("travelGroupSize") || 2;
    if (currentValue > 1) {
      methods.setValue("travelGroupSize", currentValue - 1);
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
          description: `Your trip from ${data.startLocation} to ${data.destination} is being prepared.`,
        });
        setIsLoading(false);
        setShowConfetti(false);
        navigate("/trip-result");
      }, 3000);
    } else {
      nextStep();
    }
  };
  
  // Filter cities based on input
  const filterCities = (input: string) => {
    if (input.length < 1) return [];
    return popularCities.filter(city =>
      city.name.toLowerCase().includes(input.toLowerCase()) ||
      city.country.toLowerCase().includes(input.toLowerCase()) ||
      city.description.toLowerCase().includes(input.toLowerCase())
    );
  };

  // Update suggestions when start location changes
  useEffect(() => {
    const startLocation = methods.watch("startLocation");
    setStartLocationSuggestions(filterCities(startLocation));
  }, [methods.watch("startLocation")]);

  // Update suggestions when destination changes
  useEffect(() => {
    const destination = methods.watch("destination");
    setDestinationSuggestions(filterCities(destination));
  }, [methods.watch("destination")]);

  // Handle clicks outside suggestion boxes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startLocationRef.current && !startLocationRef.current.contains(event.target as Node)) {
        setShowStartSuggestions(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setShowDestSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
                          <Label htmlFor="fullName">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              id="fullName" 
                              placeholder="John Doe"
                              className="pl-10" 
                              {...methods.register("fullName", { required: true })}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              className="pl-10" 
                              {...methods.register("email", { required: true })}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              id="password"
                              type="password"
                              placeholder="••••••••" 
                              className="pl-10"
                              {...methods.register("password", { required: true })}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Password must be at least 8 characters long
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="terms" 
                            checked={agreedToTerms}
                            onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                            required
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium cursor-pointer"
                            onClick={() => setAgreedToTerms(!agreedToTerms)}
                          >
                            I agree to the Terms of Service and Privacy Policy
                          </label>
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="startLocation">Your Current Location</Label>
                          <div className="relative" ref={startLocationRef}>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input 
                                id="startLocation" 
                                placeholder="City, Country" 
                                className="pl-10"
                                {...methods.register("startLocation", { required: true })}
                                onFocus={() => setShowStartSuggestions(true)}
                              />
                            </div>
                            
                            {/* Start Location suggestions dropdown */}
                            {showStartSuggestions && startLocationSuggestions.length > 0 && (
                              <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto border border-gray-200">
                                {startLocationSuggestions.map((city, index) => (
                                  <button
                                    key={index}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b last:border-b-0 transition-colors"
                                    onClick={() => {
                                      methods.setValue("startLocation", city.name);
                                      setShowStartSuggestions(false);
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
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="destination">Where do you want to go?</Label>
                          <div className="relative" ref={destinationRef}>
                            <div className="relative">
                              <Navigation className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input 
                                id="destination" 
                                placeholder="City, Country" 
                                className="pl-10"
                                {...methods.register("destination", { required: true })}
                                onFocus={() => setShowDestSuggestions(true)}
                              />
                            </div>
                            
                            {/* Destination suggestions dropdown */}
                            {showDestSuggestions && destinationSuggestions.length > 0 && (
                              <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto border border-gray-200">
                                {destinationSuggestions.map((city, index) => (
                                  <button
                                    key={index}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b last:border-b-0 transition-colors"
                                    onClick={() => {
                                      methods.setValue("destination", city.name);
                                      setShowDestSuggestions(false);
                                    }}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className="flex-shrink-0 mt-1">
                                        <Navigation className="h-5 w-5 text-goginie-primary" />
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
                          </div>
                        </div>
                        
                        {/* Map View */}
                        <div className="mt-6 space-y-2">
                          <Label>Route Preview</Label>
                          <Map 
                            startLocation={methods.watch("startLocation")} 
                            destination={methods.watch("destination")} 
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
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

                    {currentStep === 3 && (
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

                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <Label>Select your interests</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {allInterests.map((interest) => (
                            <Card 
                              key={interest.id}
                              className={`p-3 cursor-pointer transition-all ${
                                methods.watch("interests")?.includes(interest.id) 
                                  ? "border-goginie-primary bg-goginie-primary/10" 
                                  : ""
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Checkbox 
                                  id={`interest-${interest.id}`}
                                  checked={methods.watch("interests")?.includes(interest.id)}
                                  onCheckedChange={() => handleInterestChange(interest.id)}
                                />
                                <label 
                                  htmlFor={`interest-${interest.id}`} 
                                  className="text-sm font-medium cursor-pointer flex-1"
                                  onClick={() => handleInterestChange(interest.id)}
                                >
                                  {interest.label}
                                </label>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-4">
                        <Label>How many people are traveling?</Label>
                        
                        {/* Numeric traveler selector */}
                        <div className="flex items-center justify-center gap-4 my-6">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={decrementTravelers}
                            disabled={methods.watch("travelGroupSize") <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold text-goginie-primary">
                              {methods.watch("travelGroupSize")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {methods.watch("travelGroupSize") === 1 ? "Person" : "People"}
                            </div>
                          </div>
                          
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={incrementTravelers}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* Group size suggestions */}
                        <div className="grid grid-cols-4 gap-3 mt-4">
                          <Button 
                            type="button"
                            variant="outline"
                            className={methods.watch("travelGroupSize") === 1 ? "border-goginie-primary bg-goginie-primary/10" : ""}
                            onClick={() => methods.setValue("travelGroupSize", 1)}
                          >
                            Solo
                          </Button>
                          <Button 
                            type="button"
                            variant="outline"
                            className={methods.watch("travelGroupSize") === 2 ? "border-goginie-primary bg-goginie-primary/10" : ""}
                            onClick={() => methods.setValue("travelGroupSize", 2)}
                          >
                            Couple
                          </Button>
                          <Button 
                            type="button"
                            variant="outline"
                            className={methods.watch("travelGroupSize") === 4 ? "border-goginie-primary bg-goginie-primary/10" : ""}
                            onClick={() => methods.setValue("travelGroupSize", 4)}
                          >
                            Family
                          </Button>
                          <Button 
                            type="button"
                            variant="outline"
                            className={methods.watch("travelGroupSize") === 6 ? "border-goginie-primary bg-goginie-primary/10" : ""}
                            onClick={() => methods.setValue("travelGroupSize", 6)}
                          >
                            Group
                          </Button>
                        </div>
                      </div>
                    )}

                    {currentStep === 6 && (
                      <div className="space-y-4">
                        <Label>What are your food preferences?</Label>
                        <RadioGroup 
                          value={methods.watch("foodPreference") || ""} 
                          onValueChange={(value) => methods.setValue("foodPreference", value)}
                        >
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div 
                              className={`p-4 cursor-pointer transition-all rounded-md border ${methods.watch("foodPreference") === "vegetarian" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                              onClick={() => methods.setValue("foodPreference", "vegetarian")}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="vegetarian" id="food-vegetarian" />
                                <label htmlFor="food-vegetarian" className="text-base font-medium cursor-pointer flex-1">
                                  Vegetarian
                                </label>
                              </div>
                            </div>
                            
                            <div 
                              className={`p-4 cursor-pointer transition-all rounded-md border ${methods.watch("foodPreference") === "non-vegetarian" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                              onClick={() => methods.setValue("foodPreference", "non-vegetarian")}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="non-vegetarian" id="food-non-vegetarian" />
                                <label htmlFor="food-non-vegetarian" className="text-base font-medium cursor-pointer flex-1">
                                  Non-Vegetarian
                                </label>
                              </div>
                            </div>
                            
                            <div 
                              className={`p-4 cursor-pointer transition-all rounded-md border ${methods.watch("foodPreference") === "vegan" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                              onClick={() => methods.setValue("foodPreference", "vegan")}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="vegan" id="food-vegan" />
                                <label htmlFor="food-vegan" className="text-base font-medium cursor-pointer flex-1">
                                  Vegan
                                </label>
                              </div>
                            </div>
                            
                            <div 
                              className={`p-4 cursor-pointer transition-all rounded-md border ${methods.watch("foodPreference") === "no-preference" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                              onClick={() => methods.setValue("foodPreference", "no-preference")}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="no-preference" id="food-no-preference" />
                                <label htmlFor="food-no-preference" className="text-base font-medium cursor-pointer flex-1">
                                  No Preference
                                </label>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                        
                        <div className={`p-4 cursor-pointer transition-all rounded-md border ${methods.watch("localFood") ? "border-goginie-primary bg-goginie-primary/10" : ""}`}>
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
                        </div>
                      </div>
                    )}

                    {currentStep === 7 && (
                      <div className="space-y-4">
                        <Label>Preferred mode of transportation?</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div 
                            className={`p-4 cursor-pointer transition-all rounded-md border ${methods.watch("transportationMode") === "roadways" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                            onClick={() => methods.setValue("transportationMode", "roadways")}
                          >
                            <div className="flex flex-col items-center gap-2 py-3">
                              <Car className="h-8 w-8 text-goginie-primary" />
                              <label className="text-base font-medium cursor-pointer">Roadways</label>
                            </div>
                          </div>
                          
                          <div 
                            className={`p-4 cursor-pointer transition-all rounded-md border ${methods.watch("transportationMode") === "railways" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                            onClick={() => methods.setValue("transportationMode", "railways")}
                          >
                            <div className="flex flex-col items-center gap-2 py-3">
                              <Train className="h-8 w-8 text-goginie-primary" />
                              <label className="text-base font-medium cursor-pointer">Railways</label>
                            </div>
                          </div>
                          
                          <div 
                            className={`p-4 cursor-pointer transition-all rounded-md border ${methods.watch("transportationMode") === "airways" ? "border-goginie-primary bg-goginie-primary/10" : ""}`} 
                            onClick={() => methods.setValue("transportationMode", "airways")}
                          >
                            <div className="flex flex-col items-center gap-2 py-3">
                              <Plane className="h-8 w-8 text-goginie-primary" />
                              <label className="text-base font-medium cursor-pointer">Airways</label>
                            </div>
                          </div>
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
                        disabled={isLoading || (currentStep === 0 && !agreedToTerms)}
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
                {methods.watch("fullName") && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-goginie-primary shrink-0" />
                    <span className="font-medium">Name:</span>
                    <span className="ml-1">{methods.watch("fullName")}</span>
                  </div>
                )}
                
                {methods.watch("startLocation") && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-goginie-primary shrink-0" />
                    <span className="font-medium">From:</span>
                    <span className="ml-1">{methods.watch("startLocation")}</span>
                  </div>
                )}
                
                {methods.watch("destination") && (
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-goginie-primary shrink-0" />
                    <span className="font-medium">To:</span>
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
                        {methods.watch("interests").map((interest: string) => {
                          const interestObj = allInterests.find(i => i.id === interest);
                          return (
                            <span key={interest} className="px-2 py-0.5 bg-goginie-primary/10 text-xs rounded-full">
                              {interestObj ? interestObj.label : interest.charAt(0).toUpperCase() + interest.slice(1)}
                            </span>
                          );
                        })}
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
                      {!methods.watch("fullName") ? "Let's start by creating your account!" :
                       !methods.watch("startLocation") ? "Where are you starting your journey from?" :
                       !methods.watch("destination") ? "Where would you like to travel to?" :
                       !methods.watch("startDate") ? "When are you planning to visit " + methods.watch("destination") + "?" :
                       !methods.watch("budget") ? "What's your budget for this trip?" :
                       !methods.watch("interests") || methods.watch("interests").length === 0 ? "What are you interested in exploring?" :
                       `I'm preparing a magical journey from ${methods.watch("startLocation")} to ${methods.watch("destination")} for you!`}
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
