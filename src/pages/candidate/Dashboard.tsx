import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { StatsCard } from '@/components/shared/StatsCard';
import { InternshipCard } from '@/components/shared/InternshipCard';
import { GovBadge } from '@/components/shared/GovBadge';
import { FileText, CheckCircle, Clock, Briefcase } from 'lucide-react';

const stats = [
  { title: 'Total Applications', value: 8, icon: FileText, variant: 'default' as const },
  { title: 'Shortlisted', value: 3, icon: CheckCircle, variant: 'gold' as const },
  { title: 'Under Review', value: 4, icon: Clock, variant: 'default' as const },
  { title: 'Enrolled', value: 1, icon: Briefcase, variant: 'navy' as const },
];

const recommended = [
  { id: '1', title: 'Data Analyst Intern', company: 'Ministry of Statistics', location: 'Delhi', duration: '6 Months', stipend: '₹22,000', skills: ['Python', 'SQL', 'Excel'], deadline: '20 Jan 2025', isVerified: true, status: 'active' as const },
  { id: '2', title: 'Content Writer Intern', company: 'PIB', location: 'Remote', duration: '3 Months', stipend: '₹15,000', skills: ['Writing', 'Research'], deadline: '25 Jan 2025', isVerified: true, status: 'active' as const },
];

export default function CandidateDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role="candidate" />
      <main className="flex-1 p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back, Candidate!</h1>
          <p className="text-muted-foreground">Here's your internship journey overview</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => <StatsCard key={s.title} {...s} />)}
        </div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recommended for You</h2>
          <GovBadge variant="gold" label="AI Matched" size="sm" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {recommended.map((i) => <InternshipCard key={i.id} {...i} />)}
        </div>
      </main>
    </div>
  );
}
