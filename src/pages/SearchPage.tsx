import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import { mockProperties } from '@/data/mockProperties';
import { Property, PropertyType, PropertyStatus } from '@/types/property';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Grid3X3, List, SlidersHorizontal } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = React.useState('date-desc');

  const filteredProperties = useMemo(() => {
    let results = mockProperties.filter(p => p.isApproved);

    // Status filter
    const status = searchParams.get('status') as PropertyStatus | null;
    if (status) {
      results = results.filter(p => p.status === status);
    }

    // City filter
    const city = searchParams.get('city');
    if (city) {
      results = results.filter(p => p.city.toLowerCase() === city.toLowerCase());
    }

    // Price range filter
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '999999999');
    results = results.filter(p => p.price >= minPrice && p.price <= maxPrice);

    // BHK filter
    const bhkParam = searchParams.get('bhk');
    if (bhkParam) {
      const bhkValues = bhkParam.split(',').map(Number).filter(Boolean);
      if (bhkValues.length > 0) {
        results = results.filter(p => bhkValues.includes(p.bhk));
      }
    }

    // Property type filter
    const typeParam = searchParams.get('type');
    if (typeParam) {
      const types = typeParam.split(',').filter(Boolean) as PropertyType[];
      if (types.length > 0) {
        results = results.filter(p => types.includes(p.propertyType));
      }
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'date-asc':
        results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'date-desc':
      default:
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return results;
  }, [searchParams, sortBy]);

  const status = searchParams.get('status');
  const city = searchParams.get('city');

  const getPageTitle = () => {
    let title = 'Properties';
    if (status === 'rent') title = 'Properties for Rent';
    if (status === 'sale') title = 'Properties for Sale';
    if (city) title += ` in ${city}`;
    return title;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {getPageTitle()}
            </h1>
            <p className="text-muted-foreground mt-2">
              {filteredProperties.length} properties found
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <SearchFilters />
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Sort & View Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-card rounded-xl p-4 shadow-soft border border-border">
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Newest First</SelectItem>
                      <SelectItem value="date-asc">Oldest First</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'accent' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'accent' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Property Grid */}
              {filteredProperties.length > 0 ? (
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-card rounded-xl border border-border">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="font-display text-xl font-semibold mb-2">No Properties Found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to find more properties
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
