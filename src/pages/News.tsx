import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const News = () => {
  const articles = [
    {
      title: "50 Graduates Find Employment This Quarter",
      date: "March 15, 2025",
      category: "Success Story",
      excerpt: "We're thrilled to announce that 50 of our recent workshop graduates have secured employment in their trained fields. This achievement highlights the effectiveness of our practical training approach.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "New Sewing Workshop Opening in Soweto",
      date: "March 10, 2025",
      category: "Program Launch",
      excerpt: "Responding to high demand, we're opening our fourth sewing and tailoring workshop location in Soweto. Registration opens next week with 20 available spots.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Partnership with Local Businesses Creates Job Opportunities",
      date: "March 5, 2025",
      category: "Partnership",
      excerpt: "Three major local businesses have committed to hiring our graduates, creating over 100 job opportunities in domestic services and gardening sectors.",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Meet Sarah: From Unemployment to Business Owner",
      date: "February 28, 2025",
      category: "Success Story",
      excerpt: "Sarah completed our sewing workshop in 2023 and now runs her own successful tailoring business, employing three other graduates from our program.",
      image: "/sarah.jpeg",
    },
    {
      title: "Urban Gardening Workshop Wins Community Award",
      date: "February 20, 2025",
      category: "Recognition",
      excerpt: "Our innovative urban gardening program has been recognized by the Johannesburg Municipality for its contribution to food security and community development.",
      image: "/gardening.webp",
    },
    {
      title: "Volunteer Appreciation Event: Thank You!",
      date: "February 15, 2025",
      category: "Event",
      excerpt: "Last weekend, we celebrated our amazing volunteers who have contributed over 1,200 hours this year. Thank you for making our mission possible!",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Success Story":
        return "bg-primary text-primary-foreground";
      case "Program Launch":
        return "bg-secondary text-secondary-foreground";
      case "Partnership":
        return "bg-accent text-accent-foreground";
      case "Recognition":
        return "gradient-warm text-primary-foreground";
      case "Event":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Carousel API and autoplay state
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  // Autoplay: advance every 7 seconds, reset on user interaction, pause on hover/focus
  React.useEffect(() => {
    if (!api) return;

    const INTERVAL = 7000; // 7 seconds
    let timer: number | undefined;

    const start = () => {
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(() => {
        if (!isPaused) api.scrollNext();
      }, INTERVAL) as unknown as number;
    };

    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    const reset = () => {
      stop();
      start();
    };

    // start autoplay
    start();

    // reset autoplay when user interacts
    api.on("select", reset);
    api.on("pointerDown", reset);

    return () => {
      stop();
      api.off("select", reset);
      api.off("pointerDown", reset);
    };
  }, [api, isPaused]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about our latest programs, success stories, and community impact
          </p>
        </div>

        {/* Featured Article */}
        {articles[0] && (
          <Card className="border-2 border-orange-200 shadow-card mb-12 overflow-hidden shadow-hover rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-56 lg:h-80 ">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="border-2 border-orange-200 shadow-card w-full h-full object-cover object-center rounded-md"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(articles[0].category)}>
                    Featured
                  </Badge>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className={getCategoryColor(articles[0].category)}>
                    <Tag className="h-3 w-3 mr-1" />
                    {articles[0].category}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {articles[0].date}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{articles[0].title}</h2>
                <p className="text-muted-foreground">{articles[0].excerpt}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Articles Carousel (autoplay every 7s, arrows to navigate) */}
        <div
          className="mb-6 w-full relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <Carousel className="w-full" setApi={(a) => setApi(a)}>
            <CarouselContent className="items-stretch w-full">
              {articles.map((article, index) => (
                <CarouselItem key={index} className="w-full">
                  <Card className="overflow-hidden border-2 border-orange-200 shadow-card hover:shadow-hover h-full w-full">
                    <div className="relative h-64 md:h-90 lg:h-[28rem]">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="border-2 border-orange-200 shadow-card w-full h-full object-cover object-center rounded-md"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getCategoryColor(article.category)}>
                          <Tag className="h-3 w-3 mr-1" />
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </div>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription>{article.excerpt}</CardDescription>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Floating Carousel Arrows - Independently positioned */}
            <div className="absolute top-0 left-0 right-0 h-64 md:h-90 lg:h-[28rem] pointer-events-none">
              {/* Left Arrow */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <CarouselPrevious className="w-12 h-12 !bg-orange-300 text-white !border-none shadow-2xl rounded-full hover:!bg-orange-600 focus:!bg-orange-600 transition-transform transform hover:scale-110 hover:-translate-y-1 z-20 pointer-events-auto" />
              </div>
              {/* Right Arrow */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <CarouselNext 
                  className="w-12 h-12 !bg-orange-300 text-white !border-none shadow-2xl rounded-full hover:!bg-orange-600 focus:!bg-orange-600 transition-transform transform hover:scale-110 hover:-translate-y-1 z-20 pointer-events-auto" 
                  style={{ backgroundColor: 'rgb(253 186 116)' }}
                />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default News;
