import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { mockProperties } from '@/data/mockProperties';
import { Heart, ArrowRight, Search } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { favorites } = useFavorites();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const favoriteProperties = mockProperties.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-8 w-8 text-accent" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Saved Properties
              </h1>
            </div>
            <p className="text-muted-foreground">
              {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>

          {favoriteProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-xl border border-border">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">No Saved Properties</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start exploring properties and save your favorites to view them here later.
              </p>
              <Link to="/search">
                <Button variant="accent">
                  <Search className="h-4 w-4" />
                  Explore Properties
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
