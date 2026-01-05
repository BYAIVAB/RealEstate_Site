import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter, X, MapPin } from 'lucide-react';
import { cities, propertyTypes, bhkOptions } from '@/data/mockProperties';
import { formatPrice } from '@/lib/formatters';

interface SearchFiltersProps {
  onFiltersChange?: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get('status') || 'sale';
  const city = searchParams.get('city') || '';
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || (status === 'rent' ? '200000' : '200000000'));
  const selectedBhk = searchParams.get('bhk')?.split(',').filter(Boolean) || [];
  const selectedTypes = searchParams.get('type')?.split(',').filter(Boolean) || [];

  const priceRange = status === 'rent' 
    ? { min: 0, max: 200000, step: 5000 }
    : { min: 0, max: 200000000, step: 1000000 };

  const updateFilters = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
    onFiltersChange?.();
  };

  const clearAllFilters = () => {
    navigate('/search');
    onFiltersChange?.();
  };

  const hasActiveFilters = city || selectedBhk.length > 0 || selectedTypes.length > 0 || 
    minPrice > 0 || maxPrice < priceRange.max;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Status Toggle */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Listing Type</Label>
        <div className="flex gap-2">
          <Button
            variant={status === 'sale' ? 'accent' : 'outline'}
            size="sm"
            onClick={() => updateFilters({ status: 'sale', minPrice: null, maxPrice: null })}
            className="flex-1"
          >
            Buy
          </Button>
          <Button
            variant={status === 'rent' ? 'accent' : 'outline'}
            size="sm"
            onClick={() => updateFilters({ status: 'rent', minPrice: null, maxPrice: null })}
            className="flex-1"
          >
            Rent
          </Button>
        </div>
      </div>

      {/* City */}
      <div>
        <Label className="text-sm font-medium mb-3 block">City</Label>
        <Select value={city} onValueChange={(value) => updateFilters({ city: value })}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="All Cities" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Cities</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Price Range: {formatPrice(minPrice, status as 'rent' | 'sale')} - {formatPrice(maxPrice, status as 'rent' | 'sale')}
        </Label>
        <div className="px-2">
          <Slider
            value={[minPrice, maxPrice]}
            min={priceRange.min}
            max={priceRange.max}
            step={priceRange.step}
            onValueChange={([min, max]) => {
              updateFilters({ 
                minPrice: min.toString(), 
                maxPrice: max.toString() 
              });
            }}
            className="mt-2"
          />
        </div>
      </div>

      {/* BHK */}
      <div>
        <Label className="text-sm font-medium mb-3 block">BHK</Label>
        <div className="flex flex-wrap gap-2">
          {bhkOptions.map((bhk) => {
            const isSelected = selectedBhk.includes(bhk.toString());
            return (
              <Button
                key={bhk}
                variant={isSelected ? 'accent' : 'outline'}
                size="sm"
                onClick={() => {
                  const newBhk = isSelected
                    ? selectedBhk.filter(b => b !== bhk.toString())
                    : [...selectedBhk, bhk.toString()];
                  updateFilters({ bhk: newBhk.join(',') || null });
                }}
              >
                {bhk} BHK
              </Button>
            );
          })}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Property Type</Label>
        <div className="space-y-2">
          {propertyTypes.map((type) => {
            const isSelected = selectedTypes.includes(type.value);
            return (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={type.value}
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    const newTypes = checked
                      ? [...selectedTypes, type.value]
                      : selectedTypes.filter(t => t !== type.value);
                    updateFilters({ type: newTypes.join(',') || null });
                  }}
                />
                <label
                  htmlFor={type.value}
                  className="text-sm cursor-pointer"
                >
                  {type.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearAllFilters} className="w-full">
          <X className="h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block bg-card rounded-xl p-6 shadow-soft border border-border sticky top-24">
        <h3 className="font-display font-semibold text-lg mb-6">Filters</h3>
        <FilterContent />
      </div>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs">
                  Active
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="font-display">Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default SearchFilters;
