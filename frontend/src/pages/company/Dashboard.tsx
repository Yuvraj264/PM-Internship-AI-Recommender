import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { StatsCard } from '@/components/shared/StatsCard';
import { ChartPlaceholder } from '@/components/shared/ChartPlaceholder';
import { Briefcase, Users, FileText, CheckCircle } from 'lucide-react';

const stats = [
  { title: 'Active Internships', value: 5, icon: Briefcase, variant: 'gold' as const },
  { title: 'Total Applicants', value: 234, icon: Users, variant: 'default' as const },
  { title: 'Pending Reviews', value: 48, icon: FileText, variant: 'default' as const },
  { title: 'Hired This Month', value: 12, icon: CheckCircle, variant: 'navy' as const },
];

export default function CompanyDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role="company" />
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Company Dashboard</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => <StatsCard key={s.title} {...s} />)}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartPlaceholder title="Applicant Pipeline" type="bar" height="lg" />
          <ChartPlaceholder title="Performance Trends" type="line" height="lg" />
        </div>
      </main>
    </div>
  );
}
