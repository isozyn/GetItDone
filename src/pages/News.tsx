import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";

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
          <Card className="mb-12 overflow-hidden shadow-hover">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-full">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-full object-cover"
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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article, index) => (
            <Card
              key={index}
              className="overflow-hidden shadow-card hover:shadow-hover transition-smooth animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-48">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
