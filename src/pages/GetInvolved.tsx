import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Heart, Briefcase, GraduationCap, HandHeart, Lightbulb } from "lucide-react";

const GetInvolved = () => {
  const opportunities = [
    {
      title: "Workshop Instructor",
      icon: GraduationCap,
      description: "Share your professional skills by teaching our workshop participants",
      commitment: "4-8 hours per week",
      requirements: ["Professional experience in sewing, gardening, or domestic work", "Patience and teaching ability", "Reliable availability"],
    },
    {
      title: "Mentor",
      icon: Users,
      description: "Guide and support graduates as they transition into employment",
      commitment: "2-4 hours per week",
      requirements: ["Professional experience in any field", "Strong communication skills", "Commitment to empowerment"],
    },
    {
      title: "Career Counselor",
      icon: Briefcase,
      description: "Help participants with job search, CV writing, and interview preparation",
      commitment: "Flexible hours",
      requirements: ["HR or career coaching experience", "Understanding of local job market", "Empathy and encouragement"],
    },
    {
      title: "Administrative Support",
      icon: Lightbulb,
      description: "Assist with program coordination, communications, and operations",
      commitment: "Flexible hours",
      requirements: ["Organizational skills", "Computer literacy", "Attention to detail"],
    },
    {
      title: "Fundraising Volunteer",
      icon: Heart,
      description: "Help organize events and campaigns to support our mission",
      commitment: "Project-based",
      requirements: ["Creative thinking", "Communication skills", "Passion for the cause"],
    },
    {
      title: "Community Outreach",
      icon: HandHeart,
      description: "Connect with communities to spread awareness and recruit participants",
      commitment: "Flexible hours",
      requirements: ["Local community connections", "Communication skills", "Cultural sensitivity"],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Involved</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our community of passionate volunteers making a real difference in people's lives. 
            Your time and skills can transform futures.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl">50+</CardTitle>
              <CardDescription>Active Volunteers</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                <Heart className="h-6 w-6 text-secondary-foreground" fill="currentColor" />
              </div>
              <CardTitle className="text-3xl">1,200+</CardTitle>
              <CardDescription>Volunteer Hours This Year</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-2">
                <GraduationCap className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle className="text-3xl">85%</CardTitle>
              <CardDescription>Graduate Employment Rate</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Volunteer Opportunities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Volunteer Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity, index) => {
              const Icon = opportunity.icon;
              return (
                <Card
                  key={index}
                  className="shadow-card hover:shadow-hover transition-smooth animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold mb-2">Time Commitment:</p>
                        <p className="text-sm text-muted-foreground">{opportunity.commitment}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-2">Requirements:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {opportunity.requirements.map((req, idx) => (
                            <li key={idx}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <Link to="/contact">
                          <Button variant="apply" className="w-full mt-4">
                            Apply
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Other Ways to Help */}
        <div className="bg-muted rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Other Ways to Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Corporate Partnerships</CardTitle>
                <CardDescription>
                  Partner with us to provide job opportunities, sponsor workshops, or offer in-kind donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/contact">
                  <Button variant="default" className="w-full">
                    Explore Partnership
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
                <CardDescription>
                  Financial contributions help us provide free training, materials, and support services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/donate">
                  <Button variant="hero" className="w-full">
                    Donate Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Apply CTA */}
        <div className="text-center gradient-hero rounded-lg p-12 text-card">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Fill out our volunteer application form and we'll be in touch to discuss the best fit for your skills and availability.
          </p>
          <Link to="/contact">
            <Button variant="accent" size="lg">
              Apply to Volunteer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
