import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GovBadge } from '@/components/shared/GovBadge';
import { InternshipCard } from '@/components/shared/InternshipCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';

const allInternships = [
  { id: '1', title: 'Policy Research Intern', company: 'NITI Aayog', location: 'New Delhi', duration: '6 Months', stipend: '₹25,000', skills: ['Research', 'Data Analysis', 'Policy Writing', 'MS Office'], deadline: '15 Jan 2025', isVerified: true, status: 'active' as const },
  { id: '2', title: 'Digital Marketing Intern', company: 'Ministry of Information', location: 'Remote', duration: '3 Months', stipend: '₹15,000', skills: ['Social Media', 'Content Writing', 'Analytics'], deadline: '20 Jan 2025', isVerified: true, status: 'active' as const },
  { id: '3', title: 'Software Development Intern', company: 'NIC', location: 'Bengaluru', duration: '6 Months', stipend: '₹30,000', skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'], deadline: '25 Jan 2025', isVerified: true, status: 'active' as const },
  { id: '4', title: 'Data Science Intern', company: 'Ministry of Statistics', location: 'Kolkata', duration: '4 Months', stipend: '₹20,000', skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'], deadline: '30 Jan 2025', isVerified: true, status: 'active' as const },
  { id: '5', title: 'Legal Research Intern', company: 'Law Commission', location: 'New Delhi', duration: '3 Months', stipend: '₹18,000', skills: ['Legal Research', 'Drafting', 'Documentation'], deadline: '28 Jan 2025', isVerified: true, status: 'active' as const },
  { id: '6', title: 'Environmental Science Intern', company: 'Ministry of Environment', location: 'Dehradun', duration: '6 Months', stipend: '₹22,000', skills: ['Environmental Studies', 'Field Research', 'GIS'], deadline: '05 Feb 2025', isVerified: true, status: 'active' as const },
];

const locations = ['All Locations', 'New Delhi', 'Bengaluru', 'Mumbai', 'Kolkata', 'Remote'];
const durations = ['All Durations', '3 Months', '4 Months', '6 Months', '12 Months'];
const sectors = ['All Sectors', 'Technology', 'Research', 'Legal', 'Environment', 'Marketing'];

export default function Internships() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-hero-pattern py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GovBadge variant="gold" label="Explore Opportunities" size="lg" className="mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Browse Government Internships
            </h1>
            <p className="text-primary-foreground/80 mb-8">
              Discover verified internship opportunities across government organizations
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search by role, organization, or skills..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card/90 backdrop-blur-sm border-gold/30 focus-gold"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Listings */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc.toLowerCase().replace(' ', '-')}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map((dur) => (
                  <SelectItem key={dur} value={dur.toLowerCase().replace(' ', '-')}>{dur}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <Briefcase className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sec) => (
                  <SelectItem key={sec} value={sec.toLowerCase().replace(' ', '-')}>{sec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="ml-auto">Clear Filters</Button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{allInternships.length}</span> internships
            </p>
            <Select defaultValue="recent">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="stipend">Stipend</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Internship Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allInternships.map((internship) => (
              <InternshipCard key={internship.id} {...internship} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="govGold" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
