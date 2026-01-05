import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '@/types/property';
import { formatPrice, formatArea, getPropertyTypeLabel } from '@/lib/formatters';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart, MapPin, Bed, Maximize, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  return (
    <Link to={`/property/${property.id}`} className="block group">
      <div className="bg-card rounded-xl overflow-hidden shadow-soft card-hover border border-border/50">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status Badge */}
          <Badge 
            className={`absolute top-3 left-3 ${
              property.status === 'rent' 
                ? 'bg-accent text-accent-foreground' 
                : 'bg-success text-success-foreground'
            }`}
          >
            {property.status === 'rent' ? 'For Rent' : 'For Sale'}
          </Badge>

          {/* Featured Badge */}
          {property.isFeatured && (
            <Badge className="absolute top-3 left-24 bg-warning text-warning-foreground">
              Featured
            </Badge>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              favorite 
                ? 'bg-destructive text-destructive-foreground' 
                : 'bg-card/80 backdrop-blur-sm text-foreground hover:bg-destructive hover:text-destructive-foreground'
            }`}
          >
            <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
          </button>

          {/* Price on Image */}
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-primary-foreground font-display text-2xl font-bold drop-shadow-lg">
              {formatPrice(property.price, property.status)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-display font-semibold text-lg text-foreground line-clamp-1 group-hover:text-accent transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{property.address}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-4 pt-2 border-t border-border">
            {property.bhk > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Bed className="h-4 w-4" />
                <span>{property.bhk} BHK</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Maximize className="h-4 w-4" />
              <span>{formatArea(property.area)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{getPropertyTypeLabel(property.propertyType)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
