import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GovBadge } from '@/components/shared/GovBadge';
import { GoldDivider } from '@/components/shared/GoldDivider';
import { EmblemWatermark } from '@/components/shared/EmblemWatermark';
import { Target, Users, Award, Globe, CheckCircle } from 'lucide-react';

const milestones = [
  { year: '2020', title: 'Initiative Launched', desc: 'PM Internship System conceptualized under Digital India' },
  { year: '2021', title: 'Platform Development', desc: 'Core infrastructure and security protocols established' },
  { year: '2022', title: 'Pilot Program', desc: '5,000+ students participated in pilot across 10 states' },
  { year: '2023', title: 'National Rollout', desc: 'Full launch with 500+ government organizations' },
  { year: '2024', title: '3.5 Lakh+ Applications', desc: 'Milestone of successful internship placements achieved' },
];

const values = [
  { icon: Target, title: 'Mission-Driven', desc: 'Empowering youth with practical skills and experience' },
  { icon: Users, title: 'Inclusive Access', desc: 'Equal opportunities for students from all backgrounds' },
  { icon: Award, title: 'Quality Assurance', desc: 'Verified organizations and structured programs' },
  { icon: Globe, title: 'Pan-India Reach', desc: 'Opportunities across all states and union territories' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-hero-pattern py-20">
        <EmblemWatermark className="right-10 top-1/2 -translate-y-1/2" size="lg" opacity={0.06} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <GovBadge variant="gold" label="About Us" size="lg" className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              About PM Internship System
            </h1>
            <GoldDivider variant="tricolor" className="!mx-0 !w-24 mb-6" />
            <p className="text-lg text-primary-foreground/80">
              A flagship initiative under Digital India, bridging the gap between 
              academic learning and professional excellence through structured internship opportunities.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The PM Internship System is designed to create a seamless bridge between 
                India's talented youth and meaningful work opportunities across government 
                and private sectors. Our platform ensures transparency, security, and equal 
                access to career-building experiences.
              </p>
              <ul className="space-y-3">
                {['Skill development through practical exposure', 'Government-verified opportunities', 'Transparent application process', 'Mentorship and career guidance'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gold/20 to-primary/10 rounded-2xl flex items-center justify-center border border-gold/30">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center border-2 border-gold/40">
                    <span className="text-gold text-4xl font-bold">भा</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">Government of India</p>
                  <p className="text-sm text-muted-foreground">Ministry of Education</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider variant="ornate" />

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Our Core Values</h2>
            <p className="text-muted-foreground">Principles that guide every aspect of our platform</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 bg-card rounded-xl border border-border hover:border-gold/40 transition-colors text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Our Journey</h2>
            <p className="text-muted-foreground">Key milestones in building India's premier internship platform</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, i) => (
              <div key={milestone.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {milestone.year}
                  </div>
                  {i !== milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gold/30 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-foreground mb-1">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
