import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { GovBadge } from '@/components/shared/GovBadge';
import { Button } from '@/components/ui/button';
import { Building2, CheckCircle, XCircle } from 'lucide-react';

const companies = [
  { id: '1', name: 'TechCorp India', email: 'hr@techcorp.in', status: 'approved' },
  { id: '2', name: 'Digital Solutions Ltd', email: 'contact@digsol.com', status: 'pending' },
  { id: '3', name: 'StartupXYZ', email: 'team@startupxyz.in', status: 'pending' },
  { id: '4', name: 'Global Consulting', email: 'hr@globalconsult.com', status: 'suspended' },
];

export default function AdminCompanies() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role="admin" />
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Manage Companies</h1>
        <div className="space-y-4">
          {companies.map((c) => (
            <div key={c.id} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><Building2 className="w-6 h-6 text-primary" /></div>
                <div>
                  <h3 className="font-semibold text-foreground">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GovBadge variant={c.status === 'approved' ? 'approved' : c.status === 'pending' ? 'pending' : 'rejected'} label={c.status.charAt(0).toUpperCase() + c.status.slice(1)} size="md" />
                {c.status === 'pending' && (
                  <>
                    <Button variant="outline" size="sm" className="text-status-success border-status-success hover:bg-status-success/10"><CheckCircle className="w-4 h-4" /></Button>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10"><XCircle className="w-4 h-4" /></Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
