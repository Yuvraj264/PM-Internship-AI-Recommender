import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GovBadge } from '@/components/shared/GovBadge';
import { GoldDivider } from '@/components/shared/GoldDivider';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Clock, IndianRupee, Building2, Calendar, Users, 
  CheckCircle, ArrowLeft, Share2, Bookmark, FileText 
} from 'lucide-react';

// Mock data - in real app would fetch based on ID
const internshipData = {
  id: '1',
  title: 'Policy Research Intern',
  company: 'NITI Aayog',
  location: 'New Delhi',
  duration: '6 Months',
  stipend: '₹25,000',
  positions: 10,
  deadline: '15 January 2025',
  startDate: '1 February 2025',
  isVerified: true,
  description: `NITI Aayog is seeking motivated Policy Research Interns to contribute to India's strategic policy initiatives. This internship offers a unique opportunity to work alongside senior policymakers and gain hands-on experience in government policy formulation.

The intern will be involved in research, analysis, and documentation of policy recommendations across various sectors including education, healthcare, and digital governance.`,
  responsibilities: [
    'Conduct in-depth research on assigned policy areas',
    'Analyze data and prepare comprehensive reports',
    'Assist in drafting policy briefs and presentations',
    'Participate in stakeholder consultations',
    'Support senior officers in day-to-day activities',
  ],
  eligibility: [
    'Currently enrolled in or recently graduated from a recognized university',
    'Strong academic record (minimum 60% or equivalent CGPA)',
    'Excellent written and verbal communication skills',
    'Proficiency in MS Office suite',
    'Interest in public policy and governance',
  ],
  skills: ['Research', 'Data Analysis', 'Policy Writing', 'MS Office', 'Communication', 'Critical Thinking'],
};

export default function InternshipDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-hero-pattern py-8">
        <div className="container mx-auto px-4">
          <Link to="/internships" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-gold mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Internships
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  {internshipData.title}
                </h1>
                {internshipData.isVerified && (
                  <GovBadge variant="verified" label="Verified" size="md" />
                )}
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Building2 className="w-5 h-5 text-gold" />
                <span className="font-medium">{internshipData.company}</span>
                <span className="text-primary-foreground/50">•</span>
                <MapPin className="w-4 h-4" />
                <span>{internshipData.location}</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="bg-transparent border-gold/50 text-gold hover:bg-gold/10">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent border-gold/50 text-gold hover:bg-gold/10">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Link to="/candidate/login">
                <Button variant="hero" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Clock, label: 'Duration', value: internshipData.duration },
                  { icon: IndianRupee, label: 'Stipend', value: internshipData.stipend },
                  { icon: Users, label: 'Positions', value: `${internshipData.positions} openings` },
                  { icon: Calendar, label: 'Start Date', value: internshipData.startDate },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-card rounded-lg border border-border text-center">
                    <item.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">About the Internship</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {internshipData.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {internshipData.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold text-foreground">Eligibility Criteria</h2>
                  <GovBadge variant="approved" label="Must Meet All" size="sm" />
                </div>
                <ul className="space-y-3">
                  {internshipData.eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-status-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <div className="bg-card rounded-xl border-2 border-gold/30 p-6 shadow-gold sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <span className="text-sm font-medium text-gold">Applications Open</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Application Deadline</p>
                <p className="text-2xl font-bold text-foreground mb-6">{internshipData.deadline}</p>
                
                <Link to="/candidate/login" className="block">
                  <Button variant="govGold" className="w-full mb-3">Apply for this Internship</Button>
                </Link>
                <Button variant="outline" className="w-full">Save for Later</Button>
              </div>

              {/* Skills */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {internshipData.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-sm bg-primary/5 text-primary rounded-md border border-primary/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">About {internshipData.company}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/30">
                    <span className="text-gold font-bold">भा</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{internshipData.company}</p>
                    <p className="text-xs text-muted-foreground">Government of India</p>
                  </div>
                </div>
                <GovBadge variant="verified" label="Verified Government Organization" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
