import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin } from 'lucide-react';
import { cities, propertyTypes } from '@/data/mockProperties';

const HeroSearch: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState<'sale' | 'rent'>('sale');
  const [city, setCity] = React.useState('');
  const [propertyType, setPropertyType] = React.useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('status', status);
    if (city) params.set('city', city);
    if (propertyType) params.set('type', propertyType);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Status Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setStatus('sale')}
          className={`px-6 py-2 rounded-t-lg font-medium transition-all ${
            status === 'sale'
              ? 'bg-card text-foreground'
              : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setStatus('rent')}
          className={`px-6 py-2 rounded-t-lg font-medium transition-all ${
            status === 'rent'
              ? 'bg-card text-foreground'
              : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
          }`}
        >
          Rent
        </button>
      </div>

      {/* Search Box */}
      <div className="bg-card rounded-xl rounded-tl-none shadow-strong p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* City Select */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Location
            </label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-12">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Select City" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Property Type Select */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Property Type
            </label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button 
              onClick={handleSearch} 
              variant="accent" 
              size="xl"
              className="w-full md:w-auto"
            >
              <Search className="h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
