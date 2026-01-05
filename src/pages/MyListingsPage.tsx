import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { mockProperties, cities, propertyTypes } from '@/data/mockProperties';
import { Property, PropertyType, PropertyStatus } from '@/types/property';
import { formatPrice, formatDate } from '@/lib/formatters';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Building2,
  CheckCircle,
  Clock,
  X,
} from 'lucide-react';

const MyListingsPage: React.FC = () => {
  const { user, isAuthenticated, isAgent, isLoading } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Mock user's listings
  const [listings, setListings] = useState<Property[]>(
    mockProperties.filter(p => p.agentId === 'agent1').map(p => ({ ...p }))
  );

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    address: '',
    bhk: '',
    area: '',
    propertyType: '' as PropertyType | '',
    status: 'sale' as PropertyStatus,
    amenities: '',
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !isAgent) {
    return <Navigate to="/login" replace />;
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      city: '',
      address: '',
      bhk: '',
      area: '',
      propertyType: '',
      status: 'sale',
      amenities: '',
    });
    setEditingProperty(null);
  };

  const handleOpenDialog = (property?: Property) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        title: property.title,
        description: property.description,
        price: property.price.toString(),
        city: property.city,
        address: property.address,
        bhk: property.bhk.toString(),
        area: property.area.toString(),
        propertyType: property.propertyType,
        status: property.status,
        amenities: property.amenities.join(', '),
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.city || !formData.propertyType) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const propertyData: Property = {
      id: editingProperty?.id || `prop_${Date.now()}`,
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      city: formData.city,
      address: formData.address,
      latitude: 19.076,
      longitude: 72.877,
      bhk: parseInt(formData.bhk) || 0,
      area: parseInt(formData.area) || 0,
      propertyType: formData.propertyType as PropertyType,
      status: formData.status,
      images: editingProperty?.images || ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
      agentId: user?.id || '',
      agentName: user?.name || '',
      agentPhone: user?.phone || '+91 98765 43210',
      isApproved: false,
      isFeatured: false,
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean),
      createdAt: editingProperty?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingProperty) {
      setListings(prev => prev.map(p => p.id === editingProperty.id ? propertyData : p));
      toast({
        title: 'Property Updated',
        description: 'Your property listing has been updated successfully.',
      });
    } else {
      setListings(prev => [propertyData, ...prev]);
      toast({
        title: 'Property Created',
        description: 'Your property listing has been submitted for approval.',
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (propertyId: string) => {
    setListings(prev => prev.filter(p => p.id !== propertyId));
    toast({
      title: 'Property Deleted',
      description: 'Your property listing has been removed.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-8 w-8 text-accent" />
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  My Listings
                </h1>
              </div>
              <p className="text-muted-foreground">
                Manage your property listings
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="accent" onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4" />
                  Add New Property
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">
                    {editingProperty ? 'Edit Property' : 'Add New Property'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Luxurious 3BHK Apartment in Bandra"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({ ...formData, propertyType: value as PropertyType })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
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

                    <div className="space-y-2">
                      <Label htmlFor="status">Listing Type *</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value as PropertyStatus })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">For Sale</SelectItem>
                          <SelectItem value="rent">For Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder={formData.status === 'rent' ? 'Monthly rent' : 'Total price'}
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => setFormData({ ...formData, city: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Full Address</Label>
                      <Input
                        id="address"
                        placeholder="Street address, locality"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bhk">BHK</Label>
                      <Input
                        id="bhk"
                        type="number"
                        placeholder="Number of bedrooms"
                        value={formData.bhk}
                        onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="area">Area (sq.ft)</Label>
                      <Input
                        id="area"
                        type="number"
                        placeholder="Built-up area"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your property..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                      <Input
                        id="amenities"
                        placeholder="e.g., Swimming Pool, Gym, Parking"
                        value={formData.amenities}
                        onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="accent">
                      {editingProperty ? 'Update Property' : 'Submit for Approval'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <p className="text-3xl font-bold text-foreground">{listings.length}</p>
              <p className="text-muted-foreground">Total Listings</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <p className="text-3xl font-bold text-success">{listings.filter(l => l.isApproved).length}</p>
              <p className="text-muted-foreground">Approved</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <p className="text-3xl font-bold text-warning">{listings.filter(l => !l.isApproved).length}</p>
              <p className="text-muted-foreground">Pending Approval</p>
            </div>
          </div>

          {/* Listings Table */}
          {listings.length > 0 ? (
            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Listed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium line-clamp-1">{property.title}</p>
                            <p className="text-sm text-muted-foreground">{property.city}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {property.status === 'rent' ? 'Rent' : 'Sale'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatPrice(property.price, property.status)}</TableCell>
                      <TableCell>
                        {property.isApproved ? (
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approved
                          </Badge>
                        ) : (
                          <Badge className="bg-warning text-warning-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(property.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Link to={`/property/${property.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(property)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-xl border border-border">
              <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">No Listings Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by adding your first property listing.
              </p>
              <Button variant="accent" onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4" />
                Add Your First Property
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyListingsPage;
