import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GovBadge } from '@/components/shared/GovBadge';
import { EmblemWatermark } from '@/components/shared/EmblemWatermark';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Lock, ArrowRight } from 'lucide-react';

export default function CandidateLogin() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-16 relative">
        <EmblemWatermark className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size="xl" opacity={0.03} />
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-xl border-2 border-gold/30 p-8 shadow-gold relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <GovBadge variant="gold" label="Candidate Portal" size="md" />
              </div>
              <div className="text-center mb-8 mt-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center border-2 border-gold/40">
                  <User className="w-8 h-8 text-gold" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Candidate Login</h1>
                <p className="text-sm text-muted-foreground mt-1">Access your internship dashboard</p>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email / Aadhaar</label>
                  <Input placeholder="Enter email or Aadhaar number" className="focus-gold" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
                  <Input type="password" placeholder="Enter password" className="focus-gold" />
                </div>
                <Link to="/candidate/dashboard">
                  <Button variant="govGold" className="w-full gap-2 mt-2">
                    Login <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </form>
              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account? <Link to="/candidate/register" className="text-gold hover:underline font-medium">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
