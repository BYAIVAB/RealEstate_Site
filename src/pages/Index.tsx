import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSearch from '@/components/HeroSearch';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { mockProperties } from '@/data/mockProperties';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Shield, 
  Users, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Home,
  Key,
  Briefcase
} from 'lucide-react';

const Index: React.FC = () => {
  const featuredProperties = mockProperties.filter(p => p.isFeatured && p.isApproved).slice(0, 4);
  const recentProperties = mockProperties.filter(p => p.isApproved).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float stagger-2" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="animate-fade-in">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
                #1 Real Estate Platform in India
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight animate-slide-up">
              Find Your <span className="text-accent">Dream Home</span> Today
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto animate-slide-up stagger-1">
              Discover thousands of properties across India. Buy, sell, or rent with confidence.
            </p>

            <div className="animate-slide-up stagger-2">
              <HeroSearch />
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 animate-slide-up stagger-3">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-accent">10K+</p>
                <p className="text-primary-foreground/70 text-sm">Properties</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-accent">5K+</p>
                <p className="text-primary-foreground/70 text-sm">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-accent">50+</p>
                <p className="text-primary-foreground/70 text-sm">Cities</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-accent">99%</p>
                <p className="text-primary-foreground/70 text-sm">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Featured Properties
              </h2>
              <p className="text-muted-foreground mt-2">
                Hand-picked premium properties for you
              </p>
            </div>
            <Link to="/search">
              <Button variant="outline">
                View All Properties
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property, index) => (
              <div key={property.id} className={`animate-slide-up stagger-${index + 1}`}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              How We Can Help You
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Whether you're buying, selling, or renting, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-card rounded-2xl p-8 shadow-soft card-hover border border-border text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                <Home className="h-8 w-8 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Buy a Home</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Find your perfect place from our extensive collection of verified properties across India.
              </p>
              <Link to="/search?status=sale">
                <Button variant="ghost" className="group-hover:text-accent">
                  Browse Properties
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="group bg-card rounded-2xl p-8 shadow-soft card-hover border border-border text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                <Key className="h-8 w-8 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Rent a Home</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Discover rental properties that match your lifestyle and budget requirements.
              </p>
              <Link to="/search?status=rent">
                <Button variant="ghost" className="group-hover:text-accent">
                  Find Rentals
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="group bg-card rounded-2xl p-8 shadow-soft card-hover border border-border text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                <Briefcase className="h-8 w-8 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">List Your Property</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Become an agent and list your properties to reach thousands of potential buyers.
              </p>
              <Link to="/register">
                <Button variant="ghost" className="group-hover:text-accent">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Why Choose PropMart
            </h2>
            <p className="text-primary-foreground/70 mt-2">
              India's most trusted real estate platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Listings</h3>
              <p className="text-primary-foreground/70 text-sm">
                Every property is verified by our team for authenticity
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Agents</h3>
              <p className="text-primary-foreground/70 text-sm">
                Professional agents to guide you through the process
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Market Insights</h3>
              <p className="text-primary-foreground/70 text-sm">
                Real-time market data to make informed decisions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Process</h3>
              <p className="text-primary-foreground/70 text-sm">
                Simplified buying, selling, and renting experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Recent Properties
              </h2>
              <p className="text-muted-foreground mt-2">
                Newly listed properties just for you
              </p>
            </div>
            <Link to="/search">
              <Button variant="accent">
                Explore All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProperties.slice(0, 4).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of happy customers who found their perfect home with PropMart
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <Button variant="accent" size="xl">
                  Start Searching
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="xl">
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
