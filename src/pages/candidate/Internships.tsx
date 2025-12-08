import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { InternshipCard } from '@/components/shared/InternshipCard';

const internships = [
  { id: '1', title: 'Policy Research Intern', company: 'NITI Aayog', location: 'New Delhi', duration: '6 Months', stipend: '₹25,000', skills: ['Research', 'Data Analysis'], deadline: '15 Jan 2025', isVerified: true, status: 'active' as const },
  { id: '2', title: 'Software Developer Intern', company: 'NIC', location: 'Bengaluru', duration: '6 Months', stipend: '₹30,000', skills: ['React', 'Node.js'], deadline: '20 Jan 2025', isVerified: true, status: 'active' as const },
  { id: '3', title: 'Data Analyst Intern', company: 'Ministry of Statistics', location: 'Delhi', duration: '4 Months', stipend: '₹20,000', skills: ['Python', 'SQL'], deadline: '25 Jan 2025', isVerified: true, status: 'active' as const },
];

export default function CandidateInternships() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role="candidate" />
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Browse Internships</h1>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {internships.map((i) => <InternshipCard key={i.id} {...i} />)}
        </div>
      </main>
    </div>
  );
}
