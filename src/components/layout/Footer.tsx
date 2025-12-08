import { Link } from 'react-router-dom';
import { ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-gradient text-primary-foreground">
      {/* Gold Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
                <span className="text-gold text-xl font-bold">भा</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">PM Internship System</h3>
                <p className="text-gold text-xs">National Digital Portal</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Empowering India's youth through structured internship opportunities 
              with government and private sector partnerships.
            </p>
            {/* Digital India Logo Placeholder */}
            <div className="flex items-center gap-3 pt-2">
              <div className="px-3 py-1.5 bg-gold/10 rounded border border-gold/30">
                <span className="text-gold text-xs font-semibold">Digital India</span>
              </div>
              <div className="px-3 py-1.5 bg-gold/10 rounded border border-gold/30">
                <span className="text-gold text-xs font-semibold">Make in India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Browse Internships', href: '/internships' },
                { label: 'For Companies', href: '/company/login' },
                { label: 'Help Desk', href: '/help' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gold">Portals</h4>
            <ul className="space-y-2">
              {[
                { label: 'Candidate Login', href: '/candidate/login' },
                { label: 'Company Login', href: '/company/login' },
                { label: 'Admin Login', href: '/admin/login' },
                { label: 'Register as Candidate', href: '/candidate/register' },
                { label: 'Register Organization', href: '/company/register' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>Ministry of Education, Shastri Bhawan, New Delhi - 110001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>support@pminternship.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gold/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-primary-foreground/60">
              <Link to="/terms" className="hover:text-gold transition-colors">Terms of Use</Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link to="/accessibility" className="hover:text-gold transition-colors">Accessibility</Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary-foreground/60">
                © 2024 PM Internship System. Government of India. All Rights Reserved.
              </span>
            </div>
          </div>
          
          {/* Disclaimer */}
          <p className="mt-6 text-xs text-primary-foreground/50 text-center max-w-3xl mx-auto">
            This is an official government platform. Any misuse or unauthorized access is punishable under 
            the Information Technology Act, 2000. Content on this website is published and managed by 
            Ministry of Education, Government of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
