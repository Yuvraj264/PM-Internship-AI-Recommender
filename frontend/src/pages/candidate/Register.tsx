import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GovBadge } from '@/components/shared/GovBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, ArrowRight } from 'lucide-react';

export default function CandidateRegister() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="bg-card rounded-xl border-2 border-gold/30 p-8 shadow-gold relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <GovBadge variant="gold" label="New Registration" size="md" />
              </div>
              <div className="text-center mb-6 mt-4">
                <UserPlus className="w-12 h-12 text-gold mx-auto mb-3" />
                <h1 className="text-2xl font-bold text-foreground">Register as Candidate</h1>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" className="focus-gold" />
                  <Input placeholder="Last Name" className="focus-gold" />
                </div>
                <Input placeholder="Email Address" type="email" className="focus-gold" />
                <Input placeholder="Aadhaar Number" className="focus-gold" />
                <Input placeholder="Mobile Number" className="focus-gold" />
                <Input placeholder="Password" type="password" className="focus-gold" />
                <Input placeholder="Confirm Password" type="password" className="focus-gold" />
                <Link to="/candidate/dashboard">
                  <Button variant="govGold" className="w-full gap-2">Register <ArrowRight className="w-4 h-4" /></Button>
                </Link>
              </form>
              <p className="text-center text-sm text-muted-foreground mt-6">
                Already registered? <Link to="/candidate/login" className="text-gold hover:underline font-medium">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
