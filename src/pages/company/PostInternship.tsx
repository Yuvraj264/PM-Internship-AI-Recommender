import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

export default function CompanyPostInternship() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role="company" />
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Post New Internship</h1>
        <div className="bg-card rounded-xl border border-border p-6 shadow-gov max-w-3xl border-t-4 border-t-gold">
          <form className="space-y-5">
            <div><label className="text-sm font-medium mb-2 block">Internship Title</label><Input placeholder="e.g., Software Development Intern" /></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium mb-2 block">Location</label><Input placeholder="City or Remote" /></div>
              <div><label className="text-sm font-medium mb-2 block">Duration</label><Input placeholder="e.g., 6 Months" /></div>
              <div><label className="text-sm font-medium mb-2 block">Stipend (₹/month)</label><Input placeholder="e.g., 25000" /></div>
              <div><label className="text-sm font-medium mb-2 block">Positions Available</label><Input placeholder="e.g., 10" /></div>
            </div>
            <div><label className="text-sm font-medium mb-2 block">Required Skills (comma separated)</label><Input placeholder="React, Node.js, Python" /></div>
            <div><label className="text-sm font-medium mb-2 block">Description</label><Textarea rows={5} placeholder="Describe the role and responsibilities..." /></div>
            <div><label className="text-sm font-medium mb-2 block">Eligibility Criteria</label><Textarea rows={3} placeholder="Minimum requirements..." /></div>
            <Button variant="govGold" className="gap-2"><Send className="w-4 h-4" /> Submit for Review</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
