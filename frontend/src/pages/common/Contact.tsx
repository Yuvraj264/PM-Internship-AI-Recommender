import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GovBadge } from '@/components/shared/GovBadge';
import { GoldDivider } from '@/components/shared/GoldDivider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Ministry of Education, Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001' },
  { icon: Phone, label: 'Helpline', value: '1800-XXX-XXXX (Toll Free)' },
  { icon: Mail, label: 'Email', value: 'support@pminternship.gov.in' },
  { icon: Clock, label: 'Working Hours', value: 'Monday to Friday, 9:00 AM - 6:00 PM IST' },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-pattern py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <GovBadge variant="gold" label="Contact Us" size="lg" className="mb-4" />
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">Get in Touch</h1>
            <GoldDivider variant="tricolor" className="!mx-0 !w-24 mb-4" />
            <p className="text-primary-foreground/80">
              We're here to help. Reach out to our support team for any queries or assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-xl border border-border p-8 shadow-gov">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                    <Input placeholder="Enter your name" className="focus-gold" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input type="email" placeholder="your@email.com" className="focus-gold" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                  <Input placeholder="What's this about?" className="focus-gold" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                  <Textarea placeholder="Describe your query in detail..." rows={5} className="focus-gold resize-none" />
                </div>
                <Button variant="govGold" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-gold/10 flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                      <p className="text-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden border border-border h-64 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gold mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Interactive Map</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
