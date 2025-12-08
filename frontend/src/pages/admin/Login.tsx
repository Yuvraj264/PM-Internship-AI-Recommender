import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GovBadge } from '@/components/shared/GovBadge';
import { EmblemWatermark } from '@/components/shared/EmblemWatermark';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-16 relative">
        <EmblemWatermark className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size="xl" opacity={0.04} />
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-xl border-2 border-primary/30 p-8 shadow-gov-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <GovBadge variant="info" label="Admin Access" size="md" />
              </div>
              <div className="text-center mb-8 mt-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
                <p className="text-sm text-muted-foreground mt-1">System administration access</p>
              </div>
              <form className="space-y-4">
                <Input placeholder="Admin ID" className="focus-gold" />
                <Input placeholder="Password" type="password" className="focus-gold" />
                <Link to="/admin/dashboard">
                  <Button variant="govPrimary" className="w-full gap-2">Secure Login <ArrowRight className="w-4 h-4" /></Button>
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
