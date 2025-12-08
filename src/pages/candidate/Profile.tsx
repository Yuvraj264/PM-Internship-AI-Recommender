import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { GovBadge } from '@/components/shared/GovBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, MapPin, GraduationCap, Save } from 'lucide-react';

export default function CandidateProfile() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role="candidate" />
      <main className="flex-1 p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information</p>
          </div>
          <GovBadge variant="verified" label="Aadhaar Verified" size="md" />
        </div>
        <div className="bg-card rounded-xl border border-border p-6 shadow-gov max-w-3xl">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center border-2 border-gold/40">
              <User className="w-10 h-10 text-gold" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Rahul Sharma</h2>
              <p className="text-muted-foreground">Candidate ID: PMIS2024XXXXX</p>
            </div>
          </div>
          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium mb-2 block">Full Name</label><Input defaultValue="Rahul Sharma" /></div>
              <div><label className="text-sm font-medium mb-2 block">Email</label><Input defaultValue="rahul@email.com" /></div>
              <div><label className="text-sm font-medium mb-2 block">Phone</label><Input defaultValue="+91 98765 43210" /></div>
              <div><label className="text-sm font-medium mb-2 block">Location</label><Input defaultValue="New Delhi" /></div>
              <div><label className="text-sm font-medium mb-2 block">Education</label><Input defaultValue="B.Tech Computer Science" /></div>
              <div><label className="text-sm font-medium mb-2 block">University</label><Input defaultValue="Delhi University" /></div>
            </div>
            <Button variant="govGold" className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
