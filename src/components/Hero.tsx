import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, GraduationCap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpeg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Community members learning new skills together"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.15)" }}
        />
        <div className="absolute inset-0 gradient-hero" style={{ opacity: 0.4 }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-4 mb-6">
            <img src="/nLogo.png" alt="Skillbridge Logo" className="h-20 w-auto" />
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GetItDone</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-card">
            Empowering Communities,
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Building Futures
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-card/90 max-w-2xl">
            We provide practical skills training to help South Africans overcome unemployment 
            and build sustainable livelihoods through our community-focused workshops.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="border-2 border-orange-200 shadow-card bg-card/10 backdrop-blur-sm rounded-lg p-4 border border-card/20">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold text-card">500+</div>
                  <div className="text-sm text-card/80">Lives Transformed</div>
                </div>
              </div>
            </div>
            <div className="border-2 border-orange-200 shadow-card bg-card/10 backdrop-blur-sm rounded-lg p-4 border border-card/20">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold text-card">6</div>
                  <div className="text-sm text-card/80">Skills Programs</div>
                </div>
              </div>
            </div>
            <div className="border-2 border-orange-200 shadow-card bg-card/10 backdrop-blur-sm rounded-lg p-4 border border-card/20">
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8 text-accent" fill="currentColor" />
                <div>
                  <div className="text-2xl font-bold text-card">85%</div>
                  <div className="text-sm text-card/80">Employment Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/services">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Explore Our Workshops
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Get Involved
              </Button>
            </Link>
            <Link to="/donate">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">
                Donate Now
              </Button>
            </Link>
            
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
