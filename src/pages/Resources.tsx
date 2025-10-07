import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink, Briefcase, FileText, Users, GraduationCap, TrendingUp } from "lucide-react";
import { link } from "fs";

const Resources = () => {
  const jobSites = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com",
      description: "Professional networking and job search platform",
      icon: Briefcase,
    },
    {
      name: "Indeed South Africa",
      url: "https://za.indeed.com",
      description: "Comprehensive job listings across all industries",
      icon: Briefcase,
    },
    {
      name: "SA Youth",
      url: "https://sayouth.mobi/Home/Index/EN",
      description: "South Africa's leading online recruitment platform",
      icon: Briefcase,
    },
    {
      name: "CareerJunction",
      url: "https://www.careerjunction.co.za",
      description: "Extensive database of South African job opportunities",
      icon: Briefcase,
    },
  ];

  const additionalResources = [
    {
      title: "Free Online CV Maker",
      description: "Zety’s AI-powered CV Maker helps you create a standout resume with ease. Just enter your details, choose a design, and let Zety guide you with smart suggestions that make your skills shine",
      icon: FileText,
      category: "Career Tools",
      link:"https://zety.com/blog/novoresume-review?utm_source=google&utm_medium=&utm_campaign=16701424450&utm_term=&network=x&device=c&adposition=&adgroupid=&placement=&utm_source=google&utm_medium=permax&utm_campaign=16701424450&utm_term=&network=x&device=c&adposition=&adgroupid=&placement=&gad_source=1&gad_campaignid=21202293734&gbraid=0AAAAADKztBagP3mw0747ZUZZGXgzmL1qO&gclid=Cj0KCQjw0Y3HBhCxARIsAN7931XCSoT6NL1_tYQe01tdthCT6XYVYW490rLlo7P0DwwzNbQWD6mHM-8aAjhNEALw_wcB",
    },
    {
      title: "Interview Preparation",
      description: "Boost your confidence with AI-powered mock interviews and real-time feedback.",
      icon: Users,
      category: "Career Tools",
      link: "https://interview.co/mock-interview"
    },
    {
      title: "Register Your Business",
      description: "BizPortal makes it simple for South Africans to register a new company, apply for tax, UIF, and business licenses—all in one place. It’s a fast, official, and reliable way to turn your business idea into reality.",
      icon: TrendingUp,
      category: "Entrepreneurship",
      link: "https://bizportal.gov.za/"
    },
    {
      title: "Continuous Learning",
      description: "Discover thousands of free and affordable online courses from top universities and leading companies. Build real-world skills, earn recognized certificates, and learn at your own pace—no matter where you are.",
      icon: GraduationCap,
      category: "Education",
      link: "https://www.coursera.org/"

    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access helpful tools, job opportunities, and resources to support your career journey
          </p>
        </div>

        {/* Job Sites */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Job Opportunity Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobSites.map((site, index) => {
              const Icon = site.icon;
              return (
                <Card
                  key={index}
                  className="shadow-card hover:shadow-hover transition-smooth animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle>{site.name}</CardTitle>
                          <CardDescription>{site.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="default" className="w-full">
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card
                  key={index}
                  className="text-center shadow-card hover:shadow-hover transition-smooth animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {resource.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CardDescription className="text-sm line-clamp-2 cursor-help">
                            {resource.description}
                          </CardDescription>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{resource.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardHeader>
                  {resource.link && (
                    <CardContent>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="default" className="w-full">
                          View Resource
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Download Resources CTA */}
        <div className="gradient-hero rounded-lg p-8 text-center text-card">
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Our career counselors are available to help you with CV writing, job applications, 
            and interview preparation. Contact us to schedule a session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button variant="accent" size="lg">
                Schedule Career Counseling
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
