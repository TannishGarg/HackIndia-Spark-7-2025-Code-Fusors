
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowRight,
  AtSign,
  Building2,
  Check,
  Compass,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form after a delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about GoGinie? Our team is here to help you plan your perfect trip.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardContent className="p-6">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="John Doe" 
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="How can we help you?" 
                      value={formState.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Tell us what you need help with..." 
                      rows={5} 
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-goginie-primary hover:bg-goginie-secondary flex items-center gap-2 justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending message..."
                    ) : (
                      <>
                        Send Message <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-goginie-primary/10 p-2">
                    <Building2 className="h-5 w-5 text-goginie-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">Our Office</h3>
                    <p className="text-muted-foreground text-sm">
                      GoGinie Headquarters<br />
                      Tech Park, Bengaluru<br />
                      Karnataka, India 560001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-goginie-primary/10 p-2">
                    <Phone className="h-5 w-5 text-goginie-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">Phone</h3>
                    <p className="text-muted-foreground text-sm">
                      Customer Support: +91 9876543210<br />
                      Business Inquiries: +91 9876543211
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-goginie-primary/10 p-2">
                    <AtSign className="h-5 w-5 text-goginie-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      Support: support@goginie.com<br />
                      Info: info@goginie.com
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <h3 className="font-medium text-base mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
                      <a 
                        key={social} 
                        href="#" 
                        className="bg-goginie-primary/10 hover:bg-goginie-primary/20 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                      >
                        <span className="sr-only">{social}</span>
                        <Compass className="h-4 w-4 text-goginie-primary" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-goginie-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-goginie-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base mb-2">Visit Us</h3>
                    <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.01693789906!2d77.59393316482937!3d12.971599890855802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167d241c03c3%3A0xdf6d60ab4586d0c8!2sUB%20City!5e0!3m2!1sen!2sin!4v1666099439603!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    <Button variant="link" className="p-0 h-auto mt-2 text-goginie-primary">
                      Get Directions <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
