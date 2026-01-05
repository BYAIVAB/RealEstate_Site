export type PropertyType = 'apartment' | 'house' | 'villa' | 'plot' | 'commercial';
export type PropertyStatus = 'rent' | 'sale';
export type UserRole = 'user' | 'agent' | 'admin';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  bhk: number;
  area: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  images: string[];
  agentId: string;
  agentName: string;
  agentPhone: string;
  isApproved: boolean;
  isFeatured: boolean;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface SearchFilters {
  city: string;
  minPrice: number;
  maxPrice: number;
  bhk: number[];
  propertyType: PropertyType[];
  status: PropertyStatus;
  sortBy: 'price-asc' | 'price-desc' | 'date-desc' | 'date-asc';
}

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
}
