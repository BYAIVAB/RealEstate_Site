import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockProperties } from '@/data/mockProperties';
import { Property } from '@/types/property';
import { formatPrice, formatDate } from '@/lib/formatters';
import { useToast } from '@/hooks/use-toast';
import {
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Clock,
  Building2,
  Users,
  TrendingUp,
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>(
    mockProperties.map(p => ({ ...p }))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const pendingProperties = properties.filter(p => !p.isApproved);
  const approvedProperties = properties.filter(p => p.isApproved);

  const handleApprove = (propertyId: string) => {
    setProperties(prev =>
      prev.map(p => (p.id === propertyId ? { ...p, isApproved: true } : p))
    );
    toast({
      title: 'Property Approved',
      description: 'The property listing is now visible to users.',
    });
  };

  const handleReject = (propertyId: string) => {
    setProperties(prev => prev.filter(p => p.id !== propertyId));
    toast({
      title: 'Property Rejected',
      description: 'The property listing has been removed.',
    });
  };

  const filteredProperties = (list: Property[]) =>
    list.filter(
      p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.agentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const PropertyTable = ({ propertyList, showActions = false }: { propertyList: Property[]; showActions?: boolean }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Agent</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Listed</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {propertyList.map((property) => (
          <TableRow key={property.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-16 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium line-clamp-1 max-w-[200px]">{property.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {property.bhk > 0 ? `${property.bhk} BHK` : property.propertyType}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="font-medium">{property.agentName}</p>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">
                {property.status === 'rent' ? 'Rent' : 'Sale'}
              </Badge>
            </TableCell>
            <TableCell>{formatPrice(property.price, property.status)}</TableCell>
            <TableCell>{property.city}</TableCell>
            <TableCell>{formatDate(property.createdAt)}</TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <Link to={`/property/${property.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                {showActions && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-success hover:text-success hover:bg-success/10"
                      onClick={() => handleApprove(property.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleReject(property.id)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-8 w-8 text-accent" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage property listings and approvals
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{properties.length}</p>
                  <p className="text-sm text-muted-foreground">Total Properties</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingProperties.length}</p>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approvedProperties.length}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Active Agents</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search properties, agents, or cities..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="pending" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Pending Approval ({pendingProperties.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Approved ({approvedProperties.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
                {filteredProperties(pendingProperties).length > 0 ? (
                  <PropertyTable propertyList={filteredProperties(pendingProperties)} showActions />
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 mx-auto text-success mb-4" />
                    <h3 className="font-display text-lg font-semibold">All Caught Up!</h3>
                    <p className="text-muted-foreground">No pending properties to review.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="approved">
              <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
                {filteredProperties(approvedProperties).length > 0 ? (
                  <PropertyTable propertyList={filteredProperties(approvedProperties)} />
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-display text-lg font-semibold">No Approved Properties</h3>
                    <p className="text-muted-foreground">Approve some pending listings to see them here.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
