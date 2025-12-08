import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GovBadge } from '@/components/shared/GovBadge';
import { GoldDivider } from '@/components/shared/GoldDivider';
import { EmblemWatermark } from '@/components/shared/EmblemWatermark';
import { InternshipCard } from '@/components/shared/InternshipCard';
import { 
  Shield, 
  Users, 
  Building2, 
  FileCheck, 
  ArrowRight,
  CheckCircle,
  Award,
  Lock,
  Sparkles
} from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  { label: 'Active Internships', value: 12000, suffix: '+', icon: FileCheck },
  { label: 'Partner Organizations', value: 900, suffix: '+', icon: Building2 },
  { label: 'Successful Applicants', value: 350000, suffix: '+', icon: Users },
];

const trustBadges = [
  { icon: Shield, title: 'Verified Organizations', desc: 'All employers undergo strict verification' },
  { icon: Lock, title: 'Secure Infrastructure', desc: 'Bank-grade encryption for all data' },
  { icon: CheckCircle, title: 'Transparent Process', desc: 'Automated and auditable workflows' },
];

const featuredInternships = [
  {
    id: '1',
    title: 'Policy Research Intern',
    company: 'NITI Aayog',
    location: 'New Delhi',
    duration: '6 Months',
    stipend: '₹25,000',
    skills: ['Research', 'Data Analysis', 'Policy Writing', 'MS Office'],
    deadline: '15 Jan 2025',
    isVerified: true,
    status: 'active' as const,
  },
  {
    id: '2',
    title: 'Digital Marketing Intern',
    company: 'Ministry of Information',
    location: 'Remote',
    duration: '3 Months',
    stipend: '₹15,000',
    skills: ['Social Media', 'Content Writing', 'Analytics'],
    deadline: '20 Jan 2025',
    isVerified: true,
    status: 'active' as const,
  },
  {
    id: '3',
    title: 'Software Development Intern',
    company: 'NIC - National Informatics Centre',
    location: 'Bengaluru',
    duration: '6 Months',
    stipend: '₹30,000',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    deadline: '25 Jan 2025',
    isVerified: true,
    status: 'active' as const,
  },
];

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span className="stat-counter">
      {count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-pattern py-20 lg:py-32">
        {/* Emblem Watermark */}
        <EmblemWatermark className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size="xl" opacity={0.08} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Government of India Initiative</span>
            </div>

            {/* Title with Tricolor Underline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 animate-slide-up">
              PM Internship System
            </h1>
            <GoldDivider variant="tricolor" className="mb-6" />
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              National Digital Internship Management & Skill Enablement Platform
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/internships">
                <Button variant="hero" size="xl" className="gap-2">
                  Explore Internships
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/candidate/register">
                <Button variant="heroOutline" size="xl">
                  Register as Candidate
                </Button>
              </Link>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 mt-12">
              {stats.map((stat, i) => (
                <div 
                  key={stat.label}
                  className="text-center p-6 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-gold/20 animate-fade-in"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  <p className="text-primary-foreground/70 text-sm mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <GovBadge variant="gold" label="Integrity & Trust" size="lg" className="mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Built on Government-Grade Security
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every aspect of our platform is designed with transparency, security, and trust at its core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustBadges.map((badge, i) => (
              <div
                key={badge.title}
                className="group relative p-8 rounded-xl bg-card border border-border hover:border-gold/40 transition-all duration-300 hover:shadow-gold text-center"
              >
                {/* Gold Top Border */}
                <div className="absolute top-0 left-4 right-4 h-1 bg-gold-gradient rounded-b opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
                  <badge.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider variant="ornate" />

      {/* Featured Internships */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <GovBadge variant="verified" label="Featured Opportunities" size="md" className="mb-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Latest Government Internships
              </h2>
            </div>
            <Link to="/internships">
              <Button variant="outline" className="hidden sm:flex gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInternships.map((internship, i) => (
              <InternshipCard
                key={internship.id}
                {...internship}
                variant={i === 0 ? 'featured' : 'default'}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/internships">
              <Button variant="outline" className="gap-2">
                View All Internships
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Role Cards Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Access Your Portal
            </h2>
            <p className="text-muted-foreground">
              Choose your role to get started with the platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Candidate Card */}
            <Link to="/candidate/login" className="group">
              <div className="relative p-8 rounded-xl bg-card border-2 border-border hover:border-gold transition-all duration-300 hover:shadow-gold-lg text-center h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <GovBadge variant="gold" label="For Students" size="sm" />
                </div>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border-2 border-gold/40 group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Candidate Portal</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Apply for internships, track applications, and build your career
                </p>
                <Button variant="govGold" className="w-full">
                  Enter Portal
                </Button>
              </div>
            </Link>

            {/* Company Card */}
            <Link to="/company/login" className="group">
              <div className="relative p-8 rounded-xl bg-card border-2 border-border hover:border-gold transition-all duration-300 hover:shadow-gold-lg text-center h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <GovBadge variant="verified" label="For Employers" size="sm" />
                </div>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/40 group-hover:scale-110 transition-transform">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Company Portal</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Post internships, review applications, and find top talent
                </p>
                <Button variant="govPrimary" className="w-full">
                  Enter Portal
                </Button>
              </div>
            </Link>

            {/* Admin Card */}
            <Link to="/admin/login" className="group">
              <div className="relative p-8 rounded-xl bg-card border-2 border-border hover:border-gold transition-all duration-300 hover:shadow-gold-lg text-center h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <GovBadge variant="info" label="Administrators" size="sm" />
                </div>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center border-2 border-primary/30 group-hover:scale-110 transition-transform">
                  <Award className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Admin Portal</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Manage platform, approve organizations, and monitor system
                </p>
                <Button variant="default" className="w-full">
                  Enter Portal
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
