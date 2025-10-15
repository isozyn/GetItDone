import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, GraduationCap, Sparkles, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Donate = () => {
  const impactAreas = [
    {
      icon: GraduationCap,
      title: "Training Materials",
      description: "Provide fabrics, seeds, tools, and equipment for hands-on learning",
      amount: "R500",
    },
    {
      icon: Users,
      title: "One Student",
      description: "Cover the full cost of training one person through a complete workshop",
      amount: "R2,500",
    },
    {
      icon: Heart,
      title: "Starter Kits",
      description: "Equip graduates with tools and materials to start their careers",
      amount: "R1,000",
    },
    {
      icon: Sparkles,
      title: "New Workshop",
      description: "Help us launch a new workshop location in an underserved community",
      amount: "R25,000",
    },
  ];

  const donationOptions = [
    { amount: "R100", description: "Materials for one day" },
    { amount: "R500", description: "Week of training supplies" },
    { amount: "R1,000", description: "Starter kit for graduate" },
    { amount: "R2,500", description: "Full workshop scholarship" },
  ];

  const benefits = [
    "100% of donations go directly to programs",
    "Tax-deductible receipts provided",
    "Regular impact reports and updates",
    "Recognition in our annual report",
    "Optional naming opportunities for large donations",
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-warm mb-4">
            <Heart className="h-8 w-8 text-primary-foreground" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Difference Today</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your donation empowers individuals with skills, confidence, and opportunities 
            to build better futures for themselves and their families
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center border-2 border-orange-200 shadow-card">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl">500+</CardTitle>
              <CardDescription>Lives Transformed This Year</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-2 border-orange-200 shadow-card">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                <GraduationCap className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-3xl">85%</CardTitle>
              <CardDescription>Graduate Employment Rate</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-2 border-orange-200 shadow-card">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-2">
                <Heart className="h-6 w-6 text-accent-foreground" fill="currentColor" />
              </div>
              <CardTitle className="text-3xl">R2.5M</CardTitle>
              <CardDescription>Community Impact Value</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Your Impact */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impactAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-orange-200 shadow-card hover:shadow-hover transition-smooth animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{area.title}</CardTitle>
                          <CardDescription className="mt-2">{area.description}</CardDescription>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary shrink-0">{area.amount}</div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Donation Options */}
       
            <div className="text-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Donate Now
                  </Button>
                </Link>
              <div className="mt-20" />
            </div>
        {/* Benefits */}
        <div className="mb-16">
          <Card className="border-2 border-orange-200 shadow-card shadow-hover gradient-hero text-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Why Donate to GetItDone?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Donate;
