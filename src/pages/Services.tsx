import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Scissors, Sprout, Home, Users, Clock, CheckCircle, Shield, ChefHat, ShoppingBag, Sparkles } from "lucide-react";
import workshopSewing from "@/assets/workshop-sewing.jpg";
import workshopGardening from "@/assets/workshop-gardening.jpg";
import workshopDomestic from "@/assets/workshop-domestic.jpg";
import workshopSecurity from "@/assets/workshop-security.jpg";
import workshopCatering from "@/assets/workshop-catering.jpg";
import workshopRetail from "@/assets/workshop-retail.jpg";
import workshopCleaning from "@/assets/workshop-cleaning.jpg";

const Services = () => {
  const workshops = [
    {
      title: "Sewing & Tailoring",
      description: "Comprehensive training in garment construction, pattern making, and professional sewing techniques.",
      image: workshopSewing,
      icon: Scissors,
      duration: "8 weeks",
      spots: "15 per class",
      features: [
        "Basic to advanced sewing techniques",
        "Pattern making and design",
        "Machine operation and maintenance",
        "Business skills for tailors",
        "Job placement assistance",
      ],
    },
    {
      title: "Gardening & Agriculture",
      description: "Learn sustainable farming practices, urban gardening, and agricultural business management.",
      image: workshopGardening,
      icon: Sprout,
      duration: "10 weeks",
      spots: "20 per class",
      features: [
        "Soil preparation and management",
        "Crop planning and rotation",
        "Organic farming methods",
        "Urban gardening techniques",
        "Market access and sales",
      ],
    },
    {
      title: "Domestic & Care Services",
      description: "Professional training in household management, elderly care, and childcare services.",
      image: workshopDomestic,
      icon: Home,
      duration: "6 weeks",
      spots: "12 per class",
      features: [
        "Professional cleaning techniques",
        "Time management and organization",
        "Basic first aid and safety",
        "Customer service skills",
        "Certified credentials",
      ],
    },
    {
      title: "Security & Protection Services",
      description: "Professional security guard training covering safety protocols, emergency response, and professional conduct.",
      image: workshopSecurity,
      icon: Shield,
      duration: "8 weeks",
      spots: "25 per class",
      features: [
        "Security protocols and procedures",
        "Emergency response training",
        "Conflict resolution skills",
        "Report writing and documentation",
        "PSIRA registration assistance",
      ],
    },
    {
      title: "Food Preparation & Catering",
      description: "Learn professional cooking skills, food safety, and catering business management.",
      image: workshopCatering,
      icon: ChefHat,
      duration: "10 weeks",
      spots: "15 per class",
      features: [
        "Professional cooking techniques",
        "Food safety and hygiene standards",
        "Menu planning and costing",
        "Catering event management",
        "Kitchen equipment operation",
      ],
    },
    {
      title: "Retail & Customer Service",
      description: "Master sales techniques, customer relations, and professional retail operations.",
      image: workshopRetail,
      icon: ShoppingBag,
      duration: "6 weeks",
      spots: "20 per class",
      features: [
        "Customer service excellence",
        "Sales techniques and strategies",
        "Cash handling and point of sale",
        "Stock management basics",
        "Professional communication skills",
      ],
    },
    {
      title: "Commercial Cleaning & Maintenance",
      description: "Professional training in commercial cleaning, equipment operation, and facility maintenance.",
      image: workshopCleaning,
      icon: Sparkles,
      duration: "5 weeks",
      spots: "18 per class",
      features: [
        "Industrial cleaning techniques",
        "Equipment operation and safety",
        "Chemical handling and storage",
        "Quality control standards",
        "Contract cleaning operations",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Workshops</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free, high-quality training programs designed to equip you with practical skills 
            for sustainable employment
          </p>
        </div>

        {/* Workshops */}
        <div className="space-y-12">
          {workshops.map((workshop, index) => {
            const Icon = workshop.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden shadow-card hover:shadow-hover transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="relative h-64 lg:h-full">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl md:text-3xl">{workshop.title}</CardTitle>
                      <CardDescription className="text-base">
                        {workshop.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0 space-y-6">
                      {/* Details */}
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">{workshop.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">{workshop.spots}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-semibold mb-3">What You'll Learn:</h4>
                        <ul className="space-y-2">
                          {workshop.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <Link to="/contact" className="block mt-2">
                        <Button variant="default" size="lg" className="w-full">
                          Apply for This Workshop
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-muted rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            All our workshops are completely free and include materials, refreshments, 
            and job placement assistance upon completion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Apply Now
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="secondary" size="lg">
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
