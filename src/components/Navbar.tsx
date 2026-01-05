import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavbarSearchBar from './NavbarSearchBar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Heart, 
  User, 
  LogOut, 
  Home, 
  Building2, 
  Menu,
  X,
  Plus,
  Shield
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, isAgent, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const navBg = isScrolled || !isHomePage 
    ? 'bg-card/95 backdrop-blur-md shadow-soft' 
    : 'bg-transparent';
  const textColor = isScrolled || !isHomePage ? 'text-foreground' : 'text-primary-foreground';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Building2 className={`h-8 w-8 ${isScrolled || !isHomePage ? 'text-accent' : 'text-accent'}`} />
            <span className={`text-xl font-display font-bold ${textColor}`}>
              PropMart
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavbarSearchBar />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              to="/" 
              className={`flex items-center gap-2 transition-colors hover:text-accent ${textColor}`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/search?status=sale" 
              className={`transition-colors hover:text-accent ${textColor}`}
            >
              Buy
            </Link>
            <Link 
              to="/search?status=rent" 
              className={`transition-colors hover:text-accent ${textColor}`}
            >
              Rent
            </Link>
            <Link 
              to="/search" 
              className={`flex items-center gap-2 transition-colors hover:text-accent ${textColor}`}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
          </div>

          {/* Desktop Auth & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/favorites">
                  <Button variant={isScrolled || !isHomePage ? "ghost" : "hero-outline"} size="sm">
                    <Heart className="h-4 w-4" />
                    Favorites
                  </Button>
                </Link>
                
                {isAgent && (
                  <Link to="/my-listings">
                    <Button variant={isScrolled || !isHomePage ? "outline" : "hero-outline"} size="sm">
                      <Plus className="h-4 w-4" />
                      My Listings
                    </Button>
                  </Link>
                )}

                {isAdmin && (
                  <Link to="/admin">
                    <Button variant={isScrolled || !isHomePage ? "outline" : "hero-outline"} size="sm">
                      <Shield className="h-4 w-4" />
                      Admin
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={isScrolled || !isHomePage ? "ghost" : "hero-outline"} size="sm">
                      <User className="h-4 w-4" />
                      {user?.name?.split(' ')[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="text-muted-foreground text-sm">
                      {user?.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant={isScrolled || !isHomePage ? "ghost" : "hero-outline"} size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="accent" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${textColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-card shadow-medium border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link to="/" className="block py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/search?status=sale" className="block py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                Buy
              </Link>
              <Link to="/search?status=rent" className="block py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                Rent
              </Link>
              <Link to="/search" className="block py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                Search Properties
              </Link>
              
              <hr className="border-border" />
              
              {isAuthenticated ? (
                <>
                  <Link to="/favorites" className="block py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                    Favorites
                  </Link>
                  {isAgent && (
                    <Link to="/my-listings" className="block py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                      My Listings
                    </Link>
                  )}
                  {isAdmin && (
                    <Link to="/admin" className="block py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block py-2 text-destructive">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-4">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="accent" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
