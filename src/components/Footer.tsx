import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-accent" />
              <span className="text-2xl font-display font-bold">PropMart</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. We connect buyers, 
              sellers, and renters with their dream homes across India.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/search?status=sale" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link to="/search?status=rent" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Search Properties
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Property Types</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/search?type=apartment" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/search?type=house" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/search?type=villa" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Villas
                </Link>
              </li>
              <li>
                <Link to="/search?type=commercial" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Commercial
                </Link>
              </li>
              <li>
                <Link to="/search?type=plot" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Plots
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  123 Business Park, Bandra Kurla Complex, Mumbai 400051
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="tel:+919876543210" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="mailto:info@propmart.com" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  info@propmart.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>&copy; {new Date().getFullYear()} PropMart. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accent transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
