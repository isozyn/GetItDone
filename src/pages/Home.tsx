import Hero from "@/components/Hero";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Sprout, Home as HomeIcon, ArrowRight, Heart, HandHeart, Newspaper } from "lucide-react";
import workshopSewing from "@/assets/workshop-sewing.jpg";
import workshopGardening from "@/assets/workshop-gardening.jpg";
import workshopDomestic from "@/assets/workshop-domestic.jpg";

const Home = () => {
  const workshops = [
    {
      title: "Sewing & Tailoring",
      description: "Learn professional sewing skills and garment construction techniques.",
      icon: Scissors,
      image: workshopSewing,
      link: "/services",
    },
    {
      title: "Gardening & Agriculture",
      description: "Master sustainable farming and urban gardening practices.",
      icon: Sprout,
      image: workshopGardening,
      link: "/services",
    },
    {
      title: "Domestic Services",
      description: "Gain professional household management and care skills.",
      icon: HomeIcon,
      image: workshopDomestic,
      link: "/services",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We believe everyone deserves the opportunity to build a better future. 
              Through practical skills training and community support, we empower individuals 
              to overcome unemployment and create sustainable livelihoods for themselves and their families.
            </p>
          </div>
        </div>
      </section>


      {/* Featured Workshops */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Workshops</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical, hands-on training programs designed to equip you with in-demand skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {workshops.map((workshop, index) => {
              const Icon = workshop.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-orange-200 shadow-card group hover:shadow-hover transition-smooth overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{workshop.title}</CardTitle>
                    <CardDescription>{workshop.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={workshop.link}>
                      <Button variant="ghost" className="w-full group">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button variant="default" size="lg">
                View All Workshops
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Sections */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center mb-12">
           <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Involved</h2>
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Your involvement can spark change—start today!
           </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 border-orange-200 shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary-foreground" fill="currentColor" />
                </div>
                <CardTitle>Donate</CardTitle>
                <CardDescription>
                  Your contribution helps us provide free training to those who need it most
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/donate">
                  <Button variant="hero" className="w-full">
                    Make a Donation
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-orange-200 shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <HandHeart className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>Volunteer</CardTitle>
                <CardDescription>
                  Share your skills and time to empower others in your community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/get-involved">
                  <Button variant="secondary" className="w-full">
                    Join Our Team
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-orange-200 shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Newspaper className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>
                  Read success stories and stay informed about our latest programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/news">
                  <Button variant="accent" className="w-full">
                    Read Our News
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

         {/* Sponsors Section */}
      <section className="py-8 bg-background">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Our Sponsors</h2>
        <div className="mt-10 flex  gap-6 justify-center">
            <div className="h-20 w-20 flex items-center justify-center">
              <img
                src="/nedBLogo.png"
                alt="Sponsor Name"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-20 w-20 flex items-center justify-center">
              <img
                src="/FLM.png"
                alt="Sponsor Name"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-20 w-20 flex items-center justify-center">
              <img
                src="/SRLogo.png"
                alt="Sponsor Name"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-20 w-20 flex items-center justify-center">
              <img
                src="/YESLogo.png"
                alt="Sponsor Name"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-20 w-20 flex items-center justify-center">
              <img
                src="/UVULogo.png"
                alt="Sponsor Name"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-20 w-20 flex items-center justify-center">
              <img
                src="/StodelsLogo.png"
                alt="Sponsor Name"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </section>
    </div>
  );
};

export default Home;
