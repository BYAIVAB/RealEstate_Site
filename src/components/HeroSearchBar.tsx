import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Mic, MapPin } from 'lucide-react';
import { cities, propertyTypes } from '@/data/mockProperties';

const HeroSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'sale' | 'rent'>('sale');
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Voice search integration
  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search not supported in this browser.');
      return;
    }
    if (!recognitionRef.current) {
      // @ts-ignore
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.lang = 'en-IN';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
      recognitionRef.current.onresult = (event: any) => {
        setQuery(event.results[0][0].transcript);
        setListening(false);
      };
      recognitionRef.current.onend = () => setListening(false);
    }
    setListening(true);
    recognitionRef.current.start();
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('status', status);
    if (city) params.set('city', city);
    if (propertyType) params.set('type', propertyType);
    if (query) params.set('q', query);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/90 rounded-xl shadow-2xl p-6 flex flex-col md:flex-row gap-4 items-center">
      <div className="flex gap-2 mb-2 md:mb-0">
        <button
          onClick={() => setStatus('sale')}
          className={`px-5 py-2 rounded-lg font-medium transition-all ${status === 'sale' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Buy
        </button>
        <button
          onClick={() => setStatus('rent')}
          className={`px-5 py-2 rounded-lg font-medium transition-all ${status === 'rent' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Rent
        </button>
      </div>
      <div className="flex-1 flex flex-col md:flex-row gap-2 items-center">
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="h-12 min-w-[120px]">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="City" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1">
          <Input
            className="h-12 pl-10 pr-12"
            placeholder="Search by Project, Locality or Builder"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <Mic
            className={`absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 cursor-pointer ${listening ? 'text-primary animate-pulse' : 'text-muted-foreground'}`}
            onClick={handleVoice}
          />
        </div>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="h-12 min-w-[140px]">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSearch} className="h-12 px-8 text-lg font-semibold" variant="accent">
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default HeroSearchBar;
