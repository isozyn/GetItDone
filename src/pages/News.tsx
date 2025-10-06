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
      date: "March 15, 2024",
      category: "Success Story",
      excerpt: "We're thrilled to announce that 50 of our recent workshop graduates have secured employment in their trained fields. This achievement highlights the effectiveness of our practical training approach.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "New Sewing Workshop Opening in Soweto",
      date: "March 10, 2024",
      category: "Program Launch",
      excerpt: "Responding to high demand, we're opening our fourth sewing and tailoring workshop location in Soweto. Registration opens next week with 20 available spots.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Partnership with Local Businesses Creates Job Opportunities",
      date: "March 5, 2024",
      category: "Partnership",
      excerpt: "Three major local businesses have committed to hiring our graduates, creating over 100 job opportunities in domestic services and gardening sectors.",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Meet Sarah: From Unemployment to Business Owner",
      date: "February 28, 2024",
      category: "Success Story",
      excerpt: "Sarah completed our sewing workshop in 2023 and now runs her own successful tailoring business, employing three other graduates from our program.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Urban Gardening Workshop Wins Community Award",
      date: "February 20, 2024",
      category: "Recognition",
      excerpt: "Our innovative urban gardening program has been recognized by the Johannesburg Municipality for its contribution to food security and community development.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Volunteer Appreciation Event: Thank You!",
      date: "February 15, 2024",
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

  // Autoplay: advance every 7 seconds, reset on user interaction, pause on hover
  React.useEffect(() => {
    if (!api) return;

    const INTERVAL = 7000; // 7 seconds
    let timer: number | undefined;

    const start = () => {
      // clear any existing timer
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(() => {
        if (!isPaused) api.scrollNext();
      }, INTERVAL);
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

    // reset autoplay when user interacts (select, pointerDown)
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

        {/* Carousel showing all articles (static content turned into a carousel) */}
        <div
          className="mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <Carousel className="w-full" setApi={(a) => setApi(a)}>
            <CarouselContent className="items-stretch">
              {articles.map((article, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden shadow-card hover:shadow-hover h-full">
                    <div className="relative h-64 md:h-80 lg:h-96">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
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
            {/* Prev/Next controls */}
            <div className="relative mt-4">
              <CarouselPrevious className="!left-4 md:!left-6" />
              <CarouselNext className="!right-4 md:!right-6" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default News;
