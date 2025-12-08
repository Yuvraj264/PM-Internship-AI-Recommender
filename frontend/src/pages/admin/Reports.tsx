import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { ChartPlaceholder } from '@/components/shared/ChartPlaceholder';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function AdminReports() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role="admin" />
      <main className="flex-1 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <Button variant="outline" className="gap-2"><Download className="w-4 h-4" />Export All</Button>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <ChartPlaceholder title="Monthly Registrations" type="bar" height="lg" />
          <ChartPlaceholder title="Internship Completions" type="line" height="lg" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <ChartPlaceholder title="Sector Distribution" type="pie" height="md" />
          <ChartPlaceholder title="State-wise Applications" type="bar" height="md" />
          <ChartPlaceholder title="Platform Growth" type="area" height="md" />
        </div>
      </main>
    </div>
  );
}
