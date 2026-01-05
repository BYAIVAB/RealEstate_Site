import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mic, MapPin } from 'lucide-react';
import { cities, propertyTypes } from '@/data/mockProperties';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NavbarSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

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
    if (city) params.set('city', city);
    if (propertyType) params.set('type', propertyType);
    if (query) params.set('q', query);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 items-center w-full max-w-xl">
      <Select value={city} onValueChange={setCity}>
        <SelectTrigger className="h-10 min-w-[100px]">
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
          className="h-10 pl-8 pr-10"
          placeholder="Search by Project, Locality or Builder"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <Mic
          className={`absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer ${listening ? 'text-primary animate-pulse' : 'text-muted-foreground'}`}
          onClick={handleVoice}
        />
      </div>
      <Select value={propertyType} onValueChange={setPropertyType}>
        <SelectTrigger className="h-10 min-w-[120px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {propertyTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleSearch} className="h-10 px-4" variant="accent">
        <Search className="h-4 w-4 mr-1" />
        Search
      </Button>
    </div>
  );
};

export default NavbarSearchBar;
