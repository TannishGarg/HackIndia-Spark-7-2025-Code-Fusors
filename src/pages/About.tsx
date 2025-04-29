
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Plane, Star, Utensils, Sparkles, CircleCheck } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Plane className="h-6 w-6 text-goginie-primary" />,
      title: "AI-Powered Trip Planning",
      description: "Let our intelligent travel genie create personalized itineraries based on your preferences."
    },
    {
      icon: <Utensils className="h-6 w-6 text-goginie-primary" />,
      title: "Food & Restaurant Recommendations",
      description: "Discover local cuisines and restaurants that match your dietary preferences."
    },
    {
      icon: <MapPin className="h-6 w-6 text-goginie-primary" />,
      title: "Curated Experiences",
      description: "Explore handpicked activities and attractions tailored to your interests."
    },
    {
      icon: <Star className="h-6 w-6 text-goginie-primary" />,
      title: "Hotel Suggestions",
      description: "Find the perfect accommodations for your travel style and budget."
    }
  ];

  const team = [
    {
      name: "Aditya Sharma",
      role: "Founder & CEO",
      image: "https://picsum.photos/200/200?random=1"
    },
    {
      name: "Priya Patel",
      role: "Head of Product",
      image: "https://picsum.photos/200/200?random=2"
    },
    {
      name: "Rahul Gupta",
      role: "Lead Developer",
      image: "https://picsum.photos/200/200?random=3"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-8 px-4"
    >
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            About <span className="text-goginie-primary">GoGinie</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Your magical AI companion for creating unforgettable travel experiences
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At GoGinie, we believe that travel should be magical, personal, and stress-free. 
              Our AI-powered platform is designed to take the hassle out of trip planning, 
              allowing you to focus on creating memories that last a lifetime.
            </p>
            <p className="text-lg text-muted-foreground">
              Whether you're a solo adventurer, a couple on a romantic getaway, or a family seeking 
              fun experiences, GoGinie crafts personalized itineraries that match your unique preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/plan-trip" className="flex items-center gap-2">
                  Plan Your Trip <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/600/400?random=10" 
              alt="Travel planning" 
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3">
              <div className="bg-goginie-primary rounded-full p-2">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-medium">Your travel genie</p>
                <p className="text-sm text-muted-foreground">Making wishes come true</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">What Makes GoGinie Special</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform offers a range of features designed to create the perfect travel experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="bg-goginie-primary/10 rounded-full p-3 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How GoGinie Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our simple 3-step process makes travel planning effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Share Your Preferences",
              description: "Tell us where you want to go, your budget, and what you enjoy doing."
            },
            {
              step: "2",
              title: "Get Your Personalized Itinerary",
              description: "Our AI creates a custom travel plan tailored to your unique preferences."
            },
            {
              step: "3",
              title: "Enjoy Your Trip",
              description: "Follow your itinerary or adjust it on the fly - the choice is yours!"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="relative"
            >
              <div className="bg-goginie-primary/10 rounded-lg p-6 h-full">
                <div className="bg-goginie-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-goginie-primary" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate minds behind GoGinie
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="text-center"
            >
              <div className="mb-4 relative mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-goginie-primary/20">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-muted-foreground mb-3">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <Card className="bg-gradient-to-r from-goginie-primary/20 to-goginie-secondary/10 border-none">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Let GoGinie craft the perfect travel itinerary for your next adventure
            </p>
            <Button size="lg" asChild>
              <Link to="/plan-trip" className="flex items-center gap-2">
                Plan Your Trip Now <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </motion.div>
  );
}
