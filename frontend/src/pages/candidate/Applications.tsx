import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { GovBadge } from '@/components/shared/GovBadge';
import { Building2, MapPin, Clock } from 'lucide-react';

const applications = [
  { id: '1', title: 'Policy Research Intern', company: 'NITI Aayog', location: 'New Delhi', appliedOn: '5 Jan 2025', status: 'shortlisted' },
  { id: '2', title: 'Software Developer Intern', company: 'NIC', location: 'Bengaluru', appliedOn: '3 Jan 2025', status: 'review' },
  { id: '3', title: 'Data Analyst Intern', company: 'Ministry of Statistics', location: 'Delhi', appliedOn: '1 Jan 2025', status: 'review' },
  { id: '4', title: 'Content Writer', company: 'PIB', location: 'Remote', appliedOn: '28 Dec 2024', status: 'rejected' },
];

const statusMap = { shortlisted: 'gold' as const, review: 'review' as const, rejected: 'rejected' as const };

export default function CandidateApplications() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role="candidate" />
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">My Applications</h1>
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between hover:shadow-gov transition-shadow">
              <div>
                <h3 className="font-semibold text-foreground">{app.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Building2 className="w-4 h-4" />{app.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{app.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />Applied: {app.appliedOn}</span>
                </div>
              </div>
              <GovBadge variant={statusMap[app.status as keyof typeof statusMap]} label={app.status.charAt(0).toUpperCase() + app.status.slice(1)} size="md" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
