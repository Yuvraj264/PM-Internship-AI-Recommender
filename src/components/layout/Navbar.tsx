import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Internships', href: '/internships' },
  { label: 'Help Desk', href: '/help' },
  { label: 'Contact', href: '/contact' },
];

const portalLinks = [
  { label: 'Candidate Portal', href: '/candidate/login', icon: '👤' },
  { label: 'Company Portal', href: '/company/login', icon: '🏢' },
  { label: 'Admin Portal', href: '/admin/login', icon: '🛡️' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPortals, setShowPortals] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Government Authorization Ribbon */}
      <div className="bg-gold text-primary text-xs font-medium py-1 text-center">
        <span className="inline-flex items-center gap-2">
          <Shield className="w-3 h-3" />
          Government Authorized Digital Platform — Ministry of Education, India
        </span>
      </div>

      {/* Main Navbar */}
      <nav className="bg-navy-gradient border-b-2 border-gold/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
                <span className="text-gold text-lg font-bold">भा</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-primary-foreground font-bold text-lg leading-tight">
                  PM Internship System
                </h1>
                <p className="text-gold text-xs">National Digital Portal</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    location.pathname === link.href
                      ? "text-gold bg-gold/10"
                      : "text-primary-foreground/80 hover:text-gold hover:bg-gold/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Portal Dropdown */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="relative">
                <Button
                  variant="heroOutline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setShowPortals(!showPortals)}
                  onBlur={() => setTimeout(() => setShowPortals(false), 200)}
                >
                  Login / Register
                  <ChevronDown className={cn("w-4 h-4 transition-transform", showPortals && "rotate-180")} />
                </Button>

                {showPortals && (
                  <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-gov-xl border border-border overflow-hidden animate-fade-in">
                    {portalLinks.map((portal) => (
                      <Link
                        key={portal.href}
                        to={portal.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors border-b border-border/50 last:border-0"
                      >
                        <span className="text-lg">{portal.icon}</span>
                        <span className="font-medium">{portal.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-primary-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-primary border-t border-gold/20">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    location.pathname === link.href
                      ? "text-gold bg-gold/10"
                      : "text-primary-foreground/80 hover:text-gold"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gold/20 pt-4 mt-4 space-y-2">
                {portalLinks.map((portal) => (
                  <Link
                    key={portal.href}
                    to={portal.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-md text-primary-foreground/80 hover:bg-gold/10 hover:text-gold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg">{portal.icon}</span>
                    <span className="text-sm font-medium">{portal.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gold Underline */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </nav>
    </header>
  );
}
