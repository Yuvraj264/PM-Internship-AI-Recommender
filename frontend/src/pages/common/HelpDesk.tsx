import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GovBadge } from '@/components/shared/GovBadge';
import { GoldDivider } from '@/components/shared/GoldDivider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle, FileText, MessageCircle, Phone } from 'lucide-react';

const faqs = [
  {
    category: 'Registration',
    questions: [
      { q: 'How do I register as a candidate?', a: 'Click on "Register as Candidate" and fill in your details including Aadhaar verification. Once verified, you can start applying for internships.' },
      { q: 'What documents are required for registration?', a: 'You need a valid Aadhaar card, educational certificates, and a recent photograph. Government ID proof may be required for specific internships.' },
      { q: 'Can I register if I am currently employed?', a: 'Yes, working professionals can also apply for part-time or evening internship programs where available.' },
    ]
  },
  {
    category: 'Application Process',
    questions: [
      { q: 'How do I apply for an internship?', a: 'Browse available internships, select one that matches your profile, and click "Apply Now". Complete the application form and submit required documents.' },
      { q: 'Can I apply for multiple internships?', a: 'Yes, you can apply for up to 5 internships at a time. Once selected for one, other applications will be automatically withdrawn.' },
      { q: 'How will I know my application status?', a: 'You will receive email and SMS notifications. You can also check your application status in the "My Applications" section of your dashboard.' },
    ]
  },
  {
    category: 'For Organizations',
    questions: [
      { q: 'How can my organization post internships?', a: 'Register as an employer, complete verification, and use the "Post Internship" feature. All postings go through a review process before going live.' },
      { q: 'What is the verification process for companies?', a: 'Organizations must submit valid registration documents, PAN, GST (if applicable), and undergo a verification process that typically takes 3-5 working days.' },
    ]
  },
];

const supportChannels = [
  { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with our support team', action: 'Start Chat' },
  { icon: Phone, title: 'Phone Support', desc: '1800-XXX-XXXX (Toll Free)', action: 'Call Now' },
  { icon: FileText, title: 'Submit Ticket', desc: 'Raise a support request', action: 'Create Ticket' },
];

export default function HelpDesk() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-pattern py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <GovBadge variant="gold" label="Help Center" size="lg" className="mb-4" />
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">How can we help you?</h1>
            <GoldDivider variant="tricolor" className="mb-6" />
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search for help articles, FAQs..." 
                className="pl-12 h-12 bg-card/90 backdrop-blur-sm border-gold/30 focus-gold"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {supportChannels.map((channel) => (
              <div key={channel.title} className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border hover:border-gold/40 transition-colors">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-gold/10 flex items-center justify-center">
                  <channel.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{channel.title}</h3>
                  <p className="text-sm text-muted-foreground">{channel.desc}</p>
                </div>
                <Button variant="outline" size="sm">{channel.action}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-gold mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find answers to common queries</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((section) => (
              <div key={section.category}>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gold rounded-full" />
                  {section.category}
                </h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {section.questions.map((faq, i) => (
                    <AccordionItem key={i} value={`${section.category}-${i}`} className="border border-border rounded-lg px-4 bg-card">
                      <AccordionTrigger className="text-left hover:text-gold transition-colors">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
