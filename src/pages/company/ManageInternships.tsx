import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { GovBadge } from '@/components/shared/GovBadge';
import { Button } from '@/components/ui/button';
import { Users, Eye } from 'lucide-react';

const internships = [
  { id: '1', title: 'Software Developer Intern', applicants: 45, status: 'active' },
  { id: '2', title: 'Data Analyst Intern', applicants: 32, status: 'active' },
  { id: '3', title: 'Marketing Intern', applicants: 28, status: 'closed' },
];

export default function CompanyManageInternships() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role="company" />
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Manage Internships</h1>
        <div className="space-y-4">
          {internships.map((i) => (
            <div key={i.id} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{i.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><Users className="w-4 h-4" />{i.applicants} applicants</p>
              </div>
              <div className="flex items-center gap-3">
                <GovBadge variant={i.status === 'active' ? 'approved' : 'rejected'} label={i.status === 'active' ? 'Active' : 'Closed'} size="md" />
                <Button variant="outline" size="sm" className="gap-1"><Eye className="w-4 h-4" />View</Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
