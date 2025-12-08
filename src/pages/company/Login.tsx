import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GovBadge } from '@/components/shared/GovBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building2, ArrowRight } from 'lucide-react';

export default function CompanyLogin() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-xl border-2 border-gold/30 p-8 shadow-gold relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <GovBadge variant="verified" label="Verified Employer Access" size="md" />
              </div>
              <div className="text-center mb-8 mt-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Company Portal</h1>
                <p className="text-sm text-muted-foreground mt-1">Post internships and manage applicants</p>
              </div>
              <form className="space-y-4">
                <Input placeholder="Organization Email" type="email" className="focus-gold" />
                <Input placeholder="Password" type="password" className="focus-gold" />
                <Link to="/company/dashboard">
                  <Button variant="govPrimary" className="w-full gap-2">Login <ArrowRight className="w-4 h-4" /></Button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
