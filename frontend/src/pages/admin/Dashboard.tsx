import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { StatsCard } from '@/components/shared/StatsCard';
import { ChartPlaceholder } from '@/components/shared/ChartPlaceholder';
import { Building2, Users, FileText, AlertTriangle } from 'lucide-react';

const stats = [
  { title: 'Registered Companies', value: 456, icon: Building2, variant: 'default' as const },
  { title: 'Total Candidates', value: '3.5L+', icon: Users, variant: 'gold' as const },
  { title: 'Pending Approvals', value: 23, icon: FileText, variant: 'default' as const },
  { title: 'Escalation Tickets', value: 8, icon: AlertTriangle, variant: 'navy' as const },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role="admin" />
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => <StatsCard key={s.title} {...s} />)}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartPlaceholder title="Application Traffic" type="area" height="lg" />
          <ChartPlaceholder title="Platform Usage" type="pie" height="lg" />
        </div>
      </main>
    </div>
  );
}
