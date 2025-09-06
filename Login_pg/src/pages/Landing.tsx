import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Brain, Users, TrendingUp, Zap, AlertTriangle, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const Landing = () => {
  const navigate = useNavigate();
  
  // Scroll animation hooks
  const heroAnimation = useScrollAnimation(0.1);
  const featuresAnimation = useScrollAnimation(0.1, 200);
  const benefitsAnimation = useScrollAnimation(0.1, 400);
  const ctaAnimation = useScrollAnimation(0.1, 100);
  const { ref: featureCardsRef, visibleItems: featureCardsVisible } = useStaggeredAnimation(3, 200);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Intelligent Insights",
      description: "Proactive intelligence that catches potential issues early and helps teams stay ahead"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Seamless Communication", 
      description: "Communication tools that naturally fit into your team's workflow and thinking patterns"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Continuous Improvement",
      description: "Built-in analytics and feedback loops that help teams operate at their best every day"
    }
  ];

  const benefits = [
    "Stay organized without overwhelming complexity",
    "Catch potential issues before they become problems", 
    "Improve team alignment and decision-making",
    "Work smarter with intelligent automation",
    "Seamlessly adapt to your team's natural workflow",
    "Get actionable insights for continuous improvement"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 animate-fade-in-down">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SynergySphere</span>
          </div>
          <Button variant="outline" onClick={() => navigate('/login')} className="hover:scale-105 transition-all duration-200">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div 
          ref={heroAnimation.ref} 
          className={`container mx-auto text-center transition-all duration-1000 ${
            heroAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
              The Central Nervous System for Teams
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              SynergySphere goes beyond project management — it becomes an intelligent backbone that helps teams think, communicate, and move forward together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="primary-gradient text-primary-foreground hover:opacity-90 shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => navigate('/login')}
              >
                Get Started Free
              </Button>
              
            </div>
            <div className="max-w-3xl mx-auto">
              <img 
                src={heroImage} 
                alt="SynergySphere intelligent dashboard showing team collaboration analytics and proactive insights"
                className="rounded-lg shadow-2xl border border-border animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div 
            ref={featuresAnimation.ref}
            className={`text-center mb-16 transition-all duration-800 ${
              featuresAnimation.isVisible ? 'animate-fade-in-down' : 'opacity-0 -translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why SynergySphere Works Differently
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed to support how teams naturally think, communicate, and collaborate
            </p>
          </div>
          
          <div ref={featureCardsRef} className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                  featureCardsVisible[index] 
                    ? index % 2 === 0 
                      ? 'animate-fade-in-left' 
                      : 'animate-fade-in-right'
                    : 'opacity-0 translate-x-10'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-200">
                    <div className="text-primary-foreground">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div 
            ref={benefitsAnimation.ref}
            className={`max-w-2xl mx-auto transition-all duration-800 ${
              benefitsAnimation.isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
            }`}
          >
            <h3 className="text-2xl font-bold text-center mb-8">How Teams Thrive with SynergySphere</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    benefitsAnimation.isVisible 
                      ? 'animate-fade-in-left' 
                      : 'opacity-0 -translate-x-5'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 hero-gradient">
        <div 
          ref={ctaAnimation.ref}
          className={`container mx-auto text-center transition-all duration-800 ${
            ctaAnimation.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Unlock Your Team's Potential?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join forward-thinking teams who are working smarter with SynergySphere's intelligent collaboration platform
          </p>
          <Button 
            size="lg" 
            className="primary-gradient text-primary-foreground hover:opacity-90 shadow-lg hover:scale-105 transition-all duration-200"
            onClick={() => navigate('/login')}
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 SynergySphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;