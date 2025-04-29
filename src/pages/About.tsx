
import { CalendarRange, Check, Compass, GlobeIcon, Hotel, Plane, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">About GoGinie</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your magical AI travel companion that crafts personalized trips based on your preferences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg">
            At GoGinie, we believe travel should be personalized, stress-free, and magical. Our AI-powered platform 
            transforms how you plan trips by understanding your unique preferences and crafting the perfect itinerary 
            just for you.
          </p>
          <p className="text-lg">
            No more spending hours researching destinations or worrying about finding the right accommodations. 
            GoGinie handles everything, so you can focus on creating memories that last a lifetime.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-goginie-primary/20 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-goginie-primary/10 rounded-full z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Travel experience" 
              className="rounded-lg shadow-xl w-full h-96 object-cover z-10 relative"
            />
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">How GoGinie Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our magical AI assistant uses advanced algorithms to create the perfect travel experience for you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          {
            icon: <Users className="w-8 h-8 text-goginie-primary" />,
            title: "Tell Us About Yourself",
            description: "Share your travel preferences, budget, and interests with our intuitive form."
          },
          {
            icon: <Compass className="w-8 h-8 text-goginie-primary" />,
            title: "AI Planning Magic",
            description: "Our AI analyzes thousands of options to create a personalized itinerary just for you."
          },
          {
            icon: <Plane className="w-8 h-8 text-goginie-primary" />,
            title: "Enjoy Your Journey",
            description: "Receive a complete day-by-day plan with accommodations, activities, and dining options."
          }
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="rounded-full bg-goginie-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-goginie-primary/5 rounded-2xl p-8 mb-20"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Why Choose GoGinie</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not just another travel planner. Here's what makes us special.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <CalendarRange className="h-6 w-6 text-goginie-primary" />,
              title: "Personalized Itineraries",
              description: "Custom day-by-day plans based on your unique preferences and travel style."
            },
            {
              icon: <Hotel className="h-6 w-6 text-goginie-primary" />,
              title: "Curated Accommodations",
              description: "Handpicked lodging options that match your budget and comfort requirements."
            },
            {
              icon: <GlobeIcon className="h-6 w-6 text-goginie-primary" />,
              title: "Local Experiences",
              description: "Discover hidden gems and authentic local experiences beyond typical tourist spots."
            },
            {
              icon: <Star className="h-6 w-6 text-goginie-primary" />,
              title: "Smart Recommendations",
              description: "AI-powered suggestions that improve with every trip you plan."
            }
          ].map((feature, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="rounded-full bg-white p-2 shadow-sm">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Adventure?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Let our AI genie craft the perfect travel experience for you.
        </p>
        <a href="/plan-trip" className="inline-flex items-center gap-2 bg-goginie-primary text-white px-6 py-3 rounded-lg hover:bg-goginie-secondary transition-colors">
          Plan Your Trip <Compass className="w-5 h-5" />
        </a>
      </motion.div>
    </div>
  );
}
