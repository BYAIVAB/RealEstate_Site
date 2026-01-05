import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProperties } from '@/data/mockProperties';
import { useFavorites } from '@/contexts/FavoritesContext';
import { formatPrice, formatArea, getPropertyTypeLabel, formatDate } from '@/lib/formatters';
import {
  Heart,
  MapPin,
  Bed,
  Maximize,
  Building,
  Phone,
  Mail,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  User,
} from 'lucide-react';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="font-display text-3xl font-bold">Property Not Found</h1>
          <p className="text-muted-foreground mt-2">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/search">
            <Button variant="accent" className="mt-6">
              Browse Properties
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const favorite = isFavorite(property.id);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Image Gallery */}
        <section className="relative h-[60vh] bg-muted">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors shadow-medium"
                aria-label="Previous image"
                title="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors shadow-medium"
                aria-label="Next image"
                title="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>

          {/* Thumbnail Strip */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                  title={`View image ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Property Details */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge 
                    className={
                      property.status === 'rent' 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-success text-success-foreground'
                    }
                  >
                    {property.status === 'rent' ? 'For Rent' : 'For Sale'}
                  </Badge>
                  <Badge variant="secondary">{getPropertyTypeLabel(property.propertyType)}</Badge>
                  {property.isFeatured && (
                    <Badge className="bg-warning text-warning-foreground">Featured</Badge>
                  )}
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>{property.address}</span>
                </div>

                <p className="font-display text-4xl font-bold text-accent">
                  {formatPrice(property.price, property.status)}
                </p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.bhk > 0 && (
                  <div className="bg-card rounded-xl p-4 border border-border text-center">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-accent" />
                    <p className="font-semibold">{property.bhk} BHK</p>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </div>
                )}
                <div className="bg-card rounded-xl p-4 border border-border text-center">
                  <Maximize className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <p className="font-semibold">{formatArea(property.area)}</p>
                  <p className="text-sm text-muted-foreground">Area</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border text-center">
                  <Building className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <p className="font-semibold">{getPropertyTypeLabel(property.propertyType)}</p>
                  <p className="text-sm text-muted-foreground">Type</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <p className="font-semibold">{formatDate(property.createdAt)}</p>
                  <p className="text-sm text-muted-foreground">Listed</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                      <Check className="h-4 w-4 text-success" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">Location</h2>
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center border border-border">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      {property.address}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Lat: {property.latitude}, Long: {property.longitude}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-96 space-y-6">
              {/* Actions */}
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border sticky top-24">
                <div className="flex gap-3 mb-6">
                  <Button
                    variant={favorite ? 'destructive' : 'outline'}
                    className="flex-1"
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
                    {favorite ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                {/* Agent Info */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4">Listed by</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">{property.agentName}</p>
                      <p className="text-sm text-muted-foreground">Property Agent</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="accent" className="w-full" size="lg">
                      <Phone className="h-4 w-4" />
                      {property.agentPhone}
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Mail className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
